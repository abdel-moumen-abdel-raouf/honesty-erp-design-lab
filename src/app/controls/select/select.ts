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
  output,
  signal,
  viewChild,
} from '@angular/core';
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {
  AnchoredOverlayGeometryResult,
  AnchoredOverlayPhysicalPlacement,
} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpAvatar} from '../avatar/avatar';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSearchBox} from '../search-box/search-box';
import {ErpSelectionTile} from '../selection-family/internal/selection-tile';
import {ErpSelectAction} from './internal/select-action';
import {
  ErpSelectAppearance,
  ErpSelectOption,
  ErpSelectPlacement,
  ErpSelectRenderRow,
  ErpSelectSize,
  ErpSelectSort,
  ErpSelectSortMode,
  ErpSelectValue,
} from './select-contracts';

let nextSelectId = 0;
type ErpSelectPopupPhase = 'closed' | 'entering' | 'open' | 'leaving';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-select',
  imports: [
    ErpAvatar,
    ErpFieldFrame,
    ErpFieldTrigger,
    ErpIcon,
    ErpSearchBox,
    ErpSelectAction,
    ErpSelectionTile,
    ErpText,
    FormsModule,
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpSelect), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => ErpSelect), multi: true},
  ],
  templateUrl: './select.html',
  styleUrls: [
    './select-tokens.scss',
    './select-panel-tokens.scss',
    './select.scss',
    './select-chips-actions.scss',
    './select-popup.scss',
    './select-popup-controls.scss',
    './select-option-content.scss',
  ],
  host: {
    '[attr.data-select-open]': 'open()',
    '[attr.data-select-popup-phase]': 'popupPhase()',
    '[attr.data-select-multiple]': 'multiple()',
    '[attr.data-select-size]': 'selectSize()',
    '[attr.data-select-reference-size]': 'referenceSize()',
    '[attr.data-select-appearance]': 'resolvedSelectAppearance()',
    '[attr.data-select-placement]': 'resolvedPlacement() ?? placement()',
    '[attr.data-select-has-value]': 'selectedOptions().length > 0',
    '[attr.data-select-focus-visible]': 'triggerFocusVisible()',
    '[attr.data-select-invalid]': `effectiveFieldStatus() === 'danger'`,
    '[attr.data-select-disabled]': 'fieldEffectiveDisabled()',
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
  },
})
export class ErpSelect extends ErpFieldBase<ErpSelectValue> implements OnDestroy {
  private static readonly openInstances = new Set<ErpSelect>();

  readonly options = input<readonly ErpSelectOption[]>([]);
  readonly multiple = input(false, {transform: booleanAttribute});
  readonly searchable = input(false, {transform: booleanAttribute});
  readonly filterable = input(true, {transform: booleanAttribute});
  readonly sortable = input(true, {transform: booleanAttribute});
  readonly showIcons = input(true, {transform: booleanAttribute});
  readonly showImages = input(true, {transform: booleanAttribute});
  readonly selectAll = input(false, {transform: booleanAttribute});
  readonly maxSelected = input<number | null>(null);
  readonly maxChips = input(3);
  readonly placeholder = input('اختر قيمة');
  readonly searchPlaceholder = input('البحث');
  readonly searchLabel = input('البحث');
  readonly emptyText = input('لا توجد نتائج مطابقة');
  readonly selectSize = input<ErpSelectSize>('md');
  readonly selectAppearance = input<ErpSelectAppearance | null>(null);
  readonly placement = input<ErpSelectPlacement>('bottom');
  readonly groupBy = input<keyof ErpSelectOption | null>(null);
  readonly sortMode = input<ErpSelectSortMode>('none');
  readonly filterPredicate = input<
    ((option: ErpSelectOption, query: string) => boolean) | null
  >(null);
  readonly filterFn = input<((option: ErpSelectOption) => boolean) | null>(null);
  readonly comparator = input<
    ((left: ErpSelectOption, right: ErpSelectOption) => number) | null
  >(null);
  readonly sort = model<ErpSelectSort>('source');

  readonly selectionChange = output<readonly ErpSelectOption[]>();
  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly cleared = output<void>();
  readonly searchChange = output<string>();

  protected readonly controlId = `erp-select-${++nextSelectId}`;
  protected readonly popupId = `${this.controlId}-popup`;
  protected readonly listboxId = `${this.controlId}-listbox`;
  protected readonly popupPhase = signal<ErpSelectPopupPhase>('closed');
  protected readonly open = computed(
    () => this.popupPhase() === 'entering' || this.popupPhase() === 'open',
  );
  protected readonly query = signal('');
  protected readonly activeIndex = signal(-1);
  protected readonly triggerFocusVisible = signal(false);
  protected readonly resolvedPlacement =
    signal<AnchoredOverlayPhysicalPlacement | null>(null);
  protected readonly popup = viewChild<ElementRef<HTMLElement>>('popup');
  protected readonly controlSurface =
    viewChild<ElementRef<HTMLElement>>('controlSurface');
  protected readonly trigger = viewChild('trigger', {read: ElementRef<HTMLElement>});
  protected readonly searchEditor = viewChild(ErpSearchBox);
  protected readonly referenceSize = computed<'sm' | 'md' | 'lg'>(() => {
    const size = this.selectSize();
    return size === 'sm' ? 'sm' : size === 'lg' || size === 'xlg' ? 'lg' : 'md';
  });
  protected readonly resolvedSelectAppearance = computed<ErpSelectAppearance>(() => {
    const explicit = this.selectAppearance();
    if (explicit) return explicit;
    const variant = this.variant();
    if (variant === 'ghost' || variant === 'text') return 'ghost';
    if (variant === 'solid' || variant === 'subtle') return 'filled';
    return 'outline';
  });
  protected readonly selectedValues = computed<readonly string[]>(() => {
    const value = this.currentValue();
    return Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
  });
  protected readonly selectedOptions = computed(() => {
    const selected = new Set(this.selectedValues());
    return this.options().filter((option) => selected.has(option.value));
  });
  protected readonly visibleChips = computed(() =>
    this.selectedOptions().slice(0, Math.max(0, this.maxChips())),
  );
  protected readonly hiddenChipCount = computed(() =>
    Math.max(0, this.selectedOptions().length - this.visibleChips().length),
  );
  protected readonly visibleOptions = computed<readonly ErpSelectOption[]>(() => {
    let source = this.options().filter((option) => !option.hidden);
    const filter = this.filterFn();
    if (this.filterable() && filter) source = source.filter(filter);

    const query = this.query().trim().toLocaleLowerCase();
    if (query) {
      const predicate = this.filterPredicate();
      source = source.filter((option) =>
        predicate ? predicate(option, query) : this.defaultSearchMatch(option, query),
      );
    }

    if (!this.sortable()) return source;
    const mode = this.sortMode();
    if (mode === 'custom' && this.comparator()) {
      return [...source].sort(this.comparator()!);
    }
    if (mode === 'label') {
      return [...source].sort((left, right) =>
        left.label.localeCompare(right.label, undefined, {numeric: true}),
      );
    }
    const legacySort = this.sort();
    if (legacySort === 'source') return source;
    return [...source].sort((left, right) =>
      (legacySort === 'ascending' ? 1 : -1) *
      left.label.localeCompare(right.label, 'ar', {numeric: true}),
    );
  });
  protected readonly rows = computed<readonly ErpSelectRenderRow[]>(() => {
    const groupKey = this.groupBy();
    const options = this.visibleOptions();
    if (!groupKey) return options.map((option) => ({kind: 'option', option}));

    const groups = new Map<string, ErpSelectOption[]>();
    for (const option of options) {
      const label = String(option[groupKey] ?? 'أخرى');
      const items = groups.get(label) ?? [];
      items.push(option);
      groups.set(label, items);
    }
    return [...groups].flatMap(([label, items]) => [
      {kind: 'group' as const, label},
      ...items.map((option) => ({kind: 'option' as const, option})),
    ]);
  });
  protected readonly activeDescendant = computed(() => {
    const index = this.activeIndex();
    return this.open() && index >= 0 ? this.optionId(index) : null;
  });
  protected readonly clearActionVisible = computed(() =>
    this.clearable() && this.selectedValues().length > 0 && !this.fieldEffectiveDisabled(),
  );

  private controller: AnchoredOverlayController | null = null;
  private widthObserver: ResizeObserver | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super(null);
    effect(() => {
      if (this.fieldEffectiveDisabled()) this.close(false, true);
    });
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    this.detachWidthSync();
    ErpSelect.openInstances.delete(this);
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
    if (this.open()) this.close(false);
    else this.show();
  }

  protected select(option: ErpSelectOption): void {
    if (option.disabled || this.fieldEffectiveDisabled()) return;
    if (this.multiple()) {
      const selected = new Set(this.selectedValues());
      if (selected.has(option.value)) selected.delete(option.value);
      else if (this.maxSelected() === null || selected.size < this.maxSelected()!) {
        selected.add(option.value);
      } else return;
      this.commitSelection([...selected]);
      this.searchEditor()?.focusEditor();
      return;
    }
    this.commitSelection(option.value);
    this.close(true);
  }

  protected removeOption(option: ErpSelectOption): void {
    const selected = this.selectedValues().filter((value) => value !== option.value);
    this.commitSelection(selected);
  }

  protected clearSelection(): void {
    if (!this.commitSelection(this.multiple() ? [] : null)) return;
    this.cleared.emit();
  }

  protected selectAllVisible(): void {
    if (!this.multiple() || this.fieldEffectiveDisabled()) return;
    const selected = new Set(this.selectedValues());
    for (const option of this.visibleOptions()) {
      if (option.disabled || selected.has(option.value)) continue;
      if (this.maxSelected() !== null && selected.size >= this.maxSelected()!) break;
      selected.add(option.value);
    }
    this.commitSelection([...selected]);
  }

  protected clearAll(): void {
    this.clearSelection();
  }

  protected updateQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(this.firstEnabledIndex());
    this.searchChange.emit(value);
  }

  protected clearSearch(): void {
    this.updateQuery('');
    queueMicrotask(() => this.searchEditor()?.focusEditor());
  }

  protected highlightParts(label: string): readonly {text: string; match: boolean}[] {
    const query = this.query().trim();
    if (!query) return [{text: label, match: false}];
    const index = label.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
    if (index < 0) return [{text: label, match: false}];
    return [
      {text: label.slice(0, index), match: false},
      {text: label.slice(index, index + query.length), match: true},
      {text: label.slice(index + query.length), match: false},
    ].filter((part) => part.text.length > 0);
  }

  protected setActive(index: number, scroll = false): void {
    const option = this.visibleOptions()[index];
    if (!option || option.disabled) return;
    this.activeIndex.set(index);
    if (scroll) {
      queueMicrotask(() => {
        const option = this.popup()?.nativeElement.querySelector<HTMLElement>(
          `[data-select-option-index="${index}"]`,
        );
        option?.scrollIntoView?.({block: 'nearest'});
      });
    }
  }

  protected optionId(index: number): string {
    return `${this.controlId}-option-${index}`;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Escape') {
      if (this.open()) {
        event.preventDefault();
        this.close(true);
      }
      return;
    }
    if (key === 'Tab') {
      this.close(false);
      return;
    }
    if (!this.open()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        this.show();
      }
      return;
    }
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      this.move(key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (key === 'Home' || key === 'End') {
      event.preventDefault();
      this.setActive(key === 'Home' ? this.firstEnabledIndex() : this.lastEnabledIndex(), true);
      return;
    }
    if (key === 'Enter' || (key === ' ' && !this.searchable())) {
      event.preventDefault();
      const option = this.visibleOptions()[this.activeIndex()];
      if (option) this.select(option);
      return;
    }
    if (key === 'Backspace' && this.multiple() && this.query().length === 0) {
      const last = this.selectedOptions().at(-1);
      if (last) {
        event.preventDefault();
        this.removeOption(last);
      }
    }
  }

  protected handleTriggerFocus(event: FocusEvent): void {
    this.handleFocus();
    this.triggerFocusVisible.set(
      event.target instanceof Element && event.target.matches(':focus-visible'),
    );
  }

  protected handleTriggerBlur(): void {
    this.triggerFocusVisible.set(false);
    if (!this.open()) this.handleBlur();
  }

  protected preserveSearchFocus(event: PointerEvent): void {
    if (!(event.target instanceof Element) || !event.target.closest('input')) {
      event.preventDefault();
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  protected handleDocumentPointer(event: PointerEvent): void {
    const target = event.target;
    if (
      this.open() &&
      target instanceof Node &&
      !this.popup()?.nativeElement.contains(target) &&
      !this.controlSurface()?.nativeElement.contains(target)
    ) {
      this.close(false);
    }
  }

  private show(): void {
    const popup = this.popup()?.nativeElement;
    const anchor = this.controlSurface()?.nativeElement;
    if (!popup || !anchor || this.open()) return;

    for (const instance of ErpSelect.openInstances) {
      if (instance !== this) instance.close(false, true);
    }
    ErpSelect.openInstances.add(this);
    this.clearCloseTimer();
    this.syncPopupWidth();
    this.controller?.destroy();
    this.controller = new AnchoredOverlayController({
      anchor,
      surface: popup,
      readGeometryInput: () => ({
        preferredPlacement: this.placement(),
        direction: getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr',
        anchorGap: 8,
        viewportInset: 12,
        allowedPlacements: ['bottom', 'top'],
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
      }),
      prepareGeometry: ({anchor: anchorRect, viewport}) => {
        const availableAbove = Math.max(
          0,
          anchorRect.top - viewport.top - 12 - 8,
        );
        const availableBelow = Math.max(
          0,
          viewport.bottom - anchorRect.bottom - 12 - 8,
        );
        const maxBlockSize = `${Math.max(availableAbove, availableBelow)}px`;
        if (popup.style.maxBlockSize !== maxBlockSize) {
          popup.style.maxBlockSize = maxBlockSize;
        }
      },
      measureSurface: () => ({width: popup.offsetWidth, height: popup.offsetHeight}),
      applyGeometry: (result) => this.applyGeometry(result),
    });
    if (!this.controller.show()) return;
    this.attachWidthSync();
    this.popupPhase.set('entering');
    this.activeIndex.set(this.firstEnabledIndex());
    this.handleFocus();
    this.opened.emit();
    queueMicrotask(() => {
      if (this.popupPhase() !== 'entering') return;
      this.popupPhase.set('open');
      if (this.searchable()) this.searchEditor()?.focusEditor();
    });
  }

  private close(restoreFocus: boolean, immediate = false): void {
    if (this.popupPhase() === 'closed') return;
    if (this.popupPhase() === 'leaving' && !immediate) return;
    this.clearCloseTimer();
    this.query.set('');
    this.searchChange.emit('');
    ErpSelect.openInstances.delete(this);

    const finish = () => {
      this.detachWidthSync();
      this.controller?.hide();
      this.popupPhase.set('closed');
      this.resolvedPlacement.set(null);
      this.handleBlur();
      this.closed.emit();
      if (restoreFocus) this.triggerButton()?.focus();
    };

    if (immediate || this.reducedMotion()) {
      finish();
      return;
    }
    this.popupPhase.set('leaving');
    this.closeTimer = setTimeout(finish, 200);
  }

  private commitSelection(value: ErpSelectValue): boolean {
    if (!this.commitUserValue(value)) return false;
    this.selectionChange.emit(this.selectedOptionsFor(value));
    return true;
  }

  private selectedOptionsFor(value: ErpSelectValue): readonly ErpSelectOption[] {
    const selected = new Set(
      Array.isArray(value) ? value : typeof value === 'string' ? [value] : [],
    );
    return this.options().filter((option) => selected.has(option.value));
  }

  private defaultSearchMatch(option: ErpSelectOption, query: string): boolean {
    return [
      option.label,
      option.value,
      option.description ?? '',
      option.meta ?? '',
      ...(option.keywords ?? []),
    ].some((candidate) => candidate.toLocaleLowerCase().includes(query));
  }

  private move(delta: number): void {
    const options = this.visibleOptions();
    if (options.length === 0) return;
    const origin = this.activeIndex();
    for (const step of options.keys()) {
      const index =
        (origin + delta * (step + 1) + options.length * 2) % options.length;
      if (!options[index].disabled) {
        this.setActive(index, true);
        return;
      }
    }
  }

  private firstEnabledIndex(): number {
    return this.visibleOptions().findIndex((option) => !option.disabled);
  }

  private lastEnabledIndex(): number {
    return this.visibleOptions().map((option) => !option.disabled).lastIndexOf(true);
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    const popup = this.popup()?.nativeElement;
    if (!popup) return;
    popup.style.left = `${result.x}px`;
    popup.style.top = `${result.y}px`;
    popup.style.transformOrigin = result.placement === 'top' ? 'center bottom' : 'center top';
    this.resolvedPlacement.set(result.placement);
  }

  private readonly syncPopupWidth = (): void => {
    const popup = this.popup()?.nativeElement;
    const control = this.controlSurface()?.nativeElement;
    if (!popup || !control) return;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const availableWidth = Math.max(0, viewportWidth - 24);
    popup.style.inlineSize = `${Math.min(control.getBoundingClientRect().width, availableWidth)}px`;
    this.controller?.requestPosition();
  };

  private attachWidthSync(): void {
    this.detachWidthSync();
    window.addEventListener('resize', this.syncPopupWidth);
    window.visualViewport?.addEventListener('resize', this.syncPopupWidth);
    const control = this.controlSurface()?.nativeElement;
    if (control && typeof ResizeObserver !== 'undefined') {
      this.widthObserver = new ResizeObserver(this.syncPopupWidth);
      this.widthObserver.observe(control);
    }
  }

  private detachWidthSync(): void {
    window.removeEventListener('resize', this.syncPopupWidth);
    window.visualViewport?.removeEventListener('resize', this.syncPopupWidth);
    this.widthObserver?.disconnect();
    this.widthObserver = null;
  }

  private clearCloseTimer(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  private reducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  private triggerButton(): HTMLButtonElement | null {
    return this.trigger()?.nativeElement.querySelector('button') ?? null;
  }
}
