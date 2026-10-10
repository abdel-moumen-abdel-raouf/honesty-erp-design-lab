import {TestBed} from '@angular/core/testing';
import {ErpFilterDrawerShowcase} from './filter-drawer-showcase';

describe('ErpFilterDrawerShowcase', () => {
  it('supplies meaningful definitions and applies emitted filters to the same target', () => {
    const fixture = TestBed.createComponent(ErpFilterDrawerShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(fixture.componentInstance.value('definitions')).toHaveLength(3);
    expect(target.textContent).toContain('تصفية متقدمة');

    const filters = [{key: 'status', label: 'الحالة', value: 'نشط'}] as const;
    fixture.componentInstance.applyDrawerFilters(filters);
    fixture.detectChanges();
    expect(fixture.componentInstance.value('filters')).toEqual(filters);
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('applied');
  });
});
