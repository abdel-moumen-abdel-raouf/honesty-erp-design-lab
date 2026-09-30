import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpFileSelectionBase} from '../input-family/file-selection-base';
import {ErpFieldFeedback} from '../input-family/internal/field-feedback';
import {ErpTooltip} from '../tooltip/tooltip';

let nextFilePickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-file-picker',
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
      useExisting: forwardRef(() => ErpFilePicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpFilePicker),
      multi: true,
    },
  ],
  templateUrl: './file-picker.html',
  styleUrls: [
    './file-picker.scss',
    './file-picker-facets.scss',
    './file-picker-selection.scss',
  ],
  host: {
    '[attr.data-field-configuration-state]':
      'selectionConfigurationState()',
    '[attr.data-field-tone]': 'tone()',
    '[attr.data-field-status]': 'status()',
    '[attr.data-file-picker-count]': 'selectedFiles().length',
    '[attr.data-file-picker-drag-active]': 'dragActive()',
    '[attr.data-file-picker-disabled]': 'selectionEffectiveDisabled()',
  },
})
export class ErpFilePicker extends ErpFileSelectionBase {
  protected readonly controlId = `erp-file-picker-${++nextFilePickerId}`;
  protected readonly labelId = `${this.controlId}-label`;
  protected readonly guidanceId = `${this.controlId}-guidance`;
  protected readonly policyFeedbackId = `${this.controlId}-policy-feedback`;

  constructor() {
    super();
  }
}
