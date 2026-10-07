import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpAvatarAction} from './internal/avatar-action';
import {ErpAvatarFrame} from './internal/avatar-frame';
import {ErpAvatarPresenceIndicator} from './internal/avatar-presence-indicator';

export type ErpAvatarSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';
export type ErpAvatarShape = 'circle' | 'rounded' | 'square';
export type ErpAvatarTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'slate';
export type ErpAvatarPresence =
  | 'online'
  | 'away'
  | 'busy'
  | 'offline'
  | 'info'
  | 'brand'
  | 'pending'
  | 'vacation';
export type ErpAvatarPresencePosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type ErpAvatarPresenceMotion =
  | 'none'
  | 'pulse'
  | 'ping'
  | 'bounce'
  | 'blink'
  | 'breathe';
export type ErpAvatarHoverMotion = 'none' | 'scale' | 'lift';
export type ErpAvatarCursor = 'default' | 'pointer';

const PRESENCE_LABELS: Readonly<Record<ErpAvatarPresence, string>> = {
  online: 'متصل',
  away: 'بعيد',
  busy: 'مشغول',
  offline: 'غير متصل',
  info: 'معلومات',
  brand: 'حالة أساسية',
  pending: 'قيد الانتظار',
  vacation: 'في إجازة',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-avatar',
  imports: [ErpAvatarAction, ErpAvatarFrame, ErpAvatarPresenceIndicator, ErpIcon, ErpText],
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss', './avatar-sizes.scss'],
  host: {
    '[attr.data-avatar-size]': 'size()',
    '[attr.data-avatar-shape]': 'shape()',
    '[attr.data-avatar-tone]': 'tone()',
    '[attr.data-avatar-ring]': 'ring()',
    '[attr.data-avatar-loading]': 'loading()',
    '[attr.data-avatar-interactive]': 'interactive()',
    '[attr.data-avatar-presence]': 'presence()',
    '[attr.data-avatar-presence-position]': 'presencePosition()',
    '[attr.data-avatar-presence-motion]': 'presenceMotion()',
    '[attr.data-avatar-hover-motion]': 'hoverMotion()',
    '[attr.data-avatar-cursor]': 'cursor()',
    '[attr.role]': "interactive() ? null : 'img'",
    '[attr.aria-label]': 'interactive() ? null : accessibleLabel()',
  },
})
export class ErpAvatar {
  readonly name = input.required<string>();
  readonly src = input<string | null>(null);
  readonly initials = input<string | null>(null);
  readonly alt = input('');
  readonly size = input<ErpAvatarSize>('md');
  readonly shape = input<ErpAvatarShape>('circle');
  readonly tone = input<ErpAvatarTone>('neutral');
  readonly fallbackIcon = input<ErpIconName | null>(null);
  readonly ring = input(false, {transform: booleanAttribute});
  readonly loading = input(false, {transform: booleanAttribute});
  readonly interactive = input(false, {transform: booleanAttribute});
  readonly presence = input<ErpAvatarPresence | null>(null);
  readonly presencePosition = input<ErpAvatarPresencePosition>('bottom-right');
  readonly presenceMotion = input<ErpAvatarPresenceMotion>('none');
  readonly hoverMotion = input<ErpAvatarHoverMotion>('none');
  readonly cursor = input<ErpAvatarCursor>('default');
  readonly avatarClick = output<MouseEvent>();

  private readonly failedSrc = signal<string | null>(null);

  protected readonly imageVisible = computed(() => {
    const src = this.src()?.trim() ?? '';
    return !this.loading() && src.length > 0 && this.failedSrc() !== src;
  });

  protected readonly effectiveInitials = computed(() => {
    const explicit = this.initials()?.trim();
    if (explicit) return explicit.slice(0, 2).toLocaleUpperCase();

    return this.name()
      .trim()
      .split(/\s+/u)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toLocaleUpperCase();
  });

  protected readonly effectiveIcon = computed<ErpIconName | null>(() => {
    if (this.loading()) return null;
    return this.fallbackIcon() ?? (this.effectiveInitials() ? null : 'user');
  });

  protected readonly accessibleLabel = computed(() => {
    const identity = this.alt().trim() || this.name().trim() || 'مستخدم';
    const presence = this.presence();
    return presence ? `${identity} — ${PRESENCE_LABELS[presence]}` : identity;
  });

  protected failImage(): void {
    this.failedSrc.set(this.src()?.trim() ?? null);
  }

  protected activate(event: MouseEvent): void {
    this.avatarClick.emit(event);
  }
}
