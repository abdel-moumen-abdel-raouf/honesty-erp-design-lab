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
import {
  ErpInputConfigurationState,
  ErpInputValidationIssue,
} from '../input-family/input-contracts';
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
  readonly minLength = input<number | null>(null);
  readonly maxLength = input<number | null>(null);

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
    return value === null || value === undefined ? '' : String(value);
  }

  protected override validateCandidate(
    value: unknown,
  ): readonly ErpInputValidationIssue[] {
    const source = String(value ?? '');
    if (source.length === 0) {
      return [];
    }

    const issues: ErpInputValidationIssue[] = [];
    const plusCount = [...source].filter((character) => character === '+').length;
    const digitCount = [...source].filter((character) => /\d/.test(character)).length;

    if (containsAlphabeticCharacter(source)) {
      issues.push(
        this.validationIssue(
          'tel.alphabetic',
          'رقم الهاتف لا يسمح بحروف أبجدية.',
          'domain',
        ),
      );
    }

    if (plusCount > 1) {
      issues.push(
        this.validationIssue(
          'tel.plus-count',
          'يسمح بعلامة + واحدة فقط في رقم الهاتف.',
          'domain',
          {plusCount},
        ),
      );
    }

    if (source.includes('+') && !source.startsWith('+')) {
      issues.push(
        this.validationIssue(
          'tel.plus-position',
          'علامة + مسموحة فقط في بداية رقم الهاتف.',
          'domain',
        ),
      );
    }

    if (digitCount < 6) {
      issues.push(
        this.validationIssue(
          'tel.too-short',
          'رقم الهاتف أقصر من الحد الأدنى المطلوب.',
          'domain',
          {digitCount, minimumDigits: 6},
        ),
      );
    }

    if (digitCount > 20) {
      issues.push(
        this.validationIssue(
          'tel.too-long',
          'رقم الهاتف أطول من الحد الأقصى المسموح.',
          'domain',
          {digitCount, maximumDigits: 20},
        ),
      );
    }

    if (
      this.minLength() !== null &&
      source.length < (this.minLength() as number)
    ) {
      issues.push(
        this.validationIssue(
          'tel.min-length',
          `يجب ألا يقل طول القيمة عن ${this.minLength()} حرفًا.`,
          'constraint',
        ),
      );
    }

    if (
      this.maxLength() !== null &&
      source.length > (this.maxLength() as number)
    ) {
      issues.push(
        this.validationIssue(
          'tel.max-length',
          `يجب ألا يزيد طول القيمة عن ${this.maxLength()} حرفًا.`,
          'constraint',
        ),
      );
    }

    if (
      issues.length === 0 &&
      !matchesDomainPattern(source, this.effectivePattern().regex)
    ) {
      issues.push(
        this.validationIssue(
          'tel.format',
          'رقم الهاتف المُدخل غير صالح.',
          'domain',
        ),
      );
    }

    return issues;
  }

  protected handleInput(event: Event): void {
    const native = event.target as HTMLInputElement;

    if (this.readonly() || this.telEffectiveDisabled()) {
      return;
    }

    const value = native.value;
    this.draftText.set(value);
    this.commitUserValue(value);
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
