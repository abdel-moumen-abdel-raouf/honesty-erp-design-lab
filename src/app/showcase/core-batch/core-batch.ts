import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpAlert} from '../../controls/alert/alert';
import {ErpAvatarPicker} from '../../controls/avatar-picker/avatar-picker';
import {
  ErpAvatar,
  ErpAvatarPresence,
  ErpAvatarPresenceMotion,
  ErpAvatarPresencePosition,
  ErpAvatarCursor,
  ErpAvatarHoverMotion,
  ErpAvatarShape,
  ErpAvatarSize,
  ErpAvatarTone,
} from '../../controls/avatar/avatar';
import {ErpButton} from '../../controls/button/button';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpPagination} from '../../controls/pagination/pagination';
import {
  ErpSelectOption,
  ErpSelectSize,
  ErpSelectValue,
} from '../../controls/select/select-contracts';
import {ErpSelect} from '../../controls/select/select';
import {ErpSkeleton} from '../../controls/skeleton/skeleton';
import {
  ErpStatusBadge,
  ErpStatusBadgeShape,
  ErpStatusBadgeSize,
  ErpStatusBadgeTone,
  ErpStatusBadgeVariant,
  ErpStatusBadgeWidthMode,
} from '../../controls/status-badge/status-badge';
import {
  ErpTabHeaderShape,
  ErpTabItem,
  ErpTabs,
  ErpTabsDistribution,
  ErpTabsOrientation,
  ErpTabsTransition,
  ErpTabsVariant,
} from '../../controls/tabs/tabs';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewCoreTable} from '../../review-internals/review-core-table/review-core-table';
import {ErpReviewCoreTabs} from '../../review-internals/review-core-tabs/review-core-tabs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-core-batch',
  imports: [
    ErpAlert,
    ErpAvatar,
    ErpAvatarPicker,
    ErpButton,
    ErpCheckBox,
    ErpContainer,
    ErpGrid,
    ErpPagination,
    ErpSection,
    ErpSelect,
    ErpSkeleton,
    ErpStack,
    ErpStatusBadge,
    ErpSurface,
    ErpReviewCoreTable,
    ErpReviewCoreTabs,
    ErpTabs,
    ErpText,
    FormsModule,
  ],
  templateUrl: './core-batch.html',
  styleUrl: './core-batch.scss',
})
export class CoreBatch {
  readonly selectedEmployee = signal<ErpSelectValue>('ahmed');
  readonly selectedReviewTeam = signal<ErpSelectValue>(['ahmed', 'sara']);
  readonly selectedAvatar = signal<string | null>('avatar-01');
  readonly selectedFemaleAvatar = signal<string | null>('avatar-21');
  readonly page = signal(3);
  readonly pageSize = signal(25);
  readonly badgeTone = signal<ErpStatusBadgeTone>('success');
  readonly badgeVariant = signal<ErpStatusBadgeVariant>('soft');
  readonly badgeSize = signal<ErpStatusBadgeSize>('md');
  readonly badgeShape = signal<ErpStatusBadgeShape>('rounded');
  readonly badgeWidth = signal<ErpStatusBadgeWidthMode>('content');
  readonly badgeSelected = signal(true);
  readonly badgeInteractionEvidence = signal('لم يحدث تفاعل بعد');
  readonly avatarShape = signal<ErpAvatarShape>('circle');
  readonly avatarCursor = signal<ErpAvatarCursor>('default');
  readonly avatarPresence = signal<ErpAvatarPresence>('online');
  readonly avatarPresencePosition = signal<ErpAvatarPresencePosition>('bottom-right');
  readonly avatarPresenceMotion = signal<ErpAvatarPresenceMotion>('breathe');
  readonly avatarHoverMotion = signal<ErpAvatarHoverMotion>('scale');
  readonly avatarTone = signal<ErpAvatarTone>('brand');
  readonly avatarInteractionEvidence = signal('لم يحدث تفاعل بعد');
  readonly pickerSize = signal<ErpAvatarSize>('2xl');
  readonly pickerShape = signal<ErpAvatarShape>('circle');
  readonly tabsOrientation = signal<ErpTabsOrientation>('horizontal');
  readonly tabsDistribution = signal<ErpTabsDistribution>('content');
  readonly tabsVariant = signal<ErpTabsVariant>('underline');
  readonly tabsShape = signal<ErpTabHeaderShape>('reference');
  readonly tabsTransition = signal<ErpTabsTransition>('slide');
  readonly showSummary = signal(true);
  readonly showPageSize = signal(true);
  readonly showFirst = signal(true);
  readonly showPrevious = signal(true);
  readonly showPageNumbers = signal(true);
  readonly showNext = signal(true);
  readonly showLast = signal(true);
  readonly selectSizes: readonly ErpSelectSize[] = ['sm', 'md', 'lg'];
  readonly avatarSizes: readonly ErpAvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  readonly avatarShapes: readonly ErpAvatarShape[] = ['circle', 'rounded', 'square'];
  readonly avatarTones: readonly ErpAvatarTone[] = [
    'neutral', 'brand', 'success', 'warning', 'danger', 'info', 'purple', 'slate',
  ];
  readonly avatarPresences: readonly ErpAvatarPresence[] = [
    'online', 'away', 'busy', 'offline', 'info', 'brand', 'pending', 'vacation',
  ];
  readonly avatarReferenceMotions: readonly ErpAvatarPresenceMotion[] = [
    'pulse', 'ping', 'bounce', 'blink', 'none',
  ];
  readonly badgeToneOptions = this.options([
    'neutral', 'success', 'warning', 'danger', 'info', 'brand', 'pending', 'archived',
  ]);
  readonly badgeVariantOptions = this.options(['soft', 'solid', 'outline', 'ghost']);
  readonly badgeSizeOptions = this.options(['sm', 'md', 'lg', 'xl']);
  readonly badgeShapeOptions = this.options(['square', 'rounded', 'pill']);
  readonly badgeWidthOptions = this.options(['content', 'stretch']);
  readonly badgeTones: readonly ErpStatusBadgeTone[] = [
    'neutral', 'success', 'warning', 'danger', 'info', 'brand', 'pending', 'archived',
  ];
  readonly badgeVariants: readonly ErpStatusBadgeVariant[] = [
    'soft', 'solid', 'outline', 'ghost',
  ];
  readonly badgeSizes: readonly ErpStatusBadgeSize[] = ['sm', 'md', 'lg', 'xl'];
  readonly avatarShapeOptions = this.options(['circle', 'rounded', 'square']);
  readonly avatarCursorOptions = this.options(['default', 'pointer']);
  readonly avatarToneOptions = this.options([
    'neutral', 'brand', 'success', 'warning', 'danger', 'info', 'purple', 'slate',
  ]);
  readonly avatarPresenceOptions = this.options([
    'online', 'away', 'busy', 'offline', 'info', 'brand', 'pending', 'vacation',
  ]);
  readonly avatarPositionOptions = this.options([
    'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right',
  ]);
  readonly avatarMotionOptions = this.options([
    'none', 'pulse', 'ping', 'bounce', 'blink', 'breathe',
  ]);
  readonly avatarHoverOptions = this.options(['none', 'scale', 'lift']);
  readonly avatarSizeOptions = this.options([
    'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl',
  ]);
  readonly tabsOrientationOptions = this.options(['horizontal', 'vertical']);
  readonly tabsDistributionOptions = this.options(['content', 'fill']);
  readonly tabsVariantOptions = this.options(['underline', 'pill', 'solid', 'ghost']);
  readonly tabsShapeOptions = this.options(['reference', 'rectangle', 'rounded', 'circle']);
  readonly tabsTransitionOptions = this.options(['slide', 'fade', 'scale', 'none']);
  readonly avatarPositions: readonly {
    position: ErpAvatarPresencePosition;
    status: ErpAvatarPresence;
    motion: ErpAvatarPresenceMotion;
  }[] = [
    {position: 'top', status: 'online', motion: 'pulse'},
    {position: 'bottom', status: 'away', motion: 'ping'},
    {position: 'left', status: 'busy', motion: 'bounce'},
    {position: 'right', status: 'offline', motion: 'blink'},
    {position: 'top-left', status: 'info', motion: 'ping'},
    {position: 'top-right', status: 'brand', motion: 'bounce'},
    {position: 'bottom-left', status: 'pending', motion: 'pulse'},
    {position: 'bottom-right', status: 'vacation', motion: 'none'},
  ];

  readonly employeeOptions: readonly ErpSelectOption[] = [
    {
      value: 'ahmed',
      label: 'أحمد محمود',
      description: 'محاسب أول — فرع القاهرة',
      imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-01.png',
      group: 'المالية',
      keywords: ['حسابات', 'القاهرة'],
    },
    {
      value: 'sara',
      label: 'سارة علي',
      description: 'مسؤولة مشتريات — فرع الإسكندرية',
      imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      group: 'العمليات',
    },
    {
      value: 'mahmoud',
      label: 'محمود حسن',
      description: 'موقوف مؤقتًا',
      icon: 'user',
      group: 'العمليات',
      disabled: true,
    },
    {
      value: 'general',
      label: 'الإدارة العامة',
      group: 'الإدارة',
    },
    {
      value: 'inventory',
      label: 'مسؤول المخزون',
      icon: 'inventory',
      group: 'العمليات',
    },
  ];

  readonly enabledEmployeeFilter = (option: ErpSelectOption): boolean =>
    option.disabled !== true;

  readonly tabs: readonly ErpTabItem[] = [
    {id: 'summary', label: 'الملخص', content: 'ملخص حركة الحساب خلال الفترة الحالية.', icon: 'dashboard', count: 4},
    {id: 'transactions', label: 'القيود', content: 'قائمة القيود المحاسبية المرتبطة بالحساب.', icon: 'operations', count: 18},
    {id: 'audit', label: 'سجل المراجعة', content: 'هذا التبويب معطل للمستخدم الحالي.', icon: 'history', disabled: true},
  ];

  readonly textOnlyTabs: readonly ErpTabItem[] = [
    {id: 'overview', label: 'نظرة عامة', content: 'نظرة عامة على السجل.'},
    {id: 'details', label: 'التفاصيل', content: 'البيانات التفصيلية للسجل.'},
    {id: 'documents', label: 'المستندات', content: 'المستندات المرتبطة بالسجل.'},
  ];

  readonly imageTabs: readonly ErpTabItem[] = [
    {
      id: 'ahmed',
      label: 'أحمد محمود',
      content: 'العمليات المسندة إلى أحمد محمود.',
      imageUrl: '/assets/honesty-erp-avatars/users/male/avatar-01.png',
      headerPresentation: 'image-text',
    },
    {
      id: 'sara',
      label: 'سارة علي',
      content: 'العمليات المسندة إلى سارة علي.',
      imageUrl: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      headerPresentation: 'image-text',
    },
  ];

  protected updateBadgeSelection(selected: boolean): void {
    this.badgeSelected.set(selected);
    this.badgeInteractionEvidence.set(selected ? 'تم تحديد الحالة' : 'تم إلغاء تحديد الحالة');
  }

  protected recordBadgeRemoval(): void {
    this.badgeInteractionEvidence.set('تم طلب إزالة الحالة');
  }

  protected recordAvatarActivation(): void {
    this.avatarInteractionEvidence.set('تم تفعيل الصورة الشخصية');
  }

  readonly iconOnlyTabs: readonly ErpTabItem[] = [
    {id: 'overview', label: 'نظرة عامة', content: 'محتوى النظرة العامة.', icon: 'dashboard', headerPresentation: 'icon-only'},
    {id: 'history', label: 'السجل', content: 'محتوى سجل الحركة.', icon: 'history', headerPresentation: 'icon-only'},
  ];

  private options(values: readonly string[]): readonly ErpSelectOption[] {
    return values.map((value) => ({value, label: value}));
  }

}
