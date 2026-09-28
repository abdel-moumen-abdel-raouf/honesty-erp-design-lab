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
  styleUrl: './density.scss',
})
export class Density {}
