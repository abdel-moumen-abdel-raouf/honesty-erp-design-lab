import {
  ERP_ENTITY_BUILT_IN_FIELD_KINDS,
  ErpEntityFieldDefinition,
  ErpEntityFieldValueChange,
  ErpEntityFormSchema,
  ErpEntityFormValues,
} from './entity-form-contracts';

const supportedKinds = new Set<string>([
  ...ERP_ENTITY_BUILT_IN_FIELD_KINDS,
  'custom',
]);

export class ErpEntityFormSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErpEntityFormSchemaError';
  }
}

export function assertSupportedEntityField(
  field: ErpEntityFieldDefinition,
): void {
  if (!supportedKinds.has(field.kind)) {
    throw new ErpEntityFormSchemaError(
      `Unsupported entity field kind: ${String(field.kind)}`,
    );
  }
}

export function assertValidEntityFormSchema(schema: ErpEntityFormSchema): void {
  if (!schema.id.trim() || !schema.label.trim()) {
    throw new ErpEntityFormSchemaError(
      'Entity form schema requires nonblank id and label values.',
    );
  }

  const sectionIds = new Set<string>();
  const fieldKeys = new Set<string>();

  for (const section of schema.sections) {
    if (!section.id.trim() || !section.title.trim() || sectionIds.has(section.id)) {
      throw new ErpEntityFormSchemaError(
        `Entity form section id/title is invalid or duplicated: ${section.id}`,
      );
    }
    sectionIds.add(section.id);

    if (section.kind === 'fields') {
      for (const field of section.fields) {
        assertSupportedEntityField(field);
        if (!field.key.trim() || !field.label.trim() || fieldKeys.has(field.key)) {
          throw new ErpEntityFormSchemaError(
            `Entity field key/label is invalid or duplicated: ${field.key}`,
          );
        }
        if (field.kind === 'custom' && !field.outlet.trim()) {
          throw new ErpEntityFormSchemaError(
            `Custom field ${field.key} requires a nonblank outlet.`,
          );
        }
        fieldKeys.add(field.key);
      }
    } else if (!section.outlet.trim()) {
      throw new ErpEntityFormSchemaError(
        `Custom section ${section.id} requires a nonblank outlet.`,
      );
    }
  }

  const stepIds = new Set<string>();
  for (const step of schema.steps ?? []) {
    if (!step.id.trim() || !step.label.trim() || stepIds.has(step.id)) {
      throw new ErpEntityFormSchemaError('Entity form steps require nonblank ids and labels.');
    }
    stepIds.add(step.id);
    for (const sectionId of step.sectionIds) {
      if (!sectionIds.has(sectionId)) {
        throw new ErpEntityFormSchemaError(
          `Entity form step ${step.id} references unknown section ${sectionId}.`,
        );
      }
    }
  }
}

export function updateEntityFormValues(
  values: ErpEntityFormValues,
  change: ErpEntityFieldValueChange,
): ErpEntityFormValues {
  return Object.freeze({...values, [change.key]: change.value});
}
