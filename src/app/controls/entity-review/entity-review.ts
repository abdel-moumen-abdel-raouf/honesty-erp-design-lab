import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {
  ErpEntityFieldDefinition,
  ErpEntityFieldValue,
  ErpEntityFieldsSection,
  ErpEntityReviewContext,
  ErpEntitySectionDefinition,
} from '../entity-form/entity-form-contracts';
import {assertValidEntityFormSchema, ErpEntityFormSchemaError} from '../entity-form/entity-form-schema';
import {ErpFormSection} from '../form-section/form-section';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Public ERP components intentionally use the erp prefix.
  selector: 'erp-entity-review',
  imports: [ErpFormSection, ErpText],
  templateUrl: './entity-review.html',
  styleUrl: './entity-review.scss',
  host: {
    '[attr.data-entity-review-compact]': 'compact()',
    '[attr.data-entity-review-section-count]': 'sections().length',
  },
})
export class ErpEntityReview {
  readonly context = input.required<ErpEntityReviewContext>();
  readonly compact = input(false, {transform: booleanAttribute});
  readonly emptyValueLabel = input('غير متوفر');
  readonly trueValueLabel = input('نعم');
  readonly falseValueLabel = input('لا');
  readonly sensitiveValueLabel = input('••••••••');
  readonly customSectionLabel = input('محتوى مخصص يقدمه المستهلك في تجربة المراجعة.');

  protected readonly sections = computed(() => {
    const {schema, step} = this.context();
    assertValidEntityFormSchema(schema);
    return step.sectionIds.map((sectionId) => {
      const section = schema.sections.find((candidate) => candidate.id === sectionId);
      if (!section) {
        throw new ErpEntityFormSchemaError(
          `Entity review step ${step.id} references missing section ${sectionId}.`,
        );
      }
      return section;
    });
  });

  protected fields(section: ErpEntitySectionDefinition): readonly ErpEntityFieldDefinition[] {
    return section.kind === 'fields' ? section.fields : [];
  }

  protected valueFor(field: ErpEntityFieldDefinition): string {
    const value = this.context().values[field.key] ?? null;
    if (field.kind === 'password' && this.hasValue(value)) return this.sensitiveValueLabel();
    if (field.kind === 'checkbox') return value === true ? this.trueValueLabel() : this.falseValueLabel();
    if (field.kind === 'select' || field.kind === 'radio') return this.optionLabel(field, value);
    if (field.kind === 'money' && typeof value === 'number') {
      return `${value.toLocaleString()} ${field.currency}`;
    }
    if (Array.isArray(value)) return value.length ? value.join('، ') : this.emptyValueLabel();
    return this.hasValue(value) ? String(value) : this.emptyValueLabel();
  }

  protected isFieldsSection(section: ErpEntitySectionDefinition): section is ErpEntityFieldsSection {
    return section.kind === 'fields';
  }

  private optionLabel(
    field: Extract<ErpEntityFieldDefinition, {kind: 'select' | 'radio'}>,
    value: ErpEntityFieldValue,
  ): string {
    const values = Array.isArray(value) ? value : this.hasValue(value) ? [String(value)] : [];
    if (!values.length) return this.emptyValueLabel();
    return values
      .map((candidate) => field.options.find((option) => option.value === candidate)?.label ?? candidate)
      .join('، ');
  }

  private hasValue(value: ErpEntityFieldValue): boolean {
    return value !== null && value !== '' && (!Array.isArray(value) || value.length > 0);
  }
}
