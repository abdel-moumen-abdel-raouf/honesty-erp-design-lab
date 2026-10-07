import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/showcase/core-batch/core-batch.html';
const REVIEW_TABLE = 'src/app/review-internals/review-core-table/review-core-table.html';
const REVIEW_TABS = 'src/app/review-internals/review-core-tabs/review-core-tabs.html';
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
const AVATAR_TEMPLATE = 'src/app/controls/avatar/avatar.html';
const AVATAR_SCSS = 'src/app/controls/avatar/avatar.scss';
const AVATAR_SIZES = 'src/app/controls/avatar/avatar-sizes.scss';
const AVATAR_FRAME_TEMPLATE = 'src/app/controls/avatar/internal/avatar-frame.html';
const AVATAR_PRESENCE_TEMPLATE = 'src/app/controls/avatar/internal/avatar-presence-indicator.html';
const AVATAR_TONES = 'src/app/controls/avatar/internal/avatar-frame.scss';
const AVATAR_PRESENCE = 'src/app/controls/avatar/internal/avatar-presence-indicator.scss';
const AVATAR_MOTION = 'src/app/controls/avatar/internal/avatar-presence-motion.scss';
const AVATAR_FRAME_MOTION = 'src/app/controls/avatar/internal/avatar-frame-motion.scss';
const AVATAR_RESPONSIVE = 'src/app/controls/avatar/internal/avatar-action.scss';
const AVATAR_TOKENS = 'src/styles/foundation/components/avatar/_tokens.scss';
const AVATAR_CONTRACT = 'src/app/controls/avatar/ERP_AVATAR_REFERENCE_EXACT_V1.md';
const AVATAR_LEGACY_REFERENCE = 'src/app/controls/avatar/AVATAR_REFERENCE_V1.md';
const AVATAR_REFERENCE_SHA = '2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA';
const TABS_TS = 'src/app/controls/tabs/tabs.ts';
const TABS_TEMPLATE = 'src/app/controls/tabs/tabs.html';
const TABS_SCSS = 'src/app/controls/tabs/tabs.scss';
const TABS_INDICATOR_PANEL = 'src/app/controls/tabs/tabs-indicator-panel.scss';
const TABS_FACETS = 'src/app/controls/tabs/tabs-facets.scss';
const TABS_RESPONSIVE = 'src/app/controls/tabs/tabs-responsive.scss';
const TABS_TOKEN_CONTRACT = 'src/app/controls/tabs/tabs-token-contract.scss';
const TABS_MOTION = 'src/app/controls/tabs/tabs-motion.scss';
const TABS_TRIGGER_SCSS = 'src/app/controls/tabs/internal/tab-trigger.scss';
const TABS_TOKENS = 'src/styles/foundation/components/tabs/_tokens.scss';
const TABS_CONTRACT = 'src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md';
const TABS_LEGACY_REFERENCE = 'src/app/controls/tabs/TABS_REFERENCE_V1.md';
const TABS_REFERENCE_SHA = 'CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9';
const TABLE = 'src/app/controls/table/table.html';
const TABLE_TS = 'src/app/controls/table/table.ts';
const TABLE_SCSS = 'src/app/controls/table/table.scss';
const TABLE_STATES = 'src/app/controls/table/table-states.scss';
const TABLE_TOKENS = 'src/styles/foundation/components/table/_tokens.scss';
const TABLE_CONTRACT = 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md';
const TABLE_LEGACY_CONTRACT = 'src/app/controls/table/TABLE_V1.md';
const TABLE_REFERENCE_SHA = '292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1';
const PAGINATION = 'src/app/controls/pagination/pagination.html';
const PAGINATION_TS = 'src/app/controls/pagination/pagination.ts';
const AVATAR_PICKER = 'src/app/controls/avatar-picker/avatar-picker.ts';
const AVATAR_PICKER_TEMPLATE = 'src/app/controls/avatar-picker/avatar-picker.html';
const AVATAR_PICKER_TILE = 'src/app/controls/avatar-picker/internal/avatar-picker-tile.html';
const AVATAR_PICKER_SCSS = [
  'src/app/controls/avatar-picker/avatar-picker-tokens.scss',
  'src/app/controls/avatar-picker/avatar-picker.scss',
  'src/app/controls/avatar-picker/avatar-picker-grid.scss',
  'src/app/controls/avatar-picker/avatar-picker-footer.scss',
  'src/app/controls/avatar-picker/avatar-picker-motion.scss',
  'src/app/controls/avatar-picker/avatar-picker-responsive.scss',
  'src/app/controls/avatar-picker/internal/avatar-picker-tile.scss',
  'src/app/controls/avatar-picker/internal/avatar-picker-tile-tokens.scss',
  'src/app/controls/avatar-picker/internal/avatar-picker-tile-motion.scss',
];
const AVATAR_PICKER_TOKENS = 'src/styles/foundation/components/avatar-picker/_tokens.scss';
const AVATAR_PICKER_CONTRACT = 'src/app/controls/avatar-picker/ERP_AVATAR_PICKER_REFERENCE_EXACT_V1.md';
const AVATAR_PICKER_LEGACY_REFERENCE = 'src/app/controls/avatar-picker/AVATAR_PICKER_REFERENCE_V1.md';
const AVATAR_PICKER_REFERENCE_SHA = '24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66';
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
  const tabsReview = files.get(REVIEW_TABS) ?? '';
  const reviewEvidence = `${review}\n${files.get(REVIEW_TABLE) ?? ''}\n${tabsReview}`;
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
  const avatarTemplate = [
    AVATAR_TEMPLATE, AVATAR_FRAME_TEMPLATE, AVATAR_PRESENCE_TEMPLATE,
  ].map((file) => files.get(file) ?? '').join('\n');
  const avatarPresence = files.get(AVATAR_SCSS) ?? '';
  const avatarMotion = files.get(AVATAR_MOTION) ?? '';
  const avatarScss = [
    AVATAR_SCSS, AVATAR_SIZES, AVATAR_TONES, AVATAR_PRESENCE, AVATAR_MOTION,
    AVATAR_FRAME_MOTION, AVATAR_RESPONSIVE,
  ].map((file) => files.get(file) ?? '').join('\n');
  const avatarTokens = files.get(AVATAR_TOKENS) ?? '';
  const avatarContract = files.get(AVATAR_CONTRACT) ?? '';
  const avatarLegacyReference = files.get(AVATAR_LEGACY_REFERENCE) ?? '';
  const tabsTs = files.get(TABS_TS) ?? '';
  const tabsTemplate = files.get(TABS_TEMPLATE) ?? '';
  const tabsScss = [TABS_TOKEN_CONTRACT, TABS_SCSS, TABS_INDICATOR_PANEL, TABS_FACETS, TABS_RESPONSIVE, TABS_MOTION]
    .map((file) => files.get(file) ?? '').join('\n');
  const tabsTriggerScss = files.get(TABS_TRIGGER_SCSS) ?? '';
  const tabsTokens = files.get(TABS_TOKENS) ?? '';
  const tabsContract = files.get(TABS_CONTRACT) ?? '';
  const tabsLegacyReference = files.get(TABS_LEGACY_REFERENCE) ?? '';
  const table = files.get(TABLE) ?? '';
  const tableTs = files.get(TABLE_TS) ?? '';
  const tableScss = `${files.get(TABLE_SCSS) ?? ''}\n${files.get(TABLE_STATES) ?? ''}`;
  const tableTokens = files.get(TABLE_TOKENS) ?? '';
  const tableContract = files.get(TABLE_CONTRACT) ?? '';
  const tableLegacyContract = files.get(TABLE_LEGACY_CONTRACT) ?? '';
  const pagination = files.get(PAGINATION) ?? '';
  const paginationTs = files.get(PAGINATION_TS) ?? '';
  const avatarPicker = files.get(AVATAR_PICKER) ?? '';
  const avatarPickerTemplate = files.get(AVATAR_PICKER_TEMPLATE) ?? '';
  const avatarPickerTile = files.get(AVATAR_PICKER_TILE) ?? '';
  const avatarPickerScss = AVATAR_PICKER_SCSS.map((file) => files.get(file) ?? '').join('\n');
  const avatarPickerTokens = files.get(AVATAR_PICKER_TOKENS) ?? '';
  const avatarPickerContract = files.get(AVATAR_PICKER_CONTRACT) ?? '';
  const avatarPickerLegacyReference = files.get(AVATAR_PICKER_LEGACY_REFERENCE) ?? '';
  const avatarCatalog = files.get(AVATAR_CATALOG) ?? '';

  if (!routes.includes("path: 'controls/core-batch'")) {
    errors.push('The grouped core-component review route must remain registered');
  }
  if (/<\/?(?:form|button|input|select|textarea|table|svg)\b/i.test(review)) {
    errors.push('The routed core-component review must remain ERP-only authored');
  }
  if (/<\/?(?:form|button|input|select|textarea|table|svg)\b/i.test(files.get(REVIEW_TABLE) ?? '')) {
    errors.push('The exact Table reference experience must remain ERP-only authored');
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
    "'xs'", "'sm'", "'md'", "'lg'", "'xl'", "'2xl'", "'3xl'", "'4xl'", "'5xl'",
    "'circle' | 'rounded' | 'square'",
    "'neutral'",
    "'purple'",
    "'slate'",
    "'vacation'",
    "'top-left'",
    "'bottom-right'",
    "'bounce'",
    "'blink'",
    "'breathe'",
    "readonly initials = input<string | null>(null)",
    "readonly alt = input('')",
    "readonly ring = input(false",
    "readonly loading = input(false",
    "readonly interactive = input(false",
    'readonly avatarClick = output<MouseEvent>()',
  ]) {
    if (!avatarTs.includes(contract)) errors.push(`ErpAvatar contract is missing ${contract}`);
  }
  for (const hierarchy of [
    '<erp-avatar-action', '<erp-text', '<erp-icon', 'class="avatar__frame"',
    'class="avatar__image"', 'class="avatar__initials"',
    'class="avatar__presence-indicator"',
  ]) {
    if (!avatarTemplate.includes(hierarchy)) {
      errors.push(`ErpAvatar exact-reference hierarchy is missing ${hierarchy}`);
    }
  }
  if (/<svg\b/i.test(avatarTemplate) || /<button\b/i.test(avatarTemplate)) {
    errors.push('ErpAvatar must delegate icon and interactive semantics to approved internal owners');
  }
  if (!avatarScss.includes('@media (prefers-reduced-motion: reduce)')) {
    errors.push('ErpAvatar must disable authored motion for reduced-motion users');
  }
  if (!avatarScss.includes("@include query.viewport-down('sm')")) {
    errors.push('ErpAvatar narrow geometry must use the Foundation Query API');
  }
  if (/@media\s*\([^)]*(?:width|height)\s*:/iu.test(avatarScss)) {
    errors.push('ErpAvatar must not author raw responsive thresholds');
  }
  if (/(?:#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\()/iu.test(avatarScss)) {
    errors.push('ErpAvatar implementation must not copy raw reference colors');
  }
  if (avatarPresence.includes('inset-inline-')) {
    errors.push('ErpAvatar physical left/right presence positions must not use logical inline edges');
  }
  for (const [label, physicalEdge] of [
    ['left', /position='left'\]\)\s+erp-avatar-presence\s*\{[^}]*top:\s*50%;[^}]*left:/u],
    ['right', /position='right'\]\)\s+erp-avatar-presence\s*\{[^}]*top:\s*50%;[^}]*right:/u],
    ['top-left', /position='top-left'\]\)\s+erp-avatar-presence\s*\{[^}]*top:\s*0;[^}]*left:/u],
    ['bottom-right', /position='bottom-right'\]\)\s+erp-avatar-presence\s*\{[^}]*right:\s*0;[^}]*bottom:/u],
  ]) {
    if (!physicalEdge.test(avatarPresence)) {
      errors.push(`ErpAvatar physical positioning is missing ${label}`);
    }
  }
  if (!avatarPresence.includes('class="avatar__presence-indicator"') &&
      !avatarMotion.includes('.avatar__presence-indicator')) {
    errors.push('ErpAvatar presence motion requires a layer independent from positioning');
  }
  if (/presence-motion='(?:pulse|ping|bounce|blink|breathe)'\]\) \.avatar__presence\s*\{/u.test(avatarMotion)) {
    errors.push('ErpAvatar presence motion must not animate the positioning layer');
  }
  for (const geometry of [
    '--honesty-avatar-size: 1.5rem',
    '--honesty-avatar-size: 1.875rem',
    '--honesty-avatar-size: 2.375rem',
    '--honesty-avatar-size: 3.125rem',
    '--honesty-avatar-size: 4.25rem',
    '--honesty-avatar-size: 5.5rem',
    '--honesty-avatar-size: 7rem',
    '--honesty-avatar-size: 9rem',
    '--honesty-avatar-size: 11.5rem',
    '--honesty-avatar-rounded-radius: 26%',
    '--honesty-avatar-square-radius: 0.25rem',
    '--honesty-avatar-hover-scale: 1.06',
    '--honesty-avatar-active-scale: 0.96',
  ]) {
    if (!avatarTokens.includes(geometry)) {
      errors.push(`ErpAvatar Component Tokens are missing exact-reference geometry ${geometry}`);
    }
  }
  for (const mixin of [
    '@mixin base', '@mixin root-base', '@mixin frame-base', '@mixin action-base',
    '@mixin presence-base',
    '@mixin tone-brand', '@mixin tone-success', '@mixin tone-warning',
    '@mixin tone-danger', '@mixin tone-info', '@mixin tone-purple',
    '@mixin tone-slate', '@mixin presence-info', '@mixin presence-brand',
    '@mixin presence-pending', '@mixin presence-vacation',
  ]) {
    if (!avatarTokens.includes(mixin)) {
      errors.push(`ErpAvatar Component Tokens are missing ${mixin}`);
    }
  }
  if (/(?:#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\()/iu.test(avatarTokens)) {
    errors.push('ErpAvatar Component Tokens must map colors through Semantic roles');
  }
  if (!avatarContract.includes(AVATAR_REFERENCE_SHA) ||
      !avatarContract.includes('ERP-AVATAR.html') ||
      !avatarContract.includes('supersedes every earlier `ErpAvatar` visual reference')) {
    errors.push('ErpAvatar must retain the binding ERP-AVATAR.html SHA and authority contract');
  }
  if (!avatarLegacyReference.includes('SUPERSEDED') ||
      !avatarLegacyReference.includes(AVATAR_REFERENCE_SHA)) {
    errors.push('Former ErpAvatar references must remain explicitly superseded');
  }
  for (const evidence of [
    'class="avatar-reference-size-matrix"',
    'class="avatar-reference-content-types"',
    'class="avatar-reference-motion-matrix"',
    'class="avatar-reference-presence-matrix"',
    'data-avatar-direction-evidence="rtl"',
    'data-avatar-direction-evidence="ltr"',
    'avatar-large-size-matrix',
    'data-avatar-picker-large-size-evidence',
  ]) {
    if (!review.includes(evidence)) {
      errors.push(`Core review is missing Avatar exact-reference evidence ${evidence}`);
    }
  }

  for (const contract of [
    "'horizontal' | 'vertical'",
    "'start' | 'end'",
    "'content' | 'fill'",
    "'underline' | 'pill' | 'solid' | 'ghost' | 'pills'",
    "'text'",
    "'icon-text'",
    "'image-text'",
    "'slide'",
    "'scale'",
    'readonly tabClick = output<ErpTabItem>()',
    'readonly lazy = input(true)',
    'readonly keepAlive = input(true)',
    'private readonly instanceId = `erp-tabs-${++nextTabsInstanceId}`',
    'this.renderPanels() && this.shouldRenderPanel(item) ? this.panelDomId(index) : null',
  ]) {
    if (!tabsTs.includes(contract)) errors.push(`ErpTabs exact-reference contract is missing ${contract}`);
  }
  for (const hierarchy of [
    '<erp-tab-trigger', '<erp-icon', '<erp-text', '<erp-avatar',
    'class="tabs__indicator"', 'class="tabs__panel"',
  ]) {
    if (!tabsTemplate.includes(hierarchy)) {
      errors.push(`ErpTabs exact-reference hierarchy is missing ${hierarchy}`);
    }
  }
  for (const geometry of [
    '--honesty-tabs-tab-padding-block: 10px',
    '--honesty-tabs-tab-padding-inline: 16px',
    '--honesty-tabs-tab-gap: 8px',
    '--honesty-tabs-icon-size: 16px',
    '--honesty-tabs-image-size: 24px',
    '--honesty-tabs-count-min-size: 18px',
    '--honesty-tabs-count-padding-inline: 5px',
    '--honesty-tabs-indicator-size: 3px',
    '--honesty-tabs-track-radius: 12px',
    '--honesty-tabs-reference-tab-radius: 8px',
    '--honesty-tabs-vertical-list-size: 240px',
    '--honesty-tabs-vertical-gap: 20px',
    '--honesty-tabs-transition-fast: 140ms',
    '--honesty-tabs-transition-duration: 220ms',
    '--honesty-tabs-panel-transition-duration: 320ms',
    '--honesty-tabs-transition-easing: cubic-bezier(0.2, 0, 0, 1)',
    '--honesty-tabs-transition-easing-decelerate: cubic-bezier(0, 0, 0.2, 1)',
    '--honesty-tabs-transition-easing-spring: cubic-bezier(0.34, 1.4, 0.64, 1)',
    '--honesty-tabs-slide-distance: 16px',
    '--honesty-tabs-scale-start: 0.94',
    '@mixin variant-pill',
    '@mixin variant-solid',
    '@mixin variant-ghost',
    '@mixin variant-pills-compat',
  ]) {
    if (!tabsTokens.includes(geometry)) {
      errors.push(`ErpTabs exact-reference geometry is missing ${geometry}`);
    }
  }
  if (!tabsScss.includes('@media (prefers-reduced-motion: reduce)')) {
    errors.push('ErpTabs transitions must respect reduced motion');
  }
  if (!tabsScss.includes("query.viewport-down('sm')") ||
      /@media\s*\([^)]*(?:max|min)-width|@container\s*\([^)]*(?:max|min)-width/iu.test(tabsScss)) {
    errors.push('ErpTabs responsive behavior must use the Foundation Query API');
  }
  if (/(?:#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\()/iu.test(`${tabsScss}\n${tabsTokens}`)) {
    errors.push('ErpTabs must not copy raw reference colors');
  }
  if (/var\(--honesty-(?:color|border|radius|elevation|motion)-/u.test(tabsScss)) {
    errors.push('ErpTabs implementation SCSS must consume only its own Component Tokens');
  }
  if (tabsTriggerScss.includes('--honesty-tabs-')) {
    errors.push('ErpTabTrigger must remain a generic semantic owner without Tabs visual tokens');
  }
  if (!tabsContract.includes(TABS_REFERENCE_SHA) ||
      !tabsContract.includes('supersedes every previous `ErpTabs`')) {
    errors.push('ErpTabs exact-reference contract must record the binding ERP-TABS.html SHA and supersession');
  }
  if (!tabsLegacyReference.includes('SUPERSEDED') ||
      !tabsLegacyReference.includes(TABS_REFERENCE_SHA)) {
    errors.push('The former ErpTabs Nexlink reference must remain explicitly superseded');
  }
  for (const evidence of [
    'class="tabs-reference-parity-matrix"',
    'data-tabs-reference="ERP-TABS.html"',
    'data-tabs-specimen="demo-h1"',
    'data-tabs-specimen="demo-h2"',
    'data-tabs-specimen="demo-h3"',
    'data-tabs-specimen="demo-h4"',
    'data-tabs-specimen="demo-h5"',
    'data-tabs-specimen="demo-h6"',
    'data-tabs-specimen="demo-h7"',
    'data-tabs-specimen="demo-v1"',
    'data-tabs-specimen="demo-v2"',
    'data-tabs-specimen="demo-anim"',
    'variant="pill"',
    'variant="solid"',
    'orientation="vertical"',
    'distribution="fill"',
    'data-tabs-direction-evidence="rtl"',
    'data-tabs-direction-evidence="ltr"',
  ]) {
    if (!reviewEvidence.includes(evidence)) {
      errors.push(`Core review is missing Tabs exact-reference evidence ${evidence}`);
    }
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
  for (const contract of [
    "export type ErpTableDensity = 'compact' | 'normal' | 'comfortable'",
    "export type ErpTableLayout = 'horizontal' | 'vertical'",
    "readonly fixedHeight = input<number | null>(null)",
    "readonly hover = input(true",
    'readonly headerIcon?: ErpIconName',
  ]) {
    if (!tableTs.includes(contract)) errors.push(`ErpTable exact-reference API is missing ${contract}`);
  }
  for (const geometry of [
    '--honesty-table-radius: 12px',
    '--honesty-table-cell-padding-block: 12px',
    '--honesty-table-cell-padding-inline: 16px',
    '--honesty-table-header-padding-block: 8px',
    '--honesty-table-selection-size: 44px',
    '--honesty-table-resize-hit-size: 8px',
    '--honesty-table-resize-indicator-width: 2px',
    '--honesty-table-row-motion-duration: 140ms',
    '--honesty-table-row-motion-easing: cubic-bezier(0.2, 0, 0, 1)',
    '--honesty-table-vertical-label-width: 110px',
  ]) {
    if (!tableTokens.includes(geometry)) errors.push(`ErpTable exact-reference geometry is missing ${geometry}`);
  }
  if (/#[0-9a-f]{3,8}\b|\b(?:rgb|hsl)a?\(/iu.test(`${tableScss}\n${tableTokens}`)) {
    errors.push('ErpTable must not copy raw reference colors');
  }
  if (!tableContract.includes(TABLE_REFERENCE_SHA) ||
      !tableContract.includes('Separate ownership never means skipped visual evidence')) {
    errors.push('ErpTable full-experience contract must record the binding SHA and no-skipped-owner rule');
  }
  if (!tableLegacyContract.includes('SUPERSEDED') || !tableLegacyContract.includes(TABLE_REFERENCE_SHA)) {
    errors.push('The former ErpTable visual contract must remain explicitly superseded');
  }
  for (const evidence of [
    'data-table-reference-evidence="exact"',
    'data-table-reference-experience="complete"',
    '<erp-table-toolbar',
    '<erp-search-box',
    '<erp-column-chooser',
    '<erp-table',
    '<erp-pagination',
    'data-table-specimen="fixed-height"',
    'data-table-specimen="compact"',
    'data-table-specimen="vertical"',
    'data-table-specimen="header-types"',
  ]) {
    if (!(files.get(REVIEW_TABLE) ?? '').includes(evidence)) {
      errors.push(`Core review is missing ErpTable exact-reference evidence ${evidence}`);
    }
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

  if (!avatarPickerContract.includes(AVATAR_PICKER_REFERENCE_SHA) ||
      !avatarPickerContract.includes('exact visual and behavioral replication')) {
    errors.push('ErpAvatarPicker contract must record the binding ERP-AVATAR-PICKER.html SHA and exact-reference instruction');
  }
  if (!avatarPickerLegacyReference.includes('SUPERSEDED') ||
      !avatarPickerLegacyReference.includes(AVATAR_PICKER_REFERENCE_SHA)) {
    errors.push('Earlier ErpAvatarPicker references must be explicitly superseded by the exact reference');
  }
  for (const required of [
    'ERP_AVATAR_CATALOG', 'readonly avatarShape', 'readonly avatarSize',
    'readonly pick = output', 'readonly confirm = output', 'readonly cancelRequested = output',
  ]) {
    if (!avatarPicker.includes(required)) {
      errors.push(`ErpAvatarPicker exact-reference state contract is missing ${required}`);
    }
  }
  for (const required of [
    '<erp-tabs', '<erp-search-box', '<erp-avatar-picker-tile', '<erp-avatar',
    '<erp-empty-state', '<erp-button', '<erp-tooltip', '[renderPanels]="false"',
  ]) {
    if (!avatarPickerTemplate.includes(required)) {
      errors.push(`ErpAvatarPicker exact-reference hierarchy is missing ${required}`);
    }
  }
  if (!avatarPickerTile.includes('<erp-avatar') ||
      !avatarPickerTile.includes('<erp-icon name="check-mark"') ||
      /<img\b/i.test(`${avatarPickerTemplate}\n${avatarPickerTile}`)) {
    errors.push('ErpAvatarPicker tiles must render only through ErpAvatar and the semantic selected marker, never raw avatar images');
  }
  if (/role=["']tab["']/i.test(`${avatarPickerTemplate}\n${avatarPickerTile}`)) {
    errors.push('ErpAvatarPicker must not create a private Tabs implementation');
  }
  if (/[A-Za-z]:\\|Downloads[\\/]/i.test(`${avatarPicker}\n${avatarPickerTemplate}\n${avatarPickerTile}`)) {
    errors.push('ErpAvatarPicker runtime source must not depend on local Windows or Downloads paths');
  }
  if (/#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i.test(`${avatarPickerScss}\n${avatarPickerTokens}`)) {
    errors.push('ErpAvatarPicker must not copy raw reference colors');
  }
  if (/@media\s*\([^)]*(?:max|min)-width|@container\s*\([^)]*(?:max|min)-width/i.test(avatarPickerScss) ||
      !avatarPickerScss.includes("query.viewport-down('sm')")) {
    errors.push('ErpAvatarPicker responsive behavior must use the Foundation Query API');
  }
  for (const required of [
    '@mixin base', '@mixin root-base', '@mixin tile-base', '@mixin size-compact',
    '@mixin layout-narrow', '--honesty-avatar-picker-max-inline-size: 32.5rem',
    '--honesty-avatar-picker-tile-size: 4.75rem',
    '@mixin avatar-size-2xl', '@mixin avatar-size-3xl',
    '@mixin avatar-size-4xl', '@mixin avatar-size-5xl',
    '@mixin narrow-avatar-size-2xl', '@mixin narrow-avatar-size-3xl',
    '@mixin narrow-avatar-size-4xl', '@mixin narrow-avatar-size-5xl',
    '--honesty-avatar-picker-tile-size: 6.125rem',
    '--honesty-avatar-picker-tile-size: 7.625rem',
    '--honesty-avatar-picker-tile-size: 9.625rem',
    '--honesty-avatar-picker-tile-size: 12.125rem',
    '--honesty-avatar-picker-grid-gap: 0.75rem',
    '--honesty-avatar-picker-grid-max-block-size: 27.5rem',
    '--honesty-avatar-picker-check-size: 1.375rem',
  ]) {
    if (!avatarPickerTokens.includes(required)) {
      errors.push(`ErpAvatarPicker tokens are missing exact-reference geometry ${required}`);
    }
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
    const manifestIds = manifest.items?.map((item) => item.id) ?? [];
    if (manifest.total !== 40 || manifest.male !== 20 || manifest.female !== 20 || manifestPaths.length !== 40 ||
        new Set(manifestIds).size !== 40 || new Set(manifestPaths).size !== 40) {
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
    [REVIEW, '<erp-select/><erp-status-badge/><erp-alert/><erp-skeleton/><erp-avatar/><erp-tabs/><erp-avatar-picker/><erp-table/><erp-pagination/><div class="select-parity-matrix" sortMode="label" label="نتيجة فارغة" label="حالة غير صالحة"></div><div class="status-badge-parity-matrix"></div><div class="status-badge-size-matrix"></div><div class="status-badge-anatomy-matrix"></div><div data-status-badge-direction-evidence="rtl"></div><div data-status-badge-direction-evidence="ltr"></div><div class="avatar-reference-size-matrix"></div><div class="avatar-large-size-matrix"></div><div data-avatar-picker-large-size-evidence></div><div class="avatar-reference-content-types"></div><div class="avatar-reference-motion-matrix"></div><div class="avatar-reference-presence-matrix"></div><div data-avatar-direction-evidence="rtl"></div><div data-avatar-direction-evidence="ltr"></div><div class="tabs-reference-parity-matrix" data-tabs-reference="ERP-TABS.html"><erp-tabs variant="pill" data-tabs-direction-evidence="rtl"/><erp-tabs variant="solid" distribution="fill"/><erp-tabs variant="ghost" orientation="vertical" data-tabs-direction-evidence="ltr"/></div>'],
    [REVIEW_TABLE, '<div data-table-reference-evidence="exact"><div data-table-reference-experience="complete"><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/><erp-pagination/></div><div data-table-specimen="fixed-height"></div><div data-table-specimen="compact"></div><div data-table-specimen="vertical"></div><div data-table-specimen="header-types"></div></div>'],
    [REVIEW_TABS, '<div data-tabs-reference="ERP-TABS.html" data-tabs-direction-evidence="ltr"><div data-tabs-specimen="demo-h1"></div><div data-tabs-specimen="demo-h2"></div><div data-tabs-specimen="demo-h3" distribution="fill"></div><div data-tabs-specimen="demo-h4"></div><div data-tabs-specimen="demo-h5"></div><div data-tabs-specimen="demo-h6" variant="pill"></div><div data-tabs-specimen="demo-h7" variant="solid"></div><div data-tabs-specimen="demo-v1" orientation="vertical"></div><div data-tabs-specimen="demo-v2"></div><div data-tabs-specimen="demo-anim"></div><div data-tabs-direction-evidence="rtl"></div></div>'],
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
    [AVATAR_TS, "'xs'; 'sm'; 'md'; 'lg'; 'xl'; '2xl'; '3xl'; '4xl'; '5xl'; 'circle' | 'rounded' | 'square'; 'neutral'; 'purple'; 'slate'; 'vacation'; 'top-left'; 'bottom-right'; 'bounce'; 'blink'; 'breathe'; readonly initials = input<string | null>(null); readonly alt = input(''); readonly ring = input(false; readonly loading = input(false; readonly interactive = input(false; readonly avatarClick = output<MouseEvent>()"],
    [AVATAR_TEMPLATE, '<erp-avatar-action/><erp-text/><erp-icon/><span class="avatar__frame"></span><img class="avatar__image"><erp-text class="avatar__initials"/><span class="avatar__presence-indicator"></span>'],
    [AVATAR_FRAME_TEMPLATE, '<span class="avatar__frame"></span>'],
    [AVATAR_PRESENCE_TEMPLATE, '<span class="avatar__presence-indicator"></span>'],
    [AVATAR_SCSS, "@include query.viewport-down('sm') {} position='left']) erp-avatar-presence { top: 50%; left: 0; } position='right']) erp-avatar-presence { top: 50%; right: 0; } position='top-left']) erp-avatar-presence { top: 0; left: 0; } position='bottom-right']) erp-avatar-presence { right: 0; bottom: 0; }"],
    [AVATAR_SIZES, "@include tokens.size-xs; @include tokens.size-sm; @include tokens.size-lg; @include tokens.size-xl; @include tokens.size-2xl; @include tokens.size-3xl; @include tokens.size-4xl; @include tokens.size-5xl;"],
    [AVATAR_TONES, ''],
    [AVATAR_PRESENCE, 'class="avatar__presence-indicator"'],
    [AVATAR_MOTION, '@media (prefers-reduced-motion: reduce) {} .avatar__presence-indicator {}'],
    [AVATAR_FRAME_MOTION, '@media (prefers-reduced-motion: reduce) {} .avatar__frame {}'],
    [AVATAR_RESPONSIVE, ''],
    [AVATAR_TOKENS, '@mixin base {}; @mixin root-base {}; @mixin frame-base {}; @mixin action-base {}; @mixin presence-base {}; @mixin tone-brand {}; @mixin tone-success {}; @mixin tone-warning {}; @mixin tone-danger {}; @mixin tone-info {}; @mixin tone-purple {}; @mixin tone-slate {}; @mixin presence-info {}; @mixin presence-brand {}; @mixin presence-pending {}; @mixin presence-vacation {}; --honesty-avatar-size: 1.5rem; --honesty-avatar-size: 1.875rem; --honesty-avatar-size: 2.375rem; --honesty-avatar-size: 3.125rem; --honesty-avatar-size: 4.25rem; --honesty-avatar-size: 5.5rem; --honesty-avatar-size: 7rem; --honesty-avatar-size: 9rem; --honesty-avatar-size: 11.5rem; --honesty-avatar-rounded-radius: 26%; --honesty-avatar-square-radius: 0.25rem; --honesty-avatar-hover-scale: 1.06; --honesty-avatar-active-scale: 0.96;'],
    [AVATAR_CONTRACT, `${AVATAR_REFERENCE_SHA}; ERP-AVATAR.html supersedes every earlier \`ErpAvatar\` visual reference`],
    [AVATAR_LEGACY_REFERENCE, `SUPERSEDED; ${AVATAR_REFERENCE_SHA}`],
    [TABS_TS, "'horizontal' | 'vertical'; 'start' | 'end'; 'content' | 'fill'; 'underline' | 'pill' | 'solid' | 'ghost' | 'pills'; 'text'; 'icon-text'; 'image-text'; 'slide'; 'scale'; readonly tabClick = output<ErpTabItem>(); readonly lazy = input(true); readonly keepAlive = input(true); private readonly instanceId = `erp-tabs-${++nextTabsInstanceId}`; this.renderPanels() && this.shouldRenderPanel(item) ? this.panelDomId(index) : null"],
    [TABS_TEMPLATE, '<erp-tab-trigger/><erp-icon/><erp-text/><erp-avatar/><span class="tabs__indicator"></span><section class="tabs__panel"></section>'],
    [TABS_SCSS, ''],
    [TABS_INDICATOR_PANEL, ''],
    [TABS_FACETS, ''],
    [TABS_RESPONSIVE, "query.viewport-down('sm')"],
    [TABS_TOKEN_CONTRACT, "@include tokens.base"],
    [TABS_MOTION, '@media (prefers-reduced-motion: reduce) {}'],
    [TABS_TRIGGER_SCSS, '--honesty-tab-trigger-padding: 0'],
    [TABS_TOKENS, '@mixin base {}; @mixin variant-pill {}; @mixin variant-solid {}; @mixin variant-ghost {}; @mixin variant-pills-compat {}; --honesty-tabs-tab-padding-block: 10px; --honesty-tabs-tab-padding-inline: 16px; --honesty-tabs-tab-gap: 8px; --honesty-tabs-icon-size: 16px; --honesty-tabs-image-size: 24px; --honesty-tabs-count-min-size: 18px; --honesty-tabs-count-padding-inline: 5px; --honesty-tabs-indicator-size: 3px; --honesty-tabs-track-radius: 12px; --honesty-tabs-reference-tab-radius: 8px; --honesty-tabs-vertical-list-size: 240px; --honesty-tabs-vertical-gap: 20px; --honesty-tabs-transition-fast: 140ms; --honesty-tabs-transition-duration: 220ms; --honesty-tabs-panel-transition-duration: 320ms; --honesty-tabs-transition-easing: cubic-bezier(0.2, 0, 0, 1); --honesty-tabs-transition-easing-decelerate: cubic-bezier(0, 0, 0.2, 1); --honesty-tabs-transition-easing-spring: cubic-bezier(0.34, 1.4, 0.64, 1); --honesty-tabs-slide-distance: 16px; --honesty-tabs-scale-start: 0.94;'],
    [TABS_CONTRACT, `${TABS_REFERENCE_SHA}; ERP-TABS.html supersedes every previous \`ErpTabs\` visual reference`],
    [TABS_LEGACY_REFERENCE, `SUPERSEDED; ${TABS_REFERENCE_SHA}`],
    [TABLE, '<erp-check-box/><erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow'],
    [TABLE_TS, "if (this.rowActivatable()) this.rowActivated.emit(row); export type ErpTableDensity = 'compact' | 'normal' | 'comfortable'; export type ErpTableLayout = 'horizontal' | 'vertical'; readonly fixedHeight = input<number | null>(null); readonly hover = input(true; readonly headerIcon?: ErpIconName;"],
    [TABLE_SCSS, '@media (prefers-reduced-motion: reduce) {}'],
    [TABLE_STATES, ''],
    [TABLE_TOKENS, '@mixin base {}; --honesty-table-radius: 12px; --honesty-table-cell-padding-block: 12px; --honesty-table-cell-padding-inline: 16px; --honesty-table-header-padding-block: 8px; --honesty-table-selection-size: 44px; --honesty-table-resize-hit-size: 8px; --honesty-table-resize-indicator-width: 2px; --honesty-table-row-motion-duration: 140ms; --honesty-table-row-motion-easing: cubic-bezier(0.2, 0, 0, 1); --honesty-table-vertical-label-width: 110px;'],
    [TABLE_CONTRACT, `${TABLE_REFERENCE_SHA}; Separate ownership never means skipped visual evidence`],
    [TABLE_LEGACY_CONTRACT, `SUPERSEDED; ${TABLE_REFERENCE_SHA}`],
    [PAGINATION, '<erp-inline class="pagination__size-row"><erp-select label="عدد السجلات" labelMode="visually-hidden"/></erp-inline>'],
    [PAGINATION_TS, ['showSummary', 'showPageSize', 'showFirst', 'showPrevious', 'showPageNumbers', 'showNext', 'showLast'].map((name) => `readonly ${name} = input(true`).join(';')],
    [AVATAR_PICKER, 'ERP_AVATAR_CATALOG; readonly avatarShape; readonly avatarSize; readonly pick = output; readonly confirm = output; readonly cancelRequested = output'],
    [AVATAR_PICKER_TEMPLATE, '<erp-tabs [renderPanels]="false"/><erp-search-box/><erp-avatar-picker-tile/><erp-avatar/><erp-empty-state/><erp-button/><erp-tooltip/>'],
    [AVATAR_PICKER_TILE, '<button><erp-avatar/><erp-icon name="check-mark"/></button>'],
    ...AVATAR_PICKER_SCSS.map((file) => [file, file.endsWith('responsive.scss') ? "query.viewport-down('sm')" : '']),
    [AVATAR_PICKER_TOKENS, '@mixin base {}; @mixin root-base {}; @mixin tile-base {}; @mixin size-compact {}; @mixin layout-narrow {}; @mixin avatar-size-2xl {}; @mixin avatar-size-3xl {}; @mixin avatar-size-4xl {}; @mixin avatar-size-5xl {}; @mixin narrow-avatar-size-2xl {}; @mixin narrow-avatar-size-3xl {}; @mixin narrow-avatar-size-4xl {}; @mixin narrow-avatar-size-5xl {}; --honesty-avatar-picker-max-inline-size: 32.5rem; --honesty-avatar-picker-tile-size: 4.75rem; --honesty-avatar-picker-tile-size: 6.125rem; --honesty-avatar-picker-tile-size: 7.625rem; --honesty-avatar-picker-tile-size: 9.625rem; --honesty-avatar-picker-tile-size: 12.125rem; --honesty-avatar-picker-grid-gap: 0.75rem; --honesty-avatar-picker-grid-max-block-size: 27.5rem; --honesty-avatar-picker-check-size: 1.375rem;'],
    [AVATAR_PICKER_CONTRACT, `${AVATAR_PICKER_REFERENCE_SHA}; exact visual and behavioral replication`],
    [AVATAR_PICKER_LEGACY_REFERENCE, `SUPERSEDED; ${AVATAR_PICKER_REFERENCE_SHA}`],
    [AVATAR_CATALOG, "avatarItems('male', 1, 20); avatarItems('female', 21, 40); /assets/honesty-erp-avatars/users/"],
    [AVATAR_ASSET_ROOT, ['manifest.json', ...Array.from({length: 40}, (_, index) => `avatar-${index + 1}.png`)]],
    [AVATAR_MANIFEST, JSON.stringify({total: 40, male: 20, female: 20, items: Array.from({length: 40}, (_, index) => ({id: `avatar-${index + 1}`, imageUrl: `/assets/honesty-erp-avatars/users/avatar-${index + 1}.png`}))})],
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
    ['missing avatar reduced motion', fixture(new Map([
      [AVATAR_MOTION, ''],
      [AVATAR_FRAME_MOTION, ''],
    ])), 'reduced-motion'],
    ['logical avatar positions', fixture(new Map([[AVATAR_SCSS, "inset-inline-start: 0; class=\"avatar__presence-indicator\";"]])), 'physical left/right'],
    ['motion on avatar positioning layer', fixture(new Map([[AVATAR_MOTION, ":host([data-avatar-presence-motion='pulse']) .avatar__presence { animation: pulse; }"]])), 'positioning layer'],
    ['missing avatar reference SHA', fixture(new Map([[AVATAR_CONTRACT, 'old avatar reference']])), 'binding ERP-AVATAR.html SHA'],
    ['missing avatar exact size', fixture(new Map([[AVATAR_TOKENS, '@mixin base {}']])), 'exact-reference geometry'],
    ['raw avatar color', fixture(new Map([[AVATAR_TONES, '#fff']])), 'raw reference colors'],
    ['missing avatar hierarchy', fixture(new Map([[AVATAR_TEMPLATE, '<span class="avatar__frame"></span>']])), 'exact-reference hierarchy'],
    ['raw avatar breakpoint', fixture(new Map([[AVATAR_SCSS, '@media (max-width: 520px) {}']])), 'Foundation Query API'],
    ['current former avatar authority', fixture(new Map([[AVATAR_LEGACY_REFERENCE, 'current external references']])), 'explicitly superseded'],
    ['missing tabs reference SHA', fixture(new Map([[TABS_CONTRACT, 'old tabs reference']])), 'binding ERP-TABS.html SHA'],
    ['current former Nexlink authority', fixture(new Map([[TABS_LEGACY_REFERENCE, 'current Nexlink reference']])), 'explicitly superseded'],
    ['missing tabs hierarchy', fixture(new Map([[TABS_TEMPLATE, '<erp-tab-trigger/>']])), 'exact-reference hierarchy'],
    ['missing tabs exact geometry', fixture(new Map([[TABS_TOKENS, '@mixin base {}']])), 'exact-reference geometry'],
    ['raw tabs color', fixture(new Map([[TABS_SCSS, '#fff']])), 'raw reference colors'],
    ['raw tabs breakpoint', fixture(new Map([[TABS_FACETS, '@media (max-width: 640px) {}']])), 'Foundation Query API'],
    ['tabs visuals leak into trigger', fixture(new Map([[TABS_TRIGGER_SCSS, '--honesty-tabs-tab-bg: red']])), 'generic semantic owner'],
    ['missing panel-less aria contract', fixture(new Map([[TABS_TS, "'horizontal' | 'vertical'; 'start' | 'end'; 'content' | 'fill'; 'underline' | 'pill' | 'solid' | 'ghost' | 'pills'; 'text'; 'icon-text'; 'image-text'; 'slide'; 'scale'; readonly tabClick = output<ErpTabItem>(); readonly lazy = input(true); readonly keepAlive = input(true); private readonly instanceId = `erp-tabs-${++nextTabsInstanceId}`;"]])), 'renderPanels'],
    ['missing avatar-picker reference SHA', fixture(new Map([[AVATAR_PICKER_CONTRACT, 'old picker reference']])), 'binding ERP-AVATAR-PICKER.html SHA'],
    ['current former avatar-picker authority', fixture(new Map([[AVATAR_PICKER_LEGACY_REFERENCE, 'current external references']])), 'explicitly superseded'],
    ['missing avatar-picker tabs owner', fixture(new Map([[AVATAR_PICKER_TEMPLATE, '<erp-search-box/><erp-avatar-picker-tile/><erp-avatar/><erp-empty-state/><erp-button/><erp-tooltip/>']])), 'erp-tabs'],
    ['raw avatar-picker image', fixture(new Map([[AVATAR_PICKER_TILE, '<button><img src="avatar.png"></button>']])), 'never raw avatar images'],
    ['private avatar-picker tabs', fixture(new Map([[AVATAR_PICKER_TILE, '<button role="tab"><erp-avatar/><erp-icon name="check-mark"/></button>']])), 'private Tabs implementation'],
    ['local avatar-picker path', fixture(new Map([[AVATAR_PICKER, 'C:\\Users\\Owner\\Downloads\\avatar.png']])), 'local Windows'],
    ['missing avatar-picker exact geometry', fixture(new Map([[AVATAR_PICKER_TOKENS, '@mixin base {}']])), 'exact-reference geometry'],
    ['missing table selection owner', fixture(new Map([[TABLE, '<erp-sort-header/><erp-table-resize-handle/><tfoot></tfoot> descriptionKey data-overflow']])), 'erp-check-box'],
    ['selection activates table rows', fixture(new Map([[TABLE_TS, 'if (this.rowActivatable() || this.selectable()) this.rowActivated.emit(row);']])), 'independent from checkbox selection'],
    ['missing table reference SHA', fixture(new Map([[TABLE_CONTRACT, 'old table reference']])), 'full-experience contract'],
    ['missing exact reference composition owner', fixture(new Map([[REVIEW_TABLE, '<div data-table-reference-evidence="exact"><div data-table-reference-experience="complete"><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/></div><div data-table-specimen="fixed-height"></div><div data-table-specimen="compact"></div><div data-table-specimen="vertical"></div><div data-table-specimen="header-types"></div></div>']])), 'erp-pagination'],
    ['raw control inside exact reference composition', fixture(new Map([[REVIEW_TABLE, '<div data-table-reference-evidence="exact"><div data-table-reference-experience="complete"><input/><erp-table-toolbar/><erp-search-box/><erp-column-chooser/><erp-table/><erp-pagination/></div><div data-table-specimen="fixed-height"></div><div data-table-specimen="compact"></div><div data-table-specimen="vertical"></div><div data-table-specimen="header-types"></div></div>']])), 'ERP-only'],
    ['missing table exact geometry', fixture(new Map([[TABLE_TOKENS, '@mixin base {}']])), 'exact-reference geometry'],
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
    [REVIEW_TABS, read(REVIEW_TABS)],
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
    [AVATAR_TEMPLATE, read(AVATAR_TEMPLATE)],
    [AVATAR_FRAME_TEMPLATE, read(AVATAR_FRAME_TEMPLATE)],
    [AVATAR_PRESENCE_TEMPLATE, read(AVATAR_PRESENCE_TEMPLATE)],
    [AVATAR_SCSS, read(AVATAR_SCSS)],
    [AVATAR_SIZES, read(AVATAR_SIZES)],
    [AVATAR_TONES, read(AVATAR_TONES)],
    [AVATAR_PRESENCE, read(AVATAR_PRESENCE)],
    [AVATAR_MOTION, read(AVATAR_MOTION)],
    [AVATAR_FRAME_MOTION, read(AVATAR_FRAME_MOTION)],
    [AVATAR_RESPONSIVE, read(AVATAR_RESPONSIVE)],
    [AVATAR_TOKENS, read(AVATAR_TOKENS)],
    [AVATAR_CONTRACT, read(AVATAR_CONTRACT)],
    [AVATAR_LEGACY_REFERENCE, read(AVATAR_LEGACY_REFERENCE)],
    [TABS_TS, read(TABS_TS)],
    [TABS_TEMPLATE, read(TABS_TEMPLATE)],
    [TABS_SCSS, read(TABS_SCSS)],
    [TABS_INDICATOR_PANEL, read(TABS_INDICATOR_PANEL)],
    [TABS_FACETS, read(TABS_FACETS)],
    [TABS_RESPONSIVE, read(TABS_RESPONSIVE)],
    [TABS_TOKEN_CONTRACT, read(TABS_TOKEN_CONTRACT)],
    [TABS_MOTION, read(TABS_MOTION)],
    [TABS_TRIGGER_SCSS, read(TABS_TRIGGER_SCSS)],
    [TABS_TOKENS, read(TABS_TOKENS)],
    [TABS_CONTRACT, read(TABS_CONTRACT)],
    [TABS_LEGACY_REFERENCE, read(TABS_LEGACY_REFERENCE)],
    [TABLE, read(TABLE)],
    [TABLE_TS, read(TABLE_TS)],
    [TABLE_SCSS, read(TABLE_SCSS)],
    [TABLE_STATES, read(TABLE_STATES)],
    [TABLE_TOKENS, read(TABLE_TOKENS)],
    [TABLE_CONTRACT, read(TABLE_CONTRACT)],
    [TABLE_LEGACY_CONTRACT, read(TABLE_LEGACY_CONTRACT)],
    [PAGINATION, read(PAGINATION)],
    [PAGINATION_TS, read(PAGINATION_TS)],
    [AVATAR_PICKER, read(AVATAR_PICKER)],
    [AVATAR_PICKER_TEMPLATE, read(AVATAR_PICKER_TEMPLATE)],
    [AVATAR_PICKER_TILE, read(AVATAR_PICKER_TILE)],
    ...AVATAR_PICKER_SCSS.map((file) => [file, read(file)]),
    [AVATAR_PICKER_TOKENS, read(AVATAR_PICKER_TOKENS)],
    [AVATAR_PICKER_CONTRACT, read(AVATAR_PICKER_CONTRACT)],
    [AVATAR_PICKER_LEGACY_REFERENCE, read(AVATAR_PICKER_LEGACY_REFERENCE)],
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
