import {TestBed} from '@angular/core/testing';
import {ErpEntityReviewContext} from '../entity-form/entity-form-contracts';
import {ErpEntityReview} from './entity-review';

const CONTEXT: ErpEntityReviewContext = {
  $implicit: {name: 'شركة النيل', password: 'secret', active: true, branch: 'cairo', categories: ['a', 'b'], limit: 125000},
  values: {name: 'شركة النيل', password: 'secret', active: true, branch: 'cairo', categories: ['a', 'b'], limit: 125000},
  schema: {
    id: 'supplier', label: 'المورد',
    sections: [
      {kind: 'fields', id: 'identity', title: 'بيانات المورد', fields: [
        {kind: 'text', key: 'name', label: 'الاسم'},
        {kind: 'password', key: 'password', label: 'كلمة المرور'},
        {kind: 'checkbox', key: 'active', label: 'نشط'},
        {kind: 'select', key: 'branch', label: 'الفرع', options: [{value: 'cairo', label: 'القاهرة'}]},
        {kind: 'select', key: 'categories', label: 'التصنيفات', multiple: true, options: [{value: 'a', label: 'أ'}, {value: 'b', label: 'ب'}]},
        {kind: 'money', key: 'limit', label: 'الحد', currency: 'EGP'},
        {kind: 'text', key: 'missing', label: 'غير مسجل'},
      ]},
      {kind: 'custom', id: 'custom', title: 'بيانات مخصصة', outlet: 'custom'},
    ],
    steps: [{id: 'review', label: 'المراجعة', sectionIds: ['identity', 'custom'], review: true}],
    actions: {submitLabel: 'حفظ'},
  },
  step: {id: 'review', label: 'المراجعة', sectionIds: ['identity', 'custom'], review: true},
};

describe('ErpEntityReview', () => {
  it('renders immutable review values through ERP owners', () => {
    const fixture = TestBed.createComponent(ErpEntityReview);
    fixture.componentRef.setInput('context', CONTEXT);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('erp-form-section')).toHaveLength(2);
    expect(root.querySelectorAll('[data-entity-review-field]')).toHaveLength(7);
    for (const value of ['شركة النيل', '••••••••', 'نعم', 'القاهرة', 'أ، ب', '125,000 EGP', 'غير متوفر', 'محتوى مخصص يقدمه المستهلك']) {
      expect(root.textContent).toContain(value);
    }
    expect(root.querySelectorAll('erp-text').length).toBeGreaterThan(0);
    expect([...root.querySelectorAll<HTMLElement>('dd erp-text')].every((value) => value.dir === 'auto')).toBe(true);
  });

  it('keeps values immutable and compact presentation controlled', () => {
    const fixture = TestBed.createComponent(ErpEntityReview);
    fixture.componentRef.setInput('context', CONTEXT);
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-entity-review-compact')).toBe('true');
    expect(CONTEXT.values['name']).toBe('شركة النيل');
  });

  it('fails deterministically for a missing review section', () => {
    const fixture = TestBed.createComponent(ErpEntityReview);
    fixture.componentRef.setInput('context', {...CONTEXT, step: {...CONTEXT.step, sectionIds: ['missing']}});
    expect(() => fixture.detectChanges()).toThrow(/references missing section missing/);
  });
});
