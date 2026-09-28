import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const APP_TEMPLATE = 'src/app/app.html';
const APP_SOURCE = 'src/app/app.ts';

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll('\\', '/');
}

function occurrences(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

export function validateThemeAuthority(files) {
  const errors = [];
  const appTemplate = files.get(APP_TEMPLATE) ?? '';
  const appSource = files.get(APP_SOURCE) ?? '';

  if (occurrences(appTemplate, /\[attr\.data-theme\]\s*=\s*["']theme\(\)["']/g) !== 1) {
    errors.push('app.html must own exactly one [attr.data-theme]="theme()" binding');
  }

  if (!appSource.includes('toggleTheme(): void') || !appSource.includes('readonly theme = signal<LabTheme>')) {
    errors.push('app.ts must own the single Lab theme state and toggle');
  }

  for (const [file, source] of files) {
    if (file.endsWith('.spec.ts')) continue;

    if (file.endsWith('.html') && file !== APP_TEMPLATE) {
      if (/data-theme/i.test(source)) {
        errors.push(file + ': child templates must not author, bind, or document data-theme');
      }
      const localThemeSelector =
        /<erp-review-select\b[^>]*\blabel\s*=\s*["']Theme["']/i.test(source) ||
        /\[value\]\s*=\s*["'][^"']*\btheme\(\)/i.test(source) ||
        /\b(?:theme|theme-mode|data-theme-mode)\s*=\s*["'](?:light|dark|system)["']/i.test(source);
      if (localThemeSelector) {
        errors.push(file + ': child templates must not expose a local Light/Dark/System theme selector');
      }
    }

    if (file.endsWith('.scss') && /\[data-theme/i.test(source)) {
      errors.push(file + ': component/page styles must not branch on data-theme');
    }

    if (file.endsWith('.ts') && file !== APP_SOURCE) {
      const forbidden = [
        /\bThemeMode\b/,
        /\.get\(\s*['"]theme['"]\s*\)/,
        /\.set\(\s*['"]theme['"]/,
        /resetSetting\(\s*['"]theme['"]/,
        /prefers-color-scheme\s*:\s*(?:dark|light)/,
        /closest(?:<[^>]+>)?\(\s*['"]\[data-theme\]['"]\s*\)/,
        /dataset\s*\[?\s*['"]theme['"]\s*\]?/,
        /readonly\s+themes?\s*=/,
        /\btheme\s*:\s*['"](?:light|dark|system)['"]/,
        /\btheme\s*:\s*ThemeMode\b/,
      ];
      if (forbidden.some((pattern) => pattern.test(source))) {
        errors.push(file + ': theme state/selection is owned by App only');
      }
    }
  }

  return errors;
}

function runSelfTest() {
  const valid = new Map([
    [APP_TEMPLATE, '<div [attr.data-theme]="theme()"></div>'],
    [APP_SOURCE, 'readonly theme = signal<LabTheme>("light"); toggleTheme(): void {}'],
    ['src/app/page/page.html', '<erp-container></erp-container>'],
    ['src/app/page/page.ts', 'export class Page {}'],
  ]);
  if (validateThemeAuthority(valid).length !== 0) {
    throw new Error('Single-theme checker rejected the valid fixture');
  }

  const invalidDataTheme = new Map(valid);
  invalidDataTheme.set('src/app/page/page.html', '<erp-container data-theme="dark"></erp-container>');
  if (validateThemeAuthority(invalidDataTheme).length === 0) {
    throw new Error('Single-theme checker accepted a child data-theme');
  }

  const invalidSelector = new Map(valid);
  invalidSelector.set(
    'src/app/page/page.html',
    '<erp-review-select label="Theme" [value]="theme()"></erp-review-select>',
  );
  if (validateThemeAuthority(invalidSelector).length === 0) {
    throw new Error('Single-theme checker accepted a child Theme selector');
  }

  const validSystemColorEvidence = new Map(valid);
  validSystemColorEvidence.set(
    'src/app/page/page.html',
    '<erp-color-picker data-color-picker-evidence="system"></erp-color-picker>',
  );
  if (validateThemeAuthority(validSystemColorEvidence).length !== 0) {
    throw new Error('Single-theme checker confused System Colors evidence with Theme authority');
  }

  console.log('Single App theme authority self-test: PASS');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map(
  walk(APP_ROOT)
    .filter((file) => /\.(?:html|ts|scss)$/.test(file))
    .map((file) => [relative(file), fs.readFileSync(file, 'utf8')]),
);

const errors = validateThemeAuthority(files);
if (errors.length > 0) {
  console.error('Single App theme authority check failed:\n');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log('Single App theme authority: PASS');
