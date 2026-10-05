import {booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpButton} from '../button/button';
import {ErpDataFilter, ErpDataFilterDefinition} from '../data-table/data-table-contracts';
import {ErpFilterDrawerContent, ErpFilterDrawerData} from './internal/filter-drawer-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-filter-drawer',
  imports: [ErpButton],
  templateUrl: './filter-drawer.html',
  styleUrl: './filter-drawer.scss',
})
export class ErpFilterDrawer {
  private readonly overlays = inject(ErpOverlayManager);
  readonly definitions = input.required<readonly ErpDataFilterDefinition[]>();
  readonly filters = input<readonly ErpDataFilter[]>([]);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly applied = output<readonly ErpDataFilter[]>();

  protected open(): void {
    if (this.disabled()) return;
    const ref = this.overlays.open<ErpFilterDrawerContent, ErpFilterDrawerData, readonly ErpDataFilter[]>(ErpFilterDrawerContent, {
      kind: 'drawer',
      position: 'end',
      size: 'md',
      frame: {
        header: {title: 'تصفية البيانات', subtitle: 'عدّل المعايير ثم طبّقها على الجدول', icon: 'filter'},
        footer: {actions: [
          {id:'clear',label:'مسح الكل',icon:'refresh',role:'utility',placement:'start'},
          {id:'cancel',label:'إلغاء',role:'secondary',placement:'end'},
          {id:'apply',label:'تطبيق',icon:'check',role:'primary',placement:'end'},
        ]},
      },
      data: {definitions: this.definitions(), filters: this.filters()},
    });
    void ref.afterClosed.then((result) => {
      if (result.type === 'closed' && result.result) this.applied.emit(result.result);
    });
  }
}
