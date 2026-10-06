import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
import {ErpAvatar} from '../avatar/avatar';
import {ErpSelectionTile} from '../selection-family/internal/selection-tile';
import {ErpTabItem, ErpTabPanel, ErpTabs} from '../tabs/tabs';
import {
  ERP_AVATAR_CATALOG,
  ErpAvatarCatalogItem,
  ErpAvatarGender,
} from './avatar-picker-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-avatar-picker',
  imports: [ErpAvatar, ErpSelectionTile, ErpTabPanel, ErpTabs, ErpText],
  templateUrl: './avatar-picker.html',
  styleUrl: './avatar-picker.scss',
  host: {
    '[attr.data-avatar-picker-value]': 'value()',
    '[attr.data-avatar-picker-gender]': 'activeGender()',
    '[attr.data-avatar-picker-disabled]': 'disabled()',
  },
})
export class ErpAvatarPicker {
  readonly label = input('اختيار الصورة الشخصية');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly value = model<string | null>(null);
  readonly changed = output<string>();

  protected readonly activeGender = signal<ErpAvatarGender>('male');
  protected readonly tabs: readonly ErpTabItem[] = Object.freeze([
    {id: 'male', label: 'ذكر'},
    {id: 'female', label: 'أنثى'},
  ]);
  protected readonly selected = computed(() =>
    ERP_AVATAR_CATALOG.find((item) => item.id === this.value()) ?? null,
  );

  protected avatarsFor(gender: ErpAvatarGender): readonly ErpAvatarCatalogItem[] {
    return ERP_AVATAR_CATALOG.filter((item) => item.gender === gender);
  }

  protected setGender(id: string): void {
    if (id === 'male' || id === 'female') this.activeGender.set(id);
  }

  protected select(item: ErpAvatarCatalogItem): void {
    if (this.disabled()) return;
    this.value.set(item.id);
    this.changed.emit(item.id);
  }
}
