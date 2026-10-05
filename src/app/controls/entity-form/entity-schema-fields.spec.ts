import {Component, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpText} from '../../primitives/text/text';
import {ErpNumberBox} from '../number-box/number-box';
import {ErpTextBox} from '../text-box/text-box';
import {
  ErpEntityFieldDefinition,
  ErpEntityFieldValueChange,
  ErpEntityFormValues,
} from './entity-form-contracts';
import {ErpEntityCustomFieldOutlet} from './entity-form-outlets';
import {ErpEntitySchemaFields} from './entity-schema-fields';

@Component({
  selector: 'app-entity-schema-fields-host',
  imports: [ErpEntityCustomFieldOutlet, ErpEntitySchemaFields, ErpText],
  template: `
    <erp-entity-schema-fields
      [fields]="fields"
      [values]="values()"
      [issues]="issues"
      (fieldValueChanged)="changed.set($event)"
    >
      <ng-template erpEntityCustomField="warehouse" let-field let-value="value" let-update="update">
        <erp-text data-custom-field (click)="update('W-2')">{{ field.label }}:{{ value }}</erp-text>
      </ng-template>
    </erp-entity-schema-fields>
  `,
})
class EntitySchemaFieldsHost {
  readonly fields: readonly ErpEntityFieldDefinition[] = [
    {kind: 'text', key: 'name', label: 'الاسم', required: true},
    {kind: 'number', key: 'count', label: 'العدد', min: 0},
    {kind: 'select', key: 'branch', label: 'الفرع', options: [{value: 'cairo', label: 'القاهرة'}]},
    {kind: 'checkbox', key: 'active', label: 'نشط'},
    {kind: 'custom', key: 'warehouse', label: 'المخزن', outlet: 'warehouse'},
  ];
  readonly values = signal<ErpEntityFormValues>({
    name: 'السجل', count: 2, branch: 'cairo', active: true, warehouse: 'W-1',
  });
  readonly issues = [{key: 'name-required', message: 'الاسم مطلوب', fieldLabel: 'الاسم', targetId: 'name'}];
  readonly changed = signal<ErpEntityFieldValueChange | null>(null);
}

describe('ErpEntitySchemaFields', () => {
  it('routes supported definitions through approved ERP controls and forwards validation', () => {
    const fixture = TestBed.createComponent(EntitySchemaFieldsHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('erp-text-box')).not.toBeNull();
    expect(root.querySelector('erp-number-box')).not.toBeNull();
    expect(root.querySelector('erp-select')).not.toBeNull();
    expect(root.querySelector('erp-check-box')).not.toBeNull();
    const text = fixture.debugElement.children[0].componentInstance as ErpEntitySchemaFields;
    expect(text).toBeTruthy();
    expect(root.querySelector('erp-text-box')?.getAttribute('data-field-configuration-state')).toBe('ready');
    const textBox = fixture.debugElement.query(By.directive(ErpTextBox)).componentInstance as ErpTextBox;
    expect(textBox.errors()).toContain('الاسم مطلوب');
  });

  it('emits controlled changes without mutating the input value object', () => {
    const fixture = TestBed.createComponent(EntitySchemaFieldsHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('erp-text-box input') as HTMLInputElement;
    input.value = 'قيمة جديدة';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    fixture.detectChanges();
    expect(fixture.componentInstance.changed()).toEqual({key: 'name', value: 'قيمة جديدة'});
    expect(fixture.componentInstance.values()['name']).toBe('السجل');
  });

  it('forwards disabled and read-only configuration to supported ERP owners', () => {
    const fixture = TestBed.createComponent(ErpEntitySchemaFields);
    fixture.componentRef.setInput('fields', [
      {kind: 'text', key: 'code', label: 'الرمز', readOnly: true},
      {kind: 'number', key: 'count', label: 'العدد', disabled: true},
    ]);
    fixture.componentRef.setInput('values', {code: 'A-1', count: 2});
    fixture.detectChanges();
    const textBox = fixture.debugElement.query(By.directive(ErpTextBox)).componentInstance as ErpTextBox;
    const numberBox = fixture.debugElement.query(By.directive(ErpNumberBox)).componentInstance as ErpNumberBox;
    expect(textBox.readonly()).toBe(true);
    expect(numberBox.disabled()).toBe(true);
  });

  it('supplies custom outlet context and typed update intent', () => {
    const fixture = TestBed.createComponent(EntitySchemaFieldsHost);
    fixture.detectChanges();
    const custom = fixture.nativeElement.querySelector('[data-custom-field]') as HTMLElement;
    expect(custom.textContent).toContain('المخزن:W-1');
    custom.click();
    expect(fixture.componentInstance.changed()).toEqual({key: 'warehouse', value: 'W-2'});
  });

  it('fails rather than silently omitting a custom field without its outlet', () => {
    const fixture = TestBed.createComponent(ErpEntitySchemaFields);
    fixture.componentRef.setInput('fields', [{kind: 'custom', key: 'x', label: 'خاص', outlet: 'missing'}]);
    fixture.componentRef.setInput('values', {x: null});
    expect(() => fixture.detectChanges()).toThrow(/requires outlet missing/);
  });

  it('renders every bounded built-in kind through its existing ERP owner', () => {
    const fields: readonly ErpEntityFieldDefinition[] = [
      {kind: 'text', key: 'text', label: 'نص'},
      {kind: 'textarea', key: 'textarea', label: 'مساحة نص'},
      {kind: 'password', key: 'password', label: 'كلمة مرور'},
      {kind: 'url', key: 'url', label: 'رابط'},
      {kind: 'telephone', key: 'telephone', label: 'هاتف'},
      {kind: 'number', key: 'number', label: 'رقم'},
      {kind: 'money', key: 'money', label: 'مال', currency: 'EGP'},
      {kind: 'checkbox', key: 'checkbox', label: 'اختيار'},
      {kind: 'radio', key: 'radio', label: 'راديو', options: [{value: 'a', label: 'أ'}]},
      {kind: 'select', key: 'select', label: 'قائمة', options: [{value: 'a', label: 'أ'}]},
      {kind: 'date', key: 'date', label: 'تاريخ'},
      {kind: 'time', key: 'time', label: 'وقت'},
      {kind: 'date-time', key: 'dateTime', label: 'تاريخ ووقت'},
    ];
    const fixture = TestBed.createComponent(ErpEntitySchemaFields);
    fixture.componentRef.setInput('fields', fields);
    fixture.componentRef.setInput('values', {});
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    for (const selector of [
      'erp-text-box', 'erp-text-area-box', 'erp-password-box', 'erp-url-box',
      'erp-tel-box', 'erp-number-box', 'erp-money-box', 'erp-check-box',
      'erp-radio-group', 'erp-select', 'erp-date-box', 'erp-time-box',
      'erp-date-time-box',
    ]) {
      expect(root.querySelector(selector), selector).not.toBeNull();
    }
  });
});
