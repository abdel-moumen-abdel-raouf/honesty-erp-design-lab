import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {ErpText} from '../../primitives/text/text';

export type ErpTableAlign = 'start' | 'center' | 'end';

export interface ErpTableColumn {
  readonly key: string;
  readonly header: string;
  readonly align?: ErpTableAlign;
}

export type ErpTableRow = Readonly<Record<string, string | number | null | undefined>>;

export interface ErpTableCellContext {
  readonly $implicit: ErpTableRow;
  readonly row: ErpTableRow;
  readonly value: string | number | null | undefined;
  readonly column: ErpTableColumn;
  readonly rowIndex: number;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpTableCell]',
})
export class ErpTableCell {
  readonly key = input.required<string>({alias: 'erpTableCell'});
  readonly template = inject<TemplateRef<ErpTableCellContext>>(TemplateRef);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-table',
  imports: [ErpText, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  host: {
    '[attr.data-table-compact]': 'compact()',
    '[attr.data-table-selectable]': 'selectable()',
  },
})
export class ErpTable {
  readonly caption = input.required<string>();
  readonly columns = input.required<readonly ErpTableColumn[]>();
  readonly rows = input<readonly ErpTableRow[]>([]);
  readonly rowKey = input('id');
  readonly emptyText = input('لا توجد بيانات متاحة');
  readonly compact = input(false, {transform: booleanAttribute});
  readonly selectable = input(false, {transform: booleanAttribute});
  readonly selectedKeys = input<readonly string[]>([]);
  readonly rowActivated = output<ErpTableRow>();

  private readonly cellTemplates = contentChildren(ErpTableCell);

  protected readonly selectedSet = computed(() => new Set(this.selectedKeys()));

  protected key(row: ErpTableRow, index: number): string {
    return String(row[this.rowKey()] ?? index);
  }

  protected activate(row: ErpTableRow): void {
    if (this.selectable()) this.rowActivated.emit(row);
  }

  protected cellTemplate(key: string): TemplateRef<ErpTableCellContext> | null {
    return this.cellTemplates().find((cell) => cell.key() === key)?.template ?? null;
  }

  protected cellContext(
    row: ErpTableRow,
    column: ErpTableColumn,
    rowIndex: number,
  ): ErpTableCellContext {
    return {$implicit: row, row, value: row[column.key], column, rowIndex};
  }
}
