import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {ErpAvatar, ErpAvatarShape, ErpAvatarSize} from '../avatar/avatar';
import {ErpButton} from '../button/button';
import {ErpEmptyState, ErpEmptyStateIllustration} from '../empty-state/empty-state';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpSearchBox} from '../search-box/search-box';
import {ErpTabItem, ErpTabs} from '../tabs/tabs';
import {ErpTooltip} from '../tooltip/tooltip';
import {
  ERP_AVATAR_CATALOG,
  ErpAvatarCatalogItem,
  ErpAvatarGender,
  ErpAvatarPickerSize,
} from './avatar-picker-contracts';
import {ErpAvatarPickerTile} from './internal/avatar-picker-tile';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-avatar-picker',
  imports: [
    ErpAvatar,
    ErpAvatarPickerTile,
    ErpButton,
    ErpEmptyState,
    ErpEmptyStateIllustration,
    ErpIcon,
    ErpIconButton,
    ErpSearchBox,
    ErpTabs,
    ErpText,
    ErpTooltip,
    FormsModule,
  ],
  templateUrl: './avatar-picker.html',
  styleUrls: [
    './avatar-picker-tokens.scss',
    './avatar-picker.scss',
    './avatar-picker-grid.scss',
    './avatar-picker-footer.scss',
    './avatar-picker-motion.scss',
    './avatar-picker-responsive.scss',
  ],
  host: {
    '[attr.data-avatar-picker-value]': 'value()',
    '[attr.data-avatar-picker-draft]': 'draft()',
    '[attr.data-avatar-picker-gender]': 'gender()',
    '[attr.data-avatar-picker-size]': 'size()',
    '[attr.data-avatar-picker-avatar-size]': 'effectiveAvatarSize()',
    '[attr.data-avatar-picker-avatar-shape]': 'avatarShape()',
    '[attr.data-avatar-picker-disabled]': 'disabled()',
  },
})
export class ErpAvatarPicker implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly tiles = viewChildren(ErpAvatarPickerTile);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly avatars = input<readonly ErpAvatarCatalogItem[]>(ERP_AVATAR_CATALOG);
  readonly title = input('اختيار الصورة الشخصية');
  readonly label = input<string | null>(null);
  readonly subtitle = input('اختر الصورة التي تناسب حسابك');
  readonly searchable = input(true, {transform: booleanAttribute});
  readonly showConfirm = input(true, {transform: booleanAttribute});
  readonly showCount = input(true, {transform: booleanAttribute});
  readonly searchPlaceholder = input('ابحث عن صورة...');
  readonly emptyText = input('لا توجد صور مطابقة لبحثك');
  readonly confirmLabel = input('حفظ الاختيار');
  readonly cancelLabel = input('إلغاء');
  readonly savedLabel = input('تم حفظ الصورة الشخصية');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly size = input<ErpAvatarPickerSize>('default');
  readonly avatarShape = input<ErpAvatarShape>('rounded');
  readonly avatarSize = input<ErpAvatarSize | null>(null);

  readonly value = model<string | null>(null);
  readonly gender = model<ErpAvatarGender>('male');
  readonly changed = output<string>();
  readonly pick = output<ErpAvatarCatalogItem | null>();
  readonly confirm = output<string>();
  readonly cancelRequested = output<void>();

  protected readonly query = signal('');
  protected readonly draft = signal<string | null>(null);
  protected readonly activeIndex = signal(0);
  protected readonly toastVisible = signal(false);
  protected readonly effectiveTitle = computed(
    () => this.label()?.trim() || this.title().trim(),
  );
  protected readonly filteredAvatars = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.avatars().filter((item) => {
      if (item.gender !== this.gender()) return false;
      if (!query) return true;
      return item.id.toLocaleLowerCase().includes(query) ||
        item.label?.toLocaleLowerCase().includes(query);
    });
  });
  protected readonly selectedId = computed(() => this.draft() ?? this.value());
  protected readonly selectedAvatar = computed(() =>
    this.avatars().find((item) => item.id === this.selectedId()) ?? null,
  );
  protected readonly canConfirm = computed(
    () => !this.disabled() && this.draft() !== null && this.draft() !== this.value(),
  );
  protected readonly effectiveAvatarSize = computed<ErpAvatarSize>(
    () => this.avatarSize() ?? (this.size() === 'compact' ? 'lg' : 'xl'),
  );
  protected readonly tabs = computed<readonly ErpTabItem[]>(() => [
    {
      id: 'male',
      label: 'ذكر',
      icon: 'male',
      count: this.showCount()
        ? this.avatars().filter((item) => item.gender === 'male').length
        : undefined,
      headerPresentation: 'icon-text',
      disabled: this.disabled(),
    },
    {
      id: 'female',
      label: 'أنثى',
      icon: 'female',
      count: this.showCount()
        ? this.avatars().filter((item) => item.gender === 'female').length
        : undefined,
      headerPresentation: 'icon-text',
      disabled: this.disabled(),
    },
  ]);

  protected setGender(id: string): void {
    if (this.disabled() || (id !== 'male' && id !== 'female')) return;
    this.gender.set(id);
    this.activeIndex.set(0);
    const draft = this.draft();
    if (draft && !this.avatars().some((item) => item.id === draft && item.gender === id)) {
      this.draft.set(null);
      this.pick.emit(null);
    }
  }

  protected setQuery(query: string): void {
    this.query.set(query);
    this.activeIndex.set(0);
  }

  protected select(item: ErpAvatarCatalogItem, index: number): void {
    if (this.disabled() || item.disabled) return;
    this.activeIndex.set(index);
    this.draft.set(item.id);
    this.pick.emit(item);
  }

  protected confirmSelection(): void {
    const id = this.draft();
    if (!this.canConfirm() || id === null) return;
    this.value.set(id);
    this.changed.emit(id);
    this.confirm.emit(id);
    this.draft.set(null);
    this.showSavedToast();
  }

  protected cancelSelection(): void {
    if (this.disabled()) return;
    this.draft.set(null);
    this.pick.emit(null);
    this.cancelRequested.emit();
  }

  protected avatarLabel(item: ErpAvatarCatalogItem): string {
    return item.label?.trim() || `الصورة ${item.id}`;
  }

  protected tileTabIndex(index: number): number {
    return index === this.activeIndex() ? 0 : -1;
  }

  protected handleTileKeydown(event: KeyboardEvent, index: number): void {
    const count = this.filteredAvatars().length;
    if (count === 0) return;
    const direction = getComputedStyle(this.host.nativeElement).direction;
    const horizontalStep =
      (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0) *
      (direction === 'rtl' ? -1 : 1);
    const verticalStep = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    let target = index;
    if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = count - 1;
    else if (horizontalStep || verticalStep) {
      target = (index + horizontalStep + verticalStep + count) % count;
    } else return;
    event.preventDefault();
    this.activeIndex.set(target);
    this.tiles()[target]?.focus();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  private showSavedToast(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastVisible.set(true);
    this.toastTimer = setTimeout(() => {
      this.toastVisible.set(false);
      this.toastTimer = null;
    }, 1800);
  }
}
