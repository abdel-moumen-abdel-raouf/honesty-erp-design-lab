import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SMART_TABLE = 'src/app/controls/smart-table/smart-table.ts';
const SMART_TABLE_TEMPLATE = 'src/app/controls/smart-table/smart-table.html';
const DATA_PAGE = 'src/app/controls/data-page/data-page.ts';
const DATA_PAGE_TEMPLATE = 'src/app/controls/data-page/data-page.html';
const CONTRACTS = 'src/app/controls/data-table/data-table-contracts.ts';
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-data-batch/data-batch.html';
const REFERENCE_REVIEW = 'src/app/review-internals/review-core-table/review-core-table.html';
const TABLE_TEMPLATE = 'src/app/controls/table/table.html';
const TABLE_CONTRACT = 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md';
const TABLE_REFERENCE_SHA = '292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1';
const COMPONENTS = [
  'sort-header',
  'column-chooser',
  'filter-bar',
  'filter-drawer',
  'table-toolbar',
  'bulk-action-bar',
  'view-switcher',
  'smart-table',
  'data-page',
];

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

export function validateDataTableContracts(files) {
  const errors = [];
  const source = files.get(SMART_TABLE) ?? '';
  const template = files.get(SMART_TABLE_TEMPLATE) ?? '';
  const dataPage = files.get(DATA_PAGE) ?? '';
  const dataPageTemplate = files.get(DATA_PAGE_TEMPLATE) ?? '';
  const contracts = files.get(CONTRACTS) ?? '';
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const referenceReview = files.get(REFERENCE_REVIEW) ?? '';
  const tableTemplate = files.get(TABLE_TEMPLATE) ?? '';
  const tableContract = files.get(TABLE_CONTRACT) ?? '';

  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(/.test(source)) {
    errors.push('ErpSmartTable must remain transport-agnostic and must not fetch data');
  }
  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(|https?:\/\/|\/api\b/.test(dataPage)) {
    errors.push('ErpDataPage must remain transport-agnostic and consumer controlled');
  }
  for (const owner of ['<erp-page', '<erp-page-shell', '<erp-page-header', '<erp-smart-table']) {
    if (!dataPageTemplate.includes(owner)) errors.push(`ErpDataPage must compose ${owner}`);
  }
  for (const forbidden of ['<table', '<button', '<input', '<select', '<form']) {
    if (dataPageTemplate.includes(forbidden)) errors.push(`ErpDataPage must not bypass ERP owner with ${forbidden}`);
  }

  for (const owner of [
    '<erp-table-toolbar',
    '<erp-column-chooser',
    '<erp-filter-drawer',
    '<erp-filter-bar',
    '<erp-bulk-action-bar',
    '<erp-table',
    '<erp-pagination',
    '<erp-skeleton',
    '<erp-empty-state',
    '<erp-alert',
  ]) {
    if (!template.includes(owner)) {
      errors.push(`ErpSmartTable must compose ${owner}`);
    }
  }

  for (const required of [
    'sortable: column.sortable',
    '[sort]="sort()"',
    '(sortChange)="changeSort($event)"',
  ]) {
    const owner = required === 'sortable: column.sortable' ? source : template;
    if (!owner.includes(required)) {
      errors.push(`ErpSmartTable must delegate sorting through ErpTable: ${required}`);
    }
  }

  if (!/<erp-table[\s\S]*?<ng-content\s*\/>[\s\S]*?<\/erp-table>/.test(template)) {
    errors.push('ErpSmartTable must re-project keyed rich cell templates into ErpTable');
  }

  for (const required of [
    "export type ErpSmartTableMode = 'local' | 'remote'",
    'readonly revision: number',
    'readonly filters: readonly ErpDataFilter[]',
    'readonly visibleColumns: readonly string[]',
  ]) {
    if (!contracts.includes(required)) {
      errors.push(`Data-table contracts are missing ${required}`);
    }
  }

  if (!routes.includes("path: 'controls/data-batch'")) {
    errors.push('The accelerated data-table review route must remain registered');
  }

  if (/<\/?(?:table|thead|tbody|tr|th|td|button|input|select|form)\b/i.test(review)) {
    errors.push('The routed data-table review must remain ERP-only authored');
  }
  if (/<\/?(?:table|thead|tbody|tr|th|td|button|input|select|form)\b/i.test(referenceReview)) {
    errors.push('The exact ERP-TABLE reference experience must remain ERP-only authored');
  }

  for (const owner of [
    'data-table-reference-experience="complete"',
    '<erp-table-toolbar',
    '<erp-search-box',
    '<erp-column-chooser',
    '<erp-table',
    '<erp-pagination',
  ]) {
    if (!referenceReview.includes(owner)) {
      errors.push(`The exact ERP-TABLE reference experience must compose ${owner}`);
    }
  }

  for (const owner of ['<erp-check-box', '<erp-sort-header', '<erp-table-resize-handle']) {
    if (!tableTemplate.includes(owner)) {
      errors.push(`Exact-reference ErpTable must retain lower owner ${owner}`);
    }
  }
  if (!tableContract.includes(TABLE_REFERENCE_SHA) ||
      !tableContract.includes('Separate ownership never means skipped visual evidence')) {
    errors.push('ErpTable must retain the binding full-experience contract and no-skipped-owner rule');
  }

  for (const component of COMPONENTS) {
    const tokenPath = `src/styles/foundation/components/${component}/_tokens.scss`;
    const tokens = files.get(tokenPath) ?? '';
    if (!tokens.includes('@mixin base')) {
      errors.push(`${component} must own a concrete Component Token base mixin`);
    }
  }

  return errors;
}

function fixture(overrides = new Map()) {
  const files = new Map([
    [SMART_TABLE, 'export class ErpSmartTable { sortable: column.sortable }'],
    [SMART_TABLE_TEMPLATE, '<erp-table-toolbar/><erp-column-chooser/><erp-filter-drawer/><erp-filter-bar/><erp-bulk-action-bar/><erp-skeleton/><erp-empty-state/><erp-alert/><erp-table [sort]="sort()" (sortChange)="changeSort($event)"><ng-content /></erp-table><erp-pagination/>'],
    [DATA_PAGE, 'export class ErpDataPage {}'],
    [DATA_PAGE_TEMPLATE, '<erp-page><erp-page-shell><erp-page-header/><erp-smart-table/></erp-page-shell></erp-page>'],
    [CONTRACTS, "export type ErpSmartTableMode = 'local' | 'remote'; readonly revision: number; readonly filters: readonly ErpDataFilter[]; readonly visibleColumns: readonly string[];"],
    [ROUTES, "path: 'controls/data-batch'"],
    [REVIEW, '<erp-smart-table/>'],
    [REFERENCE_REVIEW, '<div data-table-reference-experience="complete"><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/><erp-pagination/></div>'],
    [TABLE_TEMPLATE, '<erp-check-box/><erp-sort-header/><erp-table-resize-handle/>'],
    [TABLE_CONTRACT, `${TABLE_REFERENCE_SHA}; Separate ownership never means skipped visual evidence`],
  ]);
  for (const component of COMPONENTS) {
    files.set(`src/styles/foundation/components/${component}/_tokens.scss`, '@mixin base {}');
  }
  for (const [key, value] of overrides) files.set(key, value);
  return files;
}

function runSelfTest() {
  const failures = [];
  if (validateDataTableContracts(fixture()).length !== 0) failures.push('valid fixture was rejected');
  for (const [label, files, expected] of [
    ['HTTP ownership', fixture(new Map([[SMART_TABLE, 'inject(HttpClient); fetch("/api")']])), 'transport-agnostic'],
    ['missing composition owner', fixture(new Map([[SMART_TABLE_TEMPLATE, '<erp-table><ng-content /></erp-table>']])), 'compose <erp-pagination'],
    ['raw routed table', fixture(new Map([[REVIEW, '<table></table>']])), 'ERP-only'],
    ['raw exact reference control', fixture(new Map([[REFERENCE_REVIEW, '<input/><div data-table-reference-experience="complete"><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/><erp-pagination/></div>']])), 'ERP-only'],
    ['missing exact reference owner', fixture(new Map([[REFERENCE_REVIEW, '<div data-table-reference-experience="complete"><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/></div>']])), 'erp-pagination'],
    ['missing token base', fixture(new Map([['src/styles/foundation/components/smart-table/_tokens.scss', '']])), 'base mixin'],
    ['missing exact Table reference', fixture(new Map([[TABLE_CONTRACT, 'old table reference']])), 'binding full-experience contract'],
  ]) {
    const errors = validateDataTableContracts(files);
    if (!errors.some((error) => error.includes(expected))) failures.push(`${label} fixture was accepted`);
  }
  if (failures.length > 0) {
    console.error(`ERP data-table governance self-test failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP data-table governance self-test: PASS');
}

function runCheck() {
  const files = new Map([
    [SMART_TABLE, read(SMART_TABLE)],
    [SMART_TABLE_TEMPLATE, read(SMART_TABLE_TEMPLATE)],
    [DATA_PAGE, read(DATA_PAGE)],
    [DATA_PAGE_TEMPLATE, read(DATA_PAGE_TEMPLATE)],
    [CONTRACTS, read(CONTRACTS)],
    [ROUTES, read(ROUTES)],
    [REVIEW, read(REVIEW)],
    [REFERENCE_REVIEW, read(REFERENCE_REVIEW)],
    [TABLE_TEMPLATE, read(TABLE_TEMPLATE)],
    [TABLE_CONTRACT, read(TABLE_CONTRACT)],
  ]);
  for (const component of COMPONENTS) {
    const tokenPath = `src/styles/foundation/components/${component}/_tokens.scss`;
    files.set(tokenPath, read(tokenPath));
  }
  const errors = validateDataTableContracts(files);
  if (errors.length > 0) {
    console.error(`ERP data-table governance failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP data-table governance: PASS');
  console.log('9 data/table and page-composition owners verified.');
}

if (process.argv.includes('--self-test')) runSelfTest();
else runCheck();
