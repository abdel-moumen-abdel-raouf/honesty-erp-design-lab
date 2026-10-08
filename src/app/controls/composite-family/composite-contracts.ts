import {ErpIconName} from '../../primitives/icon/icon-contracts';

export interface ErpRadioGroupOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
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

export type ErpActionMenuItemPresentation =
  | 'text'
  | 'icon'
  | 'icon-text';

export interface ErpActionMenuItem {
  readonly value: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
  readonly presentation?: ErpActionMenuItemPresentation;
}
