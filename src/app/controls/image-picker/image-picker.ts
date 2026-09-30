import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpFileSelectionBase} from '../input-family/file-selection-base';
import {ErpFieldFeedback} from '../input-family/internal/field-feedback';
import {ErpTooltip} from '../tooltip/tooltip';

export type ErpImagePickerPreviewSize = 'sm' | 'md' | 'lg';

let nextImagePickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-image-picker',
  imports: [
    ErpButton,
    ErpFieldFeedback,
    ErpIcon,
    ErpIconButton,
    ErpText,
    ErpTooltip,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpImagePicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpImagePicker),
      multi: true,
    },
  ],
  templateUrl: './image-picker.html',
  styleUrls: [
    './image-picker.scss',
    './image-picker-facets.scss',
    './image-picker-selection.scss',
  ],
  host: {
    '[attr.data-field-configuration-state]':
      'selectionConfigurationState()',
    '[attr.data-field-tone]': 'tone()',
    '[attr.data-field-status]': 'status()',
    '[attr.data-image-picker-count]': 'selectedFiles().length',
    '[attr.data-image-picker-drag-active]': 'dragActive()',
    '[attr.data-image-picker-disabled]': 'selectionEffectiveDisabled()',
    '[attr.data-image-picker-preview-size]': 'previewSize()',
  },
})
export class ErpImagePicker
  extends ErpFileSelectionBase
  implements OnDestroy
{
  override readonly accept = input<string | null>('image/*');
  readonly previewSize = input<ErpImagePickerPreviewSize>('md');

  protected readonly controlId = `erp-image-picker-${++nextImagePickerId}`;
  protected readonly labelId = `${this.controlId}-label`;
  protected readonly guidanceId = `${this.controlId}-guidance`;
  protected readonly policyFeedbackId = `${this.controlId}-policy-feedback`;
  private readonly previewUrls = signal<ReadonlyMap<string, string>>(new Map());

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    for (const url of this.previewUrls().values()) {
      this.revokeObjectUrl(url);
    }
    this.previewUrls.set(new Map());
  }

  protected previewUrlFor(file: File): string | null {
    return this.previewUrls().get(this.fileIdentity(file)) ?? null;
  }

  protected override selectionChanged(files: readonly File[]): void {
    const current = this.previewUrls();
    const next = new Map<string, string>();

    for (const file of files) {
      const identity = this.fileIdentity(file);
      const existing = current.get(identity);
      if (existing) {
        next.set(identity, existing);
      } else if (typeof URL.createObjectURL === 'function') {
        next.set(identity, URL.createObjectURL(file));
      }
    }

    for (const [identity, url] of current) {
      if (!next.has(identity)) {
        this.revokeObjectUrl(url);
      }
    }

    this.previewUrls.set(next);
  }

  private revokeObjectUrl(url: string): void {
    if (typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(url);
    }
  }
}
