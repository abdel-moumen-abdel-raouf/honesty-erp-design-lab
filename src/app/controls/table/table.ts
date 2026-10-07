import {NgTemplateOutlet} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  TemplateRef,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpText, ErpTextDirection, ErpTextFamily} from '../../primitives/text/text';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {convertDigits, resolveContextualPreference} from '../../foundation/preferences/core/ui-settings.formatters';
import {UiSettingsService} from '../../foundation/preferences/core/ui-settings.service';
import {DigitSet} from '../../foundation/preferences/core/ui-settings.types';
import {ErpCheckBox} from '../check-box/check-box';
import {ErpSortDirection} from '../data-table/data-table-contracts';
import {ErpSortHeader} from '../sort-header/sort-header';
import {ErpTableResizeHandle} from './internal/table-resize-handle';
import {ErpTableViewport} from './internal/table-viewport';

export type ErpTableAlign = 'start' | 'center' | 'end' | 'left' | 'right';
export type ErpTableOverflow = 'wrap' | 'ellipsis' | 'clip';
export type ErpTableDigitSet = 'system' | DigitSet;
export type ErpTableDensity = 'compact' | 'normal' | 'comfortable';
export type ErpTableLayout = 'horizontal' | 'vertical';
export type ErpTablePresentation = 'standalone' | 'reference-experience';

export interface ErpTableColumn {
  readonly key: string;
  readonly header: string;
  readonly descriptionKey?: string;
  readonly align?: ErpTableAlign;
  readonly headerAlign?: ErpTableAlign;
  readonly cellAlign?: ErpTableAlign;
  readonly overflow?: ErpTableOverflow;
  readonly digitSet?: ErpTableDigitSet;
  readonly sortable?: boolean;
  readonly resizable?: boolean;
  readonly initialWidth?: number;
  readonly minWidth?: number;
  readonly maxWidth?: number;
  readonly headerIcon?: ErpIconName;
}

export type ErpTableRow = Readonly<Record<string, string | number | null | undefined>>;

export interface ErpTableSort {
  readonly key: string;
  readonly direction: Exclude<ErpSortDirection, 'none'>;
}

export interface ErpTableColumnWidthChange {
  readonly key: string;
  readonly width: number;
}

export interface ErpTableCellContext {
  readonly $implicit: ErpTableRow;
  readonly row: ErpTableRow;
  readonly value: string | number | null | undefined;
  readonly column: ErpTableColumn;
  readonly rowIndex: number;
}

export interface ErpTableFooterContext {
  readonly $implicit: string | number | null | undefined;
  readonly value: string | number | null | undefined;
  readonly column: ErpTableColumn;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpTableCell]',
})
export class ErpTableCell {
  readonly key = input.required<string>({alias: 'erpTableCell'});
  readonly template = inject<TemplateRef<ErpTableCellContext>>(TemplateRef);
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpTableFooter]',
})
export class ErpTableFooter {
  readonly key = input.required<string>({alias: 'erpTableFooter'});
  readonly template = inject<TemplateRef<ErpTableFooterContext>>(TemplateRef);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-table',
  imports: [
    ErpCheckBox,
    ErpIcon,
    ErpSortHeader,
    ErpTableResizeHandle,
    ErpTableViewport,
    ErpText,
    FormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './table.html',
  styleUrls: [
    './table.scss',
    './table-states.scss',
    './table-vertical.scss',
  ],
  host: {
    '[attr.data-table-compact]': 'compact()',
    '[attr.data-table-density]': 'effectiveDensity()',
    '[attr.data-table-layout]': 'layout()',
    '[attr.data-table-presentation]': 'presentation()',
    '[attr.data-table-fixed]': 'fixedHeight() !== null',
    '[attr.data-table-selectable]': 'selectable()',
    '[attr.data-table-striped]': 'striped()',
    '[attr.data-table-hover]': 'hover()',
    '[attr.data-table-clickable]': 'rowActivatable()',
    '[attr.data-table-hover-motion]': 'hoverMotion()',
    '[style.--honesty-table-fixed-height.px]': 'fixedHeight()',
  },
})
export class ErpTable implements OnDestroy {
  readonly caption = input.required<string>();
  readonly columns = input.required<readonly ErpTableColumn[]>();
  readonly visibleColumnKeys = input<readonly string[] | null>(null);
  readonly rows = input<readonly ErpTableRow[]>([]);
  readonly rowKey = input('id');
  readonly emptyText = input('لا توجد بيانات متاحة');
  readonly compact = input(false, {transform: booleanAttribute});
  readonly density = input<ErpTableDensity>('normal');
  readonly layout = input<ErpTableLayout>('horizontal');
  readonly presentation = input<ErpTablePresentation>('standalone');
  readonly fixedHeight = input<number | null>(null);
  readonly selectable = input(false, {transform: booleanAttribute});
  readonly showHeaderSelection = input(true, {transform: booleanAttribute});
  readonly rowActivatable = input(false, {transform: booleanAttribute});
  readonly striped = input(false, {transform: booleanAttribute});
  readonly hover = input(true, {transform: booleanAttribute});
  readonly hoverMotion = input(true, {transform: booleanAttribute});
  readonly selectedKeys = model<readonly string[]>([]);
  readonly sort = input<ErpTableSort | null>(null);
  readonly columnWidths = model<Readonly<Record<string, number>>>({});
  readonly footerValues = input<Readonly<Record<string, string | number | null | undefined>>>({});
  readonly cellDefinitions = input<readonly ErpTableCell[]>([]);
  readonly footerDefinitions = input<readonly ErpTableFooter[]>([]);

  readonly rowActivated = output<ErpTableRow>();
  readonly sortChange = output<ErpTableSort | null>();
  readonly columnWidthChange = output<ErpTableColumnWidthChange>();

  private readonly settings = inject(UiSettingsService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cellTemplates = contentChildren(ErpTableCell);
  private readonly footerTemplates = contentChildren(ErpTableFooter);
  private resizeCleanup: (() => void) | null = null;

  protected readonly effectiveColumns = computed(() => {
    const requested = this.visibleColumnKeys();
    if (requested === null) return this.columns();
    const visible = new Set(requested);
    return this.columns().filter((column) => visible.has(column.key));
  });
  protected readonly selectedSet = computed(() => new Set(this.selectedKeys()));
  protected readonly effectiveDensity = computed<ErpTableDensity>(() =>
    this.compact() ? 'compact' : this.density(),
  );
  protected readonly selectableRowKeys = computed(() =>
    this.rows().map((row, index) => this.key(row, index)),
  );
  protected readonly allSelected = computed(() => {
    const keys = this.selectableRowKeys();
    const selected = this.selectedSet();
    return keys.length > 0 && keys.every((key) => selected.has(key));
  });
  protected readonly partiallySelected = computed(() => {
    const keys = this.selectableRowKeys();
    const count = keys.filter((key) => this.selectedSet().has(key)).length;
    return count > 0 && count < keys.length;
  });
  protected readonly hasFooter = computed(() =>
    this.footerTemplates().length > 0 ||
    this.footerDefinitions().length > 0 ||
    Object.keys(this.footerValues()).length > 0,
  );

  ngOnDestroy(): void {
    this.resizeCleanup?.();
  }

  protected key(row: ErpTableRow, index: number): string {
    return String(row[this.rowKey()] ?? index);
  }

  protected activate(row: ErpTableRow): void {
    if (this.rowActivatable()) this.rowActivated.emit(row);
  }

  protected toggleRow(row: ErpTableRow, index: number, checked: boolean): void {
    const key = this.key(row, index);
    const selected = new Set(this.selectedKeys());
    if (checked) selected.add(key);
    else selected.delete(key);
    this.selectedKeys.set([...selected]);
  }

  protected toggleAll(checked: boolean): void {
    const rowKeys = new Set(this.selectableRowKeys());
    const selected = new Set(this.selectedKeys());
    for (const key of rowKeys) {
      if (checked) selected.add(key);
      else selected.delete(key);
    }
    this.selectedKeys.set([...selected]);
  }

  protected sortDirection(column: ErpTableColumn): ErpSortDirection {
    return this.sort()?.key === column.key ? this.sort()!.direction : 'none';
  }

  protected updateSort(column: ErpTableColumn, direction: ErpSortDirection): void {
    this.sortChange.emit(direction === 'none' ? null : {key: column.key, direction});
  }

  protected cellTemplate(key: string): TemplateRef<ErpTableCellContext> | null {
    return [...this.cellTemplates(), ...this.cellDefinitions()].find(
      (cell) => cell.key() === key,
    )?.template ?? null;
  }

  protected footerTemplate(key: string): TemplateRef<ErpTableFooterContext> | null {
    return [...this.footerTemplates(), ...this.footerDefinitions()].find(
      (footer) => footer.key() === key,
    )?.template ?? null;
  }

  protected cellContext(
    row: ErpTableRow,
    column: ErpTableColumn,
    rowIndex: number,
  ): ErpTableCellContext {
    return {$implicit: row, row, value: row[column.key], column, rowIndex};
  }

  protected footerContext(column: ErpTableColumn): ErpTableFooterContext {
    const value = this.footerValues()[column.key];
    return {$implicit: value, value, column};
  }

  protected displayValue(
    value: string | number | null | undefined,
    column: ErpTableColumn,
  ): string {
    const source = value === null || value === undefined ? '—' : String(value);
    const digitSet = column.digitSet ?? 'system';
    const resolved = digitSet === 'system'
      ? resolveContextualPreference(this.settings.store.value('digits'), 'view')
      : digitSet;
    return convertDigits(source, resolved);
  }

  protected textFamily(column: ErpTableColumn): ErpTextFamily {
    const digits = column.digitSet ?? 'system';
    const resolved = digits === 'system'
      ? resolveContextualPreference(this.settings.store.value('digits'), 'view')
      : digits;
    return resolved === 'latin' ? 'latin' : 'arabic';
  }

  protected textDirection(column: ErpTableColumn): ErpTextDirection {
    return this.textFamily(column) === 'latin' ? 'ltr' : 'inherit';
  }

  protected columnWidth(column: ErpTableColumn): number | null {
    const width = this.columnWidths()[column.key] ?? column.initialWidth;
    return width === undefined ? null : this.constrainWidth(column, width);
  }

  protected startResize(event: PointerEvent, column: ErpTableColumn): void {
    if (!column.resizable) return;
    event.preventDefault();
    const header = (event.target as HTMLElement).closest('th');
    const startWidth = this.columnWidth(column) ?? header?.getBoundingClientRect().width ?? 160;
    const startX = event.clientX;
    const direction = getComputedStyle(event.target as HTMLElement).direction === 'rtl' ? -1 : 1;

    const move = (moveEvent: PointerEvent) => {
      this.setColumnWidth(column, startWidth + (moveEvent.clientX - startX) * direction);
    };
    const finish = () => this.resizeCleanup?.();
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', finish, {once: true});
    this.resizeCleanup?.();
    this.resizeCleanup = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', finish);
      this.resizeCleanup = null;
    };
  }

  protected stepResize(column: ErpTableColumn, physicalDirection: number): void {
    const logicalDirection = getComputedStyle(this.host.nativeElement).direction === 'rtl'
      ? -physicalDirection
      : physicalDirection;
    this.setColumnWidth(column, (this.columnWidth(column) ?? 160) + logicalDirection * 8);
  }

  private setColumnWidth(column: ErpTableColumn, candidate: number): void {
    const width = this.constrainWidth(column, candidate);
    this.columnWidths.set({...this.columnWidths(), [column.key]: width});
    this.columnWidthChange.emit({key: column.key, width});
  }

  private constrainWidth(column: ErpTableColumn, candidate: number): number {
    const minimum = column.minWidth ?? 72;
    const maximum = column.maxWidth ?? 640;
    return Math.round(Math.min(Math.max(candidate, minimum), maximum));
  }
}
