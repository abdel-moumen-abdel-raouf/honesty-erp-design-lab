import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextFilePickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-file-picker',
  imports: [ErpButton, ErpFieldFrame, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpFilePicker),
      multi: true,
    },
  ],
  templateUrl: './file-picker.html',
  styleUrl: './file-picker.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-file-picker-selected]': 'currentValue() !== null',
    '[attr.data-file-picker-file-name]': 'currentValue()?.name ?? null',
  },
})
export class ErpFilePicker extends ErpFieldBase<File | null> {
  readonly accept = input<string | null>(null);
  override readonly clearable = input(true, {transform: booleanAttribute});

  protected readonly controlId = `erp-file-picker-${++nextFilePickerId}`;
  protected readonly nativeInput =
    viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  protected readonly displayText = computed(
    () => this.currentValue()?.name ?? 'No file selected',
  );
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.currentValue() !== null &&
      this.fieldConfigurationState() === 'ready' &&
      !this.fieldEffectiveDisabled(),
  );

  constructor() {
    super(null);
  }

  override writeValue(value: unknown): void {
    super.writeValue(value);
    if (value === null || value === undefined) {
      const native = this.nativeInput()?.nativeElement;
      if (native) {
        native.value = '';
      }
    }
  }

  protected override normalizeValue(value: unknown): File | null {
    return value instanceof File ? value : null;
  }

  protected openNativePicker(inputElement: HTMLInputElement): void {
    if (!this.fieldEffectiveDisabled()) {
      inputElement.click();
    }
  }

  protected handleSelection(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.commitUserValue(inputElement.files?.item(0) ?? null);
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  protected handleClear(inputElement: HTMLInputElement): void {
    if (!this.clearActionVisible() || !this.commitUserValue(null)) {
      return;
    }

    inputElement.value = '';
  }
}
