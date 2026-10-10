import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-search-combo', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = ['search-box', 'combo-box'].flatMap((component) => [
  {name: `${component}-1440-light-rtl`, component, width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: `${component}-390-dark-ltr`, component, width: 390, height: 844, theme: 'dark', direction: 'ltr'},
]);
const expectedControls = {'search-box': 37, 'combo-box': 26};
const expectedInitialValues = {'search-box': 'invoice-1042', 'combo-box': 'supplier-27'};
const expectedCommittedValues = {'search-box': 'customer-alnoor', 'combo-box': 'supplier-42'};

async function waitFor(predicate, timeout = 15_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const value = await predicate();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 75));
  }
  throw new Error('Timed out waiting for browser state.');
}

async function connect(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, {once: true});
    socket.addEventListener('error', reject, {once: true});
  });
  let nextId = 0;
  const pending = new Map();
  const diagnostics = [];
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) {
      diagnostics.push(`${message.params.type}: ${message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ')}`);
    }
    if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params.entry.level)) {
      diagnostics.push(`${message.params.entry.level}: ${message.params.entry.text}`);
    }
    if (message.method === 'Runtime.exceptionThrown') diagnostics.push(`exception: ${message.params.exceptionDetails.text}`);
  });
  return {
    diagnostics,
    command(method, params = {}) {
      const id = ++nextId;
      socket.send(JSON.stringify({id, method, params}));
      return new Promise((resolve, reject) => pending.set(id, {resolve, reject}));
    },
    close() { socket.close(); },
  };
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function screenshot(client, fileName, clip = null) {
  const result = await client.command('Page.captureScreenshot', {
    format: 'png', fromSurface: true, captureBeyondViewport: false, ...(clip ? {clip} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-search-combo-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--disable-background-timer-throttling',
  '--disable-renderer-backgrounding', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', APP_URL,
], {stdio: 'ignore'});

try {
  const port = await waitFor(async () => {
    try { return Number((await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split(/\r?\n/u)[0]); }
    catch { return 0; }
  });
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const client = await connect(targets.find((entry) => entry.type === 'page').webSocketDebuggerUrl);
  await client.command('Page.enable');
  await client.command('Page.bringToFront');
  await client.command('Emulation.setFocusEmulationEnabled', {enabled: true});
  await client.command('Runtime.enable');
  await client.command('Log.enable');
  const results = [];

  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {
      width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: scenario.width < 600,
    });
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
    await waitFor(() => evaluate(client, `Boolean(document.querySelector('[data-showcase-target]')?.querySelector(${JSON.stringify(scenario.component === 'search-box' ? '.search-box__trigger button' : 'input')}))`));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}'; document.body.dir = '${scenario.direction}';
      document.documentElement.style.direction = '${scenario.direction}'; document.body.style.direction = '${scenario.direction}';
      const target = document.querySelector('[data-showcase-target]');
      const control = target.querySelector(${JSON.stringify(scenario.component === 'search-box' ? '.search-box__trigger button' : 'input')});
      control?.click();
    })()`);
    if (scenario.component === 'search-box') {
      await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: false});
      await waitFor(() => evaluate(client, 'Boolean(document.querySelector(".search-box__popup:popover-open"))'));
      await new Promise((resolve) => setTimeout(resolve, 350));
    } else {
      await waitFor(() => evaluate(client, 'document.querySelector(".erp-ol")?.getAttribute("data-overlay-phase") === "open"'));
    }

    const openMeasurement = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const surface = document.querySelector(${JSON.stringify(scenario.component === 'search-box' ? '.search-box__popup:popover-open' : '.erp-os')});
      const scrollOwner = ${scenario.component === 'search-box' ? "surface.querySelector('.search-box__results')" : "surface.querySelector('.overlay-frame__body')"};
      const targetBox = target.getBoundingClientRect(); const surfaceBox = surface.getBoundingClientRect();
      const initialValue = ${scenario.component === 'search-box' ? "target.querySelector('.search-box__trigger')?.textContent?.trim()" : "target.getAttribute('data-combo-box-value')"};
      return {
        name: ${JSON.stringify(scenario.name)}, component: ${JSON.stringify(scenario.component)},
        viewport: {width: innerWidth, height: innerHeight}, theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir, computedDirection: getComputedStyle(target).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        controlCount: document.querySelectorAll('[data-showcase-control-panel] [data-showcase-control]').length,
        initialValue, targetBox: {x: targetBox.x, y: targetBox.y, width: targetBox.width, height: targetBox.height},
        surfaceBox: {x: surfaceBox.x, y: surfaceBox.y, width: surfaceBox.width, height: surfaceBox.height, right: surfaceBox.right, bottom: surfaceBox.bottom},
        surfaceScroll: {clientHeight: surface.clientHeight, scrollHeight: surface.scrollHeight, overflowY: getComputedStyle(surface).overflowY},
        contentScroll: {clientHeight: scrollOwner.clientHeight, scrollHeight: scrollOwner.scrollHeight, overflowY: getComputedStyle(scrollOwner).overflowY},
        resultCount: ${scenario.component === 'search-box' ? "surface.querySelectorAll('[data-search-result]').length" : "surface.querySelectorAll('[data-item-option]').length"},
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      };
    })()`);
    await screenshot(client, `${scenario.name}-open-full.png`);
    const surfaceClip = await evaluate(client, `(() => { const box = document.querySelector(${JSON.stringify(scenario.component === 'search-box' ? '.search-box__popup:popover-open' : '.erp-os')}).getBoundingClientRect(); const x=Math.max(0,box.x); const y=Math.max(0,box.y); return {x,y,width:Math.min(innerWidth-x,box.width),height:Math.min(innerHeight-y,box.height),scale:1}; })()`);
    await screenshot(client, `${scenario.name}-open-surface.png`, surfaceClip);

    if (scenario.component === 'search-box') {
      await evaluate(client, `document.querySelector('[data-search-result][data-value="customer-alnoor"] button')?.click()`);
      await waitFor(() => evaluate(client, '!document.querySelector(".search-box__popup:popover-open")'));
    } else {
      await evaluate(client, `(() => {
        const item=[...document.querySelectorAll('.erp-os [data-item-option]')].find((entry)=>entry.textContent?.includes('مؤسسة الأفق التجارية'));
        item?.querySelector('button')?.click();
        [...document.querySelectorAll('.erp-os button')].find((button)=>button.textContent?.trim()==='تأكيد')?.click();
      })()`);
      await waitFor(() => evaluate(client, '!document.querySelector(".erp-os")'));
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
    const committed = await evaluate(client, `(() => ({
      value: ${scenario.component === 'search-box' ? "document.querySelector('[data-showcase-event-log]')?.textContent?.includes('customer-alnoor') ? 'customer-alnoor' : null" : "document.querySelector('[data-showcase-target]')?.getAttribute('data-combo-box-value')"},
      eventEvidence: document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? ''
    }))()`);
    Object.assign(openMeasurement, committed, {diagnostics: [...client.diagnostics]});
    results.push(openMeasurement);
    await screenshot(client, `${scenario.name}-committed-full.png`);
  }

  const assertions = [];
  for (const result of results) {
    assertions.push({name: `${result.name} target`, pass: result.primaryTargetCount === 1, actual: result.primaryTargetCount});
    assertions.push({name: `${result.name} controls`, pass: result.controlCount === expectedControls[result.component], actual: result.controlCount});
    assertions.push({name: `${result.name} direction`, pass: result.computedDirection === result.direction, actual: result.computedDirection});
    assertions.push({name: `${result.name} initial value`, pass: result.component === 'search-box' ? result.initialValue.includes('فاتورة المبيعات 1042') : result.initialValue === expectedInitialValues[result.component], actual: result.initialValue});
    assertions.push({name: `${result.name} result inventory`, pass: result.component === 'search-box' ? result.resultCount === 4 : result.resultCount === 3, actual: result.resultCount});
    assertions.push({name: `${result.name} viewport containment`, pass: result.surfaceBox.x >= 0 && result.surfaceBox.y >= 0 && result.surfaceBox.right <= result.viewport.width && result.surfaceBox.bottom <= result.viewport.height, actual: result.surfaceBox});
    assertions.push({name: `${result.name} one outer scroll owner`, pass: result.surfaceScroll.overflowY === 'hidden' && result.surfaceScroll.scrollHeight === result.surfaceScroll.clientHeight, actual: result.surfaceScroll});
    assertions.push({name: `${result.name} value commit`, pass: result.value === expectedCommittedValues[result.component], actual: result.value});
    assertions.push({name: `${result.name} event`, pass: result.eventEvidence.includes(expectedCommittedValues[result.component]), actual: result.eventEvidence});
    assertions.push({name: `${result.name} page overflow`, pass: result.horizontalOverflow === 0, actual: result.horizontalOverflow});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    assertions.push({name: `${result.name} broken images`, pass: result.brokenImages === 0, actual: result.brokenImages});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt: new Date().toISOString(), authority: 'Original Honesty ERP candidates; no binding component-specific external reference is recorded.', scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  if (chrome.exitCode === null) await Promise.race([new Promise((resolve) => chrome.once('exit', resolve)), new Promise((resolve) => setTimeout(resolve, 2_000))]);
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try { await fs.rm(profile, {recursive: true, force: true}); break; }
    catch (error) {
      if (error?.code !== 'EBUSY' || attempt === 9) throw error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
}
