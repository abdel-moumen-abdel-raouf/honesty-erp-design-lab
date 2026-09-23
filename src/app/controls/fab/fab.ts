import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpIcon} from '../../primitives/icon/icon';
import {
  ErpButtonState,
  ErpFabSize,
  ErpFabTone,
  ErpPressableCursor,
  ErpRippleSpeed,
} from '../button-family/button-contracts';
import {PressRippleController} from '../button-family/internal/press-ripple';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-fab',
  imports: [ErpIcon],
  templateUrl: './fab.html',
  styleUrl: './fab.scss',
  host: {
    '[attr.data-fab-size]': 'size()',
    '[attr.data-fab-tone]': 'tone()',
    '[attr.data-fab-state]': 'state()',
    '[attr.data-fab-cursor]': 'cursor()',
    '[attr.data-fab-ripple-speed]': 'rippleSpeed()',
  },
})
export class ErpFab {
  readonly icon = input.required<ErpIconName>();
  readonly label = input.required<string>();
  readonly size = input<ErpFabSize>('md');
  readonly tone = input<ErpFabTone>('primary');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly loading = input(false, {transform: booleanAttribute});
  readonly cursor = input<ErpPressableCursor>('pointer');
  readonly rippleSpeed = input<ErpRippleSpeed>('slow');
  readonly pressed = output<void>();

  private readonly ripple = new PressRippleController();

  readonly rippleItems = this.ripple.items;
  readonly trimmedLabel = computed(() => this.label().trim());
  readonly state = computed<ErpButtonState>(() => {
    if (this.trimmedLabel().length === 0) {
      return 'invalid';
    }

    if (this.loading()) {
      return 'loading';
    }

    if (this.disabled()) {
      return 'disabled';
    }

    return 'ready';
  });
  readonly nativeDisabled = computed(() => this.state() !== 'ready');

  handlePointerDown(event: PointerEvent): void {
    this.ripple.startPointer(event, this.state() !== 'ready');
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.ripple.startKeyboard(event, this.state() !== 'ready');
  }

  clearRipple(id: number): void {
    this.ripple.clear(id);
  }

  handleClick(): void {
    if (this.state() === 'ready') {
      this.pressed.emit();
    }
  }
}
