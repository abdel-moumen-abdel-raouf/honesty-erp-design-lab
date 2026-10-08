import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpReviewChoice} from '../review-choice/review-choice';
import {ErpReviewSelect} from './review-select';

@Component({
  imports: [ErpReviewChoice, ErpReviewSelect],
  template: `
    <erp-review-select
      label="Density"
      value="compact"
      (selectionChanged)="lastValue = $event"
    >
      <erp-review-choice value="comfortable" label="Comfortable"></erp-review-choice>
      <erp-review-choice value="compact" label="Compact"></erp-review-choice>
    </erp-review-select>
  `,
})
class ReviewSelectHost {
  lastValue: string | null = null;
}

describe('ErpReviewSelect', () => {
  it('delegates selection rendering and interaction to ErpSelect', async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSelectHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReviewSelectHost);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const select = root.querySelector('erp-select');
    const component = fixture.debugElement.children[0].componentInstance as ErpReviewSelect;

    expect(select).not.toBeNull();
    expect(root.querySelector('select')).toBeNull();
    expect(root.querySelector('option')).toBeNull();

    component['updateValue']('comfortable');
    fixture.detectChanges();
    expect(fixture.componentInstance.lastValue).toBe('comfortable');
  });
});
