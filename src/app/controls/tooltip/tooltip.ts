import {
  AfterViewInit,
  AfterViewChecked,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  DoCheck,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {AnchoredOverlayGeometryResult, AnchoredOverlayPhysicalPlacement} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpTooltipActivation, ErpTooltipPlacement, ErpTooltipState, ErpTooltipVariant} from './tooltip-contracts';
import {ErpTooltipContent} from './tooltip-content';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
let nextTooltipId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-tooltip',
  imports: [ErpText],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  host: {
    '[attr.data-tooltip-variant]': 'variant()',
    '[attr.data-tooltip-interactive]': 'interactive()',
    '[attr.data-tooltip-placement]': 'placement()',
    '[attr.data-tooltip-activation]': 'activation()',
    '[attr.data-tooltip-show-arrow]': 'showArrow()',
    '[attr.data-tooltip-state]': 'state()',
    '[attr.data-tooltip-open]': 'open()',
    '[attr.data-tooltip-resolved-placement]': 'resolvedPlacement()',
  },
})
export class ErpTooltip implements AfterViewInit, AfterViewChecked, DoCheck, OnDestroy {
  readonly text = input<string | null>(null);
  readonly variant = input<ErpTooltipVariant>('plain');
  readonly interactive = input(false, {transform: booleanAttribute});
  readonly placement = input<ErpTooltipPlacement>('top');
  readonly activation = input<ErpTooltipActivation>('auto');
  readonly showArrow = input(true, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly open = model(false);

  readonly tooltipId = `honesty-tooltip-${++nextTooltipId}`;
  readonly trimmedText = computed(() => this.text()?.trim() ?? '');
  readonly resolvedPlacement = signal<AnchoredOverlayPhysicalPlacement | null>(null);
  private readonly validationState = signal<ErpTooltipState>('invalid');
  readonly state = computed<ErpTooltipState>(() => {
    if (this.validationState() === 'invalid') return 'invalid';
    return this.disabled() ? 'disabled' : 'ready';
  });

  private readonly triggerWrapper = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private readonly surface = viewChild.required<ElementRef<HTMLElement>>('surface');
  private readonly arrow = viewChild<ElementRef<HTMLElement>>('arrow');
  private readonly richContents = contentChildren(ErpTooltipContent);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private controller: AnchoredOverlayController | null = null;
  private controllerAnchor: HTMLElement | null = null;
  private actualTrigger: HTMLElement | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private touchPoint: {x: number; y: number} | null = null;
  private touchSucceeded = false;
  private suppressClick = false;
  private suppressContextMenu = false;
  private shown = false;
  private closing = false;
  private viewReady = false;
  private originalAttributes = new Map<string, string | null>();
  private semanticMode: 'described' | 'interactive' | null = null;

  constructor() {
    effect(() => {
      this.text(); this.variant(); this.interactive(); this.disabled(); this.richContents();
      if (this.viewReady) this.validateAndSync();
    });
    effect(() => {
      const requested = this.open();
      if (!this.viewReady) return;
      if (requested && !this.shown) this.show();
      if (!requested && (this.shown || this.closing)) this.close(false);
    });
    effect(() => {
      this.placement();
      this.showArrow();
      if (this.viewReady && this.shown) this.controller?.requestPosition();
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.host.nativeElement.addEventListener('click', this.handleCapturedClick, true);
    this.validateAndSync();
    if (this.open()) this.show();
  }

  ngDoCheck(): void {
    if (this.viewReady) this.validateAndSync();
  }

  ngAfterViewChecked(): void {
    if (this.viewReady) this.validateAndSync();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.host.nativeElement.removeEventListener('click', this.handleCapturedClick, true);
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
    document.removeEventListener('keydown', this.handleDocumentKeyDown, true);
    window.removeEventListener('scroll', this.handleTouchScroll, true);
    this.controller?.destroy();
    this.restoreTriggerSemantics();
  }

  handleTriggerPointerEnter(event: PointerEvent): void {
    if (this.state() !== 'ready' || this.activation() !== 'auto' || event.pointerType === 'touch') return;
    this.clearTimer();
    this.timer = setTimeout(() => this.show(), 500);
  }

  handleTriggerPointerLeave(event: PointerEvent): void {
    if (this.activation() !== 'auto' || event.pointerType === 'touch') return;
    this.clearTimer();
    if (!this.shown) return;
    this.scheduleBridgeClose(this.interactive() ? 200 : 100);
  }

  handleSurfacePointerEnter(): void {
    if (this.interactive() && this.activation() === 'auto') this.clearTimer();
  }
  handleSurfacePointerLeave(): void {
    if (this.interactive() && this.activation() === 'auto') this.scheduleBridgeClose(200);
  }

  handleFocusIn(): void {
    if (this.state() === 'ready' && this.activation() === 'auto') { this.clearTimer(); this.show(); }
  }

  handleFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && (this.triggerWrapper().nativeElement.contains(next) || this.surface().nativeElement.contains(next))) return;
    if (this.shown) this.close(false);
  }

  handleClick(event: MouseEvent): void {
    if (this.surface().nativeElement.contains(event.target as Node)) return;
    if (this.suppressClick) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.suppressClick = false;
      this.suppressContextMenu = false;
      return;
    }
    if (this.state() !== 'ready' || this.activation() !== 'press') return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (this.shown) this.close(false);
    else this.show();
  }

  private readonly handleCapturedClick = (event: MouseEvent): void => this.handleClick(event);

  handlePointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'touch') {
      this.suppressClick = false;
      this.suppressContextMenu = false;
      return;
    }

    this.suppressClick = false;
    this.suppressContextMenu = false;
    if (this.state() !== 'ready' || this.activation() !== 'auto') return;

    this.clearTimer();
    this.touchPoint = {x: event.clientX, y: event.clientY};
    this.touchSucceeded = false;
    window.addEventListener('scroll', this.handleTouchScroll, true);
    this.timer = setTimeout(() => {
      if (!this.touchPoint) return;
      const opened = this.show();
      this.touchSucceeded = opened;
      this.suppressClick = opened;
      this.suppressContextMenu = opened;
    }, 700);
  }

  handlePointerMove(event: PointerEvent): void {
    if (!this.touchPoint || event.pointerType !== 'touch') return;
    if (Math.hypot(event.clientX - this.touchPoint.x, event.clientY - this.touchPoint.y) > 8) this.cancelTouch();
  }

  handlePointerUp(event: PointerEvent): void {
    if (event.pointerType !== 'touch' || !this.touchPoint) return;
    const succeeded = this.touchSucceeded;
    this.touchPoint = null;
    this.touchSucceeded = false;
    window.removeEventListener('scroll', this.handleTouchScroll, true);
    this.clearTimer();
    if (succeeded && !this.interactive()) this.timer = setTimeout(() => this.close(false), 1500);
  }

  handlePointerCancel(): void { this.cancelTouch(); }
  handleContextMenu(event: MouseEvent): void {
    if (!this.suppressContextMenu) return;
    event.preventDefault();
    this.suppressContextMenu = false;
  }

  private validateAndSync(): void {
    const candidates = Array.from(this.triggerWrapper().nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE));
    const nextTrigger = candidates.length === 1 ? candidates[0] : null;
    if (nextTrigger !== this.actualTrigger && this.semanticMode !== null) this.restoreTriggerSemantics();
    this.actualTrigger = nextTrigger;
    const contentCount = this.richContents().length;
    const richFocusable = this.surface().nativeElement.querySelectorAll(FOCUSABLE).length;
    const validPlain = this.variant() === 'plain' && !this.interactive() && contentCount === 0 && this.trimmedText().length > 0;
    const validRich = this.variant() === 'rich' && contentCount === 1 && (!this.interactive() ? richFocusable === 0 : this.trimmedText().length > 0);
    this.validationState.set(this.actualTrigger && (validPlain || validRich) ? 'ready' : 'invalid');
    if (!this.shown) {
      if (this.state() === 'ready' && validRich && this.interactive()) this.applyTriggerSemantics(false);
      else if (this.semanticMode === 'interactive') this.restoreTriggerSemantics();
    }
    if (this.state() !== 'ready' && this.open()) this.close(false);
  }

  private show(): boolean {
    this.validateAndSync();
    if (this.state() !== 'ready' || !this.actualTrigger) {
      this.writeOpen(false);
      return false;
    }

    this.clearTimer();

    if (this.shown && !this.closing) {
      this.controller?.requestPosition();
      this.writeOpen(true);
      return true;
    }

    const surface = this.surface().nativeElement;
    if (!this.controller || this.controllerAnchor !== this.actualTrigger) {
      this.controller?.destroy();
      this.controllerAnchor = this.actualTrigger;
      this.controller = new AnchoredOverlayController({
        anchor: this.actualTrigger,
        surface,
        readGeometryInput: () => ({
          preferredPlacement: this.placement(),
          direction: getComputedStyle(this.actualTrigger!).direction === 'rtl' ? 'rtl' : 'ltr',
          anchorGap: this.cssLengthPx('--honesty-tooltip-anchor-gap'),
          viewportInset: this.cssLengthPx('--honesty-tooltip-viewport-inset'),
          showArrow: this.showArrow(),
          arrowWidth: this.cssLengthPx('--honesty-tooltip-arrow-width'),
          arrowHeight: this.cssLengthPx('--honesty-tooltip-arrow-height'),
          arrowSafeInset: this.cssLengthPx('--honesty-tooltip-arrow-safe-inset'),
        }),
        applyGeometry: (result) => this.applyGeometry(result),
      });
    }

    surface.dataset['phase'] = 'measuring';
    if (!this.controller.show()) {
      this.writeOpen(false);
      delete surface.dataset['phase'];
      return false;
    }

    this.applyTriggerSemantics(true);
    this.shown = true;
    this.closing = false;
    this.writeOpen(true);
    requestAnimationFrame(() => {
      if (this.shown) surface.dataset['phase'] = 'open';
    });
    document.addEventListener('pointerdown', this.handleDocumentPointerDown, true);
    document.addEventListener('keydown', this.handleDocumentKeyDown, true);
    return true;
  }

  private close(returnFocus: boolean): void {
    if (!this.shown && !this.closing) { this.writeOpen(false); return; }
    this.clearTimer();
    this.shown = false;
    this.closing = true;
    this.writeOpen(false);
    const surface = this.surface().nativeElement;
    surface.dataset['phase'] = 'closing';
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
    document.removeEventListener('keydown', this.handleDocumentKeyDown, true);
    window.removeEventListener('scroll', this.handleTouchScroll, true);
    if (this.interactive() && this.state() === 'ready') this.applyTriggerSemantics(false);
    else this.restoreTriggerSemantics();
    if (returnFocus) this.actualTrigger?.focus();
    this.timer = setTimeout(() => {
      if (!this.shown) { this.controller?.hide(); this.closing = false; this.resolvedPlacement.set(null); delete surface.dataset['phase']; }
    }, 100);
  }

  private readonly handleDocumentPointerDown = (event: Event): void => {
    const target = event.target as Node;
    if (!this.triggerWrapper().nativeElement.contains(target) && !this.surface().nativeElement.contains(target)) this.close(false);
  };
  private readonly handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return;
    const inSurface = this.surface().nativeElement.contains(event.target as Node);
    event.stopPropagation();
    this.close(inSurface && this.interactive());
  };
  private readonly handleTouchScroll = (): void => { if (this.touchPoint && !this.touchSucceeded) this.cancelTouch(); };

  private scheduleBridgeClose(delay: number): void { this.clearTimer(); this.timer = setTimeout(() => this.close(false), delay); }
  private cancelTouch(): void {
    this.clearTimer();
    this.touchPoint = null;
    this.touchSucceeded = false;
    this.suppressContextMenu = false;
    window.removeEventListener('scroll', this.handleTouchScroll, true);
  }
  private clearTimer(): void { if (this.timer !== null) clearTimeout(this.timer); this.timer = null; }
  private writeOpen(value: boolean): void { this.open.set(value); }

  private cssLengthPx(name: string): number {
    const surfaceStyle = getComputedStyle(this.surface().nativeElement);
    const raw = surfaceStyle.getPropertyValue(name).trim();
    const numeric = Number.parseFloat(raw);
    if (!Number.isFinite(numeric)) return 0;
    if (raw.endsWith('rem')) {
      const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      return numeric * (Number.isFinite(rootSize) ? rootSize : 16);
    }
    if (raw.endsWith('em')) {
      const fontSize = Number.parseFloat(surfaceStyle.fontSize);
      return numeric * (Number.isFinite(fontSize) ? fontSize : 16);
    }
    return numeric;
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    const surface = this.surface().nativeElement;
    surface.style.left = `${result.x}px`;
    surface.style.top = `${result.y}px`;

    const crossAxis = `${result.arrowCrossAxisCenter}px`;
    surface.style.transformOrigin = {
      top: `${crossAxis} 100%`,
      bottom: `${crossAxis} 0%`,
      left: `100% ${crossAxis}`,
      right: `0% ${crossAxis}`,
    }[result.placement];

    this.resolvedPlacement.set(result.placement);
    const arrow = this.arrow()?.nativeElement;
    if (arrow) this.applyArrowGeometry(arrow, result);
  }

  private applyArrowGeometry(arrow: HTMLElement, result: AnchoredOverlayGeometryResult): void {
    arrow.style.left = '';
    arrow.style.right = '';
    arrow.style.top = '';
    arrow.style.bottom = '';

    const horizontal = result.placement === 'top' || result.placement === 'bottom';
    if (horizontal) {
      arrow.style.width = 'var(--honesty-tooltip-arrow-width)';
      arrow.style.height = 'var(--honesty-tooltip-arrow-height)';
      arrow.style.left = `calc(${result.arrowCrossAxisCenter}px - (var(--honesty-tooltip-arrow-width) / 2))`;
    } else {
      arrow.style.width = 'var(--honesty-tooltip-arrow-height)';
      arrow.style.height = 'var(--honesty-tooltip-arrow-width)';
      arrow.style.top = `calc(${result.arrowCrossAxisCenter}px - (var(--honesty-tooltip-arrow-width) / 2))`;
    }

    if (result.placement === 'top') {
      arrow.style.bottom = 'calc(var(--honesty-tooltip-arrow-height) * -1)';
      arrow.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%)';
    } else if (result.placement === 'bottom') {
      arrow.style.top = 'calc(var(--honesty-tooltip-arrow-height) * -1)';
      arrow.style.clipPath = 'polygon(50% 0, 100% 100%, 0 100%)';
    } else if (result.placement === 'left') {
      arrow.style.right = 'calc(var(--honesty-tooltip-arrow-height) * -1)';
      arrow.style.clipPath = 'polygon(0 0, 100% 50%, 0 100%)';
    } else {
      arrow.style.left = 'calc(var(--honesty-tooltip-arrow-height) * -1)';
      arrow.style.clipPath = 'polygon(100% 0, 100% 100%, 0 50%)';
    }
  }

  private applyTriggerSemantics(expanded: boolean): void {
    if (!this.actualTrigger) return;
    const mode = this.interactive() ? 'interactive' : 'described';
    if (this.semanticMode !== null && this.semanticMode !== mode) this.restoreTriggerSemantics();
    const attributes = mode === 'interactive' ? ['aria-haspopup', 'aria-controls', 'aria-expanded'] : ['aria-describedby'];
    if (this.semanticMode === null) {
      for (const name of attributes) this.originalAttributes.set(name, this.actualTrigger.getAttribute(name));
      this.semanticMode = mode;
    }
    if (this.interactive()) {
      this.actualTrigger.setAttribute('aria-haspopup', 'dialog');
      this.actualTrigger.setAttribute('aria-controls', this.tooltipId);
      this.actualTrigger.setAttribute('aria-expanded', String(expanded));
    } else if (expanded) {
      const tokens = new Set((this.actualTrigger.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
      tokens.add(this.tooltipId);
      this.actualTrigger.setAttribute('aria-describedby', [...tokens].join(' '));
    }
  }

  private restoreTriggerSemantics(): void {
    if (!this.actualTrigger) return;
    for (const [name, value] of this.originalAttributes) {
      if (value === null) this.actualTrigger.removeAttribute(name);
      else this.actualTrigger.setAttribute(name, value);
    }
    this.originalAttributes.clear();
    this.semanticMode = null;
  }
}
