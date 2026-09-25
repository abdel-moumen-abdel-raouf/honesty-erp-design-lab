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
errors.push(
  ...validateProgramControlInventory(
    files,
    fs.readFileSync(path.join(ROOT, FIELD_CONTRACT), 'utf8') +
      fs.readFileSync(path.join(ROOT, BUTTON_CONTRACT), 'utf8'),
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
