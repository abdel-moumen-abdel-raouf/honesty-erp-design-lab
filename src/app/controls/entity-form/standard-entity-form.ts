import {NgTemplateOutlet} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';
import {ErpButton} from '../button/button';
import {ErpFormActions} from '../form-actions/form-actions';
import {ErpFormSection} from '../form-section/form-section';
import {ErpForm} from '../form/form';
import {ErpFormValidationIssue, ErpStepDefinition} from '../forms-family/forms-contracts';
import {ErpStepPanel, ErpStepper} from '../stepper/stepper';
import {ErpValidationSummary} from '../validation-summary/validation-summary';
import {
  ErpEntityCustomSection,
  ErpEntityCustomSectionContext,
  ErpEntityFieldValueChange,
  ErpEntityFormSchema,
  ErpEntityFormStep,
  ErpEntityFormSubmitIntent,
  ErpEntityFormValueChange,
  ErpEntityFormValues,
  ErpEntityReviewContext,
  ErpEntitySectionDefinition,
} from './entity-form-contracts';
import {
  ErpEntityCustomFieldOutlet,
  ErpEntityCustomSectionOutlet,
  ErpEntityFormReviewTemplate,
} from './entity-form-outlets';
import {ErpEntitySchemaFields} from './entity-schema-fields';
import {assertValidEntityFormSchema, ErpEntityFormSchemaError, updateEntityFormValues} from './entity-form-schema';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-standard-entity-form',
  imports: [
    ErpButton,
    ErpEntitySchemaFields,
    ErpForm,
    ErpFormActions,
    ErpFormSection,
    ErpStepPanel,
    ErpStepper,
    ErpValidationSummary,
    NgTemplateOutlet,
  ],
  templateUrl: './standard-entity-form.html',
  styleUrl: './standard-entity-form.scss',
  host: {'[attr.data-entity-form-schema]': 'validatedSchema().id'},
})
export class ErpStandardEntityForm {
  readonly schema = input.required<ErpEntityFormSchema>();
  readonly values = input.required<ErpEntityFormValues>();
  readonly issues = input<readonly ErpFormValidationIssue[]>([]);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly busy = input(false, {transform: booleanAttribute});
  readonly activeStepId = model('');
  readonly valueChanged = output<ErpEntityFormValueChange>();
  readonly submitRequested = output<ErpEntityFormSubmitIntent>();
  readonly resetRequested = output<void>();
  readonly cancelRequested = output<void>();
  readonly issueActivated = output<ErpFormValidationIssue>();

  protected readonly customFieldOutlets = contentChildren(ErpEntityCustomFieldOutlet);
  private readonly customSectionOutlets = contentChildren(ErpEntityCustomSectionOutlet);
  private readonly reviewTemplate = contentChild(ErpEntityFormReviewTemplate);
  protected readonly validatedSchema = computed(() => {
    const schema = this.schema();
    assertValidEntityFormSchema(schema);
    return schema;
  });
  protected readonly stepDefinitions = computed<readonly ErpStepDefinition[]>(() =>
    (this.validatedSchema().steps ?? []).map((step) => ({
      id: step.id,
      label: step.label,
      description: step.description,
      disabled: step.disabled,
      optional: step.optional,
      completed: step.completed,
    })),
  );

  protected sectionsFor(step: ErpEntityFormStep): readonly ErpEntitySectionDefinition[] {
    const ids = new Set(step.sectionIds);
    return this.validatedSchema().sections.filter((section) => ids.has(section.id));
  }

  protected customSectionTemplate(section: ErpEntityCustomSection): TemplateRef<ErpEntityCustomSectionContext> {
    const outlet = this.customSectionOutlets().find(
      (candidate) => candidate.outlet() === section.outlet,
    );
    if (!outlet) {
      throw new ErpEntityFormSchemaError(
        `Custom entity section ${section.id} requires outlet ${section.outlet}.`,
      );
    }
    return outlet.template;
  }

  protected customSectionContext(section: ErpEntityCustomSection): ErpEntityCustomSectionContext {
    return {
      $implicit: section,
      section,
      values: this.values(),
      issues: this.issues(),
      update: (change) => this.handleFieldChange(change),
    };
  }

  protected reviewTemplateFor(step: ErpEntityFormStep): TemplateRef<ErpEntityReviewContext> | null {
    return step.review ? this.reviewTemplate()?.template ?? null : null;
  }

  protected reviewContext(step: ErpEntityFormStep): ErpEntityReviewContext {
    return {$implicit: this.values(), values: this.values(), schema: this.validatedSchema(), step};
  }

  protected handleFieldChange(change: ErpEntityFieldValueChange): void {
    this.valueChanged.emit({
      ...change,
      nextValues: updateEntityFormValues(this.values(), change),
    });
  }

  protected submit(): void {
    if (!this.disabled() && !this.busy()) {
      this.submitRequested.emit({
        schemaId: this.validatedSchema().id,
        values: this.values(),
      });
    }
  }
}
