import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ErpButton} from '../button/button';
import {ErpSortDirection} from '../data-table/data-table-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-sort-header',
  imports: [ErpButton],
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
  protected readonly icon = computed(() =>
    this.direction() === 'descending'
        ? 'sort-descending' as const
        : 'sort-ascending' as const,
  );

  protected requestSort(): void {
    if (!this.disabled()) this.sortChange.emit(this.nextDirection());
  }
}
