import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';
import {
  AnchoredOverlayGeometryResult,
  AnchoredOverlayPhysicalPlacement,
} from '../../shared/anchored-overlay/anchored-overlay-contracts';
import {ErpOverlayAnimation} from '../../shared/overlay/overlay-contracts';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';

let nextSearchBoxId = 0;
type ErpSearchBoxPopupPhase = 'closed' | 'entering' | 'open' | 'leaving';
const openSearchBoxes: ErpSearchBox[] = [];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-search-box',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpSearchBox),
      multi: true,
    },
  ],
  templateUrl: './search-box.html',
  styleUrls: [
    './search-box.scss',
    './search-box-popup.scss',
    './search-box-popup-facets.scss',
  ],
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-search-box-popup-mode]': 'popupMode()',
    '[attr.data-search-box-popup-open]': 'popupOpen()',
    '[attr.data-search-box-popup-phase]': 'popupPhase()',
    '[attr.data-search-box-animation]': 'activeAnimation()',
    '[attr.data-search-box-resolved-placement]': 'resolvedPlacement()',
  },
})
export class ErpSearchBox extends ErpFieldBase<string> implements OnDestroy {
  readonly placeholder = input<string | null>(null);
  readonly readonly = input(false, {transform: booleanAttribute});
  readonly autocomplete = input('off');
  readonly popupMode = input(true, {transform: booleanAttribute});
  readonly dismissOnOutside = input(true, {transform: booleanAttribute});
  readonly dismissOnEscape = input(true, {transform: booleanAttribute});
  readonly showDefaultSearchIcon = input(true, {
    transform: booleanAttribute,
  });
  readonly enterAnimation = input<ErpOverlayAnimation>('fade-scale');
  readonly exitAnimation = input<ErpOverlayAnimation>('fade-scale');

  protected readonly controlId =
    `erp-search-box-${++nextSearchBoxId}`;
  protected readonly popupId = `${this.controlId}-popup`;
  protected readonly popupInputId = `${this.controlId}-popup-input`;
  protected readonly effectiveLeadingIcon = computed<ErpIconName | null>(
    () =>
      this.leadingIcon() ??
      (this.showDefaultSearchIcon() ? 'search' : null),
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
  protected readonly activeAnimation = computed(() =>
    this.popupPhase() === 'leaving'
      ? this.exitAnimation()
      : this.enterAnimation(),
  );
  protected readonly resolvedPlacement =
    signal<AnchoredOverlayPhysicalPlacement | null>(null);

  private readonly popupAnchor =
    viewChild('popupAnchor', {read: ElementRef<HTMLElement>});
  private readonly nativeInput =
    viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  private readonly popupSurface =
    viewChild<ElementRef<HTMLElement>>('popupSurface');
  private controller: AnchoredOverlayController | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private restoreFocusAfterClose = false;

  constructor() {
    super('');

    effect(() => {
      if (!this.popupMode() || this.fieldEffectiveDisabled()) {
        this.closePopup(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    this.removeFromOpenStack();
    this.detachDismissalListeners();
    this.controller?.destroy();
  }

  protected override normalizeValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
  }

  protected handleInput(event: Event): void {
    if (!this.readonly()) {
      this.commitUserValue((event.target as HTMLInputElement).value);
    }
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    if (!this.popupMode()) {
      this.handleBlur();
    }
  }

  protected handleClear(): void {
    if (!this.clearActionVisible() || !this.commitUserValue('')) {
      return;
    }

    const focusTarget = this.popupOpen()
      ? this.nativeInput()?.nativeElement
      : this.anchorElement();
    if (!focusTarget) {
      return;
    }

    if (focusTarget instanceof HTMLInputElement) {
      focusTarget.value = '';
    }
    focusTarget.focus();
    this.handleFocus();
  }

  protected togglePopup(): void {
    if (this.popupOpen()) {
      this.closePopup(true);
      return;
    }

    this.openPopup();
  }

  protected handlePopupKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      this.openPopup();
    }
  }

  private openPopup(): boolean {
    if (
      !this.popupMode() ||
      this.fieldEffectiveDisabled() ||
      this.popupPhase() === 'leaving'
    ) {
      return false;
    }

    if (this.popupOpen()) {
      this.controller?.requestPosition();
      return true;
    }

    const anchor = this.anchorElement();
    const surface = this.popupSurface()?.nativeElement;
    if (!anchor || !surface) {
      return false;
    }

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

  private closePopup(restoreFocus: boolean): void {
    if (
      this.popupPhase() === 'closed' ||
      this.popupPhase() === 'leaving'
    ) {
      return;
    }

    const surface = this.popupSurface()?.nativeElement;
    this.restoreFocusAfterClose = restoreFocus;
    this.popupPhase.set('leaving');
    if (surface) {
      surface.dataset['searchPopupPhase'] = 'leaving';
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
    this.controller?.hide();
    this.removeFromOpenStack();
    this.detachDismissalListeners();
    this.popupPhase.set('closed');
    this.resolvedPlacement.set(null);
    this.handleBlur();
    const surface = this.popupSurface()?.nativeElement;
    if (surface) {
      delete surface.dataset['searchPopupPhase'];
    }
    if (this.restoreFocusAfterClose) {
      this.anchorElement()?.focus();
    }
    this.restoreFocusAfterClose = false;
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
      this.closePopup(false);
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
    this.closePopup(true);
  };

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
