/* eslint-disable @angular-eslint/component-selector */
import {booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ErpText} from '../../primitives/text/text';
export type ErpTableAlign = 'start' | 'center' | 'end';
export interface ErpTableColumn { readonly key: string; readonly header: string; readonly align?: ErpTableAlign; }
export type ErpTableRow = Readonly<Record<string, string | number | null | undefined>>;
@Component({changeDetection: ChangeDetectionStrategy.OnPush,   selector: 'erp-table', imports: [ErpText], templateUrl: './table.html', styleUrl: './table.scss', host: {'[attr.data-table-compact]': 'compact()', '[attr.data-table-selectable]': 'selectable()'}})
export class ErpTable { readonly caption = input.required<string>(); readonly columns = input.required<readonly ErpTableColumn[]>(); readonly rows = input<readonly ErpTableRow[]>([]); readonly rowKey = input('id'); readonly emptyText = input('لا توجد بيانات متاحة'); readonly compact = input(false, {transform: booleanAttribute}); readonly selectable = input(false, {transform: booleanAttribute}); readonly selectedKeys = input<readonly string[]>([]); readonly rowActivated = output<ErpTableRow>(); protected readonly selectedSet = computed(() => new Set(this.selectedKeys())); protected key(row: ErpTableRow, index: number): string { return String(row[this.rowKey()] ?? index); } protected activate(row: ErpTableRow): void { if (this.selectable()) this.rowActivated.emit(row); } }
