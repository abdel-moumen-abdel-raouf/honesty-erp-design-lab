import {TestBed} from '@angular/core/testing';
import {ShellBatch} from './shell-batch';

describe('ShellBatch', () => {
  it('composes all ten owners and one integrated ERP shell specimen', () => {
    const fixture = TestBed.createComponent(ShellBatch);
    fixture.detectChanges();

    for (const selector of [
      'erp-breadcrumbs',
      'erp-page-header',
      'erp-page-shell',
      'erp-sidebar',
      'erp-topbar',
      'erp-branch-selector',
      'erp-global-search',
      'erp-notification-bell',
      'erp-user-menu',
      'erp-app-shell',
    ]) {
      expect(fixture.nativeElement.querySelector(selector)).not.toBeNull();
    }

    expect(fixture.nativeElement.querySelector('[data-integrated-shell-specimen] erp-app-shell'))
      .not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-theme]')).toBeNull();
  });
});
