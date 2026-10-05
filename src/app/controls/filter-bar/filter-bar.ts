import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ErpButton} from '../button/button';
import {ErpDataFilter} from '../data-table/data-table-contracts';
import {ErpStatusBadge} from '../status-badge/status-badge';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-filter-bar',
  imports: [ErpButton, ErpStatusBadge],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  host: {'[attr.data-filter-count]': 'filters().length'},
})
export class ErpFilterBar {
  readonly filters = input<readonly ErpDataFilter[]>([]);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly filterRemoved = output<string>();
  readonly resetRequested = output<void>();
  readonly applyRequested = output<void>();
}
