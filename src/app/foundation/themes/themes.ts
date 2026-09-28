import {ErpReviewBreak} from '../../review-internals/review-break/review-break';
import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpContainer} from '../../primitives/container/container';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpStack, ErpSection, ErpText, ErpReviewBox, ErpReviewBreak],
  selector: 'app-themes-specimen',
  templateUrl: './themes.html',
  styleUrl: './themes.scss',
})
export class Themes {}
