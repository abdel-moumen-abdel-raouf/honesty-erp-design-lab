import {TestBed} from '@angular/core/testing';
import {ErpReviewCoreTable} from './review-core-table';

describe('ErpReviewCoreTable', () => {
  it('composes the complete exact-reference experience and its state evidence', () => {
    const fixture = TestBed.createComponent(ErpReviewCoreTable);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const tableEvidence = root.querySelector(
      '[data-table-reference-evidence="exact"]',
    ) as HTMLElement;
    const exact = tableEvidence.querySelector(
      '[data-table-reference-experience="complete"]',
    ) as HTMLElement;

    expect(tableEvidence.getAttribute('dir')).toBe('rtl');
    expect(tableEvidence.querySelectorAll('[data-table-specimen]')).toHaveLength(7);
    expect(exact.querySelector('erp-table-toolbar')).not.toBeNull();
    expect(exact.querySelector('erp-search-box')).not.toBeNull();
    expect(exact.querySelector('erp-column-chooser')).not.toBeNull();
    expect(exact.querySelector('erp-table')).not.toBeNull();
    expect(exact.querySelector('erp-pagination')).not.toBeNull();
    expect(
      tableEvidence.querySelector('[data-table-specimen="fixed-height"] erp-table[data-table-fixed="true"]'),
    ).not.toBeNull();
    expect(
      tableEvidence.querySelector('[data-table-specimen="compact"] erp-table[data-table-density="compact"]'),
    ).not.toBeNull();
    expect(
      tableEvidence.querySelector('[data-table-specimen="vertical"] erp-table[data-table-layout="vertical"]'),
    ).not.toBeNull();
    expect(tableEvidence.textContent).toContain('دليل الموظفين');
    expect(tableEvidence.textContent).not.toMatch(/Full-featured|Fixed-height|Compact density|Clickable rows|Vertical layout|Header content/);
    expect(
      tableEvidence.querySelectorAll('[data-table-specimen="full-featured"] erp-table erp-avatar'),
    ).toHaveLength(10);
    expect(
      tableEvidence.querySelectorAll('[data-table-specimen="full-featured"] erp-table erp-check-box').length,
    ).toBeGreaterThan(0);
    expect(
      tableEvidence.querySelectorAll('[data-table-specimen="full-featured"] erp-table erp-sort-header').length,
    ).toBeGreaterThan(0);
    expect(
      tableEvidence.querySelector('[data-table-specimen="empty"] erp-table erp-icon'),
    ).not.toBeNull();
    expect(
      root.querySelector('[data-table-direction-evidence="ltr"]')?.getAttribute('dir'),
    ).toBe('ltr');
    expect(root.querySelector('[data-row-activation-evidence]')?.textContent).toContain(
      'لم يتم تفعيل صف',
    );
  });

  it('filters rows and keeps column visibility consumer-controlled', () => {
    const fixture = TestBed.createComponent(ErpReviewCoreTable);
    fixture.detectChanges();
    const exact = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-table-reference-experience="complete"]',
    ) as HTMLElement;

    fixture.componentInstance.referenceQuery.set('طارق');
    fixture.detectChanges();
    expect(exact.querySelectorAll('erp-table tbody tr')).toHaveLength(1);
    expect(exact.textContent).toContain('طارق عزيز');

    fixture.componentInstance.visibleReferenceKeys.set(['employee', 'actions']);
    fixture.detectChanges();
    expect(exact.querySelectorAll('erp-table thead th')).toHaveLength(3);
  });

  it('applies controlled sort intent to an immutable next row ordering', () => {
    const fixture = TestBed.createComponent(ErpReviewCoreTable);
    const component = fixture.componentInstance;
    const sourceRows = component.referenceEmployeeRows;

    component.tableSort.set({key: 'salary', direction: 'ascending'});
    const ascendingRows = component.filteredReferenceRows();
    component.tableSort.set({key: 'salary', direction: 'descending'});
    const descendingRows = component.filteredReferenceRows();

    expect(ascendingRows).not.toBe(sourceRows);
    expect(ascendingRows.map((row) => Number(row['salary']))).toEqual(
      [...ascendingRows].map((row) => Number(row['salary'])).sort((left, right) => left - right),
    );
    expect(descendingRows.map((row) => Number(row['salary']))).toEqual(
      [...descendingRows].map((row) => Number(row['salary'])).sort((left, right) => right - left),
    );
    expect(component.referenceEmployeeRows).toBe(sourceRows);
  });
});
