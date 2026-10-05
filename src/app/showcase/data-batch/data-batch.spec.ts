import {TestBed} from '@angular/core/testing';
import {DataBatch} from './data-batch';

describe('DataBatch', () => {
  it('renders exactly the eight accelerated data-table review sections', () => {
    const fixture = TestBed.createComponent(DataBatch);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('erp-section')).toHaveLength(8);
    expect(fixture.nativeElement.querySelector('erp-sort-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-column-chooser')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-filter-bar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-filter-drawer')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-table-toolbar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-bulk-action-bar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-view-switcher')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-smart-table')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('[data-state-evidence]')).toHaveLength(3);
  });

  it('keeps the routed review surface ERP-only authored', () => {
    const fixture = TestBed.createComponent(DataBatch);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-data-batch > div')).toBeNull();
  });
});
