import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  formatMoneyPreview,
  resolveContextualPreference,
} from '../../foundation/preferences/core/ui-settings.formatters';
import {UiSettingsService} from '../../foundation/preferences/core/ui-settings.service';
import {DigitSet} from '../../foundation/preferences/core/ui-settings.types';
import {
  ERP_MONEY_FINAL_PATTERN,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextMoneyBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-money-box',
  imports: [ErpFieldFrame],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpMoneyBox),
      multi: true,
    },
  ],
  templateUrl: './money-box.html',
  styleUrl: './money-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'moneyConfigurationState()',
  },
})
export class ErpMoneyBox extends ErpFieldBase<number | null> {
  readonly currency = input.required<string>();
  readonly locale = input<string | null>(null);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(0.01);
  readonly minimumFractionDigits = input<number | null>(null);
  readonly maximumFractionDigits = input<number | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly allowEmpty = input(true, {transform: booleanAttribute});
  readonly pattern = input<string | null>(null);
  readonly digitSet = input<DigitSet | null>(null);

  protected readonly controlId = `erp-money-box-${++nextMoneyBoxId}`;
  private readonly settings = inject(UiSettingsService).store;
  private readonly digitPreference =
    this.settings.get('digits').valueSignal;
  private readonly numberSeparators =
    this.settings.get('numberSeparators').valueSignal;
  private readonly moneyDisplay = this.settings.get('moneyDisplay').valueSignal;
  private readonly editingText = signal('');
  private readonly editing = signal(false);
  private readonly effectivePattern = computed(() =>
    resolveDomainPattern(this.pattern(), ERP_MONEY_FINAL_PATTERN),
  );
  protected readonly moneyConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.fieldConfigurationState() === 'ready' &&
      this.currency().trim().length > 0 &&
      this.effectivePattern().configurationState === 'ready'
        ? 'ready'
        : 'invalid',
    );
  protected readonly moneyEffectiveDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.moneyConfigurationState() === 'invalid',
  );
  protected readonly moneyFocused = computed(
    () => !this.moneyEffectiveDisabled() && this.fieldFocused(),
  );
  protected readonly displayValue = computed(() =>
    this.editing()
      ? this.editingText()
      : this.formatValue(this.currentValue()),
  );
  protected readonly effectivePatternExpression = computed(
    () => this.effectivePattern().expression,
  );
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.allowEmpty() &&
      this.currentValue() !== null &&
      this.moneyConfigurationState() === 'ready' &&
      !this.moneyEffectiveDisabled() &&
      !this.readonly(),
  );

  constructor() {
    super(null);

    effect(() => {
      if (this.moneyEffectiveDisabled()) {
        this.editing.set(false);
        this.clearFocusState();
      }
    });
  }

  protected override normalizeValue(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return this.allowEmpty() ? null : this.clamp(0);
    }

    const numeric = parseFiniteDomainNumber(
      value,
      this.effectivePattern().regex,
    );

    return numeric === null
      ? this.allowEmpty()
        ? null
        : this.clamp(0)
      : this.clamp(numeric);
  }

  protected override canRepresentEmptyValue(): boolean {
    return this.allowEmpty();
  }

  protected handleInput(event: Event): void {
    const native = event.target as HTMLInputElement;

    if (this.readonly() || this.moneyEffectiveDisabled()) {
      native.value = this.editingText();
      return;
    }

    const value = native.value;

    if (!isProgressiveNumericDraft(value)) {
      native.value = this.editingText();
      return;
    }

    this.editingText.set(value);

    if (value === '') {
      this.commitUserValue(null);
      return;
    }

    if (matchesDomainPattern(value, this.effectivePattern().regex)) {
      this.commitUserValue(value);
    }
  }

  protected handleNativeFocus(): void {
    if (this.moneyEffectiveDisabled()) {
      return;
    }

    this.editingText.set(this.currentValue()?.toString() ?? '');
    this.editing.set(true);
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.editing.set(false);
    this.handleBlur();
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue(null)) {
      return;
    }

    this.editingText.set('');
    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }

  private clamp(value: number): number {
    return Math.min(
      this.max() ?? Infinity,
      Math.max(this.min() ?? -Infinity, value),
    );
  }

  private formatValue(value: number | null): string {
    if (value === null) {
      return '';
    }

    return formatMoneyPreview(
      value,
      this.currency(),
      this.currencySymbol(),
      this.digitSet() ??
        resolveContextualPreference(this.digitPreference(), 'money'),
      resolveContextualPreference(this.numberSeparators(), 'money'),
      this.moneyDisplay(),
    );
  }

  private currencySymbol(): string {
    try {
      const formatter = new Intl.NumberFormat(this.locale() ?? undefined, {
        style: 'currency',
        currency: this.currency(),
        currencyDisplay: 'narrowSymbol',
      });
      return (
        formatter.formatToParts(0).find((part) => part.type === 'currency')
          ?.value ?? this.currency()
      );
    } catch {
      return this.currency();
    }
  }
}
