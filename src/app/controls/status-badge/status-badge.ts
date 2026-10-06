import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpStatusBadgeAction} from './internal/status-badge-action';

export type ErpStatusBadgeTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'brand'
  | 'pending'
  | 'archived';

export type ErpStatusBadgeVariant = 'soft' | 'solid' | 'outline' | 'ghost';
export type ErpStatusBadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type ErpStatusBadgeShape = 'square' | 'rounded' | 'pill';
export type ErpStatusBadgeWidthMode = 'content' | 'stretch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Public ERP control selector.
  selector: 'erp-status-badge',
  imports: [ErpIcon, ErpStatusBadgeAction, ErpText],
  templateUrl: './status-badge.html',
  styleUrls: [
    './status-badge.scss',
    './status-badge-tone-feedback.scss',
    './status-badge-tone-brand.scss',
    './status-badge-variants.scss',
    './status-badge-sizes.scss',
    './status-badge-states.scss',
    './status-badge-content.scss',
    './status-badge-motion.scss',
  ],
  host: {
    '[attr.data-status-badge-tone]': 'tone()',
    '[attr.data-status-badge-variant]': 'variant()',
    '[attr.data-status-badge-size]': 'size()',
    '[attr.data-status-badge-shape]': 'shape()',
    '[attr.data-status-badge-width]': 'widthMode()',
    '[attr.data-status-badge-uppercase]': 'uppercase()',
    '[class.status-badge--interactive]': 'interactive()',
    '[class.status-badge--selected]': 'selected()',
    '[class.status-badge--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
  },
})
export class ErpStatusBadge {
  readonly label = input.required<string>();
  readonly tone = input<ErpStatusBadgeTone>('neutral');
  readonly variant = input<ErpStatusBadgeVariant>('soft');
  readonly size = input<ErpStatusBadgeSize>('md');
  readonly shape = input<ErpStatusBadgeShape>('rounded');
  readonly widthMode = input<ErpStatusBadgeWidthMode>('content');
  readonly icon = input<ErpIconName | null>(null);
  readonly image = input<string | null>(null);
  readonly count = input<number | null>(null);
  readonly showDot = input(false, {transform: booleanAttribute});
  readonly pulse = input(false, {transform: booleanAttribute});
  readonly uppercase = input(false, {transform: booleanAttribute});
  readonly interactive = input(false, {transform: booleanAttribute});
  readonly selected = input(false, {transform: booleanAttribute});
  readonly removable = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});

  readonly badgeClick = output<MouseEvent>();
  readonly selectedChange = output<boolean>();
  readonly remove = output<void>();

  protected activate(event: MouseEvent): void {
    if (!this.interactive() || this.disabled()) {
      return;
    }

    this.badgeClick.emit(event);
    this.selectedChange.emit(!this.selected());
  }

  protected removeBadge(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.removable() || this.disabled()) {
      return;
    }

    this.remove.emit();
  }
}
