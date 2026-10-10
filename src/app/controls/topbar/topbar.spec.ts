import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpTopbar} from './topbar';

@Component({
  imports: [ErpText, ErpTopbar],
  template: `
    <erp-topbar>
      <erp-text erpTopbarStart type="span">البداية</erp-text>
      <erp-text erpTopbarContext type="span">السياق</erp-text>
      <erp-text erpTopbarSearch type="span">البحث</erp-text>
      <erp-text erpTopbarActions data-notification-evidence type="span">الإشعارات</erp-text>
      <erp-text erpTopbarUser type="span">المستخدم</erp-text>
    </erp-topbar>
  `,
})
class TopbarTestHost {}

describe('ErpTopbar', () => {
  it('owns five layout regions without owning theme state', () => {
    const fixture = TestBed.createComponent(TopbarTestHost);
    fixture.detectChanges();

    for (const region of ['start', 'context', 'search', 'actions', 'user']) {
      expect(fixture.nativeElement.querySelector(`.topbar__${region}`)?.textContent)
        .not.toBe('');
    }
    expect(fixture.nativeElement.querySelector('[data-theme]')).toBeNull();
    expect(fixture.nativeElement.querySelector(
      '.topbar__actions [data-notification-evidence]',
    )?.textContent).toContain('الإشعارات');
    expect(fixture.nativeElement.querySelector('[erpTopbarNotifications]'))
      .toBeNull();

    const styles = (
      ErpTopbar as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(styles).toMatch(/header[^}]*display:\s*grid/);
    expect(styles).toMatch(/topbar__search[^}]*min-inline-size/);
  });
});
