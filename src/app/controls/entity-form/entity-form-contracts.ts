import {ErpRadioGroupOption} from '../composite-family/composite-contracts';
import {ErpFormValidationIssue, ErpStepDefinition} from '../forms-family/forms-contracts';
import {ErpSelectOption} from '../select/select-contracts';

export type ErpEntityFieldValue =
  | string
  | number
  | boolean
  | readonly string[]
  | null;

export type ErpEntityFormValues = Readonly<Record<string, ErpEntityFieldValue>>;

interface ErpEntityFieldBase {
  readonly key: string;
  readonly label: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
}

interface ErpEntityTextFieldBase extends ErpEntityFieldBase {
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
}

export interface ErpEntityTextField extends ErpEntityTextFieldBase {
  readonly kind: 'text';
}

export interface ErpEntityTextAreaField extends Omit<ErpEntityTextFieldBase, 'pattern'> {
  readonly kind: 'textarea';
  readonly rows?: number;
}

export interface ErpEntityPasswordField extends ErpEntityTextFieldBase {
  readonly kind: 'password';
}

export interface ErpEntityUrlField extends ErpEntityTextFieldBase {
  readonly kind: 'url';
}

export interface ErpEntityTelephoneField extends ErpEntityTextFieldBase {
  readonly kind: 'telephone';
}

export interface ErpEntityNumberField extends ErpEntityFieldBase {
  readonly kind: 'number';
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly allowEmpty?: boolean;
}

export interface ErpEntityMoneyField extends ErpEntityFieldBase {
  readonly kind: 'money';
  readonly currency: string;
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly allowEmpty?: boolean;
}

export interface ErpEntityCheckBoxField extends ErpEntityFieldBase {
  readonly kind: 'checkbox';
  readonly readOnly?: boolean;
}

export interface ErpEntityRadioField extends ErpEntityFieldBase {
  readonly kind: 'radio';
  readonly readOnly?: boolean;
  readonly options: readonly ErpRadioGroupOption[];
}

export interface ErpEntitySelectField extends ErpEntityFieldBase {
  readonly kind: 'select';
  readonly options: readonly ErpSelectOption[];
  readonly multiple?: boolean;
  readonly searchable?: boolean;
  readonly placeholder?: string;
}

interface ErpEntityTemporalFieldBase extends ErpEntityFieldBase {
  readonly placeholder?: string;
  readonly min?: string;
  readonly max?: string;
}

export interface ErpEntityDateField extends ErpEntityTemporalFieldBase {
  readonly kind: 'date';
}

export interface ErpEntityTimeField extends ErpEntityTemporalFieldBase {
  readonly kind: 'time';
  readonly minuteStep?: number;
}

export interface ErpEntityDateTimeField extends ErpEntityTemporalFieldBase {
  readonly kind: 'date-time';
}

export interface ErpEntityCustomField extends ErpEntityFieldBase {
  readonly kind: 'custom';
  readonly outlet: string;
}

export type ErpEntityBuiltInField =
  | ErpEntityTextField
  | ErpEntityTextAreaField
  | ErpEntityPasswordField
  | ErpEntityUrlField
  | ErpEntityTelephoneField
  | ErpEntityNumberField
  | ErpEntityMoneyField
  | ErpEntityCheckBoxField
  | ErpEntityRadioField
  | ErpEntitySelectField
  | ErpEntityDateField
  | ErpEntityTimeField
  | ErpEntityDateTimeField;

export type ErpEntityFieldDefinition = ErpEntityBuiltInField | ErpEntityCustomField;

export interface ErpEntityFieldsSection {
  readonly kind: 'fields';
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly compact?: boolean;
  readonly fields: readonly ErpEntityFieldDefinition[];
}

export interface ErpEntityCustomSection {
  readonly kind: 'custom';
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly outlet: string;
}

export type ErpEntitySectionDefinition = ErpEntityFieldsSection | ErpEntityCustomSection;

export interface ErpEntityFormStep extends ErpStepDefinition {
  readonly sectionIds: readonly string[];
  readonly review?: boolean;
}

export interface ErpEntityFormActionsConfig {
  readonly submitLabel: string;
  readonly resetLabel?: string;
  readonly cancelLabel?: string;
}

export interface ErpEntityFormSchema {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly sections: readonly ErpEntitySectionDefinition[];
  readonly steps?: readonly ErpEntityFormStep[];
  readonly actions: ErpEntityFormActionsConfig;
}

export interface ErpEntityFieldValueChange {
  readonly key: string;
  readonly value: ErpEntityFieldValue;
}

export interface ErpEntityFormValueChange extends ErpEntityFieldValueChange {
  readonly nextValues: ErpEntityFormValues;
}

export interface ErpEntityFormSubmitIntent {
  readonly schemaId: string;
  readonly values: ErpEntityFormValues;
}

export interface ErpEntityCustomFieldContext {
  readonly $implicit: ErpEntityFieldDefinition;
  readonly field: ErpEntityFieldDefinition;
  readonly fieldKey: string;
  readonly section: ErpEntityFieldsSection | null;
  readonly value: ErpEntityFieldValue;
  readonly issues: readonly ErpFormValidationIssue[];
  readonly update: (value: ErpEntityFieldValue) => void;
}

export interface ErpEntityCustomSectionContext {
  readonly $implicit: ErpEntityCustomSection;
  readonly section: ErpEntityCustomSection;
  readonly values: ErpEntityFormValues;
  readonly issues: readonly ErpFormValidationIssue[];
  readonly update: (change: ErpEntityFieldValueChange) => void;
}

export interface ErpEntityReviewContext {
  readonly $implicit: ErpEntityFormValues;
  readonly values: ErpEntityFormValues;
  readonly schema: ErpEntityFormSchema;
  readonly step: ErpEntityFormStep;
}

export const ERP_ENTITY_BUILT_IN_FIELD_KINDS = [
  'text',
  'textarea',
  'password',
  'url',
  'telephone',
  'number',
  'money',
  'checkbox',
  'radio',
  'select',
  'date',
  'time',
  'date-time',
] as const;
