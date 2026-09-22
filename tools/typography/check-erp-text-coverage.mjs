import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {parseTemplate} from '@angular/compiler';
import ts from 'typescript';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const BYPASS_BINDINGS = new Set(['innerhtml', 'innertext', 'textcontent']);

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
    filePath.startsWith('src/app/showcase/')
  );
}

function isExcludedTypeScript(file) {
  const filePath = relative(file);
  return (
    filePath === 'src/app/app.ts' ||
    filePath.endsWith('.spec.ts') ||
    filePath.startsWith('src/app/foundation/') ||
    filePath.startsWith('src/app/showcase/')
  );
}

function sourceLocation(sourceSpan) {
  const start = sourceSpan?.start;
  return start ? `:${start.line + 1}:${start.col + 1}` : '';
}

function isErpTextHost(node) {
  return node.name === 'erp-text';
}

function validateTemplateSource(source, label) {
  const parsed = parseTemplate(source, label, {preserveWhitespaces: true});
  const errors = [];

  for (const error of parsed.errors ?? []) {
    errors.push(`${label}: Angular template parse error: ${error}`);
  }

  function visit(nodes, governed) {
    for (const node of nodes) {
      const kind = node.constructor.name;

      if (kind === 'Text') {
        if (!governed && node.value.trim().length > 0) {
          errors.push(
            `${label}${sourceLocation(node.sourceSpan)}: rendered literal text must be governed by ErpText`,
          );
        }

        continue;
      }

      if (kind === 'BoundText') {
        if (!governed) {
          errors.push(
            `${label}${sourceLocation(node.sourceSpan)}: rendered bound/interpolated text must be governed by ErpText`,
          );
        }

        continue;
      }

      for (const input of node.inputs ?? []) {
        if (BYPASS_BINDINGS.has(input.name.toLowerCase())) {
          errors.push(
            `${label}${sourceLocation(input.sourceSpan)}: binding to ${input.name} bypasses ErpText governance`,
          );
        }
      }

      const nextGoverned = governed || isErpTextHost(node);

      if (Array.isArray(node.children)) {
        visit(node.children, nextGoverned);
      }

      for (const branch of node.branches ?? []) {
        visit(branch.children ?? [], nextGoverned);
      }

      for (const blockCase of node.cases ?? []) {
        visit(blockCase.children ?? [], nextGoverned);
      }

      if (Array.isArray(node.empty?.children)) {
        visit(node.empty.children, nextGoverned);
      }
    }
  }

  visit(parsed.nodes, false);
  return errors;
}

function propertyName(property) {
  const name = property.name;

  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return null;
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

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'Component' &&
      node.arguments.length > 0 &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const metadata = node.arguments[0];
      const inlineTemplate = metadata.properties.find((property) => {
        return ts.isPropertyAssignment(property) && propertyName(property) === 'template';
      });

      if (inlineTemplate) {
        const position = sourceFile.getLineAndCharacterOfPosition(inlineTemplate.getStart(sourceFile));
        errors.push(
          `${label}:${position.line + 1}:${position.character + 1}: production Angular components must use templateUrl; inline template is forbidden`,
        );
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return errors;
}

function runSelfTest() {
  const validTemplates = [
    `<erp-text type="paragraph">
  مرحبا {{ name }}
</erp-text>`,
    `<erp-text type="heading-1">
  عنوان
</erp-text>`,
    `<figure>
  <erp-text type="figcaption">
    شرح
  </erp-text>
</figure>`,
    `<erp-text type="paragraph">
  السطر الأول<br>السطر الثاني<wbr>الممتد
</erp-text>`,
  ];

  const invalidTemplates = [
    `<h1 erpText type="heading-1">
  عنوان
</h1>`,
    `<p>نص خام</p>`,
    `<div>{{ value }}</div>`,
    `<erp-button>Save</erp-button>`,
    `<div [innerHTML]="html"></div>`,
    `<span [textContent]="value"></span>`,
    `<table>
  <tr>
    <td>Raw cell</td>
  </tr>
</table>`,
  ];

  for (const [index, fixture] of validTemplates.entries()) {
    const errors = validateTemplateSource(fixture, `valid template fixture ${index + 1}`);

    if (errors.length > 0) {
      throw new Error(
        `ErpText coverage checker rejected valid fixture ${index + 1}:\n${errors.join('\n')}`,
      );
    }
  }

  for (const [index, fixture] of invalidTemplates.entries()) {
    const errors = validateTemplateSource(fixture, `invalid template fixture ${index + 1}`);

    if (errors.length === 0) {
      throw new Error(`ErpText coverage checker accepted invalid template fixture ${index + 1}`);
    }
  }

  const invalidTypeScript = `
@Component({
  template: \`<erp-text>inline</erp-text>\`
})
`;

  if (validateTypeScriptSource(invalidTypeScript, 'invalid TypeScript fixture').length === 0) {
    throw new Error('ErpText coverage checker accepted invalid TypeScript fixture');
  }

  console.log('ErpText coverage checker self-test passed.');
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
  console.error('ErpText production coverage check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `ErpText production coverage check passed (${htmlFiles.length} HTML template(s), ${typeScriptFiles.length} TypeScript file(s)).`,
);
