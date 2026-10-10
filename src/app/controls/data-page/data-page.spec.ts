import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpSmartTable} from '../smart-table/smart-table';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTableCell} from '../table/table';
import {ErpDataPage, ErpDataPageSlot} from './data-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpDataPage, ErpDataPageSlot, ErpStatusBadge, ErpTableCell],
  template: `
    <erp-data-page title="دليل العملاء" caption="حسابات العملاء" [columns]="columns" [rows]="rows" selectable showSide>
      <ng-template erpTableCell="status" let-value="value">
        <erp-status-badge [label]="value?.toString() ?? 'غير معروف'" tone="success" />
      </ng-template>
      <span erpDataPagePrimary data-primary-slot></span>
      <span erpDataPageSide data-side-slot></span>
    </erp-data-page>
  `,
})
class DataPageHost {
  readonly columns = [
    {key: 'name', label: 'العميل', required: true, sortable: true},
    {key: 'status', label: 'الحالة'},
  ] as const;
  readonly rows = [{id: '1', name: 'شركة النيل', status: 'نشط'}];
}

describe('ErpDataPage', () => {
  function create() {
    const fixture = TestBed.createComponent(ErpDataPage);
    fixture.componentRef.setInput('title', 'دليل العملاء');
    fixture.componentRef.setInput('caption', 'حسابات العملاء');
    fixture.componentRef.setInput('columns', [{key: 'name', label: 'العميل'}]);
    fixture.componentRef.setInput('rows', [{id: '1', name: 'شركة النيل'}]);
    fixture.detectChanges();
    return fixture;
  }

  it('composes Page, PageHeader, PageShell, and SmartTable without owning data transport', () => {
    const fixture = create();
    expect(fixture.nativeElement.querySelector('erp-page')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-page-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-page-shell')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-smart-table')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-table tbody tr')?.textContent).toContain('شركة النيل');
  });

  it('forwards controlled query models and output intents', () => {
    const fixture = create();
    const queries = vi.fn();
    const refresh = vi.fn();
    fixture.componentInstance.queryChanged.subscribe(queries);
    fixture.componentInstance.refreshRequested.subscribe(refresh);
    const smartTable = fixture.debugElement.query(By.directive(ErpSmartTable)).componentInstance as ErpSmartTable;
    smartTable.queryChanged.emit({revision: 1, page: 2, pageSize: 25, sort: null, filters: [], visibleColumns: ['name']});
    smartTable.refreshRequested.emit();
    expect(queries).toHaveBeenCalledOnce();
    expect(refresh).toHaveBeenCalledOnce();
  });

  it('reprojects rich table cells and named page regions through existing owners', () => {
    const fixture = TestBed.createComponent(DataPageHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-status-badge')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-page-header [data-primary-slot]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-page-shell [data-side-slot]')).not.toBeNull();
  });

  it('inherits theme and direction and declares no transport state', () => {
    const fixture = create();
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
    expect(fixture.nativeElement.hasAttribute('dir')).toBe(false);
    expect(Object.keys(fixture.componentInstance)).not.toContain('http');
  });
});
