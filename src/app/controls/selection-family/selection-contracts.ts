import {ErpIconName} from '../../primitives/icon/icon-contracts';

export interface ErpItemPickerOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly icon?: ErpIconName;
}

export type ErpSelectionPickerMode = 'color' | 'icon' | 'item' | 'combo';

export interface ErpSelectionPickerData {
  readonly mode: ErpSelectionPickerMode;
  readonly value: string | null;
  readonly items: readonly ErpItemPickerOption[];
  readonly query: string;
  readonly searchable: boolean;
  readonly clearable: boolean;
  readonly theme: 'light' | 'dark';
}
