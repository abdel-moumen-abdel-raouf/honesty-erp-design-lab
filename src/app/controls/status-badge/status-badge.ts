import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';

export type ErpStatusBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type ErpStatusBadgeSize = 'sm' | 'md' | 'lg';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-status-badge',
  imports: [ErpIcon, ErpText],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
  host: {'[attr.data-status-badge-tone]': 'tone()', '[attr.data-status-badge-size]': 'size()'},
})
export class ErpStatusBadge {
  readonly label = input.required<string>();
  readonly tone = input<ErpStatusBadgeTone>('neutral');
  readonly size = input<ErpStatusBadgeSize>('md');
  readonly icon = input<ErpIconName | null>(null);
}
