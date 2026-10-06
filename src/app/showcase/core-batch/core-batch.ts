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
  readonly page = signal(3);
  readonly pageSize = signal(25);
  readonly badgeTone = signal<ErpStatusBadgeTone>('success');
  readonly badgeSize = signal<ErpStatusBadgeSize>('md');
  readonly badgeShape = signal<ErpStatusBadgeShape>('pill');
  readonly badgeWidth = signal<ErpStatusBadgeWidthMode>('content');
  readonly avatarShape = signal<ErpAvatarShape>('circle');
  readonly avatarCursor = signal<ErpAvatarCursor>('default');
  readonly avatarPresence = signal<ErpAvatarPresence>('online');
  readonly avatarPresencePosition = signal<ErpAvatarPresencePosition>('bottom-right');
  readonly avatarPresenceMotion = signal<ErpAvatarPresenceMotion>('breathe');
  readonly avatarHoverMotion = signal<ErpAvatarHoverMotion>('scale');
  readonly pickerSize = signal<ErpAvatarSize>('lg');
  readonly pickerShape = signal<ErpAvatarShape>('circle');
  readonly tabsOrientation = signal<ErpTabsOrientation>('horizontal');
  readonly tabsDistribution = signal<ErpTabsDistribution>('content');
  readonly tabsVariant = signal<ErpTabsVariant>('underline');
  readonly tabsShape = signal<ErpTabHeaderShape>('rounded');
  readonly tabsTransition = signal<ErpTabsTransition>('fade');
  readonly showSummary = signal(true);
  readonly showPageSize = signal(true);
  readonly showFirst = signal(true);
  readonly showPrevious = signal(true);
  readonly showPageNumbers = signal(true);
  readonly showNext = signal(true);
  readonly showLast = signal(true);
  readonly selectSizes: readonly ErpSelectSize[] = ['sm', 'md', 'lg'];
  readonly avatarSizes: readonly ErpAvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  readonly badgeToneOptions = this.options(['neutral', 'success', 'warning', 'danger', 'info']);
  readonly badgeSizeOptions = this.options(['sm', 'md', 'lg', 'xl']);
  readonly badgeShapeOptions = this.options(['square', 'rounded', 'pill']);
  readonly badgeWidthOptions = this.options(['content', 'stretch']);
  readonly avatarShapeOptions = this.options(['circle', 'rounded', 'square']);
  readonly avatarCursorOptions = this.options(['default', 'pointer']);
  readonly avatarPresenceOptions = this.options(['online', 'away', 'busy', 'offline']);
  readonly avatarPositionOptions = this.options([
    'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right',
  ]);
  readonly avatarMotionOptions = this.options(['none', 'pulse', 'ping', 'breathe']);
  readonly avatarHoverOptions = this.options(['none', 'scale', 'lift']);
  readonly avatarSizeOptions = this.options(['xs', 'sm', 'md', 'lg', 'xl']);
  readonly tabsOrientationOptions = this.options(['horizontal', 'vertical']);
  readonly tabsDistributionOptions = this.options(['content', 'fill']);
  readonly tabsVariantOptions = this.options(['underline', 'pills']);
  readonly tabsShapeOptions = this.options(['rectangle', 'rounded', 'circle']);
  readonly tabsTransitionOptions = this.options([
    'none', 'fade', 'fade-up', 'fade-down', 'fade-start', 'fade-end',
  ]);
  readonly avatarPositions: readonly {
    position: ErpAvatarPresencePosition;
    status: ErpAvatarPresence;
    motion: ErpAvatarPresenceMotion;
  }[] = [
    {position: 'top', status: 'online', motion: 'pulse'},
    {position: 'bottom', status: 'away', motion: 'ping'},
    {position: 'left', status: 'busy', motion: 'breathe'},
    {position: 'right', status: 'offline', motion: 'none'},
    {position: 'top-left', status: 'online', motion: 'ping'},
    {position: 'top-right', status: 'away', motion: 'breathe'},
    {position: 'bottom-left', status: 'busy', motion: 'pulse'},
    {position: 'bottom-right', status: 'offline', motion: 'none'},
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

  readonly tabs: readonly ErpTabItem[] = [
    {id: 'summary', label: 'الملخص', content: 'ملخص حركة الحساب خلال الفترة الحالية.', icon: 'dashboard'},
    {id: 'transactions', label: 'القيود', content: 'قائمة القيود المحاسبية المرتبطة بالحساب.', icon: 'operations'},
    {id: 'audit', label: 'سجل المراجعة', content: 'هذا التبويب معطل للمستخدم الحالي.', icon: 'history', disabled: true},
  ];

  readonly iconOnlyTabs: readonly ErpTabItem[] = [
    {id: 'overview', label: 'نظرة عامة', content: 'محتوى النظرة العامة.', icon: 'dashboard', headerPresentation: 'icon-only'},
    {id: 'history', label: 'السجل', content: 'محتوى سجل الحركة.', icon: 'history', headerPresentation: 'icon-only'},
  ];

  private options(values: readonly string[]): readonly ErpSelectOption[] {
    return values.map((value) => ({value, label: value}));
  }

}
