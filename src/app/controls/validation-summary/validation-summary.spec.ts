import {TestBed} from '@angular/core/testing';
import {vi} from 'vitest';
import {ErpFormValidationIssue} from '../forms-family/forms-contracts';
import {ErpValidationSummary} from './validation-summary';

describe('ErpValidationSummary', () => {
  const issues: readonly ErpFormValidationIssue[] = [
    {key: 'name-required', message: 'الاسم مطلوب', fieldLabel: 'الاسم', targetId: 'name'},
    {key: 'email-invalid', message: 'البريد غير صالح', fieldLabel: 'البريد'},
  ];

  it('renders nothing for an empty issue source', () => {
    const fixture = TestBed.createComponent(ErpValidationSummary); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-alert')).toBeNull();
  });

  it('renders stable keyed issues in one accessible alert and emits activation intent', () => {
    const fixture = TestBed.createComponent(ErpValidationSummary); fixture.componentRef.setInput('issues', issues); fixture.detectChanges();
    const spy = vi.fn(); fixture.componentInstance.issueActivated.subscribe(spy);
    const alert = fixture.nativeElement.querySelector('erp-alert');
    expect(alert.getAttribute('role')).toBe('alert');
    const buttons = fixture.nativeElement.querySelectorAll('erp-button button'); expect(buttons).toHaveLength(2);
    buttons[0].click(); expect(spy).toHaveBeenCalledWith(issues[0]);
  });
});
