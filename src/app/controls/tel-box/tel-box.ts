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
import {
  containsAlphabeticCharacter,
  ERP_TEL_FINAL_PATTERN,
  matchesDomainPattern,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextTelBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-tel-box',
  imports: [ErpFieldFrame],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpTelBox),
      multi: true,
    },
  ],
  templateUrl: './tel-box.html',
  styleUrl: './tel-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'telConfigurationState()',
  },
})
export class ErpTelBox extends ErpFieldBase<string> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('tel');
  readonly pattern = input<string | null>(null);

  protected readonly controlId = `erp-tel-box-${++nextTelBoxId}`;
  private readonly draftText = signal('');
  private readonly editing = signal(false);
  private readonly effectivePattern = computed(() =>
    resolveDomainPattern(this.pattern(), ERP_TEL_FINAL_PATTERN),
  );
  protected readonly telConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.fieldConfigurationState() === 'ready' &&
      this.effectivePattern().configurationState === 'ready'
        ? 'ready'
        : 'invalid',
    );
  protected readonly telEffectiveDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.telConfigurationState() === 'invalid',
  );
  protected readonly telFocused = computed(
    () => !this.telEffectiveDisabled() && this.fieldFocused(),
  );
  protected readonly displayValue = computed(() =>
    this.editing() ? this.draftText() : this.currentValue(),
  );
  protected readonly effectivePatternExpression = computed(
    () => this.effectivePattern().expression,
  );
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.displayValue().length > 0 &&
      this.telConfigurationState() === 'ready' &&
      !this.telEffectiveDisabled() &&
      !this.readonly(),
  );

  constructor() {
    super('');

    effect(() => {
      if (this.telEffectiveDisabled()) {
        this.editing.set(false);
        this.clearFocusState();
      }
    });
  }

  protected override normalizeValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const source = String(value);
    return matchesDomainPattern(source, this.effectivePattern().regex)
      ? source
      : '';
  }

  protected handleInput(event: Event): void {
    const native = event.target as HTMLInputElement;

    if (this.readonly() || this.telEffectiveDisabled()) {
      native.value = this.draftText();
      return;
    }

    const value = native.value;

    if (containsAlphabeticCharacter(value)) {
      native.value = this.draftText();
      return;
    }

    this.draftText.set(value);

    if (
      value === '' ||
      matchesDomainPattern(value, this.effectivePattern().regex)
    ) {
      this.commitUserValue(value);
    }
  }

  protected handleNativeFocus(): void {
    if (this.telEffectiveDisabled()) {
      return;
    }

    this.draftText.set(this.currentValue());
    this.editing.set(true);
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.editing.set(false);
    this.handleBlur();
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }

    this.draftText.set('');
    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }
}
