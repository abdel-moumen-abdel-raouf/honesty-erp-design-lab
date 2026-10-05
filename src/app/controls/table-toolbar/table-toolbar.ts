import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-table-toolbar',
  imports: [ErpButton, ErpText],
  templateUrl: './table-toolbar.html',
  styleUrl: './table-toolbar.scss',
})
export class ErpTableToolbar {
  readonly label = input('أدوات الجدول');
  readonly showRefresh = input(true, {transform: booleanAttribute});
  readonly showExport = input(false, {transform: booleanAttribute});
  readonly refreshing = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly refreshRequested = output<void>();
  readonly exportRequested = output<void>();
}
