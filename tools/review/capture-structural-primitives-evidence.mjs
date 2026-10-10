import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = process.env.STRUCTURAL_EVIDENCE_URL ?? 'http://127.0.0.1:4999';
const OUTPUT = path.join(
  ROOT,
  'docs',
  'review-evidence',
  'erp-structural-primitives',
  'v1-internal-review',
);

const components = [
  {id: 'container', controls: 2, projected: 1},
  {id: 'divider', controls: 4, projected: 0},
  {id: 'grid', controls: 3, projected: 3},
  {id: 'inline', controls: 4, projected: 3},
  {id: 'section', controls: 1, projected: 3},
  {id: 'stack', controls: 3, projected: 3},
  {id: 'surface', controls: 5, projected: 1},
];

const scenarios = components.flatMap((component) => [
  {...component, name: `${component.id}-1440-light-rtl-default`, width: 1440, height: 900, theme: 'light', direction: 'rtl', alternate: false},
  {...component, name: `${component.id}-390-dark-ltr-alternate`, width: 390, height: 844, theme: 'dark', direction: 'ltr', alternate: true},
]);

class DevToolsClient {
  #socket;
  #nextId = 0;
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
      if (message.method === 'Runtime.exceptionThrown') {
        this.diagnostics.push({level: 'error', text: message.params.exceptionDetails.text});
      }
      if (message.method === 'Log.entryAdded') {
        const {level, text} = message.params.entry;
        if (level === 'error' || level === 'warning') this.diagnostics.push({level, text});
      }
    });
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.#socket.addEventListener('open', resolve, {once: true});
      this.#socket.addEventListener('error', reject, {once: true});
    });
  }

  command(method, params = {}) {
    const id = ++this.#nextId;
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
  throw new Error('Timed out waiting for structural primitive evidence state.');
}

async function evaluate(client, expression) {
  const result = await client.command('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result.value;
}

async function screenshot(client, fileName, clip = null) {
  const result = await client.command('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: Boolean(clip),
    ...(clip ? {clip} : {}),
  });
  await fs.writeFile(path.join(OUTPUT, fileName), Buffer.from(result.data, 'base64'));
}

await fs.mkdir(OUTPUT, {recursive: true});
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-structural-evidence-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--disable-extensions', '--disable-default-apps', '--no-first-run',
  '--no-default-browser-check', 'about:blank',
], {stdio: 'ignore'});

try {
  const port = await waitFor(async () => {
    try {
      const value = await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8');
      return Number(value.split(/\r?\n/u)[0]);
    } catch { return 0; }
  });
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const client = new DevToolsClient(targets.find((entry) => entry.type === 'page').webSocketDebuggerUrl);
  await client.open();
  await client.command('Page.enable');
  await client.command('Runtime.enable');
  await client.command('Log.enable');

  const results = [];
  for (const scenario of scenarios) {
    client.diagnostics.length = 0;
    await client.command('Emulation.setDeviceMetricsOverride', {
      width: scenario.width,
      height: scenario.height,
      deviceScaleFactor: 1,
      mobile: scenario.width < 600,
    });
    await client.command('Page.navigate', {url: APP_URL});
    await waitFor(() => evaluate(client, 'document.readyState === "complete"'));
    await evaluate(client, `localStorage.setItem('honesty-lab-theme', '${scenario.theme}')`);
    await client.command('Page.navigate', {url: `${APP_URL}/components/${scenario.id}`});
    await waitFor(() => evaluate(client, 'document.querySelectorAll("[data-showcase-target]").length === 1'));
    await evaluate(client, `(() => {
      document.documentElement.dir = '${scenario.direction}';
      document.body.dir = '${scenario.direction}';
    })()`);

    if (scenario.alternate) {
      await evaluate(client, `(async () => {
        const wait = () => new Promise((resolve) => setTimeout(resolve, 80));
        const select = async (name, value) => {
          const control = document.querySelector('[data-showcase-control="' + name + '"]');
          control?.querySelector('erp-field-trigger button')?.click();
          await wait();
          const option = [...document.querySelectorAll('.select__option')]
            .find((candidate) => candidate.textContent?.trim() === String(value));
          option?.querySelector('button')?.click();
          await wait();
        };
        const number = async (name, value) => {
          const input = document.querySelector('[data-showcase-control="' + name + '"] input');
          if (!input) return;
          const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
          setter.call(input, String(value));
          input.dispatchEvent(new Event('input', {bubbles: true}));
          input.dispatchEvent(new Event('change', {bubbles: true}));
          await wait();
        };
        const plan = ${JSON.stringify({
          container: {select: {width: 'narrow', gutter: 'none'}},
          divider: {select: {orientation: 'vertical', tone: 'strong', stroke: 'dashed', weight: 'emphasis'}},
          grid: {number: {columns: 3}, select: {gap: 'xs', responsive: 'fixed'}},
          inline: {select: {gap: 'tight', align: 'end', justify: 'between', wrap: 'wrap'}},
          section: {select: {gap: 'large'}},
          stack: {select: {gap: 'loose', align: 'center', justify: 'center'}},
          surface: {select: {tone: 'inverse', border: 'strong', elevation: 'raised', radius: 'overlay', padding: 'loose'}},
        })}[${JSON.stringify(scenario.id)}];
        for (const [name, value] of Object.entries(plan?.number ?? {})) await number(name, value);
        for (const [name, value] of Object.entries(plan?.select ?? {})) await select(name, value);
      })()`);
    }

    await evaluate(client, 'document.querySelector("[data-showcase-target]")?.scrollIntoView({block: "center"})');
    await new Promise((resolve) => setTimeout(resolve, 400));
    const measurement = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const box = target.getBoundingClientRect();
      const style = getComputedStyle(target);
      const firstChildStyle = target.firstElementChild ? getComputedStyle(target.firstElementChild) : null;
      const rgb = (value) => value.match(/\\d+(?:\\.\\d+)?/gu)?.slice(0, 3).map(Number) ?? [];
      const luminance = (value) => {
        const [red, green, blue] = rgb(value).map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.04045
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      };
      const foreground = firstChildStyle?.color ?? style.color;
      const background = style.backgroundColor;
      const lighter = Math.max(luminance(foreground), luminance(background));
      const darker = Math.min(luminance(foreground), luminance(background));
      const children = [...target.children].filter((child) => {
        const childBox = child.getBoundingClientRect();
        const childStyle = getComputedStyle(child);
        return childStyle.display !== 'none' && childStyle.visibility !== 'hidden' && childBox.width > 0 && childBox.height > 0;
      });
      return {
        name: ${JSON.stringify(scenario.name)},
        component: ${JSON.stringify(scenario.id)},
        viewport: {width: innerWidth, height: innerHeight},
        theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir,
        primaryTargetCount: document.querySelectorAll('[data-showcase-target]').length,
        controlCount: document.querySelectorAll('[data-showcase-control-panel] [data-showcase-control]').length,
        box: {x: box.x, y: box.y, width: box.width, height: box.height},
        style: {
          display: style.display,
          gap: style.gap,
          padding: style.padding,
          borderWidth: style.borderWidth,
          borderStyle: style.borderStyle,
          borderRadius: style.borderRadius,
          backgroundColor: style.backgroundColor,
          color: style.color,
          firstChildColor: firstChildStyle?.color ?? null,
          contrastRatio: Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2)),
          boxShadow: style.boxShadow,
          gridTemplateColumns: style.gridTemplateColumns,
          alignItems: style.alignItems,
          justifyContent: style.justifyContent,
          flexWrap: style.flexWrap,
        },
        attributes: Object.fromEntries([...target.attributes].map((attribute) => [attribute.name, attribute.value])),
        visibleProjectedChildren: children.length,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      };
    })()`);
    measurement.diagnostics = [...client.diagnostics];
    results.push(measurement);

    await screenshot(client, `${scenario.name}-full.png`);
    const clip = await evaluate(client, `(() => {
      const target = document.querySelector('[data-showcase-target]');
      const box = target.getBoundingClientRect();
      const margin = 32;
      return {
        x: Math.max(0, box.x + scrollX - margin),
        y: Math.max(0, box.y + scrollY - margin),
        width: Math.min(document.documentElement.scrollWidth, box.width + margin * 2),
        height: Math.max(96, box.height + margin * 2),
        scale: 1,
      };
    })()`);
    await screenshot(client, `${scenario.name}-target.png`, clip);
  }

  const assertions = [];
  for (const result of results) {
    const definition = components.find((component) => component.id === result.component);
    assertions.push({name: `${result.name} primary target`, expected: 1, actual: result.primaryTargetCount, pass: result.primaryTargetCount === 1});
    assertions.push({name: `${result.name} controls`, expected: definition.controls, actual: result.controlCount, pass: result.controlCount === definition.controls});
    assertions.push({name: `${result.name} visible box`, expected: true, actual: result.box.width > 0 && result.box.height > 0, pass: result.box.width > 0 && result.box.height > 0});
    assertions.push({name: `${result.name} projected children`, expected: definition.projected, actual: result.visibleProjectedChildren, pass: result.visibleProjectedChildren >= definition.projected});
    assertions.push({name: `${result.name} overflow`, expected: 0, actual: result.horizontalOverflow, pass: result.horizontalOverflow === 0});
    assertions.push({name: `${result.name} broken images`, expected: 0, actual: result.brokenImages.length, pass: result.brokenImages.length === 0});
    assertions.push({name: `${result.name} diagnostics`, expected: 0, actual: result.diagnostics.length, pass: result.diagnostics.length === 0});
  }
  const alternateDivider = results.find((result) => result.name === 'divider-390-dark-ltr-alternate');
  assertions.push({
    name: 'vertical divider has visible block extent',
    expected: '>=128px',
    actual: alternateDivider.box.height,
    pass: alternateDivider.box.height >= 128,
  });
  const alternateSurface = results.find((result) => result.name === 'surface-390-dark-ltr-alternate');
  assertions.push({
    name: 'inverse surface projected text contrast',
    expected: '>=4.5:1',
    actual: alternateSurface.style.contrastRatio,
    pass: alternateSurface.style.contrastRatio >= 4.5,
  });
  const result = {
    generatedAt: new Date().toISOString(),
    authority: 'Original Honesty ERP candidate; no binding component-specific references are recorded.',
    scenarios: results,
    assertions,
    summary: {
      total: assertions.length,
      passed: assertions.filter((entry) => entry.pass).length,
      failed: assertions.filter((entry) => !entry.pass),
    },
  };
  await fs.writeFile(path.join(OUTPUT, 'runtime-measurements.json'), `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(result.summary, null, 2)}\n`);
  client.close();
  if (result.summary.failed.length) process.exitCode = 1;
} finally {
  chrome.kill();
  if (chrome.exitCode === null) {
    await Promise.race([
      new Promise((resolve) => chrome.once('exit', resolve)),
      new Promise((resolve) => setTimeout(resolve, 2_000)),
    ]);
  }
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      await fs.rm(profile, {recursive: true, force: true});
      break;
    } catch (error) {
      if (error?.code !== 'EBUSY' || attempt === 9) throw error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
}
