import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-entity-form', 'entity-form-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'schema-fields-1440-light-rtl', component: 'entity-schema-fields', width: 1440, height: 900, theme: 'light', direction: 'rtl', action: 'custom-field'},
  {name: 'schema-fields-390-dark-ltr', component: 'entity-schema-fields', width: 390, height: 844, theme: 'dark', direction: 'ltr', action: 'custom-field'},
  {name: 'standard-identity-1440-light-rtl', component: 'standard-entity-form', width: 1440, height: 900, theme: 'light', direction: 'rtl', action: 'submit'},
  {name: 'standard-identity-390-dark-ltr', component: 'standard-entity-form', width: 390, height: 844, theme: 'dark', direction: 'ltr', action: 'identity'},
  {name: 'standard-commercial-1440-light-rtl', component: 'standard-entity-form', width: 1440, height: 900, theme: 'light', direction: 'rtl', action: 'commercial'},
  {name: 'standard-commercial-390-dark-ltr', component: 'standard-entity-form', width: 390, height: 844, theme: 'dark', direction: 'ltr', action: 'commercial'},
  {name: 'standard-attachments-390-light-rtl', component: 'standard-entity-form', width: 390, height: 844, theme: 'light', direction: 'rtl', action: 'attachments'},
  {name: 'standard-review-1440-dark-ltr', component: 'standard-entity-form', width: 1440, height: 900, theme: 'dark', direction: 'ltr', action: 'review'},
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

async function click(client, label) {
  return evaluate(client, `(() => { const target=document.querySelector('[data-showcase-target]'); const button=Array.from(target?.querySelectorAll('button')??[]).find((entry)=>entry.getAttribute('aria-label')===${JSON.stringify(label)} || entry.textContent?.includes(${JSON.stringify(label)})); button?.click(); return Boolean(button); })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-entity-form-evidence-'));
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

    if (scenario.action === 'custom-field') await click(client, 'تعيين كمورد استراتيجي');
    if (scenario.action === 'submit') await click(client, 'حفظ المورد');
    if (scenario.action === 'commercial') {
      await click(client, 'التعامل');
      await new Promise((resolve) => setTimeout(resolve, 100));
      await click(client, 'اعتماد التصنيف الاستراتيجي');
    }
    if (scenario.action === 'attachments') await click(client, 'المرفقات');
    if (scenario.action === 'review') await click(client, 'المراجعة');
    await new Promise((resolve) => setTimeout(resolve, 220));
    await evaluate(client, `document.querySelector('[data-showcase-target]')?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]'); const root=document.documentElement;
      const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const targetBox=box(target); const selectors=['erp-text-box','erp-text-area-box','erp-password-box','erp-url-box','erp-tel-box','erp-number-box','erp-money-box','erp-check-box','erp-radio-group','erp-select','erp-date-box','erp-time-box','erp-date-time-box'];
      const fieldKinds=Object.fromEntries(selectors.map((selector)=>[selector,target.querySelectorAll(selector).length]));
      const clippedText=Array.from(target.querySelectorAll('erp-text')).filter((element)=>element.scrollHeight>element.clientHeight+1 || element.scrollWidth>element.clientWidth+1).map((element)=>element.textContent?.trim());
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},action:${JSON.stringify(scenario.action)},viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,targetBox,horizontalOverflow:Math.max(0,root.scrollWidth-innerWidth),targetOverflow:Math.max(0,target.scrollWidth-target.clientWidth),diagnostics:${JSON.stringify(client.diagnostics)},eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',fieldCount:Number(target.getAttribute('data-entity-schema-field-count')??0),fieldKinds,steps:target.querySelectorAll('[role=tab]').length,activeStep:target.querySelector('[role=tab][aria-selected=true]')?.getAttribute('aria-label')??null,customField:target.textContent?.includes('التصنيف الاستراتيجي')??false,customSection:target.textContent?.includes('لا توجد مرفقات مطلوبة')??false,review:target.textContent?.includes('ملخص بطاقة المورد')??false,clippedText};
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
    assertions.push({name: `${result.name} overflow`, pass: result.horizontalOverflow === 0 && result.targetOverflow === 0, actual: {page: result.horizontalOverflow, target: result.targetOverflow}});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    assertions.push({name: `${result.name} clipping`, pass: result.clippedText.length === 0, actual: result.clippedText});
    if (result.component === 'entity-schema-fields') assertions.push({name: `${result.name} complete field matrix`, pass: result.fieldCount === 14 && Object.values(result.fieldKinds).every((count) => count === 1) && result.eventText.includes('fieldValueChanged'), actual: result});
    if (result.component === 'standard-entity-form') {
      const expectedStep = {submit: 'الهوية', identity: 'الهوية', commercial: 'التعامل', attachments: 'المرفقات', review: 'المراجعة'}[result.action];
      assertions.push({name: `${result.name} stepped composition`, pass: result.steps === 4 && result.activeStep === expectedStep && (result.action !== 'submit' || result.eventText.includes('submitRequested')) && (result.action !== 'commercial' || result.customField && result.eventText.includes('valueChanged')) && (result.action !== 'attachments' || result.customSection) && (result.action !== 'review' || result.review), actual: result});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt: new Date().toISOString(), authority: {classification: 'Original Honesty ERP schema-driven Entity Form candidates under the explicit Phase 6 no-reference waiver.', contract: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md', note: 'No external visual reference is claimed.'}, scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
