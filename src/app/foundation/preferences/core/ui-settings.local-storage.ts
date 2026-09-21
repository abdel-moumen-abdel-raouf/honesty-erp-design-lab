import {UiSettingsDocument, UiSettingsStorageContext} from './ui-settings.types';

export const UI_SETTINGS_STORAGE_PREFIX = 'honesty-erp:ui-settings';

export interface UiSettingsStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export type UiSettingsLoadResult =
  | Readonly<{status: 'missing'}>
  | Readonly<{status: 'malformed'}>
  | Readonly<{status: 'loaded'; value: unknown}>;

export function createUiSettingsStorageKey(context: UiSettingsStorageContext): string {
  return `${UI_SETTINGS_STORAGE_PREFIX}:${context.tenantId}:${context.companyId}:${context.userId}`;
}

export class UiSettingsLocalStorage {
  readonly key: string;

  constructor(
    private readonly storage: UiSettingsStorageLike,
    context: UiSettingsStorageContext
  ) {
    this.key = createUiSettingsStorageKey(context);
  }

  load(): UiSettingsLoadResult {
    const serialized = this.storage.getItem(this.key);
    if (serialized === null) {
      return {status: 'missing'};
    }

    try {
      return {status: 'loaded', value: JSON.parse(serialized) as unknown};
    } catch {
      return {status: 'malformed'};
    }
  }

  save(document: UiSettingsDocument): void {
    this.storage.setItem(this.key, JSON.stringify(document));
  }
}

export function createBrowserUiSettingsLocalStorage(
  context: UiSettingsStorageContext
): UiSettingsLocalStorage {
  return new UiSettingsLocalStorage(window.localStorage, context);
}
