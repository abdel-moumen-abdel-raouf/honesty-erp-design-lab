import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  convertDigits,
  formatDatePreview,
  formatLongArabicDatePreview,
  formatMoneyPreview,
  formatPreviewNumber,
  formatTimePreview,
  replaceContextualBase,
  replaceContextualOverride,
  resolveContextualPreference,
} from './core/ui-settings.formatters';
import {createBrowserUiSettingsLocalStorage} from './core/ui-settings.local-storage';
import {UI_SETTING_KEYS, UI_SETTINGS_REGISTRY} from './core/ui-settings.registry';
import {UiSettingsStore} from './core/ui-settings.store';
import {
  DateContext,
  DateFormat,
  DigitContext,
  DigitSet,
  NumberSeparatorProfile,
  SettingDefinition,
  UiSettingCategory,
  UiSettingKey,
  UiSettingsStorageContext,
  UiSettingsValueMap,
} from './core/ui-settings.types';

type ContextualSettingKey = 'digits' | 'numberSeparators' | 'dateFormat';
type ScalarSettingKey = Exclude<UiSettingKey, ContextualSettingKey>;

const docsStorageContext: UiSettingsStorageContext = Object.freeze({
  tenantId: 'design-lab-tenant',
  companyId: 'design-lab-company',
  userId: 'design-lab-user',
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-preferences-specimen',
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences {
  private readonly destroyRef = inject(DestroyRef);
  private readonly systemPrefersDark = signal(false);
  private readonly persistence = createBrowserUiSettingsLocalStorage(docsStorageContext);

  readonly store = new UiSettingsStore(this.persistence);
  readonly registry = UI_SETTINGS_REGISTRY;
  readonly settingKeys = UI_SETTING_KEYS;
  readonly systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  readonly theme = this.store.get('theme').valueSignal;
  readonly density = this.store.get('density').valueSignal;
  readonly formLabelPlacement = this.store.get('formLabelPlacement').valueSignal;
  readonly formAppearance = this.store.get('formAppearance').valueSignal;
  readonly digits = this.store.get('digits').valueSignal;
  readonly identifierDigits = this.store.get('identifierDigits').valueSignal;
  readonly numberSeparators = this.store.get('numberSeparators').valueSignal;
  readonly moneyDisplay = this.store.get('moneyDisplay').valueSignal;
  readonly dateFormat = this.store.get('dateFormat').valueSignal;
  readonly dateViewStyle = this.store.get('dateViewStyle').valueSignal;
  readonly timeFormat = this.store.get('timeFormat').valueSignal;

  readonly resolvedPreviewTheme = computed(() => {
    const theme = this.theme();
    return theme === 'system' ? (this.systemPrefersDark() ? 'dark' : 'light') : theme;
  });

  constructor() {
    this.store.hydrate();

    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemPrefersDark.set(mediaQuery.matches);
      const updateSystemTheme = (event: MediaQueryListEvent): void => {
        this.systemPrefersDark.set(event.matches);
      };
      mediaQuery.addEventListener('change', updateSystemTheme);
      this.destroyRef.onDestroy(() =>
        mediaQuery.removeEventListener('change', updateSystemTheme)
      );
    }
  }

  setScalar<K extends ScalarSettingKey>(key: K, event: Event): void {
    const candidate = this.selectValue(event);
    const definition: SettingDefinition<UiSettingsValueMap[K]> = this.registry[key];

    if (definition.validate(candidate)) {
      this.store.set(key, candidate);
    }
  }

  setDigitBase(event: Event): void {
    const base = this.selectValue(event) as DigitSet;
    this.store.set('digits', replaceContextualBase(this.digits(), base));
  }

  setDigitOverride(context: DigitContext, event: Event): void {
    const selected = this.selectValue(event);
    const override = selected === 'inherit' ? undefined : (selected as DigitSet);
    this.store.set(
      'digits',
      replaceContextualOverride(this.digits(), context, override)
    );
  }

  setSeparatorBase(event: Event): void {
    const base = this.selectValue(event) as NumberSeparatorProfile;
    this.store.set(
      'numberSeparators',
      replaceContextualBase(this.numberSeparators(), base)
    );
  }

  setSeparatorOverride(context: DigitContext, event: Event): void {
    const selected = this.selectValue(event);
    const override =
      selected === 'inherit' ? undefined : (selected as NumberSeparatorProfile);
    this.store.set(
      'numberSeparators',
      replaceContextualOverride(this.numberSeparators(), context, override)
    );
  }

  setDateBase(event: Event): void {
    const base = this.selectValue(event) as DateFormat;
    this.store.set('dateFormat', replaceContextualBase(this.dateFormat(), base));
  }

  setDateOverride(context: DateContext, event: Event): void {
    const selected = this.selectValue(event);
    const override = selected === 'inherit' ? undefined : (selected as DateFormat);
    this.store.set(
      'dateFormat',
      replaceContextualOverride(this.dateFormat(), context, override)
    );
  }

  contextualOverrideValue(key: 'digits', context: DigitContext): string;
  contextualOverrideValue(key: 'numberSeparators', context: DigitContext): string;
  contextualOverrideValue(key: 'dateFormat', context: DateContext): string;
  contextualOverrideValue(
    key: ContextualSettingKey,
    context: DigitContext | DateContext
  ): string {
    switch (key) {
      case 'digits':
        return String(this.digits().overrides[context as DigitContext] ?? 'inherit');
      case 'numberSeparators':
        return String(
          this.numberSeparators().overrides[context as DigitContext] ?? 'inherit'
        );
      case 'dateFormat':
        return String(this.dateFormat().overrides[context as DateContext] ?? 'inherit');
    }
  }

  numberPreview(context: DigitContext): string {
    return formatPreviewNumber(
      12345.67,
      resolveContextualPreference(this.digits(), context),
      resolveContextualPreference(this.numberSeparators(), context)
    );
  }

  moneyPreview(): string {
    return formatMoneyPreview(
      12345.67,
      'EGP',
      'ج.م.',
      resolveContextualPreference(this.digits(), 'money'),
      resolveContextualPreference(this.numberSeparators(), 'money'),
      this.moneyDisplay()
    );
  }

  datePreview(context: DateContext): string {
    const digitSet = resolveContextualPreference(this.digits(), context);
    if (context === 'view' && this.dateViewStyle() === 'long-arabic') {
      return formatLongArabicDatePreview('2026-09-21', digitSet);
    }

    return formatDatePreview(
      '2026-09-21',
      resolveContextualPreference(this.dateFormat(), context),
      digitSet
    );
  }

  timePreview(): string {
    return formatTimePreview(
      '17:45',
      this.timeFormat(),
      resolveContextualPreference(this.digits(), 'view')
    );
  }

  identifierPreview(value: string): string {
    return convertDigits(value, this.identifierDigits());
  }

  resetSetting(key: UiSettingKey): void {
    this.store.resetSetting(key);
  }

  resetCategory(category: UiSettingCategory): void {
    this.store.resetCategory(category);
  }

  resetAll(): void {
    this.store.resetAll();
  }

  private selectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }
}
