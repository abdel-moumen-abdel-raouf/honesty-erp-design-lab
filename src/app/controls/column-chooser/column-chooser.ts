import {
  AfterViewInit,
  AfterViewChecked,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpButton} from '../button/button';
import {ErpCheckBox} from '../check-box/check-box';
import {ErpDataColumn} from '../data-table/data-table-contracts';
import {ErpSelect} from '../select/select';
import {ErpSelectOption, ErpSelectValue} from '../select/select-contracts';
import {ErpText} from '../../primitives/text/text';
import {AnchoredOverlayController} from '../../shared/anchored-overlay/anchored-overlay-controller';

let nextColumnChooserId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-column-chooser',
  imports: [ErpButton, ErpCheckBox, ErpSelect, ErpText, FormsModule],
  templateUrl: './column-chooser.html',
  styleUrl: './column-chooser.scss',
  host: {
    '[attr.data-column-chooser-presentation]': 'presentation()',
    '[attr.data-column-chooser-open]': 'open()',
  },
})
export class ErpColumnChooser implements AfterViewInit, AfterViewChecked, OnDestroy {
  readonly columns = input.required<readonly ErpDataColumn[]>();
  readonly visibleKeys = input<readonly string[]>([]);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly presentation = input<'default' | 'table-reference'>('default');
  readonly visibilityChange = output<readonly string[]>();
  readonly resetRequested = output<void>();

  protected readonly open = signal(false);
  protected readonly surfaceId = `erp-column-chooser-${++nextColumnChooserId}`;

  private readonly trigger = viewChild('referenceTrigger', {
    read: ElementRef<HTMLElement>,
  });
  private readonly surface = viewChild('referenceSurface', {
    read: ElementRef<HTMLElement>,
  });
  private controller: AnchoredOverlayController | null = null;
  private controllerAnchor: HTMLElement | null = null;
  private controllerSurface: HTMLElement | null = null;
  private readonly handleDocumentPointer = (event: PointerEvent) => {
    if (!this.open()) return;
    const target = event.target as Node | null;
    if (this.trigger()?.nativeElement.contains(target) || this.surface()?.nativeElement.contains(target)) return;
    this.close(false);
  };
  private readonly handleDocumentKey = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !this.open()) return;
    event.preventDefault();
    this.close(true);
  };

  protected readonly options = computed<readonly ErpSelectOption[]>(() =>
    this.columns().map((column) => ({
      value: column.key,
      label: column.label,
      disabled: column.required === true || column.hideable === false,
    })),
  );
  protected readonly effectiveVisible = computed(() => {
    const requested = new Set(this.visibleKeys());
    for (const column of this.columns()) {
      if (column.required || column.hideable === false) requested.add(column.key);
    }
    return this.columns().filter((column) => requested.has(column.key)).map((column) => column.key);
  });

  ngAfterViewInit(): void {
    document.addEventListener('pointerdown', this.handleDocumentPointer, true);
    document.addEventListener('keydown', this.handleDocumentKey);
    this.ensureReferenceController();
  }

  ngAfterViewChecked(): void {
    this.ensureReferenceController();
  }

  private ensureReferenceController(): void {
    const anchor = this.trigger()?.nativeElement;
    const surface = this.surface()?.nativeElement;
    if (!anchor || !surface) {
      this.controller?.destroy();
      this.controller = null;
      this.controllerAnchor = null;
      this.controllerSurface = null;
      if (this.open()) this.open.set(false);
      return;
    }
    if (anchor === this.controllerAnchor && surface === this.controllerSurface) return;

    this.controller?.destroy();
    this.controllerAnchor = anchor;
    this.controllerSurface = surface;

    this.controller = new AnchoredOverlayController({
      anchor,
      surface,
      readGeometryInput: () => ({
        preferredPlacement: 'bottom',
        direction: getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr',
        anchorGap: 6,
        viewportInset: 8,
        showArrow: false,
        arrowWidth: 0,
        arrowHeight: 0,
        arrowSafeInset: 0,
      }),
      applyGeometry: ({x, y, placement}) => {
        surface.style.left = `${x}px`;
        surface.style.top = `${y}px`;
        surface.dataset['placement'] = placement;
      },
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('pointerdown', this.handleDocumentPointer, true);
    document.removeEventListener('keydown', this.handleDocumentKey);
    this.controller?.destroy();
    this.controller = null;
  }

  protected updateVisible(value: ErpSelectValue): void {
    if (this.disabled()) return;
    const requested = new Set(Array.isArray(value) ? value : value === null ? [] : [value]);
    const normalized = this.columns()
      .filter((column) => column.required || column.hideable === false || requested.has(column.key))
      .map((column) => column.key);
    this.visibilityChange.emit(normalized);
  }

  protected isVisible(key: string): boolean {
    return this.effectiveVisible().includes(key);
  }

  protected toggleColumn(column: ErpDataColumn, checked: boolean): void {
    if (this.disabled() || column.required || column.hideable === false) return;
    const requested = new Set(this.effectiveVisible());
    if (checked) requested.add(column.key);
    else requested.delete(column.key);
    this.updateVisible([...requested]);
  }

  protected toggleReference(): void {
    if (this.disabled()) return;
    if (this.open()) this.close(false);
    else if (this.controller?.show()) this.open.set(true);
  }

  private close(restoreFocus: boolean): void {
    this.controller?.hide();
    this.open.set(false);
    if (restoreFocus) {
      const trigger = this.trigger()?.nativeElement as HTMLElement | undefined;
      (trigger?.querySelector('button') as HTMLButtonElement | null)?.focus();
    }
  }
}
