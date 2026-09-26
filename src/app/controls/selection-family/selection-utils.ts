import {ERP_ICON_NAMES, ErpIconName} from '../../primitives/icon/icon-contracts';
import {
  ErpColorPickerValue,
  ErpItemPickerOption,
} from './selection-contracts';
import {
  ErpSystemColorToken,
  resolveErpSystemColorToken,
} from '../../foundation/colors/system-color-registry';

const COLOR_PATTERN = /^#[0-9A-F]{6}$/;

export function normalizeHexColor(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const canonical = value.trim().toUpperCase();
  return COLOR_PATTERN.test(canonical) ? canonical : null;
}

export function normalizeColorPickerValue(
  value: unknown,
): ErpColorPickerValue | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as {mode?: unknown; token?: unknown; value?: unknown};

  if (candidate.mode === 'system' && typeof candidate.token === 'string') {
    try {
      const resolved = resolveErpSystemColorToken(
        candidate.token as ErpSystemColorToken,
      );

      if (typeof resolved !== 'string') return null;

      return {mode: 'system', token: candidate.token as ErpSystemColorToken};
    } catch {
      return null;
    }
  }

  if (candidate.mode === 'free') {
    const normalized = normalizeHexColor(candidate.value);
    return normalized === null ? null : {mode: 'free', value: normalized};
  }

  return null;
}

export function resolveColorPickerValue(
  value: ErpColorPickerValue | null,
  resolver: (token: ErpSystemColorToken) => string =
    resolveErpSystemColorToken,
): string | null {
  return value === null
    ? null
    : value.mode === 'system'
      ? resolver(value.token)
      : value.value;
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
