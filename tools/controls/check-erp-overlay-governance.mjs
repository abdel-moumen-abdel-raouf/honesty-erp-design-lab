import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const APP_TEMPLATE = 'src/app/app.html';
const APP_SOURCE = 'src/app/app.ts';
const OVERLAY_ROOT = 'src/app/shared/overlay/';
const OVERLAY_STYLE = 'src/app/shared/overlay/overlay-host.scss';
const OVERLAY_FACETS =
  'src/app/shared/overlay/overlay-host-facets.scss';
const OVERLAY_MOTION_FACETS =
  'src/app/shared/overlay/overlay-host-motion-facets.scss';
const OVERLAY_LIFECYCLE =
  'src/app/shared/overlay/overlay-host-lifecycle.scss';
const OVERLAY_CONTRACTS =
  'src/app/shared/overlay/overlay-contracts.ts';
const OVERLAY_MANAGER = 'src/app/shared/overlay/overlay-manager.ts';
const MOTION_CONTRACTS =
  'src/app/foundation/motion/motion-contracts.ts';
const MOTION_ADAPTER =
  'src/app/foundation/motion/animate-css-motion-adapter.ts';
const OVERLAY_TOKENS =
  'src/styles/foundation/components/overlay/_tokens.scss';
const ANIMATE_EFFECTS = [
  'fadeIn', 'fadeOut', 'zoomIn', 'zoomOut', 'slideInUp', 'slideOutDown',
  'slideInDown', 'slideOutUp', 'bounceIn', 'bounceOut', 'flipInX',
  'flipOutX', 'flipInY', 'flipOutY', 'fadeInUp', 'fadeOutDown',
  'fadeInDown', 'fadeOutUp', 'zoomInUp', 'zoomOutDown', 'zoomInDown',
  'zoomOutUp', 'backInUp', 'backOutDown', 'lightSpeedInRight',
  'lightSpeedOutRight', 'rotateIn', 'rotateOut', 'rollIn', 'rollOut',
  'fadeInLeft', 'fadeOutLeft', 'fadeInRight', 'fadeOutRight',
  'slideInLeft', 'slideOutLeft', 'slideInRight', 'slideOutRight',
];

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function occurrences(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

export function validate(files) {
  const errors = [];
  const appTemplate = files.get(APP_TEMPLATE) ?? '';
  const appSource = files.get(APP_SOURCE) ?? '';

  if (occurrences(appTemplate, /<erp-overlay-host\b/g) !== 1) {
    errors.push('App shell must render exactly one erp-overlay-host');
  }

  if (!/\bErpOverlayHost\b/.test(appSource)) {
    errors.push('App shell must import ErpOverlayHost');
  }

  for (const [file, source] of files) {
    const normalized = normalize(file);
    const spec = normalized.endsWith('.spec.ts');
    const overlayInternal = normalized.startsWith(OVERLAY_ROOT);
    const motionAdapter = normalized === MOTION_ADAPTER;
    const consumer =
      normalized.startsWith('src/app/showcase/') ||
      normalized.startsWith('src/app/features/') ||
      normalized.startsWith('src/app/pages/');

    if (
      normalized !== APP_TEMPLATE &&
      !spec &&
      /<erp-overlay-host\b/.test(source)
    ) {
      errors.push(`${normalized}: only the App shell may author OverlayHost`);
    }

    if (
      !overlayInternal &&
      normalized !== APP_SOURCE &&
      !spec &&
      /\bErpOverlayHost\b/.test(source)
    ) {
      errors.push(
        `${normalized}: OverlayHost infrastructure is App-shell-only`,
      );
    }

    if (!overlayInternal && !spec && /new\s+ErpOverlayRef\b/.test(source)) {
      errors.push(
        `${normalized}: ErpOverlayRef instances are manager-owned`,
      );
    }

    if (
      normalized !== OVERLAY_STYLE &&
      normalized !== OVERLAY_TOKENS &&
      !normalized.includes('/foundation/') &&
      !spec &&
      /--honesty-(?:layer-blocking|color-surface-scrim|effect-backdrop-blur-blocking)/.test(
        source,
      )
    ) {
      errors.push(
        `${normalized}: blocking backdrop/layer contracts are OverlayHost-owned`,
      );
    }

    if (/(?:@angular\/cdk|floating-ui|popper)/i.test(source)) {
      errors.push(`${normalized}: prohibited overlay dependency`);
    }

    if (!motionAdapter && !spec && /animate__[a-z0-9_-]+/i.test(source)) {
      errors.push(
        `${normalized}: Animate.css classes are motion-adapter-owned`,
      );
    }

    if (
      !motionAdapter &&
      !spec &&
      ANIMATE_EFFECTS.some((effect) =>
        new RegExp(`\\b${effect}\\b`).test(source),
      )
    ) {
      errors.push(
        `${normalized}: raw Animate.css effect names are motion-adapter-owned`,
      );
    }

    if (
      consumer &&
      !spec &&
      /(?:^|[;{]\s*)(?:-webkit-)?backdrop-filter\s*:/.test(source)
    ) {
      errors.push(
        `${normalized}: Feature/Page showcase code must not recreate backdrop effects`,
      );
    }

    if (consumer && !spec && /z-index\s*:\s*-?\d+/.test(source)) {
      errors.push(
        `${normalized}: Feature/Page showcase code must not create numeric overlay layers`,
      );
    }

    if (
      consumer &&
      !spec &&
      /position\s*:\s*fixed/.test(source) &&
      /inset\s*:\s*0/.test(source)
    ) {
      errors.push(
        `${normalized}: Feature/Page showcase code must not recreate a blocking backdrop`,
      );
    }

    if (
      consumer &&
      !spec &&
      /position\s*:\s*fixed/.test(source) &&
      /(?:background|background-color)\s*:\s*(?:#[0-9a-fA-F]{3,8}\b|(?:rgb|hsl)a?\s*\()/.test(
        source,
      )
    ) {
      errors.push(
        `${normalized}: Feature/Page showcase code must not recreate raw blocking backdrop colors`,
      );
    }
  }

  return errors;
}

export function validateWaveALabContract(files) {
  const errors = [];
  const source = files.get(APP_SOURCE) ?? '';
  const template = files.get(APP_TEMPLATE) ?? '';

  for (const required of [
    "export type LabTheme = 'light' | 'dark';",
    "const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';",
    "parameters.set('labTheme', theme);",
    "return route === '/controls/inputs' || route === '/controls/overlays';",
    'const [toolbarCanvas, embeddedCanvas] = await Promise.all([',
    'context.drawImage(toolbarCanvas, 0, 0);',
    'context.drawImage(embeddedCanvas, 0, toolbarCanvas.height);',
  ]) {
    if (!source.includes(required)) {
      errors.push(`App shell: missing Wave A Lab contract ${required}`);
    }
  }

  for (const required of [
    '[attr.data-theme]="theme()"',
    'id="btn-lab-theme"',
    'id="btn-full-page-screenshot"',
    'data-wave-a-theme-evidence',
    'data-wave-a-screenshot-evidence',
  ]) {
    if (!template.includes(required)) {
      errors.push(`App template: missing Wave A Lab contract ${required}`);
    }
  }

  return errors;
}

function stringUnion(source, typeName) {
  const body = source.match(
    new RegExp(`export type ${typeName}\\s*=([\\s\\S]*?);`),
  )?.[1] ?? '';
  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function stringConstArray(source, constName) {
  const body = source.match(
    new RegExp(`export const ${constName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`),
  )?.[1] ?? '';
  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

export function validateOverlayContractDrift(files) {
  const errors = [];
  const contracts = files.get(OVERLAY_CONTRACTS) ?? '';
  const manager = files.get(OVERLAY_MANAGER) ?? '';
  const motionContracts = files.get(MOTION_CONTRACTS) ?? '';
  const hostStyle = files.get(OVERLAY_STYLE) ?? '';
  const facets = files.get(OVERLAY_FACETS) ?? '';
  const motionFacets = files.get(OVERLAY_MOTION_FACETS) ?? '';
  const lifecycle = files.get(OVERLAY_LIFECYCLE) ?? '';
  const tokens = files.get(OVERLAY_TOKENS) ?? '';

  const exactUnions = new Map([
    ['ErpOverlayBlur', ['low', 'medium', 'high']],
    [
      'ErpOverlayBackdropTone',
      ['default', 'neutral', 'primary', 'secondary', 'accent'],
    ],
    ['ErpOverlayPhase', ['entering', 'open', 'leaving']],
  ]);

  for (const [typeName, expected] of exactUnions) {
    if (JSON.stringify(stringUnion(contracts, typeName)) !== JSON.stringify(expected)) {
      errors.push(`${typeName}: public union drifted from the correction contract`);
    }
  }

  const expectedMotions = [
    'fade',
    'scale',
    'fade-scale',
    'slide-up',
    'slide-down',
    'slide-start',
    'slide-end',
    'zoom',
    'pop',
    'flip-x',
    'flip-y',
    'bounce',
    'swing',
    'fade-up',
    'fade-down',
    'fade-start',
    'fade-end',
    'zoom-up',
    'zoom-down',
    'back',
    'light-speed',
    'rotate',
    'roll',
  ];

  if (
    JSON.stringify(stringConstArray(motionContracts, 'ERP_MOTION_PRESETS')) !==
    JSON.stringify(expectedMotions)
  ) {
    errors.push('ErpMotionPreset: shared catalog drifted from the correction contract');
  }

  if (!contracts.includes('export type ErpOverlayAnimation = ErpMotionPreset;')) {
    errors.push('ErpOverlayAnimation must alias the shared ErpMotionPreset');
  }

  for (const required of [
    "return ['fade-scale', 'fade-scale']",
    "return ['slide-start', 'slide-start']",
    "return ['slide-end', 'slide-end']",
    "return ['slide-up', 'slide-down']",
    "dismissOnEscape: options.dismissOnEscape ?? false",
    "dismissOnBackdrop: options.dismissOnBackdrop ?? false",
    "blur: options.blur ?? 'low'",
    "backdropTone: options.backdropTone ?? 'default'",
    "phase: 'entering'",
    "phase: 'open'",
    "phase: 'leaving'",
    'top?.ref.id === id',
  ]) {
    if (!manager.includes(required)) {
      errors.push(`OverlayManager: missing corrected contract ${required}`);
    }
  }

  for (const animation of expectedMotions.slice(0, 13).filter(
    (animation) => animation !== 'fade-scale',
  )) {
    if (!`${facets}\n${motionFacets}`.includes(`data-overlay-animation='${animation}'`)) {
      errors.push(`OverlayHost: missing ${animation} motion mapping`);
    }
  }

  for (const required of [
    "[dir='rtl'] erp-overlay-host",
    "data-overlay-phase='entering'",
    "data-overlay-phase='leaving'",
    'prefers-reduced-motion: reduce',
    "data-overlay-kind='drawer'][data-overlay-position='start']",
    "data-overlay-kind='drawer'][data-overlay-position='end']",
    "data-overlay-kind='drawer'][data-overlay-position='bottom']",
    'block-size: 100dvh',
    'inline-size: 100%',
  ]) {
    if (!`${hostStyle}\n${facets}\n${lifecycle}`.includes(required)) {
      errors.push(`OverlayHost: missing corrected geometry/motion contract ${required}`);
    }
  }

  for (const required of [
    '--honesty-overlay-backdrop-bg:',
    '--honesty-overlay-backdrop-blur:',
    '--honesty-overlay-layer:',
    '@mixin animation-fade-scale',
    '--honesty-overlay-reduced-duration:',
    '--honesty-overlay-enter-duration: 240ms;',
    '--honesty-overlay-exit-duration: 180ms;',
    '--honesty-overlay-motion-slide-distance: 1.5rem;',
  ]) {
    if (!tokens.includes(required)) {
      errors.push(`Overlay tokens: missing corrected contract ${required}`);
    }
  }

  return errors;
}

export function validateTemporalPickers(files) {
  const errors = [];
  for (const control of ['date-box', 'time-box', 'date-time-box', 'date-range-box']) {
    const file = `src/app/controls/${control}/${control}.ts`;
    const source = files.get(file) ?? '';
    if (!source.includes('ErpOverlayManager') || !source.includes('ErpTemporalPickerContent')) {
      errors.push(`${file}: temporal picker must use ErpOverlayManager and the shared staged surface`);
    }
  }
  return errors;
}

export function validateSelectionPickers(files) {
  const errors = [];
  for (const control of ['color-picker', 'icon-picker', 'item-picker', 'combo-box']) {
    const file = `src/app/controls/${control}/${control}.ts`;
    const source = files.get(file) ?? '';
    if (!source.includes('ErpOverlayManager') || !source.includes('ErpSelectionPickerContent')) {
      errors.push(`${file}: selection picker must use ErpOverlayManager and the shared staged surface`);
    }
  }
  return errors;
}

export function validateDeferredCompositeOverlay(files) {
  const errors = [];
  const file = 'src/app/controls/split-button/split-button.ts';
  const source = files.get(file) ?? '';

  if (
    !source.includes('ErpOverlayManager') ||
    !source.includes('ErpActionMenuContent')
  ) {
    errors.push(
      `${file}: SplitButton must use OverlayManager and its compact action menu`,
    );
  }

  if (/ErpTooltip|anchored-overlay/.test(source)) {
    errors.push(`${file}: SplitButton action menu must not use Tooltip`);
  }

  return errors;
}

function runSelfTest() {
  const valid = new Map([
    [APP_TEMPLATE, '<main></main><erp-overlay-host />'],
    [
      APP_SOURCE,
      "import {ErpOverlayHost} from './shared/overlay/overlay-host';",
    ],
    [
      OVERLAY_STYLE,
      'z-index: var(--honesty-overlay-layer);',
    ],
    [
      OVERLAY_TOKENS,
      '--honesty-overlay-layer: var(--honesty-layer-blocking);',
    ],
    [
      'src/app/controls/date-box/date-box.ts',
      'readonly overlays = inject(ErpOverlayManager);',
    ],
    [
      'src/app/controls/tooltip/tooltip.ts',
      'class ErpTooltip {}',
    ],
    [
      'src/app/controls/input-family/internal/field-feedback.ts',
      'class ErpFieldFeedback {}',
    ],
  ]);

  if (validate(valid).length > 0) {
    throw new Error('Overlay governance rejected valid fixtures');
  }

  const validDriftFiles = new Map([
    [
      OVERLAY_CONTRACTS,
      `export type ErpOverlayBlur = 'low' | 'medium' | 'high';
export type ErpOverlayBackdropTone = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent';
export type ErpOverlayAnimation = ErpMotionPreset;
export type ErpOverlayPhase = 'entering' | 'open' | 'leaving';`,
    ],
    [
      MOTION_CONTRACTS,
      `export const ERP_MOTION_PRESETS = ['fade', 'scale', 'fade-scale', 'slide-up', 'slide-down', 'slide-start', 'slide-end', 'zoom', 'pop', 'flip-x', 'flip-y', 'bounce', 'swing', 'fade-up', 'fade-down', 'fade-start', 'fade-end', 'zoom-up', 'zoom-down', 'back', 'light-speed', 'rotate', 'roll'] as const;`,
    ],
    [
      OVERLAY_MANAGER,
      `return ['fade-scale', 'fade-scale'];
return ['slide-start', 'slide-start'];
return ['slide-end', 'slide-end'];
return ['slide-up', 'slide-down'];
dismissOnEscape: options.dismissOnEscape ?? false;
dismissOnBackdrop: options.dismissOnBackdrop ?? false;
blur: options.blur ?? 'low';
backdropTone: options.backdropTone ?? 'default';
phase: 'entering'; phase: 'open'; phase: 'leaving'; top?.ref.id === id;`,
    ],
    [
      OVERLAY_STYLE,
      "data-overlay-kind='drawer'][data-overlay-position='start'] data-overlay-kind='drawer'][data-overlay-position='end'] data-overlay-kind='drawer'][data-overlay-position='bottom'] block-size: 100dvh; inline-size: 100%;",
    ],
    [
      OVERLAY_FACETS,
      "data-overlay-animation='fade' data-overlay-animation='scale' data-overlay-animation='slide-up' data-overlay-animation='slide-down' data-overlay-animation='slide-start' data-overlay-animation='slide-end' data-overlay-animation='zoom' data-overlay-animation='pop' data-overlay-animation='flip-x' data-overlay-animation='flip-y' data-overlay-animation='bounce' data-overlay-animation='swing' [dir='rtl'] erp-overlay-host",
    ],
    [
      OVERLAY_LIFECYCLE,
      "data-overlay-phase='entering' data-overlay-phase='leaving' prefers-reduced-motion: reduce",
    ],
    [
      OVERLAY_TOKENS,
      '--honesty-overlay-backdrop-bg: x; --honesty-overlay-backdrop-blur: x; --honesty-overlay-layer: x; @mixin animation-fade-scale {} --honesty-overlay-reduced-duration: x; --honesty-overlay-enter-duration: 240ms; --honesty-overlay-exit-duration: 180ms; --honesty-overlay-motion-slide-distance: 1.5rem;',
    ],
  ]);

  if (validateOverlayContractDrift(validDriftFiles).length > 0) {
    throw new Error('Overlay governance rejected valid drift fixtures');
  }

  for (const [index, fixture] of [
    new Map(validDriftFiles).set(
      OVERLAY_CONTRACTS,
      (validDriftFiles.get(OVERLAY_CONTRACTS) ?? '').replace(
        "'low' | 'medium' | 'high'",
        "'none' | 'low' | 'medium' | 'high'",
      ),
    ),
    new Map(validDriftFiles).set(
      OVERLAY_MANAGER,
      (validDriftFiles.get(OVERLAY_MANAGER) ?? '').replace(
        "blur: options.blur ?? 'low'",
        "blur: options.blur ?? 'medium'",
      ),
    ),
    new Map(validDriftFiles).set(
      OVERLAY_MANAGER,
      (validDriftFiles.get(OVERLAY_MANAGER) ?? '').replace(
        'dismissOnEscape: options.dismissOnEscape ?? false',
        'dismissOnEscape: options.dismissOnEscape ?? true',
      ),
    ),
    new Map(validDriftFiles).set(
      OVERLAY_MANAGER,
      (validDriftFiles.get(OVERLAY_MANAGER) ?? '').replace(
        'dismissOnBackdrop: options.dismissOnBackdrop ?? false',
        'dismissOnBackdrop: options.dismissOnBackdrop ?? true',
      ),
    ),
    new Map(validDriftFiles).set(
      MOTION_CONTRACTS,
      (validDriftFiles.get(MOTION_CONTRACTS) ?? '').replace(', \'swing\'', ''),
    ),
    new Map(validDriftFiles).set(OVERLAY_LIFECYCLE, ''),
  ].entries()) {
    if (validateOverlayContractDrift(fixture).length === 0) {
      throw new Error(
        `Overlay governance accepted drift fixture ${index + 1}`,
      );
    }
  }

  const validLab = new Map([
    [
      APP_SOURCE,
      `export type LabTheme = 'light' | 'dark';
const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';
parameters.set('labTheme', theme);
return route === '/controls/inputs' || route === '/controls/overlays';
const [toolbarCanvas, embeddedCanvas] = await Promise.all([
context.drawImage(toolbarCanvas, 0, 0);
context.drawImage(embeddedCanvas, 0, toolbarCanvas.height);`,
    ],
    [
      APP_TEMPLATE,
      `<div [attr.data-theme]="theme()">
<button id="btn-lab-theme" data-wave-a-theme-evidence></button>
<button id="btn-full-page-screenshot" data-wave-a-screenshot-evidence></button>
<erp-overlay-host />
</div>`,
    ],
  ]);

  if (validateWaveALabContract(validLab).length > 0) {
    throw new Error('Overlay governance rejected valid Wave A Lab fixtures');
  }

  const invalidLab = new Map(validLab);
  invalidLab.set(
    APP_SOURCE,
    (invalidLab.get(APP_SOURCE) ?? '').replace(
      " || route === '/controls/overlays'",
      '',
    ),
  );
  if (validateWaveALabContract(invalidLab).length === 0) {
    throw new Error('Overlay governance accepted an iframe Overlay route');
  }

  const validTemporal = new Map(
    ['date-box', 'time-box', 'date-time-box', 'date-range-box'].map((control) => [
      `src/app/controls/${control}/${control}.ts`,
      'ErpOverlayManager ErpTemporalPickerContent',
    ]),
  );
  if (validateTemporalPickers(validTemporal).length > 0) {
    throw new Error('Overlay governance rejected valid temporal picker fixtures');
  }
  validTemporal.set('src/app/controls/date-box/date-box.ts', 'native date');
  if (validateTemporalPickers(validTemporal).length === 0) {
    throw new Error('Overlay governance accepted a temporal picker bypass');
  }

  const validSelection = new Map(
    ['color-picker', 'icon-picker', 'item-picker', 'combo-box'].map((control) => [
      `src/app/controls/${control}/${control}.ts`,
      'ErpOverlayManager ErpSelectionPickerContent',
    ]),
  );
  if (validateSelectionPickers(validSelection).length > 0) {
    throw new Error('Overlay governance rejected valid selection picker fixtures');
  }
  validSelection.set('src/app/controls/icon-picker/icon-picker.ts', 'vendor icon popup');
  if (validateSelectionPickers(validSelection).length === 0) {
    throw new Error('Overlay governance accepted a selection picker bypass');
  }

  const validComposite = new Map([
    [
      'src/app/controls/split-button/split-button.ts',
      'ErpOverlayManager ErpActionMenuContent',
    ],
  ]);
  if (validateDeferredCompositeOverlay(validComposite).length > 0) {
    throw new Error('Overlay governance rejected valid SplitButton fixture');
  }
  validComposite.set(
    'src/app/controls/split-button/split-button.ts',
    'ErpTooltip anchored-overlay',
  );
  if (validateDeferredCompositeOverlay(validComposite).length === 0) {
    throw new Error('Overlay governance accepted a SplitButton Tooltip menu');
  }

  const invalidFixtures = [
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host /><erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      ['src/app/showcase/x.html', '<erp-overlay-host />'],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      ['src/app/showcase/x.ts', 'new ErpOverlayRef()'],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      ['src/app/showcase/x.ts', "const effect = 'animate__fadeIn';"],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      ['src/app/showcase/x.ts', "const effect = 'fadeIn';"],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      [
        'src/app/showcase/x.scss',
        'z-index: var(--honesty-layer-blocking);',
      ],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, "import {Overlay} from '@angular/cdk/overlay';"],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      [
        'src/app/showcase/x.scss',
        'backdrop-filter: blur(1rem);',
      ],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      ['src/app/showcase/x.scss', 'z-index: 9999;'],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      [
        'src/app/showcase/x.scss',
        'position: fixed; inset: 0;',
      ],
    ]),
    new Map([
      [APP_TEMPLATE, '<erp-overlay-host />'],
      [APP_SOURCE, 'ErpOverlayHost'],
      [
        'src/app/showcase/x.scss',
        'position: fixed; background: rgba(0, 0, 0, 0.5);',
      ],
    ]),
  ];

  for (const [index, fixture] of invalidFixtures.entries()) {
    if (validate(fixture).length === 0) {
      throw new Error(
        `Overlay governance accepted invalid fixture ${index + 1}`,
      );
    }
  }

  console.log('ErpOverlay governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map(
  walk(APP_ROOT)
    .filter((file) => /\.(?:ts|html|scss)$/.test(file))
    .map((file) => [
      normalize(path.relative(ROOT, file)),
      fs.readFileSync(file, 'utf8'),
    ]),
);

files.set(
  OVERLAY_TOKENS,
  fs.readFileSync(path.join(ROOT, OVERLAY_TOKENS), 'utf8'),
);

const errors = validate(files);
errors.push(...validateWaveALabContract(files));
errors.push(...validateOverlayContractDrift(files));
errors.push(...validateTemporalPickers(files));
errors.push(...validateSelectionPickers(files));
errors.push(...validateDeferredCompositeOverlay(files));

if (errors.length > 0) {
  console.error('ErpOverlay governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpOverlay governance check passed.');
