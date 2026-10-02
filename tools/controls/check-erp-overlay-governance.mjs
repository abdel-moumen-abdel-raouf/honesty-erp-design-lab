import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const APP_TEMPLATE = 'src/app/app.html';
const APP_SOURCE = 'src/app/app.ts';
const OVERLAY_ROOT = 'src/app/shared/overlay/';
const OVERLAY_HOST = 'src/app/shared/overlay/overlay-host.ts';
const OVERLAY_HOST_TEMPLATE = 'src/app/shared/overlay/overlay-host.html';
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
const OVERLAY_FRAME_STYLE =
  'src/app/shared/overlay/overlay-frame/overlay-frame.scss';
const OVERLAY_FRAME_FACETS =
  'src/app/shared/overlay/overlay-frame/overlay-frame-facets.scss';
const OVERLAY_SHOWCASE_SOURCE =
  'src/app/showcase/overlay-controls/overlay-controls.ts';
const OVERLAY_SHOWCASE_TEMPLATE =
  'src/app/showcase/overlay-controls/overlay-controls.html';
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
const FAB_MENU_SOURCE =
  'src/app/controls/fab-menu/fab-menu.ts';
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
    ['ErpOverlayPosition', ['center', 'start', 'end', 'top', 'bottom']],
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
    "return ['flip-x', 'flip-x']",
    "return ['slide-start', 'slide-start']",
    "return ['slide-end', 'slide-end']",
    "return ['slide-down', 'slide-up']",
    "return ['slide-up', 'slide-down']",
    "dismissOnEscape: options.dismissOnEscape ?? false",
    "dismissOnBackdrop: options.dismissOnBackdrop ?? false",
    "blur: options.blur ?? 'medium'",
    "backdropTone: options.backdropTone ?? 'primary'",
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
    "data-overlay-kind='drawer'][data-overlay-position='top']",
    "data-overlay-kind='drawer'][data-overlay-position='bottom']",
    "data-overlay-blur='low'",
    "data-overlay-blur='medium'",
    "data-overlay-blur='high'",
    "data-overlay-backdrop-tone='default'",
    "data-overlay-backdrop-tone='neutral'",
    "data-overlay-backdrop-tone='primary'",
    "data-overlay-backdrop-tone='secondary'",
    "data-overlay-backdrop-tone='accent'",
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
    'var(--honesty-color-overlay-backdrop-primary);',
    '--honesty-overlay-backdrop-blur:',
    'var(--honesty-effect-backdrop-blur-medium);',
    '--honesty-overlay-layer:',
    '--honesty-overlay-frame-separator-color: var(--honesty-border-default);',
    '--honesty-overlay-frame-header-bg: transparent;',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-text-primary);',
    '--honesty-overlay-frame-header-outline-width:',
    '--honesty-overlay-frame-header-outline-color: transparent;',
    '--honesty-overlay-frame-header-outline-color:',
    'var(--honesty-overlay-frame-header-fg);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-brand-primary-solid);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-brand-primary-on-solid);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-brand-secondary-solid);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-brand-secondary-on-solid);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-brand-accent-solid);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-brand-accent-on-solid);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-feedback-success-surface-strong);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-feedback-success-on-strong);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-feedback-warning-surface-strong);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-action-primary-fg);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-feedback-danger-surface-strong);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-feedback-danger-on-strong);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-feedback-info-surface-strong);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-feedback-info-on-strong);',
    '--honesty-overlay-frame-header-bg: var(--honesty-color-surface-inverse);',
    '--honesty-overlay-frame-header-fg: var(--honesty-color-text-inverse);',
    '--honesty-overlay-frame-header-border-color:',
    '--honesty-overlay-frame-footer-border-color:',
    '--honesty-overlay-enter-duration: 360ms;',
    '--honesty-overlay-exit-duration: 260ms;',
  ]) {
    if (!tokens.includes(required)) {
      errors.push(`Overlay tokens: missing corrected contract ${required}`);
    }
  }

  if (
    occurrences(
      tokens,
      /--honesty-overlay-frame-header-outline-color:\s*var\(--honesty-overlay-frame-header-fg\);/g,
    ) !== 8
  ) {
    errors.push(
      'Overlay tokens: every colored Header tone must map outline color from the Header foreground token',
    );
  }

  for (const forbidden of [
    '@mixin frame-header-colored-outline',
    'color-mix(',
  ]) {
    if (tokens.includes(forbidden)) {
      errors.push(
        `Overlay tokens: Header outline color assembly must not live in Component Tokens: ${forbidden}`,
      );
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
  const frameStyle = [
    files.get(OVERLAY_FRAME_STYLE) ?? '',
    files.get(OVERLAY_FRAME_FACETS) ?? '',
  ].join('\n');
  const hostTemplate = files.get(OVERLAY_HOST_TEMPLATE) ?? '';
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
    "export type ErpOverlayHeaderTone = 'default' | ErpButtonTone;",
    'readonly tone?: ErpOverlayHeaderTone;',
    'readonly showCloseButton?: boolean;',
    'readonly closeLabel?: string;',
    'readonly id: string;',
    'readonly label: string;',
    'readonly presentation?: ErpOverlayActionPresentation;',
    'readonly tone?: ErpButtonTone;',
    'readonly role: ErpOverlayActionRole;',
    'readonly placement: ErpOverlayActionPlacement;',
    "export type ErpOverlayActionRole = 'primary' | 'secondary' | 'utility';",
    "export type ErpOverlayActionPlacement = 'start' | 'end';",
    "export type ErpOverlayActionPresentation = 'button' | 'icon-button';",
    'export interface ErpOverlayFrameActionState',
    'export interface ErpOverlayFooterConfig',
    'readonly actions: readonly ErpOverlayActionConfig[];',
    'readonly showHeader?: boolean;',
    'readonly showFooter?: boolean;',
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
    "tone: options.frame.header.tone ?? 'default'",
    'showCloseButton: options.frame.header.showCloseButton ?? true',
    'options.frame.footer.actions.map((action)',
    'id: action.id.trim()',
    'label: action.label.trim()',
    "action.presentation === 'icon-button'",
    "presentation: action.presentation ?? 'button'",
    "action.role === 'primary' ? 'primary' : 'neutral'",
    'showHeader: options.frame.showHeader ?? true',
    'showFooter: options.frame.showFooter ?? true',
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
    ':host {',
    'block-size: 100%;',
    '.overlay-frame {',
    'grid-template-rows: auto minmax(',
    'color: var(--honesty-overlay-frame-header-fg);',
    'box-shadow:',
    'inset 0 0 0 var(--honesty-overlay-frame-header-outline-width)',
    'color-mix(',
    'var(--honesty-overlay-frame-header-outline-color) 60%',
    "data-overlay-frame-header-visible='false'",
    "data-overlay-frame-footer-visible='false'",
    '.overlay-frame__body',
    'overflow: auto;',
    '.overlay-frame__footer',
    "data-overlay-frame-header-tone='default'",
    "data-overlay-frame-header-tone='primary'",
    "data-overlay-frame-header-tone='secondary'",
    "data-overlay-frame-header-tone='accent'",
    "data-overlay-frame-header-tone='success'",
    "data-overlay-frame-header-tone='warning'",
    "data-overlay-frame-header-tone='danger'",
    "data-overlay-frame-header-tone='info'",
    "data-overlay-frame-header-tone='neutral'",
  ]) {
    if (!frameStyle.includes(required)) {
      errors.push(`OverlayFrame styles: missing full-height Header/Body/Footer contract ${required}`);
    }
  }

  for (const required of [
    'ErpButton',
    'ErpIconButton',
    'ErpTooltip',
    "styleUrls: ['./overlay-frame.scss', './overlay-frame-facets.scss']",
    'this.config().showHeader !== false',
    'this.config().showFooter !== false',
    'this.config().header.showCloseButton !== false',
    "this.config().header.tone ?? 'default'",
    "this.headerTone() !== 'default'",
    'headerPrimaryContentTone',
    'headerSecondaryContentTone',
    'headerCloseVariant',
    'headerCloseTone',
    'buttonTone(action: ErpOverlayActionConfig)',
    'action.tone ??',
    "this.ref().dismiss('close-action')",
  ]) {
    if (!frameSource.includes(required)) {
      errors.push(`OverlayFrame: missing shared control contract ${required}`);
    }
  }

  for (const required of [
    '[attr.data-overlay-frame-header-visible]="showHeader()"',
    '[attr.data-overlay-frame-footer-visible]="showFooter()"',
    '@if (showHeader())',
    '<header',
    '[attr.data-overlay-frame-header-tone]="headerTone()"',
    '[tone]="headerPrimaryContentTone()"',
    '[tone]="headerSecondaryContentTone()"',
    '@if (showCloseButton())',
    '[variant]="headerCloseVariant()"',
    '[tone]="headerCloseTone()"',
    '<div class="overlay-frame__body">',
    '@if (showFooter())',
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

  for (const required of [
    "entry.ref.config.frame?.showHeader ? entry.ref.id + '-title' : null",
    "entry.ref.config.frame?.showHeader ? entry.ref.id + '-subtitle' : null",
    "entry.ref.config.frame.header.title",
    "entry.ref.config.frame.header.subtitle",
    '[attr.aria-description]',
  ]) {
    if (!hostTemplate.includes(required)) {
      errors.push(
        `OverlayHost template: hidden Header must preserve accessible dialog metadata via API; missing ${required}`,
      );
    }
  }

  const legacyUsers = [...files]
    .filter(
      ([file, source]) =>
        !file.endsWith('.spec.ts') &&
        source.includes('openLegacyCompactMenu'),
    )
    .map(([file]) => file)
    .sort();
  const expectedLegacyUsers = [OVERLAY_MANAGER];

  if (JSON.stringify(legacyUsers) !== JSON.stringify(expectedLegacyUsers)) {
    errors.push(
      'Legacy compact Overlay menu API must remain owner-only in OverlayManager; production controls must use the appropriate anchored or framed overlay foundation',
    );
  }

  return errors;
}

export function validateOverlayShowcase(files) {
  const errors = [];
  const source = files.get(OVERLAY_SHOWCASE_SOURCE) ?? '';
  const template = files.get(OVERLAY_SHOWCASE_TEMPLATE) ?? '';

  for (const group of [
    'modal',
    'drawers',
    'confirm-dialog',
    'nested-stack',
    'dismissal-focus',
  ]) {
    if (!template.includes(`data-review-group="${group}"`)) {
      errors.push(`Overlay showcase: missing Overlay-only review group ${group}`);
    }
  }

  for (const forbidden of [
    'data-review-group="temporal-pickers"',
    'data-review-group="selection-pickers"',
    'data-review-group="deferred-composites"',
    '<erp-date-box',
    '<erp-time-box',
    '<erp-date-time-box',
    '<erp-date-range-box',
    '<erp-color-picker',
    '<erp-icon-picker',
    '<erp-item-picker',
    '<erp-combo-box',
    '<erp-radio-group',
    '<erp-button-group',
    '<erp-split-button',
    '<erp-fab-menu',
  ]) {
    if (template.includes(forbidden)) {
      errors.push(`Overlay showcase: repeated non-Overlay control evidence is forbidden: ${forbidden}`);
    }
  }

  for (const marker of [
    'data-frame-header-hidden-evidence',
    'data-frame-footer-hidden-evidence',
    'data-frame-both-hidden-evidence',
    'data-drawer-frame-hidden-evidence',
  ]) {
    if (!template.includes(marker)) {
      errors.push(`Overlay showcase: missing API-only frame visibility evidence ${marker}`);
    }
  }

  for (const position of ['start', 'end', 'top', 'bottom']) {
    if (!template.includes(`data-drawer-evidence="${position}"`)) {
      errors.push(`Overlay showcase: missing drawer edge evidence ${position}`);
    }
  }

  for (const forbiddenImport of [
    'ErpDateBox',
    'ErpTimeBox',
    'ErpDateTimeBox',
    'ErpDateRangeBox',
    'ErpColorPicker',
    'ErpIconPicker',
    'ErpItemPicker',
    'ErpComboBox',
    'ErpRadioGroup',
    'ErpButtonGroup',
    'ErpSplitButton',
    'ErpFabMenu',
    'FormsModule',
  ]) {
    if (source.includes(forbiddenImport)) {
      errors.push(`Overlay showcase: repeated control import is forbidden: ${forbiddenImport}`);
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

export function validateButtonCompositeOverlay(files) {
  const errors = [];
  const splitSource = files.get(SPLIT_BUTTON_SOURCE) ?? '';
  const fabMenuSource = files.get(FAB_MENU_SOURCE) ?? '';

  for (const required of [
    'AnchoredOverlayController',
    'AnchoredOverlayGeometryResult',
  ]) {
    if (!splitSource.includes(required)) {
      errors.push(
        `${SPLIT_BUTTON_SOURCE}: SplitButton anchored menu is missing ${required}`,
      );
    }
  }

  for (const forbidden of [
    'ErpOverlayManager',
    'openLegacyCompactMenu',
    'ErpTooltip',
  ]) {
    if (splitSource.includes(forbidden)) {
      errors.push(
        `${SPLIT_BUTTON_SOURCE}: SplitButton anchored action menu must not depend on ${forbidden}`,
      );
    }
  }

  if (!fabMenuSource.includes('AnchoredOverlayController')) {
    errors.push(
      `${FAB_MENU_SOURCE}: FabMenu actions must use AnchoredOverlayController`,
    );
  }

  if (/ErpOverlayManager|openLegacyCompactMenu/.test(fabMenuSource)) {
    errors.push(
      `${FAB_MENU_SOURCE}: FabMenu must remain a nonblocking anchored top-layer menu`,
    );
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
      `export type ErpOverlayPosition = 'center' | 'start' | 'end' | 'top' | 'bottom';
export type ErpOverlayBlur = 'low' | 'medium' | 'high';
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
      `return ['flip-x', 'flip-x'];
return ['slide-start', 'slide-start'];
return ['slide-end', 'slide-end'];
return ['slide-down', 'slide-up'];
return ['slide-up', 'slide-down'];
dismissOnEscape: options.dismissOnEscape ?? false;
dismissOnBackdrop: options.dismissOnBackdrop ?? false;
blur: options.blur ?? 'medium';
backdropTone: options.backdropTone ?? 'primary';
phase: 'entering'; phase: 'open'; phase: 'leaving'; top?.ref.id === id;`,
    ],
    [
      OVERLAY_STYLE,
      "data-overlay-kind='drawer'][data-overlay-position='start'] data-overlay-kind='drawer'][data-overlay-position='end'] data-overlay-kind='drawer'][data-overlay-position='top'] data-overlay-kind='drawer'][data-overlay-position='bottom'] block-size: 100dvh; inline-size: 100%;",
    ],
    [
      OVERLAY_FACETS,
      "data-overlay-blur='low' data-overlay-blur='medium' data-overlay-blur='high' data-overlay-backdrop-tone='default' data-overlay-backdrop-tone='neutral' data-overlay-backdrop-tone='primary' data-overlay-backdrop-tone='secondary' data-overlay-backdrop-tone='accent'",
    ],
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
      '--honesty-overlay-backdrop-bg: var(--honesty-color-overlay-backdrop-primary); --honesty-overlay-backdrop-blur: var(--honesty-effect-backdrop-blur-medium); --honesty-overlay-layer: x; --honesty-overlay-frame-separator-color: var(--honesty-border-default); --honesty-overlay-frame-header-bg: transparent; --honesty-overlay-frame-header-fg: var(--honesty-color-text-primary); --honesty-overlay-frame-header-outline-width: x; --honesty-overlay-frame-header-outline-color: transparent; --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-outline-color: var(--honesty-overlay-frame-header-fg); --honesty-overlay-frame-header-bg: var(--honesty-color-brand-primary-solid); --honesty-overlay-frame-header-fg: var(--honesty-color-brand-primary-on-solid); --honesty-overlay-frame-header-bg: var(--honesty-color-brand-secondary-solid); --honesty-overlay-frame-header-fg: var(--honesty-color-brand-secondary-on-solid); --honesty-overlay-frame-header-bg: var(--honesty-color-brand-accent-solid); --honesty-overlay-frame-header-fg: var(--honesty-color-brand-accent-on-solid); --honesty-overlay-frame-header-bg: var(--honesty-color-feedback-success-surface-strong); --honesty-overlay-frame-header-fg: var(--honesty-color-feedback-success-on-strong); --honesty-overlay-frame-header-bg: var(--honesty-color-feedback-warning-surface-strong); --honesty-overlay-frame-header-fg: var(--honesty-color-action-primary-fg); --honesty-overlay-frame-header-bg: var(--honesty-color-feedback-danger-surface-strong); --honesty-overlay-frame-header-fg: var(--honesty-color-feedback-danger-on-strong); --honesty-overlay-frame-header-bg: var(--honesty-color-feedback-info-surface-strong); --honesty-overlay-frame-header-fg: var(--honesty-color-feedback-info-on-strong); --honesty-overlay-frame-header-bg: var(--honesty-color-surface-inverse); --honesty-overlay-frame-header-fg: var(--honesty-color-text-inverse); --honesty-overlay-frame-header-border-color: x; --honesty-overlay-frame-footer-border-color: x; --honesty-overlay-enter-duration: 360ms; --honesty-overlay-exit-duration: 260ms;',
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
      SPLIT_BUTTON_SOURCE,
      'AnchoredOverlayController AnchoredOverlayGeometryResult ErpActionMenuContent',
    ],
    [
      FAB_MENU_SOURCE,
      'AnchoredOverlayController AnchoredOverlayGeometryResult',
    ],
  ]);
  if (validateButtonCompositeOverlay(validComposite).length > 0) {
    throw new Error('Overlay governance rejected valid anchored Button composite fixtures');
  }

  const validOverlayShowcase = new Map([
    [
      OVERLAY_SHOWCASE_SOURCE,
      'ErpButton ErpOverlayManager',
    ],
    [
      OVERLAY_SHOWCASE_TEMPLATE,
      '<section data-review-group="modal"><erp-button data-frame-header-hidden-evidence /><erp-button data-frame-footer-hidden-evidence /><erp-button data-frame-both-hidden-evidence /></section><section data-review-group="drawers"><erp-button data-drawer-evidence="start" /><erp-button data-drawer-evidence="end" /><erp-button data-drawer-evidence="top" /><erp-button data-drawer-evidence="bottom" /><erp-button data-drawer-frame-hidden-evidence /></section><section data-review-group="confirm-dialog"></section><section data-review-group="nested-stack"></section><section data-review-group="dismissal-focus"></section>',
    ],
  ]);
  if (validateOverlayShowcase(validOverlayShowcase).length > 0) {
    throw new Error('Overlay governance rejected valid Overlay-only showcase fixture');
  }
  validOverlayShowcase.set(
    OVERLAY_SHOWCASE_TEMPLATE,
    `${validOverlayShowcase.get(OVERLAY_SHOWCASE_TEMPLATE)}<erp-date-box />`,
  );
  if (validateOverlayShowcase(validOverlayShowcase).length === 0) {
    throw new Error('Overlay governance accepted repeated Input evidence in Overlay showcase');
  }

  const validFrame = new Map([
    [
      OVERLAY_CONTRACTS,
      `export interface ErpOverlayHeaderConfig {
readonly title: string;
readonly subtitle: string;
readonly icon: ErpIconName;
export type ErpOverlayHeaderTone = 'default' | ErpButtonTone;
readonly tone?: ErpOverlayHeaderTone;
readonly showCloseButton?: boolean;
readonly closeLabel?: string;
}
export interface ErpOverlayActionConfig { readonly presentation?: ErpOverlayActionPresentation; readonly tone?: ErpButtonTone; }
export type ErpOverlayActionRole = 'primary' | 'secondary' | 'utility';
export type ErpOverlayActionPlacement = 'start' | 'end';
export type ErpOverlayActionPresentation = 'button' | 'icon-button';
export interface ErpOverlayFrameActionState {}
export interface ErpOverlayFooterConfig {
readonly actions: readonly ErpOverlayActionConfig[];
}
export interface ErpOverlayFrameConfig {
readonly showHeader?: boolean;
readonly showFooter?: boolean;
}
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
tone: options.frame.header.tone ?? 'default'
showCloseButton: options.frame.header.showCloseButton ?? true
options.frame.footer.actions.map((action)
id: action.id.trim()
label: action.label.trim()
action.presentation === 'icon-button'
presentation: action.presentation ?? 'button'
action.role === 'primary' ? 'primary' : 'neutral'
showHeader: options.frame.showHeader ?? true
showFooter: options.frame.showFooter ?? true
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
styleUrls: ['./overlay-frame.scss', './overlay-frame-facets.scss']
this.config().showHeader !== false
this.config().showFooter !== false
this.config().header.showCloseButton !== false
this.config().header.tone ?? 'default'
this.headerTone() !== 'default'
headerPrimaryContentTone
headerSecondaryContentTone
headerCloseVariant
headerCloseTone
buttonTone(action: ErpOverlayActionConfig)
action.tone ??
this.ref().dismiss('close-action')`,
    ],
    [
      OVERLAY_FRAME_STYLE,
      `:host { block-size: 100%; }
.overlay-frame { display: grid; block-size: 100%; grid-template-rows: auto minmax(0, 1fr) auto; }
.overlay-frame__header { color: var(--honesty-overlay-frame-header-fg); box-shadow: inset 0 0 0 var(--honesty-overlay-frame-header-outline-width) color-mix(in srgb, var(--honesty-overlay-frame-header-outline-color) 60%, transparent); }
.overlay-frame[data-overlay-frame-header-visible='false'][data-overlay-frame-footer-visible='true'] {}
.overlay-frame[data-overlay-frame-header-visible='true'][data-overlay-frame-footer-visible='false'] {}
.overlay-frame[data-overlay-frame-header-visible='false'][data-overlay-frame-footer-visible='false'] {}
.overlay-frame__body { overflow: auto; }
.overlay-frame__footer {}`,
    ],
    [
      OVERLAY_FRAME_FACETS,
      `.overlay-frame__header[data-overlay-frame-header-tone='default'] {}
.overlay-frame__header[data-overlay-frame-header-tone='primary'] {}
.overlay-frame__header[data-overlay-frame-header-tone='secondary'] {}
.overlay-frame__header[data-overlay-frame-header-tone='accent'] {}
.overlay-frame__header[data-overlay-frame-header-tone='success'] {}
.overlay-frame__header[data-overlay-frame-header-tone='warning'] {}
.overlay-frame__header[data-overlay-frame-header-tone='danger'] {}
.overlay-frame__header[data-overlay-frame-header-tone='info'] {}
.overlay-frame__header[data-overlay-frame-header-tone='neutral'] {}`,
    ],
    [
      OVERLAY_FRAME_TEMPLATE,
      `<div [attr.data-overlay-frame-header-visible]="showHeader()" [attr.data-overlay-frame-footer-visible]="showFooter()">
@if (showHeader()) { <header [attr.data-overlay-frame-header-tone]="headerTone()"><erp-icon [tone]="headerPrimaryContentTone()" /><erp-text [tone]="headerPrimaryContentTone()" /><erp-text [tone]="headerSecondaryContentTone()" /> @if (showCloseButton()) { <erp-icon-button data-overlay-frame-close [variant]="headerCloseVariant()" [tone]="headerCloseTone()" /> } }
<div class="overlay-frame__body">
@if (showFooter()) { <footer class="overlay-frame__footer"> }
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
    [
      OVERLAY_HOST_TEMPLATE,
      `[attr.aria-labelledby]="entry.ref.config.frame?.showHeader ? entry.ref.id + '-title' : null"
[attr.aria-describedby]="entry.ref.config.frame?.showHeader ? entry.ref.id + '-subtitle' : null"
[attr.aria-label]="entry.ref.config.frame && !entry.ref.config.frame.showHeader ? entry.ref.config.frame.header.title : entry.ref.config.legacyCompactMenuLabel"
[attr.aria-description]="entry.ref.config.frame && !entry.ref.config.frame.showHeader ? entry.ref.config.frame.header.subtitle : null"`,
    ],
    [
      'src/app/shared/overlay/overlay-manager.spec.ts',
      'openLegacyCompactMenu',
    ],
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
  const invalidLegacyComposite = new Map(validComposite);
  invalidLegacyComposite.set(
    SPLIT_BUTTON_SOURCE,
    'ErpOverlayManager ErpActionMenuContent openLegacyCompactMenu',
  );
  if (validateButtonCompositeOverlay(invalidLegacyComposite).length === 0) {
    throw new Error('Overlay governance accepted a legacy blocking SplitButton menu');
  }

  const invalidTooltipComposite = new Map(validComposite);
  invalidTooltipComposite.set(
    SPLIT_BUTTON_SOURCE,
    'AnchoredOverlayController AnchoredOverlayGeometryResult ErpTooltip',
  );
  if (validateButtonCompositeOverlay(invalidTooltipComposite).length === 0) {
    throw new Error('Overlay governance accepted Tooltip as a SplitButton menu');
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
errors.push(...validateOverlayShowcase(files));
errors.push(...validateTemporalPickers(files));
errors.push(...validateSelectionPickers(files));
errors.push(...validateButtonCompositeOverlay(files));

if (errors.length > 0) {
  console.error('ErpOverlay governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpOverlay governance check passed.');
