import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const port = Number(process.env['HONESTY_CAPTURE_CDP_PORT'] ?? 9223);
const baseUrl = `http://127.0.0.1:${port}`;
const outputDirectory = path.resolve(
  'docs/review-evidence/erp-user-menu',
);

const users = {
  'صورة محلية — متصل': {
    displayName: 'أميرة حداد',
    secondaryText: 'الحساب المؤسسي',
    email: 'amira.haddad@honesty.example',
    roleLabel: 'مديرة المالية',
    branchLabel: 'الفرع الرئيسي',
    avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
    avatarPresence: 'online',
  },
  'أحرف أولى — بعيد': {
    displayName: 'عمر ناصر',
    secondaryText: 'فريق العمليات',
    email: 'omar.nasser@honesty.example',
    roleLabel: 'مسؤول المخزون',
    branchLabel: 'فرع الإسكندرية',
    avatarPresence: 'away',
  },
  'أيقونة صريحة — مشغول': {
    displayName: 'حساب الدعم',
    secondaryText: 'هوية خدمة داخلية',
    email: 'support@honesty.example',
    roleLabel: 'دعم النظام',
    branchLabel: 'المركز الرئيسي',
    fallbackIcon: 'user',
    avatarPresence: 'busy',
  },
  'اسم عربي طويل — غير متصل': {
    displayName: 'نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية',
    secondaryText: 'إدارة سلاسل الإمداد والمشتريات',
    email: 'nadia.abdelrahman@honesty.example',
    roleLabel: 'مسؤولة المشتريات الإقليمية',
    branchLabel: 'فرع القاهرة الجديدة',
    avatarPresence: 'offline',
  },
  'اسم إنجليزي طويل — متصل': {
    displayName: 'Alexandria Regional Finance Operations Manager',
    secondaryText: 'Regional finance operations',
    email: 'alexandria.finance.manager@honesty.example',
    roleLabel: 'Finance Operations',
    branchLabel: 'Alexandria Branch',
    avatarPresence: 'online',
  },
  'اسم مختلط الاتجاه — بعيد': {
    displayName: 'ليلى Mahmoud — Procurement Operations',
    secondaryText: 'المشتريات · Regional Office',
    email: 'leila.mahmoud@honesty.example',
    roleLabel: 'Procurement Lead',
    branchLabel: 'فرع الجيزة · Giza',
    avatarPresence: 'away',
  },
};

const states = [
  {
    file: 's1-final-default-rich-light-rtl-desktop-closed.png',
    width: 1440,
    height: 900,
    theme: 'light',
    direction: 'rtl',
    preset: 'صورة محلية — متصل',
    open: false,
  },
  {
    file: 's1-final-default-rich-light-rtl-desktop-open.png',
    width: 1440,
    height: 900,
    theme: 'light',
    direction: 'rtl',
    preset: 'صورة محلية — متصل',
    open: true,
  },
  {
    file: 's1-final-long-arabic-dark-rtl-desktop-open.png',
    width: 1440,
    height: 900,
    theme: 'dark',
    direction: 'rtl',
    preset: 'اسم عربي طويل — غير متصل',
    open: true,
  },
  {
    file: 's1-final-long-english-dark-ltr-desktop-open.png',
    width: 1440,
    height: 900,
    theme: 'dark',
    direction: 'ltr',
    preset: 'اسم إنجليزي طويل — متصل',
    open: true,
  },
  {
    file: 's1-final-initials-light-rtl-390-open.png',
    width: 390,
    height: 844,
    theme: 'light',
    direction: 'rtl',
    preset: 'أحرف أولى — بعيد',
    open: true,
  },
  {
    file: 's1-final-icon-dark-ltr-390-open.png',
    width: 390,
    height: 844,
    theme: 'dark',
    direction: 'ltr',
    preset: 'أيقونة صريحة — مشغول',
    open: true,
  },
  {
    file: 's1-final-long-arabic-light-rtl-320x568-open-scroll.png',
    width: 320,
    height: 568,
    theme: 'light',
    direction: 'rtl',
    preset: 'اسم عربي طويل — غير متصل',
    open: true,
    scrollBlock: 'start',
  },
  {
    file: 's1-final-long-english-dark-ltr-320x568-closed.png',
    width: 320,
    height: 568,
    theme: 'dark',
    direction: 'ltr',
    preset: 'اسم إنجليزي طويل — متصل',
    open: false,
  },
  {
    file: 's1-final-default-dark-ltr-320x844-open.png',
    width: 320,
    height: 844,
    theme: 'dark',
    direction: 'ltr',
    preset: 'صورة محلية — متصل',
    open: true,
  },
  {
    file: 's1-final-mixed-light-rtl-768-open.png',
    width: 768,
    height: 900,
    theme: 'light',
    direction: 'rtl',
    preset: 'اسم مختلط الاتجاه — بعيد',
    open: true,
  },
];

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function connect() {
  let targets = [];
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      targets = await fetch(`${baseUrl}/json/list`).then((response) =>
        response.json(),
      );
      if (targets.length > 0) break;
    } catch {
      // Chrome may still be starting.
    }
    await delay(250);
  }

  const target = targets.find((candidate) => candidate.type === 'page');
  if (!target?.webSocketDebuggerUrl) {
    throw new Error('No Chrome page target was available for UserMenu capture.');
  }

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
      diagnostics.push({
        level: message.params.entry.level,
        text: message.params.entry.text,
      });
    }
    if (message.method === 'Runtime.exceptionThrown') {
      diagnostics.push({
        level: 'exception',
        text: message.params.exceptionDetails.text,
      });
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
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
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitForShowcase(send) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(
      send,
      `Boolean(
        document.querySelector('[data-showcase-target]') &&
        document.querySelector('#erp-text-area-box-1')
      )`,
    );
    if (ready) return;
    await delay(250);
  }
  throw new Error('UserMenu showcase did not become ready.');
}

function stateExpression(state) {
  const user = users[state.preset];
  if (!user) throw new Error(`Unknown capture preset: ${state.preset}`);
  return `(async () => {
    const root = document.querySelector('#lab-capture-root');
    const themeButton = document.querySelector('#btn-lab-theme button');
    if (root?.getAttribute('data-theme') !== ${JSON.stringify(state.theme)}) {
      themeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    const target = document.querySelector('[data-showcase-target]');
    const surface = target.querySelector('.user-menu__surface');
    const triggerButton = target.querySelector(
      '.user-menu__trigger-action button'
    );
    if (surface.matches(':popover-open')) {
      triggerButton.click();
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    const editor = document.querySelector('#erp-text-area-box-1');
    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    ).set;
    valueSetter.call(editor, ${JSON.stringify(JSON.stringify(user, null, 2))});
    editor.dispatchEvent(new Event('input', {bubbles: true}));
    editor.dispatchEvent(new Event('change', {bubbles: true}));
    target.setAttribute('dir', ${JSON.stringify(state.direction)});
    await new Promise((resolve) => setTimeout(resolve, 160));

    target.scrollIntoView({
      block: ${JSON.stringify(state.scrollBlock ?? 'center')},
      inline: 'nearest'
    });
    if (${JSON.stringify(state.scrollBlock ?? 'center')} === 'start') {
      window.scrollBy(0, -1);
    }
    await new Promise((resolve) => setTimeout(resolve, 120));

    if (${state.open}) triggerButton.click();
    await new Promise((resolve) => setTimeout(resolve, 750));

    const trigger = target.querySelector('.user-menu__trigger');
    const identity = surface.querySelector('.user-menu__identity-header');
    const actions = surface.querySelector('.user-menu__items');
    const rect = (element) => {
      const value = element?.getBoundingClientRect();
      return value ? {
        left: value.left,
        top: value.top,
        right: value.right,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
      } : null;
    };
    const triggerRect = rect(trigger);
    const surfaceRect = rect(surface);
    const overlap = Boolean(
      surfaceRect && triggerRect &&
      surfaceRect.left < triggerRect.right &&
      surfaceRect.right > triggerRect.left &&
      surfaceRect.top < triggerRect.bottom &&
      surfaceRect.bottom > triggerRect.top
    );
    const placement = surface.dataset.overlayPlacement ?? null;
    const arrowCenter = surface.matches(':popover-open') && surfaceRect &&
      placement && ${state.width} > 767
      ? surfaceRect.left + Number.parseFloat(
          getComputedStyle(surface).getPropertyValue(
            '--honesty-anchored-surface-arrow-cross-axis-center'
          )
        )
      : null;
    const triggerCenter = triggerRect
      ? triggerRect.left + triggerRect.width / 2
      : null;
    const visualOrder = Array.from(
      target.querySelectorAll(
        '.user-menu__identity > .user-menu__identity-name, ' +
        '.user-menu__identity > .user-menu__email, ' +
        '.user-menu__identity > .user-menu__badges, ' +
        '.user-menu__identity > erp-text:last-child'
      )
    ).map((element) => element.className || 'secondaryText');

    return {
      file: ${JSON.stringify(state.file)},
      viewport: {width: innerWidth, height: innerHeight},
      theme: root?.getAttribute('data-theme'),
      direction: target.getAttribute('dir'),
      preset: ${JSON.stringify(state.preset)},
      open: surface.matches(':popover-open'),
      placement,
      targetCount: document.querySelectorAll('[data-showcase-target]').length,
      trigger: triggerRect,
      surface: surfaceRect,
      identity: rect(identity),
      actions: {
        ...rect(actions),
        clientHeight: actions.clientHeight,
        scrollHeight: actions.scrollHeight,
        scrollable: actions.scrollHeight > actions.clientHeight,
      },
      overlap,
      arrowDelta: arrowCenter === null || triggerCenter === null
        ? null
        : Math.abs(arrowCenter - triggerCenter),
      pageHorizontalOverflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      surfaceOverflow: surfaceRect ? {
        left: Math.max(0, -surfaceRect.left),
        right: Math.max(0, surfaceRect.right - innerWidth),
        top: Math.max(0, -surfaceRect.top),
        bottom: Math.max(0, surfaceRect.bottom - innerHeight),
      } : null,
      brokenImages: Array.from(document.images).filter(
        (image) => !image.complete || image.naturalWidth === 0
      ).length,
      visualOrder,
    };
  })()`;
}

await mkdir(outputDirectory, {recursive: true});
const {socket, send, diagnostics} = await connect();
await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Page.navigate', {
  url: 'http://127.0.0.1:4999/components/user-menu',
});
await waitForShowcase(send);

const measurements = [];
for (const state of states) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: state.width,
    height: state.height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await delay(120);
  const measurement = await evaluate(send, stateExpression(state));
  measurements.push(measurement);
  const screenshot = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(
    path.join(outputDirectory, state.file),
    Buffer.from(screenshot.data, 'base64'),
  );
}

await send('Emulation.setDeviceMetricsOverride', {
  width: 768,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
const dynamicGeometry = await evaluate(
  send,
  `(async () => {
    const target = document.querySelector('[data-showcase-target]');
    const editor = document.querySelector('#erp-text-area-box-1');
    const triggerButton = target.querySelector(
      '.user-menu__trigger-action button'
    );
    const surface = target.querySelector('.user-menu__surface');
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    ).set;
    const updateUser = async (value) => {
      setter.call(editor, JSON.stringify(value, null, 2));
      editor.dispatchEvent(new Event('input', {bubbles: true}));
      editor.dispatchEvent(new Event('change', {bubbles: true}));
      await new Promise((resolve) => setTimeout(resolve, 220));
    };
    if (surface.matches(':popover-open')) triggerButton.click();
    target.setAttribute('dir', 'rtl');
    await updateUser(${JSON.stringify(users['صورة محلية — متصل'])});
    target.scrollIntoView({block: 'center', inline: 'nearest'});
    triggerButton.click();
    await new Promise((resolve) => setTimeout(resolve, 720));
    const read = () => {
      const triggerRect = target
        .querySelector('.user-menu__trigger')
        .getBoundingClientRect();
      const surfaceRect = surface.getBoundingClientRect();
      return {
        placement: surface.dataset.overlayPlacement,
        triggerHeight: triggerRect.height,
        surfaceHeight: surfaceRect.height,
        gap: surface.dataset.overlayPlacement === 'top'
          ? triggerRect.top - surfaceRect.bottom
          : surfaceRect.top - triggerRect.bottom,
        overlap: !(
          surfaceRect.bottom <= triggerRect.top ||
          surfaceRect.top >= triggerRect.bottom ||
          surfaceRect.right <= triggerRect.left ||
          surfaceRect.left >= triggerRect.right
        ),
      };
    };
    const before = read();
    await updateUser(${JSON.stringify(users['اسم عربي طويل — غير متصل'])});
    await new Promise((resolve) => setTimeout(resolve, 720));
    const after = read();
    triggerButton.click();
    return {before, after};
  })()`,
);

await send('Emulation.clearDeviceMetricsOverride');
socket.close();

const report = {
  capturedAt: new Date().toISOString(),
  measurements,
  dynamicGeometry,
  diagnostics,
};
await writeFile(
  path.join(outputDirectory, 's1-final-popup-geometry.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify(report, null, 2));
