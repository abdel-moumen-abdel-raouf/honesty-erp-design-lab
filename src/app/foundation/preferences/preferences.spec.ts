import {TestBed} from '@angular/core/testing';
import {routes} from '../../app.routes';
import {UiSetting} from './core/ui-setting';
import {
  convertDigits,
  formatDatePreview,
  formatLongArabicDatePreview,
  formatMoneyPreview,
  formatPreviewNumber,
  formatTimePreview,
  replaceContextualOverride,
  resolveContextualPreference,
} from './core/ui-settings.formatters';
import {
  createUiSettingsStorageKey,
  UiSettingsLocalStorage,
  UiSettingsStorageLike,
} from './core/ui-settings.local-storage';
import {UI_SETTING_KEYS, UI_SETTINGS_REGISTRY} from './core/ui-settings.registry';
import {UiSettingsStore} from './core/ui-settings.store';
import {
  ContextualPreference,
  DigitContext,
  DigitSet,
  StoreType,
  ThemeMode,
  UiSettingsDocument,
  UiSettingsStorageContext,
} from './core/ui-settings.types';
import {Preferences} from './preferences';

const storageContext: UiSettingsStorageContext = {
  tenantId: 'design-lab-tenant',
  companyId: 'design-lab-company',
  userId: 'design-lab-user',
};

const storageKey = createUiSettingsStorageKey(storageContext);

class MemoryStorage implements UiSettingsStorageLike {
  private readonly values = new Map<string, string>();
  setCalls = 0;

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.setCalls += 1;
    this.values.set(key, value);
  }

  seed(key: string, value: string): void {
    this.values.set(key, value);
  }
}

function defaultDocument(): UiSettingsDocument {
  return {
    theme: UI_SETTINGS_REGISTRY.theme.defaultValue,
    density: UI_SETTINGS_REGISTRY.density.defaultValue,
    formLabelPlacement: UI_SETTINGS_REGISTRY.formLabelPlacement.defaultValue,
    formAppearance: UI_SETTINGS_REGISTRY.formAppearance.defaultValue,
    digits: UI_SETTINGS_REGISTRY.digits.defaultValue,
    identifierDigits: UI_SETTINGS_REGISTRY.identifierDigits.defaultValue,
    numberSeparators: UI_SETTINGS_REGISTRY.numberSeparators.defaultValue,
    moneyDisplay: UI_SETTINGS_REGISTRY.moneyDisplay.defaultValue,
    dateFormat: UI_SETTINGS_REGISTRY.dateFormat.defaultValue,
    dateViewStyle: UI_SETTINGS_REGISTRY.dateViewStyle.defaultValue,
    timeFormat: UI_SETTINGS_REGISTRY.timeFormat.defaultValue,
  };
}

function customDocument(): UiSettingsDocument {
  return {
    theme: 'dark',
    density: 'compact',
    formLabelPlacement: 'side',
    formAppearance: 'filled',
    digits: {base: 'arabic-indic', overrides: {export: 'latin'}},
    identifierDigits: 'arabic-indic',
    numberSeparators: {base: 'arabic', overrides: {export: 'comma-dot'}},
    moneyDisplay: 'symbol-before',
    dateFormat: {base: 'YYYY-MM-DD', overrides: {view: 'DD/MM/YYYY'}},
    dateViewStyle: 'long-arabic',
    timeFormat: '12h',
  };
}

function createStore(memory: MemoryStorage): UiSettingsStore {
  return new UiSettingsStore(new UiSettingsLocalStorage(memory, storageContext));
}

function persistedDocument(memory: MemoryStorage): UiSettingsDocument {
  const serialized = memory.getItem(storageKey);
  if (serialized === null) {
    throw new Error('Expected a persisted settings document.');
  }
  return JSON.parse(serialized) as UiSettingsDocument;
}

describe('UiSetting', () => {
  it('starts with its registry default and exposes it through the readonly signal', () => {
    const setting = new UiSetting(UI_SETTINGS_REGISTRY.theme);
    expect(setting.value).toBe('system');
    expect(setting.valueSignal()).toBe('system');
  });

  it('sets a valid value and publishes an exact change event', () => {
    const setting = new UiSetting(UI_SETTINGS_REGISTRY.theme);
    const events: object[] = [];
    setting.subscribe((event) => events.push(event));

    setting.set('dark', 'user');

    expect(setting.value).toBe('dark');
    expect(events).toEqual([
      {
        key: 'theme',
        previousValue: 'system',
        currentValue: 'dark',
        source: 'user',
      },
    ]);
    expect(Object.keys(events[0]).sort()).toEqual([
      'currentValue',
      'key',
      'previousValue',
      'source',
    ]);
  });

  it('resets to the definition default with reset source', () => {
    const setting = new UiSetting(UI_SETTINGS_REGISTRY.theme);
    setting.set('dark');
    const events: object[] = [];
    setting.subscribe((event) => events.push(event));

    setting.reset();

    expect(setting.value).toBe('system');
    expect(events).toEqual([
      {
        key: 'theme',
        previousValue: 'dark',
        currentValue: 'system',
        source: 'reset',
      },
    ]);
  });

  it('rejects a value that fails the definition runtime validator', () => {
    const setting = new UiSetting(UI_SETTINGS_REGISTRY.theme);
    expect(() => setting.set('automatic' as ThemeMode)).toThrowError(TypeError);
    expect(setting.value).toBe('system');
  });
});

describe('UI settings registry', () => {
  it('contains exactly the 11 specified definitions and all are LOCAL', () => {
    expect(UI_SETTING_KEYS).toEqual([
      'theme',
      'density',
      'formLabelPlacement',
      'formAppearance',
      'digits',
      'identifierDigits',
      'numberSeparators',
      'moneyDisplay',
      'dateFormat',
      'dateViewStyle',
      'timeFormat',
    ]);
    expect(UI_SETTING_KEYS).toHaveLength(11);
    expect(
      UI_SETTING_KEYS.every(
        (key) => UI_SETTINGS_REGISTRY[key].storeType === StoreType.LOCAL
      )
    ).toBe(true);
  });
});

describe('UiSettingsStore local persistence', () => {
  it('writes one complete default document on first hydration', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);

    store.hydrate();

    expect(memory.setCalls).toBe(1);
    expect(persistedDocument(memory)).toEqual(defaultDocument());
    expect(Object.keys(persistedDocument(memory))).toHaveLength(11);
  });

  it('hydrates all settings from one valid saved document without writes', () => {
    const memory = new MemoryStorage();
    memory.seed(storageKey, JSON.stringify(customDocument()));
    const store = createStore(memory);
    const hydrateSources: string[] = [];
    for (const key of UI_SETTING_KEYS) {
      store.get(key).subscribe((event) => hydrateSources.push(event.source));
    }

    store.hydrate();

    expect(store.snapshot()).toEqual(customDocument());
    expect(hydrateSources).toEqual(Array.from({length: 11}, () => 'hydrate'));
    expect(memory.setCalls).toBe(0);
  });

  it('persists one complete document immediately for one normal set', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);
    store.hydrate();
    memory.setCalls = 0;

    store.set('theme', 'dark');

    expect(memory.setCalls).toBe(1);
    expect(persistedDocument(memory).theme).toBe('dark');
  });

  it('persists resetSetting once', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);
    store.hydrate();
    store.set('theme', 'dark');
    memory.setCalls = 0;

    store.resetSetting('theme');

    expect(memory.setCalls).toBe(1);
    expect(persistedDocument(memory).theme).toBe(
      UI_SETTINGS_REGISTRY.theme.defaultValue
    );
  });

  it('persists resetCategory once and resets only that category', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);
    store.hydrate();
    store.set('theme', 'dark');
    store.set('density', 'compact');
    store.set('formAppearance', 'filled');
    memory.setCalls = 0;

    store.resetCategory('appearance');

    expect(memory.setCalls).toBe(1);
    expect(store.value('theme')).toBe(UI_SETTINGS_REGISTRY.theme.defaultValue);
    expect(store.value('density')).toBe(UI_SETTINGS_REGISTRY.density.defaultValue);
    expect(store.value('formAppearance')).toBe('filled');
  });

  it('persists resetAll once', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);
    store.hydrate();
    store.set('theme', 'dark');
    store.set('timeFormat', '12h');
    memory.setCalls = 0;

    store.resetAll();

    expect(memory.setCalls).toBe(1);
    expect(store.snapshot()).toEqual(defaultDocument());
  });

  it.each([
    {
      name: 'unknown saved key',
      serialized: () => JSON.stringify({...customDocument(), unknownSetting: true}),
    },
    {
      name: 'missing saved key',
      serialized: () => {
        const missingTheme: Record<string, unknown> = {...customDocument()};
        delete missingTheme['theme'];
        return JSON.stringify(missingTheme);
      },
    },
    {
      name: 'invalid saved value',
      serialized: () => JSON.stringify({...customDocument(), theme: 'automatic'}),
    },
    {
      name: 'malformed JSON',
      serialized: () => '{not-json',
    },
  ])('resets the whole document for $name', ({serialized}) => {
    const memory = new MemoryStorage();
    memory.seed(storageKey, serialized());
    const store = createStore(memory);

    store.hydrate();

    expect(store.snapshot()).toEqual(defaultDocument());
    expect(persistedDocument(memory)).toEqual(defaultDocument());
    expect(memory.setCalls).toBe(1);
  });

  it('does not touch unrelated storage keys', () => {
    const memory = new MemoryStorage();
    memory.seed('unrelated:key', 'preserve-me');
    const store = createStore(memory);

    store.hydrate();
    store.set('theme', 'dark');
    store.resetAll();

    expect(memory.getItem('unrelated:key')).toBe('preserve-me');
  });
});

describe('Contextual preferences', () => {
  it('uses the base when no override exists and the override when present', () => {
    const preference: ContextualPreference<DigitSet, DigitContext> = {
      base: 'latin',
      overrides: {view: 'arabic-indic'},
    };

    expect(resolveContextualPreference(preference, 'field')).toBe('latin');
    expect(resolveContextualPreference(preference, 'view')).toBe('arabic-indic');
  });

  it('removes an override immutably and returns resolution to the base', () => {
    const preference: ContextualPreference<DigitSet, DigitContext> = {
      base: 'latin',
      overrides: {view: 'arabic-indic'},
    };

    const updated = replaceContextualOverride(preference, 'view', undefined);

    expect(updated).not.toBe(preference);
    expect(updated.overrides).not.toBe(preference.overrides);
    expect(resolveContextualPreference(updated, 'view')).toBe('latin');
    expect(preference.overrides.view).toBe('arabic-indic');
  });

  it('keeps Identifier Digits independent from contextual digit settings', () => {
    const memory = new MemoryStorage();
    const store = createStore(memory);
    store.hydrate();

    store.set('digits', {base: 'arabic-indic', overrides: {}});

    expect(store.value('digits').base).toBe('arabic-indic');
    expect(store.value('identifierDigits')).toBe('latin');
  });
});

describe('Deterministic preview formatters', () => {
  it('formats Latin comma-dot and Arabic-Indic Arabic-separator numbers exactly', () => {
    expect(formatPreviewNumber(12345.67, 'latin', 'comma-dot')).toBe('12,345.67');
    expect(formatPreviewNumber(12345.67, 'arabic-indic', 'arabic')).toBe(
      '١٢٬٣٤٥٫٦٧'
    );
  });

  it('formats numeric, ISO, and long Arabic dates exactly', () => {
    expect(formatDatePreview('2026-09-21', 'DD/MM/YYYY', 'latin')).toBe(
      '21/09/2026'
    );
    expect(formatDatePreview('2026-09-21', 'YYYY-MM-DD', 'latin')).toBe(
      '2026-09-21'
    );
    expect(formatLongArabicDatePreview('2026-09-21', 'latin')).toBe(
      '21 سبتمبر 2026'
    );
    expect(formatLongArabicDatePreview('2026-09-21', 'arabic-indic')).toBe(
      '٢١ سبتمبر ٢٠٢٦'
    );
  });

  it('formats 24-hour and 12-hour time exactly with digit conversion', () => {
    expect(formatTimePreview('17:45', '24h', 'latin')).toBe('17:45');
    expect(formatTimePreview('17:45', '12h', 'latin')).toBe('5:45 م');
    expect(formatTimePreview('17:45', '12h', 'arabic-indic')).toBe('٥:٤٥ م');
    expect(convertDigits('INV-2026-001', 'arabic-indic')).toBe('INV-٢٠٢٦-٠٠١');
  });

  it('supports all four money display profiles without changing the value', () => {
    expect(
      formatMoneyPreview(12345.67, 'EGP', 'ج.م.', 'latin', 'comma-dot', 'code-after')
    ).toBe('12,345.67 EGP');
    expect(
      formatMoneyPreview(12345.67, 'EGP', 'ج.م.', 'latin', 'comma-dot', 'code-before')
    ).toBe('EGP 12,345.67');
    expect(
      formatMoneyPreview(
        12345.67,
        'EGP',
        'ج.م.',
        'latin',
        'comma-dot',
        'symbol-after'
      )
    ).toBe('12,345.67 ج.م.');
    expect(
      formatMoneyPreview(
        12345.67,
        'EGP',
        'ج.م.',
        'latin',
        'comma-dot',
        'symbol-before'
      )
    ).toBe('ج.م. 12,345.67');
  });
});

describe('Preferences specimen route and structure', () => {
  beforeEach(async () => {
    window.localStorage.removeItem(storageKey);
    await TestBed.configureTestingModule({
      imports: [Preferences],
    }).compileComponents();
  });

  afterEach(() => {
    window.localStorage.removeItem(storageKey);
  });

  it('registers the /foundation/preferences route', () => {
    expect(routes.find((route) => route.path === 'foundation/preferences')).toBeDefined();
  });

  it('renders exactly the seven required major sections and live preview', () => {
    const fixture = TestBed.createComponent(Preferences);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-preference-section]')).toHaveLength(7);
    expect(compiled.querySelector('#preferences-appearance')).toBeTruthy();
    expect(compiled.querySelector('#preferences-forms')).toBeTruthy();
    expect(compiled.querySelector('#preferences-numbers')).toBeTruthy();
    expect(compiled.querySelector('#preferences-money')).toBeTruthy();
    expect(compiled.querySelector('#preferences-date-time')).toBeTruthy();
    expect(compiled.querySelector('#preferences-preview')).toBeTruthy();
    expect(compiled.querySelector('#preferences-storage-reset')).toBeTruthy();
    expect(compiled.querySelector('#preferences-live-preview')).toBeTruthy();
  });

  it('keeps theme and density attributes local to the live preview', () => {
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    const htmlDensity = document.documentElement.getAttribute('data-density');
    const bodyTheme = document.body.getAttribute('data-theme');
    const bodyDensity = document.body.getAttribute('data-density');

    const fixture = TestBed.createComponent(Preferences);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const preview = compiled.querySelector('#preferences-live-preview');

    expect(preview?.getAttribute('data-theme')).toMatch(/^(light|dark)$/);
    expect(preview?.getAttribute('data-density')).toBe('comfortable');
    expect(document.documentElement.getAttribute('data-theme')).toBe(htmlTheme);
    expect(document.documentElement.getAttribute('data-density')).toBe(htmlDensity);
    expect(document.body.getAttribute('data-theme')).toBe(bodyTheme);
    expect(document.body.getAttribute('data-density')).toBe(bodyDensity);
  });
});
