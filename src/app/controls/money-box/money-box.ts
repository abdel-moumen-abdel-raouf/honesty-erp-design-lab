import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
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

  protected readonly controlId = `erp-money-box-${++nextMoneyBoxId}`;
  private readonly editingText = signal('');
  protected readonly moneyConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.fieldConfigurationState() === 'ready' && this.currency().trim().length > 0
        ? 'ready'
        : 'invalid',
    );
  protected readonly moneyEffectiveDisabled = computed(
    () => this.fieldEffectiveDisabled() || this.moneyConfigurationState() === 'invalid',
  );
  protected readonly displayValue = computed(() =>
    this.fieldFocused() ? this.editingText() : this.formatValue(this.currentValue()),
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
  }

  protected override normalizeValue(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return this.allowEmpty() ? null : this.clamp(0);
    }

    const numeric = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(numeric)
      ? this.clamp(numeric)
      : this.allowEmpty()
        ? null
        : this.clamp(0);
  }

  protected override canRepresentEmptyValue(): boolean {
    return this.allowEmpty();
  }

  protected handleInput(event: Event): void {
    if (this.readonly() || this.moneyEffectiveDisabled()) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.editingText.set(value);
    if (value.trim() === '') {
      this.commitUserValue(null);
      return;
    }

    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      this.commitUserValue(numeric);
    }
  }

  protected handleNativeFocus(): void {
    if (this.moneyEffectiveDisabled()) {
      return;
    }

    this.editingText.set(this.currentValue()?.toString() ?? '');
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
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
    return Math.min(this.max() ?? Infinity, Math.max(this.min() ?? -Infinity, value));
  }

  private formatValue(value: number | null): string {
    if (value === null) {
      return '';
    }

    try {
      return new Intl.NumberFormat(this.locale() ?? undefined, {
        style: 'currency',
        currency: this.currency(),
        minimumFractionDigits: this.minimumFractionDigits() ?? undefined,
        maximumFractionDigits: this.maximumFractionDigits() ?? undefined,
      }).format(value);
    } catch {
      return value.toString();
    }
  }
}
