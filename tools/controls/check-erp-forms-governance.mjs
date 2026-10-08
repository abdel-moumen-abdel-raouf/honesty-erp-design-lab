import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const ROUTES = 'src/app/app.routes.ts';
const REVIEW = 'src/app/review-internals/legacy-forms-batch/forms-batch.html';
const CONTRACTS = 'src/app/controls/forms-family/forms-contracts.ts';
const COMPONENTS = ['form', 'form-section', 'form-actions', 'validation-summary', 'repeater', 'stepper'];
const SOURCES = COMPONENTS.map((component) => `src/app/controls/${component}/${component}.ts`);
const TEMPLATES = COMPONENTS.map((component) => `src/app/controls/${component}/${component}.html`);

function read(relative) { return fs.readFileSync(path.join(ROOT, relative), 'utf8'); }

export function validateFormsContracts(files) {
  const errors = [];
  const routes = files.get(ROUTES) ?? '';
  const review = files.get(REVIEW) ?? '';
  const contracts = files.get(CONTRACTS) ?? '';
  const sources = SOURCES.map((file) => files.get(file) ?? '').join('\n');
  const templates = TEMPLATES.map((file) => files.get(file) ?? '').join('\n');

  for (const component of COMPONENTS) {
    if (!(files.get(`src/app/controls/${component}/${component}.ts`) ?? '').includes(`export class Erp${component.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')}`)) {
      errors.push(`Missing authorized Forms owner: ${component}`);
    }
    if (!(files.get(`src/styles/foundation/components/${component}/_tokens.scss`) ?? '').includes('@mixin base')) {
      errors.push(`${component} must own a concrete Component Token base mixin`);
    }
  }

  if (!routes.includes("path: 'controls/forms-batch'")) errors.push('The Forms Batch review route must remain registered');
  if (/<\/?(?:form|button|input|select|textarea)\b/i.test(review)) errors.push('The routed Forms Batch review must remain ERP-only authored');
  if (!(files.get('src/app/controls/form/form.html') ?? '').includes('<form')) errors.push('ErpForm must own native form semantics');
  if (/\b(?:HttpClient|XMLHttpRequest)\b|\bfetch\s*\(|https?:\/\//.test(sources + templates)) errors.push('Forms composition owners must remain transport-agnostic');
  if (/Signal Forms|@angular\/forms\/signals|formField\s*\(/i.test(sources + contracts)) errors.push('Experimental Angular Signal Forms are prohibited');
  if (/NG_VALUE_ACCESSOR|ControlValueAccessor|NG_VALIDATORS/.test(sources)) errors.push('Forms composites must not introduce a duplicate CVA/validator architecture');
  for (const contract of ['export interface ErpFormValidationIssue', 'export interface ErpRepeaterItem', 'export interface ErpStepDefinition']) {
    if (!contracts.includes(contract)) errors.push(`Shared Forms contracts are missing ${contract}`);
  }
  if (!(files.get('src/app/controls/validation-summary/validation-summary.ts') ?? '').includes('ErpFormValidationIssue')) errors.push('ValidationSummary must consume the shared typed issue contract');
  const repeater = files.get('src/app/controls/repeater/repeater.ts') ?? '';
  if (!repeater.includes('readonly items = input') || /Service|persist|FormArray/.test(repeater)) errors.push('Repeater must remain consumer-controlled and persistence-agnostic');
  const stepper = files.get('src/app/controls/stepper/stepper.ts') ?? '';
  if (/Entity|Wizard|workflow|HttpClient/.test(stepper)) errors.push('Stepper must not become an Entity Wizard or business workflow');
  if (/ErpStandardEntityForm|FormEngine|EntityWizard|AppShell|ErpSidebar|ErpTopbar|erp-app-shell|erp-standard-entity-form/.test(sources + templates + contracts + review)) errors.push('Unauthorized Form Engine, Entity, or Shell scope was opened');
  return errors;
}

function fixture(overrides = new Map()) {
  const files = new Map([[ROUTES, "path: 'controls/forms-batch'"], [REVIEW, '<erp-form/>'], [CONTRACTS, 'export interface ErpFormValidationIssue {} export interface ErpRepeaterItem {} export interface ErpStepDefinition {}']]);
  for (const component of COMPONENTS) {
    const name = component.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
    files.set(`src/app/controls/${component}/${component}.ts`, `export class Erp${name} ${component === 'validation-summary' ? 'ErpFormValidationIssue' : ''} ${component === 'repeater' ? 'readonly items = input([])' : ''}`);
    files.set(`src/app/controls/${component}/${component}.html`, component === 'form' ? '<form><ng-content/></form>' : '<erp-text/>');
    files.set(`src/styles/foundation/components/${component}/_tokens.scss`, '@mixin base {}');
  }
  for (const [key, value] of overrides) files.set(key, value);
  return files;
}

function runSelfTest() {
  const failures = [];
  if (validateFormsContracts(fixture()).length) failures.push('valid fixture was rejected');
  const invalid = [
    ['HTTP/fetch', fixture(new Map([['src/app/controls/form/form.ts', 'export class ErpForm { fetch("/api") }']])), 'transport-agnostic'],
    ['raw routed form', fixture(new Map([[REVIEW, '<form></form>']])), 'ERP-only'],
    ['missing component', fixture(new Map([['src/app/controls/stepper/stepper.ts', '']])), 'Missing authorized'],
    ['missing token', fixture(new Map([['src/styles/foundation/components/repeater/_tokens.scss', '']])), 'base mixin'],
    ['Signal Forms', fixture(new Map([[CONTRACTS, 'export interface ErpFormValidationIssue {} export interface ErpRepeaterItem {} export interface ErpStepDefinition {} import "@angular/forms/signals"']])), 'Signal Forms'],
    ['unauthorized StandardEntityForm', fixture(new Map([[REVIEW, '<erp-standard-entity-form/>']])), 'Unauthorized'],
    ['unauthorized shell', fixture(new Map([[REVIEW, '<erp-app-shell/>']])), 'Unauthorized'],
  ];
  for (const [label, files, expected] of invalid) {
    if (!validateFormsContracts(files).some((error) => error.includes(expected))) failures.push(`${label} fixture was accepted`);
  }
  if (failures.length) { console.error(`ERP Forms governance self-test failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`); process.exit(1); }
  console.log('ERP Forms governance self-test: PASS');
  console.log('Invalid HTTP, raw form, missing owner/token, Signal Forms, StandardEntityForm, and Shell fixtures rejected.');
}

function runCheck() {
  const files = new Map([[ROUTES, read(ROUTES)], [REVIEW, read(REVIEW)], [CONTRACTS, read(CONTRACTS)]]);
  for (const relative of [...SOURCES, ...TEMPLATES]) files.set(relative, read(relative));
  for (const component of COMPONENTS) files.set(`src/styles/foundation/components/${component}/_tokens.scss`, read(`src/styles/foundation/components/${component}/_tokens.scss`));
  const errors = validateFormsContracts(files);
  if (errors.length) { console.error(`ERP Forms governance failed:\n${errors.map((error) => `- ${error}`).join('\n')}`); process.exit(1); }
  console.log('ERP Forms governance: PASS');
  console.log('6 authorized Forms composition owners verified.');
}

if (process.argv.includes('--self-test')) runSelfTest(); else runCheck();
