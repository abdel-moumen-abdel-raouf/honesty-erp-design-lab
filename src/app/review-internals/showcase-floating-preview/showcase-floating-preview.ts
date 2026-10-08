import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
} from '@angular/core';
import {ErpInline} from '../../primitives/inline/inline';

export type ErpReviewPreviewDirection = 'ltr' | 'rtl';

export interface ErpReviewFloatingPosition {
  readonly x: number;
  readonly y: number;
}

export function resolveReviewFloatingPosition(
  canvasWidth: number,
  canvasHeight: number,
  targetWidth: number,
  targetHeight: number,
  inlinePercent: number,
  blockPercent: number,
  direction: ErpReviewPreviewDirection,
): ErpReviewFloatingPosition {
  const inlineRatio = Math.min(100, Math.max(0, inlinePercent)) / 100;
  const blockRatio = Math.min(100, Math.max(0, blockPercent)) / 100;
  const availableWidth = Math.max(0, canvasWidth - targetWidth);
  const availableHeight = Math.max(0, canvasHeight - targetHeight);

  return {
    x: availableWidth * (direction === 'rtl' ? 1 - inlineRatio : inlineRatio),
    y: availableHeight * blockRatio,
  };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-showcase-floating-preview',
  imports: [ErpInline],
  templateUrl: './showcase-floating-preview.html',
  styleUrl: './showcase-floating-preview.scss',
  host: {
    'data-showcase-floating-preview': '',
    '[attr.dir]': 'direction()',
  },
})
export class ErpReviewShowcaseFloatingPreview implements AfterViewInit, OnDestroy {
  readonly inlinePosition = input(50);
  readonly blockPosition = input(50);
  readonly direction = input<ErpReviewPreviewDirection>('rtl');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private resizeObserver: ResizeObserver | null = null;
  private directionObserver: MutationObserver | null = null;
  private initialized = false;
  private updateQueued = false;

  constructor() {
    effect(() => {
      this.inlinePosition();
      this.blockPosition();
      this.direction();
      this.queuePositionUpdate();
    });
  }

  ngAfterViewInit(): void {
    this.initialized = true;
    const host = this.host.nativeElement;
    const positioner = host.querySelector<HTMLElement>('[data-showcase-floating-positioner]');
    if (!positioner) return;

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.queuePositionUpdate());
      this.resizeObserver.observe(host);
      this.resizeObserver.observe(positioner);
    }

    if (typeof MutationObserver !== 'undefined') {
      this.directionObserver = new MutationObserver(() => this.queuePositionUpdate());
      this.directionObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir'],
        subtree: true,
      });
    }

    this.queuePositionUpdate();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.directionObserver?.disconnect();
  }

  private queuePositionUpdate(): void {
    if (!this.initialized || this.updateQueued) return;
    this.updateQueued = true;
    queueMicrotask(() => {
      this.updateQueued = false;
      this.updatePosition();
    });
  }

  private updatePosition(): void {
    const host = this.host.nativeElement;
    const positioner = host.querySelector<HTMLElement>('[data-showcase-floating-positioner]');
    if (!positioner) return;
    const direction = this.direction();
    const resolved = resolveReviewFloatingPosition(
      host.clientWidth,
      host.clientHeight,
      positioner.offsetWidth,
      positioner.offsetHeight,
      this.inlinePosition(),
      this.blockPosition(),
      direction,
    );

    positioner.style.transform = `translate3d(${resolved.x}px, ${resolved.y}px, 0)`;
    host.dataset['resolvedDirection'] = direction;
    host.dataset['resolvedX'] = String(resolved.x);
    host.dataset['resolvedY'] = String(resolved.y);
  }
}
