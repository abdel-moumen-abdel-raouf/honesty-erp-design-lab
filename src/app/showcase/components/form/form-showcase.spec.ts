import {TestBed} from '@angular/core/testing';
import {ErpFormShowcase} from './form-showcase';

describe('ErpFormShowcase', () => {
  it('renders a composed supplier form and records submit and reset intents', () => {
    const fixture = TestBed.createComponent(ErpFormShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('erp-form-section')).not.toBeNull();
    expect(target.querySelector('erp-form-actions')).not.toBeNull();
    expect(target.querySelectorAll('erp-text-box')).toHaveLength(2);
    expect(target.textContent).toContain('بيانات المورد');

    const buttons = Array.from(target.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.includes('حفظ المورد'))?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('submitRequested');

    buttons.find((button) => button.textContent?.includes('إعادة الضبط'))?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('resetRequested');
  });
});
