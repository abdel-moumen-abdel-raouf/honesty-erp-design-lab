import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, 'src', 'app');
const CONTROLLER = 'src/app/shared/anchored-overlay/anchored-overlay-controller.ts';
const TOOLTIP_ROOT = 'src/app/controls/tooltip/';
const TOOLTIP_SOURCE = 'src/app/controls/tooltip/tooltip.ts';
const TOOLTIP_TEMPLATE = 'src/app/controls/tooltip/tooltip.html';
const SEARCH_BOX_SOURCE = 'src/app/controls/search-box/search-box.ts';
const MOTION_CONTRACTS =
  'src/app/foundation/motion/motion-contracts.ts';
const MOTION_ADAPTER =
  'src/app/foundation/motion/animate-css-motion-adapter.ts';
const SEARCH_BOX_TEMPLATE =
  'src/app/controls/search-box/search-box.html';
const SELECT_TEMPLATE = 'src/app/controls/select/select.html';
const SPLIT_BUTTON_TEMPLATE =
  'src/app/controls/split-button/split-button.html';
const FAB_MENU_TEMPLATE =
  'src/app/controls/fab-menu/fab-menu.html';
const APPROVED_MANUAL_POPOVER_TEMPLATES = new Set([
  SEARCH_BOX_TEMPLATE,
  SELECT_TEMPLATE,
  SPLIT_BUTTON_TEMPLATE,
  FAB_MENU_TEMPLATE,
]);
const SHOWCASE = 'src/app/showcase/tooltip-controls/tooltip-controls.html';
const TOKEN_FILE = path.join(ROOT, 'src', 'styles', 'foundation', 'components', 'tooltip', '_tokens.scss');
const TOOLTIP_STYLE_FILES = [
  'tooltip.scss',
].map((file) => path.join(ROOT, 'src', 'app', 'controls', 'tooltip', file));
const EXPECTED_BASE_TOKENS = [
  '--honesty-tooltip-bg', '--honesty-tooltip-fg', '--honesty-tooltip-max-width',
  '--honesty-tooltip-min-width', '--honesty-tooltip-min-height',
  '--honesty-tooltip-padding-block', '--honesty-tooltip-padding-inline',
  '--honesty-tooltip-radius', '--honesty-tooltip-elevation',
  '--honesty-tooltip-layer', '--honesty-tooltip-anchor-gap',
  '--honesty-tooltip-viewport-inset', '--honesty-tooltip-arrow-bg',
  '--honesty-tooltip-arrow-width', '--honesty-tooltip-arrow-height',
  '--honesty-tooltip-arrow-safe-inset',
];
const EXPECTED_RICH_TOKENS = [
  '--honesty-tooltip-bg', '--honesty-tooltip-fg', '--honesty-tooltip-max-width',
  '--honesty-tooltip-min-width', '--honesty-tooltip-min-height',
  '--honesty-tooltip-padding-block', '--honesty-tooltip-padding-inline',
  '--honesty-tooltip-radius', '--honesty-tooltip-elevation',
];
const EXPECTED_CANONICAL_ARROW = [
  ['--honesty-tooltip-arrow-width', '#{ref.$honesty-ref-space-16}'],
  ['--honesty-tooltip-arrow-height', '#{ref.$honesty-ref-space-8}'],
];
const EXPECTED_MOTIONS = [
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

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
const normalize = (value) => value.replaceAll('\\', '/');

export function validate(files) {
  const errors = [];
  for (const [name, source] of files) {
    const normalized = normalize(name);
    if (/(?:showPopover|hidePopover)\s*\(/.test(source) && normalized !== CONTROLLER && !normalized.endsWith('.spec.ts')) {
      errors.push(`${normalized}: native popover methods are controller-owned`);
    }
    if (
      /\bpopover\s*=/.test(source) &&
      !normalized.startsWith(TOOLTIP_ROOT) &&
      !APPROVED_MANUAL_POPOVER_TEMPLATES.has(normalized)
    ) {
      errors.push(
        `${normalized}: manual popover markup is limited to approved anchored-overlay owners`,
      );
    }
    if (/<erp-tooltip-content\b/.test(source) && !/<erp-tooltip[\s>][\s\S]*<erp-tooltip-content\b/.test(source)) {
      errors.push(`${normalized}: erp-tooltip-content must be nested in erp-tooltip`);
    }
    if (normalized === SHOWCASE && /<(?:div|section|header|footer|main|aside|nav|p|span|h[1-6]|button|a|hr)\b/i.test(source)) {
      errors.push(`${normalized}: forbidden raw visible HTML element`);
    }
    if (normalized.startsWith(TOOLTIP_ROOT) && /readonly\s+(?:delay|duration|gap|offset|inset|width|height|radius|elevation|layer)\s*=\s*input/.test(source)) {
      errors.push(`${normalized}: prohibited public timing/geometry styling API`);
    }
    if (
      !normalized.endsWith('.spec.ts') &&
      (normalized.startsWith(TOOLTIP_ROOT) || normalized === SEARCH_BOX_SOURCE) &&
      /readonly\s+(?:motionClass|animationClass|enterClass|exitClass)\s*=\s*input/.test(
        source,
      )
    ) {
      errors.push(
        `${normalized}: arbitrary CSS-class motion inputs are forbidden`,
      );
    }
    if (/(?:@angular\/cdk|floating-ui|popper)/i.test(source)) {
      errors.push(`${normalized}: prohibited overlay/CDK dependency`);
    }
  }
  return errors;
}

function declarations(body) {
  return [...body.matchAll(/(--honesty-tooltip-[a-z0-9-]+)\s*:/g)].map((match) => match[1]);
}

function remaps(body) {
  return [...body.matchAll(/(--honesty-tooltip-[a-z0-9-]+)\s*:\s*([^;]+);/g)]
    .map((match) => [match[1], match[2].trim()]);
}

function validateCanonicalCaretContract(tokenSource) {
  const errors = [];
  const base = tokenSource.match(/@mixin\s+base\s*\{([\s\S]*?)\r?\n\s*\}/)?.[1] ?? '';
  const baseRemaps = new Map(remaps(base));

  for (const [name, expected] of EXPECTED_CANONICAL_ARROW) {
    if (baseRemaps.get(name) !== expected) {
      errors.push(`Tooltip canonical arrow token ${name} must remain ${expected}`);
    }
  }

  if (/@mixin\s+placement-side\b/.test(tokenSource)) {
    errors.push('Tooltip side placements must rotate canonical arrow geometry, not remap its size');
  }

  return errors;
}

function stringConstArray(source, constName) {
  const body = source.match(
    new RegExp(`export const ${constName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`),
  )?.[1] ?? '';
  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

export function validateTooltipMotionContract(
  source,
  template,
  motionSource,
  adapterSource,
  style,
) {
  const errors = [];

  if (
    JSON.stringify(stringConstArray(motionSource, 'ERP_MOTION_PRESETS')) !==
    JSON.stringify(EXPECTED_MOTIONS)
  ) {
    errors.push('Tooltip motion must use the exact shared ErpMotionPreset catalog');
  }

  for (const required of [
    'AnimateCssMotionAdapter',
    'ERP_TOOLTIP_MOTION_DURATION_MS',
    "import {ErpMotionPreset} from '../../foundation/motion/motion-contracts';",
    "readonly enterAnimation = input<ErpMotionPreset>('zoom');",
    "readonly exitAnimation = input<ErpMotionPreset>('zoom');",
    "'[attr.data-tooltip-enter-animation]': 'enterAnimation()'",
    "'[attr.data-tooltip-exit-animation]': 'exitAnimation()'",
    'this.motion.start({',
    'durationMs: ERP_TOOLTIP_MOTION_DURATION_MS[phase]',
    "if (phase === 'enter') this.completeEnter(surface)",
    'else this.finalizeClose(surface)',
  ]) {
    if (!source.includes(required)) {
      errors.push(`Tooltip motion: missing shared contract ${required}`);
    }
  }

  if (template.includes('(animationend)=')) {
    errors.push('Tooltip motion: vendor lifecycle must remain adapter-owned');
  }

  if (!template.includes('class="erp-tooltip__motion"')) {
    errors.push('Tooltip motion: missing stable outer-surface inner motion layer');
  }

  for (const required of [
    'export const ERP_TOOLTIP_MOTION_DURATION_MS',
    'enter: 320',
    'exit: 220',
    "window.matchMedia('(prefers-reduced-motion: reduce)')",
  ]) {
    if (!adapterSource.includes(required)) {
      errors.push(`Tooltip motion adapter: missing ${required}`);
    }
  }

  if (
    /@keyframes\s+tooltip-surface-|data-tooltip-(?:enter|exit)-animation/.test(
      style,
    )
  ) {
    errors.push('Tooltip motion: obsolete component-authored motion CSS remains');
  }

  return errors;
}

function validateProductionContracts(files) {
  const errors = [];
  const tokenSource = fs.readFileSync(TOKEN_FILE, 'utf8');
  const base = tokenSource.match(/@mixin\s+base\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const rich = tokenSource.match(/@mixin\s+variant-rich\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  if (JSON.stringify(declarations(base)) !== JSON.stringify(EXPECTED_BASE_TOKENS)) errors.push('Tooltip base token slots do not match the exact V1 contract');
  if (JSON.stringify(declarations(rich)) !== JSON.stringify(EXPECTED_RICH_TOKENS)) errors.push('Tooltip rich facet remaps do not match the exact V1 contract');
  errors.push(...validateCanonicalCaretContract(tokenSource));
  if (!/@use\s+['"]\.\.\/\.\.\/reference\/spacing['"]\s+as\s+ref/.test(tokenSource)) errors.push('Tooltip tokens must import only Reference spacing');
  if (/\$honesty-ref-(?!space-)/.test(tokenSource)) errors.push('Tooltip tokens consume a forbidden Reference category');

  const style = TOOLTIP_STYLE_FILES.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  errors.push(
    ...validateTooltipMotionContract(
      files.get(TOOLTIP_SOURCE) ?? '',
      files.get(TOOLTIP_TEMPLATE) ?? '',
      files.get(MOTION_CONTRACTS) ?? '',
      files.get(MOTION_ADAPTER) ?? '',
      style,
    ),
  );
  for (const match of style.matchAll(/var\(\s*(--honesty-[a-z0-9-]+)/g)) {
    if (!match[1].startsWith('--honesty-tooltip-')) errors.push(`Tooltip SCSS consumes foreign token "${match[1]}"`);
  }
  if (!/:host\(\[data-tooltip-interactive='true'\]\)\s+\.erp-tooltip__surface\[data-phase='open'\]\s*\{\s*pointer-events:\s*auto/.test(style)) errors.push('Interactive Tooltip pointer events must be enabled only in the open phase');
  if (!tokenSource.includes('--honesty-tooltip-layer: var(--honesty-layer-overlay);')) errors.push('Tooltip layer must resolve to the semantic overlay layer');
  if (!style.includes('z-index: var(--honesty-tooltip-layer);')) errors.push('Tooltip surface must consume the Tooltip layer token');
  if (!/\.erp-tooltip__surface\s*\{[\s\S]*?\bpadding\s*:\s*0\s*;/.test(style)) {
    errors.push('Tooltip geometry surface must have zero padding so arrow coordinates and the motion assembly share one origin');
  }
  const templateSource = files.get(TOOLTIP_TEMPLATE) ?? '';
  const motionStart = templateSource.indexOf('<span #motionLayer class="erp-tooltip__motion">');
  const arrowStart = templateSource.indexOf('<span #arrow class="erp-tooltip__arrow" aria-hidden="true"></span>');
  if (motionStart < 0) errors.push('Tooltip visual motion assembly is missing');
  if (arrowStart < motionStart) errors.push('Tooltip arrow must live inside the visual motion assembly');
  if (/transition:\s*all/.test(style)) errors.push('Tooltip must not use transition: all');
  if (/(?:@mixin\s+(?:enter|exit)-|--honesty-tooltip-(?:enter|exit|motion|reduced)-)/.test(tokenSource)) errors.push('Tooltip tokens must not recreate adapter-owned motion');

  // The Component Token framework checker owns repository-wide token-module
  // inventory/count validation. Tooltip governance must only validate Tooltip
  // ownership boundaries so adding an unrelated component cannot break this gate.
  if (fs.existsSync(path.join(ROOT, 'src', 'styles', 'foundation', 'components', 'tooltip-content'))) errors.push('ErpTooltipContent must not own a Component Token module');
  return errors;
}

function selfTest() {
  for (const [template, label] of [
    [SEARCH_BOX_TEMPLATE, 'SearchBox'],
    [SPLIT_BUTTON_TEMPLATE, 'SplitButton'],
    [FAB_MENU_TEMPLATE, 'FabMenu'],
  ]) {
    if (
      validate(
        new Map([[template, '<div popover="manual"></div>']]),
      ).length !== 0
    ) {
      throw new Error(
        `Tooltip checker rejected the approved ${label} anchored popover`,
      );
    }
  }

  const fixtures = [
    new Map([['src/app/x.ts', 'element.showPopover();']]),
    new Map([['src/app/x.html', '<span popover="manual"></span>']]),
    new Map([['src/app/x.html', '<erp-tooltip-content />']]),
    new Map([[SHOWCASE, '<div></div>']]),
    new Map([[`${TOOLTIP_ROOT}tooltip.ts`, 'readonly delay = input(2);']]),
    new Map([[TOOLTIP_SOURCE, "readonly animationClass = input('fade');"]]),
    new Map([[SEARCH_BOX_SOURCE, "readonly motionClass = input('slide');"]]),
    new Map([['src/app/x.ts', "import '@angular/cdk/overlay';"]]),
  ];
  for (const [index, fixture] of fixtures.entries()) {
    if (validate(fixture).length === 0) throw new Error(`Tooltip checker accepted invalid fixture ${index + 1}`);
  }
  const validCanonicalCaret = `
  @mixin base {
    --honesty-tooltip-arrow-width: #{ref.$honesty-ref-space-16};
    --honesty-tooltip-arrow-height: #{ref.$honesty-ref-space-8};
  }
  `;

  if (validateCanonicalCaretContract(validCanonicalCaret).length !== 0) {
    throw new Error('Tooltip checker rejected the valid canonical-caret contract');
  }

  const invalidDirectionalCaret = `
  @mixin base {
    --honesty-tooltip-arrow-width: #{ref.$honesty-ref-space-16};
    --honesty-tooltip-arrow-height: #{ref.$honesty-ref-space-8};
  }
  @mixin placement-side {
    --honesty-tooltip-arrow-width: #{ref.$honesty-ref-space-8};
  }
  `;

  if (validateCanonicalCaretContract(invalidDirectionalCaret).length === 0) {
    throw new Error('Tooltip checker accepted a directional caret-size remap');
  }
  const validMotionSource = `
AnimateCssMotionAdapter ERP_TOOLTIP_MOTION_DURATION_MS
import {ErpMotionPreset} from '../../foundation/motion/motion-contracts';
readonly enterAnimation = input<ErpMotionPreset>('zoom');
readonly exitAnimation = input<ErpMotionPreset>('zoom');
'[attr.data-tooltip-enter-animation]': 'enterAnimation()'
'[attr.data-tooltip-exit-animation]': 'exitAnimation()'
this.motion.start({
durationMs: ERP_TOOLTIP_MOTION_DURATION_MS[phase]
if (phase === 'enter') this.completeEnter(surface)
else this.finalizeClose(surface)`;
  const validMotionCatalog = `export const ERP_MOTION_PRESETS = [${EXPECTED_MOTIONS.map((motion) => `'${motion}'`).join(', ')}] as const;`;
  const validMotionAdapter = `
export const ERP_TOOLTIP_MOTION_DURATION_MS = {enter: 320, exit: 220};
window.matchMedia('(prefers-reduced-motion: reduce)');`;
  const validMotionStyle = '.erp-tooltip__surface { opacity: 1; }';
  const validMotionTemplate = '<div class="erp-tooltip__motion"></div>';

  if (
    validateTooltipMotionContract(
      validMotionSource,
      validMotionTemplate,
      validMotionCatalog,
      validMotionAdapter,
      validMotionStyle,
    ).length > 0
  ) {
    throw new Error('Tooltip checker rejected valid shared-motion fixtures');
  }

  if (
    validateTooltipMotionContract(
      validMotionSource,
      validMotionTemplate,
      validMotionCatalog.replace(', \'swing\'', ''),
      validMotionAdapter,
      validMotionStyle,
    ).length === 0
  ) {
    throw new Error('Tooltip checker accepted a divergent motion catalog');
  }

  if (
    validateTooltipMotionContract(
      validMotionSource,
      validMotionTemplate,
      validMotionCatalog,
      validMotionAdapter.replace('enter: 320', 'enter: 100'),
      validMotionStyle,
    ).length === 0
  ) {
    throw new Error('Tooltip checker accepted divergent adapter timing');
  }
  console.log('ErpTooltip governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
const files = new Map(walk(SOURCE_ROOT).filter((file) => /\.(?:ts|html)$/.test(file)).map((file) => [normalize(path.relative(ROOT, file)), fs.readFileSync(file, 'utf8')]));
const errors = validate(files);
errors.push(...validateProductionContracts(files));
if (errors.length) { console.error('ErpTooltip governance check failed:\n'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log('ErpTooltip governance check passed.');
