import {ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {ErpDateRangeValue, ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
import {normalizeDateRange} from '../temporal-family/temporal-utils';

let nextDateRangeBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-date-range-box',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpDateRangeBox), multi: true}],
  templateUrl: './date-range-box.html',
  styleUrl: './date-range-box.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-date-range-start]': 'currentValue().start', '[attr.data-date-range-end]': 'currentValue().end'},
})
export class ErpDateRangeBox extends ErpFieldBase<ErpDateRangeValue> {
  override readonly trailingIcon = input<ErpIconName | null>('calendar');
  protected readonly controlId = `erp-date-range-box-${++nextDateRangeBoxId}`;
  protected readonly hasValue = computed(() => this.currentValue().start !== null || this.currentValue().end !== null);
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    return value.start ? `${value.start} — ${value.end ?? '…'}` : 'Select date range';
  });
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super({start: null, end: null}); }
  protected override normalizeValue(value: unknown): ErpDateRangeValue { return normalizeDateRange(value); }
  protected openPicker(): void { if (this.fieldEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {label: `${this.trimmedLabel()} date range picker`, size: 'lg', data: {mode: 'range', value: this.currentValue(), min: null, max: null, weekStartsOn: 0, minuteStep: 5, locale: null, clearable: true, theme: this.theme()}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue({start: null, end: null}); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
