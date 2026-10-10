import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-feedback', 'alert-skeleton-v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const ALERT_REFERENCE_URL = 'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-alerts.html';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'alert-info-1440-light-rtl', component: 'alert', width: 1440, height: 900, theme: 'light', direction: 'rtl', tone: 'info', dismissible: true},
  {name: 'alert-danger-390-dark-ltr', component: 'alert', width: 390, height: 844, theme: 'dark', direction: 'ltr', tone: 'danger', dismissible: true, long: true},
  {name: 'alert-success-390-light-rtl', component: 'alert', width: 390, height: 844, theme: 'light', direction: 'rtl', tone: 'success', dismissible: false},
  {name: 'skeleton-line-1440-light-rtl', component: 'skeleton', width: 1440, height: 900, theme: 'light', direction: 'rtl', variant: 'line', size: 'md', lines: 3, animated: true},
  {name: 'skeleton-block-390-dark-ltr', component: 'skeleton', width: 390, height: 844, theme: 'dark', direction: 'ltr', variant: 'block', size: 'lg', lines: 1, animated: false},
  {name: 'skeleton-circle-390-dark-rtl-reduced', component: 'skeleton', width: 390, height: 844, theme: 'dark', direction: 'rtl', variant: 'circle', size: 'sm', lines: 2, animated: true, reducedMotion: true},
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

async function setEditorValue(client, name, value) {
  await evaluate(client, `(() => {
    const input=document.querySelector('[data-showcase-control="${name}"] input');
    if (!input) return;
    const descriptor=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
    descriptor?.set?.call(input,${JSON.stringify(String(value))});
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.dispatchEvent(new Event('change',{bubbles:true}));
  })()`);
}

async function positionTarget(client) {
  await evaluate(client, `(() => {
    const target=document.querySelector('[data-showcase-target]');
    if (!target) return;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    let owner=target.parentElement;
    while(owner){
      const style=getComputedStyle(owner);
      if(owner.scrollHeight>owner.clientHeight && (['auto','scroll'].includes(style.overflowY) || owner===document.documentElement)) break;
      owner=owner.parentElement;
    }
    if (!owner) return;
    const targetBox=target.getBoundingClientRect();
    const ownerBox=owner.getBoundingClientRect();
    const offset=Math.min(150,Math.max(72,(owner.clientHeight-targetBox.height)/2));
    if(owner===document.scrollingElement){
      window.scrollTo({top:Math.max(0,window.scrollY+targetBox.top-offset),behavior:'instant'});
      return;
    }
    owner.scrollTop+=targetBox.top-(ownerBox.top+offset);
  })()`);
}

async function captureAlertReference(client) {
  client.diagnostics.length = 0;
  await client.command('Emulation.setDeviceMetricsOverride', {width: 1440, height: 900, deviceScaleFactor: 1, mobile: false});
  await client.command('Page.navigate', {url: ALERT_REFERENCE_URL});
  try {
    await waitFor(() => evaluate(client, `document.querySelectorAll('.alert').length >= 5`), 25_000);
    await evaluate(client, `document.querySelector('.alert.bg-light-success')?.scrollIntoView({block:'center',inline:'nearest'})`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const evidence = await evaluate(client, `(() => {
      const alert=document.querySelector('.alert.bg-light-success') ?? document.querySelector('.alert');
      const r=alert.getBoundingClientRect(); const s=getComputedStyle(alert);
      return {available:true,url:location.href,title:document.title,selector:'.alert.bg-light-success',className:alert.className,html:alert.outerHTML,
        rect:{width:r.width,height:r.height},positionLimitation:'The vendor page uses nested fixed/scroll regions; absolute viewport position is not recorded as a verified contract.',style:{padding:s.padding,border:s.border,borderRadius:s.borderRadius,backgroundColor:s.backgroundColor,color:s.color,fontSize:s.fontSize,lineHeight:s.lineHeight,marginBottom:s.marginBottom},
        styles:Array.from(new Set([...Array.from(document.styleSheets).map((sheet)=>sheet.href).filter(Boolean),...performance.getEntriesByType('resource').map((entry)=>entry.name).filter((name)=>name.endsWith('.css'))])),scripts:Array.from(document.scripts).map((script)=>script.src).filter(Boolean),diagnostics:${JSON.stringify(client.diagnostics)}};
    })()`);
    await screenshot(client, 'reference-skodash-alerts-1440-rtl.png');
    return evidence;
  } catch (error) {
    return {available:false,url:ALERT_REFERENCE_URL,limitation:String(error),diagnostics:[...client.diagnostics]};
  }
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-feedback-evidence-'));
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
  const reference = await captureAlertReference(client);
  const results = [];

  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {width:scenario.width,height:scenario.height,deviceScaleFactor:1,mobile:false});
    await client.command('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:scenario.reducedMotion?'reduce':'no-preference'}]});
    await client.command('Page.navigate', {url:APP_URL});
    await waitFor(() => evaluate(client, `document.readyState === 'complete'`));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme','${scenario.theme}')`);
    await client.command('Page.navigate', {url:`${APP_URL}/components/${scenario.component}`});
    await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; })()`);

    if (scenario.component === 'alert') {
      await choose(client, 'tone', scenario.tone);
      await setBoolean(client, 'dismissible', scenario.dismissible);
      if (scenario.long) {
        await setEditorValue(client, 'title', 'تعذر إكمال اعتماد فاتورة المورد الدولية');
        await setEditorValue(client, 'description', 'راجع بيانات الضريبة والعملة ومركز التكلفة قبل إعادة محاولة الاعتماد النهائي للسجل.');
      }
    } else {
      await choose(client, 'variant', scenario.variant);
      await choose(client, 'size', scenario.size);
      await setEditorValue(client, 'lines', scenario.lines);
      await setBoolean(client, 'animated', scenario.animated);
    }
    await positionTarget(client);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await positionTarget(client);

    const measurement = await evaluate(client, `(() => {
      const target=document.querySelector('[data-showcase-target]'); const r=target.getBoundingClientRect();
      const box=(element)=>{if(!element)return null;const value=element.getBoundingClientRect();return{x:value.x,y:value.y,right:value.right,bottom:value.bottom,width:value.width,height:value.height}};
      const base={name:${JSON.stringify(scenario.name)},component:${JSON.stringify(scenario.component)},viewport:{width:innerWidth,height:innerHeight},theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),direction:getComputedStyle(target).direction,targetCount:document.querySelectorAll('[data-showcase-target]').length,controlCount:document.querySelectorAll('[data-showcase-control]').length,targetBox:box(target),horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),diagnostics:${JSON.stringify(client.diagnostics)}};
      if(${JSON.stringify(scenario.component)}==='alert'){
        const copy=target.querySelector('.alert__copy'); const title=target.querySelector('.alert__title'); const description=target.querySelector('.alert__description'); const actions=target.querySelector('.alert__actions');
        return {...base,tone:target.getAttribute('data-alert-tone'),role:target.getAttribute('role'),iconCount:target.querySelectorAll('.alert__icon').length,projectedActionCount:target.querySelectorAll('erp-button[erpalertaction]').length,closeCount:target.querySelectorAll('erp-tooltip erp-icon-button').length,copyBox:box(copy),actionsBox:box(actions),titleBox:box(title),descriptionBox:box(description),titleOverflow:title?title.scrollHeight-title.clientHeight:0,descriptionOverflow:description?description.scrollHeight-description.clientHeight:0,actionsDisplay:actions?getComputedStyle(actions).display:null};
      }
      const shapes=Array.from(target.querySelectorAll('.skeleton__shape'));
      return {...base,variant:target.getAttribute('data-skeleton-variant'),size:target.getAttribute('data-skeleton-size'),animated:target.getAttribute('data-skeleton-animated'),role:target.getAttribute('role'),label:target.getAttribute('aria-label'),shapeCount:shapes.length,shapeBoxes:shapes.map(box),animationNames:shapes.map((shape)=>getComputedStyle(shape,'::after').animationName)};
    })()`);

    if (scenario.component === 'alert') {
      await evaluate(client, `document.querySelector('[data-showcase-target] erp-button[erpalertaction] button')?.click()`);
      const actionEvidence = await evaluate(client, `document.querySelector('[data-showcase-event-log]')?.textContent?.includes('alertActionPressed: true')`);
      let dismissEvidence = null;
      if (scenario.dismissible) {
        await evaluate(client, `document.querySelector('[data-showcase-target] erp-icon-button button')?.click()`);
        dismissEvidence = await evaluate(client, `document.querySelector('[data-showcase-event-log]')?.textContent?.includes('dismissed:')`);
      }
      measurement.interaction={actionEvidence,dismissEvidence};
    }
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);
  }

  const assertions=[];
  for (const result of results) {
    const scenario=scenarios.find((entry)=>entry.name===result.name);
    assertions.push({name:`${result.name} target`,pass:result.targetCount===1,actual:result.targetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===(scenario.component==='alert'?6:5),actual:result.controlCount});
    assertions.push({name:`${result.name} theme-direction`,pass:result.theme===scenario.theme&&result.direction===scenario.direction,actual:{theme:result.theme,direction:result.direction}});
    assertions.push({name:`${result.name} containment`,pass:result.targetBox.x>=0&&result.targetBox.y>=0&&result.targetBox.right<=result.viewport.width&&result.targetBox.bottom<=result.viewport.height,actual:result.targetBox});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0,actual:result.horizontalOverflow});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
    if (scenario.component==='alert') {
      assertions.push({name:`${result.name} anatomy`,pass:result.iconCount===1&&result.projectedActionCount===1&&result.closeCount===(scenario.dismissible?1:0)&&result.copyBox.width>=150,actual:result});
      assertions.push({name:`${result.name} semantics`,pass:result.tone===scenario.tone&&result.role===(scenario.tone==='danger'?'alert':'status'),actual:{tone:result.tone,role:result.role}});
      assertions.push({name:`${result.name} text`,pass:result.titleOverflow===0&&result.descriptionOverflow===0,actual:{title:result.titleOverflow,description:result.descriptionOverflow}});
      assertions.push({name:`${result.name} interaction`,pass:result.interaction.actionEvidence&&(!scenario.dismissible||result.interaction.dismissEvidence),actual:result.interaction});
    } else {
      assertions.push({name:`${result.name} anatomy`,pass:result.variant===scenario.variant&&result.size===scenario.size&&result.animated===String(scenario.animated)&&result.shapeCount===scenario.lines,actual:result});
      assertions.push({name:`${result.name} semantics`,pass:result.role==='status'&&result.label==='جارٍ تحميل المحتوى',actual:{role:result.role,label:result.label}});
      assertions.push({name:`${result.name} motion`,pass:scenario.reducedMotion?result.animationNames.every((name)=>name==='none'):true,actual:result.animationNames});
    }
  }
  const failed=assertions.filter((entry)=>!entry.pass);
  const report={generatedAt:new Date().toISOString(),authority:{alert:{url:ALERT_REFERENCE_URL,evidence:reference,classification:'Skodash fallback presentation evidence; not an exact Honesty ERP contract'},skeleton:{available:false,classification:'Explicit original Honesty ERP candidate',limitation:'No component-specific Skodash or Product Owner exact reference is recorded.'},systemSubstitutions:['Honesty ERP colors','Honesty ERP typography']},scenarios:results,assertions,summary:{total:assertions.length,passed:assertions.length-failed.length,failed}};
  await fs.writeFile(path.join(OUTPUT,'runtime-measurements.json'),`${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode=1;
} finally {
  chrome.kill();
  try { await fs.rm(profile,{recursive:true,force:true}); }
  catch (error) { if (error?.code!=='EBUSY') throw error; }
}
