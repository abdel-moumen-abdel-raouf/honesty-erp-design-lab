import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpText} from '../../../primitives/text/text';
import {ERP_OVERLAY_DATA} from '../../overlay/overlay-tokens';
import {ErpConfirmDialogIntent} from '../confirm-dialog-contracts';

export interface ErpConfirmDialogData {
  readonly message: string;
  readonly details: string | null;
  readonly intent: ErpConfirmDialogIntent;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'erp-confirm-dialog-content',
  imports: [ErpStack, ErpText],
  templateUrl: './confirm-dialog-content.html',
})
export class ErpConfirmDialogContent {
  readonly data = inject(ERP_OVERLAY_DATA) as ErpConfirmDialogData;
}
