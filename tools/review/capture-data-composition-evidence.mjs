import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-data-table', 'data-composition-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'bulk-action-bar-1440-light-rtl', component: 'bulk-action-bar', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'bulk-action-bar-390-dark-ltr', component: 'bulk-action-bar', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'filter-bar-1440-light-rtl', component: 'filter-bar', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'filter-bar-390-dark-ltr', component: 'filter-bar', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'filter-drawer-open-1440-light-rtl', component: 'filter-drawer', width: 1440, height: 900, theme: 'light', direction: 'rtl', open: true},
  {name: 'filter-drawer-open-390-dark-ltr', component: 'filter-drawer', width: 390, height: 844, theme: 'dark', direction: 'ltr', open: true},
  {name: 'table-toolbar-1440-light-rtl', component: 'table-toolbar', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'table-toolbar-390-dark-ltr', component: 'table-toolbar', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'smart-table-1440-light-rtl', component: 'smart-table', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'smart-table-390-dark-ltr', component: 'smart-table', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
];

async function waitFor(predicate, timeout = 20_000) {
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
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
    ...(clip ? {clip: {...clip, scale: 1}} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

async function clickButton(client, label) {
  return evaluate(client, `(() => {
    const button=Array.from(document.querySelectorAll('button')).find((entry)=>entry.textContent?.trim()===${JSON.stringify(label)} || entry.getAttribute('aria-label')===${JSON.stringify(label)});
    button?.click(); return Boolean(button);
  })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-data-composition-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--disable-background-timer-throttling',
  '--disable-renderer-backgrounding', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', APP_URL,
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
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: false});
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, `document.readyState === 'complete'`));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme','${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; })()`);
    await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
    await new Promise((resolve) => setTimeout(resolve, scenario.open ? 700 : 150));

    if (scenario.component === 'bulk-action-bar') {
      await clickButton(client, 'تصدير المحدد');
    } else if (scenario.component === 'filter-bar') {
      await clickButton(client, 'إزالة المدينة');
    } else if (scenario.component === 'filter-drawer' && scenario.open) {
      await clickButton(client, 'تصفية متقدمة');
      await waitFor(() => evaluate(client, `document.querySelectorAll('erp-overlay-host .erp-ol[data-overlay-kind="drawer"] .erp-os').length === 1`));
    } else if (scenario.component === 'table-toolbar') {
      await clickButton(client, 'تحديث');
      await clickButton(client, 'تصدير');
    } else if (scenario.component === 'smart-table') {
      await evaluate(client, `document.querySelector('[data-showcase-target] erp-sort-header button')?.click()`);
      await clickButton(client, 'التالية');
      await clickButton(client, 'تحديث');
      await clickButton(client, 'تصدير');
    }
    await new Promise((resolve) => setTimeout(resolve, scenario.open ? 700 : 150));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]');
      const overlay=document.querySelector('erp-overlay-host .erp-ol[data-overlay-kind="drawer"] .erp-os');
      const root=document.documentElement;
      const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const targetBox=box(target); const overlayBox=box(overlay);
      const pagination=target.querySelector('erp-pagination'); const paginationControls=pagination?.querySelector('.pagination__controls');
      const tableViewport=target.querySelector('erp-table-viewport .scroll');
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,targetBox,overlayBox,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)},eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',targetScrollWidth:target.scrollWidth,targetClientWidth:target.clientWidth,projectedActions:target.querySelectorAll('erp-button').length,filterDefinitions:overlay?.querySelectorAll('erp-text-box').length??0,tableRows:target.querySelectorAll('tbody tr').length,statusBadges:target.querySelectorAll('erp-status-badge').length,searchWidth:target.querySelector('erp-search-box')?.getBoundingClientRect().width??0,tableViewport:tableViewport&&{clientWidth:tableViewport.clientWidth,scrollWidth:tableViewport.scrollWidth},pagination:pagination&&{clientWidth:pagination.clientWidth,scrollWidth:pagination.scrollWidth},paginationControls:paginationControls&&{clientWidth:paginationControls.clientWidth,scrollWidth:paginationControls.scrollWidth,wrap:getComputedStyle(paginationControls).flexWrap}};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
    if (measurement.targetBox && !measurement.overlayBox) {
      const padding = 20;
      await screenshot(client, `${scenario.name}-crop.png`, {
        x: Math.max(0, measurement.targetBox.x + measurement.scroll.x - padding),
        y: Math.max(0, measurement.targetBox.y + measurement.scroll.y - padding),
        width: Math.min(scenario.width, measurement.targetBox.width + padding * 2),
        height: Math.min(scenario.height, measurement.targetBox.height + padding * 2),
      });
    }
  }

  const assertions = [];
  for (const result of results) {
    assertions.push({name: `${result.name} target`, pass: result.targetCount === 1, actual: result.targetCount});
    assertions.push({name: `${result.name} direction-theme`, pass: result.direction === scenarios.find((entry)=>entry.name===result.name).direction && result.theme === scenarios.find((entry)=>entry.name===result.name).theme, actual: {direction: result.direction, theme: result.theme}});
    assertions.push({name: `${result.name} overflow`, pass: result.horizontalOverflow === 0 && result.targetScrollWidth <= result.targetClientWidth, actual: {page: result.horizontalOverflow, target: result.targetScrollWidth - result.targetClientWidth}});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    if (result.component === 'bulk-action-bar') assertions.push({name: `${result.name} projected action`, pass: result.projectedActions >= 2 && result.eventText.includes('bulkExportPressed'), actual: result});
    if (result.component === 'filter-bar') assertions.push({name: `${result.name} controlled filter removal`, pass: result.eventText.includes('filterRemoved: city'), actual: result.eventText});
    if (result.component === 'filter-drawer') assertions.push({name: `${result.name} meaningful drawer`, pass: result.filterDefinitions === 3 && result.overlayBox?.x >= -0.5 && result.overlayBox?.right <= result.viewport.width + 0.5, actual: result});
    if (result.component === 'table-toolbar') assertions.push({name: `${result.name} complete slots`, pass: result.searchWidth > 0 && result.eventText.includes('exportRequested'), actual: result});
    if (result.component === 'smart-table') assertions.push({name: `${result.name} composition`, pass: result.tableRows === 2 && result.statusBadges === 2 && result.eventText.includes('exportRequested') && (!result.pagination || result.pagination.scrollWidth <= result.pagination.clientWidth) && (!result.paginationControls || result.paginationControls.scrollWidth <= result.paginationControls.clientWidth) && (result.viewport.width > 390 || result.tableViewport?.scrollWidth > result.tableViewport?.clientWidth), actual: result});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {
    generatedAt: new Date().toISOString(),
    authority: {
      classification: 'Original Honesty ERP Data/Table composition candidates under the recorded accelerated-wave waiver.',
      contract: 'src/app/controls/data-table/DATA_TABLE_BATCH_V1.md',
      exactTableComposition: 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md',
      note: 'ErpTableToolbar table-reference presentation remains exact-reference owned; this review covers the default composition presentation and SmartTable integration.',
    },
    scenarios: results,
    assertions,
    summary: {total: assertions.length, passed: assertions.length - failed.length, failed},
  };
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
