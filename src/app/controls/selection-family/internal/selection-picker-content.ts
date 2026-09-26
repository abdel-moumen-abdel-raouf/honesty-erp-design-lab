import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  ERP_SYSTEM_COLOR_FAMILIES,
  ERP_SYSTEM_COLOR_PALETTES,
  ERP_SYSTEM_COLOR_STEPS,
  ErpSystemColorToken,
} from '../../../foundation/colors/system-color-registry';
import {ERP_ICON_NAMES, ErpIconName} from '../../../primitives/icon/icon-contracts';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpInline} from '../../../primitives/inline/inline';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpText} from '../../../primitives/text/text';
import {ErpOverlayRef} from '../../../shared/overlay/overlay-ref';
import {
  ERP_OVERLAY_DATA,
  ERP_OVERLAY_REF,
} from '../../../shared/overlay/overlay-tokens';
import {ErpButton} from '../../button/button';
import {ErpTextBox} from '../../text-box/text-box';
import {ErpTooltip} from '../../tooltip/tooltip';
import {
  ErpColorPickerMode,
  ErpItemPickerOption,
  ErpSelectionPickerData,
  ErpSelectionPickerValue,
} from '../selection-contracts';
import {normalizeHexColor} from '../selection-utils';
import {ErpSelectionTile} from './selection-tile';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-selection-picker-content',
  imports: [
    ErpButton,
    ErpIcon,
    ErpInline,
    ErpSelectionTile,
    ErpStack,
    ErpText,
    ErpTextBox,
    ErpTooltip,
    FormsModule,
  ],
  templateUrl: './selection-picker-content.html',
  styleUrl: './selection-picker-content.scss',
  host: {'[attr.data-selection-picker-mode]': 'data.mode'},
})
export class ErpSelectionPickerContent {
  readonly data = inject(ERP_OVERLAY_DATA) as ErpSelectionPickerData;
  private readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<ErpSelectionPickerValue>;

  protected readonly query = signal(this.data.query);
  protected readonly staged = signal<ErpSelectionPickerValue>(this.data.value);
  protected readonly colorMode = signal<ErpColorPickerMode>(this.data.colorMode);
  protected readonly activeIndex = signal(0);
  protected readonly systemColorGroups = ERP_SYSTEM_COLOR_FAMILIES.map(
    (family) => ({
      family,
      colors: ERP_SYSTEM_COLOR_STEPS.map((step) => ({
        step,
        token: `${family}-${step}` as ErpSystemColorToken,
        value: ERP_SYSTEM_COLOR_PALETTES[family][step],
      })),
    }),
  );
  protected readonly freeColorValue = computed(() => {
    const value = this.staged();
    return typeof value === 'object' && value?.mode === 'free'
      ? value.value
      : '#000000';
  });
  protected readonly stagedColorIdentity = computed(() => {
    const value = this.staged();
    if (typeof value !== 'object' || value === null) return null;
    return value.mode === 'system' ? value.token : value.value;
  });
  protected readonly filteredIcons = computed(() => {
    const query = this.query().trim().toLowerCase();
    return ERP_ICON_NAMES.filter((name) => name.includes(query));
  });
  protected readonly filteredItems = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.data.items.filter((item) =>
      !query ||
      item.label.toLocaleLowerCase().includes(query) ||
      item.value.toLocaleLowerCase().includes(query),
    );
  });

  protected updateQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected setColorMode(mode: ErpColorPickerMode): void {
    this.colorMode.set(mode);
  }

  protected selectSystemColor(token: ErpSystemColorToken): void {
    this.staged.set({mode: 'system', token});
  }

  protected selectFreeColor(value: string): void {
    const normalized = normalizeHexColor(value);
    if (normalized !== null) {
      this.staged.set({mode: 'free', value: normalized});
    }
  }

  protected isSelectedSystemColor(token: ErpSystemColorToken): boolean {
    const value = this.staged();
    return (
      typeof value === 'object' &&
      value?.mode === 'system' &&
      value.token === token
    );
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

  protected clear(): void {
    this.staged.set(null);
  }

  protected cancel(): void {
    this.ref.dismiss('cancel');
  }

  protected confirm(): void {
    this.ref.close(this.staged());
  }

  private currentOptions(): readonly (ErpIconName | ErpItemPickerOption)[] {
    return this.data.mode === 'icon'
      ? this.filteredIcons()
      : this.filteredItems();
  }
}
