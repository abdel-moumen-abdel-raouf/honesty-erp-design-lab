import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {
  ErpTable,
  ErpTableCell,
  ErpTableColumn,
  ErpTableFooter,
  ErpTableRow,
} from './table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStatusBadge, ErpTable, ErpTableCell, ErpTableFooter],
  template: `
    <erp-table
      caption="الحسابات"
      [columns]="columns"
      [rows]="rows"
      [selectable]="selectable"
      [rowActivatable]="rowActivatable"
      [selectedKeys]="selectedKeys"
      [sort]="sort"
      [footerValues]="footerValues"
      (rowActivated)="activated = $event"
      (selectedKeysChange)="selection = $event"
      (sortChange)="sortIntent = $event"
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
      <ng-template erpTableFooter="name" let-value>
        <erp-status-badge [label]="value?.toString() ?? '—'" tone="info" />
      </ng-template>
    </erp-table>
  `,
})
class TableHost {
  readonly columns: readonly ErpTableColumn[] = [
    {key: 'name', header: 'الحساب', sortable: true, resizable: true},
    {key: 'status', header: 'الحالة', align: 'center'},
  ];
  readonly rows: readonly ErpTableRow[] = [{id: '1', name: 'النقدية', status: 'نشط'}];
  readonly selectedKeys = ['1'];
  readonly sort = {key: 'name', direction: 'ascending'} as const;
  readonly footerValues = {name: 'الإجمالي'} as const;
  selectable = true;
  rowActivatable = false;
  activated: ErpTableRow | null = null;
  selection: readonly string[] = this.selectedKeys;
  sortIntent: unknown = null;
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

  it('exposes the bounded full-reference frame presentation and reference empty anatomy', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'الموظفون');
    fixture.componentRef.setInput('columns', [{key: 'name', header: 'الاسم'}]);
    fixture.componentRef.setInput('presentation', 'reference-experience');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const viewport = host.querySelector('erp-table-viewport') as HTMLElement;
    expect(host.getAttribute('data-table-presentation')).toBe('reference-experience');
    expect(viewport.getAttribute('data-presentation')).toBe('reference-experience');
    expect(host.querySelector('tbody .empty erp-icon')).not.toBeNull();
    expect(host.querySelector('tbody .empty erp-text')?.textContent).toContain('لا توجد بيانات');
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

  it('treats selectedKeys as controlled presentation without implying row activation', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLElement;
    expect(row.getAttribute('aria-selected')).toBe('true');
    row.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activated).toBeNull();
    expect(row.getAttribute('aria-selected')).toBe('true');
  });

  it.each([
    {selectable: false, rowActivatable: false, emits: false},
    {selectable: true, rowActivatable: false, emits: false},
    {selectable: false, rowActivatable: true, emits: true},
    {selectable: true, rowActivatable: true, emits: true},
  ])(
    'keeps selection and activation independent: selectable=$selectable rowActivatable=$rowActivatable',
    ({selectable, rowActivatable, emits}) => {
      const fixture = TestBed.createComponent(TableHost);
      fixture.componentInstance.selectable = selectable;
      fixture.componentInstance.rowActivatable = rowActivatable;
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('tbody tr') as HTMLElement;

      row.click();

      expect(fixture.componentInstance.activated !== null).toBe(emits);
      expect(row.getAttribute('tabindex')).toBe(rowActivatable ? '0' : null);
    },
  );

  it('emits checkbox selection separately from row activation and supports select all', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('erp-check-box input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = false;
    inputs[1].dispatchEvent(new Event('change', {bubbles: true}));
    fixture.detectChanges();

    expect(fixture.componentInstance.selection).toEqual([]);
    expect(fixture.componentInstance.activated).toBeNull();

    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change', {bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.selection).toEqual(['1']);
  });

  it('uses ErpSortHeader with both arrow icons and emits typed sort intent', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('erp-sort-header');
    expect(header.querySelectorAll('erp-icon')).toHaveLength(2);
    (header.querySelector('button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.sortIntent).toEqual({key: 'name', direction: 'descending'});
  });

  it('owns keyboard column resize and rich footer projection', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const spy = vi.fn();
    fixture.debugElement.children[0].componentInstance.columnWidthChange.subscribe(spy);
    const handle = fixture.nativeElement.querySelector('erp-table-resize-handle button');
    handle.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({key: 'name', width: 168});
    expect(fixture.nativeElement.querySelector('tfoot erp-status-badge').textContent).toContain('الإجمالي');
  });

  it('constrains keyboard column resizing to the configured min/max widths', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'أعمدة قابلة للتحجيم');
    fixture.componentRef.setInput('columns', [
      {
        key: 'name',
        header: 'الحساب',
        resizable: true,
        initialWidth: 160,
        minWidth: 155,
        maxWidth: 164,
      },
    ] satisfies readonly ErpTableColumn[]);
    fixture.detectChanges();
    const handle = fixture.nativeElement.querySelector(
      'erp-table-resize-handle button',
    ) as HTMLButtonElement;

    handle.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.columnWidths()).toEqual({name: 164});

    handle.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
    handle.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.columnWidths()).toEqual({name: 155});
  });

  it('exposes striped and optional row-hover motion as independent controlled states', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'حالات الصفوف');
    fixture.componentRef.setInput('columns', [{key: 'name', header: 'الحساب'}]);
    fixture.componentRef.setInput('striped', true);
    fixture.componentRef.setInput('hoverMotion', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-table-striped')).toBe('true');
    expect(fixture.nativeElement.getAttribute('data-table-hover-motion')).toBe('false');
  });

  it('maps the literal reference density, layout, fixed-height, and header-icon contracts', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'حسابات مرجعية');
    fixture.componentRef.setInput('columns', [
      {key: 'name', header: 'الحساب', headerIcon: 'wallet', sortable: true},
    ] satisfies readonly ErpTableColumn[]);
    fixture.componentRef.setInput('rows', [{id: '1', name: 'النقدية'}]);
    fixture.componentRef.setInput('density', 'comfortable');
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.componentRef.setInput('fixedHeight', 380);
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-table-density')).toBe('comfortable');
    expect(host.getAttribute('data-table-layout')).toBe('vertical');
    expect(host.getAttribute('data-table-fixed')).toBe('true');
    expect(host.style.getPropertyValue('--honesty-table-fixed-height')).toBe('380px');
    expect(host.querySelector('th > .content > erp-icon')).not.toBeNull();
    expect(host.querySelector('td[data-label="الحساب"]')).not.toBeNull();
    expect(
      host.querySelector('erp-check-box')?.getAttribute('data-check-box-presentation'),
    ).toBe('table-reference');
    expect(
      host.querySelector('erp-sort-header')?.getAttribute('data-sort-presentation'),
    ).toBe('table-reference');
  });

  it('keeps compact as a compatibility alias while density owns the new vocabulary', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'جدول مضغوط');
    fixture.componentRef.setInput('columns', [{key: 'name', header: 'الحساب'}]);
    fixture.componentRef.setInput('density', 'comfortable');
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-table-density')).toBe('compact');
  });

  it('supports controlled visible columns, physical alignment, and digit conversion', () => {
    const fixture = TestBed.createComponent(ErpTable);
    fixture.componentRef.setInput('caption', 'الأرصدة');
    fixture.componentRef.setInput('columns', [
      {key: 'code', header: 'الكود', cellAlign: 'left', digitSet: 'arabic-indic'},
      {key: 'hidden', header: 'مخفي'},
    ] satisfies readonly ErpTableColumn[]);
    fixture.componentRef.setInput('visibleColumnKeys', ['code']);
    fixture.componentRef.setInput('rows', [{id: '1', code: '1204', hidden: 'لا يظهر'}]);
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('tbody td');
    expect(cell.getAttribute('data-align')).toBe('left');
    expect(cell.getAttribute('data-digit-set')).toBe('arabic-indic');
    expect(cell.querySelector(':scope > .content')).not.toBeNull();
    expect(cell.textContent).toContain('١٢٠٤');
    expect(fixture.nativeElement.textContent).not.toContain('لا يظهر');
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
