import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ErpButton} from '../../button/button';
import {ErpStack} from '../../../primitives/stack/stack';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../../shared/overlay/overlay-tokens';
import {ErpOverlayRef} from '../../../shared/overlay/overlay-ref';
import {ErpItemPickerOption} from '../../selection-family/selection-contracts';

export interface ErpActionMenuData {
  readonly items: readonly ErpItemPickerOption[];
  readonly theme: 'light' | 'dark';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-action-menu-content',
  imports: [ErpButton, ErpStack],
  templateUrl: './action-menu-content.html',
  styleUrl: './action-menu-content.scss',
})
export class ErpActionMenuContent {
  protected readonly data = inject(ERP_OVERLAY_DATA) as ErpActionMenuData;
  private readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<string>;
  protected select(item: ErpItemPickerOption): void { if (!item.disabled) this.ref.close(item.value); }
  protected cancel(): void { this.ref.dismiss('cancel'); }
  protected handleKeydown(event: KeyboardEvent): void {
    const buttons = [...(event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
    if (buttons.length === 0) return;
    const index = Math.max(0, buttons.indexOf(document.activeElement as HTMLButtonElement));
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      buttons[(index + delta + buttons.length) % buttons.length].focus();
    }
  }
}
