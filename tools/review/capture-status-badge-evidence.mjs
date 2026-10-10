import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.STATUS_BADGE_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.STATUS_BADGE_REFERENCE_URL
  ?? 'http://127.0.0.1:8767/ERP-STATUS-BADGE.html';
const OUTPUT = path.join(
  ROOT,
  'docs',
  'review-evidence',
  'erp-status-badge',
  'v1-internal-review',
);

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

  close() { this.#socket.close(); }
}

async function waitFor(read, timeoutMs = 15_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out waiting for StatusBadge evidence state.');
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

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-status-badge-evidence-'));
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
  const client = new DevToolsClient(
    targets.find((entry) => entry.type === 'page').webSocketDebuggerUrl,
  );
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
      await waitFor(() => evaluate(client, 'document.querySelectorAll("#matrix .erp-badge").length === 32'));
      await evaluate(client, `(() => {
        document.getElementById('btn-${scenario.direction}')?.click();
        document.getElementById('btn-${scenario.theme}')?.click();
        document.querySelector('#matrix')?.scrollIntoView({block: 'start'});
      })()`);
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/status-badge`});
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        if ('${scenario.kind}' === 'exact') {
          document.querySelector('[data-showcase-exact-reference-toggle] button')?.click();
        }
      })()`);
      if (scenario.kind === 'exact') {
        await waitFor(() => evaluate(
          client,
          'Boolean(document.querySelector("app-review-exact-core-showcase"))',
        ));
        await evaluate(client, `document.querySelector(
          '[data-showcase-owner="status-badge"]'
        )?.scrollIntoView({block: 'start'})`);
      } else {
        await evaluate(client, `document.querySelector(
          '[data-showcase-target]'
        )?.scrollIntoView({block: 'center'})`);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    const measurement = await evaluate(client, `(() => {
      const reference = ${JSON.stringify(scenario.kind === 'reference')};
      const exact = ${JSON.stringify(scenario.kind === 'exact')};
      const matrixRoot = reference
        ? document.querySelector('#matrix')
        : exact ? document.querySelector('.status-badge-parity-matrix') : null;
      const sizeRoot = reference
        ? document.querySelector('#sizes-demo')
        : exact ? document.querySelector('.status-badge-size-matrix') : null;
      const anatomyRoot = reference
        ? document.querySelector('#anatomy-dot')?.closest('.grid')
        : exact ? document.querySelector('.status-badge-anatomy-matrix') : null;
      const live = exact ? null : document.querySelector('[data-showcase-target]');
      const badgeSelector = reference ? '.erp-badge' : 'erp-status-badge';
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      const computed = (element) => {
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          display: style.display,
          alignItems: style.alignItems,
          gap: style.gap,
          height: style.height,
          paddingInline: style.paddingInline,
          borderWidth: style.borderWidth,
          borderRadius: style.borderRadius,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          whiteSpace: style.whiteSpace,
          transform: style.transform,
          opacity: style.opacity,
        };
      };
      const badgeData = (element) => ({
        tone: element?.getAttribute(reference ? 'data-status' : 'data-status-badge-tone'),
        variant: element?.getAttribute(reference ? 'data-variant' : 'data-status-badge-variant'),
        size: element?.getAttribute(reference ? 'data-size' : 'data-status-badge-size'),
        box: rect(element),
        computed: computed(element),
        dot: rect(element?.querySelector('.erp-badge__dot, .status-badge__dot')),
        icon: rect(element?.querySelector('.erp-badge__icon, .status-badge__icon')),
        image: rect(element?.querySelector('.erp-badge__image, .status-badge__image')),
        count: rect(element?.querySelector('.erp-badge__count, .status-badge__count')),
        remove: rect(element?.querySelector(
          '.erp-badge__remove, [data-status-badge-action="remove"] button',
        )),
        check: rect(element?.querySelector('.erp-badge__check, .status-badge__check')),
      });
      const matrixBadges = [...(matrixRoot?.querySelectorAll(badgeSelector) ?? [])];
      const sizeBadges = [...(sizeRoot?.querySelectorAll(badgeSelector) ?? [])];
      const anatomyBadges = [...(anatomyRoot?.querySelectorAll(badgeSelector) ?? [])];
      const cropRect = (element) => {
        const box = element?.getBoundingClientRect();
        if (!box) return null;
        const x = Math.max(0, box.left - 16);
        const y = Math.max(0, box.top + scrollY - 16);
        return {
          x,
          y,
          width: Math.min(document.documentElement.scrollWidth - x, box.width + 32),
          height: box.height + 32,
          scale: 1,
        };
      };
      return {
        viewport: {width: innerWidth, height: innerHeight},
        route: location.pathname,
        theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        matrixCount: matrixBadges.length,
        sizeCount: sizeBadges.length,
        anatomyCount: anatomyBadges.length,
        matrixSamples: matrixBadges.map(badgeData),
        sizes: sizeBadges.map(badgeData),
        anatomy: anatomyBadges.map(badgeData),
        live: badgeData(live),
        pageHorizontalOverflow: Math.max(
          0,
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ),
        brokenImages: [...document.images].filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        matrixClip: cropRect(matrixRoot),
        sizesClip: cropRect(sizeRoot),
      };
    })()`);
    measurements.push({
      name: scenario.name,
      ...measurement,
      diagnostics: [...client.diagnostics],
    });
    await screenshot(client, `${scenario.name}-full.png`);
    if (measurement.matrixClip) {
      await screenshot(client, `${scenario.name}-matrix.png`, measurement.matrixClip);
    }
    if (measurement.sizesClip) {
      await screenshot(client, `${scenario.name}-sizes.png`, measurement.sizesClip);
    }
    if (measurement.matrixCount > 0) {
      await evaluate(client, `document.querySelector(
        ${JSON.stringify(scenario.kind === 'reference' ? '#matrix' : '.status-badge-parity-matrix')}
      )?.scrollIntoView({block: 'start'})`);
      await new Promise((resolve) => setTimeout(resolve, 150));
      await screenshot(client, `${scenario.name}-matrix-view.png`);
    }
    if (measurement.sizeCount > 0) {
      await evaluate(client, `document.querySelector(
        ${JSON.stringify(scenario.kind === 'reference' ? '#sizes-demo' : '.status-badge-size-matrix')}
      )?.scrollIntoView({block: 'center'})`);
      await new Promise((resolve) => setTimeout(resolve, 150));
      await screenshot(client, `${scenario.name}-sizes-view.png`);
    }
    if (measurement.anatomyCount > 0) {
      await evaluate(client, `document.querySelector(
        ${JSON.stringify(scenario.kind === 'reference' ? '#anatomy-dot' : '.status-badge-anatomy-matrix')}
      )?.scrollIntoView({block: 'start'})`);
      await new Promise((resolve) => setTimeout(resolve, 150));
      await screenshot(client, `${scenario.name}-anatomy-view.png`);
    }
  }

  const failures = [];
  for (const item of measurements) {
    if (!item.name.startsWith('reference-') && item.primaryTargetCount !== 1) {
      failures.push(`${item.name}: expected one primary target`);
    }
    if (item.name.includes('-exact') && item.matrixCount !== 32) {
      failures.push(`${item.name}: expected 32 matrix badges`);
    }
    if (item.name.includes('-exact') && item.sizeCount !== 4) {
      failures.push(`${item.name}: expected four size badges`);
    }
    if (!item.name.startsWith('reference-') && item.pageHorizontalOverflow !== 0) {
      failures.push(`${item.name}: page horizontal overflow ${item.pageHorizontalOverflow}px`);
    }
    if (item.brokenImages !== 0) failures.push(`${item.name}: broken images`);
    if (!item.name.startsWith('reference-') && item.diagnostics.length) {
      failures.push(`${item.name}: browser diagnostics`);
    }
    if (item.name.includes('-exact')) {
      const expectedSizes = {
        sm: {height: 18, padding: '7px', font: '10px', gap: '4px', radius: '4px', icon: 10},
        md: {height: 22, padding: '9px', font: '11px', gap: '5px', radius: '6px', icon: 12},
        lg: {height: 26, padding: '11px', font: '12px', gap: '6px', radius: '6px', icon: 14},
        xl: {height: 32, padding: '14px', font: '13px', gap: '7px', radius: '8px', icon: 16},
      };
      for (const badge of item.sizes) {
        const expected = expectedSizes[badge.size];
        if (!expected || badge.box.height !== expected.height ||
          badge.computed.paddingInline !== expected.padding ||
          badge.computed.fontSize !== expected.font ||
          badge.computed.gap !== expected.gap ||
          badge.computed.borderRadius !== expected.radius ||
          badge.icon?.width !== expected.icon) {
          failures.push(`${item.name}: ${badge.size} fixed geometry mismatch`);
        }
      }
      const dot = item.anatomy.find((badge) => badge.dot)?.dot;
      const icon = item.anatomy.find((badge) => badge.icon)?.icon;
      const image = item.anatomy.find((badge) => badge.image)?.image;
      const count = item.anatomy.find((badge) => badge.count)?.count;
      const remove = item.anatomy.find((badge) => badge.remove)?.remove;
      if (dot?.width !== 6 || icon?.width !== 12 || image?.width !== 14 ||
        count?.height !== 14 || remove?.height !== 12) {
        failures.push(`${item.name}: md anatomy geometry mismatch`);
      }
    }
  }
  if (failures.length) throw new Error(failures.join('\n'));

  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify({
    capturedAt: new Date().toISOString(),
    referenceUrl: REFERENCE_URL,
    referenceSha256: '654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0',
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
