import {ErpReviewBox} from '../../../review-internals/review-box/review-box';
import {ErpText} from '../../../primitives/text/text';
import {ErpSection} from '../../../primitives/section/section';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpContainer} from '../../../primitives/container/container';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpStack, ErpSection, ErpText, ErpReviewBox],
  selector: 'app-status-hues-specimen',
  templateUrl: './status-hues.html',
  styleUrls: ['./status-hues.scss', './status-hues-part-2.scss', './status-hues-part-3.scss'],
})
export class StatusHues {
  readonly steps = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ] as const;
}
