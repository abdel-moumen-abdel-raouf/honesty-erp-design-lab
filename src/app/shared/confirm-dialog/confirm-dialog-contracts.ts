import {ErpIconName} from '../../primitives/icon/icon-contracts';

export type ErpConfirmDialogIntent =
  | 'default'
  | 'warning'
  | 'danger';

export interface ErpConfirmDialogConfig {
  readonly title: string;
  readonly message: string;
  readonly subtitle?: string;
  readonly details?: string | null;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly intent?: ErpConfirmDialogIntent;
  readonly icon?: ErpIconName;
}
