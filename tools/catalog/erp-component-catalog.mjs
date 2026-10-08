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

const ARABIC_COMPONENT_METADATA = new Map([
  ['button', ['زر', 'إجراء نصي قياسي بحالاته وأحجامه وأنماطه.']],
  ['button-group', ['مجموعة أزرار', 'اختيار إجراء واحد من مجموعة مترابطة.']],
  ['extended-fab', ['زر إجراء عائم ممتد', 'إجراء عائم يجمع الأيقونة والتسمية.']],
  ['fab', ['زر إجراء عائم', 'إجراء عائم بأيقونة ودلالة وصول واضحة.']],
  ['fab-menu', ['قائمة إجراءات عائمة', 'مجموعة إجراءات عائمة قابلة للفتح والإغلاق.']],
  ['icon-button', ['زر أيقونة', 'إجراء مختصر بأيقونة وتسمية وصول.']],
  ['split-button', ['زر منقسم', 'إجراء أساسي مع قائمة إجراءات إضافية.']],
  ['app-shell', ['إطار تطبيق ERP', 'تكوين إطار التطبيق من الشريط العلوي والشريط الجانبي والمحتوى.']],
  ['branch-selector', ['محدد الفرع', 'اختيار فرع مضبوط يتحكم فيه المستهلك.']],
  ['global-search', ['البحث العام', 'بحث عام داخل إطار التطبيق مع نتائج مصنفة.']],
  ['notification-bell', ['جرس الإشعارات', 'مدخل إشعارات قابل للفتح مع عدد غير المقروء.']],
  ['topbar', ['الشريط العلوي', 'تخطيط مناطق السياق والبحث والإشعارات والمستخدم.']],
  ['user-menu', ['قائمة المستخدم', 'هوية المستخدم وإجراءات الحساب ضمن سطح مثبت.']],
  ['bulk-action-bar', ['شريط الإجراءات الجماعية', 'إجراءات مرتبطة بالصفوف المحددة.']],
  ['filter-bar', ['شريط التصفية', 'عرض المرشحات النشطة وإصدار نوايا تعديلها.']],
  ['filter-drawer', ['درج التصفية', 'سطح حاجب لتكوين المرشحات وتطبيقها.']],
  ['smart-table', ['الجدول الذكي', 'تركيب مضبوط للجدول والأدوات والصفحات والحالات.']],
  ['table', ['الجدول', 'دلالات الجدول والصفوف والخلايا والاختيار والفرز والتحجيم.']],
  ['table-toolbar', ['شريط أدوات الجدول', 'تخطيط البحث والإجراءات وأدوات العرض للجدول.']],
  ['alert', ['تنبيه', 'رسالة ملاحظات قابلة للإغلاق عند السماح بذلك.']],
  ['empty-state', ['الحالة الفارغة', 'حالة فارغة بعنوان ووصف وإجراءات ورسوم اختيارية.']],
  ['skeleton', ['هيكل التحميل', 'تمثيل مؤقت للمحتوى أثناء التحميل.']],
  ['status-badge', ['شارة الحالة', 'مؤشر حالة غير تفاعلي أو تفاعلي حسب العقد.']],
  ['tooltip', ['تلميح', 'شرح مثبت على محفز مرئي مع مواضع وسلوك فتح متعددة.']],
  ['entity-schema-fields', ['حقول مخطط الكيان', 'عرض حقول المخطط من خلال مدخلات ERP المعتمدة.']],
  ['form', ['نموذج', 'حد form الدلالي مع نوايا الإرسال وإعادة الضبط.']],
  ['form-actions', ['إجراءات النموذج', 'تخطيط الإجراءات الأساسية والثانوية للنموذج.']],
  ['form-section', ['قسم النموذج', 'تجميع دلالي لحقول النموذج مع عنوان وإجراءات.']],
  ['repeater', ['مكرر', 'قائمة عناصر مضبوطة مع نوايا الإضافة والحذف.']],
  ['standard-entity-form', ['نموذج الكيان القياسي', 'تكوين CRUD محدود بمخطط وقيم مضبوطة.']],
  ['validation-summary', ['ملخص التحقق', 'عرض مشكلات التحقق المشتركة ونية تنشيط الحقل.']],
  ['color-picker', ['منتقي اللون', 'اختيار لون من سجل ألوان النظام.']],
  ['combo-box', ['صندوق التحرير والاختيار', 'تحرير نصي مع اقتراحات واختيار مضبوط.']],
  ['date-box', ['حقل التاريخ', 'تحرير تاريخ من خلال عقد الإدخال المعتمد.']],
  ['date-range-box', ['حقل نطاق التاريخ', 'اختيار نطاق زمني مضبوط.']],
  ['date-time-box', ['حقل التاريخ والوقت', 'تحرير تاريخ ووقت ضمن عقد واحد.']],
  ['file-picker', ['منتقي الملفات', 'اختيار ملفات محلية متعدد دون نقل شبكي.']],
  ['icon-picker', ['منتقي الأيقونة', 'اختيار أيقونة دلالية من سجل النظام.']],
  ['image-picker', ['منتقي الصور', 'اختيار صور محلية مع معاينات مضبوطة.']],
  ['item-picker', ['منتقي العناصر', 'اختيار عناصر من قائمة يملكها المستهلك.']],
  ['money-box', ['حقل المال', 'تحرير قيمة مالية وعملة وفق التفضيلات.']],
  ['number-box', ['حقل الرقم', 'تحرير قيمة رقمية نصية بلا spinner متصفح.']],
  ['number-stepper', ['مغيّر الرقم', 'زيادة وإنقاص قيمة عددية ضمن حدود مضبوطة.']],
  ['password-box', ['حقل كلمة المرور', 'تحرير قيمة سرية مع إظهار مضبوط.']],
  ['range-slider', ['منزلق النطاق', 'اختيار حدين عدديين من نطاق.']],
  ['search-box', ['صندوق البحث', 'تحرير استعلام وعرض نتائج inline أو popup.']],
  ['select', ['قائمة الاختيار', 'اختيار مفرد أو متعدد مع بحث وتجميع.']],
  ['tel-box', ['حقل الهاتف', 'تحرير رقم هاتف وفق عقد الحقول.']],
  ['text-area-box', ['منطقة النص', 'تحرير نص متعدد الأسطر.']],
  ['text-box', ['حقل النص', 'تحرير نص قياسي مع حالات الحقل.']],
  ['time-box', ['حقل الوقت', 'تحرير وقت وفق عقد الحقول.']],
  ['url-box', ['حقل الرابط', 'تحرير عنوان URL مع تحقق الحقل.']],
  ['avatar', ['الصورة الرمزية', 'هوية بصرية بصورة أو أحرف أو أيقونة وحضور.']],
  ['breadcrumbs', ['مسار التنقل', 'مسار موقع منطقي مع العنصر الحالي.']],
  ['pagination', ['ترقيم الصفحات', 'تنقل مضبوط بين الصفحات وحجم الصفحة.']],
  ['sidebar', ['الشريط الجانبي', 'تنقل هرمي مضبوط بعناصر يقدمها المستهلك.']],
  ['sort-header', ['رأس الفرز', 'رأس تفاعلي يبدل اتجاه الفرز.']],
  ['stepper', ['الخطوات', 'تنقل مضبوط بين خطوات ومحتوى مسمى.']],
  ['tabs', ['علامات التبويب', 'تبديل دلالي بين رؤوس ولوحات محتوى.']],
  ['page', ['الصفحة', 'حد عرض وتمرير واستجابة لمحتوى صفحة واحدة.']],
  ['page-header', ['رأس الصفحة', 'عنوان الصفحة والوصف والبيانات والإجراءات المسقطة.']],
  ['page-shell', ['تكوين الصفحة', 'تنظيم الرأس والمحتوى والسياق والتذييل.']],
  ['container', ['الحاوية', 'حد عرض أفقي للمحتوى.']],
  ['divider', ['الفاصل', 'فاصل دلالي أفقي أو رأسي.']],
  ['grid', ['الشبكة', 'تخطيط شبكي بأعمدة وفجوات مضبوطة.']],
  ['icon', ['الأيقونة', 'عرض أيقونة دلالية من السجل المعتمد.']],
  ['inline', ['التخطيط السطري', 'ترتيب عناصر على المحور السطري مع التفاف مضبوط.']],
  ['section', ['القسم', 'حد section دلالي وفجوة داخلية.']],
  ['stack', ['التكديس', 'ترتيب عناصر رأسيًا مع محاذاة وفجوات مضبوطة.']],
  ['surface', ['السطح', 'سطح مرئي يملك الحشو والحدود والارتفاع.']],
  ['text', ['النص', 'بوابة النصوص الإنتاجية وأدوارها الدلالية.']],
  ['avatar-picker', ['منتقي الصورة الرمزية', 'اختيار صورة رمزية مضبوطة من الفهرس.']],
  ['check-box', ['مربع الاختيار', 'اختيار منطقي مستقل أو ضمن مجموعة.']],
  ['column-chooser', ['محدد الأعمدة', 'ضبط الأعمدة المرئية للجدول.']],
  ['radio-box', ['زر الاختيار', 'اختيار قيمة واحدة ضمن سياق.']],
  ['radio-group', ['مجموعة الاختيار', 'مجموعة خيارات أحادية مضبوطة.']],
  ['view-switcher', ['مبدل العرض', 'اختيار وضع عرض واحد من أوضاع محددة.']],
]);

const CVA_COMPONENTS = new Set([
  'ErpCheckBox', 'ErpColorPicker',
  'ErpComboBox', 'ErpDateBox', 'ErpDateRangeBox', 'ErpDateTimeBox',
  'ErpFilePicker', 'ErpIconPicker', 'ErpImagePicker',
  'ErpItemPicker', 'ErpMoneyBox', 'ErpNumberBox', 'ErpNumberStepper',
  'ErpPasswordBox', 'ErpRadioBox', 'ErpRadioGroup', 'ErpRangeSlider',
  'ErpSearchBox', 'ErpSelect', 'ErpTelBox', 'ErpTextAreaBox', 'ErpTextBox',
  'ErpTimeBox', 'ErpUrlBox',
]);

const PROJECTION_COMPONENTS = new Set([
  'ErpAppShell', 'ErpContainer', 'ErpForm', 'ErpFormActions', 'ErpFormSection',
  'ErpGrid', 'ErpInline', 'ErpPage', 'ErpPageHeader', 'ErpPageShell',
  'ErpSection', 'ErpStack', 'ErpSurface', 'ErpText', 'ErpTooltip', 'ErpTopbar',
]);

const EXACT_CORE_SHOWCASE_IDS = new Set([
  'select', 'status-badge', 'alert', 'skeleton', 'avatar',
  'tabs', 'avatar-picker', 'table', 'pagination',
]);

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
  ['ErpAvatarPicker', {avatars: [
    {id: 'avatar-01', gender: 'male', imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-01.png', label: 'صورة ١'},
    {id: 'avatar-02', gender: 'male', imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-02.png', label: 'صورة ٢'},
    {id: 'avatar-21', gender: 'female', imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-21.png', label: 'صورة ٢١'},
    {id: 'avatar-22', gender: 'female', imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-22.png', label: 'صورة ٢٢'},
  ]}],
  ['ErpBranchSelector', {branches: [{id: 'cairo', label: 'فرع القاهرة'}]}],
  ['ErpBreadcrumbs', {items: [{id: 'home', label: 'الرئيسية', href: '/'}]}],
  ['ErpButton', {label: 'تنفيذ الإجراء'}],
  ['ErpButtonGroup', {items: [
    {value: 'save', label: 'حفظ', icon: 'save'},
    {value: 'preview', label: 'معاينة', icon: 'eye'},
    {value: 'archive', label: 'أرشفة', icon: 'layers'},
  ]}],
  ['ErpBulkActionBar', {selectedCount: 3}],
  ['ErpColumnChooser', {columns: [{key: 'name', label: 'الاسم', hideable: true}]}],
  ['ErpComboBox', {items: [{value: 'customer', label: 'عميل'}]}],
  ['ErpEntitySchemaFields', {
    fields: [{key: 'name', kind: 'text', label: 'اسم السجل'}],
    values: {name: 'حساب المبيعات'},
  }],
  ['ErpExtendedFab', {label: 'إضافة سجل'}],
  ['ErpFab', {icon: 'add', label: 'إضافة'}],
  ['ErpFabMenu', {label: 'إجراءات سريعة', items: [
    {value: 'add', label: 'إضافة', icon: 'add', presentation: 'icon'},
    {value: 'save', label: 'حفظ', presentation: 'text'},
    {value: 'share', label: 'مشاركة', icon: 'copy', presentation: 'icon-text'},
    {value: 'archive', label: 'أرشفة', icon: 'layers', presentation: 'icon-text'},
    {value: 'delete', label: 'حذف', icon: 'delete', presentation: 'icon-text', disabled: true},
  ]}],
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
  ['ErpSmartTable', {
    caption: 'سجل الحسابات',
    columns: [{key: 'name', label: 'اسم الحساب'}, {key: 'balance', label: 'الرصيد'}],
    rows: [{id: '1', name: 'حساب المبيعات', balance: '125,000 ج.م'}],
    page: 1,
    pageSize: 25,
    sort: null,
    filters: [],
    visibleColumns: [],
    selectedKeys: [],
  }],
  ['ErpSortHeader', {label: 'اسم الحساب'}],
  ['ErpSplitButton', {label: 'حفظ', items: [
    {value: 'save-close', label: 'حفظ وإغلاق', icon: 'save', presentation: 'icon-text'},
    {value: 'save-copy', label: 'حفظ نسخة', presentation: 'text'},
    {value: 'preview', label: 'معاينة', icon: 'eye', presentation: 'icon'},
    {value: 'archive', label: 'أرشفة', icon: 'layers', presentation: 'icon-text'},
    {value: 'delete', label: 'حذف', icon: 'delete', presentation: 'icon-text', disabled: true},
  ]}],
  ['ErpStandardEntityForm', {
    schema: {id: 'record', label: 'نموذج سجل', sections: [], actions: {submitLabel: 'حفظ'}},
    values: {},
  }],
  ['ErpStatusBadge', {label: 'نشط'}],
  ['ErpStepper', {steps: [{id: 'details', label: 'البيانات'}]}],
  ['ErpTable', {
    caption: 'سجل الحسابات',
    columns: [{key: 'name', label: 'اسم الحساب'}, {key: 'balance', label: 'الرصيد'}],
    rows: [{id: '1', name: 'حساب المبيعات', balance: '125,000 ج.م'}],
    selectedKeys: [],
    columnWidths: {},
  }],
  ['ErpTabs', {items: [{id: 'overview', label: 'نظرة عامة', content: 'محتوى النظرة العامة'}]}],
  ['ErpTooltip', {text: 'توضيح الإجراء للمستخدم'}],
  ['ErpUserMenu', {user: {displayName: 'أميرة حداد', secondaryText: 'مديرة المالية'}}],
  ['ErpValidationSummary', {issues: [
    {key: 'account-name', fieldLabel: 'اسم الحساب', message: 'اسم الحساب مطلوب.'},
    {key: 'branch', fieldLabel: 'الفرع', message: 'يجب اختيار الفرع.'},
  ]}],
]);

const FACET_NAMES = [
  'variant', 'size', 'shape', 'tone', 'orientation', 'distribution',
  'widthMode', 'scrollMode', 'disabled', 'readOnly', 'loading', 'selected',
  'multiple', 'motion', 'appearance', 'placement', 'activation', 'mode',
  'position', 'align', 'justify', 'gap', 'wrap', 'density', 'headerShape',
  'verticalPlacement', 'selectSize', 'presence', 'presencePosition',
  'presenceMotion', 'hoverMotion', 'cursor', 'transition', 'direction',
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
  if (typeArgument) {
    const typeText = typeArgument.getText(sourceFile);
    if (typeText === 'boolean') return ['false', 'true'];
    if (aliases.has(typeText)) return aliases.get(typeText);
    const literals = [...typeText.matchAll(/['"]([^'"]+)['"]/g)].map((value) => value[1]);
    if (literals.length) return literals;
  }
  const firstArgument = member.initializer.arguments[0];
  if (firstArgument?.kind === ts.SyntaxKind.TrueKeyword ||
      firstArgument?.kind === ts.SyntaxKind.FalseKeyword) {
    return ['false', 'true'];
  }
  return [];
}

function inputType(member, sourceFile) {
  const typeArgument = member.initializer.typeArguments?.[0];
  if (typeArgument) return typeArgument.getText(sourceFile);
  const firstArgument = member.initializer.arguments[0];
  if (!firstArgument) return 'unknown';
  if (ts.isStringLiteral(firstArgument) || ts.isNoSubstitutionTemplateLiteral(firstArgument)) return 'string';
  if (ts.isNumericLiteral(firstArgument)) return 'number';
  if (firstArgument.kind === ts.SyntaxKind.TrueKeyword || firstArgument.kind === ts.SyntaxKind.FalseKeyword) return 'boolean';
  if (firstArgument.kind === ts.SyntaxKind.NullKeyword) return 'unknown | null';
  if (ts.isArrayLiteralExpression(firstArgument)) return 'readonly unknown[]';
  if (ts.isObjectLiteralExpression(firstArgument)) return 'Readonly<Record<string, unknown>>';
  return firstArgument.getText(sourceFile);
}

function literalValue(node) {
  if (!node) return {found: false, value: null};
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return {found: true, value: node.text};
  }
  if (ts.isNumericLiteral(node)) return {found: true, value: Number(node.text)};
  if (node.kind === ts.SyntaxKind.TrueKeyword) return {found: true, value: true};
  if (node.kind === ts.SyntaxKind.FalseKeyword) return {found: true, value: false};
  if (node.kind === ts.SyntaxKind.NullKeyword) return {found: true, value: null};
  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const value = Number(node.operand.text);
    return {found: true, value: node.operator === ts.SyntaxKind.MinusToken ? -value : value};
  }
  if (ts.isArrayLiteralExpression(node)) {
    const values = [];
    for (const element of node.elements) {
      const resolved = literalValue(element);
      if (!resolved.found) return {found: false, value: null};
      values.push(resolved.value);
    }
    return {found: true, value: values};
  }
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) return {found: false, value: null};
      const key = property.name.getText().replaceAll(/["']/g, '');
      const resolved = literalValue(property.initializer);
      if (!resolved.found) return {found: false, value: null};
      value[key] = resolved.value;
    }
    return {found: true, value};
  }
  return {found: false, value: null};
}

function inputDefault(member, sourceFile) {
  if (member.initializer.expression.getText().endsWith('.required')) {
    return {hasDefault: false, defaultValue: null, defaultExpression: null};
  }
  const defaultNode = member.initializer.arguments[0];
  const resolved = literalValue(defaultNode);
  return {
    hasDefault: resolved.found,
    defaultValue: resolved.value,
    defaultExpression: defaultNode?.getText(sourceFile) ?? null,
  };
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
      const resolvedDefault = inputDefault(member, sourceFile);
      inputs.push({
        name,
        required: expression.endsWith('.required'),
        values: inputValues(member, sourceFile, aliases),
        type: inputType(member, sourceFile),
        ...resolvedDefault,
      });
    } else if (expression === 'output') {
      outputs.push(name);
    } else if (expression === 'model' || expression === 'model.required') {
      const resolvedDefault = inputDefault(member, sourceFile);
      models.push({
        name,
        required: expression.endsWith('.required'),
        values: inputValues(member, sourceFile, aliases),
        type: inputType(member, sourceFile),
        ...resolvedDefault,
      });
    }
  }
  return {inputs, outputs, models};
}

function showcaseControlKind(api) {
  if (api.values.includes('false') && api.values.includes('true')) return 'boolean';
  if (api.values.length > 0) return 'select';
  if (/=>|Function|Predicate|Formatter|Comparator/.test(api.type)) return 'function';
  if (/\bnumber\b/.test(api.type)) return 'number';
  if (/\bstring\b/.test(api.type) && !/[\[\]{}]|Record|readonly/.test(api.type)) return 'text';
  return 'json';
}

function showcaseInitialInputs(entry) {
  const values = {};
  for (const api of [...entry.publicApi.inputs, ...entry.publicApi.models]) {
    if (api.hasDefault) values[api.name] = api.defaultValue;
  }
  if (entry.publicApi.inputs.some((api) => api.name === 'label') &&
      !Object.prototype.hasOwnProperty.call(values, 'label')) {
    values.label = 'حقل تجريبي';
  }
  Object.assign(values, FIXTURE_INPUTS.get(entry.className) ?? {});
  return values;
}

function showcaseControlsFor(entry) {
  const initialValues = showcaseInitialInputs(entry);
  const controls = [
    ...entry.publicApi.inputs.map((api) => ({
      name: api.name,
      label: api.name,
      source: 'input',
      kind: showcaseControlKind(api),
      required: api.required,
      type: api.type,
      options: api.values,
      initialValue: Object.prototype.hasOwnProperty.call(initialValues, api.name)
        ? initialValues[api.name]
        : null,
    })),
    ...entry.publicApi.models.map((api) => ({
      name: api.name,
      label: api.name,
      source: 'model',
      kind: showcaseControlKind(api),
      required: api.required,
      type: api.type,
      options: api.values,
      initialValue: Object.prototype.hasOwnProperty.call(initialValues, api.name)
        ? initialValues[api.name]
        : null,
    })),
  ];
  if (CVA_COMPONENTS.has(entry.className)) {
    controls.unshift({
      name: '$value',
      label: 'value (CVA)',
      source: 'cva',
      kind: entry.className === 'ErpCheckBox' || entry.className === 'ErpRadioBox'
        ? 'boolean'
        : 'json',
      required: false,
      type: 'ControlValueAccessor value',
      options: [],
      initialValue: entry.className === 'ErpCheckBox' || entry.className === 'ErpRadioBox'
        ? false
        : null,
    });
  }
  if (['ErpFab', 'ErpExtendedFab', 'ErpFabMenu'].includes(entry.className)) {
    controls.push(
      {name: '$previewInline', label: 'الموضع الأفقي داخل مساحة المعاينة', source: 'preview', kind: 'range', required: false, type: 'number', options: [], initialValue: 80},
      {name: '$previewBlock', label: 'الموضع الرأسي داخل مساحة المعاينة', source: 'preview', kind: 'range', required: false, type: 'number', options: [], initialValue: 75},
    );
  }
  return controls;
}

function inheritedPublicApi(className, classDefinitions, aliases, visiting = new Set()) {
  if (visiting.has(className)) return {inputs: [], outputs: [], models: []};
  const definition = classDefinitions.get(className);
  if (!definition) return {inputs: [], outputs: [], models: []};

  visiting.add(className);
  const extendsClause = definition.declaration.heritageClauses?.find(
    (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword,
  );
  const baseName = extendsClause?.types[0]?.expression.getText(definition.sourceFile) ?? null;
  const inherited = baseName
    ? inheritedPublicApi(baseName, classDefinitions, aliases, visiting)
    : {inputs: [], outputs: [], models: []};
  const own = publicApi(definition.declaration, definition.sourceFile, aliases);
  visiting.delete(className);

  const mergeNamed = (baseValues, ownValues) => {
    const merged = new Map(baseValues.map((value) => [value.name, value]));
    for (const value of ownValues) merged.set(value.name, value);
    return [...merged.values()];
  };

  return {
    inputs: mergeNamed(inherited.inputs, own.inputs),
    outputs: [...new Set([...inherited.outputs, ...own.outputs])],
    models: mergeNamed(inherited.models, own.models),
  };
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

function showcaseCoverageFor(entry) {
  const values = Object.fromEntries(
    entry.publicApi.inputs
      .filter((inputApi) => inputApi.values.length > 0)
      .map((inputApi) => [inputApi.name, inputApi.values]),
  );
  const stateNames = entry.publicApi.inputs
    .filter((inputApi) => inputApi.values.includes('true') && inputApi.values.includes('false'))
    .map((inputApi) => inputApi.name);
  return {
    coveredInputs: entry.publicApi.inputs.map((inputApi) => inputApi.name),
    coveredModels: entry.publicApi.models.map((modelApi) => modelApi.name),
    coveredOutputs: entry.publicApi.outputs,
    coveredValues: values,
    coveredStates: stateNames,
    coveredProjectionSlots: PROJECTION_COMPONENTS.has(entry.className) ? ['default-authored-content'] : [],
    coveredReferenceCases: entry.visualReference ? entry.showcaseCases.map((showcaseCase) => showcaseCase.id) : [],
    evidenceKind: PROJECTION_COMPONENTS.has(entry.className)
      ? 'AUTHORED_PROJECTION'
      : CVA_COMPONENTS.has(entry.className)
        ? 'CONTROLLED_MODEL'
        : entry.publicApi.outputs.length
          ? 'INTERACTIVE_OUTPUT'
          : 'STATIC_COMPONENT',
  };
}

function fixtureCases(entry, sourceText) {
  const requiredDefaults = Object.fromEntries(
    entry.publicApi.inputs
      .filter((inputApi) => inputApi.required && inputApi.name === 'label')
      .map(() => ['label', 'حقل تجريبي']),
  );
  const baseInputs = {...requiredDefaults, ...(FIXTURE_INPUTS.get(entry.className) ?? {})};
  for (const modelApi of entry.publicApi.models) {
    if (modelApi.name in baseInputs) continue;
    baseInputs[modelApi.name] = modelApi.values.includes('false') ? false : null;
  }
  const missingRequired = entry.publicApi.inputs
    .filter((inputApi) => inputApi.required && !(inputApi.name in baseInputs))
    .map((inputApi) => inputApi.name);
  if (missingRequired.length) {
    throw new Error(`${entry.className} showcase fixture is missing required inputs: ${missingRequired.join(', ')}`);
  }
  const cases = [{id: 'default', label: 'الحالة الافتراضية', inputs: baseInputs}];
  for (const inputApi of entry.ownPublicApi.inputs) {
    if (!FACET_NAMES.includes(inputApi.name)) continue;
    for (const value of inputApi.values) {
      const resolvedValue = value === 'true' ? true : value === 'false' ? false : value;
      cases.push({
        id: `${inputApi.name}-${value}`,
        label: `${inputApi.name}: ${value}`,
        inputs: {...baseInputs, [inputApi.name]: resolvedValue},
      });
    }
  }
  for (const modelApi of entry.publicApi.models) {
    for (const value of modelApi.values) {
      const resolvedValue = value === 'true' ? true : value === 'false' ? false : value;
      cases.push({
        id: `${modelApi.name}-${value}`,
        label: `${modelApi.name}: ${value}`,
        inputs: {...baseInputs, [modelApi.name]: resolvedValue},
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
  const classDefinitions = new Map();
  for (const absolutePath of files) {
    const sourcePath = posix(path.relative(REPO_ROOT, absolutePath));
    const sourceText = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const statement of sourceFile.statements) {
      if (ts.isClassDeclaration(statement) && statement.name) {
        classDefinitions.set(statement.name.text, {declaration: statement, sourceFile});
      }
    }
  }
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
        const ownPublicApi = publicApi(statement, sourceFile, aliases);
        const completePublicApi = inheritedPublicApi(className, classDefinitions, aliases);
        const entry = {
          id,
          selector,
          className,
          category: categoryFor(selector, classification),
          classification,
          sourcePath,
          purpose: purposeFor(className, selector, classification),
          publicApi: completePublicApi,
          lowerLevelOwners: dependencies(sourceText, template).filter((dependency) => dependency !== className),
          nativeElementsOwned: nativeTags(template),
          nativeCoverage: NATIVE_REPLACEMENTS.get(className) ?? [],
          coverageScope: classification === 'PUBLIC ERP COMPONENT' ? 'public-consumer' : 'parent-owner-only',
          showcaseRoute: classification === 'PUBLIC ERP COMPONENT' ? `/components/${id}` : null,
          showcaseOwnerPath: classification === 'PUBLIC ERP COMPONENT'
            ? `src/app/showcase/components/${id}/${id}-showcase.ts`
            : null,
          showcaseLoader: classification === 'PUBLIC ERP COMPONENT' ? id : null,
          visualReference: EXACT_REFERENCES.get(className) ?? null,
          visualStatus: ACCEPTED_COMPONENTS.has(className) ? 'ACCEPTED' : 'PENDING',
          showcaseFacets: FACET_NAMES.filter((facet) => completePublicApi.inputs.some((inputApi) => inputApi.name === facet)),
          showcaseCases: classification === 'PUBLIC ERP COMPONENT'
            ? fixtureCases({className, publicApi: completePublicApi, ownPublicApi}, sourceText)
            : [],
        };
        entry.displayNameAr = ARABIC_COMPONENT_METADATA.get(id)?.[0] ?? className;
        entry.descriptionAr = ARABIC_COMPONENT_METADATA.get(id)?.[1] ?? purposeFor(className, selector, classification);
        entry.showcaseInitialValues = classification === 'PUBLIC ERP COMPONENT'
          ? showcaseInitialInputs(entry)
          : null;
        entry.showcaseControls = classification === 'PUBLIC ERP COMPONENT'
          ? showcaseControlsFor(entry)
          : [];
        entry.showcaseCoverage = classification === 'PUBLIC ERP COMPONENT'
          ? showcaseCoverageFor(entry)
          : null;
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
      showcaseOwnerPath: null,
      showcaseLoader: null,
      visualReference: null,
      visualStatus: 'PENDING',
      showcaseFacets: [],
      showcaseCases: [],
      displayNameAr: className,
      descriptionAr: purpose,
      showcaseInitialValues: null,
      showcaseControls: [],
      showcaseCoverage: null,
    });
  }
  return entries.sort((left, right) => left.category.localeCompare(right.category) || left.className.localeCompare(right.className));
}

function relativeImportPath(sourcePath) {
  const withoutExtension = sourcePath.replace(/^src\/app\//, '../').replace(/\.ts$/, '');
  return withoutExtension;
}

function relativeShowcaseImport(ownerPath, sourcePath) {
  const relative = posix(path.relative(
    path.dirname(ownerPath),
    sourcePath.replace(/\.ts$/, ''),
  ));
  return relative.startsWith('.') ? relative : `./${relative}`;
}

function projectionMarkup(entry) {
  if (entry.className === 'ErpText') {
    return 'نص تجريبي مباشر';
  }
  if (entry.className === 'ErpTooltip') {
    return '<erp-button label="اعرض التلميح" variant="outline" />';
  }
  if (['ErpStack', 'ErpInline', 'ErpGrid'].includes(entry.className)) {
    return [1, 2, 3]
      .map((index) => `<erp-surface padding="default" border="subtle"><erp-text type="paragraph">عنصر مرئي ${index}</erp-text></erp-surface>`)
      .join('');
  }
  if (entry.className === 'ErpForm') {
    return '<erp-text-box label="اسم السجل" /><erp-button label="حفظ السجل" type="submit" /><erp-button label="إعادة الضبط" type="reset" variant="outline" />';
  }
  if (entry.className === 'ErpFormActions') {
    return '<erp-button erpFormActionsSecondary label="إلغاء" variant="ghost" /><erp-button erpFormActionsPrimary label="حفظ" />';
  }
  if (entry.className === 'ErpFormSection') {
    return '<erp-button erpFormSectionActions label="إجراء القسم" variant="outline" /><erp-text-box label="اسم الحساب" />';
  }
  if (entry.className === 'ErpPageHeader') {
    return '<erp-text erpPageHeaderBreadcrumbs type="caption">الرئيسية / الحسابات</erp-text><erp-text erpPageHeaderMeta type="caption">حالة السجل: نشط</erp-text><erp-button erpPageHeaderPrimaryAction label="حفظ" />';
  }
  if (entry.className === 'ErpPageShell') {
    return '<erp-text erpPageShellHeader type="heading-3">رأس الصفحة</erp-text><erp-text type="paragraph">محتوى الصفحة الرئيسي</erp-text><erp-text erpPageShellSide type="paragraph">سياق جانبي</erp-text><erp-text erpPageShellFooter type="caption">تذييل الصفحة</erp-text>';
  }
  if (entry.className === 'ErpTopbar') {
    return '<erp-text erpTopbarStart type="heading-3">Honesty ERP</erp-text><erp-text erpTopbarContext type="paragraph">فرع القاهرة</erp-text><erp-text erpTopbarSearch type="paragraph">البحث العام</erp-text><erp-text erpTopbarNotifications type="paragraph">الإشعارات</erp-text><erp-text erpTopbarUser type="paragraph">أميرة حداد</erp-text>';
  }
  if (entry.className === 'ErpAppShell') {
    return '<erp-text erpAppShellTopbarStart type="heading-3">Honesty ERP</erp-text><erp-text type="heading-3">محتوى التطبيق</erp-text><erp-text type="paragraph">ملخص العمليات اليومية</erp-text>';
  }
  if (PROJECTION_COMPONENTS.has(entry.className)) {
    return '<erp-text type="paragraph">محتوى مسقط مرئي داخل المكوّن</erp-text>';
  }
  return '';
}

function generatedShowcaseOwner(entry) {
  const ownerPath = entry.showcaseOwnerPath;
  const componentImport = relativeShowcaseImport(ownerPath, entry.sourcePath);
  const isCva = CVA_COMPONENTS.has(entry.className);
  const hasCvaDisabled = isCva && entry.publicApi.inputs.some((inputApi) => inputApi.name === 'disabled');
  const isFloatingPreview = ['ErpFab', 'ErpExtendedFab', 'ErpFabMenu'].includes(entry.className);
  const projection = projectionMarkup(entry);
  const imports = new Set([
    entry.className,
    'ErpReviewShowcaseControlPanel',
    'ErpStack',
    'ErpSurface',
    'ErpText',
  ]);
  const importLines = [
    `import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';`,
    `import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';`,
    `import {${entry.className}} from '${componentImport}';`,
    `import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';`,
  ];
  if (entry.className !== 'ErpStack') importLines.push(`import {ErpStack} from '../../../primitives/stack/stack';`);
  if (entry.className !== 'ErpSurface') importLines.push(`import {ErpSurface} from '../../../primitives/surface/surface';`);
  if (entry.className !== 'ErpText') importLines.push(`import {ErpText} from '../../../primitives/text/text';`);
  if (isCva) {
    importLines.push(`import {FormControl, ReactiveFormsModule} from '@angular/forms';`);
    importLines.push(`import {takeUntilDestroyed} from '@angular/core/rxjs-interop';`);
    imports.add('ReactiveFormsModule');
  }
  if (projection.includes('<erp-button')) {
    if (entry.className !== 'ErpButton') importLines.push(`import {ErpButton} from '../../../controls/button/button';`);
    imports.add('ErpButton');
  }
  if (projection.includes('<erp-text-box')) {
    if (entry.className !== 'ErpTextBox') importLines.push(`import {ErpTextBox} from '../../../controls/text-box/text-box';`);
    imports.add('ErpTextBox');
  }
  if (['ErpIconButton', 'ErpFab'].includes(entry.className)) {
    importLines.push(`import {ErpTooltip} from '../../../controls/tooltip/tooltip';`);
    imports.add('ErpTooltip');
  }

  const className = `${entry.className}Showcase`;
  const inputBindings = entry.publicApi.inputs
    .filter((inputApi) => !(hasCvaDisabled && inputApi.name === 'disabled'))
    .map((inputApi) =>
    `[${inputApi.name === 'forId' ? 'for' : inputApi.name}]="$any(value('${inputApi.name}'))"`,
  );
  for (const modelApi of entry.publicApi.models) {
    inputBindings.push(`[${modelApi.name}]="$any(value('${modelApi.name}'))"`);
    inputBindings.push(`(${modelApi.name}Change)="recordModel('${modelApi.name}', $event)"`);
  }
  for (const outputName of entry.publicApi.outputs) {
    inputBindings.push(`(${outputName})="recordEvent('${outputName}', $event)"`);
  }
  if (isCva) inputBindings.push('[formControl]="control"');
  if (hasCvaDisabled) inputBindings.push('data-showcase-cva-disabled-control');
  if (isFloatingPreview) {
    inputBindings.push(`[style.position]="'absolute'"`);
    inputBindings.push(`[style.inset-inline-start.%]="previewInline()"`);
    inputBindings.push(`[style.inset-block-start.%]="previewBlock()"`);
    inputBindings.push(`[style.transform]="'translate(-50%, -50%)'"`);
  }
  const ownerMarkup = `<${entry.selector}
          data-showcase-target
          ${inputBindings.join('\n          ')}
        >${projection}</${entry.selector}>`;
  const renderedOwner = ['ErpIconButton', 'ErpFab'].includes(entry.className)
    ? `<erp-tooltip text="${entry.displayNameAr}">${ownerMarkup}</erp-tooltip>`
    : ownerMarkup;
  const referenceLabel = entry.visualReference
    ? `  <erp-text class="showcase-reference" type="caption" tone="secondary" selectable>مرجع Product Owner: ${entry.visualReference}</erp-text>\n`
    : '';
  const livePreviewClass = isFloatingPreview
    ? 'showcase-live-preview showcase-live-preview--floating'
    : 'showcase-live-preview';

  const initialCvaValue = entry.showcaseControls.find((control) => control.source === 'cva')?.initialValue ?? null;
  const source = `${importLines.join('\n')}\n\nconst ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === '${entry.id}')!;\n\n@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  selector: 'app-${entry.id}-showcase',\n  imports: [${[...imports].join(', ')}],\n  templateUrl: './${entry.id}-showcase.html',\n  styleUrl: './${entry.id}-showcase.scss',\n})\nexport class ${className} {\n  readonly entry = ENTRY;\n  readonly controls = ENTRY.showcaseControls;\n  readonly lastEvent = signal('لم يحدث تفاعل بعد');\n  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});\n  readonly cvaValue = signal<unknown>(${JSON.stringify(initialCvaValue)});\n  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({\n    ...this.liveValues(),\n    '$value': this.cvaValue(),\n  }));\n${isCva ? `  readonly control = new FormControl<unknown>(${JSON.stringify({value: initialCvaValue, disabled: Boolean(entry.showcaseInitialValues?.disabled)})});\n\n  constructor() {\n    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {\n      this.cvaValue.set(value);\n      this.recordEvent('valueChange', value);\n    });\n  }\n` : ''}\n  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));\n  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));\n\n  value(name: string): unknown {\n    return this.liveValues()[name];\n  }\n\n  applyControl(change: ErpShowcaseControlChange): void {\n    if (change.control.source === 'cva') {\n${isCva ? `      this.control.setValue(change.value);` : `      this.cvaValue.set(change.value);`}\n      return;\n    }\n${hasCvaDisabled ? `    if (change.control.name === 'disabled') {\n      this.liveValues.update((current) => ({...current, disabled: change.value}));\n      if (change.value) this.control.disable();\n      else this.control.enable();\n      return;\n    }\n` : ''}    const value = change.control.kind === 'function'\n      ? this.functionPreset(change.control.name, change.value)\n      : change.value;\n    this.liveValues.update((current) => ({...current, [change.control.name]: value}));\n  }\n\n  recordModel(name: string, value: unknown): void {\n    this.liveValues.update((current) => ({...current, [name]: value}));\n    this.recordEvent(\`${'${name}'}Change\`, value);\n  }\n\n  recordEvent(name: string, value: unknown): void {\n    let rendered = '';\n    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }\n    catch { rendered = String(value); }\n    this.lastEvent.set(\`${'${name}'}: ${'${rendered}'}\`);\n  }\n\n  private functionPreset(name: string, value: unknown): unknown {\n    if (value !== 'sample') return null;\n    if (/comparator/i.test(name)) return () => 0;\n    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');\n    if (/disabled/i.test(name)) return () => false;\n    if (/filter|predicate/i.test(name)) return () => true;\n    return (candidate: unknown) => candidate;\n  }\n}\n`;
  const html = `<erp-stack gap="default" data-dedicated-showcase="${entry.id}" data-showcase-sections="1">\n  <erp-text type="heading-2">${entry.displayNameAr}</erp-text>\n  <erp-text type="paragraph" tone="secondary">${entry.descriptionAr}</erp-text>\n${referenceLabel}  <erp-surface padding="default" border="subtle" data-showcase-case="live" class="${livePreviewClass}">\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">المعاينة الحية</erp-text>\n      ${renderedOwner}\n    </erp-stack>\n  </erp-surface>\n  <app-review-showcase-control-panel\n    [controls]="controls"\n    [values]="controlValues()"\n    (controlChanged)="applyControl($event)"\n  />\n  <erp-surface padding="default" border="subtle" data-showcase-event-log>\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">آخر تفاعل</erp-text>\n      <erp-text type="paragraph" selectable>{{ lastEvent() }}</erp-text>\n${isCva ? '      <erp-text type="caption" selectable>القيمة الحالية: {{ cvaValue() }}</erp-text>\n' : ''}    </erp-stack>\n  </erp-surface>\n</erp-stack>\n`;
  const scss = `:host { display: block; min-inline-size: 0; }\n\n.showcase-reference { overflow-wrap: anywhere; }\n\n.showcase-live-preview { min-block-size: 12rem; }\n\n.showcase-live-preview--floating { position: relative; min-block-size: 30rem; overflow: clip; }\n`;
  return new Map([
    [ownerPath, source],
    [ownerPath.replace(/\.ts$/, '.html'), html],
    [ownerPath.replace(/\.ts$/, '.scss'), scss],
  ]);
}

function generatedTypeScript(catalog) {
  const publicEntries = catalog.filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT');
  const data = JSON.stringify(catalog, null, 2);
  const loaders = publicEntries.map((entry) =>
    `  ${JSON.stringify(entry.id)}: () => import(${JSON.stringify(relativeImportPath(entry.showcaseOwnerPath))}).then((module) => module.${entry.className}Showcase),`,
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
    readonly inputs: readonly {readonly name: string; readonly required: boolean; readonly values: readonly string[]; readonly type: string; readonly hasDefault: boolean; readonly defaultValue: unknown; readonly defaultExpression: string | null}[];
    readonly outputs: readonly string[];
    readonly models: readonly {readonly name: string; readonly required: boolean; readonly values: readonly string[]; readonly type: string; readonly hasDefault: boolean; readonly defaultValue: unknown; readonly defaultExpression: string | null}[];
  };
  readonly lowerLevelOwners: readonly string[];
  readonly nativeElementsOwned: readonly string[];
  readonly nativeCoverage: readonly string[];
  readonly coverageScope: string;
  readonly showcaseRoute: string | null;
  readonly showcaseOwnerPath: string | null;
  readonly showcaseLoader: string | null;
  readonly displayNameAr: string;
  readonly descriptionAr: string;
  readonly visualReference: string | null;
  readonly visualStatus: ErpCatalogVisualStatus;
  readonly showcaseFacets: readonly string[];
  readonly showcaseCases: readonly ErpComponentShowcaseCase[];
  readonly showcaseInitialValues: Readonly<Record<string, unknown>> | null;
  readonly showcaseControls: readonly {
    readonly name: string;
    readonly label: string;
    readonly source: 'cva' | 'input' | 'model' | 'preview';
    readonly kind: 'boolean' | 'function' | 'json' | 'number' | 'range' | 'select' | 'text';
    readonly required: boolean;
    readonly type: string;
    readonly options: readonly string[];
    readonly initialValue: unknown;
  }[];
  readonly showcaseCoverage: {
    readonly coveredInputs: readonly string[];
    readonly coveredModels: readonly string[];
    readonly coveredOutputs: readonly string[];
    readonly coveredValues: Readonly<Record<string, readonly string[]>>;
    readonly coveredStates: readonly string[];
    readonly coveredProjectionSlots: readonly string[];
    readonly coveredReferenceCases: readonly string[];
    readonly evidenceKind: string;
  } | null;
}

export const ERP_COMPONENT_CATALOG: readonly ErpComponentCatalogEntry[] = ${data};

export const ERP_PUBLIC_SHOWCASE_LOADERS: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
${loaders}
};
`;
}

function generatedNavigationTypeScript(catalog) {
  const entries = catalog
    .filter((entry) => entry.classification === 'PUBLIC ERP COMPONENT')
    .map(({id, className, selector, category, showcaseRoute, displayNameAr, descriptionAr, purpose}) => ({
      id,
      className,
      selector,
      category,
      showcaseRoute,
      displayNameAr,
      descriptionAr,
      purpose,
    }));
  return `// GENERATED by tools/catalog/erp-component-catalog.mjs. Do not edit by hand.
export interface ErpComponentNavigationEntry {
  readonly id: string;
  readonly className: string;
  readonly selector: string;
  readonly category: string;
  readonly showcaseRoute: string;
  readonly displayNameAr: string;
  readonly descriptionAr: string;
  readonly purpose: string;
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
  return `${lines.join('\n').replace(/\n+$/, '')}\n`;
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
  return `${lines.join('\n').replace(/\n+$/, '')}\n`;
}

export function generatedArtifacts() {
  const catalog = buildCatalog();
  const artifacts = new Map([
    ['src/app/catalog/erp-component-catalog.generated.ts', generatedTypeScript(catalog)],
    ['src/app/catalog/erp-component-navigation.generated.ts', generatedNavigationTypeScript(catalog)],
    ['src/app/controls/ERP_COMPONENT_CATALOG_V1.md', markdownCatalog(catalog)],
    ['src/app/controls/ERP_NATIVE_ELEMENT_COVERAGE_V1.md', markdownCoverage()],
  ]);
  for (const entry of catalog.filter((candidate) => candidate.classification === 'PUBLIC ERP COMPONENT')) {
    for (const [relativePath, contents] of generatedShowcaseOwner(entry)) {
      artifacts.set(relativePath, contents);
    }
  }
  return artifacts;
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
