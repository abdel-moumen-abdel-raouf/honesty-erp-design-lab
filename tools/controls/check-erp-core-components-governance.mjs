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
const STATUS_BADGE_TEMPLATE = 'src/app/controls/status-badge/status-badge.html';
const STATUS_BADGE_SCSS = 'src/app/controls/status-badge/status-badge.scss';
const STATUS_BADGE_TONE_FEEDBACK_SCSS = 'src/app/controls/status-badge/status-badge-tone-feedback.scss';
const STATUS_BADGE_TONE_BRAND_SCSS = 'src/app/controls/status-badge/status-badge-tone-brand.scss';
const STATUS_BADGE_VARIANTS_SCSS = 'src/app/controls/status-badge/status-badge-variants.scss';
const STATUS_BADGE_SIZES_SCSS = 'src/app/controls/status-badge/status-badge-sizes.scss';
const STATUS_BADGE_STATES_SCSS = 'src/app/controls/status-badge/status-badge-states.scss';
const STATUS_BADGE_CONTENT_SCSS = 'src/app/controls/status-badge/status-badge-content.scss';
const STATUS_BADGE_MOTION_SCSS = 'src/app/controls/status-badge/status-badge-motion.scss';
const STATUS_BADGE_TOKENS = 'src/styles/foundation/components/status-badge/_tokens.scss';
const STATUS_BADGE_CONTRACT = 'src/app/controls/status-badge/ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md';
const STATUS_BADGE_LEGACY_REFERENCE = 'src/app/controls/status-badge/STATUS_BADGE_REFERENCE_V1.md';
const STATUS_BADGE_REFERENCE_SHA = '654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0';
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
  const statusBadgeTemplate = files.get(STATUS_BADGE_TEMPLATE) ?? '';
  const statusBadgeScss = [
    STATUS_BADGE_SCSS,
    STATUS_BADGE_TONE_FEEDBACK_SCSS,
    STATUS_BADGE_TONE_BRAND_SCSS,
    STATUS_BADGE_VARIANTS_SCSS,
    STATUS_BADGE_SIZES_SCSS,
    STATUS_BADGE_STATES_SCSS,
    STATUS_BADGE_CONTENT_SCSS,
    STATUS_BADGE_MOTION_SCSS,
  ].map((file) => files.get(file) ?? '').join('\n');
  const statusBadgeTokens = files.get(STATUS_BADGE_TOKENS) ?? '';
  const statusBadgeContract = files.get(STATUS_BADGE_CONTRACT) ?? '';
  const statusBadgeLegacyReference = files.get(STATUS_BADGE_LEGACY_REFERENCE) ?? '';
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
  for (const contract of [
    "'neutral'",
    "'success'",
    "'warning'",
    "'danger'",
    "'info'",
    "'brand'",
    "'pending'",
    "'archived'",
    "'soft' | 'solid' | 'outline' | 'ghost'",
    "'sm' | 'md' | 'lg' | 'xl'",
    "'square' | 'rounded' | 'pill'",
    "'content' | 'stretch'",
    "readonly interactive = input(false",
    "readonly selected = input(false",
    "readonly removable = input(false",
    'readonly selectedChange = output<boolean>()',
    'readonly remove = output<void>()',
  ]) {
    if (!statusBadgeTs.includes(contract)) errors.push(`ErpStatusBadge contract is missing ${contract}`);
  }
  for (const hierarchy of [
    '<erp-text',
    '<erp-icon',
    '<erp-status-badge-action',
    'class="status-badge__dot"',
    'class="status-badge__image"',
    'class="status-badge__count"',
    'class="status-badge__check"',
  ]) {
    if (!statusBadgeTemplate.includes(hierarchy)) {
      errors.push(`ErpStatusBadge exact-reference hierarchy is missing ${hierarchy}`);
    }
  }
  for (const geometry of [
    '--honesty-status-badge-height: 1.125rem',
    '--honesty-status-badge-height: 1.375rem',
    '--honesty-status-badge-height: 1.625rem',
    '--honesty-status-badge-height: 2rem',
    '--honesty-status-badge-padding-inline: 0.4375rem',
    '--honesty-status-badge-padding-inline: 0.5625rem',
    '--honesty-status-badge-padding-inline: 0.6875rem',
    '--honesty-status-badge-padding-inline: 0.875rem',
    '--honesty-status-badge-label-max-width: 11.25rem',
    '--honesty-status-badge-focus-ring-width: 0.1875rem',
  ]) {
    if (!statusBadgeTokens.includes(geometry)) {
      errors.push(`ErpStatusBadge exact-reference geometry is missing ${geometry}`);
    }
  }
  for (const mixin of [
    'tone-success', 'tone-warning', 'tone-danger', 'tone-info',
    'tone-brand', 'tone-pending', 'tone-archived',
    'variant-soft', 'variant-solid', 'variant-outline', 'variant-ghost',
    'size-sm', 'size-lg', 'size-xl', 'shape-square', 'shape-pill',
  ]) {
    if (!statusBadgeTokens.includes(`@mixin ${mixin}`)) {
      errors.push(`ErpStatusBadge Component Tokens are missing @mixin ${mixin}`);
    }
  }
  if (/#[0-9a-f]{3,8}\b|\b(?:rgb|hsl)a?\(/iu.test(`${statusBadgeScss}\n${statusBadgeTokens}`)) {
    errors.push('ErpStatusBadge must not copy raw reference colors');
  }
  if (/var\(--honesty-(?:color|border|radius|elevation|motion)-/u.test(statusBadgeScss)) {
    errors.push('ErpStatusBadge implementation SCSS must consume only its own Component Tokens');
  }
  if (!statusBadgeScss.includes('@media (prefers-reduced-motion: reduce)') ||
      !statusBadgeScss.includes('status-badge-enter') ||
      !statusBadgeScss.includes('status-badge-pulse')) {
    errors.push('ErpStatusBadge exact-reference motion and reduced-motion contracts are incomplete');
  }
  if (!statusBadgeContract.includes(STATUS_BADGE_REFERENCE_SHA) ||
      !statusBadgeContract.includes('supersedes every earlier `ErpStatusBadge` visual interpretation')) {
    errors.push('ErpStatusBadge exact-reference contract must record the binding ERP-STATUS-BADGE.html SHA and supersession');
  }
  if (!statusBadgeLegacyReference.includes('SUPERSEDED') ||
      !statusBadgeLegacyReference.includes(STATUS_BADGE_REFERENCE_SHA)) {
    errors.push('The former ErpStatusBadge Dribbble reference must remain explicitly superseded');
  }
  for (const evidence of [
    'class="status-badge-parity-matrix"',
    'class="status-badge-size-matrix"',
    'class="status-badge-anatomy-matrix"',
    'data-status-badge-direction-evidence="rtl"',
    'data-status-badge-direction-evidence="ltr"',
  ]) {
    if (!review.includes(evidence)) {
      errors.push(`Core review is missing StatusBadge exact-reference evidence ${evidence}`);
    }
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
    [REVIEW, '<erp-select/><erp-status-badge/><erp-alert/><erp-skeleton/><erp-avatar/><erp-tabs/><erp-avatar-picker/><erp-table/><erp-pagination/><div class="select-parity-matrix" sortMode="label" label="نتيجة فارغة" label="حالة غير صالحة"></div><div class="status-badge-parity-matrix"></div><div class="status-badge-size-matrix"></div><div class="status-badge-anatomy-matrix"></div><div data-status-badge-direction-evidence="rtl"></div><div data-status-badge-direction-evidence="ltr"></div>'],
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
    [STATUS_BADGE_TS, "'neutral'; 'success'; 'warning'; 'danger'; 'info'; 'brand'; 'pending'; 'archived'; 'soft' | 'solid' | 'outline' | 'ghost'; 'sm' | 'md' | 'lg' | 'xl'; 'square' | 'rounded' | 'pill'; 'content' | 'stretch'; readonly interactive = input(false; readonly selected = input(false; readonly removable = input(false; readonly selectedChange = output<boolean>(); readonly remove = output<void>()"],
    [STATUS_BADGE_TEMPLATE, '<erp-status-badge-action/><erp-text/><erp-icon/><span class="status-badge__dot"></span><img class="status-badge__image"><erp-text class="status-badge__count"/><span class="status-badge__check"></span>'],
    [STATUS_BADGE_SCSS, '@media (prefers-reduced-motion: reduce) {} status-badge-enter status-badge-pulse'],
    [STATUS_BADGE_TONE_FEEDBACK_SCSS, ''],
    [STATUS_BADGE_TONE_BRAND_SCSS, ''],
    [STATUS_BADGE_VARIANTS_SCSS, ''],
    [STATUS_BADGE_SIZES_SCSS, ''],
    [STATUS_BADGE_STATES_SCSS, ''],
    [STATUS_BADGE_CONTENT_SCSS, ''],
    [STATUS_BADGE_MOTION_SCSS, ''],
    [STATUS_BADGE_TOKENS, '@mixin base {}; @mixin tone-success {}; @mixin tone-warning {}; @mixin tone-danger {}; @mixin tone-info {}; @mixin tone-brand {}; @mixin tone-pending {}; @mixin tone-archived {}; @mixin variant-soft {}; @mixin variant-solid {}; @mixin variant-outline {}; @mixin variant-ghost {}; @mixin size-sm {}; @mixin size-lg {}; @mixin size-xl {}; @mixin shape-square {}; @mixin shape-pill {}; --honesty-status-badge-height: 1.125rem; --honesty-status-badge-height: 1.375rem; --honesty-status-badge-height: 1.625rem; --honesty-status-badge-height: 2rem; --honesty-status-badge-padding-inline: 0.4375rem; --honesty-status-badge-padding-inline: 0.5625rem; --honesty-status-badge-padding-inline: 0.6875rem; --honesty-status-badge-padding-inline: 0.875rem; --honesty-status-badge-label-max-width: 11.25rem; --honesty-status-badge-focus-ring-width: 0.1875rem;'],
    [STATUS_BADGE_CONTRACT, `${STATUS_BADGE_REFERENCE_SHA}; supersedes every earlier \`ErpStatusBadge\` visual interpretation`],
    [STATUS_BADGE_LEGACY_REFERENCE, `SUPERSEDED; ${STATUS_BADGE_REFERENCE_SHA}`],
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
    ['missing status-badge reference SHA', fixture(new Map([[STATUS_BADGE_CONTRACT, 'old reference']])), 'binding ERP-STATUS-BADGE.html SHA'],
    ['missing status-badge reference tone', fixture(new Map([[STATUS_BADGE_TS, "'neutral'; 'success'; 'warning'; 'danger'; 'info'; 'soft' | 'solid' | 'outline' | 'ghost'; 'sm' | 'md' | 'lg' | 'xl'; 'square' | 'rounded' | 'pill'; 'content' | 'stretch'; readonly interactive = input(false; readonly selected = input(false; readonly removable = input(false; readonly selectedChange = output<boolean>(); readonly remove = output<void>()"]])), "'brand'"],
    ['raw status-badge color', fixture(new Map([[STATUS_BADGE_SCSS, '#fff; @media (prefers-reduced-motion: reduce) {} status-badge-enter status-badge-pulse']])), 'raw reference colors'],
    ['missing status-badge geometry', fixture(new Map([[STATUS_BADGE_TOKENS, '@mixin base {}']])), 'exact-reference geometry'],
    ['current former Dribbble authority', fixture(new Map([[STATUS_BADGE_LEGACY_REFERENCE, 'current Dribbble reference']])), 'explicitly superseded'],
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
    [STATUS_BADGE_TEMPLATE, read(STATUS_BADGE_TEMPLATE)],
    [STATUS_BADGE_SCSS, read(STATUS_BADGE_SCSS)],
    [STATUS_BADGE_TONE_FEEDBACK_SCSS, read(STATUS_BADGE_TONE_FEEDBACK_SCSS)],
    [STATUS_BADGE_TONE_BRAND_SCSS, read(STATUS_BADGE_TONE_BRAND_SCSS)],
    [STATUS_BADGE_VARIANTS_SCSS, read(STATUS_BADGE_VARIANTS_SCSS)],
    [STATUS_BADGE_SIZES_SCSS, read(STATUS_BADGE_SIZES_SCSS)],
    [STATUS_BADGE_STATES_SCSS, read(STATUS_BADGE_STATES_SCSS)],
    [STATUS_BADGE_CONTENT_SCSS, read(STATUS_BADGE_CONTENT_SCSS)],
    [STATUS_BADGE_MOTION_SCSS, read(STATUS_BADGE_MOTION_SCSS)],
    [STATUS_BADGE_TOKENS, read(STATUS_BADGE_TOKENS)],
    [STATUS_BADGE_CONTRACT, read(STATUS_BADGE_CONTRACT)],
    [STATUS_BADGE_LEGACY_REFERENCE, read(STATUS_BADGE_LEGACY_REFERENCE)],
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
