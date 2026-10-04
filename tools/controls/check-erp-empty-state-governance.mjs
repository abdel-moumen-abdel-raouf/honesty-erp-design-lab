import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SOURCE = 'src/app/controls/empty-state/empty-state.ts';
const TEMPLATE = 'src/app/controls/empty-state/empty-state.html';
const TOKENS = 'src/styles/foundation/components/empty-state/_tokens.scss';
const SHOWCASE = 'src/app/showcase/empty-state-controls/empty-state-controls.html';
const ROUTES = 'src/app/app.routes.ts';
const CONTRACT =
  'src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md';
const STYLE_FILES = [
  'src/app/controls/empty-state/empty-state.scss',
  'src/app/controls/empty-state/empty-state-illustrations.scss',
  'src/app/controls/empty-state/empty-state-facets.scss',
  'src/app/controls/empty-state/empty-state-motion-keyframes.scss',
  'src/app/controls/empty-state/empty-state-motion-entry.scss',
  'src/app/controls/empty-state/empty-state-motion-continuous.scss',
  'src/app/controls/empty-state/empty-state-motion-reduced.scss',
];

const REFERENCE_SHA =
  '935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048';

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

export function validateEmptyStateContracts(files) {
  const errors = [];
  const source = files.get(SOURCE) ?? '';
  const template = files.get(TEMPLATE) ?? '';
  const tokens = files.get(TOKENS) ?? '';
  const showcase = files.get(SHOWCASE) ?? '';
  const routes = files.get(ROUTES) ?? '';
  const contract = files.get(CONTRACT) ?? '';
  const styles = STYLE_FILES.map((file) => files.get(file) ?? '').join('\n');

  for (const required of [
    "export type ErpEmptyStateVariant =",
    "'no-data'",
    "'no-search'",
    "'error'",
    "'forbidden'",
    "'custom'",
    "export type ErpEmptyStateIllustrationMotion = 'float' | 'pulse' | 'none'",
    'export type ErpEmptyStateMotionSpeed = 0.5 | 1 | 1.5',
    'readonly showIllustration = input<boolean | null>',
    'readonly showTitle = input(true',
    'readonly showDescription = input(true',
    'readonly showActions = input(true',
    'readonly showExtra = input<boolean | null>',
    'readonly showPrimaryAction = input<boolean | null>',
    'readonly showSecondaryAction = input<boolean | null>',
    'readonly showTertiaryAction = input<boolean | null>',
    'readonly primaryAction = output<void>()',
    'readonly secondaryAction = output<void>()',
    'readonly tertiaryAction = output<void>()',
    'replayEntrance(): void',
    "role: 'status'",
    "'aria-live': 'polite'",
  ]) {
    if (!source.includes(required)) {
      errors.push(`ErpEmptyState source is missing ${required}`);
    }
  }

  for (const forbidden of [
    "readonly theme =",
    "readonly direction =",
    "'[attr.data-theme]'",
    "'[attr.dir]'",
  ]) {
    if (source.includes(forbidden)) {
      errors.push(`ErpEmptyState must inherit App theme/direction; found ${forbidden}`);
    }
  }

  for (const required of [
    '<erp-button',
    '<erp-text',
    'erpEmptyStateIllustration',
    'erpEmptyStateExtra',
    "data-empty-state-action="primary"",
    "data-empty-state-action="secondary"",
    "data-empty-state-action="tertiary"",
    "class="es-anim-search-scan"",
    "class="es-anim-danger-halo"",
    "class="es-anim-warning-halo"",
    'class="es-fill-secondary-accent',
  ]) {
    if (!template.includes(required)) {
      errors.push(`ErpEmptyState template is missing ${required}`);
    }
  }

  if (/<button\b/i.test(template)) {
    errors.push('ErpEmptyState must use ErpButton rather than raw native buttons.');
  }

  if (template.includes('data-theme') || template.includes('[attr.dir]')) {
    errors.push('ErpEmptyState template must not own theme or direction.');
  }

  for (const required of [
    '--honesty-empty-state-text-primary: var(--honesty-color-text-primary)',
    '--honesty-empty-state-text-secondary: var(--honesty-color-text-secondary)',
    '--honesty-empty-state-accent: var(--honesty-color-brand-primary-solid)',
    'var(--honesty-color-feedback-danger-surface-strong)',
    'var(--honesty-color-feedback-warning-surface-strong)',
    'var(--honesty-color-feedback-success-surface-strong)',
  ]) {
    if (!tokens.includes(required)) {
      errors.push(`ErpEmptyState tokens are missing semantic mapping ${required}`);
    }
  }

  const productionVisualSource = [template, tokens, styles].join('\n');

  if (/#[0-9a-fA-F]{3,8}\b/.test(productionVisualSource)) {
    errors.push('ErpEmptyState production visuals must not contain raw hexadecimal colors.');
  }

  if (/\b(?:rgb|rgba|hsl|hsla)\s*\(/i.test(productionVisualSource)) {
    errors.push('ErpEmptyState production visuals must not contain raw rgb/hsl colors.');
  }

  if (productionVisualSource.includes('linear-gradient(')) {
    errors.push('ErpEmptyState production visuals must not introduce reference gradients.');
  }

  for (const required of [
    'honesty-empty-state-entrance-spring',
    'honesty-empty-state-float-main',
    'honesty-empty-state-search-scan',
    'honesty-empty-state-radar',
    'honesty-empty-state-danger-halo',
    'honesty-empty-state-alert-shake',
    'prefers-reduced-motion: reduce',
  ]) {
    if (!styles.includes(required)) {
      errors.push(`ErpEmptyState motion contract is missing ${required}`);
    }
  }

  for (const required of [
    'data-empty-state-interactive-preview',
    'data-empty-state-scenario-matrix',
    "applyScenario('no-data')",
    "applyScenario('no-search')",
    "applyScenario('error')",
    "applyScenario('forbidden')",
    "applyScenario('custom')",
    'Illustration Motion',
    'Motion Speed',
    'Direction Evidence',
  ]) {
    if (!showcase.includes(required)) {
      errors.push(`EmptyState showcase is missing ${required}`);
    }
  }

  if (!routes.includes("path: 'controls/empty-states'")) {
    errors.push('EmptyState dedicated review route is missing.');
  }

  if (!contract.includes(REFERENCE_SHA)) {
    errors.push('EmptyState reference SHA is missing from the binding contract.');
  }

  return errors;
}

function runSelfTest() {
  const valid = new Map([
    [
      SOURCE,
      "export type ErpEmptyStateVariant = 'no-data' | 'no-search' | 'error' | 'forbidden' | 'custom'; export type ErpEmptyStateIllustrationMotion = 'float' | 'pulse' | 'none'; export type ErpEmptyStateMotionSpeed = 0.5 | 1 | 1.5; readonly showIllustration = input<boolean | null>; readonly showTitle = input(true); readonly showDescription = input(true); readonly showActions = input(true); readonly showExtra = input<boolean | null>; readonly showPrimaryAction = input<boolean | null>; readonly showSecondaryAction = input<boolean | null>; readonly showTertiaryAction = input<boolean | null>; readonly primaryAction = output<void>(); readonly secondaryAction = output<void>(); readonly tertiaryAction = output<void>(); replayEntrance(): void {} role: 'status'; 'aria-live': 'polite';",
    ],
    [
      TEMPLATE,
      '<erp-button data-empty-state-action="primary"></erp-button><erp-button data-empty-state-action="secondary"></erp-button><erp-button data-empty-state-action="tertiary"></erp-button><erp-text></erp-text> erpEmptyStateIllustration erpEmptyStateExtra class="es-anim-search-scan" class="es-anim-danger-halo" class="es-anim-warning-halo" class="es-fill-secondary-accent"',
    ],
    [
      TOKENS,
      '--honesty-empty-state-text-primary: var(--honesty-color-text-primary); --honesty-empty-state-text-secondary: var(--honesty-color-text-secondary); --honesty-empty-state-accent: var(--honesty-color-brand-primary-solid); var(--honesty-color-feedback-danger-surface-strong); var(--honesty-color-feedback-warning-surface-strong); var(--honesty-color-feedback-success-surface-strong);',
    ],
    [
      SHOWCASE,
      "data-empty-state-interactive-preview data-empty-state-scenario-matrix applyScenario('no-data') applyScenario('no-search') applyScenario('error') applyScenario('forbidden') applyScenario('custom') Illustration Motion Motion Speed Direction Evidence",
    ],
    [ROUTES, "path: 'controls/empty-states'"],
    [CONTRACT, REFERENCE_SHA],
  ]);

  for (const style of STYLE_FILES) {
    valid.set(
      style,
      'honesty-empty-state-entrance-spring honesty-empty-state-float-main honesty-empty-state-search-scan honesty-empty-state-radar honesty-empty-state-danger-halo honesty-empty-state-alert-shake prefers-reduced-motion: reduce',
    );
  }

  if (validateEmptyStateContracts(valid).length > 0) {
    throw new Error('EmptyState governance rejected its valid self-test fixture.');
  }

  const invalid = new Map(valid);
  invalid.set(
    TOKENS,
    `${valid.get(TOKENS)} --bad-reference-color: #2563eb;`,
  );

  if (validateEmptyStateContracts(invalid).length === 0) {
    throw new Error('EmptyState governance accepted a raw reference color.');
  }

  console.log('ErpEmptyState governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map([
  [SOURCE, read(SOURCE)],
  [TEMPLATE, read(TEMPLATE)],
  [TOKENS, read(TOKENS)],
  [SHOWCASE, read(SHOWCASE)],
  [ROUTES, read(ROUTES)],
  [CONTRACT, read(CONTRACT)],
  ...STYLE_FILES.map((file) => [file, read(file)]),
]);

const errors = validateEmptyStateContracts(files);

if (errors.length > 0) {
  console.error('ErpEmptyState governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpEmptyState governance check passed.');
