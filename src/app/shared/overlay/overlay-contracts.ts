import {Type} from '@angular/core';

export type ErpOverlayKind = 'modal' | 'drawer';

export type ErpOverlayPosition =
  | 'center'
  | 'start'
  | 'end'
  | 'bottom';

export type ErpOverlaySize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ErpOverlayBlur = 'low' | 'medium' | 'high';

export type ErpOverlayBackdropTone =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent';

export type ErpOverlayAnimation =
  | 'fade'
  | 'scale'
  | 'fade-scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-start'
  | 'slide-end';

export type ErpOverlayPhase = 'entering' | 'open' | 'leaving';

export interface ErpOverlayBehaviorConfig {
  readonly dismissOnEscape: boolean;
  readonly dismissOnBackdrop: boolean;
  readonly blur: ErpOverlayBlur;
  readonly backdropTone: ErpOverlayBackdropTone;
  readonly enterAnimation: ErpOverlayAnimation;
  readonly exitAnimation: ErpOverlayAnimation;
}

export interface ErpOverlayConfig<TData = unknown>
  extends ErpOverlayBehaviorConfig {
  readonly kind: ErpOverlayKind;
  readonly position: ErpOverlayPosition;
  readonly size: ErpOverlaySize;
  readonly label: string;
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
  readonly blur?: ErpOverlayBlur;
  readonly backdropTone?: ErpOverlayBackdropTone;
  readonly enterAnimation?: ErpOverlayAnimation;
  readonly exitAnimation?: ErpOverlayAnimation;
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
  readonly phase: ErpOverlayPhase;
  readonly animation: ErpOverlayAnimation;
}
