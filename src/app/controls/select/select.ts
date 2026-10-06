import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {AnchoredOverlayGeometryResult} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpButton} from '../button/button';
import {ErpAvatar} from '../avatar/avatar';
import {ErpActionMenuContent} from '../composite-family/internal/action-menu-content';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldSize} from '../input-family/field-contracts';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSelectionTile} from '../selection-family/internal/selection-tile';
import {ErpSearchBox} from '../search-box/search-box';
import {
  ErpSelectOption,
  ErpSelectSize,
  ErpSelectSort,
  ErpSelectValue,
} from './select-contracts';

let nextSelectId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-select',
  imports: [
    ErpActionMenuContent,
    ErpAvatar,
    ErpButton,
    ErpFieldFrame,
    ErpFieldTrigger,
    ErpIcon,
    ErpSearchBox,
    ErpSelectionTile,
    ErpText,
    FormsModule,
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpSelect), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => ErpSelect), multi: true},
  ],
  templateUrl: './select.html',
  styleUrls: ['./select.scss', './select-popup-controls.scss'],
  host: {
    '[attr.data-select-open]': 'open()',
    '[attr.data-select-multiple]': 'multiple()',
    '[attr.data-select-size]': 'selectSize()',
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
  },
})
export class ErpSelect extends ErpFieldBase<ErpSelectValue> implements OnDestroy {
  readonly options = input<readonly ErpSelectOption[]>([]);
  readonly multiple = input(false, {transform: booleanAttribute});
  readonly searchable = input(true, {transform: booleanAttribute});
  readonly filterable = input(true, {transform: booleanAttribute});
  readonly sortable = input(true, {transform: booleanAttribute});
  readonly maxSelected = input<number | null>(null);
  readonly placeholder = input('اختر قيمة');
  readonly searchPlaceholder = input('ابحث في الخيارات');
  readonly selectSize = input<ErpSelectSize>('normal');
  readonly sort = model<ErpSelectSort>('source');

  protected readonly controlId = `erp-select-${++nextSelectId}`;
  protected readonly popupId = `${this.controlId}-popup`;
  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly activeGroup = signal<string | null>(null);
  protected readonly activeIndex = signal(0);
  protected readonly sortMenuOpen = signal(false);
  protected readonly popup = viewChild<ElementRef<HTMLElement>>('popup');
  protected readonly trigger = viewChild('trigger', {read: ElementRef<HTMLElement>});
  protected readonly fieldSize = computed<ErpFieldSize>(() => ({
    sm: 'sm', md: 'md', normal: 'lg', lg: 'xl', xlg: 'xxl',
  })[this.selectSize()] as ErpFieldSize);
  protected readonly selectedValues = computed<readonly string[]>(() => {
    const value = this.currentValue();
    return Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
  });
  protected readonly selectedOptions = computed(() => {
    const selected = new Set(this.selectedValues());
    return this.options().filter((option) => selected.has(option.value));
  });
  protected readonly displayValue = computed(() =>
    this.selectedOptions().map((option) => option.label).join('، '),
  );
  protected readonly groups = computed(() =>
    [...new Set(this.options().map((option) => option.group).filter((value): value is string => !!value))],
  );
  protected readonly visibleOptions = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    const group = this.activeGroup();
    const source = this.options().filter((option) =>
      (!group || option.group === group) &&
      (!query || [option.label, option.value, option.description ?? '', ...(option.keywords ?? [])]
        .some((candidate) => candidate.toLocaleLowerCase().includes(query))),
    );
    const sort = this.sort();
    return sort === 'source' ? source : [...source].sort((left, right) =>
      (sort === 'ascending' ? 1 : -1) * left.label.localeCompare(right.label, 'ar'),
    );
  });
  protected readonly clearActionVisible = computed(() =>
    this.clearable() && this.selectedValues().length > 0 && !this.fieldEffectiveDisabled(),
  );
  protected readonly sortLabel = computed(() => ({
    source: 'ترتيب المصدر',
    ascending: 'ترتيب تصاعدي',
    descending: 'ترتيب تنازلي',
  })[this.sort()]);
  protected readonly sortMenuItems: readonly ErpSelectOption[] = [
    {value: 'source', label: 'ترتيب المصدر'},
    {value: 'ascending', label: 'ترتيب تصاعدي', icon: 'sort-ascending'},
    {value: 'descending', label: 'ترتيب تنازلي', icon: 'sort-descending'},
  ];
  private controller: AnchoredOverlayController | null = null;
  private widthObserver: ResizeObserver | null = null;

  constructor() {
    super(null);
    effect(() => {
      if (this.fieldEffectiveDisabled()) this.close();
    });
  }

  ngOnDestroy(): void {
    this.detachWidthSync();
    this.controller?.destroy();
  }

  protected override normalizeValue(value: unknown): ErpSelectValue {
    if (this.multiple()) {
      const values = Array.isArray(value) ? value : value == null || value === '' ? [] : [value];
      return [...new Set(values.map(String))];
    }
    return value == null || value === '' ? null : String(value);
  }

  protected toggle(): void {
    if (this.fieldEffectiveDisabled()) return;
    if (this.open()) {
      this.close();
    } else {
      this.show();
    }
  }

  protected select(option: ErpSelectOption): void {
    if (option.disabled || this.fieldEffectiveDisabled()) return;
    if (this.multiple()) {
      const selected = new Set(this.selectedValues());
      if (selected.has(option.value)) selected.delete(option.value);
      else if (this.maxSelected() === null || selected.size < (this.maxSelected() as number)) selected.add(option.value);
      else return;
      this.commitUserValue([...selected]);
    } else {
      this.commitUserValue(option.value);
      this.close();
    }
  }

  protected clearSelection(): void {
    this.commitUserValue(this.multiple() ? [] : null);
  }

  protected setGroup(group: string | null): void {
    this.activeGroup.set(group);
    this.activeIndex.set(0);
  }

  protected setSort(sort: ErpSelectSort): void {
    this.sort.set(sort);
    this.sortMenuOpen.set(false);
  }

  protected toggleSortMenu(): void {
    this.sortMenuOpen.update((open) => !open);
  }

  protected updateQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected selectSort(value: string): void {
    if (value === 'source' || value === 'ascending' || value === 'descending') {
      this.setSort(value);
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open()) this.show();
      const count = this.visibleOptions().length;
      if (count) this.activeIndex.set((this.activeIndex() + (event.key === 'ArrowDown' ? 1 : -1) + count) % count);
      return;
    }
    if (event.key === 'Enter' && this.open()) {
      event.preventDefault();
      const option = this.visibleOptions()[this.activeIndex()];
      if (option) this.select(option);
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  protected handleDocumentPointer(event: PointerEvent): void {
    const target = event.target;
    if (this.open() && target instanceof Node && !this.popup()?.nativeElement.contains(target) && !this.trigger()?.nativeElement.contains(target)) this.close();
  }

  private show(): void {
    const popup = this.popup()?.nativeElement;
    const trigger = this.trigger()?.nativeElement;
    if (!popup || !trigger) return;
    this.syncPopupWidth();
    this.controller?.destroy();
    this.controller = new AnchoredOverlayController({
      anchor: trigger,
      surface: popup,
      readGeometryInput: () => ({preferredPlacement: 'bottom', direction: getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr', anchorGap: 8, viewportInset: 12, showArrow: false, arrowWidth: 0, arrowHeight: 0, arrowSafeInset: 0}),
      applyGeometry: (result) => this.applyGeometry(result),
    });
    if (!this.controller.show()) return;
    this.attachWidthSync();
    this.open.set(true);
    this.handleFocus();
  }

  private close(): void {
    this.detachWidthSync();
    this.controller?.hide();
    this.open.set(false);
    this.sortMenuOpen.set(false);
    this.query.set('');
    this.handleBlur();
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    const popup = this.popup()?.nativeElement;
    if (!popup) return;
    popup.style.left = `${result.x}px`;
    popup.style.top = `${result.y}px`;
    popup.style.transformOrigin = result.placement === 'top' ? 'center bottom' : 'center top';
  }

  private readonly syncPopupWidth = (): void => {
    const popup = this.popup()?.nativeElement;
    const trigger = this.trigger()?.nativeElement;
    if (!popup || !trigger) return;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const availableWidth = Math.max(0, viewportWidth - 24);
    popup.style.inlineSize = `${Math.min(trigger.getBoundingClientRect().width, availableWidth)}px`;
    this.controller?.requestPosition();
  };

  private attachWidthSync(): void {
    this.detachWidthSync();
    window.addEventListener('resize', this.syncPopupWidth);
    window.visualViewport?.addEventListener('resize', this.syncPopupWidth);
    const trigger = this.trigger()?.nativeElement;
    if (trigger && typeof ResizeObserver !== 'undefined') {
      this.widthObserver = new ResizeObserver(this.syncPopupWidth);
      this.widthObserver.observe(trigger);
    }
  }

  private detachWidthSync(): void {
    window.removeEventListener('resize', this.syncPopupWidth);
    window.visualViewport?.removeEventListener('resize', this.syncPopupWidth);
    this.widthObserver?.disconnect();
    this.widthObserver = null;
  }
}
