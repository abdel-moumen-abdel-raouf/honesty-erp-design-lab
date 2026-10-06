import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpText} from '../../primitives/text/text';
import {ErpButton} from '../button/button';
import {ErpSelect} from '../select/select';
import {ErpSelectOption} from '../select/select-contracts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-pagination',
  imports: [ErpButton, ErpInline, ErpSelect, ErpText, FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  host: {
    '[attr.data-pagination-page]': 'effectivePage()',
    '[attr.data-pagination-page-count]': 'effectivePageCount()',
  },
})
export class ErpPagination {
  readonly page = input(1);
  readonly pageCount = input.required<number>();
  readonly totalItems = input<number | null>(null);
  readonly pageSize = input(25);
  readonly pageSizeOptions = input<readonly number[]>([10, 25, 50, 100]);
  readonly showSummary = input(true, {transform: booleanAttribute});
  readonly showPageSize = input(true, {transform: booleanAttribute});
  readonly showFirst = input(true, {transform: booleanAttribute});
  readonly showPrevious = input(true, {transform: booleanAttribute});
  readonly showPageNumbers = input(true, {transform: booleanAttribute});
  readonly showNext = input(true, {transform: booleanAttribute});
  readonly showLast = input(true, {transform: booleanAttribute});
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly effectivePageCount = computed(() => {
    const count = this.pageCount();
    return Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 1;
  });
  protected readonly effectivePage = computed(() => {
    const page = this.page();
    const normalized = Number.isFinite(page) ? Math.floor(page) : 1;
    return Math.min(Math.max(1, normalized), this.effectivePageCount());
  });
  protected readonly pageOptions = computed<readonly ErpSelectOption[]>(() =>
    this.pageSizeOptions().map((value) => ({value: String(value), label: `${value} سجل`})),
  );
  protected readonly visiblePages = computed(() => {
    const count = this.effectivePageCount();
    const current = this.effectivePage();
    const start = Math.max(1, Math.min(current - 2, count - 4));
    return Array.from({length: Math.min(5, count)}, (_, index) => start + index);
  });

  protected go(page: number): void {
    const next = Math.min(Math.max(1, Math.floor(page)), this.effectivePageCount());
    if (next !== this.effectivePage()) this.pageChange.emit(next);
  }

  protected changeSize(value: unknown): void {
    const size = Number(value);
    if (Number.isFinite(size) && size > 0) this.pageSizeChange.emit(size);
  }
}
