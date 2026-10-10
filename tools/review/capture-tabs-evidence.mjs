import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.TABS_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.TABS_REFERENCE_URL
  ?? 'http://127.0.0.1:8766/ERP-TABS.html';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-tabs', 'v1-internal-review');

const scenarios = [
  {name: 'reference-1440-light-rtl', kind: 'reference', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'reference-390-dark-rtl', kind: 'reference', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-1440-light-rtl-exact', kind: 'exact', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'implementation-1280-dark-ltr-exact', kind: 'exact', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'implementation-390-dark-rtl-live', kind: 'live', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-320-light-ltr-live', kind: 'live', width: 320, height: 568, theme: 'light', direction: 'ltr'},
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
  throw new Error('Timed out waiting for Tabs evidence state.');
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result.value;
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-tabs-evidence-'));
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
  const client = new DevToolsClient(targets.find((entry) => entry.type === 'page').webSocketDebuggerUrl);
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
        document.getElementById('btn-${scenario.direction}')?.click();
        document.getElementById('btn-${scenario.theme}')?.click();
        document.getElementById('demo-h1')?.scrollIntoView({block: 'center'});
      })()`);
      await waitFor(() => evaluate(client, 'Boolean(document.querySelector("#demo-h1 [role=tab]"))'));
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/tabs`});
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        if ('${scenario.kind}' === 'exact') {
          document.querySelector('[data-showcase-exact-reference-toggle] button')?.click();
        }
      })()`);
      if (scenario.kind === 'exact') {
        await waitFor(() => evaluate(client, 'Boolean(document.querySelector("app-review-exact-core-showcase"))'));
      }
      await evaluate(client, `(() => {
        const specimen = '${scenario.kind}' === 'exact'
          ? document.querySelector('[data-tabs-specimen="demo-h1"]')
          : document.querySelector('[data-showcase-target]');
        specimen?.scrollIntoView({block: 'center'});
        if ('${scenario.kind}' === 'live') specimen?.querySelectorAll('[role="tab"]')?.[1]?.click();
      })()`);
    }
    await new Promise((resolve) => setTimeout(resolve, 450));

    const measurement = await evaluate(client, `(() => {
      const reference = ${JSON.stringify(scenario.kind === 'reference')};
      const exact = ${JSON.stringify(scenario.kind === 'exact')};
      const root = reference ? document.querySelector('#demo-h1')
        : exact ? document.querySelector('[data-tabs-specimen="demo-h1"]')
          : document.querySelector('[data-showcase-target]');
      const verticalRoot = reference ? document.querySelector('#demo-v1')
        : exact ? document.querySelector('[data-tabs-specimen="demo-v1"]') : null;
      const list = root?.querySelector('[role="tablist"]');
      const tab = root?.querySelector('[role="tab"]');
      const button = reference ? tab : tab?.querySelector('button') ?? tab;
      const indicator = root?.querySelector('.erp-tabs__indicator, .tabs__indicator');
      const verticalList = verticalRoot?.querySelector('[role="tablist"]');
      const verticalTab = verticalRoot?.querySelector('[role="tab"]');
      const verticalIndicator = verticalRoot?.querySelector('.erp-tabs__indicator, .tabs__indicator');
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      const style = (element) => element ? getComputedStyle(element) : null;
      const tabStyle = style(button);
      const overflowOffenders = [...document.querySelectorAll('*')].map((element) => {
        const value = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className.slice(0, 100) : '',
          x: value.x,
          right: value.right,
          width: value.width,
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      }).filter((value) => value.x < -1 || value.right > innerWidth + 1)
        .sort((left, right) => Math.max(right.right - innerWidth, -right.x)
          - Math.max(left.right - innerWidth, -left.x))
        .slice(0, 12);
      return {
        viewport: {width: innerWidth, height: innerHeight},
        route: location.pathname,
        theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        tabCount: root?.querySelectorAll('[role="tab"]').length ?? 0,
        selectedLabel: root?.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim(),
        horizontal: {list: rect(list), tab: rect(tab), indicator: rect(indicator)},
        vertical: {list: rect(verticalList), tab: rect(verticalTab), indicator: rect(verticalIndicator)},
        computed: tabStyle ? {
          fontSize: tabStyle.fontSize,
          lineHeight: tabStyle.lineHeight,
          fontWeight: tabStyle.fontWeight,
          paddingInline: tabStyle.paddingInline,
          paddingBlock: tabStyle.paddingBlock,
          gap: tabStyle.gap,
          borderRadius: tabStyle.borderRadius,
        } : null,
        pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        overflowOffenders,
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
    referenceSha256: 'CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9',
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
