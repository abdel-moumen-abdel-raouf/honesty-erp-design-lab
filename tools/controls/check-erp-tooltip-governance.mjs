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
const SEARCH_BOX_TEMPLATE =
  'src/app/controls/search-box/search-box.html';
const SHOWCASE = 'src/app/showcase/tooltip-controls/tooltip-controls.html';
const TOKEN_FILE = path.join(ROOT, 'src', 'styles', 'foundation', 'components', 'tooltip', '_tokens.scss');
const TOOLTIP_STYLE_FILES = [
  'tooltip.scss',
  'tooltip-motion-facets.scss',
  'tooltip-motion-slide-facets.scss',
  'tooltip-motion-advanced-facets.scss',
  'tooltip-motion.scss',
].map((file) => path.join(ROOT, 'src', 'app', 'controls', 'tooltip', file));
const EXPECTED_BASE_TOKENS = [
  '--honesty-tooltip-bg', '--honesty-tooltip-fg', '--honesty-tooltip-max-width',
  '--honesty-tooltip-min-width', '--honesty-tooltip-min-height',
  '--honesty-tooltip-padding-block', '--honesty-tooltip-padding-inline',
  '--honesty-tooltip-radius', '--honesty-tooltip-elevation',
  '--honesty-tooltip-layer', '--honesty-tooltip-anchor-gap',
  '--honesty-tooltip-viewport-inset', '--honesty-tooltip-arrow-bg',
  '--honesty-tooltip-arrow-width', '--honesty-tooltip-arrow-height',
  '--honesty-tooltip-arrow-safe-inset', '--honesty-tooltip-enter-duration',
  '--honesty-tooltip-exit-duration', '--honesty-tooltip-enter-easing',
  '--honesty-tooltip-exit-easing', '--honesty-tooltip-enter-opacity',
  '--honesty-tooltip-enter-transform',
  '--honesty-tooltip-enter-transform-overshoot',
  '--honesty-tooltip-exit-opacity', '--honesty-tooltip-exit-transform',
  '--honesty-tooltip-motion-slide-distance',
  '--honesty-tooltip-reduced-duration',
];
const EXPECTED_RICH_TOKENS = [
  '--honesty-tooltip-bg', '--honesty-tooltip-fg', '--honesty-tooltip-max-width',
  '--honesty-tooltip-min-width', '--honesty-tooltip-min-height',
  '--honesty-tooltip-padding-block', '--honesty-tooltip-padding-inline',
  '--honesty-tooltip-radius', '--honesty-tooltip-elevation',
];
const EXPECTED_SIDE_REMAPS = [
  ['--honesty-tooltip-arrow-width', '#{ref.$honesty-ref-space-8}'],
  ['--honesty-tooltip-arrow-height', '#{ref.$honesty-ref-space-4}'],
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
      normalized !== SEARCH_BOX_TEMPLATE
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

function validateSideCaretContract(tokenSource) {
  const errors = [];
  const side = tokenSource.match(/@mixin\s+placement-side\s*\{([\s\S]*?)\r?\n\s*\}/)?.[1] ?? '';

  if (JSON.stringify(remaps(side)) !== JSON.stringify(EXPECTED_SIDE_REMAPS)) {
    errors.push(
      'Tooltip side placement caret remap must remain exactly width=Reference space-8 and height=Reference space-4',
    );
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
    "import {ErpMotionPreset} from '../../foundation/motion/motion-contracts';",
    "readonly enterAnimation = input<ErpMotionPreset>('fade-scale');",
    "readonly exitAnimation = input<ErpMotionPreset>('fade');",
    "'[attr.data-tooltip-enter-animation]': 'enterAnimation()'",
    "'[attr.data-tooltip-exit-animation]': 'exitAnimation()'",
    'handleSurfaceAnimationEnd(event: AnimationEvent)',
    'scheduleReducedMotionCompletion(',
  ]) {
    if (!source.includes(required)) {
      errors.push(`Tooltip motion: missing shared contract ${required}`);
    }
  }

  if (!template.includes('(animationend)="handleSurfaceAnimationEnd($event)"')) {
    errors.push('Tooltip motion: exit completion must be animation-event driven');
  }

  for (const motion of EXPECTED_MOTIONS) {
    for (const phase of ['enter', 'exit']) {
      if (!style.includes(`data-tooltip-${phase}-animation='${motion}'`)) {
        errors.push(`Tooltip motion: missing ${phase} mapping for ${motion}`);
      }
    }
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
  errors.push(...validateSideCaretContract(tokenSource));
  if (!/@use\s+['"]\.\.\/\.\.\/reference\/spacing['"]\s+as\s+ref/.test(tokenSource)) errors.push('Tooltip tokens must import only Reference spacing');
  if (/\$honesty-ref-(?!space-)/.test(tokenSource)) errors.push('Tooltip tokens consume a forbidden Reference category');

  const style = TOOLTIP_STYLE_FILES.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  errors.push(
    ...validateTooltipMotionContract(
      files.get(TOOLTIP_SOURCE) ?? '',
      files.get(TOOLTIP_TEMPLATE) ?? '',
      files.get(MOTION_CONTRACTS) ?? '',
      style,
    ),
  );
  for (const match of style.matchAll(/var\(\s*(--honesty-[a-z0-9-]+)/g)) {
    if (!match[1].startsWith('--honesty-tooltip-')) errors.push(`Tooltip SCSS consumes foreign token "${match[1]}"`);
  }
  if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(style) || !/@keyframes\s+tooltip-surface-reduced[\s\S]*transform:\s*none/.test(style)) errors.push('Tooltip reduced-motion rule is missing transform removal');
  if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*animation-name:\s*tooltip-surface-reduced[\s\S]*animation-duration:\s*var\(--honesty-tooltip-reduced-duration\)/.test(style)) errors.push('Tooltip reduced-motion phases must use the reduced animation and duration');
  if (!/:host\(\[data-tooltip-interactive='true'\]\)\s+\.erp-tooltip__surface\[data-phase='open'\]\s*\{\s*pointer-events:\s*auto/.test(style)) errors.push('Interactive Tooltip pointer events must be enabled only in the open phase');
  if (!/@keyframes\s+tooltip-surface-enter/.test(style) || !/@keyframes\s+tooltip-surface-exit/.test(style) || /transition:\s*all/.test(style)) errors.push('Tooltip motion must use explicit enter and exit keyframes');
  if (!/:host-context\(\[dir='rtl'\]\)\[data-tooltip-enter-animation='slide-start'\][\s\S]*@include\s+tokens\.enter-slide-end/.test(style) || !/:host-context\(\[dir='rtl'\]\)\[data-tooltip-exit-animation='slide-start'\][\s\S]*@include\s+tokens\.exit-slide-end/.test(style)) errors.push('Tooltip logical slide-start motion must reverse in RTL');
  if (!/:host-context\(\[dir='rtl'\]\)\[data-tooltip-enter-animation='slide-end'\][\s\S]*@include\s+tokens\.enter-slide-start/.test(style) || !/:host-context\(\[dir='rtl'\]\)\[data-tooltip-exit-animation='slide-end'\][\s\S]*@include\s+tokens\.exit-slide-start/.test(style)) errors.push('Tooltip logical slide-end motion must reverse in RTL');

  const modules = walk(path.join(ROOT, 'src', 'styles', 'foundation', 'components')).filter((file) => path.basename(file) === '_tokens.scss');
  if (modules.length !== 46) errors.push(`Expected 46 concrete Component Token modules, found ${modules.length}`);
  if (fs.existsSync(path.join(ROOT, 'src', 'styles', 'foundation', 'components', 'tooltip-content'))) errors.push('ErpTooltipContent must not own a Component Token module');
  return errors;
}

function selfTest() {
  if (
    validate(
      new Map([[SEARCH_BOX_TEMPLATE, '<div popover="manual"></div>']]),
    ).length !== 0
  ) {
    throw new Error(
      'Tooltip checker rejected the approved SearchBox anchored popover',
    );
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
    const validSideCaret = `
  @mixin placement-side {
    --honesty-tooltip-arrow-width: #{ref.$honesty-ref-space-8};
    --honesty-tooltip-arrow-height: #{ref.$honesty-ref-space-4};
  }
  `;

  if (validateSideCaretContract(validSideCaret).length !== 0) {
    throw new Error('Tooltip checker rejected the valid side-caret contract');
  }

  const invalidSideCaret = `
  @mixin placement-side {
    --honesty-tooltip-arrow-width: #{ref.$honesty-ref-space-16};
    --honesty-tooltip-arrow-height: #{ref.$honesty-ref-space-8};
  }
  `;

  if (validateSideCaretContract(invalidSideCaret).length === 0) {
    throw new Error('Tooltip checker accepted an invalid side-caret contract');
  }

  const validMotionSource = `
import {ErpMotionPreset} from '../../foundation/motion/motion-contracts';
readonly enterAnimation = input<ErpMotionPreset>('fade-scale');
readonly exitAnimation = input<ErpMotionPreset>('fade');
'[attr.data-tooltip-enter-animation]': 'enterAnimation()'
'[attr.data-tooltip-exit-animation]': 'exitAnimation()'
handleSurfaceAnimationEnd(event: AnimationEvent)
scheduleReducedMotionCompletion(`;
  const validMotionCatalog = `export const ERP_MOTION_PRESETS = [${EXPECTED_MOTIONS.map((motion) => `'${motion}'`).join(', ')}] as const;`;
  const validMotionStyle = EXPECTED_MOTIONS.flatMap((motion) => [
    `data-tooltip-enter-animation='${motion}'`,
    `data-tooltip-exit-animation='${motion}'`,
  ]).join('\n');
  const validMotionTemplate =
    '<div (animationend)="handleSurfaceAnimationEnd($event)"></div>';

  if (
    validateTooltipMotionContract(
      validMotionSource,
      validMotionTemplate,
      validMotionCatalog,
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
      validMotionStyle,
    ).length === 0
  ) {
    throw new Error('Tooltip checker accepted a divergent motion catalog');
  }
  console.log('ErpTooltip governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
const files = new Map(walk(SOURCE_ROOT).filter((file) => /\.(?:ts|html)$/.test(file)).map((file) => [normalize(path.relative(ROOT, file)), fs.readFileSync(file, 'utf8')]));
const errors = validate(files);
errors.push(...validateProductionContracts(files));
if (errors.length) { console.error('ErpTooltip governance check failed:\n'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log('ErpTooltip governance check passed.');
