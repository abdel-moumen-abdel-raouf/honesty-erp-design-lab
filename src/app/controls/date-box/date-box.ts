import {ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
import {normalizeIsoDate, parseIsoDate} from '../temporal-family/temporal-utils';

let nextDateBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-date-box',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpDateBox), multi: true}],
  templateUrl: './date-box.html',
  styleUrl: './date-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-date-box-value]': 'currentValue()',
  },
})
export class ErpDateBox extends ErpFieldBase<string | null> {
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly weekStartsOn = input(0);
  readonly locale = input<string | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('calendar');

  protected readonly controlId = `erp-date-box-${++nextDateBoxId}`;
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    return value ? new Intl.DateTimeFormat(this.locale() ?? undefined).format(parseIsoDate(value) as Date) : 'Select date';
  });
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;

  constructor() { super(null); }

  protected override normalizeValue(value: unknown): string | null {
    return normalizeIsoDate(value, this.min(), this.max());
  }

  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {
      label: `${this.trimmedLabel()} date picker`,
      data: this.pickerData(),
    });
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => {
      this.activeRef = null;
      if (outcome.type === 'closed') this.commitUserValue(outcome.result);
    });
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); }
  }

  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }

  private pickerData(): ErpTemporalPickerData {
    return {mode: 'date', value: this.currentValue(), min: this.min(), max: this.max(), weekStartsOn: this.weekStartsOn(), minuteStep: 5, locale: this.locale(), clearable: this.clearable(), theme: this.theme()};
  }

  private theme(): 'light' | 'dark' {
    return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light';
  }
}
