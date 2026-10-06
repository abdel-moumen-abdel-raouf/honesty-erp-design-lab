import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpButton} from '../button/button';
import {ErpPageHeader} from './page-header';

@Component({
  imports: [ErpButton, ErpPageHeader],
  template: `
    <erp-page-header title="العملاء" subtitle="إدارة دليل العملاء">
      <erp-button erpPageHeaderPrimary label="عميل جديد" />
      <erp-button erpPageHeaderSecondary label="تصدير" />
    </erp-page-header>
  `,
})
class PageHeaderTestHost {}

describe('ErpPageHeader', () => {
  it('owns title hierarchy and independent projected action regions', () => {
    const fixture = TestBed.createComponent(PageHeaderTestHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('العملاء');
    expect(fixture.nativeElement.textContent).toContain('إدارة دليل العملاء');
    expect(fixture.nativeElement.querySelector('.page-header__primary erp-button'))
      .not.toBeNull();
    expect(fixture.nativeElement.querySelector('.page-header__secondary erp-button'))
      .not.toBeNull();
  });

  it('keeps every optional region empty when the consumer omits it', () => {
    const fixture = TestBed.createComponent(ErpPageHeader);
    fixture.componentRef.setInput('title', 'العملاء');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('erp-text[type="paragraph"]'))
      .toBeNull();
    for (const selector of [
      '.page-header__breadcrumbs',
      '.page-header__meta',
      '.page-header__primary',
      '.page-header__secondary',
    ]) {
      expect(fixture.nativeElement.querySelector(selector)?.children.length)
        .toBe(0);
    }
  });
});
