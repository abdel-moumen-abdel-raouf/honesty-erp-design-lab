import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpAlert} from '../../controls/alert/alert';
import {
  ErpEntityFieldDefinition,
  ErpEntityFieldValueChange,
  ErpEntityFormSchema,
  ErpEntityFormValueChange,
  ErpEntityFormValues,
} from '../../controls/entity-form/entity-form-contracts';
import {ErpEntitySchemaFields} from '../../controls/entity-form/entity-schema-fields';
import {ErpFormValidationIssue} from '../../controls/forms-family/forms-contracts';
import {ErpContainer} from '../../primitives/container/container';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewEntityFormTemplateEvidence} from '../../review-internals/entity-form-template-evidence/entity-form-template-evidence';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-form-batch',
  imports: [
    ErpAlert,
    ErpContainer,
    ErpEntitySchemaFields,
    ErpReviewEntityFormTemplateEvidence,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './entity-form-batch.html',
  styleUrl: './entity-form-batch.scss',
})
export class EntityFormBatch {
  readonly values = signal<ErpEntityFormValues>({
    name: 'شركة الأفق للتوريدات',
    code: 'SUP-2048',
    annualValue: 125000,
    creditLimit: 50000,
    branch: 'cairo',
    category: 'supplier',
    active: true,
    establishedOn: '2022-04-18',
    reviewAt: '2026-10-06T10:30',
    referenceCode: 'REF-ERP-21',
    auditNote: 'تخضع المراجعة النهائية لمالك الميزة.',
  });
  readonly status = signal('لم تُرسل أي نية بعد');
  readonly issues = signal<readonly ErpFormValidationIssue[]>([
    {key: 'credit-review', fieldLabel: 'حد الائتمان', message: 'يتطلب مراجعة مالية', targetId: 'creditLimit'},
  ]);

  readonly fieldEvidence: readonly ErpEntityFieldDefinition[] = [
    {kind: 'text', key: 'name', label: 'اسم السجل', required: true},
    {kind: 'money', key: 'annualValue', label: 'القيمة السنوية', currency: 'EGP', min: 0},
    {kind: 'select', key: 'branch', label: 'الفرع', options: [
      {value: 'cairo', label: 'القاهرة'},
      {value: 'alexandria', label: 'الإسكندرية'},
    ]},
    {kind: 'checkbox', key: 'active', label: 'السجل نشط'},
  ];

  readonly schema: ErpEntityFormSchema = {
    id: 'master-record',
    label: 'نموذج السجل الرئيسي',
    description: 'تركيب CRUD مضبوط بلا HTTP أو امتلاك حالة مجال',
    actions: {submitLabel: 'حفظ السجل', resetLabel: 'إعادة الضبط', cancelLabel: 'إلغاء'},
    sections: [
      {kind: 'fields', id: 'identity', title: 'الهوية والتصنيف', description: 'بيانات السجل الأساسية', fields: [
        {kind: 'text', key: 'name', label: 'اسم السجل', required: true, minLength: 3},
        {kind: 'text', key: 'code', label: 'الكود', required: true, readOnly: true},
        {kind: 'select', key: 'branch', label: 'الفرع', required: true, options: [
          {value: 'cairo', label: 'القاهرة'},
          {value: 'alexandria', label: 'الإسكندرية'},
        ]},
        {kind: 'radio', key: 'category', label: 'التصنيف', options: [
          {value: 'supplier', label: 'مورد'},
          {value: 'customer', label: 'عميل'},
        ]},
        {kind: 'checkbox', key: 'active', label: 'السجل نشط'},
      ]},
      {kind: 'fields', id: 'financial', title: 'البيانات المالية والزمنية', fields: [
        {kind: 'number', key: 'creditLimit', label: 'حد الائتمان', min: 0, disabled: true},
        {kind: 'money', key: 'annualValue', label: 'القيمة السنوية', currency: 'EGP', min: 0},
        {kind: 'date', key: 'establishedOn', label: 'تاريخ الإنشاء'},
        {kind: 'date-time', key: 'reviewAt', label: 'موعد المراجعة'},
        {kind: 'custom', key: 'referenceCode', label: 'الرمز المرجعي المتخصص', description: 'Escape hatch لحقل معتمد', outlet: 'reference-code'},
      ]},
      {kind: 'custom', id: 'audit', title: 'بيانات التدقيق', outlet: 'audit-note'},
    ],
    steps: [
      {id: 'identity-step', label: 'الهوية', description: 'البيانات الأساسية', sectionIds: ['identity'], completed: true},
      {id: 'details-step', label: 'التفاصيل', description: 'المال والتدقيق', sectionIds: ['financial', 'audit']},
      {id: 'review-step', label: 'المراجعة', description: 'لقطة قبل نية الإرسال', sectionIds: [], review: true},
    ],
  };

  applyChange(change: ErpEntityFormValueChange): void {
    this.values.set(change.nextValues);
    this.status.set(`تغيّرت القيمة المضبوطة: ${change.key}`);
  }

  applyFieldChange(change: ErpEntityFieldValueChange): void {
    this.values.update((values) => ({...values, [change.key]: change.value}));
  }
}
