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
} from '@angular/core';
import {ErpAvatar} from '../avatar/avatar';
import {ErpButton} from '../button/button';
import {ErpText} from '../../primitives/text/text';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {
  ErpShellUserSummary,
  ErpUserMenuItem,
} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';
import {ErpUserMenuArrow} from './internal/user-menu-arrow';

let nextUserMenuId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-user-menu',
  imports: [
    ErpAvatar,
    ErpButton,
    ErpDivider,
    ErpStatusBadge,
    ErpText,
    ErpUserMenuArrow,
  ],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  host: {'[attr.data-user-menu-open]': 'open()'},
})
export class ErpUserMenu implements AfterViewInit, OnDestroy {
  readonly user = input.required<ErpShellUserSummary>();
  readonly items = input<readonly ErpUserMenuItem[]>([]);
  readonly label = input('قائمة المستخدم');
  readonly showAvatar = input(true, {transform: booleanAttribute});
  readonly showUserName = input(true, {transform: booleanAttribute});
  readonly showEmail = input(true, {transform: booleanAttribute});
  readonly showPresence = input(true, {transform: booleanAttribute});
  readonly showRoleBadge = input(true, {transform: booleanAttribute});
  readonly showBranchBadge = input(true, {transform: booleanAttribute});
  readonly showTriggerRoleBadge = input(false, {transform: booleanAttribute});
  readonly showTriggerBranchBadge = input(false, {transform: booleanAttribute});
  readonly open = model(false);
  readonly actionActivated = output<ErpUserMenuItem>();

  protected readonly surfaceId = `erp-user-menu-surface-${++nextUserMenuId}`;
  protected readonly triggerAccessibleLabel = computed(
    () => `${this.label()}: ${this.user().displayName}`,
  );
  protected readonly triggerRoleVisible = computed(
    () => this.showRoleBadge() && this.showTriggerRoleBadge() &&
      Boolean(this.user().roleLabel),
  );
  protected readonly triggerBranchVisible = computed(
    () => this.showBranchBadge() && this.showTriggerBranchBadge() &&
      Boolean(this.user().branchLabel),
  );
  protected readonly triggerIdentityVisible = computed(
    () => this.showUserName() ||
      (this.showEmail() && Boolean(this.user().email)) ||
      Boolean(this.user().secondaryText) ||
      this.triggerRoleVisible() ||
      this.triggerBranchVisible(),
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
      // Identity changes can resize both anchor and surface while open. Reading
      // the complete bounded presentation state here reuses the same overlay
      // controller to schedule fresh post-render geometry.
      this.user();
      this.showAvatar();
      this.showUserName();
      this.showEmail();
      this.showPresence();
      this.showRoleBadge();
      this.showBranchBadge();
      this.showTriggerRoleBadge();
      this.showTriggerBranchBadge();

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
        readShellCssLength(surface, '--honesty-user-menu-anchor-gap'),
      viewportInset: () =>
        readShellCssLength(surface, '--honesty-user-menu-viewport-inset'),
      crossAxisAlignment: 'end',
      arrowWidth: () =>
        readShellCssLength(surface, '--honesty-user-menu-arrow-size'),
      arrowSafeInset: () =>
        readShellCssLength(surface, '--honesty-user-menu-arrow-offset'),
      allowedPlacements: ['bottom', 'top'],
      prepareGeometry: ({anchor, viewport}) => {
        const inset = readShellCssLength(
          surface,
          '--honesty-user-menu-viewport-inset',
        );
        const gap = readShellCssLength(
          surface,
          '--honesty-user-menu-anchor-gap',
        );
        const availableAbove = Math.max(
          0,
          anchor.top - viewport.top - inset - gap,
        );
        const availableBelow = Math.max(
          0,
          viewport.bottom - anchor.bottom - inset - gap,
        );
        surface.style.maxBlockSize = `${Math.max(
          availableAbove,
          availableBelow,
        )}px`;
      },
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

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();
    if (this.controller?.show()) {
      this.focusMenuBoundary(event.key === 'ArrowUp');
    }
  }

  protected handleMenuKeydown(event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const actions = this.enabledActions();
    if (actions.length === 0) {
      return;
    }

    event.preventDefault();
    const currentIndex = actions.indexOf(document.activeElement as HTMLButtonElement);
    const targetIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? actions.length - 1
        : event.key === 'ArrowUp'
          ? (currentIndex <= 0 ? actions.length : currentIndex) - 1
          : (currentIndex + 1) % actions.length;
    actions[targetIndex]?.focus();
  }

  protected activate(item: ErpUserMenuItem): void {
    if (item.disabled) {
      return;
    }

    this.actionActivated.emit(item);
    this.controller?.hide(true);
  }

  private focusMenuBoundary(last: boolean): void {
    queueMicrotask(() => {
      const actions = this.enabledActions();
      actions[last ? actions.length - 1 : 0]?.focus();
    });
  }

  private enabledActions(): HTMLButtonElement[] {
    return Array.from(
      this.surface().nativeElement.querySelectorAll<HTMLButtonElement>(
        'button[role="menuitem"]:not(:disabled)',
      ),
    );
  }
}
