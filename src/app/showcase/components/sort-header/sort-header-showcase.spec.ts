import {TestBed} from '@angular/core/testing';
import {ErpSortHeaderShowcase} from './sort-header-showcase';

describe('ErpSortHeaderShowcase', () => {
  it('cycles the controlled direction on its single live target', () => {
    const fixture = TestBed.createComponent(ErpSortHeaderShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.getAttribute('data-sort-direction')).toBe('none');
    (target.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(target.getAttribute('data-sort-direction')).toBe('ascending');
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'sortChange: ascending',
    );
  });
});
