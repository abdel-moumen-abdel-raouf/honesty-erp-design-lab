import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const mode = process.argv.includes('--baseline') ? 'baseline' : 'corrected';
const port = Number(process.env['HONESTY_CAPTURE_CDP_PORT'] ?? 9223);
const cdpUrl = `http://localhost:${port}`;
const outputDirectory = path.resolve(
  'docs/review-evidence/erp-user-menu/final-trigger-v2',
);

const users = {
  image: {
    displayName: 'أميرة حداد',
    secondaryText: 'الحساب المؤسسي',
    email: 'amira.haddad@honesty.example',
    roleLabel: 'مديرة المالية',
    branchLabel: 'الفرع الرئيسي',
    avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
    avatarPresence: 'online',
  },
  initials: {
    displayName: 'عمر ناصر',
    secondaryText: 'فريق العمليات',
    email: 'omar.nasser@honesty.example',
    roleLabel: 'مسؤول المخزون',
    branchLabel: 'فرع الإسكندرية',
    avatarPresence: 'away',
  },
  icon: {
    displayName: 'حساب الدعم',
    secondaryText: 'هوية خدمة داخلية',
    email: 'support@honesty.example',
    roleLabel: 'دعم النظام',
    branchLabel: 'المركز الرئيسي',
    fallbackIcon: 'user',
    avatarPresence: 'busy',
  },
  longArabic: {
    displayName: 'نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية',
    secondaryText: 'إدارة سلاسل الإمداد والمشتريات',
    email: 'nadia.abdelrahman@honesty.example',
    roleLabel: 'مسؤولة المشتريات الإقليمية',
    branchLabel: 'فرع القاهرة الجديدة',
    avatarPresence: 'offline',
  },
  longEnglish: {
    displayName: 'Alexandria Regional Finance Operations Manager',
    secondaryText: 'Regional finance operations',
    email: 'alexandria.finance.manager@honesty.example',
    roleLabel: 'Finance Operations',
    branchLabel: 'Alexandria Branch',
    avatarPresence: 'online',
  },
  mixed: {
    displayName: 'ليلى Mahmoud — Procurement Operations',
    secondaryText: 'المشتريات · Regional Office',
    email: 'leila.mahmoud@honesty.example',
    roleLabel: 'Procurement Lead',
    branchLabel: 'فرع الجيزة · Giza',
    avatarPresence: 'away',
  },
  minimal: {
    displayName: 'ليلى محمود',
  },
};

const baselineStates = [
  {name: 'light-rtl-1440-default-closed', width: 1440, height: 900, theme: 'light', direction: 'rtl', user: 'image'},
  {name: 'dark-rtl-1440-default-closed', width: 1440, height: 900, theme: 'dark', direction: 'rtl', user: 'image'},
  {name: 'dark-ltr-1440-default-closed', width: 1440, height: 900, theme: 'dark', direction: 'ltr', user: 'image'},
  {name: 'light-rtl-768-mixed-closed', width: 768, height: 900, theme: 'light', direction: 'rtl', user: 'mixed'},
  {name: 'dark-rtl-390-default-closed', width: 390, height: 844, theme: 'dark', direction: 'rtl', user: 'image'},
  {name: 'light-ltr-320-long-closed', width: 320, height: 568, theme: 'light', direction: 'ltr', user: 'longEnglish'},
];

const correctedStates = [
  {name: 'light-rtl-1440-default-closed', width: 1440, height: 900, theme: 'light', direction: 'rtl', user: 'image'},
  {name: 'light-rtl-1440-default-open', width: 1440, height: 900, theme: 'light', direction: 'rtl', user: 'image', open: true},
  {name: 'dark-rtl-1440-default-closed', width: 1440, height: 900, theme: 'dark', direction: 'rtl', user: 'image'},
  {name: 'dark-rtl-1440-default-open', width: 1440, height: 900, theme: 'dark', direction: 'rtl', user: 'image', open: true},
  {name: 'dark-ltr-1440-default-closed', width: 1440, height: 900, theme: 'dark', direction: 'ltr', user: 'image'},
  {name: 'dark-ltr-1440-default-open', width: 1440, height: 900, theme: 'dark', direction: 'ltr', user: 'image', open: true},
  {name: 'light-rtl-768-initials-closed', width: 768, height: 900, theme: 'light', direction: 'rtl', user: 'initials'},
  {name: 'light-rtl-768-image-closed', width: 768, height: 900, theme: 'light', direction: 'rtl', user: 'image'},
  {name: 'light-rtl-768-mixed-open', width: 768, height: 900, theme: 'light', direction: 'rtl', user: 'mixed', open: true},
  {name: 'dark-rtl-768-long-arabic-closed', width: 768, height: 900, theme: 'dark', direction: 'rtl', user: 'longArabic'},
  {name: 'dark-rtl-390-default-closed', width: 390, height: 844, theme: 'dark', direction: 'rtl', user: 'image'},
  {name: 'dark-rtl-390-default-open', width: 390, height: 844, theme: 'dark', direction: 'rtl', user: 'image', open: true},
  {name: 'light-ltr-320-long-closed', width: 320, height: 568, theme: 'light', direction: 'ltr', user: 'longEnglish'},
  {name: 'light-ltr-320-long-open', width: 320, height: 568, theme: 'light', direction: 'ltr', user: 'longEnglish', open: true},
  {name: 'light-rtl-390-role-trigger-closed', width: 390, height: 844, theme: 'light', direction: 'rtl', user: 'image', triggerRole: true, triggerBranch: false},
  {name: 'light-rtl-390-branch-trigger-closed', width: 390, height: 844, theme: 'light', direction: 'rtl', user: 'image', triggerRole: false, triggerBranch: true},
  {name: 'light-rtl-390-both-trigger-closed', width: 390, height: 844, theme: 'light', direction: 'rtl', user: 'image', triggerRole: true, triggerBranch: true},
  {name: 'light-rtl-390-no-trigger-badges-closed', width: 390, height: 844, theme: 'light', direction: 'rtl', user: 'image', triggerRole: false, triggerBranch: false},
  {name: 'dark-ltr-390-icon-open', width: 390, height: 844, theme: 'dark', direction: 'ltr', user: 'icon', open: true},
  {name: 'light-rtl-320-minimal-closed', width: 320, height: 568, theme: 'light', direction: 'rtl', user: 'minimal'},
];

const states = mode === 'baseline' ? baselineStates : correctedStates;
const defaultTriggerBadges = mode === 'corrected';
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function connect() {
  let targets = [];
  for (let attempt = 0; attempt < 40; attempt += 1) {
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

async function waitForShowcase(send) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(send, `Boolean(
      document.querySelector('[data-showcase-target]') &&
      document.querySelector('[data-showcase-control="user"] textarea')
    )`);
    if (ready) return;
    await delay(250);
  }
  throw new Error('UserMenu showcase did not become ready.');
}

function stateExpression(state) {
  const user = users[state.user];
  return `(async () => {
    const pause = (value) => new Promise((resolve) => setTimeout(resolve, value));
    const root = document.querySelector('#lab-capture-root');
    const themeButton = document.querySelector('#btn-lab-theme button');
    if (root?.getAttribute('data-theme') !== ${JSON.stringify(state.theme)}) {
      themeButton?.click();
      await pause(100);
    }
    const target = document.querySelector('[data-showcase-target]');
    const surface = target.querySelector('.user-menu__surface');
    const triggerButton = target.querySelector('.user-menu__trigger-action button');
    if (surface.matches(':popover-open')) {
      triggerButton.click();
      await pause(100);
    }
    const editor = document.querySelector('[data-showcase-control="user"] textarea');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    setter.call(editor, ${JSON.stringify(JSON.stringify(user, null, 2))});
    editor.dispatchEvent(new Event('input', {bubbles: true}));
    editor.dispatchEvent(new Event('change', {bubbles: true}));

    const setBoolean = async (name, desired) => {
      const input = document.querySelector(
        '[data-showcase-control="' + name + '"] input[type="checkbox"]'
      );
      if (input && input.checked !== desired) {
        input.click();
        await pause(60);
      }
    };
    await setBoolean('showAvatar', true);
    await setBoolean('showUserName', true);
    await setBoolean('showEmail', true);
    await setBoolean('showPresence', true);
    await setBoolean('showRoleBadge', true);
    await setBoolean('showBranchBadge', true);
    await setBoolean('showTriggerRoleBadge', ${state.triggerRole ?? defaultTriggerBadges});
    await setBoolean('showTriggerBranchBadge', ${state.triggerBranch ?? defaultTriggerBadges});

    target.setAttribute('dir', ${JSON.stringify(state.direction)});
    await pause(180);
    target.scrollIntoView({block: 'center', inline: 'nearest'});
    await pause(160);
    if (${Boolean(state.open)}) triggerButton.click();
    await pause(720);
    await Promise.all(Array.from(target.querySelectorAll('img')).map((image) =>
      image.complete ? Promise.resolve() : new Promise((resolve) => {
        image.addEventListener('load', resolve, {once: true});
        image.addEventListener('error', resolve, {once: true});
      })
    ));

    const rect = (element) => {
      const value = element?.getBoundingClientRect();
      return value ? {
        left: value.left, top: value.top, right: value.right, bottom: value.bottom,
        width: value.width, height: value.height,
      } : null;
    };
    const metrics = (element) => {
      if (!element) return null;
      const style = getComputedStyle(element);
      const box = rect(element);
      return {
        box,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        lineHeight: style.lineHeight,
        overflowX: style.overflowX,
        overflowY: style.overflowY,
        contentExceedsInline: element.scrollWidth > element.clientWidth + 1,
        contentExceedsBlock: element.scrollHeight > element.clientHeight + 1,
        clippedInline:
          element.scrollWidth > element.clientWidth + 1 &&
          ['hidden', 'clip'].includes(style.overflowX),
        clippedBlock:
          element.scrollHeight > element.clientHeight + 1 &&
          ['hidden', 'clip'].includes(style.overflowY),
      };
    };
    const trigger = target.querySelector('.user-menu__trigger');
    const identity = target.querySelector('.user-menu__trigger-identity');
    const avatar = target.querySelector('.user-menu__trigger-avatar');
    const arrow = surface.querySelector('erp-user-menu-arrow');
    const triggerRect = rect(trigger);
    const avatarRect = rect(avatar);
    const triggerStyle = getComputedStyle(trigger);
    const directRows = Array.from(identity.children).filter((element) => {
      const style = getComputedStyle(element);
      return style.display !== 'none' && element.getBoundingClientRect().height > 0;
    });
    const rowMetrics = directRows.map((element) => ({
      className: element.className,
      text: element.textContent.trim(),
      ...metrics(element),
    }));
    const surfaceRect = surface.matches(':popover-open') ? rect(surface) : null;
    const arrowRect = surfaceRect && getComputedStyle(arrow).display !== 'none'
      ? rect(arrow)
      : null;
    const bounds = [triggerRect, surfaceRect].filter(Boolean).reduce((result, value) => ({
      left: Math.min(result.left, value.left),
      top: Math.min(result.top, value.top),
      right: Math.max(result.right, value.right),
      bottom: Math.max(result.bottom, value.bottom),
    }), {...triggerRect});
    const margin = 18;
    const cropViewport = {
      left: Math.max(0, bounds.left - margin),
      top: Math.max(0, bounds.top - margin),
      right: Math.min(innerWidth, bounds.right + margin),
      bottom: Math.min(innerHeight, bounds.bottom + margin),
    };
    return {
      name: ${JSON.stringify(state.name)},
      viewport: {width: innerWidth, height: innerHeight},
      theme: root?.getAttribute('data-theme'),
      direction: target.getAttribute('dir'),
      open: surface.matches(':popover-open'),
      targetCount: document.querySelectorAll('[data-showcase-target]').length,
      trigger: {
        ...metrics(trigger),
        padding: {
          top: triggerStyle.paddingTop, right: triggerStyle.paddingRight,
          bottom: triggerStyle.paddingBottom, left: triggerStyle.paddingLeft,
        },
        gap: triggerStyle.gap,
        minBlockSize: triggerStyle.minBlockSize,
      },
      avatar: metrics(avatar),
      avatarCenterDelta: triggerRect && avatarRect
        ? Math.abs(
          (avatarRect.top + avatarRect.height / 2) -
          (triggerRect.top + triggerRect.height / 2)
        )
        : null,
      avatarLogicalSide: triggerRect && avatarRect && identity
        ? (${JSON.stringify(state.direction)} === 'rtl'
          ? (avatarRect.left >= identity.getBoundingClientRect().right ? 'start' : 'wrong')
          : (avatarRect.right <= identity.getBoundingClientRect().left ? 'start' : 'wrong'))
        : null,
      identity: metrics(identity),
      identityBlockSize: identity?.getBoundingClientRect().height ?? null,
      visibleIdentityRows: rowMetrics.length,
      rows: rowMetrics,
      triggerSecondaryPresent: Boolean(
        target.querySelector('.user-menu__trigger-secondary')
      ),
      emailPresentation: (() => {
        const email = target.querySelector('.user-menu__email--trigger');
        if (!email) return null;
        const style = getComputedStyle(email);
        return {
          direction: style.direction,
          textAlign: style.textAlign,
          unicodeBidi: style.unicodeBidi,
        };
      })(),
      triggerBadges: target.querySelectorAll('.user-menu__badges--trigger erp-status-badge').length,
      triggerBadgeMetrics: Array.from(
        target.querySelectorAll('.user-menu__badges--trigger erp-status-badge')
      ).map((badge) => ({
        ariaLabel: badge.getAttribute('aria-label'),
        ...metrics(badge),
      })),
      popupBadges: surface.querySelectorAll('.user-menu__badges erp-status-badge').length,
      surface: surfaceRect,
      arrow: arrowRect,
      arrowCenterDelta: arrowRect && triggerRect
        ? Math.abs(
          (arrowRect.left + arrowRect.width / 2) -
          (triggerRect.left + triggerRect.width / 2)
        )
        : null,
      placement: surface.dataset.overlayPlacement ?? null,
      surfaceOverflow: surfaceRect ? {
        left: Math.max(0, -surfaceRect.left),
        right: Math.max(0, surfaceRect.right - innerWidth),
        top: Math.max(0, -surfaceRect.top),
        bottom: Math.max(0, surfaceRect.bottom - innerHeight),
      } : null,
      pageHorizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: Array.from(target.querySelectorAll('img')).filter(
        (image) => !image.complete || image.naturalWidth === 0
      ).length,
      crop: {
        x: cropViewport.left + scrollX,
        y: cropViewport.top + scrollY,
        width: cropViewport.right - cropViewport.left,
        height: cropViewport.bottom - cropViewport.top,
        scale: 1,
      },
    };
  })()`;
}

await mkdir(outputDirectory, {recursive: true});
const {socket, send, diagnostics} = await connect();
await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Page.navigate', {url: 'http://localhost:4999/components/user-menu'});
await waitForShowcase(send);

const measurements = [];
for (const state of states) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: state.width,
    height: state.height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await delay(150);
  const measurement = await evaluate(send, stateExpression(state));
  measurements.push(measurement);
  const full = await send('Page.captureScreenshot', {
    format: 'png', fromSurface: true, captureBeyondViewport: false,
  });
  await writeFile(
    path.join(outputDirectory, `${mode}-${state.name}-full.png`),
    Buffer.from(full.data, 'base64'),
  );
  const cropped = await send('Page.captureScreenshot', {
    format: 'png', fromSurface: true, captureBeyondViewport: false,
    clip: measurement.crop,
  });
  await writeFile(
    path.join(outputDirectory, `${mode}-${state.name}-crop.png`),
    Buffer.from(cropped.data, 'base64'),
  );
}

await send('Emulation.clearDeviceMetricsOverride');
socket.close();
const report = {mode, capturedAt: new Date().toISOString(), measurements, diagnostics};
await writeFile(
  path.join(outputDirectory, `${mode}-measurements.json`),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));

if (mode === 'corrected') {
  const failures = [];
  for (const [index, measurement] of measurements.entries()) {
    const expected = states[index];
    if (measurement.targetCount !== 1) failures.push(`${measurement.name}: target count`);
    if (measurement.open !== Boolean(expected.open)) failures.push(`${measurement.name}: open state`);
    if (measurement.visibleIdentityRows > 3) failures.push(`${measurement.name}: identity rows`);
    if (measurement.rows.some((row) => row.clippedBlock)) failures.push(`${measurement.name}: vertical row clipping`);
    if (measurement.pageHorizontalOverflow !== 0) failures.push(`${measurement.name}: page overflow`);
    if (measurement.brokenImages !== 0) failures.push(`${measurement.name}: broken image`);
    if (measurement.avatarCenterDelta !== 0) failures.push(`${measurement.name}: avatar alignment`);
    if (measurement.avatarLogicalSide !== 'start') failures.push(`${measurement.name}: avatar logical side`);
    if (measurement.surfaceOverflow && Object.values(measurement.surfaceOverflow).some(Boolean)) {
      failures.push(`${measurement.name}: popup containment`);
    }
    if (expected.open && expected.width > 767 && measurement.arrowCenterDelta > 0.5) {
      failures.push(`${measurement.name}: arrow alignment`);
    }
    if (expected.open && expected.width <= 767 && measurement.arrow !== null) {
      failures.push(`${measurement.name}: narrow arrow visibility`);
    }
    const expectedTriggerBadges = expected.user === 'minimal'
      ? 0
      : Number(expected.triggerRole ?? defaultTriggerBadges) +
        Number(expected.triggerBranch ?? defaultTriggerBadges);
    if (measurement.triggerBadges !== expectedTriggerBadges) {
      failures.push(`${measurement.name}: trigger badge count`);
    }
    if (measurement.triggerSecondaryPresent) {
      failures.push(`${measurement.name}: trigger secondary text`);
    }
    if (measurement.triggerBadgeMetrics.some((badge) => badge.clippedBlock)) {
      failures.push(`${measurement.name}: trigger badge block clipping`);
    }
    if (measurement.emailPresentation &&
      measurement.direction === 'rtl' &&
      measurement.emailPresentation.textAlign !== 'start') {
      failures.push(`${measurement.name}: trigger email alignment`);
    }
    const expectedPopupBadges = expected.user === 'minimal' ? 0 : 2;
    if (measurement.popupBadges !== expectedPopupBadges) {
      failures.push(`${measurement.name}: popup badge count`);
    }
  }
  if (diagnostics.length > 0) failures.push(`browser diagnostics: ${diagnostics.length}`);
  if (failures.length > 0) {
    throw new Error(`Corrected UserMenu evidence failed:\n${failures.join('\n')}`);
  }
}
