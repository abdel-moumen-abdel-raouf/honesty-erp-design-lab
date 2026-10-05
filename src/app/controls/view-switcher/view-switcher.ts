import {booleanAttribute, ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {ErpButtonGroup} from '../button-group/button-group';
import {ErpButtonGroupItem} from '../composite-family/composite-contracts';

export type ErpViewMode = 'table' | 'cards';

const VIEW_ITEMS: readonly ErpButtonGroupItem[] = [
  {value: 'table', label: 'عرض جدولي', icon: 'menu'},
  {value: 'cards', label: 'عرض بطاقات', icon: 'dashboard'},
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-view-switcher',
  imports: [ErpButtonGroup],
  templateUrl: './view-switcher.html',
  styleUrl: './view-switcher.scss',
  host: {'[attr.data-view-mode]': 'value()'},
})
export class ErpViewSwitcher {
  readonly value = model<ErpViewMode>('table');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly changed = output<ErpViewMode>();
  protected readonly items = VIEW_ITEMS;

  protected select(value: string): void {
    if (this.disabled() || (value !== 'table' && value !== 'cards')) return;
    this.value.set(value);
    this.changed.emit(value);
  }
}
