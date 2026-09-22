import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {parseTemplate} from '@angular/compiler';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const FORBIDDEN_INPUT_TYPES = new Set(['button', 'submit', 'reset']);

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

function isExcluded(file) {
  const filePath = relative(file);
  return (
    filePath === 'src/app/app.html' ||
    filePath.startsWith('src/app/foundation/') ||
    filePath.startsWith('src/app/showcase/') ||
    filePath.startsWith('src/app/primitives/') ||
    filePath.startsWith('src/app/controls/')
  );
}

function sourceLocation(sourceSpan) {
  const start = sourceSpan?.start;
  return start ? `:${start.line + 1}:${start.col + 1}` : '';
}

function staticAttribute(node, name) {
  return (node.attributes ?? []).find(
    (attribute) => attribute.name.toLowerCase() === name,
  );
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
        typeof node.name === 'string'
          ? node.name.split(':').at(-1)?.toLowerCase()
          : null;

      if (elementName === 'button') {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: native <button> bypasses ERP Button governance`,
        );
      }

      if (elementName === 'input') {
        const type = staticAttribute(node, 'type')?.value.toLowerCase();

        if (FORBIDDEN_INPUT_TYPES.has(type)) {
          errors.push(
            `${label}${sourceLocation(node.sourceSpan)}: static input type="${type}" bypasses ERP Button governance`,
          );
        }
      }

      const role = staticAttribute(node, 'role')?.value.toLowerCase();

      if (role === 'button' && elementName !== null && !elementName.startsWith('erp-')) {
        errors.push(
          `${label}${sourceLocation(node.sourceSpan)}: static role="button" on <${elementName}> bypasses ERP Button governance`,
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

function runSelfTest() {
  const validFixtures = [
    '<erp-button label="Save"></erp-button>',
    '<erp-icon-button icon="settings" label="Settings"></erp-icon-button>',
  ];
  const invalidFixtures = [
    '<button>Save</button>',
    '<input type="submit">',
    '<div role="button">Action</div>',
  ];

  for (const [index, fixture] of validFixtures.entries()) {
    const errors = validateTemplateSource(fixture, `valid fixture ${index + 1}`);

    if (errors.length > 0) {
      throw new Error(
        `ErpButton governance checker rejected valid fixture ${index + 1}:\n${errors.join('\n')}`,
      );
    }
  }

  for (const [index, fixture] of invalidFixtures.entries()) {
    const errors = validateTemplateSource(fixture, `invalid fixture ${index + 1}`);

    if (errors.length === 0) {
      throw new Error(`ErpButton governance checker accepted invalid fixture ${index + 1}`);
    }
  }

  console.log('ErpButton governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const htmlFiles = walk(APP_ROOT).filter(
  (file) => file.endsWith('.html') && !isExcluded(file),
);
const errors = [];

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, 'utf8');
  errors.push(...validateTemplateSource(source, relative(file)));
}

if (errors.length > 0) {
  console.error('ErpButton production governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `ErpButton production governance check passed (${htmlFiles.length} HTML template(s)).`,
);
