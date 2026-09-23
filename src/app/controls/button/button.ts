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
import {ErpText} from '../../primitives/text/text';
import {
  ErpButtonBorderStyle,
  ErpButtonIconPosition,
  ErpButtonShape,
  ErpButtonSize,
  ErpButtonState,
  ErpButtonTone,
  ErpButtonVariant,
  ErpNativeButtonType,
  ErpPressableCursor,
  ErpRippleSpeed,
} from '../button-family/button-contracts';
import {PressRippleController} from '../button-family/internal/press-ripple';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-button',
  imports: [ErpIcon, ErpText],
  templateUrl: './button.html',
  styleUrls: ['./button.scss', './button-facets.scss'],
  host: {
    '[attr.data-button-variant]': 'variant()',
    '[attr.data-button-tone]': 'tone()',
    '[attr.data-button-size]': 'size()',
    '[attr.data-button-shape]': 'shape()',
    '[attr.data-button-border-style]': 'borderStyle()',
    '[attr.data-button-icon-position]': 'iconPosition()',
    '[attr.data-button-state]': 'state()',
    '[attr.data-button-full-width]': 'fullWidth()',
    '[attr.data-button-cursor]': 'cursor()',
    '[attr.data-button-ripple-speed]': 'rippleSpeed()',
  },
})
export class ErpButton {
  readonly label = input.required<string>();
  readonly variant = input<ErpButtonVariant>('solid');
  readonly tone = input<ErpButtonTone>('primary');
  readonly size = input<ErpButtonSize>('md');
  readonly shape = input<ErpButtonShape>('default');
  readonly borderStyle = input<ErpButtonBorderStyle>('solid');
  readonly icon = input<ErpIconName | null>(null);
  readonly iconPosition = input<ErpButtonIconPosition>('start');
  readonly type = input<ErpNativeButtonType>('button');
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly form = input<string | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly loading = input(false, {transform: booleanAttribute});
  readonly loadingLabel = input<string | null>(null);
  readonly fullWidth = input(false, {transform: booleanAttribute});
  readonly cursor = input<ErpPressableCursor>('pointer');
  readonly rippleSpeed = input<ErpRippleSpeed>('slow');
  readonly pressed = output<void>();

  private readonly ripple = new PressRippleController();

  readonly rippleItems = this.ripple.items;
  readonly trimmedLabel = computed(() => this.label().trim());
  readonly effectiveLabel = computed(() => {
    const loadingLabel = this.loadingLabel()?.trim();
    return this.loading() && loadingLabel ? loadingLabel : this.trimmedLabel();
  });
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
