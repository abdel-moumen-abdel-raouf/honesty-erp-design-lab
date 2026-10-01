import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ERP_MOTION_PRESETS} from '../../foundation/motion/motion-contracts';
import {ErpButton} from '../../controls/button/button';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {
  ErpOverlayAnimation,
  ErpOverlayBackdropTone,
  ErpOverlayBehaviorConfig,
  ErpOverlayBlur,
  ErpOverlayFrameConfig,
  ErpOverlayPosition,
} from '../../shared/overlay/overlay-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {
  OverlayEvidenceContent,
  OverlayEvidenceData,
} from './overlay-evidence-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-overlay-controls',
  imports: [
    ErpButton,
    ErpContainer,
    ErpDivider,
    ErpGrid,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './overlay-controls.html',
  styleUrl: './overlay-controls.scss',
})
export class OverlayControls {
  readonly blurLevels: readonly ErpOverlayBlur[] = ['low', 'medium', 'high'];
  readonly backdropTones: readonly Exclude<ErpOverlayBackdropTone, 'default'>[] = [
    'neutral',
    'primary',
    'secondary',
    'accent',
  ];
  readonly animations: readonly ErpOverlayAnimation[] = ERP_MOTION_PRESETS;
  private readonly overlays = inject(ErpOverlayManager);

  openModal(nested = false): void {
    this.open(
      'modal',
      'center',
      nested ? 'جذر التراكب المتداخل' : 'نافذة حوار',
      nested,
    );
  }

  openDrawer(
    position: Exclude<ErpOverlayPosition, 'center'>,
  ): void {
    this.open('drawer', position, `درج ${position}`);
  }

  openPolicy(): void {
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(OverlayEvidenceContent, {
      frame: this.frame('دليل سياسة الإغلاق الصريح'),
      dismissOnBackdrop: false,
      dismissOnEscape: false,
      data: {
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }

  openConfigured(
    label: string,
    config: Partial<ErpOverlayBehaviorConfig>,
  ): void {
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(OverlayEvidenceContent, {
      frame: this.frame(label),
      ...config,
      data: {
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }

  openLongBody(): void {
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(
      OverlayEvidenceContent,
      {
        size: 'lg',
        frame: {
          header: {
            title: 'مراجعة الإطار ذي المحتوى الطويل',
            subtitle: 'يبقى الرأس والتذييل ظاهرين بينما يمرر الجسم فقط',
            icon: 'layers',
            closeLabel: 'إغلاق مراجعة الإطار',
          },
          footer: {
            actions: [
              {id: 'cancel', label: 'إلغاء المراجعة', role: 'secondary', placement: 'end'},
              {id: 'confirm', label: 'اعتماد المراجعة', icon: 'check', role: 'primary', placement: 'end'},
            ],
          },
        },
        data: {
          allowNested: false,
          longBody: true,
        },
      },
    );
  }

  private open(
    kind: 'modal' | 'drawer',
    position: ErpOverlayPosition,
    title: string,
    allowNested = false,
  ): void {
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(OverlayEvidenceContent, {
      kind,
      position,
      frame: this.frame(title),
      data: {allowNested} satisfies OverlayEvidenceData,
    });
  }

  private frame(title: string): ErpOverlayFrameConfig {
    return {
      header: {
        title,
        subtitle: 'دليل إطار التراكب المشترك',
        icon: 'layers',
      },
      footer: {
        actions: [
          {id: 'cancel', label: 'إلغاء', role: 'secondary', placement: 'end'},
          {id: 'confirm', label: 'تأكيد', role: 'primary', placement: 'end'},
        ],
      },
    };
  }
}
