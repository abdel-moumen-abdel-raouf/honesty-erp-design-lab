import {TestBed} from '@angular/core/testing';
import {CoreBatch} from './core-batch';

describe('CoreBatch', () => {
  it('renders the nine corrected owners on the grouped review surface', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-section')).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        'erp-select[searchable][groupBy="group"]',
      ),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[multiple][selectAll]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[selectAppearance="filled"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[selectAppearance="ghost"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[sortMode="label"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[label="نتيجة فارغة"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[label="حالة غير صالحة"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.select-parity-matrix erp-select'))
      .toHaveLength(6);
    expect(fixture.nativeElement.querySelectorAll('[data-select-direction-evidence] erp-select'))
      .toHaveLength(2);
    expect(fixture.nativeElement.querySelector('erp-avatar-picker')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-review-core-table erp-table')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-pagination')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-avatar-direction-evidence] erp-avatar',
      ),
    ).toHaveLength(16);
    expect(
      fixture.nativeElement.querySelector(
        '[data-row-activation-evidence]',
      ).textContent,
    ).toContain('لم يتم تفعيل صف');
  });

  it('keeps the routed review template ERP-only authored', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect([...host.children].map((element) => element.tagName)).toEqual(['ERP-CONTAINER']);
    expect(host.querySelector('erp-avatar-picker erp-avatar')).not.toBeNull();
  });
});
