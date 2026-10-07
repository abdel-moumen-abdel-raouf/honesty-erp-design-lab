import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SMART_TABLE = 'src/app/controls/smart-table/smart-table.ts';
const SMART_TABLE_TEMPLATE = 'src/app/controls/smart-table/smart-table.html';
const CONTRACTS = 'src/app/controls/data-table/data-table-contracts.ts';
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/showcase/data-batch/data-batch.html';
const TABLE_TEMPLATE = 'src/app/controls/table/table.html';
const TABLE_CONTRACT = 'src/app/controls/table/ERP_TABLE_REFERENCE_EXACT_V1.md';
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
];

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

export function validateDataTableContracts(files) {
  const errors = [];
  const source = files.get(SMART_TABLE) ?? '';
  const template = files.get(SMART_TABLE_TEMPLATE) ?? '';
  const contracts = files.get(CONTRACTS) ?? '';
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const tableTemplate = files.get(TABLE_TEMPLATE) ?? '';
  const tableContract = files.get(TABLE_CONTRACT) ?? '';

  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(/.test(source)) {
    errors.push('ErpSmartTable must remain transport-agnostic and must not fetch data');
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

  for (const owner of ['<erp-check-box', '<erp-sort-header', '<erp-table-resize-handle']) {
    if (!tableTemplate.includes(owner)) {
      errors.push(`Exact-reference ErpTable must retain lower owner ${owner}`);
    }
  }
  if (!tableContract.includes(TABLE_REFERENCE_SHA) ||
      !tableContract.includes('supersedes every previous `ErpTable` visual interpretation')) {
    errors.push('ErpTable must retain the binding ERP-TABLE.html exact-reference contract');
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
    [CONTRACTS, "export type ErpSmartTableMode = 'local' | 'remote'; readonly revision: number; readonly filters: readonly ErpDataFilter[]; readonly visibleColumns: readonly string[];"],
    [ROUTES, "path: 'controls/data-batch'"],
    [REVIEW, '<erp-smart-table/>'],
    [TABLE_TEMPLATE, '<erp-check-box/><erp-sort-header/><erp-table-resize-handle/>'],
    [TABLE_CONTRACT, `${TABLE_REFERENCE_SHA}; supersedes every previous \`ErpTable\` visual interpretation`],
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
    ['missing token base', fixture(new Map([['src/styles/foundation/components/smart-table/_tokens.scss', '']])), 'base mixin'],
    ['missing exact Table reference', fixture(new Map([[TABLE_CONTRACT, 'old table reference']])), 'binding ERP-TABLE.html'],
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
    [CONTRACTS, read(CONTRACTS)],
    [ROUTES, read(ROUTES)],
    [REVIEW, read(REVIEW)],
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
  console.log('8 accelerated data/table components verified.');
}

if (process.argv.includes('--self-test')) runSelfTest();
else runCheck();
