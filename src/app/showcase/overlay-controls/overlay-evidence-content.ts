import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpConfirmDialogService} from '../../shared/confirm-dialog/confirm-dialog.service';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../shared/overlay/overlay-tokens';

export interface OverlayEvidenceData {
  readonly allowNested: boolean;
  readonly longBody?: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-overlay-evidence-content',
  imports: [ErpButton, ErpStack, ErpText],
  templateUrl: './overlay-evidence-content.html',
  styleUrl: './overlay-evidence-content.scss',
})
export class OverlayEvidenceContent implements OnDestroy {
  readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<string>;
  readonly data = inject(ERP_OVERLAY_DATA) as OverlayEvidenceData;
  private readonly overlays = inject(ErpOverlayManager);
  private readonly confirmDialog = inject(ErpConfirmDialogService);
  protected readonly longBodyLines = Array.from(
    {length: 24},
    (_, index) => `سطر مراجعة المحتوى الطويل ${index + 1}`,
  );
  private readonly frameActionCleanup = [
    this.ref.registerFrameAction('confirm', () => this.ref.close('confirmed')),
    this.ref.registerFrameAction('cancel', () => this.ref.dismiss('cancel')),
  ];

  ngOnDestroy(): void {
    for (const cleanup of this.frameActionCleanup) {
      cleanup();
    }
  }

  openConfirm(): void {
    void this.confirmDialog.confirm({
      title: 'تأكيد من داخل نافذة حاجبة',
      message: 'يُفتح هذا التأكيد فوق التراكب الحالي في نفس المكدس.',
      intent: 'warning',
    });
  }

  openNested(): void {
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(OverlayEvidenceContent, {
      frame: {
        header: {
          title: 'دليل التراكب المتداخل',
          subtitle: 'تراكب ثانٍ داخل المكدس',
          icon: 'layers',
        },
        footer: {
          actions: [
            {id: 'cancel', label: 'إلغاء', role: 'secondary', placement: 'end'},
            {id: 'confirm', label: 'تأكيد', role: 'primary', placement: 'end'},
          ],
        },
      },
      size: 'sm',
      data: {
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }
}
