import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, 'src', 'app');
const INTERNAL_ROOT = 'src/app/controls/input-family/internal/';
const CONTROLS_ROOT = 'src/app/controls/';
const TOKEN_ROOT = 'src/styles/foundation/components/';

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
      /<erp-field-(?:frame|feedback)\b/.test(source)
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
      /<(?:textarea\b|input\b[^>]*\btype\s*=\s*['"](?:text|password|search|url|tel|checkbox|radio|number|range|file)['"])/i.test(
        source,
      )
    ) {
      errors.push(
        normalized +
          ': native input authoring must use the matching ERP control',
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
  ]);

  if (validate(valid).length > 0) {
    throw new Error('ErpField checker rejected valid internal fixtures');
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
