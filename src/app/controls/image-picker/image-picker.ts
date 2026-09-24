import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';

let nextImagePickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-image-picker',
  imports: [ErpButton, ErpFieldFrame, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpImagePicker),
      multi: true,
    },
  ],
  templateUrl: './image-picker.html',
  styleUrl: './image-picker.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-image-picker-selected]': 'currentValue() !== null',
    '[attr.data-image-picker-file-name]': 'currentValue()?.name ?? null',
  },
})
export class ErpImagePicker
  extends ErpFieldBase<File | null>
  implements OnDestroy
{
  readonly accept = input('image/*');
  override readonly clearable = input(true, {transform: booleanAttribute});

  protected readonly controlId = `erp-image-picker-${++nextImagePickerId}`;
  protected readonly nativeInput =
    viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  protected readonly previewUrl = signal<string | null>(null);
  protected readonly displayText = computed(
    () => this.currentValue()?.name ?? 'No image selected',
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
    const normalized = this.normalizeValue(value);
    super.writeValue(normalized);
    this.replacePreview(normalized);
    if (normalized === null) {
      const native = this.nativeInput()?.nativeElement;
      if (native) {
        native.value = '';
      }
    }
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  protected override normalizeValue(value: unknown): File | null {
    return value instanceof File && value.type.startsWith('image/')
      ? value
      : null;
  }

  protected openNativePicker(inputElement: HTMLInputElement): void {
    if (!this.fieldEffectiveDisabled()) {
      inputElement.click();
    }
  }

  protected handleSelection(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = this.normalizeValue(inputElement.files?.item(0) ?? null);
    if (!this.commitUserValue(file)) {
      return;
    }
    this.replacePreview(file);
    if (file === null) {
      inputElement.value = '';
    }
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
    this.replacePreview(null);
  }

  private replacePreview(file: File | null): void {
    this.revokePreview();
    if (file !== null && typeof URL.createObjectURL === 'function') {
      this.previewUrl.set(URL.createObjectURL(file));
    }
  }

  private revokePreview(): void {
    const current = this.previewUrl();
    if (current !== null && typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(current);
    }
    this.previewUrl.set(null);
  }
}
