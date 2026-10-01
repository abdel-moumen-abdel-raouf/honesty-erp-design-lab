import {Injectable, inject} from '@angular/core';
import {ErpButtonTone} from '../../controls/button-family/button-contracts';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpOverlayActionConfig} from '../overlay/overlay-contracts';
import {ErpOverlayManager} from '../overlay/overlay-manager';
import {
  ErpConfirmDialogAuxiliaryAction,
  ErpConfirmDialogConfig,
  ErpConfirmDialogIntent,
  ErpConfirmDialogResult,
} from './confirm-dialog-contracts';
import {
  ErpConfirmDialogContent,
  ErpConfirmDialogData,
} from './internal/confirm-dialog-content';

const DEFAULT_SUBTITLE = 'يرجى تأكيد هذا الإجراء.';
const DEFAULT_CONFIRM_LABEL = 'تأكيد';
const DEFAULT_CANCEL_LABEL = 'إلغاء';
const RESERVED_ACTION_IDS = new Set(['confirm', 'cancel']);

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

function normalizeAuxiliaryActions(
  actions: readonly ErpConfirmDialogAuxiliaryAction[],
): readonly ErpOverlayActionConfig[] {
  if (actions.length > 2) {
    throw new TypeError(
      'ErpConfirmDialog supports at most two auxiliary actions.',
    );
  }

  const normalized = actions.map((action) => ({
    id: action.id.trim(),
    label: action.label.trim(),
    icon: action.icon ?? null,
    presentation: action.presentation ?? 'button',
    tone: action.tone ?? 'neutral',
    role: 'secondary' as const,
    placement: action.placement ?? 'start',
  }));

  if (normalized.some((action) => action.id.length === 0)) {
    throw new TypeError(
      'ErpConfirmDialog auxiliary action IDs must be non-empty.',
    );
  }

  if (
    normalized.some((action) => RESERVED_ACTION_IDS.has(action.id))
  ) {
    throw new TypeError(
      'ErpConfirmDialog auxiliary action IDs cannot use confirm or cancel.',
    );
  }

  if (new Set(normalized.map((action) => action.id)).size !== normalized.length) {
    throw new TypeError(
      'ErpConfirmDialog auxiliary action IDs must be unique.',
    );
  }

  if (normalized.some((action) => action.label.length === 0)) {
    throw new TypeError(
      'ErpConfirmDialog auxiliary action labels must be non-empty.',
    );
  }

  if (
    normalized.some(
      (action) =>
        action.presentation === 'icon-button' && action.icon === null,
    )
  ) {
    throw new TypeError(
      'ErpConfirmDialog icon-button auxiliary actions require an icon.',
    );
  }

  return normalized;
}

@Injectable({providedIn: 'root'})
export class ErpConfirmDialogService {
  private readonly overlays = inject(ErpOverlayManager);

  confirm(
    config: ErpConfirmDialogConfig,
  ): Promise<ErpConfirmDialogResult> {
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
    const headerTone = config.headerTone ?? 'default';
    const userDismissible = config.userDismissible ?? true;
    const auxiliaryActions = normalizeAuxiliaryActions(
      config.auxiliaryActions ?? [],
    );

    if (title.length === 0) {
      throw new TypeError('ErpConfirmDialog requires a non-empty title.');
    }

    if (message.length === 0) {
      throw new TypeError('ErpConfirmDialog requires a non-empty message.');
    }

    const cancelAction: ErpOverlayActionConfig[] = userDismissible
      ? [
          {
            id: 'cancel',
            label: cancelLabel,
            tone: 'neutral',
            role: 'secondary',
            placement: 'end',
          },
        ]
      : [];

    const ref = this.overlays.open<
      ErpConfirmDialogContent,
      ErpConfirmDialogData,
      ErpConfirmDialogResult
    >(ErpConfirmDialogContent, {
      kind: 'modal',
      position: 'center',
      size: 'sm',
      dismissOnEscape: userDismissible,
      dismissOnBackdrop: false,
      initialFocus: userDismissible
        ? '[data-overlay-frame-action-id="cancel"] button'
        : null,
      frame: {
        showHeader: true,
        showFooter: true,
        header: {
          title,
          subtitle,
          icon,
          tone: headerTone,
          showCloseButton: userDismissible,
          closeLabel: cancelLabel,
        },
        footer: {
          actions: [
            ...auxiliaryActions,
            ...cancelAction,
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

    for (const action of auxiliaryActions) {
      ref.registerFrameAction(action.id, () =>
        ref.close({type: 'action', actionId: action.id}),
      );
    }

    if (userDismissible) {
      ref.registerFrameAction('cancel', () =>
        ref.close({type: 'action', actionId: 'cancel'}),
      );
    }

    ref.registerFrameAction('confirm', () =>
      ref.close({type: 'action', actionId: 'confirm'}),
    );

    return ref.afterClosed.then((result) => {
      if (result.type === 'closed' && result.result !== undefined) {
        return result.result;
      }

      return {
        type: 'dismissed',
        reason: result.reason === 'escape' ? 'escape' : 'close',
      } satisfies ErpConfirmDialogResult;
    });
  }
}
