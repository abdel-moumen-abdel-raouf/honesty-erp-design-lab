import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.AVATAR_PICKER_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.AVATAR_PICKER_REFERENCE_URL
  ?? 'file:///C:/Users/Misrtech/Downloads/ERP-AVATAR-PICKER.html';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-avatar-picker', 'v1-internal-review');

const scenarios = [
  {name: 'reference-1440-light-rtl-default', kind: 'reference', width: 1440, height: 900, theme: 'light', direction: 'rtl', state: 'default'},
  {name: 'implementation-1440-light-rtl-default', kind: 'implementation', width: 1440, height: 900, theme: 'light', direction: 'rtl', state: 'default'},
  {name: 'reference-1280-dark-ltr-selected', kind: 'reference', width: 1280, height: 900, theme: 'dark', direction: 'ltr', state: 'selected'},
  {name: 'implementation-1280-dark-ltr-selected', kind: 'implementation', width: 1280, height: 900, theme: 'dark', direction: 'ltr', state: 'selected'},
  {name: 'reference-390-dark-rtl-selected', kind: 'reference', width: 390, height: 844, theme: 'dark', direction: 'rtl', state: 'selected'},
  {name: 'implementation-390-dark-rtl-selected', kind: 'implementation', width: 390, height: 844, theme: 'dark', direction: 'rtl', state: 'selected'},
  {name: 'implementation-320-light-ltr-empty', kind: 'implementation', width: 320, height: 568, theme: 'light', direction: 'ltr', state: 'empty'},
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
  throw new Error('Timed out waiting for AvatarPicker evidence state.');
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
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-avatar-picker-evidence-'));
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
      await waitFor(() => evaluate(client, 'document.querySelectorAll(".erp-avatar-picker__item").length === 30'));
      await evaluate(client, `(() => {
        document.getElementById('btn-${scenario.direction}')?.click();
        document.getElementById('btn-${scenario.theme}')?.click();
        if (${scenario.width >= 768}) {
          document.getElementById('picker-host').style.width = '520px';
        }
        document.querySelector('.erp-avatar-picker')?.scrollIntoView({block: 'center'});
      })()`);
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/avatar-picker`});
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target] erp-avatar-picker-tile").length === 60'));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        document.querySelector('[data-showcase-target]')?.scrollIntoView({block: 'center'});
      })()`);
    }
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (scenario.state === 'selected') {
      await evaluate(client, `(() => {
        const root = document.querySelector('${scenario.kind === 'reference' ? '.erp-avatar-picker' : '[data-showcase-target]'}');
        root?.querySelector('${scenario.kind === 'reference' ? '.erp-avatar-picker__item' : 'erp-avatar-picker-tile button'}')?.click();
      })()`);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (scenario.state === 'empty') {
      await evaluate(client, `(() => {
        const input = document.querySelector('[data-showcase-target] erp-search-box input');
        if (!input) return;
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(input, '__no_avatar_matches__');
        input.dispatchEvent(new Event('input', {bubbles: true}));
      })()`);
      await waitFor(() => evaluate(client, 'Boolean(document.querySelector("[data-showcase-target] erp-empty-state"))'));
    }

    const measurement = await evaluate(client, `(() => {
      const reference = ${JSON.stringify(scenario.kind === 'reference')};
      const root = document.querySelector(reference ? '.erp-avatar-picker' : '[data-showcase-target]');
      const one = (referenceSelector, implementationSelector) => root?.querySelector(reference ? referenceSelector : implementationSelector);
      const all = (referenceSelector, implementationSelector) => [...(root?.querySelectorAll(reference ? referenceSelector : implementationSelector) ?? [])];
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
          gap: value.gap,
          padding: value.padding,
          paddingBlock: value.paddingBlock,
          paddingInline: value.paddingInline,
          margin: value.margin,
          borderWidth: value.borderWidth,
          borderRadius: value.borderRadius,
          maxBlockSize: value.maxBlockSize,
          overflowX: value.overflowX,
          overflowY: value.overflowY,
          gridTemplateColumns: value.gridTemplateColumns,
          fontSize: value.fontSize,
          lineHeight: value.lineHeight,
          transform: value.transform,
          inlineSize: value.inlineSize,
          maxInlineSize: value.maxInlineSize,
        };
      };
      const surface = root;
      const header = one('.erp-avatar-picker__header', '.avatar-picker__header');
      const tabs = one('.erp-avatar-picker__tabs', '.avatar-picker__tabs');
      const tab = one('.erp-avatar-picker__tab', 'erp-tab-trigger');
      const search = one('.erp-avatar-picker__search', '.avatar-picker__search');
      const searchInput = one('.erp-avatar-picker__search input', 'erp-search-box input');
      const grid = one('.erp-avatar-picker__grid', '.avatar-picker__grid');
      const tile = one('.erp-avatar-picker__item', 'erp-avatar-picker-tile');
      const tileButton = reference ? tile : tile?.querySelector('button');
      const selected = one('.erp-avatar-picker__item.is-selected', 'erp-avatar-picker-tile[data-avatar-picker-tile-selected="true"]');
      const check = selected?.querySelector(reference ? '.erp-avatar-picker__item-check' : '.avatar-picker-tile__check');
      const footer = one('.erp-avatar-picker__footer', '.avatar-picker__footer');
      const preview = one('.erp-avatar-picker__preview-image', '.avatar-picker__preview erp-avatar');
      const cancel = one('[data-cancel]', '.avatar-picker__actions erp-button:first-child button');
      const confirm = one('[data-confirm]', '.avatar-picker__actions erp-button:last-child button');
      const crop = (() => {
        const box = surface?.getBoundingClientRect();
        if (!box) return null;
        return {
          x: Math.max(0, box.left - 16),
          y: Math.max(0, box.top + scrollY - 16),
          width: Math.min(document.documentElement.scrollWidth, box.width + 32),
          height: Math.min(1500, box.height + 32),
          scale: 1,
        };
      })();
      const counts = all('.erp-avatar-picker__count', 'erp-tabs .tabs__count').map((element) => element.textContent?.trim());
      return {
        viewport: {width: innerWidth, height: innerHeight},
        theme: document.documentElement.dataset.theme ?? null,
        direction: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        exactReferenceToggleCount: document.querySelectorAll('[data-showcase-exact-reference-toggle]').length,
        surface: {box: rect(surface), style: style(surface), offsetWidth: surface?.offsetWidth ?? 0, offsetHeight: surface?.offsetHeight ?? 0},
        header: {box: rect(header), style: style(header)},
        tabs: {box: rect(tabs), style: style(tabs)},
        tab: {box: rect(tab), style: style(tab)},
        search: {box: rect(search), style: style(search)},
        searchInput: {box: rect(searchInput), style: style(searchInput)},
        grid: {box: rect(grid), style: style(grid), clientHeight: grid?.clientHeight ?? 0, scrollHeight: grid?.scrollHeight ?? 0},
        tile: {box: rect(tile), buttonBox: rect(tileButton), style: style(tileButton)},
        selected: {box: rect(selected), checkBox: rect(check), checkStyle: style(check)},
        footer: {box: rect(footer), style: style(footer)},
        preview: {box: rect(preview), style: style(preview)},
        cancel: {box: rect(cancel), disabled: cancel?.disabled ?? null},
        confirm: {box: rect(confirm), disabled: confirm?.disabled ?? null},
        tileCount: all('.erp-avatar-picker__item', 'erp-avatar-picker-tile').length,
        counts,
        emptyVisible: Boolean(one('.erp-avatar-picker__empty', 'erp-empty-state')),
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
        crop,
      };
    })()`);
    measurement.name = scenario.name;
    measurement.state = scenario.state;
    measurement.diagnostics = [...client.diagnostics];
    measurements.push(measurement);
    await screenshot(client, `${scenario.name}-full.png`);
    if (measurement.crop) await screenshot(client, `${scenario.name}-picker.png`, measurement.crop);
  }

  const assertions = [];
  const implementation = measurements.filter((entry) => entry.name.startsWith('implementation-'));
  const desktopReference = measurements.find((entry) => entry.name === 'reference-1440-light-rtl-default');
  const desktopImplementation = measurements.find((entry) => entry.name === 'implementation-1440-light-rtl-default');
  const compare = (property, referenceValue, implementationValue, tolerance = 0.5) => {
    const delta = implementationValue - referenceValue;
    assertions.push({property, reference: referenceValue, implementation: implementationValue, delta, pass: Math.abs(delta) <= tolerance});
  };
  compare('desktop surface width', desktopReference.surface.box.width, desktopImplementation.surface.box.width);
  compare('desktop surface radius', Number.parseFloat(desktopReference.surface.style.borderRadius), Number.parseFloat(desktopImplementation.surface.style.borderRadius));
  compare('desktop surface border', Number.parseFloat(desktopReference.surface.style.borderWidth), Number.parseFloat(desktopImplementation.surface.style.borderWidth));
  compare('desktop tabs height', desktopReference.tabs.box.height, desktopImplementation.tabs.box.height);
  compare('desktop tab height', desktopReference.tab.box.height, desktopImplementation.tab.box.height);
  compare('desktop grid gap', Number.parseFloat(desktopReference.grid.style.gap), Number.parseFloat(desktopImplementation.grid.style.gap));
  compare('desktop grid client height', desktopReference.grid.clientHeight, desktopImplementation.grid.clientHeight);
  compare('desktop tile border', Number.parseFloat(desktopReference.tile.style.borderWidth), Number.parseFloat(desktopImplementation.tile.style.borderWidth));
  compare('desktop tile radius', Number.parseFloat(desktopReference.tile.style.borderRadius), Number.parseFloat(desktopImplementation.tile.style.borderRadius));
  assertions.push({
    property: 'desktop footer block padding',
    sourceContract: 12,
    renderedReference: Number.parseFloat(desktopReference.footer.style.paddingBlock),
    implementation: Number.parseFloat(desktopImplementation.footer.style.paddingBlock),
    pass: Number.parseFloat(desktopImplementation.footer.style.paddingBlock) === 12,
    note: 'The live reference contains an unresolved --erp-pad typo; the embedded source contract specifies 12px block padding.',
  });
  compare('desktop preview size', desktopReference.preview.box.width, desktopImplementation.preview.box.width);
  for (const entry of implementation) {
    assertions.push({property: `${entry.name} target count`, expected: 1, actual: entry.primaryTargetCount, pass: entry.primaryTargetCount === 1});
    assertions.push({property: `${entry.name} exact reference toggle`, expected: 1, actual: entry.exactReferenceToggleCount, pass: entry.exactReferenceToggleCount === 1});
    assertions.push({property: `${entry.name} page overflow`, expected: 0, actual: entry.horizontalOverflow, pass: entry.horizontalOverflow === 0});
    assertions.push({property: `${entry.name} broken images`, expected: 0, actual: entry.brokenImages.length, pass: entry.brokenImages.length === 0});
    assertions.push({property: `${entry.name} diagnostics`, expected: 0, actual: entry.diagnostics.length, pass: entry.diagnostics.length === 0});
  }
  assertions.push({property: 'male catalog count', expected: 60, actual: desktopImplementation.tileCount, pass: desktopImplementation.tileCount === 60});
  assertions.push({property: 'gender count labels', expected: '60,56', actual: desktopImplementation.counts.join(','), pass: desktopImplementation.counts.join(',') === '60,56'});
  const empty = measurements.find((entry) => entry.name === 'implementation-320-light-ltr-empty');
  assertions.push({property: 'empty search evidence', expected: true, actual: empty.emptyVisible, pass: empty.emptyVisible});

  const result = {
    generatedAt: new Date().toISOString(),
    reference: {path: 'C:/Users/Misrtech/Downloads/ERP-AVATAR-PICKER.html', sha256: '24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66'},
    scenarios: measurements,
    assertions,
    summary: {total: assertions.length, passed: assertions.filter((entry) => entry.pass).length, failed: assertions.filter((entry) => !entry.pass)},
  };
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(result.summary, null, 2)}\n`);
  client.close();
} finally {
  chrome.kill();
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    await fs.rm(profile, {recursive: true, force: true, maxRetries: 5, retryDelay: 200});
  } catch (error) {
    process.stderr.write(`AvatarPicker evidence temporary profile cleanup warning: ${error.message}\n`);
  }
}
