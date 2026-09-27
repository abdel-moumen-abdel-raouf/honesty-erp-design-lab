import {ChangeDetectionStrategy, Component, ElementRef, computed, effect, forwardRef, inject, input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ERP_DATE_FINAL_PATTERN, resolveDomainPattern} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpTemporalPickerContent} from '../temporal-family/internal/temporal-picker-content';
import {ERP_TEMPORAL_DEFAULT_ACTION_LABELS, ErpTemporalPickerData, ErpTemporalValue} from '../temporal-family/temporal-contracts';
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
    '[attr.data-field-configuration-state]': 'dateConfigurationState()',
    '[attr.data-date-box-value]': 'currentValue()',
  },
})
export class ErpDateBox extends ErpFieldBase<string | null> {
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly weekStartsOn = input(0);
  readonly locale = input('ar-EG');
  readonly pattern = input<string | null>(null);
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('calendar');

  protected readonly controlId = `erp-date-box-${++nextDateBoxId}`;
  private readonly effectivePattern = computed(() =>
    resolveDomainPattern(this.pattern(), ERP_DATE_FINAL_PATTERN),
  );
  protected readonly dateConfigurationState = computed<ErpInputConfigurationState>(() =>
    this.fieldConfigurationState() === 'ready' &&
    this.effectivePattern().configurationState === 'ready'
      ? 'ready'
      : 'invalid',
  );
  protected readonly dateEffectiveDisabled = computed(() =>
    this.fieldEffectiveDisabled() || this.dateConfigurationState() === 'invalid',
  );
  protected readonly dateFocused = computed(() =>
    !this.dateEffectiveDisabled() && this.fieldFocused(),
  );
  protected readonly displayValue = computed(() => {
    const value = this.currentValue();
    return value ? new Intl.DateTimeFormat(this.locale() ?? undefined).format(parseIsoDate(value) as Date) : 'Select date';
  });
  private readonly overlays = inject(ErpOverlayManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private activeRef: ErpOverlayRef<ErpTemporalValue> | null = null;

  constructor() {
    super(null);
    effect(() => {
      if (this.dateEffectiveDisabled()) this.clearFocusState();
    });
  }

  protected override normalizeValue(value: unknown): string | null {
    return normalizeIsoDate(value, this.min(), this.max(), this.effectivePattern().regex);
  }

  protected openPicker(): void {
    if (this.dateEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpTemporalPickerContent, ErpTemporalPickerData, ErpTemporalValue>(ErpTemporalPickerContent, {
      frame: {
        header: {title: this.trimmedLabel(), subtitle: 'اختر التاريخ', icon: 'calendar'},
        footer: {
          primary: {label: ERP_TEMPORAL_DEFAULT_ACTION_LABELS.confirm},
          secondary: {label: ERP_TEMPORAL_DEFAULT_ACTION_LABELS.cancel},
        },
      },
      ...(this.overlayConfig() ?? {}),
      data: this.pickerData(),
    });
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => {
      this.activeRef = null;
      if (outcome.type === 'closed') this.commitPickerResult(outcome.result);
    });
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); }
  }

  protected handleClear(): void { this.commitUserValue(null); }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }

  private pickerData(): ErpTemporalPickerData {
    return {mode: 'date', value: this.currentValue(), min: this.min(), max: this.max(), weekStartsOn: this.weekStartsOn(), minuteStep: 5, locale: this.locale(), actionLabels: ERP_TEMPORAL_DEFAULT_ACTION_LABELS, clearable: this.clearable(), theme: this.theme()};
  }

  private commitPickerResult(value: ErpTemporalValue | undefined): void {
    if (value === null) {
      this.commitUserValue(null);
    } else if (typeof value === 'string' && this.normalizeValue(value) === value) {
      this.commitUserValue(value);
    }
  }

  private theme(): 'light' | 'dark' {
    return this.host.nativeElement.closest('[data-theme="dark"]') ? 'dark' : 'light';
  }
}
