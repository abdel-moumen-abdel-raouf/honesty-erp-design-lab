import {
  ContextualPreference,
  DateContext,
  DateFormat,
  DateViewStyle,
  DensityMode,
  DigitContext,
  DigitSet,
  FormAppearance,
  FormLabelPlacement,
  MoneyDisplayProfile,
  NumberSeparatorProfile,
  SettingDefinition,
  StoreType,
  ThemeMode,
  TimeFormat,
  UiSettingKey,
} from './ui-settings.types';

const themeModes = ['light', 'dark', 'system'] as const;
const densityModes = ['compact', 'comfortable', 'spacious'] as const;
const formLabelPlacements = ['top', 'side'] as const;
const formAppearances = ['outlined', 'filled', 'underline'] as const;
const digitSets = ['latin', 'arabic-indic'] as const;
const digitContexts = ['view', 'field', 'print', 'export', 'money'] as const;
const numberSeparatorProfiles = [
  'comma-dot',
  'dot-comma',
  'space-comma',
  'arabic',
] as const;
const moneyDisplayProfiles = [
  'code-after',
  'code-before',
  'symbol-after',
  'symbol-before',
] as const;
const dateContexts = ['view', 'field', 'print', 'export'] as const;
const dateFormats = ['DD/MM/YYYY', 'YYYY-MM-DD'] as const;
const dateViewStyles = ['numeric', 'long-arabic'] as const;
const timeFormats = ['12h', '24h'] as const;

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === 'string' && options.includes(value as T);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasExactKeys(value: Record<string, unknown>, expectedKeys: readonly string[]): boolean {
  const actualKeys = Object.keys(value);
  return (
    actualKeys.length === expectedKeys.length &&
    actualKeys.every((key) => expectedKeys.includes(key))
  );
}

function isContextualPreference<T, C extends string>(
  value: unknown,
  contexts: readonly C[],
  validateValue: (candidate: unknown) => candidate is T
): value is ContextualPreference<T, C> {
  if (!isPlainObject(value) || !hasExactKeys(value, ['base', 'overrides'])) {
    return false;
  }

  if (!validateValue(value['base']) || !isPlainObject(value['overrides'])) {
    return false;
  }

  return Object.entries(value['overrides']).every(
    ([context, candidate]) => contexts.includes(context as C) && validateValue(candidate)
  );
}

const defaultDigits = Object.freeze({
  base: 'latin',
  overrides: Object.freeze({}),
}) satisfies ContextualPreference<DigitSet, DigitContext>;

const defaultNumberSeparators = Object.freeze({
  base: 'comma-dot',
  overrides: Object.freeze({}),
}) satisfies ContextualPreference<NumberSeparatorProfile, DigitContext>;

const defaultDateFormat = Object.freeze({
  base: 'DD/MM/YYYY',
  overrides: Object.freeze({export: 'YYYY-MM-DD'}),
}) satisfies ContextualPreference<DateFormat, DateContext>;

export type UiSettingsRegistry = {
  readonly [K in UiSettingKey]: Readonly<SettingDefinition<K>>;
};

export const UI_SETTINGS_REGISTRY: UiSettingsRegistry = Object.freeze({
  theme: Object.freeze({
    key: 'theme',
    category: 'appearance',
    defaultValue: 'system',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is ThemeMode => isOneOf(value, themeModes),
  }),
  density: Object.freeze({
    key: 'density',
    category: 'appearance',
    defaultValue: 'comfortable',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is DensityMode => isOneOf(value, densityModes),
  }),
  formLabelPlacement: Object.freeze({
    key: 'formLabelPlacement',
    category: 'forms',
    defaultValue: 'top',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is FormLabelPlacement =>
      isOneOf(value, formLabelPlacements),
  }),
  formAppearance: Object.freeze({
    key: 'formAppearance',
    category: 'forms',
    defaultValue: 'outlined',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is FormAppearance =>
      isOneOf(value, formAppearances),
  }),
  digits: Object.freeze({
    key: 'digits',
    category: 'numbers',
    defaultValue: defaultDigits,
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is ContextualPreference<DigitSet, DigitContext> =>
      isContextualPreference(value, digitContexts, (candidate): candidate is DigitSet =>
        isOneOf(candidate, digitSets)
      ),
  }),
  identifierDigits: Object.freeze({
    key: 'identifierDigits',
    category: 'numbers',
    defaultValue: 'latin',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is DigitSet => isOneOf(value, digitSets),
  }),
  numberSeparators: Object.freeze({
    key: 'numberSeparators',
    category: 'numbers',
    defaultValue: defaultNumberSeparators,
    storeType: StoreType.LOCAL,
    validate: (
      value: unknown
    ): value is ContextualPreference<NumberSeparatorProfile, DigitContext> =>
      isContextualPreference(
        value,
        digitContexts,
        (candidate): candidate is NumberSeparatorProfile =>
          isOneOf(candidate, numberSeparatorProfiles)
      ),
  }),
  moneyDisplay: Object.freeze({
    key: 'moneyDisplay',
    category: 'money',
    defaultValue: 'code-after',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is MoneyDisplayProfile =>
      isOneOf(value, moneyDisplayProfiles),
  }),
  dateFormat: Object.freeze({
    key: 'dateFormat',
    category: 'dateTime',
    defaultValue: defaultDateFormat,
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is ContextualPreference<DateFormat, DateContext> =>
      isContextualPreference(value, dateContexts, (candidate): candidate is DateFormat =>
        isOneOf(candidate, dateFormats)
      ),
  }),
  dateViewStyle: Object.freeze({
    key: 'dateViewStyle',
    category: 'dateTime',
    defaultValue: 'numeric',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is DateViewStyle =>
      isOneOf(value, dateViewStyles),
  }),
  timeFormat: Object.freeze({
    key: 'timeFormat',
    category: 'dateTime',
    defaultValue: '24h',
    storeType: StoreType.LOCAL,
    validate: (value: unknown): value is TimeFormat => isOneOf(value, timeFormats),
  }),
});

export const UI_SETTING_KEYS = Object.freeze(
  Object.keys(UI_SETTINGS_REGISTRY) as UiSettingKey[]
);
