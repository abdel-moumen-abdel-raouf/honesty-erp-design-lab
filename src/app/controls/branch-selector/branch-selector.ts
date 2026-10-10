import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpFieldLabelMode} from '../input-family/field-contracts';
import {ErpSelect} from '../select/select';
import {ErpSelectOption, ErpSelectValue} from '../select/select-contracts';
import {ErpBranchOption} from '../shell-family/shell-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-branch-selector',
  imports: [ErpSelect, FormsModule],
  templateUrl: './branch-selector.html',
  styleUrl: './branch-selector.scss',
})
export class ErpBranchSelector {
  readonly branches = input.required<readonly ErpBranchOption[]>();
  readonly value = model<string | null>(null);
  readonly label = input('الفرع');
  readonly labelMode = input<ErpFieldLabelMode>('static');
  readonly placeholder = input('اختر الفرع');
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly changed = output<string | null>();

  protected readonly options = computed<readonly ErpSelectOption[]>(() =>
    this.branches().map((branch) => ({
      value: branch.id,
      label: branch.label,
      description: branch.description,
      disabled: branch.disabled,
      icon: 'building',
    })),
  );

  protected update(value: ErpSelectValue): void {
    const resolved = typeof value === 'string' ? value : null;
    this.value.set(resolved);
    this.changed.emit(resolved);
  }
}
