import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTableCell} from '../table/table';
import {ErpSmartTable} from './smart-table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpSmartTable, ErpStatusBadge, ErpTableCell],
  template: `
    <erp-smart-table
      caption="حسابات العملاء"
      [columns]="columns"
      [rows]="rows"
      selectable
    >
      <ng-template erpTableCell="status" let-value="value">
        <erp-status-badge [label]="value?.toString() ?? 'غير معروف'" tone="success" />
      </ng-template>
    </erp-smart-table>
  `,
})
class SmartTableHost {
  readonly columns = [
    {key: 'name', label: 'العميل', sortable: true, required: true},
    {key: 'status', label: 'الحالة'},
  ] as const;
  readonly rows = [
    {id: '1', name: 'أحمد', status: 'نشط'},
    {id: '2', name: 'سارة', status: 'نشط'},
  ];
}

describe('ErpSmartTable', () => {
  const columns = [
    {key: 'name', label: 'العميل', sortable: true, required: true},
    {key: 'city', label: 'المدينة', hideable: true},
  ] as const;
  const rows = [
    {id: '1', name: 'سارة', city: 'القاهرة'},
    {id: '2', name: 'أحمد', city: 'الإسكندرية'},
    {id: '3', name: 'محمود', city: 'القاهرة'},
  ];

  function create() {
    const fixture = TestBed.createComponent(ErpSmartTable);
    fixture.componentRef.setInput('caption', 'دليل العملاء');
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();
    return fixture;
  }

  it('applies local filtering, sorting, and paging without data fetching', () => {
    const fixture = create();
    fixture.componentInstance.filters.set([
      {key: 'city', label: 'المدينة', value: 'القاهرة'},
    ]);
    fixture.componentInstance.sort.set({key: 'name', direction: 'ascending'});
    fixture.componentInstance.pageSize.set(1);
    fixture.detectChanges();

    const firstPage = fixture.nativeElement.querySelector('erp-table tbody tr') as HTMLElement;
    expect(firstPage.textContent).toContain('سارة');
    fixture.componentInstance.page.set(2);
    fixture.detectChanges();
    const secondPage = fixture.nativeElement.querySelector('erp-table tbody tr') as HTMLElement;
    expect(secondPage.textContent).toContain('محمود');
  });

  it('emits revisioned typed query intents while remote data stays consumer-owned', () => {
    const fixture = create();
    fixture.componentRef.setInput('mode', 'remote');
    fixture.componentRef.setInput('totalItems', 120);
    const spy = vi.fn();
    fixture.componentInstance.queryChanged.subscribe(spy);
    fixture.detectChanges();
    const component = fixture.componentInstance as unknown as {
      changePage(page: number): void;
      changeSort(sort: {key: string; direction: 'ascending'}): void;
    };

    component.changePage(3);
    component.changeSort({key: 'name', direction: 'ascending'});

    expect(spy.mock.calls.map(([query]) => query.revision)).toEqual([1, 2]);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({
      revision: 2,
      page: 1,
      sort: {key: 'name', direction: 'ascending'},
    }));
    expect(fixture.nativeElement.querySelectorAll('erp-table tbody tr')).toHaveLength(3);
  });

  it('preserves keyed rich-cell projection and coordinates row selection', () => {
    const fixture = TestBed.createComponent(SmartTableHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-status-badge')).not.toBeNull();
    const smartTable = fixture.nativeElement.querySelector('erp-smart-table');
    const row = fixture.nativeElement.querySelector('erp-table tbody tr') as HTMLElement;
    const selection = row.querySelector('erp-check-box input') as HTMLInputElement;
    selection.checked = true;
    selection.dispatchEvent(new Event('change', {bubbles: true}));
    fixture.detectChanges();
    expect(smartTable.getAttribute('aria-busy')).toBe('false');
    expect(row.getAttribute('aria-selected')).toBe('true');
  });

  it('renders loading, error, and empty states through approved ERP owners', () => {
    const fixture = create();
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-skeleton')).not.toBeNull();

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('error', 'تعذر الاتصال بالخادم');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-alert')).not.toBeNull();

    fixture.componentRef.setInput('error', null);
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-empty-state')).not.toBeNull();
  });

  it('keeps both refresh and export intents reachable through the owned toolbar', () => {
    const fixture = create();
    const refresh = vi.fn();
    const exported = vi.fn();
    fixture.componentInstance.refreshRequested.subscribe(refresh);
    fixture.componentInstance.exportRequested.subscribe(exported);
    fixture.detectChanges();

    const actions = [...fixture.nativeElement.querySelectorAll('erp-table-toolbar erp-button button')] as HTMLButtonElement[];
    actions.find((button) => button.textContent?.includes('تحديث'))?.click();
    actions.find((button) => button.textContent?.includes('تصدير'))?.click();

    expect(refresh).toHaveBeenCalledOnce();
    expect(exported).toHaveBeenCalledOnce();
  });

  it('inherits application theme and direction without local authority', () => {
    const fixture = create();
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
    expect(fixture.nativeElement.hasAttribute('dir')).toBe(false);
  });
});
