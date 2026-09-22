import {computed, signal} from '@angular/core';

export interface PressRippleState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly diameter: number;
}

export class PressRippleController {
  private sequence = 0;

  readonly active = signal<PressRippleState | null>(null);

  readonly items = computed(() => {
    const value = this.active();
    return value === null ? [] : [value];
  });

  startPointer(event: PointerEvent, blocked: boolean): void {
    if (blocked || event.button !== 0) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);
    const horizontalRadius = Math.max(x, rect.width - x);
    const verticalRadius = Math.max(y, rect.height - y);
    let diameter = 2 * Math.hypot(horizontalRadius, verticalRadius);

    if (!Number.isFinite(diameter) || diameter <= 0) {
      diameter = Math.max(element.clientWidth, element.clientHeight, 1) * 2;
    }

    this.sequence += 1;
    this.active.set({id: this.sequence, x, y, diameter});
  }

  startKeyboard(event: KeyboardEvent, blocked: boolean): void {
    if (blocked || event.repeat || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;
    let diameter = Math.hypot(rect.width, rect.height);

    if (!Number.isFinite(diameter) || diameter <= 0) {
      diameter = Math.max(element.clientWidth, element.clientHeight, 1) * 2;
    }

    this.sequence += 1;
    this.active.set({id: this.sequence, x, y, diameter});
  }

  clear(id: number): void {
    if (this.active()?.id === id) {
      this.active.set(null);
    }
  }
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}
