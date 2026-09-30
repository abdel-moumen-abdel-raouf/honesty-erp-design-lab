import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  viewChildren,
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
export class ErpSelectionPickerContent implements OnDestroy {
  readonly data = inject(ERP_OVERLAY_DATA) as ErpSelectionPickerData;
  private readonly ref = inject(ERP_OVERLAY_REF) as ErpOverlayRef<ErpSelectionPickerValue>;
  private readonly frameActionCleanup = [
    this.ref.registerFrameAction('confirm', () => this.confirm()),
    this.ref.registerFrameAction('cancel', () => this.cancel()),
    ...(this.data.clearable
      ? [this.ref.registerFrameAction('clear-selected', () => this.clear())]
      : []),
  ];
  private readonly optionTiles = viewChildren(ErpSelectionTile);

  protected readonly query = signal(this.data.query);
  protected readonly staged = signal<ErpSelectionPickerValue>(this.data.value);
  protected readonly activeIndex = signal<number | null>(null);
  protected readonly confirmEnabled = computed(() => {
    const staged = this.staged();

    if (staged === null) {
      return false;
    }

    if (this.data.mode === 'color') {
      return (
        typeof staged === 'object' &&
        staged !== null &&
        staged.mode === this.data.colorMode
      );
    }

    if (this.data.mode === 'icon') {
      return typeof staged === 'string' &&
        ERP_ICON_NAMES.includes(staged as ErpIconName);
    }

    return typeof staged === 'string' &&
      this.data.items.some(
        (item) => item.value === staged && !item.disabled,
      );
  });
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

  constructor() {
    effect(() => {
      this.ref.updateFrameActionState('confirm', {
        disabled: !this.confirmEnabled(),
      });

      if (this.data.clearable) {
        this.ref.updateFrameActionState('clear-selected', {
          disabled: this.staged() === null,
        });
      }
    });
  }

  ngOnDestroy(): void {
    for (const cleanup of this.frameActionCleanup) {
      cleanup();
    }
  }

  protected updateQuery(value: string): void {
    this.query.set(value);
    this.activeIndex.set(null);
  }

  protected selectSystemColor(token: ErpSystemColorToken): void {
    if (this.data.colorMode === 'system') {
      this.staged.set({mode: 'system', token});
    }
  }

  protected selectFreeColor(value: string): void {
    if (this.data.colorMode !== 'free') {
      return;
    }

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
    const current = this.activeIndex();
    const nextByKey: Record<string, number> = {
      ArrowDown: current === null ? 0 : Math.min(last, current + 1),
      ArrowRight: current === null ? 0 : Math.min(last, current + 1),
      ArrowUp: current === null ? last : Math.max(0, current - 1),
      ArrowLeft: current === null ? last : Math.max(0, current - 1),
      Home: 0,
      End: last,
    };
    if (event.key in nextByKey) {
      event.preventDefault();
      const next = nextByKey[event.key];
      this.activeIndex.set(next);
      queueMicrotask(() => this.optionTiles()[next]?.focus());
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const index = this.activeIndex();
      if (index === null) return;
      const value = options[index];
      if (this.data.mode === 'icon') this.selectIcon(value as ErpIconName);
      else this.selectItem(value as ErpItemPickerOption);
    }
  }

  protected setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }

  protected clear(): void {
    this.staged.set(null);
  }

  protected cancel(): void {
    this.ref.dismiss('cancel');
  }

  protected confirm(): void {
    if (!this.confirmEnabled()) {
      return;
    }

    this.ref.close(this.staged());
  }

  private currentOptions(): readonly (ErpIconName | ErpItemPickerOption)[] {
    return this.data.mode === 'icon'
      ? this.filteredIcons()
      : this.filteredItems();
  }
}
