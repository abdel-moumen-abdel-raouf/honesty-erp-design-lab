import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpButton} from '../button/button';
import {ErpAlert} from './alert';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpAlert, ErpButton],
  template: `<erp-alert title="تنبيه"><erp-button erpAlertAction label="إجراء" /></erp-alert>`,
})
class AlertProjectionHost {}

describe('ErpAlert', () => {
  it('uses status semantics except for urgent danger alerts', () => {
    const fixture = TestBed.createComponent(ErpAlert);
    fixture.componentRef.setInput('title', 'معلومة');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.querySelector('erp-icon')).not.toBeNull();

    fixture.componentRef.setInput('tone', 'danger');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('alert');
  });

  it('emits dismissal only through the optional ERP icon action', () => {
    const fixture = TestBed.createComponent(ErpAlert);
    fixture.componentRef.setInput('title', 'تعذر الحفظ');
    fixture.componentRef.setInput('tone', 'danger');
    const spy = vi.fn();
    fixture.componentInstance.dismissed.subscribe(spy);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon-button')).toBeNull();

    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    expect(spy).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('erp-tooltip')).not.toBeNull();
  });

  it('projects optional ERP actions without creating overlay ownership', () => {
    const fixture = TestBed.createComponent(AlertProjectionHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-alert erp-button')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-overlay-host')).toBeNull();
  });
});
