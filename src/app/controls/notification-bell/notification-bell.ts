import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import {ErpButton} from '../button/button';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpNotificationSummary} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTooltip} from '../tooltip/tooltip';

let nextNotificationBellId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-notification-bell',
  imports: [
    ErpButton,
    ErpIcon,
    ErpIconButton,
    ErpStatusBadge,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.scss',
  host: {'[attr.data-notification-open]': 'open()'},
})
export class ErpNotificationBell implements AfterViewInit, OnDestroy {
  readonly notifications = input<readonly ErpNotificationSummary[]>([]);
  readonly unreadCount = input<number | null>(null);
  readonly label = input('الإشعارات');
  readonly open = model(false);
  readonly notificationActivated = output<ErpNotificationSummary>();
  readonly markAllReadRequested = output<void>();

  protected readonly surfaceId = `erp-notification-surface-${++nextNotificationBellId}`;
  protected readonly effectiveUnreadCount = computed(() =>
    Math.max(
      0,
      this.unreadCount() ??
        this.notifications().filter((notification) => !notification.read).length,
    ),
  );

  private readonly trigger = viewChild('trigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly surface = viewChild.required<ElementRef<HTMLElement>>('surface');
  private controller: ShellAnchoredSurfaceController | null = null;
  private viewReady = false;

  constructor() {
    effect(() => {
      const requested = this.open();

      if (!this.viewReady || !this.controller) {
        return;
      }

      if (requested) {
        this.controller.show();
      } else {
        this.controller.hide(false);
      }
    });
  }

  ngAfterViewInit(): void {
    const anchor = this.trigger()?.nativeElement as HTMLElement | undefined;
    if (!anchor) {
      return;
    }
    const focusTarget = anchor.querySelector<HTMLElement>('button') ?? anchor;
    const surface = this.surface().nativeElement;

    this.controller = new ShellAnchoredSurfaceController({
      anchor,
      focusTarget,
      surface,
      anchorGap: () =>
        readShellCssLength(surface, '--honesty-notification-bell-anchor-gap'),
      viewportInset: () =>
        readShellCssLength(surface, '--honesty-notification-bell-viewport-inset'),
      onOpenChange: (open) => this.open.set(open),
    });
    this.viewReady = true;

    if (this.open()) {
      this.controller.show();
    }
  }

  ngOnDestroy(): void {
    this.controller?.destroy();
  }

  protected toggle(): void {
    this.controller?.toggle();
  }

  protected activate(notification: ErpNotificationSummary): void {
    if (notification.disabled) {
      return;
    }

    this.notificationActivated.emit(notification);
    this.controller?.hide(true);
  }

  protected markAllRead(): void {
    this.markAllReadRequested.emit();
  }
}
