import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = process.env.SHELL_EVIDENCE_URL ?? 'http://127.0.0.1:4200';
const COMPONENT = process.env.SHELL_EVIDENCE_COMPONENT ?? 'sidebar';
const OUTPUT = path.join(
  ROOT,
  'docs',
  'review-evidence',
  'erp-shell',
  ({sidebar: 's2-a-sidebar', topbar: 's2-b-topbar', 'app-footer': 's2-c-app-footer'}[COMPONENT]
    ?? `shell-${COMPONENT}`),
);

const sidebarScenarios = [
  {name: 'sidebar-1440-light-rtl-expanded', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'sidebar-1280-dark-ltr-expanded', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'sidebar-1024-light-rtl-expanded', width: 1024, height: 768, theme: 'light', direction: 'rtl'},
  {name: 'sidebar-768-dark-rtl-collapsed', width: 768, height: 900, theme: 'dark', direction: 'rtl', collapsed: true},
  {name: 'sidebar-390-light-rtl-collapsed', width: 390, height: 844, theme: 'light', direction: 'rtl', collapsed: true},
  {name: 'sidebar-320-dark-ltr-collapsed', width: 320, height: 568, theme: 'dark', direction: 'ltr', collapsed: true},
];

const topbarScenarios = [
  {name: 'topbar-1440-light-rtl', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'topbar-1280-dark-ltr', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'topbar-1024-light-rtl', width: 1024, height: 768, theme: 'light', direction: 'rtl'},
  {name: 'topbar-768-dark-rtl', width: 768, height: 900, theme: 'dark', direction: 'rtl'},
  {name: 'topbar-390-light-rtl', width: 390, height: 844, theme: 'light', direction: 'rtl'},
  {name: 'topbar-320-dark-ltr', width: 320, height: 568, theme: 'dark', direction: 'ltr'},
];

const appFooterScenarios = [
  {name: 'app-footer-1440-light-rtl-default', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'app-footer-1280-dark-ltr-default', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'app-footer-1024-light-rtl-default', width: 1024, height: 768, theme: 'light', direction: 'rtl'},
  {name: 'app-footer-768-dark-rtl-default', width: 768, height: 900, theme: 'dark', direction: 'rtl'},
  {name: 'app-footer-390-light-rtl-dense', width: 390, height: 844, theme: 'light', direction: 'rtl', state: 'dense'},
  {name: 'app-footer-320-dark-ltr-empty', width: 320, height: 568, theme: 'dark', direction: 'ltr', state: 'empty'},
];

const scenarios = COMPONENT === 'topbar'
  ? topbarScenarios
  : COMPONENT === 'app-footer'
    ? appFooterScenarios
    : sidebarScenarios;

class DevToolsClient {
  #socket;
  #nextId = 0;
  #pending = new Map();
  diagnostics = [];

  constructor(url) {
    this.#socket = new WebSocket(url);
    this.#socket.addEventListener('message', ({data}) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.#pending.get(message.id);
        if (!pending) return;
        this.#pending.delete(message.id);
        message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') {
        this.diagnostics.push({level: 'error', text: message.params.exceptionDetails.text});
      }
      if (message.method === 'Log.entryAdded') {
        const {level, text} = message.params.entry;
        if (level === 'error' || level === 'warning') this.diagnostics.push({level, text});
      }
    });
  }

  async open() {
    if (this.#socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.#socket.addEventListener('open', resolve, {once: true});
      this.#socket.addEventListener('error', reject, {once: true});
    });
  }

  command(method, params = {}) {
    const id = ++this.#nextId;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, {resolve, reject});
      this.#socket.send(JSON.stringify({id, method, params}));
    });
  }

  close() {
    this.#socket.close();
  }
}

async function waitFor(read, timeoutMs = 15_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out waiting for browser evidence state.');
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function main() {
  await fs.mkdir(OUTPUT, {recursive: true});
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-shell-evidence-'));
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    '--disable-extensions',
    '--disable-default-apps',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], {stdio: 'ignore'});

  try {
    const port = await waitFor(async () => {
      try {
        const value = await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8');
        return Number(value.split(/\r?\n/u)[0]);
      } catch {
        return 0;
      }
    });
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const target = targets.find((entry) => entry.type === 'page');
    const client = new DevToolsClient(target.webSocketDebuggerUrl);
    await client.open();
    await client.command('Page.enable');
    await client.command('Runtime.enable');
    await client.command('Log.enable');

    const measurements = [];
    for (const scenario of scenarios) {
      client.diagnostics.length = 0;
      await client.command('Emulation.setDeviceMetricsOverride', {
        width: scenario.width,
        height: scenario.height,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await client.command('Page.navigate', {url: BASE_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${BASE_URL}/components/${COMPONENT}`});
      const readySelector = COMPONENT === 'topbar'
        ? 'erp-topbar[data-showcase-target] header, [data-showcase-target] erp-topbar header'
        : COMPONENT === 'app-footer'
          ? 'erp-app-footer[data-showcase-target] footer, [data-showcase-target] erp-app-footer footer'
          : 'erp-sidebar[data-showcase-target] nav, [data-showcase-target] erp-sidebar nav';
      await waitFor(() => evaluate(client, `Boolean(document.querySelector(${JSON.stringify(readySelector)}))`));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        document.documentElement.style.setProperty('direction', '${scenario.direction}', 'important');
        document.body.style.setProperty('direction', '${scenario.direction}', 'important');
        document.querySelector('erp-${COMPONENT}[data-showcase-target], [data-showcase-target] erp-${COMPONENT}')
          ?.setAttribute('dir', '${scenario.direction}');
      })()`);
      if (COMPONENT === 'sidebar' && scenario.collapsed) {
        await evaluate(client, `document.querySelector('erp-sidebar[data-showcase-target] .sidebar__header erp-icon-button button, [data-showcase-target] erp-sidebar .sidebar__header erp-icon-button button')?.click()`);
        await waitFor(() => evaluate(client, `document.querySelector('erp-sidebar[data-showcase-target], [data-showcase-target] erp-sidebar')?.getAttribute('data-sidebar-collapsed') === 'true'`));
      }
      if (COMPONENT === 'app-footer' && scenario.state) {
        await evaluate(client, `(() => {
          const setEditor = (name, value) => {
            const field = document.querySelector('[data-showcase-control="' + name + '"] input, [data-showcase-control="' + name + '"] textarea');
            if (!field) throw new Error('Missing workbench editor: ' + name);
            const setter = Object.getOwnPropertyDescriptor(
              field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
              'value',
            ).set;
            setter.call(field, value);
            field.dispatchEvent(new Event('input', {bubbles: true}));
          };
          if ('${scenario.state}' === 'dense') {
            setEditor('actions', JSON.stringify([
              {id: 'support', label: 'الدعم', icon: 'help'},
              {id: 'privacy', label: 'الخصوصية', icon: 'shield'},
              {id: 'docs', label: 'دليل الاستخدام', icon: 'file'},
              {id: 'status', label: 'حالة الخدمات', icon: 'notification'},
              {id: 'contact', label: 'تواصل معنا', icon: 'mail'},
              {id: 'disabled', label: 'إجراء غير متاح', disabled: true}
            ], null, 2));
          }
          if ('${scenario.state}' === 'empty') {
            setEditor('applicationLabel', '');
            setEditor('versionLabel', '');
            setEditor('statusLabel', '');
            setEditor('actions', '[]');
          }
        })()`);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));

      const measurement = await evaluate(client, `(() => {
        const host = document.querySelector('erp-${COMPONENT}[data-showcase-target], [data-showcase-target] erp-${COMPONENT}');
        const target = document.querySelector('[data-showcase-target]');
        const nav = host?.querySelector('nav');
        const header = host?.querySelector('header');
        const footer = host?.querySelector('footer');
        const rect = (element) => {
          if (!element) return null;
          const value = element.getBoundingClientRect();
          return {x: value.x, y: value.y, width: value.width, height: value.height};
        };
        return {
          viewport: {width: innerWidth, height: innerHeight},
          theme: document.querySelector('.lab-capture-root')?.getAttribute('data-theme'),
          direction: getComputedStyle(host).direction,
          pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          target: rect(target),
          component: '${COMPONENT}',
          host: rect(host),
          nav: rect(nav),
          navOverflowY: nav ? getComputedStyle(nav).overflowY : null,
          navScrollHeight: nav?.scrollHeight ?? null,
          navClientHeight: nav?.clientHeight ?? null,
          collapsed: host?.getAttribute('data-sidebar-collapsed') === 'true',
          visibleEntries: [...(host?.querySelectorAll('[data-sidebar-level]') ?? [])].filter((entry) => !entry.hidden).length,
          enabledInteractiveEntries: host?.querySelectorAll('[data-sidebar-interactive]:not([disabled]):not([aria-disabled="true"])').length ?? 0,
          activeDestinations: host?.querySelectorAll('[aria-current="page"]').length ?? 0,
          activeAncestors: host?.querySelectorAll('[data-sidebar-active-ancestor="true"]').length ?? 0,
          header: rect(header),
          footer: rect(footer),
          footerPresent: Boolean(footer),
          footerActionCount: host?.querySelectorAll('.app-footer__actions erp-button').length ?? 0,
          footerDisabledActionCount: host?.querySelectorAll('.app-footer__actions button:disabled').length ?? 0,
          regions: header ? Object.fromEntries(
            [...header.children].map((element) => [
              element.className,
              {...rect(element), overflowWidth: Math.max(0, element.scrollWidth - element.clientWidth)},
            ]),
          ) : {},
          renderedOwners: {
            branchSelector: host?.querySelectorAll('erp-branch-selector').length ?? 0,
            globalSearch: host?.querySelectorAll('erp-global-search').length ?? 0,
            notificationBell: host?.querySelectorAll('erp-notification-bell').length ?? 0,
            userMenu: host?.querySelectorAll('erp-user-menu').length ?? 0,
          },
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        };
      })()`);
      measurements.push({name: scenario.name, ...measurement, diagnostics: [...client.diagnostics]});
      const screenshot = await client.command('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      await fs.writeFile(path.join(OUTPUT, `${scenario.name}.png`), Buffer.from(screenshot.data, 'base64'));
    }

    await fs.writeFile(
      path.join(OUTPUT, 'runtime-measurements.json'),
      `${JSON.stringify({capturedAt: new Date().toISOString(), baseUrl: BASE_URL, measurements}, null, 2)}\n`,
    );
    client.close();
  } finally {
    chrome.kill();
    await Promise.race([
      new Promise((resolve) => chrome.once('exit', resolve)),
      new Promise((resolve) => setTimeout(resolve, 2_000)),
    ]);
    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        await fs.rm(profile, {recursive: true, force: true, maxRetries: 2, retryDelay: 100});
        break;
      } catch (error) {
        if (attempt === 4) throw error;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }
}

await main();
