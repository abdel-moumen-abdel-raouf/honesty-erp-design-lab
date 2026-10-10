import {TestBed} from '@angular/core/testing';
import {
  ErpAppShellWorkbenchValues,
  ErpReviewAppShellWorkbenchState,
} from './app-shell-workbench-state';

const INITIAL_VALUES: ErpAppShellWorkbenchValues = {
  navigationItems: [{id: 'finance', label: 'المالية'}],
  activeNavigationId: 'finance',
  sidebarLabel: 'التنقل الرئيسي',
  contentLabel: 'محتوى التطبيق',
  quickActionGroups: [],
  quickActionsLabel: 'الإجراءات السريعة',
  footer: null,
  viewport: true,
  sidebarOpen: false,
  sidebarCollapsed: false,
};

describe('ErpReviewAppShellWorkbenchState', () => {
  it('owns a typed route-scoped AppShell preview state', () => {
    const state = TestBed.inject(ErpReviewAppShellWorkbenchState);

    state.activate(INITIAL_VALUES);
    expect(state.active()).toBe(true);
    expect(state.values()).toEqual(INITIAL_VALUES);

    state.updateControl('contentLabel', 'معاينة المحتوى');
    state.updateModel('sidebarOpen', true);

    expect(state.values()?.contentLabel).toBe('معاينة المحتوى');
    expect(state.values()?.sidebarOpen).toBe(true);
    expect(state.lastEvent()).toBe('sidebarOpenChange: true');
  });

  it('clears values and event evidence when the review route is destroyed', () => {
    const state = TestBed.inject(ErpReviewAppShellWorkbenchState);
    state.activate(INITIAL_VALUES);
    state.recordEvent('navigationActivated', {id: 'finance'});

    state.deactivate();

    expect(state.active()).toBe(false);
    expect(state.values()).toBeNull();
    expect(state.lastEvent()).toBe('لم يحدث تفاعل بعد');
  });
});
