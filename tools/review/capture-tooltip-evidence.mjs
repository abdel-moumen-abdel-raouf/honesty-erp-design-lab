import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-tooltip', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:5001';
const MATERIAL_URL = 'https://m3.material.io/components/tooltips/guidelines';
const MOBBIN_URL = 'https://mobbin.com/glossary/tooltip';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'plain-1440-light-rtl-top', width: 1440, height: 900, theme: 'light', direction: 'rtl', variant: 'plain', interactive: false, placement: 'top', activation: 'auto'},
  {name: 'plain-390-dark-ltr-bottom', width: 390, height: 844, theme: 'dark', direction: 'ltr', variant: 'plain', interactive: false, placement: 'bottom', activation: 'auto'},
  {name: 'rich-info-1440-light-ltr-start', width: 1440, height: 900, theme: 'light', direction: 'ltr', variant: 'rich', interactive: false, placement: 'start', activation: 'auto'},
  {name: 'rich-interactive-390-dark-rtl-end', width: 390, height: 844, theme: 'dark', direction: 'rtl', variant: 'rich', interactive: true, placement: 'end', activation: 'press'},
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

async function resetScroll(client) {
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
    const offset=Math.min(160,Math.max(72,(owner.clientHeight-targetBox.height)/2));
    if(owner===document.scrollingElement){
      window.scrollTo({top:Math.max(0,window.scrollY+targetBox.top-offset),behavior:'instant'});
      return;
    }
    owner.scrollTop+=targetBox.top-(ownerBox.top+offset);
  })()`);
}

async function captureReference(client, url, fileName, readyExpression) {
  client.diagnostics.length = 0;
  await client.command('Page.navigate', {url});
  try {
    await waitFor(() => evaluate(client, readyExpression), 25_000);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const evidence = await evaluate(client, `({url:location.href,title:document.title,direction:getComputedStyle(document.documentElement).direction,heading:document.querySelector('h1')?.textContent?.trim()??null,textSample:document.body.innerText.slice(0,500),styles:Array.from(document.styleSheets).map((sheet)=>sheet.href).filter(Boolean),scripts:Array.from(document.scripts).map((script)=>script.src).filter(Boolean),diagnostics:${JSON.stringify(client.diagnostics)}})`);
    await screenshot(client, fileName);
    return {available: true, ...evidence};
  } catch (error) {
    return {available: false, url, limitation: String(error), diagnostics: [...client.diagnostics]};
  }
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-tooltip-evidence-'));
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

  const references = {
    material3: await captureReference(client, MATERIAL_URL, 'reference-material3-tooltip-1440.png', `document.readyState === 'complete' && document.body.innerText.toLowerCase().includes('tooltip')`),
    mobbin: await captureReference(client, MOBBIN_URL, 'reference-mobbin-tooltip-1440.png', `document.readyState === 'complete' && document.body.innerText.includes('Tooltip UI')`),
  };

  const results = [];
  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: false});
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, `document.readyState === 'complete'`));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/tooltip`});
    await waitFor(() => evaluate(client, `document.querySelectorAll('[data-showcase-target]').length === 1`));
    await evaluate(client, `(() => { document.documentElement.dir='${scenario.direction}'; document.body.dir='${scenario.direction}'; document.documentElement.style.direction='${scenario.direction}'; document.body.style.direction='${scenario.direction}'; })()`);
    await choose(client, 'variant', scenario.variant);
    await setBoolean(client, 'interactive', scenario.interactive);
    await choose(client, 'placement', scenario.placement);
    await choose(client, 'activation', scenario.activation);
    await resetScroll(client);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await resetScroll(client);

    if (scenario.activation === 'press') {
      await evaluate(client, `document.querySelector('[data-showcase-target] > .erp-tooltip__trigger button')?.click()`);
    } else {
      await evaluate(client, `document.querySelector('[data-showcase-target] > .erp-tooltip__trigger')?.dispatchEvent(new FocusEvent('focusin',{bubbles:true}))`);
    }
    await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-tooltip-open') === 'true'`));
    await new Promise((resolve) => setTimeout(resolve, 400));

    const measurement = await evaluate(client, `(() => {
      const host=document.querySelector('[data-showcase-target]');
      const trigger=host.querySelector('.erp-tooltip__trigger button');
      const surface=host.querySelector('.erp-tooltip__surface');
      const motion=host.querySelector('.erp-tooltip__motion');
      const arrow=host.querySelector('.erp-tooltip__arrow');
      const box=(element)=>{const r=element.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
      return {
        name:${JSON.stringify(scenario.name)}, viewport:{width:innerWidth,height:innerHeight},
        theme:document.querySelector('#lab-capture-root')?.getAttribute('data-theme'), direction:getComputedStyle(host).direction,
        variant:host.getAttribute('data-tooltip-variant'), interactive:host.getAttribute('data-tooltip-interactive'),
        authoredPlacement:host.getAttribute('data-tooltip-placement'), resolvedPlacement:host.getAttribute('data-tooltip-resolved-placement'),
        state:host.getAttribute('data-tooltip-state'), open:host.getAttribute('data-tooltip-open'),
        primaryTargetCount:document.querySelectorAll('[data-showcase-target]').length,
        controlCount:document.querySelectorAll('[data-showcase-control]').length,
        hostBox:box(host), triggerBox:box(trigger), surfaceBox:box(surface), motionBox:box(motion), arrowBox:arrow?box(arrow):null,
        role:surface.getAttribute('role'), describedBy:trigger.getAttribute('aria-describedby'),
        hasPopup:trigger.getAttribute('aria-haspopup'), controls:trigger.getAttribute('aria-controls'), expanded:trigger.getAttribute('aria-expanded'),
        contentCount:host.querySelectorAll('erp-tooltip-content').length,
        richActionCount:host.querySelectorAll('erp-tooltip-content button').length,
        surfaceOverflow:getComputedStyle(surface).overflow,
        horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth), diagnostics:${JSON.stringify(client.diagnostics)}
      };
    })()`);
    results.push(measurement);
    await screenshot(client, `${scenario.name}.png`);

    if (scenario.interactive) {
      await evaluate(client, `document.querySelector('[data-showcase-target] erp-tooltip-content button')?.focus()`);
      const actionFocused = await evaluate(client, `document.activeElement === document.querySelector('[data-showcase-target] erp-tooltip-content button')`);
      await evaluate(client, `document.activeElement?.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
      await waitFor(() => evaluate(client, `document.querySelector('[data-showcase-target]')?.getAttribute('data-tooltip-open') === 'false'`));
      measurement.interaction = await evaluate(client, `(() => { const host=document.querySelector('[data-showcase-target]'); const trigger=host.querySelector('.erp-tooltip__trigger button'); return {actionFocused:${JSON.stringify(actionFocused)},closed:host.getAttribute('data-tooltip-open'),expanded:trigger.getAttribute('aria-expanded'),focusReturned:document.activeElement===trigger}; })()`);
    }
  }

  const assertions = [];
  for (const result of results) {
    const scenario = scenarios.find((entry) => entry.name === result.name);
    assertions.push({name:`${result.name} target`,pass:result.primaryTargetCount===1,actual:result.primaryTargetCount});
    assertions.push({name:`${result.name} controls`,pass:result.controlCount===10,actual:result.controlCount});
    assertions.push({name:`${result.name} state`,pass:result.state==='ready'&&result.open==='true',actual:{state:result.state,open:result.open}});
    assertions.push({name:`${result.name} theme-direction`,pass:result.theme===scenario.theme&&result.direction===scenario.direction,actual:{theme:result.theme,direction:result.direction}});
    assertions.push({name:`${result.name} content-sized-host`,pass:Math.abs(result.hostBox.width-result.triggerBox.width)<0.5&&Math.abs(result.hostBox.height-result.triggerBox.height)<0.5,actual:{host:result.hostBox,trigger:result.triggerBox}});
    assertions.push({name:`${result.name} trigger containment`,pass:result.triggerBox.x>=0&&result.triggerBox.y>=0&&result.triggerBox.right<=result.viewport.width&&result.triggerBox.bottom<=result.viewport.height,actual:result.triggerBox});
    assertions.push({name:`${result.name} placement`,pass:['top','bottom','left','right'].includes(result.resolvedPlacement),actual:result.resolvedPlacement});
    assertions.push({name:`${result.name} containment`,pass:result.surfaceBox.x>=0&&result.surfaceBox.y>=0&&result.surfaceBox.right<=result.viewport.width&&result.surfaceBox.bottom<=result.viewport.height,actual:result.surfaceBox});
    assertions.push({name:`${result.name} arrow`,pass:result.arrowBox!==null,actual:result.arrowBox});
    assertions.push({name:`${result.name} overflow`,pass:result.horizontalOverflow===0&&result.surfaceOverflow==='visible',actual:{page:result.horizontalOverflow,surface:result.surfaceOverflow}});
    assertions.push({name:`${result.name} diagnostics`,pass:result.diagnostics.length===0,actual:result.diagnostics});
    if (scenario.variant === 'plain') {
      assertions.push({name:`${result.name} plain semantics`,pass:result.role==='tooltip'&&result.contentCount===0&&Boolean(result.describedBy),actual:{role:result.role,content:result.contentCount,describedBy:result.describedBy}});
    } else if (!scenario.interactive) {
      assertions.push({name:`${result.name} rich information`,pass:result.role==='tooltip'&&result.contentCount===1&&result.richActionCount===0,actual:{role:result.role,content:result.contentCount,actions:result.richActionCount}});
    } else {
      assertions.push({name:`${result.name} rich dialog`,pass:result.role==='dialog'&&result.contentCount===1&&result.richActionCount===1&&result.hasPopup==='dialog'&&Boolean(result.controls)&&result.expanded==='true',actual:result});
      assertions.push({name:`${result.name} keyboard dismissal`,pass:result.interaction.actionFocused&&result.interaction.closed==='false'&&result.interaction.expanded==='false'&&result.interaction.focusReturned,actual:result.interaction});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {
    generatedAt:new Date().toISOString(),
    authority:{material3Url:MATERIAL_URL,mobbinUrl:MOBBIN_URL,references,systemSubstitutions:['Honesty ERP colors','Honesty ERP typography']},
    scenarios:results, assertions, summary:{total:assertions.length,passed:assertions.length-failed.length,failed},
  };
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report,null,2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary,null,2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  try { await fs.rm(profile, {recursive: true, force: true}); }
  catch (error) { if (error?.code !== 'EBUSY') throw error; }
}
