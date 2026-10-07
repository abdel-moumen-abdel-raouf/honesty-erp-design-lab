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
    {id: 'overview', label: 'Overview', content: 'Dashboard summary with KPIs, recent activity and quick actions.'},
    {id: 'orders', label: 'Orders', content: 'All purchase and sales orders in the current period.'},
    {id: 'invoices', label: 'Invoices', content: 'Incoming and outgoing invoice records with payment status.'},
    {id: 'customers', label: 'Customers', content: 'Customer directory with segments and contact details.'},
    {id: 'reports', label: 'Reports', content: 'Scheduled and ad-hoc reports across all modules.'},
  ];

  readonly iconTextTabs: readonly ErpTabItem[] = [
    {id: 'home', label: 'Home', icon: 'home'},
    {id: 'orders', label: 'Orders', icon: 'shopping-cart', count: 12, content: '12 orders pending fulfilment across 3 warehouses.'},
    {id: 'stock', label: 'Stock', icon: 'inventory', count: 4, content: '4 SKUs below reorder threshold.'},
    {id: 'reports', label: 'Reports', icon: 'chart', content: 'Financial and operational analytics.'},
    {id: 'alerts', label: 'Alerts', icon: 'notification', count: 23, content: '23 unread alerts from integrations and audits.'},
    {id: 'settings', label: 'Settings', icon: 'settings', content: 'System-wide configuration.'},
  ];

  readonly fillTabs: readonly ErpTabItem[] = [
    {id: 'day', label: 'Day', content: 'Hourly breakdown for today.'},
    {id: 'week', label: 'Week', content: 'Daily aggregation for the current week.'},
    {id: 'month', label: 'Month', content: 'Weekly aggregation for the current month.'},
    {id: 'year', label: 'Year', content: 'Monthly aggregation for the current year.'},
  ];

  readonly iconTabs: readonly ErpTabItem[] = [
    {id: 'home', label: 'Home', icon: 'home', content: 'Workspace home.'},
    {id: 'users', label: 'Users', icon: 'people', content: 'Directory and access management.'},
    {id: 'wallet', label: 'Wallet', icon: 'wallet', content: 'Accounts and balances.'},
    {id: 'chart', label: 'Chart', icon: 'chart', content: 'Analytics and BI.'},
    {id: 'shield', label: 'Shield', icon: 'shield', content: 'Security and audit.'},
    {id: 'gear', label: 'Gear', icon: 'settings', content: 'Configuration.'},
  ];

  readonly imageTabs: readonly ErpTabItem[] = [
    {id: 'amira', label: 'Amira H.', imageTone: 'brand', content: 'Finance Manager — 24 open tasks, 3 reviews.'},
    {id: 'omar', label: 'Omar N.', imageTone: 'success', content: 'Warehouse Lead — 18 open tasks, 5 pending.'},
    {id: 'leila', label: 'Leila M.', imageTone: 'warning', content: 'HR Business Partner — 12 open tasks.'},
    {id: 'youssef', label: 'Youssef K.', imageTone: 'purple', content: 'Senior Engineer — 6 open tasks, 2 PRs.'},
    {id: 'nadia', label: 'Nadia F.', imageTone: 'info', content: 'Procurement Officer — 9 open tasks.'},
  ];

  readonly pillTabs: readonly ErpTabItem[] = [
    {id: 'all', label: 'All', count: 128, content: 'Showing all 128 records.'},
    {id: 'active', label: 'Active', count: 94, content: '94 active records.'},
    {id: 'pending', label: 'Pending', count: 22, content: '22 records awaiting review.'},
    {id: 'archived', label: 'Archived', count: 12, content: '12 archived records.'},
  ];

  readonly solidTabs: readonly ErpTabItem[] = [
    {id: 'list', label: 'List', icon: 'file', content: 'Tabular data view.'},
    {id: 'grid', label: 'Grid', icon: 'dashboard', content: 'Card / grid view.'},
    {id: 'chart', label: 'Chart', icon: 'chart', content: 'Visual analytics.'},
    {id: 'map', label: 'Map', icon: 'home', content: 'Geographic distribution.'},
  ];

  readonly verticalTabs: readonly ErpTabItem[] = [
    {id: 'dashboard', label: 'Dashboard', icon: 'dashboard'},
    {id: 'orders', label: 'Orders', icon: 'shopping-cart', count: 12, content: 'Recent orders across all channels.'},
    {id: 'inventory', label: 'Inventory', icon: 'inventory', count: 4, content: 'Stock levels and reorder alerts.'},
    {id: 'customers', label: 'Customers', icon: 'people', content: 'Directory of active customers.'},
    {id: 'finance', label: 'Finance', icon: 'wallet', content: 'Accounts, payments and reconciliation.'},
    {id: 'reports', label: 'Reports', icon: 'chart', content: 'Scheduled and ad-hoc reports.'},
    {id: 'settings', label: 'Settings', icon: 'settings', content: 'System-wide configuration.'},
  ];

  readonly verticalIconTabs: readonly ErpTabItem[] = [
    {id: 'profile', label: 'Profile', icon: 'people', content: 'User profile and preferences.'},
    {id: 'security', label: 'Security', icon: 'shield', content: 'Password, 2FA and sessions.'},
    {id: 'notify', label: 'Notifications', icon: 'notification', content: 'Email and in-app alerts.'},
    {id: 'billing', label: 'Billing', icon: 'wallet', content: 'Plans, invoices and payment methods.'},
    {id: 'system', label: 'System', icon: 'settings', content: 'Advanced system settings.'},
  ];

  readonly animationTabs: readonly ErpTabItem[] = [
    {id: 'slide', label: 'Slide', content: 'Panels slide in from the inline-start direction — default.'},
    {id: 'fade', label: 'Fade', content: 'Simple opacity fade-in.'},
    {id: 'scale', label: 'Scale', content: 'Panels scale up from 94% to 100% with a spring ease.'},
    {id: 'none', label: 'None', content: 'Instant swap — useful for heavy content.'},
  ];
}
