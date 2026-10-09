import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-shell-batch/shell-batch.html';
const CONTRACTS = 'src/app/controls/shell-family/shell-contracts.ts';
const SHELL_REFERENCE = 'src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md';
const SIDEBAR_REFERENCE = 'src/app/controls/sidebar/ERP_SIDEBAR_REFERENCE_V1.md';
const TOPBAR_REFERENCE = 'src/app/controls/topbar/ERP_TOPBAR_REFERENCE_V1.md';
const TOPBAR_SHOWCASE = 'src/app/showcase/components/topbar/topbar-showcase.html';
const APP_FOOTER_REFERENCE = 'src/app/controls/app-footer/ERP_APP_FOOTER_CANDIDATE_V1.md';
const APP_FOOTER_SHOWCASE = 'src/app/showcase/components/app-footer/app-footer-showcase.html';
const USER_MENU_REFERENCE = 'src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md';
const OWNERS = [
  'app-footer',
  'breadcrumbs',
  'page-header',
  'page-shell',
  'sidebar',
  'topbar',
  'branch-selector',
  'global-search',
  'notification-bell',
  'user-menu',
  'app-shell',
];

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

export function validateShellNavigation(files) {
  const errors = [];
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const contracts = files.get(CONTRACTS) ?? '';
  const shellReference = files.get(SHELL_REFERENCE) ?? '';
  const sidebarReference = files.get(SIDEBAR_REFERENCE) ?? '';
  const topbarReference = files.get(TOPBAR_REFERENCE) ?? '';
  const appFooterReference = files.get(APP_FOOTER_REFERENCE) ?? '';
  const sources = OWNERS.map(
    (owner) => files.get(`src/app/controls/${owner}/${owner}.ts`) ?? '',
  ).join('\n');
  const templates = OWNERS.map(
    (owner) => files.get(`src/app/controls/${owner}/${owner}.html`) ?? '',
  ).join('\n');
  const styles = OWNERS.map(
    (owner) => files.get(`src/app/controls/${owner}/${owner}.scss`) ?? '',
  ).join('\n');
  const combined = `${contracts}\n${sources}\n${templates}\n${review}`;

  for (const owner of OWNERS) {
    const source = files.get(`src/app/controls/${owner}/${owner}.ts`) ?? '';
    const className = owner
      .split('-')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');

    if (!source.includes(`export class Erp${className}`)) {
      errors.push(`Missing authorized Shell owner: ${owner}`);
    }

    const tokenSource =
      files.get(`src/styles/foundation/components/${owner}/_tokens.scss`) ?? '';
    if (!/@mixin\s+base\s*\{/.test(tokenSource)) {
      errors.push(`Missing Component Token base for ${owner}`);
    }
  }

  if (!routes.includes("path: 'controls/shell-batch'")) {
    errors.push('The Shell Batch review route must remain registered');
  }

  if (/<\/?(?!erp-)(?:form|button|input|select|textarea|nav|header|main|aside|section|div|span|a|ul|li)\b/i.test(review)) {
    errors.push('The routed Shell Batch review must remain ERP-only authored');
  }

  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(|https?:\/\//.test(combined)) {
    errors.push('Shell and navigation owners must remain transport-agnostic');
  }

  if (/\b(?:Router|AuthService|SessionService)\b/.test(combined)) {
    errors.push('Shell owners must not own router, authentication, or session services');
  }

  if (/\bThemeMode\b|readonly\s+theme\s*=\s*input|data-theme|localStorage|sessionStorage/.test(combined)) {
    errors.push('Shell owners must not create local theme authority');
  }

  if (/@media\s*\(\s*(?:min|max)-width|@container\s*\([^)]*(?:min|max)-width/.test(styles)) {
    errors.push('Shell owner styles must use the Foundation Query API');
  }

  const appShell = files.get('src/app/controls/app-shell/app-shell.html') ?? '';
  if (!appShell.includes('<erp-sidebar') || !appShell.includes('<erp-topbar')) {
    errors.push('ErpAppShell must compose ErpSidebar and ErpTopbar');
  }

  const sidebar = `${files.get('src/app/controls/sidebar/sidebar.ts') ?? ''}\n${files.get('src/app/controls/sidebar/sidebar.html') ?? ''}`;
  const sidebarTokens = files.get(
    'src/styles/foundation/components/sidebar/_tokens.scss',
  ) ?? '';
  for (const contract of [
    'readonly collapsed = model(false)',
    'readonly expandedIds = model<readonly string[]>([])',
    'ErpSidebarDisclosure',
    'ErpSidebarLink',
    'ErpIconButton',
    'ErpTooltip',
    'data-sidebar-active-ancestor',
  ]) {
    if (!sidebar.includes(contract)) {
      errors.push(`ErpSidebar reference contract is missing: ${contract}`);
    }
  }
  for (const referenceValue of ['16.875rem', '3.75rem', '2.5rem']) {
    if (!sidebarTokens.includes(referenceValue)) {
      errors.push(`ErpSidebar reference geometry token is missing: ${referenceValue}`);
    }
  }
  if (
    !shellReference.includes('00905891AF3FE58429227E5099688480DBB78BA8843D5930D0962A1525304542') ||
    !shellReference.includes('1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA') ||
    !sidebarReference.includes('PRODUCT_OWNER_VISUAL_REVIEW_PENDING')
  ) {
    errors.push('ErpSidebar reference register, source hashes, and visual-review status must remain current');
  }

  const topbarTemplate = files.get('src/app/controls/topbar/topbar.html') ?? '';
  const topbarTokens = files.get(
    'src/styles/foundation/components/topbar/_tokens.scss',
  ) ?? '';
  const topbarShowcase = files.get(TOPBAR_SHOWCASE) ?? '';
  for (const slot of [
    'erpTopbarStart',
    'erpTopbarContext',
    'erpTopbarSearch',
    'erpTopbarActions',
    'erpTopbarUser',
  ]) {
    if (!topbarTemplate.includes(slot)) {
      errors.push(`ErpTopbar canonical projection slot is missing: ${slot}`);
    }
  }
  if (topbarTemplate.includes('erpTopbarNotifications') || topbarShowcase.includes('erpTopbarNotifications')) {
    errors.push('ErpTopbar must not restore the superseded notification-only projection slot');
  }
  for (const owner of [
    'erp-branch-selector',
    'erp-global-search',
    'erp-notification-bell',
    'erp-user-menu',
  ]) {
    if (!topbarShowcase.includes(owner)) {
      errors.push(`ErpTopbar workbench must project the real ${owner} owner`);
    }
  }
  for (const referenceValue of ['3.75rem', '1.5rem', '30%', '0.5rem']) {
    if (!topbarTokens.includes(referenceValue)) {
      errors.push(`ErpTopbar reference geometry token is missing: ${referenceValue}`);
    }
  }
  if (!topbarReference.includes('PRODUCT_OWNER_VISUAL_REVIEW_PENDING')) {
    errors.push('ErpTopbar reference contract must preserve pending Product Owner visual status');
  }

  const appFooterSource = files.get('src/app/controls/app-footer/app-footer.ts') ?? '';
  const appFooterTemplate = files.get('src/app/controls/app-footer/app-footer.html') ?? '';
  const appFooterShowcase = files.get(APP_FOOTER_SHOWCASE) ?? '';
  for (const owner of ['ErpButton', 'ErpStatusBadge', 'ErpText']) {
    if (!appFooterSource.includes(owner)) {
      errors.push(`ErpAppFooter must reuse ${owner}`);
    }
  }
  if (!appFooterTemplate.includes('<footer') || !appFooterTemplate.includes('(pressed)="activate(action)"')) {
    errors.push('ErpAppFooter must own the footer landmark and emit consumer action intent');
  }
  if (!appFooterShowcase.includes('<erp-app-footer') || !appFooterShowcase.includes('data-showcase-target')) {
    errors.push('ErpAppFooter must retain one dedicated live workbench target');
  }
  if (
    !appFooterReference.includes('original Honesty ERP') ||
    !appFooterReference.includes('PRODUCT_OWNER_VISUAL_REVIEW_PENDING') ||
    !appFooterReference.includes('Gxon') ||
    !appFooterReference.includes('unavailable')
  ) {
    errors.push('ErpAppFooter must record original-design authority and the unavailable Gxon boundary');
  }

  const branchSelector = `${files.get('src/app/controls/branch-selector/branch-selector.ts') ?? ''}\n${files.get('src/app/controls/branch-selector/branch-selector.html') ?? ''}`;
  if (!branchSelector.includes('ErpSelect') || !branchSelector.includes('<erp-select')) {
    errors.push('ErpBranchSelector must reuse ErpSelect');
  }

  const globalSearch = `${files.get('src/app/controls/global-search/global-search.ts') ?? ''}\n${files.get('src/app/controls/global-search/global-search.html') ?? ''}`;
  if (!globalSearch.includes('ErpSearchBox') || !globalSearch.includes('<erp-search-box')) {
    errors.push('ErpGlobalSearch must reuse ErpSearchBox');
  }

  const userMenu = `${files.get('src/app/controls/user-menu/user-menu.ts') ?? ''}\n${files.get('src/app/controls/user-menu/user-menu.html') ?? ''}`;
  if (!userMenu.includes('ErpAvatar') || !userMenu.includes('ShellAnchoredSurfaceController')) {
    errors.push('ErpUserMenu must reuse Avatar and anchored surface infrastructure');
  }
  if (!userMenu.includes('ErpStatusBadge') || !userMenu.includes('<erp-status-badge')) {
    errors.push('ErpUserMenu must reuse ErpStatusBadge for role and branch identity labels');
  }
  if (!userMenu.includes('ErpDivider') || !userMenu.includes('crossAxisAlignment: \'end\'')) {
    errors.push('ErpUserMenu must compose dividers and use logical-end anchored placement');
  }
  for (const visibilityInput of [
    'showAvatar',
    'showUserName',
    'showEmail',
    'showPresence',
    'showRoleBadge',
    'showBranchBadge',
  ]) {
    if (!userMenu.includes(`readonly ${visibilityInput} = input(true`)) {
      errors.push(`ErpUserMenu must expose default-true ${visibilityInput} visibility control`);
    }
  }
  for (const triggerVisibilityInput of [
    'showTriggerRoleBadge',
    'showTriggerBranchBadge',
  ]) {
    if (!userMenu.includes(`readonly ${triggerVisibilityInput} = input(false`)) {
      errors.push(`ErpUserMenu must expose default-false trigger-specific ${triggerVisibilityInput} visibility control`);
    }
  }
  if (
    !userMenu.includes('triggerRoleVisible') ||
    !userMenu.includes('triggerBranchVisible') ||
    !userMenu.includes('user-menu__trigger-metadata') ||
    !userMenu.includes('user-menu__badges--trigger')
  ) {
    errors.push('ErpUserMenu trigger badges must remain independently gated inside the third identity row');
  }

  for (const identityField of ['email?', 'roleLabel?', 'branchLabel?', 'avatarPresence?']) {
    if (!contracts.includes(identityField)) {
      errors.push(`ErpShellUserSummary is missing compatible rich-identity field: ${identityField}`);
    }
  }

  const userMenuReference = files.get(USER_MENU_REFERENCE) ?? '';
  if (
    !userMenuReference.includes('75F64AE955800ABE9FCBE27D7B09161D95E2DE2C77B6106C337AA4841D39D399') ||
    !userMenuReference.includes('1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA')
  ) {
    errors.push('ErpUserMenu exact-reference contract and verified source hashes must remain current');
  }

  const userMenuStyles = files.get('src/app/controls/user-menu/user-menu.scss') ?? '';
  const userMenuArrowStyles =
    files.get('src/app/controls/user-menu/internal/user-menu-arrow.scss') ?? '';
  const userMenuTokens =
    files.get('src/styles/foundation/components/user-menu/_tokens.scss') ?? '';
  if (
    !userMenuStyles.includes('@media (prefers-reduced-motion: reduce)') ||
    !userMenuStyles.includes('animation: none')
  ) {
    errors.push('ErpUserMenu must preserve an explicit reduced-motion override');
  }
  if (
    !userMenu.includes('arrowWidth:') ||
    !userMenu.includes('arrowSafeInset:') ||
    !userMenu.includes("allowedPlacements: ['bottom', 'top']") ||
    !userMenu.includes('prepareGeometry:') ||
    !userMenuArrowStyles.includes(
      '--honesty-anchored-surface-arrow-cross-axis-center',
    ) ||
    !userMenu.includes('ErpUserMenuArrow') ||
    !userMenu.includes('<erp-user-menu-arrow')
  ) {
    errors.push('ErpUserMenu must use measured vertical-only anchored geometry and arrow tracking');
  }
  if (
    !userMenuStyles.includes('min-inline-size: 0') ||
    !/user-menu__surface[^}]*overflow:\s*visible/s.test(userMenuStyles) ||
    !/user-menu__surface[^}]*color:\s*var\(--honesty-user-menu-fg\)/s.test(userMenuStyles) ||
    !/user-menu__items[^}]*overflow(?:-y)?:\s*auto/s.test(userMenuStyles) ||
    !(
      /user-menu__identity-header[^}]*flex:\s*0 0 auto/s.test(userMenuStyles) ||
      /user-menu__surface\s*>\s*\*[^}]*flex:\s*none/s.test(userMenuStyles)
    ) ||
    !/user-menu__items[^}]*flex:\s*(?:auto|1 1 auto)/s.test(userMenuStyles) ||
    !/user-menu__surface:popover-open[^}]*display:\s*flex/s.test(userMenuStyles) ||
    /user-menu__trigger-name[^}]*display:\s*none/s.test(userMenuStyles) ||
    /user-menu__trigger-identity[^}]*block-size:/s.test(userMenuStyles) ||
    !/user-menu__badges--trigger[^}]*grid-auto-flow:\s*column/s.test(userMenuStyles)
  ) {
    errors.push('ErpUserMenu must preserve responsive identity sizing and open-only flex layout without unconditional name hiding');
  }
  for (const referenceValue of [
    '360px',
    '8px',
    '10px',
    '600ms',
    'cubic-bezier(0.25, 0.8, 0.25, 1)',
    '--honesty-user-menu-trigger-padding: 6px 10px',
    '--honesty-user-menu-trigger-min-size: 52px',
    '--honesty-user-menu-trigger-copy-gap: 1px',
  ]) {
    if (!userMenuTokens.includes(referenceValue)) {
      errors.push(`ErpUserMenu reference geometry or motion token is missing: ${referenceValue}`);
    }
  }

  const anchoredOwners = [
    files.get('src/app/controls/notification-bell/notification-bell.ts') ?? '',
    files.get('src/app/controls/user-menu/user-menu.ts') ?? '',
  ].join('\n');
  if (/\.showPopover\s*\(|\.hidePopover\s*\(|ErpOverlayManager/.test(anchoredOwners)) {
    errors.push('Shell owners must not create a duplicate or manual overlay engine');
  }

  for (const contract of [
    'ErpNavigationItem',
    'ErpBreadcrumbItem',
    'ErpShellUserSummary',
    'ErpBranchOption',
    'ErpNotificationSummary',
  ]) {
    if (!contracts.includes(`export interface ${contract}`)) {
      errors.push(`Missing shared Shell contract: ${contract}`);
    }
  }

  return errors;
}

function validFixture(overrides = new Map()) {
  const files = new Map([
    [ROUTES, "path: 'controls/shell-batch'"],
    [REVIEW, '<erp-app-shell></erp-app-shell>'],
    [CONTRACTS, 'export interface ErpNavigationItem {} export interface ErpBreadcrumbItem {} export interface ErpShellUserSummary { email?: string; roleLabel?: string; branchLabel?: string; avatarPresence?: string; } export interface ErpBranchOption {} export interface ErpNotificationSummary {}'],
    [SHELL_REFERENCE, '00905891AF3FE58429227E5099688480DBB78BA8843D5930D0962A1525304542 1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA'],
    [SIDEBAR_REFERENCE, 'PRODUCT_OWNER_VISUAL_REVIEW_PENDING'],
    [TOPBAR_REFERENCE, 'PRODUCT_OWNER_VISUAL_REVIEW_PENDING'],
    [TOPBAR_SHOWCASE, '<erp-branch-selector erpTopbarContext /><erp-global-search erpTopbarSearch /><erp-notification-bell erpTopbarActions /><erp-user-menu erpTopbarUser />'],
    [APP_FOOTER_REFERENCE, 'original Honesty ERP PRODUCT_OWNER_VISUAL_REVIEW_PENDING Gxon unavailable'],
    [APP_FOOTER_SHOWCASE, '<erp-app-footer data-showcase-target />'],
    [USER_MENU_REFERENCE, '75F64AE955800ABE9FCBE27D7B09161D95E2DE2C77B6106C337AA4841D39D399 1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA'],
  ]);

  for (const owner of OWNERS) {
    const className = owner
      .split('-')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
    files.set(`src/app/controls/${owner}/${owner}.ts`, `export class Erp${className} {}`);
    files.set(`src/app/controls/${owner}/${owner}.html`, '<erp-text></erp-text>');
    files.set(`src/app/controls/${owner}/${owner}.scss`, '');
    files.set(
      `src/styles/foundation/components/${owner}/_tokens.scss`,
      `@mixin base { --honesty-${owner}-gap: 1rem; }`,
    );
  }

  files.set(
    'src/app/controls/app-shell/app-shell.html',
    '<erp-topbar></erp-topbar><erp-sidebar></erp-sidebar>',
  );
  files.set(
    'src/app/controls/app-footer/app-footer.ts',
    'import {ErpButton} from "x"; import {ErpStatusBadge} from "y"; import {ErpText} from "z"; export class ErpAppFooter {}',
  );
  files.set(
    'src/app/controls/app-footer/app-footer.html',
    '<footer><erp-button (pressed)="activate(action)" /></footer>',
  );
  files.set(
    'src/app/controls/topbar/topbar.html',
    '<ng-content select="[erpTopbarStart]" /><ng-content select="[erpTopbarContext]" /><ng-content select="[erpTopbarSearch]" /><ng-content select="[erpTopbarActions]" /><ng-content select="[erpTopbarUser]" />',
  );
  files.set(
    'src/styles/foundation/components/topbar/_tokens.scss',
    '@mixin base { --honesty-topbar-height: 3.75rem; --honesty-topbar-padding-inline: 1.5rem; --honesty-topbar-search-basis: 30%; --honesty-topbar-narrow-padding-inline: 0.5rem; }',
  );
  files.set(
    'src/app/controls/sidebar/sidebar.ts',
    'import {ErpSidebarDisclosure} from "x"; import {ErpSidebarLink} from "w"; import {ErpIconButton} from "y"; import {ErpTooltip} from "z"; export class ErpSidebar { readonly collapsed = model(false); readonly expandedIds = model<readonly string[]>([]); }',
  );
  files.set(
    'src/app/controls/sidebar/sidebar.html',
    '<erp-sidebar-disclosure data-sidebar-active-ancestor></erp-sidebar-disclosure>',
  );
  files.set(
    'src/styles/foundation/components/sidebar/_tokens.scss',
    '@mixin base { --honesty-sidebar-width-expanded: 16.875rem; --honesty-sidebar-width-collapsed: 3.75rem; --honesty-sidebar-compact-trigger-size: 2.5rem; }',
  );
  files.set(
    'src/app/controls/branch-selector/branch-selector.ts',
    'import {ErpSelect} from "x"; export class ErpBranchSelector {}',
  );
  files.set(
    'src/app/controls/branch-selector/branch-selector.html',
    '<erp-select></erp-select>',
  );
  files.set(
    'src/app/controls/global-search/global-search.ts',
    'import {ErpSearchBox} from "x"; export class ErpGlobalSearch {}',
  );
  files.set(
    'src/app/controls/global-search/global-search.html',
    '<erp-search-box></erp-search-box>',
  );
  files.set(
    'src/app/controls/user-menu/user-menu.ts',
    "import {ErpAvatar} from 'x'; import {ErpStatusBadge} from 'b'; import {ErpDivider} from 'z'; import {ErpUserMenuArrow} from './internal/user-menu-arrow'; import {ShellAnchoredSurfaceController} from 'y'; const options = {crossAxisAlignment: 'end', arrowWidth: () => 13, arrowSafeInset: () => 16, allowedPlacements: ['bottom', 'top'], prepareGeometry: () => undefined}; export class ErpUserMenu { readonly showAvatar = input(true); readonly showUserName = input(true); readonly showEmail = input(true); readonly showPresence = input(true); readonly showRoleBadge = input(true); readonly showBranchBadge = input(true); readonly showTriggerRoleBadge = input(false); readonly showTriggerBranchBadge = input(false); triggerRoleVisible() {} triggerBranchVisible() {} }",
  );
  files.set(
    'src/app/controls/user-menu/user-menu.html',
    '<erp-avatar></erp-avatar><span class="user-menu__trigger-metadata"><span class="user-menu__badges--trigger"><erp-status-badge></erp-status-badge></span></span><erp-user-menu-arrow></erp-user-menu-arrow><erp-divider></erp-divider>',
  );
  files.set(
    'src/app/controls/user-menu/user-menu.scss',
    '.user-menu { min-inline-size: 0; } .user-menu__surface { overflow: visible; color: var(--honesty-user-menu-fg); } .user-menu__identity-header { flex: 0 0 auto; } .user-menu__items { flex: 1 1 auto; overflow-y: auto; } .user-menu__badges--trigger { grid-auto-flow: column; } .user-menu__surface:popover-open { display: flex; } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }',
  );
  files.set(
    'src/app/controls/user-menu/internal/user-menu-arrow.scss',
    ':host { left: var(--honesty-anchored-surface-arrow-cross-axis-center); }',
  );
  files.set(
    'src/styles/foundation/components/user-menu/_tokens.scss',
    '@mixin base { --honesty-user-menu-popup-width: 360px; --honesty-user-menu-popup-padding: 8px; --honesty-user-menu-popup-radius: 10px; --honesty-user-menu-trigger-padding: 6px 10px; --honesty-user-menu-trigger-min-size: 52px; --honesty-user-menu-trigger-copy-gap: 1px; --honesty-user-menu-motion-duration: 600ms; --honesty-user-menu-motion-easing: cubic-bezier(0.25, 0.8, 0.25, 1); }',
  );

  for (const [key, value] of overrides) {
    files.set(key, value);
  }

  return files;
}

function runSelfTest() {
  const failures = [];
  const validErrors = validateShellNavigation(validFixture());
  if (validErrors.length > 0) {
    failures.push(`valid fixture was rejected: ${validErrors.join('; ')}`);
  }

  const invalidFixtures = [
    ['HttpClient', new Map([['src/app/controls/sidebar/sidebar.ts', 'export class ErpSidebar { private http = new HttpClient(); }']]), 'transport'],
    ['fetch', new Map([['src/app/controls/topbar/topbar.ts', 'export class ErpTopbar { load(){ fetch("/api") } }']]), 'transport'],
    ['local theme', new Map([['src/app/controls/app-shell/app-shell.ts', 'export class ErpAppShell { readonly theme = input(); }']]), 'theme'],
    ['router ownership', new Map([['src/app/controls/app-shell/app-shell.ts', 'export class ErpAppShell { private router = inject(Router); }']]), 'router'],
    ['raw breakpoint', new Map([['src/app/controls/sidebar/sidebar.scss', '@media (max-width: 40rem) {}']]), 'Query API'],
    ['missing Sidebar reference hash', new Map([[SHELL_REFERENCE, 'missing']]), 'reference register'],
    ['missing Sidebar disclosure model', new Map([['src/app/controls/sidebar/sidebar.ts', 'export class ErpSidebar {}']]), 'reference contract'],
    ['missing owner', new Map([['src/app/controls/page-shell/page-shell.ts', '']]), 'Missing authorized'],
    ['manual popover', new Map([['src/app/controls/notification-bell/notification-bell.ts', 'export class ErpNotificationBell { open(){ this.surface.showPopover(); } }']]), 'overlay engine'],
    ['missing UserMenu reference', new Map([[USER_MENU_REFERENCE, 'missing']]), 'exact-reference contract'],
    ['missing UserMenu reduced motion', new Map([['src/app/controls/user-menu/user-menu.scss', '']]), 'reduced-motion'],
    ['missing UserMenu vertical geometry', new Map([['src/app/controls/user-menu/user-menu.ts', "import {ErpAvatar} from 'x'; import {ErpDivider} from 'z'; import {ShellAnchoredSurfaceController} from 'y'; const options = {crossAxisAlignment: 'end', arrowWidth: () => 13, arrowSafeInset: () => 16}; export class ErpUserMenu {}"]]), 'vertical-only'],
    ['missing UserMenu rich identity', new Map([[CONTRACTS, 'export interface ErpNavigationItem {} export interface ErpBreadcrumbItem {} export interface ErpShellUserSummary {} export interface ErpBranchOption {} export interface ErpNotificationSummary {}']]), 'rich-identity'],
    ['missing UserMenu badge reuse', new Map([['src/app/controls/user-menu/user-menu.html', '<erp-avatar></erp-avatar><erp-divider></erp-divider>']]), 'ErpStatusBadge'],
    ['missing UserMenu trigger-specific badge gates', new Map([['src/app/controls/user-menu/user-menu.ts', "import {ErpAvatar} from 'x'; import {ErpStatusBadge} from 'b'; import {ErpDivider} from 'z'; import {ShellAnchoredSurfaceController} from 'y'; const options = {crossAxisAlignment: 'end', arrowWidth: () => 13, arrowSafeInset: () => 16, allowedPlacements: ['bottom', 'top'], prepareGeometry: () => undefined}; export class ErpUserMenu { readonly showAvatar = input(true); readonly showUserName = input(true); readonly showEmail = input(true); readonly showPresence = input(true); readonly showRoleBadge = input(true); readonly showBranchBadge = input(true); triggerRoleVisible() {} triggerBranchVisible() {} }"]]), 'trigger-specific'],
    ['hidden UserMenu name', new Map([['src/app/controls/user-menu/user-menu.scss', '.user-menu { min-inline-size: 0; } .user-menu__identity-header { flex: 0 0 auto; } .user-menu__items { flex: 1 1 auto; overflow-y: auto; } .user-menu__trigger-name { display: none; } .user-menu__surface::before { left: var(--honesty-anchored-surface-arrow-cross-axis-center); } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }']]), 'responsive identity'],
    ['always-visible UserMenu surface', new Map([['src/app/controls/user-menu/user-menu.scss', '.user-menu { min-inline-size: 0; } .user-menu__identity-header { flex: 0 0 auto; } .user-menu__items { flex: 1 1 auto; overflow-y: auto; } .user-menu__surface::before { left: var(--honesty-anchored-surface-arrow-cross-axis-center); } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }']]), 'open-only flex'],
  ];

  for (const [label, overrides, expected] of invalidFixtures) {
    const errors = validateShellNavigation(validFixture(overrides));
    if (!errors.some((error) => error.includes(expected))) {
      failures.push(`${label} fixture was accepted: ${errors.join('; ')}`);
    }
  }

  if (failures.length > 0) {
    console.error(`ERP Shell governance self-test failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
    process.exit(1);
  }

  console.log('ERP Shell navigation governance self-test: PASS');
  console.log('Invalid transport, theme, breakpoint, missing-owner, manual-popover, reference, and reduced-motion fixtures rejected.');
}

function runCheck() {
  const files = new Map();
  const fixed = [
    ROUTES,
    REVIEW,
    CONTRACTS,
    SHELL_REFERENCE,
    SIDEBAR_REFERENCE,
    TOPBAR_REFERENCE,
    TOPBAR_SHOWCASE,
    APP_FOOTER_REFERENCE,
    APP_FOOTER_SHOWCASE,
    USER_MENU_REFERENCE,
  ];

  for (const owner of OWNERS) {
    fixed.push(
      `src/app/controls/${owner}/${owner}.ts`,
      `src/app/controls/${owner}/${owner}.html`,
      `src/app/controls/${owner}/${owner}.scss`,
      `src/styles/foundation/components/${owner}/_tokens.scss`,
    );
  }

  for (const relative of fixed) {
    files.set(relative, read(relative));
  }

  for (const absolute of [
    ...walk(path.join(ROOT, 'src/app/controls/shell-family')),
    ...walk(path.join(ROOT, 'src/app/controls/user-menu/internal')),
    ...walk(path.join(ROOT, 'src/app/review-internals/legacy-shell-batch')),
  ]) {
    const relative = normalize(path.relative(ROOT, absolute));
    files.set(relative, read(relative));
  }

  const errors = validateShellNavigation(files);
  if (errors.length > 0) {
    console.error(`ERP Shell navigation governance failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    process.exit(1);
  }

  console.log('ERP Shell navigation governance: PASS');
  console.log(`${OWNERS.length} owners, shared contracts, ERP-only review, token bases, composition reuse, theme/transport/query/overlay boundaries verified.`);
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  runCheck();
}
