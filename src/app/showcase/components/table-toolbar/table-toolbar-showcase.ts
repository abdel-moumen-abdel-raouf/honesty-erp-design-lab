import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpTableToolbar} from '../../../controls/table-toolbar/table-toolbar';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';
import {ErpSearchBox} from '../../../controls/search-box/search-box';
import {ErpFilterDrawer} from '../../../controls/filter-drawer/filter-drawer';
import {ErpColumnChooser} from '../../../controls/column-chooser/column-chooser';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'table-toolbar')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-toolbar-showcase',
  imports: [ErpTableToolbar, ErpReviewShowcaseControlPanel, ErpStack, ErpSurface, ErpText, ErpButton, ErpSearchBox, ErpFilterDrawer, ErpColumnChooser],
  templateUrl: './table-toolbar-showcase.html',
  styleUrl: './table-toolbar-showcase.scss',
})
export class ErpTableToolbarShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly tableFilterDefinitions = [{key: 'name', label: 'اسم العميل'}, {key: 'city', label: 'المدينة'}, {key: 'status', label: 'الحالة'}] as const;
  readonly tableFilters = [{key: 'city', label: 'المدينة', value: 'القاهرة'}] as const;
  readonly tableColumns = [{key: 'code', label: 'الكود', required: true}, {key: 'name', label: 'العميل'}, {key: 'city', label: 'المدينة'}, {key: 'balance', label: 'الرصيد'}] as const;
  readonly tableVisibleKeys = ['code', 'name', 'city', 'balance'] as const;
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));

  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));
  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));

  value(name: string): unknown {
    return this.liveValues()[name];
  }

  applyControl(change: ErpShowcaseControlChange): void {
    if (change.control.source === 'cva') {
      this.cvaValue.set(change.value);
      return;
    }
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.liveValues.update((current) => ({...current, [change.control.name]: value}));
  }

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    let rendered = '';
    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }
    catch { rendered = String(value); }
    this.lastEvent.set(`${name}: ${rendered}`);
  }

  private functionPreset(name: string, value: unknown): unknown {
    if (value !== 'sample') return null;
    if (/comparator/i.test(name)) return () => 0;
    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');
    if (/disabled/i.test(name)) return () => false;
    if (/filter|predicate/i.test(name)) return () => true;
    return (candidate: unknown) => candidate;
  }
}
