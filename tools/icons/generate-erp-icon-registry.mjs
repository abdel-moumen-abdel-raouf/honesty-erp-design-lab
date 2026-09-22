import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT = process.cwd();
const CONTRACTS_FILE = path.join(
  ROOT,
  'src',
  'app',
  'primitives',
  'icon',
  'icon-contracts.ts',
);
const REGISTRY_FILE = path.join(
  ROOT,
  'src',
  'app',
  'primitives',
  'icon',
  'icon-registry.ts',
);

const OUTLINE_MODULES = [
  '@ng-icons/tabler-icons',
  '@ng-icons/lucide',
  '@ng-icons/heroicons/outline',
];

const FILLED_MODULES = [
  '@ng-icons/phosphor-icons/fill',
  '@ng-icons/tabler-icons/fill',
  '@ng-icons/heroicons/solid',
  '@ng-icons/fluent-ui/filled',
];

const ALL_MODULES = [...new Set([...OUTLINE_MODULES, ...FILLED_MODULES])];

const RTL_MIRROR_NAMES = new Set([
  'chevron-start',
  'chevron-end',
  'login',
  'logout',
  'skip-start',
  'skip-end',
]);

const SEMANTIC_CANDIDATES = {
  add: ['PlusCircle', 'CirclePlus', 'AddCircle', 'Plus'],
  'chevron-down': ['ChevronDown', 'CaretDown'],
  'chevron-start': ['ChevronLeft', 'CaretLeft'],
  'chevron-end': ['ChevronRight', 'CaretRight'],
  'chevron-up': ['ChevronUp', 'CaretUp'],
  branches: ['Buildings', 'BuildingMultiple', 'BuildingCommunity'],
  building: ['Building', 'BuildingOffice'],
  check: ['CheckCircle', 'CircleCheck', 'Check'],
  close: ['XCircle', 'CircleX', 'DismissCircle', 'X'],
  copy: ['Copy', 'CopySimple', 'DocumentDuplicate'],
  customer: ['User', 'Person', 'UserCircle'],
  dashboard: ['SquaresFour', 'LayoutGrid', 'Grid', 'Squares2X2', 'GridFour'],
  delete: ['Trash', 'TrashSimple', 'Delete'],
  error: ['XCircle', 'CircleX', 'WarningCircle', 'ExclamationCircle', 'ErrorCircle'],
  eye: ['Eye'],
  'eye-off': ['EyeOff', 'EyeSlash'],
  handshake: ['Handshake'],
  home: ['House', 'Home'],
  info: ['Info', 'InfoCircle', 'CircleInfo'],
  inventory: ['Package', 'Box', 'Cube'],
  layers: ['Stack', 'Layers', 'Layer', 'Square3Stack3D'],
  location: ['MapPin', 'Location'],
  login: ['SignIn', 'LogIn', 'Login', 'ArrowRightOnRectangle', 'ArrowEnterLeft'],
  logout: ['SignOut', 'LogOut', 'Logout', 'ArrowLeftOnRectangle'],
  maintenance: ['Wrench', 'WrenchScrewdriver'],
  menu: ['List', 'Menu', 'Menu2', 'Bars3', 'Navigation'],
  money: ['HandCoins', 'MoneyHand', 'Cash', 'Banknotes'],
  moon: ['Moon'],
  notification: ['Bell', 'Alert'],
  operations: ['Briefcase'],
  people: ['Users', 'People', 'UserGroup'],
  phone: ['Phone', 'Telephone', 'Call'],
  'phone-call': ['PhoneCall', 'TelephoneCall', 'Call', 'Phone'],
  print: ['Printer', 'Print'],
  refresh: ['ArrowsClockwise', 'RefreshCw', 'Refresh', 'ArrowSync'],
  search: ['MagnifyingGlass', 'Search'],
  security: ['UserLock', 'ShieldLock', 'PersonLock', 'Lock'],
  server: ['Server', 'Database', 'ServerStack'],
  settings: ['Gear', 'Settings', 'Cog6Tooth', 'Cog'],
  'shield-check': ['ShieldCheck', 'ShieldCheckmark'],
  'skip-start': ['SkipBack', 'Previous'],
  'skip-end': ['SkipForward', 'Next'],
  success: ['CheckCircle', 'CircleCheck', 'Check'],
  sun: ['Sun', 'WeatherSunny'],
  user: ['User', 'Person'],
  wallet: ['Wallet'],
  warning: ['Warning', 'AlertTriangle', 'ExclamationTriangle', 'Alert'],
  'wifi-off': ['WifiOff', 'WifiSlash', 'SignalSlash'],
  edit: ['PencilSimple', 'Pencil', 'Edit'],
  save: ['FloppyDisk', 'DeviceFloppy', 'Save'],
  upload: ['UploadSimple', 'Upload', 'ArrowUpTray'],
  download: ['DownloadSimple', 'Download', 'ArrowDownTray'],
  filter: ['Funnel', 'Filter'],
  'sort-ascending': ['SortAscending', 'SortAsc', 'BarsArrowUp'],
  'sort-descending': ['SortDescending', 'SortDesc', 'BarsArrowDown'],
  'more-horizontal': ['DotsThree', 'Dots', 'MoreHorizontal', 'EllipsisHorizontal'],
  'more-vertical': ['DotsThreeVertical', 'DotsVertical', 'MoreVertical', 'EllipsisVertical'],
  calendar: ['CalendarBlank', 'Calendar'],
  clock: ['Clock'],
  lock: ['Lock'],
  unlock: ['LockOpen', 'Unlock'],
  mail: ['EnvelopeSimple', 'Envelope', 'Mail'],
  file: ['File'],
  folder: ['Folder'],
  attachment: ['Paperclip', 'Attachment'],
  'external-link': ['ArrowSquareOut', 'ExternalLink', 'ArrowTopRightOnSquare'],
  help: ['Question', 'QuestionMarkCircle', 'HelpCircle', 'CircleHelp'],
  history: ['ClockCounterClockwise', 'History'],
  undo: ['ArrowUUpLeft', 'ArrowBackUp', 'ArrowUturnLeft', 'Undo2', 'Undo'],
  redo: ['ArrowUUpRight', 'ArrowForwardUp', 'ArrowUturnRight', 'Redo2', 'Redo'],
  plus: ['Plus'],
  minus: ['Minus'],
};

function normalizeSemanticCandidate(value) {
  return value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function normalizeVendorExportName(value) {
  let normalized = value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  for (const prefix of ['tabler', 'lucide', 'hero', 'fluent', 'ph']) {
    if (normalized.startsWith(prefix)) {
      normalized = normalized.slice(prefix.length);
      break;
    }
  }

  if (normalized.startsWith('icon')) {
    normalized = normalized.slice('icon'.length);
  }

  let previous = '';

  while (previous !== normalized) {
    previous = normalized;

    normalized = normalized
      .replace(
        /(?:16|20|24|28|32|48)(?:regular|filled|fill|solid|outline|bold|light|thin)?$/,
        '',
      )
      .replace(
        /(?:regular|filled|fill|solid|outline|bold|light|thin)(?:16|20|24|28|32|48)?$/,
        '',
      )
      .replace(/icon$/, '');
  }

  if (normalized.startsWith('icon')) {
    normalized = normalized.slice('icon'.length);
  }

  return normalized;
}

function runNormalizationSelfCheck() {
  const checks = [
    [normalizeSemanticCandidate('Phone'), 'phone'],
    [normalizeSemanticCandidate('PhoneCall'), 'phonecall'],
    [normalizeSemanticCandidate('ShieldCheck'), 'shieldcheck'],
    [normalizeVendorExportName('tablerIconPhone'), 'phone'],
    [normalizeVendorExportName('tablerPhone'), 'phone'],
    [normalizeVendorExportName('lucidePhone'), 'phone'],
    [normalizeVendorExportName('lucidePhoneIcon'), 'phone'],
    [normalizeVendorExportName('heroPhoneIcon'), 'phone'],
    [normalizeVendorExportName('heroPhoneSolid'), 'phone'],
    [normalizeVendorExportName('phPhone'), 'phone'],
    [normalizeVendorExportName('phPhoneRegular'), 'phone'],
    [normalizeVendorExportName('fluentCall24Filled'), 'call'],
  ];

  for (const [actual, expected] of checks) {
    if (actual !== expected) {
      throw new Error(
        `ErpIcon normalization self-check failed: expected "${expected}", received "${actual}"`,
      );
    }
  }
}

function unwrapExpression(expression) {
  let current = expression;

  while (
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }

  return current;
}

function readSemanticNames() {
  const source = fs.readFileSync(CONTRACTS_FILE, 'utf8');
  const sourceFile = ts.createSourceFile(
    CONTRACTS_FILE,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'ERP_ICON_NAMES') {
        continue;
      }

      if (declaration.initializer === undefined) {
        break;
      }

      const initializer = unwrapExpression(declaration.initializer);

      if (!ts.isArrayLiteralExpression(initializer)) {
        break;
      }

      const names = initializer.elements.map((element) => {
        if (!ts.isStringLiteral(element)) {
          throw new Error('ERP_ICON_NAMES must contain only string literals');
        }

        return element.text;
      });

      return names;
    }
  }

  throw new Error('Unable to parse ERP_ICON_NAMES from icon-contracts.ts');
}

function verifyCandidatePlan(semanticNames) {
  const expected = new Set(semanticNames);
  const actual = new Set(Object.keys(SEMANTIC_CANDIDATES));
  const missing = semanticNames.filter((name) => !actual.has(name));
  const extra = [...actual].filter((name) => !expected.has(name));

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      `Semantic candidate plan mismatch. Missing: ${missing.join(', ') || 'none'}. Extra: ${extra.join(', ') || 'none'}.`,
    );
  }
}

async function loadExportIndexes() {
  const entries = await Promise.all(
    ALL_MODULES.map(async (specifier) => {
      const moduleExports = await import(specifier);
      const index = new Map();
      const normalizedExports = [];

      for (const exportName of Object.keys(moduleExports).sort()) {
        if (typeof moduleExports[exportName] !== 'string') {
          continue;
        }

        const normalized = normalizeVendorExportName(exportName);
        normalizedExports.push({exportName, normalized});

        if (!index.has(normalized)) {
          index.set(normalized, exportName);
        }
      }

      return [specifier, {index, normalizedExports}];
    }),
  );

  return new Map(entries);
}

function resolveSource(candidates, modules, exportIndexes) {
  for (const candidate of candidates) {
    const normalizedCandidate = normalizeSemanticCandidate(candidate);

    for (const moduleSpecifier of modules) {
      const exportName = exportIndexes.get(moduleSpecifier)?.index.get(normalizedCandidate);

      if (exportName !== undefined) {
        return {moduleSpecifier, exportName};
      }
    }
  }

  return null;
}

function relatedActualExports(candidates, modules, exportIndexes) {
  const prefixes = candidates
    .map((candidate) => normalizeSemanticCandidate(candidate).slice(0, 4))
    .filter((prefix) => prefix.length > 0);
  const matches = [];

  for (const moduleSpecifier of modules) {
    for (const entry of exportIndexes.get(moduleSpecifier)?.normalizedExports ?? []) {
      if (prefixes.some((prefix) => entry.normalized.includes(prefix))) {
        matches.push(`${moduleSpecifier}: ${entry.exportName}`);
      }
    }
  }

  return matches;
}

function filledModuleOrder(outlineModule) {
  const preferred =
    outlineModule === '@ng-icons/tabler-icons'
      ? '@ng-icons/tabler-icons/fill'
      : outlineModule === '@ng-icons/heroicons/outline'
        ? '@ng-icons/heroicons/solid'
        : null;

  return [preferred, ...FILLED_MODULES].filter(
    (moduleSpecifier, index, modules) =>
      moduleSpecifier !== null && modules.indexOf(moduleSpecifier) === index,
  );
}

function semanticPascalCase(name) {
  return name
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

function reportResolutionFailures(failures) {
  console.error('ErpIcon source resolution failed:\n');

  for (const failure of failures) {
    console.error(`semantic name: ${failure.semanticName}`);
    console.error(`requested style: ${failure.style}`);
    console.error(`candidate concept names tried: ${failure.candidates.join(', ')}`);
    console.error(`approved modules tried: ${failure.modules.join(', ')}`);
    console.error(
      `actual related module exports: ${failure.actualExports.join(', ') || 'none'}`,
    );
    console.error('');
  }
}

function buildImportBlocks(resolutions) {
  const blocks = [];

  for (const moduleSpecifier of ALL_MODULES) {
    const specifiers = [];

    for (const resolution of resolutions) {
      if (resolution.outline.moduleSpecifier === moduleSpecifier) {
        specifiers.push(
          `  ${resolution.outline.exportName} as ${resolution.outlineAlias},`,
        );
      }

      if (resolution.filled.moduleSpecifier === moduleSpecifier) {
        specifiers.push(
          `  ${resolution.filled.exportName} as ${resolution.filledAlias},`,
        );
      }
    }

    if (specifiers.length > 0) {
      blocks.push(`import {\n${specifiers.join('\n')}\n} from '${moduleSpecifier}';`);
    }
  }

  return blocks.join('\n');
}

function buildRegistrySource(resolutions) {
  const imports = buildImportBlocks(resolutions);
  const entries = resolutions
    .map((resolution) => {
      return [
        `  '${resolution.semanticName}': {`,
        `    outlineSvg: ${resolution.outlineAlias},`,
        `    filledSvg: ${resolution.filledAlias},`,
        `    mirrorInRtl: ${resolution.mirrorInRtl},`,
        '  },',
      ].join('\n');
    })
    .join('\n');

  return `${imports}\nimport {ErpIconName} from './icon-contracts';\n\nexport interface ErpIconDefinition {\n  readonly outlineSvg: string;\n  readonly filledSvg: string;\n  readonly mirrorInRtl: boolean;\n}\n\nexport const ERP_ICON_REGISTRY: Readonly<Record<ErpIconName, ErpIconDefinition>> = {\n${entries}\n};\n`;
}

async function generateRegistry() {
  runNormalizationSelfCheck();
  const semanticNames = readSemanticNames();
  verifyCandidatePlan(semanticNames);
  const exportIndexes = await loadExportIndexes();
  const resolutions = [];
  const failures = [];

  for (const semanticName of semanticNames) {
    const candidates = SEMANTIC_CANDIDATES[semanticName];
    const outline = resolveSource(candidates, OUTLINE_MODULES, exportIndexes);

    if (outline === null) {
      failures.push({
        semanticName,
        style: 'outline',
        candidates,
        modules: OUTLINE_MODULES,
        actualExports: relatedActualExports(candidates, OUTLINE_MODULES, exportIndexes),
      });
      continue;
    }

    const filledModules = filledModuleOrder(outline.moduleSpecifier);
    const filled = resolveSource(candidates, filledModules, exportIndexes);

    if (filled === null) {
      failures.push({
        semanticName,
        style: 'filled',
        candidates,
        modules: filledModules,
        actualExports: relatedActualExports(candidates, filledModules, exportIndexes),
      });
      continue;
    }

    const pascalName = semanticPascalCase(semanticName);
    resolutions.push({
      semanticName,
      outline,
      filled,
      outlineAlias: `erp${pascalName}Outline`,
      filledAlias: `erp${pascalName}Filled`,
      mirrorInRtl: RTL_MIRROR_NAMES.has(semanticName),
    });
  }

  if (failures.length > 0) {
    reportResolutionFailures(failures);
    process.exit(1);
  }

  return {
    semanticCount: semanticNames.length,
    source: buildRegistrySource(resolutions),
  };
}

const generated = await generateRegistry();

if (process.argv.includes('--check')) {
  const committed = fs.readFileSync(REGISTRY_FILE, 'utf8').replace(/\r\n/g, '\n');
  const expected = generated.source.replace(/\r\n/g, '\n');

  if (committed !== expected) {
    console.error('ErpIcon generated registry is stale');
    process.exit(1);
  }

  console.log(`ErpIcon generated registry is current (${generated.semanticCount} semantic icons).`);
  process.exit(0);
}

fs.writeFileSync(REGISTRY_FILE, generated.source, 'utf8');
console.log(`ErpIcon registry generated (${generated.semanticCount} semantic icons).`);
