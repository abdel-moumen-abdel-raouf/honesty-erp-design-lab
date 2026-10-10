import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = process.env.EMPTY_STATE_EVIDENCE_URL
  ?? 'http://127.0.0.1:4200';
const OUTPUT = path.join(
  ROOT,
  'docs',
  'review-evidence',
  'erp-empty-state',
  'v1-internal-review',
);

const scenarios = [
  {
    name: 'empty-state-1440-light-rtl',
    width: 1440,
    height: 900,
    theme: 'light',
    direction: 'rtl',
    variantButton: '1. لا توجد بيانات',
    scrollTarget: '[data-empty-state-reference-evidence]',
    reducedMotion: false,
  },
  {
    name: 'empty-state-1280-dark-ltr-matrix',
    width: 1280,
    height: 900,
    theme: 'dark',
    direction: 'ltr',
    variantButton: '5. مخصص بالكامل',
    scrollTarget: '[data-empty-state-scenario-matrix]',
    reducedMotion: false,
  },
  {
    name: 'empty-state-390-dark-rtl-error',
    width: 390,
    height: 844,
    theme: 'dark',
    direction: 'rtl',
    variantButton: '3. خطأ في التحميل',
    scrollTarget: '[data-empty-state-interactive-preview]',
    reducedMotion: false,
  },
  {
    name: 'empty-state-320-light-ltr-reduced-motion',
    width: 320,
    height: 568,
    theme: 'light',
    direction: 'ltr',
    variantButton: '2. بحث بدون نتائج',
    scrollTarget: '[data-empty-state-interactive-preview]',
    reducedMotion: true,
  },
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
  throw new Error('Timed out waiting for EmptyState evidence state.');
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
const profile = await fs.mkdtemp(
  path.join(os.tmpdir(), 'honesty-empty-state-evidence-'),
);
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
  const targets = await (await fetch(
    `http://127.0.0.1:${port}/json/list`,
  )).json();
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
    await client.command('Emulation.setEmulatedMedia', {
      media: 'screen',
      features: [{
        name: 'prefers-reduced-motion',
        value: scenario.reducedMotion ? 'reduce' : 'no-preference',
      }],
    });
    await client.command('Page.navigate', {url: BASE_URL});
    await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
    await evaluate(
      client,
      `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`,
    );
    await client.command('Page.navigate', {
      url: `${BASE_URL}/components/empty-state`,
    });
    await waitFor(() => evaluate(
      client,
      'document.querySelectorAll("[data-showcase-target]").length === 1',
    ));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}';
      document.body.dir = '${scenario.direction}';
      document.querySelector('[data-empty-state-reference-toggle] button')?.click();
    })()`);
    await waitFor(() => evaluate(
      client,
      'Boolean(document.querySelector("[data-empty-state-reference-evidence]"))',
    ));
    await evaluate(client, `(() => {
      const evidence = document.querySelector('[data-empty-state-reference-evidence]');
      evidence?.setAttribute('dir', '${scenario.direction}');
      const desired = ${JSON.stringify(scenario.variantButton)};
      [...(evidence?.querySelectorAll('button') ?? [])]
        .find((button) => button.textContent?.trim() === desired)?.click();
      document.querySelector(${JSON.stringify(scenario.scrollTarget)})
        ?.scrollIntoView({block: 'start'});
    })()`);
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const measurement = await evaluate(client, `(() => {
      const evidence = document.querySelector('[data-empty-state-reference-evidence]');
      const preview = evidence?.querySelector('[data-empty-state-interactive-preview]');
      const states = [...(evidence?.querySelectorAll('erp-empty-state') ?? [])];
      const illustrations = [...(evidence?.querySelectorAll('.empty-state__illustration') ?? [])];
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      return {
        route: location.pathname,
        viewport: {width: innerWidth, height: innerHeight},
        theme: document.querySelector('.lab-capture-root')?.getAttribute('data-theme'),
        direction: evidence ? getComputedStyle(evidence).direction : null,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        referenceEvidenceCount: document.querySelectorAll('[data-empty-state-reference-evidence]').length,
        stateCount: states.length,
        matrixStateCount: evidence?.querySelectorAll('[data-empty-state-scenario-matrix] erp-empty-state').length ?? 0,
        preview: rect(preview),
        illustrationSizes: illustrations.map((element) => rect(element)),
        lottieSvgCount: evidence?.querySelectorAll('.empty-state-lottie__canvas svg').length ?? 0,
        pageHorizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        clippedVisibleText: [...(evidence?.querySelectorAll('erp-text') ?? [])]
          .filter((element) => element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight)
          .length,
        clippedVisibleTexts: [...(evidence?.querySelectorAll('erp-text') ?? [])]
          .filter((element) => element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight)
          .map((element) => element.textContent?.trim().replace(/\s+/gu, ' ').slice(0, 120)),
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
    `${JSON.stringify({
      capturedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      measurements,
    }, null, 2)}\n`,
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
