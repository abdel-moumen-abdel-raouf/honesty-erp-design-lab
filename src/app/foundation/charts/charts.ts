import {ErpReviewChart} from '../../review-internals/review-chart/review-chart';
import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpContainer} from '../../primitives/container/container';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpStack, ErpSection, ErpText, ErpReviewBox, ErpReviewChart],
  selector: 'app-charts-specimen',
  templateUrl: './charts.html',
  styleUrls: ['./charts.scss', './charts-part-2.scss', './charts-part-3.scss', './charts-part-4.scss', './charts-part-5.scss', './charts-part-6.scss'],
})
export class Charts {
  readonly themes = [
    {id: 'light', label: 'السمة الفاتحة'},
    {id: 'dark', label: 'السمة الداكنة'},
  ] as const;
}
