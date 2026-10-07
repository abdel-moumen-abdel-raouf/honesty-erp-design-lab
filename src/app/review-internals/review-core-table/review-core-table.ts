import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpAvatar} from '../../controls/avatar/avatar';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpColumnChooser} from '../../controls/column-chooser/column-chooser';
import {ErpDataColumn} from '../../controls/data-table/data-table-contracts';
import {ErpIconButton} from '../../controls/icon-button/icon-button';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {ErpPagination} from '../../controls/pagination/pagination';
import {ErpSearchBox} from '../../controls/search-box/search-box';
import {
  ErpTable,
  ErpTableCell,
  ErpTableColumn,
  ErpTableRow,
  ErpTableSort,
} from '../../controls/table/table';
import {ErpTooltip} from '../../controls/tooltip/tooltip';
import {ErpTableToolbar} from '../../controls/table-toolbar/table-toolbar';
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
    ErpPagination,
    ErpSearchBox,
    ErpStatusBadge,
    ErpTable,
    ErpTableCell,
    ErpTableToolbar,
    ErpText,
    ErpTooltip,
    FormsModule,
  ],
  templateUrl: './review-core-table.html',
  styleUrl: './review-core-table.scss',
})
export class ErpReviewCoreTable {
  readonly referenceQuery = signal('');
  readonly referencePage = signal(1);
  readonly selectedRows = signal<readonly string[]>(['employee-2']);
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
  readonly visibleReferenceKeys = signal<readonly string[]>([
    'employee',
    'department',
    'role',
    'salary',
    'joinedAt',
    'status',
    'actions',
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
  readonly referenceChooserColumns: readonly ErpDataColumn[] = this.referenceColumns.map(
    (column) => ({
      key: column.key,
      label: column.header,
      required: column.key === 'actions',
      hideable: column.key !== 'actions',
    }),
  );

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
    {
      id: 'employee-6',
      employee: 'طارق عزيز',
      employeePhoto: '/assets/honesty-erp-avatars/users/male/avatar-03.png',
      employeeCode: 'EMP-1201',
      department: 'الأمان',
      role: 'محلل أمان',
      salary: '13200.00',
      joinedAt: '2024-10-11',
      status: 'موقوف',
      actions: 'open',
    },
    {
      id: 'employee-7',
      employee: 'هناء صلاح',
      employeePhoto: '/assets/honesty-erp-avatars/users/female/avatar-24.png',
      employeeCode: 'EMP-1225',
      department: 'المبيعات',
      role: 'مسؤولة حسابات',
      salary: '11900.00',
      joinedAt: '2025-01-06',
      status: 'نشط',
      actions: 'open',
    },
    {
      id: 'employee-8',
      employee: 'محمود كمال',
      employeePhoto: '/assets/honesty-erp-avatars/users/male/avatar-04.png',
      employeeCode: 'EMP-1249',
      department: 'المالية',
      role: 'محاسب',
      salary: '10800.00',
      joinedAt: '2025-03-19',
      status: 'نشط',
      actions: 'open',
    },
    {
      id: 'employee-9',
      employee: 'سارة جابر',
      employeePhoto: '/assets/honesty-erp-avatars/users/female/avatar-25.png',
      employeeCode: 'EMP-1274',
      department: 'التقنية',
      role: 'مهندسة جودة',
      salary: '12800.00',
      joinedAt: '2025-05-27',
      status: 'تجربة',
      actions: 'open',
    },
    {
      id: 'employee-10',
      employee: 'فيصل أنور',
      employeePhoto: '/assets/honesty-erp-avatars/users/male/avatar-05.png',
      employeeCode: 'EMP-1302',
      department: 'الخدمات اللوجستية',
      role: 'سائق',
      salary: '8600.00',
      joinedAt: '2025-07-14',
      status: 'نشط',
      actions: 'open',
    },
  ];

  readonly filteredReferenceRows = computed(() => {
    const query = this.referenceQuery().trim().toLocaleLowerCase();
    const matchingRows = query
      ? this.referenceEmployeeRows.filter((row) =>
          Object.values(row).some((value) =>
            String(value ?? '').toLocaleLowerCase().includes(query),
          ),
        )
      : this.referenceEmployeeRows;
    const sort = this.tableSort();
    if (!sort) return matchingRows;

    const direction = sort.direction === 'ascending' ? 1 : -1;
    return [...matchingRows].sort((left, right) => {
      const leftValue = left[sort.key];
      const rightValue = right[sort.key];
      const leftNumber = Number(leftValue);
      const rightNumber = Number(rightValue);
      if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
        return (leftNumber - rightNumber) * direction;
      }
      return String(leftValue ?? '').localeCompare(String(rightValue ?? ''), 'ar') * direction;
    });
  });

  readonly plainColumns: readonly ErpTableColumn[] = [
    {key: 'code', header: 'رقم الحساب', sortable: true, resizable: true, digitSet: 'latin', initialWidth: 130},
    {key: 'account', header: 'اسم الحساب', descriptionKey: 'description', sortable: true, resizable: true, minWidth: 230},
    {key: 'balanceArabic', header: 'الرصيد', sortable: true, resizable: true, digitSet: 'arabic-indic', align: 'end', initialWidth: 160},
    {key: 'status', header: 'الحالة', resizable: true, align: 'center', initialWidth: 130},
    {key: 'branch', header: 'الفرع', resizable: true, initialWidth: 160},
    {key: 'updatedAt', header: 'آخر تحديث', resizable: true, digitSet: 'arabic-indic', initialWidth: 150},
  ];

  readonly headerTypeColumns: readonly ErpTableColumn[] = [
    {key: 'id', header: '#', headerIcon: 'file', sortable: true, resizable: true, initialWidth: 150},
    {key: 'customer', header: 'العميل', headerIcon: 'people', sortable: true, resizable: true, initialWidth: 220},
    {key: 'items', header: 'العناصر', headerIcon: 'inventory', sortable: true, resizable: true, align: 'end', initialWidth: 110},
    {key: 'amount', header: 'القيمة', headerIcon: 'money', sortable: true, resizable: true, align: 'end', initialWidth: 180},
    {key: 'date', header: 'التاريخ', headerIcon: 'calendar', sortable: true, resizable: true, align: 'center', initialWidth: 150},
    {key: 'status', header: 'الحالة', resizable: true, align: 'center', initialWidth: 150},
  ];
  readonly headerChooserColumns: readonly ErpDataColumn[] = this.headerTypeColumns.map(
    (column) => ({key: column.key, label: column.header}),
  );
  readonly headerColumnKeys = this.headerTypeColumns.map((column) => column.key);

  readonly compactColumns: readonly ErpTableColumn[] = [
    {key: 'id', header: '#', sortable: true, resizable: true, digitSet: 'latin', align: 'end', initialWidth: 80},
    {key: 'customer', header: 'العميل', sortable: true, resizable: true, initialWidth: 200},
    {key: 'items', header: 'العناصر', sortable: true, resizable: true, digitSet: 'latin', align: 'end', initialWidth: 90},
    {key: 'amount', header: 'القيمة', sortable: true, resizable: true, digitSet: 'latin', align: 'end', initialWidth: 160},
    {key: 'date', header: 'التاريخ', sortable: true, resizable: true, align: 'center', initialWidth: 130},
    {key: 'status', header: 'الحالة', sortable: true, resizable: true, align: 'center', initialWidth: 130},
  ];

  readonly clickableColumns: readonly ErpTableColumn[] = [
    {key: 'id', header: 'الطلب', sortable: true, resizable: true, initialWidth: 130},
    {key: 'customer', header: 'العميل', sortable: true, resizable: true, initialWidth: 200},
    {key: 'items', header: 'العناصر', sortable: true, resizable: true, digitSet: 'latin', align: 'end', initialWidth: 90},
    {key: 'amount', header: 'القيمة', sortable: true, resizable: true, digitSet: 'latin', align: 'end', initialWidth: 170},
    {key: 'status', header: 'الحالة', align: 'center', initialWidth: 130},
  ];

  readonly verticalColumns: readonly ErpTableColumn[] = this.referenceColumns.slice(0, 6);

  readonly referenceRows: readonly ErpTableRow[] = [
    {id: 'r1', code: '1101', account: 'النقدية بالخزينة', description: 'أصل متداول', balanceArabic: '125400.00', status: 'نشط', branch: 'القاهرة', updatedAt: '2026-10-07'},
    {id: 'r2', code: '1202', account: 'حسابات العملاء', description: 'أرصدة مدينة', balanceArabic: '84275.50', status: 'قيد المراجعة', branch: 'الإسكندرية', updatedAt: '2026-10-06'},
    {id: 'r3', code: '2104', account: 'الموردون', description: 'أرصدة دائنة', balanceArabic: '63910.00', status: 'نشط', branch: 'الجيزة', updatedAt: '2026-10-05'},
    {id: 'r4', code: '3101', account: 'رأس المال', description: 'حقوق الملكية', balanceArabic: '450000.00', status: 'معتمد', branch: 'المركز الرئيسي', updatedAt: '2026-10-04'},
    {id: 'r5', code: '4102', account: 'إيرادات المبيعات', description: 'الإيرادات التشغيلية', balanceArabic: '218600.00', status: 'نشط', branch: 'المنصورة', updatedAt: '2026-10-03'},
    {id: 'r6', code: '5103', account: 'تكلفة المبيعات', description: 'مصروفات النشاط', balanceArabic: '119800.00', status: 'موقوف', branch: 'طنطا', updatedAt: '2026-10-02'},
  ];

  readonly referenceOrderRows: readonly ErpTableRow[] = [
    {id: 'SO-20481', customer: 'شركة الأفق', items: 12, amount: '12480.50', date: '2024-03-12', status: 'مدفوع'},
    {id: 'SO-20482', customer: 'مؤسسة المسار', items: 5, amount: '8420.00', date: '2024-03-13', status: 'معلق'},
    {id: 'SO-20483', customer: 'إنجاز للتوريد', items: 23, amount: '24100.75', date: '2024-03-14', status: 'مدفوع'},
    {id: 'SO-20484', customer: 'مجموعة المدى', items: 2, amount: '3100.00', date: '2024-03-15', status: 'متأخر'},
    {id: 'SO-20485', customer: 'الصرح الصناعي', items: 41, amount: '45600.00', date: '2024-03-16', status: 'مدفوع'},
    {id: 'SO-20486', customer: 'بيت التجارة', items: 18, amount: '18900.25', date: '2024-03-17', status: 'معلق'},
    {id: 'SO-20487', customer: 'تقنيات المستقبل', items: 9, amount: '6700.00', date: '2024-03-18', status: 'مدفوع'},
    {id: 'SO-20488', customer: 'الغذاء المتكامل', items: 3, amount: '2350.00', date: '2024-03-19', status: 'ملغى'},
  ];

  readonly fixedRows: readonly ErpTableRow[] = Array.from({length: 20}, (_, index) => {
    const source = this.referenceEmployeeRows[index % this.referenceEmployeeRows.length];
    return {...source, id: `fixed-${index + 1}`, employeeCode: `EMP-${1200 + index}`};
  });

  protected ownerName(row: ErpTableRow): string {
    return String(row['ownerName'] ?? 'مستخدم');
  }

  protected employeeName(row: ErpTableRow): string {
    return String(row['employee'] ?? 'موظف');
  }

  protected statusTone(value: unknown): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (value === 'نشط' || value === 'مدفوع') {
      return 'success';
    }
    if (value === 'إجازة' || value === 'قيد المراجعة' || value === 'معلق') {
      return 'warning';
    }
    if (value === 'موقوف' || value === 'متأخر') return 'danger';
    if (value === 'تجربة') return 'info';
    return 'neutral';
  }

  protected activateRow(row: ErpTableRow): void {
    this.activatedRowCode.set(String(row['id'] ?? row['code'] ?? '—'));
  }

  protected resetColumns(): void {
    this.visibleColumnKeys.set(this.columns.map((column) => column.key));
  }
}
