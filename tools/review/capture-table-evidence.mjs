import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.TABLE_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = process.env.TABLE_REFERENCE_URL
  ?? 'http://127.0.0.1:8766/ERP-TABLE.html';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-table', 'v2-internal-review');

const specimens = [
  ['full', 'full-featured'],
  ['fixed', 'fixed-height'],
  ['compact', 'compact'],
  ['click', 'clickable'],
  ['vertical', 'vertical'],
  ['headers', 'header-types'],
];
const scenarios = specimens.flatMap(([referenceId, implementationId]) => [
  {name: `reference-${referenceId}-1440-light-rtl`, kind: 'reference', referenceId, implementationId, width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: `implementation-${implementationId}-1440-light-rtl`, kind: 'implementation', referenceId, implementationId, width: 1440, height: 900, theme: 'light', direction: 'rtl'},
]);
scenarios.push(
  {name: 'reference-full-390-dark-rtl', kind: 'reference', referenceId: 'full', implementationId: 'full-featured', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-full-390-dark-rtl', kind: 'implementation', referenceId: 'full', implementationId: 'full-featured', width: 390, height: 844, theme: 'dark', direction: 'rtl'},
  {name: 'implementation-live-320-light-ltr', kind: 'live', referenceId: 'full', implementationId: 'full-featured', width: 320, height: 568, theme: 'light', direction: 'ltr'},
  {name: 'implementation-full-state-1280-dark-ltr', kind: 'implementation-state', referenceId: 'full', implementationId: 'full-featured', width: 1280, height: 900, theme: 'dark', direction: 'ltr'},
);

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
  throw new Error('Timed out waiting for Table evidence state.');
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

async function capture(client, name, crop) {
  const screenshot = await client.command('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: Boolean(crop),
    ...(crop ? {clip: {...crop, scale: 1}} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, `${name}.png`), Buffer.from(screenshot.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-table-evidence-'));
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
        const rtl = document.getElementById('btn-${scenario.direction}');
        if (rtl?.getAttribute('aria-pressed') !== 'true') rtl?.click();
        const theme = document.getElementById('btn-${scenario.theme}');
        if (theme?.getAttribute('aria-pressed') !== 'true') theme?.click();
        document.querySelector('#demo-${scenario.referenceId}')?.scrollIntoView({block: 'center'});
      })()`);
      await waitFor(() => evaluate(client, `Boolean(document.querySelector('#demo-${scenario.referenceId} .erp-table'))`));
    } else {
      await client.command('Page.navigate', {url: APP_URL});
      await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
      await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
      await client.command('Page.navigate', {url: `${APP_URL}/components/table`});
      await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
      await evaluate(client, `(() => {
        document.documentElement.dir = '${scenario.direction}';
        document.body.dir = '${scenario.direction}';
        if ('${scenario.kind}' !== 'live') {
          document.querySelector('[data-showcase-exact-reference-toggle] button')?.click();
        }
      })()`);
      if (scenario.kind !== 'live') {
        await waitFor(() => evaluate(client, 'Boolean(document.querySelector("app-review-exact-core-showcase"))'));
        await evaluate(client, `document.querySelector('[data-table-specimen="${scenario.implementationId}"]')?.scrollIntoView({block: 'center'})`);
      } else {
        await evaluate(client, 'document.querySelector("[data-showcase-target]")?.scrollIntoView({block: "center"})');
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (scenario.kind === 'implementation-state') {
      await evaluate(client, `(() => {
        const root = document.querySelector('[data-table-specimen="full-featured"]');
        root?.querySelector('tbody input[type="checkbox"]')?.click();
        root?.querySelector('erp-column-chooser button')?.click();
      })()`);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    const measurement = await evaluate(client, `(() => {
      const kind = ${JSON.stringify(scenario.kind)};
      const reference = kind === 'reference';
      const live = kind === 'live';
      const root = reference
        ? document.querySelector('#demo-${scenario.referenceId} .erp-table')
        : live ? document.querySelector('[data-showcase-target] erp-table') ?? document.querySelector('[data-showcase-target]')
          : document.querySelector('[data-table-specimen="${scenario.implementationId}"] .table-review__reference-frame')
            ?? document.querySelector('[data-table-specimen="${scenario.implementationId}"] erp-table');
      const tableOwner = reference ? root : root?.querySelector('erp-table') ?? root;
      const rect = (element) => {
        if (!element) return null;
        const value = element.getBoundingClientRect();
        return {x: value.x, y: value.y, width: value.width, height: value.height};
      };
      const css = (element, property) => element ? getComputedStyle(element)[property] : null;
      const toolbar = reference ? root?.querySelector('.erp-table__toolbar') : root?.querySelector('erp-table-toolbar');
      const viewport = reference ? root?.querySelector('.erp-table__scroll') : root?.querySelector('erp-table-viewport .scroll');
      const header = root?.querySelector('thead tr');
      const row = root?.querySelector('tbody tr');
      const footer = reference ? root?.querySelector('.erp-table__footer') : root?.querySelector('erp-pagination');
      const checkbox = reference ? root?.querySelector('.erp-table__checkbox') : root?.querySelector('table erp-check-box .check-box__box');
      const photo = reference ? root?.querySelector('.erp-table__photo') : root?.querySelector('erp-avatar');
      const photoWrap = reference ? root?.querySelector('.erp-table__photo-wrap') : root?.querySelector('.table-review__photo-cell');
      const badge = reference ? root?.querySelector('.erp-table__tag') : root?.querySelector('erp-status-badge');
      const action = reference ? root?.querySelector('.erp-table__icon-btn') : root?.querySelector('erp-icon-button button');
      const search = reference ? root?.querySelector('.erp-table__search input') : root?.querySelector('erp-search-box input');
      const chooser = reference ? root?.querySelector('.erp-table__tool-btn') : root?.querySelector('erp-column-chooser button');
      const chooserPopover = reference ? root?.querySelector('.erp-table__columns-popover') : root?.querySelector('erp-column-chooser [popover], erp-column-chooser .column-chooser__surface');
      const pageOverflow = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const targetRect = rect(root);
      const crop = targetRect ? {
        x: Math.max(0, targetRect.x + scrollX - 12),
        y: Math.max(0, targetRect.y + scrollY - 12),
        width: Math.min(document.documentElement.scrollWidth, targetRect.width + 24),
        height: Math.min(1100, targetRect.height + 24),
      } : null;
      return {
        viewport: {width: innerWidth, height: innerHeight},
        route: location.pathname,
        theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        exactExperienceCount: document.querySelectorAll('[data-table-reference-experience="complete"]').length,
        geometry: {
          root: rect(root), toolbar: rect(toolbar), tableViewport: rect(viewport),
          header: rect(header), row: rect(row), footer: rect(footer), checkbox: rect(checkbox),
          photo: rect(photo), photoWrap: rect(photoWrap), badge: rect(badge), action: rect(action), search: rect(search),
          chooser: rect(chooser), chooserPopover: rect(chooserPopover),
        },
        computed: {
          rootBorderWidth: css(root, 'borderTopWidth'),
          rootRadius: css(root, 'borderRadius'),
          headerLineHeight: header?.firstElementChild ? css(header.firstElementChild, 'lineHeight') : null,
          cellLineHeight: row?.firstElementChild ? css(row.firstElementChild, 'lineHeight') : null,
          searchLineHeight: css(search, 'lineHeight'),
          chooserLineHeight: css(chooser, 'lineHeight'),
          headerPadding: header?.firstElementChild ? css(header.firstElementChild, 'paddingBlock') + ' ' + css(header.firstElementChild, 'paddingInline') : null,
          cellPadding: row?.firstElementChild ? css(row.firstElementChild, 'paddingBlock') + ' ' + css(row.firstElementChild, 'paddingInline') : null,
          rowTransition: css(row, 'transition'),
          viewportOverflowX: css(viewport, 'overflowX'),
          viewportOverflowY: css(viewport, 'overflowY'),
        },
        selectedRows: root?.querySelectorAll('tbody tr[aria-selected="true"], tbody tr.is-selected').length ?? 0,
        chooserOpen: Boolean(chooserPopover && (chooserPopover.matches(':popover-open') || chooserPopover.classList.contains('is-open'))),
        verticalCellHeights: [...(root?.querySelectorAll('tbody tr:first-child td') ?? [])]
          .map((cell) => cell.getBoundingClientRect().height),
        pageHorizontalOverflow: pageOverflow,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        crop,
      };
    })()`);
    measurements.push({name: scenario.name, ...measurement, diagnostics: [...client.diagnostics]});
    await capture(client, scenario.name);
    if (measurement.crop) await capture(client, `${scenario.name}-crop`, measurement.crop);
  }

  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify({
    capturedAt: new Date().toISOString(),
    referenceUrl: REFERENCE_URL,
    referenceSha256: '292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1',
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
