import {ErpButton} from '../../controls/button/button';
import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpContainer} from '../../primitives/container/container';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpStack, ErpSection, ErpText, ErpReviewBox, ErpButton],
  selector: 'app-borders-radius-specimen',
  templateUrl: './borders-radius.html',
  styleUrls: ['./borders-radius.scss', './borders-radius-part-2.scss', './borders-radius-part-3.scss', './borders-radius-part-4.scss', './borders-radius-part-5.scss', './borders-radius-part-6.scss', './borders-radius-part-7.scss'],
})
export class BordersRadius {
  readonly referenceWidthKeys = ['0', '1', '2'] as const;
  readonly referenceStyleKeys = ['solid', 'dashed'] as const;
  readonly referenceRadiusKeys = ['0', '2', '4', '6', '8', '12', 'full'] as const;
}
