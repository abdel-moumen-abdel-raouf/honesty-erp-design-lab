import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {
  ErpEntityFormSchema,
  ErpEntityFormSubmitIntent,
  ErpEntityFormValueChange,
  ErpEntityFormValues,
} from '../../controls/entity-form/entity-form-contracts';
import {
  ErpEntityCustomFieldOutlet,
  ErpEntityCustomSectionOutlet,
  ErpEntityFormReviewTemplate,
} from '../../controls/entity-form/entity-form-outlets';
import {ErpStandardEntityForm} from '../../controls/entity-form/standard-entity-form';
import {ErpFormValidationIssue} from '../../controls/forms-family/forms-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design-Lab-only review internals intentionally use the erp-review prefix.
  selector: 'erp-review-entity-form-template-evidence',
  imports: [
    ErpEntityCustomFieldOutlet,
    ErpEntityCustomSectionOutlet,
    ErpEntityFormReviewTemplate,
    ErpStandardEntityForm,
    ErpText,
    ErpTextBox,
    FormsModule,
  ],
  templateUrl: './entity-form-template-evidence.html',
})
export class ErpReviewEntityFormTemplateEvidence {
  readonly schema = input.required<ErpEntityFormSchema>();
  readonly values = input.required<ErpEntityFormValues>();
  readonly issues = input<readonly ErpFormValidationIssue[]>([]);
  readonly valueChanged = output<ErpEntityFormValueChange>();
  readonly submitRequested = output<ErpEntityFormSubmitIntent>();
  readonly resetRequested = output<void>();
  readonly cancelRequested = output<void>();
}
