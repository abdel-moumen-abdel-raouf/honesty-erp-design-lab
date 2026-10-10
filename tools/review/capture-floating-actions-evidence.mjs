import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-floating-actions', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-buttons.html';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'fab-1440-light-rtl-start', component: 'fab', width: 1440, height: 900, theme: 'light', direction: 'rtl', inline: 0, block: 0, controls: 15},
  {name: 'fab-390-dark-ltr-end', component: 'fab', width: 390, height: 844, theme: 'dark', direction: 'ltr', inline: 100, block: 100, controls: 15},
  {name: 'extended-fab-1440-light-ltr-end', component: 'extended-fab', width: 1440, height: 900, theme: 'light', direction: 'ltr', inline: 100, block: 0, controls: 12},
  {name: 'extended-fab-390-dark-rtl-start', component: 'extended-fab', width: 390, height: 844, theme: 'dark', direction: 'rtl', inline: 0, block: 100, controls: 12},
  {name: 'fab-menu-1440-light-rtl-open', component: 'fab-menu', width: 1440, height: 900, theme: 'light', direction: 'rtl', inline: 15, block: 100, controls: 8},
  {name: 'fab-menu-390-dark-ltr-open', component: 'fab-menu', width: 390, height: 844, theme: 'dark', direction: 'ltr', inline: 85, block: 100, controls: 8},
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

async function setRange(client, name, value) {
  await evaluate(client, `(() => { const input=document.querySelector('[data-showcase-control="${name}"] [data-range-thumb="upper"]'); if (!input) return false; input.value=${JSON.stringify(String(value))}; input.dispatchEvent(new Event('input',{bubbles:true})); input.dispatchEvent(new Event('change',{bubbles:true})); return true; })()`);
}

async function choose(client, name, value) {
  await evaluate(client, `document.querySelector('[data-showcase-control="${name}"] erp-select button')?.click()`);
  await waitFor(() => evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).some((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})`));
  await evaluate(client, `Array.from(document.querySelectorAll('[role="option"]')).find((entry) => entry.textContent?.trim() === ${JSON.stringify(value)})?.click()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-floating-actions-evidence-'));
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

  await client.command('Emulation.setDeviceMetricsOverride', {width: 1440, height: 900, deviceScaleFactor: 1, mobile: false});
  await client.command('Page.navigate', {url: REFERENCE_URL});
  await waitFor(() => evaluate(client, `document.querySelectorAll('.btn').length > 20 && Array.from(document.styleSheets).filter((sheet)=>sheet.href).length > 5`));
  const reference = await evaluate(client, `(() => { const classes=Array.from(document.querySelectorAll('[class]')).flatMap((entry)=>Array.from(entry.classList)).filter((name)=>/fab|floating/i.test(name)); const button=document.querySelector('.btn.btn-primary.px-5'); const style=getComputedStyle(button); const box=button.getBoundingClientRect(); return {url:location.href,direction:getComputedStyle(document.documentElement).direction,fabSpecificClasses:[...new Set(classes)],button:{box:{x:box.x,y:box.y,width:box.width,height:box.height},padding:style.padding,borderRadius:style.borderRadius,fontSize:style.fontSize,lineHeight:style.lineHeight},styles:Array.from(document.styleSheets).map((sheet)=>sheet.href).filter(Boolean),scripts:Array.from(document.scripts).map((script)=>script.src).filter(Boolean)}; })()`);
  await evaluate(client, `document.querySelector('.btn.btn-primary.px-5')?.scrollIntoView({block:'center'})`);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await screenshot(client, 'reference-skodash-buttons-fallback-1440-rtl.png');

  const results = [];
  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: scenario.width < 600});
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, `document.readyState === 'complete'`));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
    await choose(client, '$previewDirection', scenario.direction);
    await setRange(client, '$previewInline', scenario.inline);
    await setRange(client, '$previewBlock', scenario.block);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (scenario.component === 'fab-menu') {
      await evaluate(client, `document.querySelector('[data-showcase-target] [data-fab-menu-trigger] button')?.click()`);
      await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-fab-menu-open') === 'true'`));
    } else {
      await evaluate(client, `document.querySelector('[data-showcase-target] button')?.click()`);
    }
    await evaluate(client, `document.querySelector('[data-showcase-case="live"]')?.scrollIntoView({block:'start'})`);
    await new Promise((resolve) => setTimeout(resolve, 125));
    const measurement = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const button=${JSON.stringify(scenario.component)}==='fab-menu'?host.querySelector('[data-fab-menu-trigger] button'):host.querySelector('button'); const preview=document.querySelector('[data-showcase-floating-preview]'); const positioner=document.querySelector('[data-showcase-floating-positioner]'); const surface=host.querySelector('.fab-menu__actions'); const rect=(entry)=>{if(!entry)return null;const box=entry.getBoundingClientRect();return{x:box.x,y:box.y,right:box.right,bottom:box.bottom,width:box.width,height:box.height};}; const previewBox=rect(preview); const targetBox=rect(host); const surfaceBox=rect(surface); const actionButtons=surface?Array.from(surface.querySelectorAll('[data-fab-menu-action] button')):[]; return {name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(host).direction,primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,previewBox,targetBox,nativeBox:rect(button),positionerBox:rect(positioner),resolved:{x:preview?.dataset.resolvedX,y:preview?.dataset.resolvedY,direction:preview?.dataset.resolvedDirection},containedInPreview:targetBox.x>=previewBox.x-0.5&&targetBox.y>=previewBox.y-0.5&&targetBox.right<=previewBox.right+0.5&&targetBox.bottom<=previewBox.bottom+0.5,hostStyle:{display:getComputedStyle(host).display,inlineSize:getComputedStyle(host).inlineSize,blockSize:getComputedStyle(host).blockSize},eventEvidence:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',menu:surface?{open:host.getAttribute('data-fab-menu-open'),placement:host.getAttribute('data-fab-menu-resolved-placement'),surface:surfaceBox,role:surface.getAttribute('role'),label:surface.getAttribute('aria-label'),trigger:{expanded:button.getAttribute('aria-expanded'),hasPopup:button.getAttribute('aria-haspopup'),controls:button.getAttribute('aria-controls')},actionCount:actionButtons.length,actionRoles:actionButtons.map((entry)=>entry.getAttribute('role')),presentations:Array.from(surface.querySelectorAll('[data-fab-menu-action]')).map((entry)=>({tag:entry.tagName,icon:!!entry.querySelector('erp-icon'),disabled:!!entry.querySelector('button')?.disabled}))}:null,horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)}}; })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);

    if (scenario.component === 'fab-menu') {
      await client.command('Input.dispatchKeyEvent', {type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown'});
      await client.command('Input.dispatchKeyEvent', {type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown'});
      const keyboardLabel = await evaluate(client, `document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent?.trim() ?? null`);
      await client.command('Input.dispatchKeyEvent', {type: 'keyDown', key: 'Escape', code: 'Escape'});
      await client.command('Input.dispatchKeyEvent', {type: 'keyUp', key: 'Escape', code: 'Escape'});
      await new Promise((resolve) => setTimeout(resolve, 0));
      const interaction = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const trigger=host.querySelector('[data-fab-menu-trigger] button'); return {keyboardLabel:${JSON.stringify(keyboardLabel)},closed:host.getAttribute('data-fab-menu-open'),expanded:trigger.getAttribute('aria-expanded'),focusReturned:document.activeElement===trigger}; })()`);
      results.at(-1).interaction = interaction;
    }
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name:`${result.name} target`,pass:result.primaryTargetCount===1,actual:result.primaryTargetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===scenario.controls,actual:result.controlCount});
    assertions.push({name:`${result.name} theme and direction`,pass:result.theme===scenario.theme&&result.direction===scenario.direction,actual:{theme:result.theme,direction:result.direction}});
    assertions.push({name:`${result.name} contained`,pass:result.containedInPreview,actual:{preview:result.previewBox,target:result.targetBox}});
    assertions.push({name:`${result.name} content host`,pass:Math.abs(result.targetBox.width-result.nativeBox.width)<0.5&&Math.abs(result.targetBox.height-result.nativeBox.height)<0.5,actual:{host:result.targetBox,native:result.nativeBox}});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0,actual:result.horizontalOverflow});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
    if (result.menu) {
      assertions.push({name:`${result.name} menu open`,pass:result.menu.open==='true'&&['top','bottom'].includes(result.menu.placement),actual:result.menu});
      assertions.push({name:`${result.name} menu within preview`,pass:result.menu.surface.x>=result.previewBox.x-0.5&&result.menu.surface.y>=result.previewBox.y-0.5&&result.menu.surface.right<=result.previewBox.right+0.5&&result.menu.surface.bottom<=result.previewBox.bottom+0.5,actual:{preview:result.previewBox,surface:result.menu.surface}});
      assertions.push({name:`${result.name} trigger semantics`,pass:result.menu.trigger.expanded==='true'&&result.menu.trigger.hasPopup==='menu'&&result.menu.trigger.controls,actual:result.menu.trigger});
      assertions.push({name:`${result.name} mixed actions`,pass:result.menu.actionCount===5&&result.menu.actionRoles.every((role)=>role==='menuitem')&&result.menu.presentations.some((entry)=>entry.tag==='ERP-FAB')&&result.menu.presentations.some((entry)=>!entry.icon),actual:result.menu.presentations});
      assertions.push({name:`${result.name} keyboard focus`,pass:result.interaction.closed==='false'&&result.interaction.expanded==='false'&&result.interaction.focusReturned&&result.interaction.keyboardLabel,actual:result.interaction});
    } else {
      assertions.push({name:`${result.name} event`,pass:result.eventEvidence.includes('pressed'),actual:result.eventEvidence});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt:new Date().toISOString(),authority:{reference:'Skodash RTL component-buttons fallback contains no FAB-specific class or owner; FAB composition remains an original Honesty ERP candidate.',referenceUrl:REFERENCE_URL,systemSubstitutions:['Honesty ERP colors','Honesty ERP typography'],reference},scenarios:results,assertions,summary:{total:assertions.length,passed:assertions.length-failed.length,failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
