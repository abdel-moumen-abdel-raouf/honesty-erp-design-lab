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
import {ErpButton} from '../button/button';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpActionMenuItem} from '../composite-family/composite-contracts';
import {ErpActionMenuContent} from '../composite-family/internal/action-menu-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-split-button',
  imports: [ErpActionMenuContent, ErpButton, ErpIconButton],
  templateUrl: './split-button.html',
  styleUrl: './split-button.scss',
  host: {
    '[attr.data-split-button-disabled]': 'disabled()',
    '[attr.data-split-button-open]': 'menuOpen()',
    '[attr.data-split-button-resolved-placement]': 'resolvedPlacement()',
  },
})
export class ErpSplitButton implements OnDestroy {
  readonly label = input.required<string>();
  readonly items = input.required<readonly ErpActionMenuItem[]>();
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly primaryPressed = output<void>();
  readonly itemSelected = output<string>();

  protected readonly menuOpen = signal(false);
  protected readonly resolvedPlacement =
    signal<AnchoredOverlayPhysicalPlacement | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuTriggerHost = viewChild('menuTrigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly menuSurface =
    viewChild<ElementRef<HTMLElement>>('menuSurface');
  private controller: AnchoredOverlayController | null = null;

  ngOnDestroy(): void {
    this.detachDismissalListeners();
    this.controller?.destroy();
  }

  protected toggleMenu(): void {
    if (this.disabled()) {
      return;
    }

    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }

    this.openMenu();
  }

  protected selectItem(value: string): void {
    this.itemSelected.emit(value);
    this.closeMenu(true);
  }

  private openMenu(): void {
    const trigger = this.menuTriggerButton();
    const surface = this.menuSurface()?.nativeElement;

    if (!trigger || !surface) {
      return;
    }

    this.controller?.destroy();
    this.controller = new AnchoredOverlayController({
      anchor: trigger,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'bottom',
        direction:
          getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr',
        anchorGap: this.cssLengthPx(
          surface,
          '--honesty-split-button-menu-anchor-gap',
        ),
        viewportInset: this.cssLengthPx(
          surface,
          '--honesty-split-button-menu-viewport-inset',
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

    this.menuOpen.set(true);
    this.attachDismissalListeners();
    queueMicrotask(() => {
      surface
        .querySelector<HTMLButtonElement>(
          '[data-action-item] button:not([disabled])',
        )
        ?.focus();
    });
  }

  private closeMenu(returnFocus: boolean): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);
    this.resolvedPlacement.set(null);
    this.controller?.hide();
    this.detachDismissalListeners();

    if (returnFocus) {
      queueMicrotask(() => this.menuTriggerButton()?.focus());
    }
  }

  private readonly handleDocumentPointerDown = (event: Event): void => {
    if (!this.menuOpen()) {
      return;
    }

    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.closeMenu(false);
    }
  };

  private readonly handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || !this.menuOpen()) {
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
    document.addEventListener(
      'keydown',
      this.handleDocumentKeyDown,
      true,
    );
  }

  private detachDismissalListeners(): void {
    document.removeEventListener(
      'pointerdown',
      this.handleDocumentPointerDown,
      true,
    );
    document.removeEventListener(
      'keydown',
      this.handleDocumentKeyDown,
      true,
    );
  }

  private menuTriggerButton(): HTMLButtonElement | null {
    return (
      this.menuTriggerHost()?.nativeElement.querySelector('button') ?? null
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
    const surface = this.menuSurface()?.nativeElement;
    if (!surface) {
      return;
    }

    surface.style.left = `${result.x}px`;
    surface.style.top = `${result.y}px`;
    this.resolvedPlacement.set(result.placement);
  }
}
