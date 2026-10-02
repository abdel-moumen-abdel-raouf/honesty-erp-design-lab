import {ErpButtonTone} from '../../controls/button-family/button-contracts';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {
  ErpOverlayActionPlacement,
  ErpOverlayActionPresentation,
  ErpOverlayHeaderTone,
} from '../overlay/overlay-contracts';

export type ErpConfirmDialogIntent =
  | 'default'
  | 'warning'
  | 'danger';

export interface ErpConfirmDialogAuxiliaryAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName | null;
  readonly presentation?: ErpOverlayActionPresentation;
  readonly tone?: ErpButtonTone;
  readonly placement?: ErpOverlayActionPlacement;
}

export type ErpConfirmDialogDismissReason =
  | 'close'
  | 'escape'
  | 'backdrop';

export type ErpConfirmDialogResult =
  | {
      readonly type: 'action';
      readonly actionId: string;
    }
  | {
      readonly type: 'dismissed';
      readonly reason: ErpConfirmDialogDismissReason;
    };

export interface ErpConfirmDialogConfig {
  readonly title: string;
  readonly message: string;
  readonly subtitle?: string;
  readonly details?: string | null;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly intent?: ErpConfirmDialogIntent;
  readonly icon?: ErpIconName;
  readonly headerTone?: ErpOverlayHeaderTone;
  readonly userDismissible?: boolean;
  readonly dismissOnEscape?: boolean;
  readonly dismissOnBackdrop?: boolean;
  readonly auxiliaryActions?: readonly ErpConfirmDialogAuxiliaryAction[];
}
