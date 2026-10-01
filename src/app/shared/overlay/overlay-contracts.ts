import {Type} from '@angular/core';
import {ErpMotionPreset} from '../../foundation/motion/motion-contracts';
import {ErpIconName} from '../../primitives/icon/icon-contracts';

export type ErpOverlayKind = 'modal' | 'drawer';

export type ErpOverlayPosition =
  | 'center'
  | 'start'
  | 'end'
  | 'top'
  | 'bottom';

export type ErpOverlaySize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ErpOverlayBlur = 'low' | 'medium' | 'high';

export type ErpOverlayBackdropTone =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent';

export type ErpOverlayAnimation = ErpMotionPreset;

export type ErpOverlayPhase = 'entering' | 'open' | 'leaving';

export interface ErpOverlayHeaderConfig {
  readonly title: string;
  readonly subtitle: string;
  readonly icon: ErpIconName;
  readonly closeLabel?: string;
}

export interface ErpOverlayActionConfig {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName | null;
  readonly presentation?: ErpOverlayActionPresentation;
  readonly role: ErpOverlayActionRole;
  readonly placement: ErpOverlayActionPlacement;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

export type ErpOverlayActionRole = 'primary' | 'secondary' | 'utility';
export type ErpOverlayActionPlacement = 'start' | 'end';
export type ErpOverlayActionPresentation = 'button' | 'icon-button';

export interface ErpOverlayFrameActionState {
  readonly disabled: boolean;
  readonly loading: boolean;
}

export interface ErpOverlayFooterConfig {
  readonly actions: readonly ErpOverlayActionConfig[];
}

export interface ErpOverlayFrameConfig {
  readonly showHeader?: boolean;
  readonly showFooter?: boolean;
  readonly header: ErpOverlayHeaderConfig;
  readonly footer: ErpOverlayFooterConfig;
}

export type ErpOverlayFrameActionId = string;

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
  readonly frame: ErpOverlayFrameConfig | null;
  readonly legacyCompactMenuLabel: string | null;
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
  readonly frame: ErpOverlayFrameConfig;
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
