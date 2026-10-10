import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-selection', 'column-view-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'column-default-1440-light-rtl', component: 'column-chooser', width: 1440, height: 900, theme: 'light', direction: 'rtl', presentation: 'default'},
  {name: 'column-reference-1440-light-rtl', component: 'column-chooser', width: 1440, height: 900, theme: 'light', direction: 'rtl', presentation: 'table-reference'},
  {name: 'column-reference-390-dark-ltr', component: 'column-chooser', width: 390, height: 844, theme: 'dark', direction: 'ltr', presentation: 'table-reference'},
  {name: 'view-table-1440-light-rtl', component: 'view-switcher', width: 1440, height: 900, theme: 'light', direction: 'rtl', mode: 'table'},
  {name: 'view-cards-390-dark-ltr', component: 'view-switcher', width: 390, height: 844, theme: 'dark', direction: 'ltr', mode: 'cards'},
  {name: 'view-disabled-390-light-rtl', component: 'view-switcher', width: 390, height: 844, theme: 'light', direction: 'rtl', mode: 'table', disabled: true},
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

async function screenshot(client, fileName) {
  const result = await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: false});
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

async function choose(client, name, value) {
  await evaluate(client, `document.querySelector('[data-showcase-control="${name}"] erp-select button')?.click()`);
  await waitFor(() => evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).some((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})`));
  await evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).find((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})?.click()`);
}

async function setBoolean(client, name, value) {
  await evaluate(client, `(() => { const input=document.querySelector('[data-showcase-control="${name}"] input[type="checkbox"]'); if (input && input.checked !== ${value}) input.click(); })()`);
}

async function positionTarget(client) {
  await evaluate(client, `(() => {
    const target=document.querySelector('[data-showcase-target]'); if (!target) return;
    target.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
  })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-column-view-evidence-'));
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

    if (scenario.component === 'column-chooser') {
      await choose(client, 'presentation', scenario.presentation);
    } else {
      await choose(client, 'value', scenario.mode);
      await setBoolean(client, 'disabled', Boolean(scenario.disabled));
    }
    await positionTarget(client);
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (scenario.component === 'column-chooser' && scenario.presentation === 'default') {
      await evaluate(client, `Array.from(document.querySelectorAll('[data-showcase-target] [role="option"]')).find((entry)=>entry.textContent?.trim()==='النوع')?.click()`);
    }
    if (scenario.component === 'column-chooser' && scenario.presentation === 'table-reference') {
      await evaluate(client, `document.querySelector('[data-showcase-target] erp-button button')?.click()`);
      await waitFor(() => evaluate(client, `Boolean(document.querySelector('.column-chooser__reference-surface:popover-open'))`));
      await evaluate(client, `document.querySelector('.column-chooser__reference-list erp-check-box input')?.click()`);
    }
    if (scenario.component === 'view-switcher' && !scenario.disabled) {
      const targetMode = scenario.mode === 'table' ? 'cards' : 'table';
      const targetLabel = targetMode === 'table' ? 'عرض جدولي' : 'عرض بطاقات';
      await evaluate(client, `Array.from(document.querySelectorAll('[data-showcase-target] button')).find((entry)=>entry.textContent?.trim()===${JSON.stringify(targetLabel)})?.click()`);
    }
    await positionTarget(client);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]'); const box=(element)=>{if(!element)return null;const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      const base={name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,targetBox:box(target),horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),eventText:document.querySelector('[data-showcase-event-log]')?.textContent?.trim(),diagnostics:${JSON.stringify(client.diagnostics)}};
      if(${JSON.stringify(scenario.component)}==='column-chooser'){
        const surface=document.querySelector('.column-chooser__reference-surface:popover-open');const select=target.querySelector('erp-select');
        const requiredOption=Array.from(target.querySelectorAll('[role="option"]')).find((entry)=>entry.textContent?.trim()==='رقم الحساب');
        return {...base,presentation:target.getAttribute('data-column-chooser-presentation'),surfaceBox:box(surface),surfaceOverflow:surface?getComputedStyle(surface).overflowY:null,surfaceMaxHeight:surface?getComputedStyle(surface).maxHeight:null,checkboxCount:surface?.querySelectorAll('erp-check-box').length??0,selectedOptionCount:select?.querySelectorAll('[role="option"][aria-selected="true"]').length??0,requiredDisabled:Boolean(requiredOption?.matches('[aria-disabled="true"],:disabled')||requiredOption?.querySelector(':disabled'))};
      }
      const buttons=Array.from(target.querySelectorAll('button'));
      return {...base,mode:target.getAttribute('data-view-mode'),buttonCount:buttons.length,pressed:buttons.map((button)=>button.getAttribute('aria-pressed')),disabled:buttons.map((button)=>button.disabled)};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);

    if (scenario.component === 'column-chooser' && scenario.presentation === 'table-reference') {
      await evaluate(client, `document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
      measurement.escape = await evaluate(client, `({open:Boolean(document.querySelector('.column-chooser__reference-surface:popover-open')),focus:document.activeElement?.textContent?.trim()})`);
    }
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name: `${result.name} target`, pass: result.targetCount === 1, actual: result.targetCount});
    assertions.push({name: `${result.name} controls`, pass: result.controlCount === (scenario.component === 'column-chooser' ? 4 : 2), actual: result.controlCount});
    assertions.push({name: `${result.name} theme-direction`, pass: result.theme === scenario.theme && result.direction === scenario.direction, actual: {theme: result.theme, direction: result.direction}});
    assertions.push({name: `${result.name} overflow`, pass: result.horizontalOverflow === 0, actual: result.horizontalOverflow});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    if (scenario.component === 'column-chooser') {
      assertions.push({name: `${result.name} presentation`, pass: result.presentation === scenario.presentation, actual: result.presentation});
      if (scenario.presentation === 'default') {
        assertions.push({name: `${result.name} controlled visibility`, pass: result.selectedOptionCount === 5 && result.requiredDisabled && result.eventText.includes('visibilityChange'), actual: result});
      } else {
        assertions.push({name: `${result.name} reference geometry`, pass: result.surfaceBox?.width === 240 && result.surfaceBox?.right <= result.viewport.width && result.surfaceBox?.bottom <= result.viewport.height && result.surfaceMaxHeight === '340px' && result.surfaceOverflow === 'auto', actual: result});
        assertions.push({name: `${result.name} reference anatomy`, pass: result.checkboxCount === 4 && result.eventText.includes('visibilityChange'), actual: result});
        assertions.push({name: `${result.name} escape`, pass: result.escape?.open === false && result.escape?.focus === 'الأعمدة', actual: result.escape});
      }
    } else {
      const expected = scenario.mode === 'table' ? ['false', 'true'] : ['true', 'false'];
      assertions.push({name: `${result.name} anatomy`, pass: result.buttonCount === 2 && JSON.stringify(result.pressed) === JSON.stringify(scenario.disabled ? ['true', 'false'] : expected), actual: result});
      assertions.push({name: `${result.name} disabled`, pass: result.disabled.every((value) => value === Boolean(scenario.disabled)), actual: result.disabled});
      assertions.push({name: `${result.name} model-event`, pass: scenario.disabled ? result.mode === scenario.mode : result.eventText.includes('changed:'), actual: result});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {
    generatedAt: new Date().toISOString(),
    authority: {
      columnChooser: {classification: 'Exact ERP-TABLE composition mode plus original compatibility presentation', contract: 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md', referenceEvidence: 'docs/review-evidence/erp-table/v2-internal-review'},
      viewSwitcher: {classification: 'Original Honesty ERP candidate', limitation: 'No component-specific Product Owner exact reference is recorded.'},
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
