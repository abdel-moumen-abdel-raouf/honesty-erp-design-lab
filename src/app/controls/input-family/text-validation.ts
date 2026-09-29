import {ErpInputValidationIssue} from './input-contracts';

export interface ErpTextValidationConstraints {
  readonly minLength: number | null;
  readonly maxLength: number | null;
  readonly pattern: string | null;
  readonly codePrefix: string;
}

export function validateTextEntry(
  value: string,
  constraints: ErpTextValidationConstraints,
): readonly ErpInputValidationIssue[] {
  if (value.length === 0) {
    return [];
  }

  const issues: ErpInputValidationIssue[] = [];

  if (
    constraints.minLength !== null &&
    value.length < constraints.minLength
  ) {
    issues.push({
      code: `${constraints.codePrefix}.min-length`,
      message: `يجب ألا يقل طول القيمة عن ${constraints.minLength} حرفًا.`,
      source: 'constraint',
      meta: {
        minLength: constraints.minLength,
        actualLength: value.length,
      },
    });
  }

  if (
    constraints.maxLength !== null &&
    value.length > constraints.maxLength
  ) {
    issues.push({
      code: `${constraints.codePrefix}.max-length`,
      message: `يجب ألا يزيد طول القيمة عن ${constraints.maxLength} حرفًا.`,
      source: 'constraint',
      meta: {
        maxLength: constraints.maxLength,
        actualLength: value.length,
      },
    });
  }

  if (constraints.pattern !== null) {
    try {
      const expression = new RegExp(constraints.pattern);
      if (!expression.test(value)) {
        issues.push({
          code: `${constraints.codePrefix}.pattern`,
          message: 'القيمة لا تطابق التنسيق المطلوب.',
          source: 'format',
        });
      }
    } catch {
      // Invalid developer regex belongs to configuration governance rather
      // than user-entry validation.
    }
  }

  return issues;
}
