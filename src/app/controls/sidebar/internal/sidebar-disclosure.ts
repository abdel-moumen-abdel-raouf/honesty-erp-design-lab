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
  selector: 'erp-sidebar-disclosure',
  imports: [ErpIcon, ErpStatusBadge, ErpText],
  templateUrl: './sidebar-disclosure.html',
  styleUrl: './sidebar-disclosure.scss',
  host: {
    '[attr.data-sidebar-disclosure-active]': 'active()',
    '[attr.data-sidebar-disclosure-collapsed]': 'collapsed()',
  },
})
export class ErpSidebarDisclosure {
  readonly item = input.required<ErpNavigationItem>();
  readonly expanded = input(false, {transform: booleanAttribute});
  readonly active = input(false, {transform: booleanAttribute});
  readonly collapsed = input(false, {transform: booleanAttribute});
  readonly toggled = output<void>();
}
