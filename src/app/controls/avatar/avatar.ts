import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';

export type ErpAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ErpAvatarShape = 'circle' | 'rounded';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-avatar',
  imports: [ErpIcon, ErpText],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[attr.data-avatar-size]': 'size()',
    '[attr.data-avatar-shape]': 'shape()',
    '[attr.aria-label]': 'name()',
  },
})
export class ErpAvatar {
  readonly name = input.required<string>();
  readonly src = input<string | null>(null);
  readonly size = input<ErpAvatarSize>('md');
  readonly shape = input<ErpAvatarShape>('circle');
  readonly fallbackIcon = input<ErpIconName | null>(null);

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

  protected failImage(): void {
    this.failedSrc.set(this.src());
  }
}
