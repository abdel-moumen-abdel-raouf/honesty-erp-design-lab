import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpEmptyStateLottie} from './empty-state-lottie';

export type ErpEmptyStateVariant =
  | 'no-data'
  | 'no-search'
  | 'error'
  | 'forbidden'
  | 'custom';

export type ErpEmptyStateIllustrationMotion = 'float' | 'pulse' | 'none';
export type ErpEmptyStateMotionSpeed = 0.5 | 1 | 1.5;

export const ERP_EMPTY_STATE_LOTTIE_ASSETS: Readonly<
  Record<ErpEmptyStateVariant, string>
> = Object.freeze({
  'no-data': '/lottie/empty-state/no-data.json',
  'no-search': '/lottie/empty-state/no-search.json',
  error: '/lottie/empty-state/error.json',
  forbidden: '/lottie/empty-state/forbidden.json',
  custom: '/lottie/empty-state/custom.json',
});

export interface ErpEmptyStateScenarioDefaults {
  readonly title: string;
  readonly description: string;
  readonly showIllustration: boolean;
  readonly showPrimaryAction: boolean;
  readonly primaryActionLabel: string;
  readonly showSecondaryAction: boolean;
  readonly secondaryActionLabel: string;
  readonly showTertiaryAction: boolean;
  readonly tertiaryActionLabel: string;
  readonly showExtra: boolean;
}

export const ERP_EMPTY_STATE_SCENARIOS: Readonly<
  Record<ErpEmptyStateVariant, ErpEmptyStateScenarioDefaults>
> = Object.freeze({
  'no-data': Object.freeze({
    title: 'لا توجد بيانات لعرضها',
    description:
      'لم يتم العثور على أية سجلات في النظام حتى الآن. يمكنك البدء بإنشاء أول سجل بسهولة للبدء في تتبع المعاملات.',
    showIllustration: true,
    showPrimaryAction: true,
    primaryActionLabel: 'إضافة سجل جديد',
    showSecondaryAction: false,
    secondaryActionLabel: 'إعادة تعيين البحث',
    showTertiaryAction: false,
    tertiaryActionLabel: 'مشاهدة الدليل الإرشادي',
    showExtra: true,
  }),
  'no-search': Object.freeze({
    title: 'لا توجد نتائج مطابقة',
    description:
      'لم نعثر على أي نتائج تطابق معايير البحث الحالية. جرّب كلمات مفتاحية أخرى أو قم بإعادة ضبط خيارات الفلاتر.',
    showIllustration: false,
    showPrimaryAction: false,
    primaryActionLabel: 'إضافة سجل جديد',
    showSecondaryAction: true,
    secondaryActionLabel: 'إعادة تعيين البحث',
    showTertiaryAction: false,
    tertiaryActionLabel: 'مشاهدة الدليل الإرشادي',
    showExtra: false,
  }),
  error: Object.freeze({
    title: 'حدث خطأ أثناء تحميل البيانات',
    description:
      'تعذر الاتصال بخادم قاعدة البيانات لجلب أحدث البيانات. يرجى التحقق من اتصال الشبكة أو المحاولة مرة أخرى.',
    showIllustration: true,
    showPrimaryAction: true,
    primaryActionLabel: 'إعادة المحاولة الآن',
    showSecondaryAction: false,
    secondaryActionLabel: 'إعادة تعيين البحث',
    showTertiaryAction: true,
    tertiaryActionLabel: 'فحص حالة الخوادم',
    showExtra: true,
  }),
  forbidden: Object.freeze({
    title: 'لا تملك صلاحية الوصول',
    description:
      'ليس لديك الصلاحيات الكافية لعرض محتويات هذه الشاشة أو تعديلها. تواصل مع مسؤول النظام لطلب منح الإذن.',
    showIllustration: true,
    showPrimaryAction: false,
    primaryActionLabel: 'إضافة سجل جديد',
    showSecondaryAction: false,
    secondaryActionLabel: 'إعادة تعيين البحث',
    showTertiaryAction: false,
    tertiaryActionLabel: 'مشاهدة الدليل الإرشادي',
    showExtra: true,
  }),
  custom: Object.freeze({
    title: 'شاشة مخصصة بالكامل',
    description:
      'يمكنك إظهار جميع الأزرار والروابط الإرشادية وضبط كل جزء بشكل مستقل ليلائم احتياجات الشاشة في نظام ERP.',
    showIllustration: true,
    showPrimaryAction: true,
    primaryActionLabel: 'الإجراء الأساسي',
    showSecondaryAction: true,
    secondaryActionLabel: 'الإجراء الثانوي',
    showTertiaryAction: true,
    tertiaryActionLabel: 'الإجراء الثالث',
    showExtra: true,
  }),
});

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[erpEmptyStateIllustration]',
})
export class ErpEmptyStateIllustration {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[erpEmptyStateExtra]',
})
export class ErpEmptyStateExtra {}

function nullableBooleanAttribute(value: unknown): boolean | null {
  return value === null || value === undefined ? null : booleanAttribute(value);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-empty-state',
  imports: [ErpButton, ErpEmptyStateLottie, ErpIcon, ErpText],
  templateUrl: './empty-state.html',
  styleUrls: [
    './empty-state.scss',
    './empty-state-content.scss',
    './empty-state-motion-entry.scss',
    './empty-state-motion-reduced.scss',
  ],
  host: {
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[attr.data-empty-state-variant]': 'variant()',
    '[attr.data-empty-state-animated]': 'animated()',
    '[attr.data-empty-state-motion]': 'illustrationMotion()',
    '[attr.data-empty-state-motion-speed]': 'motionSpeed()',
  },
})
export class ErpEmptyState {
  readonly variant = input<ErpEmptyStateVariant>('no-data');
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);

  readonly animated = input(true, {transform: booleanAttribute});
  readonly illustrationMotion =
    input<ErpEmptyStateIllustrationMotion>('float');
  readonly motionSpeed = input<ErpEmptyStateMotionSpeed>(1);

  readonly showIllustration = input<boolean | null>(null, {
    transform: nullableBooleanAttribute,
  });
  readonly showTitle = input(true, {transform: booleanAttribute});
  readonly showDescription = input(true, {transform: booleanAttribute});
  readonly showActions = input(true, {transform: booleanAttribute});
  readonly showExtra = input<boolean | null>(null, {
    transform: nullableBooleanAttribute,
  });

  readonly showPrimaryAction = input<boolean | null>(null, {
    transform: nullableBooleanAttribute,
  });
  readonly primaryActionLabel = input<string | null>(null);

  readonly showSecondaryAction = input<boolean | null>(null, {
    transform: nullableBooleanAttribute,
  });
  readonly secondaryActionLabel = input<string | null>(null);

  readonly showTertiaryAction = input<boolean | null>(null, {
    transform: nullableBooleanAttribute,
  });
  readonly tertiaryActionLabel = input<string | null>(null);

  readonly extraPrefix = input('هل تواجه مشكلة؟');
  readonly extraLinkLabel = input('مركز مساعدة النظام والتوثيق');
  readonly extraLinkHref = input('#help');

  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();
  readonly tertiaryAction = output<void>();

  protected readonly projectedIllustration = contentChild(ErpEmptyStateIllustration);
  protected readonly projectedExtra = contentChild(ErpEmptyStateExtra);
  private readonly defaultIllustration = viewChild(ErpEmptyStateLottie);
  protected readonly entering = signal(true);
  protected readonly defaults = computed(() => ERP_EMPTY_STATE_SCENARIOS[this.variant()]);
  protected readonly defaultIllustrationAsset = computed(
    () => ERP_EMPTY_STATE_LOTTIE_ASSETS[this.variant()],
  );
  protected readonly effectiveTitle = computed(
    () => this.title() ?? this.defaults().title,
  );
  protected readonly effectiveDescription = computed(
    () => this.description() ?? this.defaults().description,
  );
  protected readonly effectiveShowIllustration = computed(
    () => this.showIllustration() ?? this.defaults().showIllustration,
  );
  protected readonly effectiveShowExtra = computed(
    () => this.showExtra() ?? this.defaults().showExtra,
  );
  protected readonly effectiveShowPrimaryAction = computed(
    () => this.showPrimaryAction() ?? this.defaults().showPrimaryAction,
  );
  protected readonly effectiveShowSecondaryAction = computed(
    () => this.showSecondaryAction() ?? this.defaults().showSecondaryAction,
  );
  protected readonly effectiveShowTertiaryAction = computed(
    () => this.showTertiaryAction() ?? this.defaults().showTertiaryAction,
  );
  protected readonly effectivePrimaryActionLabel = computed(
    () => this.primaryActionLabel() ?? this.defaults().primaryActionLabel,
  );
  protected readonly effectiveSecondaryActionLabel = computed(
    () => this.secondaryActionLabel() ?? this.defaults().secondaryActionLabel,
  );
  protected readonly effectiveTertiaryActionLabel = computed(
    () => this.tertiaryActionLabel() ?? this.defaults().tertiaryActionLabel,
  );
  protected readonly hasVisibleActions = computed(
    () =>
      this.showActions() &&
      (this.effectiveShowPrimaryAction() ||
        this.effectiveShowSecondaryAction() ||
        this.effectiveShowTertiaryAction()),
  );
  protected readonly primaryIcon = computed<ErpIconName>(() =>
    this.variant() === 'error' ? 'refresh' : 'add',
  );
  protected readonly tertiaryIcon = computed<ErpIconName>(() =>
    this.variant() === 'error' ? 'server' : 'help',
  );

  replayEntrance(): void {
    if (!this.animated()) {
      return;
    }

    this.defaultIllustration()?.replay();
    this.entering.set(false);
    const schedule =
      typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) =>
            setTimeout(() => callback(0), 0) as unknown as number;

    schedule(() => schedule(() => this.entering.set(true)));
  }
}
