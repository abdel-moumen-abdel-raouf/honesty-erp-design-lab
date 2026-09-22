import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {parseTemplate} from '@angular/compiler';
import ts from 'typescript';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const ICON_IMPLEMENTATION_ROOT = 'src/app/primitives/icon/';
const FORBIDDEN_ELEMENTS = new Set(['ng-icon', 'svg', 'honesty-icon']);

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function relative(file) {
  return normalize(path.relative(ROOT, file));
}

function isExcludedHtml(file) {
  const filePath = relative(file);
  return (
    filePath === 'src/app/app.html' ||
    filePath.startsWith('src/app/foundation/') ||
    filePath.startsWith('src/app/showcase/') ||
    filePath.startsWith(ICON_IMPLEMENTATION_ROOT)
  );
}

function isExcludedTypeScript(file) {
  const filePath = relative(file);
  return (
    filePath === 'src/app/app.ts' ||
    filePath.endsWith('.spec.ts') ||
    filePath.startsWith('src/app/foundation/') ||
    filePath.startsWith('src/app/showcase/') ||
    filePath.startsWith(ICON_IMPLEMENTATION_ROOT)
  );
}

function sourceLocation(sourceSpan) {
  const start = sourceSpan?.start;
  return start ? `:${start.line + 1}:${start.col + 1}` : '';
}

function validateTemplateSource(source, label) {
  const parsed = parseTemplate(source, label, {preserveWhitespaces: true});
  const errors = [];

  for (const error of parsed.errors ?? []) {
    errors.push(`${label}: Angular template parse error: ${error}`);
  }

  function visit(nodes) {
    for (const node of nodes) {
      const elementName =
        typeof node.name === 'string' ? node.name.split(':').at(-1) : null;

      if (elementName !== null && FORBIDDEN_ELEMENTS.has(elementName)) {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: <${elementName}> bypasses ErpIcon governance`,
        );
      }

      if (Array.isArray(node.children)) {
        visit(node.children);
      }

      for (const branch of node.branches ?? []) {
        visit(branch.children ?? []);
      }

      for (const blockCase of node.cases ?? []) {
        visit(blockCase.children ?? []);
      }

      if (Array.isArray(node.empty?.children)) {
        visit(node.empty.children);
      }
    }
  }

  visit(parsed.nodes);
  return errors;
}

function isForbiddenIconModule(specifier) {
  return specifier.startsWith('@ng-icons/');
}

function validateTypeScriptSource(source, label) {
  const sourceFile = ts.createSourceFile(
    label,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const errors = [];

  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      isForbiddenIconModule(statement.moduleSpecifier.text)
    ) {
      const position = sourceFile.getLineAndCharacterOfPosition(statement.getStart(sourceFile));
      errors.push(
        `${label}:${position.line + 1}:${position.character + 1}: direct NgIcons/vendor imports bypass ErpIcon governance`,
      );
    }
  }

  return errors;
}

function runSelfTest() {
  const validHtml = '<erp-icon name="search"></erp-icon>';
  const invalidHtml = [
    '<ng-icon name="x"></ng-icon>',
    '<svg></svg>',
    '<honesty-icon name="search"></honesty-icon>',
  ];
  const invalidTypeScript = [
    "import {NgIcon} from '@ng-icons/core';",
    "import {fluentSearch} from '@ng-icons/fluent-ui';",
    "import {tablerSearch} from '@ng-icons/tabler-icons';",
    "import {lucideSearch} from '@ng-icons/lucide';",
    "import {heroMagnifyingGlass} from '@ng-icons/heroicons/outline';",
    "import {phMagnifyingGlassFill} from '@ng-icons/phosphor-icons/fill';",
  ];

  const validErrors = validateTemplateSource(validHtml, 'valid HTML fixture');

  if (validErrors.length > 0) {
    throw new Error(`ErpIcon governance checker rejected valid HTML:\n${validErrors.join('\n')}`);
  }

  for (const [index, fixture] of invalidHtml.entries()) {
    const errors = validateTemplateSource(fixture, `invalid HTML fixture ${index + 1}`);

    if (errors.length === 0) {
      throw new Error(`ErpIcon governance checker accepted invalid HTML fixture ${index + 1}`);
    }
  }

  for (const [index, fixture] of invalidTypeScript.entries()) {
    const errors = validateTypeScriptSource(
      fixture,
      `invalid TypeScript fixture ${index + 1}`,
    );

    if (errors.length === 0) {
      throw new Error(
        `ErpIcon governance checker accepted invalid TypeScript fixture ${index + 1}`,
      );
    }
  }

  console.log('ErpIcon governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const htmlFiles = walk(APP_ROOT).filter(
  (file) => file.endsWith('.html') && !isExcludedHtml(file),
);
const typeScriptFiles = walk(APP_ROOT).filter(
  (file) => file.endsWith('.ts') && !isExcludedTypeScript(file),
);
const errors = [];

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(...validateTemplateSource(source, relative(file)));
}

for (const file of typeScriptFiles) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(...validateTypeScriptSource(source, relative(file)));
}

if (errors.length > 0) {
  console.error('ErpIcon production governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `ErpIcon production governance check passed (${htmlFiles.length} HTML template(s), ${typeScriptFiles.length} TypeScript file(s)).`,
);
