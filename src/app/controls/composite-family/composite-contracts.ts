import {ErpIconName} from '../../primitives/icon/icon-contracts';

export interface ErpRadioGroupOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface ErpButtonGroupItem {
  readonly value: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
}

export type ErpButtonGroupOrientation = 'horizontal' | 'vertical';
export type ErpFabMenuPlacement = 'block-start' | 'block-end';
