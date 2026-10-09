import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import {ErpNavigationItem} from '../shell-family/shell-contracts';
import {ErpAppFooter, ErpAppFooterAction} from '../app-footer/app-footer';
import {
  ErpQuickActionGroup,
  ErpQuickActionsBar,
} from '../quick-actions-bar/quick-actions-bar';
import {ErpSidebar} from '../sidebar/sidebar';
import {ErpStatusBadgeTone} from '../status-badge/status-badge';
import {ErpTopbar} from '../topbar/topbar';

export interface ErpAppShellFooterConfig {
  readonly applicationLabel?: string | null;
  readonly versionLabel?: string | null;
  readonly statusLabel?: string | null;
  readonly statusTone?: ErpStatusBadgeTone;
  readonly actions?: readonly ErpAppFooterAction[];
  readonly ariaLabel?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-app-shell',
  imports: [ErpAppFooter, ErpQuickActionsBar, ErpSidebar, ErpTopbar],
  templateUrl: './app-shell.html',
  styleUrls: ['./app-shell.scss', './app-shell-responsive.scss'],
  host: {
    '[attr.data-app-shell-active]': 'activeNavigationId()',
    '[attr.data-app-shell-sidebar-collapsed]': 'sidebarCollapsed()',
    '[attr.data-app-shell-sidebar-open]': 'sidebarOpen()',
    '[attr.data-app-shell-viewport]': 'viewport()',
  },
})
export class ErpAppShell {
  readonly navigationItems = input.required<readonly ErpNavigationItem[]>();
  readonly activeNavigationId = input<string | null>(null);
  readonly sidebarLabel = input('التنقل الرئيسي');
  readonly contentLabel = input('محتوى التطبيق');
  readonly quickActionGroups = input<readonly ErpQuickActionGroup[]>([]);
  readonly quickActionsLabel = input('الإجراءات السريعة');
  readonly footer = input<ErpAppShellFooterConfig | null>(null);
  readonly viewport = input(false, {transform: booleanAttribute});
  readonly sidebarOpen = model(false);
  readonly sidebarCollapsed = model(false);
  readonly navigationActivated = output<ErpNavigationItem>();
  readonly quickActionActivated = output<string>();
  readonly footerActionActivated = output<string>();

  protected handleSidebarToggle(collapsed: boolean): void {
    if (this.sidebarOpen()) {
      this.sidebarOpen.set(false);
      this.sidebarCollapsed.set(false);
      return;
    }

    this.sidebarCollapsed.set(collapsed);
  }
}
