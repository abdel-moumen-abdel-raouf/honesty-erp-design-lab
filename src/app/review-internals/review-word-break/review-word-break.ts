import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-word-break',
  templateUrl: './review-word-break.html',
})
export class ErpReviewWordBreak {}
