import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ErpIcon} from '../../../primitives/icon/icon';

export type ErpStatusBadgeActionKind = 'main' | 'remove';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal StatusBadge semantic action owner.
  selector: 'erp-status-badge-action',
  imports: [ErpIcon],
  templateUrl: './status-badge-action.html',
  styleUrl: './status-badge-action.scss',
  host: {
    '[attr.data-status-badge-action]': 'kind()',
  },
})
export class ErpStatusBadgeAction {
  readonly kind = input.required<ErpStatusBadgeActionKind>();
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly pressed = input(false);
  readonly action = output<MouseEvent>();
}
