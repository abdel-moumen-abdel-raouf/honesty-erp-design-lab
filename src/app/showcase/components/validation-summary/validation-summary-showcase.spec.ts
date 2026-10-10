import {TestBed} from '@angular/core/testing';
import {ErpValidationSummaryShowcase} from './validation-summary-showcase';

describe('ErpValidationSummaryShowcase', () => {
  it('renders real issues and records issue activation', () => {
    const fixture = TestBed.createComponent(ErpValidationSummaryShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('button')).toHaveLength(2);
    expect(target.textContent).toContain('اسم الحساب');
    expect(target.textContent).toContain('الفرع');

    target.querySelector('button')?.click();
    fixture.detectChanges();
    expect(host.querySelector('[data-showcase-event-log]')?.textContent).toContain('issueActivated');
  });
});
