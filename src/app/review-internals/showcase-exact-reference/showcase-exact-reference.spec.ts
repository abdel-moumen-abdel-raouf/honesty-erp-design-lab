import {TestBed} from '@angular/core/testing';

import {ErpReviewShowcaseExactReference} from './showcase-exact-reference';

describe('ErpReviewShowcaseExactReference', () => {
  it('keeps the exact reference on demand and does not add a showcase target', async () => {
    await TestBed.configureTestingModule({
      imports: [ErpReviewShowcaseExactReference],
    }).compileComponents();

    const fixture = TestBed.createComponent(ErpReviewShowcaseExactReference);
    fixture.componentRef.setInput('focus', 'select');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-review-exact-core-showcase')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-showcase-target]')).toBeNull();

    fixture.componentInstance.toggle();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-review-exact-core-showcase')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-showcase-target]')).toBeNull();
  }, 20000);
});
