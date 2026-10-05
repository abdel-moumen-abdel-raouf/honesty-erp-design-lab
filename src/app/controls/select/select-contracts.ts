import {ErpIconName} from '../../primitives/icon/icon-contracts';

export type ErpSelectSize = 'sm' | 'md' | 'normal' | 'lg' | 'xlg';
export type ErpSelectSort = 'source' | 'ascending' | 'descending';
export type ErpSelectValue = string | readonly string[] | null;

export interface ErpSelectOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: ErpIconName;
  readonly imageUrl?: string;
  readonly group?: string;
  readonly keywords?: readonly string[];
  readonly disabled?: boolean;
}
