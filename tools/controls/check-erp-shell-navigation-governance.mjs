import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-shell-batch/shell-batch.html';
const CONTRACTS = 'src/app/controls/shell-family/shell-contracts.ts';
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

  if (/@media\s*\(|@container\s*\(/.test(styles)) {
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
    [CONTRACTS, 'export interface ErpNavigationItem {} export interface ErpBreadcrumbItem {} export interface ErpShellUserSummary {} export interface ErpBranchOption {} export interface ErpNotificationSummary {}'],
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
    'import {ErpAvatar} from "x"; import {ShellAnchoredSurfaceController} from "y"; export class ErpUserMenu {}',
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
  console.log('Invalid transport, theme, breakpoint, missing-owner, and manual-popover fixtures rejected.');
}

function runCheck() {
  const files = new Map();
  const fixed = [ROUTES, REVIEW, CONTRACTS];

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
