import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import {ErpDataColumn, ErpDataFilter, ErpDataFilterDefinition, ErpDataSort, ErpSmartTableMode, ErpSmartTableQuery} from '../data-table/data-table-contracts';
import {ErpPageHeader} from '../page-header/page-header';
import {ErpPageShell} from '../page-shell/page-shell';
import {ErpPage, ErpPageScrollMode, ErpPageWidthMode} from '../page/page';
import {ErpSmartTable} from '../smart-table/smart-table';
import {ErpTableCell, ErpTableRow} from '../table/table';

export type ErpDataPageSlotName = 'breadcrumbs' | 'meta' | 'secondary' | 'primary' | 'bulk-actions' | 'side' | 'footer';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- Public ERP projection markers intentionally use the erp prefix.
  selector: '[erpDataPageBreadcrumbs],[erpDataPageMeta],[erpDataPageSecondary],[erpDataPagePrimary],[erpDataPageBulkActions],[erpDataPageSide],[erpDataPageFooter]',
})
export class ErpDataPageSlot {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly slot: ErpDataPageSlotName = this.resolveSlot();

  private resolveSlot(): ErpDataPageSlotName {
    const markers: readonly [string, ErpDataPageSlotName][] = [
      ['erpDataPageBreadcrumbs', 'breadcrumbs'],
      ['erpDataPageMeta', 'meta'],
      ['erpDataPageSecondary', 'secondary'],
      ['erpDataPagePrimary', 'primary'],
      ['erpDataPageBulkActions', 'bulk-actions'],
      ['erpDataPageSide', 'side'],
      ['erpDataPageFooter', 'footer'],
    ];
    return markers.find(([attribute]) => this.element.hasAttribute(attribute))?.[1] ?? 'meta';
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Public ERP components intentionally use the erp prefix.
  selector: 'erp-data-page',
  imports: [ErpPage, ErpPageHeader, ErpPageShell, ErpSmartTable],
  templateUrl: './data-page.html',
  styleUrl: './data-page.scss',
  host: {
    '[attr.data-data-page-mode]': 'mode()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class ErpDataPage {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
  readonly caption = input.required<string>();
  readonly columns = input.required<readonly ErpDataColumn[]>();
  readonly rows = input<readonly ErpTableRow[]>([]);
  readonly mode = input<ErpSmartTableMode>('local');
  readonly rowKey = input('id');
  readonly loading = input(false, {transform: booleanAttribute});
  readonly error = input<string | null>(null);
  readonly totalItems = input<number | null>(null);
  readonly selectable = input(false, {transform: booleanAttribute});
  readonly compact = input(false, {transform: booleanAttribute});
  readonly filterDefinitions = input<readonly ErpDataFilterDefinition[]>([]);
  readonly pageSizeOptions = input<readonly number[]>([10, 25, 50, 100]);
  readonly widthMode = input<ErpPageWidthMode>('fluid');
  readonly scrollMode = input<ErpPageScrollMode>('document');
  readonly showSide = input(false, {transform: booleanAttribute});
  readonly showFooter = input(false, {transform: booleanAttribute});

  readonly page = model(1);
  readonly pageSize = model(25);
  readonly sort = model<ErpDataSort | null>(null);
  readonly filters = model<readonly ErpDataFilter[]>([]);
  readonly visibleColumns = model<readonly string[]>([]);
  readonly selectedKeys = model<readonly string[]>([]);

  readonly queryChanged = output<ErpSmartTableQuery>();
  readonly rowActivated = output<ErpTableRow>();
  readonly refreshRequested = output<void>();
  readonly exportRequested = output<void>();

  protected readonly cellDefinitions = contentChildren(ErpTableCell);
  protected readonly projectedSlots = contentChildren(ErpDataPageSlot);

  protected hasSlot(slot: ErpDataPageSlotName): boolean {
    return this.projectedSlots().some((candidate) => candidate.slot === slot);
  }
}
