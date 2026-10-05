import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpButton} from '../button/button';
import {ErpDataColumn} from '../data-table/data-table-contracts';
import {ErpSelect} from '../select/select';
import {ErpSelectOption, ErpSelectValue} from '../select/select-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-column-chooser',
  imports: [ErpButton, ErpSelect, FormsModule],
  templateUrl: './column-chooser.html',
  styleUrl: './column-chooser.scss',
})
export class ErpColumnChooser {
  readonly columns = input.required<readonly ErpDataColumn[]>();
  readonly visibleKeys = input<readonly string[]>([]);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly visibilityChange = output<readonly string[]>();
  readonly resetRequested = output<void>();

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

  protected updateVisible(value: ErpSelectValue): void {
    if (this.disabled()) return;
    const requested = new Set(Array.isArray(value) ? value : value === null ? [] : [value]);
    const normalized = this.columns()
      .filter((column) => column.required || column.hideable === false || requested.has(column.key))
      .map((column) => column.key);
    this.visibilityChange.emit(normalized);
  }
}
