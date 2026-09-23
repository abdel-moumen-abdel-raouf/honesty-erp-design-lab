import {AnchoredOverlayControllerOptions, OverlayRect} from './anchored-overlay-contracts';
import {calculateAnchoredOverlayGeometry} from './anchored-overlay-geometry';

export class AnchoredOverlayController {
  private frame: number | null = null;
  private active = false;
  private resizeObserver: ResizeObserver | null = null;
  private readonly reposition = () => this.requestPosition();

  constructor(private readonly options: AnchoredOverlayControllerOptions) {}

  show(): boolean {
    if (typeof this.options.surface.showPopover !== 'function') return false;
    if (this.active) {
      this.requestPosition();
      return true;
    }
    try {
      this.options.surface.showPopover();
    } catch {
      return false;
    }
    this.active = true;
    this.attach();
    this.requestPosition();
    return true;
  }

  hide(): void {
    this.active = false;
    this.detach();
    if (typeof this.options.surface.hidePopover !== 'function') return;
    try {
      if (this.options.surface.matches(':popover-open')) this.options.surface.hidePopover();
    } catch {
      // Native Popover teardown is best-effort after active state/listeners are cleared.
    }
  }

  destroy(): void { this.hide(); }

  requestPosition(): void {
    if (!this.active || this.frame !== null) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      if (!this.active) return;
      const anchor = this.options.anchor.getBoundingClientRect();
      const surface = this.options.surface.getBoundingClientRect();
      const viewport = this.viewportRect();
      this.options.applyGeometry(calculateAnchoredOverlayGeometry({
        ...this.options.readGeometryInput(), anchor, surfaceWidth: surface.width,
        surfaceHeight: surface.height, viewport,
      }));
    });
  }

  private viewportRect(): OverlayRect {
    const visual = window.visualViewport;
    const left = visual?.offsetLeft ?? 0;
    const top = visual?.offsetTop ?? 0;
    const width = visual?.width ?? window.innerWidth;
    const height = visual?.height ?? window.innerHeight;
    return {left, top, right: left + width, bottom: top + height, width, height};
  }

  private attach(): void {
    window.addEventListener('resize', this.reposition);
    window.addEventListener('scroll', this.reposition, true);
    window.visualViewport?.addEventListener('resize', this.reposition);
    window.visualViewport?.addEventListener('scroll', this.reposition);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.reposition);
      this.resizeObserver.observe(this.options.anchor);
      this.resizeObserver.observe(this.options.surface);
    }
  }

  private detach(): void {
    window.removeEventListener('resize', this.reposition);
    window.removeEventListener('scroll', this.reposition, true);
    window.visualViewport?.removeEventListener('resize', this.reposition);
    window.visualViewport?.removeEventListener('scroll', this.reposition);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
  }
}
