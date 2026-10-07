import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpAvatar} from '../../controls/avatar/avatar';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpColumnChooser} from '../../controls/column-chooser/column-chooser';
import {ErpDataColumn} from '../../controls/data-table/data-table-contracts';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {
  ErpTable,
  ErpTableCell,
  ErpTableColumn,
  ErpTableRow,
  ErpTableSort,
} from '../../controls/table/table';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design Lab review internals use the erp-review prefix.
  selector: 'erp-review-core-table',
  imports: [
    ErpAvatar,
    ErpCheckBox,
    ErpColumnChooser,
    ErpIconButton,
    ErpInline,
    ErpStatusBadge,
    ErpTable,
    ErpTableCell,
    ErpText,
    ErpTooltip,
    FormsModule,
  ],
  templateUrl: './review-core-table.html',
  styleUrl: './review-core-table.scss',
})
export class ErpReviewCoreTable {
  readonly selectedRows = signal<readonly string[]>(['2']);
  readonly rowActivatable = signal(false);
  readonly striped = signal(true);
  readonly hoverMotion = signal(true);
  readonly activatedRowCode = signal<string | null>(null);
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
  readonly columnWidths = signal<Readonly<Record<string, number>>>({});

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
      resizable: true,
    },
    {
      key: 'balanceArabic',
      header: 'رصيد عربي',
      digitSet: 'arabic-indic',
      headerAlign: 'right',
      cellAlign: 'right',
      resizable: true,
    },
    {key: 'status', header: 'الحالة', headerAlign: 'center', cellAlign: 'center', resizable: true},
    {key: 'categoryIcon', header: 'النوع', headerAlign: 'center', cellAlign: 'center', resizable: true},
    {key: 'notes', header: 'ملاحظات', overflow: 'ellipsis', minWidth: 180, resizable: true},
    {key: 'action', header: 'إجراء', headerAlign: 'center', cellAlign: 'center', resizable: true},
    {key: 'iconAction', header: 'أيقونة', headerAlign: 'center', cellAlign: 'center', resizable: true},
    {key: 'hiddenAudit', header: 'مخفي افتراضيًا', resizable: true},
  ];

  readonly referenceColumns: readonly ErpTableColumn[] = [
    {key: 'employee', header: 'الموظف', sortable: true, resizable: true, initialWidth: 280},
    {key: 'department', header: 'القسم', sortable: true, resizable: true, initialWidth: 150},
    {key: 'role', header: 'المسمى الوظيفي', sortable: true, resizable: true, initialWidth: 200},
    {
      key: 'salary',
      header: 'الراتب',
      sortable: true,
      resizable: true,
      digitSet: 'arabic-indic',
      align: 'end',
      initialWidth: 140,
    },
    {
      key: 'joinedAt',
      header: 'تاريخ الانضمام',
      sortable: true,
      resizable: true,
      digitSet: 'arabic-indic',
      initialWidth: 130,
    },
    {key: 'status', header: 'الحالة', sortable: true, resizable: true, align: 'center', initialWidth: 140},
    {key: 'actions', header: 'الإجراءات', resizable: true, align: 'center', initialWidth: 110},
  ];
  readonly chooserColumns: readonly ErpDataColumn[] = this.columns.map((column) => ({
    key: column.key,
    label: column.header,
  }));

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

  readonly referenceEmployeeRows: readonly ErpTableRow[] = [
    {
      id: 'employee-1',
      employee: 'أميرة حداد',
      employeePhoto: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      employeeCode: 'EMP-1042',
      department: 'المالية',
      role: 'مديرة المالية',
      salary: '18400.00',
      joinedAt: '2023-02-14',
      status: 'نشط',
      actions: 'open',
    },
    {
      id: 'employee-2',
      employee: 'عمر ناصر',
      employeePhoto: '/assets/honesty-erp-avatars/users/male/avatar-01.png',
      employeeCode: 'EMP-1068',
      department: 'المخزون',
      role: 'مسؤول المخزون',
      salary: '12650.00',
      joinedAt: '2023-06-01',
      status: 'نشط',
      actions: 'open',
    },
    {
      id: 'employee-3',
      employee: 'ليلى محمود',
      employeePhoto: '/assets/honesty-erp-avatars/users/female/avatar-22.png',
      employeeCode: 'EMP-1103',
      department: 'الموارد البشرية',
      role: 'مسؤولة الموارد البشرية',
      salary: '14200.00',
      joinedAt: '2024-01-09',
      status: 'إجازة',
      actions: 'open',
    },
    {
      id: 'employee-4',
      employee: 'يوسف كريم',
      employeePhoto: '/assets/honesty-erp-avatars/users/male/avatar-02.png',
      employeeCode: 'EMP-1137',
      department: 'التقنية',
      role: 'مهندس أول',
      salary: '21100.00',
      joinedAt: '2024-03-17',
      status: 'نشط',
      actions: 'open',
    },
    {
      id: 'employee-5',
      employee: 'نادية فؤاد',
      employeePhoto: '/assets/honesty-erp-avatars/users/female/avatar-23.png',
      employeeCode: 'EMP-1184',
      department: 'المشتريات',
      role: 'مسؤولة المشتريات',
      salary: '13750.00',
      joinedAt: '2024-08-22',
      status: 'قيد المراجعة',
      actions: 'open',
    },
  ];

  readonly plainColumns: readonly ErpTableColumn[] = [
    {key: 'code', header: 'رقم الحساب', sortable: true, resizable: true, digitSet: 'latin', initialWidth: 130},
    {key: 'account', header: 'اسم الحساب', descriptionKey: 'description', sortable: true, resizable: true, minWidth: 230},
    {key: 'balanceArabic', header: 'الرصيد', sortable: true, resizable: true, digitSet: 'arabic-indic', align: 'end', initialWidth: 160},
    {key: 'status', header: 'الحالة', resizable: true, align: 'center', initialWidth: 130},
    {key: 'branch', header: 'الفرع', resizable: true, initialWidth: 160},
    {key: 'updatedAt', header: 'آخر تحديث', resizable: true, digitSet: 'arabic-indic', initialWidth: 150},
  ];

  readonly headerTypeColumns: readonly ErpTableColumn[] = [
    {key: 'account', header: 'الحساب', headerIcon: 'wallet', resizable: true, minWidth: 240},
    {key: 'balanceArabic', header: 'الرصيد', headerIcon: 'money', sortable: true, resizable: true, align: 'end', initialWidth: 180},
    {key: 'branch', header: 'الفرع', headerIcon: 'inventory', resizable: true, align: 'center', initialWidth: 180},
    {key: 'updatedAt', header: 'آخر تحديث', headerIcon: 'calendar', resizable: true, align: 'end', initialWidth: 180},
  ];

  readonly compactColumns: readonly ErpTableColumn[] = [
    {key: 'code', header: 'رقم الحساب', sortable: true, resizable: true, digitSet: 'latin', initialWidth: 130},
    {key: 'account', header: 'اسم الحساب', sortable: true, resizable: true, minWidth: 230},
    {key: 'balanceArabic', header: 'الرصيد', sortable: true, resizable: true, digitSet: 'arabic-indic', align: 'end', initialWidth: 160},
    {key: 'status', header: 'الحالة', resizable: true, align: 'center', initialWidth: 130},
    {key: 'branch', header: 'الفرع', resizable: true, initialWidth: 160},
    {key: 'updatedAt', header: 'آخر تحديث', resizable: true, digitSet: 'arabic-indic', initialWidth: 150},
  ];

  readonly verticalColumns: readonly ErpTableColumn[] = [
    {key: 'employee', header: 'الموظف', initialWidth: 280},
    ...this.compactColumns.slice(1, 5),
  ];

  readonly referenceRows: readonly ErpTableRow[] = [
    {id: 'r1', code: '1101', account: 'النقدية بالخزينة', description: 'أصل متداول', balanceArabic: '125400.00', status: 'نشط', branch: 'القاهرة', updatedAt: '2026-10-07'},
    {id: 'r2', code: '1202', account: 'حسابات العملاء', description: 'أرصدة مدينة', balanceArabic: '84275.50', status: 'قيد المراجعة', branch: 'الإسكندرية', updatedAt: '2026-10-06'},
    {id: 'r3', code: '2104', account: 'الموردون', description: 'أرصدة دائنة', balanceArabic: '63910.00', status: 'نشط', branch: 'الجيزة', updatedAt: '2026-10-05'},
    {id: 'r4', code: '3101', account: 'رأس المال', description: 'حقوق الملكية', balanceArabic: '450000.00', status: 'معتمد', branch: 'المركز الرئيسي', updatedAt: '2026-10-04'},
    {id: 'r5', code: '4102', account: 'إيرادات المبيعات', description: 'الإيرادات التشغيلية', balanceArabic: '218600.00', status: 'نشط', branch: 'المنصورة', updatedAt: '2026-10-03'},
    {id: 'r6', code: '5103', account: 'تكلفة المبيعات', description: 'مصروفات النشاط', balanceArabic: '119800.00', status: 'موقوف', branch: 'طنطا', updatedAt: '2026-10-02'},
  ];

  readonly fixedRows: readonly ErpTableRow[] = Array.from({length: 6}, (_, index) => {
    const source = this.referenceEmployeeRows[index % this.referenceEmployeeRows.length];
    return {...source, id: `fixed-${index + 1}`, employeeCode: `EMP-${1200 + index}`};
  });

  protected ownerName(row: ErpTableRow): string {
    return String(row['ownerName'] ?? 'مستخدم');
  }

  protected employeeName(row: ErpTableRow): string {
    return String(row['employee'] ?? 'موظف');
  }

  protected statusTone(value: unknown): 'success' | 'warning' | 'neutral' {
    if (value === 'نشط') {
      return 'success';
    }
    if (value === 'إجازة' || value === 'قيد المراجعة') {
      return 'warning';
    }
    return 'neutral';
  }

  protected activateRow(row: ErpTableRow): void {
    this.activatedRowCode.set(String(row['code'] ?? '—'));
  }

  protected resetColumns(): void {
    this.visibleColumnKeys.set(this.columns.map((column) => column.key));
  }
}
