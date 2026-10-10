import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {buildCatalog, REPO_ROOT} from '../catalog/erp-component-catalog.mjs';

const baseUrl = process.argv.find((argument) => argument.startsWith('--base-url='))
  ?.slice('--base-url='.length) ?? 'http://127.0.0.1:4999';
const evidenceDirectory = path.join(REPO_ROOT, 'docs/review-evidence/visual-review-experience-v1');
const outputDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-review-output-'));
const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const debuggingPort = 9335;
const profileDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'honesty-review-'));

const browser = spawn(edgePath, [
  '--headless=new',
  '--disable-gpu',
  '--disable-sync',
  '--no-first-run',
  `--remote-debugging-port=${debuggingPort}`,
  `--user-data-dir=${profileDirectory}`,
  'about:blank',
], {stdio: 'ignore', windowsHide: true});

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function debuggerPage() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const pages = await fetch(`http://127.0.0.1:${debuggingPort}/json`).then((response) => response.json());
      const page = pages.find((candidate) => candidate.type === 'page');
      if (page?.webSocketDebuggerUrl) return page;
    } catch {
      // Edge is still starting.
    }
    await delay(100);
  }
  throw new Error('Timed out while waiting for the review browser debugger.');
}

const page = await debuggerPage();
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, {once: true});
  socket.addEventListener('error', reject, {once: true});
});

let sequence = 0;
const pending = new Map();
let observed = [];
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const operation = pending.get(message.id);
    if (!operation) return;
    pending.delete(message.id);
    if (message.error) operation.reject(new Error(message.error.message));
    else operation.resolve(message.result);
    return;
  }
  if (message.method === 'Runtime.exceptionThrown') {
    observed.push({level: 'error', text: message.params.exceptionDetails.text});
  }
  if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) {
    observed.push({
      level: message.params.type,
      text: message.params.args.map((argument) => argument.value ?? argument.description ?? '').join(' '),
    });
  }
  if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params.entry.level)) {
    observed.push({level: message.params.entry.level, text: message.params.entry.text});
  }
});

function send(method, params = {}) {
  sequence += 1;
  return new Promise((resolve, reject) => {
    pending.set(sequence, {resolve, reject});
    socket.send(JSON.stringify({id: sequence, method, params}));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(url) {
  await send('Page.navigate', {url});
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const state = await evaluate('document.readyState');
    if (state === 'complete') break;
    await delay(50);
  }
  await delay(350);
}

async function waitForPath(expectedPath) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate('location.pathname') === expectedPath) return expectedPath;
    await delay(50);
  }
  return evaluate('location.pathname');
}

async function waitForRouteReady(expectedPath, expectedTargets = 1, waitForReload = false) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const state = await evaluate(`({
      path: location.pathname,
      ready: document.readyState,
      targets: document.querySelectorAll('[data-showcase-target]').length,
      reloaded: window.__honestyReviewReloadMarker !== true
    })`);
    if (
      state.path === expectedPath &&
      state.ready === 'complete' &&
      state.targets === expectedTargets &&
      (!waitForReload || state.reloaded)
    ) {
      return state;
    }
    await delay(50);
  }
  return evaluate(`({
    path: location.pathname,
    ready: document.readyState,
    targets: document.querySelectorAll('[data-showcase-target]').length,
    reloaded: window.__honestyReviewReloadMarker !== true
  })`);
}

async function configure(width, height, theme, direction) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await navigate(`${baseUrl}/`);
  await evaluate(`localStorage.setItem('honesty-lab-theme', ${JSON.stringify(theme)})`);
  await navigate(`${baseUrl}/components`);
  await evaluate(`document.documentElement.dir = ${JSON.stringify(direction)}`);
}

async function settle() {
  await evaluate(`Promise.race([
    Promise.all([...document.images].map((image) => image.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          image.addEventListener('load', resolve, {once: true});
          image.addEventListener('error', resolve, {once: true});
        }))),
    new Promise((resolve) => setTimeout(resolve, 1500))
  ])`);
  await delay(350);
}

function pageMetrics() {
  return `(() => ({
    targets: document.querySelectorAll('[data-showcase-target]').length,
    galleryOwners: document.querySelectorAll('[data-showcase-gallery-owner]').length,
    gallery: Boolean(document.querySelector('[data-review-section="gallery"]')),
    comparison: Boolean(document.querySelector('[data-review-section="comparison"]')),
    controls: Boolean(document.querySelector('[data-showcase-api-controls]')),
    controlsOpen: document.querySelector('[data-showcase-api-controls]')?.open ?? null,
    horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    appShells: document.querySelectorAll('erp-app-shell').length,
    routerOutlets: document.querySelectorAll('router-outlet').length,
    overlayHosts: document.querySelectorAll('erp-overlay-host').length
  }))()`;
}

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  await configure(390, 844, 'light', 'rtl');
  const routes = buildCatalog()
    .filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT')
    .map((entry) => entry.showcaseRoute);
  const routeAudit = [];
  for (const route of routes) {
    observed = [];
    await navigate(`${baseUrl}${route}`);
    let metrics = await evaluate(pageMetrics());
    if (metrics.targets !== 1) {
      await delay(1000);
      metrics = await evaluate(pageMetrics());
    }
    routeAudit.push({route, ...metrics, consoleFindings: [...observed]});
  }
  await fs.writeFile(
    path.join(outputDirectory, 'route-audit.json'),
    `${JSON.stringify(routeAudit, null, 2)}\n`,
    'utf8',
  );

  await configure(1280, 800, 'light', 'rtl');
  await navigate(`${baseUrl}/components/button`);
  await navigate(`${baseUrl}/components/table`);
  await evaluate('history.back()');
  const backPath = await waitForPath('/components/button');
  await evaluate('history.forward()');
  const forwardPath = await waitForPath('/components/table');
  await evaluate('window.__honestyReviewReloadMarker = true');
  await send('Page.reload');
  const refreshState = await waitForRouteReady('/components/table', 1, true);
  const refreshPath = refreshState.path;
  await settle();
  const refreshMetrics = await evaluate(pageMetrics());
  const navigationAudit = {
    backPath,
    forwardPath,
    refreshPath,
    refreshTargets: refreshMetrics.targets,
    passed: backPath === '/components/button' &&
      forwardPath === '/components/table' &&
      refreshPath === '/components/table' &&
      refreshMetrics.targets === 1,
  };

  const scenarios = [
    ['components', 1440, 900, 'light', 'rtl', 'top'],
    ['components/button', 1440, 900, 'light', 'rtl', 'gallery'],
    ['components/status-badge', 1440, 900, 'light', 'rtl', 'comparison'],
    ['components/tabs', 1440, 900, 'dark', 'ltr', 'comparison'],
    ['components/table', 1440, 900, 'light', 'rtl', 'comparison'],
    ['components/app-shell', 1440, 900, 'dark', 'ltr', 'top'],
    ['components/button', 1280, 800, 'light', 'ltr', 'gallery'],
    ['components/table', 1024, 768, 'dark', 'ltr', 'comparison'],
    ['components/app-shell', 768, 900, 'light', 'rtl', 'top'],
    ['components/button', 390, 844, 'dark', 'rtl', 'gallery'],
    ['components/table', 390, 844, 'dark', 'rtl', 'gallery'],
    ['components/app-shell', 390, 844, 'dark', 'ltr', 'top'],
    ['components/app-shell', 320, 568, 'light', 'rtl', 'top'],
  ];
  const captures = [];
  for (const [route, width, height, theme, direction, focus] of scenarios) {
    await configure(width, height, theme, direction);
    observed = [];
    await navigate(`${baseUrl}/${route}`);
    await evaluate(`document.documentElement.dir = ${JSON.stringify(direction)}`);
    if (focus !== 'top') {
      await evaluate(`document.getElementById(${JSON.stringify(focus === 'comparison' ? 'reference-comparison' : 'visual-gallery')})?.scrollIntoView({block: 'start'})`);
    }
    await settle();
    const metrics = await evaluate(pageMetrics());
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    });
    const fileName = `${route.replaceAll('/', '-')}-${width}x${height}-${theme}-${direction}-${focus}.png`;
    await fs.writeFile(path.join(outputDirectory, fileName), Buffer.from(screenshot.data, 'base64'));
    captures.push({fileName, route: `/${route}`, width, height, theme, direction, focus, ...metrics, consoleFindings: [...observed]});
  }

  const routeFailures = routeAudit.filter((entry) =>
    entry.targets !== 1 || !entry.gallery || !entry.comparison || !entry.controls ||
    entry.controlsOpen || entry.horizontalOverflow > 0 || entry.brokenImages > 0 ||
    entry.appShells !== 1 || entry.routerOutlets !== 1 || entry.overlayHosts !== 1 ||
    entry.consoleFindings.length > 0);
  const captureFailures = captures.filter((entry) =>
    entry.horizontalOverflow > 0 || entry.brokenImages > 0 ||
    entry.appShells !== 1 || entry.routerOutlets !== 1 || entry.overlayHosts !== 1 ||
    entry.consoleFindings.length > 0 ||
    (entry.route !== '/components' &&
      (entry.targets !== 1 || !entry.gallery || !entry.comparison || !entry.controls ||
        entry.controlsOpen)));
  const audit = {
    capturedAt: new Date().toISOString(),
    baseUrl,
    publicRoutes: routes.length,
    failures: routeFailures,
    captureFailures,
    navigationAudit,
    routeAudit,
    captures,
  };
  await fs.writeFile(
    path.join(outputDirectory, 'runtime-audit.json'),
    `${JSON.stringify(audit, null, 2)}\n`,
    'utf8',
  );
  if (routeFailures.length > 0 || captureFailures.length > 0 || !navigationAudit.passed) {
    throw new Error('Visual review runtime audit failed. Inspect runtime-audit.json.');
  }
  console.log(`Visual review audit complete: ${routes.length} routes, ${audit.failures.length} failures, ${captures.length} captures.`);
} finally {
  socket.close();
  browser.kill();
  await delay(500);
  try {
    await fs.rm(profileDirectory, {recursive: true, force: true, maxRetries: 10, retryDelay: 100});
  } catch (error) {
    console.warn(`Review browser profile cleanup deferred: ${error.message}`);
  }
  await fs.mkdir(evidenceDirectory, {recursive: true});
  await fs.cp(outputDirectory, evidenceDirectory, {recursive: true, force: true});
  await fs.rm(outputDirectory, {recursive: true, force: true});
}
