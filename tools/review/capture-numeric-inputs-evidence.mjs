import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-numeric-inputs', 'v1-internal-review');
const APP_URL = process.env['HONESTY_REVIEW_URL'] ?? 'http://127.0.0.1:4999';
const CHROME = process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const scenarios = [
  {name: 'number-stepper-1440-light-rtl-default', id: 'number-stepper', width: 1440, height: 900, theme: 'light', direction: 'rtl', alternate: false},
  {name: 'number-stepper-390-dark-ltr-alternate', id: 'number-stepper', width: 390, height: 844, theme: 'dark', direction: 'ltr', alternate: true},
  {name: 'range-slider-1440-light-rtl-default', id: 'range-slider', width: 1440, height: 900, theme: 'light', direction: 'rtl', alternate: false},
  {name: 'range-slider-390-dark-ltr-alternate', id: 'range-slider', width: 390, height: 844, theme: 'dark', direction: 'ltr', alternate: true},
];
const expectedControls = {'number-stepper': 30, 'range-slider': 21};

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
      const {resolve, reject} = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
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
    command(method, params = {}, sessionId) {
      const id = ++nextId;
      socket.send(JSON.stringify({id, method, params, ...(sessionId ? {sessionId} : {})}));
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
    format: 'png', fromSurface: true, captureBeyondViewport: false, ...(clip ? {clip} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-numeric-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', APP_URL,
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
    await client.command('Emulation.setDeviceMetricsOverride', {
      width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: scenario.width < 600,
    });
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.id}`});
    await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}';
      document.body.dir = '${scenario.direction}';
      document.documentElement.style.direction = '${scenario.direction}';
      document.body.style.direction = '${scenario.direction}';
    })()`);

    if (scenario.alternate) {
      await evaluate(client, `(async () => {
        const wait = () => new Promise((resolve) => setTimeout(resolve, 75));
        const setControl = async (name, value) => {
          const control = document.querySelector('[data-showcase-control="' + name + '"]');
          if (!control) throw new Error('Missing control: ' + name);
          const trigger = control.querySelector('erp-field-trigger button');
          if (trigger) {
            trigger.click(); await wait();
            const option = [...control.querySelectorAll('.select__option')]
              .find((candidate) => candidate.textContent?.trim() === String(value));
            if (!option) throw new Error('Missing option ' + name + '=' + value);
            option.querySelector('button')?.click(); await wait(); return;
          }
          const input = control.querySelector('textarea, input');
          if (!input) throw new Error('Missing editor: ' + name);
          const prototype = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
          Object.getOwnPropertyDescriptor(prototype, 'value').set.call(input, input instanceof HTMLTextAreaElement ? JSON.stringify(value) : String(value));
          input.dispatchEvent(new Event('input', {bubbles: true}));
          input.dispatchEvent(new Event('change', {bubbles: true}));
          await wait();
        };
        if (${JSON.stringify(scenario.id)} === 'number-stepper') {
          await setControl('$value', 30); await setControl('min', 0); await setControl('max', 50);
          await setControl('step', 5); await setControl('size', 'lg'); await setControl('shape', 'rounded');
          document.querySelector('[data-showcase-target] [data-stepper-decrement] button')?.click();
        } else {
          await setControl('$value', {lower: 10, upper: 90}); await setControl('size', 'lg');
          await setControl('tone', 'primary'); await setControl('valueTooltipPlacement', 'bottom');
          const lower = document.querySelector('[data-showcase-target] [data-range-thumb="lower"]');
          lower?.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
          lower?.dispatchEvent(new Event('pointerdown', {bubbles: true}));
        }
        await wait();
      })()`);
    } else {
      await evaluate(client, `(() => {
        const target = document.querySelector('[data-showcase-target]');
        if (${JSON.stringify(scenario.id)} === 'number-stepper') {
          target.querySelector('[data-stepper-increment] button')?.click();
        } else {
          target.querySelector('[data-range-thumb="lower"]')?.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
        }
      })()`);
    }

    await new Promise((resolve) => setTimeout(resolve, 350));
    await evaluate(client, `(() => {
      document.activeElement?.blur?.();
      const scroller = document.querySelector('.app-shell__content');
      if (scroller) { scroller.style.scrollBehavior = 'auto'; scroller.scrollTop = 0; }
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.scrollTop = 0; document.body.scrollTop = 0; window.scrollTo(0, 0);
    })()`);
    await new Promise((resolve) => setTimeout(resolve, 120));

    const measurement = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const box = target.getBoundingClientRect();
      const nativeEditors = [...target.querySelectorAll('input')];
      return {
        name: ${JSON.stringify(scenario.name)}, component: ${JSON.stringify(scenario.id)},
        viewport: {width: innerWidth, height: innerHeight}, theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir, computedDirection: getComputedStyle(target).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        controlCount: document.querySelectorAll('[data-showcase-control-panel] [data-showcase-control]').length,
        targetBox: {x: box.x, y: box.y, width: box.width, height: box.height},
        nativeValues: nativeEditors.map((editor) => ({type: editor.type, value: editor.value, disabled: editor.disabled})),
        lower: target.getAttribute('data-range-slider-lower'), upper: target.getAttribute('data-range-slider-upper'),
        eventEvidence: document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? '',
        tooltipOpen: target.querySelectorAll('erp-tooltip[data-tooltip-open="true"]').length,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      };
    })()`);
    measurement.diagnostics = [...client.diagnostics];
    results.push(measurement);
    await screenshot(client, `${scenario.name}-full.png`);
    const clip = await evaluate(client, `(() => {
      const box = document.querySelector('[data-showcase-target]').getBoundingClientRect(); const margin = 36;
      return {x: Math.max(0, box.x - margin), y: Math.max(0, box.y - margin),
        width: Math.min(innerWidth - Math.max(0, box.x - margin), box.width + margin * 2),
        height: Math.min(innerHeight - Math.max(0, box.y - margin), Math.max(180, box.height + margin * 2)), scale: 1};
    })()`);
    await screenshot(client, `${scenario.name}-target.png`, clip);
  }

  const assertions = [];
  for (const result of results) {
    assertions.push({name: `${result.name} target`, pass: result.primaryTargetCount === 1, actual: result.primaryTargetCount});
    assertions.push({name: `${result.name} controls`, pass: result.controlCount === expectedControls[result.component], actual: result.controlCount});
    assertions.push({name: `${result.name} visible`, pass: result.targetBox.width > 0 && result.targetBox.height > 0, actual: result.targetBox});
    assertions.push({name: `${result.name} direction`, pass: result.computedDirection === result.direction, actual: result.computedDirection});
    assertions.push({name: `${result.name} event`, pass: result.eventEvidence.includes('valueChange'), actual: result.eventEvidence});
    assertions.push({name: `${result.name} page overflow`, pass: result.horizontalOverflow === 0, actual: result.horizontalOverflow});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    assertions.push({name: `${result.name} broken images`, pass: result.brokenImages === 0, actual: result.brokenImages});
    if (result.component === 'number-stepper') {
      const expected = result.name.includes('alternate') ? '25' : '13';
      assertions.push({name: `${result.name} applied step`, pass: result.nativeValues[0]?.value === expected, actual: result.nativeValues});
    } else {
      const expectedLower = result.name.includes('alternate') ? '15' : '30';
      assertions.push({name: `${result.name} applied keyboard step`, pass: result.lower === expectedLower, actual: {lower: result.lower, upper: result.upper}});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const report = {generatedAt: new Date().toISOString(), authority: 'Original Honesty ERP candidates; no binding component-specific external reference is recorded.', scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  client.close();
  if (failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  if (chrome.exitCode === null) await Promise.race([new Promise((resolve) => chrome.once('exit', resolve)), new Promise((resolve) => setTimeout(resolve, 2_000))]);
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try { await fs.rm(profile, {recursive: true, force: true}); break; }
    catch (error) {
      if (error?.code !== 'EBUSY' || attempt === 9) throw error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
}
