import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ErpCheckBox} from '../check-box/check-box';
import {ErpDateBox} from '../date-box/date-box';
import {ErpDateTimeBox} from '../date-time-box/date-time-box';
import {ErpFormValidationIssue} from '../forms-family/forms-contracts';
import {ErpInputValidationIssue} from '../input-family/input-contracts';
import {ErpMoneyBox} from '../money-box/money-box';
import {ErpNumberBox} from '../number-box/number-box';
import {ErpPasswordBox} from '../password-box/password-box';
import {ErpRadioGroup} from '../radio-group/radio-group';
import {ErpSelect} from '../select/select';
import {ErpTelBox} from '../tel-box/tel-box';
import {ErpTextAreaBox} from '../text-area-box/text-area-box';
import {ErpTextBox} from '../text-box/text-box';
import {ErpTimeBox} from '../time-box/time-box';
import {ErpUrlBox} from '../url-box/url-box';
import {
  ErpEntityCustomFieldContext,
  ErpEntityFieldDefinition,
  ErpEntityFieldsSection,
  ErpEntityFieldValue,
  ErpEntityFieldValueChange,
  ErpEntityFormValues,
} from './entity-form-contracts';
import {ErpEntityCustomFieldOutlet} from './entity-form-outlets';
import {assertSupportedEntityField, ErpEntityFormSchemaError} from './entity-form-schema';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-entity-schema-fields',
  imports: [
    ErpCheckBox,
    ErpDateBox,
    ErpDateTimeBox,
    ErpMoneyBox,
    ErpNumberBox,
    ErpPasswordBox,
    ErpRadioGroup,
    ErpSelect,
    ErpTelBox,
    ErpTextAreaBox,
    ErpTextBox,
    ErpTimeBox,
    ErpUrlBox,
    FormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './entity-schema-fields.html',
  styleUrl: './entity-schema-fields.scss',
  host: {'[attr.data-entity-schema-field-count]': 'validatedFields().length'},
})
export class ErpEntitySchemaFields {
  readonly fields = input.required<readonly ErpEntityFieldDefinition[]>();
  readonly values = input.required<ErpEntityFormValues>();
  readonly section = input<ErpEntityFieldsSection | null>(null);
  readonly issues = input<readonly ErpFormValidationIssue[]>([]);
  readonly customFieldOutlets = input<readonly ErpEntityCustomFieldOutlet[]>([]);
  readonly fieldValueChanged = output<ErpEntityFieldValueChange>();

  private readonly projectedCustomFields = contentChildren(ErpEntityCustomFieldOutlet);
  protected readonly ngModelOptions = {standalone: true} as const;
  protected readonly validatedFields = computed(() => {
    for (const field of this.fields()) assertSupportedEntityField(field);
    return this.fields();
  });
  private readonly availableCustomFields = computed(() => [
    ...this.customFieldOutlets(),
    ...this.projectedCustomFields(),
  ]);

  protected valueFor(field: ErpEntityFieldDefinition): ErpEntityFieldValue {
    return this.values()[field.key] ?? null;
  }

  protected update(field: ErpEntityFieldDefinition, value: ErpEntityFieldValue): void {
    this.fieldValueChanged.emit({key: field.key, value});
  }

  protected fieldIssues(field: ErpEntityFieldDefinition): readonly ErpFormValidationIssue[] {
    return this.issues().filter((issue) => issue.targetId === field.key);
  }

  protected inputIssues(field: ErpEntityFieldDefinition): readonly ErpInputValidationIssue[] {
    return this.fieldIssues(field).map((issue) => ({
      code: issue.key,
      message: issue.message,
      source: 'external',
    }));
  }

  protected customTemplate(field: ErpEntityFieldDefinition): TemplateRef<ErpEntityCustomFieldContext> {
    if (field.kind !== 'custom') {
      throw new ErpEntityFormSchemaError(`Field ${field.key} is not a custom field.`);
    }
    const outlet = this.availableCustomFields().find(
      (candidate) => candidate.outlet() === field.outlet,
    );
    if (!outlet) {
      throw new ErpEntityFormSchemaError(
        `Custom entity field ${field.key} requires outlet ${field.outlet}.`,
      );
    }
    return outlet.template;
  }

  protected customContext(field: ErpEntityFieldDefinition): ErpEntityCustomFieldContext {
    return {
      $implicit: field,
      field,
      fieldKey: field.key,
      section: this.section(),
      value: this.valueFor(field),
      issues: this.fieldIssues(field),
      update: (value) => this.update(field, value),
    };
  }
}
