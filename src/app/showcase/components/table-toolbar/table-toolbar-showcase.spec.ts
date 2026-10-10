import {TestBed} from '@angular/core/testing';
import {ErpTableToolbarShowcase} from './table-toolbar-showcase';

describe('ErpTableToolbarShowcase', () => {
  it('renders every named composition slot through existing ERP owners', () => {
    const fixture = TestBed.createComponent(ErpTableToolbarShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('erp-search-box[erptabletoolbarsearch]')).not.toBeNull();
    expect(target.querySelector('erp-filter-drawer[erptabletoolbarfilters]')).not.toBeNull();
    expect(target.querySelector('erp-column-chooser[erptabletoolbarcolumns]')).not.toBeNull();
    expect(target.querySelector('erp-button[erptabletoolbaractions]')).not.toBeNull();
    expect(target.textContent).toContain('تحديث');
    expect(target.textContent).toContain('تصدير');
  });
});
