import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpButton} from '../../button/button';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpItemPickerOption} from '../../selection-family/selection-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-action-menu-content',
  imports: [ErpButton, ErpStack],
  templateUrl: './action-menu-content.html',
  styleUrl: './action-menu-content.scss',
})
export class ErpActionMenuContent {
  readonly items = input.required<readonly ErpItemPickerOption[]>();
  readonly itemSelected = output<string>();

  protected select(item: ErpItemPickerOption): void {
    if (!item.disabled) {
      this.itemSelected.emit(item.value);
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const buttons = [
      ...(event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[data-action-item] button:not([disabled])',
      ),
    ];

    if (buttons.length === 0) {
      return;
    }

    const index = Math.max(
      0,
      buttons.indexOf(document.activeElement as HTMLButtonElement),
    );

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      buttons[(index + delta + buttons.length) % buttons.length].focus();
    }
  }
}
