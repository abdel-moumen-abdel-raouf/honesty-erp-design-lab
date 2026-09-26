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
const OVERLAY_LIFECYCLE =
  'src/app/shared/overlay/overlay-host-lifecycle.scss';
const OVERLAY_CONTRACTS =
  'src/app/shared/overlay/overlay-contracts.ts';
const OVERLAY_MANAGER = 'src/app/shared/overlay/overlay-manager.ts';
const OVERLAY_TOKENS =
  'src/styles/foundation/components/overlay/_tokens.scss';

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

function stringUnion(source, typeName) {
  const body = source.match(
    new RegExp(`export type ${typeName}\\s*=([\\s\\S]*?);`),
  )?.[1] ?? '';
  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

export function validateOverlayContractDrift(files) {
  const errors = [];
  const contracts = files.get(OVERLAY_CONTRACTS) ?? '';
  const manager = files.get(OVERLAY_MANAGER) ?? '';
  const hostStyle = files.get(OVERLAY_STYLE) ?? '';
  const facets = files.get(OVERLAY_FACETS) ?? '';
  const lifecycle = files.get(OVERLAY_LIFECYCLE) ?? '';
  const tokens = files.get(OVERLAY_TOKENS) ?? '';

  const exactUnions = new Map([
    ['ErpOverlayBlur', ['low', 'medium', 'high']],
    [
      'ErpOverlayBackdropTone',
      ['default', 'neutral', 'primary', 'secondary', 'accent'],
    ],
    [
      'ErpOverlayAnimation',
      [
        'fade',
        'scale',
        'fade-scale',
        'slide-up',
        'slide-down',
        'slide-start',
        'slide-end',
      ],
    ],
    ['ErpOverlayPhase', ['entering', 'open', 'leaving']],
  ]);

  for (const [typeName, expected] of exactUnions) {
    if (JSON.stringify(stringUnion(contracts, typeName)) !== JSON.stringify(expected)) {
      errors.push(`${typeName}: public union drifted from the correction contract`);
    }
  }

  for (const required of [
    "return ['fade-scale', 'fade-scale']",
    "return ['slide-start', 'slide-start']",
    "return ['slide-end', 'slide-end']",
    "return ['slide-up', 'slide-down']",
    "dismissOnEscape: options.dismissOnEscape ?? true",
    "dismissOnBackdrop: options.dismissOnBackdrop ?? true",
    "blur: options.blur ?? 'medium'",
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

  for (const animation of [
    'fade',
    'scale',
    'slide-up',
    'slide-down',
    'slide-start',
    'slide-end',
  ]) {
    if (!facets.includes(`data-overlay-animation='${animation}'`)) {
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
export type ErpOverlayAnimation = 'fade' | 'scale' | 'fade-scale' | 'slide-up' | 'slide-down' | 'slide-start' | 'slide-end';
export type ErpOverlayPhase = 'entering' | 'open' | 'leaving';`,
    ],
    [
      OVERLAY_MANAGER,
      `return ['fade-scale', 'fade-scale'];
return ['slide-start', 'slide-start'];
return ['slide-end', 'slide-end'];
return ['slide-up', 'slide-down'];
dismissOnEscape: options.dismissOnEscape ?? true;
dismissOnBackdrop: options.dismissOnBackdrop ?? true;
blur: options.blur ?? 'medium';
backdropTone: options.backdropTone ?? 'default';
phase: 'entering'; phase: 'open'; phase: 'leaving'; top?.ref.id === id;`,
    ],
    [
      OVERLAY_STYLE,
      "data-overlay-kind='drawer'][data-overlay-position='start'] data-overlay-kind='drawer'][data-overlay-position='end'] data-overlay-kind='drawer'][data-overlay-position='bottom'] block-size: 100dvh; inline-size: 100%;",
    ],
    [
      OVERLAY_FACETS,
      "data-overlay-animation='fade' data-overlay-animation='scale' data-overlay-animation='slide-up' data-overlay-animation='slide-down' data-overlay-animation='slide-start' data-overlay-animation='slide-end' [dir='rtl'] erp-overlay-host",
    ],
    [
      OVERLAY_LIFECYCLE,
      "data-overlay-phase='entering' data-overlay-phase='leaving' prefers-reduced-motion: reduce",
    ],
    [
      OVERLAY_TOKENS,
      '--honesty-overlay-backdrop-bg: x; --honesty-overlay-backdrop-blur: x; --honesty-overlay-layer: x; @mixin animation-fade-scale {} --honesty-overlay-reduced-duration: x;',
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
        "blur: options.blur ?? 'medium'",
        "blur: options.blur ?? 'low'",
      ),
    ),
    new Map(validDriftFiles).set(OVERLAY_LIFECYCLE, ''),
  ].entries()) {
    if (validateOverlayContractDrift(fixture).length === 0) {
      throw new Error(
        `Overlay governance accepted drift fixture ${index + 1}`,
      );
    }
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
