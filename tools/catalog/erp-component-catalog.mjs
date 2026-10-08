import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(TOOL_DIR, '../..');

const SOURCE_ROOTS = [
  'src/app/controls',
  'src/app/primitives',
  'src/app/shared',
];

const INTERNAL_COMPONENTS = new Set([
  'ErpConfirmDialogContent',
  'ErpEmptyStateLottie',
  'ErpOverlayFrame',
  'ErpOverlayHost',
  'ErpTooltipContent',
]);

const EXACT_REFERENCES = new Map([
  ['ErpAvatar', 'src/app/controls/avatar/ERP_AVATAR_REFERENCE_EXACT_V1.md'],
  ['ErpAvatarPicker', 'src/app/controls/avatar-picker/ERP_AVATAR_PICKER_REFERENCE_EXACT_V1.md'],
  ['ErpCheckBox', 'src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md'],
  ['ErpEmptyState', 'src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md'],
  ['ErpRadioBox', 'src/app/controls/radio-box/RADIO_BOX_VISUAL_CONTRACT_V1.md'],
  ['ErpSelect', 'src/app/controls/select/ERP_SELECT_REFERENCE_EXACT_V3.md'],
  ['ErpStatusBadge', 'src/app/controls/status-badge/ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md'],
  ['ErpTable', 'src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md'],
  ['ErpTabs', 'src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md'],
]);

const ACCEPTED_COMPONENTS = new Set(['ErpCheckBox']);

const CATEGORY_GROUPS = [
  ['Primitives', new Set([
    'erp-container', 'erp-divider', 'erp-grid', 'erp-icon', 'erp-inline',
    'erp-section', 'erp-stack', 'erp-surface', 'erp-text',
  ])],
  ['Inputs / Fields', new Set([
    'erp-color-picker', 'erp-combo-box', 'erp-date-box', 'erp-date-range-box',
    'erp-date-time-box', 'erp-file-picker', 'erp-icon-picker', 'erp-image-picker',
    'erp-item-picker', 'erp-money-box', 'erp-number-box', 'erp-number-stepper',
    'erp-password-box', 'erp-range-slider', 'erp-search-box', 'erp-select',
    'erp-tel-box', 'erp-text-area-box', 'erp-text-box', 'erp-time-box',
    'erp-url-box',
  ])],
  ['Selection', new Set([
    'erp-avatar-picker', 'erp-check-box', 'erp-column-chooser', 'erp-radio-box',
    'erp-radio-group', 'erp-view-switcher',
  ])],
  ['Actions', new Set([
    'erp-button', 'erp-button-group', 'erp-extended-fab', 'erp-fab',
    'erp-fab-menu', 'erp-icon-button', 'erp-split-button',
  ])],
  ['Feedback / Status', new Set([
    'erp-alert', 'erp-empty-state', 'erp-skeleton', 'erp-status-badge',
    'erp-tooltip',
  ])],
  ['Media / Identity', new Set(['erp-avatar'])],
  ['Navigation', new Set([
    'erp-breadcrumbs', 'erp-pagination', 'erp-sidebar', 'erp-sort-header',
    'erp-tabs', 'erp-stepper',
  ])],
  ['Data / Tables', new Set([
    'erp-bulk-action-bar', 'erp-filter-bar', 'erp-filter-drawer',
    'erp-smart-table', 'erp-table', 'erp-table-toolbar',
  ])],
  ['Forms', new Set([
    'erp-entity-schema-fields', 'erp-form', 'erp-form-actions',
    'erp-form-section', 'erp-repeater', 'erp-standard-entity-form',
    'erp-validation-summary',
  ])],
  ['Page Composition', new Set([
    'erp-page', 'erp-page-header', 'erp-page-shell',
  ])],
  ['Application Shell', new Set([
    'erp-app-shell', 'erp-branch-selector', 'erp-global-search',
    'erp-notification-bell', 'erp-topbar', 'erp-user-menu',
  ])],
];

const NATIVE_REPLACEMENTS = new Map([
  ['ErpAvatar', ['img']],
  ['ErpBreadcrumbs', ['nav', 'ol', 'li', 'a']],
  ['ErpButton', ['button']],
  ['ErpCheckBox', ['input[type=checkbox]']],
  ['ErpContainer', ['div']],
  ['ErpDateBox', ['input[type=date]']],
  ['ErpDateTimeBox', ['input[type=datetime-local]']],
  ['ErpDivider', ['hr']],
  ['ErpFab', ['button']],
  ['ErpFilePicker', ['input[type=file]']],
  ['ErpForm', ['form']],
  ['ErpGrid', ['div']],
  ['ErpIcon', ['svg', 'i']],
  ['ErpIconButton', ['button']],
  ['ErpImagePicker', ['input[type=file]', 'img']],
  ['ErpInline', ['div']],
  ['ErpMoneyBox', ['input[type=text]']],
  ['ErpNumberBox', ['input[type=text]']],
  ['ErpPasswordBox', ['input[type=password]']],
  ['ErpRadioBox', ['input[type=radio]']],
  ['ErpRangeSlider', ['input[type=range]']],
  ['ErpSearchBox', ['input[type=search]']],
  ['ErpSection', ['section']],
  ['ErpSelect', ['select', 'option', 'optgroup']],
  ['ErpSidebar', ['nav', 'ul', 'li', 'a']],
  ['ErpStack', ['div']],
  ['ErpSurface', ['div']],
  ['ErpTable', ['table', 'caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td']],
  ['ErpTelBox', ['input[type=tel]']],
  ['ErpText', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'small', 'span']],
  ['ErpTextAreaBox', ['textarea']],
  ['ErpTextBox', ['input[type=text]']],
  ['ErpTimeBox', ['input[type=time]']],
  ['ErpUrlBox', ['input[type=url]']],
]);

const PURPOSE_OVERRIDES = new Map([
  ['ErpAppShell', 'Frames the production ERP application using the approved Topbar, Sidebar, and projected routed content.'],
  ['ErpPage', 'Owns one production page boundary, width policy, block-size policy, scrolling, and responsive gutters.'],
  ['ErpPageShell', 'Composes page header, main, contextual side, and footer regions inside an ErpPage boundary.'],
  ['ErpStandardEntityForm', 'Provides bounded schema-assisted CRUD form composition through approved ERP controls.'],
  ['ErpTable', 'Owns native table semantics, rows, cells, selection, sorting, resizing, and rich cell projection.'],
  ['ErpText', 'Owns production text authoring and native text semantics.'],
  ['ErpIcon', 'Owns semantic icon registry rendering and hides vendor icon implementations.'],
]);

const FIXTURE_INPUTS = new Map([
  ['ErpAlert', {title: 'تنبيه تشغيلي'}],
  ['ErpAppShell', {navigationItems: [{id: 'finance', label: 'المالية', icon: 'wallet'}]}],
  ['ErpAvatar', {name: 'أميرة حداد'}],
  ['ErpBranchSelector', {branches: [{id: 'cairo', label: 'فرع القاهرة'}]}],
  ['ErpBreadcrumbs', {items: [{id: 'home', label: 'الرئيسية', href: '/'}]}],
  ['ErpButton', {label: 'تنفيذ الإجراء'}],
  ['ErpButtonGroup', {items: [{value: 'save', label: 'حفظ'}]}],
  ['ErpColumnChooser', {columns: [{key: 'name', label: 'الاسم', hideable: true}]}],
  ['ErpComboBox', {items: [{value: 'customer', label: 'عميل'}]}],
  ['ErpEntitySchemaFields', {fields: [], values: {}}],
  ['ErpExtendedFab', {label: 'إضافة سجل'}],
  ['ErpFab', {icon: 'add', label: 'إضافة'}],
  ['ErpFabMenu', {label: 'إجراءات سريعة', items: [{value: 'add', label: 'إضافة'}]}],
  ['ErpFilterDrawer', {definitions: []}],
  ['ErpForm', {label: 'نموذج السجل'}],
  ['ErpFormSection', {title: 'البيانات الأساسية'}],
  ['ErpIcon', {name: 'settings'}],
  ['ErpIconButton', {icon: 'settings', label: 'الإعدادات'}],
  ['ErpItemPicker', {items: [{value: 'item-1', label: 'صنف مخزني'}]}],
  ['ErpMoneyBox', {currency: 'EGP'}],
  ['ErpPageHeader', {title: 'سجل الحساب'}],
  ['ErpPagination', {pageCount: 3}],
  ['ErpRadioGroup', {options: [{value: 'active', label: 'نشط'}]}],
  ['ErpSidebar', {items: [{id: 'finance', label: 'المالية', icon: 'wallet'}]}],
  ['ErpSmartTable', {caption: 'سجل الحسابات', columns: [{key: 'name', label: 'اسم الحساب'}]}],
  ['ErpSortHeader', {label: 'اسم الحساب'}],
  ['ErpSplitButton', {label: 'حفظ', items: [{value: 'save-close', label: 'حفظ وإغلاق'}]}],
  ['ErpStandardEntityForm', {
    schema: {id: 'record', label: 'نموذج سجل', sections: [], actions: {submitLabel: 'حفظ'}},
    values: {},
  }],
  ['ErpStatusBadge', {label: 'نشط'}],
  ['ErpStepper', {steps: [{id: 'details', label: 'البيانات'}]}],
  ['ErpTable', {caption: 'سجل الحسابات', columns: [{key: 'name', label: 'اسم الحساب'}]}],
  ['ErpTabs', {items: [{id: 'overview', label: 'نظرة عامة', content: 'محتوى النظرة العامة'}]}],
  ['ErpUserMenu', {user: {displayName: 'أميرة حداد', secondaryText: 'مديرة المالية'}}],
]);

const FACET_NAMES = [
  'variant', 'size', 'shape', 'tone', 'orientation', 'distribution',
  'widthMode', 'scrollMode', 'disabled', 'readOnly', 'loading', 'selected',
  'multiple', 'motion', 'appearance',
];

export const NATIVE_ELEMENT_COVERAGE = [
  {tag: 'button', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpButton', 'ErpIconButton', 'ErpFab', 'ErpExtendedFab', 'ErpFieldTrigger', 'ErpTabTrigger', 'ErpSortTrigger', 'ErpAvatarAction', 'ErpStatusBadgeAction', 'ErpTableResizeHandle', 'ErpSelectionTile', 'ErpAvatarPickerTile'], allowedPaths: [
    'src/app/controls/avatar-picker/internal/avatar-picker-tile.html',
    'src/app/controls/avatar/internal/avatar-action.html',
    'src/app/controls/button/button.html',
    'src/app/controls/extended-fab/extended-fab.html',
    'src/app/controls/fab/fab.html',
    'src/app/controls/icon-button/icon-button.html',
    'src/app/controls/input-family/internal/field-trigger.html',
    'src/app/controls/select/internal/select-action.html',
    'src/app/controls/selection-family/internal/selection-tile.html',
    'src/app/controls/sort-header/internal/sort-trigger.html',
    'src/app/controls/status-badge/internal/status-badge-action.html',
    'src/app/controls/table/internal/table-resize-handle.html',
    'src/app/controls/tabs/internal/tab-trigger.html',
  ]},
  {tag: 'input', policy: 'GLOBAL_OWNER_ONLY', owners: ['Concrete ERP input owners', 'ErpCheckBox', 'ErpRadioBox', 'ErpRangeSlider', 'ErpFilePicker', 'ErpImagePicker', 'ErpSelectionPickerContent'], allowedPaths: [
    'src/app/controls/check-box/check-box.html',
    'src/app/controls/combo-box/combo-box.html',
    'src/app/controls/file-picker/file-picker.html',
    'src/app/controls/image-picker/image-picker.html',
    'src/app/controls/money-box/money-box.html',
    'src/app/controls/number-box/number-box.html',
    'src/app/controls/number-stepper/number-stepper.html',
    'src/app/controls/password-box/password-box.html',
    'src/app/controls/radio-box/radio-box.html',
    'src/app/controls/range-slider/range-slider.html',
    'src/app/controls/search-box/search-box.html',
    'src/app/controls/selection-family/internal/selection-picker-content.html',
    'src/app/controls/tel-box/tel-box.html',
    'src/app/controls/text-box/text-box.html',
    'src/app/controls/url-box/url-box.html',
  ]},
  {tag: 'textarea', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpTextAreaBox'], allowedPaths: ['src/app/controls/text-area-box/text-area-box.html']},
  {tag: 'select', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpSelect'], allowedPaths: []},
  {tag: 'option', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpSelect'], allowedPaths: []},
  {tag: 'optgroup', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpSelect'], allowedPaths: []},
  {tag: 'form', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpForm'], allowedPaths: ['src/app/controls/form/form.html']},
  {tag: 'label', policy: 'CONTEXTUAL', owners: ['Concrete field owners'], allowedPaths: [
    'src/app/controls/check-box/check-box.html',
    'src/app/controls/radio-box/radio-box.html',
    'src/app/controls/selection-family/internal/selection-picker-content.html',
    'src/app/primitives/text/text.html',
  ]},
  {tag: 'table', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpTable'], allowedPaths: ['src/app/controls/table/table.html']},
  ...['caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'].map((tag) => ({tag, policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpTable'], allowedPaths: ['src/app/controls/table/table.html']})),
  {tag: 'svg', policy: 'CONTEXTUAL', owners: ['ErpIcon', 'approved exact-reference drawing owners', 'Design Lab chart evidence'], allowedPaths: ['src/app/controls/check-box/check-box.html', 'src/app/review-internals/review-chart/review-chart.html']},
  {tag: 'img', policy: 'CONTEXTUAL', owners: ['ErpAvatar', 'ErpImagePicker', 'ErpStatusBadge'], allowedPaths: ['src/app/controls/avatar/avatar.html', 'src/app/controls/image-picker/image-picker.html', 'src/app/controls/status-badge/status-badge.html']},
  {tag: 'hr', policy: 'PAGE_AND_CONSUMER_BANNED', owners: ['ErpDivider'], allowedPaths: []},
  ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'small'].map((tag) => ({tag, policy: 'PAGE_AND_CONSUMER_BANNED', owners: ['ErpText'], allowedPaths: ['src/app/primitives/text/text.html']})),
  ...['section', 'main', 'header', 'footer', 'aside', 'nav', 'div', 'span', 'a', 'ul', 'ol', 'li'].map((tag) => ({tag, policy: 'PAGE_AND_CONSUMER_BANNED', owners: ['ERP structural owner or bounded component anatomy'], allowedPaths: []})),
];

const EXTRA_ENTRIES = [
  ['AnchoredOverlayController', 'SERVICE / CONTROLLER', 'src/app/shared/anchored-overlay/anchored-overlay-controller.ts', 'Owns nonblocking anchored surface geometry and lifecycle.'],
  ['ErpConfirmDialogService', 'SERVICE / CONTROLLER', 'src/app/shared/confirm-dialog/confirm-dialog.service.ts', 'Opens approved confirmation dialogs through the shared overlay system.'],
  ['ErpOverlayManager', 'SERVICE / CONTROLLER', 'src/app/shared/overlay/overlay-manager.ts', 'Owns blocking overlay lifecycle, focus, scroll, and stacking.'],
  ['ErpOverlayRef', 'CONTRACT ONLY', 'src/app/shared/overlay/overlay-ref.ts', 'Represents one manager-owned blocking overlay instance.'],
  ['ErpInputBase', 'CONTRACT ONLY', 'src/app/controls/input-family/input-base.ts', 'Shares nonvisual CVA and validation behavior across concrete input owners.'],
  ['ErpFileSelectionBase', 'CONTRACT ONLY', 'src/app/controls/input-family/file-selection-base.ts', 'Shares bounded file-selection behavior for FilePicker and ImagePicker.'],
  ['PressRippleController', 'SERVICE / CONTROLLER', 'src/app/controls/button-family/internal/press-ripple.ts', 'Owns shared press-ripple interaction for the Button family.'],
  ['ShellAnchoredSurfaceController', 'SERVICE / CONTROLLER', 'src/app/controls/shell-family/internal/shell-anchored-surface.ts', 'Adapts approved anchored overlays for shell entry surfaces.'],
];

function posix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function walk(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute));
    else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts')) result.push(absolute);
  }
  return result;
}

function literalProperty(objectLiteral, name) {
  const property = objectLiteral.properties.find((candidate) =>
    ts.isPropertyAssignment(candidate) && candidate.name.getText().replaceAll(/["']/g, '') === name,
  );
  if (!property || !ts.isPropertyAssignment(property)) return null;
  const initializer = property.initializer;
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) return initializer.text;
  return null;
}

function templateFor(component, sourceFile, sourcePath) {
  const templateUrl = literalProperty(component.metadata, 'templateUrl');
  if (templateUrl) {
    const absolute = path.resolve(path.dirname(path.join(REPO_ROOT, sourcePath)), templateUrl);
    return fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '';
  }
  const inlineTemplate = literalProperty(component.metadata, 'template');
  return inlineTemplate ?? '';
}

function nativeTags(template) {
  const tags = new Set();
  for (const match of template.matchAll(/<\s*([a-zA-Z][\w-]*)\b/g)) {
    const tag = match[1].toLowerCase();
    if (!tag.startsWith('erp-') && !tag.startsWith('ng-') && !tag.startsWith('router-')) tags.add(tag);
  }
  return [...tags].sort();
}

function dependencies(sourceText, template) {
  const result = new Set();
  for (const match of sourceText.matchAll(/\b(Erp[A-Z][A-Za-z0-9]+)\b/g)) result.add(match[1]);
  for (const match of template.matchAll(/<\s*(erp-[\w-]+)/g)) result.add(match[1]);
  return [...result].sort();
}

function unionLiteralAliases(files) {
  const aliases = new Map();
  for (const absolutePath of files) {
    const source = fs.readFileSync(absolutePath, 'utf8');
    for (const match of source.matchAll(/export\s+type\s+(\w+)\s*=\s*([^;]+);/gs)) {
      if (match[2].includes('{')) continue;
      const values = [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map((value) => value[1]);
      if (values.length) aliases.set(match[1], [...new Set(values)]);
    }
  }
  return aliases;
}

function inputValues(member, sourceFile, aliases) {
  const typeArgument = member.initializer.typeArguments?.[0];
  if (!typeArgument) return [];
  const typeText = typeArgument.getText(sourceFile);
  if (aliases.has(typeText)) return aliases.get(typeText);
  return [...typeText.matchAll(/['"]([^'"]+)['"]/g)].map((value) => value[1]);
}

function publicApi(classDeclaration, sourceFile, aliases) {
  const inputs = [];
  const outputs = [];
  const models = [];
  for (const member of classDeclaration.members) {
    if (!ts.isPropertyDeclaration(member) || !member.name || !member.initializer) continue;
    const modifiers = new Set((member.modifiers ?? []).map((modifier) => modifier.kind));
    if (modifiers.has(ts.SyntaxKind.PrivateKeyword) || modifiers.has(ts.SyntaxKind.ProtectedKeyword)) continue;
    if (!ts.isCallExpression(member.initializer)) continue;
    const name = member.name.getText(sourceFile).replaceAll(/["']/g, '');
    const expression = member.initializer.expression.getText(sourceFile);
    if (expression === 'input' || expression === 'input.required') {
      inputs.push({
        name,
        required: expression.endsWith('.required'),
        values: inputValues(member, sourceFile, aliases),
      });
    } else if (expression === 'output') {
      outputs.push(name);
    } else if (expression === 'model' || expression === 'model.required') {
      models.push({
        name,
        required: expression.endsWith('.required'),
        values: inputValues(member, sourceFile, aliases),
      });
    }
  }
  return {inputs, outputs, models};
}

function classify(className, decoratorName, sourcePath) {
  if (decoratorName === 'Directive') return 'DIRECTIVE / TEMPLATE EXTENSION';
  if (sourcePath.includes('/internal/') || INTERNAL_COMPONENTS.has(className)) return 'INTERNAL SEMANTIC OWNER';
  return 'PUBLIC ERP COMPONENT';
}

function categoryFor(selector, classification) {
  if (classification !== 'PUBLIC ERP COMPONENT') return 'Internal Owners';
  for (const [category, selectors] of CATEGORY_GROUPS) {
    if (selectors.has(selector)) return category;
  }
  return 'Feedback / Status';
}

function purposeFor(className, selector, classification) {
  if (PURPOSE_OVERRIDES.has(className)) return PURPOSE_OVERRIDES.get(className);
  const label = selector.replace(/^erp-/, '').replaceAll('-', ' ');
  if (classification === 'PUBLIC ERP COMPONENT') return `Owns the public ERP ${label} semantic and presentation contract.`;
  if (classification === 'DIRECTIVE / TEMPLATE EXTENSION') return `Extends its parent ERP owner with typed ${label} template projection.`;
  return `Owns bounded internal ${label} semantics for its parent ERP component.`;
}

function fixtureCases(entry, sourceText) {
  const baseInputs = FIXTURE_INPUTS.get(entry.className) ?? {};
  const cases = [{id: 'default', label: 'الحالة الافتراضية', inputs: baseInputs}];
  for (const inputApi of entry.publicApi.inputs) {
    if (!FACET_NAMES.includes(inputApi.name)) continue;
    for (const value of inputApi.values) {
      cases.push({
        id: `${inputApi.name}-${value}`,
        label: `${inputApi.name}: ${value}`,
        inputs: {...baseInputs, [inputApi.name]: value},
      });
    }
  }
  if (/readonly\s+disabled\s*=\s*input/.test(sourceText)) {
    cases.push({id: 'disabled', label: 'حالة معطلة', inputs: {...baseInputs, disabled: true}});
  }
  if (/readonly\s+readOnly\s*=\s*input/.test(sourceText)) {
    cases.push({id: 'readonly', label: 'للقراءة فقط', inputs: {...baseInputs, readOnly: true}});
  }
  if (/readonly\s+loading\s*=\s*input/.test(sourceText)) {
    cases.push({id: 'loading', label: 'حالة تحميل', inputs: {...baseInputs, loading: true}});
  }
  return cases;
}

function scanDecoratedEntries() {
  const files = SOURCE_ROOTS.flatMap((root) => walk(path.join(REPO_ROOT, root)));
  const aliases = unionLiteralAliases(files);
  const entries = [];
  for (const absolutePath of files) {
    const sourcePath = posix(path.relative(REPO_ROOT, absolutePath));
    const sourceText = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const statement of sourceFile.statements) {
      if (!ts.isClassDeclaration(statement) || !statement.name) continue;
      const decorators = ts.canHaveDecorators(statement) ? ts.getDecorators(statement) ?? [] : [];
      for (const decorator of decorators) {
        if (!ts.isCallExpression(decorator.expression)) continue;
        const decoratorName = decorator.expression.expression.getText(sourceFile);
        if (!['Component', 'Directive'].includes(decoratorName)) continue;
        const metadata = decorator.expression.arguments[0];
        if (!metadata || !ts.isObjectLiteralExpression(metadata)) continue;
        const selector = literalProperty(metadata, 'selector');
        if (!selector) continue;
        const className = statement.name.text;
        const classification = classify(className, decoratorName, sourcePath);
        const component = {metadata};
        const template = templateFor(component, sourceFile, sourcePath);
        const id = selector.startsWith('erp-') ? selector.slice(4) : className.replace(/^Erp/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        const entry = {
          id,
          selector,
          className,
          category: categoryFor(selector, classification),
          classification,
          sourcePath,
          purpose: purposeFor(className, selector, classification),
          publicApi: publicApi(statement, sourceFile, aliases),
          lowerLevelOwners: dependencies(sourceText, template).filter((dependency) => dependency !== className),
          nativeElementsOwned: nativeTags(template),
          nativeCoverage: NATIVE_REPLACEMENTS.get(className) ?? [],
          coverageScope: classification === 'PUBLIC ERP COMPONENT' ? 'public-consumer' : 'parent-owner-only',
          showcaseRoute: classification === 'PUBLIC ERP COMPONENT' ? `/components/${id}` : null,
          visualReference: EXACT_REFERENCES.get(className) ?? null,
          visualStatus: ACCEPTED_COMPONENTS.has(className) ? 'ACCEPTED' : 'PENDING',
          showcaseFacets: FACET_NAMES.filter((facet) => new RegExp(`readonly\\s+${facet}\\s*=\\s*input`).test(sourceText)),
          showcaseCases: classification === 'PUBLIC ERP COMPONENT'
            ? fixtureCases({className, publicApi: publicApi(statement, sourceFile, aliases)}, sourceText)
            : [],
        };
        entries.push(entry);
      }
    }
  }
  return entries;
}

export function buildCatalog() {
  const entries = scanDecoratedEntries();
  for (const [className, classification, sourcePath, purpose] of EXTRA_ENTRIES) {
    entries.push({
      id: className.replace(/^Erp/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
      selector: null,
      className,
      category: 'Internal Owners',
      classification,
      sourcePath,
      purpose,
      publicApi: {inputs: [], outputs: [], models: []},
      lowerLevelOwners: [],
      nativeElementsOwned: [],
      nativeCoverage: [],
      coverageScope: 'parent-owner-only',
      showcaseRoute: null,
      visualReference: null,
      visualStatus: 'PENDING',
      showcaseFacets: [],
      showcaseCases: [],
    });
  }
  return entries.sort((left, right) => left.category.localeCompare(right.category) || left.className.localeCompare(right.className));
}

function relativeImportPath(sourcePath) {
  const withoutExtension = sourcePath.replace(/^src\/app\//, '../').replace(/\.ts$/, '');
  return withoutExtension;
}

function generatedTypeScript(catalog) {
  const publicEntries = catalog.filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT');
  const data = JSON.stringify(catalog, null, 2);
  const loaders = publicEntries.map((entry) =>
    `  ${JSON.stringify(entry.id)}: () => import(${JSON.stringify(relativeImportPath(entry.sourcePath))}).then((module) => module.${entry.className}),`,
  ).join('\n');
  return `// GENERATED by tools/catalog/erp-component-catalog.mjs. Do not edit by hand.
import {Type} from '@angular/core';

export type ErpCatalogClassification = 'PUBLIC ERP COMPONENT' | 'INTERNAL SEMANTIC OWNER' | 'DIRECTIVE / TEMPLATE EXTENSION' | 'SERVICE / CONTROLLER' | 'CONTRACT ONLY';
export type ErpCatalogVisualStatus = 'PENDING' | 'ACCEPTED' | 'REOPENED';

export interface ErpComponentShowcaseCase {
  readonly id: string;
  readonly label: string;
  readonly inputs: Readonly<Record<string, unknown>>;
}

export interface ErpComponentCatalogEntry {
  readonly id: string;
  readonly selector: string | null;
  readonly className: string;
  readonly category: string;
  readonly classification: ErpCatalogClassification;
  readonly sourcePath: string;
  readonly purpose: string;
  readonly publicApi: {
    readonly inputs: readonly {readonly name: string; readonly required: boolean; readonly values: readonly string[]}[];
    readonly outputs: readonly string[];
    readonly models: readonly {readonly name: string; readonly required: boolean; readonly values: readonly string[]}[];
  };
  readonly lowerLevelOwners: readonly string[];
  readonly nativeElementsOwned: readonly string[];
  readonly nativeCoverage: readonly string[];
  readonly coverageScope: string;
  readonly showcaseRoute: string | null;
  readonly visualReference: string | null;
  readonly visualStatus: ErpCatalogVisualStatus;
  readonly showcaseFacets: readonly string[];
  readonly showcaseCases: readonly ErpComponentShowcaseCase[];
}

export const ERP_COMPONENT_CATALOG: readonly ErpComponentCatalogEntry[] = ${data};

export const ERP_PUBLIC_COMPONENT_LOADERS: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
${loaders}
};
`;
}

function generatedNavigationTypeScript(catalog) {
  const entries = catalog
    .filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT')
    .map(({id, className, category, showcaseRoute}) => ({
      id,
      className,
      category,
      showcaseRoute,
    }));
  return `// GENERATED by tools/catalog/erp-component-catalog.mjs. Do not edit by hand.
export interface ErpComponentNavigationEntry {
  readonly id: string;
  readonly className: string;
  readonly category: string;
  readonly showcaseRoute: string;
}

export const ERP_COMPONENT_NAVIGATION: readonly ErpComponentNavigationEntry[] = ${JSON.stringify(entries, null, 2)};
`;
}

function markdownCatalog(catalog) {
  const lines = [
    '# ERP Component Catalog V1',
    '',
    '> Generated from `tools/catalog/erp-component-catalog.mjs` and live Angular source. Do not edit this inventory by hand.',
    '',
  ];
  for (const category of [...new Set(catalog.map((entry) => entry.category))]) {
    lines.push(`## ${category}`, '', '| Classification | Selector / owner | Purpose | Public API | Native coverage | Dependencies | Showcase | Reference | Visual status |', '|---|---|---|---|---|---|---|---|---|');
    for (const entry of catalog.filter((candidate) => candidate.category === category)) {
      const api = [...entry.publicApi.inputs.map((value) => `in:${value.name}${value.required ? '*' : ''}`), ...entry.publicApi.models.map((value) => `model:${value.name}${value.required ? '*' : ''}`), ...entry.publicApi.outputs.map((value) => `out:${value}`)];
      lines.push(`| ${entry.classification} | ${entry.selector ? `\`${entry.selector}\`` : `\`${entry.className}\``} | ${entry.purpose} | ${api.length ? api.map((value) => `\`${value}\``).join(', ') : 'none'} | ${entry.nativeCoverage.length ? entry.nativeCoverage.map((value) => `\`${value}\``).join(', ') : 'none'} | ${entry.lowerLevelOwners.length ? entry.lowerLevelOwners.map((value) => `\`${value}\``).join(', ') : 'none'} | ${entry.showcaseRoute ? `\`${entry.showcaseRoute}\`` : 'internal evidence'} | ${entry.visualReference ? `\`${entry.visualReference}\`` : 'none supplied'} | ${entry.visualStatus} |`);
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function markdownCoverage() {
  const lines = [
    '# ERP Native Element Coverage V1',
    '',
    '> Generated from the single ownership registry in `tools/catalog/erp-component-catalog.mjs`.',
    '',
    '| Native tag | Policy | ERP owner / replacement | Exact allowed owner paths |',
    '|---|---|---|---|',
  ];
  for (const entry of NATIVE_ELEMENT_COVERAGE) {
    lines.push(`| \`${entry.tag}\` | ${entry.policy} | ${entry.owners.map((owner) => `\`${owner}\``).join(', ')} | ${entry.allowedPaths.length ? entry.allowedPaths.map((ownerPath) => `\`${ownerPath}\``).join('<br>') : 'none'} |`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

export function generatedArtifacts() {
  const catalog = buildCatalog();
  return new Map([
    ['src/app/catalog/erp-component-catalog.generated.ts', generatedTypeScript(catalog)],
    ['src/app/catalog/erp-component-navigation.generated.ts', generatedNavigationTypeScript(catalog)],
    ['src/app/controls/ERP_COMPONENT_CATALOG_V1.md', markdownCatalog(catalog)],
    ['src/app/controls/ERP_NATIVE_ELEMENT_COVERAGE_V1.md', markdownCoverage()],
  ]);
}

export function writeArtifacts() {
  for (const [relativePath, contents] of generatedArtifacts()) {
    const absolutePath = path.join(REPO_ROOT, relativePath);
    fs.mkdirSync(path.dirname(absolutePath), {recursive: true});
    fs.writeFileSync(absolutePath, contents);
  }
}

if (process.argv.includes('--generate')) {
  writeArtifacts();
  const catalog = buildCatalog();
  const publicCount = catalog.filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT').length;
  console.log(`ERP component catalog generated (${publicCount} public components, ${catalog.length - publicCount} supporting entries).`);
}
