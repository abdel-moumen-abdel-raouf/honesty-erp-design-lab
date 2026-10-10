import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const port = Number(process.env['HONESTY_CAPTURE_CDP_PORT'] ?? 9223);
const outputDirectory = path.resolve(
  process.env['HONESTY_USER_MENU_EVIDENCE_DIR'] ??
    'docs/review-evidence/erp-user-menu/v3-internal-review',
);
const referenceUrl =
  'https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-media-object.html';
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function connect() {
  const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
  const target = targets.find((candidate) => candidate.type === 'page');
  if (!target?.webSocketDebuggerUrl) throw new Error('No Chrome page target was available.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, {once: true});
    socket.addEventListener('error', reject, {once: true});
  });
  let commandId = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  return {socket, send};
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

await mkdir(outputDirectory, {recursive: true});
const {socket, send} = await connect();
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.navigate', {url: referenceUrl});

for (let attempt = 0; attempt < 80; attempt += 1) {
  const ready = await evaluate(send, `Boolean(
    document.readyState === 'complete' &&
    document.querySelector('.user-setting') &&
    globalThis.bootstrap
  )`);
  if (ready) break;
  if (attempt === 79) throw new Error('Skodash UserMenu trigger did not load.');
  await pause(250);
}

await evaluate(send, `(() => {
  const trigger = document.querySelector('.user-setting');
  trigger.closest('a').click();
  return true;
})()`);
for (let attempt = 0; attempt < 20; attempt += 1) {
  const opened = await evaluate(send, `Boolean(
    document.querySelector('li.dropdown-large .dropdown-menu.show')
  )`);
  if (opened) break;
  if (attempt === 19) throw new Error('Skodash UserMenu popup did not open.');
  await pause(100);
}
await pause(700);

const measurement = await evaluate(send, `(() => {
  const trigger = document.querySelector('.user-setting');
  const root = trigger.closest('li.dropdown-large') ?? trigger.parentElement;
  const surface = root.querySelector('.dropdown-menu.show') ??
    document.querySelector('.dropdown-large .dropdown-menu.show');
  if (!surface) throw new Error('Skodash UserMenu popup did not open.');
  const rect = (element) => {
    const value = element.getBoundingClientRect();
    return {
      left: value.left, top: value.top, right: value.right, bottom: value.bottom,
      width: value.width, height: value.height,
    };
  };
  const style = (element) => {
    const value = getComputedStyle(element);
    return {
      padding: value.padding,
      borderRadius: value.borderRadius,
      boxShadow: value.boxShadow,
      overflowX: value.overflowX,
      overflowY: value.overflowY,
      fontFamily: value.fontFamily,
      fontSize: value.fontSize,
      lineHeight: value.lineHeight,
    };
  };
  const triggerBox = rect(trigger);
  const surfaceBox = rect(surface);
  const crop = {
    x: Math.max(0, Math.min(triggerBox.left, surfaceBox.left) - 18),
    y: Math.max(0, Math.min(triggerBox.top, surfaceBox.top) - 18),
    width: Math.min(innerWidth, Math.max(triggerBox.right, surfaceBox.right) + 18) -
      Math.max(0, Math.min(triggerBox.left, surfaceBox.left) - 18),
    height: Math.min(innerHeight, Math.max(triggerBox.bottom, surfaceBox.bottom) + 18) -
      Math.max(0, Math.min(triggerBox.top, surfaceBox.top) - 18),
    scale: 1,
  };
  return {
    capturedAt: new Date().toISOString(),
    url: location.href,
    viewport: {width: innerWidth, height: innerHeight},
    direction: getComputedStyle(document.documentElement).direction,
    trigger: {box: triggerBox, style: style(trigger)},
    surface: {box: surfaceBox, style: style(surface)},
    userImage: rect(root.querySelector('.user-img img') ?? root.querySelector('.user-img')),
    identityImage: rect(surface.querySelector('img')),
    actionRows: Array.from(surface.querySelectorAll('.dropdown-item')).map((row) => ({
      text: row.textContent.trim(),
      box: rect(row),
      style: style(row),
    })),
    pageHorizontalOverflow:
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
    crop,
  };
})()`);

const full = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
});
await writeFile(
  path.join(outputDirectory, 'reference-skodash-1440-light-rtl-open-full.png'),
  Buffer.from(full.data, 'base64'),
);
const crop = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
  clip: measurement.crop,
});
await writeFile(
  path.join(outputDirectory, 'reference-skodash-1440-light-rtl-open-crop.png'),
  Buffer.from(crop.data, 'base64'),
);
await writeFile(
  path.join(outputDirectory, 'reference-measurements.json'),
  `${JSON.stringify(measurement, null, 2)}\n`,
);

await send('Emulation.clearDeviceMetricsOverride');
socket.close();
console.log(JSON.stringify(measurement, null, 2));
