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
  ErpButtonBorderStyle,
  ErpButtonShape,
  ErpButtonSize,
  ErpButtonState,
  ErpButtonTone,
  ErpIconButtonVariant,
  ErpNativeButtonType,
  ErpPressableCursor,
  ErpRippleSpeed,
} from '../button-family/button-contracts';
import {PressRippleController} from '../button-family/internal/press-ripple';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-icon-button',
  imports: [ErpIcon],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss', './icon-button-facets.scss'],
  host: {
    '[attr.data-icon-button-variant]': 'variant()',
    '[attr.data-icon-button-tone]': 'tone()',
    '[attr.data-icon-button-size]': 'size()',
    '[attr.data-icon-button-shape]': 'shape()',
    '[attr.data-icon-button-border-style]': 'borderStyle()',
    '[attr.data-icon-button-state]': 'state()',
    '[attr.data-icon-button-cursor]': 'cursor()',
    '[attr.data-icon-button-ripple-speed]': 'rippleSpeed()',
  },
})
export class ErpIconButton {
  readonly icon = input.required<ErpIconName>();
  readonly label = input.required<string>();
  readonly variant = input<ErpIconButtonVariant>('ghost');
  readonly tone = input<ErpButtonTone>('neutral');
  readonly size = input<ErpButtonSize>('md');
  readonly shape = input<ErpButtonShape>('rounded');
  readonly borderStyle = input<ErpButtonBorderStyle>('solid');
  readonly type = input<ErpNativeButtonType>('button');
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly form = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly loading = input(false, {transform: booleanAttribute});
  readonly cursor = input<ErpPressableCursor>('pointer');
  readonly rippleSpeed = input<ErpRippleSpeed>('normal');
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
