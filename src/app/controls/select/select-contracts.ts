import {ErpIconName} from '../../primitives/icon/icon-contracts';

export type ErpSelectSize = 'sm' | 'md' | 'normal' | 'lg' | 'xlg';
export type ErpSelectSort = 'source' | 'ascending' | 'descending';
export type ErpSelectSortMode = 'none' | 'label' | 'custom';
export type ErpSelectAppearance = 'outline' | 'filled' | 'ghost';
export type ErpSelectPlacement = 'bottom' | 'top';
export type ErpSelectValue = string | readonly string[] | null;

export interface ErpSelectOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: ErpIconName;
  readonly imageUrl?: string;
  readonly group?: string;
  readonly meta?: string;
  readonly keywords?: readonly string[];
  readonly disabled?: boolean;
  readonly hidden?: boolean;
}

export type ErpSelectRenderRow =
  | {readonly kind: 'group'; readonly label: string}
  | {readonly kind: 'option'; readonly option: ErpSelectOption};
