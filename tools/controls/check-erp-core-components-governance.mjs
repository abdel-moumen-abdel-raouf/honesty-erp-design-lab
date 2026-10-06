import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/showcase/core-batch/core-batch.html';
const REVIEW_TABLE = 'src/app/review-internals/review-core-table/review-core-table.html';
const SELECT = 'src/app/controls/select/select.html';
const SELECT_TS = 'src/app/controls/select/select.ts';
const SELECT_SCSS = 'src/app/controls/select/select.scss';
const SELECT_OPTION_SCSS = 'src/app/controls/select/select-option-content.scss';
const SELECT_MOTION_SCSS = 'src/app/controls/select/select-popup.scss';
const SELECT_TOKENS = 'src/styles/foundation/components/select/_tokens.scss';
const SELECT_PANEL_TOKENS = 'src/styles/foundation/components/select-panel/_tokens.scss';
const SELECT_CONTRACT = 'src/app/controls/select/ERP_SELECT_REFERENCE_EXACT_V3.md';
const SELECT_REFERENCE_SHA = 'EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D';
const ALERT_TS = 'src/app/controls/alert/alert.ts';
const STATUS_BADGE_TS = 'src/app/controls/status-badge/status-badge.ts';
const AVATAR_TS = 'src/app/controls/avatar/avatar.ts';
const AVATAR_SCSS = 'src/app/controls/avatar/avatar.scss';
const AVATAR_PRESENCE = 'src/app/controls/avatar/avatar-presence.scss';
const AVATAR_MOTION = 'src/app/controls/avatar/avatar-motion.scss';
const TABS_TS = 'src/app/controls/tabs/tabs.ts';
const TABS_SCSS = 'src/app/controls/tabs/tabs.scss';
const TABS_MOTION = 'src/app/controls/tabs/tabs-motion.scss';
const TABLE = 'src/app/controls/table/table.html';
const TABLE_TS = 'src/app/controls/table/table.ts';
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
  const selectScss = `${files.get(SELECT_SCSS) ?? ''}\n${files.get(SELECT_MOTION_SCSS) ?? ''}\n${files.get(SELECT_OPTION_SCSS) ?? ''}`;
  const selectTokens = `${files.get(SELECT_TOKENS) ?? ''}\n${files.get(SELECT_PANEL_TOKENS) ?? ''}`;
  const selectContract = files.get(SELECT_CONTRACT) ?? '';
  const alertTs = files.get(ALERT_TS) ?? '';
  const statusBadgeTs = files.get(STATUS_BADGE_TS) ?? '';
  const avatarTs = files.get(AVATAR_TS) ?? '';
  const avatarPresence = files.get(AVATAR_PRESENCE) ?? '';
  const avatarMotion = files.get(AVATAR_MOTION) ?? '';
  const avatarScss = `${files.get(AVATAR_SCSS) ?? ''}\n${avatarPresence}\n${avatarMotion}`;
  const tabsTs = files.get(TABS_TS) ?? '';
  const tabsScss = `${files.get(TABS_SCSS) ?? ''}\n${files.get(TABS_MOTION) ?? ''}`;
  const table = files.get(TABLE) ?? '';
  const tableTs = files.get(TABLE_TS) ?? '';
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
    'class="select__control"',
    'semanticRole="combobox"',
    'presentation="select-panel"',
    'presentation="select-option"',
    'class="select__group-label"',
    'class="select__footer"',
    '<erp-search-box',
    '<erp-selection-tile',
    '<erp-avatar',
    '<erp-select-action',
  ]) {
    if (!select.includes(required)) errors.push(`ErpSelect hierarchy is missing ${required}`);
  }
  if (select.includes('select__toolbar') || select.includes('select__sort-menu') ||
      select.includes('<erp-action-menu-content')) {
    errors.push('ErpSelect must not restore the superseded toolbar or visual sort-menu chrome');
  }
  if (/<input\b/i.test(select)) {
    errors.push('ErpSelect must reuse the approved SearchBox editor instead of authoring a private raw input');
  }
  for (const focusContract of [
    '(blurred)="handleTriggerBlur()"',
    'icon="dismiss"',
    'name="check-mark"',
  ]) {
    if (!select.includes(focusContract)) errors.push(`ErpSelect strict rebuild is missing ${focusContract}`);
  }
  if (selectScss.includes('.select__control:focus-within')) {
    errors.push('ErpSelect pointer focus must not recreate the rejected persistent focus ring');
  }
  if (!selectTs.includes("event.target.matches(':focus-visible')") ||
      !selectTs.includes('this.triggerFocusVisible.set(false)')) {
    errors.push('ErpSelect must separate browser focus-visible state and clear it on blur');
  }
  if (selectTs.includes('Math.max(trigger.getBoundingClientRect().width, 320)')) {
    errors.push('ErpSelect must not restore the fixed 320px popup minimum');
  }
  if (!selectTs.includes('this.controlSurface()?.nativeElement') ||
      !selectTs.includes('Math.min(control.getBoundingClientRect().width, availableWidth)')) {
    errors.push('ErpSelect must match the exact visible Select control width while respecting viewport space');
  }
  for (const contract of [
    "readonly searchLabel = input('البحث')",
    "readonly sortMode = input<ErpSelectSortMode>('none')",
    "readonly groupBy = input<keyof ErpSelectOption | null>(null)",
    "readonly selectSize = input<ErpSelectSize>('md')",
    "readonly selectAppearance = input<ErpSelectAppearance | null>(null)",
  ]) {
    if (!selectTs.includes(contract)) errors.push(`ErpSelect exact-reference API is missing ${contract}`);
  }
  for (const geometry of [
    '--honesty-select-control-height: 2.375rem',
    '--honesty-select-control-height: 1.875rem',
    '--honesty-select-control-height: 2.875rem',
    '--honesty-select-panel-radius: 0.75rem',
    '--honesty-select-panel-max-block-size: 18.75rem',
    '--honesty-select-panel-list-padding: 0.25rem',
    '--honesty-select-panel-option-row-gap: 0.25rem',
  ]) {
    if (!selectTokens.includes(geometry)) errors.push(`ErpSelect reference geometry is missing ${geometry}`);
  }
  if (!selectScss.includes('margin-block-start: var(--honesty-select-panel-option-row-gap)')) {
    errors.push('ErpSelect options must retain the strict-rebuild vertical row gap');
  }
  for (const evidence of [
    'class="select-parity-matrix"',
    'sortMode="label"',
    'label="نتيجة فارغة"',
    'label="حالة غير صالحة"',
  ]) {
    if (!review.includes(evidence)) errors.push(`Core review is missing Select parity evidence ${evidence}`);
  }
  if (!selectScss.includes("@media (prefers-reduced-motion: reduce)")) {
    errors.push('ErpSelect exact-reference motion must remain deterministic under reduced motion');
  }
  if (!selectContract.includes(SELECT_REFERENCE_SHA) ||
      !selectContract.includes('supersedes all previous ErpSelect visual references')) {
    errors.push('ErpSelect exact-reference contract must record the binding ERP-SELECT.html SHA and supersession');
  }
  if (!alertTs.includes("'[attr.title]': 'null'")) {
    errors.push('ErpAlert must declaratively suppress the native host title tooltip');
  }
  for (const contract of ["'sm' | 'md' | 'lg' | 'xl'", "'square' | 'rounded' | 'pill'", "'content' | 'stretch'"]) {
    if (!statusBadgeTs.includes(contract)) errors.push(`ErpStatusBadge contract is missing ${contract}`);
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
  if (avatarPresence.includes('inset-inline-')) {
    errors.push('ErpAvatar physical left/right presence positions must not use logical inline edges');
  }
  for (const physicalEdge of [
    "position='left']) .avatar__presence { top:",
    "position='left']) .avatar__presence { top: 50%; left:",
    "position='right']) .avatar__presence { top: 50%; right:",
    "position='top-left']) .avatar__presence { top:",
    "position='bottom-right']) .avatar__presence { right:",
  ]) {
    if (!avatarPresence.includes(physicalEdge)) {
      errors.push(`ErpAvatar physical positioning is missing ${physicalEdge}`);
    }
  }
  if (!avatarPresence.includes('class="avatar__presence-indicator"') &&
      !avatarMotion.includes('.avatar__presence-indicator')) {
    errors.push('ErpAvatar presence motion requires a layer independent from positioning');
  }
  if (/presence-motion='(?:pulse|ping|breathe)'\]\) \.avatar__presence\s*\{/u.test(avatarMotion)) {
    errors.push('ErpAvatar presence motion must not animate the positioning layer');
  }

  for (const contract of [
    "'horizontal' | 'vertical'",
    "'start' | 'end'",
    "'content' | 'fill'",
    "'underline' | 'pills'",
    "'fade-start'",
    "'fade-end'",
    "'rectangle' | 'rounded' | 'circle'",
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
  if (!tableTs.includes('if (this.rowActivatable()) this.rowActivated.emit(row);') ||
      tableTs.includes('this.rowActivatable() || this.selectable()')) {
    errors.push('ErpTable row activation must remain independent from checkbox selection capability');
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
  if (!pagination.includes('labelMode="visually-hidden"') ||
      !pagination.includes('label="عدد السجلات"')) {
    errors.push('ErpPagination must expose one horizontal visual page-size label and retain a hidden accessible Select label');
  }

  if (!avatarPicker.includes('ERP_AVATAR_CATALOG') ||
      !avatarPickerTemplate.includes('<erp-tabs') ||
      !avatarPickerTemplate.includes('<erp-avatar') ||
      !avatarPicker.includes('readonly avatarShape') ||
      !avatarPicker.includes('readonly avatarSize')) {
    errors.push('ErpAvatarPicker must compose the bounded catalog through ErpTabs and ErpAvatar');
  }
  if (!reviewEvidence.includes('<erp-column-chooser')) {
    errors.push('Core Table visibility evidence must reuse ErpColumnChooser');
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
    [REVIEW, '<erp-select/><erp-status-badge/><erp-alert/><erp-skeleton/><erp-avatar/><erp-tabs/><erp-avatar-picker/><erp-table/><erp-pagination/><div class="select-parity-matrix" sortMode="label" label="نتيجة فارغة" label="حالة غير صالحة"></div>'],
    [REVIEW_TABLE, '<erp-column-chooser/>'],
    [SELECT, '<div class="select__control"></div><erp-field-trigger semanticRole="combobox" (blurred)="handleTriggerBlur()"/><erp-search-box presentation="select-panel"/><erp-selection-tile presentation="select-option"/><div class="select__group-label"></div><div class="select__footer"></div><erp-avatar/><erp-select-action icon="dismiss"/><erp-icon name="check-mark"/>'],
    [SELECT_TS, "this.controlSurface()?.nativeElement; Math.min(control.getBoundingClientRect().width, availableWidth); event.target.matches(':focus-visible'); this.triggerFocusVisible.set(false); readonly searchLabel = input('البحث'); readonly sortMode = input<ErpSelectSortMode>('none'); readonly groupBy = input<keyof ErpSelectOption | null>(null); readonly selectSize = input<ErpSelectSize>('md'); readonly selectAppearance = input<ErpSelectAppearance | null>(null)"],
    [SELECT_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [SELECT_OPTION_SCSS, 'margin-block-start: var(--honesty-select-panel-option-row-gap)'],
    [SELECT_MOTION_SCSS, ''],
    [SELECT_TOKENS, '@mixin base {}; --honesty-select-control-height: 2.375rem; --honesty-select-control-height: 1.875rem; --honesty-select-control-height: 2.875rem;'],
    [SELECT_PANEL_TOKENS, '@mixin base {}; --honesty-select-panel-radius: 0.75rem; --honesty-select-panel-max-block-size: 18.75rem; --honesty-select-panel-list-padding: 0.25rem; --honesty-select-panel-option-row-gap: 0.25rem;'],
    [SELECT_CONTRACT, `${SELECT_REFERENCE_SHA}; ERP-SELECT.html supersedes all previous ErpSelect visual references`],
    [ALERT_TS, "'[attr.title]': 'null'"],
    [STATUS_BADGE_TS, "'sm' | 'md' | 'lg' | 'xl'; 'square' | 'rounded' | 'pill'; 'content' | 'stretch'"],
    [AVATAR_TS, "'circle' | 'rounded' | 'square'; 'online' | 'away' | 'busy' | 'offline'; 'top-left'; 'bottom-right'; 'none' | 'pulse' | 'ping' | 'breathe'; 'none' | 'scale' | 'lift'"],
    [AVATAR_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [AVATAR_PRESENCE, "class=\"avatar__presence-indicator\"; position='left']) .avatar__presence { top: 50%; left: 0; } position='right']) .avatar__presence { top: 50%; right: 0; } position='top-left']) .avatar__presence { top: 0; left: 0; } position='bottom-right']) .avatar__presence { right: 0; bottom: 0; }"],
    [AVATAR_MOTION, '.avatar__presence-indicator {}'],
    [TABS_TS, "'horizontal' | 'vertical'; 'start' | 'end'; 'content' | 'fill'; 'underline' | 'pills'; 'fade-start'; 'fade-end'; 'rectangle' | 'rounded' | 'circle'"],
    [TABS_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [TABS_MOTION, ''],
    [TABLE, '<erp-check-box/><erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow'],
    [TABLE_TS, 'if (this.rowActivatable()) this.rowActivated.emit(row);'],
    [TABLE_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [TABLE_MOTION, ''],
    [PAGINATION, '<erp-inline class="pagination__size-row"><erp-select label="عدد السجلات" labelMode="visually-hidden"/></erp-inline>'],
    [PAGINATION_TS, ['showSummary', 'showPageSize', 'showFirst', 'showPrevious', 'showPageNumbers', 'showNext', 'showLast'].map((name) => `readonly ${name} = input(true`).join(';')],
    [AVATAR_PICKER, 'ERP_AVATAR_CATALOG; readonly avatarShape; readonly avatarSize'],
    [AVATAR_PICKER_TEMPLATE, '<erp-tabs><erp-avatar/></erp-tabs>'],
    [AVATAR_CATALOG, "avatarItems('male', 1, 20); avatarItems('female', 21, 40); /assets/honesty-erp-avatars/users/"],
    [AVATAR_ASSET_ROOT, ['manifest.json', ...Array.from({length: 40}, (_, index) => `avatar-${index + 1}.png`)]],
    [AVATAR_MANIFEST, JSON.stringify({total: 40, male: 20, female: 20, items: Array.from({length: 40}, (_, index) => ({imageUrl: `/assets/honesty-erp-avatars/users/avatar-${index + 1}.png`}))})],
  ]);
  for (const owner of TOKEN_OWNERS) {
    const tokenPath = `src/styles/foundation/components/${owner}/_tokens.scss`;
    if (!files.has(tokenPath)) files.set(tokenPath, '@mixin base {}');
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
    ['raw select search editor', fixture(new Map([[SELECT, '<div class="select__control"><input/></div>']])), 'private raw input'],
    ['superseded select toolbar', fixture(new Map([[SELECT, '<div class="select__toolbar"></div><div class="select__sort-menu"></div>']])), 'superseded toolbar'],
    ['persisted pointer focus ring', fixture(new Map([[SELECT_SCSS, '.select__control:focus-within {} @media (prefers-reduced-motion: reduce) {}']])), 'persistent focus ring'],
    ['missing select blur lifecycle', fixture(new Map([[SELECT, '<div class="select__control"></div><erp-field-trigger semanticRole="combobox"/><erp-search-box presentation="select-panel"/><erp-selection-tile presentation="select-option"/><div class="select__group-label"></div><div class="select__footer"></div><erp-avatar/><erp-select-action icon="dismiss"/><erp-icon name="check-mark"/>']])), 'handleTriggerBlur'],
    ['missing select option gap', fixture(new Map([[SELECT_OPTION_SCSS, '']])), 'vertical row gap'],
    ['missing select reference SHA', fixture(new Map([[SELECT_CONTRACT, 'old reference']])), 'binding ERP-SELECT.html SHA'],
    ['missing select exact geometry', fixture(new Map([[SELECT_PANEL_TOKENS, '@mixin base {}']])), 'reference geometry'],
    ['native alert title tooltip', fixture(new Map([[ALERT_TS, 'readonly title = input.required<string>();']])), 'native host title'],
    ['missing avatar reduced motion', fixture(new Map([[AVATAR_SCSS, '']])), 'reduced-motion'],
    ['logical avatar positions', fixture(new Map([[AVATAR_PRESENCE, "inset-inline-start: 0; class=\"avatar__presence-indicator\";"]])), 'physical left/right'],
    ['motion on avatar positioning layer', fixture(new Map([[AVATAR_MOTION, ":host([data-avatar-presence-motion='pulse']) .avatar__presence { animation: pulse; }"]])), 'positioning layer'],
    ['missing table selection owner', fixture(new Map([[TABLE, '<erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow']])), 'erp-check-box'],
    ['selection activates table rows', fixture(new Map([[TABLE_TS, 'if (this.rowActivatable() || this.selectable()) this.rowActivated.emit(row);']])), 'independent from checkbox selection'],
    ['pagination duplicates visible labels', fixture(new Map([[PAGINATION, '<erp-inline class="pagination__size-row"><erp-select label="حجم الصفحة"/></erp-inline>']])), 'hidden accessible Select label'],
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
    [SELECT_SCSS, read(SELECT_SCSS)],
    [SELECT_OPTION_SCSS, read(SELECT_OPTION_SCSS)],
    [SELECT_MOTION_SCSS, read(SELECT_MOTION_SCSS)],
    [SELECT_TOKENS, read(SELECT_TOKENS)],
    [SELECT_PANEL_TOKENS, read(SELECT_PANEL_TOKENS)],
    [SELECT_CONTRACT, read(SELECT_CONTRACT)],
    [ALERT_TS, read(ALERT_TS)],
    [STATUS_BADGE_TS, read(STATUS_BADGE_TS)],
    [AVATAR_TS, read(AVATAR_TS)],
    [AVATAR_SCSS, read(AVATAR_SCSS)],
    [AVATAR_PRESENCE, read(AVATAR_PRESENCE)],
    [AVATAR_MOTION, read(AVATAR_MOTION)],
    [TABS_TS, read(TABS_TS)],
    [TABS_SCSS, read(TABS_SCSS)],
    [TABS_MOTION, read(TABS_MOTION)],
    [TABLE, read(TABLE)],
    [TABLE_TS, read(TABLE_TS)],
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
