import {TestBed} from '@angular/core/testing';
import {ErpFilterBarShowcase} from './filter-bar-showcase';

describe('ErpFilterBarShowcase', () => {
  it('renders a projected field and updates controlled active filters', () => {
    const fixture = TestBed.createComponent(ErpFilterBarShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('erp-text-box')).not.toBeNull();
    expect(target.textContent).toContain('المدينة: القاهرة');
    expect(target.textContent).toContain('الحالة: نشط');

    fixture.componentInstance.removeActiveFilter('city');
    fixture.detectChanges();
    expect(target.textContent).not.toContain('المدينة: القاهرة');
    expect(target.textContent).toContain('الحالة: نشط');

    fixture.componentInstance.resetActiveFilters();
    fixture.detectChanges();
    expect(target.querySelectorAll('.filter-bar__criterion')).toHaveLength(0);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('resetRequested');
  });
});
