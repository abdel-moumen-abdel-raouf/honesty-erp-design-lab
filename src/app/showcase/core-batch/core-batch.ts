import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpAlert} from '../../controls/alert/alert';
import {ErpAvatar} from '../../controls/avatar/avatar';
import {ErpPagination} from '../../controls/pagination/pagination';
import {ErpSelect} from '../../controls/select/select';
import {ErpSelectOption, ErpSelectValue} from '../../controls/select/select-contracts';
import {ErpSkeleton} from '../../controls/skeleton/skeleton';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {ErpTable, ErpTableColumn, ErpTableRow} from '../../controls/table/table';
import {ErpTabItem, ErpTabs} from '../../controls/tabs/tabs';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'app-core-batch', imports: [ErpAlert,ErpAvatar,ErpContainer,ErpGrid,ErpPagination,ErpSection,ErpSelect,ErpSkeleton,ErpStack,ErpStatusBadge,ErpSurface,ErpTable,ErpTabs,ErpText,FormsModule], templateUrl: './core-batch.html', styleUrl: './core-batch.scss'})
export class CoreBatch {
  readonly selectedEmployee = signal<ErpSelectValue>('ahmed');
  readonly page = signal(3); readonly pageSize = signal(25);
  readonly employeeOptions: readonly ErpSelectOption[] = [{value:'ahmed',label:'أحمد محمود',description:'المحاسبة',icon:'user',group:'المالية',keywords:['حسابات']},{value:'sara',label:'سارة علي',description:'المشتريات',icon:'user',group:'العمليات'},{value:'mahmoud',label:'محمود حسن',description:'موقوف مؤقتًا',icon:'user',group:'العمليات',disabled:true}];
  readonly tabs: readonly ErpTabItem[] = [{id:'summary',label:'الملخص',content:'ملخص حركة الحساب خلال الفترة الحالية.',icon:'dashboard'},{id:'transactions',label:'القيود',content:'قائمة القيود المحاسبية المرتبطة بالحساب.',icon:'operations'},{id:'audit',label:'سجل المراجعة',content:'هذا التبويب معطل للمستخدم الحالي.',icon:'history',disabled:true}];
  readonly columns: readonly ErpTableColumn[] = [{key:'code',header:'الكود'},{key:'name',header:'الحساب'},{key:'balance',header:'الرصيد',align:'end'},{key:'status',header:'الحالة',align:'center'}];
  readonly rows: readonly ErpTableRow[] = [{id:'1',code:'1101',name:'النقدية بالخزينة',balance:'125,400.00',status:'نشط'},{id:'2',code:'1202',name:'حسابات العملاء',balance:'84,275.50',status:'مراجعة'},{id:'3',code:'2104',name:'الموردون',balance:'63,910.00',status:'نشط'}];
}
