import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-navigation', 'navigation-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'breadcrumbs-1440-light-rtl', component: 'breadcrumbs', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'breadcrumbs-390-dark-ltr', component: 'breadcrumbs', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'pagination-1440-light-rtl', component: 'pagination', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'pagination-reference-390-dark-ltr', component: 'pagination', width: 390, height: 844, theme: 'dark', direction: 'ltr', presentation: 'table-reference'},
  {name: 'sort-header-1440-light-rtl', component: 'sort-header', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'sort-header-reference-390-dark-ltr', component: 'sort-header', width: 390, height: 844, theme: 'dark', direction: 'ltr', presentation: 'table-reference'},
  {name: 'stepper-1440-light-rtl', component: 'stepper', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'stepper-390-dark-ltr', component: 'stepper', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
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

async function choose(client, name, value) {
  await evaluate(client, `document.querySelector('[data-showcase-control="${name}"] erp-select button')?.click()`);
  await waitFor(() => evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).some((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})`));
  await evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).find((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})?.click()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-navigation-evidence-'));
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
  const references = [];
  const referenceScenarios = [
    {
      name: 'reference-skodash-breadcrumb-1280-rtl',
      url: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-navs-tabs.html',
      selector: 'main nav[aria-label="breadcrumb"]',
    },
    {
      name: 'reference-skodash-pagination-1280-rtl',
      url: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-paginations.html',
      selector: 'main nav[aria-label="Page navigation example"]',
    },
  ];
  await client.command('Emulation.setDeviceMetricsOverride', {width: 1280, height: 720, deviceScaleFactor: 1, mobile: false});
  for (const reference of referenceScenarios) {
    await client.command('Page.navigate', {url: reference.url});
    await waitFor(() => evaluate(client, `Boolean(document.querySelector(${JSON.stringify(reference.selector)}))`));
    await new Promise((resolve) => setTimeout(resolve, 500));
    await evaluate(client, 'scrollTo(0, 0)');
    await new Promise((resolve) => setTimeout(resolve, 100));
    const measurement = await evaluate(client, `(() => { const element=document.querySelector(${JSON.stringify(reference.selector)}); const r=element.getBoundingClientRect(); const first=element.querySelector('a'); const style=first?getComputedStyle(first):null; return {name:${JSON.stringify(reference.name)},url:location.href,viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},box:{x:r.x,y:r.y,width:r.width,height:r.height},item:first&&style?{height:first.getBoundingClientRect().height,padding:style.padding,borderRadius:style.borderRadius,fontSize:style.fontSize,lineHeight:style.lineHeight}:null}; })()`);
    references.push(measurement);
    await screenshot(client, `${reference.name}.png`);
    await screenshot(client, `${reference.name}-crop.png`, {
      x: Math.max(0, measurement.box.x + measurement.scroll.x - 20),
      y: Math.max(0, measurement.box.y + measurement.scroll.y - 20),
      width: Math.min(1280, measurement.box.width + 40),
      height: Math.min(720, measurement.box.height + 40),
    });
  }
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
    if (scenario.presentation) await choose(client, 'presentation', scenario.presentation);
    await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (scenario.component === 'pagination') {
      await evaluate(client, `(() => { const target=document.querySelector('[data-showcase-target]'); const next=target?.querySelector('button[aria-label="الصفحة التالية"]')??Array.from(target?.querySelectorAll('button')??[]).find((entry)=>entry.textContent?.includes('التالية')); next?.click(); })()`);
    }
    if (scenario.component === 'sort-header') {
      await evaluate(client, `document.querySelector('[data-showcase-target] button')?.click()`);
    }
    if (scenario.component === 'stepper') {
      await evaluate(client, `Array.from(document.querySelectorAll('[data-showcase-target] [role="tab"]')).find((entry)=>entry.textContent?.includes('المستندات'))?.click()`);
    }
    await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]');
      const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const targetBox=box(target); const root=document.documentElement;
      const breadcrumbNav=target.querySelector('nav'); const current=target.querySelector('[aria-current="page"]');
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,targetBox,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)},eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim(),breadcrumbItems:target.querySelectorAll('li').length,separators:target.querySelectorAll('.breadcrumbs__separator').length,currentText:current?.textContent?.trim(),currentBox:box(current),breadcrumbNavScrollWidth:breadcrumbNav?.scrollWidth??0,breadcrumbNavClientWidth:breadcrumbNav?.clientWidth??0,page:target.getAttribute('data-pagination-page'),pageCount:target.getAttribute('data-pagination-page-count'),presentation:target.getAttribute('data-pagination-presentation')??target.getAttribute('data-sort-presentation'),sortDirection:target.getAttribute('data-sort-direction'),step:target.getAttribute('data-stepper-active'),stepTabs:target.querySelectorAll('[role="tab"]').length,disabledTabs:target.querySelectorAll('[role="tab"]:disabled').length,panelText:target.querySelector('[role="tabpanel"]')?.textContent?.trim(),targetScrollWidth:target.scrollWidth,targetClientWidth:target.clientWidth};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
    if (measurement.targetBox) {
      const padding = 20;
      const clip = {
        x: Math.max(0, measurement.targetBox.x + measurement.scroll.x - padding),
        y: Math.max(0, measurement.targetBox.y + measurement.scroll.y - padding),
        width: Math.min(scenario.width, measurement.targetBox.width + padding * 2),
        height: Math.min(scenario.height, measurement.targetBox.height + padding * 2),
      };
      await screenshot(client, `${scenario.name}-crop.png`, clip);
    }
  }

  const assertions = [];
  for (const result of results) {
    assertions.push({name: `${result.name} target`, pass: result.targetCount === 1, actual: result.targetCount});
    assertions.push({name: `${result.name} direction-theme`, pass: result.direction === scenarios.find((entry)=>entry.name===result.name).direction && result.theme === scenarios.find((entry)=>entry.name===result.name).theme, actual: {direction: result.direction, theme: result.theme}});
    assertions.push({name: `${result.name} overflow`, pass: result.horizontalOverflow === 0 && result.targetScrollWidth <= result.targetClientWidth, actual: {page: result.horizontalOverflow, target: result.targetScrollWidth - result.targetClientWidth}});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    if (result.component === 'breadcrumbs') assertions.push({name: `${result.name} anatomy`, pass: result.breadcrumbItems === 4 && result.separators === 3 && result.currentText === 'فاتورة المبيعات 1042' && result.breadcrumbNavScrollWidth <= result.breadcrumbNavClientWidth && result.currentBox?.right <= result.viewport.width && result.currentBox?.x >= 0, actual: result});
    if (result.component === 'pagination') assertions.push({name: `${result.name} controlled interaction`, pass: result.page === '4' && result.pageCount === '12' && result.eventText.includes('pageChange: 4'), actual: result});
    if (result.component === 'sort-header') assertions.push({name: `${result.name} controlled interaction`, pass: result.sortDirection === 'ascending' && result.eventText.includes('sortChange: ascending'), actual: result});
    if (result.component === 'stepper') assertions.push({name: `${result.name} projected model`, pass: result.step === 'documents' && result.stepTabs === 4 && result.disabledTabs === 1 && result.panelText.includes('المستندات الداعمة') && result.eventText.includes('changed: documents'), actual: result});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {
    generatedAt: new Date().toISOString(),
    authority: {
      breadcrumbs: {classification: 'Original Honesty ERP candidate informed by the accessible Skodash RTL breadcrumb anatomy', reference: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-navs-tabs.html'},
      pagination: {classification: 'Exact ERP-TABLE table-reference presentation plus original compatibility presentation', exactContract: 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md', presentationReference: 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-paginations.html'},
      sortHeader: {classification: 'Exact ERP-TABLE composition presentation plus original standalone compatibility presentation', exactContract: 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md'},
      stepper: {classification: 'Original Honesty ERP candidate', limitation: 'No component-specific Product Owner exact reference is recorded.'},
    },
    references,
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
