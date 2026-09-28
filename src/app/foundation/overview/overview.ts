import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';
import {
  FOUNDATION_CURRENT_REVIEW_FAMILIES,
  FOUNDATION_NEXT_LAYER_DECISIONS,
  FOUNDATION_OVERALL_STATUS,
  FOUNDATION_OVERVIEW_DOMAINS,
  FOUNDATION_V1_CONSTRAINTS,
} from './overview.data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpContainer, ErpGrid, ErpInline, ErpSection, ErpStack, ErpText],
  selector: 'app-foundation-overview',
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  readonly domains = FOUNDATION_OVERVIEW_DOMAINS;
  readonly reviewFamilies = FOUNDATION_CURRENT_REVIEW_FAMILIES;
  readonly overallStatus = FOUNDATION_OVERALL_STATUS;
  readonly nextLayerDecisions = FOUNDATION_NEXT_LAYER_DECISIONS;
  readonly v1Constraints = FOUNDATION_V1_CONSTRAINTS;
}
