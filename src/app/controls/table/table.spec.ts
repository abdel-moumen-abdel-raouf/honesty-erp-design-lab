import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTable, ErpTableCell, ErpTableColumn, ErpTableRow} from './table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStatusBadge, ErpTable, ErpTableCell],
  template: `
    <erp-table
      caption="الحسابات"
      [columns]="columns"
      [rows]="rows"
      selectable
      [selectedKeys]="selectedKeys"
      (rowActivated)="activated = $event"
    >
      <ng-template erpTableCell="status" let-row let-value="value" let-column="column" let-rowIndex="rowIndex">
        <erp-status-badge
          [label]="value?.toString() ?? 'غير معروف'"
          [tone]="value === 'نشط' ? 'success' : 'warning'"
          [attr.data-cell-row-id]="row.id"
          [attr.data-cell-column]="column.key"
          [attr.data-cell-index]="rowIndex"
        />
      </ng-template>
    </erp-table>
  `,
})
class TableHost {
  readonly columns: readonly ErpTableColumn[] = [
    {key: 'name', header: 'الحساب'},
    {key: 'status', header: 'الحالة', align: 'center'},
  ];
  readonly rows: readonly ErpTableRow[] = [{id: '1', name: 'النقدية', status: 'نشط'}];
  readonly selectedKeys = ['1'];
  activated: ErpTableRow | null = null;
}

describe('ErpTable', () => {
  it('owns semantic table markup and the default text/empty renderers', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'كشف الحسابات');
    fixture.componentRef.setInput('columns', [{key: 'name', header: 'الحساب'}]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('table')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('caption').textContent).toContain('كشف الحسابات');
    expect(fixture.nativeElement.textContent).toContain('لا توجد بيانات متاحة');

    fixture.componentRef.setInput('rows', [{id: '1', name: 'النقدية'}]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody td erp-text').textContent).toContain('النقدية');
  });

  it('renders a keyed rich-cell template with row/value/column/index context', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('erp-status-badge');
    expect(badge.textContent).toContain('نشط');
    expect(badge.getAttribute('data-cell-row-id')).toBe('1');
    expect(badge.getAttribute('data-cell-column')).toBe('status');
    expect(badge.getAttribute('data-cell-index')).toBe('0');
    expect(fixture.nativeElement.querySelector('tbody td erp-text').textContent).toContain('النقدية');
  });

  it('treats selectedKeys as controlled presentation and rowActivated as intent', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLElement;
    expect(row.getAttribute('aria-selected')).toBe('true');
    row.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activated).toEqual({id: '1', name: 'النقدية', status: 'نشط'});
    expect(row.getAttribute('aria-selected')).toBe('true');
  });

  it('does not emit row activation when selectable is false', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'الحسابات');
    fixture.componentRef.setInput('columns', [{key: 'name', header: 'الحساب'}]);
    fixture.componentRef.setInput('rows', [{id: '1', name: 'النقدية'}]);
    const spy = vi.fn();
    fixture.componentInstance.rowActivated.subscribe(spy);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('tbody tr') as HTMLElement).click();
    expect(spy).not.toHaveBeenCalled();
  });
});
