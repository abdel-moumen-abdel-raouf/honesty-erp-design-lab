import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ANGULAR_CONFIG = 'angular.json';
const SOURCE = 'src/app/controls/empty-state/empty-state.ts';
const TEMPLATE = 'src/app/controls/empty-state/empty-state.html';
const LOTTIE_SOURCE =
  'src/app/controls/empty-state/empty-state-lottie.ts';
const LOTTIE_STYLE =
  'src/app/controls/empty-state/empty-state-lottie.scss';
const TOKENS = 'src/styles/foundation/components/empty-state/_tokens.scss';
const SHOWCASE =
  'src/app/showcase/empty-state-controls/empty-state-controls.html';
const ROUTES = 'src/app/app.routes.ts';
const CONTRACT =
  'src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md';
const STYLE_FILES = [
  'src/app/controls/empty-state/empty-state.scss',
  'src/app/controls/empty-state/empty-state-content.scss',
  'src/app/controls/empty-state/empty-state-motion-entry.scss',
  'src/app/controls/empty-state/empty-state-motion-reduced.scss',
  LOTTIE_STYLE,
];
const MOTION_KEYFRAME_LOCALITY = new Map([
  [
    'src/app/controls/empty-state/empty-state-motion-entry.scss',
    ['honesty-empty-state-entrance-spring'],
  ],
  [LOTTIE_STYLE, ['honesty-empty-state-lottie-pulse']],
]);
const LOTTIE_ASSETS = new Map([
  ['no-data', 'public/lottie/empty-state/no-data.json'],
  ['no-search', 'public/lottie/empty-state/no-search.json'],
  ['error', 'public/lottie/empty-state/error.json'],
  ['forbidden', 'public/lottie/empty-state/forbidden.json'],
  ['custom', 'public/lottie/empty-state/custom.json'],
]);
const REFERENCE_SHA =
  '935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048';

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasLocalAnimationReference(source, keyframe) {
  return new RegExp(
    `animation(?:-name)?\\s*:\\s*[^;{}]*\\b${escapeRegExp(keyframe)}\\b`,
    's',
  ).test(source);
}

function validateMotionKeyframeLocality(files) {
  const errors = [];

  for (const [file, keyframes] of MOTION_KEYFRAME_LOCALITY) {
    const source = files.get(file) ?? '';

    for (const keyframe of keyframes) {
      if (!source.includes(`@keyframes ${keyframe}`)) {
        errors.push(
          `${file}: must define local @keyframes ${keyframe} beside its animation rules`,
        );
      }

      if (!hasLocalAnimationReference(source, keyframe)) {
        errors.push(
          `${file}: ${keyframe} must be referenced by animation in the same stylesheet`,
        );
      }
    }
  }

  return errors;
}

function findShapeBounds(shapes, bounds = []) {
  for (const shape of shapes ?? []) {
    if (
      shape.ty === 'rc' &&
      shape.s?.a === 0 &&
      Array.isArray(shape.s.k)
    ) {
      bounds.push({width: shape.s.k[0], height: shape.s.k[1]});
    }

    const vertices = shape.ty === 'sh' ? shape.ks?.k?.v : null;
    if (Array.isArray(vertices) && vertices.length > 0) {
      const xs = vertices.map((vertex) => vertex[0]);
      const ys = vertices.map((vertex) => vertex[1]);
      bounds.push({
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
      });
    }

    findShapeBounds(shape.it, bounds);
  }

  return bounds;
}

function validateLottieAsset(file, source) {
  const errors = [];
  let data;

  try {
    data = JSON.parse(source);
  } catch {
    return [`${file}: must contain valid Lottie JSON`];
  }

  for (const [name, value] of [
    ['width', data.w],
    ['height', data.h],
    ['frame rate', data.fr],
  ]) {
    if (!Number.isFinite(value) || value <= 0) {
      errors.push(`${file}: composition ${name} must be a positive number`);
    }
  }

  if (!Number.isFinite(data.ip) || !Number.isFinite(data.op) || data.op <= data.ip) {
    errors.push(`${file}: composition in/out frames must define a positive range`);
  }

  if (!Array.isArray(data.layers) || data.layers.length === 0) {
    errors.push(`${file}: composition must contain artwork layers`);
    return errors;
  }

  for (const asset of data.assets ?? []) {
    if (
      typeof asset.p === 'string' &&
      asset.p.length > 0 &&
      !asset.p.startsWith('data:')
    ) {
      errors.push(`${file}: external asset reference ${asset.p} is forbidden`);
    }
  }

  for (const layer of data.layers) {
    if (
      layer.ty === 1 &&
      layer.sw >= data.w * 0.95 &&
      layer.sh >= data.h * 0.95
    ) {
      errors.push(`${file}: full-canvas solid background layer ${layer.nm ?? layer.ind} is forbidden`);
    }

    if (/\b(?:background|bg|fondo|fundo)\b/i.test(layer.nm ?? '')) {
      const fullCanvasShape = findShapeBounds(layer.shapes).some(
        (bounds) =>
          bounds.width >= data.w * 0.95 &&
          bounds.height >= data.h * 0.95,
      );

      if (fullCanvasShape) {
        errors.push(`${file}: full-canvas vector background layer ${layer.nm} is forbidden`);
      }
    }
  }

  return errors;
}

export function validateEmptyStateContracts(files) {
  const errors = [];
  const source = files.get(SOURCE) ?? '';
  const angularConfig = files.get(ANGULAR_CONFIG) ?? '';
  const template = files.get(TEMPLATE) ?? '';
  const lottieSource = files.get(LOTTIE_SOURCE) ?? '';
  const lottieStyle = files.get(LOTTIE_STYLE) ?? '';
  const tokens = files.get(TOKENS) ?? '';
  const showcase = files.get(SHOWCASE) ?? '';
  const routes = files.get(ROUTES) ?? '';
  const contract = files.get(CONTRACT) ?? '';
  const styles = STYLE_FILES.map((file) => files.get(file) ?? '').join('\n');

  errors.push(...validateMotionKeyframeLocality(files));

  for (const required of [
    'export type ErpEmptyStateVariant =',
    "'no-data'",
    "'no-search'",
    "'error'",
    "'forbidden'",
    "'custom'",
    "export type ErpEmptyStateIllustrationMotion = 'float' | 'pulse' | 'none'",
    'export type ErpEmptyStateMotionSpeed = 0.5 | 1 | 1.5',
    'export const ERP_EMPTY_STATE_LOTTIE_ASSETS',
    "'no-data': '/lottie/empty-state/no-data.json'",
    "'no-search': '/lottie/empty-state/no-search.json'",
    "error: '/lottie/empty-state/error.json'",
    "forbidden: '/lottie/empty-state/forbidden.json'",
    "custom: '/lottie/empty-state/custom.json'",
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
    'this.defaultIllustration()?.replay()',
    "role: 'status'",
    "'aria-live': 'polite'",
  ]) {
    if (!source.includes(required)) {
      errors.push(`ErpEmptyState source is missing ${required}`);
    }
  }

  for (const forbidden of [
    'readonly theme =',
    'readonly direction =',
    "'[attr.data-theme]'",
    "'[attr.dir]'",
    "'./empty-state-illustrations.scss'",
    "'./empty-state-motion-float.scss'",
    "'./empty-state-motion-search.scss'",
    "'./empty-state-motion-status.scss'",
  ]) {
    if (source.includes(forbidden)) {
      errors.push(`ErpEmptyState contains obsolete or forbidden source ${forbidden}`);
    }
  }

  for (const required of [
    '<erp-empty-state-lottie',
    '<erp-button',
    '<erp-text',
    'erpEmptyStateIllustration',
    'erpEmptyStateExtra',
    'data-empty-state-action="primary"',
    'data-empty-state-action="secondary"',
    'data-empty-state-action="tertiary"',
  ]) {
    if (!template.includes(required)) {
      errors.push(`ErpEmptyState template is missing ${required}`);
    }
  }

  if (/<svg\b/i.test(template)) {
    errors.push('ErpEmptyState template must not retain default raw SVG illustrations.');
  }

  if (/<button\b/i.test(template)) {
    errors.push('ErpEmptyState must use ErpButton rather than raw native buttons.');
  }

  if (template.includes('data-theme') || template.includes('[attr.dir]')) {
    errors.push('ErpEmptyState template must not own theme or direction.');
  }

  for (const required of [
    "const LOTTIE_WEB_SCRIPT = 'vendor/lottie-web/lottie_svg.min.js'",
    "document.createElement('script')",
    "renderer: 'svg'",
    'loop: true',
    'autoplay: false',
    "preserveAspectRatio: 'xMidYMid meet'",
    'animation.setSpeed(speed)',
    'animation.goToAndStop(0, true)',
    'this.animation.goToAndPlay(0, true)',
    'animation.destroy()',
    "matchMedia('(prefers-reduced-motion: reduce)')",
    "addEventListener('change'",
    "removeEventListener('change'",
  ]) {
    if (!lottieSource.includes(required)) {
      errors.push(`EmptyState Lottie runtime is missing ${required}`);
    }
  }

  for (const required of [
    'node_modules/lottie-web/build/player',
    'lottie_svg.min.js',
    'vendor/lottie-web',
  ]) {
    if (!angularConfig.includes(required)) {
      errors.push(`Angular asset pipeline is missing ${required}`);
    }
  }

  const authoredSources = [source, template, lottieSource, showcase].join('\n');
  if (/[A-Za-z]:[\\/]/.test(authoredSources) || /Downloads[\\/]/i.test(authoredSources)) {
    errors.push('EmptyState source must not contain an absolute local or Downloads asset path.');
  }

  if (/\bbackground(?:-color)?\s*:/i.test(lottieStyle)) {
    errors.push('EmptyState Lottie styling must not add a CSS background.');
  }

  for (const [variant, assetFile] of LOTTIE_ASSETS) {
    const assetSource = files.get(assetFile);
    if (assetSource === undefined) {
      errors.push(`ErpEmptyState ${variant} Lottie asset is missing: ${assetFile}`);
      continue;
    }

    errors.push(...validateLottieAsset(assetFile, assetSource));
  }

  for (const required of [
    '--honesty-empty-state-text-primary: var(--honesty-color-text-primary)',
    '--honesty-empty-state-text-secondary: var(--honesty-color-text-secondary)',
    '--honesty-empty-state-link: var(--honesty-color-brand-primary-content)',
  ]) {
    if (!tokens.includes(required)) {
      errors.push(`ErpEmptyState tokens are missing semantic mapping ${required}`);
    }
  }

  const productionVisualSource = [template, tokens, styles].join('\n');
  if (/#[0-9a-fA-F]{3,8}\b/.test(productionVisualSource)) {
    errors.push('ErpEmptyState production CSS/template visuals must not contain raw hexadecimal colors.');
  }

  if (/\b(?:rgb|rgba|hsl|hsla)\s*\(/i.test(productionVisualSource)) {
    errors.push('ErpEmptyState production CSS/template visuals must not contain raw rgb/hsl colors.');
  }

  if (productionVisualSource.includes('linear-gradient(')) {
    errors.push('ErpEmptyState production visuals must not introduce reference gradients.');
  }

  for (const required of [
    'honesty-empty-state-entrance-spring',
    'honesty-empty-state-lottie-pulse',
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

  for (const required of [
    REFERENCE_SHA,
    'no-data.json',
    'no-search.json',
    'error.json',
    'forbidden.json',
    'custom.json',
    'asset-owned',
  ]) {
    if (!contract.includes(required)) {
      errors.push(`EmptyState contract is missing ${required}`);
    }
  }

  return errors;
}

function createValidFixture() {
  const files = new Map([
    [
      ANGULAR_CONFIG,
      'node_modules/lottie-web/build/player lottie_svg.min.js vendor/lottie-web',
    ],
    [
      SOURCE,
      "export type ErpEmptyStateVariant = 'no-data' | 'no-search' | 'error' | 'forbidden' | 'custom'; export type ErpEmptyStateIllustrationMotion = 'float' | 'pulse' | 'none'; export type ErpEmptyStateMotionSpeed = 0.5 | 1 | 1.5; export const ERP_EMPTY_STATE_LOTTIE_ASSETS = {'no-data': '/lottie/empty-state/no-data.json', 'no-search': '/lottie/empty-state/no-search.json', error: '/lottie/empty-state/error.json', forbidden: '/lottie/empty-state/forbidden.json', custom: '/lottie/empty-state/custom.json'}; readonly showIllustration = input<boolean | null>; readonly showTitle = input(true); readonly showDescription = input(true); readonly showActions = input(true); readonly showExtra = input<boolean | null>; readonly showPrimaryAction = input<boolean | null>; readonly showSecondaryAction = input<boolean | null>; readonly showTertiaryAction = input<boolean | null>; readonly primaryAction = output<void>(); readonly secondaryAction = output<void>(); readonly tertiaryAction = output<void>(); replayEntrance(): void { this.defaultIllustration()?.replay(); } role: 'status'; 'aria-live': 'polite';",
    ],
    [
      TEMPLATE,
      '<erp-empty-state-lottie></erp-empty-state-lottie><erp-button data-empty-state-action="primary"></erp-button><erp-button data-empty-state-action="secondary"></erp-button><erp-button data-empty-state-action="tertiary"></erp-button><erp-text></erp-text> erpEmptyStateIllustration erpEmptyStateExtra',
    ],
    [
      LOTTIE_SOURCE,
      "const LOTTIE_WEB_SCRIPT = 'vendor/lottie-web/lottie_svg.min.js'; document.createElement('script'); renderer: 'svg'; loop: true; autoplay: false; preserveAspectRatio: 'xMidYMid meet'; animation.setSpeed(speed); animation.goToAndStop(0, true); this.animation.goToAndPlay(0, true); animation.destroy(); matchMedia('(prefers-reduced-motion: reduce)'); addEventListener('change'); removeEventListener('change');",
    ],
    [
      TOKENS,
      '--honesty-empty-state-text-primary: var(--honesty-color-text-primary); --honesty-empty-state-text-secondary: var(--honesty-color-text-secondary); --honesty-empty-state-link: var(--honesty-color-brand-primary-content);',
    ],
    [
      SHOWCASE,
      "data-empty-state-interactive-preview data-empty-state-scenario-matrix applyScenario('no-data') applyScenario('no-search') applyScenario('error') applyScenario('forbidden') applyScenario('custom') Illustration Motion Motion Speed Direction Evidence",
    ],
    [ROUTES, "path: 'controls/empty-states'"],
    [
      CONTRACT,
      `${REFERENCE_SHA} no-data.json no-search.json error.json forbidden.json custom.json asset-owned`,
    ],
    [
      'src/app/controls/empty-state/empty-state-motion-entry.scss',
      '@keyframes honesty-empty-state-entrance-spring { to { opacity: 1; } } .entry { animation:\n honesty-empty-state-entrance-spring\n 1s; }',
    ],
    [
      LOTTIE_STYLE,
      '@keyframes honesty-empty-state-lottie-pulse { to { opacity: 1; } } .pulse { animation:\n honesty-empty-state-lottie-pulse\n 1s; }',
    ],
    [
      'src/app/controls/empty-state/empty-state-motion-reduced.scss',
      '@media (prefers-reduced-motion: reduce) { .x { animation: none; } }',
    ],
    ['src/app/controls/empty-state/empty-state.scss', ''],
    ['src/app/controls/empty-state/empty-state-content.scss', ''],
  ]);
  const asset = JSON.stringify({
    v: '5.7.0',
    w: 100,
    h: 100,
    fr: 30,
    ip: 0,
    op: 30,
    layers: [{ty: 4, nm: 'Artwork', shapes: []}],
    assets: [],
  });

  for (const assetFile of LOTTIE_ASSETS.values()) {
    files.set(assetFile, asset);
  }

  return files;
}

function assertRejected(files, label) {
  if (validateEmptyStateContracts(files).length === 0) {
    throw new Error(`EmptyState governance accepted invalid fixture: ${label}`);
  }
}

function runSelfTest() {
  const valid = createValidFixture();
  const validErrors = validateEmptyStateContracts(valid);
  if (validErrors.length > 0) {
    throw new Error(
      `EmptyState governance rejected its valid self-test fixture:\n${validErrors.join('\n')}`,
    );
  }

  const missingMapping = new Map(valid);
  missingMapping.set(
    SOURCE,
    valid.get(SOURCE).replace("custom: '/lottie/empty-state/custom.json'", ''),
  );
  assertRejected(missingMapping, 'missing asset mapping');

  const localPath = new Map(valid);
  localPath.set(
    LOTTIE_SOURCE,
    `${valid.get(LOTTIE_SOURCE)} C:\\Users\\Owner\\Downloads\\asset.json`,
  );
  assertRejected(localPath, 'absolute Downloads path');

  const missingDestroy = new Map(valid);
  missingDestroy.set(
    LOTTIE_SOURCE,
    valid.get(LOTTIE_SOURCE).replace('animation.destroy()', 'animation.stop()'),
  );
  assertRejected(missingDestroy, 'missing destroy lifecycle');

  const missingReducedMotion = new Map(valid);
  missingReducedMotion.set(
    LOTTIE_SOURCE,
    valid
      .get(LOTTIE_SOURCE)
      .replace("matchMedia('(prefers-reduced-motion: reduce)')", ''),
  );
  assertRejected(missingReducedMotion, 'missing reduced-motion runtime handling');

  const missingSpeed = new Map(valid);
  missingSpeed.set(
    LOTTIE_SOURCE,
    valid.get(LOTTIE_SOURCE).replace('animation.setSpeed(speed)', ''),
  );
  assertRejected(missingSpeed, 'missing Lottie speed handling');

  const backgroundAsset = new Map(valid);
  backgroundAsset.set(
    'public/lottie/empty-state/custom.json',
    JSON.stringify({
      v: '5.7.0',
      w: 100,
      h: 100,
      fr: 30,
      ip: 0,
      op: 30,
      layers: [
        {
          ty: 1,
          nm: 'Background',
          sw: 100,
          sh: 100,
        },
      ],
      assets: [],
    }),
  );
  assertRejected(backgroundAsset, 'full-canvas background layer');

  console.log('ErpEmptyState governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map([
  [ANGULAR_CONFIG, read(ANGULAR_CONFIG)],
  [SOURCE, read(SOURCE)],
  [TEMPLATE, read(TEMPLATE)],
  [LOTTIE_SOURCE, read(LOTTIE_SOURCE)],
  [TOKENS, read(TOKENS)],
  [SHOWCASE, read(SHOWCASE)],
  [ROUTES, read(ROUTES)],
  [CONTRACT, read(CONTRACT)],
  ...STYLE_FILES.map((file) => [file, read(file)]),
  ...[...LOTTIE_ASSETS.values()].map((file) => [file, read(file)]),
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
