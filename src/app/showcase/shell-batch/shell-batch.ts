import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpAppShell} from '../../controls/app-shell/app-shell';
import {ErpBranchSelector} from '../../controls/branch-selector/branch-selector';
import {ErpBreadcrumbs} from '../../controls/breadcrumbs/breadcrumbs';
import {ErpButton} from '../../controls/button/button';
import {ErpGlobalSearch} from '../../controls/global-search/global-search';
import {ErpNotificationBell} from '../../controls/notification-bell/notification-bell';
import {ErpPageHeader} from '../../controls/page-header/page-header';
import {ErpPageShell} from '../../controls/page-shell/page-shell';
import {
  ErpBranchOption,
  ErpBreadcrumbItem,
  ErpGlobalSearchResult,
  ErpNavigationItem,
  ErpNotificationSummary,
  ErpShellUserSummary,
  ErpUserMenuItem,
} from '../../controls/shell-family/shell-contracts';
import {ErpSidebar} from '../../controls/sidebar/sidebar';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {ErpTopbar} from '../../controls/topbar/topbar';
import {ErpUserMenu} from '../../controls/user-menu/user-menu';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shell-batch',
  imports: [
    ErpAppShell,
    ErpBranchSelector,
    ErpBreadcrumbs,
    ErpButton,
    ErpContainer,
    ErpGlobalSearch,
    ErpGrid,
    ErpInline,
    ErpNotificationBell,
    ErpPageHeader,
    ErpPageShell,
    ErpSection,
    ErpSidebar,
    ErpStack,
    ErpStatusBadge,
    ErpSurface,
    ErpText,
    ErpTopbar,
    ErpUserMenu,
  ],
  templateUrl: './shell-batch.html',
  styleUrl: './shell-batch.scss',
})
export class ShellBatch {
  readonly activeNavigationId = signal('ledger');
  readonly activeBranchId = signal<string | null>('cairo');
  readonly globalQuery = signal('');
  readonly lastIntent = signal('لا توجد نية تنقل بعد');

  readonly breadcrumbs: readonly ErpBreadcrumbItem[] = [
    {id: 'home', label: 'الرئيسية', href: '/foundation/overview', icon: 'home'},
    {id: 'finance', label: 'المالية', href: '#finance'},
    {id: 'ledger', label: 'الحسابات العامة'},
  ];

  readonly navigationItems: readonly ErpNavigationItem[] = [
    {id: 'dashboard', label: 'لوحة المتابعة', icon: 'dashboard', href: '#dashboard'},
    {
      id: 'finance',
      label: 'المالية',
      icon: 'money',
      children: [
        {id: 'ledger', label: 'الحسابات العامة', href: '#ledger'},
        {id: 'approvals', label: 'الاعتمادات', href: '#approvals', badge: {label: '8', tone: 'warning'}},
      ],
    },
    {id: 'sales', label: 'المبيعات', icon: 'handshake', href: '#sales'},
    {id: 'purchases', label: 'المشتريات', icon: 'operations', href: '#purchases'},
    {id: 'inventory', label: 'المخزون', icon: 'inventory', href: '#inventory'},
    {id: 'settings', label: 'الإعدادات', icon: 'settings', href: '#settings', disabled: true},
  ];

  readonly branches: readonly ErpBranchOption[] = [
    {id: 'cairo', label: 'فرع القاهرة', description: 'المركز الرئيسي'},
    {id: 'alexandria', label: 'فرع الإسكندرية'},
    {id: 'mansoura', label: 'فرع المنصورة'},
  ];

  readonly searchResults: readonly ErpGlobalSearchResult[] = [
    {id: 'invoice-1042', label: 'فاتورة 1042', category: 'المبيعات', icon: 'file'},
    {id: 'supplier-alfa', label: 'شركة ألفا', category: 'الموردون', icon: 'building'},
    {id: 'journal-88', label: 'قيد يومية 88', category: 'الحسابات العامة', icon: 'money'},
  ];

  readonly notifications: readonly ErpNotificationSummary[] = [
    {id: 'invoice-approval', title: 'فاتورتان تنتظران الاعتماد', description: 'المبيعات — فرع القاهرة', icon: 'file'},
    {id: 'journal-posted', title: 'تم ترحيل قيد اليومية', description: 'القيد رقم 88', icon: 'success', read: true},
  ];

  readonly user: ErpShellUserSummary = {
    displayName: 'أحمد عبد الرحمن',
    secondaryText: 'مدير النظام',
  };

  readonly userMenuItems: readonly ErpUserMenuItem[] = [
    {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
    {id: 'preferences', label: 'التفضيلات', icon: 'settings'},
    {id: 'logout', label: 'تسجيل الخروج', icon: 'logout', tone: 'danger'},
  ];

  navigate(item: ErpNavigationItem): void {
    this.activeNavigationId.set(item.id);
    this.lastIntent.set(`نية تنقل: ${item.label}`);
  }
}
