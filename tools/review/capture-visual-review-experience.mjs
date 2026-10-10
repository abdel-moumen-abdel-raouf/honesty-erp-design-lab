import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {buildCatalog, REPO_ROOT} from '../catalog/erp-component-catalog.mjs';

const baseUrl = process.argv.find((argument) => argument.startsWith('--base-url='))
  ?.slice('--base-url='.length) ?? 'http://127.0.0.1:4999';
const captureOnly = process.argv.includes('--capture-only');
const scenarioFilter = process.argv.find((argument) => argument.startsWith('--scenario='))
  ?.slice('--scenario='.length);
const evidenceDirectory = path.join(REPO_ROOT, 'docs/review-evidence/visual-review-experience-v1-1');
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
    overlayHosts: document.querySelectorAll('erp-overlay-host').length,
    openPopovers: document.querySelectorAll('[popover]:popover-open').length,
    expandedTriggers: document.querySelectorAll('[aria-expanded="true"]').length,
    popoversContained: [...document.querySelectorAll('[popover]:popover-open')].every((surface) => {
      const rect = surface.getBoundingClientRect();
      return rect.left >= -0.5 && rect.top >= -0.5 && rect.right <= innerWidth + 0.5 && rect.bottom <= innerHeight + 0.5;
    })
  }))()`;
}

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  const publicEntries = buildCatalog()
    .filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT');
  const routes = publicEntries.map((entry) => entry.showcaseRoute);
  const expectedGalleryOwners = new Map(publicEntries.map((entry) => [
    entry.showcaseRoute,
    entry.className === 'ErpAppShell' ? 0 : entry.reviewGalleryCoverage.caseCount,
  ]));
  const expandedGalleryIds = new Set([
    'app-footer', 'applications-menu', 'messages-menu', 'notification-bell', 'quick-actions-bar',
    'topbar', 'bulk-action-bar', 'entity-schema-fields', 'form-actions', 'form-section',
    'validation-summary', 'combo-box', 'date-box', 'date-range-box', 'date-time-box',
    'file-picker', 'icon-picker', 'image-picker', 'item-picker', 'money-box', 'number-box',
    'number-stepper', 'password-box', 'tel-box', 'text-area-box', 'text-box', 'time-box',
    'url-box', 'breadcrumbs', 'pagination', 'sidebar', 'stepper', 'page-header', 'page-shell',
    'container',
  ]);
  const expandedEntries = publicEntries.filter((entry) => expandedGalleryIds.has(entry.id));
  const routeAudit = [];
  const auditMatrix = captureOnly ? [] : [
    {entries: publicEntries, width: 390, height: 844, theme: 'light', direction: 'rtl', scope: 'all-routes'},
    {entries: expandedEntries, width: 1440, height: 900, theme: 'light', direction: 'rtl', scope: 'expanded-galleries'},
    {entries: expandedEntries, width: 1440, height: 900, theme: 'dark', direction: 'ltr', scope: 'expanded-galleries'},
    {entries: expandedEntries, width: 390, height: 844, theme: 'light', direction: 'ltr', scope: 'expanded-galleries'},
    {entries: expandedEntries, width: 390, height: 844, theme: 'dark', direction: 'rtl', scope: 'expanded-galleries'},
  ];
  for (const matrix of auditMatrix) {
    await configure(matrix.width, matrix.height, matrix.theme, matrix.direction);
    for (const entry of matrix.entries) {
      observed = [];
      await navigate(`${baseUrl}${entry.showcaseRoute}`);
      await evaluate(`document.documentElement.dir = ${JSON.stringify(matrix.direction)}`);
      let metrics = await evaluate(pageMetrics());
      if (metrics.targets !== 1 || metrics.galleryOwners !== expectedGalleryOwners.get(entry.showcaseRoute)) {
        await delay(1000);
        metrics = await evaluate(pageMetrics());
      }
      routeAudit.push({
        route: entry.showcaseRoute,
        scope: matrix.scope,
        width: matrix.width,
        height: matrix.height,
        theme: matrix.theme,
        direction: matrix.direction,
        expectedGalleryOwners: expectedGalleryOwners.get(entry.showcaseRoute),
        ...metrics,
        consoleFindings: [...observed],
      });
    }
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

  const allScenarios = [
    ['components/text-box', 1440, 900, 'light', 'rtl', 'gallery', null],
    ['components/number-box', 1440, 900, 'dark', 'ltr', 'gallery', null],
    ['components/applications-menu', 1440, 900, 'light', 'rtl', 'gallery', 'open-gallery'],
    ['components/messages-menu', 1440, 900, 'dark', 'ltr', 'gallery', 'open-gallery'],
    ['components/notification-bell', 390, 844, 'light', 'ltr', 'gallery', 'open-gallery'],
    ['components/combo-box', 390, 844, 'dark', 'rtl', 'gallery', null],
    ['components/sidebar', 1440, 900, 'dark', 'rtl', 'gallery', null],
    ['components/page-header', 390, 844, 'dark', 'ltr', 'gallery', null],
    ['components/form-actions', 390, 844, 'light', 'ltr', 'gallery', null],
    ['components/page-shell', 1440, 900, 'light', 'ltr', 'gallery', null],
    ['components/app-shell', 390, 844, 'dark', 'rtl', 'top', null],
  ];
  const scenarios = scenarioFilter
    ? allScenarios.filter(([route]) => route === `components/${scenarioFilter}`)
    : allScenarios;
  const captures = [];
  for (const [route, width, height, theme, direction, focus, interaction] of scenarios) {
    await configure(width, height, theme, direction);
    observed = [];
    await navigate(`${baseUrl}/${route}`);
    await evaluate(`document.documentElement.dir = ${JSON.stringify(direction)}`);
    if (focus !== 'top') {
      await evaluate(`document.getElementById(${JSON.stringify(focus === 'comparison' ? 'reference-comparison' : 'visual-gallery')})?.scrollIntoView({block: 'start'})`);
    }
    await settle();
    if (interaction === 'open-gallery') {
      await evaluate(`document.querySelector('[data-showcase-gallery-case="open-preview"]')?.scrollIntoView({block: 'start'})`);
      await delay(150);
      const activated = await evaluate(`(() => {
        const owner = document.querySelector('[data-gallery-overlay-toggle]');
        const button = owner?.querySelector('button');
        if (!button) return false;
        button.click();
        return true;
      })()`);
      if (!activated) throw new Error(`Gallery overlay trigger missing for /${route}.`);
      await delay(350);
    }
    const metrics = await evaluate(pageMetrics());
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    });
    const fileName = `${route.replaceAll('/', '-')}-${width}x${height}-${theme}-${direction}-${focus}${interaction ? `-${interaction}` : ''}.png`;
    await fs.writeFile(path.join(outputDirectory, fileName), Buffer.from(screenshot.data, 'base64'));
    captures.push({fileName, route: `/${route}`, width, height, theme, direction, focus, interaction, ...metrics, consoleFindings: [...observed]});
    if (interaction === 'open-gallery') {
      await evaluate(`document.querySelector('[data-gallery-overlay-toggle] button')?.click()`);
      await delay(150);
      const closeState = await evaluate(`({
        toggleLabel: document.querySelector('[data-gallery-overlay-toggle]')?.textContent?.trim() ?? null,
        remaining: [...document.querySelectorAll('[popover]:popover-open')].map((surface) => ({
          className: surface.className,
          owner: surface.closest('[data-showcase-gallery-case]')?.getAttribute('data-showcase-gallery-case') ?? null,
          label: surface.getAttribute('aria-label'),
          parent: surface.parentElement?.tagName ?? null,
          grandparent: surface.parentElement?.parentElement?.tagName ?? null,
          componentOpen: globalThis.ng?.getComponent(surface.parentElement)?.open?.() ?? null,
          chain: (() => { const tags = []; let node = surface; while (node && tags.length < 8) { tags.push(node.tagName + (node.getAttribute?.('data-showcase-gallery-case') ? ':' + node.getAttribute('data-showcase-gallery-case') : '')); node = node.parentElement; } return tags; })(),
          left: surface.style.left,
          top: surface.style.top
        }))
      })`);
      if (closeState.remaining.length !== 0) throw new Error(`Gallery overlay did not dismiss for /${route}: ${JSON.stringify(closeState)}.`);
    }
  }

  const routeFailures = routeAudit.filter((entry) =>
    entry.targets !== 1 || entry.galleryOwners !== entry.expectedGalleryOwners || !entry.gallery || !entry.comparison || !entry.controls ||
    entry.controlsOpen || entry.horizontalOverflow > 0 || entry.brokenImages > 0 ||
    entry.appShells !== 1 || entry.routerOutlets !== 1 || entry.overlayHosts !== 1 ||
    entry.consoleFindings.length > 0);
  const captureFailures = captures.filter((entry) =>
    entry.horizontalOverflow > 0 || entry.brokenImages > 0 ||
    entry.appShells !== 1 || entry.routerOutlets !== 1 || entry.overlayHosts !== 1 ||
    entry.consoleFindings.length > 0 || !entry.popoversContained ||
    (entry.route !== '/components' &&
      (entry.targets !== 1 || !entry.gallery || !entry.comparison || !entry.controls ||
        entry.controlsOpen)) ||
    (entry.interaction === 'open-gallery' && (entry.openPopovers !== 1 || entry.expandedTriggers < 1)));
  const audit = {
    capturedAt: new Date().toISOString(),
    baseUrl,
    publicRoutes: routes.length,
    expandedGalleryRoutes: expandedEntries.length,
    auditRuns: routeAudit.length,
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
