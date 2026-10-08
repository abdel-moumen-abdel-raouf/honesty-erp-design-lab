import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ErpButton} from '../../controls/button/button';
import {ErpCheckBox} from '../../controls/check-box/check-box';
import {ErpFormActions} from '../../controls/form-actions/form-actions';
import {ErpFormSection} from '../../controls/form-section/form-section';
import {ErpForm} from '../../controls/form/form';
import {ErpFormValidationIssue, ErpRepeaterItem, ErpStepDefinition} from '../../controls/forms-family/forms-contracts';
import {ErpRadioGroup} from '../../controls/radio-group/radio-group';
import {ErpSelectOption} from '../../controls/select/select-contracts';
import {ErpSelect} from '../../controls/select/select';
import {ErpTextBox} from '../../controls/text-box/text-box';
import {ErpValidationSummary} from '../../controls/validation-summary/validation-summary';
import {ErpContainer} from '../../primitives/container/container';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';
import {ErpReviewFormsTemplateEvidence} from '../../review-internals/forms-template-evidence/forms-template-evidence';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forms-batch',
  imports: [
    ErpButton,
    ErpCheckBox,
    ErpContainer,
    ErpForm,
    ErpFormActions,
    ErpFormSection,
    ErpGrid,
    ErpRadioGroup,
    ErpReviewFormsTemplateEvidence,
    ErpSection,
    ErpSelect,
    ErpStack,
    ErpSurface,
    ErpText,
    ErpTextBox,
    ErpValidationSummary,
  ],
  templateUrl: './forms-batch.html',
  styleUrl: './forms-batch.scss',
})
export class FormsBatch {
  readonly status = signal('لم يُرسل النموذج بعد');
  readonly issues = signal<readonly ErpFormValidationIssue[]>([]);
  readonly contacts = signal<readonly ErpRepeaterItem<{readonly name: string; readonly role: string}>[]>([
    {key: 'contact-1', value: {name: 'سارة محمد', role: 'مسؤولة المشتريات'}},
  ]);
  readonly activeStep = signal('identity');
  readonly busy = signal(false);
  readonly formDisabled = signal(false);
  private nextContact = 1;

  readonly selectOptions: readonly ErpSelectOption[] = [
    {value: 'cairo', label: 'فرع القاهرة'},
    {value: 'alexandria', label: 'فرع الإسكندرية'},
    {value: 'mansoura', label: 'فرع المنصورة'},
  ];
  readonly radioOptions = [
    {value: 'company', label: 'شركة'},
    {value: 'individual', label: 'فرد'},
  ];
  readonly steps: readonly ErpStepDefinition[] = [
    {id: 'identity', label: 'الهوية', description: 'البيانات الأساسية', completed: true},
    {id: 'contacts', label: 'جهات الاتصال', description: 'بيانات التواصل', optional: true},
    {id: 'review', label: 'المراجعة', description: 'التأكيد النهائي'},
  ];

  submit(): void {
    this.issues.set([
      {key: 'customer-name', fieldLabel: 'اسم العميل', message: 'أدخل اسمًا معتمدًا', targetId: 'forms-customer-name'},
    ]);
    this.status.set('تم استقبال نية الإرسال؛ حالة الميزة ما زالت مملوكة للمستهلك');
  }

  reset(): void {
    this.issues.set([]);
    this.status.set('تم استقبال نية إعادة الضبط');
  }

  addContact(): void {
    const key = `contact-${++this.nextContact}`;
    this.contacts.update((items) => [...items, {key, value: {name: 'جهة اتصال جديدة', role: 'دور جديد'}}]);
  }

  removeContact(key: string): void {
    this.contacts.update((items) => items.filter((item) => item.key !== key));
  }
}
