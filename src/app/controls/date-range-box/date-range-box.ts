import {ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {formatDatePreview, resolveContextualPreference} from '../../foundation/preferences/core/ui-settings.formatters';
import {UiSettingsService} from '../../foundation/preferences/core/ui-settings.service';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ERP_DATE_FINAL_PATTERN, resolveDomainPattern} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {createTemporalOverlayFooter, ERP_TEMPORAL_DEFAULT_ACTION_LABELS, ErpDateRangeValue, ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
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
  host: {'[attr.data-field-configuration-state]': 'dateRangeConfigurationState()', '[attr.data-date-range-start]': 'currentValue().start', '[attr.data-date-range-end]': 'currentValue().end'},
})
export class ErpDateRangeBox extends ErpFieldBase<ErpDateRangeValue> {
  readonly locale = input('ar-EG');
  readonly placeholder = input('اختر نطاق التاريخ');
  readonly pattern = input<string | null>(null);
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('calendar');
  protected readonly controlId = `erp-date-range-box-${++nextDateRangeBoxId}`;
  private readonly settings = inject(UiSettingsService).store;
  private readonly digits = this.settings.get('digits').valueSignal;
  private readonly dateFormat = this.settings.get('dateFormat').valueSignal;
  private readonly effectivePattern = computed(() => resolveDomainPattern(this.pattern(), ERP_DATE_FINAL_PATTERN));
  protected readonly dateRangeConfigurationState = computed<ErpInputConfigurationState>(() => this.fieldConfigurationState() === 'ready' && this.effectivePattern().configurationState === 'ready' ? 'ready' : 'invalid');
  protected readonly dateRangeEffectiveDisabled = computed(() => this.fieldEffectiveDisabled() || this.dateRangeConfigurationState() === 'invalid');
  protected readonly dateRangeFocused = computed(() => !this.dateRangeEffectiveDisabled() && this.fieldFocused());
  protected readonly hasValue = computed(() => this.currentValue().start !== null || this.currentValue().end !== null);
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    if (!value.start) return this.placeholder();
    const digits = resolveContextualPreference(this.digits(), 'field');
    const format = resolveContextualPreference(this.dateFormat(), 'field');
    const start = formatDatePreview(value.start, format, digits);
    const end = value.end ? formatDatePreview(value.end, format, digits) : '…';
    return `${start} — ${end}`;
  });
  private readonly overlays = inject(ErpOverlayManager);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super({start: null, end: null}); effect(() => { if (this.dateRangeEffectiveDisabled()) this.clearFocusState(); }); }
  protected override normalizeValue(value: unknown): ErpDateRangeValue { return normalizeDateRange(value, this.effectivePattern().regex); }
  protected openPicker(): void { if (this.dateRangeEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {frame: {header: {title: this.trimmedLabel(), subtitle: 'اختر نطاق التاريخ', icon: 'calendar'}, footer: createTemporalOverlayFooter('range', true, ERP_TEMPORAL_DEFAULT_ACTION_LABELS)}, size: 'lg', ...(this.overlayConfig() ?? {}), data: {mode: 'range', value: this.currentValue(), min: null, max: null, weekStartsOn: 0, minuteStep: 5, locale: this.locale(), actionLabels: ERP_TEMPORAL_DEFAULT_ACTION_LABELS, clearable: true}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitPickerResult(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue({start: null, end: null}); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private commitPickerResult(value: ErpTemporalValue | undefined): void {
    if (!value || typeof value !== 'object') return;
    const normalized = this.normalizeValue(value);
    if (normalized.start === value.start && normalized.end === value.end) this.commitUserValue(value);
  }
}
