import {signal, Signal, WritableSignal} from '@angular/core';
import {
  SettingDefinition,
  UiSettingChangeEvent,
  UiSettingChangeSource,
} from './ui-settings.types';

export type UiSettingSubscriber<T> = (event: UiSettingChangeEvent<T>) => void;

export class UiSetting<T> {
  private readonly currentValue: WritableSignal<T>;
  private readonly subscribers = new Set<UiSettingSubscriber<T>>();

  readonly valueSignal: Signal<T>;

  constructor(readonly definition: Readonly<SettingDefinition<T>>) {
    this.currentValue = signal<T>(definition.defaultValue);
    this.valueSignal = this.currentValue.asReadonly();
  }

  get value(): T {
    return this.valueSignal();
  }

  set(value: T, source: UiSettingChangeSource = 'user'): void {
    if (!this.definition.validate(value)) {
      throw new TypeError(`Invalid value for UI setting "${this.definition.key}".`);
    }

    const previousValue = this.value;
    this.currentValue.set(value);

    const event: UiSettingChangeEvent<T> = Object.freeze({
      key: this.definition.key,
      previousValue,
      currentValue: value,
      source,
    });

    for (const subscriber of this.subscribers) {
      subscriber(event);
    }
  }

  reset(source: UiSettingChangeSource = 'reset'): void {
    this.set(this.definition.defaultValue, source);
  }

  subscribe(subscriber: UiSettingSubscriber<T>): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }
}
