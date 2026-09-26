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
const IMAGE_PICKER_SOURCE =
  'src/app/controls/image-picker/image-picker.ts';
const IMAGE_PICKER_TEMPLATE =
  'src/app/controls/image-picker/image-picker.html';
const IMAGE_PICKER_TOKENS =
  'src/styles/foundation/components/image-picker/_tokens.scss';
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
      'popupMode',
      /popupMode\s*=\s*input\(true,\s*\{transform:\s*booleanAttribute\}\)/,
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
    !source.includes('ErpOverlayAnimation')
  ) {
    errors.push(
      'SearchBox: popup must use anchored geometry and the shared animation type',
    );
  }

  if (
    source.includes('ErpOverlayManager') ||
    source.includes('ErpTooltip') ||
    source.includes('--honesty-overlay-') ||
    styleSource.includes('--honesty-overlay-') ||
    tokenSource.includes('--honesty-overlay-')
  ) {
    errors.push(
      'SearchBox: popup must not consume OverlayManager, Tooltip, or Overlay Component Tokens',
    );
  }

  if (
    !/<erp-field-trigger\b/.test(template) ||
    !/popover="manual"/.test(template) ||
    !/<ng-content\s+select="\[search-results\]"/.test(template)
  ) {
    errors.push(
      'SearchBox: popup must use FieldTrigger, manual popover, and generic search-results projection',
    );
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

  if (
    !styleSource.includes("dir='rtl'") ||
    !styleSource.includes('prefers-reduced-motion: reduce') ||
    !styleSource.includes('var(--honesty-search-box-popup-max-block-size)')
  ) {
    errors.push(
      'SearchBox: popup styles must retain RTL motion, reduced motion, and viewport-capped sizing',
    );
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
  imageSource,
  imageTemplate,
  imageTokens,
) {
  const errors = [];
  const baseRequirements = [
    'export abstract class ErpFileSelectionBase',
    'extends ErpFieldBase<',
    'readonly File[]',
    'accept = input<string | null>(null)',
    'maxFileSize = input<number | null>(null)',
    'maxFiles = input<number | null>(null)',
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
    !fileTokens.includes('var(--honesty-border-style-dashed)')
  ) {
    errors.push(
      'FilePicker: multi-file drop zone, Tooltip removal, and dashed token contract are required',
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
    !imageTokens.includes('@mixin preview-size-lg')
  ) {
    errors.push(
      'ImagePicker: multi-image, stable Object URL, removal, and preview-size contracts are required',
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

  const content = files.get(TEMPORAL_CONTENT_SOURCE) ?? '';
  const template = files.get(TEMPORAL_CONTENT_TEMPLATE) ?? '';
  const tokens = files.get(TEMPORAL_TOKENS) ?? '';
  if (
    !content.includes('rangeAnchor = signal(') ||
    !content.includes('rangePreviewCandidate = signal<string | null>(null)') ||
    !content.includes('orderRange(') ||
    !content.includes('updateKeyboardPreview(') ||
    !template.includes('(pointerenter)="previewDate(date)"') ||
    !template.includes('(pointerleave)="clearRangePreview()"') ||
    !template.includes('data.actionLabels.previousMonth') ||
    !template.includes('data.actionLabels.confirm') ||
    TEMPORAL_REQUIRED_TOKENS.some((token) => !tokens.includes(token))
  ) {
    errors.push(
      'Temporal picker: staged anchor/preview/final range, Arabic action contract, and range token slots are required',
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
    !template.includes('<erp-selection-tile') ||
    !template.includes('<erp-tooltip') ||
    /<button\b/.test(template)
  ) {
    errors.push(
      'Selection picker: generated system colors, SelectionTile, Tooltip, and no direct raw buttons are required',
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

  const validFileBase = `
export abstract class ErpFileSelectionBase extends ErpFieldBase<readonly File[]> {
  accept = input<string | null>(null);
  maxFileSize = input<number | null>(null);
  maxFiles = input<number | null>(null);
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
    '--honesty-file-picker-drop-zone-border-style: var(--honesty-border-style-dashed);';
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
    '@mixin preview-size-sm {} @mixin preview-size-md {} @mixin preview-size-lg {}';

  if (
    validateFileSelectionContracts(
      validFileBase,
      validFileSource,
      validFileTemplate,
      validFileTokens,
      validImageSource,
      validImageTemplate,
      validImageTokens,
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
      validImageSource,
      validImageTemplate,
      validImageTokens,
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
      'rangeAnchor = signal(null); rangePreviewCandidate = signal<string | null>(null); orderRange(); updateKeyboardPreview();',
    ],
    [
      TEMPORAL_CONTENT_TEMPLATE,
      '<div (pointerleave)="clearRangePreview()"><span (pointerenter)="previewDate(date)">{{ data.actionLabels.previousMonth }} {{ data.actionLabels.confirm }}</span></div>',
    ],
    [TEMPORAL_TOKENS, TEMPORAL_REQUIRED_TOKENS.join('\n')],
  ]);
  for (const slug of TEMPORAL_CONTROL_SLUGS) {
    validTemporalFiles.set(
      `src/app/controls/${slug}/${slug}.ts`,
      "readonly locale = input('ar-EG'); readonly pattern = input<string | null>(null); readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null); resolveDomainPattern(); commitPickerResult();",
    );
    validTemporalFiles.set(
      `src/app/controls/${slug}/${slug}.html`,
      '<erp-field-trigger />',
    );
  }
  if (validateTemporalCorrectionContracts(validTemporalFiles).length > 0) {
    throw new Error('ErpField checker rejected valid temporal fixtures');
  }

  const validSelectionFiles = new Map([
    [
      SELECTION_CONTRACTS,
      "readonly mode: 'system'; readonly token: ErpSystemColorToken; readonly mode: 'free'; readonly value: string;",
    ],
    [
      SELECTION_CONTENT_SOURCE,
      'ERP_SYSTEM_COLOR_FAMILIES ERP_SYSTEM_COLOR_STEPS ERP_SYSTEM_COLOR_PALETTES',
    ],
    [
      SELECTION_CONTENT_TEMPLATE,
      '<erp-selection-tile><erp-tooltip></erp-tooltip></erp-selection-tile>',
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
      ].join('\n'),
    ],
  ]);
  for (const slug of SELECTION_CONTROL_SLUGS) {
    validSelectionFiles.set(
      `src/app/controls/${slug}/${slug}.ts`,
      'readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null); ...(this.overlayConfig() ?? {})',
    );
  }
  if (validateSelectionCorrectionContracts(validSelectionFiles).length > 0) {
    throw new Error('ErpField checker rejected valid selection fixtures');
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
    'popupMode = input(true, {transform: booleanAttribute})',
    'dismissOnOutside = input(true, {transform: booleanAttribute})',
    'dismissOnEscape = input(true, {transform: booleanAttribute})',
    'showDefaultSearchIcon = input(true, {transform: booleanAttribute})',
    "enterAnimation = input<ErpOverlayAnimation>('fade-scale')",
    "exitAnimation = input<ErpOverlayAnimation>('fade-scale')",
    'AnchoredOverlayController ErpOverlayAnimation',
  ].join('\n');
  const validSearchTemplate = [
    '<erp-field-trigger></erp-field-trigger>',
    '<div popover="manual">',
    '  <ng-content select="[search-results]"></ng-content>',
    '</div>',
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
      validSearchSource.replace('AnchoredOverlayController', 'ErpOverlayManager'),
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
    files.get(IMAGE_PICKER_SOURCE) ?? '',
    files.get(IMAGE_PICKER_TEMPLATE) ?? '',
    files.get(IMAGE_PICKER_TOKENS) ?? '',
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
    fs.readFileSync(
      path.join(
        ROOT,
        'src',
        'app',
        'controls',
        'input-family',
        'internal',
        'field-frame.scss',
      ),
      'utf8',
    ),
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
