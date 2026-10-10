import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-page', 'page-composition-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5003';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'page-fluid-1440-light-rtl', component: 'page', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'page-boxed-390-dark-ltr', component: 'page', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: {widthMode: 'boxed', scrollMode: 'page'}},
  {name: 'page-header-1440-light-rtl', component: 'page-header', width: 1440, height: 900, theme: 'light', direction: 'rtl', action: 'primary'},
  {name: 'page-header-390-dark-ltr', component: 'page-header', width: 390, height: 844, theme: 'dark', direction: 'ltr', action: 'secondary'},
  {name: 'page-shell-1440-light-rtl', component: 'page-shell', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'page-shell-390-dark-ltr', component: 'page-shell', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
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
  const result = await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: false, ...(clip ? {clip: {...clip, scale: 1}} : {})});
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

async function chooseControl(client, label, value) {
  const opened = await evaluate(client, `(() => {
    const owner=document.querySelector('[data-showcase-control=${JSON.stringify(label)}]');
    const trigger=owner?.querySelector('erp-field-trigger button'); trigger?.click(); return Boolean(trigger);
  })()`);
  if (!opened) return false;
  await new Promise((resolve) => setTimeout(resolve, 100));
  return evaluate(client, `(() => {
    const option=Array.from(document.querySelectorAll('button[role="option"]')).find((entry)=>entry.textContent?.trim()===${JSON.stringify(value)} && entry.getBoundingClientRect().height>0);
    option?.click(); return Boolean(option);
  })()`);
}

async function clickTargetButton(client, text) {
  return evaluate(client, `(() => { const target=document.querySelector('[data-showcase-target]'); const button=Array.from(target?.querySelectorAll('button')??[]).find((entry)=>entry.textContent?.includes(${JSON.stringify(text)})); button?.click(); return Boolean(button); })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-page-evidence-'));
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
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, `document.readyState === 'complete'`));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme','${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; })()`);
    if (scenario.controls?.widthMode) await chooseControl(client, 'widthMode', scenario.controls.widthMode);
    if (scenario.controls?.scrollMode) await chooseControl(client, 'scrollMode', scenario.controls.scrollMode);
    if (scenario.action === 'primary') await clickTargetButton(client, 'إضافة حساب');
    if (scenario.action === 'secondary') await clickTargetButton(client, 'تصدير');
    await new Promise((resolve) => setTimeout(resolve, 250));
    await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]'); const root=document.documentElement;
      const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const targetBox=box(target); const clipped=Array.from(target.querySelectorAll('erp-text')).filter((element)=>element.scrollHeight>element.clientHeight+1 || element.scrollWidth>element.clientWidth+1).map((element)=>element.textContent?.trim());
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,targetBox,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),targetOverflow:Math.max(0,target.scrollWidth-target.clientWidth),diagnostics:${JSON.stringify(client.diagnostics)},clipped,eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',pageWidth:target.getAttribute('data-page-width'),pageScroll:target.getAttribute('data-page-scroll'),headerRegions:{breadcrumbs:Boolean(target.querySelector('.page-header__breadcrumbs')?.children.length),meta:Boolean(target.querySelector('.page-header__meta')?.children.length),secondary:Boolean(target.querySelector('.page-header__secondary')?.children.length),primary:Boolean(target.querySelector('.page-header__primary')?.children.length)},shellRegions:{header:Boolean(target.querySelector('.page-shell__header')?.children.length),main:Boolean(target.querySelector('.page-shell__main')?.children.length),side:Boolean(target.querySelector('.page-shell__side')?.children.length),footer:Boolean(target.querySelector('.page-shell__footer')?.children.length)},shellColumns:target.querySelector('.page-shell__body')?getComputedStyle(target.querySelector('.page-shell__body')).gridTemplateColumns:null};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
    if (measurement.targetBox) {
      const padding = 20;
      await screenshot(client, `${scenario.name}-crop.png`, {x: Math.max(0, measurement.targetBox.x + measurement.scroll.x - padding), y: Math.max(0, measurement.targetBox.y + measurement.scroll.y - padding), width: Math.min(scenario.width, measurement.targetBox.width + padding * 2), height: Math.min(scenario.height, measurement.targetBox.height + padding * 2)});
    }
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name: `${result.name} target`, pass: result.targetCount === 1, actual: result.targetCount});
    assertions.push({name: `${result.name} direction-theme`, pass: result.direction === scenario.direction && result.theme === scenario.theme, actual: {direction: result.direction, theme: result.theme}});
    assertions.push({name: `${result.name} overflow-clipping`, pass: result.horizontalOverflow === 0 && result.targetOverflow === 0 && result.clipped.length === 0, actual: {page: result.horizontalOverflow, target: result.targetOverflow, clipped: result.clipped}});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    if (result.component === 'page') {
      const expectedWidth = scenario.controls?.widthMode ?? 'fluid';
      const expectedScroll = scenario.controls?.scrollMode ?? 'document';
      assertions.push({name: `${result.name} controlled page modes`, pass: result.pageWidth === expectedWidth && result.pageScroll === expectedScroll, actual: {width: result.pageWidth, scroll: result.pageScroll, expectedWidth, expectedScroll}});
    }
    if (result.component === 'page-header') assertions.push({name: `${result.name} complete header regions`, pass: Object.values(result.headerRegions).every(Boolean) && result.eventText.includes('ActionPressed'), actual: result});
    if (result.component === 'page-shell') assertions.push({name: `${result.name} complete shell regions`, pass: Object.values(result.shellRegions).every(Boolean), actual: result});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt: new Date().toISOString(), authority: {classification: 'Original Honesty ERP page-composition candidates under the recorded accelerated-wave no-reference waiver.', contract: 'src/app/controls/SHELL_BATCH_V1.md', note: 'No external exact visual reference is claimed.'}, scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
