import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpButton} from '../button/button';
import {
  ErpButtonGroupItem,
  ErpButtonGroupOrientation,
} from '../composite-family/composite-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-button-group',
  imports: [ErpButton],
  templateUrl: './button-group.html',
  styleUrl: './button-group.scss',
  host: {
    '[attr.data-button-group-orientation]': 'orientation()',
    '[attr.data-button-group-attached]': 'attached()',
  },
})
export class ErpButtonGroup {
  readonly items = input.required<readonly ErpButtonGroupItem[]>();
  readonly orientation = input<ErpButtonGroupOrientation>('horizontal');
  readonly attached = input(true, {transform: booleanAttribute});
  readonly itemPressed = output<string>();

  protected position(index: number): 'single' | 'first' | 'middle' | 'last' {
    if (this.items().length === 1) {
      return 'single';
    }

    if (index === 0) {
      return 'first';
    }

    return index === this.items().length - 1 ? 'last' : 'middle';
  }
}
