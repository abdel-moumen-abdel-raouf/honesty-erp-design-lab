import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const APP_TEMPLATE = 'src/app/app.html';
const APP_SOURCE = 'src/app/app.ts';
const OVERLAY_ROOT = 'src/app/shared/overlay/';
const OVERLAY_HOST = 'src/app/shared/overlay/overlay-host.ts';
const OVERLAY_STYLE = 'src/app/shared/overlay/overlay-host.scss';
const OVERLAY_FACETS =
  'src/app/shared/overlay/overlay-host-facets.scss';
const OVERLAY_LIFECYCLE =
  'src/app/shared/overlay/overlay-host-lifecycle.scss';
const OVERLAY_CONTRACTS =
  'src/app/shared/overlay/overlay-contracts.ts';
const OVERLAY_MANAGER = 'src/app/shared/overlay/overlay-manager.ts';
const OVERLAY_REF = 'src/app/shared/overlay/overlay-ref.ts';
const OVERLAY_FRAME_SOURCE =
  'src/app/shared/overlay/overlay-frame/overlay-frame.ts';
const OVERLAY_FRAME_TEMPLATE =
  'src/app/shared/overlay/overlay-frame/overlay-frame.html';
const TEMPORAL_PICKER_SOURCE =
  'src/app/controls/temporal-family/internal/temporal-picker-content.ts';
const TEMPORAL_PICKER_TEMPLATE =
  'src/app/controls/temporal-family/internal/temporal-picker-content.html';
const SELECTION_PICKER_SOURCE =
  'src/app/controls/selection-family/internal/selection-picker-content.ts';
const SELECTION_PICKER_TEMPLATE =
  'src/app/controls/selection-family/internal/selection-picker-content.html';
const TEMPORAL_CONTRACTS =
  'src/app/controls/temporal-family/temporal-contracts.ts';
const SELECTION_CONTRACTS =
  'src/app/controls/selection-family/selection-contracts.ts';
const SPLIT_BUTTON_SOURCE =
  'src/app/controls/split-button/split-button.ts';
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

export function validateSingleDocumentLabContract(files) {
  const errors = [];
  const source = files.get(APP_SOURCE) ?? '';
  const template = files.get(APP_TEMPLATE) ?? '';

  for (const required of [
    "export type LabTheme = 'light' | 'dark';",
    "const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';",
    "return rootDocument.getElementById('lab-capture-root');",
    'const target = resolveLabScreenshotTarget(document);',
    'link.download = buildScreenshotFilename(this.router.url, this.theme());',
  ]) {
    if (!source.includes(required)) {
      errors.push(`App shell: missing single-document Lab contract ${required}`);
    }
  }

  for (const required of [
    'id="lab-capture-root"',
    '[attr.data-theme]="theme()"',
    'id="btn-lab-theme"',
    'id="btn-full-page-screenshot"',
    'data-wave-a-theme-evidence',
    'data-wave-a-screenshot-evidence',
    'id="routed-review-content"',
    'id="app-router-outlet"',
  ]) {
    if (!template.includes(required)) {
      errors.push(`App template: missing single-document Lab contract ${required}`);
    }
  }

  if (occurrences(template, /<router-outlet\b/g) !== 1) {
    errors.push('App template: single-document Lab must render exactly one router-outlet');
  }

  const forbiddenSource = [
    'labPreview',
    'labTheme',
    'isEmbeddedPreview',
    'isDirectReview',
    'isDirectLabReviewRoute',
    'currentPreviewMode',
    'setPreviewMode',
    'previewSafeUrl',
    'contentDocument',
    'HTMLIFrameElement',
    'DomSanitizer',
    'SafeResourceUrl',
  ];

  for (const forbidden of forbiddenSource) {
    if (source.includes(forbidden)) {
      errors.push(`App shell: iframe-era Lab contract must remain removed: ${forbidden}`);
    }
  }

  for (const forbidden of [
    '<iframe',
    'lab-preview-frame',
    'lab-preview-stage',
    'lab-viewport-controls',
    'btn-preview-desktop',
    'btn-preview-tablet',
    'btn-preview-mobile',
  ]) {
    if (template.includes(forbidden)) {
      errors.push(`App template: iframe-era Lab contract must remain removed: ${forbidden}`);
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
  const motionAdapter = files.get(MOTION_ADAPTER) ?? '';
  const host = files.get(OVERLAY_HOST) ?? '';
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

  for (const required of [
    "data-overlay-phase='entering'",
    "data-overlay-phase='leaving'",
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
    'AnimateCssMotionAdapter',
    'ERP_OVERLAY_MOTION_DURATION_MS',
    'this.motion.start({',
    'preset: entry.animation',
    'ERP_OVERLAY_MOTION_DURATION_MS[phase]',
    'this.manager.completeTransition(entry.ref.id, entry.phase)',
  ]) {
    if (!host.includes(required)) {
      errors.push(`OverlayHost: missing motion-adapter integration ${required}`);
    }
  }

  for (const required of [
    'export const ERP_OVERLAY_MOTION_DURATION_MS',
    'enter: 360',
    'exit: 260',
    "window.matchMedia('(prefers-reduced-motion: reduce)')",
  ]) {
    if (!motionAdapter.includes(required)) {
      errors.push(`Motion adapter: missing Overlay contract ${required}`);
    }
  }

  for (const required of [
    '--honesty-overlay-backdrop-bg:',
    '--honesty-overlay-backdrop-blur:',
    '--honesty-overlay-layer:',
    '--honesty-overlay-enter-duration: 360ms;',
    '--honesty-overlay-exit-duration: 260ms;',
  ]) {
    if (!tokens.includes(required)) {
      errors.push(`Overlay tokens: missing corrected contract ${required}`);
    }
  }

  for (const forbidden of [
    '@mixin animation-',
    '--honesty-overlay-motion-',
    '--honesty-overlay-reduced-duration:',
    '@keyframes overlay-surface-',
  ]) {
    if (`${tokens}\n${hostStyle}\n${facets}\n${lifecycle}`.includes(forbidden)) {
      errors.push(`Overlay motion: obsolete surface contract remains ${forbidden}`);
    }
  }

  return errors;
}

export function validateOverlayFrameContract(files) {
  const errors = [];
  const contracts = files.get(OVERLAY_CONTRACTS) ?? '';
  const manager = files.get(OVERLAY_MANAGER) ?? '';
  const ref = files.get(OVERLAY_REF) ?? '';
  const frameSource = files.get(OVERLAY_FRAME_SOURCE) ?? '';
  const frameTemplate = files.get(OVERLAY_FRAME_TEMPLATE) ?? '';
  const temporalSource = files.get(TEMPORAL_PICKER_SOURCE) ?? '';
  const temporalTemplate = files.get(TEMPORAL_PICKER_TEMPLATE) ?? '';
  const selectionSource = files.get(SELECTION_PICKER_SOURCE) ?? '';
  const selectionTemplate = files.get(SELECTION_PICKER_TEMPLATE) ?? '';
  const temporalContracts = files.get(TEMPORAL_CONTRACTS) ?? '';
  const selectionContracts = files.get(SELECTION_CONTRACTS) ?? '';

  for (const required of [
    'export interface ErpOverlayHeaderConfig',
    'readonly title: string;',
    'readonly subtitle: string;',
    'readonly icon: ErpIconName;',
    'readonly closeLabel?: string;',
    'readonly id: string;',
    'readonly label: string;',
    'readonly presentation?: ErpOverlayActionPresentation;',
    'readonly role: ErpOverlayActionRole;',
    'readonly placement: ErpOverlayActionPlacement;',
    "export type ErpOverlayActionRole = 'primary' | 'secondary' | 'utility';",
    "export type ErpOverlayActionPlacement = 'start' | 'end';",
    "export type ErpOverlayActionPresentation = 'button' | 'icon-button';",
    'export interface ErpOverlayFrameActionState',
    'export interface ErpOverlayFooterConfig',
    'readonly actions: readonly ErpOverlayActionConfig[];',
    'readonly frame: ErpOverlayFrameConfig;',
    'export type ErpOverlayFrameActionId = string;',
  ]) {
    if (!contracts.includes(required)) {
      errors.push(`Overlay frame contracts: missing ${required}`);
    }
  }

  for (const required of [
    'options.frame.header.title.trim()',
    'options.frame.header.subtitle.trim()',
    "options.frame.header.closeLabel?.trim() || 'إغلاق'",
    'ERP_ICON_NAMES.includes(options.frame.header.icon)',
    'options.frame.footer.actions.map((action)',
    'id: action.id.trim()',
    'label: action.label.trim()',
    "action.presentation === 'icon-button'",
    "presentation: action.presentation ?? 'button'",
    'new Set(actions.map((action) => action.id)).size !== actions.length',
  ]) {
    if (!manager.includes(required)) {
      errors.push(`OverlayManager: missing frame validation ${required}`);
    }
  }

  for (const required of [
    'registerFrameAction(',
    'updateFrameActionState(',
    'frameActionStates',
    'requestFrameAction(',
    'const state = this.frameActionState()[action];',
    'if (disabled || loading)',
    "config?.role === 'secondary'",
    "this.dismiss('secondary-action')",
  ]) {
    if (!ref.includes(required)) {
      errors.push(`OverlayRef: missing frame action contract ${required}`);
    }
  }

  for (const required of [
    'ErpButton',
    'ErpIconButton',
    'ErpTooltip',
    "this.ref().dismiss('close-action')",
  ]) {
    if (!frameSource.includes(required)) {
      errors.push(`OverlayFrame: missing shared control contract ${required}`);
    }
  }

  for (const required of [
    '<header class="overlay-frame__header">',
    '<div class="overlay-frame__body">',
    '<footer class="overlay-frame__footer">',
    '<erp-tooltip',
    '<erp-icon-button',
    'data-overlay-frame-close',
    'data-overlay-frame-action',
    'data-overlay-frame-action-id',
    'data-overlay-frame-action-role',
    'data-overlay-frame-action-group="start"',
    'data-overlay-frame-action-group="end"',
    '@for (action of startActions(); track action.id)',
    '@for (action of endActions(); track action.id)',
    "action.presentation === 'icon-button'",
    '[text]="action.label"',
    `[icon]="action.icon ?? 'delete'"`,
  ]) {
    if (!frameTemplate.includes(required)) {
      errors.push(`OverlayFrame template: missing ${required}`);
    }
  }

  if ((frameTemplate.match(/<erp-button\b/g) ?? []).length !== 2) {
    errors.push('OverlayFrame must render its ordered actions through the two logical group templates');
  }

  for (const [name, source, template] of [
    ['Temporal picker', temporalSource, temporalTemplate],
    ['Selection picker', selectionSource, selectionTemplate],
  ]) {
    if (
      !source.includes("registerFrameAction('confirm'") ||
      !source.includes("registerFrameAction('cancel'")
    ) {
      errors.push(`${name}: shared frame action registration is required`);
    }

    if (
      template.includes('data-confirm-action') ||
      template.includes('data-cancel-action')
    ) {
      errors.push(`${name}: duplicate body confirm/cancel footer is forbidden`);
    }
  }

  for (const [name, source, id] of [
    ['Temporal picker', temporalContracts, 'clear'],
    ['Selection picker', selectionContracts, 'clear-selected'],
  ]) {
    for (const requirement of [
      `id: '${id}'`,
      "icon: 'delete' as const",
      "presentation: 'icon-button' as const",
    ]) {
      if (!source.includes(requirement)) {
        errors.push(
          `${name}: Clear must be a delete IconButton action with Tooltip presentation; missing ${requirement}`,
        );
      }
    }
  }

  const legacyUsers = [...files]
    .filter(([, source]) => source.includes('openLegacyCompactMenu'))
    .map(([file]) => file)
    .sort();
  const expectedLegacyUsers = [OVERLAY_MANAGER, SPLIT_BUTTON_SOURCE].sort();

  if (JSON.stringify(legacyUsers) !== JSON.stringify(expectedLegacyUsers)) {
    errors.push(
      'Legacy compact Overlay menu exception must remain isolated to SplitButton and OverlayManager',
    );
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
    !source.includes('ErpActionMenuContent') ||
    !source.includes('openLegacyCompactMenu')
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
      MOTION_ADAPTER,
      `export const ERP_OVERLAY_MOTION_DURATION_MS = {enter: 360, exit: 260};
window.matchMedia('(prefers-reduced-motion: reduce)');`,
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
    [OVERLAY_FACETS, 'data-overlay-blur data-overlay-backdrop-tone'],
    [
      OVERLAY_HOST,
      `AnimateCssMotionAdapter ERP_OVERLAY_MOTION_DURATION_MS
this.motion.start({ preset: entry.animation
ERP_OVERLAY_MOTION_DURATION_MS[phase]
this.manager.completeTransition(entry.ref.id, entry.phase)`,
    ],
    [
      OVERLAY_LIFECYCLE,
      "data-overlay-phase='entering' data-overlay-phase='leaving'",
    ],
    [
      OVERLAY_TOKENS,
      '--honesty-overlay-backdrop-bg: x; --honesty-overlay-backdrop-blur: x; --honesty-overlay-layer: x; --honesty-overlay-enter-duration: 360ms; --honesty-overlay-exit-duration: 260ms;',
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
return rootDocument.getElementById('lab-capture-root');
const target = resolveLabScreenshotTarget(document);
link.download = buildScreenshotFilename(this.router.url, this.theme());`,
    ],
    [
      APP_TEMPLATE,
      `<div id="lab-capture-root" [attr.data-theme]="theme()">
<button id="btn-lab-theme" data-wave-a-theme-evidence></button>
<button id="btn-full-page-screenshot" data-wave-a-screenshot-evidence></button>
<main id="routed-review-content">
<router-outlet id="app-router-outlet"></router-outlet>
</main>
<erp-overlay-host />
</div>`,
    ],
  ]);

  if (validateSingleDocumentLabContract(validLab).length > 0) {
    throw new Error(
      'Overlay governance rejected valid single-document Lab fixtures',
    );
  }

  const invalidIframeLab = new Map(validLab);
  invalidIframeLab.set(
    APP_TEMPLATE,
    `${invalidIframeLab.get(APP_TEMPLATE) ?? ''}<iframe id="lab-preview-frame"></iframe>`,
  );
  if (validateSingleDocumentLabContract(invalidIframeLab).length === 0) {
    throw new Error('Overlay governance accepted an iframe-era Lab template');
  }

  const invalidDualModeLab = new Map(validLab);
  invalidDualModeLab.set(
    APP_SOURCE,
    `${invalidDualModeLab.get(APP_SOURCE) ?? ''}
const labTheme = 'dark';
const currentPreviewMode = 'mobile';`,
  );
  if (validateSingleDocumentLabContract(invalidDualModeLab).length === 0) {
    throw new Error('Overlay governance accepted iframe-era Lab source state');
  }

  const invalidRouterLab = new Map(validLab);
  invalidRouterLab.set(
    APP_TEMPLATE,
    (invalidRouterLab.get(APP_TEMPLATE) ?? '').replace(
      '<router-outlet id="app-router-outlet"></router-outlet>',
      '',
    ),
  );
  if (validateSingleDocumentLabContract(invalidRouterLab).length === 0) {
    throw new Error('Overlay governance accepted a Lab without one direct router-outlet');
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
      'ErpOverlayManager ErpActionMenuContent openLegacyCompactMenu',
    ],
  ]);
  if (validateDeferredCompositeOverlay(validComposite).length > 0) {
    throw new Error('Overlay governance rejected valid SplitButton fixture');
  }

  const validFrame = new Map([
    [
      OVERLAY_CONTRACTS,
      `export interface ErpOverlayHeaderConfig {
readonly title: string;
readonly subtitle: string;
readonly icon: ErpIconName;
readonly closeLabel?: string;
}
export interface ErpOverlayActionConfig { readonly presentation?: ErpOverlayActionPresentation; }
export type ErpOverlayActionRole = 'primary' | 'secondary' | 'utility';
export type ErpOverlayActionPlacement = 'start' | 'end';
export type ErpOverlayActionPresentation = 'button' | 'icon-button';
export interface ErpOverlayFrameActionState {}
export interface ErpOverlayFooterConfig {
readonly actions: readonly ErpOverlayActionConfig[];
}
export interface ErpOverlayFrameConfig {}
export interface ErpOverlayOpenConfig { readonly frame: ErpOverlayFrameConfig; }
export type ErpOverlayFrameActionId = string;
readonly id: string;
readonly label: string;
readonly role: ErpOverlayActionRole;
readonly placement: ErpOverlayActionPlacement;`,
    ],
    [
      OVERLAY_MANAGER,
      `options.frame.header.title.trim()
options.frame.header.subtitle.trim()
options.frame.header.closeLabel?.trim() || 'إغلاق'
ERP_ICON_NAMES.includes(options.frame.header.icon)
options.frame.footer.actions.map((action)
id: action.id.trim()
label: action.label.trim()
action.presentation === 'icon-button'
presentation: action.presentation ?? 'button'
new Set(actions.map((action) => action.id)).size !== actions.length
openLegacyCompactMenu`,
    ],
    [
      OVERLAY_REF,
      `registerFrameAction(
updateFrameActionState(
frameActionStates
requestFrameAction(
const state = this.frameActionState()[action];
if (disabled || loading)
config?.role === 'secondary'
this.dismiss('secondary-action')`,
    ],
    [
      OVERLAY_FRAME_SOURCE,
      `ErpButton ErpIconButton ErpTooltip
this.ref().dismiss('close-action')`,
    ],
    [
      OVERLAY_FRAME_TEMPLATE,
      `<header class="overlay-frame__header">
<div class="overlay-frame__body">
<footer class="overlay-frame__footer">
<erp-tooltip><erp-icon-button data-overlay-frame-close />
<div data-overlay-frame-action-group="start">@for (action of startActions(); track action.id) {
@if (action.presentation === 'icon-button') { <erp-tooltip [text]="action.label"><erp-icon-button data-overlay-frame-action data-overlay-frame-action-id data-overlay-frame-action-role [icon]="action.icon ?? 'delete'" /></erp-tooltip> } @else {
<erp-button data-overlay-frame-action data-overlay-frame-action-id data-overlay-frame-action-role />}}
<div data-overlay-frame-action-group="end">@for (action of endActions(); track action.id) {
<erp-button data-overlay-frame-action data-overlay-frame-action-id data-overlay-frame-action-role />}`,
    ],
    [
      TEMPORAL_PICKER_SOURCE,
      "registerFrameAction('confirm') registerFrameAction('cancel')",
    ],
    [TEMPORAL_PICKER_TEMPLATE, '<erp-button data-clear-action />'],
    [
      SELECTION_PICKER_SOURCE,
      "registerFrameAction('confirm') registerFrameAction('cancel')",
    ],
    [SELECTION_PICKER_TEMPLATE, '<erp-selection-tile />'],
    [
      TEMPORAL_CONTRACTS,
      "id: 'clear' icon: 'delete' as const presentation: 'icon-button' as const",
    ],
    [
      SELECTION_CONTRACTS,
      "id: 'clear-selected' icon: 'delete' as const presentation: 'icon-button' as const",
    ],
    [SPLIT_BUTTON_SOURCE, 'openLegacyCompactMenu'],
  ]);

  if (validateOverlayFrameContract(validFrame).length > 0) {
    throw new Error('Overlay governance rejected valid frame fixtures');
  }

  for (const [index, fixture] of [
    new Map(validFrame).set(
      OVERLAY_CONTRACTS,
      (validFrame.get(OVERLAY_CONTRACTS) ?? '').replace(
        'readonly subtitle: string;',
        '',
      ),
    ),
    new Map(validFrame).set(
      TEMPORAL_PICKER_TEMPLATE,
      '<erp-button data-confirm-action />',
    ),
    new Map(validFrame).set(
      TEMPORAL_CONTRACTS,
      "id: 'clear' icon: 'delete' as const",
    ),
    new Map(validFrame).set(
      'src/app/controls/another-control/another-control.ts',
      'openLegacyCompactMenu',
    ),
  ].entries()) {
    if (validateOverlayFrameContract(fixture).length === 0) {
      throw new Error(
        `Overlay governance accepted invalid frame fixture ${index + 1}`,
      );
    }
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
errors.push(...validateSingleDocumentLabContract(files));
errors.push(...validateOverlayContractDrift(files));
errors.push(...validateOverlayFrameContract(files));
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
