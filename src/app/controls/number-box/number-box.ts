import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextNumberBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-number-box',
  imports: [ErpFieldFrame],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpNumberBox),
      multi: true,
    },
  ],
  templateUrl: './number-box.html',
  styleUrl: './number-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
  },
})
export class ErpNumberBox extends ErpFieldBase<number | null> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly required = input(false, {transform: booleanAttribute});
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(1);
  readonly allowEmpty = input(true, {transform: booleanAttribute});

  protected readonly controlId = `erp-number-box-${++nextNumberBoxId}`;
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.allowEmpty() &&
      this.currentValue() !== null &&
      this.fieldConfigurationState() === 'ready' &&
      !this.fieldEffectiveDisabled() &&
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
    if (this.readonly()) {
      return;
    }

    const native = event.target as HTMLInputElement;
    this.commitUserValue(native.value === '' ? null : native.valueAsNumber);
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue(null)) {
      return;
    }

    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }

  private clamp(value: number): number {
    return Math.min(this.max() ?? Infinity, Math.max(this.min() ?? -Infinity, value));
  }
}
