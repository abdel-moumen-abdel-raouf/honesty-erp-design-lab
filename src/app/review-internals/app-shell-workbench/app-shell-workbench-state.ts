import {Injectable, signal} from '@angular/core';
import type {ErpAppShellFooterConfig} from '../../controls/app-shell/app-shell';
import type {ErpQuickActionGroup} from '../../controls/quick-actions-bar/quick-actions-bar';
import type {ErpNavigationItem} from '../../controls/shell-family/shell-contracts';

export interface ErpAppShellWorkbenchValues {
  readonly navigationItems: readonly ErpNavigationItem[];
  readonly activeNavigationId: string | null;
  readonly sidebarLabel: string;
  readonly contentLabel: string;
  readonly quickActionGroups: readonly ErpQuickActionGroup[];
  readonly quickActionsLabel: string;
  readonly footer: ErpAppShellFooterConfig | null;
  readonly viewport: boolean;
  readonly sidebarOpen: boolean;
  readonly sidebarCollapsed: boolean;
}

export type ErpAppShellWorkbenchModel =
  | 'sidebarOpen'
  | 'sidebarCollapsed';

const INITIAL_EVENT = 'لم يحدث تفاعل بعد';

@Injectable({providedIn: 'root'})
export class ErpReviewAppShellWorkbenchState {
  readonly active = signal(false);
  readonly values = signal<ErpAppShellWorkbenchValues | null>(null);
  readonly lastEvent = signal(INITIAL_EVENT);

  activate(values: ErpAppShellWorkbenchValues): void {
    this.values.set({...values});
    this.lastEvent.set(INITIAL_EVENT);
    this.active.set(true);
  }

  deactivate(): void {
    this.active.set(false);
    this.values.set(null);
    this.lastEvent.set(INITIAL_EVENT);
  }

  updateControl<K extends keyof ErpAppShellWorkbenchValues>(
    name: K,
    value: ErpAppShellWorkbenchValues[K],
  ): void {
    this.values.update((current) => current ? {...current, [name]: value} : current);
  }

  updateModel(name: ErpAppShellWorkbenchModel, value: boolean): void {
    this.updateControl(name, value);
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    this.lastEvent.set(`${name}: ${this.renderEventValue(value)}`);
  }

  private renderEventValue(value: unknown): string {
    if (typeof value === 'string') return value;
    try {
      return JSON.stringify(value) ?? String(value);
    } catch {
      return String(value);
    }
  }
}
