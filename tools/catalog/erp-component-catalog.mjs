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
  'ErpSidebarDisclosure',
  'ErpSidebarLink',
  'ErpShellMenuAction',
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
  ['ErpUserMenu', 'src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md'],
  ['ErpApplicationsMenu', 'src/app/controls/applications-menu/ERP_APPLICATIONS_MENU_REFERENCE_V1.md'],
  ['ErpMessagesMenu', 'src/app/controls/messages-menu/ERP_MESSAGES_MENU_REFERENCE_V1.md'],
  ['ErpNotificationBell', 'src/app/controls/notification-bell/ERP_NOTIFICATION_BELL_REFERENCE_V1.md'],
  ['ErpGlobalSearch', 'src/app/controls/global-search/ERP_GLOBAL_SEARCH_REFERENCE_V1.md'],
]);

const EXACT_CORE_FOCUS = new Map([
  ['ErpAvatar', 'avatar'],
  ['ErpAvatarPicker', 'avatar-picker'],
  ['ErpSelect', 'select'],
  ['ErpStatusBadge', 'status-badge'],
  ['ErpTable', 'table'],
  ['ErpTabs', 'tabs'],
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
  ['applications-menu', ['قائمة التطبيقات', 'قائمة تطبيقات ومجالات ERP يحددها المستهلك.']],
  ['app-footer', ['تذييل التطبيق', 'معلومات التطبيق والحالة والإجراءات المساعدة ضمن إطار ERP.']],
  ['branch-selector', ['محدد الفرع', 'اختيار فرع مضبوط يتحكم فيه المستهلك.']],
  ['global-search', ['البحث العام', 'بحث عام داخل إطار التطبيق مع نتائج مصنفة.']],
  ['messages-menu', ['قائمة الرسائل', 'رسائل المستخدم الواردة مع البحث وحالة القراءة وإجراءات المستهلك.']],
  ['notification-bell', ['جرس الإشعارات', 'مدخل إشعارات قابل للفتح مع عدد غير المقروء.']],
  ['quick-actions-bar', ['شريط الإجراءات السريعة', 'مجموعات إجراءات سريعة يحددها المستهلك ضمن إطار التطبيق.']],
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

const CVA_FIXTURE_VALUES = new Map([
  ['ErpColorPicker', {mode: 'system', token: 'primary-500'}],
  ['ErpComboBox', 'supplier-27'],
  ['ErpDateBox', '2026-10-12'],
  ['ErpDateRangeBox', {start: '2026-10-01', end: '2026-10-15'}],
  ['ErpDateTimeBox', '2026-10-12T09:30'],
  ['ErpIconPicker', 'search'],
  ['ErpItemPicker', 'inventory-main'],
  ['ErpMoneyBox', 18450.75],
  ['ErpNumberBox', 1250],
  ['ErpNumberStepper', 12],
  ['ErpPasswordBox', 'Honesty@2026'],
  ['ErpRangeSlider', {lower: 25, upper: 75}],
  ['ErpSearchBox', 'invoice-1042'],
  ['ErpSelect', 'ahmed'],
  ['ErpTelBox', '+20 100 123 4567'],
  ['ErpTextAreaBox', 'ملاحظات طلب الشراء: يرجى مراجعة الكميات قبل الاعتماد.'],
  ['ErpTextBox', 'شركة النور للتجارة'],
  ['ErpTimeBox', '09:30'],
  ['ErpUrlBox', 'https://honesty-erp.example'],
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
    'erp-app-footer', 'erp-app-shell', 'erp-applications-menu', 'erp-branch-selector', 'erp-global-search',
    'erp-messages-menu', 'erp-notification-bell', 'erp-quick-actions-bar', 'erp-topbar', 'erp-user-menu',
  ])],
];

const NATIVE_REPLACEMENTS = new Map([
  ['ErpAppFooter', ['footer']],
  ['ErpQuickActionsBar', ['aside']],
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
  ['ErpSidebarDisclosure', ['button']],
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

const USER_MENU_SHOWCASE_PRESETS = [
  {
    id: 'local-image-online',
    label: 'صورة محلية — متصل',
    user: {
      displayName: 'أميرة حداد',
      secondaryText: 'الحساب المؤسسي',
      email: 'amira.haddad@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
      avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      avatarPresence: 'online',
    },
  },
  {
    id: 'initials-away',
    label: 'أحرف أولى — بعيد',
    user: {
      displayName: 'عمر ناصر',
      secondaryText: 'فريق العمليات',
      email: 'omar.nasser@honesty.example',
      roleLabel: 'مسؤول المخزون',
      branchLabel: 'فرع الإسكندرية',
      avatarPresence: 'away',
    },
  },
  {
    id: 'explicit-icon-busy',
    label: 'أيقونة صريحة — مشغول',
    user: {
      displayName: 'حساب الدعم',
      secondaryText: 'هوية خدمة داخلية',
      email: 'support@honesty.example',
      roleLabel: 'دعم النظام',
      branchLabel: 'المركز الرئيسي',
      fallbackIcon: 'user',
      avatarPresence: 'busy',
    },
  },
  {
    id: 'long-arabic-offline',
    label: 'اسم عربي طويل — غير متصل',
    user: {
      displayName: 'نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية',
      secondaryText: 'إدارة سلاسل الإمداد والمشتريات',
      email: 'nadia.abdelrahman@honesty.example',
      roleLabel: 'مسؤولة المشتريات الإقليمية',
      branchLabel: 'فرع القاهرة الجديدة',
      avatarPresence: 'offline',
    },
  },
  {
    id: 'long-english-online',
    label: 'اسم إنجليزي طويل — متصل',
    user: {
      displayName: 'Alexandria Regional Finance Operations Manager',
      secondaryText: 'Regional finance operations',
      email: 'alexandria.finance.manager@honesty.example',
      roleLabel: 'Finance Operations',
      branchLabel: 'Alexandria Branch',
      avatarPresence: 'online',
    },
  },
  {
    id: 'mixed-direction-away',
    label: 'اسم مختلط الاتجاه — بعيد',
    user: {
      displayName: 'ليلى Mahmoud — Procurement Operations',
      secondaryText: 'المشتريات · Regional Office',
      email: 'leila.mahmoud@honesty.example',
      roleLabel: 'Procurement Lead',
      branchLabel: 'فرع الجيزة · Giza',
      avatarPresence: 'away',
    },
  },
];

const FIXTURE_INPUTS = new Map([
  ['ErpAlert', {title: 'تنبيه تشغيلي'}],
  ['ErpAppFooter', {
    applicationLabel: 'Honesty ERP',
    versionLabel: 'الإصدار 1.0.0',
    statusLabel: 'تعمل الأنظمة',
    statusTone: 'success',
    actions: [
      {id: 'support', label: 'الدعم', icon: 'help'},
      {id: 'privacy', label: 'الخصوصية', icon: 'shield'},
    ],
  }],
  ['ErpAppShell', {
    navigationItems: [
      {
        id: 'review',
        label: 'مراجعة الإطار',
        icon: 'dashboard',
        children: [
          {id: 'intent', label: 'معاينة نية التنقل', icon: 'menu'},
          {id: 'table', label: 'فتح مكوّن الجدول', icon: 'table', href: '/components/table'},
        ],
      },
      {id: 'tabs', label: 'فتح مكوّن التبويبات', icon: 'layers', href: '/components/tabs'},
    ],
    activeNavigationId: 'intent',
    quickActionGroups: [
      {id: 'daily', label: 'العمل اليومي', actions: [{id: 'task', label: 'مهمة جديدة', icon: 'add', priority: 'primary'}, {id: 'event', label: 'موعد جديد', icon: 'calendar'}]},
      {id: 'support', actions: [{id: 'help', label: 'المساعدة', icon: 'help'}, {id: 'settings', label: 'الإعدادات', icon: 'settings'}]},
    ],
    footer: {
      applicationLabel: 'Honesty ERP',
      versionLabel: 'الإصدار 1.0.0',
      statusLabel: 'تعمل الأنظمة',
      statusTone: 'success',
      actions: [{id: 'support', label: 'الدعم', icon: 'help'}],
    },
  }],
  ['ErpApplicationsMenu', {
    groups: [
      {
        id: 'core',
        label: 'تطبيقات ERP',
        items: [
          {id: 'sales', label: 'المبيعات', icon: 'shopping-cart'},
          {id: 'inventory', label: 'المخزون', icon: 'inventory'},
          {id: 'finance', label: 'المالية', icon: 'wallet'},
          {id: 'customers', label: 'العملاء', icon: 'customer'},
          {id: 'people', label: 'الموارد البشرية', icon: 'people'},
          {id: 'reports', label: 'التقارير', icon: 'chart'},
          {id: 'operations', label: 'العمليات', icon: 'operations'},
          {id: 'files', label: 'المستندات', icon: 'folder'},
          {id: 'settings', label: 'الإعدادات', icon: 'settings', disabled: true},
        ],
      },
    ],
    open: true,
  }],
  ['ErpMessagesMenu', {
    messages: [
      {id: 'invoice', senderName: 'أميرة حداد', preview: 'تم اعتماد فاتورة المبيعات رقم 1042.', timestamp: 'منذ دقيقة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png', read: false},
      {id: 'stock', senderName: 'عمر ناصر', preview: 'تم تحديث كميات المخزون في الفرع الرئيسي.', timestamp: 'منذ 18 دقيقة', avatarSrc: '/assets/honesty-erp-avatars/users/male/avatar-01.png', read: false},
      {id: 'purchase', senderName: 'ليلى محمود', preview: 'أضيف طلب شراء جديد بانتظار المراجعة.', timestamp: 'منذ ساعة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-22.png', read: true},
      {id: 'disabled', senderName: 'النظام', preview: 'رسالة مؤرشفة وغير متاحة.', timestamp: 'أمس', fallbackIcon: 'mail', read: true, disabled: true},
    ],
    open: true,
  }],
  ['ErpAvatar', {name: 'أميرة حداد'}],
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
  ['ErpComboBox', {
    label: 'حساب المورد',
    helperText: 'ابحث باسم المورد أو رقم الحساب',
    placeholder: 'اكتب للبحث في الحسابات',
    clearable: true,
    items: [
      {value: 'supplier-27', label: 'شركة النور للتوريدات', description: 'القاهرة — حساب نشط', icon: 'building'},
      {value: 'supplier-42', label: 'مؤسسة الأفق التجارية', description: 'الإسكندرية — حساب نشط', icon: 'building'},
      {value: 'supplier-68', label: 'مجموعة الدلتا الصناعية', description: 'المنصورة — حساب موقوف مؤقتًا', icon: 'inventory', disabled: true},
    ],
  }],
  ['ErpDateBox', {label: 'تاريخ الاستحقاق', helperText: 'تاريخ استحقاق الفاتورة', min: '2026-01-01', max: '2026-12-31', weekStartsOn: 6, clearable: true}],
  ['ErpDateRangeBox', {label: 'فترة التقرير', helperText: 'حدّد بداية ونهاية الفترة المالية', min: '2026-01-01', max: '2026-12-31', clearable: true}],
  ['ErpDateTimeBox', {label: 'موعد التسليم', helperText: 'التاريخ والوقت المحليان للتسليم', min: '2026-01-01T00:00', max: '2026-12-31T23:55', clearable: true}],
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
  ['ErpFilePicker', {
    label: 'مرفقات طلب الشراء',
    helperText: 'أرفق عروض الأسعار والمواصفات المعتمدة',
    accept: '.pdf,.xlsx',
    maxFileSize: 5242880,
    maxFiles: 4,
    clearable: true,
  }],
  ['ErpFilterDrawer', {definitions: []}],
  ['ErpForm', {label: 'نموذج السجل'}],
  ['ErpFormSection', {title: 'البيانات الأساسية'}],
  ['ErpIcon', {name: 'settings'}],
  ['ErpIconButton', {icon: 'settings', label: 'الإعدادات'}],
  ['ErpColorPicker', {label: 'لون تصنيف الحساب', helperText: 'اختر لونًا من سجل ألوان النظام', clearable: true}],
  ['ErpIconPicker', {label: 'أيقونة الوحدة', helperText: 'اختر أيقونة دلالية من سجل النظام', clearable: true}],
  ['ErpImagePicker', {
    label: 'صور الصنف',
    helperText: 'أضف صورًا واضحة لبطاقة الصنف',
    accept: 'image/*',
    maxFileSize: 2097152,
    maxFiles: 4,
    previewSize: 'lg',
    clearable: true,
  }],
  ['ErpItemPicker', {
    label: 'المستودع الافتراضي',
    helperText: 'اختر المستودع الذي يستقبل الحركات تلقائيًا',
    placeholder: 'اختر مستودعًا',
    searchable: true,
    clearable: true,
    items: [
      {value: 'inventory-main', label: 'المستودع الرئيسي', description: 'القاهرة — متاح لكل الوحدات', icon: 'inventory'},
      {value: 'inventory-alex', label: 'مستودع الإسكندرية', description: 'الإسكندرية — مبيعات التجزئة', icon: 'building'},
      {value: 'inventory-damaged', label: 'مستودع التالف', description: 'موقوف مؤقتًا', icon: 'warning', disabled: true},
    ],
  }],
  ['ErpMoneyBox', {currency: 'EGP', label: 'الرصيد الافتتاحي', helperText: 'بالجنيه المصري', clearable: true}],
  ['ErpNumberBox', {label: 'كمية إعادة الطلب', helperText: 'وحدة مخزنية', clearable: true}],
  ['ErpNumberStepper', {label: 'كمية الطلب', helperText: 'استخدم أزرار الزيادة والنقصان', min: 0, max: 100, step: 1, clearable: true}],
  ['ErpPasswordBox', {label: 'كلمة المرور', helperText: 'استخدم 12 محرفًا على الأقل', clearable: true}],
  ['ErpTelBox', {label: 'هاتف المورد', helperText: 'رقم التواصل المعتمد', clearable: true}],
  ['ErpTextAreaBox', {label: 'ملاحظات طلب الشراء', helperText: 'تظهر لفريق المشتريات', rows: 4, showCounter: true}],
  ['ErpTextBox', {label: 'اسم العميل', helperText: 'الاسم التجاري كما يظهر في الفاتورة', clearable: true}],
  ['ErpTimeBox', {label: 'بداية الوردية', helperText: 'وقت بدء الوردية', minuteStep: 15, min: '06:00', max: '22:00', clearable: true}],
  ['ErpUrlBox', {label: 'موقع المورد', helperText: 'رابط HTTPS المعتمد', clearable: true}],
  ['ErpNotificationBell', {
    notifications: [
      {id: 'stock', title: 'حد إعادة الطلب', description: 'وصل صنفان في فرع القاهرة إلى الحد الأدنى.', timestamp: 'منذ دقيقتين', icon: 'inventory', read: false},
      {id: 'approval', title: 'فاتورة تحتاج اعتمادًا', description: 'فاتورة المبيعات رقم 1042 بانتظار موافقتك.', timestamp: 'منذ 14 دقيقة', icon: 'file', read: false},
      {id: 'ledger', title: 'تم ترحيل القيد', description: 'رُحّل القيد اليومي إلى الحسابات العامة.', timestamp: 'منذ ساعة', icon: 'check-mark', read: true},
      {id: 'disabled', title: 'إشعار مؤرشف', description: 'هذا الإشعار غير متاح.', timestamp: 'أمس', icon: 'notification', read: true, disabled: true},
    ],
    open: true,
  }],
  ['ErpPageHeader', {title: 'سجل الحساب'}],
  ['ErpPagination', {pageCount: 3}],
  ['ErpQuickActionsBar', {groups: [
    {
      id: 'daily',
      label: 'العمل اليومي',
      actions: [
        {id: 'task', label: 'مهمة جديدة', icon: 'add', priority: 'primary'},
        {id: 'event', label: 'موعد جديد', icon: 'calendar'},
      ],
    },
    {
      id: 'support',
      label: 'المساندة',
      actions: [
        {id: 'help', label: 'المساعدة', icon: 'help'},
        {id: 'settings', label: 'الإعدادات', icon: 'settings', disabled: true},
      ],
    },
  ]}],
  ['ErpRadioGroup', {options: [{value: 'active', label: 'نشط'}]}],
  ['ErpRangeSlider', {label: 'نطاق الخصم', helperText: 'النطاق المسموح من 0 إلى 100', min: 0, max: 100, step: 5, defaultRange: {lower: 20, upper: 80}, clearable: true, showValueTooltip: true}],
  ['ErpSearchBox', {
    label: 'البحث في السجلات',
    helperText: 'ابحث في الفواتير والعملاء والموردين',
    placeholder: 'رقم الفاتورة أو اسم الحساب',
    clearable: true,
    mode: 'dropdown',
    items: [
      {value: 'invoice-1042', label: 'فاتورة المبيعات 1042', description: 'المبيعات — بانتظار الاعتماد', icon: 'file'},
      {value: 'customer-alnoor', label: 'شركة النور للتجارة', description: 'العملاء — فرع القاهرة', icon: 'customer'},
      {value: 'supplier-delta', label: 'مجموعة الدلتا الصناعية', description: 'الموردون — حساب نشط', icon: 'building'},
      {value: 'report-stock', label: 'تقرير حركة المخزون', description: 'التقارير — آخر 30 يومًا', icon: 'chart'},
    ],
  }],
  ['ErpSelect', {
    label: 'الموظف المسؤول',
    searchable: true,
    groupBy: 'group',
    options: [
      {
        value: 'ahmed',
        label: 'أحمد محمود',
        description: 'محاسب أول — فرع القاهرة',
        group: 'المالية',
        imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-01.png',
        meta: 'FIN',
      },
      {
        value: 'sara',
        label: 'سارة علي',
        description: 'مسؤولة مشتريات — فرع الإسكندرية',
        group: 'العمليات',
        imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
        meta: 'OPS',
      },
      {
        value: 'mahmoud',
        label: 'محمود حسين',
        description: 'موظف موقوف مؤقتًا',
        group: 'العمليات',
        icon: 'user',
        disabled: true,
      },
    ],
  }],
  ['ErpSidebar', {
    items: [
      {
        id: 'finance',
        label: 'المالية',
        icon: 'wallet',
        badge: {label: '8', tone: 'info'},
        children: [
          {id: 'ledger', label: 'الحسابات العامة', icon: 'menu', href: '/ledger'},
          {
            id: 'reports',
            label: 'التقارير المالية والتحليلات التشغيلية المطولة',
            icon: 'chart',
            children: [
              {id: 'trial-balance', label: 'ميزان المراجعة', href: '/trial-balance'},
              {id: 'closed-period', label: 'فترة مقفلة', href: '/closed', disabled: true},
            ],
          },
        ],
      },
      {id: 'inventory', label: 'المخزون', icon: 'layers', href: '/inventory', badge: {label: '3'}},
      {id: 'settings', label: 'الإعدادات', icon: 'settings', href: '/settings'},
    ],
    activeId: 'trial-balance',
    expandedIds: ['finance', 'reports'],
  }],
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
  ['ErpGlobalSearch', {
    results: [
      {id: 'invoice-1042', label: 'فاتورة 1042', category: 'المبيعات', description: 'شركة النور للتجارة', icon: 'file'},
      {id: 'customer-amira', label: 'أميرة حداد', category: 'العملاء', description: 'الفرع الرئيسي', icon: 'user'},
      {id: 'stock-laptop', label: 'حاسوب محمول للأعمال', category: 'المخزون', description: 'متاح 18 قطعة', icon: 'inventory'},
      {id: 'supplier-northwind', label: 'Northwind Trading International', category: 'الموردون', description: 'حساب مورد نشط', icon: 'building'},
      {id: 'archived-ledger', label: 'قيد مؤرشف', category: 'الحسابات العامة', description: 'غير متاح حاليًا', icon: 'archive', disabled: true},
    ],
    mode: 'dropdown',
    query: '',
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
    columns: [
      {key: 'code', header: 'رقم الحساب', sortable: true, resizable: true, initialWidth: 132, digitSet: 'latin'},
      {key: 'name', header: 'اسم الحساب', descriptionKey: 'description', sortable: true, resizable: true, initialWidth: 224},
      {key: 'type', header: 'النوع', sortable: true, initialWidth: 116},
      {key: 'balance', header: 'الرصيد', sortable: true, resizable: true, initialWidth: 144, cellAlign: 'end', headerAlign: 'end', digitSet: 'latin'},
      {key: 'status', header: 'الحالة', initialWidth: 112, align: 'center'},
      {key: 'branch', header: 'الفرع', sortable: true, initialWidth: 132},
      {key: 'updated', header: 'آخر تحديث', initialWidth: 132, digitSet: 'latin'},
    ],
    rows: [
      {id: '101', code: '410100', name: 'المبيعات المحلية', description: 'إيرادات النشاط الرئيسي', type: 'إيرادات', balance: '1,245,800.00', status: 'نشط', branch: 'القاهرة', updated: '2026-10-10'},
      {id: '102', code: '120210', name: 'ذمم العملاء', description: 'أرصدة العملاء المدينة', type: 'أصول', balance: '487,320.50', status: 'نشط', branch: 'الإسكندرية', updated: '2026-10-09'},
      {id: '103', code: '210110', name: 'الموردون المحليون', description: 'التزامات التوريد المفتوحة', type: 'التزامات', balance: '302,750.00', status: 'قيد المراجعة', branch: 'القاهرة', updated: '2026-10-08'},
      {id: '104', code: '510300', name: 'تكلفة المخزون', description: 'تكلفة البضاعة المباعة', type: 'مصروفات', balance: '775,940.25', status: 'نشط', branch: 'المنصورة', updated: '2026-10-07'},
      {id: '105', code: '130120', name: 'عهد الموظفين', description: 'عهد تشغيلية قصيرة الأجل', type: 'أصول', balance: '56,400.00', status: 'موقوف', branch: 'القاهرة', updated: '2026-10-06'},
    ],
    visibleColumnKeys: ['code', 'name', 'type', 'balance', 'status', 'branch', 'updated'],
    selectable: true,
    showHeaderSelection: true,
    rowActivatable: true,
    striped: true,
    hover: true,
    footerValues: {name: 'إجمالي الأرصدة', balance: '2,868,210.75'},
    selectedKeys: [],
    columnWidths: {},
  }],
  ['ErpTabs', {
    items: [
      {id: 'overview', label: 'نظرة عامة', content: 'ملخص مؤشرات الأداء وحركة العمليات اليومية.', icon: 'dashboard', count: 12},
      {id: 'orders', label: 'الطلبات', content: 'متابعة طلبات المبيعات وحالات التنفيذ والتسليم.', icon: 'shopping-cart', count: 8},
      {id: 'invoices', label: 'الفواتير', content: 'مراجعة الفواتير المفتوحة والمسددة والمتأخرة.', icon: 'file', count: 5},
      {id: 'customers', label: 'العملاء', content: 'بيانات العملاء والأرصدة وآخر المعاملات.', icon: 'people'},
      {id: 'reports', label: 'التقارير', content: 'التقارير الدورية قيد الإعداد.', icon: 'chart', disabled: true},
    ],
    activeId: 'overview',
  }],
  ['ErpTooltip', {text: 'توضيح الإجراء للمستخدم'}],
  ['ErpUserMenu', {
    user: USER_MENU_SHOWCASE_PRESETS[0].user,
    items: [
      {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
      {id: 'settings', label: 'الإعدادات', icon: 'settings'},
      {id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard'},
      {id: 'earnings', label: 'الأرباح', icon: 'wallet'},
      {id: 'downloads', label: 'التنزيلات', icon: 'download'},
      {id: 'logout', label: 'تسجيل الخروج', icon: 'logout', tone: 'danger', dividerBefore: true},
    ],
    open: true,
  }],
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
  'showAvatar', 'showUserName', 'showEmail', 'showPresence',
  'showRoleBadge', 'showBranchBadge', 'showTriggerRoleBadge',
  'showTriggerBranchBadge',
];

export const NATIVE_ELEMENT_COVERAGE = [
  {tag: 'button', policy: 'GLOBAL_OWNER_ONLY', owners: ['ErpButton', 'ErpIconButton', 'ErpFab', 'ErpExtendedFab', 'ErpFieldTrigger', 'ErpTabTrigger', 'ErpSortTrigger', 'ErpAvatarAction', 'ErpStatusBadgeAction', 'ErpTableResizeHandle', 'ErpSelectionTile', 'ErpAvatarPickerTile', 'ErpSidebarDisclosure', 'ErpShellMenuAction'], allowedPaths: [
    'src/app/controls/avatar-picker/internal/avatar-picker-tile.html',
    'src/app/controls/avatar/internal/avatar-action.html',
    'src/app/controls/button/button.html',
    'src/app/controls/extended-fab/extended-fab.html',
    'src/app/controls/fab/fab.html',
    'src/app/controls/icon-button/icon-button.html',
    'src/app/controls/input-family/internal/field-trigger.html',
    'src/app/controls/select/internal/select-action.html',
    'src/app/controls/selection-family/internal/selection-tile.html',
    'src/app/controls/sidebar/internal/sidebar-disclosure.html',
    'src/app/controls/shell-family/internal/shell-menu-action.html',
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
        : CVA_FIXTURE_VALUES.get(entry.className) ?? null,
    });
  }
  if (['ErpFab', 'ErpExtendedFab', 'ErpFabMenu'].includes(entry.className)) {
    controls.push(
      {name: '$previewInline', label: 'الموضع الأفقي داخل مساحة المعاينة', source: 'preview', kind: 'range', required: false, type: 'number', options: [], initialValue: 80},
      {name: '$previewBlock', label: 'الموضع الرأسي داخل مساحة المعاينة', source: 'preview', kind: 'range', required: false, type: 'number', options: [], initialValue: 75},
      {name: '$previewDirection', label: 'اتجاه مساحة المعاينة', source: 'preview', kind: 'select', required: true, type: "'rtl' | 'ltr'", options: ['rtl', 'ltr'], initialValue: 'rtl'},
    );
  }
  if (entry.className === 'ErpUserMenu') {
    controls.push(
      {
        name: '$userPreset',
        label: 'نموذج الهوية',
        source: 'preview',
        kind: 'select',
        required: true,
        type: 'UserMenu showcase preset',
        options: USER_MENU_SHOWCASE_PRESETS.map((preset) => preset.label),
        initialValue: USER_MENU_SHOWCASE_PRESETS[0].label,
      },
      {
        name: '$previewDirection',
        label: 'اتجاه مساحة المعاينة',
        source: 'preview',
        kind: 'select',
        required: true,
        type: "'rtl' | 'ltr'",
        options: ['rtl', 'ltr'],
        initialValue: 'rtl',
      },
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
  if (entry.className === 'ErpUserMenu') {
    for (const preset of USER_MENU_SHOWCASE_PRESETS) {
      cases.push({
        id: preset.id,
        label: preset.label,
        inputs: {user: preset.user},
      });
    }
  }
  for (const inputApi of entry.ownPublicApi.inputs) {
    if (!FACET_NAMES.includes(inputApi.name)) continue;
    for (const value of inputApi.values) {
      const resolvedValue = value === 'true' ? true : value === 'false' ? false : value;
      cases.push({
        id: `${inputApi.name}-${value}`,
        label: `${inputApi.name}: ${value}`,
        inputs: entry.className === 'ErpUserMenu'
          ? {user: baseInputs.user, [inputApi.name]: resolvedValue}
          : {...baseInputs, [inputApi.name]: resolvedValue},
      });
    }
  }
  for (const modelApi of entry.publicApi.models) {
    for (const value of modelApi.values) {
      const resolvedValue = value === 'true' ? true : value === 'false' ? false : value;
      cases.push({
        id: `${modelApi.name}-${value}`,
        label: `${modelApi.name}: ${value}`,
        inputs: entry.className === 'ErpUserMenu'
          ? {user: baseInputs.user, [modelApi.name]: resolvedValue}
          : {...baseInputs, [modelApi.name]: resolvedValue},
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
    return 'تقرير حركة المخزون للفترة الحالية — Inventory Q4 / 2026 — مراجعة الطلبات وأرصدة الفروع';
  }
  if (entry.className === 'ErpContainer') {
    return '<erp-surface padding="default" border="subtle"><erp-text type="paragraph">محتوى مسقط مرئي يوضح عرض الحاوية ومسافتها الداخلية</erp-text></erp-surface>';
  }
  if (entry.className === 'ErpTooltip') {
    return '<erp-button label="اعرض التلميح" variant="outline" />';
  }
  if (['ErpStack', 'ErpInline', 'ErpGrid'].includes(entry.className)) {
    return [1, 2, 3]
      .map((index) => `<erp-surface padding="default" border="subtle"><erp-text type="paragraph">عنصر مرئي ${index}</erp-text></erp-surface>`)
      .join('');
  }
  if (entry.className === 'ErpSection') {
    return '<erp-surface padding="tight" border="subtle"><erp-text type="paragraph">عنوان القسم</erp-text></erp-surface><erp-surface padding="tight" border="subtle"><erp-text type="paragraph">محتوى القسم</erp-text></erp-surface><erp-surface padding="tight" border="subtle"><erp-text type="paragraph">إجراءات القسم</erp-text></erp-surface>';
  }
  if (entry.className === 'ErpSurface') {
    return '<erp-text type="paragraph" [tone]="value(\'tone\') === \'inverse\' ? \'inverse\' : \'primary\'">محتوى مسقط مرئي داخل المكوّن</erp-text>';
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
    return '<erp-text erpTopbarStart type="heading-3">Honesty ERP</erp-text><erp-branch-selector erpTopbarContext [branches]="topbarBranches" value="cairo" (valueChange)="recordEvent(\'branchChanged\', $event)" /><erp-global-search erpTopbarSearch [results]="topbarSearchResults" (resultActivated)="recordEvent(\'searchResultActivated\', $event)" /><erp-inline erpTopbarActions gap="tight" align="center"><erp-applications-menu [groups]="topbarApplications" (applicationActivated)="recordEvent(\'applicationActivated\', $event)" /><erp-messages-menu [messages]="topbarMessages" (messageActivated)="recordEvent(\'messageActivated\', $event)" /><erp-notification-bell [notifications]="topbarNotifications" (notificationActivated)="recordEvent(\'notificationActivated\', $event)" /></erp-inline><erp-user-menu erpTopbarUser [user]="topbarUser" [items]="topbarUserItems" (actionActivated)="recordEvent(\'userActionActivated\', $event)" />';
  }
  if (entry.className === 'ErpAppShell') {
    return '<erp-text erpAppShellTopbarStart type="heading-3">Honesty ERP</erp-text><erp-branch-selector erpAppShellTopbarContext [branches]="topbarBranches" value="cairo" (valueChange)="recordEvent(\'branchChanged\', $event)" /><erp-global-search erpAppShellTopbarSearch [results]="topbarSearchResults" (resultActivated)="recordEvent(\'searchResultActivated\', $event)" /><erp-inline erpAppShellTopbarActions gap="tight" align="center"><erp-applications-menu [groups]="topbarApplications" (applicationActivated)="recordEvent(\'applicationActivated\', $event)" /><erp-messages-menu [messages]="topbarMessages" (messageActivated)="recordEvent(\'messageActivated\', $event)" /><erp-notification-bell [notifications]="topbarNotifications" (notificationActivated)="recordEvent(\'notificationActivated\', $event)" /></erp-inline><erp-user-menu erpAppShellTopbarUser [user]="topbarUser" [items]="topbarUserItems" (actionActivated)="recordEvent(\'userActionActivated\', $event)" /><erp-stack gap="default"><erp-text type="heading-3">لوحة العمليات</erp-text><erp-text type="paragraph">ملخص المبيعات والمشتريات والمخزون والحسابات العامة.</erp-text><erp-surface padding="default" border="subtle"><erp-text type="strong">المبيعات اليومية</erp-text><erp-text type="paragraph">128 فاتورة قيد المتابعة.</erp-text></erp-surface><erp-surface padding="default" border="subtle"><erp-text type="strong">حالة المخزون</erp-text><erp-text type="paragraph">ثمانية أصناف تحتاج إلى إعادة الطلب.</erp-text></erp-surface><erp-surface padding="default" border="subtle"><erp-text type="strong">المهام المالية</erp-text><erp-text type="paragraph">إقفال الفترة ومراجعة أرصدة الحسابات.</erp-text></erp-surface></erp-stack>';
  }
  if (PROJECTION_COMPONENTS.has(entry.className)) {
    return '<erp-text type="paragraph">محتوى مسقط مرئي داخل المكوّن</erp-text>';
  }
  return '';
}

function generatedRootAppShellShowcaseOwner(entry) {
  const ownerPath = entry.showcaseOwnerPath;
  const source = `import {ChangeDetectionStrategy, Component, OnDestroy, computed, inject} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpAppShellWorkbenchValues, ErpReviewAppShellWorkbenchState} from '../../../review-internals/app-shell-workbench/app-shell-workbench-state';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'app-shell')!;

const INITIAL_VALUES = {
  ...ENTRY.showcaseInitialValues,
  viewport: true,
} as unknown as ErpAppShellWorkbenchValues;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-app-shell-showcase',
  imports: [ErpReviewShowcaseControlPanel, ErpStack, ErpSurface, ErpText],
  templateUrl: './app-shell-showcase.html',
  styleUrl: './app-shell-showcase.scss',
})
export class ErpAppShellShowcase implements OnDestroy {
  private readonly workbench = inject(ErpReviewAppShellWorkbenchState);
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly lastEvent = this.workbench.lastEvent;
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...(this.workbench.values() ?? INITIAL_VALUES),
    '$value': null,
  }));

  constructor() {
    this.workbench.activate(INITIAL_VALUES);
  }

  ngOnDestroy(): void {
    this.workbench.deactivate();
  }

  applyControl(change: ErpShowcaseControlChange): void {
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.workbench.updateControl(
      change.control.name as keyof ErpAppShellWorkbenchValues,
      value as never,
    );
  }

  private functionPreset(name: string, value: unknown): unknown {
    if (value !== 'sample') return null;
    if (/comparator/i.test(name)) return () => 0;
    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');
    if (/disabled/i.test(name)) return () => false;
    if (/filter|predicate/i.test(name)) return () => true;
    return (candidate: unknown) => candidate;
  }
}
`;
  const html = `<erp-stack gap="default" data-dedicated-showcase="app-shell" data-showcase-sections="1">
  <erp-text type="heading-2">${entry.displayNameAr}</erp-text>
  <erp-text type="paragraph" tone="secondary">${entry.descriptionAr}</erp-text>
  <erp-surface
    padding="default"
    border="subtle"
    data-showcase-case="live"
    data-app-shell-root-workbench-panel
    class="showcase-live-preview"
  >
    <erp-stack gap="tight">
      <erp-text type="heading-3">المعاينة الحية</erp-text>
      <erp-text type="paragraph">
        إطار التطبيق الجذري المحيط بهذه الصفحة هو هدف المعاينة الفعلي؛ تغيّر أدوات التحكم أدناه مدخلاته مباشرةً دون إنشاء إطار تطبيق متداخل.
      </erp-text>
      <erp-text type="caption" tone="secondary">
        يبقى RouterOutlet وOverlayHost وسلطة السمة مملوكة لجذر Design Lab مرة واحدة فقط.
      </erp-text>
    </erp-stack>
  </erp-surface>
  <app-review-showcase-control-panel
    [controls]="controls"
    [values]="controlValues()"
    (controlChanged)="applyControl($event)"
  />
  <erp-surface padding="default" border="subtle" data-showcase-event-log>
    <erp-stack gap="tight">
      <erp-text type="heading-3">آخر تفاعل</erp-text>
      <erp-text type="paragraph" selectable>{{ lastEvent() }}</erp-text>
    </erp-stack>
  </erp-surface>
</erp-stack>
`;
  const scss = `:host { display: block; min-inline-size: 0; }

.showcase-live-preview { min-block-size: 12rem; }
`;

  return new Map([
    [ownerPath, source],
    [ownerPath.replace(/\.ts$/, '.html'), html],
    [ownerPath.replace(/\.ts$/, '.scss'), scss],
  ]);
}

function generatedShowcaseOwner(entry) {
  if (entry.className === 'ErpAppShell') {
    return generatedRootAppShellShowcaseOwner(entry);
  }
  const ownerPath = entry.showcaseOwnerPath;
  const componentImport = relativeShowcaseImport(ownerPath, entry.sourcePath);
  const isCva = CVA_COMPONENTS.has(entry.className);
  const isAvatarPicker = entry.className === 'ErpAvatarPicker';
  const isFileSelection = ['ErpFilePicker', 'ErpImagePicker'].includes(entry.className);
  const hasCvaDisabled = isCva && entry.publicApi.inputs.some((inputApi) => inputApi.name === 'disabled');
  const isFloatingPreview = ['ErpFab', 'ErpExtendedFab', 'ErpFabMenu'].includes(entry.className);
  const hasDirectionalPreview = isFloatingPreview || entry.className === 'ErpUserMenu';
  const exactCoreFocus = EXACT_CORE_FOCUS.get(entry.className) ?? null;
  const hasRadioReference = ['ErpRadioBox', 'ErpRadioGroup'].includes(
    entry.className,
  );
  const hasEmptyStateReference = entry.className === 'ErpEmptyState';
  const hasAdditionalReference = hasRadioReference || hasEmptyStateReference;
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
  if (isFileSelection) {
    importLines.push(`import {ErpButton} from '../../../controls/button/button';`);
    imports.add('ErpButton');
  }
  if (isAvatarPicker) {
    importLines.push(`import {ERP_AVATAR_CATALOG} from '../../../controls/avatar-picker/avatar-picker-contracts';`);
  }
  if (projection.includes('<erp-button')) {
    if (entry.className !== 'ErpButton') importLines.push(`import {ErpButton} from '../../../controls/button/button';`);
    imports.add('ErpButton');
  }
  if (projection.includes('<erp-text-box')) {
    if (entry.className !== 'ErpTextBox') importLines.push(`import {ErpTextBox} from '../../../controls/text-box/text-box';`);
    imports.add('ErpTextBox');
  }
  if (projection.includes('<erp-inline')) {
    importLines.push(`import {ErpInline} from '../../../primitives/inline/inline';`);
    imports.add('ErpInline');
  }
  if (entry.className === 'ErpTopbar' || entry.className === 'ErpAppShell') {
    importLines.push(`import {ErpApplicationsMenu} from '../../../controls/applications-menu/applications-menu';`);
    importLines.push(`import {ErpBranchSelector} from '../../../controls/branch-selector/branch-selector';`);
    importLines.push(`import {ErpGlobalSearch} from '../../../controls/global-search/global-search';`);
    importLines.push(`import {ErpMessagesMenu} from '../../../controls/messages-menu/messages-menu';`);
    importLines.push(`import {ErpNotificationBell} from '../../../controls/notification-bell/notification-bell';`);
    importLines.push(`import {ErpUserMenu} from '../../../controls/user-menu/user-menu';`);
    imports.add('ErpApplicationsMenu');
    imports.add('ErpBranchSelector');
    imports.add('ErpGlobalSearch');
    imports.add('ErpMessagesMenu');
    imports.add('ErpNotificationBell');
    imports.add('ErpUserMenu');
  }
  if (['ErpIconButton', 'ErpFab'].includes(entry.className)) {
    importLines.push(`import {ErpTooltip} from '../../../controls/tooltip/tooltip';`);
    imports.add('ErpTooltip');
  }
  if (isFloatingPreview) {
    importLines.push(`import {ErpReviewShowcaseFloatingPreview} from '../../../review-internals/showcase-floating-preview/showcase-floating-preview';`);
    imports.add('ErpReviewShowcaseFloatingPreview');
  }
  if (exactCoreFocus) {
    importLines.push(`import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';`);
    imports.add('ErpReviewShowcaseExactReference');
  }
  if (hasRadioReference) {
    importLines.push(`import {ErpButton} from '../../../controls/button/button';`);
    importLines.push(`import {ErpReviewRadioReference} from '../../../review-internals/review-radio-reference/review-radio-reference';`);
    imports.add('ErpButton');
    imports.add('ErpReviewRadioReference');
  }
  if (hasEmptyStateReference) {
    importLines.push(`import {ErpButton} from '../../../controls/button/button';`);
    importLines.push(`import {EmptyStateControls} from '../../../review-internals/legacy-empty-state-controls/empty-state-controls';`);
    imports.add('ErpButton');
    imports.add('EmptyStateControls');
  }

  const className = `${entry.className}Showcase`;
  const inputBindings = entry.publicApi.inputs
    .filter((inputApi) => !(hasCvaDisabled && inputApi.name === 'disabled'))
    .map((inputApi) => inputApi.name === 'avatars' && isAvatarPicker
      ? `[avatars]="$any(effectiveAvatars())"`
      : `[${inputApi.name === 'forId' ? 'for' : inputApi.name}]="$any(value('${inputApi.name}'))"`,
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
  const directionBinding = entry.className === 'ErpUserMenu'
    ? '\n          [attr.dir]="previewDirection()"'
    : '';
  const targetClass = entry.className === 'ErpDivider'
    ? '\n          class="showcase-divider-target"'
    : entry.className === 'ErpIcon'
      ? '\n          class="showcase-icon-target"'
      : entry.className === 'ErpText'
        ? '\n          class="showcase-text-target"'
        : '';
  const ownerMarkup = `<${entry.selector}
          data-showcase-target${targetClass}${directionBinding}
          ${inputBindings.join('\n          ')}
        >${projection}</${entry.selector}>`;
  let renderedOwner = ['ErpIconButton', 'ErpFab'].includes(entry.className)
    ? `<erp-tooltip text="${entry.displayNameAr}">${ownerMarkup}</erp-tooltip>`
    : ownerMarkup;
  if (isFloatingPreview) {
    renderedOwner = `<app-review-showcase-floating-preview
        [inlinePosition]="previewInline()"
        [blockPosition]="previewBlock()"
        [direction]="previewDirection()"
      >${renderedOwner}</app-review-showcase-floating-preview>`;
  }
  if (isFileSelection) {
    const sampleFileName = entry.className === 'ErpImagePicker'
      ? 'صورة-الصنف.svg'
      : 'عرض-السعر.pdf';
    renderedOwner = `${renderedOwner}\n      <erp-button
        data-file-selection-sample
        label="تحميل عينة مراجعة: ${sampleFileName}"
        variant="outline"
        tone="primary"
        size="sm"
        (pressed)="loadSampleFiles()"
      />`;
  }
  const referenceLabel = entry.visualReference
    ? `  <erp-text class="showcase-reference" type="caption" tone="secondary" selectable>مرجع Product Owner: ${entry.visualReference}</erp-text>\n`
    : '';
  const exactReferenceEvidence = exactCoreFocus
    ? `  <app-review-showcase-exact-reference focus="${exactCoreFocus}" />\n`
    : hasRadioReference
      ? `  <erp-surface padding="default" border="subtle" data-radio-reference-section>\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">دليل الحالات المرجعية</erp-text>\n      <erp-text type="paragraph" tone="secondary">\n        ${entry.className === 'ErpRadioBox' ? 'المصفوفة الكاملة متاحة عند الطلب دون إنشاء هدف Workbench ثانٍ.' : 'التكوين العادي وTile متاحان عند الطلب مع استمرار هدف حي واحد.'}\n      </erp-text>\n      <erp-button\n        data-radio-reference-toggle\n        [label]="referenceExpanded() ? 'إخفاء الدليل' : 'عرض الدليل'"\n        (pressed)="toggleReference()"\n      />\n      @if (referenceExpanded()) {\n        <app-review-radio-reference focus="${entry.id}" />\n      }\n    </erp-stack>\n  </erp-surface>\n`
      : hasEmptyStateReference
        ? `  <erp-surface padding="default" border="subtle" data-empty-state-reference-section>\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">دليل مرجع الحالة الفارغة</erp-text>\n      <erp-text type="paragraph" tone="secondary">\n        السيناريوهات الخمسة والتحكم في الأجزاء والحركة والاتجاه متاحة عند الطلب دون إنشاء هدف Workbench ثانٍ.\n      </erp-text>\n      <erp-button\n        data-empty-state-reference-toggle\n        [label]="referenceExpanded() ? 'إخفاء دليل المرجع' : 'عرض دليل المرجع'"\n        (pressed)="toggleReference()"\n      />\n      @if (referenceExpanded()) {\n        <app-empty-state-controls data-empty-state-reference-evidence />\n      }\n    </erp-stack>\n  </erp-surface>\n`
        : '';
  const livePreviewClass = isFloatingPreview
    ? 'showcase-live-preview'
    : 'showcase-live-preview';

  const initialCvaValue = entry.showcaseControls.find((control) => control.source === 'cva')?.initialValue ?? null;
  const userMenuPresetSource = entry.className === 'ErpUserMenu'
    ? `\nconst USER_MENU_PRESETS: Readonly<Record<string, unknown>> = ${JSON.stringify(Object.fromEntries(USER_MENU_SHOWCASE_PRESETS.map((preset) => [preset.label, preset.user])), null, 2)};\n`
    : '';
  const userMenuPresetHandler = entry.className === 'ErpUserMenu'
    ? `    if (change.control.name === '$userPreset') {\n      this.liveValues.update((current) => ({\n        ...current,\n        '$userPreset': change.value,\n        user: USER_MENU_PRESETS[String(change.value)] ?? current['user'],\n      }));\n      return;\n    }\n`
    : '';
  const topbarEvidenceSource = entry.className === 'ErpTopbar' || entry.className === 'ErpAppShell'
    ? `\nconst TOPBAR_BRANCHES = [{id: 'cairo', label: 'فرع القاهرة'}, {id: 'alexandria', label: 'فرع الإسكندرية'}] as const;\nconst TOPBAR_SEARCH_RESULTS = [{id: 'invoice-1042', label: 'فاتورة 1042', category: 'المبيعات', icon: 'file'}] as const;\nconst TOPBAR_APPLICATIONS = [{id: 'operations', label: 'تطبيقات ERP', items: [{id: 'sales', label: 'المبيعات', icon: 'shopping-cart'}, {id: 'inventory', label: 'المخزون', icon: 'inventory'}, {id: 'finance', label: 'الحسابات', icon: 'wallet'}]}] as const;\nconst TOPBAR_MESSAGES = [{id: 'invoice', senderName: 'أميرة حداد', preview: 'تم اعتماد فاتورة المبيعات رقم 1042.', timestamp: 'منذ دقيقة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png', read: false}] as const;\nconst TOPBAR_NOTIFICATIONS = [{id: 'stock', title: 'تنبيه مخزون', description: 'وصل صنفان إلى حد إعادة الطلب', icon: 'notification'}] as const;\nconst TOPBAR_USER = {displayName: 'أميرة حداد', email: 'amira@honesty.local', roleLabel: 'مديرة المالية', branchLabel: 'القاهرة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png', avatarPresence: 'online'} as const;\nconst TOPBAR_USER_ITEMS = [{id: 'profile', label: 'الملف الشخصي', icon: 'user'}, {id: 'sign-out', label: 'تسجيل الخروج', icon: 'logout'}] as const;\n`
    : '';
  const source = `${importLines.join('\n')}\n\nconst ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === '${entry.id}')!;${userMenuPresetSource}\n@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  selector: 'app-${entry.id}-showcase',\n  imports: [${[...imports].join(', ')}],\n  templateUrl: './${entry.id}-showcase.html',\n  styleUrl: './${entry.id}-showcase.scss',\n})\nexport class ${className} {\n  readonly entry = ENTRY;\n  readonly controls = ENTRY.showcaseControls;\n  readonly lastEvent = signal('لم يحدث تفاعل بعد');\n  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});\n  readonly cvaValue = signal<unknown>(${JSON.stringify(initialCvaValue)});\n  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({\n    ...this.liveValues(),\n    '$value': this.cvaValue(),\n  }));\n${isCva ? `  readonly control = new FormControl<unknown>(${JSON.stringify({value: initialCvaValue, disabled: Boolean(entry.showcaseInitialValues?.disabled)})});\n\n  constructor() {\n    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {\n      this.cvaValue.set(value);\n      this.recordEvent('valueChange', value);\n    });\n  }\n` : ''}${isAvatarPicker ? `  readonly defaultAvatars = ERP_AVATAR_CATALOG;\n\n  effectiveAvatars(): unknown {\n    const avatars = this.value('avatars');\n    return Array.isArray(avatars) ? avatars : this.defaultAvatars;\n  }\n\n` : ''}\n  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));\n  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));\n  readonly previewDirection = computed(() => this.liveValues()['$previewDirection'] === 'ltr' ? 'ltr' : 'rtl');\n\n  value(name: string): unknown {\n    return this.liveValues()[name];\n  }\n\n  applyControl(change: ErpShowcaseControlChange): void {\n    if (change.control.source === 'cva') {\n${isCva ? `      this.control.setValue(change.value);` : `      this.cvaValue.set(change.value);`}\n      return;\n    }\n${userMenuPresetHandler}${hasCvaDisabled ? `    if (change.control.name === 'disabled') {\n      this.liveValues.update((current) => ({...current, disabled: change.value}));\n      if (change.value) this.control.disable();\n      else this.control.enable();\n      return;\n    }\n` : ''}    const value = change.control.kind === 'function'\n+      ? this.functionPreset(change.control.name, change.value)\n+      : change.value;\n+    this.liveValues.update((current) => ({...current, [change.control.name]: value}));\n+  }\n\n  recordModel(name: string, value: unknown): void {\n    this.liveValues.update((current) => ({...current, [name]: value}));\n    this.recordEvent(\`${'${name}'}Change\`, value);\n  }\n\n  recordEvent(name: string, value: unknown): void {\n    let rendered = '';\n    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }\n    catch { rendered = String(value); }\n    this.lastEvent.set(\`${'${name}'}: ${'${rendered}'}\`);\n  }\n\n  private functionPreset(name: string, value: unknown): unknown {\n    if (value !== 'sample') return null;\n    if (/comparator/i.test(name)) return () => 0;\n    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');\n    if (/disabled/i.test(name)) return () => false;\n    if (/filter|predicate/i.test(name)) return () => true;\n    return (candidate: unknown) => candidate;\n  }\n}\n`;
  let normalizedSource = source
    .replaceAll('\n+', '\n')
    .replace('!;\n@Component', '!;\n\n@Component');
  if (entry.className === 'ErpTopbar' || entry.className === 'ErpAppShell') {
    normalizedSource = normalizedSource
      .replace('!;\n\n@Component', `!;${topbarEvidenceSource}\n@Component`)
      .replace(
        '  readonly cvaValue = signal<unknown>(null);\n',
        `  readonly cvaValue = signal<unknown>(null);\n  readonly topbarBranches = TOPBAR_BRANCHES;\n  readonly topbarSearchResults = TOPBAR_SEARCH_RESULTS;\n  readonly topbarApplications = TOPBAR_APPLICATIONS;\n  readonly topbarMessages = TOPBAR_MESSAGES;\n  readonly topbarNotifications = TOPBAR_NOTIFICATIONS;\n  readonly topbarUser = TOPBAR_USER;\n  readonly topbarUserItems = TOPBAR_USER_ITEMS;\n`,
      );
  }
  if (isFileSelection) {
    const sampleFileSource = entry.className === 'ErpImagePicker'
      ? "new File(['<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><rect width=\"64\" height=\"64\" fill=\"#4f46e5\"/><circle cx=\"32\" cy=\"32\" r=\"18\" fill=\"#ffffff\"/></svg>'], 'صورة-الصنف.svg', {type: 'image/svg+xml', lastModified: 1})"
      : "new File(['approved purchase offer'], 'عرض-السعر.pdf', {type: 'application/pdf', lastModified: 1})";
    normalizedSource = normalizedSource
      .replace("    '$value': this.cvaValue(),", "    '$value': null,")
      .replace(
        '\n  recordModel(name: string, value: unknown): void {',
        `\n  loadSampleFiles(): void {\n    this.control.setValue([${sampleFileSource}]);\n  }\n\n  recordModel(name: string, value: unknown): void {`,
      )
      .replace(
        "    let rendered = '';\n    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }\n    catch { rendered = String(value); }",
        '    const rendered = this.fileSummary(value);',
      )
      .replace(
        '\n  private functionPreset(name: string, value: unknown): unknown {',
        "\n  fileSummary(value: unknown): string {\n    if (!Array.isArray(value)) return value === null ? 'لا ملفات' : String(value);\n    const names = value\n      .filter((entry): entry is {readonly name: string} => Boolean(entry) && typeof entry === 'object' && typeof (entry as {name?: unknown}).name === 'string')\n      .map((entry) => entry.name);\n    return names.length > 0 ? names.join('، ') : 'لا ملفات';\n  }\n\n  private functionPreset(name: string, value: unknown): unknown {",
      );
  }
  const cvaValueEvidence = isFileSelection ? 'fileSummary(cvaValue())' : 'cvaValue()';
  const html = `<erp-stack gap="default" data-dedicated-showcase="${entry.id}" data-showcase-sections="1">\n  <erp-text type="heading-2">${entry.displayNameAr}</erp-text>\n  <erp-text type="paragraph" tone="secondary">${entry.descriptionAr}</erp-text>\n${referenceLabel}  <erp-surface padding="default" border="subtle" data-showcase-case="live" class="${livePreviewClass}">\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">المعاينة الحية</erp-text>\n      ${renderedOwner}\n    </erp-stack>\n  </erp-surface>\n  <app-review-showcase-control-panel\n    [controls]="controls"\n    [values]="controlValues()"\n    (controlChanged)="applyControl($event)"\n  />\n  <erp-surface padding="default" border="subtle" data-showcase-event-log>\n    <erp-stack gap="tight">\n      <erp-text type="heading-3">آخر تفاعل</erp-text>\n      <erp-text type="paragraph" selectable>{{ lastEvent() }}</erp-text>\n${isCva ? `      <erp-text type="caption" selectable>القيمة الحالية: {{ ${cvaValueEvidence} }}</erp-text>\n` : ''}    </erp-stack>\n  </erp-surface>\n${exactReferenceEvidence}</erp-stack>\n`;
  const previewMinBlockSize = entry.className === 'ErpUserMenu' ? '32rem' : '12rem';
  const dividerEvidenceStyle = entry.className === 'ErpDivider'
    ? `\n.showcase-divider-target[data-orientation='vertical'] {\n  min-block-size: 8rem;\n  align-self: center;\n}\n`
    : '';
  const primitiveEvidenceStyle = entry.className === 'ErpIcon'
    ? `\n.showcase-icon-target {\n  align-self: center;\n  margin-block: var(--honesty-space-layout-gap-md);\n}\n`
    : entry.className === 'ErpText'
      ? `\n.showcase-text-target {\n  display: block;\n  inline-size: min(100%, 28rem);\n  min-inline-size: 0;\n}\n`
      : '';
  const scss = `:host { display: block; min-inline-size: 0; }\n\n.showcase-reference { overflow-wrap: anywhere; }\n\n.showcase-live-preview { min-block-size: ${previewMinBlockSize}; }\n${isFloatingPreview ? '' : '\n.showcase-live-preview--floating { position: relative; min-block-size: 30rem; overflow: clip; }\n'}${dividerEvidenceStyle}${primitiveEvidenceStyle}`;
  let generatedSource = hasDirectionalPreview
    ? normalizedSource
    : normalizedSource.replace(
      "  readonly previewDirection = computed(() => this.liveValues()['$previewDirection'] === 'ltr' ? 'ltr' : 'rtl');\n",
      '',
    );
  if (entry.className === 'ErpUserMenu') {
    generatedSource = generatedSource.replace(
      "    this.recordEvent(`${name}Change`, value);",
      "    if (name === 'open' && value === false && this.lastEvent().startsWith('actionActivated:')) {\n      this.lastEvent.update((current) => `${current} · openChange: false`);\n      return;\n    }\n    this.recordEvent(`${name}Change`, value);",
    );
  }
  if (hasAdditionalReference) {
    generatedSource = generatedSource
      .replace(
        "  readonly lastEvent = signal('لم يحدث تفاعل بعد');\n",
        "  readonly lastEvent = signal('لم يحدث تفاعل بعد');\n  readonly referenceExpanded = signal(false);\n",
      )
      .replace(
        '\n  private functionPreset(name: string, value: unknown): unknown {',
        '\n  toggleReference(): void {\n    this.referenceExpanded.update((value) => !value);\n  }\n\n  private functionPreset(name: string, value: unknown): unknown {',
      );
  }
  return new Map([
    [ownerPath, generatedSource],
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
