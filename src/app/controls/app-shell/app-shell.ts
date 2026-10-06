import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpNavigationItem} from '../shell-family/shell-contracts';
import {ErpSidebar} from '../sidebar/sidebar';
import {ErpTopbar} from '../topbar/topbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-app-shell',
  imports: [ErpSidebar, ErpTopbar],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  host: {'[attr.data-app-shell-active]': 'activeNavigationId()'},
})
export class ErpAppShell {
  readonly navigationItems = input.required<readonly ErpNavigationItem[]>();
  readonly activeNavigationId = input<string | null>(null);
  readonly sidebarLabel = input('التنقل الرئيسي');
  readonly contentLabel = input('محتوى التطبيق');
  readonly navigationActivated = output<ErpNavigationItem>();
}
