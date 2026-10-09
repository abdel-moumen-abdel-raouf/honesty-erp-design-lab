import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpText} from '../../../primitives/text/text';
import {ErpStatusBadge} from '../../status-badge/status-badge';
import {ErpNavigationItem} from '../../shell-family/shell-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- bounded internal Sidebar semantic owner.
  selector: 'erp-sidebar-link',
  imports: [ErpIcon, ErpStatusBadge, ErpText],
  templateUrl: './sidebar-link.html',
  styleUrl: './sidebar-link.scss',
  host: {
    '[attr.data-sidebar-link-active]': 'active()',
    '[attr.data-sidebar-link-collapsed]': 'collapsed()',
  },
})
export class ErpSidebarLink {
  readonly item = input.required<ErpNavigationItem>();
  readonly active = input(false, {transform: booleanAttribute});
  readonly collapsed = input(false, {transform: booleanAttribute});
  readonly activated = output<ErpNavigationItem>();

  protected activate(event: MouseEvent): void {
    if (this.item().disabled) {
      event.preventDefault();
      return;
    }

    this.activated.emit(this.item());
  }
}
