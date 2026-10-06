import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  ErpSearchBox,
  ErpSearchBoxMode,
  ErpSearchBoxOption,
} from '../search-box/search-box';
import {ErpGlobalSearchResult} from '../shell-family/shell-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-global-search',
  imports: [ErpSearchBox, FormsModule],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class ErpGlobalSearch {
  readonly results = input<readonly ErpGlobalSearchResult[]>([]);
  readonly query = model('');
  readonly label = input('البحث العام');
  readonly placeholder = input('ابحث في النظام');
  readonly mode = input<ErpSearchBoxMode>('dropdown');
  readonly resultActivated = output<ErpGlobalSearchResult>();

  protected readonly searchItems = computed<readonly ErpSearchBoxOption[]>(() =>
    this.results().map((result) => ({
      value: result.id,
      label: result.category
        ? `${result.category} — ${result.label}`
        : result.label,
      description: result.description,
      icon: result.icon,
      disabled: result.disabled,
    })),
  );

  protected update(value: string): void {
    this.query.set(value);
    const result = this.results().find((candidate) => candidate.id === value);

    if (result && !result.disabled) {
      this.resultActivated.emit(result);
    }
  }
}
