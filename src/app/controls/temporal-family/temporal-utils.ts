import {ErpDateRangeValue} from './temporal-contracts';
import {matchesDomainPattern} from '../input-family/domain-validation';

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^(\d{2}):(\d{2})$/;

export function padTemporal(value: number): string {
  return String(value).padStart(2, '0');
}

export function toIsoDate(value: Date): string {
  return `${value.getFullYear()}-${padTemporal(value.getMonth() + 1)}-${padTemporal(value.getDate())}`;
}

export function parseIsoDate(value: string): Date | null {
  const match = DATE_PATTERN.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return toIsoDate(date) === value ? date : null;
}

export function normalizeIsoDate(
  value: unknown,
  min: string | null = null,
  max: string | null = null,
  pattern: RegExp | null = DATE_PATTERN,
): string | null {
  if (
    typeof value !== 'string' ||
    !matchesDomainPattern(value, pattern) ||
    parseIsoDate(value) === null
  ) return null;
  void min;
  void max;
  return value;
}

export function normalizeIsoTime(
  value: unknown,
  min: string | null = null,
  max: string | null = null,
  pattern: RegExp | null = TIME_PATTERN,
): string | null {
  if (typeof value !== 'string') return null;
  const match = TIME_PATTERN.exec(value);
  if (
    !matchesDomainPattern(value, pattern) ||
    !match ||
    Number(match[1]) > 23 ||
    Number(match[2]) > 59
  ) return null;
  void min;
  void max;
  return value;
}

export function normalizeIsoDateTime(
  value: unknown,
  min: string | null = null,
  max: string | null = null,
  pattern: RegExp | null = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
): string | null {
  if (typeof value !== 'string') return null;
  if (!matchesDomainPattern(value, pattern)) return null;
  const [date, time, remainder] = value.split('T');
  const normalized =
    remainder === undefined &&
    normalizeIsoDate(date) === date &&
    normalizeIsoTime(time) === time
      ? value
      : null;
  void min;
  void max;
  return normalized;
}

export function normalizeDateRange(
  value: unknown,
  min: string | null = null,
  max: string | null = null,
  pattern: RegExp | null = DATE_PATTERN,
): ErpDateRangeValue {
  if (!value || typeof value !== 'object') return {start: null, end: null};
  const candidate = value as {start?: unknown; end?: unknown};
  const start = normalizeIsoDate(candidate.start, null, null, pattern);
  const end = normalizeIsoDate(candidate.end, null, null, pattern);
  void min;
  void max;
  return start && end && start > end ? {start, end: null} : {start, end};
}

export function addDays(value: string, amount: number): string {
  const date = parseIsoDate(value) as Date;
  date.setDate(date.getDate() + amount);
  return toIsoDate(date);
}

export function addMonths(value: string, amount: number): string {
  const date = parseIsoDate(value) as Date;
  const day = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + amount);
  date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
  return toIsoDate(date);
}
