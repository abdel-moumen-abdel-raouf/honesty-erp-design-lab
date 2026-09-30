import {ChangeDetectionStrategy, Component, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {createSelectionOverlayFooter, ERP_SELECTION_DEFAULT_ACTION_LABELS, ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {normalizeIconName} from '../selection-family/selection-utils';

let nextIconPickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-icon-picker',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpIcon, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpIconPicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpIconPicker),
      multi: true,
    },
  ],
  templateUrl: './icon-picker.html',
  styleUrl: './icon-picker.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-icon-picker-value]': 'currentValue()'},
})
export class ErpIconPicker extends ErpFieldBase<ErpIconName | null> {
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('chevron-down');
  protected readonly controlId = `erp-icon-picker-${++nextIconPickerId}`;
  protected readonly displayValue = computed(
    () => this.currentValue() ?? 'اختر أيقونة',
  );
  private readonly overlays = inject(ErpOverlayManager);
  private activeRef: ErpOverlayRef<string | null> | null = null;
  constructor() { super(null); }
  protected override classifyPresence(value: unknown) {
    return value === null ? 'no-selection' as const : null;
  }
  protected override normalizeValue(value: unknown): ErpIconName | null { return normalizeIconName(value); }
  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpSelectionPickerContent, ErpSelectionPickerData, string | null>(ErpSelectionPickerContent, {frame: {header: {title: this.trimmedLabel(), subtitle: 'اختر أيقونة دلالية', icon: 'layers'}, footer: createSelectionOverlayFooter('icon', this.clearable(), ERP_SELECTION_DEFAULT_ACTION_LABELS)}, size: 'lg', ...(this.overlayConfig() ?? {}), data: this.pickerData()});
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); });
  }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private pickerData(): ErpSelectionPickerData { return {mode: 'icon', value: this.currentValue(), colorMode: 'system', items: [], query: '', searchable: true, clearable: this.clearable(), actionLabels: ERP_SELECTION_DEFAULT_ACTION_LABELS}; }
}
