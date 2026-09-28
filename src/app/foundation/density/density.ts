import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStack, ErpSection, ErpText, ErpReviewBox],
  selector: 'app-density-specimen',
  templateUrl: './density.html',
  styleUrls: ['./density.scss', './density-part-2.scss', './density-part-3.scss', './density-part-4.scss', './density-part-5.scss', './density-part-6.scss'],
})
export class Density {}
