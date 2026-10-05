import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SMART_TABLE = 'src/app/controls/smart-table/smart-table.ts';
const SMART_TABLE_TEMPLATE = 'src/app/controls/smart-table/smart-table.html';
const CONTRACTS = 'src/app/controls/data-table/data-table-contracts.ts';
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/showcase/data-batch/data-batch.html';
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

  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(/.test(source)) {
    errors.push('ErpSmartTable must remain transport-agnostic and must not fetch data');
  }

  for (const owner of [
    '<erp-table-toolbar',
    '<erp-column-chooser',
    '<erp-filter-drawer',
    '<erp-filter-bar',
    '<erp-sort-header',
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
    [SMART_TABLE, 'export class ErpSmartTable {}'],
    [SMART_TABLE_TEMPLATE, '<erp-table-toolbar/><erp-column-chooser/><erp-filter-drawer/><erp-filter-bar/><erp-sort-header/><erp-bulk-action-bar/><erp-skeleton/><erp-empty-state/><erp-alert/><erp-table><ng-content /></erp-table><erp-pagination/>'],
    [CONTRACTS, "export type ErpSmartTableMode = 'local' | 'remote'; readonly revision: number; readonly filters: readonly ErpDataFilter[]; readonly visibleColumns: readonly string[];"],
    [ROUTES, "path: 'controls/data-batch'"],
    [REVIEW, '<erp-smart-table/>'],
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
