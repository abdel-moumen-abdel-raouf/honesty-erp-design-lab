import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {
  ErpInputConfigurationState,
  ErpInputState,
  ErpInputValidationIssue,
  ErpInputValidationSnapshot,
  ErpInputValidationSource,
} from './input-contracts';

@Directive()
export abstract class ErpInputBase<TValue> implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly name = input<string | null>(null);
  readonly form = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly required = input(false, {transform: booleanAttribute});
  readonly externalValidationIssues =
    input<readonly ErpInputValidationIssue[]>([]);

  private readonly formDisabled = signal(false);
  private readonly focusedState = signal(false);
  private readonly valueState: WritableSignal<TValue>;

  protected readonly trimmedLabel = computed(() => this.label().trim());
  protected readonly configurationState = computed<ErpInputConfigurationState>(
    () => (this.trimmedLabel().length > 0 ? 'ready' : 'invalid'),
  );
  protected readonly effectiveDisabled = computed(
    () =>
      this.configurationState() !== 'ready' ||
      this.disabled() ||
      this.formDisabled(),
  );
  protected readonly focused = computed(
    () => !this.effectiveDisabled() && this.focusedState(),
  );
  protected readonly currentValue: Signal<TValue>;

  private readonly presenceState = computed<ErpInputState | null>(() =>
    this.classifyPresence(this.validationCandidate()),
  );

  readonly validationIssues = computed<readonly ErpInputValidationIssue[]>(
    () => {
      const candidate = this.validationCandidate();
      const presence = this.presenceState();
      const issues: ErpInputValidationIssue[] = [];

      if (
        this.required() &&
        (presence === 'null' ||
          presence === 'empty' ||
          presence === 'no-selection')
      ) {
        issues.push(
          this.validationIssue(
            'required',
            'القيمة مطلوبة.',
            'presence',
          ),
        );
      }

      issues.push(...this.validateCandidate(candidate));
      issues.push(...this.externalValidationIssues());

      return issues;
    },
  );

  readonly valid = computed(() => this.validationIssues().length === 0);

  readonly inputState = computed<ErpInputState>(() => {
    const presence = this.presenceState();

    if (presence !== null) {
      return presence;
    }

    return this.valid() ? 'valid-entry' : 'invalid-entry';
  });

  readonly errors = computed<readonly string[]>(() =>
    this.validationIssues().map((issue) => issue.message),
  );

  readonly validation = computed<ErpInputValidationSnapshot>(() => ({
    state: this.inputState(),
    valid: this.valid(),
    errors: this.errors(),
    issues: this.validationIssues(),
  }));

  private onChange: (value: TValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  // eslint-disable-next-line @angular-eslint/prefer-inject -- The constructor receives a generic initial value, not an Angular dependency.
  protected constructor(initialValue: TValue) {
    this.valueState = signal(initialValue);
    this.currentValue = this.valueState.asReadonly();

    effect(() => {
      if (this.effectiveDisabled()) {
        this.clearFocusState();
      }
    });
  }

  writeValue(value: unknown): void {
    this.valueState.set(this.normalizeValue(value));
  }

  registerOnChange(fn: (value: TValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);

    if (isDisabled) {
      this.clearFocusState();
    }
  }

  protected clearFocusState(): void {
    this.focusedState.set(false);
  }

  protected commitUserValue(value: unknown): boolean {
    if (this.effectiveDisabled()) {
      return false;
    }

    const normalized = this.normalizeValue(value);
    this.valueState.set(normalized);
    this.onChange(normalized);
    return true;
  }

  protected handleFocus(): void {
    if (!this.effectiveDisabled()) {
      this.focusedState.set(true);
    }
  }

  protected handleBlur(): void {
    this.clearFocusState();
    this.onTouched();
  }

  protected validationCandidate(): unknown {
    return this.currentValue();
  }

  protected classifyPresence(value: unknown): ErpInputState | null {
    if (value === null || value === undefined) {
      return 'null';
    }

    if (typeof value === 'string' && value.length === 0) {
      return 'empty';
    }

    return null;
  }

  protected validateCandidate(
    _value: unknown,
  ): readonly ErpInputValidationIssue[] {
    return [];
  }

  protected validationIssue(
    code: string,
    message: string,
    source: ErpInputValidationSource = 'constraint',
    meta?: Readonly<
      Record<string, string | number | boolean | null>
    >,
  ): ErpInputValidationIssue {
    return meta === undefined
      ? {code, message, source}
      : {code, message, source, meta};
  }

  protected abstract normalizeValue(value: unknown): TValue;
}
