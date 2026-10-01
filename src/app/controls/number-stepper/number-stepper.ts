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
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconButton} from '../icon-button/icon-button';
import {
  ERP_NUMBER_FINAL_PATTERN,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {
  ErpInputConfigurationState,
  ErpInputValidationIssue,
} from '../input-family/input-contracts';
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
    {
      provide: NG_VALIDATORS,
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
  private readonly draftActive = signal(false);
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
    this.editing() || this.draftActive()
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

  override writeValue(value: unknown): void {
    this.draftActive.set(false);
    super.writeValue(value);
  }

  protected override normalizeValue(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return this.allowEmpty() ? null : 0;
    }

    const numeric = Number(value);
    return Number.isFinite(numeric)
      ? numeric
      : this.allowEmpty()
        ? null
        : 0;
  }

  protected override validationCandidate(): unknown {
    return this.draftActive()
      ? this.draftText()
      : this.currentValue();
  }

  protected override validateCandidate(
    value: unknown,
  ): readonly ErpInputValidationIssue[] {
    if (value === null || value === undefined || value === '') {
      return [];
    }

    const source = String(value);
    const numeric = parseFiniteDomainNumber(
      source,
      this.effectivePattern().regex,
    );

    if (numeric === null) {
      return [
        this.validationIssue(
          'number-stepper.format',
          'القيمة المُدخلة ليست رقمًا صالحًا.',
          'format',
        ),
      ];
    }

    const issues: ErpInputValidationIssue[] = [];

    if (this.min() !== null && numeric < (this.min() as number)) {
      issues.push(
        this.validationIssue(
          'number-stepper.min',
          `القيمة يجب ألا تقل عن ${this.min()}.`,
          'constraint',
          {min: this.min(), actual: numeric},
        ),
      );
    }

    if (this.max() !== null && numeric > (this.max() as number)) {
      issues.push(
        this.validationIssue(
          'number-stepper.max',
          `القيمة يجب ألا تتجاوز ${this.max()}.`,
          'constraint',
          {max: this.max(), actual: numeric},
        ),
      );
    }

    const step = this.step();
    if (Number.isFinite(step) && step > 0) {
      const origin = this.min() ?? 0;
      const offset = Math.abs((numeric - origin) / step);
      const nearest = Math.round(offset);
      if (Math.abs(offset - nearest) > 1e-9) {
        issues.push(
          this.validationIssue(
            'number-stepper.step',
            `القيمة يجب أن تتوافق مع الخطوة ${step}.`,
            'constraint',
            {step, origin, actual: numeric},
          ),
        );
      }
    }

    return issues;
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
    this.draftActive.set(true);
    this.notifyValidationChange();

    if (value === '') {
      this.commitUserValue(null);
      return;
    }

    if (
      isProgressiveNumericDraft(value) &&
      matchesDomainPattern(value, this.effectivePattern().regex)
    ) {
      const numeric = Number(value);
      if (Number.isFinite(numeric)) {
        this.commitUserValue(numeric);
      }
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

    if (!this.draftActive()) {
      this.draftText.set(this.currentValue()?.toString() ?? '');
    }
    this.editing.set(true);
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.editing.set(false);
    if (this.valid()) {
      this.draftActive.set(false);
    }
    this.handleBlur();
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue(null)) {
      return;
    }

    this.draftText.set('');
    this.draftActive.set(false);
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
