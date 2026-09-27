import {ChangeDetectionStrategy, Component, ElementRef, computed, effect, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ERP_DATE_TIME_FINAL_PATTERN, resolveDomainPattern} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {ERP_TEMPORAL_DEFAULT_ACTION_LABELS, ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
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
  host: {'[attr.data-field-configuration-state]': 'dateTimeConfigurationState()', '[attr.data-date-time-box-value]': 'currentValue()'},
})
export class ErpDateTimeBox extends ErpFieldBase<string | null> {
  readonly locale = input('ar-EG');
  readonly pattern = input<string | null>(null);
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('calendar');
  protected readonly controlId = `erp-date-time-box-${++nextDateTimeBoxId}`;
  private readonly effectivePattern = computed(() => resolveDomainPattern(this.pattern(), ERP_DATE_TIME_FINAL_PATTERN));
  protected readonly dateTimeConfigurationState = computed<ErpInputConfigurationState>(() => this.fieldConfigurationState() === 'ready' && this.effectivePattern().configurationState === 'ready' ? 'ready' : 'invalid');
  protected readonly dateTimeEffectiveDisabled = computed(() => this.fieldEffectiveDisabled() || this.dateTimeConfigurationState() === 'invalid');
  protected readonly dateTimeFocused = computed(() => !this.dateTimeEffectiveDisabled() && this.fieldFocused());
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    if (!value) return 'Select date and time';
    const [date, time] = value.split('T');
    return `${new Intl.DateTimeFormat(this.locale()).format(parseIsoDate(date) as Date)} ${time}`;
  });
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super(null); effect(() => { if (this.dateTimeEffectiveDisabled()) this.clearFocusState(); }); }
  protected override normalizeValue(value: unknown): string | null { return normalizeIsoDateTime(value, this.effectivePattern().regex); }
  protected openPicker(): void { if (this.dateTimeEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {frame: {header: {title: this.trimmedLabel(), subtitle: 'اختر التاريخ والوقت', icon: 'calendar'}, footer: {primary: {label: ERP_TEMPORAL_DEFAULT_ACTION_LABELS.confirm}, secondary: {label: ERP_TEMPORAL_DEFAULT_ACTION_LABELS.cancel}}}, size: 'lg', ...(this.overlayConfig() ?? {}), data: {mode: 'datetime', value: this.currentValue(), min: null, max: null, weekStartsOn: 0, minuteStep: 5, locale: this.locale(), actionLabels: ERP_TEMPORAL_DEFAULT_ACTION_LABELS, clearable: this.clearable(), theme: this.theme()}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitPickerResult(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private commitPickerResult(value: ErpTemporalValue | undefined): void { if (value === null) this.commitUserValue(null); else if (typeof value === 'string' && this.normalizeValue(value) === value) this.commitUserValue(value); }
  private theme(): 'light' | 'dark' { return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light'; }
}
