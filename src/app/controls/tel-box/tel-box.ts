import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextTelBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-tel-box',
  imports: [ErpFieldFrame],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpTelBox),
    multi: true,
  }],
  templateUrl: './tel-box.html',
  styleUrl: './tel-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
  },
})
export class ErpTelBox extends ErpFieldBase<string> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('tel');

  protected readonly controlId = `erp-tel-box-${++nextTelBoxId}`;
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

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }
    inputElement.value = '';
    inputElement.focus();
    this.handleFocus();
  }
}
