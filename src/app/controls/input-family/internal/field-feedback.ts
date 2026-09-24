import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpTextTone, ErpText} from '../../../primitives/text/text';
import {ErpButtonTone} from '../../button-family/button-contracts';
import {ErpIconButton} from '../../icon-button/icon-button';
import {ErpTooltip} from '../../tooltip/tooltip';
import {ErpFieldStatus} from '../field-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-field-feedback',
  imports: [ErpIconButton, ErpText, ErpTooltip],
  templateUrl: './field-feedback.html',
  styleUrl: './field-feedback.scss',
  host: {
    '[attr.data-field-feedback-status]': 'status()',
    '[attr.data-field-feedback-dismissible]': 'dismissible()',
  },
})
export class ErpFieldFeedback {
  readonly messageId = input.required<string>();
  readonly text = input.required<string>();
  readonly status = input<ErpFieldStatus>('none');
  readonly dismissible = input(false, {transform: booleanAttribute});
  readonly dismissLabel = input('إغلاق الرسالة');
  readonly dismissed = output<void>();

  readonly textTone = computed<ErpTextTone>(() => {
    const status = this.status();
    return status === 'none' ? 'secondary' : status;
  });
  readonly actionTone = computed<ErpButtonTone>(() => {
    const status = this.status();
    return status === 'none' ? 'neutral' : status;
  });
}
