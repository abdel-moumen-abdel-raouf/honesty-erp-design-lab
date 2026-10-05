import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {EntityFormBatch} from './entity-form-batch';

describe('Entity Form Batch review', () => {
  it('provides all seven required evidence sections with ERP-only route authoring', () => {
    TestBed.configureTestingModule({providers: [provideRouter([])]});
    const fixture = TestBed.createComponent(EntityFormBatch);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-entity-form-owner]')).toHaveLength(4);
    expect(root.querySelector('[data-integrated-entity-form-specimen]')).not.toBeNull();
    expect(root.querySelector('[data-step-review-evidence]')).not.toBeNull();
    expect(root.querySelector('[data-unsupported-kind-evidence]')).not.toBeNull();
    expect(root.querySelector('erp-standard-entity-form')).not.toBeNull();
  });
});
