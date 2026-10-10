import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-file-image-pickers', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'file-picker-1440-light-rtl', component: 'file-picker', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 27},
  {name: 'file-picker-390-dark-ltr', component: 'file-picker', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 27},
  {name: 'image-picker-1440-light-rtl', component: 'image-picker', width: 1440, height: 900, theme: 'light', direction: 'rtl', controls: 28},
  {name: 'image-picker-390-dark-ltr', component: 'image-picker', width: 390, height: 844, theme: 'dark', direction: 'ltr', controls: 28},
];

async function waitFor(predicate, timeout = 15_000) {
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
  const result = await client.command('Page.captureScreenshot', {format: 'png', fromSurface: true, captureBeyondViewport: false, ...(clip ? {clip} : {})});
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-file-image-picker-evidence-'));
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
  await client.command('Page.bringToFront');
  await client.command('Emulation.setFocusEmulationEnabled', {enabled: true});
  await client.command('Runtime.enable');
  await client.command('Log.enable');
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

    await evaluate(client, `(() => {
      const input=document.querySelector('[data-showcase-target] input[type="file"]');
      const transfer=new DataTransfer();
      if(${JSON.stringify(scenario.component)}==='file-picker'){
        transfer.items.add(new File(['approved offer'], 'عرض-السعر.pdf', {type:'application/pdf',lastModified:1}));
        transfer.items.add(new File(['rejected note'], 'ملاحظة.txt', {type:'text/plain',lastModified:2}));
      }else{
        const bytes=Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nSAAAAAASUVORK5CYII='), character=>character.charCodeAt(0));
        transfer.items.add(new File([bytes], 'صورة-الصنف.png', {type:'image/png',lastModified:1}));
        transfer.items.add(new File(['rejected'], 'ملاحظة.txt', {type:'text/plain',lastModified:2}));
      }
      input.files=transfer.files; input.dispatchEvent(new Event('change',{bubbles:true}));
    })()`);
    const itemSelector = scenario.component === 'file-picker' ? '[data-file-picker-item]' : '[data-image-picker-item]';
    await waitFor(() => evaluate(client, `document.querySelectorAll('${itemSelector}').length === 1`));
    if (scenario.component === 'image-picker') {
      await waitFor(() => evaluate(client, 'document.querySelector("[data-image-picker-item] img")?.complete === true'));
    }
    await evaluate(client, `(() => { const zone=document.querySelector('[data-showcase-target] [class$="__drop-zone"]'); const enter=new Event('dragenter',{bubbles:true,cancelable:true}); zone.dispatchEvent(enter); })()`);
    const dragActive = await evaluate(client, `document.querySelector('[data-showcase-target]').getAttribute('${scenario.component === 'file-picker' ? 'data-file-picker-drag-active' : 'data-image-picker-drag-active'}')`);
    await evaluate(client, `(() => { const zone=document.querySelector('[data-showcase-target] [class$="__drop-zone"]'); const leave=new Event('dragleave',{bubbles:true,cancelable:true}); zone.dispatchEvent(leave); })()`);

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]'); const preview=document.querySelector('[data-showcase-case="live"]');
      const box=target.getBoundingClientRect(); const previewBox=preview.getBoundingClientRect();
      const items=[...target.querySelectorAll(${JSON.stringify(itemSelector)})];
      const images=[...target.querySelectorAll('img')];
      return {
        name:${JSON.stringify(scenario.name)}, component:${JSON.stringify(scenario.component)}, viewport:{width:innerWidth,height:innerHeight},
        theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'), direction:document.documentElement.dir,
        computedDirection:getComputedStyle(target).direction, primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,
        controlCount:document.querySelectorAll('[data-showcase-control]').length, targetBox:{x:box.x,y:box.y,width:box.width,height:box.height},
        previewBox:{x:previewBox.x,y:previewBox.y,width:previewBox.width,height:previewBox.height}, itemCount:items.length,
        selectedName:items[0]?.textContent?.trim()??'', feedback:target.querySelector('erp-field-feedback')?.textContent?.trim()??'',
        eventEvidence:document.querySelector('[data-showcase-event-log]')?.textContent?.trim()??'', previewSize:target.getAttribute('data-image-picker-preview-size'),
        imageCount:images.length, brokenImages:images.filter((image)=>image.complete&&image.naturalWidth===0).length,
        horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth), diagnostics:${JSON.stringify(client.diagnostics)}, dragActive:${JSON.stringify(dragActive)}
      };
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}-selected-full.png`);
    await evaluate(client, `document.querySelector('[data-showcase-case="live"]')?.scrollIntoView({block:'start'})`);
    await new Promise((resolve) => setTimeout(resolve, 120));
    await screenshot(client, `${scenario.name}-selected-live.png`);

    await evaluate(client, `document.querySelector('[data-showcase-target] [data-${scenario.component}-clear-all] button')?.click()`);
    await waitFor(() => evaluate(client, `document.querySelectorAll('${itemSelector}').length === 0`));
    measurement.clearedCount = await evaluate(client, `document.querySelector('[data-showcase-target]').getAttribute('${scenario.component === 'file-picker' ? 'data-file-picker-count' : 'data-image-picker-count'}')`);
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    const expectedName = result.component === 'file-picker' ? 'عرض-السعر.pdf' : 'صورة-الصنف.png';
    assertions.push({name:`${result.name} target`,pass:result.primaryTargetCount===1,actual:result.primaryTargetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===scenario.controls,actual:result.controlCount});
    assertions.push({name:`${result.name} theme`,pass:result.theme===scenario.theme,actual:result.theme});
    assertions.push({name:`${result.name} direction`,pass:result.computedDirection===scenario.direction,actual:result.computedDirection});
    assertions.push({name:`${result.name} selection`,pass:result.itemCount===1&&result.selectedName.includes(expectedName),actual:{count:result.itemCount,name:result.selectedName}});
    assertions.push({name:`${result.name} policy`,pass:result.feedback.includes('غير مسموح'),actual:result.feedback});
    assertions.push({name:`${result.name} event`,pass:result.eventEvidence.includes(expectedName),actual:result.eventEvidence});
    assertions.push({name:`${result.name} drag`,pass:result.dragActive==='true',actual:result.dragActive});
    assertions.push({name:`${result.name} image`,pass:result.component==='file-picker'||(result.imageCount===1&&result.brokenImages===0),actual:{count:result.imageCount,broken:result.brokenImages}});
    assertions.push({name:`${result.name} preview size`,pass:result.component==='file-picker'||result.previewSize==='lg',actual:result.previewSize});
    assertions.push({name:`${result.name} clear`,pass:result.clearedCount==='0',actual:result.clearedCount});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0,actual:result.horizontalOverflow});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt:new Date().toISOString(),authority:'Original Honesty ERP candidates; no binding component-specific external reference is recorded.',scenarios:results,assertions,summary:{total:assertions.length,passed:assertions.length-failed.length,failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  if (chrome.exitCode === null) await Promise.race([new Promise((resolve)=>chrome.once('exit',resolve)),new Promise((resolve)=>setTimeout(resolve,2_000))]);
  for (let attempt=0;attempt<10;attempt+=1) {
    try { await fs.rm(profile,{recursive:true,force:true}); break; }
    catch (error) { if (error?.code!=='EBUSY'||attempt===9) throw error; await new Promise((resolve)=>setTimeout(resolve,200)); }
  }
}
