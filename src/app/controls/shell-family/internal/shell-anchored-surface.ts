import {AnchoredOverlayGeometryResult} from '../../../shared/anchored-overlay/anchored-overlay-contracts';
import {AnchoredOverlayController} from '../../../shared/anchored-overlay/anchored-overlay-controller';

export interface ShellAnchoredSurfaceOptions {
  readonly anchor: HTMLElement;
  readonly focusTarget: HTMLElement;
  readonly surface: HTMLElement;
  readonly anchorGap: () => number;
  readonly viewportInset: () => number;
  readonly onOpenChange: (open: boolean) => void;
  readonly crossAxisAlignment?: 'center' | 'start' | 'end';
}

export class ShellAnchoredSurfaceController {
  private readonly overlay: AnchoredOverlayController;
  private active = false;

  constructor(private readonly options: ShellAnchoredSurfaceOptions) {
    this.overlay = new AnchoredOverlayController({
      anchor: options.anchor,
      surface: options.surface,
      readGeometryInput: () => ({
        preferredPlacement: 'bottom',
        direction: this.direction(),
        anchorGap: options.anchorGap(),
        viewportInset: options.viewportInset(),
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
        crossAxisAlignment: options.crossAxisAlignment ?? 'center',
      }),
      applyGeometry: (result) => this.applyGeometry(result),
    });
  }

  show(): boolean {
    if (this.active) {
      this.overlay.requestPosition();
      return true;
    }

    if (!this.overlay.show()) {
      return false;
    }

    this.active = true;
    this.options.onOpenChange(true);
    document.addEventListener('pointerdown', this.handlePointerDown, true);
    document.addEventListener('keydown', this.handleKeydown, true);
    return true;
  }

  hide(returnFocus = false): void {
    if (!this.active) {
      this.options.onOpenChange(false);
      return;
    }

    this.active = false;
    document.removeEventListener('pointerdown', this.handlePointerDown, true);
    document.removeEventListener('keydown', this.handleKeydown, true);
    this.overlay.hide();
    this.options.onOpenChange(false);

    if (returnFocus) {
      this.options.focusTarget.focus();
    }
  }

  toggle(): boolean {
    if (this.active) {
      this.hide(true);
      return false;
    }

    return this.show();
  }

  destroy(): void {
    document.removeEventListener('pointerdown', this.handlePointerDown, true);
    document.removeEventListener('keydown', this.handleKeydown, true);
    this.overlay.destroy();
    this.active = false;
  }

  private readonly handlePointerDown = (event: Event): void => {
    const target = event.target;

    if (
      target instanceof Node &&
      !this.options.anchor.contains(target) &&
      !this.options.surface.contains(target)
    ) {
      this.hide(false);
    }
  };

  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();
    this.hide(true);
  };

  private direction(): 'ltr' | 'rtl' {
    return getComputedStyle(this.options.anchor).direction === 'rtl'
      ? 'rtl'
      : 'ltr';
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    this.options.surface.style.left = `${result.x}px`;
    this.options.surface.style.top = `${result.y}px`;
    this.options.surface.style.transformOrigin =
      result.placement === 'top' ? 'center bottom' : 'center top';
    this.options.surface.dataset['overlayPlacement'] = result.placement;
  }
}

export function readShellCssLength(
  element: HTMLElement,
  name: string,
): number {
  const style = getComputedStyle(element);
  const raw = style.getPropertyValue(name).trim();
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
