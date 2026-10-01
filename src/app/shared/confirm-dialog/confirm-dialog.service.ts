import {Injectable, inject} from '@angular/core';
import {ErpButtonTone} from '../../controls/button-family/button-contracts';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpOverlayManager} from '../overlay/overlay-manager';
import {
  ErpConfirmDialogConfig,
  ErpConfirmDialogIntent,
} from './confirm-dialog-contracts';
import {
  ErpConfirmDialogContent,
  ErpConfirmDialogData,
} from './internal/confirm-dialog-content';

const DEFAULT_SUBTITLE = 'يرجى تأكيد هذا الإجراء.';
const DEFAULT_CONFIRM_LABEL = 'تأكيد';
const DEFAULT_CANCEL_LABEL = 'إلغاء';

function iconForIntent(intent: ErpConfirmDialogIntent): ErpIconName {
  switch (intent) {
    case 'warning':
      return 'warning';
    case 'danger':
      return 'error';
    default:
      return 'help';
  }
}

function toneForIntent(intent: ErpConfirmDialogIntent): ErpButtonTone {
  switch (intent) {
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    default:
      return 'primary';
  }
}

@Injectable({providedIn: 'root'})
export class ErpConfirmDialogService {
  private readonly overlays = inject(ErpOverlayManager);

  confirm(config: ErpConfirmDialogConfig): Promise<boolean> {
    const title = config.title.trim();
    const message = config.message.trim();
    const subtitle = config.subtitle?.trim() || DEFAULT_SUBTITLE;
    const details = config.details?.trim() || null;
    const confirmLabel =
      config.confirmLabel?.trim() || DEFAULT_CONFIRM_LABEL;
    const cancelLabel =
      config.cancelLabel?.trim() || DEFAULT_CANCEL_LABEL;
    const intent = config.intent ?? 'default';
    const icon = config.icon ?? iconForIntent(intent);

    if (title.length === 0) {
      throw new TypeError('ErpConfirmDialog requires a non-empty title.');
    }

    if (message.length === 0) {
      throw new TypeError('ErpConfirmDialog requires a non-empty message.');
    }

    const ref = this.overlays.open<
      ErpConfirmDialogContent,
      ErpConfirmDialogData,
      true
    >(ErpConfirmDialogContent, {
      kind: 'modal',
      position: 'center',
      size: 'sm',
      dismissOnEscape: true,
      dismissOnBackdrop: false,
      initialFocus: '[data-overlay-frame-action-id="cancel"] button',
      frame: {
        showHeader: true,
        showFooter: true,
        header: {
          title,
          subtitle,
          icon,
          closeLabel: cancelLabel,
        },
        footer: {
          actions: [
            {
              id: 'cancel',
              label: cancelLabel,
              role: 'secondary',
              placement: 'end',
            },
            {
              id: 'confirm',
              label: confirmLabel,
              icon: intent === 'danger' ? 'delete' : 'check',
              tone: toneForIntent(intent),
              role: 'primary',
              placement: 'end',
            },
          ],
        },
      },
      data: {
        message,
        details,
        intent,
      } satisfies ErpConfirmDialogData,
    });

    ref.registerFrameAction('confirm', () => ref.close(true));

    return ref.afterClosed.then(
      (result) => result.type === 'closed' && result.result === true,
    );
  }
}
