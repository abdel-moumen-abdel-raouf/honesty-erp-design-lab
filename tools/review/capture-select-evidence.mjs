import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.SELECT_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.SELECT_REFERENCE_URL
  ?? 'http://127.0.0.1:8766/ERP-SELECT.html';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-select', 'v3-internal-review');

const scenarios = [
  {name: 'reference-1440-light-ltr-open', kind: 'reference', width: 1440, height: 900, theme: 'light', direction: 'ltr'},
  {name: 'reference-390-dark-rtl-open', kind: 'reference', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-1440-light-ltr-open', kind: 'implementation', width: 1440, height: 900, theme: 'light', direction: 'ltr'},
  {name: 'implementation-1280-dark-rtl-open', kind: 'implementation', width: 1280, height: 900, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-390-dark-rtl-live-open', kind: 'live', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-320-light-ltr-live-open', kind: 'live', width: 320, height: 568, theme: 'light', direction: 'ltr'},
];

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
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
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

  close() { this.#socket.close(); }
}

async function waitFor(read, timeoutMs = 15_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out waiting for Select evidence state.');
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description
        ?? result.exceptionDetails.text,
    );
  }
  return result.result.value;
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-select-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--disable-extensions', '--disable-default-apps', '--no-first-run',
  '--no-default-browser-check', 'about:blank',
], {stdio: 'ignore'});

try {
  const port = await waitFor(async () => {
    try {
      const value = await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8');
      return Number(value.split(/\r?\n/u)[0]);
    } catch { return 0; }
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
      width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: false,
    });
    if (scenario.kind === 'reference') {
      await client.command('Page.navigate', {url: REFERENCE_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `(() => {
        document.documentElement.dataset.theme = '${scenario.theme}';
        document.documentElement.dir = '${scenario.direction}';
        document.getElementById('btn-light')?.setAttribute('aria-pressed', String('${scenario.theme}' === 'light'));
        document.getElementById('btn-dark')?.setAttribute('aria-pressed', String('${scenario.theme}' === 'dark'));
        document.getElementById('btn-ltr')?.setAttribute('aria-pressed', String('${scenario.direction}' === 'ltr'));
        document.getElementById('btn-rtl')?.setAttribute('aria-pressed', String('${scenario.direction}' === 'rtl'));
        document.querySelector('.erp-select__control')?.click();
        document.querySelector('.grid')?.scrollIntoView({block: 'start'});
      })()`);
      await waitFor(() => evaluate(client, "document.querySelector('.erp-select.is-open') !== null"));
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/select`});
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        if ('${scenario.kind}' === 'implementation') {
          document.querySelector('[data-showcase-exact-reference-toggle] button')?.click();
        }
      })()`);
      if (scenario.kind === 'implementation') {
        await waitFor(() => evaluate(client, 'Boolean(document.querySelector("app-review-exact-core-showcase"))'));
      }
      await evaluate(client, `(() => {
        const select = '${scenario.kind}' === 'implementation'
          ? document.querySelector('app-review-exact-core-showcase erp-select')
          : document.querySelector('[data-showcase-target]');
        select?.scrollIntoView({block: 'center'});
        select?.querySelector('button[role="combobox"]')?.click();
      })()`);
      await waitFor(() => evaluate(client, 'Boolean(document.querySelector(".select__popup:popover-open"))'));
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    const measurement = await evaluate(client, `(() => {
      const reference = ${JSON.stringify(scenario.kind === 'reference')};
      const control = reference
        ? document.querySelector('.erp-select.is-open .erp-select__control')
        : document.querySelector('.select__popup:popover-open')?.previousElementSibling
          ?.querySelector?.('.select__control') ?? document.querySelector('erp-select[data-select-open="true"] .select__control');
      const popup = reference
        ? document.querySelector('.erp-select.is-open .erp-select__panel')
        : document.querySelector('.select__popup:popover-open');
      const list = reference
        ? popup?.querySelector('.erp-select__listbox')
        : popup?.querySelector('.select__listbox');
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      const controlRect = rect(control);
      const popupRect = rect(popup);
      const placement = controlRect && popupRect
        ? (popupRect.y < controlRect.y ? 'top' : 'bottom')
        : null;
      return {
        viewport: {width: innerWidth, height: innerHeight},
        route: location.pathname,
        theme: document.documentElement.dataset.theme
          ?? document.querySelector('.lab-capture-root')?.getAttribute('data-theme'),
        direction: document.documentElement.dir,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        control: controlRect,
        popup: popupRect,
        list: rect(list),
        placement,
        geometryDelta: controlRect && popupRect ? {
          inlineStart: Math.abs(controlRect.x - popupRect.x),
          width: Math.abs(controlRect.width - popupRect.width),
          gap: placement === 'top'
            ? Math.abs(controlRect.y - (popupRect.y + popupRect.height) - 8)
            : Math.abs(popupRect.y - (controlRect.y + controlRect.height) - 8),
        } : null,
        computed: control && popup && list ? {
          controlFontSize: getComputedStyle(control).fontSize,
          controlLineHeight: getComputedStyle(control).lineHeight,
          controlRadius: getComputedStyle(control).borderRadius,
          controlPaddingInline: getComputedStyle(control).paddingInline,
          controlPaddingBlock: getComputedStyle(control).paddingBlock,
          popupRadius: getComputedStyle(popup).borderRadius,
          popupOverflowY: getComputedStyle(popup).overflowY,
          listMaxHeight: getComputedStyle(list).maxHeight,
          listOverflowY: getComputedStyle(list).overflowY,
        } : null,
        pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      };
    })()`);
    measurements.push({name: scenario.name, ...measurement, diagnostics: [...client.diagnostics]});
    const screenshot = await client.command('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: false,
    });
    await fs.writeFile(path.join(OUTPUT, `${scenario.name}.png`), Buffer.from(screenshot.data, 'base64'));
  }

  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify({
    capturedAt: new Date().toISOString(),
    referenceUrl: REFERENCE_URL,
    implementationUrl: APP_URL,
    measurements,
  }, null, 2)}\n`);
  client.close();
} finally {
  chrome.kill();
  await Promise.race([
    new Promise((resolve) => chrome.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
  await fs.rm(profile, {recursive: true, force: true, maxRetries: 5});
}
