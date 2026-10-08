import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const cdpPort = Number(process.env['HONESTY_CAPTURE_CDP_PORT'] ?? 9224);
const appUrl = process.env['HONESTY_CAPTURE_APP_URL'] ?? 'http://127.0.0.1:5001';
const cdpUrl = `http://127.0.0.1:${cdpPort}`;
const outputDirectory = path.resolve('docs/review-evidence/erp-avatar-library');
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const pickerStates = [
  {file: 'picker-light-rtl-1440.png', width: 1440, height: 900, theme: 'light', direction: 'rtl', gender: 'male', shape: 'circle', size: 'md'},
  {file: 'picker-dark-ltr-1440.png', width: 1440, height: 900, theme: 'dark', direction: 'ltr', gender: 'female', shape: 'rounded', size: 'lg'},
  {file: 'picker-light-rtl-768.png', width: 768, height: 900, theme: 'light', direction: 'rtl', gender: 'male', shape: 'square', size: 'xl'},
  {file: 'picker-dark-rtl-390.png', width: 390, height: 844, theme: 'dark', direction: 'rtl', gender: 'female', shape: 'circle', size: '2xl'},
  {file: 'picker-light-ltr-320.png', width: 320, height: 844, theme: 'light', direction: 'ltr', gender: 'male', shape: 'square', size: '5xl'},
];

const avatarStates = [
  {file: 'avatar-circle-online-light-rtl.png', width: 768, height: 900, theme: 'light', direction: 'rtl', shape: 'circle', size: '2xl', presence: 'online', src: '/assets/honesty-erp-avatars/users/male/avatar-male-115.png'},
  {file: 'avatar-rounded-away-dark-ltr.png', width: 390, height: 844, theme: 'dark', direction: 'ltr', shape: 'rounded', size: '4xl', presence: 'away', src: '/assets/honesty-erp-avatars/users/female/avatar-female-116.png'},
  {file: 'avatar-square-busy-light-rtl.png', width: 320, height: 844, theme: 'light', direction: 'rtl', shape: 'square', size: '5xl', presence: 'busy', src: '/assets/honesty-erp-avatars/users/male/avatar-male-102.png'},
];

async function connect() {
  let targets = [];
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      targets = await fetch(`${cdpUrl}/json/list`).then((response) => response.json());
      if (targets.length > 0) break;
    } catch {
      // Chrome may still be starting.
    }
    await delay(250);
  }
  const target = targets.find((candidate) => candidate.type === 'page');
  if (!target?.webSocketDebuggerUrl) throw new Error('No Chrome page target was available.');

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, {once: true});
    socket.addEventListener('error', reject, {once: true});
  });
  let commandId = 0;
  const pending = new Map();
  const diagnostics = [];
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id) {
      const waiter = pending.get(message.id);
      if (!waiter) return;
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
      return;
    }
    if (message.method === 'Log.entryAdded') {
      diagnostics.push({level: message.params.entry.level, text: message.params.entry.text});
    }
    if (message.method === 'Runtime.exceptionThrown') {
      diagnostics.push({level: 'exception', text: message.params.exceptionDetails.text});
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  return {socket, send, diagnostics};
}

async function evaluate(send, expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitForTarget(send, selector) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(send, `Boolean(document.querySelector(${JSON.stringify(selector)}))`)) return;
    await delay(200);
  }
  throw new Error(`Showcase target did not become ready: ${selector}`);
}

async function navigate(send, route, selector = '[data-showcase-target]') {
  await send('Page.navigate', {url: `${appUrl}${route}`});
  await waitForTarget(send, selector);
  await delay(250);
}

function configureExpression(state, component) {
  return `(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const root = document.querySelector('#lab-capture-root');
    const themeButton = document.querySelector('#btn-lab-theme button');
    if (root?.getAttribute('data-theme') !== ${JSON.stringify(state.theme)}) {
      themeButton?.click();
      await pause(100);
    }
    const target = document.querySelector('[data-showcase-target]');
    target.setAttribute('dir', ${JSON.stringify(state.direction)});

    const setTextControl = async (name, value) => {
      const field = document.querySelector('[data-showcase-control="' + name + '"] input, [data-showcase-control="' + name + '"] textarea');
      if (!field) throw new Error('Missing workbench editor: ' + name);
      const owner = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(owner, 'value').set.call(field, value);
      field.dispatchEvent(new Event('input', {bubbles: true}));
      field.dispatchEvent(new Event('change', {bubbles: true}));
      await pause(80);
    };
    const setSelectControl = async (name, value) => {
      const card = document.querySelector('[data-showcase-control="' + name + '"]');
      const trigger = card?.querySelector('[role="combobox"]');
      if (!trigger) throw new Error('Missing select editor: ' + name);
      trigger.click();
      await pause(100);
      const popup = Array.from(document.querySelectorAll('.select__popup')).find((candidate) => candidate.matches(':popover-open'));
      const option = Array.from(popup?.querySelectorAll('[role="option"]') ?? []).find((candidate) => candidate.textContent.trim() === value);
      const action = option?.querySelector('button') ?? option;
      if (!action) throw new Error('Missing select value ' + value + ' for ' + name);
      action.click();
      await pause(100);
    };

    ${component === 'picker' ? `
    await setTextControl('avatarSize', JSON.stringify(${JSON.stringify(state.size)}));
    await setSelectControl('avatarShape', ${JSON.stringify(state.shape)});
    const desiredTab = Array.from(target.querySelectorAll('[role="tab"]')).find((tab) => tab.textContent.includes(${JSON.stringify(state.gender === 'male' ? 'ذكر' : 'أنثى')}));
    if (!desiredTab?.getAttribute('aria-selected')?.includes('true')) desiredTab?.click();
    await pause(140);
    ` : `
    await setTextControl('src', ${JSON.stringify(state.src)});
    await setSelectControl('shape', ${JSON.stringify(state.shape)});
    await setSelectControl('size', ${JSON.stringify(state.size)});
    await setTextControl('presence', JSON.stringify(${JSON.stringify(state.presence)}));
    `}
    const targetDocumentTop = target.getBoundingClientRect().top + window.scrollY;
    const safeTop = (document.querySelector('.lab-utility-bar')?.getBoundingClientRect().bottom ?? 60) + 16;
    window.scrollTo({top: Math.max(0, targetDocumentTop - safeTop), left: 0});
    await pause(300);
    return true;
  })()`;
}

const rectExpression = `(element) => {
  const value = element?.getBoundingClientRect();
  return value ? {left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height} : null;
}`;

function pickerMeasurementExpression(state) {
  return `(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const target = document.querySelector('[data-showcase-target]');
    const grid = target.querySelector('.avatar-picker__grid');
    const tiles = Array.from(target.querySelectorAll('erp-avatar-picker-tile'));
    const images = Array.from(target.querySelectorAll('erp-avatar-picker-tile img'));
    for (const image of images) {
      image.scrollIntoView({block: 'center', inline: 'nearest'});
      await pause(15);
    }
    await Promise.all(images.map((image) => image.complete ? undefined : new Promise((resolve) => {
      const done = () => resolve();
      image.addEventListener('load', done, {once: true});
      image.addEventListener('error', done, {once: true});
      setTimeout(done, 3000);
    })));
    grid.scrollTop = 0;
    const targetDocumentTop = target.getBoundingClientRect().top + window.scrollY;
    const safeTop = (document.querySelector('.lab-utility-bar')?.getBoundingClientRect().bottom ?? 60) + 16;
    window.scrollTo({top: Math.max(0, targetDocumentTop - safeTop), left: 0});
    await pause(120);
    const firstButton = target.querySelector('erp-avatar-picker-tile button');
    firstButton?.click();
    await pause(80);
    const previewImage = target.querySelector('.avatar-picker__preview img');
    const confirmButton = target.querySelectorAll('.avatar-picker__actions erp-button button')[1];
    const staged = {
      selectedTiles: target.querySelectorAll('[data-avatar-picker-tile-selected="true"]').length,
      confirmEnabled: confirmButton ? !confirmButton.disabled : null,
      previewSource: previewImage?.getAttribute('src') ?? null,
    };
    confirmButton?.click();
    await pause(80);
    const eventText = document.querySelector('[data-showcase-event-log]')?.textContent ?? '';
    const tile = target.querySelector('erp-avatar-picker-tile');
    const avatar = tile?.querySelector('erp-avatar');
    const style = grid ? getComputedStyle(grid) : null;
    const columns = style?.gridTemplateColumns.split(' ').filter(Boolean).length ?? 0;
    return {
      file: ${JSON.stringify(state.file)},
      viewport: {width: innerWidth, height: innerHeight},
      theme: document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),
      direction: target.getAttribute('dir'),
      gender: ${JSON.stringify(state.gender)},
      shape: target.getAttribute('data-avatar-picker-avatar-shape'),
      size: target.getAttribute('data-avatar-picker-avatar-size'),
      targetCount: document.querySelectorAll('[data-showcase-target]').length,
      tabText: Array.from(target.querySelectorAll('[role="tab"]')).map((tab) => tab.textContent.trim()),
      tileCount: tiles.length,
      imageCount: images.length,
      loadedImages: images.filter((image) => image.complete && image.naturalWidth > 0).length,
      brokenImages: images.filter((image) => image.complete && image.naturalWidth === 0).length,
      lazyImages: images.filter((image) => image.loading === 'lazy').length,
      picker: (${rectExpression})(target),
      grid: {...((${rectExpression})(grid) ?? {}), columns, gap: style?.gap, scrollWidth: grid?.scrollWidth, clientWidth: grid?.clientWidth},
      tile: (${rectExpression})(tile),
      avatar: (${rectExpression})(avatar),
      selectedIndicator: (${rectExpression})(target.querySelector('.avatar-picker-tile__check')),
      staged,
      confirmEvent: eventText.includes('confirm:'),
      pageHorizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  })()`;
}

function avatarMeasurementExpression(state) {
  return `(async () => {
    const target = document.querySelector('[data-showcase-target]');
    document.activeElement?.blur();
    const targetDocumentTop = target.getBoundingClientRect().top + window.scrollY;
    const safeTop = (document.querySelector('.lab-utility-bar')?.getBoundingClientRect().bottom ?? 60) + 16;
    window.scrollTo({top: Math.max(0, targetDocumentTop - safeTop), left: 0});
    await new Promise((resolve) => setTimeout(resolve, 120));
    const image = target.querySelector('img');
    const presence = target.querySelector('.avatar__presence');
    return {
      file: ${JSON.stringify(state.file)},
      viewport: {width: innerWidth, height: innerHeight},
      theme: document.querySelector('#lab-capture-root')?.getAttribute('data-theme'),
      direction: target.getAttribute('dir'),
      shape: target.getAttribute('data-avatar-shape'),
      size: target.getAttribute('data-avatar-size'),
      presence: target.getAttribute('data-avatar-presence'),
      targetCount: document.querySelectorAll('[data-showcase-target]').length,
      avatar: (${rectExpression})(target),
      image: (${rectExpression})(image),
      presenceIndicator: (${rectExpression})(presence),
      imageSource: image?.getAttribute('src') ?? null,
      imageLoaded: Boolean(image?.complete && image?.naturalWidth > 0),
      brokenImages: Array.from(target.querySelectorAll('img')).filter((candidate) => candidate.complete && candidate.naturalWidth === 0).length,
      pageHorizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  })()`;
}

async function capture(send, state, component) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: state.width,
    height: state.height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate(send, configureExpression(state, component));
  const measurement = await evaluate(
    send,
    component === 'picker' ? pickerMeasurementExpression(state) : avatarMeasurementExpression(state),
  );
  const screenshot = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(path.join(outputDirectory, state.file), Buffer.from(screenshot.data, 'base64'));
  return measurement;
}

await mkdir(outputDirectory, {recursive: true});
const {socket, send, diagnostics} = await connect();
await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');

await navigate(send, '/components/avatar-picker');
const pickerMeasurements = [];
for (const state of pickerStates) pickerMeasurements.push(await capture(send, state, 'picker'));

await navigate(send, '/components/avatar');
const avatarMeasurements = [];
for (const state of avatarStates) avatarMeasurements.push(await capture(send, state, 'avatar'));

await send('Emulation.clearDeviceMetricsOverride');
socket.close();
const report = {
  capturedAt: new Date().toISOString(),
  aggregateAssetSha256: '39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8',
  pickerMeasurements,
  avatarMeasurements,
  diagnostics,
};
await writeFile(path.join(outputDirectory, 'runtime-measurements.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
