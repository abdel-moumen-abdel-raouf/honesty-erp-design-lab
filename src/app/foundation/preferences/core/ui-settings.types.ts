export enum StoreType {
  LOCAL = 'LOCAL',
  BACKEND = 'BACKEND',
  LOCAL_AND_BACKEND = 'LOCAL_AND_BACKEND',
  NONE = 'NONE',
}

export type UiSettingCategory =
  | 'appearance'
  | 'forms'
  | 'numbers'
  | 'money'
  | 'dateTime';

export type UiSettingChangeSource = 'user' | 'hydrate' | 'reset';

export type ThemeMode = 'light' | 'dark' | 'system';
export type DensityMode = 'compact' | 'comfortable' | 'spacious';
export type FormLabelPlacement = 'top' | 'side';
export type FormAppearance = 'outlined' | 'filled' | 'underline';
export type DigitSet = 'latin' | 'arabic-indic';
export type DigitContext = 'view' | 'field' | 'print' | 'export' | 'money';
export type NumberSeparatorProfile =
  | 'comma-dot'
  | 'dot-comma'
  | 'space-comma'
  | 'arabic';
export type MoneyDisplayProfile =
  | 'code-after'
  | 'code-before'
  | 'symbol-after'
  | 'symbol-before';
export type DateContext = 'view' | 'field' | 'print' | 'export';
export type DateFormat = 'DD/MM/YYYY' | 'YYYY-MM-DD';
export type DateViewStyle = 'numeric' | 'long-arabic';
export type TimeFormat = '12h' | '24h';

export interface ContextualPreference<T, C extends PropertyKey> {
  readonly base: T;
  readonly overrides: Readonly<Partial<Record<C, T>>>;
}

export interface UiSettingsValueMap {
  readonly theme: ThemeMode;
  readonly density: DensityMode;
  readonly formLabelPlacement: FormLabelPlacement;
  readonly formAppearance: FormAppearance;
  readonly digits: ContextualPreference<DigitSet, DigitContext>;
  readonly identifierDigits: DigitSet;
  readonly numberSeparators: ContextualPreference<NumberSeparatorProfile, DigitContext>;
  readonly moneyDisplay: MoneyDisplayProfile;
  readonly dateFormat: ContextualPreference<DateFormat, DateContext>;
  readonly dateViewStyle: DateViewStyle;
  readonly timeFormat: TimeFormat;
}

export type UiSettingKey = keyof UiSettingsValueMap;

export interface SettingDefinition<K extends UiSettingKey> {
  readonly key: K;
  readonly category: UiSettingCategory;
  readonly defaultValue: UiSettingsValueMap[K];
  readonly storeType: StoreType;
  readonly validate: (value: unknown) => value is UiSettingsValueMap[K];
}

export interface UiSettingChangeEvent<K extends UiSettingKey> {
  readonly key: K;
  readonly previousValue: UiSettingsValueMap[K];
  readonly currentValue: UiSettingsValueMap[K];
  readonly source: UiSettingChangeSource;
}

export interface UiSettingsStorageContext {
  readonly tenantId: string;
  readonly companyId: string;
  readonly userId: string;
}

export type UiSettingsDocument = {
  readonly [K in UiSettingKey]: UiSettingsValueMap[K];
};

export type UiSettingsLocalDocument = Readonly<Partial<UiSettingsDocument>>;

export function isLocalPersistenceStoreType(storeType: StoreType): boolean {
  return (
    storeType === StoreType.LOCAL || storeType === StoreType.LOCAL_AND_BACKEND
  );
}
