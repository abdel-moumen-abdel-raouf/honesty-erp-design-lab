import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const APP_TEMPLATE = 'src/app/app.html';
const APP_SOURCE = 'src/app/app.ts';
const OVERLAY_ROOT = 'src/app/shared/overlay/';
const OVERLAY_STYLE = 'src/app/shared/overlay/overlay-host.scss';
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
errors.push(...validateTemporalPickers(files));
errors.push(...validateSelectionPickers(files));

if (errors.length > 0) {
  console.error('ErpOverlay governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpOverlay governance check passed.');
