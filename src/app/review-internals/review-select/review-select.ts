import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  output,
} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewChoice} from '../review-choice/review-choice';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-select',
  imports: [ErpText],
  templateUrl: './review-select.html',
  styleUrl: './review-select.scss',
})
export class ErpReviewSelect {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly selectionChanged = output<Event>();
  protected readonly choices = contentChildren(ErpReviewChoice);
}
