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
}
