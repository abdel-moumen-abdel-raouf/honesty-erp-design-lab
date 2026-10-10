import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-button-family', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-buttons.html';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'button-1440-light-rtl', component: 'button', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 23},
  {name: 'button-390-dark-ltr', component: 'button', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 23},
  {name: 'icon-button-1440-light-rtl', component: 'icon-button', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 19},
  {name: 'icon-button-390-dark-ltr', component: 'icon-button', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 19},
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

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-button-family-evidence-'));
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
  await client.command('Emulation.setFocusEmulationEnabled', {enabled: true});

  await client.command('Emulation.setDeviceMetricsOverride', {width: 1440, height: 900, deviceScaleFactor: 1, mobile: false});
  await client.command('Page.navigate', {url: REFERENCE_URL});
  await waitFor(() => evaluate(client, `(() => {
    const button=document.querySelector('.btn.btn-primary.px-5');
    return document.querySelectorAll('.btn').length > 20
      && Array.from(document.styleSheets).filter((sheet)=>sheet.href).length > 5
      && button?.getBoundingClientRect().height >= 38;
  })()`));
  const reference = await evaluate(client, `(() => {
    const button=document.querySelector('.btn.btn-primary.px-5'); const style=getComputedStyle(button); const box=button.getBoundingClientRect();
    const groupButton=document.querySelector('.btn-group .btn'); const groupStyle=getComputedStyle(groupButton); const groupBox=groupButton.getBoundingClientRect();
    return {url:location.href, direction:getComputedStyle(document.documentElement).direction,
      source:{styles:Array.from(document.styleSheets).map((sheet)=>sheet.href).filter(Boolean),scripts:Array.from(document.scripts).map((script)=>script.src).filter(Boolean)},
      basic:{box:{x:box.x,y:box.y,width:box.width,height:box.height},padding:style.padding,fontSize:style.fontSize,lineHeight:style.lineHeight,borderRadius:style.borderRadius,borderWidth:style.borderWidth},
      group:{box:{x:groupBox.x,y:groupBox.y,width:groupBox.width,height:groupBox.height},padding:groupStyle.padding,borderRadius:groupStyle.borderRadius}};
  })()`);
  await evaluate(client, `document.querySelector('.btn.btn-primary.px-5')?.scrollIntoView({block:'center'})`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  await screenshot(client, 'reference-skodash-buttons-1440-rtl.png');

  const results = [];
  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: scenario.width < 600});
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; })()`);

    if (scenario.component === 'button') {
      await choose(client, 'variant', 'outline');
      await choose(client, 'tone', 'danger');
      await choose(client, 'size', 'lg');
      await choose(client, 'shape', 'pill');
      await choose(client, 'iconPosition', 'end');
    } else {
      await choose(client, 'variant', 'solid');
      await choose(client, 'tone', 'primary');
      await choose(client, 'size', 'lg');
      await choose(client, 'shape', 'pill');
    }
    await evaluate(client, `document.querySelector('[data-showcase-target] button')?.click()`);
    await evaluate(client, `document.querySelector('[data-showcase-target] button')?.focus()`);
    await evaluate(client, `(() => {
      let node=document.querySelector('[data-showcase-target]');
      while (node) {
        if (node.scrollHeight > node.clientHeight) node.scrollTop = 0;
        node=node.parentElement;
      }
    })()`);
    await new Promise((resolve) => setTimeout(resolve, 150));

    const measurement = await evaluate(client, `(() => {
      const host=document.querySelector('[data-showcase-target]'); const button=host.querySelector('button'); const hostBox=host.getBoundingClientRect(); const box=button.getBoundingClientRect(); const style=getComputedStyle(button);
      return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(host).direction,
        primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,
        hostBox:{x:hostBox.x,y:hostBox.y,width:hostBox.width,height:hostBox.height},buttonBox:{x:box.x,y:box.y,width:box.width,height:box.height},hostDisplay:getComputedStyle(host).display,
        style:{padding:style.padding,fontSize:style.fontSize,lineHeight:style.lineHeight,borderRadius:style.borderRadius,borderWidth:style.borderWidth,outlineWidth:style.outlineWidth},
        variant:host.getAttribute(${JSON.stringify(scenario.component === 'button' ? 'data-button-variant' : 'data-icon-button-variant')}),tone:host.getAttribute(${JSON.stringify(scenario.component === 'button' ? 'data-button-tone' : 'data-icon-button-tone')}),size:host.getAttribute(${JSON.stringify(scenario.component === 'button' ? 'data-button-size' : 'data-icon-button-size')}),shape:host.getAttribute(${JSON.stringify(scenario.component === 'button' ? 'data-button-shape' : 'data-icon-button-shape')}),
        label:button.getAttribute('aria-label')??button.textContent?.trim(),eventEvidence:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)}};
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}-configured.png`);
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    const iconGeometry = result.component !== 'icon-button' || (result.hostBox.width === result.buttonBox.width && result.hostBox.height === result.buttonBox.height);
    assertions.push({name:`${result.name} target`,pass:result.primaryTargetCount===1,actual:result.primaryTargetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===scenario.controls,actual:result.controlCount});
    assertions.push({name:`${result.name} theme`,pass:result.theme===scenario.theme,actual:result.theme});
    assertions.push({name:`${result.name} direction`,pass:result.direction===scenario.direction,actual:result.direction});
    assertions.push({name:`${result.name} state`,pass:result.variant===(result.component==='button'?'outline':'solid')&&result.tone===(result.component==='button'?'danger':'primary')&&result.size==='lg'&&result.shape==='pill',actual:{variant:result.variant,tone:result.tone,size:result.size,shape:result.shape}});
    assertions.push({name:`${result.name} event`,pass:result.eventEvidence.includes('pressed'),actual:result.eventEvidence});
    assertions.push({name:`${result.name} host geometry`,pass:iconGeometry,actual:{host:result.hostBox,button:result.buttonBox}});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0,actual:result.horizontalOverflow});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt:new Date().toISOString(),authority:{reference:'Skodash RTL component-buttons fallback; not a component-specific exact contract.',referenceUrl:REFERENCE_URL,systemSubstitutions:['Honesty ERP colors','Honesty ERP typography'],reference},scenarios:results,assertions,summary:{total:assertions.length,passed:assertions.length-failed.length,failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try {
    await fs.rm(profile, {recursive: true, force: true});
  } catch (error) {
    if (error?.code !== 'EBUSY') throw error;
  }
}
