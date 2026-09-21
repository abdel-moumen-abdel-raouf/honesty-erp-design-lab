import {signal, Signal, WritableSignal} from '@angular/core';
import {
  SettingDefinition,
  UiSettingChangeEvent,
  UiSettingChangeSource,
  UiSettingKey,
  UiSettingsValueMap,
} from './ui-settings.types';

export type UiSettingSubscriber<K extends UiSettingKey> = (
  event: UiSettingChangeEvent<K>
) => void;

function cloneAndFreezeOwnedValue<T>(value: T): T {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return Object.freeze(value.map((item) => cloneAndFreezeOwnedValue(item))) as T;
  }

  if (typeof value !== 'object') {
    throw new TypeError('UI setting values must contain only JSON-like values.');
  }

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError('UI setting object values must be plain objects.');
  }

  const ownedValue: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    ownedValue[key] = cloneAndFreezeOwnedValue(item);
  }

  return Object.freeze(ownedValue) as T;
}

export class UiSetting<K extends UiSettingKey> {
  private readonly currentValue: WritableSignal<UiSettingsValueMap[K]>;
  private readonly subscribers = new Set<UiSettingSubscriber<K>>();

  readonly valueSignal: Signal<UiSettingsValueMap[K]>;

  constructor(readonly definition: Readonly<SettingDefinition<K>>) {
    if (!definition.validate(definition.defaultValue)) {
      throw new TypeError(`Invalid default value for UI setting "${definition.key}".`);
    }

    this.currentValue = signal<UiSettingsValueMap[K]>(
      cloneAndFreezeOwnedValue(definition.defaultValue)
    );
    this.valueSignal = this.currentValue.asReadonly();
  }

  get value(): UiSettingsValueMap[K] {
    return this.valueSignal();
  }

  set(value: UiSettingsValueMap[K], source: UiSettingChangeSource = 'user'): void {
    if (!this.definition.validate(value)) {
      throw new TypeError(`Invalid value for UI setting "${this.definition.key}".`);
    }

    const previousValue = this.value;
    const currentValue = cloneAndFreezeOwnedValue(value);
    this.currentValue.set(currentValue);

    const event: UiSettingChangeEvent<K> = Object.freeze({
      key: this.definition.key,
      previousValue,
      currentValue,
      source,
    });

    for (const subscriber of this.subscribers) {
      subscriber(event);
    }
  }

  reset(source: UiSettingChangeSource = 'reset'): void {
    this.set(this.definition.defaultValue, source);
  }

  subscribe(subscriber: UiSettingSubscriber<K>): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }
}
