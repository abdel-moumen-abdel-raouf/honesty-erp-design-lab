import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpAvatar} from '../../controls/avatar/avatar';
import {ErpButton} from '../../controls/button/button';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {
  ErpTable,
  ErpTableCell,
  ErpTableColumn,
  ErpTableFooter,
  ErpTableRow,
  ErpTableSort,
} from '../../controls/table/table';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpIcon} from '../../primitives/icon/icon';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design Lab review internals use the erp-review prefix.
  selector: 'erp-review-core-table',
  imports: [
    ErpAvatar,
    ErpButton,
    ErpIcon,
    ErpIconButton,
    ErpInline,
    ErpStatusBadge,
    ErpTable,
    ErpTableCell,
    ErpTableFooter,
    ErpText,
    ErpTooltip,
  ],
  templateUrl: './review-core-table.html',
})
export class ErpReviewCoreTable {
  readonly selectedRows = signal<readonly string[]>(['2']);
  readonly tableSort = signal<ErpTableSort | null>(null);
  readonly visibleColumnKeys = signal<readonly string[]>([
    'code',
    'owner',
    'account',
    'balanceLatin',
    'balanceArabic',
    'status',
    'categoryIcon',
    'notes',
    'action',
    'iconAction',
  ]);

  readonly columns: readonly ErpTableColumn[] = [
    {
      key: 'code',
      header: 'الكود',
      sortable: true,
      resizable: true,
      digitSet: 'latin',
      initialWidth: 112,
      headerAlign: 'left',
      cellAlign: 'left',
    },
    {key: 'owner', header: 'المسؤول', resizable: true, minWidth: 190},
    {
      key: 'account',
      header: 'الحساب',
      descriptionKey: 'description',
      sortable: true,
      resizable: true,
      minWidth: 190,
    },
    {
      key: 'balanceLatin',
      header: 'رصيد لاتيني',
      digitSet: 'latin',
      sortable: true,
      headerAlign: 'right',
      cellAlign: 'right',
    },
    {
      key: 'balanceArabic',
      header: 'رصيد عربي',
      digitSet: 'arabic-indic',
      headerAlign: 'right',
      cellAlign: 'right',
    },
    {key: 'status', header: 'الحالة', headerAlign: 'center', cellAlign: 'center'},
    {key: 'categoryIcon', header: 'النوع', headerAlign: 'center', cellAlign: 'center'},
    {key: 'notes', header: 'ملاحظات', overflow: 'ellipsis', minWidth: 180},
    {key: 'action', header: 'إجراء', headerAlign: 'center', cellAlign: 'center'},
    {key: 'iconAction', header: 'أيقونة', headerAlign: 'center', cellAlign: 'center'},
    {key: 'hiddenAudit', header: 'مخفي افتراضيًا'},
  ];

  readonly rows: readonly ErpTableRow[] = [
    {
      id: '1',
      code: '1101',
      owner: '/assets/honesty-erp-avatars/users/male/avatar-01.png',
      ownerName: 'أحمد محمود',
      account: 'النقدية بالخزينة',
      description: 'حساب متداول — فرع القاهرة',
      balanceLatin: '125400.00',
      balanceArabic: '125400.00',
      status: 'نشط',
      categoryIcon: 'money',
      notes: 'ملاحظة طويلة تثبت القطع بعلامة الحذف دون كسر تخطيط الجدول أو تمديد العمود.',
      action: 'عرض',
      iconAction: 'open',
      hiddenAudit: 'لا يظهر',
    },
    {
      id: '2',
      code: '1202',
      owner: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      ownerName: 'سارة علي',
      account: 'حسابات العملاء',
      description: 'أرصدة مدينة قيد المراجعة',
      balanceLatin: '84275.50',
      balanceArabic: '84275.50',
      status: 'مراجعة',
      categoryIcon: 'people',
      notes: 'يمكن للمستهلك استبدال خلية النص بتركيب ERP غني عند الحاجة.',
      action: 'مراجعة',
      iconAction: 'open',
      hiddenAudit: 'لا يظهر',
    },
    {
      id: '3',
      code: '2104',
      owner: '/assets/honesty-erp-avatars/users/male/avatar-02.png',
      ownerName: 'محمود حسن',
      account: 'الموردون',
      description: 'أرصدة دائنة',
      balanceLatin: '63910.00',
      balanceArabic: '63910.00',
      status: 'نشط',
      categoryIcon: 'inventory',
      notes: 'نص عادي قصير.',
      action: 'عرض',
      iconAction: 'open',
      hiddenAudit: 'لا يظهر',
    },
  ];

  protected ownerName(row: ErpTableRow): string {
    return String(row['ownerName'] ?? 'مستخدم');
  }

  protected iconName(row: ErpTableRow): ErpIconName {
    return String(row['categoryIcon'] ?? 'info') as ErpIconName;
  }
}
