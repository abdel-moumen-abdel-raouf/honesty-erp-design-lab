import {Type} from '@angular/core';

export type ErpOverlayKind = 'modal' | 'drawer';

export type ErpOverlayPosition =
  | 'center'
  | 'start'
  | 'end'
  | 'bottom';

export type ErpOverlaySize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ErpOverlayConfig<TData = unknown> {
  readonly kind: ErpOverlayKind;
  readonly position: ErpOverlayPosition;
  readonly size: ErpOverlaySize;
  readonly label: string;
  readonly dismissOnEscape: boolean;
  readonly dismissOnBackdrop: boolean;
  readonly restoreFocus: boolean;
  readonly trapFocus: boolean;
  readonly blocking: boolean;
  readonly initialFocus: string | null;
  readonly data: TData;
}

export interface ErpOverlayOpenConfig<TData = undefined> {
  readonly kind?: ErpOverlayKind;
  readonly position?: ErpOverlayPosition;
  readonly size?: ErpOverlaySize;
  readonly label: string;
  readonly dismissOnEscape?: boolean;
  readonly dismissOnBackdrop?: boolean;
  readonly restoreFocus?: boolean;
  readonly trapFocus?: boolean;
  readonly blocking?: boolean;
  readonly initialFocus?: string | null;
  readonly data?: TData;
}

export type ErpOverlayCloseResult<TResult> =
  | {readonly type: 'closed'; readonly result: TResult | undefined}
  | {readonly type: 'dismissed'; readonly reason: string};

export interface ErpOverlayEntry {
  readonly component: Type<unknown>;
  readonly injector: import('@angular/core').Injector;
  readonly ref: import('./overlay-ref').ErpOverlayRef<unknown>;
  readonly origin: HTMLElement | null;
}
