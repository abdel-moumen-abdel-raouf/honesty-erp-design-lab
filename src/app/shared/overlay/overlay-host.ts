import {DOCUMENT, NgComponentOutlet} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {ErpOverlayManager} from './overlay-manager';
import {ErpOverlayPhase} from './overlay-contracts';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface BackgroundState {
  readonly element: HTMLElement;
  readonly inert: boolean;
  readonly inertAttribute: boolean;
  readonly ariaHidden: string | null;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-overlay-host',
  imports: [NgComponentOutlet],
  templateUrl: './overlay-host.html',
  styleUrls: [
    './overlay-host-tokens.scss',
    './overlay-host.scss',
    './overlay-host-lifecycle.scss',
    './overlay-host-facets.scss',
    './overlay-host-motion.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.data-overlay-count]': 'manager.entries().length',
  },
})
export class ErpOverlayHost {
  readonly manager = inject(ErpOverlayManager);

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private backgroundState: BackgroundState[] = [];
  private bodyOverflow: string | null = null;
  private lastFocusedId: string | null = null;
  private readonly reducedMotionCompletions = new Set<string>();

  constructor() {
    const onKeydown = (event: KeyboardEvent) => this.handleKeydown(event);
    this.document.addEventListener('keydown', onKeydown);
    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('keydown', onKeydown);
      this.restoreDocumentState();
    });

    effect(() => {
      const entries = this.manager.entries();
      const top = entries.at(-1) ?? null;
      const blocking = entries.some((entry) => entry.ref.config.blocking);

      this.syncDocumentState(blocking);

      if (top?.ref.id !== this.lastFocusedId && top?.phase !== 'leaving') {
        this.lastFocusedId = top?.ref.id ?? null;

        if (top) {
          queueMicrotask(() => this.focusInitial(top.ref.id));
        }
      }

      this.scheduleReducedMotionCompletion(entries);
    });
  }

  handleBackdropPointerDown(event: PointerEvent, id: string): void {
    if (event.target === event.currentTarget) {
      this.manager.dismissFromBackdrop(id);
    }
  }

  handleAnimationEnd(event: AnimationEvent, id: string): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    const phase: ErpOverlayPhase | null =
      event.animationName === 'overlay-backdrop-enter'
        ? 'entering'
        : event.animationName === 'overlay-backdrop-exit'
          ? 'leaving'
          : null;

    if (phase !== null) {
      this.manager.completeTransition(id, phase);
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    const top = this.manager.entries().at(-1);

    if (!top) {
      return;
    }

    if (event.key === 'Escape') {
      if (top.ref.config.dismissOnEscape) {
        event.preventDefault();
        this.manager.dismissTopFromEscape();
      }
      return;
    }

    if (event.key !== 'Tab' || !top.ref.config.trapFocus) {
      return;
    }

    const surface = this.findSurface(top.ref.id);

    if (!surface) {
      return;
    }

    const focusable = [
      ...surface.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ].filter((element) => element.getAttribute('aria-hidden') !== 'true');

    if (focusable.length === 0) {
      event.preventDefault();
      surface.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable.at(-1) as HTMLElement;

    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusInitial(id: string): void {
    if (!this.manager.isTop(id)) {
      return;
    }

    const surface = this.findSurface(id);
    const entry = this.manager.entries().at(-1);

    if (!surface || !entry || entry.phase === 'leaving') {
      return;
    }

    const configured = entry.ref.config.initialFocus
      ? surface.querySelector<HTMLElement>(entry.ref.config.initialFocus)
      : null;
    const target =
      configured ??
      surface.querySelector<HTMLElement>('[autofocus]') ??
      surface.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
      surface;

    target.focus();
  }

  private findSurface(id: string): HTMLElement | null {
    return (
      [...this.host.nativeElement.querySelectorAll<HTMLElement>('[data-overlay-id]')]
        .find((surface) => surface.dataset['overlayId'] === id) ?? null
    );
  }

  private scheduleReducedMotionCompletion(
    entries: ReturnType<ErpOverlayManager['entries']>,
  ): void {
    if (
      typeof window.matchMedia !== 'function' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    for (const entry of entries) {
      if (entry.phase === 'open') {
        continue;
      }

      const key = `${entry.ref.id}:${entry.phase}`;

      if (this.reducedMotionCompletions.has(key)) {
        continue;
      }

      this.reducedMotionCompletions.add(key);
      queueMicrotask(() => {
        this.reducedMotionCompletions.delete(key);
        this.manager.completeTransition(entry.ref.id, entry.phase);
      });
    }
  }

  private syncDocumentState(blocking: boolean): void {
    if (!blocking) {
      this.restoreDocumentState();
      return;
    }

    if (this.bodyOverflow === null) {
      this.bodyOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';
    }

    if (this.backgroundState.length > 0) {
      return;
    }

    const parent = this.host.nativeElement.parentElement;

    if (!parent) {
      return;
    }

    this.backgroundState = [...parent.children]
      .filter((element): element is HTMLElement =>
        element instanceof HTMLElement && element !== this.host.nativeElement,
      )
      .map((element) => ({
        element,
        inert: Boolean(element.inert),
        inertAttribute: element.hasAttribute('inert'),
        ariaHidden: element.getAttribute('aria-hidden'),
      }));

    for (const state of this.backgroundState) {
      state.element.inert = true;
      state.element.setAttribute('inert', '');
      state.element.setAttribute('aria-hidden', 'true');
    }
  }

  private restoreDocumentState(): void {
    if (this.bodyOverflow !== null) {
      this.document.body.style.overflow = this.bodyOverflow;
      this.bodyOverflow = null;
    }

    for (const state of this.backgroundState) {
      state.element.inert = state.inert;

      if (state.inertAttribute) {
        state.element.setAttribute('inert', '');
      } else {
        state.element.removeAttribute('inert');
      }

      if (state.ariaHidden === null) {
        state.element.removeAttribute('aria-hidden');
      } else {
        state.element.setAttribute('aria-hidden', state.ariaHidden);
      }
    }

    this.backgroundState = [];
  }
}
