import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {ErpAlert} from '../alert/alert';
import {ErpBulkActionBar} from '../bulk-action-bar/bulk-action-bar';
import {ErpColumnChooser} from '../column-chooser/column-chooser';
import {
  ErpDataColumn,
  ErpDataFilter,
  ErpDataFilterDefinition,
  ErpDataSort,
  ErpSmartTableMode,
  ErpSmartTableQuery,
} from '../data-table/data-table-contracts';
import {ErpEmptyState} from '../empty-state/empty-state';
import {ErpFilterBar} from '../filter-bar/filter-bar';
import {ErpFilterDrawer} from '../filter-drawer/filter-drawer';
import {ErpPagination} from '../pagination/pagination';
import {ErpSkeleton} from '../skeleton/skeleton';
import {
  ErpTable,
  ErpTableCell,
  ErpTableColumn,
  ErpTableRow,
  ErpTableSort,
} from '../table/table';
import {ErpTableToolbar} from '../table-toolbar/table-toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-smart-table',
  imports: [
    ErpAlert,
    ErpBulkActionBar,
    ErpColumnChooser,
    ErpEmptyState,
    ErpFilterBar,
    ErpFilterDrawer,
    ErpPagination,
    ErpSkeleton,
    ErpTable,
    ErpTableToolbar,
  ],
  templateUrl: './smart-table.html',
  styleUrl: './smart-table.scss',
  host: {
    '[attr.data-smart-table-mode]': 'mode()',
    '[attr.data-smart-table-query-revision]': 'queryRevision()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class ErpSmartTable {
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
  readonly cellDefinitions = input<readonly ErpTableCell[]>([]);

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

  protected readonly projectedCellDefinitions = contentChildren(ErpTableCell);
  protected readonly effectiveCellDefinitions = computed(() =>
    this.cellDefinitions().length > 0
      ? this.cellDefinitions()
      : this.projectedCellDefinitions(),
  );

  protected readonly queryRevision = signal(0);
  protected readonly effectiveVisibleKeys = computed(() => {
    const requested = this.visibleColumns();
    if (requested.length === 0) return this.columns().map((column) => column.key);
    const keys = new Set(requested);
    for (const column of this.columns()) {
      if (column.required || column.hideable === false) keys.add(column.key);
    }
    return this.columns().filter((column) => keys.has(column.key)).map((column) => column.key);
  });
  protected readonly visibleColumnDefinitions = computed(() => {
    const visible = new Set(this.effectiveVisibleKeys());
    return this.columns().filter((column) => visible.has(column.key));
  });
  protected readonly tableColumns = computed<readonly ErpTableColumn[]>(() =>
    this.visibleColumnDefinitions().map((column) => ({
      key: column.key,
      header: column.label,
      align: column.align,
      sortable: column.sortable,
      overflow: column.overflow,
      resizable: column.resizable,
      initialWidth: column.initialWidth,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
    })),
  );
  protected readonly filteredRows = computed(() => {
    if (this.mode() === 'remote') return this.rows();
    const filters = this.filters().filter((filter) => filter.value.trim().length > 0);
    if (filters.length === 0) return this.rows();
    return this.rows().filter((row) =>
      filters.every((filter) =>
        String(row[filter.key] ?? '')
          .toLocaleLowerCase()
          .includes(filter.value.trim().toLocaleLowerCase()),
      ),
    );
  });
  protected readonly sortedRows = computed(() => {
    const rows = [...this.filteredRows()];
    const sort = this.sort();
    if (this.mode() === 'remote' || sort === null) return rows;
    const factor = sort.direction === 'ascending' ? 1 : -1;
    return rows.sort((left, right) =>
      String(left[sort.key] ?? '').localeCompare(String(right[sort.key] ?? ''), 'ar', {
        numeric: true,
      }) * factor,
    );
  });
  protected readonly effectiveTotalItems = computed(() =>
    this.mode() === 'local'
      ? this.sortedRows().length
      : Math.max(0, this.totalItems() ?? this.rows().length),
  );
  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.effectiveTotalItems() / this.normalizedPageSize())),
  );
  protected readonly effectivePage = computed(() =>
    Math.min(Math.max(1, Math.floor(this.page())), this.pageCount()),
  );
  protected readonly displayedRows = computed(() => {
    if (this.mode() === 'remote') return this.rows();
    const start = (this.effectivePage() - 1) * this.normalizedPageSize();
    return this.sortedRows().slice(start, start + this.normalizedPageSize());
  });
  private normalizedPageSize(): number {
    const value = this.pageSize();
    return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 25;
  }

  protected changeSort(sort: ErpTableSort | null): void {
    this.sort.set(sort);
    this.page.set(1);
    this.emitQuery();
  }

  protected changePage(page: number): void {
    this.page.set(page);
    this.emitQuery();
  }

  protected changePageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.page.set(1);
    this.emitQuery();
  }

  protected changeFilters(filters: readonly ErpDataFilter[]): void {
    this.filters.set(filters);
    this.page.set(1);
    this.emitQuery();
  }

  protected removeFilter(key: string): void {
    this.changeFilters(this.filters().filter((filter) => filter.key !== key));
  }

  protected changeVisibleColumns(keys: readonly string[]): void {
    this.visibleColumns.set(keys);
    this.emitQuery();
  }

  protected resetColumns(): void {
    this.visibleColumns.set([]);
    this.emitQuery();
  }

  protected activateRow(row: ErpTableRow): void {
    this.rowActivated.emit(row);
  }

  protected changeSelection(keys: readonly string[]): void {
    this.selectedKeys.set(keys);
  }

  protected clearSelection(): void {
    this.selectedKeys.set([]);
  }

  protected applyCurrentFilters(): void {
    this.page.set(1);
    this.emitQuery();
  }

  private emitQuery(): void {
    const revision = this.queryRevision() + 1;
    this.queryRevision.set(revision);
    this.queryChanged.emit({
      revision,
      page: this.page(),
      pageSize: this.normalizedPageSize(),
      sort: this.sort(),
      filters: this.filters(),
      visibleColumns: this.effectiveVisibleKeys(),
    });
  }
}
