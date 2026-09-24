import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

export type ErpTextAreaResize = 'vertical' | 'both' | 'none';

let nextTextAreaBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-text-area-box',
  imports: [ErpFieldFrame, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpTextAreaBox),
      multi: true,
    },
  ],
  templateUrl: './text-area-box.html',
  styleUrl: './text-area-box.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-text-area-resize]': 'resize()',
  },
})
export class ErpTextAreaBox extends ErpFieldBase<string> {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly required = input(false, {transform: booleanAttribute});
  readonly minLength = input<number | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly rows = input(4);
  readonly resize = input<ErpTextAreaResize>('vertical');
  readonly showCounter = input(false, {transform: booleanAttribute});

  protected readonly controlId =
    `erp-text-area-box-${++nextTextAreaBoxId}`;
  protected readonly counterVisible = computed(
    () => this.maxLength() !== null && this.showCounter(),
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

  protected override isMultilineField(): boolean {
    return true;
  }

  protected handleInput(event: Event): void {
    if (!this.readonly()) {
      this.commitUserValue((event.target as HTMLTextAreaElement).value);
    }
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  protected handleClear(textArea: HTMLTextAreaElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }

    textArea.value = '';
    textArea.focus();
    this.handleFocus();
  }
}
