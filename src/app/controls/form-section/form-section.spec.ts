import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFormSection} from './form-section';

@Component({selector: 'app-form-section-host', imports: [ErpFormSection], template: '<erp-form-section title="بيانات أساسية" description="وصف المجموعة" compact><span erpFormSectionActions data-actions>إجراء</span><span data-content>حقل</span></erp-form-section>'})
class FormSectionHost {}

describe('ErpFormSection', () => {
  it('renders semantic title, optional description, actions, content, and compact state', () => {
    const fixture = TestBed.createComponent(FormSectionHost); fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('erp-form-section');
    const section = host.querySelector('section');
    expect(section.getAttribute('aria-labelledby')).toBeTruthy();
    expect(host.textContent).toContain('بيانات أساسية'); expect(host.textContent).toContain('وصف المجموعة');
    expect(host.querySelector('[data-actions]')).not.toBeNull(); expect(host.querySelector('[data-content]')).not.toBeNull();
    expect(host.getAttribute('data-form-section-compact')).toBe('true');
  });
});
