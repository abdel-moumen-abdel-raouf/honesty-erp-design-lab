import {TestBed} from '@angular/core/testing';
import {CoreBatch} from './core-batch';

describe('CoreBatch', () => {
  it('renders the nine corrected owners on the grouped review surface', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-section')).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-avatar-picker')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-review-core-table erp-table')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-pagination')).not.toBeNull();
  });

  it('keeps the routed review template ERP-only authored', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect([...host.children].map((element) => element.tagName)).toEqual(['ERP-CONTAINER']);
    expect(host.querySelector('erp-avatar-picker erp-avatar')).not.toBeNull();
  });
});
