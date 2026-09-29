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
  ERP_URL_FINAL_PATTERN,
  isHttpUrlDomainValue,
  resolveDomainPattern,
} from '../input-family/domain-validation';
import {ErpFieldBase} from '../input-family/field-base';
import {
  ErpInputConfigurationState,
  ErpInputValidationIssue,
} from '../input-family/input-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextUrlBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-url-box',
  imports: [ErpFieldFrame],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpUrlBox),
      multi: true,
    },
  ],
  templateUrl: './url-box.html',
  styleUrl: './url-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'urlConfigurationState()',
  },
})
export class ErpUrlBox extends ErpFieldBase<string> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('url');
  readonly pattern = input<string | null>(null);
  readonly minLength = input<number | null>(null);
  readonly maxLength = input<number | null>(null);

  protected readonly controlId = `erp-url-box-${++nextUrlBoxId}`;
  private readonly draftText = signal('');
  private readonly editing = signal(false);
  private readonly effectivePattern = computed(() =>
    resolveDomainPattern(this.pattern(), ERP_URL_FINAL_PATTERN),
  );
  protected readonly urlConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.fieldConfigurationState() === 'ready' &&
      this.effectivePattern().configurationState === 'ready'
        ? 'ready'
        : 'invalid',
    );
  protected readonly urlEffectiveDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.urlConfigurationState() === 'invalid',
  );
  protected readonly urlFocused = computed(
    () => !this.urlEffectiveDisabled() && this.fieldFocused(),
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
      this.urlConfigurationState() === 'ready' &&
      !this.urlEffectiveDisabled() &&
      !this.readonly(),
  );

  constructor() {
    super('');

    effect(() => {
      if (this.urlEffectiveDisabled()) {
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

    if (
      this.minLength() !== null &&
      source.length < (this.minLength() as number)
    ) {
      issues.push(
        this.validationIssue(
          'url.min-length',
          `يجب ألا يقل طول عنوان الرابط عن ${this.minLength()} حرفًا.`,
          'constraint',
          {minLength: this.minLength(), actualLength: source.length},
        ),
      );
    }

    if (
      this.maxLength() !== null &&
      source.length > (this.maxLength() as number)
    ) {
      issues.push(
        this.validationIssue(
          'url.max-length',
          `يجب ألا يزيد طول عنوان الرابط عن ${this.maxLength()} حرفًا.`,
          'constraint',
          {maxLength: this.maxLength(), actualLength: source.length},
        ),
      );
    }

    if (!isHttpUrlDomainValue(source, this.effectivePattern().regex)) {
      issues.push(
        this.validationIssue(
          'url.format',
          'النص المُدخل ليس عنوان رابط إلكتروني صالحًا.',
          'domain',
        ),
      );
    }

    return issues;
  }

  protected handleInput(event: Event): void {
    if (this.readonly() || this.urlEffectiveDisabled()) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.draftText.set(value);

    this.commitUserValue(value);
  }

  protected handleNativeFocus(): void {
    if (this.urlEffectiveDisabled()) {
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
