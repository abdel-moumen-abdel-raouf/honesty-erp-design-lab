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
import {ErpInputConfigurationState} from './input-contracts';

@Directive()
export abstract class ErpInputBase<TValue> implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly name = input<string | null>(null);
  readonly form = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});

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

  protected abstract normalizeValue(value: unknown): TValue;
}
