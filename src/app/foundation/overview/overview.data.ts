export interface FoundationOverviewReviewLink {
  readonly label: string;
  readonly route: string;
}

export interface FoundationOverviewDomain {
  readonly id: string;
  readonly arabicLabel: string;
  readonly status: string;
  readonly reviewLinks: readonly FoundationOverviewReviewLink[];
  readonly summary: string;
  readonly reopenTrigger: string;
  readonly note?: string;
}

export interface FoundationOverviewReviewFamily {
  readonly id: string;
  readonly label: string;
  readonly route: string;
  readonly status: string;
}

export const FOUNDATION_OVERVIEW_DOMAINS: readonly FoundationOverviewDomain[] = [
  {
    id: 'colors',
    arabicLabel: 'الألوان',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [
      {label: 'الألوان المرجعية', route: '/foundation/colors'},
      {label: 'صبغات الحالات', route: '/foundation/colors/status-hues'},
    ],
    summary:
      'تم تحديد لوحات الألوان المحايدة، والأساسية، والثانوية، وألوان التمييز (Accent)، وألوان الحالة.',
    reopenTrigger:
      'لا تتم إعادة الفتح إلا بناءً على قرار صريح من مالك المنتج بتغيير لوحة ألوان العلامة التجارية للمنتج، أو عندما تُثبت أدلة ملموسة تتعلق بالتباين عدم صلاحية التعيين الحالي.',
  },
  {
    id: 'themes-feedback-surfaces',
    arabicLabel: 'السمات والأسطح والحالات',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [
      {label: 'السمات الفاتحة والداكنة', route: '/foundation/themes'},
      {label: 'ألوان الحالات الدلالية', route: '/foundation/feedback-colors'},
    ],
    summary:
      'تم تحديد الأسطح الفاتحة والداكنة، والنصوص، والحدود، والإجراء الرئيسي، والأسطح المعكوسة، وأدوار التغذية الراجعة، وأدوار العلامة التجارية.',
    reopenTrigger:
      'فقط إذا كشف الاستخدام الفعلي للـ Shell أو المكون عن مشكلة ملموسة تتعلق بالتباين أو التسلسل الهرمي.',
    note:
      'تم دمج الأدلة السطحية عمدًا في مراجعة السمات الموجودة في المسار /foundation/themes بدلاً من إنشاء مسار مكرر للأسطح. تم دمج مراجعة الأسطح هناك لأن نفس التسلسل الهرمي للأسطح الفاتحة/الداكنة قد تمت مراجعته بالفعل هناك.',
  },
  {
    id: 'typography',
    arabicLabel: 'الطباعة',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'الطباعة', route: '/foundation/typography'}],
    summary:
      'تم استخدام خطي "Tajawal" و"Space Grotesk" بأوزان مشتركة (400 و500 و700)، وتحديد تسعة أدوار دلالية.',
    reopenTrigger:
      'يُسمح بإعادة التحقق السياقي في النماذج أو الجداول المكتظة؛ إذ تتطلب خاصية التباعد المشترك بين الأحرف (letter-spacing/tracking) أو تنسيق الخط أحادي العرض (monospace) إعادة فتح صريحة لإعدادات الأساس (Foundation).',
  },
  {
    id: 'charts',
    arabicLabel: 'ألوان الرسوم البيانية',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'ألوان الرسوم البيانية', route: '/foundation/charts'}],
    summary:
      'تم تحديد خمس سلاسل بيانات تصنيفية للمخطط، وألوان للحالة/التغير (delta)، وألوان هيكلية للمخطط، وذلك لتناسب وضعي الإضاءة الفاتحة والداكنة.',
    reopenTrigger:
      'يتطلب تجاوز خمس سلاسل فئوية متزامنة أو تغيير تعيينات لوحة الألوان الفئوية إعادة فتح صريحة من قِبَل مالك المنتج.',
  },
  {
    id: 'preferences',
    arabicLabel: 'التفضيلات',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'التفضيلات', route: '/foundation/preferences'}],
    summary:
      'تمت صياغة المكونات الأساسية لنظام التفضيلات (الذي يضم 11 إعداداً)، وتحديد آليات التخزين المحلي، وقواعد التنسيق الحتمي.',
    reopenTrigger:
      'لا يزال تطبيق الإنتاج العالمي وآلية استمرارية البيانات في الواجهة الخلفية مؤجلين..',
  },
  {
    id: 'spacing',
    arabicLabel: 'المسافات',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'المسافات', route: '/foundation/spacing'}],
    summary:
      'تم تحديد شبكة مرجعية بحجم 4 بكسل وإيقاع دلالي مضمن/مكدس/مُدرج/مقطع.',
    reopenTrigger:
      'ستظل مسألة الحشو/الفجوات الخاصة بكل مكون من القرارات المستقبلية المتعلقة برموز المكونات.',
  },
  {
    id: 'borders-radius',
    arabicLabel: 'الحدود والزوايا',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'الحدود والزوايا', route: '/foundation/borders-radius'}],
    summary:
      'يتم تحديد هندسة عرض ونمط الحدود، وأدوار نصف القطر المُتحكَّم فيه، وهندسة حلقة التركيز الافتراضية.',
    reopenTrigger:
      'يتطلب تغيير إمكانيات نصف القطر الكامل أو الحدود المتقطعة الدلالية إعادة فتح صريحة للمؤسسة.',
  },
  {
    id: 'elevation',
    arabicLabel: 'الارتفاع والظلال',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'الارتفاع والظلال', route: '/foundation/elevation'}],
    summary: 'تم تحديد الارتفاع المناسب للموضوع (بدون/مرتفع/تراكب).',
    reopenTrigger: 'لا يزال رسم خرائط الارتفاعات الخاصة بالمكونات مؤجلاً.',
  },
  {
    id: 'motion',
    arabicLabel: 'الحركة',
    status: 'مُعتمد من حيث المبدأ — خط الأساس',
    reviewLinks: [{label: 'الحركة', route: '/foundation/motion'}],
    summary: 'تم تحديد خط الأساس للمدة والتخفيف.',
    reopenTrigger:
      'يجب إعادة التحقق من توقيت الحركة أو خصائص التدرج (easing) في سياق التفاعلات الفعلية للمكونات.',
  },
  {
    id: 'density',
    arabicLabel: 'الكثافة',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'الكثافة', route: '/foundation/density'}],
    summary:
      'تم إرساء نظام التشكيل القابل للتكديس والتركيب المدمج (Compact/Comfortable/Spacious).',
    reopenTrigger:
      'لا تزال القرارات المتعلقة بارتفاعات عناصر التحكم وارتفاعات الصفوف وكثافة المكونات مؤجلة.',
  },
  {
    id: 'responsive-layout',
    arabicLabel: 'التخطيط والاستجابة',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'التخطيط والاستجابة', route: '/foundation/layout-grid'}],
    summary:
      'تم إنشاء واجهة برمجة تطبيقات الاستعلام عن منفذ العرض/الحاوية، ومفردات فجوة التخطيط، والمسافات البينية المتجاوبة.',
    reopenTrigger:
      'تظل العتبات/المجاري قابلة لإعادة التحقق من حيث السياق عند عروض ERP المستهدفة وعناصر/مكونات هيكلية فعلية.',
  },
  {
    id: 'layers',
    arabicLabel: 'الطبقات',
    status: 'مُوافَقٌ عليه من حيث المبدأ',
    reviewLinks: [{label: 'الطبقات', route: '/foundation/layers'}],
    summary:
      'تم تحديد ترتيب العناصر: الأساسي، واللاصق، والعائم، والتراكبي، والحاجب، والإشعاري.',
    reopenTrigger:
      'لا يزال تعيين الطبقات الخاص بالمكونات وملكية سياق التكديس مؤجلاً.',
  },
] as const;

export const FOUNDATION_OVERALL_STATUS = Object.freeze({
  english: 'Foundation established; production review surfaces are implemented and under Product Owner review',
  arabic: 'الأساس قائم، وأسطح مراجعة الإنتاج منفذة وقيد مراجعة مالك المنتج',
});

export const FOUNDATION_NEXT_LAYER_DECISIONS = [
  'الموافقة المرئية من مالك المنتج على مجموعات مراجعة الإنتاج المُنفَّذة',
  'موجات التصحيح اللاحقة للمراجعة تقع خارج النطاق المصرح به حالياً.',
  'مراجعة مؤجلة لمنتج المرحلتين 10 و11 خاصة بمركب معين',
  'استمرارية تفضيلات الواجهة الخلفية',
  'دمج التفضيلات على مستوى التطبيق بما يتجاوز المستهلكين الذين تمت مراجعتهم',
] as const;

export const FOUNDATION_CURRENT_REVIEW_FAMILIES: readonly FoundationOverviewReviewFamily[] = [
  {
    id: 'structural-primitives',
    label: 'العناصر الهيكلية الأولية',
    route: '/primitives/structural',
    status: 'تم التنفيذ — قيد المراجعة من قِبَل مالك المنتج',
  },
  {
    id: 'typography-primitives',
    label: 'العناصر الأساسية للطباعة',
    route: '/primitives/typography',
    status: 'تم التنفيذ — قيد المراجعة من قِبَل مالك المنتج',
  },
  {
    id: 'icon-primitives',
    label: 'العناصر الأولية للأيقونات',
    route: '/primitives/icons',
    status: 'تم التنفيذ — قيد المراجعة من قِبَل مالك المنتج',
  },
  {
    id: 'button-controls',
    label: 'عناصر تحكم الأزرار',
    route: '/controls/buttons',
    status: 'مرشح تقني — بانتظار الموافقة البصرية',
  },
  {
    id: 'tooltip-controls',
    label: 'عناصر التحكم في تلميحات الأدوات',
    route: '/controls/tooltips',
    status: 'مرشح تقني — بانتظار الموافقة البصرية',
  },
  {
    id: 'input-controls',
    label: 'عناصر التحكم في الإدخال',
    route: '/controls/inputs',
    status: 'مرشح تقني — بانتظار الموافقة البصرية',
  },
  {
    id: 'empty-state-controls',
    label: 'الحالات الفارغة',
    route: '/controls/empty-states',
    status: 'مرشح تقني — بانتظار الموافقة البصرية',
  },
  {
    id: 'blocking-overlay-controls',
    label: 'حظر عناصر تحكم التراكب',
    route: '/controls/overlays',
    status: 'مرشح تقني — بانتظار الموافقة البصرية',
  },
] as const;

export const FOUNDATION_V1_CONSTRAINTS = [
  'لا يوجد عقد مشترك بين المؤسسة لتحديد تباعد الأحرف/تتبعها؛ تباعد الأحرف العادي هو خط الأساس الثابت للإصدار الأول.',
  'لا يوجد دور إنتاج أحادي المسافة مشترك؛ تستخدم المعرفات عائلة UI/Latin المعتمدة بالإضافة إلى عزل bidi/LTR.',
  'تدعم مخططات Foundation ما يصل إلى خمس سلاسل فئوية متزامنة؛ أما التصورات البيانية الأكبر حجماً فيجب تجميعها أو تقسيمها، أو إعادة فتح Foundation صراحةً.',
] as const;
