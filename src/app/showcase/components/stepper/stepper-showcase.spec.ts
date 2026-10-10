import {TestBed} from '@angular/core/testing';
import {ErpStepperShowcase} from './stepper-showcase';

describe('ErpStepperShowcase', () => {
  it('renders projected ERP content and synchronizes the active step model', () => {
    const fixture = TestBed.createComponent(ErpStepperShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;
    const buttons = target.querySelectorAll<HTMLButtonElement>('[role="tab"]');

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(buttons).toHaveLength(4);
    expect(buttons[3].disabled).toBe(true);
    expect(target.getAttribute('data-stepper-active')).toBe('account');
    expect(target.querySelector('[role="tabpanel"]')?.textContent).toContain(
      'الحد الائتماني',
    );

    buttons[2].click();
    fixture.detectChanges();
    expect(target.getAttribute('data-stepper-active')).toBe('documents');
    expect(target.querySelector('[role="tabpanel"]')?.textContent).toContain(
      'المستندات الداعمة',
    );
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'changed: documents',
    );
  });
});
