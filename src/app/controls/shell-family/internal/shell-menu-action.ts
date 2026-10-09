import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

export type ErpShellMenuActionPresentation = 'row' | 'tile';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- bounded internal semantic action owner.
  selector: 'erp-shell-menu-action',
  templateUrl: './shell-menu-action.html',
  styleUrl: './shell-menu-action.scss',
  host: {
    '[attr.data-shell-menu-action-presentation]': 'presentation()',
    '[attr.data-shell-menu-action-unread]': 'unread()',
    '[attr.data-shell-menu-action-disabled]': 'disabled()',
  },
})
export class ErpShellMenuAction {
  readonly label = input.required<string>();
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly unread = input(false, {transform: booleanAttribute});
  readonly presentation = input<ErpShellMenuActionPresentation>('row');
  readonly activated = output<void>();

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  focus(): void {
    this.element.nativeElement.querySelector<HTMLButtonElement>('button')?.focus();
  }

  contains(node: Element | null): boolean {
    return node !== null && this.element.nativeElement.contains(node);
  }

  protected activate(): void {
    if (!this.disabled()) {
      this.activated.emit();
    }
  }
}
