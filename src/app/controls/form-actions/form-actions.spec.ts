import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpButton} from '../button/button';
import {ErpFormActions} from './form-actions';

@Component({selector: 'app-form-actions-host', imports: [ErpButton, ErpFormActions], template: '<erp-form-actions><erp-button erpFormActionsSecondary label="إلغاء" disabled/><erp-button erpFormActionsPrimary label="حفظ"/></erp-form-actions>'})
class FormActionsHost {}

describe('ErpFormActions', () => {
  it('owns named primary and secondary projections while consumer buttons own disabled state', () => {
    const fixture = TestBed.createComponent(FormActionsHost); fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('erp-form-actions');
    expect(host.querySelector('.form-actions__primary erp-button')).not.toBeNull();
    expect(host.querySelector('.form-actions__secondary button')?.disabled).toBe(true);
  });
});
