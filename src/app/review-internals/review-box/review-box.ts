import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-box',
  templateUrl: './review-box.html',
  styleUrl: './review-box.scss',
})
export class ErpReviewBox {}
