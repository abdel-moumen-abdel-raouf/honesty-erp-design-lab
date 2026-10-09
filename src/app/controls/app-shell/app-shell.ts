import {
  ChangeDetectionStrategy,
  Component,
  input,
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
  styleUrl: './app-shell.scss',
  host: {'[attr.data-app-shell-active]': 'activeNavigationId()'},
})
export class ErpAppShell {
  readonly navigationItems = input.required<readonly ErpNavigationItem[]>();
  readonly activeNavigationId = input<string | null>(null);
  readonly sidebarLabel = input('التنقل الرئيسي');
  readonly contentLabel = input('محتوى التطبيق');
  readonly quickActionGroups = input<readonly ErpQuickActionGroup[]>([]);
  readonly quickActionsLabel = input('الإجراءات السريعة');
  readonly footer = input<ErpAppShellFooterConfig | null>(null);
  readonly navigationActivated = output<ErpNavigationItem>();
  readonly quickActionActivated = output<string>();
  readonly footerActionActivated = output<string>();
}
