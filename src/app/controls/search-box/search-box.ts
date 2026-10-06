import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {
  AnchoredOverlayGeometryResult,
  AnchoredOverlayPhysicalPlacement,
} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpOverlayAnimation, ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpInputValidationIssue} from '../input-family/input-contracts';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {ErpSelectionTile} from '../selection-family/internal/selection-tile';
import {
  createSelectionOverlayFooter,
  ERP_SELECTION_DEFAULT_ACTION_LABELS,
  ErpItemPickerOption,
  ErpSelectionPickerData,
} from '../selection-family/selection-contracts';

let nextSearchBoxId = 0;
type ErpSearchBoxPopupPhase = 'closed' | 'entering' | 'open' | 'leaving';

export type ErpSearchBoxMode = 'modal' | 'dropdown' | 'inline';
export type ErpSearchBoxPresentation = 'field' | 'select-panel';

export type ErpSearchBoxOption = ErpItemPickerOption;

const openSearchBoxes: ErpSearchBox[] = [];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-search-box',
  imports: [
    ErpFieldFrame,
    ErpFieldTrigger,
    ErpIcon,
    ErpIconButton,
    ErpSelectionTile,
    ErpText,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpSearchBox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpSearchBox),
      multi: true,
    },
  ],
  templateUrl: './search-box.html',
  styleUrls: [
    './search-box.scss',
    './search-box-select-panel.scss',
    './search-box-popup.scss',
    './search-box-popup-facets.scss',
  ],
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-search-box-mode]': 'mode()',
    '[attr.data-search-box-popup-open]': 'popupOpen()',
    '[attr.data-search-box-modal-open]': 'modalOpen()',
    '[attr.data-search-box-popup-phase]': 'popupPhase()',
    '[attr.data-search-box-animation]': 'activeAnimation()',
    '[attr.data-search-box-resolved-placement]': 'resolvedPlacement()',
    '[attr.data-search-box-presentation]': 'presentation()',
  },
})
export class ErpSearchBox extends ErpFieldBase<string> implements OnDestroy {
  readonly mode = input<ErpSearchBoxMode>('dropdown');
  readonly presentation = input<ErpSearchBoxPresentation>('field');
  readonly items = input<readonly ErpSearchBoxOption[]>([]);
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('off');
  readonly minLength = input<number | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly dismissOnOutside = input(true, {transform: booleanAttribute});
  readonly dismissOnEscape = input(true, {transform: booleanAttribute});
  readonly showDefaultSearchIcon = input(true, {
    transform: booleanAttribute,
  });
  readonly enterAnimation = input<ErpOverlayAnimation>('fade-scale');
  readonly exitAnimation = input<ErpOverlayAnimation>('fade-scale');
  readonly modalOverlayConfig =
    input<Partial<ErpOverlayBehaviorConfig> | null>(null);

  protected readonly controlId = `erp-search-box-${++nextSearchBoxId}`;
  protected readonly popupId = `${this.controlId}-popup`;
  protected readonly popupInputId = `${this.controlId}-popup-input`;
  protected readonly resultsId = `${this.controlId}-results`;
  protected readonly effectiveLeadingIcon = computed<ErpIconName | null>(
    () =>
      this.leadingIcon() ??
      (this.showDefaultSearchIcon() ? 'search' : null),
  );
  protected readonly selectedItem = computed(() =>
    this.items().find((item) => item.value === this.currentValue()) ?? null,
  );
  protected readonly triggerDisplayValue = computed(
    () =>
      this.selectedItem()?.label ??
      (this.mode() === 'inline' ? this.currentValue() : ''),
  );
  protected readonly clearActionVisible = computed(
    () =>
      this.clearable() &&
      this.currentValue().length > 0 &&
      this.fieldConfigurationState() === 'ready' &&
      !this.fieldEffectiveDisabled() &&
      !this.readonly(),
  );
  protected readonly popupPhase = signal<ErpSearchBoxPopupPhase>('closed');
  protected readonly popupOpen = computed(
    () =>
      this.popupPhase() === 'entering' ||
      this.popupPhase() === 'open',
  );
  protected readonly modalOpen = signal(false);
  protected readonly activeAnimation = computed(() =>
    this.popupPhase() === 'leaving'
      ? this.exitAnimation()
      : this.enterAnimation(),
  );
  protected readonly resolvedPlacement =
    signal<AnchoredOverlayPhysicalPlacement | null>(null);
  protected readonly query = signal('');
  protected readonly activeResultIndex = signal<number | null>(null);
  protected readonly filteredItems = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.items().filter(
      (item) =>
        !query ||
        item.label.toLocaleLowerCase().includes(query) ||
        item.value.toLocaleLowerCase().includes(query),
    );
  });

  private readonly popupAnchor =
    viewChild('popupAnchor', {read: ElementRef<HTMLElement>});
  private readonly nativeInput =
    viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  private readonly popupSurface =
    viewChild<ElementRef<HTMLElement>>('popupSurface');
  private readonly resultTiles = viewChildren(ErpSelectionTile);
  private readonly overlays = inject(ErpOverlayManager);
  private controller: AnchoredOverlayController | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private activeModalRef: ErpOverlayRef<string | null> | null = null;
  private suppressNextFocusOpen = false;

  constructor() {
    super('');

    effect(() => {
      const mode = this.mode();
      const disabled = this.fieldEffectiveDisabled();

      if (mode !== 'dropdown' || disabled) {
        this.closeDropdown(false);
      }

      if ((mode !== 'modal' || disabled) && this.activeModalRef) {
        this.activeModalRef.dismiss('mode-change');
      }
    });
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    this.removeFromOpenStack();
    this.detachDismissalListeners();
    this.controller?.destroy();
    this.activeModalRef?.dismiss('destroyed');
  }

  focusEditor(): void {
    this.nativeInput()?.nativeElement.focus();
  }

  protected override normalizeValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }

  protected override classifyPresence(value: unknown) {
    if (this.mode() !== 'inline' && value === '') {
      return 'no-selection' as const;
    }

    return super.classifyPresence(value);
  }

  protected override validateCandidate(
    value: unknown,
  ): readonly ErpInputValidationIssue[] {
    if (this.mode() !== 'inline') {
      return [];
    }

    const source = String(value ?? '');
    const issues: ErpInputValidationIssue[] = [];

    if (this.minLength() !== null && source.length < (this.minLength() as number) && source.length > 0) {
      issues.push(this.validationIssue(
        'search.min-length',
        `يجب ألا يقل طول نص البحث عن ${this.minLength()} حرفًا.`,
        'constraint',
      ));
    }

    if (this.maxLength() !== null && source.length > (this.maxLength() as number)) {
      issues.push(this.validationIssue(
        'search.max-length',
        `يجب ألا يزيد طول نص البحث عن ${this.maxLength()} حرفًا.`,
        'constraint',
      ));
    }

    return issues;
  }

  protected handleInlineInput(event: Event): void {
    if (!this.readonly()) {
      this.commitUserValue((event.target as HTMLInputElement).value);
    }
  }

  protected handleQueryInput(event: Event): void {
    if (this.readonly()) {
      return;
    }

    this.query.set((event.target as HTMLInputElement).value);
    this.activeResultIndex.set(null);
  }

  protected handleTriggerFocus(): void {
    this.handleFocus();

    if (this.suppressNextFocusOpen) {
      this.suppressNextFocusOpen = false;
      return;
    }

    if (this.mode() === 'dropdown') {
      this.openDropdown();
    } else if (this.mode() === 'modal') {
      this.openModal();
    }
  }

  protected handleTriggerBlur(): void {
    if (this.mode() === 'inline') {
      this.handleBlur();
    }
  }

  protected handlePopupInputFocus(): void {
    this.handleFocus();
  }

  protected handlePopupInputBlur(): void {
    // Dropdown focus remains owned by the SearchBox until the popup closes.
  }

  protected handleClear(): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }

    this.query.set('');
    const editor = this.nativeInput()?.nativeElement;
    if ((this.mode() === 'inline' || this.popupOpen()) && editor) {
      editor.value = '';
      editor.focus();
      this.handleFocus();
      return;
    }

    this.anchorElement()?.focus();
  }

  protected handleTriggerActivation(): void {
    if (this.mode() === 'dropdown') {
      this.openDropdown();
    } else if (this.mode() === 'modal') {
      this.openModal();
    }
  }

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter'
    ) {
      event.preventDefault();
      this.handleTriggerActivation();
    }
  }

  protected handlePopupInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusResult(0, 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusResult(this.filteredItems().length - 1, -1);
      return;
    }

    if (event.key === 'Enter') {
      const index = this.activeResultIndex();
      const item = index === null ? null : this.filteredItems()[index];
      if (item && !item.disabled) {
        event.preventDefault();
        this.selectResult(item);
      }
    }
  }

  protected handleResultKeydown(event: KeyboardEvent, index: number): void {
    const last = this.filteredItems().length - 1;
    const nextByKey: Readonly<
      Record<string, Readonly<{index: number; direction: 1 | -1}>>
    > = {
      ArrowDown: {index: Math.min(last, index + 1), direction: 1},
      ArrowUp: {index: Math.max(0, index - 1), direction: -1},
      Home: {index: 0, direction: 1},
      End: {index: last, direction: -1},
    };

    if (event.key in nextByKey) {
      event.preventDefault();
      const next = nextByKey[event.key];
      this.focusResult(next.index, next.direction);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown(true);
    }
  }

  protected setActiveResultIndex(index: number): void {
    this.activeResultIndex.set(index);
  }

  protected selectResult(item: ErpSearchBoxOption): void {
    if (
      this.readonly() ||
      item.disabled ||
      !this.commitUserValue(item.value)
    ) {
      return;
    }

    this.query.set('');
    this.activeResultIndex.set(null);
    this.closeDropdown(true);
  }

  protected closeDropdownFromAction(): void {
    this.closeDropdown(true);
  }

  private openDropdown(): boolean {
    if (
      this.mode() !== 'dropdown' ||
      this.fieldEffectiveDisabled() ||
      this.popupPhase() === 'leaving'
    ) {
      return false;
    }

    if (this.popupOpen()) {
      this.controller?.requestPosition();
      return true;
    }

    const trigger = this.anchorElement();
    const surface = this.popupSurface()?.nativeElement;
    if (!trigger || !surface) {
      return false;
    }

    const anchor =
      trigger.closest<HTMLElement>('.field-frame__control') ?? trigger;

    this.query.set('');
    this.activeResultIndex.set(null);
    this.updateTriggerInlineSize(anchor, surface);
    this.controller?.destroy();
    this.controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => {
        this.updateTriggerInlineSize(anchor, surface);
        return {
          preferredPlacement: 'bottom',
          direction:
            getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr',
          anchorGap: this.cssLengthPx(
            surface,
            '--honesty-search-box-popup-anchor-gap',
          ),
          viewportInset: this.cssLengthPx(
            surface,
            '--honesty-search-box-popup-viewport-inset',
          ),
          showArrow: false,
          arrowWidth: 0,
          arrowHeight: 0,
          arrowSafeInset: 0,
        };
      },
      applyGeometry: (result) => this.applyGeometry(result),
    });

    this.popupPhase.set('entering');
    surface.dataset['searchPopupPhase'] = 'entering';
    if (!this.controller.show()) {
      this.popupPhase.set('closed');
      delete surface.dataset['searchPopupPhase'];
      return false;
    }

    this.addToOpenStack();
    this.attachDismissalListeners();
    this.handleFocus();
    requestAnimationFrame(() => {
      if (this.popupPhase() !== 'entering') {
        return;
      }

      this.popupPhase.set('open');
      surface.dataset['searchPopupPhase'] = 'open';
      this.nativeInput()?.nativeElement.focus();
    });
    return true;
  }

  private openModal(): boolean {
    if (
      this.mode() !== 'modal' ||
      this.fieldEffectiveDisabled() ||
      this.activeModalRef
    ) {
      return false;
    }

    const options: readonly ErpItemPickerOption[] = this.items();
    const ref = this.overlays.open<
      ErpSelectionPickerContent,
      ErpSelectionPickerData,
      string | null
    >(ErpSelectionPickerContent, {
      frame: {
        header: {
          title: this.trimmedLabel(),
          subtitle: 'ابحث واختر سجلًا',
          icon: 'search',
        },
        footer: createSelectionOverlayFooter(
          'combo',
          true,
          ERP_SELECTION_DEFAULT_ACTION_LABELS,
        ),
      },
      dismissOnEscape: true,
      dismissOnBackdrop: true,
      ...(this.modalOverlayConfig() ?? {}),
      restoreFocus: false,
      initialFocus: '[data-selection-search] input',
      data: {
        mode: 'combo',
        value: this.currentValue() || null,
        colorMode: 'system',
        items: options,
        itemsProvider: () => this.items(),
        query: '',
        searchable: true,
        clearable: true,
        actionLabels: ERP_SELECTION_DEFAULT_ACTION_LABELS,
      },
    });

    this.activeModalRef = ref;
    this.modalOpen.set(true);
    this.handleFocus();

    void ref.afterClosed.then((outcome) => {
      this.activeModalRef = null;
      this.modalOpen.set(false);
      if (
        !this.readonly() &&
        outcome.type === 'closed' &&
        typeof outcome.result === 'string'
      ) {
        this.commitUserValue(outcome.result);
      }

      this.handleBlur();
      const anchor = this.anchorElement();
      if (anchor?.isConnected) {
        this.suppressNextFocusOpen = true;
        queueMicrotask(() => anchor.focus());
      }
    });

    return true;
  }

  private closeDropdown(restoreFocus: boolean): void {
    if (
      this.popupPhase() === 'closed' ||
      this.popupPhase() === 'leaving'
    ) {
      return;
    }

    const surface = this.popupSurface()?.nativeElement;
    this.popupPhase.set('leaving');
    if (surface) {
      surface.dataset['searchPopupPhase'] = 'leaving';
      surface.inert = true;
      surface.style.pointerEvents = 'none';
      surface.setAttribute('aria-hidden', 'true');
    }

    // Release the native top layer immediately. Exit-phase bookkeeping must
    // never retain an invisible hit target above subsequent form controls.
    this.controller?.hide();
    this.removeFromOpenStack();
    this.detachDismissalListeners();

    if (restoreFocus) {
      this.restoreTriggerFocus();
    }

    this.clearCloseTimer();
    const duration = surface
      ? this.transitionDurationMs(surface)
      : 0;
    this.closeTimer = setTimeout(
      () => this.finishClose(),
      duration,
    );
  }

  private finishClose(): void {
    if (this.popupPhase() !== 'leaving') {
      return;
    }

    this.clearCloseTimer();
    this.popupPhase.set('closed');
    this.resolvedPlacement.set(null);
    this.query.set('');
    this.activeResultIndex.set(null);
    this.handleBlur();
    const surface = this.popupSurface()?.nativeElement;
    if (surface) {
      surface.inert = false;
      surface.style.pointerEvents = '';
      surface.removeAttribute('aria-hidden');
      delete surface.dataset['searchPopupPhase'];
    }
  }

  private restoreTriggerFocus(): void {
    const anchor = this.anchorElement();
    if (!anchor?.isConnected) {
      return;
    }

    this.suppressNextFocusOpen = true;
    anchor.focus();
  }

  private readonly handleDocumentPointerDown = (event: Event): void => {
    if (
      !this.dismissOnOutside() ||
      openSearchBoxes.at(-1) !== this
    ) {
      return;
    }

    const target = event.target as Node;
    if (
      !this.popupAnchor()?.nativeElement.contains(target) &&
      !this.popupSurface()?.nativeElement.contains(target)
    ) {
      this.closeDropdown(false);
    }
  };

  private readonly handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (
      event.key !== 'Escape' ||
      !this.dismissOnEscape() ||
      openSearchBoxes.at(-1) !== this
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.closeDropdown(true);
  };

  private focusResult(index: number, direction: 1 | -1): void {
    const items = this.filteredItems();
    if (items.length === 0) {
      return;
    }

    let candidate = Math.min(Math.max(index, 0), items.length - 1);

    while (candidate >= 0 && candidate < items.length) {
      if (!items[candidate].disabled) {
        this.activeResultIndex.set(candidate);
        this.resultTiles()[candidate]?.focus();
        return;
      }

      candidate += direction;
    }
  }

  private addToOpenStack(): void {
    this.removeFromOpenStack();
    openSearchBoxes.push(this);
  }

  private removeFromOpenStack(): void {
    const index = openSearchBoxes.indexOf(this);
    if (index >= 0) {
      openSearchBoxes.splice(index, 1);
    }
  }

  private attachDismissalListeners(): void {
    document.addEventListener(
      'pointerdown',
      this.handleDocumentPointerDown,
      true,
    );
    document.addEventListener(
      'keydown',
      this.handleDocumentKeyDown,
      true,
    );
  }

  private detachDismissalListeners(): void {
    document.removeEventListener(
      'pointerdown',
      this.handleDocumentPointerDown,
      true,
    );
    document.removeEventListener(
      'keydown',
      this.handleDocumentKeyDown,
      true,
    );
  }

  private anchorElement(): HTMLButtonElement | null {
    return (
      this.popupAnchor()?.nativeElement.querySelector('button') ?? null
    );
  }

  private updateTriggerInlineSize(
    anchor: HTMLElement,
    surface: HTMLElement,
  ): void {
    surface.style.setProperty(
      '--_honesty-search-box-popup-trigger-inline-size',
      `${anchor.getBoundingClientRect().width}px`,
    );
  }

  private cssLengthPx(surface: HTMLElement, name: string): number {
    const surfaceStyle = getComputedStyle(surface);
    const raw = surfaceStyle.getPropertyValue(name).trim();
    const numeric = Number.parseFloat(raw);
    if (!Number.isFinite(numeric)) {
      return 0;
    }
    if (raw.endsWith('rem')) {
      const rootSize = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      return numeric * (Number.isFinite(rootSize) ? rootSize : 16);
    }
    return numeric;
  }

  private transitionDurationMs(surface: HTMLElement): number {
    const style = getComputedStyle(surface);
    const durations = style.transitionDuration.split(',');
    const delays = style.transitionDelay.split(',');
    return durations.reduce((maximum, duration, index) => {
      const delay = delays[index] ?? delays.at(-1) ?? '0s';
      return Math.max(
        maximum,
        this.timeToMs(duration) + this.timeToMs(delay),
      );
    }, 0);
  }

  private timeToMs(value: string): number {
    const normalized = value.trim();
    const numeric = Number.parseFloat(normalized);
    if (!Number.isFinite(numeric)) {
      return 0;
    }
    return normalized.endsWith('ms') ? numeric : numeric * 1000;
  }

  private applyGeometry(result: AnchoredOverlayGeometryResult): void {
    const surface = this.popupSurface()?.nativeElement;
    if (!surface) {
      return;
    }

    surface.style.left = `${result.x}px`;
    surface.style.top = `${result.y}px`;
    surface.style.transformOrigin =
      result.placement === 'top' ? 'center bottom' : 'center top';
    this.resolvedPlacement.set(result.placement);
  }

  private clearCloseTimer(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
