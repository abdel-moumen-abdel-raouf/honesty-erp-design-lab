import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpButton} from '../../button/button';
import {ErpIconButton} from '../../icon-button/icon-button';
import {ErpTooltip} from '../../tooltip/tooltip';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpActionMenuItem} from '../composite-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-action-menu-content',
  imports: [ErpButton, ErpIconButton, ErpStack, ErpTooltip],
  templateUrl: './action-menu-content.html',
  styleUrl: './action-menu-content.scss',
})
export class ErpActionMenuContent {
  readonly label = input.required<string>();
  readonly items = input.required<readonly ErpActionMenuItem[]>();
  readonly itemSelected = output<string>();

  protected select(item: ErpActionMenuItem): void {
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
