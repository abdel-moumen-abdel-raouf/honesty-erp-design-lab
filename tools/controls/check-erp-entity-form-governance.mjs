import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-entity-form-batch/entity-form-batch.html';
const CONTRACTS = 'src/app/controls/entity-form/entity-form-contracts.ts';
const SCHEMA = 'src/app/controls/entity-form/entity-form-schema.ts';
const FIELDS_TS = 'src/app/controls/entity-form/entity-schema-fields.ts';
const FIELDS_HTML = 'src/app/controls/entity-form/entity-schema-fields.html';
const STANDARD_TS = 'src/app/controls/entity-form/standard-entity-form.ts';
const STANDARD_HTML = 'src/app/controls/entity-form/standard-entity-form.html';
const OUTLETS = 'src/app/controls/entity-form/entity-form-outlets.ts';
const VISUAL_TOKENS = ['standard-entity-form', 'entity-schema-fields'];
const FORBIDDEN_SCOPE = [
  ['standalone ErpEntityReview', /export\s+class\s+ErpEntityReview\b/],
  ['ErpEntityWizard', /\bErpEntityWizard\b/],
  ['EntityWorkflowEngine', /\bEntityWorkflowEngine\b/],
  ['ErpDataPage', /\bErpDataPage\b/],
  ['ErpEntityDirectory', /\bErpEntityDirectory\b/],
  ['ErpEntityDetail', /\bErpEntityDetail\b/],
  ['ErpAppShell', /\bErpAppShell\b/],
  ['ErpSidebar', /\bErpSidebar\b/],
  ['ErpTopbar', /\bErpTopbar\b/],
];

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function hasClass(source, name) {
  return new RegExp(`export\\s+class\\s+${name}\\b`).test(source);
}

function validateEntityFormContract(files) {
  const errors = [];
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const contracts = files.get(CONTRACTS) ?? '';
  const schema = files.get(SCHEMA) ?? '';
  const fieldsTs = files.get(FIELDS_TS) ?? '';
  const fieldsHtml = files.get(FIELDS_HTML) ?? '';
  const standardTs = files.get(STANDARD_TS) ?? '';
  const standardHtml = files.get(STANDARD_HTML) ?? '';
  const outlets = files.get(OUTLETS) ?? '';
  const combined = [...files.values()].join('\n');

  if (!hasClass(standardTs, 'ErpStandardEntityForm')) errors.push('Missing ErpStandardEntityForm owner');
  if (!hasClass(fieldsTs, 'ErpEntitySchemaFields')) errors.push('Missing ErpEntitySchemaFields owner');
  if (!hasClass(outlets, 'ErpEntityCustomFieldOutlet')) errors.push('Missing ErpEntityCustomFieldOutlet owner');
  if (!hasClass(outlets, 'ErpEntityCustomSectionOutlet')) errors.push('Missing ErpEntityCustomSectionOutlet owner');
  if (!routes.includes("path: 'controls/entity-form-batch'")) errors.push('Missing /controls/entity-form-batch route');

  if (/<\/?(form|input|select|textarea|button)\b/i.test(review)) {
    errors.push('Entity Form review route must remain ERP-only authored');
  }

  if (/\b(HttpClient|XMLHttpRequest|fetch\s*\(|https?:\/\/|\/api\b)/i.test(combined)) {
    errors.push('Entity Form engine must remain transport and API agnostic');
  }
  if (/@angular\/forms\/signals|signalForms|formField\s*\(/i.test(combined)) {
    errors.push('Experimental Angular Signal Forms are forbidden');
  }
  if (/<\/?(input|select|textarea)\b/i.test(fieldsHtml)) {
    errors.push('Schema renderer must not author native input controls');
  }

  const requiredCompositions = [
    'erp-form',
    'erp-form-section',
    'erp-form-actions',
    'erp-validation-summary',
    'erp-entity-schema-fields',
  ];
  for (const selector of requiredCompositions) {
    if (!standardHtml.includes(`<${selector}`)) {
      errors.push(`ErpStandardEntityForm must compose existing ${selector} owner`);
    }
  }

  const fieldTags = [...fieldsHtml.matchAll(/<\/?(erp-[a-z0-9-]+)\b/g)].map((match) => match[1]);
  const authorizedFieldTags = new Set([
    'erp-text-box', 'erp-text-area-box', 'erp-password-box', 'erp-url-box',
    'erp-tel-box', 'erp-number-box', 'erp-money-box', 'erp-check-box',
    'erp-radio-group', 'erp-select', 'erp-date-box', 'erp-time-box',
    'erp-date-time-box',
  ]);
  for (const tag of fieldTags) {
    if (!authorizedFieldTags.has(tag)) errors.push(`Schema renderer uses unauthorized control ${tag}`);
  }

  if (!schema.includes('Unsupported entity field kind') || !schema.includes('throw new ErpEntityFormSchemaError')) {
    errors.push('Unsupported schema kinds must fail deterministically');
  }
  if (!outlets.includes("selector: 'ng-template[erpEntityCustomField]'")) errors.push('Custom field outlet selector is missing');
  if (!outlets.includes("selector: 'ng-template[erpEntityCustomSection]'")) errors.push('Custom section outlet selector is missing');
  if (!contracts.includes('ErpFormValidationIssue') || !fieldsTs.includes('ErpInputValidationIssue')) {
    errors.push('Entity Form engine must reuse existing validation contracts');
  }
  if (/NG_VALUE_ACCESSOR|NG_VALIDATORS|implements\s+(?:ControlValueAccessor|Validator)/.test(combined)) {
    errors.push('Entity Form composites must not create duplicate CVA or validator architecture');
  }

  for (const [label, pattern] of FORBIDDEN_SCOPE) {
    if (pattern.test(combined)) errors.push(`Unauthorized scope opened: ${label}`);
  }

  for (const component of VISUAL_TOKENS) {
    const tokenPath = `src/styles/foundation/components/${component}/_tokens.scss`;
    const tokenSource = files.get(tokenPath) ?? '';
    if (!/@mixin\s+base\s*\{/.test(tokenSource)) {
      errors.push(`Missing visual Component Token base for ${component}`);
    }
  }

  for (const nonvisual of ['entity-custom-field-outlet', 'entity-custom-section-outlet']) {
    if (files.has(`src/styles/foundation/components/${nonvisual}/_tokens.scss`)) {
      errors.push(`Nonvisual outlet ${nonvisual} must not own meaningless Component Tokens`);
    }
  }

  return errors;
}

function validFixture(overrides = new Map()) {
  const files = new Map([
    [ROUTES, "path: 'controls/entity-form-batch'"],
    [REVIEW, '<erp-standard-entity-form></erp-standard-entity-form>'],
    [CONTRACTS, 'import {ErpFormValidationIssue} from "../forms-family/forms-contracts"; export type ErpEntityFieldDefinition = {}'],
    [SCHEMA, 'throw new ErpEntityFormSchemaError(`Unsupported entity field kind`)'],
    [FIELDS_TS, 'import {ErpInputValidationIssue} from "../input-family/input-contracts"; export class ErpEntitySchemaFields {}'],
    [FIELDS_HTML, '<erp-text-box/><erp-select/><erp-date-box/>'],
    [STANDARD_TS, 'export class ErpStandardEntityForm {}'],
    [STANDARD_HTML, '<erp-form><erp-validation-summary/><erp-form-section><erp-entity-schema-fields/></erp-form-section><erp-form-actions/></erp-form>'],
    [OUTLETS, "@Directive({selector: 'ng-template[erpEntityCustomField]'}) export class ErpEntityCustomFieldOutlet {} @Directive({selector: 'ng-template[erpEntityCustomSection]'}) export class ErpEntityCustomSectionOutlet {}"],
    ['src/styles/foundation/components/standard-entity-form/_tokens.scss', '@mixin base { --honesty-standard-entity-form-gap: 1rem; }'],
    ['src/styles/foundation/components/entity-schema-fields/_tokens.scss', '@mixin base { --honesty-entity-schema-fields-gap: 1rem; }'],
  ]);
  for (const [key, value] of overrides) files.set(key, value);
  return files;
}

function runSelfTest() {
  const failures = [];
  if (validateEntityFormContract(validFixture()).length) failures.push('valid fixture was rejected');
  const invalid = [
    ['HTTP/fetch', new Map([[STANDARD_TS, 'export class ErpStandardEntityForm { load(){ fetch("/records") } }']]), 'transport'],
    ['raw routed control', new Map([[REVIEW, '<erp-form/><input>']]), 'ERP-only'],
    ['missing StandardEntityForm', new Map([[STANDARD_TS, '']]), 'Missing ErpStandardEntityForm'],
    ['missing SchemaFields', new Map([[FIELDS_TS, 'import {ErpInputValidationIssue} from "x";']]), 'Missing ErpEntitySchemaFields'],
    ['missing custom outlet', new Map([[OUTLETS, "@Directive({selector: 'ng-template[erpEntityCustomSection]'}) export class ErpEntityCustomSectionOutlet {}"]]), 'Missing ErpEntityCustomFieldOutlet'],
    ['native schema input', new Map([[FIELDS_HTML, '<input>']]), 'native input'],
    ['Signal Forms', new Map([[CONTRACTS, 'import "@angular/forms/signals"; import {ErpFormValidationIssue} from "x"']]), 'Signal Forms'],
    ['silent unsupported fallback', new Map([[SCHEMA, 'return null']]), 'fail deterministically'],
    ['duplicate validation', new Map([[STANDARD_TS, 'export class ErpStandardEntityForm implements ControlValueAccessor {} NG_VALUE_ACCESSOR']]), 'duplicate CVA'],
    ['standalone EntityReview', new Map([[STANDARD_TS, 'export class ErpStandardEntityForm {} export class ErpEntityReview {}']]), 'ErpEntityReview'],
    ['Entity Wizard', new Map([[STANDARD_TS, 'export class ErpStandardEntityForm {} export class ErpEntityWizard {}']]), 'ErpEntityWizard'],
    ['Shell', new Map([[STANDARD_TS, 'export class ErpStandardEntityForm {} export class ErpAppShell {}']]), 'ErpAppShell'],
    ['missing token base', new Map([['src/styles/foundation/components/standard-entity-form/_tokens.scss', '']]), 'Token base'],
  ];
  for (const [label, override, expected] of invalid) {
    const errors = validateEntityFormContract(validFixture(override));
    if (!errors.some((error) => error.includes(expected))) failures.push(`${label} fixture was accepted: ${errors.join('; ')}`);
  }
  if (failures.length) {
    console.error(`ERP Entity Form governance self-test failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP Entity Form governance self-test: PASS');
  console.log('Invalid transport, raw control, missing owner/outlet/token, Signal Forms, silent fallback, duplicate validation, EntityReview, Wizard, and Shell fixtures rejected.');
}

function runCheck() {
  const files = new Map();
  for (const relative of [ROUTES, REVIEW, CONTRACTS, SCHEMA, FIELDS_TS, FIELDS_HTML, STANDARD_TS, STANDARD_HTML, OUTLETS]) {
    files.set(relative, read(relative));
  }
  for (const component of VISUAL_TOKENS) {
    const relative = `src/styles/foundation/components/${component}/_tokens.scss`;
    files.set(relative, read(relative));
  }
  for (const absolute of [
    ...walk(path.join(ROOT, 'src/app/controls/entity-form')),
    ...walk(path.join(ROOT, 'src/app/review-internals/legacy-entity-form-batch')),
    ...walk(path.join(ROOT, 'src/app/review-internals/entity-form-template-evidence')),
  ]) {
    const relative = normalize(path.relative(ROOT, absolute));
    files.set(relative, read(relative));
  }
  const errors = validateEntityFormContract(files);
  if (errors.length) {
    console.error(`ERP Entity Form governance failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    process.exit(1);
  }
  console.log('ERP Entity Form governance: PASS');
  console.log('4 authorized public owners, bounded schema routing, escape hatches, validation reuse, and 2 visual token owners verified.');
}

if (process.argv.includes('--self-test')) runSelfTest();
else runCheck();
