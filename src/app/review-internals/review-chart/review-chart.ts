import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpReviewChartKind = 'grouped-bar' | 'multi-line' | 'structural';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-chart',
  templateUrl: './review-chart.html',
  styleUrl: './review-chart.scss',
})
export class ErpReviewChart {
  readonly kind = input.required<ErpReviewChartKind>();
}
