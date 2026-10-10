import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.AVATAR_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.AVATAR_REFERENCE_URL
  ?? 'file:///C:/Users/Misrtech/Downloads/ERP-AVATAR.html';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-avatar', 'v1-internal-review');

const scenarios = [
  {name: 'reference-1440-light-rtl', kind: 'reference', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'reference-390-dark-rtl', kind: 'reference', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-1440-light-rtl-exact', kind: 'exact', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'implementation-1280-dark-ltr-exact', kind: 'exact', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
  {name: 'implementation-390-dark-rtl-exact', kind: 'exact', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
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

async function waitFor(read, timeoutMs = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out waiting for Avatar evidence state.');
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

async function screenshot(client, fileName, clip = null) {
  const result = await client.command('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: Boolean(clip),
    ...(clip ? {clip} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

async function sectionScreenshot(client, fileName, elementExpression) {
  const clip = await evaluate(client, `(() => {
    const element = ${elementExpression};
    if (!element) return null;
    element.scrollIntoView({block: 'center'});
    const box = element.getBoundingClientRect();
    return {
      x: Math.max(0, box.left - 16),
      y: Math.max(0, box.top + scrollY - 16),
      width: Math.min(document.documentElement.scrollWidth, box.width + 32),
      height: Math.min(1400, box.height + 32),
      scale: 1,
    };
  })()`);
  await new Promise((resolve) => setTimeout(resolve, 200));
  if (clip) await screenshot(client, fileName, clip);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-avatar-evidence-'));
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
      width: scenario.width,
      height: scenario.height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    if (scenario.kind === 'reference') {
      await client.command('Page.navigate', {url: REFERENCE_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await waitFor(() => evaluate(client, 'document.querySelectorAll("#matrix .erp-avatar").length === 18'));
      await evaluate(client, `(() => {
        document.getElementById('btn-${scenario.direction}')?.click();
        document.getElementById('btn-${scenario.theme}')?.click();
        document.querySelector('#matrix')?.scrollIntoView({block: 'start'});
      })()`);
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/avatar`});
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
        await evaluate(client, `document.querySelector('[data-showcase-owner="avatar"]')?.scrollIntoView({block: 'start'})`);
      } else {
        await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block: 'center'})`);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 700));

    const measurement = await evaluate(client, `(() => {
      const reference = ${JSON.stringify(scenario.kind === 'reference')};
      const exact = ${JSON.stringify(scenario.kind === 'exact')};
      const root = reference ? document.querySelector('#matrix')
        : exact ? document.querySelector('[data-showcase-owner="avatar"]')
          : document.querySelector('[data-showcase-target]');
      const avatarSelector = reference ? '.erp-avatar' : 'erp-avatar';
      const matrixRoot = reference ? document.querySelector('#matrix')
        : exact ? document.querySelector('.avatar-reference-size-matrix') : root;
      const avatars = [...(matrixRoot?.querySelectorAll(avatarSelector) ?? [])];
      const rect = (element) => {
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return {x: box.x, y: box.y, width: box.width, height: box.height};
      };
      const style = (element) => {
        if (!element) return null;
        const value = getComputedStyle(element);
        return {
          display: value.display,
          inlineSize: value.inlineSize,
          blockSize: value.blockSize,
          borderWidth: value.borderWidth,
          borderRadius: value.borderRadius,
          fontSize: value.fontSize,
          fontWeight: value.fontWeight,
          lineHeight: value.lineHeight,
          transform: value.transform,
          overflow: value.overflow,
        };
      };
      const data = (element) => ({
        size: element?.getAttribute(reference ? 'data-size' : 'data-avatar-size'),
        shape: element?.getAttribute(reference ? 'data-shape' : 'data-avatar-shape'),
        presence: element?.getAttribute(reference ? 'data-status' : 'data-avatar-presence'),
        presencePosition: element?.getAttribute(reference ? 'data-position' : 'data-avatar-presence-position'),
        host: rect(element),
        hostStyle: style(element),
        frame: rect(element?.querySelector(reference ? '.erp-avatar__frame' : '.avatar__frame')),
        frameStyle: style(element?.querySelector(reference ? '.erp-avatar__frame' : '.avatar__frame')),
        initials: rect(element?.querySelector(reference ? '.erp-avatar__initials' : '.avatar__initials')),
        initialsStyle: style(element?.querySelector(reference ? '.erp-avatar__initials' : '.avatar__initials')),
        icon: rect(element?.querySelector(reference ? '.erp-avatar__icon' : '.avatar__icon')),
        image: rect(element?.querySelector(reference ? '.erp-avatar__image' : '.avatar__image')),
        presenceBox: rect(element?.querySelector(reference ? '.erp-avatar__status' : '.avatar__presence-indicator')),
        presenceStyle: style(element?.querySelector(reference ? '.erp-avatar__status' : '.avatar__presence-indicator')),
      });
      const crop = (element) => {
        const box = element?.getBoundingClientRect();
        if (!box) return null;
        const x = Math.max(0, box.left - 16);
        const y = Math.max(0, box.top + scrollY - 16);
        return {
          x,
          y,
          width: Math.min(document.documentElement.scrollWidth - x, box.width + 32),
          height: Math.min(1400, box.height + 32),
          scale: 1,
        };
      };
      const contentRoot = reference ? document.querySelector('#c-image')?.closest('.grid')
        : exact ? document.querySelector('.avatar-reference-content-types') : root;
      const presenceRoot = reference ? document.querySelector('#c-statuses')
        : exact ? document.querySelector('.avatar-reference-presence-matrix') : null;
      const positionRoot = reference ? document.querySelector('#pos-grid')?.closest('.card')
        : exact ? document.querySelector('[data-avatar-direction-evidence="rtl"]') : null;
      return {
        route: location.pathname,
        viewport: {width: innerWidth, height: innerHeight},
        theme: document.documentElement.dataset.theme ?? null,
        direction: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        matrixCount: avatars.length,
        matrix: avatars.map(data),
        contentCount: contentRoot?.querySelectorAll(avatarSelector).length ?? 0,
        presenceCount: presenceRoot?.querySelectorAll(avatarSelector).length ?? 0,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        crop: crop(root),
        contentCrop: crop(contentRoot),
        presenceCrop: crop(presenceRoot),
        positionCrop: crop(positionRoot),
      };
    })()`);
    measurement.name = scenario.name;
    measurement.diagnostics = [...client.diagnostics];
    measurements.push(measurement);

    await screenshot(client, `${scenario.name}-full.png`);
    if (measurement.crop) await screenshot(client, `${scenario.name}-crop.png`, measurement.crop);
    if (scenario.kind !== 'live') {
      const reference = scenario.kind === 'reference';
      await sectionScreenshot(
        client,
        `${scenario.name}-content.png`,
        reference
          ? `document.querySelector('#c-image')?.closest('.grid')`
          : `document.querySelector('.avatar-reference-content-types')`,
      );
      await sectionScreenshot(
        client,
        `${scenario.name}-presence.png`,
        reference
          ? `document.querySelector('#c-statuses')`
          : `document.querySelector('.avatar-reference-presence-matrix')`,
      );
      await sectionScreenshot(
        client,
        `${scenario.name}-positions.png`,
        reference
          ? `document.querySelector('#pos-grid')?.closest('.card')`
          : `document.querySelector('[data-avatar-direction-evidence="rtl"]')`,
      );
    }
  }

  const implementationExact = measurements.filter((entry) => entry.name.includes('implementation-') && entry.name.includes('-exact'));
  const referenceDesktop = measurements.find((entry) => entry.name === 'reference-1440-light-rtl');
  const implementationDesktop = measurements.find((entry) => entry.name === 'implementation-1440-light-rtl-exact');
  const implementationNarrow = measurements.find((entry) => entry.name === 'implementation-390-dark-rtl-exact');
  const bySize = (entry, size, shape = 'circle') => entry.matrix.find((avatar) => avatar.size === size && avatar.shape === shape);
  const expectedDesktop = {xs: 24, sm: 30, md: 38, lg: 50, xl: 68, '2xl': 88};
  const expectedNarrow = {xs: 24, sm: 30, md: 38, lg: 50, xl: 58, '2xl': 72};
  const assertions = [];
  for (const entry of [referenceDesktop, implementationDesktop]) {
    for (const [size, expected] of Object.entries(expectedDesktop)) {
      const actual = bySize(entry, size)?.host.width;
      assertions.push({scenario: entry.name, property: `${size} size`, expected, actual, delta: actual - expected, pass: Math.abs(actual - expected) <= 0.5});
    }
  }
  for (const [size, expected] of Object.entries(expectedNarrow)) {
    const actual = bySize(implementationNarrow, size)?.host.width;
    assertions.push({scenario: implementationNarrow.name, property: `${size} narrow size`, expected, actual, delta: actual - expected, pass: Math.abs(actual - expected) <= 0.5});
  }
  for (const entry of measurements) {
    assertions.push({scenario: entry.name, property: 'broken images', expected: 0, actual: entry.brokenImages.length, delta: entry.brokenImages.length, pass: entry.brokenImages.length === 0});
    assertions.push({scenario: entry.name, property: 'browser diagnostics', expected: 0, actual: entry.diagnostics.length, delta: entry.diagnostics.length, pass: entry.diagnostics.length === 0});
    if (entry.name.includes('implementation-')) {
      assertions.push({scenario: entry.name, property: 'horizontal overflow', expected: 0, actual: entry.horizontalOverflow, delta: entry.horizontalOverflow, pass: entry.horizontalOverflow === 0});
      assertions.push({scenario: entry.name, property: 'primary showcase targets', expected: 1, actual: entry.primaryTargetCount, delta: entry.primaryTargetCount - 1, pass: entry.primaryTargetCount === 1});
    }
  }
  for (const entry of implementationExact) {
    assertions.push({scenario: entry.name, property: 'reference size matrix count', expected: 18, actual: entry.matrixCount, delta: entry.matrixCount - 18, pass: entry.matrixCount === 18});
  }

  const result = {
    generatedAt: new Date().toISOString(),
    reference: {path: 'C:/Users/Misrtech/Downloads/ERP-AVATAR.html', sha256: '2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA'},
    scenarios: measurements,
    assertions,
    summary: {total: assertions.length, passed: assertions.filter((entry) => entry.pass).length, failed: assertions.filter((entry) => !entry.pass)},
  };
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(result, null, 2)}\n`);
  if (result.summary.failed.length) throw new Error(`Avatar evidence failed: ${JSON.stringify(result.summary.failed)}`);
  client.close();
  process.stdout.write(`${JSON.stringify(result.summary, null, 2)}\n`);
} finally {
  chrome.kill();
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    await fs.rm(profile, {recursive: true, force: true, maxRetries: 5, retryDelay: 200});
  } catch (error) {
    process.stderr.write(`Avatar evidence temporary profile cleanup warning: ${error.message}\n`);
  }
}
