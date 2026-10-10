import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ErpButton} from '../../controls/button/button';
import {ErpDataPage, ErpDataPageSlot} from '../../controls/data-page/data-page';
import {
  ErpEntityFormSchema,
  ErpEntityFormValueChange,
  ErpEntityFormValues,
  ErpEntityReviewContext,
} from '../../controls/entity-form/entity-form-contracts';
import {ErpEntityFormReviewTemplate} from '../../controls/entity-form/entity-form-outlets';
import {ErpStandardEntityForm} from '../../controls/entity-form/standard-entity-form';
import {ErpEntityReview} from '../../controls/entity-review/entity-review';
import {ErpPage} from '../../controls/page/page';
import {ErpPageHeader} from '../../controls/page-header/page-header';
import {ErpPageShell} from '../../controls/page-shell/page-shell';
import {ErpDataColumn} from '../../controls/data-table/data-table-contracts';
import {ErpTableRow} from '../../controls/table/table';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

export type ErpReviewPlannedPattern = 'entity-wizard' | 'entity-directory' | 'entity-detail';
type EntityDetailMode = 'view' | 'edit' | 'review';

const ENTITY_SCHEMA: ErpEntityFormSchema = {
  id: 'customer-profile',
  label: 'بطاقة العميل',
  description: 'تركيب مراجعة يثبت انتقال الحالة الذي يملكه المستهلك.',
  sections: [
    {
      kind: 'fields',
      id: 'identity',
      title: 'البيانات الأساسية',
      description: 'هوية العميل وبيانات التواصل.',
      fields: [
        {key: 'name', kind: 'text', label: 'اسم العميل', required: true},
        {key: 'phone', kind: 'telephone', label: 'هاتف التواصل'},
        {key: 'email', kind: 'text', label: 'البريد الإلكتروني'},
        {key: 'active', kind: 'checkbox', label: 'حساب نشط'},
      ],
    },
    {
      kind: 'fields',
      id: 'commercial',
      title: 'بيانات التعامل',
      description: 'التصنيف والفرع والحد الائتماني.',
      fields: [
        {
          key: 'classification',
          kind: 'radio',
          label: 'التصنيف',
          options: [
            {value: 'strategic', label: 'استراتيجي'},
            {value: 'standard', label: 'قياسي'},
          ],
        },
        {
          key: 'branch',
          kind: 'select',
          label: 'الفرع',
          options: [
            {value: 'cairo', label: 'القاهرة'},
            {value: 'alexandria', label: 'الإسكندرية'},
          ],
        },
        {key: 'limit', kind: 'money', label: 'الحد الائتماني', currency: 'EGP', min: 0},
      ],
    },
  ],
  steps: [
    {id: 'identity-step', label: 'الهوية', sectionIds: ['identity']},
    {id: 'commercial-step', label: 'التعامل', sectionIds: ['commercial']},
    {id: 'review-step', label: 'المراجعة', sectionIds: ['identity', 'commercial'], review: true},
  ],
  actions: {submitLabel: 'إرسال طلب الحفظ', resetLabel: 'إعادة الضبط', cancelLabel: 'إلغاء'},
};

const INITIAL_VALUES: ErpEntityFormValues = {
  name: 'شركة النيل للتوريدات',
  phone: '+201005550101',
  email: 'accounts@nile-supplies.example',
  active: true,
  classification: 'strategic',
  branch: 'cairo',
  limit: 250000,
};

const DIRECTORY_COLUMNS: readonly ErpDataColumn[] = [
  {key: 'name', label: 'العميل', sortable: true, required: true, initialWidth: 240, overflow: 'ellipsis'},
  {key: 'city', label: 'المدينة', hideable: true, initialWidth: 140, overflow: 'ellipsis'},
  {key: 'classification', label: 'التصنيف', hideable: true, initialWidth: 150, overflow: 'ellipsis'},
  {key: 'status', label: 'الحالة', hideable: true, initialWidth: 130, overflow: 'ellipsis'},
];

const DIRECTORY_ROWS: readonly ErpTableRow[] = [
  {id: 'customer-1', name: 'شركة النيل للتوريدات', city: 'القاهرة', classification: 'استراتيجي', status: 'نشط'},
  {id: 'customer-2', name: 'مؤسسة الصفا التجارية', city: 'الإسكندرية', classification: 'قياسي', status: 'قيد المراجعة'},
  {id: 'customer-3', name: 'مجموعة المستقبل للتجارة والخدمات المتكاملة', city: 'المنصورة', classification: 'استراتيجي', status: 'نشط'},
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-review-planned-ui-pattern',
  imports: [
    ErpButton,
    ErpDataPage,
    ErpDataPageSlot,
    ErpEntityFormReviewTemplate,
    ErpEntityReview,
    ErpInline,
    ErpPage,
    ErpPageHeader,
    ErpPageShell,
    ErpStack,
    ErpStandardEntityForm,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './planned-ui-patterns.html',
  styleUrl: './planned-ui-patterns.scss',
  host: {'[attr.data-review-pattern]': 'pattern'},
})
export class ErpReviewPlannedUiPattern {
  private readonly route = inject(ActivatedRoute);
  readonly pattern = this.route.snapshot.data['pattern'] as ErpReviewPlannedPattern;
  readonly title = this.pattern === 'entity-wizard'
    ? 'نمط معالج الكيان'
    : this.pattern === 'entity-directory'
      ? 'نمط دليل الكيانات'
      : 'نمط تفاصيل الكيان';
  readonly description = this.pattern === 'entity-wizard'
    ? 'تركيب مراجعة فوق StandardEntityForm وStepper؛ التنقل والحفظ يظلان intents يملكها المستهلك.'
    : this.pattern === 'entity-directory'
      ? 'تركيب مراجعة فوق DataPage؛ البيانات والبحث والاختيار والتنقل كلها حالة يملكها المستهلك.'
      : 'تركيب مراجعة للعرض والتحرير والمراجعة فوق Page وStandardEntityForm وEntityReview.';

  readonly schema = ENTITY_SCHEMA;
  readonly values = signal<ErpEntityFormValues>(INITIAL_VALUES);
  readonly activeStepId = signal('identity-step');
  readonly disabled = signal(false);
  readonly busy = signal(false);
  readonly detailMode = signal<EntityDetailMode>('view');
  readonly directoryRows = signal<readonly ErpTableRow[]>(DIRECTORY_ROWS);
  readonly directoryLoading = signal(false);
  readonly directoryCompact = signal(false);
  readonly selectedKeys = signal<readonly string[]>([]);
  readonly lastEvent = signal('لم يقع حدث بعد.');

  readonly reviewContext = computed<ErpEntityReviewContext>(() => ({
    $implicit: this.values(),
    values: this.values(),
    schema: this.schema,
    step: this.schema.steps?.find((step) => step.id === 'review-step') ?? this.schema.steps![0],
  }));

  readonly directoryColumns = DIRECTORY_COLUMNS;
  readonly directoryFilters = [
    {key: 'name', label: 'العميل', placeholder: 'ابحث باسم العميل'},
    {key: 'city', label: 'المدينة', placeholder: 'ابحث بالمدينة'},
  ] as const;

  applyValue(change: ErpEntityFormValueChange): void {
    this.values.set(change.nextValues);
    this.record('valueChanged', change.key);
  }

  setStep(stepId: string): void {
    this.activeStepId.set(stepId);
    this.record('activeStepIdChange', stepId);
  }

  setDetailMode(mode: EntityDetailMode): void {
    this.detailMode.set(mode);
    this.record('detailModeChanged', mode);
  }

  toggleDirectoryRows(): void {
    this.directoryRows.update((rows) => rows.length ? [] : DIRECTORY_ROWS);
    this.record('directoryRowsChanged', this.directoryRows().length);
  }

  record(name: string, payload: unknown = null): void {
    this.lastEvent.set(`${name}: ${JSON.stringify(payload)}`);
  }
}
