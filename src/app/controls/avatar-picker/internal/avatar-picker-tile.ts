import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpAvatar, ErpAvatarShape, ErpAvatarSize} from '../../avatar/avatar';
import {ErpAvatarCatalogItem} from '../avatar-picker-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal ERP controls intentionally use the erp prefix.
  selector: 'erp-avatar-picker-tile',
  imports: [ErpAvatar, ErpIcon],
  templateUrl: './avatar-picker-tile.html',
  styleUrls: [
    './avatar-picker-tile-tokens.scss',
    './avatar-picker-tile.scss',
    './avatar-picker-tile-motion.scss',
  ],
  host: {
    '[attr.data-avatar-picker-tile-selected]': 'selected()',
    '[attr.data-avatar-picker-tile-disabled]': 'disabled()',
  },
})
export class ErpAvatarPickerTile {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly item = input.required<ErpAvatarCatalogItem>();
  readonly selected = input(false, {transform: booleanAttribute});
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly avatarSize = input.required<ErpAvatarSize>();
  readonly avatarShape = input.required<ErpAvatarShape>();
  readonly tabIndex = input(-1);
  readonly animationIndex = input(0);
  readonly activated = output<void>();
  readonly focused = output<void>();
  readonly keyPressed = output<KeyboardEvent>();

  focus(): void {
    this.host.nativeElement.querySelector<HTMLButtonElement>('button')?.focus();
  }

  protected label(): string {
    return this.item().label?.trim() || `اختيار ${this.item().id}`;
  }
}
