import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-temporal-inputs', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const components = ['date-box', 'time-box', 'date-time-box', 'date-range-box'];
const scenarios = components.flatMap((id) => [
  {name: `${id}-1440-light-rtl`, id, width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: `${id}-390-dark-ltr`, id, width: 390, height: 844, theme: 'dark', direction: 'ltr'},
]);
const expectedControls = {'date-box': 30, 'time-box': 30, 'date-time-box': 29, 'date-range-box': 29};
const expectedValues = {
  'date-box': {attribute: 'data-date-box-value', value: '2026-10-13'},
  'time-box': {attribute: 'data-time-box-value', value: '10:45'},
  'date-time-box': {attribute: 'data-date-time-box-value', value: '2026-10-13T10:45'},
  'date-range-box': {attribute: 'data-date-range-start', value: '2026-10-03', end: '2026-10-20'},
};

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
      const {resolve, reject} = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
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
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-temporal-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0',
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
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.id}`});
    await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}'; document.body.dir = '${scenario.direction}';
      document.documentElement.style.direction = '${scenario.direction}'; document.body.style.direction = '${scenario.direction}';
      document.querySelector('[data-showcase-target] erp-field-trigger button')?.click();
    })()`);
    await waitFor(() => evaluate(client, 'Boolean(document.querySelector(".erp-os [data-temporal-picker-mode]"))'));
    await waitFor(() => evaluate(client, 'document.querySelector(".erp-ol")?.getAttribute("data-overlay-phase") === "open"'));

    const openMeasurement = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const surface = document.querySelector('.erp-os');
      const body = document.querySelector('.overlay-frame__body');
      const overlay = document.querySelector('.erp-ol');
      const surfaceBox = surface.getBoundingClientRect();
      return {
        name: ${JSON.stringify(scenario.name)}, component: ${JSON.stringify(scenario.id)},
        viewport: {width: innerWidth, height: innerHeight}, theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir, computedDirection: getComputedStyle(target).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        controlCount: document.querySelectorAll('[data-showcase-control-panel] [data-showcase-control]').length,
        pickerMode: document.querySelector('[data-temporal-picker-mode]')?.getAttribute('data-temporal-picker-mode'),
        surfaceBox: {x: surfaceBox.x, y: surfaceBox.y, width: surfaceBox.width, height: surfaceBox.height, right: surfaceBox.right, bottom: surfaceBox.bottom},
        surfaceScroll: {clientHeight: surface.clientHeight, scrollHeight: surface.scrollHeight, overflowY: getComputedStyle(surface).overflowY},
        bodyScroll: {clientHeight: body.clientHeight, scrollHeight: body.scrollHeight, overflowY: getComputedStyle(body).overflowY},
        overlayScroll: {clientHeight: overlay.clientHeight, scrollHeight: overlay.scrollHeight, overflowY: getComputedStyle(overlay).overflowY},
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      };
    })()`);
    await screenshot(client, `${scenario.name}-open-full.png`);
    const surfaceClip = await evaluate(client, `(() => { const box = document.querySelector('.erp-os').getBoundingClientRect(); return {x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.min(innerWidth - Math.max(0, box.x), box.width), height: Math.min(innerHeight - Math.max(0, box.y), box.height), scale: 1}; })()`);
    await screenshot(client, `${scenario.name}-open-overlay.png`, surfaceClip);

    await evaluate(client, `(() => {
      const click = (selector) => document.querySelector(selector)?.click();
      const id = ${JSON.stringify(scenario.id)};
      if (id === 'date-box') click('.calendar-day[data-date="2026-10-13"] button');
      if (id === 'time-box') { click('[data-time-hour][data-selected="false"] button[data-button-state="ready"]'); click('[data-time-minute] button'); }
      if (id === 'date-time-box') { click('.calendar-day[data-date="2026-10-13"] button'); click('[data-time-hour] button'); click('[data-time-minute] button'); }
      if (id === 'date-range-box') { click('.calendar-day[data-date="2026-10-03"] button'); click('.calendar-day[data-date="2026-10-20"] button'); }
      if (id === 'time-box' || id === 'date-time-box') {
        click('[data-time-hour] button');
        const hour = [...document.querySelectorAll('[data-time-hour]')].find((item) => item.textContent?.trim() === '10'); hour?.querySelector('button')?.click();
        const minute = [...document.querySelectorAll('[data-time-minute]')].find((item) => item.textContent?.trim() === '45'); minute?.querySelector('button')?.click();
      }
      click('[data-overlay-frame-action-id="confirm"] button');
    })()`);
    await waitFor(() => evaluate(client, '!document.querySelector(".erp-os")'));
    await new Promise((resolve) => setTimeout(resolve, 250));
    const result = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]'); const box = target.getBoundingClientRect();
      return {targetBox: {x: box.x, y: box.y, width: box.width, height: box.height},
        value: target.getAttribute(${JSON.stringify(expectedValues[scenario.id].attribute)}),
        end: target.getAttribute('data-date-range-end'), eventEvidence: document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? ''};
    })()`);
    Object.assign(openMeasurement, result, {diagnostics: [...client.diagnostics]});
    results.push(openMeasurement);
    await screenshot(client, `${scenario.name}-confirmed-full.png`);
  }

  const assertions = [];
  for (const result of results) {
    const expected = expectedValues[result.component];
    assertions.push({name: `${result.name} target`, pass: result.primaryTargetCount === 1, actual: result.primaryTargetCount});
    assertions.push({name: `${result.name} controls`, pass: result.controlCount === expectedControls[result.component], actual: result.controlCount});
    assertions.push({name: `${result.name} direction`, pass: result.computedDirection === result.direction, actual: result.computedDirection});
    assertions.push({name: `${result.name} picker mode`, pass: result.pickerMode === result.component.replace('-box', '').replace('date-time', 'datetime').replace('date-range', 'range'), actual: result.pickerMode});
    assertions.push({name: `${result.name} viewport containment`, pass: result.surfaceBox.x >= 0 && result.surfaceBox.y >= 0 && result.surfaceBox.right <= result.viewport.width && result.surfaceBox.bottom <= result.viewport.height, actual: result.surfaceBox});
    assertions.push({name: `${result.name} surface scroll ownership`, pass: result.surfaceScroll.overflowY === 'hidden' && result.surfaceScroll.scrollHeight === result.surfaceScroll.clientHeight, actual: result.surfaceScroll});
    assertions.push({name: `${result.name} value commit`, pass: result.value === expected.value && (!expected.end || result.end === expected.end), actual: {value: result.value, end: result.end}});
    assertions.push({name: `${result.name} event`, pass: result.eventEvidence.includes(expected.value), actual: result.eventEvidence});
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
