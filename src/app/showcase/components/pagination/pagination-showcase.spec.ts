import {TestBed} from '@angular/core/testing';
import {ErpPaginationShowcase} from './pagination-showcase';

describe('ErpPaginationShowcase', () => {
  it('keeps page and page-size intents controlled on the same live target', () => {
    const fixture = TestBed.createComponent(ErpPaginationShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.getAttribute('data-pagination-page')).toBe('3');

    const next = [...target.querySelectorAll<HTMLButtonElement>('button')].find(
      (button) => button.textContent?.includes('التالية'),
    );
    next?.click();
    fixture.detectChanges();
    expect(target.getAttribute('data-pagination-page')).toBe('4');
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'pageChange: 4',
    );

    fixture.componentInstance.recordPaginationSize(50);
    fixture.detectChanges();
    expect(fixture.componentInstance.value('pageSize')).toBe(50);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'pageSizeChange: 50',
    );
  });
});
