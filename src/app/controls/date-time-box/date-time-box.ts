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
import {ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
import {normalizeIsoDateTime, parseIsoDate} from '../temporal-family/temporal-utils';

let nextDateTimeBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-date-time-box',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpDateTimeBox), multi: true}],
  templateUrl: './date-time-box.html',
  styleUrl: './date-time-box.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-date-time-box-value]': 'currentValue()'},
})
export class ErpDateTimeBox extends ErpFieldBase<string | null> {
  override readonly trailingIcon = input<ErpIconName | null>('calendar');
  protected readonly controlId = `erp-date-time-box-${++nextDateTimeBoxId}`;
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    if (!value) return 'Select date and time';
    const [date, time] = value.split('T');
    return `${new Intl.DateTimeFormat().format(parseIsoDate(date) as Date)} ${time}`;
  });
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super(null); }
  protected override normalizeValue(value: unknown): string | null { return normalizeIsoDateTime(value); }
  protected openPicker(): void { if (this.fieldEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {label: `${this.trimmedLabel()} date and time picker`, size: 'lg', data: {mode: 'datetime', value: this.currentValue(), min: null, max: null, weekStartsOn: 0, minuteStep: 5, locale: null, clearable: this.clearable(), theme: this.theme()}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
