import {ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, signal} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpOverlayRef} from '../../shared/overlay/overlay-ref';
import {ErpOverlayBehaviorConfig} from '../../shared/overlay/overlay-contracts';
import {ErpFieldBase} from '../input-family/field-base';
import {ErpFieldFrame} from '../input-family/internal/field-frame';
import {ErpInputValidationIssue} from '../input-family/input-contracts';
import {ErpSelectionPickerContent} from '../selection-family/internal/selection-picker-content';
import {createSelectionOverlayFooter, ERP_SELECTION_DEFAULT_ACTION_LABELS, ErpItemPickerOption, ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {normalizeItemValue} from '../selection-family/selection-utils';

let nextComboBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-combo-box',
  imports: [ErpFieldFrame],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpComboBox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpComboBox),
      multi: true,
    },
  ],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.scss',
  host: {'[attr.data-field-configuration-state]': 'fieldConfigurationState()', '[attr.data-combo-box-value]': 'currentValue()'},
})
export class ErpComboBox extends ErpFieldBase<string | null> {
  readonly items = input.required<readonly ErpItemPickerOption[]>();
  readonly placeholder = input<string | null>(null);
  readonly overlayConfig = input<Partial<ErpOverlayBehaviorConfig> | null>(null);
  override readonly trailingIcon = input<ErpIconName | null>('chevron-down');
  protected readonly controlId = `erp-combo-box-${++nextComboBoxId}`;
  protected readonly query = signal('');
  protected readonly queryEditing = signal(false);
  protected readonly activeOverlayId = signal<string | null>(null);
  protected readonly selectedItem = computed(() => this.items().find((item) => item.value === this.currentValue()) ?? null);
  protected readonly inputValue = computed(() => this.queryEditing() ? this.query() : this.selectedItem()?.label ?? '');
  private readonly overlays = inject(ErpOverlayManager);
  private activeRef: ErpOverlayRef<string | null> | null = null;
  constructor() { super(null); }
  override writeValue(value: unknown): void { super.writeValue(value); this.query.set(''); this.queryEditing.set(false); }
  protected override normalizeValue(value: unknown): string | null { return normalizeItemValue(value, this.items()); }
  protected override validationCandidate(): unknown {
    return this.queryEditing() ? this.query() : this.currentValue();
  }
  protected override classifyPresence(value: unknown) {
    return value === null || value === '' ? 'no-selection' as const : null;
  }
  protected override validateCandidate(value: unknown): readonly ErpInputValidationIssue[] {
    if (!this.queryEditing() || value === null || value === '') return [];
    return [
      this.validationIssue(
        'selection.no-match',
        'اختر قيمة من النتائج المتاحة.',
        'domain',
      ),
    ];
  }
  protected handleInput(event: Event): void { this.queryEditing.set(true); this.query.set((event.target as HTMLInputElement).value); this.openPicker(); }
  protected openPicker(): void {
    if (this.fieldEffectiveDisabled() || this.activeRef) return;
    const ref = this.overlays.open<ErpSelectionPickerContent, ErpSelectionPickerData, string | null>(ErpSelectionPickerContent, {frame: {header: {title: this.trimmedLabel(), subtitle: 'ابحث واختر قيمة', icon: 'search'}, footer: createSelectionOverlayFooter('combo', this.clearable(), ERP_SELECTION_DEFAULT_ACTION_LABELS)}, ...(this.overlayConfig() ?? {}), data: this.pickerData()});
    this.activeRef = ref;
    this.activeOverlayId.set(ref.id);
    void ref.afterClosed.then((outcome) => {
      this.activeRef = null;
      this.activeOverlayId.set(null);
      if (outcome.type === 'closed' && this.commitUserValue(outcome.result)) { this.query.set(''); this.queryEditing.set(false); }
    });
  }
  protected handleKeydown(event: KeyboardEvent): void { if (event.key === 'ArrowDown') { event.preventDefault(); this.openPicker(); } }
  protected handleClear(input: HTMLInputElement): void { if (this.clearable() && this.commitUserValue(null)) { this.query.set(''); this.queryEditing.set(false); input.value = ''; } }
  protected handleNativeFocus(): void { this.handleFocus(); }
  protected handleNativeBlur(): void { this.handleBlur(); }
  private pickerData(): ErpSelectionPickerData { return {mode: 'combo', value: this.currentValue(), colorMode: 'system', items: this.items(), query: this.queryEditing() ? this.query() : '', searchable: true, clearable: this.clearable(), actionLabels: ERP_SELECTION_DEFAULT_ACTION_LABELS}; }
}
