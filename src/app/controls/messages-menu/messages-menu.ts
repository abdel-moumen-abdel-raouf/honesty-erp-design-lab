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
import {ErpAvatar} from '../avatar/avatar';
import {ErpButton} from '../button/button';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpMessageSummary} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';
import {ErpShellMenuAction} from '../shell-family/internal/shell-menu-action';
import {ErpSearchBox} from '../search-box/search-box';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpText} from '../../primitives/text/text';
import {ErpTooltip} from '../tooltip/tooltip';

let nextMessagesMenuId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-messages-menu',
  imports: [
    ErpAvatar,
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
  templateUrl: './messages-menu.html',
  styleUrls: ['./messages-menu.scss', './messages-menu-overlay.scss'],
  host: {'[attr.data-messages-menu-open]': 'open()'},
})
export class ErpMessagesMenu implements AfterViewInit, OnDestroy {
  readonly messages = input<readonly ErpMessageSummary[]>([]);
  readonly unreadCount = input<number | null>(null);
  readonly label = input('الرسائل');
  readonly searchLabel = input('البحث في الرسائل');
  readonly emptyLabel = input('لا توجد رسائل');
  readonly viewAllLabel = input('عرض كل الرسائل');
  readonly searchable = input(true, {transform: booleanAttribute});
  readonly query = model('');
  readonly open = model(false);
  readonly messageActivated = output<ErpMessageSummary>();
  readonly viewAllRequested = output<void>();

  protected readonly surfaceId = `erp-messages-menu-${++nextMessagesMenuId}`;
  protected readonly effectiveUnreadCount = computed(() =>
    Math.max(
      0,
      this.unreadCount() ?? this.messages().filter((message) => !message.read).length,
    ),
  );
  protected readonly filteredMessages = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.messages().filter(
      (message) =>
        !query ||
        message.senderName.toLocaleLowerCase().includes(query) ||
        message.preview.toLocaleLowerCase().includes(query),
    );
  });

  private readonly trigger = viewChild('trigger', {read: ElementRef<HTMLElement>});
  private readonly surface = viewChild.required<ElementRef<HTMLElement>>('surface');
  private readonly actions = viewChildren(ErpShellMenuAction);
  private controller: ShellAnchoredSurfaceController | null = null;
  private viewReady = false;

  constructor() {
    effect(() => {
      const requested = this.open();
      if (!this.viewReady || !this.controller) return;
      if (requested) this.controller.show();
      else this.controller.hide(false);
    });
  }

  ngAfterViewInit(): void {
    const anchor = this.trigger()?.nativeElement as HTMLElement | undefined;
    if (!anchor) return;
    const surface = this.surface().nativeElement;
    const focusTarget = anchor.querySelector<HTMLElement>('button') ?? anchor;
    this.controller = new ShellAnchoredSurfaceController({
      anchor,
      focusTarget,
      surface,
      anchorGap: () => readShellCssLength(surface, '--honesty-messages-menu-anchor-gap'),
      viewportInset: () => readShellCssLength(surface, '--honesty-messages-menu-viewport-inset'),
      crossAxisAlignment: 'end',
      arrowWidth: () => readShellCssLength(surface, '--honesty-messages-menu-arrow-size'),
      arrowSafeInset: () => readShellCssLength(surface, '--honesty-messages-menu-arrow-safe-inset'),
      allowedPlacements: ['bottom', 'top'],
      onOpenChange: (open) => this.open.set(open),
    });
    this.viewReady = true;
    if (this.open()) this.controller.show();
  }

  ngOnDestroy(): void {
    this.controller?.destroy();
  }

  protected toggle(): void {
    this.controller?.toggle();
  }

  protected activate(message: ErpMessageSummary): void {
    if (message.disabled) return;
    this.messageActivated.emit(message);
    this.controller?.hide(true);
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
