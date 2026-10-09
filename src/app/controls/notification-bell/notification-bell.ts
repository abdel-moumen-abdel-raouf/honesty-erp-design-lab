import {
  AfterViewInit,
  booleanAttribute,
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
  viewChildren,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpButton} from '../button/button';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpSearchBox} from '../search-box/search-box';
import {ErpNotificationSummary} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpShellMenuAction} from '../shell-family/internal/shell-menu-action';
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
    ErpSearchBox,
    ErpShellMenuAction,
    ErpStatusBadge,
    ErpText,
    ErpTooltip,
    FormsModule,
  ],
  templateUrl: './notification-bell.html',
  styleUrls: ['./notification-bell.scss', './notification-bell-overlay.scss'],
  host: {'[attr.data-notification-open]': 'open()'},
})
export class ErpNotificationBell implements AfterViewInit, OnDestroy {
  readonly notifications = input<readonly ErpNotificationSummary[]>([]);
  readonly unreadCount = input<number | null>(null);
  readonly label = input('الإشعارات');
  readonly searchLabel = input('البحث في الإشعارات');
  readonly emptyLabel = input('لا توجد إشعارات');
  readonly viewAllLabel = input('عرض كل الإشعارات');
  readonly searchable = input(true, {transform: booleanAttribute});
  readonly query = model('');
  readonly open = model(false);
  readonly notificationActivated = output<ErpNotificationSummary>();
  readonly markAllReadRequested = output<void>();
  readonly viewAllRequested = output<void>();

  protected readonly surfaceId = `erp-notification-surface-${++nextNotificationBellId}`;
  protected readonly effectiveUnreadCount = computed(() =>
    Math.max(
      0,
      this.unreadCount() ??
        this.notifications().filter((notification) => !notification.read).length,
    ),
  );
  protected readonly filteredNotifications = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.notifications().filter(
      (notification) =>
        !query ||
        notification.title.toLocaleLowerCase().includes(query) ||
        (notification.description?.toLocaleLowerCase().includes(query) ?? false),
    );
  });

  private readonly trigger = viewChild('trigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly surface = viewChild.required<ElementRef<HTMLElement>>('surface');
  private readonly actions = viewChildren(ErpShellMenuAction);
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
      crossAxisAlignment: 'end',
      arrowWidth: () =>
        readShellCssLength(surface, '--honesty-notification-bell-arrow-size'),
      arrowSafeInset: () =>
        readShellCssLength(surface, '--honesty-notification-bell-arrow-safe-inset'),
      allowedPlacements: ['bottom', 'top'],
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

  protected viewAll(): void {
    this.viewAllRequested.emit();
    this.controller?.hide(true);
  }

  protected handleKeyboard(event: KeyboardEvent): void {
    const enabled = this.actions().filter((action) => !action.disabled());
    if (!enabled.length) return;
    const current = enabled.findIndex((action) => action.contains(document.activeElement));
    let index = current;
    if (event.key === 'ArrowDown') index = (Math.max(current, -1) + 1) % enabled.length;
    else if (event.key === 'ArrowUp') index = (current <= 0 ? enabled.length : current) - 1;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = enabled.length - 1;
    else return;
    event.preventDefault();
    enabled[index]?.focus();
  }
}
