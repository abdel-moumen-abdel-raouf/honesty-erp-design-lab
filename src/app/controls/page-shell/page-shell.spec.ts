import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpPageShell} from './page-shell';

@Component({
  imports: [ErpPageShell, ErpText],
  template: `
    <erp-page-shell>
      <erp-text erpPageShellHeader type="heading-1">رأس الصفحة</erp-text>
      <erp-text type="paragraph">المحتوى</erp-text>
      <erp-text erpPageShellSide type="paragraph">السياق</erp-text>
      <erp-text erpPageShellFooter type="caption">التذييل</erp-text>
    </erp-page-shell>
  `,
})
class PageShellTestHost {}

describe('ErpPageShell', () => {
  it('keeps header, main, side, and footer projection ownership distinct', () => {
    const fixture = TestBed.createComponent(PageShellTestHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.page-shell__header')?.textContent)
      .toContain('رأس الصفحة');
    expect(fixture.nativeElement.querySelector('.page-shell__main')?.textContent)
      .toContain('المحتوى');
    expect(fixture.nativeElement.querySelector('.page-shell__side')?.textContent)
      .toContain('السياق');
    expect(fixture.nativeElement.querySelector('.page-shell__footer')?.textContent)
      .toContain('التذييل');
  });

  it('keeps optional header, side, and footer regions empty', () => {
    const fixture = TestBed.createComponent(ErpPageShell);
    fixture.detectChanges();

    for (const selector of [
      '.page-shell__header',
      '.page-shell__side',
      '.page-shell__footer',
    ]) {
      expect(fixture.nativeElement.querySelector(selector)?.children.length)
        .toBe(0);
    }
    expect(fixture.nativeElement.querySelector('erp-container')).toBeNull();
    expect(fixture.nativeElement.querySelector('.page-shell__layout')).not.toBeNull();
  });
});
