import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpPage} from './page';

@Component({
  imports: [ErpPage, ErpText],
  template: `
    <erp-page [widthMode]="widthMode" [scrollMode]="scrollMode">
      <erp-text type="paragraph">محتوى الصفحة</erp-text>
    </erp-page>
  `,
})
class PageTestHost {
  widthMode: 'boxed' | 'fluid' | 'full' = 'boxed';
  scrollMode: 'document' | 'page' | 'free' = 'page';
}

describe('ErpPage', () => {
  it('projects production page content and exposes controlled width and scroll contracts', () => {
    const fixture = TestBed.createComponent(PageTestHost);
    fixture.detectChanges();

    const page = fixture.nativeElement.querySelector('erp-page') as HTMLElement;
    expect(page.dataset['pageWidth']).toBe('boxed');
    expect(page.dataset['pageScroll']).toBe('page');
    expect(page.textContent).toContain('محتوى الصفحة');

  });

  it('defaults to responsive fluid width and document scrolling', () => {
    const fixture = TestBed.createComponent(ErpPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.dataset['pageWidth']).toBe('fluid');
    expect(fixture.nativeElement.dataset['pageScroll']).toBe('document');
  });

  it('owns no theme, router, global document, or business-state API', () => {
    const source = ErpPage.toString();
    expect(source).not.toContain('ThemeMode');
    expect(source).not.toContain('Router');
    expect(source).not.toContain('document.');
    expect(source).not.toContain('HttpClient');
  });
});
