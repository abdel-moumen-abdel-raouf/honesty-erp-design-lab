import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();

const COMPONENTS_ROOT = path.join(
  ROOT,
  'src',
  'styles',
  'foundation',
  'components',
);

const ALLOWED_REFERENCE_CATEGORIES = new Set([
  'spacing',
  'radius',
  'borders',
  'outlines',
  'opacity',
  'typography',
]);

const SEMANTIC_PREFIXES = [
  '--honesty-color-',
  '--honesty-type-',
  '--honesty-space-',
  '--honesty-radius-',
  '--honesty-border-',
  '--honesty-focus-',
  '--honesty-elevation-',
  '--honesty-motion-',
  '--honesty-layer-',
  '--honesty-chart-',
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

function validateSource(component, source, label) {
  const errors = [];
  const ownPrefix = `--honesty-${component}-`;
  const ownPrivatePrefix = `--_honesty-${component}-`;

  if (!/@mixin\s+base\b/.test(source)) {
    errors.push(`${label}: missing required @mixin base`);
  }

  const useSpecifiers = [
    ...source.matchAll(/@use\s+['"]([^'"]+)['"]/g),
  ].map((match) => normalize(match[1]));

  for (const specifier of useSpecifiers) {
    if (/(^|\/)reference$/.test(specifier)) {
      errors.push(`${label}: importing the Reference root is forbidden`);
      continue;
    }

    const referenceMatch = specifier.match(
      /(?:^|\/)reference\/([a-z0-9-]+)$/,
    );

    if (
      referenceMatch &&
      !ALLOWED_REFERENCE_CATEGORIES.has(referenceMatch[1])
    ) {
      errors.push(
        `${label}: Reference category "${referenceMatch[1]}" is not allowed`,
      );
    }
  }

  const forbiddenReferenceUsages = [
    ['$honesty-ref-color-', 'Reference colors'],
    ['$honesty-ref-breakpoints-', 'Reference breakpoints'],
    ['$honesty-ref-elevation-', 'Reference elevation'],
    ['$honesty-ref-motion-', 'Reference motion'],
    ['$honesty-ref-z-index-', 'Reference z-index'],
    ['$honesty-ref-font-family-', 'Reference font families'],
  ];

  for (const [needle, description] of forbiddenReferenceUsages) {
    if (source.includes(needle)) {
      errors.push(`${label}: ${description} are forbidden`);
    }
  }

  if (/#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/.test(source)) {
    errors.push(`${label}: raw color literals/functions are forbidden`);
  }

  if (/@media\b|@container\b/.test(source)) {
    errors.push(`${label}: raw media/container queries are forbidden`);
  }

  if (/:root\b|\bhtml\b|\bbody\b|\[data-theme(?:=|\])/.test(source)) {
    errors.push(`${label}: global/theme selectors are forbidden`);
  }

  if (/!important|::ng-deep/.test(source)) {
    errors.push(`${label}: !important / ::ng-deep are forbidden`);
  }

  if (/var\(\s*--honesty-[a-z0-9-]+\s*,/.test(source)) {
    errors.push(`${label}: required-token CSS fallbacks are forbidden`);
  }

  const publicDeclarations = [
    ...source.matchAll(/(--honesty-[a-z0-9-]+)\s*:/g),
  ].map((match) => match[1]);

  for (const token of publicDeclarations) {
    if (!token.startsWith(ownPrefix)) {
      errors.push(
        `${label}: declaration "${token}" is outside component namespace "${ownPrefix}"`,
      );
    }
  }

  const privateDeclarations = [
    ...source.matchAll(/(--_honesty-[a-z0-9-]+)\s*:/g),
  ].map((match) => match[1]);

  for (const token of privateDeclarations) {
    if (!token.startsWith(ownPrivatePrefix)) {
      errors.push(
        `${label}: private declaration "${token}" is outside component private namespace "${ownPrivatePrefix}"`,
      );
    }
  }

  const runtimeReferences = [
    ...source.matchAll(/var\(\s*(--honesty-[a-z0-9-]+)/g),
  ].map((match) => match[1]);

  for (const token of runtimeReferences) {
    const allowed =
      token.startsWith(ownPrefix) ||
      SEMANTIC_PREFIXES.some((prefix) => token.startsWith(prefix));

    if (!allowed) {
      errors.push(
        `${label}: foreign Component Token reference "${token}" is forbidden`,
      );
    }
  }

  const privateReferences = [
    ...source.matchAll(/var\(\s*(--_honesty-[a-z0-9-]+)/g),
  ].map((match) => match[1]);

  for (const token of privateReferences) {
    if (!token.startsWith(ownPrivatePrefix)) {
      errors.push(
        `${label}: foreign private variable "${token}" is forbidden`,
      );
    }
  }

  return errors;
}

function runSelfTest() {
  const validFixture = `
@use '../../reference/spacing' as spacing;

@mixin base {
  --honesty-button-gap: #{spacing.$honesty-ref-space-8};
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}
`;

  const invalidFixtures = [
    `
@use '../../reference/colors' as colors;

@mixin base {
  --honesty-button-bg: #{colors.$honesty-ref-color-primary-600};
}
`,
    `
@mixin base {
  --honesty-input-bg: var(--honesty-color-surface-default);
}
`,
    `
@mixin base {
  --honesty-button-gap: var(--honesty-input-gap);
}
`,
    `
@mixin base {
  --honesty-button-bg: #ffffff;
}
`,
    `
@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg, red);
}
`,
    `
@mixin base {
  --honesty-button-gap: var(--honesty-space-inline-default);
}

@media (min-width: 700px) {
}
`,
    `
@mixin base {
  --_honesty-input-derived: 1;
}
`,
  ];

  const validErrors = validateSource(
    'button',
    validFixture,
    'self-test valid fixture',
  );

  if (validErrors.length > 0) {
    throw new Error(
      `Component Token checker rejected valid fixture:\n${validErrors.join('\n')}`,
    );
  }

  for (const [index, fixture] of invalidFixtures.entries()) {
    const errors = validateSource(
      'button',
      fixture,
      `self-test invalid fixture ${index + 1}`,
    );

    if (errors.length === 0) {
      throw new Error(
        `Component Token checker accepted invalid fixture ${index + 1}`,
      );
    }
  }

  console.log('Component Token framework checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const tokenFiles = walk(COMPONENTS_ROOT).filter(
  (file) => path.basename(file) === '_tokens.scss',
);

const errors = [];

for (const file of tokenFiles) {
  const component = path.basename(path.dirname(file));
  const relative = normalize(path.relative(ROOT, file));

  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(component)) {
    errors.push(
      `${relative}: component directory must use lowercase kebab-case`,
    );
    continue;
  }

  const siblingIndex = path.join(path.dirname(file), '_index.scss');

  if (!fs.existsSync(siblingIndex)) {
    errors.push(`${relative}: missing sibling _index.scss`);
  } else {
    const indexSource = fs.readFileSync(siblingIndex, 'utf8');

    if (!/@forward\s+['"]tokens['"]\s*;/.test(indexSource)) {
      errors.push(
        `${normalize(path.relative(ROOT, siblingIndex))}: must forward 'tokens'`,
      );
    }
  }

  const source = fs.readFileSync(file, 'utf8');

  errors.push(...validateSource(component, source, relative));
}

if (errors.length > 0) {
  console.error('Component Token framework check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `Component Token framework check passed (${tokenFiles.length} concrete token module(s)).`,
);
