import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-forms', 'forms-composition-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'form-1440-light-rtl', component: 'form', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'form-390-dark-ltr', component: 'form', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'form-section-1440-light-rtl', component: 'form-section', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'form-section-390-dark-ltr', component: 'form-section', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'form-actions-1440-light-rtl', component: 'form-actions', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'form-actions-390-dark-ltr', component: 'form-actions', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'validation-summary-1440-light-rtl', component: 'validation-summary', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'validation-summary-390-dark-ltr', component: 'validation-summary', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
  {name: 'repeater-1440-light-rtl', component: 'repeater', width: 1440, height: 900, theme: 'light', direction: 'rtl'},
  {name: 'repeater-390-dark-ltr', component: 'repeater', width: 390, height: 844, theme: 'dark', direction: 'ltr'},
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
    const button=Array.from(document.querySelectorAll('button')).find((entry)=>entry.textContent?.includes(${JSON.stringify(label)}) || entry.getAttribute('aria-label')?.includes(${JSON.stringify(label)}));
    button?.click(); return Boolean(button);
  })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-forms-evidence-'));
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
    await new Promise((resolve) => setTimeout(resolve, 180));

    if (scenario.component === 'form') await clickButton(client, 'حفظ المورد');
    if (scenario.component === 'form-section') await clickButton(client, 'إضافة تصنيف');
    if (scenario.component === 'form-actions') await clickButton(client, 'حفظ');
    if (scenario.component === 'validation-summary') await clickButton(client, 'اسم الحساب');
    if (scenario.component === 'repeater') await clickButton(client, 'إضافة جهة اتصال');
    await new Promise((resolve) => setTimeout(resolve, 180));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]');
      const root=document.documentElement;
      const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const targetBox=box(target);
      const clippedText=Array.from(target.querySelectorAll('erp-text')).filter((element)=>element.scrollHeight>element.clientHeight+1 || element.scrollWidth>element.clientWidth+1).map((element)=>element.textContent?.trim());
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,targetBox,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)},eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',targetScrollWidth:target.scrollWidth,targetClientWidth:target.clientWidth,buttons:target.querySelectorAll('button').length,fields:target.querySelectorAll('input').length,rows:target.querySelectorAll('[role=listitem]').length,sections:target.querySelectorAll('erp-form-section').length,actions:target.querySelectorAll('erp-form-actions').length,issues:target.querySelectorAll('erp-validation-summary button').length,clippedText};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
    if (measurement.targetBox) {
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
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name: `${result.name} target`, pass: result.targetCount === 1, actual: result.targetCount});
    assertions.push({name: `${result.name} direction-theme`, pass: result.direction === scenario.direction && result.theme === scenario.theme, actual: {direction: result.direction, theme: result.theme}});
    assertions.push({name: `${result.name} overflow`, pass: result.horizontalOverflow === 0 && result.targetScrollWidth <= result.targetClientWidth, actual: {page: result.horizontalOverflow, target: result.targetScrollWidth - result.targetClientWidth}});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    assertions.push({name: `${result.name} clipping`, pass: result.clippedText.length === 0, actual: result.clippedText});
    if (result.component === 'form') assertions.push({name: `${result.name} composition`, pass: result.fields === 2 && result.sections === 1 && result.actions === 1 && result.eventText.includes('submitRequested'), actual: result});
    if (result.component === 'form-section') assertions.push({name: `${result.name} projected fields`, pass: result.fields === 2 && result.eventText.includes('sectionActionPressed'), actual: result});
    if (result.component === 'form-actions') assertions.push({name: `${result.name} action slots`, pass: result.buttons === 2 && result.eventText.includes('formSavePressed'), actual: result});
    if (result.component === 'validation-summary') assertions.push({name: `${result.name} issue activation`, pass: result.issues === 2 && result.eventText.includes('issueActivated'), actual: result});
    if (result.component === 'repeater') assertions.push({name: `${result.name} controlled rows`, pass: result.rows === 3 && result.eventText.includes('addRequested'), actual: result});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {
    generatedAt: new Date().toISOString(),
    authority: {
      classification: 'Original Honesty ERP Forms composition candidates under the recorded accelerated-wave waiver.',
      contract: 'src/app/controls/FORMS_BATCH_V1.md',
      note: 'No external visual reference is claimed; evidence covers meaningful composition, interactions, responsive containment, theme, and direction.',
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
