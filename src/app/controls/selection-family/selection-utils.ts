import {ERP_ICON_NAMES, ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpItemPickerOption} from './selection-contracts';

const COLOR_PATTERN = /^#[0-9A-F]{6}$/;

export function normalizeHexColor(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const canonical = value.trim().toUpperCase();
  return COLOR_PATTERN.test(canonical) ? canonical : null;
}

export function normalizeIconName(value: unknown): ErpIconName | null {
  return typeof value === 'string' && (ERP_ICON_NAMES as readonly string[]).includes(value)
    ? value as ErpIconName
    : null;
}

export function normalizeItemValue(
  value: unknown,
  items: readonly ErpItemPickerOption[],
): string | null {
  if (typeof value !== 'string') return null;
  return items.some((item) => item.value === value && !item.disabled) ? value : null;
}

export function colorToHex(value: string): string | null {
  const direct = normalizeHexColor(value);
  if (direct) return direct;
  const match = /^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i.exec(value);
  if (!match) return null;
  return `#${[match[1], match[2], match[3]]
    .map((part) => Number(part).toString(16).padStart(2, '0'))
    .join('')}`.toUpperCase();
}
