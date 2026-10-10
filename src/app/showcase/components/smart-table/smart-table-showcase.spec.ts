import {TestBed} from '@angular/core/testing';
import {ErpSmartTableShowcase} from './smart-table-showcase';

describe('ErpSmartTableShowcase', () => {
  it('renders a meaningful integrated table with rich cells, bulk action, and reachable outputs', () => {
    const fixture = TestBed.createComponent(ErpSmartTableShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('erp-table tbody tr')).toHaveLength(3);
    expect(target.querySelectorAll('erp-status-badge')).toHaveLength(3);
    expect(target.querySelector('erp-bulk-action-bar')?.textContent).toContain('تصدير المحدد');
    expect(target.querySelector('erp-filter-drawer')).not.toBeNull();
    expect(target.querySelector('erp-column-chooser')).not.toBeNull();
    expect(target.textContent).toContain('تحديث');
    expect(target.textContent).toContain('تصدير');
  });
});
