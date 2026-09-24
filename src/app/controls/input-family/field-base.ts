import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {
  ErpFieldAppearance,
  ErpFieldBorderMode,
  ErpFieldFloatingPosition,
  ErpFieldHelperPosition,
  ErpFieldLabelMode,
  ErpFieldShape,
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
  ErpFieldVariant,
} from './field-contracts';
import {ErpInputBase} from './input-base';
import {ErpInputConfigurationState} from './input-contracts';
import {resolveFieldCompatibility} from './internal/field-compatibility';

@Directive()
export abstract class ErpFieldBase<TValue> extends ErpInputBase<TValue> {
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly variant = input<ErpFieldVariant>('outline');
  readonly borderMode = input<ErpFieldBorderMode>('solid');
  readonly shape = input<ErpFieldShape>('default');
  readonly size = input<ErpFieldSize>('md');
  readonly appearance = input<ErpFieldAppearance>('standard');
  readonly labelMode = input<ErpFieldLabelMode>('static');
  readonly floatingPosition = input<ErpFieldFloatingPosition>('top');
  readonly helperText = input<string | null>(null);
  readonly helperPosition = input<ErpFieldHelperPosition>('below');
  readonly leadingIcon = input<ErpIconName | null>(null);
  readonly trailingIcon = input<ErpIconName | null>(null);
  readonly clearable = input(false, {transform: booleanAttribute});
  readonly feedbackText = input<string | null>(null);
  readonly feedbackDismissible = input(false, {
    transform: booleanAttribute,
  });

  private readonly feedbackDismissedState = signal(false);

  protected readonly trimmedHelperText = computed(
    () => this.helperText()?.trim() ?? '',
  );
  protected readonly trimmedFeedbackText = computed(
    () => this.feedbackText()?.trim() ?? '',
  );
  protected readonly feedbackDismissed =
    this.feedbackDismissedState.asReadonly();
  protected readonly feedbackVisible = computed(
    () =>
      this.status() !== 'none' &&
      this.trimmedFeedbackText().length > 0 &&
      !this.feedbackDismissed(),
  );
  protected readonly fieldCompatibility = computed(() =>
    resolveFieldCompatibility({
      appearance: this.appearance(),
      borderMode: this.borderMode(),
      shape: this.shape(),
      variant: this.variant(),
      multiline: this.isMultilineField(),
      clearable: this.clearable(),
      canRepresentEmpty: this.canRepresentEmptyValue(),
    }),
  );
  protected readonly fieldConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.configurationState() === 'ready'
        ? this.fieldCompatibility().configurationState
        : 'invalid',
    );
  protected readonly fieldEffectiveDisabled = computed(
    () =>
      this.effectiveDisabled() ||
      this.fieldConfigurationState() === 'invalid',
  );
  protected readonly fieldFocused = computed(
    () => !this.fieldEffectiveDisabled() && this.focused(),
  );
  protected readonly effectiveBorderMode = computed(
    () => this.fieldCompatibility().effectiveBorderMode,
  );

  // eslint-disable-next-line @angular-eslint/prefer-inject -- The constructor receives a generic initial value, not an Angular dependency.
  protected constructor(initialValue: TValue) {
    super(initialValue);

    effect(() => {
      this.feedbackText();
      this.status();
      untracked(() => this.feedbackDismissedState.set(false));
    });
  }

  protected dismissFeedback(): boolean {
    if (!this.feedbackVisible() || !this.feedbackDismissible()) {
      return false;
    }

    this.feedbackDismissedState.set(true);
    return true;
  }

  protected isMultilineField(): boolean {
    return false;
  }

  protected canRepresentEmptyValue(): boolean {
    return true;
  }

  protected helperIdFor(controlId: string): string {
    return `${controlId}-helper`;
  }

  protected feedbackIdFor(controlId: string): string {
    return `${controlId}-feedback`;
  }

  protected fieldAriaDescribedBy(controlId: string): string | null {
    const relationships = [
      this.trimmedHelperText().length > 0
        ? this.helperIdFor(controlId)
        : null,
      this.feedbackVisible() ? this.feedbackIdFor(controlId) : null,
    ].filter((value): value is string => value !== null);

    return relationships.length > 0 ? relationships.join(' ') : null;
  }

  protected fieldAriaErrorMessage(controlId: string): string | null {
    return this.status() === 'danger' && this.feedbackVisible()
      ? this.feedbackIdFor(controlId)
      : null;
  }
}
