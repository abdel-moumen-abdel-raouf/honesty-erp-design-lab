import {UiSetting} from './ui-setting';
import {UiSettingsLocalStorage} from './ui-settings.local-storage';
import {UI_SETTING_KEYS, UI_SETTINGS_REGISTRY} from './ui-settings.registry';
import {
  isLocalPersistenceStoreType,
  UiSettingCategory,
  UiSettingKey,
  UiSettingsDocument,
  UiSettingsLocalDocument,
  UiSettingsValueMap,
} from './ui-settings.types';

type UiSettingInstances = {
  readonly [K in UiSettingKey]: UiSetting<K>;
};

const LOCAL_PERSISTENCE_KEYS = Object.freeze(
  UI_SETTING_KEYS.filter((key) =>
    isLocalPersistenceStoreType(UI_SETTINGS_REGISTRY[key].storeType)
  )
);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function createSettingInstances(): UiSettingInstances {
  return {
    theme: new UiSetting(UI_SETTINGS_REGISTRY.theme),
    density: new UiSetting(UI_SETTINGS_REGISTRY.density),
    formLabelPlacement: new UiSetting(UI_SETTINGS_REGISTRY.formLabelPlacement),
    formAppearance: new UiSetting(UI_SETTINGS_REGISTRY.formAppearance),
    digits: new UiSetting(UI_SETTINGS_REGISTRY.digits),
    identifierDigits: new UiSetting(UI_SETTINGS_REGISTRY.identifierDigits),
    numberSeparators: new UiSetting(UI_SETTINGS_REGISTRY.numberSeparators),
    moneyDisplay: new UiSetting(UI_SETTINGS_REGISTRY.moneyDisplay),
    dateFormat: new UiSetting(UI_SETTINGS_REGISTRY.dateFormat),
    dateViewStyle: new UiSetting(UI_SETTINGS_REGISTRY.dateViewStyle),
    timeFormat: new UiSetting(UI_SETTINGS_REGISTRY.timeFormat),
  };
}

export class UiSettingsStore {
  private readonly settings = createSettingInstances();
  private persistenceSuppressed = false;

  readonly storageKey: string;

  constructor(private readonly persistence: UiSettingsLocalStorage) {
    this.storageKey = persistence.key;

    for (const key of UI_SETTING_KEYS) {
      this.observeSetting(key);
    }
  }

  get<K extends UiSettingKey>(key: K): UiSetting<K> {
    return this.settings[key];
  }

  value<K extends UiSettingKey>(key: K): UiSettingsValueMap[K] {
    return this.get(key).value;
  }

  set<K extends UiSettingKey>(key: K, value: UiSettingsValueMap[K]): void {
    this.get(key).set(value, 'user');
  }

  hydrate(): void {
    const result = this.persistence.load();

    if (result.status === 'missing') {
      this.persist();
      return;
    }

    if (result.status === 'malformed' || !this.isValidLocalDocument(result.value)) {
      this.resetLocalSettingsToDefaultsWithoutSaving();
      this.persist();
      return;
    }

    const document: UiSettingsLocalDocument = result.value;
    this.withPersistenceSuppressed(() => {
      for (const key of LOCAL_PERSISTENCE_KEYS) {
        this.applyHydratedValue(key, document);
      }
    });
  }

  resetSetting<K extends UiSettingKey>(key: K): void {
    this.get(key).reset('reset');
  }

  resetCategory(category: UiSettingCategory): void {
    this.withPersistenceSuppressed(() => {
      for (const key of UI_SETTING_KEYS) {
        if (UI_SETTINGS_REGISTRY[key].category === category) {
          this.get(key).reset('reset');
        }
      }
    });
    this.persist();
  }

  resetAll(): void {
    this.resetAllToDefaultsWithoutSaving();
    this.persist();
  }

  snapshot(): UiSettingsDocument {
    return {
      theme: this.value('theme'),
      density: this.value('density'),
      formLabelPlacement: this.value('formLabelPlacement'),
      formAppearance: this.value('formAppearance'),
      digits: this.value('digits'),
      identifierDigits: this.value('identifierDigits'),
      numberSeparators: this.value('numberSeparators'),
      moneyDisplay: this.value('moneyDisplay'),
      dateFormat: this.value('dateFormat'),
      dateViewStyle: this.value('dateViewStyle'),
      timeFormat: this.value('timeFormat'),
    };
  }

  private observeSetting<K extends UiSettingKey>(key: K): void {
    this.get(key).subscribe((event) => {
      if (
        !this.persistenceSuppressed &&
        event.source !== 'hydrate' &&
        isLocalPersistenceStoreType(UI_SETTINGS_REGISTRY[key].storeType)
      ) {
        this.persist();
      }
    });
  }

  private applyHydratedValue<K extends UiSettingKey>(
    key: K,
    document: UiSettingsLocalDocument
  ): void {
    const value = document[key];
    if (!UI_SETTINGS_REGISTRY[key].validate(value)) {
      throw new TypeError(`Invalid persisted value for UI setting "${key}".`);
    }

    this.get(key).set(value, 'hydrate');
  }

  private isValidLocalDocument(value: unknown): value is UiSettingsLocalDocument {
    if (!isPlainObject(value)) {
      return false;
    }

    const storedKeys = Object.keys(value);

    if (
      storedKeys.length !== LOCAL_PERSISTENCE_KEYS.length ||
      storedKeys.some((key) => !LOCAL_PERSISTENCE_KEYS.includes(key as UiSettingKey)) ||
      LOCAL_PERSISTENCE_KEYS.some((key) => !Object.hasOwn(value, key))
    ) {
      return false;
    }

    return LOCAL_PERSISTENCE_KEYS.every((key) =>
      UI_SETTINGS_REGISTRY[key].validate(value[key])
    );
  }

  private resetLocalSettingsToDefaultsWithoutSaving(): void {
    this.withPersistenceSuppressed(() => {
      for (const key of LOCAL_PERSISTENCE_KEYS) {
        this.get(key).reset('reset');
      }
    });
  }

  private resetAllToDefaultsWithoutSaving(): void {
    this.withPersistenceSuppressed(() => {
      for (const key of UI_SETTING_KEYS) {
        this.get(key).reset('reset');
      }
    });
  }

  private withPersistenceSuppressed(operation: () => void): void {
    const previousState = this.persistenceSuppressed;
    this.persistenceSuppressed = true;
    try {
      operation();
    } finally {
      this.persistenceSuppressed = previousState;
    }
  }

  private persist(): void {
    const entries = LOCAL_PERSISTENCE_KEYS.map(
      (key) => [key, this.value(key)] as const
    );
    const document = Object.freeze(
      Object.fromEntries(entries)
    ) as UiSettingsLocalDocument;
    this.persistence.save(document);
  }
}
