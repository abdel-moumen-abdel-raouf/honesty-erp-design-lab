import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';

export type ErpAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ErpAvatarShape = 'circle' | 'rounded' | 'square';
export type ErpAvatarPresence = 'online' | 'away' | 'busy' | 'offline';
export type ErpAvatarPresencePosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type ErpAvatarPresenceMotion = 'none' | 'pulse' | 'ping' | 'breathe';
export type ErpAvatarHoverMotion = 'none' | 'scale' | 'lift';
export type ErpAvatarCursor = 'default' | 'pointer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-avatar',
  imports: [ErpIcon, ErpText],
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss', './avatar-presence.scss', './avatar-motion.scss'],
  host: {
    '[attr.data-avatar-size]': 'size()',
    '[attr.data-avatar-shape]': 'shape()',
    '[attr.data-avatar-presence]': 'presence()',
    '[attr.data-avatar-presence-position]': 'presencePosition()',
    '[attr.data-avatar-presence-motion]': 'presenceMotion()',
    '[attr.data-avatar-hover-motion]': 'hoverMotion()',
    '[attr.data-avatar-cursor]': 'cursor()',
    '[attr.aria-label]': 'accessibleLabel()',
  },
})
export class ErpAvatar {
  readonly name = input.required<string>();
  readonly src = input<string | null>(null);
  readonly size = input<ErpAvatarSize>('md');
  readonly shape = input<ErpAvatarShape>('circle');
  readonly fallbackIcon = input<ErpIconName | null>(null);
  readonly presence = input<ErpAvatarPresence | null>(null);
  readonly presencePosition = input<ErpAvatarPresencePosition>('bottom-right');
  readonly presenceMotion = input<ErpAvatarPresenceMotion>('none');
  readonly hoverMotion = input<ErpAvatarHoverMotion>('none');
  readonly cursor = input<ErpAvatarCursor>('default');

  private readonly failedSrc = signal<string | null>(null);

  protected readonly imageVisible = computed(() => {
    const src = this.src();
    return src !== null && src.length > 0 && this.failedSrc() !== src;
  });
  protected readonly initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/u)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toLocaleUpperCase(),
  );
  protected readonly accessibleLabel = computed(() => {
    const name = this.name().trim() || 'مستخدم';
    const presence = this.presence();
    if (!presence) return name;
    const label = {online: 'متصل', away: 'بعيد', busy: 'مشغول', offline: 'غير متصل'}[presence];
    return `${name} — ${label}`;
  });

  protected failImage(): void {
    this.failedSrc.set(this.src());
  }
}
