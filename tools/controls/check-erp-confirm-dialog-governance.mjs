import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, 'src', 'app');
const CONFIRM_ROOT = 'src/app/shared/confirm-dialog/';
const CONFIRM_CONTRACTS =
  'src/app/shared/confirm-dialog/confirm-dialog-contracts.ts';
const CONFIRM_SERVICE =
  'src/app/shared/confirm-dialog/confirm-dialog.service.ts';
const CONFIRM_CONTENT =
  'src/app/shared/confirm-dialog/internal/confirm-dialog-content.ts';
const CONFIRM_TEMPLATE =
  'src/app/shared/confirm-dialog/internal/confirm-dialog-content.html';
const OVERLAY_CONTRACTS =
  'src/app/shared/overlay/overlay-contracts.ts';

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

function stringUnion(source, typeName) {
  const body = source.match(
    new RegExp(`export type ${typeName}\\s*=([\\s\\S]*?);`),
  )?.[1] ?? '';

  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

export function validateConfirmDialogContract(files) {
  const errors = [];
  const contracts = files.get(CONFIRM_CONTRACTS) ?? '';
  const service = files.get(CONFIRM_SERVICE) ?? '';
  const content = files.get(CONFIRM_CONTENT) ?? '';
  const template = files.get(CONFIRM_TEMPLATE) ?? '';
  const overlayContracts = files.get(OVERLAY_CONTRACTS) ?? '';

  if (
    JSON.stringify(stringUnion(contracts, 'ErpConfirmDialogIntent')) !==
    JSON.stringify(['default', 'warning', 'danger'])
  ) {
    errors.push(
      'ErpConfirmDialogIntent must remain exactly default | warning | danger',
    );
  }

  for (const required of [
    'export interface ErpConfirmDialogConfig',
    'readonly title: string;',
    'readonly message: string;',
    'readonly subtitle?: string;',
    'readonly details?: string | null;',
    'readonly confirmLabel?: string;',
    'readonly cancelLabel?: string;',
    'readonly intent?: ErpConfirmDialogIntent;',
    'readonly icon?: ErpIconName;',
  ]) {
    if (!contracts.includes(required)) {
      errors.push(`Confirm contracts: missing ${required}`);
    }
  }

  for (const required of [
    '@Injectable({providedIn: \'root\'})',
    'export class ErpConfirmDialogService',
    'confirm(config: ErpConfirmDialogConfig): Promise<boolean>',
    'ErpOverlayManager',
    'ErpConfirmDialogContent',
    "kind: 'modal'",
    "position: 'center'",
    "size: 'sm'",
    'dismissOnEscape: true',
    'dismissOnBackdrop: false',
    "initialFocus: '[data-overlay-frame-action-id=\"cancel\"] button'",
    'showHeader: true',
    'showFooter: true',
    "id: 'cancel'",
    "role: 'secondary'",
    "id: 'confirm'",
    "role: 'primary'",
    'tone: toneForIntent(intent)',
    "ref.registerFrameAction('confirm'",
    "result.type === 'closed' && result.result === true",
  ]) {
    if (!service.includes(required)) {
      errors.push(`Confirm service: missing system policy ${required}`);
    }
  }

  for (const required of [
    "case 'warning':",
    "return 'warning';",
    "case 'danger':",
    "return 'danger';",
    "return 'primary';",
    "return 'help';",
    "return 'error';",
  ]) {
    if (!service.includes(required)) {
      errors.push(`Confirm intent mapping: missing ${required}`);
    }
  }

  for (const required of [
    'ERP_OVERLAY_DATA',
    'ErpStack',
    'ErpText',
  ]) {
    if (!content.includes(required)) {
      errors.push(`Confirm content: missing ${required}`);
    }
  }

  for (const required of [
    'data-system-confirm-dialog-content',
    '[attr.data-confirm-dialog-intent]="data.intent"',
    '{{ data.message }}',
    '@if (data.details)',
    '{{ data.details }}',
  ]) {
    if (!template.includes(required)) {
      errors.push(`Confirm content template: missing ${required}`);
    }
  }

  if (/<button\b|<dialog\b/i.test(template)) {
    errors.push(
      'Confirm content must not recreate native buttons/dialog infrastructure',
    );
  }

  for (const required of [
    'readonly tone?: ErpButtonTone;',
    'readonly actions: readonly ErpOverlayActionConfig[];',
  ]) {
    if (!overlayContracts.includes(required)) {
      errors.push(`Overlay action contract required by Confirm: missing ${required}`);
    }
  }

  return errors;
}

export function validateExclusiveConfirmUsage(files) {
  const errors = [];

  for (const [file, source] of files) {
    const normalized = normalize(file);
    const spec = normalized.endsWith('.spec.ts');
    const confirmInternal = normalized.startsWith(CONFIRM_ROOT);

    if (spec) {
      continue;
    }

    if (
      !confirmInternal &&
      (
        source.includes('/confirm-dialog/internal/') ||
        /\bErpConfirmDialogContent\b/.test(source)
      )
    ) {
      errors.push(
        `${normalized}: Confirm internal content is service-owned and must not be imported directly`,
      );
    }

    if (
      !confirmInternal &&
      (
        /\b(?:window|globalThis)\.confirm\s*\(/.test(source) ||
        /(?:^|[^\w.])confirm\s*\(/m.test(source)
      )
    ) {
      errors.push(
        `${normalized}: confirmations must use ErpConfirmDialogService, not browser/global confirm`,
      );
    }

    if (
      !confirmInternal &&
      normalized.endsWith('.html') &&
      /<dialog\b/i.test(source)
    ) {
      errors.push(
        `${normalized}: confirmation/dialog UI must use the shared Overlay/Confirm system`,
      );
    }
  }

  return errors;
}

function runSelfTest() {
  const valid = new Map([
    [
      CONFIRM_CONTRACTS,
      `export type ErpConfirmDialogIntent = 'default' | 'warning' | 'danger';
export interface ErpConfirmDialogConfig {
readonly title: string;
readonly message: string;
readonly subtitle?: string;
readonly details?: string | null;
readonly confirmLabel?: string;
readonly cancelLabel?: string;
readonly intent?: ErpConfirmDialogIntent;
readonly icon?: ErpIconName;
}`,
    ],
    [
      CONFIRM_SERVICE,
      `@Injectable({providedIn: 'root'})
export class ErpConfirmDialogService {
confirm(config: ErpConfirmDialogConfig): Promise<boolean> {
ErpOverlayManager ErpConfirmDialogContent
kind: 'modal'
position: 'center'
size: 'sm'
dismissOnEscape: true
dismissOnBackdrop: false
initialFocus: '[data-overlay-frame-action-id="cancel"] button'
showHeader: true
showFooter: true
id: 'cancel'
role: 'secondary'
id: 'confirm'
role: 'primary'
tone: toneForIntent(intent)
ref.registerFrameAction('confirm'
result.type === 'closed' && result.result === true
case 'warning':
return 'warning';
case 'danger':
return 'danger';
return 'primary';
return 'help';
return 'error';
}
}`,
    ],
    [
      CONFIRM_CONTENT,
      'ERP_OVERLAY_DATA ErpStack ErpText',
    ],
    [
      CONFIRM_TEMPLATE,
      `<erp-stack data-system-confirm-dialog-content [attr.data-confirm-dialog-intent]="data.intent">
<erp-text>{{ data.message }}</erp-text>
@if (data.details) { <erp-text>{{ data.details }}</erp-text> }
</erp-stack>`,
    ],
    [
      OVERLAY_CONTRACTS,
      'readonly tone?: ErpButtonTone; readonly actions: readonly ErpOverlayActionConfig[];',
    ],
    [
      'src/app/features/example/example.ts',
      'this.confirmDialog.confirm({title: "X", message: "Y"});',
    ],
  ]);

  if (
    validateConfirmDialogContract(valid).length > 0 ||
    validateExclusiveConfirmUsage(valid).length > 0
  ) {
    throw new Error('Confirm governance rejected valid fixtures');
  }

  const invalidBrowser = new Map(valid).set(
    'src/app/features/example/example.ts',
    'window.confirm("Delete?");',
  );
  if (validateExclusiveConfirmUsage(invalidBrowser).length === 0) {
    throw new Error('Confirm governance accepted window.confirm');
  }

  const invalidInternal = new Map(valid).set(
    'src/app/features/example/example.ts',
    'import {ErpConfirmDialogContent} from "../../shared/confirm-dialog/internal/confirm-dialog-content";',
  );
  if (validateExclusiveConfirmUsage(invalidInternal).length === 0) {
    throw new Error('Confirm governance accepted direct internal content use');
  }

  const invalidPolicy = new Map(valid).set(
    CONFIRM_SERVICE,
    (valid.get(CONFIRM_SERVICE) ?? '').replace(
      "dismissOnBackdrop: false",
      "dismissOnBackdrop: true",
    ),
  );
  if (validateConfirmDialogContract(invalidPolicy).length === 0) {
    throw new Error('Confirm governance accepted system policy drift');
  }

  console.log('ErpConfirmDialog governance checker self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const files = new Map(
  walk(APP_ROOT)
    .filter((file) => /\.(?:ts|html)$/.test(file))
    .map((file) => [
      normalize(path.relative(ROOT, file)),
      fs.readFileSync(file, 'utf8'),
    ]),
);

const errors = [
  ...validateConfirmDialogContract(files),
  ...validateExclusiveConfirmUsage(files),
];

if (errors.length > 0) {
  console.error('ErpConfirmDialog governance check failed:\n');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log('ErpConfirmDialog governance check passed.');
