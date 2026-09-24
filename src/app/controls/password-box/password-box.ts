import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpTooltip} from '../tooltip/tooltip';

let nextPasswordBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-password-box',
  imports: [ErpFieldFrame, ErpIconButton, ErpTooltip],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpPasswordBox),
      multi: true,
    },
  ],
  templateUrl: './password-box.html',
  styleUrl: './password-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-password-revealed]': 'revealed()',
  },
})
export class ErpPasswordBox extends ErpFieldBase<string> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly required = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('current-password');
  readonly revealToggle = input(true, {transform: booleanAttribute});

  protected readonly controlId =
    `erp-password-box-${++nextPasswordBoxId}`;
  protected readonly revealed = signal(false);
  protected readonly nativeType = computed(() =>
    this.revealed() ? 'text' : 'password',
  );
  protected readonly revealLabel = computed(() =>
    this.revealed() ? 'Hide password' : 'Show password',
  );
  protected readonly revealIcon = computed(() =>
    this.revealed() ? 'eye-off' : 'eye',
  );
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.currentValue().length > 0 &&
      this.fieldConfigurationState() === 'ready' &&
      !this.fieldEffectiveDisabled() &&
      !this.readonly(),
  );

  constructor() {
    super('');
  }

  protected override normalizeValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }

  protected handleInput(event: Event): void {
    if (!this.readonly()) {
      this.commitUserValue((event.target as HTMLInputElement).value);
    }
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  protected toggleReveal(): void {
    if (!this.fieldEffectiveDisabled() && !this.readonly()) {
      this.revealed.update((value) => !value);
    }
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }

    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }
}
