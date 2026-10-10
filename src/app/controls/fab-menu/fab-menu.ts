import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {
  AnchoredOverlayGeometryResult,
  AnchoredOverlayPhysicalPlacement,
} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpExtendedFab} from '../extended-fab/extended-fab';
import {ErpFab} from '../fab/fab';
import {ErpTooltip} from '../tooltip/tooltip';
import {
  ErpActionMenuItem,
  ErpFabMenuPlacement,
} from '../composite-family/composite-contracts';

let nextFabMenuId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-fab-menu',
  imports: [ErpExtendedFab, ErpFab, ErpTooltip],
  templateUrl: './fab-menu.html',
  styleUrl: './fab-menu.scss',
  host: {
    '[attr.data-fab-menu-open]': 'open()',
    '[attr.data-fab-menu-placement]': 'placement()',
    '[attr.data-fab-menu-resolved-placement]': 'resolvedPlacement()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ErpFabMenu implements OnDestroy {
  readonly menuId = `erp-fab-menu-${++nextFabMenuId}`;
  readonly label = input.required<string>();
  readonly icon = input<ErpIconName>('add');
  readonly items = input.required<readonly ErpActionMenuItem[]>();
  readonly placement = input<ErpFabMenuPlacement>('block-start');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly itemSelected = output<string>();
  readonly open = signal(false);
  protected readonly resolvedPlacement =
    signal<AnchoredOverlayPhysicalPlacement | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly triggerHost = viewChild('trigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly actionsSurface =
    viewChild<ElementRef<HTMLElement>>('actionsSurface');
  private controller: AnchoredOverlayController | null = null;
  private focusFrame = 0;

  ngOnDestroy(): void {
    cancelAnimationFrame(this.focusFrame);
    this.detachDismissalListeners();
    this.controller?.destroy();
  }

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.closeMenu(true);
      return;
    }

    this.openMenu();
  }

  protected select(item: ErpActionMenuItem): void {
    if (item.disabled) {
      return;
    }

    this.itemSelected.emit(item.value);
    this.closeMenu(true);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      event.stopPropagation();
      this.closeMenu(true);
      return;
    }

    if (!this.open() || !['ArrowDown', 'ArrowUp'].includes(event.key)) {
      return;
    }

    const buttons = this.actionButtons();
    if (buttons.length === 0) {
      return;
    }

    event.preventDefault();
    const current = Math.max(
      0,
      buttons.indexOf(document.activeElement as HTMLButtonElement),
    );
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    buttons[(current + delta + buttons.length) % buttons.length].focus();
  }

  protected handleSurfaceToggle(event: Event): void {
    const newState = (event as ToggleEvent).newState;
    if (newState !== 'closed' || !this.open()) {
      return;
    }

    this.open.set(false);
    this.resolvedPlacement.set(null);
    cancelAnimationFrame(this.focusFrame);
    this.detachDismissalListeners();
    queueMicrotask(() => this.triggerButton()?.focus());
  }

  private openMenu(): void {
    const trigger = this.triggerButton();
    const surface = this.actionsSurface()?.nativeElement;

    if (!trigger || !surface) {
      return;
    }

    this.controller?.destroy();
    this.controller = new AnchoredOverlayController({
      anchor: trigger,
      surface,
      readGeometryInput: () => ({
        preferredPlacement:
          this.placement() === 'block-start' ? 'top' : 'bottom',
        direction:
          getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr',
        anchorGap: this.cssLengthPx(
          surface,
          '--honesty-fab-menu-anchor-gap',
        ),
        viewportInset: this.cssLengthPx(
          surface,
          '--honesty-fab-menu-viewport-inset',
        ),
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
      }),
      applyGeometry: (result) => this.applyGeometry(result),
    });

    if (!this.controller.show()) {
      return;
    }

    this.open.set(true);
    this.attachDismissalListeners();
    this.actionButtons()[0]?.focus({preventScroll: true});
    cancelAnimationFrame(this.focusFrame);
    this.focusFrame = requestAnimationFrame(() => {
      if (this.open()) {
        this.actionButtons()[0]?.focus({preventScroll: true});
      }
    });
  }

  private closeMenu(returnFocus: boolean): void {
    if (!this.open()) {
      return;
    }

    this.open.set(false);
    this.resolvedPlacement.set(null);
    cancelAnimationFrame(this.focusFrame);
    this.controller?.hide();
    this.detachDismissalListeners();

    if (returnFocus) {
      queueMicrotask(() => this.triggerButton()?.focus());
    }
  }

  private readonly handleDocumentPointerDown = (event: Event): void => {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.closeMenu(false);
    }
  };

  private readonly handleDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || !this.open()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.closeMenu(true);
  };

  private attachDismissalListeners(): void {
    document.addEventListener(
      'pointerdown',
      this.handleDocumentPointerDown,
      true,
    );
    document.addEventListener('keydown', this.handleDocumentKeydown, true);
  }

  private detachDismissalListeners(): void {
    document.removeEventListener(
      'pointerdown',
      this.handleDocumentPointerDown,
      true,
    );
    document.removeEventListener('keydown', this.handleDocumentKeydown, true);
  }

  private actionButtons(): HTMLButtonElement[] {
    return [
      ...this.host.nativeElement.querySelectorAll<HTMLButtonElement>(
        '[data-fab-menu-action] button:not([disabled])',
      ),
    ];
  }

  private triggerButton(): HTMLButtonElement | null {
    return (
      this.triggerHost()?.nativeElement.querySelector('button') ?? null
    );
  }

  private cssLengthPx(surface: HTMLElement, name: string): number {
    const raw = getComputedStyle(surface).getPropertyValue(name).trim();
    const numeric = Number.parseFloat(raw);

    if (!Number.isFinite(numeric)) {
      return 0;
    }

    if (raw.endsWith('rem')) {
      const rootSize = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      return numeric * (Number.isFinite(rootSize) ? rootSize : 16);
    }

    return numeric;
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    const surface = this.actionsSurface()?.nativeElement;
    if (!surface) {
      return;
    }

    surface.style.left = `${result.x}px`;
    surface.style.top = `${result.y}px`;
    this.resolvedPlacement.set(result.placement);
  }
}
