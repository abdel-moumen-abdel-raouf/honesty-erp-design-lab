import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStack, ErpSection, ErpText, ErpReviewBox],
  selector: 'app-feedback-colors-specimen',
  templateUrl: './feedback-colors.html',
  styleUrls: ['./feedback-colors.scss', './feedback-colors-part-2.scss', './feedback-colors-part-3.scss', './feedback-colors-part-4.scss', './feedback-colors-part-5.scss', './feedback-colors-part-6.scss'],
})
export class FeedbackColors {}
