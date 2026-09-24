import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpTooltip} from '../tooltip/tooltip';

let nextNumberStepperId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-number-stepper',
  imports: [ErpFieldFrame, ErpIconButton, ErpTooltip],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpNumberStepper),
      multi: true,
    },
  ],
  templateUrl: './number-stepper.html',
  styleUrl: './number-stepper.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
  },
})
export class ErpNumberStepper extends ErpFieldBase<number | null> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(1);
  readonly allowEmpty = input(true, {transform: booleanAttribute});

  protected readonly controlId =
    `erp-number-stepper-${++nextNumberStepperId}`;
  protected readonly decrementDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.readonly() ||
      (this.currentValue() !== null &&
        this.min() !== null &&
        this.currentValue()! <= this.min()!),
  );
  protected readonly incrementDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.readonly() ||
      (this.currentValue() !== null &&
        this.max() !== null &&
        this.currentValue()! >= this.max()!),
  );
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

    this.commitNativeValue(event.target as HTMLInputElement);
  }

  protected handleKeyDown(event: KeyboardEvent, inputElement: HTMLInputElement): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.handleStep(inputElement, 1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.handleStep(inputElement, -1);
      return;
    }

    if (event.key === 'Home' && this.min() !== null) {
      event.preventDefault();
      inputElement.valueAsNumber = this.min()!;
      this.commitNativeValue(inputElement);
      return;
    }

    if (event.key === 'End' && this.max() !== null) {
      event.preventDefault();
      inputElement.valueAsNumber = this.max()!;
      this.commitNativeValue(inputElement);
    }
  }

  protected handleStep(inputElement: HTMLInputElement, direction: -1 | 1): void {
    if (
      this.fieldEffectiveDisabled() ||
      this.readonly() ||
      (direction === -1 && this.decrementDisabled()) ||
      (direction === 1 && this.incrementDisabled())
    ) {
      return;
    }

    if (direction === 1) {
      inputElement.stepUp();
    } else {
      inputElement.stepDown();
    }
    this.commitNativeValue(inputElement);
    inputElement.focus();
    this.handleFocus();
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

  private commitNativeValue(inputElement: HTMLInputElement): void {
    this.commitUserValue(
      inputElement.value === '' ? null : inputElement.valueAsNumber,
    );
  }

  private clamp(value: number): number {
    return Math.min(this.max() ?? Infinity, Math.max(this.min() ?? -Infinity, value));
  }
}
