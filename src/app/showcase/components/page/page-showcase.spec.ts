import {TestBed} from '@angular/core/testing';
import {ErpPageShowcase} from './page-showcase';

describe('ErpPageShowcase', () => {
  it('renders one meaningful page target and applies width and scroll controls', () => {
    const fixture = TestBed.createComponent(ErpPageShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('erp-surface')).toHaveLength(2);
    expect(target.textContent).toContain('ملخص المبيعات');

    fixture.componentInstance.liveValues.set({widthMode: 'boxed', scrollMode: 'page'});
    fixture.detectChanges();
    expect(target.dataset['pageWidth']).toBe('boxed');
    expect(target.dataset['pageScroll']).toBe('page');
  });
});
