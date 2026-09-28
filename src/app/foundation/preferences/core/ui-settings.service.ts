import {Injectable} from '@angular/core';
import {createBrowserUiSettingsLocalStorage} from './ui-settings.local-storage';
import {UiSettingsStore} from './ui-settings.store';
import {UiSettingsStorageContext} from './ui-settings.types';

export const DESIGN_LAB_UI_SETTINGS_CONTEXT: UiSettingsStorageContext =
  Object.freeze({
    tenantId: 'design-lab-tenant',
    companyId: 'design-lab-company',
    userId: 'design-lab-user',
  });

@Injectable({providedIn: 'root'})
export class UiSettingsService {
  readonly store = new UiSettingsStore(
    createBrowserUiSettingsLocalStorage(DESIGN_LAB_UI_SETTINGS_CONTEXT),
  );

  constructor() {
    this.store.hydrate();
  }
}
