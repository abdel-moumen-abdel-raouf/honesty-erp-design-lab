import {Component, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ErpTextBox} from '../text-box/text-box';
import {
  ErpEntityFormSchema,
  ErpEntityFormSubmitIntent,
  ErpEntityFormValueChange,
  ErpEntityFormValues,
} from './entity-form-contracts';
import {
  ErpEntityCustomFieldOutlet,
  ErpEntityCustomSectionOutlet,
  ErpEntityFormReviewTemplate,
} from './entity-form-outlets';
import {ErpStandardEntityForm} from './standard-entity-form';

const schema: ErpEntityFormSchema = {
  id: 'customer',
  label: 'سجل العميل',
  description: 'نموذج مخطط مضبوط',
  actions: {submitLabel: 'حفظ', resetLabel: 'إعادة', cancelLabel: 'إلغاء'},
  sections: [
    {kind: 'fields', id: 'identity', title: 'الهوية', fields: [
      {kind: 'text', key: 'name', label: 'الاسم'},
      {kind: 'custom', key: 'code', label: 'الرمز', outlet: 'code'},
    ]},
    {kind: 'custom', id: 'contacts', title: 'التواصل', outlet: 'contacts'},
  ],
  steps: [
    {id: 'details', label: 'البيانات', sectionIds: ['identity', 'contacts']},
    {id: 'review', label: 'المراجعة', sectionIds: [], review: true, optional: true},
  ],
};

@Component({
  selector: 'app-standard-entity-form-host',
  imports: [
    ErpEntityCustomFieldOutlet,
    ErpEntityCustomSectionOutlet,
    ErpEntityFormReviewTemplate,
    ErpStandardEntityForm,
    ErpTextBox,
    FormsModule,
  ],
  template: `
    <erp-standard-entity-form
      [schema]="schema"
      [values]="values()"
      [issues]="issues"
      [disabled]="disabled()"
      [busy]="busy()"
      [(activeStepId)]="activeStep"
      (valueChanged)="change.set($event)"
      (submitRequested)="submit.set($event)"
      (resetRequested)="resets.update(value => value + 1)"
      (cancelRequested)="cancels.update(value => value + 1)"
    >
      <ng-template erpEntityCustomField="code" let-value="value" let-update="update">
        <erp-text-box data-code label="الرمز المخصص" [ngModel]="value" (ngModelChange)="update($event)" />
      </ng-template>
      <ng-template erpEntityCustomSection="contacts" let-values="values" let-update="update">
        <erp-text-box data-contact label="جهة الاتصال" [ngModel]="values.contact ?? ''" (ngModelChange)="update({key: 'contact', value: $event})" />
      </ng-template>
      <ng-template erpEntityFormReview let-values>
        <erp-text-box data-review label="ملخص القراءة" [ngModel]="values.name" readonly />
      </ng-template>
    </erp-standard-entity-form>
  `,
})
class StandardEntityFormHost {
  readonly schema = schema;
  readonly values = signal<ErpEntityFormValues>({name: 'شركة النور', code: 'C-1', contact: 'أحمد'});
  readonly issues = [{key: 'name', message: 'راجع الاسم', targetId: 'name'}];
  readonly activeStep = signal('details');
  readonly disabled = signal(false);
  readonly busy = signal(false);
  readonly change = signal<ErpEntityFormValueChange | null>(null);
  readonly submit = signal<ErpEntityFormSubmitIntent | null>(null);
  readonly resets = signal(0);
  readonly cancels = signal(0);
}

describe('ErpStandardEntityForm', () => {
  it('composes the approved Form, Section, Summary, Actions, SchemaFields, and Stepper owners', () => {
    const fixture = TestBed.createComponent(StandardEntityFormHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('erp-form')).not.toBeNull();
    expect(root.querySelectorAll('erp-form-section')).toHaveLength(2);
    expect(root.querySelector('erp-validation-summary')).not.toBeNull();
    expect(root.querySelector('erp-form-actions')).not.toBeNull();
    expect(root.querySelector('erp-entity-schema-fields')).not.toBeNull();
    expect(root.querySelector('erp-stepper')).not.toBeNull();
    expect(root.querySelector('form')?.getAttribute('aria-labelledby')).toBeTruthy();
  });

  it('provides custom field and section contexts while preserving controlled immutable values', () => {
    const fixture = TestBed.createComponent(StandardEntityFormHost);
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('[data-code] input') as HTMLInputElement;
    field.value = 'C-2';
    field.dispatchEvent(new Event('input', {bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.change()).toMatchObject({key: 'code', value: 'C-2'});
    expect(fixture.componentInstance.change()?.nextValues['code']).toBe('C-2');
    expect(fixture.componentInstance.values()['code']).toBe('C-1');

    const section = fixture.nativeElement.querySelector('[data-contact] input') as HTMLInputElement;
    section.value = 'سارة';
    section.dispatchEvent(new Event('input', {bubbles: true}));
    expect(fixture.componentInstance.change()).toMatchObject({key: 'contact', value: 'سارة'});
  });

  it('emits submit, reset, and cancel intents without persistence ownership', () => {
    const fixture = TestBed.createComponent(StandardEntityFormHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    (root.querySelector('form') as HTMLFormElement).dispatchEvent(new SubmitEvent('submit', {bubbles: true, cancelable: true}));
    expect(fixture.componentInstance.submit()).toEqual({schemaId: 'customer', values: fixture.componentInstance.values()});
    (root.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('reset', {bubbles: true, cancelable: true}));
    root.querySelectorAll('erp-form-actions button')[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(fixture.componentInstance.resets()).toBe(1);
    expect(fixture.componentInstance.cancels()).toBe(1);
  });

  it('suppresses submit intent while disabled or busy', () => {
    const fixture = TestBed.createComponent(StandardEntityFormHost);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new SubmitEvent('submit', {bubbles: true, cancelable: true}));
    expect(fixture.componentInstance.submit()).toBeNull();

    fixture.componentInstance.disabled.set(false);
    fixture.componentInstance.busy.set(true);
    fixture.detectChanges();
    form.dispatchEvent(new SubmitEvent('submit', {bubbles: true, cancelable: true}));
    expect(fixture.componentInstance.submit()).toBeNull();
  });

  it('fails deterministically when a runtime schema contains an unsupported field kind', () => {
    const fixture = TestBed.createComponent(ErpStandardEntityForm);
    fixture.componentRef.setInput('schema', {
      ...schema,
      steps: undefined,
      sections: [{
        kind: 'fields',
        id: 'invalid',
        title: 'غير صالح',
        fields: [{kind: 'file', key: 'document', label: 'مستند'}],
      }],
    } as unknown as ErpEntityFormSchema);
    fixture.componentRef.setInput('values', {});
    expect(() => fixture.detectChanges()).toThrow(/Unsupported entity field kind: file/);
  });

  it('renders a supplied review projection only on the configured review step', () => {
    const fixture = TestBed.createComponent(StandardEntityFormHost);
    fixture.componentInstance.activeStep.set('review');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-review]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-code]')).toBeNull();
  });
});
