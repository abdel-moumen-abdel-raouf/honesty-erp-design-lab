import {Directive, inject, input, TemplateRef} from '@angular/core';
import {
  ErpEntityCustomFieldContext,
  ErpEntityCustomSectionContext,
  ErpEntityReviewContext,
} from './entity-form-contracts';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpEntityCustomField]',
})
export class ErpEntityCustomFieldOutlet {
  readonly outlet = input.required<string>({alias: 'erpEntityCustomField'});
  readonly template = inject<TemplateRef<ErpEntityCustomFieldContext>>(TemplateRef);
}
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpEntityCustomSection]',
})
export class ErpEntityCustomSectionOutlet {
  readonly outlet = input.required<string>({alias: 'erpEntityCustomSection'});
  readonly template = inject<TemplateRef<ErpEntityCustomSectionContext>>(TemplateRef);
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpEntityFormReview]',
})
export class ErpEntityFormReviewTemplate {
  readonly template = inject<TemplateRef<ErpEntityReviewContext>>(TemplateRef);
}
