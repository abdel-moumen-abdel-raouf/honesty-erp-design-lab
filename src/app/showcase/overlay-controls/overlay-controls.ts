import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpColorPicker} from '../../controls/color-picker/color-picker';
import {ErpComboBox} from '../../controls/combo-box/combo-box';
import {ErpDateBox} from '../../controls/date-box/date-box';
import {ErpDateRangeBox} from '../../controls/date-range-box/date-range-box';
import {ErpDateTimeBox} from '../../controls/date-time-box/date-time-box';
import {ErpIconPicker} from '../../controls/icon-picker/icon-picker';
import {ErpItemPicker} from '../../controls/item-picker/item-picker';
import {ErpItemPickerOption} from '../../controls/selection-family/selection-contracts';
import {ErpTimeBox} from '../../controls/time-box/time-box';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayPosition} from '../../shared/overlay/overlay-contracts';
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
    ErpColorPicker,
    ErpComboBox,
    ErpContainer,
    ErpDateBox,
    ErpDateRangeBox,
    ErpDateTimeBox,
    ErpIconPicker,
    ErpItemPicker,
    ErpDivider,
    ErpGrid,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTimeBox,
  ],
  templateUrl: './overlay-controls.html',
  styleUrl: './overlay-controls.scss',
})
export class OverlayControls {
  readonly themes = ['light', 'dark'] as const;
  readonly pickerItems: readonly ErpItemPickerOption[] = [
    {value: 'customer', label: 'Customer', icon: 'customer'},
    {value: 'inventory', label: 'Inventory', icon: 'inventory'},
    {value: 'maintenance', label: 'Maintenance', icon: 'maintenance'},
  ];
  private readonly overlays = inject(ErpOverlayManager);

  openModal(theme: 'light' | 'dark', nested = false): void {
    this.open('modal', 'center', theme, nested ? 'Nested stack root' : 'Modal');
  }

  openDrawer(
    position: Exclude<ErpOverlayPosition, 'center'>,
    theme: 'light' | 'dark',
  ): void {
    this.open('drawer', position, theme, `Drawer ${position}`);
  }

  openPolicy(theme: 'light' | 'dark'): void {
    this.overlays.open(OverlayEvidenceContent, {
      label: 'Persistent policy evidence',
      dismissOnBackdrop: false,
      dismissOnEscape: false,
      data: {
        theme,
        title: 'Explicit close policy',
        allowNested: false,
      } satisfies OverlayEvidenceData,
    });
  }

  private open(
    kind: 'modal' | 'drawer',
    position: ErpOverlayPosition,
    theme: 'light' | 'dark',
    title: string,
  ): void {
    this.overlays.open(OverlayEvidenceContent, {
      kind,
      position,
      label: title,
      data: {theme, title, allowNested: title === 'Nested stack root'} satisfies OverlayEvidenceData,
    });
  }
}
