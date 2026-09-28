import {ErpReviewBox} from '../../review-internals/review-box/review-box';
import {ErpText} from '../../primitives/text/text';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStack, ErpSection, ErpText, ErpReviewBox],
  selector: 'app-layout-grid-specimen',
  templateUrl: './layout-grid.html',
  styleUrls: ['./layout-grid.scss', './layout-grid-part-2.scss', './layout-grid-part-3.scss', './layout-grid-part-4.scss', './layout-grid-part-5.scss', './layout-grid-part-6.scss', './layout-grid-part-7.scss', './layout-grid-part-8.scss'],
})
export class LayoutGrid {}
