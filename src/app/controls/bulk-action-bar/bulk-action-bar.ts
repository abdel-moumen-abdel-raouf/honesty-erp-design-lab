import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-bulk-action-bar',
  imports: [ErpButton, ErpText],
  templateUrl: './bulk-action-bar.html',
  styleUrl: './bulk-action-bar.scss',
  host: {'[attr.data-selected-count]': 'selectedCount()'},
})
export class ErpBulkActionBar {
  readonly selectedCount = input(0);
  readonly clearSelection = output<void>();
  protected readonly effectiveCount = computed(() => Math.max(0, Math.floor(this.selectedCount())));
}
