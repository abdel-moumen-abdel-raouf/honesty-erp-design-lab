import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = process.env.RADIO_EVIDENCE_URL ?? 'http://127.0.0.1:4200';
const OUTPUT = path.join(
  ROOT,
  'docs',
  'review-evidence',
  'erp-radio-family',
  'v1',
);

const scenarios = [
  {name: 'radio-box-1440-light-rtl', route: 'radio-box', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'radio-box-390-dark-ltr', route: 'radio-box', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'radio-group-1280-dark-ltr', route: 'radio-group', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'radio-group-320-light-rtl', route: 'radio-group', width: 320, height: 568, theme: 'light', direction: 'rtl'},
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
        this.diagnostics.push({
          level: 'error',
          text: message.params.exceptionDetails.text,
        });
      }
      if (message.method === 'Log.entryAdded') {
        const {level, text} = message.params.entry;
        if (level === 'error' || level === 'warning') {
          this.diagnostics.push({level, text});
        }
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
  throw new Error('Timed out waiting for Radio evidence state.');
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

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-radio-evidence-'));
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
      const value = await fs.readFile(
        path.join(profile, 'DevToolsActivePort'),
        'utf8',
      );
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
    await evaluate(
      client,
      `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`,
    );
    await client.command('Page.navigate', {
      url: `${BASE_URL}/components/${scenario.route}`,
    });
    await waitFor(() => evaluate(
      client,
      'document.querySelectorAll("[data-showcase-target]").length === 1',
    ));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}';
      document.body.dir = '${scenario.direction}';
      document.querySelector('[data-radio-reference-toggle] button')?.click();
    })()`);
    await waitFor(() => evaluate(
      client,
      'Boolean(document.querySelector("[data-radio-reference-evidence]"))',
    ));
    await evaluate(
      client,
      `document.querySelector('[data-radio-reference-evidence]')?.setAttribute('dir', '${scenario.direction}')`,
    );
    await evaluate(
      client,
      'document.querySelector("[data-radio-reference-section]")?.scrollIntoView({block: "start"})',
    );
    await new Promise((resolve) => setTimeout(resolve, 400));

    const measurement = await evaluate(client, `(() => {
      const reference = document.querySelector('[data-radio-reference-evidence]');
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      const visuals = [...(reference?.querySelectorAll('.radio-box__visual') ?? [])];
      const radios = [...(reference?.querySelectorAll('input[type="radio"]') ?? [])];
      return {
        route: location.pathname,
        viewport: {width: innerWidth, height: innerHeight},
        theme: document.querySelector('.lab-capture-root')?.getAttribute('data-theme'),
        direction: reference ? getComputedStyle(reference).direction : null,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        reference: rect(reference),
        radioCount: radios.length,
        selectedCount: radios.filter((input) => input.checked).length,
        disabledCount: radios.filter((input) => input.disabled).length,
        controlSizes: visuals.map((element) => rect(element)?.width),
        pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        clippedVisibleText: [...(reference?.querySelectorAll('erp-text') ?? [])]
          .filter((element) => element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight)
          .length,
        brokenImages: [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .length,
      };
    })()`);
    measurements.push({
      name: scenario.name,
      ...measurement,
      diagnostics: [...client.diagnostics],
    });
    const screenshot = await client.command('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    await fs.writeFile(
      path.join(OUTPUT, `${scenario.name}.png`),
      Buffer.from(screenshot.data, 'base64'),
    );
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
  await fs.rm(profile, {recursive: true, force: true, maxRetries: 5});
}
