import {ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {ErpRepeaterItem, ErpStepDefinition} from '../../controls/forms-family/forms-contracts';
import {ErpRepeater, ErpRepeaterItemTemplate} from '../../controls/repeater/repeater';
import {ErpStepPanel, ErpStepper} from '../../controls/stepper/stepper';
import {ErpText} from '../../primitives/text/text';

export type ErpReviewFormsTemplateMode = 'repeater' | 'stepper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design-Lab-only review internals intentionally use the erp-review prefix.
  selector: 'erp-review-forms-template-evidence',
  imports: [ErpRepeater, ErpRepeaterItemTemplate, ErpStepper, ErpStepPanel, ErpText],
  templateUrl: './forms-template-evidence.html',
})
export class ErpReviewFormsTemplateEvidence {
  readonly mode = input.required<ErpReviewFormsTemplateMode>();
  readonly contacts = input.required<readonly ErpRepeaterItem<{readonly name: string; readonly role: string}>[]>();
  readonly steps = input.required<readonly ErpStepDefinition[]>();
  readonly activeId = model.required<string>();
  readonly addRequested = output<void>();
  readonly removeRequested = output<string>();
}
