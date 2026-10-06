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
      (navigationActivated)="activated = $event.id"
    >
      <erp-text erpAppShellTopbarStart type="span">Honesty ERP</erp-text>
      <erp-text type="paragraph">محتوى الصفحة</erp-text>
    </erp-app-shell>
  `,
})
class AppShellTestHost {
  readonly items = [{id: 'ledger', label: 'الحسابات العامة', href: '/ledger'}];
  activated = '';
}

describe('ErpAppShell', () => {
  it('composes Topbar, Sidebar, and projected content without theme ownership', () => {
    const fixture = TestBed.createComponent(AppShellTestHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('erp-topbar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-sidebar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.app-shell__content')?.textContent)
      .toContain('محتوى الصفحة');
    expect(fixture.nativeElement.querySelector('[data-theme]')).toBeNull();
    fixture.nativeElement.dir = 'rtl';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.app-shell').dir).toBe('');

    (fixture.nativeElement.querySelector('erp-sidebar a') as HTMLAnchorElement).click();
    expect(fixture.componentInstance.activated).toBe('ledger');
  });
});
