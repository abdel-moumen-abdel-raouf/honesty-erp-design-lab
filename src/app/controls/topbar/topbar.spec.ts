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
      <erp-text erpTopbarActions type="span">الإجراءات</erp-text>
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
  });
});
