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
import {ErpConfirmDialogService} from '../../shared/confirm-dialog/confirm-dialog.service';
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
  private readonly confirmDialog = inject(ErpConfirmDialogService);

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

  openConfirm(
    intent: 'default' | 'warning' | 'danger',
  ): void {
    void this.confirmDialog.confirm({
      title:
        intent === 'danger'
          ? 'تأكيد الحذف'
          : intent === 'warning'
            ? 'تأكيد الإجراء'
            : 'تأكيد المتابعة',
      message:
        intent === 'danger'
          ? 'هل تريد حذف هذا السجل نهائيًا؟'
          : intent === 'warning'
            ? 'سيؤثر هذا الإجراء على البيانات الحالية.'
            : 'هل تريد المتابعة؟',
      details:
        intent === 'danger'
          ? 'لا يمكن التراجع عن الحذف بعد التأكيد.'
          : null,
      intent,
      headerTone: intent,
      confirmLabel: intent === 'danger' ? 'حذف' : 'تأكيد',
    });
  }

  openMultiActionConfirm(): void {
    void this.confirmDialog.confirm({
      title: 'اختيارات متعددة',
      message: 'اختر الإجراء الذي تريد تنفيذه.',
      headerTone: 'info',
      auxiliaryActions: [
        {
          id: 'save-draft',
          label: 'حفظ كمسودة',
          icon: 'save',
          tone: 'secondary',
          placement: 'start',
        },
        {
          id: 'details',
          label: 'التفاصيل',
          icon: 'info',
          presentation: 'icon-button',
          tone: 'info',
          placement: 'start',
        },
      ],
    });
  }

  openLockedConfirm(): void {
    void this.confirmDialog.confirm({
      title: 'تأكيد إلزامي',
      message: 'لا يمكن إغلاق هذه النافذة بدون اختيار إجراء.',
      headerTone: 'primary',
      userDismissible: false,
    });
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

  openFrameVisibility(
    kind: 'modal' | 'drawer',
    position: ErpOverlayPosition,
    showHeader: boolean,
    showFooter: boolean,
    label: string,
  ): void {
    const frame = this.frame(label);
    this.overlays.open<OverlayEvidenceContent, OverlayEvidenceData>(
      OverlayEvidenceContent,
      {
        kind,
        position,
        frame: {
          ...frame,
          showHeader,
          showFooter,
        },
        data: {
          allowNested: false,
        } satisfies OverlayEvidenceData,
      },
    );
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
