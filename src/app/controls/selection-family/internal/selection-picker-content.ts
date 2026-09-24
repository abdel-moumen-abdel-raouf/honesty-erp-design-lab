import {FormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal} from '@angular/core';
import {ErpButton} from '../../button/button';
import {ERP_ICON_NAMES, ErpIconName} from '../../../primitives/icon/icon-contracts';
import {ErpGrid} from '../../../primitives/grid/grid';
import {ErpInline} from '../../../primitives/inline/inline';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpText} from '../../../primitives/text/text';
import {ErpTextBox} from '../../text-box/text-box';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../../shared/overlay/overlay-tokens';
import {ErpOverlayRef} from '../../../shared/overlay/overlay-ref';
import {ErpItemPickerOption, ErpSelectionPickerData} from '../selection-contracts';
import {colorToHex, normalizeHexColor} from '../selection-utils';

const COLOR_PRESETS = [
  {id: 'primary', label: 'Primary'},
  {id: 'secondary', label: 'Secondary'},
  {id: 'accent', label: 'Accent'},
  {id: 'success', label: 'Success'},
  {id: 'warning', label: 'Warning'},
  {id: 'danger', label: 'Danger'},
  {id: 'info', label: 'Info'},
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-selection-picker-content',
  imports: [ErpButton, ErpGrid, ErpInline, ErpStack, ErpText, ErpTextBox, FormsModule],
  templateUrl: './selection-picker-content.html',
  styleUrl: './selection-picker-content.scss',
  host: {'[attr.data-selection-picker-mode]': 'data.mode'},
})
export class ErpSelectionPickerContent {
  readonly data = inject(ERP_OVERLAY_DATA) as ErpSelectionPickerData;
  private readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<string | null>;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly query = signal(this.data.query);
  protected readonly staged = signal<string | null>(this.data.value);
  protected readonly activeIndex = signal(0);
  protected readonly colorPresets = COLOR_PRESETS;
  protected readonly filteredIcons = computed(() => {
    const query = this.query().trim().toLowerCase();
    return ERP_ICON_NAMES.filter((name) => name.includes(query));
  });
  protected readonly filteredItems = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.data.items.filter((item) =>
      !query || item.label.toLocaleLowerCase().includes(query) || item.value.toLocaleLowerCase().includes(query),
    );
  });

  protected updateQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected selectColor(value: string): void {
    this.staged.set(normalizeHexColor(value));
  }

  protected selectPreset(id: string): void {
    const value = getComputedStyle(this.host.nativeElement)
      .getPropertyValue(`--honesty-selection-picker-swatch-${id}`)
      .trim();
    const normalized = colorToHex(value);
    if (normalized) this.staged.set(normalized);
  }

  protected selectIcon(value: ErpIconName): void {
    this.staged.set(value);
  }

  protected selectItem(item: ErpItemPickerOption): void {
    if (!item.disabled) this.staged.set(item.value);
  }

  protected handleListKeydown(event: KeyboardEvent): void {
    const options = this.currentOptions();
    if (options.length === 0) return;
    const last = options.length - 1;
    const nextByKey: Record<string, number> = {
      ArrowDown: Math.min(last, this.activeIndex() + 1),
      ArrowRight: Math.min(last, this.activeIndex() + 1),
      ArrowUp: Math.max(0, this.activeIndex() - 1),
      ArrowLeft: Math.max(0, this.activeIndex() - 1),
      Home: 0,
      End: last,
    };
    if (event.key in nextByKey) {
      event.preventDefault();
      this.activeIndex.set(nextByKey[event.key]);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const value = options[this.activeIndex()];
      if (this.data.mode === 'icon') this.selectIcon(value as ErpIconName);
      else this.selectItem(value as ErpItemPickerOption);
    }
  }

  protected clear(): void { this.staged.set(null); }
  protected cancel(): void { this.ref.dismiss('cancel'); }
  protected confirm(): void { this.ref.close(this.staged()); }

  private currentOptions(): readonly (ErpIconName | ErpItemPickerOption)[] {
    return this.data.mode === 'icon' ? this.filteredIcons() : this.filteredItems();
  }
}
