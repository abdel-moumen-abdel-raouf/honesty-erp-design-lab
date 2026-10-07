import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {parseTemplate} from '@angular/compiler';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const CONTROLS_ROOT = path.join(APP_ROOT, 'controls');
const BUTTON_SHOWCASE_FILE = path.join(
  APP_ROOT,
  'showcase',
  'button-controls',
  'button-controls.html',
);
const FORBIDDEN_INPUT_TYPES = new Set(['button', 'submit', 'reset']);
const BUTTON_SHOWCASE_RAW_VISIBLE_ELEMENTS = new Set([
  'div',
  'section',
  'header',
  'footer',
  'main',
  'aside',
  'nav',
  'p',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'button',
  'a',
  'hr',
]);
const RIPPLE_TOKEN_MODULES = [
  {
    file: path.join(
      ROOT,
      'src',
      'styles',
      'foundation',
      'components',
      'button',
      '_tokens.scss',
    ),
    property: '--honesty-button-ripple-duration',
  },
  {
    file: path.join(
      ROOT,
      'src',
      'styles',
      'foundation',
      'components',
      'icon-button',
      '_tokens.scss',
    ),
    property: '--honesty-icon-button-ripple-duration',
  },
  {
    file: path.join(
      ROOT,
      'src',
      'styles',
      'foundation',
      'components',
      'fab',
      '_tokens.scss',
    ),
    property: '--honesty-fab-ripple-duration',
  },
  {
    file: path.join(
      ROOT,
      'src',
      'styles',
      'foundation',
      'components',
      'extended-fab',
      '_tokens.scss',
    ),
    property: '--honesty-extended-fab-ripple-duration',
  },
];
const RIPPLE_DEFAULT_SOURCES = [
  {
    file: path.join(APP_ROOT, 'controls', 'button', 'button.ts'),
    control: 'ErpButton',
  },
  {
    file: path.join(APP_ROOT, 'controls', 'icon-button', 'icon-button.ts'),
    control: 'ErpIconButton',
  },
  {
    file: path.join(APP_ROOT, 'controls', 'fab', 'fab.ts'),
    control: 'ErpFab',
  },
  {
    file: path.join(
      APP_ROOT,
      'controls',
      'extended-fab',
      'extended-fab.ts',
    ),
    control: 'ErpExtendedFab',
  },
];
const FINAL_RIPPLE_MIXINS = [
  ['ripple-speed-fast', 750],
  ['ripple-speed-normal', 1100],
  ['ripple-speed-slow', 1800],
];
const APPROVED_NATIVE_BUTTON_ROOTS = new Set([
  'src/app/controls/button/button.html',
  'src/app/controls/icon-button/icon-button.html',
  'src/app/controls/fab/fab.html',
  'src/app/controls/extended-fab/extended-fab.html',
  'src/app/controls/input-family/internal/field-trigger.html',
  'src/app/controls/selection-family/internal/selection-tile.html',
  'src/app/controls/select/internal/select-action.html',
  'src/app/controls/status-badge/internal/status-badge-action.html',
  'src/app/controls/avatar/internal/avatar-action.html',
  'src/app/controls/avatar-picker/internal/avatar-picker-tile.html',
  'src/app/controls/tabs/internal/tab-trigger.html',
  'src/app/controls/sort-header/internal/sort-trigger.html',
  'src/app/controls/table/internal/table-resize-handle.html',
]);

const BUTTON_COMPOSITE_FILES = [
  'src/app/controls/button/button-attached-segment.scss',
  'src/app/controls/icon-button/icon-button-attached-segment.scss',
  'src/app/controls/button-group/button-group.html',
  'src/app/controls/button-group/button-group.scss',
  'src/app/controls/split-button/split-button.ts',
  'src/app/controls/split-button/split-button.html',
  'src/app/controls/split-button/split-button.scss',
  'src/app/controls/fab-menu/fab-menu.ts',
  'src/app/controls/fab-menu/fab-menu.html',
  'src/app/controls/fab-menu/fab-menu.scss',
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

function relative(file) {
  return normalize(path.relative(ROOT, file));
}

function isExcluded(file) {
  const filePath = relative(file);
  return (
    filePath === 'src/app/app.html' ||
    filePath.startsWith('src/app/foundation/') ||
    filePath.startsWith('src/app/primitives/') ||
    filePath.startsWith('src/app/controls/')
  );
}

function sourceLocation(sourceSpan) {
  const start = sourceSpan?.start;
  return start ? `:${start.line + 1}:${start.col + 1}` : '';
}

function staticAttribute(node, name) {
  return (node.attributes ?? []).find(
    (attribute) => attribute.name.toLowerCase() === name,
  );
}

function boundInput(node, name) {
  return (node.inputs ?? []).find(
    (input) => input.name.toLowerCase() === name,
  );
}

function isPlainNoninteractiveTooltip(node) {
  const variant = staticAttribute(node, 'variant');
  const interactive = staticAttribute(node, 'interactive');

  if (boundInput(node, 'variant') || boundInput(node, 'interactive')) {
    return false;
  }

  if (variant && variant.value.toLowerCase() !== 'plain') {
    return false;
  }

  if (interactive && interactive.value.toLowerCase() !== 'false') {
    return false;
  }

  return true;
}

function validateTemplateSource(source, label) {
  const parsed = parseTemplate(source, label, {preserveWhitespaces: true});
  const errors = [];

  for (const error of parsed.errors ?? []) {
    errors.push(`${label}: Angular template parse error: ${error}`);
  }

  function visit(nodes, inPlainTooltipTrigger = false) {
    for (const node of nodes) {
      const elementName =
        typeof node.name === 'string'
          ? node.name.split(':').at(-1)?.toLowerCase()
          : null;

      if (elementName === 'button') {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: native <button> bypasses ERP Button governance`,
        );
      }

      if (
        (elementName === 'erp-icon-button' || elementName === 'erp-fab') &&
        !inPlainTooltipTrigger
      ) {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: <${elementName}> production usage must be nested in a plain noninteractive <erp-tooltip> trigger`,
        );
      }

      if (elementName === 'input') {
        const type = staticAttribute(node, 'type')?.value.toLowerCase();

        if (FORBIDDEN_INPUT_TYPES.has(type)) {
          errors.push(
            `${label}${sourceLocation(node.sourceSpan)}: static input type="${type}" bypasses ERP Button governance`,
          );
        }
      }

      const role = staticAttribute(node, 'role')?.value.toLowerCase();

      if (role === 'button' && elementName !== null && !elementName.startsWith('erp-')) {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: static role="button" on <${elementName}> bypasses ERP Button governance`,
        );
      }

      let childPlainTooltipTrigger = inPlainTooltipTrigger;

      if (elementName === 'erp-tooltip') {
        childPlainTooltipTrigger = isPlainNoninteractiveTooltip(node);
      } else if (elementName === 'erp-tooltip-content') {
        childPlainTooltipTrigger = false;
      }

      if (Array.isArray(node.children)) {
        visit(node.children, childPlainTooltipTrigger);
      }

      for (const branch of node.branches ?? []) {
        visit(branch.children ?? [], childPlainTooltipTrigger);
      }

      for (const blockCase of node.cases ?? []) {
        visit(blockCase.children ?? [], childPlainTooltipTrigger);
      }

      if (Array.isArray(node.empty?.children)) {
        visit(node.empty.children, childPlainTooltipTrigger);
      }
    }
  }

  visit(parsed.nodes);
  return errors;
}

function validateButtonShowcaseSource(source, label) {
  const parsed = parseTemplate(source, label, {preserveWhitespaces: true});
  const errors = [];

  for (const error of parsed.errors ?? []) {
    errors.push(`${label}: Angular template parse error: ${error}`);
  }

  function visit(nodes) {
    for (const node of nodes) {
      const elementName =
        typeof node.name === 'string'
          ? node.name.split(':').at(-1)?.toLowerCase()
          : null;

      if (
        elementName !== null &&
        BUTTON_SHOWCASE_RAW_VISIBLE_ELEMENTS.has(elementName)
      ) {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: raw visible <${elementName}> is forbidden in Button showcase`,
        );
      }

      if (Array.isArray(node.children)) {
        visit(node.children);
      }

      for (const branch of node.branches ?? []) {
        visit(branch.children ?? []);
      }

      for (const blockCase of node.cases ?? []) {
        visit(blockCase.children ?? []);
      }

      if (Array.isArray(node.empty?.children)) {
        visit(node.empty.children);
      }
    }
  }

  visit(parsed.nodes);
  return errors;
}

function validateControlNativeButtonSource(source, label) {
  if (APPROVED_NATIVE_BUTTON_ROOTS.has(label)) {
    return [];
  }

  const parsed = parseTemplate(source, label, {preserveWhitespaces: true});
  const errors = [];

  for (const error of parsed.errors ?? []) {
    errors.push(`${label}: Angular template parse error: ${error}`);
  }

  function visit(nodes) {
    for (const node of nodes) {
      const elementName =
        typeof node.name === 'string'
          ? node.name.split(':').at(-1)?.toLowerCase()
          : null;

      if (elementName === 'button') {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: concrete Controls and Composites must use an approved internal button primitive`,
        );
      }

      if (Array.isArray(node.children)) {
        visit(node.children);
      }

      for (const branch of node.branches ?? []) {
        visit(branch.children ?? []);
      }

      for (const blockCase of node.cases ?? []) {
        visit(blockCase.children ?? []);
      }

      if (Array.isArray(node.empty?.children)) {
        visit(node.empty.children);
      }
    }
  }

  visit(parsed.nodes);
  return errors;
}

function validateButtonCompositeArchitecture(files) {
  const errors = [];
  const buttonAttached =
    files.get('src/app/controls/button/button-attached-segment.scss') ?? '';
  const iconAttached =
    files.get('src/app/controls/icon-button/icon-button-attached-segment.scss') ?? '';
  const groupTemplate =
    files.get('src/app/controls/button-group/button-group.html') ?? '';
  const groupStyle =
    files.get('src/app/controls/button-group/button-group.scss') ?? '';
  const splitSource =
    files.get('src/app/controls/split-button/split-button.ts') ?? '';
  const splitTemplate =
    files.get('src/app/controls/split-button/split-button.html') ?? '';
  const splitStyle =
    files.get('src/app/controls/split-button/split-button.scss') ?? '';
  const fabSource =
    files.get('src/app/controls/fab-menu/fab-menu.ts') ?? '';
  const fabTemplate =
    files.get('src/app/controls/fab-menu/fab-menu.html') ?? '';
  const fabStyle =
    files.get('src/app/controls/fab-menu/fab-menu.scss') ?? '';

  for (const [label, source] of [
    ['ErpButton', buttonAttached],
    ['ErpIconButton', iconAttached],
  ]) {
    for (const required of [
      "[data-attached-axis='inline'][data-attached-position='first']",
      "[data-attached-axis='inline'][data-attached-position='middle']",
      "[data-attached-axis='inline'][data-attached-position='last']",
      "[data-attached-axis='block'][data-attached-position='first']",
      "[data-attached-axis='block'][data-attached-position='middle']",
      "[data-attached-axis='block'][data-attached-position='last']",
    ]) {
      if (!source.includes(required)) {
        errors.push(`${label}: attached-segment geometry is missing ${required}`);
      }
    }
  }

  for (const required of [
    'data-attached-axis',
    'data-attached-position',
    'attached() ? position(index) : null',
  ]) {
    if (!groupTemplate.includes(required)) {
      errors.push(`ErpButtonGroup: attached template contract is missing ${required}`);
    }
  }

  for (const required of [
    "data-button-group-orientation='horizontal'",
    "data-button-group-orientation='vertical'",
    'separator-inset',
    'separator-width',
  ]) {
    if (!groupStyle.includes(required)) {
      errors.push(`ErpButtonGroup: attached visual seam is missing ${required}`);
    }
  }

  for (const required of [
    'AnchoredOverlayController',
    'AnchoredOverlayGeometryResult',
  ]) {
    if (!splitSource.includes(required)) {
      errors.push(`ErpSplitButton: anchored menu source is missing ${required}`);
    }
  }

  for (const forbidden of ['ErpOverlayManager', 'openLegacyCompactMenu']) {
    if (splitSource.includes(forbidden)) {
      errors.push(`ErpSplitButton: legacy blocking menu dependency remains ${forbidden}`);
    }
  }

  for (const required of [
    'data-attached-position="first"',
    'data-attached-position="last"',
    'popover="manual"',
    'variant="solid"',
    'tone="primary"',
    'shape="default"',
    '<erp-action-menu-content',
  ]) {
    if (!splitTemplate.includes(required)) {
      errors.push(`ErpSplitButton: unified composite template is missing ${required}`);
    }
  }

  for (const required of [
    '.split-button__menu',
    'position: fixed',
    ':popover-open',
    'separator-inset',
  ]) {
    if (!splitStyle.includes(required)) {
      errors.push(`ErpSplitButton: unified/top-layer style is missing ${required}`);
    }
  }

  if (!fabSource.includes('AnchoredOverlayController')) {
    errors.push('ErpFabMenu: actions must use AnchoredOverlayController');
  }

  for (const required of [
    'popover="manual"',
    'data-fab-menu-action',
    'data-fab-menu-trigger',
  ]) {
    if (!fabTemplate.includes(required)) {
      errors.push(`ErpFabMenu: top-layer template is missing ${required}`);
    }
  }

  for (const required of [
    '.fab-menu__actions',
    'position: fixed',
    ':popover-open',
  ]) {
    if (!fabStyle.includes(required)) {
      errors.push(`ErpFabMenu: top-layer style is missing ${required}`);
    }
  }

  return errors;
}

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function mixinSections(source, name) {
  const pattern = new RegExp(`@mixin\\s+${escapeRegExp(name)}\\b`, 'g');
  const matches = [...source.matchAll(pattern)];

  return matches.map((match) => {
    const start = match.index;
    const nextMixin = source.indexOf('@mixin', start + match[0].length);
    return source.slice(start, nextMixin === -1 ? source.length : nextMixin);
  });
}

function validateRippleTokenSource(source, label, property) {
  const errors = [];
  const expectedMixins = FINAL_RIPPLE_MIXINS.map(([name]) => name);
  const actualMixins = [
    ...source.matchAll(/@mixin\s+(ripple-speed-[a-z-]+)\b/g),
  ].map((match) => match[1]);

  if (
    actualMixins.length !== expectedMixins.length ||
    actualMixins.some((name, index) => name !== expectedMixins[index])
  ) {
    errors.push(
      `${label}: Ripple mixins must be exactly ${expectedMixins.join(', ')}`,
    );
  }

  const expectedSections = [
    ['base', 1100],
    ...FINAL_RIPPLE_MIXINS,
  ];
  const propertyPattern = new RegExp(
    `${escapeRegExp(property)}\\s*:\\s*(\\d+)ms\\s*;`,
    'g',
  );

  for (const [mixin, duration] of expectedSections) {
    const sections = mixinSections(source, mixin);

    if (sections.length !== 1) {
      errors.push(
        `${label}: expected exactly one @mixin ${mixin}, found ${sections.length}`,
      );
      continue;
    }

    const declarations = [
      ...sections[0].matchAll(propertyPattern),
    ].map((match) => Number(match[1]));

    if (declarations.length !== 1 || declarations[0] !== duration) {
      errors.push(
        `${label}: @mixin ${mixin} must declare ${property}: ${duration}ms exactly once`,
      );
    }
  }

  const allDeclarations = [...source.matchAll(propertyPattern)];

  if (allDeclarations.length !== expectedSections.length) {
    errors.push(
      `${label}: expected exactly ${expectedSections.length} ${property} declarations, found ${allDeclarations.length}`,
    );
  }

  return errors;
}

function validateRippleDefaultSource(source, label) {
  const errors = [];
  const matches = [
    ...source.matchAll(
      /readonly\s+rippleSpeed\s*=\s*input<ErpRippleSpeed>\(\s*'([^']+)'\s*\)\s*;/g,
    ),
  ];

  if (matches.length !== 1) {
    errors.push(
      `${label}: expected exactly one rippleSpeed ErpRippleSpeed input default, found ${matches.length}`,
    );
    return errors;
  }

  const actualDefault = matches[0][1];

  if (actualDefault !== 'normal') {
    errors.push(
      `${label}: rippleSpeed default must be exactly normal, found ${actualDefault}`,
    );
  }

  return errors;
}

function runSelfTest() {
  const validFixtures = [
    '<erp-button label="Save"></erp-button>',
    `<erp-tooltip text="Settings">
  <erp-icon-button icon="settings" label="Settings"></erp-icon-button>
</erp-tooltip>`,
    `<erp-tooltip text="Add">
  <erp-fab icon="add" label="Add"></erp-fab>
</erp-tooltip>`,
`<erp-tooltip variant="plain" text="Settings">
  <erp-icon-button icon="settings" label="Settings"></erp-icon-button>
</erp-tooltip>`,
  ];
  const invalidFixtures = [
    '<button>Save</button>',
    '<input type="submit">',
    '<div role="button">Action</div>',
    '<erp-icon-button icon="settings" label="Settings"></erp-icon-button>',
    '<erp-fab icon="add" label="Add"></erp-fab>',
    `<erp-tooltip text="Actions">
  <erp-button label="Open"></erp-button>
  <erp-tooltip-content>
    <erp-icon-button icon="settings" label="Settings"></erp-icon-button>
  </erp-tooltip-content>
</erp-tooltip>`,
`<erp-tooltip variant="rich" text="Settings">
  <erp-icon-button icon="settings" label="Settings"></erp-icon-button>
</erp-tooltip>`,
`<erp-tooltip interactive text="Add">
  <erp-fab icon="add" label="Add"></erp-fab>
</erp-tooltip>`,
`<erp-tooltip [variant]="tooltipVariant" text="Settings">
  <erp-icon-button icon="settings" label="Settings"></erp-icon-button>
</erp-tooltip>`,
  ];

  for (const [index, fixture] of validFixtures.entries()) {
    const errors = validateTemplateSource(fixture, `valid fixture ${index + 1}`);

    if (errors.length > 0) {
      throw new Error(
        `ErpButton governance checker rejected valid fixture ${index + 1}:\n${errors.join('\n')}`,
      );
    }
  }

  for (const [index, fixture] of invalidFixtures.entries()) {
    const errors = validateTemplateSource(fixture, `invalid fixture ${index + 1}`);

    if (errors.length === 0) {
      throw new Error(`ErpButton governance checker accepted invalid fixture ${index + 1}`);
    }
  }

  const validShowcaseErrors = validateButtonShowcaseSource(
    '<erp-grid><erp-surface></erp-surface></erp-grid>',
    'valid showcase fixture',
  );

  if (validShowcaseErrors.length > 0) {
    throw new Error(
      `ErpButton governance checker rejected valid showcase fixture:\n${validShowcaseErrors.join('\n')}`,
    );
  }

  const invalidShowcaseErrors = validateButtonShowcaseSource(
    '<erp-grid><div></div></erp-grid>',
    'invalid showcase fixture',
  );

  if (invalidShowcaseErrors.length === 0) {
    throw new Error('ErpButton governance checker accepted invalid showcase fixture');
  }

  const validInternalButtonErrors = [
    'src/app/controls/input-family/internal/field-trigger.html',
    'src/app/controls/selection-family/internal/selection-tile.html',
    'src/app/controls/avatar-picker/internal/avatar-picker-tile.html',
  ].flatMap((file) =>
    validateControlNativeButtonSource(
      '<button type="button">Trigger</button>',
      file,
    ),
  );

  if (validInternalButtonErrors.length > 0) {
    throw new Error(
      `ErpButton governance checker rejected approved internal button root:\n${validInternalButtonErrors.join('\n')}`,
    );
  }

  const invalidConcreteButtonErrors = validateControlNativeButtonSource(
    '<button type="button">Open</button>',
    'src/app/controls/date-box/date-box.html',
  );

  if (invalidConcreteButtonErrors.length === 0) {
    throw new Error(
      'ErpButton governance checker accepted a concrete control raw button',
    );
  }

  const validRippleFixture = `
@mixin base {
  --honesty-button-ripple-duration: 1100ms;
}

@mixin ripple-speed-fast {
  --honesty-button-ripple-duration: 750ms;
}

@mixin ripple-speed-normal {
  --honesty-button-ripple-duration: 1100ms;
}

@mixin ripple-speed-slow {
  --honesty-button-ripple-duration: 1800ms;
}
`;
  const invalidRippleFixtures = [
    `
@mixin base {
  --honesty-button-ripple-duration: 450ms;
}

@mixin ripple-speed-fast {
  --honesty-button-ripple-duration: 300ms;
}

@mixin ripple-speed-normal {
  --honesty-button-ripple-duration: 450ms;
}

@mixin ripple-speed-slow {
  --honesty-button-ripple-duration: 600ms;
}
`,
    `${validRippleFixture}
@mixin ripple-speed-extra {
  --honesty-button-ripple-duration: 1200ms;
}
`,
    validRippleFixture.replace(
      '--honesty-button-ripple-duration: 1100ms;',
      '--honesty-button-ripple-duration: 900ms;',
    ),
  ];
  const validRippleErrors = validateRippleTokenSource(
    validRippleFixture,
    'valid Ripple fixture',
    '--honesty-button-ripple-duration',
  );

  if (validRippleErrors.length > 0) {
    throw new Error(
      `ErpButton governance checker rejected valid Ripple fixture:\n${validRippleErrors.join('\n')}`,
    );
  }

  for (const [index, fixture] of invalidRippleFixtures.entries()) {
    const rippleErrors = validateRippleTokenSource(
      fixture,
      `invalid Ripple fixture ${index + 1}`,
      '--honesty-button-ripple-duration',
    );

    if (rippleErrors.length === 0) {
      throw new Error(
        `ErpButton governance checker accepted invalid Ripple fixture ${index + 1}`,
      );
    }
  }

  const validRippleDefaultFixture =
    "readonly rippleSpeed = input<ErpRippleSpeed>('normal');";
  const invalidRippleDefaultFixtures = [
    "readonly rippleSpeed = input<ErpRippleSpeed>('slow');",
    "readonly rippleSpeed = input<ErpRippleSpeed>('fast');",
    'export class Fixture {}',
    `${validRippleDefaultFixture}
${validRippleDefaultFixture}`,
  ];

  const validRippleDefaultErrors = validateRippleDefaultSource(
    validRippleDefaultFixture,
    'valid Ripple default fixture',
  );

  if (validRippleDefaultErrors.length > 0) {
    throw new Error(
      `ErpButton governance checker rejected valid Ripple default fixture:\n${validRippleDefaultErrors.join('\n')}`,
    );
  }

  for (const [index, fixture] of invalidRippleDefaultFixtures.entries()) {
    const rippleDefaultErrors = validateRippleDefaultSource(
      fixture,
      `invalid Ripple default fixture ${index + 1}`,
    );

    if (rippleDefaultErrors.length === 0) {
      throw new Error(
        `ErpButton governance checker accepted invalid Ripple default fixture ${index + 1}`,
      );
    }
  }

  const validCompositeFiles = new Map([
    [
      'src/app/controls/button/button-attached-segment.scss',
      "[data-attached-axis='inline'][data-attached-position='first'] [data-attached-axis='inline'][data-attached-position='middle'] [data-attached-axis='inline'][data-attached-position='last'] [data-attached-axis='block'][data-attached-position='first'] [data-attached-axis='block'][data-attached-position='middle'] [data-attached-axis='block'][data-attached-position='last']",
    ],
    [
      'src/app/controls/icon-button/icon-button-attached-segment.scss',
      "[data-attached-axis='inline'][data-attached-position='first'] [data-attached-axis='inline'][data-attached-position='middle'] [data-attached-axis='inline'][data-attached-position='last'] [data-attached-axis='block'][data-attached-position='first'] [data-attached-axis='block'][data-attached-position='middle'] [data-attached-axis='block'][data-attached-position='last']",
    ],
    [
      'src/app/controls/button-group/button-group.html',
      'data-attached-axis data-attached-position attached() ? position(index) : null',
    ],
    [
      'src/app/controls/button-group/button-group.scss',
      "data-button-group-orientation='horizontal' data-button-group-orientation='vertical' separator-inset separator-width",
    ],
    [
      'src/app/controls/split-button/split-button.ts',
      'AnchoredOverlayController AnchoredOverlayGeometryResult',
    ],
    [
      'src/app/controls/split-button/split-button.html',
      'data-attached-position="first" data-attached-position="last" popover="manual" variant="solid" tone="primary" shape="default" <erp-action-menu-content',
    ],
    [
      'src/app/controls/split-button/split-button.scss',
      '.split-button__menu position: fixed :popover-open separator-inset',
    ],
    [
      'src/app/controls/fab-menu/fab-menu.ts',
      'AnchoredOverlayController',
    ],
    [
      'src/app/controls/fab-menu/fab-menu.html',
      'popover="manual" data-fab-menu-action data-fab-menu-trigger',
    ],
    [
      'src/app/controls/fab-menu/fab-menu.scss',
      '.fab-menu__actions position: fixed :popover-open',
    ],
  ]);

  if (validateButtonCompositeArchitecture(validCompositeFiles).length > 0) {
    throw new Error('ErpButton governance rejected valid Button composite architecture fixtures');
  }

  for (const [index, invalid] of [
    new Map(validCompositeFiles).set(
      'src/app/controls/button-group/button-group.html',
      'data-attached-axis data-attached-position',
    ),
    new Map(validCompositeFiles).set(
      'src/app/controls/split-button/split-button.ts',
      'ErpOverlayManager openLegacyCompactMenu',
    ),
    new Map(validCompositeFiles).set(
      'src/app/controls/fab-menu/fab-menu.scss',
      '.fab-menu__actions display: flex',
    ),
  ].entries()) {
    if (validateButtonCompositeArchitecture(invalid).length === 0) {
      throw new Error(
        `ErpButton governance accepted invalid Button composite architecture fixture ${index + 1}`,
      );
    }
  }

  console.log('ErpButton governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const htmlFiles = walk(APP_ROOT).filter(
  (file) => file.endsWith('.html') && !isExcluded(file),
);
const errors = [];

for (const file of walk(CONTROLS_ROOT).filter((candidate) =>
  candidate.endsWith('.html'),
)) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(
    ...validateControlNativeButtonSource(source, relative(file)),
  );
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(...validateTemplateSource(source, relative(file)));
}

const buttonShowcaseSource = fs.readFileSync(BUTTON_SHOWCASE_FILE, 'utf8');
errors.push(
  ...validateButtonShowcaseSource(
    buttonShowcaseSource,
    relative(BUTTON_SHOWCASE_FILE),
  ),
);

for (const {file, property} of RIPPLE_TOKEN_MODULES) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(
    ...validateRippleTokenSource(
      source,
      relative(file),
      property,
    ),
  );
}

for (const {file, control} of RIPPLE_DEFAULT_SOURCES) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(
    ...validateRippleDefaultSource(
      source,
      `${control} (${relative(file)})`,
    ),
  );
}

const buttonCompositeFiles = new Map(
  BUTTON_COMPOSITE_FILES.map((file) => [
    file,
    fs.readFileSync(path.join(ROOT, file), 'utf8'),
  ]),
);
errors.push(...validateButtonCompositeArchitecture(buttonCompositeFiles));

if (errors.length > 0) {
  console.error('ErpButton production governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `ErpButton production governance check passed (${htmlFiles.length} HTML template(s)).`,
);
