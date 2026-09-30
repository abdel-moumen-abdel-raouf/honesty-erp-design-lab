import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpText} from '../../primitives/text/text';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpFieldTrigger} from '../input-family/internal/field-trigger';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {
  ERP_SELECTION_DEFAULT_ACTION_LABELS,
  createSelectionOverlayFooter,
  ErpColorPickerMode,
  ErpColorPickerValue,
  ErpSelectionPickerData,
} from '../selection-family/selection-contracts';
import {
  normalizeColorPickerValue,
  resolveColorPickerValue,
} from '../selection-family/selection-utils';

let nextColorPickerId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-color-picker',
  imports: [ErpFieldFrame, ErpFieldTrigger, ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpColorPicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpColorPicker),
      multi: true,
    },
  ],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
  host: {
    '[attr.data-field-configuration-state]': 'fieldConfigurationState()',
    '[attr.data-color-picker-mode]': 'mode()',
    '[attr.data-color-picker-value]': 'valueIdentity()',
  },
})
export class ErpColorPicker extends ErpFieldBase<ErpColorPickerValue | null> {
  readonly mode = input<ErpColorPickerMode>('system');
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('chevron-down');
  protected readonly controlId = `erp-color-picker-${++nextColorPickerId}`;
  protected readonly displayValue = computed(
    () => this.valueIdentity() ?? ERP_SELECTION_DEFAULT_ACTION_LABELS.noSelection,
  );
  protected readonly resolvedColor = computed(() =>
    resolveColorPickerValue(this.currentValue()),
  );
  protected readonly valueIdentity = computed(() => {
    const value = this.currentValue();
    return value === null
      ? null
      : value.mode === 'system'
        ? value.token
        : value.value;
  });
  private readonly overlays = inject(ErpOverlayManager);
  private activeRef: ErpOverlayRef<ErpColorPickerValue | null> | null = null;

  constructor() {
    super(null);
  }

  protected override normalizeValue(value: unknown): ErpColorPickerValue | null {
    const normalized = normalizeColorPickerValue(value);
    return normalized?.mode === this.mode() ? normalized : null;
  }

  protected override classifyPresence(value: unknown) {
    return value === null ? 'no-selection' as const : null;
  }

  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<
      ErpSelectionPickerContent,
      ErpSelectionPickerData,
      ErpColorPickerValue | null
    >(ErpSelectionPickerContent, {
      frame: {
        header: {title: this.trimmedLabel(), subtitle: 'اختر لونًا', icon: 'layers'},
        footer: createSelectionOverlayFooter(
          'color',
          this.clearable(),
          ERP_SELECTION_DEFAULT_ACTION_LABELS,
        ),
      },
      ...(this.overlayConfig() ?? {}),
      data: this.pickerData(),
    });
    this.activeRef = ref;
    void ref.afterClosed.then((outcome) => {
      this.activeRef = null;
      if (outcome.type === 'closed') this.commitUserValue(outcome.result);
    });
  }

  protected handleClear(): void {
    this.commitUserValue(null);
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  private pickerData(): ErpSelectionPickerData {
    return {
      mode: 'color',
      value: this.currentValue(),
      colorMode: this.mode(),
      items: [],
      query: '',
      searchable: false,
      clearable: this.clearable(),
      actionLabels: ERP_SELECTION_DEFAULT_ACTION_LABELS,
    };
  }
}
