import {TestBed} from '@angular/core/testing';

import {ErpReviewRadioReference} from './review-radio-reference';

describe('ErpReviewRadioReference', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpReviewRadioReference]});
  });

  it('renders the complete RadioBox family evidence without a showcase target', () => {
    const fixture = TestBed.createComponent(ErpReviewRadioReference);
    fixture.componentRef.setInput('focus', 'radio-box');
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[data-radio-box-standalone-panel]')).not.toBeNull();
    expect(root.querySelector('[data-radio-box-text-panel]')).not.toBeNull();
    expect(root.querySelector('[data-radio-box-variants-panel]')).not.toBeNull();
    expect(root.querySelector('[data-radio-box-size-panel]')).not.toBeNull();
    expect(root.querySelector('[data-radio-box-state-matrix-panel]')).not.toBeNull();
    expect(root.querySelector('[data-radio-box-required-evidence]')).not.toBeNull();
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(0);
  });

  it('renders ordinary and tile single-selection group evidence', () => {
    const fixture = TestBed.createComponent(ErpReviewRadioReference);
    fixture.componentRef.setInput('focus', 'radio-group');
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[data-radio-group-evidence]')).not.toBeNull();
    expect(root.querySelector('[data-radio-tile-group-evidence]')).not.toBeNull();
    expect(root.querySelectorAll('input[type="radio"]')).toHaveLength(6);

    const tileInputs = root.querySelectorAll<HTMLInputElement>(
      '[data-radio-tile-group-evidence] input',
    );
    tileInputs[1].click();
    fixture.detectChanges();
    expect(tileInputs[1].checked).toBe(true);
    expect([...tileInputs].filter((input) => input.checked)).toHaveLength(1);
  });
});
