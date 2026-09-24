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
  ErpOverlayConfig,
  ErpOverlayEntry,
  ErpOverlayOpenConfig,
} from './overlay-contracts';
import {ErpOverlayRef} from './overlay-ref';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from './overlay-tokens';

let nextOverlayId = 0;

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

    const config = Object.freeze<ErpOverlayConfig<TData>>({
      kind: options.kind ?? 'modal',
      position: options.position ?? 'center',
      size: options.size ?? 'md',
      label,
      dismissOnEscape: options.dismissOnEscape ?? true,
      dismissOnBackdrop: options.dismissOnBackdrop ?? true,
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
    const ref = new ErpOverlayRef<TResult>(id, config, () => {
      this.finalize(ref, origin);
    });

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

  private finalize<TResult>(
    ref: ErpOverlayRef<TResult>,
    origin: HTMLElement | null,
  ): void {
    this.stackState.update((entries) =>
      entries.filter((entry) => entry.ref.id !== ref.id),
    );

    if (ref.config.restoreFocus && origin?.isConnected) {
      queueMicrotask(() => origin.focus());
    }
  }
}
