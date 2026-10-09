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
  viewChildren,
} from '@angular/core';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {
  ErpApplicationMenuGroup,
  ErpApplicationMenuItem,
} from '../shell-family/shell-contracts';
import {
  readShellCssLength,
  ShellAnchoredSurfaceController,
} from '../shell-family/internal/shell-anchored-surface';
import {ErpShellMenuAction} from '../shell-family/internal/shell-menu-action';
import {ErpStatusBadge} from '../status-badge/status-badge';
import {ErpTooltip} from '../tooltip/tooltip';

let nextApplicationsMenuId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-applications-menu',
  imports: [
    ErpIcon,
    ErpIconButton,
    ErpShellMenuAction,
    ErpStatusBadge,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './applications-menu.html',
  styleUrls: ['./applications-menu.scss', './applications-menu-overlay.scss'],
  host: {'[attr.data-applications-menu-open]': 'open()'},
})
export class ErpApplicationsMenu implements AfterViewInit, OnDestroy {
  readonly groups = input.required<readonly ErpApplicationMenuGroup[]>();
  readonly label = input('التطبيقات');
  readonly open = model(false);
  readonly applicationActivated = output<ErpApplicationMenuItem>();

  protected readonly surfaceId = `erp-applications-menu-${++nextApplicationsMenuId}`;
  protected readonly availableItems = computed(() =>
    this.groups().flatMap((group) => group.items),
  );

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
      anchorGap: () => readShellCssLength(surface, '--honesty-applications-menu-anchor-gap'),
      viewportInset: () => readShellCssLength(surface, '--honesty-applications-menu-viewport-inset'),
      crossAxisAlignment: 'end',
      arrowWidth: () => readShellCssLength(surface, '--honesty-applications-menu-arrow-size'),
      arrowSafeInset: () => readShellCssLength(surface, '--honesty-applications-menu-arrow-safe-inset'),
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

  protected activate(item: ErpApplicationMenuItem): void {
    if (item.disabled) return;
    this.applicationActivated.emit(item);
    this.controller?.hide(true);
  }

  protected handleKeyboard(event: KeyboardEvent): void {
    const enabled = this.actions().filter((action) => !action.disabled());
    if (!enabled.length) return;
    const active = document.activeElement;
    let index = enabled.findIndex((action) => action.contains(active));
    const isRtl = getComputedStyle(this.surface().nativeElement).direction === 'rtl';
    const horizontal = event.key === 'ArrowRight' ? (isRtl ? -1 : 1) : event.key === 'ArrowLeft' ? (isRtl ? 1 : -1) : 0;
    const vertical = event.key === 'ArrowDown' ? 3 : event.key === 'ArrowUp' ? -3 : 0;
    if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = enabled.length - 1;
    else if (horizontal || vertical) index = (Math.max(index, 0) + horizontal + vertical + enabled.length) % enabled.length;
    else return;
    event.preventDefault();
    enabled[index]?.focus();
  }
}
