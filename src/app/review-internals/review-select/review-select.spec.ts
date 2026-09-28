import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpReviewChoice} from '../review-choice/review-choice';
import {ErpReviewSelect} from './review-select';

@Component({
  imports: [ErpReviewChoice, ErpReviewSelect],
  template: `
    <erp-review-select
      label="Theme"
      value="dark"
      (selectionChanged)="lastEvent = $event"
    >
      <erp-review-choice value="light" label="Light"></erp-review-choice>
      <erp-review-choice value="dark" label="Dark"></erp-review-choice>
    </erp-review-select>
  `,
})
class ReviewSelectHost {
  lastEvent: Event | null = null;
}

describe('ErpReviewSelect', () => {
  it('governs visible field text through ErpText and exposes native option labels without raw text nodes', async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSelectHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReviewSelectHost);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const governedLabel = root.querySelector('erp-text.review-select__label');
    const select = root.querySelector('select') as HTMLSelectElement | null;
    const options = Array.from(root.querySelectorAll('option'));

    expect(governedLabel?.textContent?.trim()).toBe('Theme');
    expect(select?.value).toBe('dark');
    expect(options.map((option) => option.label)).toEqual(['Light', 'Dark']);
    expect(options.every((option) => option.textContent === '')).toBe(true);

    if (select === null) {
      throw new Error('Expected native review select.');
    }

    select.value = 'light';
    select.dispatchEvent(new Event('change', {bubbles: true}));
    fixture.detectChanges();

    expect(fixture.componentInstance.lastEvent).toBeInstanceOf(Event);
    expect((fixture.componentInstance.lastEvent?.target as HTMLSelectElement).value).toBe(
      'light'
    );
  });
});
