import {ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
import {normalizeIsoTime} from '../temporal-family/temporal-utils';

let nextTimeBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-time-box',
  imports: [ErpFieldFrame, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpTimeBox), multi: true}],
  templateUrl: './time-box.html',
  styleUrl: './time-box.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-time-box-value]': 'currentValue()'},
})
export class ErpTimeBox extends ErpFieldBase<string | null> {
  readonly minuteStep = input(5);
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly locale = input<string | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('clock');
  protected readonly controlId = `erp-time-box-${++nextTimeBoxId}`;
  protected readonly displayValue = computed(() => this.currentValue() ?? 'Select time');
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super(null); }
  protected override normalizeValue(value: unknown): string | null { return normalizeIsoTime(value, this.min(), this.max()); }
  protected openPicker(): void { if (this.fieldEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {label: `${this.trimmedLabel()} time picker`, data: {mode: 'time', value: this.currentValue(), min: this.min(), max: this.max(), weekStartsOn: 0, minuteStep: this.minuteStep(), locale: this.locale(), clearable: true, theme: this.theme()}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitUserValue(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
