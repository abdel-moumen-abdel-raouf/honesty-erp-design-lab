import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpIconName} from '../../../primitives/icon/icon-contracts';
import {ErpText} from '../../../primitives/text/text';

export type ErpSelectActionKind =
  | 'clear'
  | 'chip-remove'
  | 'search-clear'
  | 'footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal Select semantic action owner.
  selector: 'erp-select-action',
  imports: [ErpIcon, ErpText],
  templateUrl: './select-action.html',
  styleUrl: './select-action.scss',
  host: {
    '[attr.data-select-action-kind]': 'kind()',
  },
})
export class ErpSelectAction {
  readonly kind = input.required<ErpSelectActionKind>();
  readonly label = input.required<string>();
  readonly icon = input<ErpIconName | null>(null);
  readonly tabIndex = input(0);
  readonly activated = output<MouseEvent>();

  protected activate(event: MouseEvent): void {
    event.stopPropagation();
    this.activated.emit(event);
  }
}
