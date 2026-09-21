import {
  ContextualPreference,
  DateFormat,
  DigitSet,
  MoneyDisplayProfile,
  NumberSeparatorProfile,
  TimeFormat,
} from './ui-settings.types';

const latinDigits = '0123456789';
const arabicIndicDigits = '٠١٢٣٤٥٦٧٨٩';

const separatorCharacters: Readonly<
  Record<NumberSeparatorProfile, Readonly<{grouping: string; decimal: string}>>
> = Object.freeze({
  'comma-dot': Object.freeze({grouping: ',', decimal: '.'}),
  'dot-comma': Object.freeze({grouping: '.', decimal: ','}),
  'space-comma': Object.freeze({grouping: '\u00a0', decimal: ','}),
  arabic: Object.freeze({grouping: '٬', decimal: '٫'}),
});

const arabicMonthNames = Object.freeze([
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
]);

export function resolveContextualPreference<T, C extends PropertyKey>(
  preference: ContextualPreference<T, C>,
  context: C
): T {
  if (Object.hasOwn(preference.overrides, context)) {
    return preference.overrides[context] as T;
  }

  return preference.base;
}

export function replaceContextualBase<T, C extends PropertyKey>(
  preference: ContextualPreference<T, C>,
  base: T
): ContextualPreference<T, C> {
  return {
    base,
    overrides: {...preference.overrides},
  };
}

export function replaceContextualOverride<T, C extends PropertyKey>(
  preference: ContextualPreference<T, C>,
  context: C,
  value: T | undefined
): ContextualPreference<T, C> {
  const overrides: Partial<Record<C, T>> = {...preference.overrides};

  if (value === undefined) {
    delete overrides[context];
  } else {
    overrides[context] = value;
  }

  return {
    base: preference.base,
    overrides,
  };
}

export function convertDigits(value: string, digitSet: DigitSet): string {
  if (digitSet === 'latin') {
    return value.replace(/[٠-٩]/g, (digit) => String(arabicIndicDigits.indexOf(digit)));
  }

  return value.replace(/[0-9]/g, (digit) => arabicIndicDigits[latinDigits.indexOf(digit)]);
}

export function formatPreviewNumber(
  value: number,
  digitSet: DigitSet,
  separatorProfile: NumberSeparatorProfile
): string {
  if (!Number.isFinite(value)) {
    throw new TypeError('Preview number must be finite.');
  }

  const sign = value < 0 ? '-' : '';
  const [integerPart, fractionPart] = Math.abs(value).toFixed(2).split('.');
  const separators = separatorCharacters[separatorProfile];
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separators.grouping);

  return convertDigits(
    `${sign}${groupedInteger}${separators.decimal}${fractionPart}`,
    digitSet
  );
}

export function formatMoneyPreview(
  value: number,
  currencyCode: string,
  currencySymbol: string,
  digitSet: DigitSet,
  separatorProfile: NumberSeparatorProfile,
  displayProfile: MoneyDisplayProfile
): string {
  const number = formatPreviewNumber(value, digitSet, separatorProfile);

  switch (displayProfile) {
    case 'code-after':
      return `${number} ${currencyCode}`;
    case 'code-before':
      return `${currencyCode} ${number}`;
    case 'symbol-after':
      return `${number} ${currencySymbol}`;
    case 'symbol-before':
      return `${currencySymbol} ${number}`;
  }
}

function parseIsoDate(value: string): Readonly<{year: string; month: string; day: string}> {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    throw new TypeError('Preview date must use YYYY-MM-DD source format.');
  }

  return {year: match[1], month: match[2], day: match[3]};
}

export function formatDatePreview(
  isoDate: string,
  format: DateFormat,
  digitSet: DigitSet
): string {
  const {year, month, day} = parseIsoDate(isoDate);
  const formatted = format === 'DD/MM/YYYY' ? `${day}/${month}/${year}` : isoDate;
  return convertDigits(formatted, digitSet);
}

export function formatLongArabicDatePreview(isoDate: string, digitSet: DigitSet): string {
  const {year, month, day} = parseIsoDate(isoDate);
  const monthName = arabicMonthNames[Number(month) - 1];

  if (!monthName) {
    throw new TypeError('Preview date month is invalid.');
  }

  return convertDigits(`${Number(day)} ${monthName} ${year}`, digitSet);
}

export function formatTimePreview(
  sourceTime: string,
  format: TimeFormat,
  digitSet: DigitSet
): string {
  const match = /^(\d{2}):(\d{2})$/.exec(sourceTime);
  if (!match) {
    throw new TypeError('Preview time must use HH:mm source format.');
  }

  const hours = Number(match[1]);
  const minutes = match[2];
  const formatted =
    format === '24h'
      ? `${match[1]}:${minutes}`
      : `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'م' : 'ص'}`;

  return convertDigits(formatted, digitSet);
}
