import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSelect} from '../../controls/select/select';
import {ErpSelectOption} from '../../controls/select/select-contracts';
import {ErpReviewChoice} from '../review-choice/review-choice';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-review-select',
  imports: [ErpInline, ErpSelect, FormsModule],
  templateUrl: './review-select.html',
  styleUrl: './review-select.scss',
})
export class ErpReviewSelect {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly selectionChanged = output<string>();
  protected readonly choices = contentChildren(ErpReviewChoice);
  protected readonly options = computed<readonly ErpSelectOption[]>(() =>
    this.choices().map((choice) => ({
      value: choice.value(),
      label: choice.label(),
      disabled: choice.disabled(),
    })),
  );

  protected updateValue(value: unknown): void {
    if (typeof value === 'string') this.selectionChanged.emit(value);
  }
}
