import {
  ERP_ENTITY_BUILT_IN_FIELD_KINDS,
  ErpEntityFieldDefinition,
  ErpEntityFormSchema,
} from './entity-form-contracts';
import {
  assertSupportedEntityField,
  assertValidEntityFormSchema,
  ErpEntityFormSchemaError,
  updateEntityFormValues,
} from './entity-form-schema';

const validSchema: ErpEntityFormSchema = {
  id: 'record',
  label: 'سجل',
  actions: {submitLabel: 'حفظ'},
  sections: [
    {
      kind: 'fields',
      id: 'identity',
      title: 'الهوية',
      fields: [{kind: 'text', key: 'name', label: 'الاسم'}],
    },
  ],
  steps: [{id: 'details', label: 'البيانات', sectionIds: ['identity']}],
};

describe('Entity Form schema contracts', () => {
  it('publishes the exact bounded built-in field catalog', () => {
    expect(ERP_ENTITY_BUILT_IN_FIELD_KINDS).toEqual([
      'text', 'textarea', 'password', 'url', 'telephone', 'number', 'money',
      'checkbox', 'radio', 'select', 'date', 'time', 'date-time',
    ]);
  });

  it('accepts stable sections and optional step references', () => {
    expect(() => assertValidEntityFormSchema(validSchema)).not.toThrow();
  });

  it('rejects unsupported kinds, duplicate keys, and unknown step sections deterministically', () => {
    const unsupported = {kind: 'file', key: 'document', label: 'المستند'} as unknown as ErpEntityFieldDefinition;
    expect(() => assertSupportedEntityField(unsupported)).toThrowError(
      new ErpEntityFormSchemaError('Unsupported entity field kind: file'),
    );
    expect(() => assertValidEntityFormSchema({
      ...validSchema,
      sections: [{kind: 'fields', id: 'identity', title: 'الهوية', fields: [
        {kind: 'text', key: 'name', label: 'الاسم'},
        {kind: 'text', key: 'name', label: 'اسم بديل'},
      ]}],
    })).toThrow(/duplicated/);
    expect(() => assertValidEntityFormSchema({
      ...validSchema,
      steps: [{id: 'missing', label: 'مفقود', sectionIds: ['unknown']}],
    })).toThrow(/unknown section/);
  });

  it('produces an immutable next value snapshot without mutating consumer state', () => {
    const source = Object.freeze({name: 'قديم', count: 1});
    const next = updateEntityFormValues(source, {key: 'name', value: 'جديد'});
    expect(next).toEqual({name: 'جديد', count: 1});
    expect(source).toEqual({name: 'قديم', count: 1});
    expect(Object.isFrozen(next)).toBe(true);
  });
});
