import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpTableAlign, ErpTableRow} from '../table/table';

export type ErpSortDirection = 'none' | 'ascending' | 'descending';

export interface ErpDataColumn {
  readonly key: string;
  readonly label: string;
  readonly align?: ErpTableAlign;
  readonly sortable?: boolean;
  readonly hideable?: boolean;
  readonly required?: boolean;
}

export interface ErpDataFilter {
  readonly key: string;
  readonly label: string;
  readonly value: string;
}

export interface ErpDataFilterDefinition {
  readonly key: string;
  readonly label: string;
  readonly placeholder?: string;
}

export interface ErpDataSort {
  readonly key: string;
  readonly direction: Exclude<ErpSortDirection, 'none'>;
}

export type ErpSmartTableMode = 'local' | 'remote';

export interface ErpSmartTableQuery {
  readonly revision: number;
  readonly page: number;
  readonly pageSize: number;
  readonly sort: ErpDataSort | null;
  readonly filters: readonly ErpDataFilter[];
  readonly visibleColumns: readonly string[];
}

export interface ErpBulkAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
}

export interface ErpSmartTableState {
  readonly rows: readonly ErpTableRow[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly totalItems: number | null;
}
