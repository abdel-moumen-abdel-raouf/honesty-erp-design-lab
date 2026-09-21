import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  FOUNDATION_DEFERRED_DECISIONS,
  FOUNDATION_OVERALL_STATUS,
  FOUNDATION_OVERVIEW_DOMAINS,
} from './overview.data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-foundation-overview',
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  readonly domains = FOUNDATION_OVERVIEW_DOMAINS;
  readonly overallStatus = FOUNDATION_OVERALL_STATUS;
  readonly deferredDecisions = FOUNDATION_DEFERRED_DECISIONS;
}
