import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-choice',
  templateUrl: './review-choice.html',
})
export class ErpReviewChoice {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly disabled = input(false, {transform: booleanAttribute});
}
