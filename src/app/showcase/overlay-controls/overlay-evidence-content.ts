import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../shared/overlay/overlay-tokens';

export interface OverlayEvidenceData {
  readonly theme: 'light' | 'dark';
  readonly title: string;
  readonly allowNested: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-overlay-evidence-content',
  imports: [ErpButton, ErpStack, ErpText],
  templateUrl: './overlay-evidence-content.html',
  styleUrl: './overlay-evidence-content.scss',
})
export class OverlayEvidenceContent {
  readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<string>;
  readonly data = inject(ERP_OVERLAY_DATA) as OverlayEvidenceData;
  private readonly overlays = inject(ErpOverlayManager);

  openNested(): void {
    this.overlays.open(OverlayEvidenceContent, {
      label: 'Nested overlay evidence',
      size: 'sm',
      data: {
        theme: this.data.theme,
        title: 'Nested overlay',
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }
}
