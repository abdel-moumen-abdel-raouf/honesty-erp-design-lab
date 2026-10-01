import {ErpInputConfigurationState} from './input-contracts';

export const ERP_NUMBER_FINAL_PATTERN =
  '^[+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)$';
export const ERP_INTEGER_FINAL_PATTERN = '^\\d+$';
export const ERP_MONEY_FINAL_PATTERN =
  '^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)$';
export const ERP_URL_FINAL_PATTERN = '^(?:https?:\\/\\/)?[^\\s]+$';
export const ERP_TEL_FINAL_PATTERN = '^\\+?[0-9]{6,20}$';
export const ERP_DATE_FINAL_PATTERN = '^\\d{4}-\\d{2}-\\d{2}$';
export const ERP_TIME_FINAL_PATTERN = '^\\d{2}:\\d{2}$';
export const ERP_DATE_TIME_FINAL_PATTERN =
  '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$';

export interface ErpDomainPatternResolution {
  readonly configurationState: ErpInputConfigurationState;
  readonly expression: string;
  readonly regex: RegExp | null;
}

export function resolveDomainPattern(
  override: string | null,
  builtIn: string,
): ErpDomainPatternResolution {
  const expression = override ?? builtIn;

  try {
    return {
      configurationState: 'ready',
      expression,
      regex: new RegExp(expression),
    };
  } catch {
    return {
      configurationState: 'invalid',
      expression,
      regex: null,
    };
  }
}

export function matchesDomainPattern(
  value: string,
  pattern: RegExp | null,
): boolean {
  if (pattern === null) {
    return false;
  }

  pattern.lastIndex = 0;
  return pattern.test(value);
}

export function isProgressiveNumericDraft(value: string): boolean {
  return /^[+-]?(?:\d*(?:\.\d*)?)?$/.test(value);
}

export function isDigitsOnlyDraft(value: string): boolean {
  return /^\d*$/.test(value);
}

export function isProgressiveHttpUrlDraft(value: string): boolean {
  return (
    value.length === 0 ||
    /^[A-Za-z0-9:/?#@!$&'()*+,;=._~%\-]*$/.test(value)
  );
}

function isValidDomainHostname(hostname: string): boolean {
  const labels = hostname.toLowerCase().split('.');
  if (labels.length < 2) {
    return false;
  }

  if (
    labels.some(
      (label) =>
        label.length === 0 ||
        label.length > 63 ||
        !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
    )
  ) {
    return false;
  }

  const topLevelDomain = labels.at(-1) ?? '';
  return (
    /^[a-z]{2,63}$/i.test(topLevelDomain) ||
    /^xn--[a-z0-9-]{2,59}$/i.test(topLevelDomain)
  );
}

export function sanitizeTelephoneDraft(value: string): string {
  const compact = value.replace(/\s+/gu, '');
  const prefix = compact.startsWith('+') ? '+' : '';
  const digits = compact.replace(/[^0-9]/g, '');
  return `${prefix}${digits}`;
}

export function parseFiniteDomainNumber(
  value: unknown,
  pattern: RegExp | null,
): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const source = String(value);

  if (!matchesDomainPattern(source, pattern)) {
    return null;
  }

  const numeric = Number(source);
  return Number.isFinite(numeric) ? numeric : null;
}

export function isHttpUrlDomainValue(
  value: string,
  pattern: RegExp | null,
): boolean {
  if (!matchesDomainPattern(value, pattern)) {
    return false;
  }

  const candidate = /^https?:\/\//i.test(value)
    ? value
    : `https://${value}`;

  try {
    const parsed = new URL(candidate);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      isValidDomainHostname(parsed.hostname)
    );
  } catch {
    return false;
  }
}

export function containsAlphabeticCharacter(value: string): boolean {
  return /\p{L}/u.test(value);
}
