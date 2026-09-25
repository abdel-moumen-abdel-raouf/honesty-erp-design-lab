import {booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {ErpItemPickerOption, ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {normalizeItemValue} from '../selection-family/selection-utils';

let nextItemPickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-item-picker',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpItemPicker), multi: true}],
  templateUrl: './item-picker.html',
  styleUrl: './item-picker.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-item-picker-value]': 'currentValue()'},
})
export class ErpItemPicker extends ErpFieldBase<string | null> {
  readonly items = input.required<readonly ErpItemPickerOption[]>();
  readonly placeholder = input<string | null>(null);
  readonly searchable = input(false, {transform: booleanAttribute});
  override readonly trailingIcon = input<ErpIconName | null>('chevron-down');
  protected readonly controlId = `erp-item-picker-${++nextItemPickerId}`;
  protected readonly selectedItem = computed(() => this.items().find((item) => item.value === this.currentValue()) ?? null);
  protected readonly displayValue = computed(() => this.selectedItem()?.label ?? this.placeholder() ?? 'Select item');
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<string | null> | null = null;
  constructor() { super(null); }
  protected override normalizeValue(value: unknown): string | null { return normalizeItemValue(value, this.items()); }
  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpSelectionPickerContent, ErpSelectionPickerData, string | null>(ErpSelectionPickerContent, {label: `${this.trimmedLabel()} item picker`, data: this.pickerData()});
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); });
  }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private pickerData(): ErpSelectionPickerData { return {mode: 'item', value: this.currentValue(), items: this.items(), query: '', searchable: this.searchable(), clearable: this.clearable(), theme: this.theme()}; }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
