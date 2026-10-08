import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-shell-batch/shell-batch.html';
const CONTRACTS = 'src/app/controls/shell-family/shell-contracts.ts';
const USER_MENU_REFERENCE = 'src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md';
const OWNERS = [
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
    !userMenuStyles.includes(
      '--honesty-anchored-surface-arrow-cross-axis-center',
    )
  ) {
    errors.push('ErpUserMenu arrow must track measured anchored-surface geometry');
  }
  if (
    !userMenuStyles.includes('min-inline-size: 0') ||
    !userMenuStyles.includes('overflow-y: auto') ||
    !/user-menu__surface:popover-open[^}]*display:\s*flex/s.test(userMenuStyles) ||
    /user-menu__trigger-name[^}]*display:\s*none/s.test(userMenuStyles)
  ) {
    errors.push('ErpUserMenu must preserve responsive identity sizing and open-only flex layout without unconditional name hiding');
  }
  for (const referenceValue of ['360px', '8px', '10px', '600ms', 'cubic-bezier(0.25, 0.8, 0.25, 1)']) {
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
    "import {ErpAvatar} from 'x'; import {ErpStatusBadge} from 'b'; import {ErpDivider} from 'z'; import {ShellAnchoredSurfaceController} from 'y'; const options = {crossAxisAlignment: 'end', arrowWidth: () => 13, arrowSafeInset: () => 16}; export class ErpUserMenu { readonly showAvatar = input(true); readonly showUserName = input(true); readonly showEmail = input(true); readonly showPresence = input(true); readonly showRoleBadge = input(true); readonly showBranchBadge = input(true); }",
  );
  files.set(
    'src/app/controls/user-menu/user-menu.html',
    '<erp-avatar></erp-avatar><erp-status-badge></erp-status-badge><erp-divider></erp-divider>',
  );
  files.set(
    'src/app/controls/user-menu/user-menu.scss',
    '.user-menu { min-inline-size: 0; } .user-menu__items { overflow-y: auto; } .user-menu__surface:popover-open { display: flex; } .user-menu__surface::before { left: var(--honesty-anchored-surface-arrow-cross-axis-center); } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }',
  );
  files.set(
    'src/styles/foundation/components/user-menu/_tokens.scss',
    '@mixin base { --honesty-user-menu-popup-width: 360px; --honesty-user-menu-popup-padding: 8px; --honesty-user-menu-popup-radius: 10px; --honesty-user-menu-motion-duration: 600ms; --honesty-user-menu-motion-easing: cubic-bezier(0.25, 0.8, 0.25, 1); }',
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
    ['missing owner', new Map([['src/app/controls/page-shell/page-shell.ts', '']]), 'Missing authorized'],
    ['manual popover', new Map([['src/app/controls/notification-bell/notification-bell.ts', 'export class ErpNotificationBell { open(){ this.surface.showPopover(); } }']]), 'overlay engine'],
    ['missing UserMenu reference', new Map([[USER_MENU_REFERENCE, 'missing']]), 'exact-reference contract'],
    ['missing UserMenu reduced motion', new Map([['src/app/controls/user-menu/user-menu.scss', '']]), 'reduced-motion'],
    ['missing UserMenu arrow geometry', new Map([['src/app/controls/user-menu/user-menu.ts', "import {ErpAvatar} from 'x'; import {ErpDivider} from 'z'; import {ShellAnchoredSurfaceController} from 'y'; const options = {crossAxisAlignment: 'end'}; export class ErpUserMenu {}"]]), 'arrow'],
    ['missing UserMenu rich identity', new Map([[CONTRACTS, 'export interface ErpNavigationItem {} export interface ErpBreadcrumbItem {} export interface ErpShellUserSummary {} export interface ErpBranchOption {} export interface ErpNotificationSummary {}']]), 'rich-identity'],
    ['missing UserMenu badge reuse', new Map([['src/app/controls/user-menu/user-menu.html', '<erp-avatar></erp-avatar><erp-divider></erp-divider>']]), 'ErpStatusBadge'],
    ['hidden UserMenu name', new Map([['src/app/controls/user-menu/user-menu.scss', '.user-menu { min-inline-size: 0; } .user-menu__items { overflow-y: auto; } .user-menu__trigger-name { display: none; } .user-menu__surface::before { left: var(--honesty-anchored-surface-arrow-cross-axis-center); } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }']]), 'responsive identity'],
    ['always-visible UserMenu surface', new Map([['src/app/controls/user-menu/user-menu.scss', '.user-menu { min-inline-size: 0; } .user-menu__items { overflow-y: auto; } .user-menu__surface::before { left: var(--honesty-anchored-surface-arrow-cross-axis-center); } @media (prefers-reduced-motion: reduce) { .user-menu__surface { animation: none; } }']]), 'open-only flex'],
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
  const fixed = [ROUTES, REVIEW, CONTRACTS, USER_MENU_REFERENCE];

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
  console.log('10 owners, shared contracts, ERP-only review, token bases, composition reuse, theme/transport/query/overlay boundaries verified.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  runCheck();
}
