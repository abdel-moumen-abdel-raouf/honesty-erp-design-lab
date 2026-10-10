import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const REVIEW_ID = process.argv[2] ?? process.env['HONESTY_PLANNED_UI_ID'] ?? 'entity-review';
const CONFIGS = {
  'entity-review': {
    output: 'entity-review-v1',
    owner: 'erp-entity-review',
    itemSelector: '[data-entity-review-field]',
    expectedItems: 4,
  },
  'data-page': {
    output: 'data-page-v1',
    owner: 'erp-data-page',
    itemSelector: 'erp-table tbody tr',
    expectedItems: 3,
  },
};
const CONFIG = CONFIGS[REVIEW_ID];
if (!CONFIG) throw new Error(`Unknown planned UI evidence id: ${REVIEW_ID}`);
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'planned-ui-patterns', CONFIG.output);
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: `${REVIEW_ID}-1440-light-rtl`, width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: `${REVIEW_ID}-390-dark-ltr`, width: 390, height: 844, theme: 'dark', direction: 'ltr'},
];

async function waitFor(predicate, timeout = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const value = await predicate();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 75));
  }
  throw new Error('Timed out waiting for planned UI browser state.');
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
    if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params.entry.level)) diagnostics.push(`${message.params.entry.level}: ${message.params.entry.text}`);
    if (message.method === 'Runtime.exceptionThrown') diagnostics.push(`exception: ${message.params.exceptionDetails.text}`);
  });
  return {diagnostics, command(method, params = {}) { const id = ++nextId; socket.send(JSON.stringify({id, method, params})); return new Promise((resolve, reject) => pending.set(id, {resolve, reject})); }, close() { socket.close(); }};
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function screenshot(client, fileName, clip = null) {
  const result = await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: false, ...(clip ? {clip: {...clip, scale: 1}} : {})});
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-planned-ui-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', APP_URL], {stdio: 'ignore'});

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
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: false});
    await evaluate(client, `localStorage.setItem('honesty-lab-theme','${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${REVIEW_ID}`});
    await waitFor(() => evaluate(client, `document.readyState === 'complete' && document.querySelectorAll('[data-showcase-target]').length === 1`));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'}); })()`);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const measurement = await evaluate(client, `(() => { const target=document.querySelector('[data-showcase-target]'); const root=document.documentElement; const r=target.getBoundingClientRect(); const clipped=Array.from(target.querySelectorAll('erp-text')).filter((element)=>{ const box=element.getBoundingClientRect(); const style=getComputedStyle(element); const intentional=box.width<=2 || box.height<=2 || style.overflow==='visible' || style.textOverflow==='ellipsis' || style.clip!=='auto' || style.clipPath!=='none'; return !intentional && (element.scrollHeight>element.clientHeight+1 || element.scrollWidth>element.clientWidth+1); }).map((element)=>element.textContent?.trim()); return {name:${JSON.stringify(scenario.name)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,ownerCount:document.querySelectorAll(${JSON.stringify(CONFIG.owner)}).length,targetBox:{x:r.x,y:r.y,width:r.width,height:r.height},itemCount:target.querySelectorAll(${JSON.stringify(CONFIG.itemSelector)}).length,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),targetOverflow:Math.max(0,target.scrollWidth-target.clientWidth),clipped}; })()`);
    measurement.diagnostics = [...client.diagnostics];
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
    const padding = 20;
    await screenshot(client, `${scenario.name}-target.png`, {x: Math.max(0, measurement.targetBox.x + measurement.scroll.x - padding), y: Math.max(0, measurement.targetBox.y + measurement.scroll.y - padding), width: Math.min(scenario.width, measurement.targetBox.width + padding * 2), height: Math.min(scenario.height, measurement.targetBox.height + padding * 2)});
  }

  const assertions = results.flatMap((result) => [
    {name: `${result.name} ownership`, pass: result.targetCount === 1 && result.itemCount === CONFIG.expectedItems, actual: result},
    {name: `${result.name} direction-theme`, pass: result.direction === scenarios.find((item) => item.name === result.name).direction && result.theme === scenarios.find((item) => item.name === result.name).theme, actual: result},
    {name: `${result.name} overflow-clipping`, pass: result.horizontalOverflow === 0 && result.targetOverflow === 0 && result.clipped.length === 0, actual: result},
    {name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics},
  ]);
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt: new Date().toISOString(), authority: {component: REVIEW_ID, classification: 'Original Honesty ERP presentation candidate; no binding external visual reference exists.', contract: 'src/app/controls/PLANNED_UI_PATTERN_READINESS_V1.md'}, scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
