import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CATALOG_PATH = path.join(
  ROOT,
  'src',
  'app',
  'catalog',
  'erp-component-catalog.generated.ts',
);
const OUTPUT_PATH = path.join(
  ROOT,
  'src',
  'app',
  'controls',
  'ERP_COMPONENT_LIFECYCLE_LEDGER_V1.md',
);

const REOPENED_VISUALS = new Map([
  ['ErpEmptyState', 'Product Owner withdrew the earlier accelerated acceptance; exact candidate is reopened.'],
  ['ErpSelect', 'The first exact-reference candidate was rejected; V3 remains pending review.'],
  ['ErpTabs', 'The 302056ad candidate was rejected; the literal reconstruction remains pending review.'],
  ['ErpTable', 'The eddac4a8 candidate was rejected; the full reference experience remains pending review.'],
  ['ErpUserMenu', 'Multiple trigger candidates were rejected; the current three-row candidate remains pending review.'],
]);

const SHELL_OWNERS = new Set([
  'ErpAppFooter',
  'ErpApplicationsMenu',
  'ErpAppShell',
  'ErpBranchSelector',
  'ErpGlobalSearch',
  'ErpMessagesMenu',
  'ErpNotificationBell',
  'ErpQuickActionsBar',
  'ErpSidebar',
  'ErpTopbar',
  'ErpUserMenu',
]);

const INTERNAL_VISUAL_REVIEWED = new Set([
  'ErpAlert',
  'ErpAvatar',
  'ErpAvatarPicker',
  'ErpButton',
  'ErpButtonGroup',
  'ErpColorPicker',
  'ErpComboBox',
  'ErpContainer',
  'ErpDateBox',
  'ErpDateRangeBox',
  'ErpDateTimeBox',
  'ErpDivider',
  'ErpEmptyState',
  'ErpExtendedFab',
  'ErpFab',
  'ErpFabMenu',
  'ErpFilePicker',
  'ErpGrid',
  'ErpIcon',
  'ErpIconPicker',
  'ErpImagePicker',
  'ErpIconButton',
  'ErpInline',
  'ErpItemPicker',
  'ErpMoneyBox',
  'ErpNumberBox',
  'ErpNumberStepper',
  'ErpPasswordBox',
  'ErpRadioBox',
  'ErpRadioGroup',
  'ErpRangeSlider',
  'ErpSearchBox',
  'ErpSection',
  'ErpSelect',
  'ErpSkeleton',
  'ErpStack',
  'ErpStatusBadge',
  'ErpSplitButton',
  'ErpSurface',
  'ErpTabs',
  'ErpTable',
  'ErpTelBox',
  'ErpText',
  'ErpTextAreaBox',
  'ErpTextBox',
  'ErpTimeBox',
  'ErpTooltip',
  'ErpUrlBox',
  'ErpUserMenu',
]);

const CATEGORY_ORDER = new Map([
  ['Primitives', 10],
  ['Inputs / Fields', 20],
  ['Selection', 30],
  ['Actions', 40],
  ['Feedback / Status', 50],
  ['Media / Identity', 60],
  ['Navigation', 70],
  ['Data / Tables', 80],
  ['Forms', 90],
  ['Page Composition', 100],
  ['Application Shell', 110],
  ['Internal Owners', 120],
]);

const PLANNED = [
  {
    identity: 'ErpEntityReview',
    owner: 'planned standalone owner',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'ErpStandardEntityForm review template contract',
    action: 'PLANNED / outside the currently authorized UI-component backlog; no standalone implementation authority.',
  },
  {
    identity: 'Entity Wizard',
    owner: 'planned pattern',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'ErpStepper + Entity Form contracts',
    action: 'PLANNED / business pattern remains closed.',
  },
  {
    identity: 'Workflow engine',
    owner: 'planned system',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'not established',
    action: 'PLANNED / backend and business workflow authority remains closed.',
  },
  {
    identity: 'DataPage',
    owner: 'planned page pattern',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'Table/Data + Page composition',
    action: 'PLANNED / Feature/Page scope remains closed.',
  },
  {
    identity: 'EntityDirectory',
    owner: 'planned page pattern',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'DataPage + entity contracts',
    action: 'PLANNED / Feature/Page scope remains closed.',
  },
  {
    identity: 'EntityDetail',
    owner: 'planned page pattern',
    source: 'src/app/controls/ENTITY_FORM_ENGINE_V1.md',
    dependency: 'Page composition + entity contracts',
    action: 'PLANNED / Feature/Page scope remains closed.',
  },
];

function extractCatalog(source) {
  const declaration = source.indexOf('export const ERP_COMPONENT_CATALOG');
  const start = source.indexOf('= [', declaration) + 2;
  const end = source.indexOf(
    '\n];\n\nexport const ERP_PUBLIC_SHOWCASE_LOADERS',
    start,
  );
  if (declaration < 0 || start < 2 || end < 0) {
    throw new Error('Unable to locate the generated ERP component catalog array.');
  }
  return JSON.parse(source.slice(start, end + 2));
}

function cell(value) {
  return String(value ?? 'none')
    .replaceAll('|', '\\|')
    .replaceAll('\n', ' ');
}

function dependencySummary(entry) {
  return entry.lowerLevelOwners.length > 0
    ? entry.lowerLevelOwners.join(', ')
    : 'none recorded';
}

function referenceFor(entry) {
  if (entry.visualReference) return entry.visualReference;
  if (SHELL_OWNERS.has(entry.className)) {
    return 'src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md';
  }
  if (entry.category === 'Actions') {
    return 'Skodash RTL component-buttons fallback; no component-specific exact reference recorded';
  }
  return 'No binding component-specific reference recorded; current PO authorization permits a labeled original Honesty ERP candidate';
}

function visualState(entry) {
  if (entry.visualStatus === 'ACCEPTED') {
    return ['ACCEPTED / FROZEN', 'Explicit Product Owner acceptance; preserve except verified compatibility fixes.'];
  }
  if (REOPENED_VISUALS.has(entry.className)) {
    return ['REOPENED', REOPENED_VISUALS.get(entry.className)];
  }
  if (entry.classification !== 'PUBLIC ERP COMPONENT') {
    return ['NOT INDEPENDENT', 'Supporting owner is verified through its public consumer; no independent visual approval is inferred.'];
  }
  if (SHELL_OWNERS.has(entry.className)) {
    return ['UNKNOWN / PO REVIEW PENDING', 'Technical and internal visual evidence exists; no Product Owner accept/reject decision is recorded.'];
  }
  if (INTERNAL_VISUAL_REVIEWED.has(entry.className)) {
    return [
      'UNKNOWN / PO REVIEW PENDING',
      'Technical verification and internal browser review are complete; no Product Owner accept/reject decision is recorded.',
    ];
  }
  return ['UNKNOWN', 'Catalog PENDING is not interpreted as unreviewed, rejected, or accepted without an explicit Product Owner record.'];
}

function nextAction(entry, state) {
  if (state === 'ACCEPTED / FROZEN') return 'Preserve the accepted contract; regression-only.';
  if (INTERNAL_VISUAL_REVIEWED.has(entry.className)) {
    return 'Preserve the verified candidate and await consolidated Product Owner visual review.';
  }
  if (state === 'REOPENED') return 'Run binding-reference browser comparison and close known rejection findings in Bottom-Up order.';
  if (entry.classification !== 'PUBLIC ERP COMPONENT') return 'Keep covered by public-owner tests and native-ownership governance.';
  return 'Queue after higher-priority exact/reopened candidates; study reference availability before any visual change.';
}

function buildLedger(catalog) {
  const publicEntries = catalog
    .filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT')
    .sort((left, right) =>
      (CATEGORY_ORDER.get(left.category) ?? 999) - (CATEGORY_ORDER.get(right.category) ?? 999)
      || left.className.localeCompare(right.className),
    );
  const supportingEntries = catalog
    .filter((entry) => entry.classification !== 'PUBLIC ERP COMPONENT')
    .sort((left, right) =>
      left.classification.localeCompare(right.classification)
      || left.className.localeCompare(right.className),
    );

  if (publicEntries.length !== 81 || supportingEntries.length !== 45) {
    throw new Error(
      `Catalog inventory drift: expected 81 public and 45 supporting; received ${publicEntries.length} and ${supportingEntries.length}.`,
    );
  }
  if (publicEntries.filter((entry) => entry.visualStatus === 'ACCEPTED').map((entry) => entry.className).join(',') !== 'ErpCheckBox') {
    throw new Error('Explicit accepted-owner registry drifted from ErpCheckBox-only authority.');
  }

  const publicRows = publicEntries.map((entry) => {
    const [state, evidence] = visualState(entry);
    return `| ${cell(entry.className)} | \`${cell(entry.selector)}\` | ${cell(entry.category)} | IMPLEMENTED / TECHNICAL_VERIFIED | ${cell(state)} | ${cell(evidence)} | ${cell(referenceFor(entry))} | ${cell(dependencySummary(entry))} | \`${cell(entry.showcaseRoute)}\` | ${cell(nextAction(entry, state))} |`;
  });
  const supportingRows = supportingEntries.map((entry) => {
    const [state, evidence] = visualState(entry);
    return `| ${cell(entry.className)} | ${cell(entry.classification)} | ${cell(entry.selector ? `\`${entry.selector}\`` : 'non-rendering')} | IMPLEMENTED / VERIFIED THROUGH OWNER | ${cell(state)} | ${cell(evidence)} | ${cell(entry.sourcePath)} | ${cell(dependencySummary(entry))} | ${cell(nextAction(entry, state))} |`;
  });
  const plannedRows = PLANNED.map((entry) =>
    `| ${cell(entry.identity)} | ${cell(entry.owner)} | PLANNED ONLY | UNKNOWN / NOT REVIEWED AS AN OWNER | ${cell(entry.source)} | ${cell(entry.dependency)} | ${cell(entry.action)} |`,
  );

  return `# Honesty ERP Component Lifecycle Ledger V1

Generated from \`src/app/catalog/erp-component-catalog.generated.ts\` on 2026-10-10.
Run \`npm run erp-component-lifecycle:generate\` after catalog or explicit
Product Owner status changes; \`npm run erp-component-lifecycle:check\` rejects
drift.

## Status interpretation

- Implementation and technical verification come from the generated catalog,
  owner source, dedicated route, tests and the canonical repository gate.
- \`PENDING\` in the generated catalog is not treated as evidence of
  unreviewed, rejected, or accepted visual status.
- \`ACCEPTED / FROZEN\` appears only for explicit Product Owner acceptance.
- \`REOPENED\` records an explicit rejection/withdrawal followed by a current
  candidate. It does not mean the current candidate is accepted.
- Supporting owners are not assigned an independent visual status when they
  exist only under a public owner.

## Resolution summary

- Public owners: **${publicEntries.length}**.
- Supporting catalog entries: **${supportingEntries.length}**.
- Explicitly accepted/frozen public owners: **1** (\`ErpCheckBox\`).
- Explicitly reopened public owners: **${publicEntries.filter((entry) => REOPENED_VISUALS.has(entry.className)).length}**.
- Planned identities outside the implemented catalog: **${PLANNED.length}**.
- Internally reviewed public owners added in the current UI wave:
  **\`ErpRadioBox\`**, **\`ErpRadioGroup\`**, **\`ErpEmptyState\`**, **\`ErpAvatar\`**,
  **\`ErpSelect\`**, **\`ErpStatusBadge\`**, **\`ErpTabs\`**, **\`ErpTable\`**,
  **\`ErpUserMenu\`**, **\`ErpContainer\`**, **\`ErpDivider\`**, **\`ErpGrid\`**,
  **\`ErpInline\`**, **\`ErpSection\`**, **\`ErpStack\`**, **\`ErpSurface\`**,
  **\`ErpIcon\`**, **\`ErpText\`**, **\`ErpTextBox\`**, **\`ErpTextAreaBox\`**,
  **\`ErpPasswordBox\`**, **\`ErpNumberBox\`**, **\`ErpMoneyBox\`**,
  **\`ErpTelBox\`**, **\`ErpUrlBox\`**, **\`ErpNumberStepper\`**,
  **\`ErpRangeSlider\`**, **\`ErpDateBox\`**, **\`ErpTimeBox\`**,
  **\`ErpDateTimeBox\`**, **\`ErpDateRangeBox\`**, **\`ErpSearchBox\`**,
  **\`ErpComboBox\`**, **\`ErpItemPicker\`**, **\`ErpIconPicker\`**,
  **\`ErpColorPicker\`**, **\`ErpFilePicker\`**, **\`ErpImagePicker\`**,
  **\`ErpButton\`**, **\`ErpIconButton\`**, **\`ErpButtonGroup\`**,
  **\`ErpSplitButton\`**, **\`ErpFab\`**, **\`ErpExtendedFab\`**,
  **\`ErpFabMenu\`**, **\`ErpTooltip\`**, **\`ErpAlert\`**, and
  **\`ErpSkeleton\`**. Their
  Product Owner status remains pending.
- All currently recorded binding-reference owners have completed internal
  review, the full public primitive layer has completed internal review, the
  foundational text-like Input/Field family has completed internal review, and
  the generic selection-picker family has completed its item, icon, system
  color, and free-color interaction review, and the local file/image selection
  owners have completed real browser-file review, and the two basic action
  owners have completed live state, output, focus and layout-occupancy review,
  the grouped action composites have completed mixed-action, anchored-menu,
  keyboard and semantic review, and the floating action family has completed
  bounded placement, mixed-menu, popup-semantic, focus-return and viewport
  containment review, Tooltip has completed its plain/rich projection,
  motion-control, popup-semantic, focus-return and containment review, and the
  Alert/Skeleton feedback pair has completed projected action, dismissal,
  responsive anatomy, state, motion and reduced-motion review. The next
  Bottom-Up unit opens **\`ErpColumnChooser\`** and **\`ErpViewSwitcher\`**.

## Public owner inventory

| Owner | Selector | Category | Implementation | Visual status | Status evidence | Binding/current reference | Dependencies | Dedicated route | Next action |
|---|---|---|---|---|---|---|---|---|---|
${publicRows.join('\n')}

## Supporting owner inventory

| Owner | Classification | Selector | Implementation | Visual status | Status evidence | Source | Dependencies | Next action |
|---|---|---|---|---|---|---|---|---|
${supportingRows.join('\n')}

## Documented planned identities outside the catalog

| Identity | Intended ownership | Implementation | Visual status | Source authority | Dependencies | Scope/next action |
|---|---|---|---|---|---|---|
${plannedRows.join('\n')}

## Global acceptance contract

Every public-owner visual unit requires its dedicated one-target workbench,
real input/model/output evidence, equal-viewport browser inspection in the
relevant Light/Dark and RTL/LTR states, focused regression tests, governance,
and \`npm run verify:clean\`. Internal review may record
\`INTERNAL_VISUAL_REVIEW_COMPLETED\`; only an explicit Product Owner decision
may record acceptance or freezing.
`;
}

const catalog = extractCatalog(await fs.readFile(CATALOG_PATH, 'utf8'));
const output = buildLedger(catalog);

if (process.argv.includes('--check')) {
  const current = await fs.readFile(OUTPUT_PATH, 'utf8').catch(() => '');
  if (current !== output) {
    console.error('ERP component lifecycle ledger is stale. Run npm run erp-component-lifecycle:generate.');
    process.exit(1);
  }
  console.log('ERP component lifecycle ledger: PASS (81 public, 45 supporting, 6 planned).');
} else {
  await fs.writeFile(OUTPUT_PATH, output, 'utf8');
  console.log('Generated ERP component lifecycle ledger (81 public, 45 supporting, 6 planned).');
}
