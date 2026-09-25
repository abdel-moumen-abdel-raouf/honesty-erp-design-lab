import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {ErpButton} from '../button/button';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpItemPickerOption} from '../selection-family/selection-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {
  ErpActionMenuContent,
  ErpActionMenuData,
} from '../composite-family/internal/action-menu-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-split-button',
  imports: [ErpButton, ErpIconButton],
  templateUrl: './split-button.html',
  styleUrl: './split-button.scss',
  host: {'[attr.data-split-button-disabled]': 'disabled()'},
})
export class ErpSplitButton {
  readonly label = input.required<string>();
  readonly items = input.required<readonly ErpItemPickerOption[]>();
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly primaryPressed = output<void>();
  readonly itemSelected = output<string>();

  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private menuRef: ErpOverlayRef<string> | null = null;

  protected openMenu(): void {
    if (this.disabled() || this.menuRef !== null) {
      return;
    }

    const theme = this.host.nativeElement
      .closest<HTMLElement>('[data-theme]')
      ?.dataset['theme'];
    const ref = this.overlays.open<
      ErpActionMenuContent,
      ErpActionMenuData,
      string
    >(ErpActionMenuContent, {
      label: `${this.label()} menu`,
      size: 'sm',
      initialFocus: '[data-action-item] button',
      data: {
        items: this.items(),
        theme: theme === 'dark' ? 'dark' : 'light',
      } satisfies ErpActionMenuData,
    });

    this.menuRef = ref;
    void ref.afterClosed.then((result) => {
      if (result.type === 'closed' && result.result !== undefined) {
        this.itemSelected.emit(result.result);
      }

      if (this.menuRef === ref) {
        this.menuRef = null;
      }
    });
  }
}
