import {Injectable} from '@angular/core';
import {ErpMotionPreset} from './motion-contracts';

export type ErpMotionPhase = 'enter' | 'exit';
export type ErpMotionDirection = 'ltr' | 'rtl';

export interface ErpMotionRequest {
  readonly element: HTMLElement;
  readonly preset: ErpMotionPreset;
  readonly phase: ErpMotionPhase;
  readonly direction: ErpMotionDirection;
  readonly durationMs: number;
  readonly completed: () => void;
}

export const ERP_OVERLAY_MOTION_DURATION_MS = Object.freeze({
  enter: 360,
  exit: 260,
});

export const ERP_TOOLTIP_MOTION_DURATION_MS = Object.freeze({
  enter: 320,
  exit: 220,
});

const BASE_CLASS = 'animate__animated';

const STATIC_EFFECTS: Readonly<
  Record<Exclude<ErpMotionPreset, 'fade-start' | 'fade-end' | 'slide-start' | 'slide-end'>, readonly [string, string]>
> = Object.freeze({
  fade: ['fadeIn', 'fadeOut'],
  scale: ['zoomIn', 'zoomOut'],
  'fade-scale': ['zoomIn', 'zoomOut'],
  'slide-up': ['slideInUp', 'slideOutDown'],
  'slide-down': ['slideInDown', 'slideOutUp'],
  zoom: ['zoomIn', 'zoomOut'],
  pop: ['bounceIn', 'bounceOut'],
  'flip-x': ['flipInX', 'flipOutX'],
  'flip-y': ['flipInY', 'flipOutY'],
  bounce: ['bounceIn', 'bounceOut'],
  swing: ['swing', 'fadeOut'],
  'fade-up': ['fadeInUp', 'fadeOutDown'],
  'fade-down': ['fadeInDown', 'fadeOutUp'],
  'zoom-up': ['zoomInUp', 'zoomOutDown'],
  'zoom-down': ['zoomInDown', 'zoomOutUp'],
  back: ['backInUp', 'backOutDown'],
  'light-speed': ['lightSpeedInRight', 'lightSpeedOutRight'],
  rotate: ['rotateIn', 'rotateOut'],
  roll: ['rollIn', 'rollOut'],
});

const LOGICAL_EFFECTS = Object.freeze({
  ltr: {
    'fade-start': ['fadeInLeft', 'fadeOutLeft'],
    'fade-end': ['fadeInRight', 'fadeOutRight'],
    'slide-start': ['slideInLeft', 'slideOutLeft'],
    'slide-end': ['slideInRight', 'slideOutRight'],
  },
  rtl: {
    'fade-start': ['fadeInRight', 'fadeOutRight'],
    'fade-end': ['fadeInLeft', 'fadeOutLeft'],
    'slide-start': ['slideInRight', 'slideOutRight'],
    'slide-end': ['slideInLeft', 'slideOutLeft'],
  },
} as const);

interface ActiveMotion {
  readonly effectClass: string;
  readonly animationEnd: (event: Event) => void;
  readonly completed: () => void;
}

export function resolveAnimateCssEffect(
  preset: ErpMotionPreset,
  phase: ErpMotionPhase,
  direction: ErpMotionDirection,
): string {
  const phaseIndex = phase === 'enter' ? 0 : 1;

  if (
    preset === 'fade-start' ||
    preset === 'fade-end' ||
    preset === 'slide-start' ||
    preset === 'slide-end'
  ) {
    return LOGICAL_EFFECTS[direction][preset][phaseIndex];
  }

  return STATIC_EFFECTS[preset][phaseIndex];
}

@Injectable({providedIn: 'root'})
export class AnimateCssMotionAdapter {
  private readonly active = new WeakMap<HTMLElement, ActiveMotion>();

  start(request: ErpMotionRequest): () => void {
    this.cancel(request.element);

    const effectClass = `animate__${resolveAnimateCssEffect(
      request.preset,
      request.phase,
      request.direction,
    )}`;
    const motion: ActiveMotion = {
      effectClass,
      animationEnd: (event) => {
        if (event.target === request.element) {
          this.finish(request.element, motion, true);
        }
      },
      completed: request.completed,
    };

    this.active.set(request.element, motion);

    if (this.prefersReducedMotion()) {
      queueMicrotask(() => this.finish(request.element, motion, true));
      return () => this.cancel(request.element);
    }

    request.element.style.setProperty(
      '--animate-duration',
      `${Math.max(0, request.durationMs)}ms`,
    );
    request.element.addEventListener('animationend', motion.animationEnd);
    request.element.classList.add(BASE_CLASS, effectClass);

    return () => this.cancel(request.element);
  }

  cancel(element: HTMLElement): void {
    const motion = this.active.get(element);

    if (motion) {
      this.finish(element, motion, false);
    }
  }

  private finish(
    element: HTMLElement,
    motion: ActiveMotion,
    complete: boolean,
  ): void {
    if (this.active.get(element) !== motion) {
      return;
    }

    element.removeEventListener('animationend', motion.animationEnd);
    element.classList.remove(BASE_CLASS, motion.effectClass);
    element.style.removeProperty('--animate-duration');
    this.active.delete(element);

    if (complete) {
      motion.completed();
    }
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
