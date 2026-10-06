import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

export type ErpSelectionTilePresentation = 'tile' | 'list' | 'select-option';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-selection-tile',
  templateUrl: './selection-tile.html',
  styleUrls: [
    './selection-tile.scss',
    './selection-tile-list.scss',
    './selection-tile-select-option.scss',
  ],
  host: {
    '[attr.data-selection-tile-selected]': 'selected()',
    '[attr.data-selection-tile-active]': 'active()',
    '[attr.data-selection-tile-disabled]': 'disabled()',
    '[attr.data-selection-tile-presentation]': 'presentation()',
  },
})
export class ErpSelectionTile {
  private readonly element = inject(ElementRef<HTMLElement>);
  readonly label = input.required<string>();
  readonly selected = input(false, {transform: booleanAttribute});
  readonly active = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly presentation = input<ErpSelectionTilePresentation>('tile');
  readonly tabIndex = input(0);
  readonly nativeId = input<string | null>(null);
  readonly activated = output<void>();
  readonly focused = output<void>();

  protected activate(): void {
    if (!this.disabled()) this.activated.emit();
  }

  focus(): void {
    this.element.nativeElement.querySelector('button')?.focus();
  }
}
