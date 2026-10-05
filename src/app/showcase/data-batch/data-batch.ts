import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpBulkActionBar} from '../../controls/bulk-action-bar/bulk-action-bar';
import {ErpButton} from '../../controls/button/button';
import {ErpColumnChooser} from '../../controls/column-chooser/column-chooser';
import {
  ErpDataColumn,
  ErpDataFilter,
  ErpDataFilterDefinition,
  ErpSmartTableQuery,
} from '../../controls/data-table/data-table-contracts';
import {ErpFilterBar} from '../../controls/filter-bar/filter-bar';
import {ErpFilterDrawer} from '../../controls/filter-drawer/filter-drawer';
import {ErpSmartTable} from '../../controls/smart-table/smart-table';
import {ErpSortHeader} from '../../controls/sort-header/sort-header';
import {ErpTableRow} from '../../controls/table/table';
import {ErpTableToolbar} from '../../controls/table-toolbar/table-toolbar';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {ErpViewMode, ErpViewSwitcher} from '../../controls/view-switcher/view-switcher';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-data-batch',
  imports: [
    ErpBulkActionBar,
    ErpButton,
    ErpColumnChooser,
    ErpContainer,
    ErpFilterBar,
    ErpFilterDrawer,
    ErpGrid,
    ErpSection,
    ErpSmartTable,
    ErpSortHeader,
    ErpStack,
    ErpSurface,
    ErpTableToolbar,
    ErpText,
    ErpTextBox,
    ErpViewSwitcher,
  ],
  templateUrl: './data-batch.html',
  styleUrl: './data-batch.scss',
})
export class DataBatch {
  readonly sortDirection = signal<'none' | 'ascending' | 'descending'>('none');
  readonly visibleColumns = signal<readonly string[]>(['code', 'name', 'city', 'balance']);
  readonly filters = signal<readonly ErpDataFilter[]>([
    {key: 'city', label: 'المدينة', value: 'القاهرة'},
  ]);
  readonly viewMode = signal<ErpViewMode>('table');
  readonly selectedKeys = signal<readonly string[]>(['2', '4']);
  readonly lastQuery = signal<ErpSmartTableQuery | null>(null);
  readonly nameSort = {key: 'name', direction: 'ascending'} as const;

  readonly columns: readonly ErpDataColumn[] = [
    {key: 'code', label: 'الكود', sortable: true, required: true, hideable: false},
    {key: 'name', label: 'العميل', sortable: true, required: true},
    {key: 'city', label: 'المدينة', sortable: true},
    {key: 'balance', label: 'الرصيد', sortable: true, align: 'end'},
    {key: 'status', label: 'الحالة', align: 'center'},
  ];
  readonly filterDefinitions: readonly ErpDataFilterDefinition[] = [
    {key: 'name', label: 'اسم العميل', placeholder: 'ابحث باسم العميل'},
    {key: 'city', label: 'المدينة', placeholder: 'اكتب اسم المدينة'},
    {key: 'status', label: 'الحالة', placeholder: 'نشط أو مراجعة'},
  ];
  readonly rows: readonly ErpTableRow[] = [
    {id: '1', code: 'C-1001', name: 'شركة النور', city: 'القاهرة', balance: '42,500.00', status: 'نشط'},
    {id: '2', code: 'C-1002', name: 'مؤسسة الأفق', city: 'الإسكندرية', balance: '18,750.00', status: 'مراجعة'},
    {id: '3', code: 'C-1003', name: 'مجموعة البيان', city: 'القاهرة', balance: '63,100.00', status: 'نشط'},
    {id: '4', code: 'C-1004', name: 'شركة المدى', city: 'المنصورة', balance: '27,900.00', status: 'متوقف'},
    {id: '5', code: 'C-1005', name: 'مكتب الرؤية', city: 'القاهرة', balance: '11,350.00', status: 'نشط'},
  ];

  removeFilter(key: string): void {
    this.filters.update((filters) => filters.filter((filter) => filter.key !== key));
  }

  resetVisibleColumns(): void {
    this.visibleColumns.set(this.columns.map((column) => column.key));
  }
}
