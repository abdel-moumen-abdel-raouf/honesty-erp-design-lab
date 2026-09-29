import {ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {formatTimePreview, resolveContextualPreference} from '../../foundation/preferences/core/ui-settings.formatters';
import {UiSettingsService} from '../../foundation/preferences/core/ui-settings.service';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ERP_TIME_FINAL_PATTERN, resolveDomainPattern} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {
  ErpInputConfigurationState,
  ErpInputValidationIssue,
} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {createTemporalOverlayFooter, ERP_TEMPORAL_DEFAULT_ACTION_LABELS, ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
import {normalizeIsoTime} from '../temporal-family/temporal-utils';

let nextTimeBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-time-box',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpTimeBox), multi: true}],
  templateUrl: './time-box.html',
  styleUrl: './time-box.scss',
  host: {'[attr.data-field-configuration-state]': 'timeConfigurationState()', '[attr.data-time-box-value]': 'currentValue()'},
})
export class ErpTimeBox extends ErpFieldBase<string | null> {
  readonly minuteStep = input(5);
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly locale = input('ar-EG');
  readonly placeholder = input('اختر الوقت');
  readonly pattern = input<string | null>(null);
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('clock');
  protected readonly controlId = `erp-time-box-${++nextTimeBoxId}`;
  private readonly settings = inject(UiSettingsService).store;
  private readonly digits = this.settings.get('digits').valueSignal;
  private readonly timeFormat = this.settings.get('timeFormat').valueSignal;
  private readonly effectivePattern = computed(() => resolveDomainPattern(this.pattern(), ERP_TIME_FINAL_PATTERN));
  protected readonly timeConfigurationState = computed<ErpInputConfigurationState>(() => this.fieldConfigurationState() === 'ready' && this.effectivePattern().configurationState === 'ready' ? 'ready' : 'invalid');
  protected readonly timeEffectiveDisabled = computed(() => this.fieldEffectiveDisabled() || this.timeConfigurationState() === 'invalid');
  protected readonly timeFocused = computed(() => !this.timeEffectiveDisabled() && this.fieldFocused());
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    return value
      ? formatTimePreview(
          value,
          this.timeFormat(),
          resolveContextualPreference(this.digits(), 'field'),
        )
      : this.placeholder();
  });
  private readonly overlays = inject(ErpOverlayManager);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;
  constructor() { super(null); effect(() => { if (this.timeEffectiveDisabled()) this.clearFocusState(); }); }
  protected override normalizeValue(value: unknown): string | null { return normalizeIsoTime(value, this.min(), this.max(), this.effectivePattern().regex); }
  protected override classifyPresence(value: unknown) {
    return value === null ? 'no-selection' as const : null;
  }
  protected override validateCandidate(value: unknown): readonly ErpInputValidationIssue[] {
    if (typeof value !== 'string') return [];
    const issues: ErpInputValidationIssue[] = [];
    if (this.min() !== null && value < (this.min() as string)) {
      issues.push(this.validationIssue('time.min', `الوقت يجب ألا يسبق ${this.min()}.`, 'constraint'));
    }
    if (this.max() !== null && value > (this.max() as string)) {
      issues.push(this.validationIssue('time.max', `الوقت يجب ألا يتجاوز ${this.max()}.`, 'constraint'));
    }
    return issues;
  }
  protected openPicker(): void { if (this.timeEffectiveDisabled() || this.activeRef) return; const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {frame: {header: {title: this.trimmedLabel(), subtitle: 'اختر الوقت', icon: 'clock'}, footer: createTemporalOverlayFooter('time', this.clearable(), ERP_TEMPORAL_DEFAULT_ACTION_LABELS)}, ...(this.overlayConfig() ?? {}), data: {mode: 'time', value: this.currentValue(), min: this.min(), max: this.max(), weekStartsOn: 0, minuteStep: this.minuteStep(), locale: this.locale(), actionLabels: ERP_TEMPORAL_DEFAULT_ACTION_LABELS, clearable: this.clearable()}}); this.activeRef = ref; void ref.afterClosed.then((outcome) => { this.activeRef = null; if (outcome.type === 'closed') this.commitPickerResult(outcome.result); }); }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private commitPickerResult(value: ErpTemporalValue | undefined): void { if (value === null) this.commitUserValue(null); else if (typeof value === 'string' && this.normalizeValue(value) === value) this.commitUserValue(value); }
}
