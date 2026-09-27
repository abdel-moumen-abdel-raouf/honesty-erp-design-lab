import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ERP_MOTION_PRESETS} from '../../foundation/motion/motion-contracts';
import {ErpButton} from '../../controls/button/button';
import {ErpButtonGroup} from '../../controls/button-group/button-group';
import {ErpColorPicker} from '../../controls/color-picker/color-picker';
import {ErpComboBox} from '../../controls/combo-box/combo-box';
import {ErpButtonGroupItem, ErpRadioGroupOption} from '../../controls/composite-family/composite-contracts';
import {ErpDateBox} from '../../controls/date-box/date-box';
import {ErpDateRangeBox} from '../../controls/date-range-box/date-range-box';
import {ErpDateTimeBox} from '../../controls/date-time-box/date-time-box';
import {ErpIconPicker} from '../../controls/icon-picker/icon-picker';
import {ErpItemPicker} from '../../controls/item-picker/item-picker';
import {ErpFabMenu} from '../../controls/fab-menu/fab-menu';
import {ErpRadioGroup} from '../../controls/radio-group/radio-group';
import {
  ErpColorPickerValue,
  ErpItemPickerOption,
} from '../../controls/selection-family/selection-contracts';
import {ErpTimeBox} from '../../controls/time-box/time-box';
import {ErpSplitButton} from '../../controls/split-button/split-button';
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
    ErpButtonGroup,
    ErpColorPicker,
    ErpComboBox,
    ErpContainer,
    ErpDateBox,
    ErpDateRangeBox,
    ErpDateTimeBox,
    ErpFabMenu,
    ErpIconPicker,
    ErpItemPicker,
    ErpRadioGroup,
    ErpDivider,
    ErpGrid,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTimeBox,
    ErpSplitButton,
    FormsModule,
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
  readonly pickerItems: readonly ErpItemPickerOption[] = [
    {value: 'customer', label: 'العملاء', icon: 'customer'},
    {value: 'inventory', label: 'المخزون', icon: 'inventory'},
    {value: 'maintenance', label: 'الصيانة', icon: 'maintenance'},
  ];
  readonly radioItems: readonly ErpRadioGroupOption[] = [
    {value: 'draft', label: 'مسودة'},
    {value: 'review', label: 'مراجعة'},
    {value: 'approved', label: 'معتمد'},
  ];
  readonly buttonItems: readonly ErpButtonGroupItem[] = [
    {value: 'day', label: 'يوم'},
    {value: 'week', label: 'أسبوع'},
    {value: 'month', label: 'شهر'},
  ];
  readonly dateRangeValue = signal({start: '2026-09-24', end: '2026-09-30'});
  readonly systemColorValue = signal<ErpColorPickerValue | null>({mode: 'system', token: 'primary-500'});
  readonly freeColorValue = signal<ErpColorPickerValue | null>({mode: 'free', value: '#2563EB'});
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
        title: 'سياسة الإغلاق الصريح',
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
        title: label,
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
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
      data: {title, allowNested} satisfies OverlayEvidenceData,
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
        primary: {label: 'تأكيد'},
        secondary: {label: 'إلغاء'},
      },
    };
  }
}
