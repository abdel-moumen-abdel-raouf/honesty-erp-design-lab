import {
  DOCUMENT,
} from '@angular/common';
import {
  Injectable,
  Injector,
  Type,
  inject,
  signal,
} from '@angular/core';
import {
  ErpOverlayAnimation,
  ErpOverlayConfig,
  ErpOverlayEntry,
  ErpOverlayOpenConfig,
  ErpOverlayPhase,
} from './overlay-contracts';
import {ErpOverlayRef} from './overlay-ref';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from './overlay-tokens';

let nextOverlayId = 0;

function defaultAnimations(
  kind: ErpOverlayConfig['kind'],
  position: ErpOverlayConfig['position'],
): readonly [ErpOverlayAnimation, ErpOverlayAnimation] {
  if (kind !== 'drawer') {
    return ['fade-scale', 'fade-scale'];
  }

  if (position === 'start') {
    return ['slide-start', 'slide-start'];
  }

  if (position === 'end') {
    return ['slide-end', 'slide-end'];
  }

  if (position === 'bottom') {
    return ['slide-up', 'slide-down'];
  }

  return ['fade-scale', 'fade-scale'];
}

@Injectable({providedIn: 'root'})
export class ErpOverlayManager {
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly stackState = signal<readonly ErpOverlayEntry[]>([]);

  readonly entries = this.stackState.asReadonly();

  open<TComponent, TData = undefined, TResult = unknown>(
    component: Type<TComponent>,
    options: ErpOverlayOpenConfig<TData>,
  ): ErpOverlayRef<TResult> {
    const label = options.label.trim();

    if (label.length === 0) {
      throw new TypeError('ErpOverlay requires a non-empty accessible label.');
    }

    const kind = options.kind ?? 'modal';
    const position = options.position ?? 'center';
    const [defaultEnterAnimation, defaultExitAnimation] = defaultAnimations(
      kind,
      position,
    );

    const config = Object.freeze<ErpOverlayConfig<TData>>({
      kind,
      position,
      size: options.size ?? 'md',
      label,
      dismissOnEscape: options.dismissOnEscape ?? true,
      dismissOnBackdrop: options.dismissOnBackdrop ?? true,
      blur: options.blur ?? 'medium',
      backdropTone: options.backdropTone ?? 'default',
      enterAnimation: options.enterAnimation ?? defaultEnterAnimation,
      exitAnimation: options.exitAnimation ?? defaultExitAnimation,
      restoreFocus: options.restoreFocus ?? true,
      trapFocus: options.trapFocus ?? true,
      blocking: options.blocking ?? true,
      initialFocus: options.initialFocus ?? null,
      data: options.data as TData,
    });
    const id = `honesty-overlay-${++nextOverlayId}`;
    const origin =
      this.document.activeElement instanceof HTMLElement
        ? this.document.activeElement
        : null;
    const ref = new ErpOverlayRef<TResult>(id, config, () =>
      this.beginClose(id, config.exitAnimation),
    );

    const childInjector = Injector.create({
      parent: this.injector,
      providers: [
        {provide: ERP_OVERLAY_REF, useValue: ref},
        {provide: ERP_OVERLAY_DATA, useValue: config.data},
      ],
    });
    const entry: ErpOverlayEntry = {
      component,
      injector: childInjector,
      ref: ref as ErpOverlayRef<unknown>,
      origin,
      phase: 'entering',
      animation: config.enterAnimation,
    };

    this.stackState.update((entries) => [...entries, entry]);
    return ref;
  }

  isTop(id: string): boolean {
    return this.stackState().at(-1)?.ref.id === id;
  }

  dismissFromBackdrop(id: string): void {
    const top = this.stackState().at(-1);

    if (
      top?.ref.id === id &&
      top.ref.config.dismissOnBackdrop
    ) {
      top.ref.dismiss('backdrop');
    }
  }

  dismissTopFromEscape(): void {
    const top = this.stackState().at(-1);

    if (top?.ref.config.dismissOnEscape) {
      top.ref.dismiss('escape');
    }
  }

  completeTransition(id: string, phase: ErpOverlayPhase): void {
    const entry = this.stackState().find((candidate) => candidate.ref.id === id);

    if (!entry || entry.phase !== phase) {
      return;
    }

    if (phase === 'entering') {
      this.stackState.update((entries) =>
        entries.map((candidate) =>
          candidate.ref.id === id
            ? {...candidate, phase: 'open'}
            : candidate,
        ),
      );
      return;
    }

    if (phase === 'leaving') {
      this.finalize(entry);
    }
  }

  private beginClose(
    id: string,
    exitAnimation: ErpOverlayAnimation,
  ): boolean {
    const top = this.stackState().at(-1);

    if (top?.ref.id !== id || top.phase === 'leaving') {
      return false;
    }

    this.stackState.update((entries) =>
      entries.map((entry) =>
        entry.ref.id === id
          ? {
              ...entry,
              phase: 'leaving',
              animation: exitAnimation,
            }
          : entry,
      ),
    );

    return true;
  }

  private finalize(entry: ErpOverlayEntry): void {
    this.stackState.update((entries) =>
      entries.filter((candidate) => candidate.ref.id !== entry.ref.id),
    );

    entry.ref.completeTransition();

    if (entry.ref.config.restoreFocus && entry.origin?.isConnected) {
      queueMicrotask(() => entry.origin?.focus());
    }
  }
}
