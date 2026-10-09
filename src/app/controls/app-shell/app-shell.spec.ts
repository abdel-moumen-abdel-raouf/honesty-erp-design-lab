import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpAppShell} from './app-shell';

@Component({
  imports: [ErpAppShell, ErpText],
  template: `
    <erp-app-shell
      [navigationItems]="items"
      activeNavigationId="ledger"
      [quickActionGroups]="quickActions"
      [footer]="footer"
      [viewport]="true"
      [(sidebarOpen)]="sidebarOpen"
      [(sidebarCollapsed)]="sidebarCollapsed"
      (navigationActivated)="activated = $event.id"
      (quickActionActivated)="quickActivated = $event"
      (footerActionActivated)="footerActivated = $event"
    >
      <erp-text erpAppShellTopbarStart type="span">Honesty ERP</erp-text>
      <erp-text type="paragraph">محتوى الصفحة</erp-text>
    </erp-app-shell>
  `,
})
class AppShellTestHost {
  readonly items = [{id: 'ledger', label: 'الحسابات العامة', href: '/ledger'}];
  readonly quickActions = [{
    id: 'daily',
    actions: [{id: 'task', label: 'مهمة', icon: 'add' as const}],
  }];
  readonly footer = {
    applicationLabel: 'Honesty ERP',
    actions: [{id: 'support', label: 'الدعم'}],
  };
  activated = '';
  quickActivated = '';
  footerActivated = '';
  sidebarOpen = true;
  sidebarCollapsed = true;
}

describe('ErpAppShell', () => {
  it('composes the Shell owners and projected content without theme ownership', () => {
    const fixture = TestBed.createComponent(AppShellTestHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('erp-topbar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-sidebar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-quick-actions-bar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-app-footer')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.app-shell__content')?.textContent)
      .toContain('محتوى الصفحة');
    expect(fixture.nativeElement.querySelector('[data-theme]')).toBeNull();
    expect(fixture.nativeElement.querySelector('erp-app-shell')?.getAttribute('data-app-shell-viewport'))
      .toBe('true');
    expect(fixture.nativeElement.querySelector('erp-app-shell')?.getAttribute('data-app-shell-sidebar-open'))
      .toBe('true');
    expect(fixture.nativeElement.querySelector('erp-app-shell')?.getAttribute('data-app-shell-sidebar-collapsed'))
      .toBe('true');
    fixture.nativeElement.dir = 'rtl';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.app-shell').dir).toBe('');

    (fixture.nativeElement.querySelector('erp-sidebar a') as HTMLAnchorElement).click();
    expect(fixture.componentInstance.activated).toBe('ledger');
    (fixture.nativeElement.querySelector('erp-quick-actions-bar button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.quickActivated).toBe('task');
    (fixture.nativeElement.querySelector('erp-app-footer button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.footerActivated).toBe('support');

    (fixture.nativeElement.querySelector('erp-sidebar .sidebar__header button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.sidebarOpen).toBe(false);
    expect(fixture.componentInstance.sidebarCollapsed).toBe(false);
  });

  it('preserves the prior composition when optional owners are not configured', () => {
    const fixture = TestBed.createComponent(ErpAppShell);
    fixture.componentRef.setInput('navigationItems', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('erp-topbar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-sidebar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-quick-actions-bar')).toBeNull();
    expect(fixture.nativeElement.querySelector('erp-app-footer')).toBeNull();
  });
});
