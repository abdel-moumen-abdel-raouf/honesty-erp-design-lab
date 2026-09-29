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
  ERP_NUMBER_FINAL_PATTERN,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
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
    '[attr.data-field-configuration-state]': 'numberConfigurationState()',
  },
})
export class ErpNumberBox extends ErpFieldBase<number | null> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(1);
  readonly allowEmpty = input(true, {transform: booleanAttribute});
  readonly pattern = input<string | null>(null);

  protected readonly controlId = `erp-number-box-${++nextNumberBoxId}`;
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

  private clamp(value: number): number {
    return Math.min(
      this.max() ?? Infinity,
      Math.max(this.min() ?? -Infinity, value),
    );
  }
}
