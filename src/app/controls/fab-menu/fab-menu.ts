import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpExtendedFab} from '../extended-fab/extended-fab';
import {ErpFab} from '../fab/fab';
import {ErpItemPickerOption} from '../selection-family/selection-contracts';
import {ErpFabMenuPlacement} from '../composite-family/composite-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-fab-menu',
  imports: [ErpExtendedFab, ErpFab],
  templateUrl: './fab-menu.html',
  styleUrl: './fab-menu.scss',
  host: {
    '[attr.data-fab-menu-open]': 'open()',
    '[attr.data-fab-menu-placement]': 'placement()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ErpFabMenu {
  readonly label = input.required<string>();
  readonly icon = input<ErpIconName>('add');
  readonly items = input.required<readonly ErpItemPickerOption[]>();
  readonly placement = input<ErpFabMenuPlacement>('block-start');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly itemSelected = output<string>();
  readonly open = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.open.update((value) => !value);
    if (this.open()) {
      queueMicrotask(() => this.actionButtons()[0]?.focus());
    }
  }

  protected select(item: ErpItemPickerOption): void {
    if (item.disabled) {
      return;
    }

    this.itemSelected.emit(item.value);
    this.open.set(false);
    queueMicrotask(() => this.triggerButton()?.focus());
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      this.open.set(false);
      queueMicrotask(() => this.triggerButton()?.focus());
      return;
    }

    if (!this.open() || !['ArrowDown', 'ArrowUp'].includes(event.key)) {
      return;
    }

    const buttons = this.actionButtons();
    if (buttons.length === 0) {
      return;
    }

    event.preventDefault();
    const current = Math.max(
      0,
      buttons.indexOf(document.activeElement as HTMLButtonElement),
    );
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    buttons[(current + delta + buttons.length) % buttons.length].focus();
  }

  private actionButtons(): HTMLButtonElement[] {
    return [...this.host.nativeElement.querySelectorAll<HTMLButtonElement>('[data-fab-menu-action] button:not([disabled])')];
  }

  private triggerButton(): HTMLButtonElement | null {
    return this.host.nativeElement.querySelector('[data-fab-menu-trigger] button');
  }
}
