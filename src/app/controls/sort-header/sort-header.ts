import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpSortDirection} from '../data-table/data-table-contracts';
import {ErpSortTrigger} from './internal/sort-trigger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-sort-header',
  imports: [ErpIcon, ErpSortTrigger, ErpText],
  templateUrl: './sort-header.html',
  styleUrl: './sort-header.scss',
  host: {'[attr.data-sort-direction]': 'direction()'},
})
export class ErpSortHeader {
  readonly label = input.required<string>();
  readonly direction = input<ErpSortDirection>('none');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly sortChange = output<ErpSortDirection>();

  protected readonly nextDirection = computed<ErpSortDirection>(() =>
    this.direction() === 'none'
      ? 'ascending'
      : this.direction() === 'ascending'
        ? 'descending'
        : 'none',
  );
  protected readonly accessibleLabel = computed(() => {
    const state = {none: 'غير مرتب', ascending: 'تصاعدي', descending: 'تنازلي'}[this.direction()];
    return `${this.label()} — ${state}`;
  });

  protected requestSort(): void {
    if (!this.disabled()) this.sortChange.emit(this.nextDirection());
  }
}
