import {ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {normalizeIconName} from '../selection-family/selection-utils';

let nextIconPickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-icon-picker',
  imports: [ErpFieldFrame, ErpIcon, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpIconPicker), multi: true}],
  templateUrl: './icon-picker.html',
  styleUrl: './icon-picker.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-icon-picker-value]': 'currentValue()'},
})
export class ErpIconPicker extends ErpFieldBase<ErpIconName | null> {
  override readonly trailingIcon = input<ErpIconName | null>('chevron-down');
  protected readonly controlId = `erp-icon-picker-${++nextIconPickerId}`;
  protected readonly displayValue = computed(() => this.currentValue() ?? 'Select icon');
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<string | null> | null = null;
  constructor() { super(null); }
  protected override normalizeValue(value: unknown): ErpIconName | null { return normalizeIconName(value); }
  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpSelectionPickerContent, ErpSelectionPickerData, string | null>(ErpSelectionPickerContent, {label: `${this.trimmedLabel()} icon picker`, size: 'lg', data: this.pickerData()});
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); });
  }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private pickerData(): ErpSelectionPickerData { return {mode: 'icon', value: this.currentValue(), items: [], query: '', searchable: true, clearable: true, theme: this.theme()}; }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
