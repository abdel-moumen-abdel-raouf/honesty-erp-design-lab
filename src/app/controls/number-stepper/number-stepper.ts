import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconButton} from '../icon-button/icon-button';
import {
  ERP_NUMBER_FINAL_PATTERN,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
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
    '[attr.data-field-configuration-state]': 'numberConfigurationState()',
  },
})
export class ErpNumberStepper extends ErpFieldBase<number | null> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(1);
  readonly allowEmpty = input(true, {transform: booleanAttribute});
  readonly pattern = input<string | null>(null);

  protected readonly controlId =
    `erp-number-stepper-${++nextNumberStepperId}`;
  private readonly draftText = signal('');
  private readonly editing = signal(false);
  private readonly effectivePattern = computed(() =>
    resolveDomainPattern(this.pattern(), ERP_NUMBER_FINAL_PATTERN),
  );
  protected readonly numberConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.fieldConfigurationState() === 'ready' &&
      this.effectivePattern().configurationState === 'ready'
        ? 'ready'
        : 'invalid',
    );
  protected readonly numberEffectiveDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.numberConfigurationState() === 'invalid',
  );
  protected readonly numberFocused = computed(
    () => !this.numberEffectiveDisabled() && this.fieldFocused(),
  );
  protected readonly displayValue = computed(() =>
    this.editing()
      ? this.draftText()
      : (this.currentValue()?.toString() ?? ''),
  );
  protected readonly effectivePatternExpression = computed(
    () => this.effectivePattern().expression,
  );
  protected readonly decrementDisabled = computed(
    () =>
      this.numberEffectiveDisabled() ||
      this.readonly() ||
      (this.currentValue() !== null &&
        this.min() !== null &&
        this.currentValue()! <= this.min()!),
  );
  protected readonly incrementDisabled = computed(
    () =>
      this.numberEffectiveDisabled() ||
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
      this.numberConfigurationState() === 'ready' &&
      !this.numberEffectiveDisabled() &&
      !this.readonly(),
  );

  constructor() {
    super(null);

    effect(() => {
      if (this.numberEffectiveDisabled()) {
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

    if (this.readonly() || this.numberEffectiveDisabled()) {
      native.value = this.draftText();
      return;
    }

    const value = native.value;

    if (!isProgressiveNumericDraft(value)) {
      native.value = this.draftText();
      return;
    }

    this.draftText.set(value);

    if (value === '') {
      this.commitUserValue(null);
      return;
    }

    if (matchesDomainPattern(value, this.effectivePattern().regex)) {
      this.commitUserValue(value);
    }
  }

  protected handleKeyDown(
    event: KeyboardEvent,
    inputElement: HTMLInputElement,
  ): void {
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
      this.commitSteppedValue(inputElement, this.min()!);
      return;
    }

    if (event.key === 'End' && this.max() !== null) {
      event.preventDefault();
      this.commitSteppedValue(inputElement, this.max()!);
    }
  }

  protected handleStep(
    inputElement: HTMLInputElement,
    direction: -1 | 1,
  ): void {
    if (
      this.numberEffectiveDisabled() ||
      this.readonly() ||
      (direction === -1 && this.decrementDisabled()) ||
      (direction === 1 && this.incrementDisabled())
    ) {
      return;
    }

    const current = this.currentValue() ?? 0;
    this.commitSteppedValue(inputElement, current + direction * this.step());
    inputElement.focus();
    this.handleFocus();
  }

  protected handleNativeFocus(): void {
    if (this.numberEffectiveDisabled()) {
      return;
    }

    this.draftText.set(this.currentValue()?.toString() ?? '');
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

    this.draftText.set('');
    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }

  private commitSteppedValue(
    inputElement: HTMLInputElement,
    value: number,
  ): void {
    const clamped = this.clamp(value);
    const source = String(clamped);

    if (!matchesDomainPattern(source, this.effectivePattern().regex)) {
      return;
    }

    if (this.commitUserValue(clamped)) {
      this.draftText.set(source);
      inputElement.value = source;
    }
  }

  private clamp(value: number): number {
    return Math.min(
      this.max() ?? Infinity,
      Math.max(this.min() ?? -Infinity, value),
    );
  }
}
