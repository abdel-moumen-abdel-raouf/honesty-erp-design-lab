import {TestBed} from '@angular/core/testing';
import {ErpFormSectionShowcase} from './form-section-showcase';

describe('ErpFormSectionShowcase', () => {
  it('renders titled projected fields and observable section actions', () => {
    const fixture = TestBed.createComponent(ErpFormSectionShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('erp-text-box')).toHaveLength(2);
    expect(target.textContent).toContain('بيانات الحساب');
    expect(target.textContent).toContain('إضافة تصنيف');

    target.querySelector('button')?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('sectionActionPressed');
  });
});
