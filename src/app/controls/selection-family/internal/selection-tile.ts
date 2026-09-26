import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-selection-tile',
  templateUrl: './selection-tile.html',
  styleUrl: './selection-tile.scss',
  host: {
    '[attr.data-selection-tile-selected]': 'selected()',
    '[attr.data-selection-tile-active]': 'active()',
    '[attr.data-selection-tile-disabled]': 'disabled()',
  },
})
export class ErpSelectionTile {
  readonly label = input.required<string>();
  readonly selected = input(false, {transform: booleanAttribute});
  readonly active = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly activated = output<void>();

  protected activate(): void {
    if (!this.disabled()) this.activated.emit();
  }
}
