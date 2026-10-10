import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.TEXT_FIELDS_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const OUTPUT = path.join(ROOT, 'docs', 'review-evidence', 'erp-text-fields', 'v1-internal-review');

const components = [
  {id: 'text-box', controls: 31, alternateValue: 'Alexandria Wholesale Customer 2026'},
  {id: 'text-area-box', controls: 30, alternateValue: 'Purchase request reviewed. Confirm quantities before final approval.'},
  {id: 'password-box', controls: 30, alternateValue: 'Secure@2026'},
  {id: 'number-box', controls: 30, alternateValue: 4200},
  {id: 'money-box', controls: 35, alternateValue: 28750.5},
  {id: 'tel-box', controls: 29, alternateValue: '+20 111 222 3333'},
  {id: 'url-box', controls: 29, alternateValue: 'https://supplier.example'},
];

const scenarios = components.flatMap((component) => [
  {...component, name: `${component.id}-1440-light-rtl-default`, width: 1440, height: 900, theme: 'light', direction: 'rtl', alternate: false},
  {...component, name: `${component.id}-390-dark-ltr-alternate`, width: 390, height: 844, theme: 'dark', direction: 'ltr', alternate: true},
]);

class Client {
  #socket;
  #id = 0;
  #pending = new Map();
  diagnostics = [];

  constructor(url) {
    this.#socket = new WebSocket(url);
    this.#socket.addEventListener('message', ({data}) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.#pending.get(message.id);
        if (!pending) return;
        this.#pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') this.diagnostics.push({level: 'error', text: message.params.exceptionDetails.text});
      if (message.method === 'Log.entryAdded') {
        const {level, text} = message.params.entry;
        if (level === 'error' || level === 'warning') this.diagnostics.push({level, text});
      }
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.#socket.addEventListener('open', resolve, {once: true});
      this.#socket.addEventListener('error', reject, {once: true});
    });
  }

  command(method, params = {}) {
    const id = ++this.#id;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, {resolve, reject});
      this.#socket.send(JSON.stringify({id, method, params}));
    });
  }

  close() { this.#socket.close(); }
}

async function waitFor(read, timeoutMs = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out waiting for text-field evidence state.');
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  return result.result.value;
}

async function screenshot(client, fileName, clip = null) {
  const result = await client.command('Page.captureScreenshot', {format: 'png', captureBeyondViewport: Boolean(clip), ...(clip ? {clip} : {})});
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-text-fields-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--disable-extensions', '--disable-default-apps', '--no-first-run', '--no-default-browser-check', 'about:blank',
], {stdio: 'ignore'});

try {
  const port = await waitFor(async () => {
    try { return Number((await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split(/\r?\n/u)[0]); }
    catch { return 0; }
  });
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const client = new Client(targets.find((entry) => entry.type === 'page').webSocketDebuggerUrl);
  await client.open();
  await client.command('Page.enable');
  await client.command('Runtime.enable');
  await client.command('Log.enable');
  const results = [];

  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {width: scenario.width, height: scenario.height, deviceScaleFactor: 1, mobile: scenario.width < 600});
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
        const wait = () => new Promise((resolve) => setTimeout(resolve, 70));
        const setControl = async (name, value) => {
          const control = document.querySelector('[data-showcase-control="' + name + '"]');
          if (!control) throw new Error('Missing control: ' + name);
          const checkbox = control.querySelector('input[type="checkbox"]');
          if (checkbox) {
            if (checkbox.checked !== value) checkbox.click();
            await wait();
            return;
          }
          const trigger = control.querySelector('erp-field-trigger button');
          if (trigger) {
            trigger.click();
            await wait();
            const option = [...control.querySelectorAll('.select__option')]
              .find((candidate) => candidate.textContent?.trim() === String(value));
            if (!option) throw new Error('Missing option ' + name + '=' + value);
            option.querySelector('button')?.click();
            await wait();
            return;
          }
          const input = control.querySelector('textarea, input');
          if (!input) throw new Error('Missing editor: ' + name);
          const prototype = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
          Object.getOwnPropertyDescriptor(prototype, 'value').set.call(input, input instanceof HTMLTextAreaElement ? JSON.stringify(value) : String(value));
          input.dispatchEvent(new Event('input', {bubbles: true}));
          input.dispatchEvent(new Event('change', {bubbles: true}));
          await wait();
        };
        await setControl('$value', ${JSON.stringify(scenario.alternateValue)});
        await setControl('size', 'lg');
        await setControl('shape', 'rounded');
        await setControl('labelMode', 'floating');
        await setControl('status', ${JSON.stringify(scenario.id === 'password-box' ? 'danger' : scenario.id === 'text-area-box' ? 'warning' : 'success')});
      })()`);
    }

    await new Promise((resolve) => setTimeout(resolve, 350));
    await evaluate(client, `(() => {
      document.activeElement?.blur?.();
      const scroller = document.querySelector('.app-shell__content');
      if (scroller) {
        scroller.style.scrollBehavior = 'auto';
        scroller.scrollTop = 0;
      }
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    })()`);
    await new Promise((resolve) => setTimeout(resolve, 120));
    const measurement = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const editor = target.querySelector('input, textarea');
      const frame = target.querySelector('erp-field-frame');
      const targetBox = target.getBoundingClientRect();
      const editorBox = editor.getBoundingClientRect();
      const editorStyle = getComputedStyle(editor);
      return {
        name: ${JSON.stringify(scenario.name)}, component: ${JSON.stringify(scenario.id)},
        viewport: {width: innerWidth, height: innerHeight}, theme: document.documentElement.dataset.theme, direction: document.documentElement.dir,
        computedDirection: getComputedStyle(target).direction,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        controlCount: document.querySelectorAll('[data-showcase-control-panel] [data-showcase-control]').length,
        targetBox: {x: targetBox.x, y: targetBox.y, width: targetBox.width, height: targetBox.height},
        editorBox: {x: editorBox.x, y: editorBox.y, width: editorBox.width, height: editorBox.height},
        nativeTag: editor.tagName.toLowerCase(), nativeType: editor.getAttribute('type'), nativeValue: editor.value,
        editorStyle: {color: editorStyle.color, backgroundColor: editorStyle.backgroundColor, fontSize: editorStyle.fontSize, lineHeight: editorStyle.lineHeight, overflow: editorStyle.overflow},
        frameAttributes: frame ? Object.fromEntries([...frame.attributes].map((attribute) => [attribute.name, attribute.value])) : {},
        eventEvidence: document.querySelector('[data-showcase-event-log]')?.textContent?.trim() ?? '',
        scrollState: {
          windowY: scrollY,
          documentTop: document.documentElement.scrollTop,
          bodyTop: document.body.scrollTop,
          contentTop: document.querySelector('.app-shell__content')?.scrollTop ?? null,
        },
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      };
    })()`);
    measurement.diagnostics = [...client.diagnostics];
    results.push(measurement);
    await screenshot(client, `${scenario.name}-full.png`);
    const clip = await evaluate(client, `(() => {
      const box = document.querySelector('[data-showcase-target]').getBoundingClientRect();
      const margin = 36;
      return {
        x: Math.max(0, box.x - margin),
        y: Math.max(0, box.y - margin),
        width: Math.min(innerWidth - Math.max(0, box.x - margin), box.width + margin * 2),
        height: Math.min(innerHeight - Math.max(0, box.y - margin), Math.max(150, box.height + margin * 2)),
        scale: 1,
      };
    })()`);
    await screenshot(client, `${scenario.name}-target.png`, clip);
  }

  const assertions = [];
  for (const result of results) {
    const definition = components.find((entry) => entry.id === result.component);
    assertions.push({name: `${result.name} target`, pass: result.primaryTargetCount === 1, actual: result.primaryTargetCount});
    assertions.push({name: `${result.name} controls`, pass: result.controlCount === definition.controls, actual: result.controlCount});
    assertions.push({name: `${result.name} visible editor`, pass: result.editorBox.width > 0 && result.editorBox.height > 0, actual: result.editorBox});
    assertions.push({name: `${result.name} meaningful value`, pass: result.nativeValue.length > 0, actual: result.nativeValue});
    assertions.push({name: `${result.name} page overflow`, pass: result.horizontalOverflow === 0, actual: result.horizontalOverflow});
    assertions.push({name: `${result.name} diagnostics`, pass: result.diagnostics.length === 0, actual: result.diagnostics});
    assertions.push({name: `${result.name} broken images`, pass: result.brokenImages === 0, actual: result.brokenImages});
    if (result.name.includes('alternate')) {
      assertions.push({name: `${result.name} applied large size`, pass: result.frameAttributes['data-field-size'] === 'lg', actual: result.frameAttributes});
      assertions.push({name: `${result.name} CVA event`, pass: result.eventEvidence.includes('valueChange'), actual: result.eventEvidence});
    }
  }
  const failed = assertions.filter((entry) => !entry.pass);
  const result = {generatedAt: new Date().toISOString(), authority: 'Original Honesty ERP candidate; no binding component-specific reference is recorded.', scenarios: results, assertions, summary: {total: assertions.length, passed: assertions.length - failed.length, failed}};
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(result.summary, null, 2)}\n`);
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
