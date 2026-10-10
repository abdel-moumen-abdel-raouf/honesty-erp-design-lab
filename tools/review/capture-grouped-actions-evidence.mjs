import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-grouped-actions', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const REFERENCE_URL = 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-buttons.html';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'button-group-1440-light-rtl', component: 'button-group', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 4, vertical: false},
  {name: 'button-group-390-dark-ltr', component: 'button-group', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 4, vertical: true},
  {name: 'split-button-1440-light-rtl', component: 'split-button', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 3},
  {name: 'split-button-390-dark-ltr', component: 'split-button', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 3},
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

async function screenshotReferenceCard(client, fileName, title) {
  const clip = await evaluate(client, `(() => { const card=Array.from(document.querySelectorAll('.card')).find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()===${JSON.stringify(title)}); const r=card.getBoundingClientRect(); return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}; })()`);
  const result = await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: true, clip});
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

async function resetScroll(client) {
  await evaluate(client, `(() => { let node=document.querySelector('[data-showcase-target]'); while(node){ if(node.scrollHeight>node.clientHeight) node.scrollTop=0; node=node.parentElement; } })()`);
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-grouped-actions-evidence-'));
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
  await waitFor(() => evaluate(client, `(() => { const card=Array.from(document.querySelectorAll('.card')).find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()==='Group Buttons'); const button=card?.querySelector('.btn-group .btn'); return Array.from(document.styleSheets).filter((sheet)=>sheet.href).length>5 && button?.getBoundingClientRect().height>=38; })()`));
  const reference = await evaluate(client, `(() => { const cards=Array.from(document.querySelectorAll('.card')); const groupCard=cards.find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()==='Group Buttons'); const dropdownCard=cards.find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()==='Dropdown Buttons'); const group=groupCard.querySelector('.btn-group'); const dropdown=dropdownCard.querySelector('.btn-group'); const buttons=Array.from(group.querySelectorAll('.btn')); const box=group.getBoundingClientRect(); const dropdownBox=dropdown.getBoundingClientRect(); return {url:location.href,direction:getComputedStyle(document.documentElement).direction,styles:Array.from(document.styleSheets).map((sheet)=>sheet.href).filter(Boolean),scripts:Array.from(document.scripts).map((script)=>script.src).filter(Boolean),groupBox:{x:box.x,y:box.y,width:box.width,height:box.height},dropdownBox:{x:dropdownBox.x,y:dropdownBox.y,width:dropdownBox.width,height:dropdownBox.height},buttons:buttons.map((button)=>{const r=button.getBoundingClientRect();const s=getComputedStyle(button);return{box:{x:r.x,y:r.y,width:r.width,height:r.height},padding:s.padding,borderRadius:s.borderRadius,borderWidth:s.borderWidth,fontSize:s.fontSize,lineHeight:s.lineHeight};})}; })()`);
  await evaluate(client, `(() => { const card=Array.from(document.querySelectorAll('.card')).find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()==='Group Buttons'); window.scrollTo(0, card.getBoundingClientRect().top + scrollY - 120); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  await screenshotReferenceCard(client, 'reference-skodash-button-groups-1440-rtl.png', 'Group Buttons');
  await evaluate(client, `(() => { const card=Array.from(document.querySelectorAll('.card')).find((entry)=>entry.querySelector('.card-title')?.textContent?.trim()==='Dropdown Buttons'); window.scrollTo(0, card.getBoundingClientRect().top + scrollY - 120); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  await screenshotReferenceCard(client, 'reference-skodash-dropdown-buttons-1440-rtl.png', 'Dropdown Buttons');

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

    if (scenario.component === 'button-group') {
      if (scenario.vertical) {
        await choose(client, 'orientation', 'vertical');
        await setBoolean(client, 'attached', false);
      }
      await evaluate(client, `document.querySelectorAll('[data-showcase-target] button')[1]?.click()`);
      await resetScroll(client);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const measurement = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const buttons=Array.from(host.querySelectorAll('button')); const box=host.getBoundingClientRect(); const boxes=buttons.map((button)=>{const r=button.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}}); const union={left:Math.min(...boxes.map((r)=>r.x)),top:Math.min(...boxes.map((r)=>r.y)),right:Math.max(...boxes.map((r)=>r.right)),bottom:Math.max(...boxes.map((r)=>r.bottom))}; return {name:${JSON.stringify(scenario.name)},component:'button-group',viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(host).direction,primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,hostBox:{x:box.x,y:box.y,width:box.width,height:box.height},buttonBoxes:boxes,buttonCount:buttons.length,groupLabel:host.querySelector('[role="group"]')?.getAttribute('aria-label'),orientation:host.getAttribute('data-button-group-orientation'),attached:host.getAttribute('data-button-group-attached'),contentBox:{width:union.right-union.left,height:union.bottom-union.top},eventEvidence:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)}}; })()`);
      results.push(measurement);
    } else {
      await evaluate(client, `document.querySelector('[data-showcase-target] [data-split-button-primary] button')?.click()`);
      await evaluate(client, `document.querySelector('[data-showcase-target] [data-split-button-menu-trigger] button')?.click()`);
      await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-split-button-open') === 'true'`));
      await new Promise((resolve) => setTimeout(resolve, 100));
      const measurement = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const trigger=host.querySelector('[data-split-button-menu-trigger] button'); const surface=host.querySelector('.split-button__menu'); const box=host.getBoundingClientRect(); const surfaceBox=surface.getBoundingClientRect(); const items=Array.from(surface.querySelectorAll('[data-action-item]')); return {name:${JSON.stringify(scenario.name)},component:'split-button',viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(host).direction,primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,hostBox:{x:box.x,y:box.y,width:box.width,height:box.height},open:host.getAttribute('data-split-button-open'),placement:host.getAttribute('data-split-button-resolved-placement'),trigger:{expanded:trigger.getAttribute('aria-expanded'),hasPopup:trigger.getAttribute('aria-haspopup'),controls:trigger.getAttribute('aria-controls')},surface:{id:surface.id,x:surfaceBox.x,y:surfaceBox.y,right:surfaceBox.right,bottom:surfaceBox.bottom,width:surfaceBox.width,height:surfaceBox.height,overflowY:getComputedStyle(surface).overflowY},menuRoleCount:surface.querySelectorAll('[role="menu"]').length,menuLabel:surface.querySelector('[role="menu"]')?.getAttribute('aria-label'),items:items.map((item)=>({tag:item.tagName,role:item.querySelector('button')?.getAttribute('role'),disabled:item.querySelector('button')?.disabled,icon:!!item.querySelector('erp-icon')})),eventEvidence:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'',horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)}}; })()`);
      results.push(measurement);
    }
    await screenshot(client, `${scenario.name}.png`);
    if (scenario.component === 'split-button') {
      await evaluate(client, `document.querySelector('[data-showcase-target] [data-action-item] button:not([disabled])')?.click()`);
      await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-split-button-open') === 'false'`));
      const selectionEvent = await evaluate(client, `document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? ''`);
      await evaluate(client, `document.querySelector('[data-showcase-target] [data-split-button-menu-trigger] button')?.click()`);
      await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-split-button-open') === 'true'`));
      await new Promise((resolve) => setTimeout(resolve, 0));
      await evaluate(client, `document.activeElement?.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}))`);
      const keyboardValue = await evaluate(client, `document.activeElement?.closest('[data-action-item]')?.getAttribute('data-value') ?? null`);
      await evaluate(client, `document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
      await new Promise((resolve) => setTimeout(resolve, 0));
      const interaction = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const trigger=host.querySelector('[data-split-button-menu-trigger] button'); return {selectionEvent:${JSON.stringify(selectionEvent)},keyboardValue:${JSON.stringify(keyboardValue)},closed:host.getAttribute('data-split-button-open'),expanded:trigger.getAttribute('aria-expanded'),focusReturned:document.activeElement===trigger}; })()`);
      results.at(-1).interaction = interaction;
    }
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name:`${result.name} target`,pass:result.primaryTargetCount===1,actual:result.primaryTargetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===scenario.controls,actual:result.controlCount});
    assertions.push({name:`${result.name} theme`,pass:result.theme===scenario.theme,actual:result.theme});
    assertions.push({name:`${result.name} direction`,pass:result.direction===scenario.direction,actual:result.direction});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0,actual:result.horizontalOverflow});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
    if (result.component === 'button-group') {
      assertions.push({name:`${result.name} three actions`,pass:result.buttonCount===3,actual:result.buttonCount});
      assertions.push({name:`${result.name} label`,pass:result.groupLabel==='إجراءات المستند',actual:result.groupLabel});
      assertions.push({name:`${result.name} state`,pass:result.orientation===(scenario.vertical?'vertical':'horizontal')&&result.attached===(scenario.vertical?'false':'true'),actual:{orientation:result.orientation,attached:result.attached}});
      assertions.push({name:`${result.name} content-sized host`,pass:Math.abs(result.hostBox.width-result.contentBox.width)<0.5&&Math.abs(result.hostBox.height-result.contentBox.height)<0.5,actual:{host:result.hostBox,content:result.contentBox}});
      assertions.push({name:`${result.name} event`,pass:result.eventEvidence.includes('itemPressed: preview'),actual:result.eventEvidence});
    } else {
      assertions.push({name:`${result.name} open`,pass:result.open==='true'&&['top','bottom'].includes(result.placement),actual:{open:result.open,placement:result.placement}});
      assertions.push({name:`${result.name} trigger semantics`,pass:result.trigger.expanded==='true'&&result.trigger.hasPopup==='menu'&&result.trigger.controls===result.surface.id,actual:result.trigger});
      assertions.push({name:`${result.name} one menu`,pass:result.menuRoleCount===1&&result.menuLabel==='حفظ - القائمة',actual:{count:result.menuRoleCount,label:result.menuLabel}});
      assertions.push({name:`${result.name} mixed actions`,pass:result.items.length===5&&result.items.every((item)=>item.role==='menuitem')&&result.items.some((item)=>item.tag==='ERP-ICON-BUTTON')&&result.items.some((item)=>!item.icon),actual:result.items});
      assertions.push({name:`${result.name} viewport containment`,pass:result.surface.x>=0&&result.surface.y>=0&&result.surface.right<=result.viewport.width&&result.surface.bottom<=result.viewport.height,actual:result.surface});
      assertions.push({name:`${result.name} primary event`,pass:result.eventEvidence.includes('primaryPressed'),actual:result.eventEvidence});
      assertions.push({name:`${result.name} selection event`,pass:result.interaction.selectionEvent.includes('itemSelected: save-close'),actual:result.interaction.selectionEvent});
      assertions.push({name:`${result.name} keyboard and focus`,pass:result.interaction.keyboardValue==='save-copy'&&result.interaction.closed==='false'&&result.interaction.expanded==='false'&&result.interaction.focusReturned,actual:result.interaction});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt:new Date().toISOString(),authority:{reference:'Skodash RTL component-buttons fallback; not a component-specific exact contract.',referenceUrl:REFERENCE_URL,systemSubstitutions:['Honesty ERP colors','Honesty ERP typography'],reference},scenarios:results,assertions,summary:{total:assertions.length,passed:assertions.length-failed.length,failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
