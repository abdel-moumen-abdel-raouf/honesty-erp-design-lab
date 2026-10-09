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
  ({sidebar: 's2-a-sidebar', topbar: 's2-b-topbar', 'app-footer': 's2-c-app-footer', 'quick-actions-bar': 's2-d-quick-actions-bar', 'app-shell': 's2-e-app-shell'}[COMPONENT]
    ?? (COMPONENT === 'integrated-app' ? 'autonomous-app-shell-wave' : null)
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

const quickActionsScenarios = [
  {name: 'quick-actions-1440-light-rtl-default', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'quick-actions-1280-dark-ltr-default', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'quick-actions-1024-light-rtl-dense', width: 1024, height: 768, theme: 'light', direction: 'rtl', state: 'dense'},
  {name: 'quick-actions-768-dark-rtl-default', width: 768, height: 900, theme: 'dark', direction: 'rtl'},
  {name: 'quick-actions-390-light-rtl-dense', width: 390, height: 844, theme: 'light', direction: 'rtl', state: 'dense'},
  {name: 'quick-actions-320-dark-ltr-default', width: 320, height: 568, theme: 'dark', direction: 'ltr'},
];

const appShellScenarios = [
  {name: 'app-shell-1440-light-rtl', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'app-shell-1280-dark-ltr', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'app-shell-1024-light-rtl', width: 1024, height: 768, theme: 'light', direction: 'rtl'},
  {name: 'app-shell-768-dark-rtl', width: 768, height: 900, theme: 'dark', direction: 'rtl'},
  {name: 'app-shell-390-light-rtl', width: 390, height: 844, theme: 'light', direction: 'rtl'},
  {name: 'app-shell-320-dark-ltr', width: 320, height: 568, theme: 'dark', direction: 'ltr'},
  {name: 'app-shell-390-light-rtl-end', width: 390, height: 844, theme: 'light', direction: 'rtl', state: 'end'},
  {name: 'app-shell-320-dark-ltr-end', width: 320, height: 568, theme: 'dark', direction: 'ltr', state: 'end'},
];

const integratedAppScenarios = [
  {name: 'integrated-1440-light-rtl', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'integrated-1440-dark-rtl-applications-open', width: 1440, height: 900, theme: 'dark', direction: 'rtl', open: 'applications'},
  {name: 'integrated-1280-dark-ltr-messages-open', width: 1280, height: 900, theme: 'dark', direction: 'ltr', open: 'messages'},
  {name: 'integrated-1024-light-rtl-notifications-open', width: 1024, height: 768, theme: 'light', direction: 'rtl', open: 'notifications'},
  {name: 'integrated-768-dark-ltr-search-active', width: 768, height: 900, theme: 'dark', direction: 'ltr', open: 'search'},
  {name: 'integrated-390-light-rtl-sidebar-open', width: 390, height: 844, theme: 'light', direction: 'rtl', open: 'sidebar'},
  {name: 'integrated-390-dark-rtl-messages-open', width: 390, height: 844, theme: 'dark', direction: 'rtl', open: 'messages'},
  {name: 'integrated-320-dark-ltr-notifications-open', width: 320, height: 568, theme: 'dark', direction: 'ltr', open: 'notifications'},
];

const scenarios = COMPONENT === 'topbar'
  ? topbarScenarios
  : COMPONENT === 'app-footer'
    ? appFooterScenarios
    : COMPONENT === 'quick-actions-bar'
      ? quickActionsScenarios
      : COMPONENT === 'app-shell'
        ? appShellScenarios
        : COMPONENT === 'integrated-app'
          ? integratedAppScenarios
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
      const route = COMPONENT === 'integrated-app' ? '/components/global-search' : `/components/${COMPONENT}`;
      await client.command('Page.navigate', {url: `${BASE_URL}${route}`});
      const readySelector = COMPONENT === 'topbar'
        ? 'erp-topbar[data-showcase-target] header, [data-showcase-target] erp-topbar header'
        : COMPONENT === 'app-footer'
          ? 'erp-app-footer[data-showcase-target] footer, [data-showcase-target] erp-app-footer footer'
          : COMPONENT === 'quick-actions-bar'
            ? 'erp-quick-actions-bar[data-showcase-target] [role="toolbar"], [data-showcase-target] erp-quick-actions-bar [role="toolbar"]'
            : COMPONENT === 'app-shell'
              ? 'erp-app-shell[data-showcase-target] .app-shell, [data-showcase-target] erp-app-shell .app-shell'
              : COMPONENT === 'integrated-app'
                ? '#design-lab-app-shell .app-shell'
              : 'erp-sidebar[data-showcase-target] nav, [data-showcase-target] erp-sidebar nav';
      await waitFor(() => evaluate(client, `Boolean(document.querySelector(${JSON.stringify(readySelector)}))`));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        document.documentElement.style.setProperty('direction', '${scenario.direction}', 'important');
        document.body.style.setProperty('direction', '${scenario.direction}', 'important');
        document.querySelector('${COMPONENT === 'integrated-app' ? '#design-lab-app-shell' : `erp-${COMPONENT}[data-showcase-target], [data-showcase-target] erp-${COMPONENT}`}')
          ?.setAttribute('dir', '${scenario.direction}');
      })()`);
      if (COMPONENT === 'integrated-app' && scenario.open) {
        const selector = {
          applications: 'erp-applications-menu .applications-menu__trigger button',
          messages: 'erp-messages-menu .messages-menu__trigger-wrap erp-icon-button button',
          notifications: 'erp-notification-bell .bell__trigger-wrap erp-icon-button button',
          search: 'erp-global-search .search-box__trigger button',
          sidebar: '#btn-component-catalog button',
        }[scenario.open];
        if (scenario.open === 'search') {
          await evaluate(client, `(() => {
            document.querySelector(${JSON.stringify(selector)})?.click();
          })()`);
          await waitFor(() => evaluate(client, `Boolean(document.querySelector('erp-global-search .search-box__popup:popover-open .search-box__native'))`));
          await evaluate(client, `(() => {
            const field = document.querySelector('erp-global-search .search-box__popup:popover-open .search-box__native');
            if (!(field instanceof HTMLInputElement)) throw new Error('Missing integrated GlobalSearch input');
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            setter.call(field, 'ال');
            field.dispatchEvent(new Event('input', {bubbles: true}));
            field.focus();
          })()`);
        } else {
          await evaluate(client, `document.querySelector(${JSON.stringify(selector)})?.click()`);
        }
        await new Promise((resolve) => setTimeout(resolve, 750));
      }
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
      if (COMPONENT === 'quick-actions-bar' && scenario.state === 'dense') {
        await evaluate(client, `(() => {
          const field = document.querySelector('[data-showcase-control="groups"] textarea, [data-showcase-control="groups"] input');
          if (!field) throw new Error('Missing quick-actions groups editor');
          const setter = Object.getOwnPropertyDescriptor(
            field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
            'value',
          ).set;
          setter.call(field, JSON.stringify([
            {id: 'daily', label: 'العمل اليومي', actions: [
              {id: 'task', label: 'مهمة جديدة', icon: 'add', priority: 'primary'},
              {id: 'event', label: 'موعد جديد', icon: 'calendar'},
              {id: 'report', label: 'تقرير سريع', icon: 'chart'}
            ]},
            {id: 'support', label: 'المساندة', actions: [
              {id: 'help', label: 'المساعدة', icon: 'help'},
              {id: 'settings', label: 'الإعدادات', icon: 'settings'},
              {id: 'disabled', label: 'إجراء غير متاح', icon: 'lock', disabled: true}
            ]}
          ], null, 2));
          field.dispatchEvent(new Event('input', {bubbles: true}));
        })()`);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      let interactionEvidence = null;
      let navigationEvidence = null;
      if (COMPONENT === 'app-shell') {
        await evaluate(client, `document.querySelector('[data-showcase-target] .app-shell__quick-actions erp-icon-button button')?.click()`);
        await new Promise((resolve) => setTimeout(resolve, 50));
        const quickActionEvent = await evaluate(client, `document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? ''`);
        await evaluate(client, `document.querySelector('[data-showcase-target] .app-shell__footer erp-button button')?.click()`);
        await new Promise((resolve) => setTimeout(resolve, 50));
        const footerActionEvent = await evaluate(client, `document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? ''`);
        interactionEvidence = {quickActionEvent, footerActionEvent};
      }
      if (COMPONENT === 'integrated-app' && !scenario.open) {
        const originalPath = await evaluate(client, 'location.pathname');
        await evaluate(client, `document.querySelector('erp-sidebar a[href="/components/messages-menu"]')?.click()`);
        await waitFor(() => evaluate(client, `location.pathname === '/components/messages-menu'`));
        await evaluate(client, 'history.back()');
        await waitFor(() => evaluate(client, `location.pathname !== '/components/messages-menu'`));
        const backPath = await evaluate(client, 'location.pathname');
        await evaluate(client, 'history.forward()');
        await waitFor(() => evaluate(client, `location.pathname === '/components/messages-menu'`));
        await evaluate(client, 'history.back()');
        await waitFor(() => evaluate(client, `location.pathname !== '/components/messages-menu'`));
        const finalBackPath = await evaluate(client, 'location.pathname');
        if (finalBackPath !== originalPath) {
          await client.command('Page.navigate', {url: `${BASE_URL}${originalPath}`});
          await waitFor(() => evaluate(client, `location.pathname === ${JSON.stringify(originalPath)}`));
          await waitFor(() => evaluate(client, `Boolean(document.querySelector('#design-lab-app-shell .app-shell'))`));
        }
        navigationEvidence = {
          originalPath,
          destinationPath: '/components/messages-menu',
          backPath,
          backForwardRoundTrip: true,
          finalPath: await evaluate(client, 'location.pathname'),
        };
      }
      const scrollBlock = COMPONENT === 'app-shell'
        ? scenario.state === 'end' ? 'end' : 'start'
        : 'center';
      if (COMPONENT === 'integrated-app') {
        await evaluate(client, 'window.scrollTo(0, 0)');
      } else {
        await evaluate(client, `document.querySelector('erp-${COMPONENT}[data-showcase-target], [data-showcase-target] erp-${COMPONENT}')?.scrollIntoView({block: '${scrollBlock}', inline: 'nearest'})`);
      }
      if (COMPONENT === 'app-shell' && scenario.state !== 'end') {
        await evaluate(client, `window.scrollBy(0, -(document.querySelector('#lab-utility-bar')?.getBoundingClientRect().height ?? 0))`);
      }
      await new Promise((resolve) => setTimeout(resolve, 200));

      const measurement = await evaluate(client, `(() => {
        const host = document.querySelector('${COMPONENT === 'integrated-app' ? '#design-lab-app-shell' : `erp-${COMPONENT}[data-showcase-target], [data-showcase-target] erp-${COMPONENT}`}');
        const target = document.querySelector('[data-showcase-target]');
        const nav = host?.querySelector('nav');
        const header = host?.querySelector('header');
        const footer = host?.querySelector('footer');
        const toolbar = host?.querySelector('[role="toolbar"]');
        const shell = host?.querySelector('.app-shell');
        const shellContent = host?.querySelector('.app-shell__content');
        const quickActions = host?.querySelector('erp-quick-actions-bar') ?? host;
        const shellRegions = shell ? {
          topbar: shell.querySelector('.app-shell__topbar'),
          sidebar: shell.querySelector('.app-shell__sidebar'),
          content: shell.querySelector('.app-shell__content'),
          quickActions: shell.querySelector('.app-shell__quick-actions'),
          footer: shell.querySelector('.app-shell__footer'),
        } : {};
        const rect = (element) => {
          if (!element) return null;
          const value = element.getBoundingClientRect();
          return {x: value.x, y: value.y, width: value.width, height: value.height};
        };
        const openSurfaces = [...document.querySelectorAll('[popover]:popover-open')];
        return {
          viewport: {width: innerWidth, height: innerHeight},
          theme: document.querySelector('.lab-capture-root')?.getAttribute('data-theme'),
          direction: getComputedStyle(host).direction,
          pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          target: rect(target),
          component: '${COMPONENT}',
          requestedOpenState: ${JSON.stringify(null)},
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
          toolbar: rect(toolbar),
          shell: rect(shell),
          shellHorizontalOverflow: shell ? Math.max(0, shell.scrollWidth - shell.clientWidth) : null,
          shellContent: rect(shellContent),
          shellContentOverflowY: shellContent ? getComputedStyle(shellContent).overflowY : null,
          shellContentScrollHeight: shellContent?.scrollHeight ?? null,
          shellContentClientHeight: shellContent?.clientHeight ?? null,
          toolbarFlexDirection: toolbar ? getComputedStyle(toolbar).flexDirection : null,
          toolbarHorizontalOverflow: toolbar ? Math.max(0, toolbar.scrollWidth - toolbar.clientWidth) : null,
          quickActionGroups: host?.querySelectorAll('.quick-actions-bar__group').length ?? 0,
          quickActionButtons: quickActions?.querySelectorAll('erp-icon-button button').length ?? 0,
          quickActionDisabledButtons: quickActions?.querySelectorAll('erp-icon-button button:disabled').length ?? 0,
          footerPresent: Boolean(footer),
          footerActionCount: host?.querySelectorAll('.app-footer__actions erp-button').length ?? 0,
          footerDisabledActionCount: host?.querySelectorAll('.app-footer__actions button:disabled').length ?? 0,
          shellRegions: Object.fromEntries(
            Object.entries(shellRegions).map(([name, element]) => [name, rect(element)]),
          ),
          regions: header ? Object.fromEntries(
            [...header.children].map((element) => [
              element.className,
              {...rect(element), overflowWidth: Math.max(0, element.scrollWidth - element.clientWidth)},
            ]),
          ) : {},
          renderedOwners: {
            sidebar: host?.querySelectorAll('erp-sidebar').length ?? 0,
            topbar: host?.querySelectorAll('erp-topbar').length ?? 0,
            appFooter: host?.querySelectorAll('erp-app-footer').length ?? 0,
            quickActionsBar: host?.querySelectorAll('erp-quick-actions-bar').length ?? 0,
            branchSelector: host?.querySelectorAll('erp-branch-selector').length ?? 0,
            globalSearch: host?.querySelectorAll('erp-global-search').length ?? 0,
            applicationsMenu: host?.querySelectorAll('erp-applications-menu').length ?? 0,
            messagesMenu: host?.querySelectorAll('erp-messages-menu').length ?? 0,
            notificationBell: host?.querySelectorAll('erp-notification-bell').length ?? 0,
            userMenu: host?.querySelectorAll('erp-user-menu').length ?? 0,
          },
          openPopoverCount: openSurfaces.length,
          openPopovers: openSurfaces.map((surface) => ({
            className: surface.className,
            rect: rect(surface),
            horizontalOverflow: Math.max(0, surface.scrollWidth - surface.clientWidth),
            verticalOverflow: Math.max(0, surface.scrollHeight - surface.clientHeight),
          })),
          routerOutletCount: document.querySelectorAll('router-outlet').length,
          overlayHostCount: document.querySelectorAll('erp-overlay-host').length,
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        };
      })()`);
      measurement.requestedOpenState = scenario.open ?? null;
      measurements.push({
        name: scenario.name,
        ...measurement,
        interactionEvidence,
        navigationEvidence,
        diagnostics: [...client.diagnostics],
      });
      const screenshot = await client.command('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      await fs.writeFile(path.join(OUTPUT, `${scenario.name}.png`), Buffer.from(screenshot.data, 'base64'));
    }

    let routeAudit = null;
    if (COMPONENT === 'integrated-app') {
      await client.command('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await client.command('Page.navigate', {url: `${BASE_URL}/components/global-search`});
      await waitFor(() => evaluate(client, `Boolean(document.querySelector('#design-lab-app-shell .app-shell'))`));
      const routes = await evaluate(client, `[
        ...new Set(
          [...document.querySelectorAll('erp-sidebar a[href^="/components/"]')]
            .map((anchor) => anchor.getAttribute('href'))
            .filter(Boolean),
        ),
      ].sort()`);
      const routeResults = [];
      for (const route of routes) {
        client.diagnostics.length = 0;
        await client.command('Page.navigate', {url: `${BASE_URL}${route}`});
        await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
        await waitFor(() => evaluate(client, `Boolean(document.querySelector('#design-lab-app-shell .app-shell'))`));
        await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
        await new Promise((resolve) => setTimeout(resolve, 75));
        routeResults.push(await evaluate(client, `(() => ({
          route: location.pathname,
          shellCount: document.querySelectorAll('#design-lab-app-shell > .app-shell').length,
          routerOutletCount: document.querySelectorAll('router-outlet').length,
          overlayHostCount: document.querySelectorAll('erp-overlay-host').length,
          primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
          pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        }))()`));
        routeResults.at(-1).diagnostics = [...client.diagnostics];
      }
      const failures = routeResults.filter((result) =>
        result.shellCount !== 1
        || result.routerOutletCount !== 1
        || result.overlayHostCount !== 1
        || result.primaryTargetCount !== 1
        || result.pageHorizontalOverflow !== 0
        || result.brokenImages !== 0
        || result.diagnostics.length !== 0,
      );
      routeAudit = {
        expectedRoutes: 81,
        auditedRoutes: routeResults.length,
        passedRoutes: routeResults.length - failures.length,
        failedRoutes: failures.length,
        failures,
        routes: routeResults,
      };
    }

    await fs.writeFile(
      path.join(OUTPUT, 'runtime-measurements.json'),
      `${JSON.stringify({capturedAt: new Date().toISOString(), baseUrl: BASE_URL, measurements, routeAudit}, null, 2)}\n`,
    );
    if (routeAudit && (routeAudit.auditedRoutes !== routeAudit.expectedRoutes || routeAudit.failedRoutes > 0)) {
      throw new Error(
        `Integrated route audit failed: ${routeAudit.passedRoutes}/${routeAudit.expectedRoutes} passed.`,
      );
    }
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
