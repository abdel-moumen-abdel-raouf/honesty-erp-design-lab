import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, 'src', 'app');
const INTERNAL_ROOT = 'src/app/controls/input-family/internal/';
const CONTROLS_ROOT = 'src/app/controls/';
const TOKEN_ROOT = 'src/styles/foundation/components/';
const INPUT_SHOWCASE =
  'src/app/showcase/input-controls/input-controls.html';
const OVERLAY_SHOWCASE =
  'src/app/showcase/overlay-controls/overlay-controls.html';
const FIELD_CONTRACT = 'src/app/controls/FIELD_FAMILY_V1.md';
const BUTTON_CONTRACT = 'src/app/controls/BUTTON_FAMILY_V1.md';
const FIELD_FRAME_SOURCE =
  'src/app/controls/input-family/internal/field-frame.ts';
const FIELD_FRAME_TEMPLATE =
  'src/app/controls/input-family/internal/field-frame.html';
const FIELD_FRAME_STYLE =
  'src/app/controls/input-family/internal/field-frame.scss';
const INPUT_BASE_SOURCE =
  'src/app/controls/input-family/input-base.ts';
const INPUT_CONTRACTS =
  'src/app/controls/input-family/input-contracts.ts';
const FIELD_BASE_SOURCE =
  'src/app/controls/input-family/field-base.ts';
const FIELD_HOVER_STYLE =
  'src/app/controls/input-family/internal/field-frame-part-3.scss';
const RANGE_SLIDER_SOURCE =
  'src/app/controls/range-slider/range-slider.ts';
const RANGE_SLIDER_TEMPLATE =
  'src/app/controls/range-slider/range-slider.html';
const RANGE_SLIDER_STYLE =
  'src/app/controls/range-slider/range-slider.scss';

function componentStyleSources(files, componentSourcePath, fallbackStylePath) {
  const source = files.get(componentSourcePath) ?? '';
  const styleUrlsMatch = source.match(/styleUrls\s*:\s*\[([\s\S]*?)\]/);
  const styleUrlMatch = source.match(/styleUrl\s*:\s*['"]([^'"]+)['"]/);
  const componentDirectory = path.posix.dirname(componentSourcePath);
  const stylePaths = [];

  if (styleUrlsMatch) {
    for (const match of styleUrlsMatch[1].matchAll(/['"]([^'"]+\.scss)['"]/g)) {
      stylePaths.push(
        normalize(path.posix.join(componentDirectory, match[1])),
      );
    }
  } else if (styleUrlMatch) {
    stylePaths.push(
      normalize(path.posix.join(componentDirectory, styleUrlMatch[1])),
    );
  }

  if (stylePaths.length === 0) {
    stylePaths.push(fallbackStylePath);
  }

  return stylePaths.map((stylePath) => files.get(stylePath) ?? '').join('\n');
}
const FIELD_FEEDBACK_STYLE =
  'src/app/controls/input-family/internal/field-feedback.scss';
const FIELD_TRIGGER_TEMPLATE =
  'src/app/controls/input-family/internal/field-trigger.html';
const SEARCH_BOX_SOURCE =
  'src/app/controls/search-box/search-box.ts';
const SEARCH_BOX_TEMPLATE =
  'src/app/controls/search-box/search-box.html';
const SEARCH_BOX_TOKENS =
  'src/styles/foundation/components/search-box/_tokens.scss';
const SEARCH_BOX_STYLES = [
  'src/app/controls/search-box/search-box.scss',
  'src/app/controls/search-box/search-box-popup.scss',
  'src/app/controls/search-box/search-box-popup-facets.scss',
];
const FILE_SELECTION_BASE =
  'src/app/controls/input-family/file-selection-base.ts';
const FILE_PICKER_SOURCE =
  'src/app/controls/file-picker/file-picker.ts';
const FILE_PICKER_TEMPLATE =
  'src/app/controls/file-picker/file-picker.html';
const FILE_PICKER_TOKENS =
  'src/styles/foundation/components/file-picker/_tokens.scss';
const FILE_PICKER_STYLES =
  'src/app/controls/file-picker/file-picker-selection.scss';
const IMAGE_PICKER_SOURCE =
  'src/app/controls/image-picker/image-picker.ts';
const IMAGE_PICKER_TEMPLATE =
  'src/app/controls/image-picker/image-picker.html';
const IMAGE_PICKER_TOKENS =
  'src/styles/foundation/components/image-picker/_tokens.scss';
const IMAGE_PICKER_STYLES =
  'src/app/controls/image-picker/image-picker-selection.scss';
const CHECK_BOX_TEMPLATE =
  'src/app/controls/check-box/check-box.html';
const CHECK_BOX_TOKENS =
  'src/styles/foundation/components/check-box/_tokens.scss';
const CHECK_BOX_STYLES = [
  'src/app/controls/check-box/check-box.scss',
  'src/app/controls/check-box/check-box-states.scss',
  'src/app/controls/check-box/check-box-facets.scss',
  'src/app/controls/check-box/check-box-sizes.scss',
];
const RADIO_BOX_TEMPLATE =
  'src/app/controls/radio-box/radio-box.html';
const RADIO_BOX_TOKENS =
  'src/styles/foundation/components/radio-box/_tokens.scss';
const RADIO_BOX_STYLES = [
  'src/app/controls/radio-box/radio-box.scss',
  'src/app/controls/radio-box/radio-box-states.scss',
  'src/app/controls/radio-box/radio-box-facets.scss',
  'src/app/controls/radio-box/radio-box-sizes.scss',
];
const TEMPORAL_CONTROL_SLUGS = [
  'date-box',
  'time-box',
  'date-time-box',
  'date-range-box',
];
const TEMPORAL_CONTENT_SOURCE =
  'src/app/controls/temporal-family/internal/temporal-picker-content.ts';
const TEMPORAL_CONTENT_TEMPLATE =
  'src/app/controls/temporal-family/internal/temporal-picker-content.html';
const TEMPORAL_TOKENS =
  'src/styles/foundation/components/temporal-picker/_tokens.scss';
const SELECTION_CONTRACTS =
  'src/app/controls/selection-family/selection-contracts.ts';
const SELECTION_CONTENT_SOURCE =
  'src/app/controls/selection-family/internal/selection-picker-content.ts';
const SELECTION_CONTENT_TEMPLATE =
  'src/app/controls/selection-family/internal/selection-picker-content.html';
const SELECTION_TILE_TEMPLATE =
  'src/app/controls/selection-family/internal/selection-tile.html';
const SELECTION_TOKENS =
  'src/styles/foundation/components/selection-picker/_tokens.scss';
const SELECTION_CONTROL_SLUGS = [
  'color-picker',
  'icon-picker',
  'item-picker',
  'combo-box',
];
const DOMAIN_VALIDATION =
  'src/app/controls/input-family/domain-validation.ts';
const NUMBER_BOX_TEMPLATE =
  'src/app/controls/number-box/number-box.html';
const NUMBER_STEPPER_TEMPLATE =
  'src/app/controls/number-stepper/number-stepper.html';
const MONEY_BOX_SOURCE =
  'src/app/controls/money-box/money-box.ts';
const SELECTION_CONTENT_STYLES =
  'src/app/controls/selection-family/internal/selection-picker-content.scss';
const TEMPORAL_CONTRACTS =
  'src/app/controls/temporal-family/temporal-contracts.ts';
const TEMPORAL_REQUIRED_TOKENS = [
  '--honesty-temporal-picker-range-endpoint-bg:',
  '--honesty-temporal-picker-range-endpoint-fg:',
  '--honesty-temporal-picker-range-bg:',
  '--honesty-temporal-picker-range-fg:',
  '--honesty-temporal-picker-range-preview-bg:',
  '--honesty-temporal-picker-range-preview-fg:',
  '--honesty-temporal-picker-range-preview-endpoint-bg:',
  '--honesty-temporal-picker-range-radius:',
  '--honesty-temporal-picker-range-transition-duration:',
];
const FIELD_TRIGGER_CONSUMERS = [
  'date-box',
  'time-box',
  'date-time-box',
  'date-range-box',
  'color-picker',
  'icon-picker',
  'item-picker',
];
const PROGRAM_PUBLIC_CONTROLS = [
  ['ErpTextBox', 'text-box', INPUT_SHOWCASE],
  ['ErpTextAreaBox', 'text-area-box', INPUT_SHOWCASE],
  ['ErpPasswordBox', 'password-box', INPUT_SHOWCASE],
  ['ErpSearchBox', 'search-box', INPUT_SHOWCASE],
  ['ErpUrlBox', 'url-box', INPUT_SHOWCASE],
  ['ErpTelBox', 'tel-box', INPUT_SHOWCASE],
  ['ErpCheckBox', 'check-box', INPUT_SHOWCASE],
  ['ErpRadioBox', 'radio-box', INPUT_SHOWCASE],
  ['ErpNumberBox', 'number-box', INPUT_SHOWCASE],
  ['ErpNumberStepper', 'number-stepper', INPUT_SHOWCASE],
  ['ErpMoneyBox', 'money-box', INPUT_SHOWCASE],
  ['ErpRangeSlider', 'range-slider', INPUT_SHOWCASE],
  ['ErpFilePicker', 'file-picker', INPUT_SHOWCASE],
  ['ErpImagePicker', 'image-picker', INPUT_SHOWCASE],
  ['ErpDateBox', 'date-box', OVERLAY_SHOWCASE],
  ['ErpTimeBox', 'time-box', OVERLAY_SHOWCASE],
  ['ErpDateTimeBox', 'date-time-box', OVERLAY_SHOWCASE],
  ['ErpDateRangeBox', 'date-range-box', OVERLAY_SHOWCASE],
  ['ErpColorPicker', 'color-picker', OVERLAY_SHOWCASE],
  ['ErpIconPicker', 'icon-picker', OVERLAY_SHOWCASE],
  ['ErpItemPicker', 'item-picker', OVERLAY_SHOWCASE],
  ['ErpComboBox', 'combo-box', OVERLAY_SHOWCASE],
  ['ErpRadioGroup', 'radio-group', OVERLAY_SHOWCASE],
  ['ErpButtonGroup', 'button-group', OVERLAY_SHOWCASE],
  ['ErpSplitButton', 'split-button', OVERLAY_SHOWCASE],
  ['ErpFabMenu', 'fab-menu', OVERLAY_SHOWCASE],
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

function isSpec(file) {
  return file.endsWith('.spec.ts');
}

export function validate(files) {
  const errors = [];

  for (const [file, source] of files) {
    const normalized = normalize(file);
    const internal = normalized.startsWith(INTERNAL_ROOT);
    const control = normalized.startsWith(CONTROLS_ROOT);
    const token = normalized.startsWith(TOKEN_ROOT);

    if (
      !control &&
      !isSpec(normalized) &&
      /<erp-field-(?:frame|feedback|trigger)\b/.test(source)
    ) {
      errors.push(
        `${normalized}: internal Field components must not be authored directly`,
      );
    }

    if (
      !control &&
      !isSpec(normalized) &&
      /from\s+['"][^'"]*input-family\/(?:field-base|field-contracts|internal\/)/.test(
        source,
      )
    ) {
      errors.push(
        `${normalized}: internal Field infrastructure must not be imported by Feature/Page code`,
      );
    }

    if (
      !internal &&
      !token &&
      !isSpec(normalized) &&
      /--honesty-field-(?:frame|feedback)-/.test(source)
    ) {
      errors.push(
        `${normalized}: Field Component Tokens must not be consumed or overridden outside Field internals`,
      );
    }

    if (
      !control &&
      /<erp-tooltip\b[^>]*(?:validation|feedback|error)/i.test(source)
    ) {
      errors.push(
        `${normalized}: Tooltip must not be used as field validation feedback`,
      );
    }

    if (
      !control &&
      !isSpec(normalized) &&
      /<(?:textarea\b|input\b[^>]*\btype\s*=\s*['"](?:text|password|search|url|tel|checkbox|radio|number|range|file|date|time|datetime-local)['"])/i.test(
        source,
      )
    ) {
      errors.push(
        normalized +
          ': native input authoring must use the matching ERP control',
      );
    }

    const featurePage =
      normalized.startsWith('src/app/showcase/') ||
      normalized.startsWith('src/app/features/') ||
      normalized.startsWith('src/app/pages/');

    if (
      featurePage &&
      !isSpec(normalized) &&
      /<(?:select\b|input\b[^>]*\btype\s*=\s*['"]color['"])/i.test(
        source,
      )
    ) {
      errors.push(
        normalized +
          ': native selection authoring must use the matching ERP picker',
      );
    }
  }

  return errors;
}

export function validateFieldRenderingContracts(tokenSource, styleSource) {
  const errors = [];
  const declarations = [
    ...tokenSource.matchAll(
      /--honesty-field-frame-glass-surface-mix:\s*([^;]+);/g,
    ),
  ].map((match) => match[1].trim());

  if (
    declarations.length !== 2 ||
    declarations[0] !== '100%' ||
    declarations[1] !== '72%'
  ) {
    errors.push(
      'FieldFrame glass surface mix must declare base 100% and glass 72% exactly',
    );
  }

  for (const semanticRole of [
    '--honesty-color-surface-glass',
    '--honesty-color-surface-glass-border',
    '--honesty-color-surface-glass-highlight',
  ]) {
    if (!tokenSource.includes(semanticRole)) {
      errors.push(
        `FieldFrame glass tokens must consume ${semanticRole}`,
      );
    }
  }

  if (
    !styleSource.includes(
      'var(--honesty-field-frame-glass-border-color)',
    ) ||
    !styleSource.includes(
      'var(--honesty-field-frame-glass-highlight-color)',
    )
  ) {
    errors.push(
      'FieldFrame glass implementation must consume its semantic border and highlight slots',
    );
  }

  if (
    !styleSource.includes(
      'var(--honesty-field-frame-glass-surface-mix)',
    ) ||
    styleSource.includes('72%')
  ) {
    errors.push(
      'FieldFrame implementation must consume the glass surface mix token without a 72% literal',
    );
  }

  if (
    !styleSource.includes(":host-context([dir='rtl'])") ||
    !styleSource.includes(
      '--_honesty-field-frame-focus-inline-start',
    ) ||
    !styleSource.includes(
      '--_honesty-field-frame-focus-inline-end',
    )
  ) {
    errors.push(
      'FieldFrame focus gradients must expose deterministic RTL-aware color ordering',
    );
  }

  return errors;
}

export function validateFieldHitAreaContract(source, template, style) {
  const errors = [];

  for (const required of [
    "'(click)': 'handleControlSurfaceClick($event)'",
    'handleControlSurfaceClick(event: MouseEvent)',
    "target.closest('.field-frame__control')",
    '[field-leading-action]',
    '[field-domain-action]',
    '[field-trailing]',
    'this.controlId()',
    'control instanceof HTMLInputElement',
    'control instanceof HTMLTextAreaElement',
    'control instanceof HTMLButtonElement',
    'control.focus();',
    'control.click();',
    "this.configurationState() !== 'ready'",
  ]) {
    if (!source.includes(required)) {
      errors.push(`FieldFrame hit area: missing shared contract ${required}`);
    }
  }

  for (const required of [
    'class="field-frame__control"',
    'class="field-frame__value"',
    '<ng-content select="[field-control]"></ng-content>',
  ]) {
    if (!template.includes(required)) {
      errors.push(`FieldFrame template: missing hit-area contract ${required}`);
    }
  }

  for (const required of [
    '.field-frame__value',
    'flex: 1 1 auto;',
    'inline-size: 100%;',
  ]) {
    if (!style.includes(required)) {
      errors.push(`FieldFrame styles: missing hit-area contract ${required}`);
    }
  }

  return errors;
}

export function validateFieldFeedbackCaretContract(style) {
  const errors = [];

  for (const required of [
    '.field-feedback__caret',
    'border-top:',
    'border-left:',
    'transform: rotate(45deg);',
  ]) {
    if (!style.includes(required)) {
      errors.push(
        `FieldFeedback caret: missing direction-independent upward contract ${required}`,
      );
    }
  }

  if (/border-inline-(?:start|end):/.test(style)) {
    errors.push(
      'FieldFeedback caret: arrow orientation must not use logical inline borders',
    );
  }

  return errors;
}

export function validateFieldTriggerContracts(files) {
  const errors = [];
  const triggerSource = files.get(FIELD_TRIGGER_TEMPLATE) ?? '';

  if (
    (triggerSource.match(/<button\b/g) ?? []).length !== 1 ||
    !/<button\b[^>]*\btype="button"/.test(triggerSource)
  ) {
    errors.push(
      `${FIELD_TRIGGER_TEMPLATE}: ErpFieldTrigger must own exactly one native type="button" root`,
    );
  }

  for (const slug of FIELD_TRIGGER_CONSUMERS) {
    const template = `src/app/controls/${slug}/${slug}.html`;
    const source = files.get(template) ?? '';

    if (!/<erp-field-trigger\b/.test(source) || /<button\b/.test(source)) {
      errors.push(
        `${template}: picker trigger must use ErpFieldTrigger without a raw button`,
      );
    }
  }

  return errors;
}

export function validateSearchBoxPopupContracts(
  source,
  template,
  tokenSource,
  styleSource,
) {
  const errors = [];
  const requiredInputs = [
    [
      'mode',
      /mode\s*=\s*input<ErpSearchBoxMode>\('dropdown'\)/,
    ],
    [
      'items',
      /items\s*=\s*input<readonly ErpSearchBoxOption\[]>\(\[]\)/,
    ],
    [
      'dismissOnOutside',
      /dismissOnOutside\s*=\s*input\(true,\s*\{transform:\s*booleanAttribute\}\)/,
    ],
    [
      'dismissOnEscape',
      /dismissOnEscape\s*=\s*input\(true,\s*\{transform:\s*booleanAttribute\}\)/,
    ],
    [
      'showDefaultSearchIcon',
      /showDefaultSearchIcon\s*=\s*input\(true,\s*\{\s*transform:\s*booleanAttribute,?\s*\}\)/,
    ],
    [
      'enterAnimation',
      /enterAnimation\s*=\s*input<ErpOverlayAnimation>\('fade-scale'\)/,
    ],
    [
      'exitAnimation',
      /exitAnimation\s*=\s*input<ErpOverlayAnimation>\('fade-scale'\)/,
    ],
  ];

  for (const [name, pattern] of requiredInputs) {
    if (!pattern.test(source)) {
      errors.push(`SearchBox: missing exact ${name} popup input contract`);
    }
  }

  if (
    !source.includes('AnchoredOverlayController') ||
    !source.includes('ErpOverlayManager') ||
    !source.includes('ErpSelectionPickerContent') ||
    !source.includes('ErpOverlayAnimation') ||
    !source.includes('filteredItems = computed(') ||
    !source.includes("query = signal('')") ||
    !source.includes('this.commitUserValue(item.value)')
  ) {
    errors.push(
      'SearchBox: dropdown/modal modes must use anchored geometry, OverlayManager modal search, and selectable filtered results',
    );
  }

  if (
    source.includes('ErpTooltip') ||
    source.includes('--honesty-overlay-') ||
    styleSource.includes('--honesty-overlay-') ||
    tokenSource.includes('--honesty-overlay-')
  ) {
    errors.push(
      'SearchBox: dropdown must not consume Tooltip or Overlay Component Tokens',
    );
  }

  if (
    !/<erp-field-trigger\b/.test(template) ||
    !/popover="manual"/.test(template) ||
    !template.includes('role="combobox"') ||
    !template.includes('role="listbox"') ||
    !template.includes('<erp-selection-tile') ||
    !template.includes('presentation="list"') ||
    !template.includes('data-search-result') ||
    !template.includes('class="search-box__close"') ||
    !template.includes("mode() === 'inline'") ||
    !template.includes("mode() === 'dropdown'") ||
    /<ng-content\s+select="\[search-results\]"/.test(template)
  ) {
    errors.push(
      'SearchBox: three-mode contract must use FieldTrigger, manual listbox popup, SelectionTile results, explicit close, and selectable/filterable results',
    );
  }

  for (const requirement of [
    "'--_honesty-search-box-popup-trigger-inline-size'",
    "trigger.closest<HTMLElement>('.field-frame__control')",
    'anchor.getBoundingClientRect().width',
    "this.popupPhase.set('leaving')",
    'setTimeout(',
    'this.controller?.hide();',
    'this.removeFromOpenStack();',
    'this.openModal()',
    'this.closeDropdown(true)',
    'surface.inert = true',
    "surface.style.pointerEvents = 'none';",
    "surface.setAttribute('aria-hidden', 'true');",
    'this.controller?.hide();',
    'this.restoreTriggerFocus();',
  ]) {
    if (!source.includes(requirement)) {
      errors.push(`SearchBox: missing corrected popup lifecycle ${requirement}`);
    }
  }

  const exactTokens = new Map([
    ['bg', 'var(--honesty-color-surface-elevated)'],
    ['fg', 'var(--honesty-color-text-primary)'],
    ['border-color', 'var(--honesty-border-subtle)'],
    ['border-width', 'var(--honesty-border-width-default)'],
    ['border-style', 'var(--honesty-border-style-default)'],
    ['radius', 'var(--honesty-radius-overlay)'],
    ['elevation', 'var(--honesty-elevation-overlay)'],
    ['layer', 'var(--honesty-layer-overlay)'],
    ['anchor-gap', 'var(--honesty-space-inline-default)'],
    ['viewport-inset', 'var(--honesty-space-inset-tight)'],
    ['padding', 'var(--honesty-space-inset-default)'],
    ['content-gap', 'var(--honesty-space-stack-tight)'],
    ['min-inline-size', '20rem'],
    ['max-inline-size', '36rem'],
    ['max-block-size', '28rem'],
    ['enter-duration', 'var(--honesty-motion-duration-default)'],
    ['exit-duration', 'var(--honesty-motion-duration-fast)'],
    ['enter-easing', 'var(--honesty-motion-easing-enter)'],
    ['exit-easing', 'var(--honesty-motion-easing-exit)'],
    ['motion-opacity', '0'],
    ['motion-transform', 'scale(0.96)'],
    ['motion-slide-distance', '0.5rem'],
    ['reduced-duration', 'var(--honesty-motion-duration-instant)'],
  ]);
  const baseTokenSource =
    tokenSource.match(/@mixin\s+base\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  for (const [slot, value] of exactTokens) {
    const pattern = new RegExp(
      `--honesty-search-box-popup-${slot}:\\s*${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*;`,
    );
    if (!pattern.test(baseTokenSource)) {
      errors.push(
        `SearchBox: popup token ${slot} must map exactly to ${value}`,
      );
    }
  }

  for (const animation of [
    'fade',
    'scale',
    'fade-scale',
    'slide-up',
    'slide-down',
    'slide-start',
    'slide-end',
  ]) {
    if (!styleSource.includes(`data-search-box-animation='${animation}'`)) {
      errors.push(`SearchBox: missing ${animation} animation mapping`);
    }
  }

  const basePopupStyle =
    styleSource.match(/\.search-box__popup\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  if (/\bdisplay\s*:/.test(basePopupStyle)) {
    errors.push(
      'SearchBox: closed native Popover rule must not override browser display:none',
    );
  }

  if (
    !/\.search-box__popup:popover-open\s*\{[\s\S]*?\bdisplay\s*:\s*grid\s*;/.test(
      styleSource,
    )
  ) {
    errors.push(
      'SearchBox: grid layout must be enabled only in :popover-open state',
    );
  }

  if (
    !styleSource.includes("dir='rtl'") ||
    !styleSource.includes('prefers-reduced-motion: reduce') ||
    !styleSource.includes('var(--honesty-search-box-popup-max-block-size)') ||
    !styleSource.includes(
      'var(--_honesty-search-box-popup-trigger-inline-size)',
    ) ||
    !styleSource.includes(
      ".search-box__popup[data-search-popup-phase='leaving']",
    ) ||
    !styleSource.includes('pointer-events: none;') ||
    !/inline-size:\s*min\(\s*var\(--_honesty-search-box-popup-trigger-inline-size\)/.test(
      styleSource,
    )
  ) {
    errors.push(
      'SearchBox: popup styles must retain exact trigger-width sizing, noninteractive leaving, RTL motion, reduced motion, and viewport capping',
    );
  }

  return errors;
}

export function validateUnifiedInputValidationContracts(files) {
  const errors = [];
  const contracts = files.get(INPUT_CONTRACTS) ?? '';
  const base = files.get(INPUT_BASE_SOURCE) ?? '';
  const fieldBase = files.get(FIELD_BASE_SOURCE) ?? '';
  const hoverStyle = files.get(FIELD_HOVER_STYLE) ?? '';

  for (const state of [
    "'null'",
    "'empty'",
    "'no-selection'",
    "'invalid-entry'",
    "'valid-entry'",
  ]) {
    if (!contracts.includes(state)) {
      errors.push(`Input validation: missing semantic state ${state}`);
    }
  }

  for (const requirement of [
    'export interface ErpInputValidationIssue',
    'readonly code: string;',
    'readonly message: string;',
    'readonly source: ErpInputValidationSource;',
    'export interface ErpInputValidationSnapshot',
    'readonly errors: readonly string[];',
    'readonly issues: readonly ErpInputValidationIssue[];',
  ]) {
    if (!contracts.includes(requirement)) {
      errors.push(`Input validation contracts: missing ${requirement}`);
    }
  }

  for (const requirement of [
    'readonly required = input(false, {transform: booleanAttribute});',
    'externalValidationIssues',
    'readonly validationIssues = computed',
    'readonly valid = computed',
    'readonly inputState = computed',
    'readonly errors = computed',
    'readonly validation = computed',
    'protected validationCandidate()',
    'protected classifyPresence',
    'protected validateCandidate',
    'protected validationIssue',
  ]) {
    if (!base.includes(requirement)) {
      errors.push(`InputBase validation substrate: missing ${requirement}`);
    }
  }

  for (const requirement of [
    'readonly clearable = input(true, {transform: booleanAttribute});',
    'effectiveFieldStatus = computed<ErpFieldStatus>',
    'effectiveFeedbackText = computed',
    'effectiveFeedbackVisible = computed',
  ]) {
    if (!fieldBase.includes(requirement)) {
      errors.push(`FieldBase validation projection: missing ${requirement}`);
    }
  }

  const textLikeTemplates = [
    'src/app/controls/text-box/text-box.html',
    'src/app/controls/text-area-box/text-area-box.html',
    'src/app/controls/password-box/password-box.html',
    'src/app/controls/url-box/url-box.html',
    'src/app/controls/tel-box/tel-box.html',
    SEARCH_BOX_TEMPLATE,
  ];

  for (const template of textLikeTemplates) {
    const source = files.get(template) ?? '';
    if (source.includes('[attr.maxlength]="maxLength()"')) {
      errors.push(
        `${template}: maxlength must remain validation-only and non-destructive`,
      );
    }
  }

  const urlSource = files.get('src/app/controls/url-box/url-box.ts') ?? '';
  const telSource = files.get('src/app/controls/tel-box/tel-box.ts') ?? '';
  const numberSource = files.get('src/app/controls/number-box/number-box.ts') ?? '';
  const moneySource = files.get(MONEY_BOX_SOURCE) ?? '';
  const fileBase = files.get(FILE_SELECTION_BASE) ?? '';

  for (const [name, source, requirements] of [
    [
      'UrlBox',
      urlSource,
      [
        "'url.format'",
        'this.commitUserValue(value);',
        'النص المُدخل ليس عنوان رابط إلكتروني صالحًا.',
      ],
    ],
    [
      'TelBox',
      telSource,
      [
        "'tel.plus-count'",
        "'tel.plus-position'",
        "'tel.too-short'",
        'this.commitUserValue(value);',
      ],
    ],
    [
      'NumberBox',
      numberSource,
      [
        "'number.min'",
        "'number.max'",
        "'number.step'",
        "'number.format'",
        'draftActive',
      ],
    ],
    [
      'MoneyBox',
      moneySource,
      [
        "'money.min'",
        "'money.max'",
        "'money.step'",
        "'money.format'",
        'draftActive',
      ],
    ],
    [
      'FileSelectionBase',
      fileBase,
      [
        'minFiles = input<number | null>(null)',
        "'files.min-count'",
        "'files.max-count'",
        "'files.type'",
        "'files.max-size'",
      ],
    ],
  ]) {
    for (const requirement of requirements) {
      if (!source.includes(requirement)) {
        errors.push(`${name}: missing unified validation behavior ${requirement}`);
      }
    }
  }

  for (const requirement of [
    '--honesty-field-frame-hover-bg:',
  ]) {
    const tokens =
      files.get('src/styles/foundation/components/field-frame/_tokens.scss') ?? '';
    if (!tokens.includes(requirement)) {
      errors.push(`FieldFrame hover contract: missing ${requirement}`);
    }
  }

  for (const requirement of [
    "[data-field-variant='ghost']",
    "[data-field-variant='text']",
    "[data-field-border-mode='underline']",
    'var(--honesty-field-frame-hover-bg)',
  ]) {
    if (!hoverStyle.includes(requirement)) {
      errors.push(`FieldFrame lightweight hover: missing ${requirement}`);
    }
  }

  return errors;
}

export function validateRangeSliderCorrectionContracts(files) {
  const errors = [];
  const source = files.get(RANGE_SLIDER_SOURCE) ?? '';
  const template = files.get(RANGE_SLIDER_TEMPLATE) ?? '';
  const styles = files.get(RANGE_SLIDER_STYLE) ?? '';

  for (const requirement of [
    'showValueTooltip = input(true',
    'valueTooltipPlacement = input<ErpTooltipPlacement>',
    'valueTooltipFormatter',
    'activeThumb = signal<ErpRangeSliderThumb | null>(null)',
    'tooltipText(thumb: ErpRangeSliderThumb)',
    'handlePointerDown(thumb: ErpRangeSliderThumb)',
  ]) {
    if (!source.includes(requirement)) {
      errors.push(`RangeSlider tooltip contract: missing ${requirement}`);
    }
  }

  if (
    (template.match(/\[min\]="min\(\)"/g) ?? []).length < 2 ||
    (template.match(/\[max\]="max\(\)"/g) ?? []).length < 2 ||
    template.includes('[max]="currentValue().upper"') ||
    template.includes('[min]="currentValue().lower"')
  ) {
    errors.push(
      'RangeSlider: both native thumbs must use the same global min/max coordinate domain',
    );
  }

  for (const requirement of [
    'data-range-tooltip-anchor="lower"',
    'data-range-tooltip-anchor="upper"',
    '[style.inset-inline-start]="lowerPosition() + \'%\'"',
    '[style.inset-inline-start]="upperPosition() + \'%\'"',
    '[open]="showValueTooltip() && activeThumb() === \'lower\'"',
    '[open]="showValueTooltip() && activeThumb() === \'upper\'"',
  ]) {
    if (!template.includes(requirement)) {
      errors.push(`RangeSlider: missing moving Tooltip binding ${requirement}`);
    }
  }

  const thumbInset =
    'inset-inline: calc(var(--honesty-range-slider-thumb-size) / 2);';
  if (
    (styles.match(
      /inset-inline:\s*calc\(var\(--honesty-range-slider-thumb-size\) \/ 2\);/g,
    ) ?? []).length < 2
  ) {
    errors.push(
      'RangeSlider: rail and Tooltip track must share the thumb-center inset geometry',
    );
  }

  if (!styles.includes('.range-slider__tooltip-track')) {
    errors.push('RangeSlider: missing tooltip track geometry');
  }

  return errors;
}

export function validateNumericEditorContracts(files) {
  const errors = [];

  for (const file of [NUMBER_BOX_TEMPLATE, NUMBER_STEPPER_TEMPLATE]) {
    const source = files.get(file) ?? '';

    if (
      !/<input\b[\s\S]*?type="text"[\s\S]*?inputmode="decimal"/.test(
        source,
      ) ||
      /type="number"/.test(source)
    ) {
      errors.push(
        `${file}: numeric editors must remain text-like decimal inputs without browser spinners`,
      );
    }
  }

  const moneySource = files.get(MONEY_BOX_SOURCE) ?? '';
  if (
    !moneySource.includes("readonly digitSet = input<DigitSet | null>(null)") ||
    !moneySource.includes(
      "this.digitSet() ??",
    ) ||
    !moneySource.includes(
      "resolveContextualPreference(this.digitPreference(), 'money')",
    )
  ) {
    errors.push(
      'MoneyBox: per-instance digit override must fall back to shared Preferences',
    );
  }

  return errors;
}

export function validateArabicFirstDefaults(files) {
  const errors = [];
  const temporal = files.get(TEMPORAL_CONTRACTS) ?? '';
  const selection = files.get(SELECTION_CONTRACTS) ?? '';

  for (const value of [
    'الشهر السابق',
    'الشهر التالي',
    'اليوم',
    'الآن',
    'آخر 7 أيام',
    '7 أيام بدءًا من اليوم',
    'آخر 30 يومًا',
    '30 يومًا بدءًا من اليوم',
    'مسح',
    'إلغاء',
    'تأكيد',
    'الساعة',
    'الدقيقة',
  ]) {
    if (!temporal.includes(`'${value}'`)) {
      errors.push(
        `${TEMPORAL_CONTRACTS}: missing Arabic-first default "${value}"`,
      );
    }
  }

  for (const value of [
    'ألوان النظام',
    'لون حر',
    'لم يتم اختيار قيمة',
    'بحث',
    'مسح',
    'إلغاء',
    'تأكيد',
  ]) {
    if (!selection.includes(`'${value}'`)) {
      errors.push(
        `${SELECTION_CONTRACTS}: missing Arabic-first default "${value}"`,
      );
    }
  }

  const showcaseSources = [
    files.get(INPUT_SHOWCASE) ?? '',
    files.get(OVERLAY_SHOWCASE) ?? '',
  ].join('\n');

  for (const staleCopy of [
    'Text Entry Family V1',
    'Control family',
    'Variants / Appearance',
    'Seven sizes',
    'Field matrix',
    'Behavior / Direction',
    'Temporal picker overlays',
    'Selection picker overlays',
    'Deferred control composites',
    'Open date picker',
    'Open color picker',
  ]) {
    if (showcaseSources.includes(staleCopy)) {
      errors.push(
        `Corrected showcase contains stale English-only copy "${staleCopy}"`,
      );
    }
  }

  return errors;
}

export function validateProgramControlInventory(files, documentation) {
  const errors = [];

  for (const [className, slug, showcase] of PROGRAM_PUBLIC_CONTROLS) {
    const componentRoot = `src/app/controls/${slug}/${slug}`;
    const requiredFiles = [
      `${componentRoot}.ts`,
      `${componentRoot}.html`,
      `${componentRoot}.scss`,
      `${componentRoot}.spec.ts`,
      `${TOKEN_ROOT}${slug}/_tokens.scss`,
      `${TOKEN_ROOT}${slug}/_index.scss`,
    ];

    for (const file of requiredFiles) {
      if (!files.has(file)) {
        errors.push(`${className}: missing required program file ${file}`);
      }
    }

    const componentSource = files.get(`${componentRoot}.ts`) ?? '';
    if (!componentSource.includes(`export class ${className}`)) {
      errors.push(`${componentRoot}.ts: missing exported ${className}`);
    }

    const showcaseSource = files.get(showcase) ?? '';
    if (!showcaseSource.includes(`<erp-${slug}`)) {
      errors.push(`${className}: missing showcase evidence in ${showcase}`);
    }

    if (!documentation.includes(className)) {
      errors.push(`${className}: missing authoritative contract documentation`);
    }
  }

  return errors;
}

export function validateFileSelectionContracts(
  baseSource,
  fileSource,
  fileTemplate,
  fileTokens,
  fileStyles,
  imageSource,
  imageTemplate,
  imageTokens,
  imageStyles,
) {
  const errors = [];
  const baseRequirements = [
    'export abstract class ErpFileSelectionBase',
    'extends ErpFieldBase<',
    'readonly File[]',
    'accept = input<string | null>(null)',
    'maxFileSize = input<number | null>(null)',
    'minFiles = input<number | null>(null)',
    'maxFiles = input<number | null>(null)',
    "'files.min-count'",
    "'files.max-count'",
    'clearable = input(true, {transform: booleanAttribute})',
    'handleNativeSelection',
    'handleDrop',
    'removeFile',
    'clearAll',
    'file.name, file.size, file.lastModified, file.type',
    "inputElement.value = ''",
  ];

  for (const requirement of baseRequirements) {
    if (!baseSource.includes(requirement)) {
      errors.push(
        `FileSelectionBase: missing required contract ${requirement}`,
      );
    }
  }

  if (/HttpClient|@angular\/common\/http|uploadProgress|serverResponse/.test(
    `${baseSource}\n${fileSource}\n${imageSource}`,
  )) {
    errors.push(
      'File/Image pickers must not own HTTP upload, progress, or server-response behavior',
    );
  }

  if (
    !fileSource.includes('extends ErpFileSelectionBase') ||
    !/<input[\s\S]*?type="file"[\s\S]*?multiple/.test(fileTemplate) ||
    !fileTemplate.includes('(drop)="handleDrop($event)"') ||
    !fileTemplate.includes('<erp-tooltip') ||
    !fileTemplate.includes('data-file-picker-remove') ||
    !fileTokens.includes(
      '--honesty-file-picker-drop-zone-border-style:',
    ) ||
    !fileTokens.includes('var(--honesty-border-style-dashed)') ||
    !fileTokens.includes('--honesty-file-picker-item-bg-hover:') ||
    !fileTokens.includes('--honesty-file-picker-item-border-color-hover:') ||
    !fileTokens.includes('--honesty-file-picker-transition-duration:') ||
    !fileStyles.includes('.file-picker__item:hover,') ||
    !fileStyles.includes('.file-picker__item:focus-within') ||
    !fileStyles.includes('prefers-reduced-motion: reduce')
  ) {
    errors.push(
      'FilePicker: multi-file drop zone, Tooltip removal, and tokenized hover/focus feedback are required',
    );
  }

  if (
    !imageSource.includes('extends ErpFileSelectionBase') ||
    !imageSource.includes("input<string | null>('image/*')") ||
    !imageSource.includes("input<ErpImagePickerPreviewSize>('md')") ||
    !imageSource.includes('URL.createObjectURL') ||
    !imageSource.includes('URL.revokeObjectURL') ||
    !/<input[\s\S]*?type="file"[\s\S]*?multiple/.test(imageTemplate) ||
    !imageTemplate.includes('data-image-picker-remove') ||
    !imageTokens.includes('@mixin preview-size-sm') ||
    !imageTokens.includes('@mixin preview-size-md') ||
    !imageTokens.includes('@mixin preview-size-lg') ||
    !imageTokens.includes('--honesty-image-picker-item-bg-hover:') ||
    !imageTokens.includes('--honesty-image-picker-item-border-color-hover:') ||
    !imageTokens.includes('--honesty-image-picker-transition-duration:') ||
    !imageStyles.includes('.image-picker__item:hover,') ||
    !imageStyles.includes('.image-picker__item:focus-within') ||
    !imageStyles.includes('prefers-reduced-motion: reduce')
  ) {
    errors.push(
      'ImagePicker: multi-image, stable Object URL, preview sizing, and tokenized hover/focus feedback are required',
    );
  }

  return errors;
}

export function validateChoiceVisualContracts(
  checkTemplate,
  checkTokens,
  checkStyles,
  radioTemplate,
  radioTokens,
  radioStyles,
) {
  const errors = [];

  if (
    !checkTemplate.includes('type="checkbox"') ||
    !checkTemplate.includes('class="check-box__visual"') ||
    !checkTemplate.includes('name="check"') ||
    !checkTemplate.includes('name="minus"') ||
    /<svg\b/.test(checkTemplate) ||
    !checkTokens.includes('--honesty-check-box-control-size:') ||
    !checkTokens.includes('--honesty-check-box-mark-size:') ||
    !checkTokens.includes('var(--honesty-motion-duration-fast)') ||
    !checkStyles.includes("data-check-box-checked='true'") ||
    !checkStyles.includes("data-check-box-indeterminate='true'") ||
    !checkStyles.includes('.check-box__native:focus-visible') ||
    !checkStyles.includes('prefers-reduced-motion: reduce')
  ) {
    errors.push(
      'CheckBox: native semantics, fixed geometry, semantic marks, state visuals, and Foundation Motion are required',
    );
  }

  if (
    !radioTemplate.includes('type="radio"') ||
    !radioTemplate.includes('class="radio-box__visual"') ||
    !radioTemplate.includes('class="radio-box__dot"') ||
    /<svg\b/.test(radioTemplate) ||
    !radioTokens.includes('--honesty-radio-box-control-size:') ||
    !radioTokens.includes('--honesty-radio-box-dot-size:') ||
    !radioTokens.includes('var(--honesty-motion-duration-fast)') ||
    !radioStyles.includes("data-radio-box-checked='true'") ||
    !radioStyles.includes('.radio-box__native:focus-visible') ||
    !radioStyles.includes('prefers-reduced-motion: reduce')
  ) {
    errors.push(
      'RadioBox: native semantics, fixed circular geometry, centered dot, state visuals, and Foundation Motion are required',
    );
  }

  return errors;
}

export function validateTemporalCorrectionContracts(files) {
  const errors = [];

  for (const slug of TEMPORAL_CONTROL_SLUGS) {
    const source = files.get(`src/app/controls/${slug}/${slug}.ts`) ?? '';
    const template = files.get(`src/app/controls/${slug}/${slug}.html`) ?? '';

    if (
      !source.includes("readonly locale = input('ar-EG')") ||
      ((slug === 'date-time-box' || slug === 'date-range-box') &&
        (!source.includes('readonly min = input<string | null>(null)') ||
         !source.includes('readonly max = input<string | null>(null)'))) ||
      !source.includes('readonly placeholder = input(') ||
      !source.includes('readonly pattern = input<string | null>(null)') ||
      !source.includes(
        'readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null)',
      ) ||
      !source.includes('resolveDomainPattern(') ||
      !source.includes('commitPickerResult(') ||
      !template.includes('<erp-field-trigger')
    ) {
      errors.push(
        `${slug}: temporal pattern, ar-EG locale, safe overlay behavior, validated confirm, and FieldTrigger contracts are required`,
      );
    }
  }

  const domain = files.get(DOMAIN_VALIDATION) ?? '';
  if (
    !domain.includes("ERP_DATE_FINAL_PATTERN = '^\\\\d{4}-\\\\d{2}-\\\\d{2}$'") ||
    !domain.includes("ERP_TIME_FINAL_PATTERN = '^\\\\d{2}:\\\\d{2}$'") ||
    !domain.includes(
      "'^\\\\d{4}-\\\\d{2}-\\\\d{2}T\\\\d{2}:\\\\d{2}$'",
    )
  ) {
    errors.push('Temporal built-in final-value patterns are incomplete');
  }

  const contracts = files.get(TEMPORAL_CONTRACTS) ?? '';
  const content = files.get(TEMPORAL_CONTENT_SOURCE) ?? '';
  const template = files.get(TEMPORAL_CONTENT_TEMPLATE) ?? '';
  const tokens = files.get(TEMPORAL_TOKENS) ?? '';
  if (
    !content.includes('rangeAnchor = signal(') ||
    !content.includes('rangePreviewCandidate = signal<string | null>(null)') ||
    !content.includes('orderRange(') ||
    !content.includes('updateKeyboardPreview(') ||
    !content.includes("registerFrameAction('confirm'") ||
    !content.includes("registerFrameAction('cancel'") ||
    !content.includes("registerFrameAction('today'") ||
    !content.includes("registerFrameAction('now'") ||
    !content.includes("registerFrameAction('past-7-days'") ||
    !content.includes("registerFrameAction('next-7-days'") ||
    !content.includes("registerFrameAction('past-30-days'") ||
    !content.includes("registerFrameAction('next-30-days'") ||
    !content.includes("registerFrameAction('clear'") ||
    !content.includes("updateFrameActionState('confirm'") ||
    !content.includes('if (!this.hasValidConfirmation())') ||
    !content.includes("updateFrameActionState('clear'") ||
    !content.includes("updateFrameActionState('today'") ||
    !content.includes('revealSelectedTime()') ||
    !content.includes('scrollIntoView?.') ||
    !contracts.includes("now: 'الآن'") ||
    !contracts.includes("past7Days: 'آخر 7 أيام'") ||
    !contracts.includes("next7Days: '7 أيام بدءًا من اليوم'") ||
    !contracts.includes("past30Days: 'آخر 30 يومًا'") ||
    !contracts.includes("next30Days: '30 يومًا بدءًا من اليوم'") ||
    !template.includes('(pointerenter)="previewDate(date)"') ||
    !template.includes('(pointerleave)="clearRangePreview()"') ||
    !template.includes('data.actionLabels.previousMonth') ||
    template.includes('data-confirm-action') ||
    template.includes('data-cancel-action') ||
    template.includes('picker-actions') ||
    TEMPORAL_REQUIRED_TOKENS.some((token) => !tokens.includes(token))
  ) {
    errors.push(
      'Temporal picker: staged range, shared frame actions, body-only actions, and range token slots are required',
    );
  }

  return errors;
}

export function validateSelectionCorrectionContracts(files) {
  const errors = [];
  const contracts = files.get(SELECTION_CONTRACTS) ?? '';
  const content = files.get(SELECTION_CONTENT_SOURCE) ?? '';
  const template = files.get(SELECTION_CONTENT_TEMPLATE) ?? '';
  const tileTemplate = files.get(SELECTION_TILE_TEMPLATE) ?? '';
  const tokens = files.get(SELECTION_TOKENS) ?? '';
  const styles = files.get(SELECTION_CONTENT_STYLES) ?? '';

  if (
    !contracts.includes("readonly mode: 'system';") ||
    !contracts.includes('readonly token: ErpSystemColorToken;') ||
    !contracts.includes("readonly mode: 'free';") ||
    !contracts.includes('readonly value: string;')
  ) {
    errors.push(
      'ColorPicker: exact system-token/free-color value union is required',
    );
  }

  if (
    !content.includes('ERP_SYSTEM_COLOR_FAMILIES') ||
    !content.includes('ERP_SYSTEM_COLOR_STEPS') ||
    !content.includes('ERP_SYSTEM_COLOR_PALETTES') ||
    !content.includes("registerFrameAction('confirm'") ||
    !content.includes("registerFrameAction('cancel'") ||
    !content.includes("registerFrameAction('clear-selected'") ||
    !content.includes("updateFrameActionState('clear-selected'") ||
    !content.includes("updateFrameActionState('confirm'") ||
    !content.includes('confirmEnabled = computed(') ||
    !content.includes('if (!this.confirmEnabled())') ||
    !content.includes('activeIndex = signal<number | null>(null)') ||
    content.includes('setColorMode(') ||
    content.includes('colorMode = signal<') ||
    template.includes('data-system-colors-mode') ||
    template.includes('data-free-color-mode') ||
    !template.includes('<erp-selection-tile') ||
    !template.includes('<erp-tooltip') ||
    template.includes('data-confirm-action') ||
    template.includes('data-cancel-action') ||
    template.includes('selection-actions') ||
    !template.includes('presentation="list"') ||
    /<button\b/.test(template)
  ) {
    errors.push(
      'Selection picker: generated system colors, shared frame actions, SelectionTile, Tooltip, and no duplicate footer or raw buttons are required',
    );
  }

  if (
    (content.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).length > 1 ||
    /const\s+[A-Z0-9_]*(?:COLOR|PALETTE)[A-Z0-9_]*\s*=\s*\[/.test(
      content,
    )
  ) {
    errors.push(
      'ColorPicker: a hand-maintained color palette is forbidden; use the generated Foundation registry',
    );
  }

  if ((tileTemplate.match(/<button\b/g) ?? []).length !== 1) {
    errors.push('SelectionTile must own exactly one native button root');
  }

  for (const slug of SELECTION_CONTROL_SLUGS) {
    const source = files.get(`src/app/controls/${slug}/${slug}.ts`) ?? '';

    if (
      slug === 'color-picker' &&
      (
        !source.includes("readonly mode = input<ErpColorPickerMode>('system')") ||
        !source.includes('colorMode: this.mode()') ||
        !source.includes('normalized?.mode === this.mode()')
      )
    ) {
      errors.push(
        'color-picker: instance-owned system/free mode contract is required',
      );
    }

    if (
      !source.includes(
        'readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null)',
      ) ||
      !source.includes('...(this.overlayConfig() ?? {})')
    ) {
      errors.push(`${slug}: typed Overlay behavior pass-through is required`);
    }
  }

  for (const token of [
    '--honesty-selection-picker-tile-size:',
    '--honesty-selection-picker-tile-bg:',
    '--honesty-selection-picker-tile-bg-hover:',
    '--honesty-selection-picker-tile-bg-selected:',
    '--honesty-selection-picker-tile-border-color-selected:',
    '--honesty-selection-picker-tile-disabled-opacity:',
    '--honesty-selection-picker-swatch-border-width:',
    '--honesty-selection-picker-swatch-border-style:',
    '--honesty-selection-picker-swatch-border-color:',
  ]) {
    if (!tokens.includes(token)) {
      errors.push(`SelectionPicker tokens must declare ${token}`);
    }
  }

  if (
    !tokens.includes('--honesty-selection-picker-tile-size: 4rem;') ||
    !styles.includes(
      'grid-template-columns: repeat(auto-fill, var(--honesty-selection-picker-tile-size))',
    )
  ) {
    errors.push(
      'IconPicker: fixed equal tile geometry must remain tokenized and content-independent',
    );
  }

  return errors;
}

function runSelfTest() {
  const valid = new Map([
    [
      'src/app/controls/input-family/internal/field-frame.html',
      '<erp-field-feedback />',
    ],
    [
      'src/app/controls/input-family/internal/field-frame.scss',
      'color: var(--honesty-field-frame-fg);',
    ],
    [
      'src/styles/foundation/components/field-frame/_tokens.scss',
      '--honesty-field-frame-fg: var(--honesty-color-text-primary);',
    ],
    [
      'src/app/controls/text-box/text-box.html',
      '<input type="text" />',
    ],
    [FIELD_TRIGGER_TEMPLATE, '<button type="button"></button>'],
  ]);

  for (const slug of FIELD_TRIGGER_CONSUMERS) {
    valid.set(
      `src/app/controls/${slug}/${slug}.html`,
      '<erp-field-trigger></erp-field-trigger>',
    );
  }

  if (validate(valid).length > 0) {
    throw new Error('ErpField checker rejected valid internal fixtures');
  }

  if (validateFieldTriggerContracts(valid).length > 0) {
    throw new Error('ErpField checker rejected valid trigger fixtures');
  }

  const validValidationFiles = new Map([
    [
      INPUT_CONTRACTS,
      [
        "'null'",
        "'empty'",
        "'no-selection'",
        "'invalid-entry'",
        "'valid-entry'",
        'export interface ErpInputValidationIssue',
        'readonly code: string;',
        'readonly message: string;',
        'readonly source: ErpInputValidationSource;',
        'export interface ErpInputValidationSnapshot',
        'readonly errors: readonly string[];',
        'readonly issues: readonly ErpInputValidationIssue[];',
      ].join('\n'),
    ],
    [
      INPUT_BASE_SOURCE,
      [
        'readonly required = input(false, {transform: booleanAttribute});',
        'externalValidationIssues',
        'readonly validationIssues = computed',
        'readonly valid = computed',
        'readonly inputState = computed',
        'readonly errors = computed',
        'readonly validation = computed',
        'protected validationCandidate()',
        'protected classifyPresence',
        'protected validateCandidate',
        'protected validationIssue',
      ].join('\n'),
    ],
    [
      FIELD_BASE_SOURCE,
      [
        'readonly clearable = input(true, {transform: booleanAttribute});',
        'effectiveFieldStatus = computed<ErpFieldStatus>',
        'effectiveFeedbackText = computed',
        'effectiveFeedbackVisible = computed',
      ].join('\n'),
    ],
    [
      'src/styles/foundation/components/field-frame/_tokens.scss',
      '--honesty-field-frame-hover-bg:',
    ],
    [
      FIELD_HOVER_STYLE,
      [
        "[data-field-variant='ghost']",
        "[data-field-variant='text']",
        "[data-field-border-mode='underline']",
        'var(--honesty-field-frame-hover-bg)',
      ].join('\n'),
    ],
    [
      'src/app/controls/url-box/url-box.ts',
      "'url.format' this.commitUserValue(value); النص المُدخل ليس عنوان رابط إلكتروني صالحًا.",
    ],
    [
      'src/app/controls/tel-box/tel-box.ts',
      "'tel.plus-count' 'tel.plus-position' 'tel.too-short' this.commitUserValue(value);",
    ],
    [
      'src/app/controls/number-box/number-box.ts',
      "'number.min' 'number.max' 'number.step' 'number.format' draftActive",
    ],
    [
      MONEY_BOX_SOURCE,
      "'money.min' 'money.max' 'money.step' 'money.format' draftActive",
    ],
    [
      FILE_SELECTION_BASE,
      "minFiles = input<number | null>(null) 'files.min-count' 'files.max-count' 'files.type' 'files.max-size'",
    ],
  ]);

  if (validateUnifiedInputValidationContracts(validValidationFiles).length > 0) {
    throw new Error('ErpField checker rejected valid unified validation fixtures');
  }

  const invalidValidationFiles = new Map(validValidationFiles);
  invalidValidationFiles.set(
    INPUT_BASE_SOURCE,
    (invalidValidationFiles.get(INPUT_BASE_SOURCE) ?? '').replace(
      'readonly validationIssues = computed',
      '',
    ),
  );
  if (
    validateUnifiedInputValidationContracts(invalidValidationFiles).length === 0
  ) {
    throw new Error(
      'ErpField checker accepted missing unified validation substrate',
    );
  }

  const validRangeFiles = new Map([
    [
      RANGE_SLIDER_SOURCE,
      [
        'showValueTooltip = input(true',
        'valueTooltipPlacement = input<ErpTooltipPlacement>',
        'valueTooltipFormatter',
        'activeThumb = signal<ErpRangeSliderThumb | null>(null)',
        'tooltipText(thumb: ErpRangeSliderThumb)',
        'handlePointerDown(thumb: ErpRangeSliderThumb)',
      ].join('\n'),
    ],
    [
      RANGE_SLIDER_TEMPLATE,
      [
        '[min]="min()" [max]="max()"',
        '[min]="min()" [max]="max()"',
        'data-range-tooltip-anchor="lower"',
        'data-range-tooltip-anchor="upper"',
        '[style.inset-inline-start]="lowerPosition() + \'%\'"',
        '[style.inset-inline-start]="upperPosition() + \'%\'"',
        '[open]="showValueTooltip() && activeThumb() === \'lower\'"',
        '[open]="showValueTooltip() && activeThumb() === \'upper\'"',
      ].join('\n'),
    ],
    [
      RANGE_SLIDER_STYLE,
      [
        '.range-slider__rail { inset-inline: calc(var(--honesty-range-slider-thumb-size) / 2); }',
        '.range-slider__tooltip-track { inset-inline: calc(var(--honesty-range-slider-thumb-size) / 2); }',
      ].join('\n'),
    ],
  ]);

  if (validateRangeSliderCorrectionContracts(validRangeFiles).length > 0) {
    throw new Error('ErpField checker rejected valid RangeSlider fixtures');
  }

  const invalidRangeFiles = new Map(validRangeFiles);
  invalidRangeFiles.set(
    RANGE_SLIDER_TEMPLATE,
    (invalidRangeFiles.get(RANGE_SLIDER_TEMPLATE) ?? '').replace(
      '[max]="max()"',
      '[max]="currentValue().upper"',
    ),
  );
  if (validateRangeSliderCorrectionContracts(invalidRangeFiles).length === 0) {
    throw new Error('ErpField checker accepted mismatched RangeSlider geometry');
  }

  const validFileBase = `
export abstract class ErpFileSelectionBase extends ErpFieldBase<readonly File[]> {
  accept = input<string | null>(null);
  maxFileSize = input<number | null>(null);
  minFiles = input<number | null>(null);
  maxFiles = input<number | null>(null);
  issues = ["files.min-count", "files.max-count"];
  clearable = input(true, {transform: booleanAttribute});
  handleNativeSelection() { inputElement.value = ''; }
  handleDrop() {}
  removeFile() {}
  clearAll() {}
  identity(file) { return [file.name, file.size, file.lastModified, file.type]; }
}`;
  const validFileSource =
    'export class ErpFilePicker extends ErpFileSelectionBase {}';
  const validFileTemplate =
    '<input type="file" multiple (drop)="handleDrop($event)"><erp-tooltip><erp-icon-button data-file-picker-remove /></erp-tooltip>';
  const validFileTokens =
    '--honesty-file-picker-drop-zone-border-style: var(--honesty-border-style-dashed); --honesty-file-picker-item-bg-hover: var(--honesty-color-action-primary-subtle-bg-hover); --honesty-file-picker-item-border-color-hover: var(--honesty-border-default); --honesty-file-picker-transition-duration: var(--honesty-motion-duration-fast);';
  const validFileStyles =
    '.file-picker__item:hover, .file-picker__item:focus-within {} @media (prefers-reduced-motion: reduce) {}';
  const validImageSource = `
export class ErpImagePicker extends ErpFileSelectionBase {
  accept = input<string | null>('image/*');
  previewSize = input<ErpImagePickerPreviewSize>('md');
  create(file) { URL.createObjectURL(file); }
  revoke(url) { URL.revokeObjectURL(url); }
}`;
  const validImageTemplate =
    '<input type="file" multiple><erp-icon-button data-image-picker-remove />';
  const validImageTokens =
    '@mixin preview-size-sm {} @mixin preview-size-md {} @mixin preview-size-lg {} --honesty-image-picker-item-bg-hover: var(--honesty-color-action-primary-subtle-bg-hover); --honesty-image-picker-item-border-color-hover: var(--honesty-border-default); --honesty-image-picker-transition-duration: var(--honesty-motion-duration-fast);';
  const validImageStyles =
    '.image-picker__item:hover, .image-picker__item:focus-within {} @media (prefers-reduced-motion: reduce) {}';

  if (
    validateFileSelectionContracts(
      validFileBase,
      validFileSource,
      validFileTemplate,
      validFileTokens,
      validFileStyles,
      validImageSource,
      validImageTemplate,
      validImageTokens,
      validImageStyles,
    ).length > 0
  ) {
    throw new Error('ErpField checker rejected valid File/Image fixtures');
  }

  if (
    validateFileSelectionContracts(
      `${validFileBase}\nHttpClient`,
      validFileSource,
      validFileTemplate.replace(' multiple', ''),
      validFileTokens,
      validFileStyles,
      validImageSource,
      validImageTemplate,
      validImageTokens,
      validImageStyles,
    ).length === 0
  ) {
    throw new Error('ErpField checker accepted invalid File/Image fixtures');
  }

  const validCheckTemplate =
    '<input type="checkbox"><span class="check-box__visual"><erp-icon name="check" /><erp-icon name="minus" /></span>';
  const validCheckTokens =
    '--honesty-check-box-control-size: 1rem; --honesty-check-box-mark-size: 0.75rem; --honesty-check-box-transition-duration: var(--honesty-motion-duration-fast);';
  const validCheckStyles =
    ".check-box__native:focus-visible {} :host([data-check-box-checked='true']) {} :host([data-check-box-indeterminate='true']) {} @media (prefers-reduced-motion: reduce) {}";
  const validRadioTemplate =
    '<input type="radio"><span class="radio-box__visual"><span class="radio-box__dot"></span></span>';
  const validRadioTokens =
    '--honesty-radio-box-control-size: 1rem; --honesty-radio-box-dot-size: 0.5rem; --honesty-radio-box-transition-duration: var(--honesty-motion-duration-fast);';
  const validRadioStyles =
    ".radio-box__native:focus-visible {} :host([data-radio-box-checked='true']) {} @media (prefers-reduced-motion: reduce) {}";

  if (
    validateChoiceVisualContracts(
      validCheckTemplate,
      validCheckTokens,
      validCheckStyles,
      validRadioTemplate,
      validRadioTokens,
      validRadioStyles,
    ).length > 0
  ) {
    throw new Error('ErpField checker rejected valid choice visual fixtures');
  }

  if (
    validateChoiceVisualContracts(
      `${validCheckTemplate}<svg></svg>`,
      validCheckTokens,
      validCheckStyles,
      validRadioTemplate.replace('radio-box__dot', 'missing-dot'),
      validRadioTokens,
      validRadioStyles,
    ).length === 0
  ) {
    throw new Error('ErpField checker accepted invalid choice visual fixtures');
  }

  const validTemporalFiles = new Map([
    [
      DOMAIN_VALIDATION,
      "ERP_DATE_FINAL_PATTERN = '^\\\\d{4}-\\\\d{2}-\\\\d{2}$'; ERP_TIME_FINAL_PATTERN = '^\\\\d{2}:\\\\d{2}$'; ERP_DATE_TIME_FINAL_PATTERN = '^\\\\d{4}-\\\\d{2}-\\\\d{2}T\\\\d{2}:\\\\d{2}$';",
    ],
    [
      TEMPORAL_CONTENT_SOURCE,
      "rangeAnchor = signal(null); rangePreviewCandidate = signal<string | null>(null); orderRange(); updateKeyboardPreview(); registerFrameAction('confirm'); registerFrameAction('cancel'); registerFrameAction('today'); registerFrameAction('now'); registerFrameAction('past-7-days'); registerFrameAction('next-7-days'); registerFrameAction('past-30-days'); registerFrameAction('next-30-days'); registerFrameAction('clear'); updateFrameActionState('confirm'); if (!this.hasValidConfirmation()) updateFrameActionState('clear'); updateFrameActionState('today'); revealSelectedTime(); scrollIntoView?.();",
    ],
    [
      TEMPORAL_CONTENT_TEMPLATE,
      '<div (pointerleave)="clearRangePreview()"><span (pointerenter)="previewDate(date)">{{ data.actionLabels.previousMonth }}</span></div>',
    ],
    [TEMPORAL_TOKENS, TEMPORAL_REQUIRED_TOKENS.join('\n')],
    [TEMPORAL_CONTRACTS, "now: 'الآن'; past7Days: 'آخر 7 أيام'; next7Days: '7 أيام بدءًا من اليوم'; past30Days: 'آخر 30 يومًا'; next30Days: '30 يومًا بدءًا من اليوم';"],
  ]);
  for (const slug of TEMPORAL_CONTROL_SLUGS) {
    const bounded =
      slug === 'date-time-box' || slug === 'date-range-box'
        ? 'readonly min = input<string | null>(null); readonly max = input<string | null>(null); '
        : '';
    validTemporalFiles.set(
      `src/app/controls/${slug}/${slug}.ts`,
      `${bounded}readonly locale = input('ar-EG'); readonly placeholder = input('اختر'); readonly pattern = input<string | null>(null); readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null); resolveDomainPattern(); commitPickerResult();`,
    );
    validTemporalFiles.set(
      `src/app/controls/${slug}/${slug}.html`,
      '<erp-field-trigger />',
    );
  }
  if (validateTemporalCorrectionContracts(validTemporalFiles).length > 0) {
    throw new Error('ErpField checker rejected valid temporal fixtures');
  }
  validTemporalFiles.set(
    TEMPORAL_CONTENT_TEMPLATE,
    `${validTemporalFiles.get(TEMPORAL_CONTENT_TEMPLATE)}<erp-button data-confirm-action />`,
  );
  if (validateTemporalCorrectionContracts(validTemporalFiles).length === 0) {
    throw new Error('ErpField checker accepted duplicate temporal footer chrome');
  }
  validTemporalFiles.set(
    TEMPORAL_CONTENT_TEMPLATE,
    '<div (pointerleave)="clearRangePreview()"><span (pointerenter)="previewDate(date)">{{ data.actionLabels.previousMonth }}</span></div>',
  );

  const validSelectionFiles = new Map([
    [
      SELECTION_CONTRACTS,
      "readonly mode: 'system'; readonly token: ErpSystemColorToken; readonly mode: 'free'; readonly value: string;",
    ],
    [
      SELECTION_CONTENT_SOURCE,
      "ERP_SYSTEM_COLOR_FAMILIES ERP_SYSTEM_COLOR_STEPS ERP_SYSTEM_COLOR_PALETTES registerFrameAction('confirm') registerFrameAction('cancel') registerFrameAction('clear-selected') updateFrameActionState('clear-selected') updateFrameActionState('confirm') confirmEnabled = computed( if (!this.confirmEnabled()) activeIndex = signal<number | null>(null)",
    ],
    [
      SELECTION_CONTENT_TEMPLATE,
      '<erp-selection-tile presentation="list"><erp-tooltip></erp-tooltip></erp-selection-tile>',
    ],
    [SELECTION_TILE_TEMPLATE, '<button type="button"></button>'],
    [
      SELECTION_CONTENT_STYLES,
      'grid-template-columns: repeat(auto-fill, var(--honesty-selection-picker-tile-size));',
    ],
    [
      SELECTION_TOKENS,
      [
        '--honesty-selection-picker-tile-size: 4rem;',
        '--honesty-selection-picker-tile-bg:',
        '--honesty-selection-picker-tile-bg-hover:',
        '--honesty-selection-picker-tile-bg-selected:',
        '--honesty-selection-picker-tile-border-color-selected:',
        '--honesty-selection-picker-tile-disabled-opacity:',
        '--honesty-selection-picker-swatch-border-width:',
        '--honesty-selection-picker-swatch-border-style:',
        '--honesty-selection-picker-swatch-border-color:',
      ].join('\n'),
    ],
  ]);
  for (const slug of SELECTION_CONTROL_SLUGS) {
    const colorModeContract =
      slug === 'color-picker'
        ? "readonly mode = input<ErpColorPickerMode>('system'); colorMode: this.mode(); normalized?.mode === this.mode(); "
        : '';
    validSelectionFiles.set(
      `src/app/controls/${slug}/${slug}.ts`,
      `${colorModeContract}readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null); ...(this.overlayConfig() ?? {})`,
    );
  }
  if (validateSelectionCorrectionContracts(validSelectionFiles).length > 0) {
    throw new Error('ErpField checker rejected valid selection fixtures');
  }
  validSelectionFiles.set(
    SELECTION_CONTENT_TEMPLATE,
    '<erp-selection-tile presentation="list"><erp-tooltip></erp-tooltip></erp-selection-tile><erp-button data-cancel-action />',
  );
  if (validateSelectionCorrectionContracts(validSelectionFiles).length === 0) {
    throw new Error('ErpField checker accepted duplicate selection footer chrome');
  }
  validSelectionFiles.set(
    SELECTION_CONTENT_TEMPLATE,
    '<button type="button"></button>',
  );
  if (validateSelectionCorrectionContracts(validSelectionFiles).length === 0) {
    throw new Error('ErpField checker accepted invalid selection fixtures');
  }
  validSelectionFiles.set(
    SELECTION_CONTENT_TEMPLATE,
    '<erp-selection-tile><erp-tooltip></erp-tooltip></erp-selection-tile>',
  );
  validSelectionFiles.set(
    SELECTION_CONTENT_SOURCE,
    'ERP_SYSTEM_COLOR_FAMILIES ERP_SYSTEM_COLOR_STEPS ERP_SYSTEM_COLOR_PALETTES const LOCAL_PALETTE = ["#ffffff"];',
  );
  if (validateSelectionCorrectionContracts(validSelectionFiles).length === 0) {
    throw new Error('ErpField checker accepted a duplicate ColorPicker palette');
  }

  const validNumericEditors = new Map([
    [NUMBER_BOX_TEMPLATE, '<input type="text" inputmode="decimal">'],
    [NUMBER_STEPPER_TEMPLATE, '<input type="text" inputmode="decimal">'],
    [
      MONEY_BOX_SOURCE,
      "readonly digitSet = input<DigitSet | null>(null); this.digitSet() ?? resolveContextualPreference(this.digitPreference(), 'money')",
    ],
  ]);
  if (validateNumericEditorContracts(validNumericEditors).length > 0) {
    throw new Error('ErpField checker rejected valid numeric editors');
  }
  validNumericEditors.set(
    NUMBER_STEPPER_TEMPLATE,
    '<input type="number">',
  );
  if (validateNumericEditorContracts(validNumericEditors).length === 0) {
    throw new Error('ErpField checker accepted a browser spinner regression');
  }

  const validArabicDefaults = new Map([
    [
      TEMPORAL_CONTRACTS,
      [
        'الشهر السابق',
        'الشهر التالي',
        'اليوم',
        'الآن',
        'آخر 7 أيام',
        '7 أيام بدءًا من اليوم',
        'آخر 30 يومًا',
        '30 يومًا بدءًا من اليوم',
        'مسح',
        'إلغاء',
        'تأكيد',
        'الساعة',
        'الدقيقة',
      ].map((value) => `'${value}'`).join(' '),
    ],
    [
      SELECTION_CONTRACTS,
      [
        'ألوان النظام',
        'لون حر',
        'لم يتم اختيار قيمة',
        'بحث',
        'مسح',
        'إلغاء',
        'تأكيد',
      ].map((value) => `'${value}'`).join(' '),
    ],
    [INPUT_SHOWCASE, '<erp-text>عناصر الإدخال</erp-text>'],
    [OVERLAY_SHOWCASE, '<erp-text>منتقيات الاختيار</erp-text>'],
  ]);
  if (validateArabicFirstDefaults(validArabicDefaults).length > 0) {
    throw new Error('ErpField checker rejected valid Arabic-first defaults');
  }
  validArabicDefaults.set(
    INPUT_SHOWCASE,
    '<erp-text>Control family</erp-text>',
  );
  if (validateArabicFirstDefaults(validArabicDefaults).length === 0) {
    throw new Error('ErpField checker accepted stale English-only showcase copy');
  }
  validTemporalFiles.set(
    'src/app/controls/date-box/date-box.ts',
    (validTemporalFiles.get('src/app/controls/date-box/date-box.ts') ?? '')
      .replace("'ar-EG'", "'en-US'"),
  );
  if (validateTemporalCorrectionContracts(validTemporalFiles).length === 0) {
    throw new Error('ErpField checker accepted invalid temporal fixtures');
  }

  const invalidTriggerFixtures = new Map(valid);
  invalidTriggerFixtures.set(
    'src/app/controls/date-box/date-box.html',
    '<button type="button"></button>',
  );

  if (validateFieldTriggerContracts(invalidTriggerFixtures).length === 0) {
    throw new Error('ErpField checker accepted a raw picker trigger');
  }

  const invalidFixtures = [
    new Map([
      ['src/app/showcase/x.html', '<erp-field-frame />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<erp-field-feedback />'],
    ]),
    new Map([
      [
        'src/app/showcase/x.ts',
        "import {ErpFieldBase} from '../controls/input-family/field-base';",
      ],
    ]),
    new Map([
      [
        'src/app/showcase/x.scss',
        'color: var(--honesty-field-frame-fg);',
      ],
    ]),
    new Map([
      [
        'src/app/showcase/x.html',
        '<erp-tooltip data-validation-feedback="true" />',
      ],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="text" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<textarea></textarea>'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<select></select>'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="color" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="checkbox" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="radio" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="number" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="range" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="file" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="date" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="time" />'],
    ]),
    new Map([
      ['src/app/showcase/x.html', '<input type="datetime-local" />'],
    ]),
  ];

  for (const [index, fixture] of invalidFixtures.entries()) {
    if (validate(fixture).length === 0) {
      throw new Error(
        `ErpField checker accepted invalid fixture ${index + 1}`,
      );
    }
  }

  const validTokenSource = [
    '@mixin base {',
    '  --honesty-field-frame-glass-surface-mix: 100%;',
    '}',
    '@mixin appearance-glass {',
    '  --honesty-field-frame-glass-surface-mix: 72%;',
    '  --honesty-field-frame-bg: var(--honesty-color-surface-glass);',
    '  --honesty-field-frame-glass-border-color: var(--honesty-color-surface-glass-border);',
    '  --honesty-field-frame-glass-highlight-color: var(--honesty-color-surface-glass-highlight);',
    '}',
  ].join('\n');
  const validStyleSource = [
    ':host {',
    '  --_honesty-field-frame-focus-inline-start: var(--honesty-field-frame-focus-start);',
    '  --_honesty-field-frame-focus-inline-end: var(--honesty-field-frame-focus-end);',
    '}',
    ":host-context([dir='rtl']) {",
    '  --_honesty-field-frame-focus-inline-start: var(--honesty-field-frame-focus-end);',
    '}',
    '.glass {',
    '  background: color-mix(in srgb, red var(--honesty-field-frame-glass-surface-mix), transparent);',
    '  border-color: var(--honesty-field-frame-glass-border-color);',
    '  box-shadow: var(--honesty-field-frame-glass-highlight-color);',
    '}',
  ].join('\n');

  if (
    validateFieldRenderingContracts(
      validTokenSource,
      validStyleSource,
    ).length > 0
  ) {
    throw new Error(
      'ErpField checker rejected valid rendering contracts',
    );
  }

  const validHitAreaSource = [
    "'(click)': 'handleControlSurfaceClick($event)'",
    'handleControlSurfaceClick(event: MouseEvent)',
    "target.closest('.field-frame__control')",
    '[field-leading-action]',
    '[field-domain-action]',
    '[field-trailing]',
    'this.controlId()',
    'control instanceof HTMLInputElement',
    'control instanceof HTMLTextAreaElement',
    'control instanceof HTMLButtonElement',
    'control.focus();',
    'control.click();',
    "this.configurationState() !== 'ready'",
  ].join('\n');
  const validHitAreaTemplate = [
    '<div class="field-frame__control">',
    '<span class="field-frame__value">',
    '<ng-content select="[field-control]"></ng-content>',
  ].join('\n');
  const validHitAreaStyle = [
    '.field-frame__value',
    'flex: 1 1 auto;',
    'inline-size: 100%;',
  ].join('\n');

  if (
    validateFieldHitAreaContract(
      validHitAreaSource,
      validHitAreaTemplate,
      validHitAreaStyle,
    ).length > 0
  ) {
    throw new Error('ErpField checker rejected valid hit-area fixtures');
  }

  for (const [index, source] of [
    validHitAreaSource.replace('control.click();', ''),
    validHitAreaSource.replace('[field-domain-action]', ''),
    validHitAreaSource.replace(
      "'(click)': 'handleControlSurfaceClick($event)'",
      '',
    ),
  ].entries()) {
    if (
      validateFieldHitAreaContract(
        source,
        validHitAreaTemplate,
        validHitAreaStyle,
      ).length === 0
    ) {
      throw new Error(
        `ErpField checker accepted invalid hit-area fixture ${index + 1}`,
      );
    }
  }

  const validFeedbackCaretStyle = [
    '.field-feedback__caret {',
    '  border-top: 1px solid currentColor;',
    '  border-left: 1px solid currentColor;',
    '  transform: rotate(45deg);',
    '}',
  ].join('\n');

  if (
    validateFieldFeedbackCaretContract(validFeedbackCaretStyle).length > 0
  ) {
    throw new Error('ErpField checker rejected valid feedback caret fixture');
  }

  for (const [index, style] of [
    validFeedbackCaretStyle.replace('border-top:', 'border-bottom:'),
    validFeedbackCaretStyle.replace('border-left:', 'border-inline-start:'),
  ].entries()) {
    if (validateFieldFeedbackCaretContract(style).length === 0) {
      throw new Error(
        `ErpField checker accepted invalid feedback caret fixture ${index + 1}`,
      );
    }
  }

  for (const [index, fixture] of [
    [
      validTokenSource.replace('72%', '70%'),
      validStyleSource,
    ],
    [
      validTokenSource,
      validStyleSource.replace(
        'var(--honesty-field-frame-glass-surface-mix)',
        '72%',
      ),
    ],
    [
      validTokenSource,
      validStyleSource.replace(":host-context([dir='rtl'])", ':host'),
    ],
  ].entries()) {
    if (validateFieldRenderingContracts(...fixture).length === 0) {
      throw new Error(
        'ErpField checker accepted invalid rendering fixture ' +
          (index + 1),
      );
    }
  }

  const validSearchSource = [
    "mode = input<ErpSearchBoxMode>('dropdown')",
    'items = input<readonly ErpSearchBoxOption[]>([])',
    'dismissOnOutside = input(true, {transform: booleanAttribute})',
    'dismissOnEscape = input(true, {transform: booleanAttribute})',
    'showDefaultSearchIcon = input(true, {transform: booleanAttribute})',
    "enterAnimation = input<ErpOverlayAnimation>('fade-scale')",
    "exitAnimation = input<ErpOverlayAnimation>('fade-scale')",
    'AnchoredOverlayController ErpOverlayManager ErpSelectionPickerContent ErpOverlayAnimation',
    "filteredItems = computed(",
    "query = signal('')",
    'this.commitUserValue(item.value)',
    "trigger.closest<HTMLElement>('.field-frame__control')",
    "surface.style.setProperty('--_honesty-search-box-popup-trigger-inline-size', anchor.getBoundingClientRect().width)",
    "this.popupPhase.set('leaving')",
    'setTimeout(() => this.finishClose())',
    'this.controller?.hide();',
    'this.removeFromOpenStack();',
    'this.openModal()',
    'this.closeDropdown(true)',
    'surface.inert = true',
    "surface.style.pointerEvents = 'none';",
    "surface.setAttribute('aria-hidden', 'true');",
    'this.restoreTriggerFocus();',
  ].join('\n');
  const validSearchTemplate = [
    '<erp-field-trigger></erp-field-trigger>',
    '<div popover="manual">',
    '  <input role="combobox">',
    '  <div role="listbox"><erp-selection-tile presentation="list" data-search-result></erp-selection-tile></div>',
    '  <erp-icon-button class="search-box__close" />',
    '</div>',
    "@if (mode() === 'inline') {}",
    "@if (mode() === 'dropdown') {}",
  ].join('\n');
  const validSearchTokens = `@mixin base {\n${[...new Map([
    ['bg', 'var(--honesty-color-surface-elevated)'],
    ['fg', 'var(--honesty-color-text-primary)'],
    ['border-color', 'var(--honesty-border-subtle)'],
    ['border-width', 'var(--honesty-border-width-default)'],
    ['border-style', 'var(--honesty-border-style-default)'],
    ['radius', 'var(--honesty-radius-overlay)'],
    ['elevation', 'var(--honesty-elevation-overlay)'],
    ['layer', 'var(--honesty-layer-overlay)'],
    ['anchor-gap', 'var(--honesty-space-inline-default)'],
    ['viewport-inset', 'var(--honesty-space-inset-tight)'],
    ['padding', 'var(--honesty-space-inset-default)'],
    ['content-gap', 'var(--honesty-space-stack-tight)'],
    ['min-inline-size', '20rem'],
    ['max-inline-size', '36rem'],
    ['max-block-size', '28rem'],
    ['enter-duration', 'var(--honesty-motion-duration-default)'],
    ['exit-duration', 'var(--honesty-motion-duration-fast)'],
    ['enter-easing', 'var(--honesty-motion-easing-enter)'],
    ['exit-easing', 'var(--honesty-motion-easing-exit)'],
    ['motion-opacity', '0'],
    ['motion-transform', 'scale(0.96)'],
    ['motion-slide-distance', '0.5rem'],
    ['reduced-duration', 'var(--honesty-motion-duration-instant)'],
  ])].map(
    ([slot, value]) =>
      `--honesty-search-box-popup-${slot}: ${value};`,
  ).join('\n')}\n}`;
  const validSearchStyles = [
    ...[
      'fade',
      'scale',
      'fade-scale',
      'slide-up',
      'slide-down',
      'slide-start',
      'slide-end',
    ].map((animation) => `data-search-box-animation='${animation}'`),
    "dir='rtl'",
    'prefers-reduced-motion: reduce',
    'var(--honesty-search-box-popup-max-block-size)',
    '.search-box__popup { inline-size: min( var(--_honesty-search-box-popup-trigger-inline-size) }',
    '.search-box__popup:popover-open { display: grid; }',
    ".search-box__popup[data-search-popup-phase='leaving']",
    'pointer-events: none;',
  ].join('\n');

  if (
    validateSearchBoxPopupContracts(
      validSearchSource,
      validSearchTemplate,
      validSearchTokens,
      validSearchStyles,
    ).length > 0
  ) {
    throw new Error('ErpField checker rejected valid SearchBox popup fixtures');
  }

  for (const [index, fixture] of [
    [
      validSearchSource.replace('ErpOverlayManager', ''),
      validSearchTemplate,
      validSearchTokens,
      validSearchStyles,
    ],
    [
      validSearchSource,
      validSearchTemplate.replace('popover="manual"', ''),
      validSearchTokens,
      validSearchStyles,
    ],
    [
      validSearchSource,
      validSearchTemplate,
      validSearchTokens.replace('36rem', '40rem'),
      validSearchStyles,
    ],
    [
      validSearchSource,
      validSearchTemplate,
      validSearchTokens,
      validSearchStyles.replace('pointer-events: none;', ''),
    ],
    [
      validSearchSource,
      validSearchTemplate,
      validSearchTokens,
      validSearchStyles.replace(
        '.search-box__popup {',
        '.search-box__popup { display: grid;',
      ),
    ],
    [
      validSearchSource,
      validSearchTemplate,
      validSearchTokens,
      validSearchStyles.replace(
        '.search-box__popup:popover-open { display: grid; }',
        '',
      ),
    ],
  ].entries()) {
    if (validateSearchBoxPopupContracts(...fixture).length === 0) {
      throw new Error(
        `ErpField checker accepted invalid SearchBox fixture ${index + 1}`,
      );
    }
  }

  const validInventory = new Map([
    [INPUT_SHOWCASE, ''],
    [OVERLAY_SHOWCASE, ''],
    [FIELD_CONTRACT, ''],
    [BUTTON_CONTRACT, ''],
  ]);

  for (const [className, slug, showcase] of PROGRAM_PUBLIC_CONTROLS) {
    const componentRoot = `src/app/controls/${slug}/${slug}`;
    validInventory.set(
      `${componentRoot}.ts`,
      `export class ${className} {}`,
    );
    validInventory.set(`${componentRoot}.html`, '');
    validInventory.set(`${componentRoot}.scss`, '');
    validInventory.set(`${componentRoot}.spec.ts`, '');
    validInventory.set(`${TOKEN_ROOT}${slug}/_tokens.scss`, '');
    validInventory.set(`${TOKEN_ROOT}${slug}/_index.scss`, '');
    validInventory.set(
      showcase,
      `${validInventory.get(showcase)}<erp-${slug} />`,
    );
    validInventory.set(
      FIELD_CONTRACT,
      `${validInventory.get(FIELD_CONTRACT)} ${className}`,
    );
  }

  const validDocumentation =
    (validInventory.get(FIELD_CONTRACT) ?? '') +
    (validInventory.get(BUTTON_CONTRACT) ?? '');
  if (
    validateProgramControlInventory(
      validInventory,
      validDocumentation,
    ).length > 0
  ) {
    throw new Error('ErpField checker rejected valid program inventory');
  }

  const invalidInventory = new Map(validInventory);
  invalidInventory.delete('src/app/controls/text-box/text-box.spec.ts');
  if (
    validateProgramControlInventory(
      invalidInventory,
      validDocumentation,
    ).length === 0
  ) {
    throw new Error('ErpField checker accepted incomplete program inventory');
  }

  console.log('ErpField governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map(
  [
    ...walk(SOURCE_ROOT),
    ...walk(path.join(ROOT, 'src', 'styles', 'foundation', 'components')),
  ]
    .filter((file) => /\.(?:ts|html|scss)$/.test(file))
    .map((file) => [
      normalize(path.relative(ROOT, file)),
      fs.readFileSync(file, 'utf8'),
    ]),
);

const errors = validate(files);
errors.push(...validateUnifiedInputValidationContracts(files));
errors.push(...validateRangeSliderCorrectionContracts(files));
errors.push(...validateFieldTriggerContracts(files));
errors.push(...validateNumericEditorContracts(files));
errors.push(...validateArabicFirstDefaults(files));
errors.push(
  ...validateProgramControlInventory(
    files,
    fs.readFileSync(path.join(ROOT, FIELD_CONTRACT), 'utf8') +
      fs.readFileSync(path.join(ROOT, BUTTON_CONTRACT), 'utf8'),
  ),
);
errors.push(
  ...validateFileSelectionContracts(
    files.get(FILE_SELECTION_BASE) ?? '',
    files.get(FILE_PICKER_SOURCE) ?? '',
    files.get(FILE_PICKER_TEMPLATE) ?? '',
    files.get(FILE_PICKER_TOKENS) ?? '',
    files.get(FILE_PICKER_STYLES) ?? '',
    files.get(IMAGE_PICKER_SOURCE) ?? '',
    files.get(IMAGE_PICKER_TEMPLATE) ?? '',
    files.get(IMAGE_PICKER_TOKENS) ?? '',
    files.get(IMAGE_PICKER_STYLES) ?? '',
  ),
);
errors.push(
  ...validateChoiceVisualContracts(
    files.get(CHECK_BOX_TEMPLATE) ?? '',
    files.get(CHECK_BOX_TOKENS) ?? '',
    CHECK_BOX_STYLES.map((file) => files.get(file) ?? '').join('\n'),
    files.get(RADIO_BOX_TEMPLATE) ?? '',
    files.get(RADIO_BOX_TOKENS) ?? '',
    RADIO_BOX_STYLES.map((file) => files.get(file) ?? '').join('\n'),
  ),
);
errors.push(...validateTemporalCorrectionContracts(files));
errors.push(...validateSelectionCorrectionContracts(files));
errors.push(
  ...validateSearchBoxPopupContracts(
    files.get(SEARCH_BOX_SOURCE) ?? '',
    files.get(SEARCH_BOX_TEMPLATE) ?? '',
    files.get(SEARCH_BOX_TOKENS) ?? '',
    SEARCH_BOX_STYLES.map((file) => files.get(file) ?? '').join('\n'),
  ),
);
const fieldFrameStyleSource = componentStyleSources(
  files,
  FIELD_FRAME_SOURCE,
  FIELD_FRAME_STYLE,
);

errors.push(
  ...validateFieldRenderingContracts(
    fs.readFileSync(
      path.join(
        ROOT,
        'src',
        'styles',
        'foundation',
        'components',
        'field-frame',
        '_tokens.scss',
      ),
      'utf8',
    ),
    fieldFrameStyleSource,
  ),
);
errors.push(
  ...validateFieldHitAreaContract(
    files.get(FIELD_FRAME_SOURCE) ?? '',
    files.get(FIELD_FRAME_TEMPLATE) ?? '',
    fieldFrameStyleSource,
  ),
);
errors.push(
  ...validateFieldFeedbackCaretContract(
    files.get(FIELD_FEEDBACK_STYLE) ?? '',
  ),
);

if (errors.length > 0) {
  console.error('ErpField governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpField governance check passed.');
