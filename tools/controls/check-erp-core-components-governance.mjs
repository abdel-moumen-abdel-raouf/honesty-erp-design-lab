import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/showcase/core-batch/core-batch.html';
const REVIEW_TABLE = 'src/app/review-internals/review-core-table/review-core-table.html';
const SELECT = 'src/app/controls/select/select.html';
const SELECT_TS = 'src/app/controls/select/select.ts';
const AVATAR_TS = 'src/app/controls/avatar/avatar.ts';
const AVATAR_SCSS = 'src/app/controls/avatar/avatar.scss';
const AVATAR_MOTION = 'src/app/controls/avatar/avatar-motion.scss';
const TABS_TS = 'src/app/controls/tabs/tabs.ts';
const TABS_SCSS = 'src/app/controls/tabs/tabs.scss';
const TABS_MOTION = 'src/app/controls/tabs/tabs-motion.scss';
const TABLE = 'src/app/controls/table/table.html';
const TABLE_SCSS = 'src/app/controls/table/table.scss';
const TABLE_MOTION = 'src/app/controls/table/table-motion.scss';
const PAGINATION = 'src/app/controls/pagination/pagination.html';
const PAGINATION_TS = 'src/app/controls/pagination/pagination.ts';
const AVATAR_PICKER = 'src/app/controls/avatar-picker/avatar-picker.ts';
const AVATAR_PICKER_TEMPLATE = 'src/app/controls/avatar-picker/avatar-picker.html';
const AVATAR_CATALOG = 'src/app/controls/avatar-picker/avatar-picker-contracts.ts';
const AVATAR_ASSET_ROOT = 'public/assets/honesty-erp-avatars/users';
const AVATAR_MANIFEST = `${AVATAR_ASSET_ROOT}/manifest.json`;
const TOKEN_OWNERS = [
  'select',
  'status-badge',
  'alert',
  'skeleton',
  'avatar',
  'tabs',
  'avatar-picker',
  'table',
  'pagination',
];

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

export function validateCoreComponents(files) {
  const errors = [];
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const reviewEvidence = `${review}\n${files.get(REVIEW_TABLE) ?? ''}`;
  const select = files.get(SELECT) ?? '';
  const selectTs = files.get(SELECT_TS) ?? '';
  const avatarTs = files.get(AVATAR_TS) ?? '';
  const avatarScss = `${files.get(AVATAR_SCSS) ?? ''}\n${files.get(AVATAR_MOTION) ?? ''}`;
  const tabsTs = files.get(TABS_TS) ?? '';
  const tabsScss = `${files.get(TABS_SCSS) ?? ''}\n${files.get(TABS_MOTION) ?? ''}`;
  const table = files.get(TABLE) ?? '';
  const tableScss = `${files.get(TABLE_SCSS) ?? ''}\n${files.get(TABLE_MOTION) ?? ''}`;
  const pagination = files.get(PAGINATION) ?? '';
  const paginationTs = files.get(PAGINATION_TS) ?? '';
  const avatarPicker = files.get(AVATAR_PICKER) ?? '';
  const avatarPickerTemplate = files.get(AVATAR_PICKER_TEMPLATE) ?? '';
  const avatarCatalog = files.get(AVATAR_CATALOG) ?? '';

  if (!routes.includes("path: 'controls/core-batch'")) {
    errors.push('The grouped core-component review route must remain registered');
  }
  if (/<\/?(?:form|button|input|select|textarea|table|svg)\b/i.test(review)) {
    errors.push('The routed core-component review must remain ERP-only authored');
  }
  for (const owner of [
    '<erp-select', '<erp-status-badge', '<erp-alert', '<erp-skeleton',
    '<erp-avatar', '<erp-tabs', '<erp-avatar-picker', '<erp-table', '<erp-pagination',
  ]) {
    if (!reviewEvidence.includes(owner)) errors.push(`Core review must include ${owner}`);
  }

  for (const required of [
    'class="select__search-row"',
    'class="select__toolbar"',
    'class="select__sort-menu"',
    '<erp-avatar',
  ]) {
    if (!select.includes(required)) errors.push(`ErpSelect hierarchy is missing ${required}`);
  }
  if (selectTs.includes('Math.max(trigger.getBoundingClientRect().width, 320)')) {
    errors.push('ErpSelect must not restore the fixed 320px popup minimum');
  }
  if (!selectTs.includes('Math.min(trigger.getBoundingClientRect().width, availableWidth)')) {
    errors.push('ErpSelect must match trigger width while respecting viewport space');
  }

  for (const contract of [
    "'circle' | 'rounded' | 'square'",
    "'online' | 'away' | 'busy' | 'offline'",
    "'top-left'",
    "'bottom-right'",
    "'none' | 'pulse' | 'ping' | 'breathe'",
    "'none' | 'scale' | 'lift'",
  ]) {
    if (!avatarTs.includes(contract)) errors.push(`ErpAvatar contract is missing ${contract}`);
  }
  if (!avatarScss.includes('@media (prefers-reduced-motion: reduce)')) {
    errors.push('ErpAvatar must disable authored motion for reduced-motion users');
  }

  for (const contract of [
    "'horizontal' | 'vertical'",
    "'start' | 'end'",
    "'content' | 'fill'",
    "'underline' | 'pills'",
    "'fade-start'",
    "'fade-end'",
  ]) {
    if (!tabsTs.includes(contract)) errors.push(`ErpTabs contract is missing ${contract}`);
  }
  if (!tabsScss.includes('@media (prefers-reduced-motion: reduce)')) {
    errors.push('ErpTabs transitions must respect reduced motion');
  }

  for (const required of [
    '<erp-check-box', '<erp-sort-header', '<erp-table-resize-handle',
    '<tfoot>', 'descriptionKey', 'data-overflow',
  ]) {
    if (!table.includes(required)) errors.push(`ErpTable hierarchy is missing ${required}`);
  }
  if (!tableScss.includes('@media (prefers-reduced-motion: reduce)')) {
    errors.push('ErpTable hover motion must respect reduced motion');
  }

  for (const visibilityInput of [
    'showSummary', 'showPageSize', 'showFirst', 'showPrevious',
    'showPageNumbers', 'showNext', 'showLast',
  ]) {
    if (!paginationTs.includes(`readonly ${visibilityInput} = input(true`)) {
      errors.push(`ErpPagination must default ${visibilityInput} to true`);
    }
  }
  if (!pagination.includes('<erp-inline class="pagination__size-row"')) {
    errors.push('ErpPagination page-size label and ErpSelect must share an ErpInline row');
  }

  if (!avatarPicker.includes('ERP_AVATAR_CATALOG') ||
      !avatarPickerTemplate.includes('<erp-tabs') ||
      !avatarPickerTemplate.includes('<erp-avatar')) {
    errors.push('ErpAvatarPicker must compose the bounded catalog through ErpTabs and ErpAvatar');
  }

  const assetPaths = files.get(AVATAR_ASSET_ROOT) ?? [];
  const pngs = assetPaths.filter((entry) => entry.endsWith('.png'));
  if (pngs.length !== 40 || !assetPaths.includes('manifest.json')) {
    errors.push('ErpAvatarPicker requires exactly 40 Product Owner PNG assets plus manifest.json');
  }
  try {
    const manifest = JSON.parse((files.get(AVATAR_MANIFEST) ?? '{}').replace(/^\uFEFF/u, ''));
    const manifestPaths = manifest.items?.map((item) => item.imageUrl.replace('/assets/honesty-erp-avatars/users/', '')) ?? [];
    if (manifest.total !== 40 || manifest.male !== 20 || manifest.female !== 20 || manifestPaths.length !== 40) {
      errors.push('Avatar manifest must describe exactly 20 male and 20 female assets');
    }
    for (const relative of manifestPaths) {
      if (!assetPaths.includes(relative.replaceAll('/', path.sep)) && !assetPaths.includes(relative)) {
        errors.push(`Avatar manifest references missing asset ${relative}`);
      }
    }
  } catch {
    errors.push('Avatar manifest must remain valid JSON');
  }
  for (const required of ["avatarItems('male', 1, 20)", "avatarItems('female', 21, 40)", '/assets/honesty-erp-avatars/users/']) {
    if (!avatarCatalog.includes(required)) errors.push(`Avatar catalog is missing ${required}`);
  }

  for (const owner of TOKEN_OWNERS) {
    const tokens = files.get(`src/styles/foundation/components/${owner}/_tokens.scss`) ?? '';
    if (!tokens.includes('@mixin base')) {
      errors.push(`${owner} must own a concrete Component Token base mixin`);
    }
  }

  return errors;
}

function fixture(overrides = new Map()) {
  const files = new Map([
    [ROUTES, "path: 'controls/core-batch'"],
    [REVIEW, '<erp-select/><erp-status-badge/><erp-alert/><erp-skeleton/><erp-avatar/><erp-tabs/><erp-avatar-picker/><erp-table/><erp-pagination/>'],
    [REVIEW_TABLE, ''],
    [SELECT, '<span class="select__search-row"></span><span class="select__toolbar"></span><span class="select__sort-menu"></span><erp-avatar/>'],
    [SELECT_TS, 'Math.min(trigger.getBoundingClientRect().width, availableWidth)'],
    [AVATAR_TS, "'circle' | 'rounded' | 'square'; 'online' | 'away' | 'busy' | 'offline'; 'top-left'; 'bottom-right'; 'none' | 'pulse' | 'ping' | 'breathe'; 'none' | 'scale' | 'lift'"],
    [AVATAR_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [AVATAR_MOTION, ''],
    [TABS_TS, "'horizontal' | 'vertical'; 'start' | 'end'; 'content' | 'fill'; 'underline' | 'pills'; 'fade-start'; 'fade-end'"],
    [TABS_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [TABS_MOTION, ''],
    [TABLE, '<erp-check-box/><erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow'],
    [TABLE_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [TABLE_MOTION, ''],
    [PAGINATION, '<erp-inline class="pagination__size-row"><erp-select/></erp-inline>'],
    [PAGINATION_TS, ['showSummary', 'showPageSize', 'showFirst', 'showPrevious', 'showPageNumbers', 'showNext', 'showLast'].map((name) => `readonly ${name} = input(true`).join(';')],
    [AVATAR_PICKER, 'ERP_AVATAR_CATALOG'],
    [AVATAR_PICKER_TEMPLATE, '<erp-tabs><erp-avatar/></erp-tabs>'],
    [AVATAR_CATALOG, "avatarItems('male', 1, 20); avatarItems('female', 21, 40); /assets/honesty-erp-avatars/users/"],
    [AVATAR_ASSET_ROOT, ['manifest.json', ...Array.from({length: 40}, (_, index) => `avatar-${index + 1}.png`)]],
    [AVATAR_MANIFEST, JSON.stringify({total: 40, male: 20, female: 20, items: Array.from({length: 40}, (_, index) => ({imageUrl: `/assets/honesty-erp-avatars/users/avatar-${index + 1}.png`}))})],
  ]);
  for (const owner of TOKEN_OWNERS) {
    files.set(`src/styles/foundation/components/${owner}/_tokens.scss`, '@mixin base {}');
  }
  for (const [key, value] of overrides) files.set(key, value);
  return files;
}

function runSelfTest() {
  const failures = [];
  if (validateCoreComponents(fixture()).length !== 0) failures.push('valid fixture was rejected');
  for (const [label, files, expected] of [
    ['raw route control', fixture(new Map([[REVIEW, '<button>raw</button>']])), 'ERP-only'],
    ['fixed select minimum', fixture(new Map([[SELECT_TS, 'Math.max(trigger.getBoundingClientRect().width, 320)']])), '320px'],
    ['missing avatar reduced motion', fixture(new Map([[AVATAR_SCSS, '']])), 'reduced-motion'],
    ['missing table selection owner', fixture(new Map([[TABLE, '<erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow']])), 'erp-check-box'],
    ['missing avatar asset', fixture(new Map([[AVATAR_ASSET_ROOT, ['manifest.json']]])), '40 Product Owner'],
    ['missing token base', fixture(new Map([['src/styles/foundation/components/avatar-picker/_tokens.scss', '']])), 'base mixin'],
  ]) {
    const errors = validateCoreComponents(files);
    if (!errors.some((error) => error.includes(expected))) failures.push(`${label} fixture was accepted`);
  }
  if (failures.length > 0) {
    console.error(`ERP core-components governance self-test failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP core-components governance self-test: PASS');
}

function runCheck() {
  const files = new Map([
    [ROUTES, read(ROUTES)],
    [REVIEW, read(REVIEW)],
    [REVIEW_TABLE, read(REVIEW_TABLE)],
    [SELECT, read(SELECT)],
    [SELECT_TS, read(SELECT_TS)],
    [AVATAR_TS, read(AVATAR_TS)],
    [AVATAR_SCSS, read(AVATAR_SCSS)],
    [AVATAR_MOTION, read(AVATAR_MOTION)],
    [TABS_TS, read(TABS_TS)],
    [TABS_SCSS, read(TABS_SCSS)],
    [TABS_MOTION, read(TABS_MOTION)],
    [TABLE, read(TABLE)],
    [TABLE_SCSS, read(TABLE_SCSS)],
    [TABLE_MOTION, read(TABLE_MOTION)],
    [PAGINATION, read(PAGINATION)],
    [PAGINATION_TS, read(PAGINATION_TS)],
    [AVATAR_PICKER, read(AVATAR_PICKER)],
    [AVATAR_PICKER_TEMPLATE, read(AVATAR_PICKER_TEMPLATE)],
    [AVATAR_CATALOG, read(AVATAR_CATALOG)],
    [AVATAR_MANIFEST, read(AVATAR_MANIFEST)],
  ]);
  const assetRoot = path.join(ROOT, AVATAR_ASSET_ROOT);
  files.set(AVATAR_ASSET_ROOT, fs.readdirSync(assetRoot, {recursive: true}).map(String));
  for (const owner of TOKEN_OWNERS) {
    const tokenPath = `src/styles/foundation/components/${owner}/_tokens.scss`;
    files.set(tokenPath, read(tokenPath));
  }
  const errors = validateCoreComponents(files);
  if (errors.length > 0) {
    console.error(`ERP core-components governance failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP core-components governance: PASS');
  console.log('9 corrected core owners and 40 avatar assets verified.');
}

if (process.argv.includes('--self-test')) runSelfTest();
else runCheck();
