import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpTabItem, ErpTabPanel, ErpTabs} from '../../controls/tabs/tabs';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design Lab review internals use the erp-review prefix.
  selector: 'erp-review-core-tabs',
  imports: [ErpGrid, ErpStack, ErpTabPanel, ErpTabs, ErpText],
  templateUrl: './review-core-tabs.html',
  styleUrl: './review-core-tabs.scss',
})
export class ErpReviewCoreTabs {
  readonly textTabs: readonly ErpTabItem[] = [
    {id: 'overview', label: 'نظرة عامة', content: 'ملخص مؤشرات الأداء والنشاطات الحديثة والإجراءات السريعة.'},
    {id: 'orders', label: 'الطلبات', content: 'جميع أوامر الشراء والبيع خلال الفترة الحالية.'},
    {id: 'invoices', label: 'الفواتير', content: 'سجلات الفواتير الواردة والصادرة مع حالة السداد.'},
    {id: 'customers', label: 'العملاء', content: 'دليل العملاء وتصنيفاتهم وبيانات التواصل معهم.'},
    {id: 'reports', label: 'التقارير', content: 'التقارير المجدولة والفورية لجميع وحدات النظام.'},
  ];

  readonly iconTextTabs: readonly ErpTabItem[] = [
    {id: 'home', label: 'الرئيسية', icon: 'home'},
    {id: 'orders', label: 'الطلبات', icon: 'shopping-cart', count: 12, content: 'هناك 12 طلبًا بانتظار التجهيز في ثلاثة مخازن.'},
    {id: 'stock', label: 'المخزون', icon: 'inventory', count: 4, content: 'هناك أربعة أصناف دون حد إعادة الطلب.'},
    {id: 'reports', label: 'التقارير', icon: 'chart', content: 'التحليلات المالية والتشغيلية للنظام.'},
    {id: 'alerts', label: 'التنبيهات', icon: 'notification', count: 23, content: 'هناك 23 تنبيهًا غير مقروء من التكاملات والمراجعات.'},
    {id: 'settings', label: 'الإعدادات', icon: 'settings', content: 'إعدادات النظام العامة.'},
  ];

  readonly fillTabs: readonly ErpTabItem[] = [
    {id: 'day', label: 'اليوم', content: 'تفصيل الحركة بالساعة لليوم الحالي.'},
    {id: 'week', label: 'الأسبوع', content: 'إجمالي الحركة اليومي للأسبوع الحالي.'},
    {id: 'month', label: 'الشهر', content: 'إجمالي الحركة الأسبوعي للشهر الحالي.'},
    {id: 'year', label: 'السنة', content: 'إجمالي الحركة الشهري للسنة الحالية.'},
  ];

  readonly iconTabs: readonly ErpTabItem[] = [
    {id: 'home', label: 'الرئيسية', icon: 'home', content: 'مساحة العمل الرئيسية.'},
    {id: 'users', label: 'المستخدمون', icon: 'people', content: 'دليل المستخدمين وإدارة الوصول.'},
    {id: 'wallet', label: 'الحسابات', icon: 'wallet', content: 'الحسابات والأرصدة.'},
    {id: 'chart', label: 'التحليلات', icon: 'chart', content: 'تحليلات الأعمال ومؤشرات الأداء.'},
    {id: 'shield', label: 'الأمان', icon: 'shield', content: 'الأمان وسجل المراجعة.'},
    {id: 'gear', label: 'الإعدادات', icon: 'settings', content: 'تهيئة النظام.'},
  ];

  readonly imageTabs: readonly ErpTabItem[] = [
    {id: 'amira', label: 'أميرة حداد', imageTone: 'brand', content: 'مديرة المالية — 24 مهمة مفتوحة و3 مراجعات.'},
    {id: 'omar', label: 'عمر ناصر', imageTone: 'success', content: 'مسؤول المخزون — 18 مهمة مفتوحة و5 مهام معلقة.'},
    {id: 'leila', label: 'ليلى محمود', imageTone: 'warning', content: 'مسؤولة الموارد البشرية — 12 مهمة مفتوحة.'},
    {id: 'youssef', label: 'يوسف كريم', imageTone: 'purple', content: 'مهندس أول — 6 مهام مفتوحة ومراجعتان تقنيتان.'},
    {id: 'nadia', label: 'نادية فؤاد', imageTone: 'info', content: 'مسؤولة المشتريات — 9 مهام مفتوحة.'},
  ];

  readonly pillTabs: readonly ErpTabItem[] = [
    {id: 'all', label: 'الكل', count: 128, content: 'عرض جميع السجلات وعددها 128 سجلًا.'},
    {id: 'active', label: 'نشط', count: 94, content: 'هناك 94 سجلًا نشطًا.'},
    {id: 'pending', label: 'قيد المراجعة', count: 22, content: 'هناك 22 سجلًا بانتظار المراجعة.'},
    {id: 'archived', label: 'مؤرشف', count: 12, content: 'هناك 12 سجلًا مؤرشفًا.'},
  ];

  readonly solidTabs: readonly ErpTabItem[] = [
    {id: 'list', label: 'قائمة', icon: 'file', content: 'عرض البيانات في قائمة منظمة.'},
    {id: 'grid', label: 'شبكة', icon: 'dashboard', content: 'عرض البيانات في شبكة من البطاقات.'},
    {id: 'chart', label: 'مخطط', icon: 'chart', content: 'عرض التحليلات المرئية.'},
    {id: 'map', label: 'خريطة', icon: 'home', content: 'عرض التوزيع الجغرافي للفروع.'},
  ];

  readonly verticalTabs: readonly ErpTabItem[] = [
    {id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard'},
    {id: 'orders', label: 'الطلبات', icon: 'shopping-cart', count: 12, content: 'أحدث الطلبات من جميع قنوات البيع.'},
    {id: 'inventory', label: 'المخزون', icon: 'inventory', count: 4, content: 'مستويات المخزون وتنبيهات إعادة الطلب.'},
    {id: 'customers', label: 'العملاء', icon: 'people', content: 'دليل العملاء النشطين.'},
    {id: 'finance', label: 'المالية', icon: 'wallet', content: 'الحسابات والمدفوعات والتسويات.'},
    {id: 'reports', label: 'التقارير', icon: 'chart', content: 'التقارير المجدولة والفورية.'},
    {id: 'settings', label: 'الإعدادات', icon: 'settings', content: 'إعدادات النظام العامة.'},
  ];

  readonly verticalIconTabs: readonly ErpTabItem[] = [
    {id: 'profile', label: 'الملف الشخصي', icon: 'people', content: 'بيانات المستخدم وتفضيلاته.'},
    {id: 'security', label: 'الأمان', icon: 'shield', content: 'كلمة المرور والتحقق الثنائي والجلسات.'},
    {id: 'notify', label: 'الإشعارات', icon: 'notification', content: 'إشعارات البريد الإلكتروني والتنبيهات داخل النظام.'},
    {id: 'billing', label: 'الفوترة', icon: 'wallet', content: 'الخطط والفواتير ووسائل السداد.'},
    {id: 'system', label: 'النظام', icon: 'settings', content: 'إعدادات النظام المتقدمة.'},
  ];

  readonly animationTabs: readonly ErpTabItem[] = [
    {id: 'slide', label: 'انزلاق', content: 'تنزلق اللوحات من جهة البداية المنطقية، وهو الانتقال الافتراضي.'},
    {id: 'fade', label: 'تلاشي', content: 'تظهر اللوحة تدريجيًا من خلال الشفافية.'},
    {id: 'scale', label: 'تحجيم', content: 'تتدرج اللوحة من 94٪ إلى 100٪ بحركة مرنة.'},
    {id: 'none', label: 'بدون حركة', content: 'تبديل فوري مناسب للمحتوى الكثيف.'},
  ];
}
