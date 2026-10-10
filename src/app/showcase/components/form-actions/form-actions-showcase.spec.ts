import {TestBed} from '@angular/core/testing';
import {ErpFormActionsShowcase} from './form-actions-showcase';

describe('ErpFormActionsShowcase', () => {
  it('renders both action slots and records the selected action', () => {
    const fixture = TestBed.createComponent(ErpFormActionsShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('erp-button')).toHaveLength(2);

    Array.from(target.querySelectorAll('button'))
      .find((button) => button.textContent?.includes('حفظ'))
      ?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('formSavePressed');
  });
});
