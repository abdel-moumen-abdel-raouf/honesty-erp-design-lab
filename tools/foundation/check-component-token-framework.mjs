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

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (match) => ' '.repeat(match.length))
    .replace(/\/\/[^\n\r]*/g, (match) => ' '.repeat(match.length));
}

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function collectMixins(source, label) {
  const mixins = [];

  const pattern =
    /@mixin\s+([a-z][a-z0-9-]*)(?:\s*\([^)]*\))?\s*\{/g;

  let match;

  while ((match = pattern.exec(source)) !== null) {
    const openIndex = source.indexOf('{', match.index);
    const closeIndex = findMatchingBrace(source, openIndex);

    if (closeIndex === -1) {
      throw new Error(`${label}: unclosed @mixin ${match[1]}`);
    }

    mixins.push({
      name: match[1],
      start: match.index,
      end: closeIndex + 1,
      body: source.slice(openIndex + 1, closeIndex),
    });

    pattern.lastIndex = closeIndex + 1;
  }

  return mixins;
}

function maskRanges(source, ranges) {
  const chars = [...source];

  for (const {start, end} of ranges) {
    for (let index = start; index < end; index += 1) {
      chars[index] = ' ';
    }
  }

  return chars.join('');
}

function publicDeclarations(source) {
  return [
    ...source.matchAll(/(--honesty-[a-z0-9-]+)\s*:/g),
  ].map((match) => match[1]);
}

function privateDeclarations(source) {
  return [
    ...source.matchAll(
      /(--_honesty-[a-z0-9-]+)\s*:\s*([^;]+);/g,
    ),
  ].map((match) => ({
    token: match[1],
    value: match[2],
  }));
}

function validateSource(component, source, label) {
  const errors = [];

  const ownPrefix = `--honesty-${component}-`;
  const ownPrivatePrefix = `--_honesty-${component}-`;

  const sanitized = stripComments(source);
  const mixins = collectMixins(sanitized, label);

  const baseMixins = mixins.filter(
    (mixin) => mixin.name === 'base',
  );

  if (baseMixins.length !== 1) {
    errors.push(
      `${label}: expected exactly one @mixin base, found ${baseMixins.length}`,
    );
  }

  const usePattern =
    /@use\s+['"]([^'"]+)['"](?:\s+as\s+[a-zA-Z0-9_*.-]+)?\s*;/g;

  const useMatches = [
    ...sanitized.matchAll(usePattern),
  ];

  for (const match of useMatches) {
    const specifier = normalize(match[1]);

    if (specifier.startsWith('sass:')) {
      continue;
    }

    if (/(^|\/)reference$/.test(specifier)) {
      errors.push(
        `${label}: importing the Reference root is forbidden`,
      );

      continue;
    }

    const referenceMatch = specifier.match(
      /(?:^|\/)reference\/([a-z0-9-]+)$/,
    );

    if (!referenceMatch) {
      errors.push(
        `${label}: Sass import "${specifier}" is not allowed`,
      );

      continue;
    }

    if (
      !ALLOWED_REFERENCE_CATEGORIES.has(
        referenceMatch[1],
      )
    ) {
      errors.push(
        `${label}: Reference category "${referenceMatch[1]}" is not allowed`,
      );
    }
  }

  const withoutMixins = maskRanges(
    sanitized,
    mixins.map(({start, end}) => ({
      start,
      end,
    })),
  );

  const withoutAllowedUses =
    withoutMixins.replace(usePattern, '');

  if (withoutAllowedUses.trim().length > 0) {
    errors.push(
      `${label}: top-level output/statements outside @use and @mixin are forbidden`,
    );
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
    if (sanitized.includes(needle)) {
      errors.push(
        `${label}: ${description} are forbidden`,
      );
    }
  }

  if (
    /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color-mix)\s*\(/.test(
      sanitized,
    )
  ) {
    errors.push(
      `${label}: raw color literals/functions are forbidden`,
    );
  }

  if (/@media\b|@container\b/.test(sanitized)) {
    errors.push(
      `${label}: raw media/container queries are forbidden`,
    );
  }

  if (
    /:root\b|\bhtml\b|\bbody\b|\[data-theme(?:=|\])/.test(
      sanitized,
    )
  ) {
    errors.push(
      `${label}: global/theme selectors are forbidden`,
    );
  }

  if (/!important|::ng-deep/.test(sanitized)) {
    errors.push(
      `${label}: !important / ::ng-deep are forbidden`,
    );
  }

  if (
    /var\(\s*--honesty-[a-z0-9-]+\s*,/.test(
      sanitized,
    )
  ) {
    errors.push(
      `${label}: required-token CSS fallbacks are forbidden`,
    );
  }

  const declarations =
    publicDeclarations(sanitized);

  for (const token of declarations) {
    if (!token.startsWith(ownPrefix)) {
      errors.push(
        `${label}: declaration "${token}" is outside component namespace "${ownPrefix}"`,
      );
    }
  }

  const baseTokens = new Set(
    baseMixins.length === 1
      ? publicDeclarations(baseMixins[0].body)
      : [],
  );

  if (
    baseMixins.length === 1 &&
    baseTokens.size === 0
  ) {
    errors.push(
      `${label}: @mixin base must declare at least one public Component Token`,
    );
  }

  for (const mixin of mixins) {
    const bodyWithoutTokenDeclarations =
      mixin.body.replace(
        /--_?honesty-[a-z0-9-]+\s*:\s*[^;]+;/gs,
        '',
      );

    if (
      bodyWithoutTokenDeclarations.trim().length > 0
    ) {
      errors.push(
        `${label}: @mixin ${mixin.name} may emit only Component Token custom-property declarations`,
      );
    }

    if (mixin.name === 'base') {
      continue;
    }

    if (
      !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)+$/.test(
        mixin.name,
      )
    ) {
      errors.push(
        `${label}: facet mixin "${mixin.name}" must use <facet>-<value> kebab-case naming`,
      );
    }

    for (
      const token of publicDeclarations(
        mixin.body,
      )
    ) {
      if (!baseTokens.has(token)) {
        errors.push(
          `${label}: facet mixin "${mixin.name}" introduces "${token}" outside @mixin base`,
        );
      }
    }
  }

  const runtimeReferences = [
    ...sanitized.matchAll(
      /var\(\s*(--honesty-[a-z0-9-]+)/g,
    ),
  ].map((match) => match[1]);

  for (const token of runtimeReferences) {
    const allowed =
      token.startsWith(ownPrefix) ||
      SEMANTIC_PREFIXES.some(
        (prefix) => token.startsWith(prefix),
      );

    if (!allowed) {
      errors.push(
        `${label}: foreign Component Token reference "${token}" is forbidden`,
      );
    }
  }

  for (
    const {token, value}
    of privateDeclarations(sanitized)
  ) {
    if (!token.startsWith(ownPrivatePrefix)) {
      errors.push(
        `${label}: private declaration "${token}" is outside component private namespace "${ownPrivatePrefix}"`,
      );

      continue;
    }

    const publicRefs = [
      ...value.matchAll(
        /var\(\s*(--honesty-[a-z0-9-]+)/g,
      ),
    ].map((match) => match[1]);

    if (
      publicRefs.length === 0 ||
      publicRefs.some(
        (ref) => !ref.startsWith(ownPrefix),
      )
    ) {
      errors.push(
        `${label}: private variable "${token}" must derive only from own Component Tokens`,
      );
    }

    if (value.includes('$honesty-ref-')) {
      errors.push(
        `${label}: private variable "${token}" must not consume Reference primitives directly`,
      );
    }
  }

  const privateReferences = [
    ...sanitized.matchAll(
      /var\(\s*(--_honesty-[a-z0-9-]+)/g,
    ),
  ].map((match) => match[1]);

  for (const token of privateReferences) {
    if (
      !token.startsWith(ownPrivatePrefix)
    ) {
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
  --honesty-button-height: 2.5rem;
  --_honesty-button-inner-height: calc(var(--honesty-button-height) - 2px);
}

@mixin size-sm {
  --honesty-button-gap: #{spacing.$honesty-ref-space-4};
  --honesty-button-height: 2rem;
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
  --_honesty-input-derived: var(--honesty-button-height);
  --honesty-button-height: 2.5rem;
}
`,
    `
@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}

@mixin size-sm {
  --honesty-button-new-slot: 1rem;
}
`,
    `
@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}

.leak {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}
`,
    `
@use '../input/tokens' as input;

@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}
`,
    `
@mixin base {
  --honesty-button-height: 2.5rem;
  --_honesty-button-derived: var(--honesty-space-inline-default);
}
`,
    `
@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}

@mixin compact {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
}
`,
    `
@mixin base {
  --honesty-button-bg: var(--honesty-color-action-primary-bg);
  color: red;
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

  for (
    const [index, fixture]
    of invalidFixtures.entries()
  ) {
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

  console.log(
    'Component Token framework checker self-test passed.',
  );
}

if (
  process.argv.includes('--self-test')
) {
  runSelfTest();
  process.exit(0);
}

const tokenFiles = walk(
  COMPONENTS_ROOT,
).filter(
  (file) =>
    path.basename(file) === '_tokens.scss',
);

const errors = [];

for (const file of tokenFiles) {
  const component =
    path.basename(path.dirname(file));

  const relative = normalize(
    path.relative(ROOT, file),
  );

  if (
    !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(
      component,
    )
  ) {
    errors.push(
      `${relative}: component directory must use lowercase kebab-case`,
    );

    continue;
  }

  const siblingIndex = path.join(
    path.dirname(file),
    '_index.scss',
  );

  if (!fs.existsSync(siblingIndex)) {
    errors.push(
      `${relative}: missing sibling _index.scss`,
    );
  } else {
    const indexSource = fs.readFileSync(
      siblingIndex,
      'utf8',
    );

    if (
      !/@forward\s+['"]tokens['"]\s*;/.test(
        indexSource,
      )
    ) {
      errors.push(
        `${normalize(path.relative(ROOT, siblingIndex))}: must forward 'tokens'`,
      );
    }
  }

  const source = fs.readFileSync(
    file,
    'utf8',
  );

  errors.push(
    ...validateSource(
      component,
      source,
      relative,
    ),
  );
}

if (errors.length > 0) {
  console.error(
    'Component Token framework check failed:\n',
  );

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `Component Token framework check passed (${tokenFiles.length} concrete token module(s)).`,
);
