import {TestBed} from '@angular/core/testing';
import {ErpAlertShowcase} from './alert-showcase';

describe('ErpAlertShowcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpAlertShowcase]}).compileComponents();
  });

  it('renders one meaningful target with description, projected action, and dismissal evidence', () => {
    const fixture = TestBed.createComponent(ErpAlertShowcase);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const target = root.querySelector('erp-alert[data-showcase-target]') as HTMLElement;

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.textContent).toContain('توجد فاتورة تحتاج إلى مراجعة');
    expect(target.querySelectorAll('erp-button[erpalertaction]')).toHaveLength(1);
    expect(target.querySelectorAll('erp-tooltip erp-icon-button')).toHaveLength(1);

    (target.querySelector('erp-button[erpalertaction] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.lastEvent()).toBe('alertActionPressed: true');

    (target.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.lastEvent()).toContain('dismissed:');
  });

  it('applies every tone to the same target and preserves urgent semantics', () => {
    const fixture = TestBed.createComponent(ErpAlertShowcase);
    fixture.detectChanges();
    const target = fixture.nativeElement.querySelector('erp-alert[data-showcase-target]') as HTMLElement;
    const tone = fixture.componentInstance.controls.find((control) => control.name === 'tone')!;

    expect(tone.options).toEqual(['info', 'success', 'warning', 'danger']);
    for (const value of tone.options) {
      fixture.componentInstance.applyControl({control: tone, value});
      fixture.detectChanges();
      expect(target.getAttribute('data-alert-tone')).toBe(value);
    }
    expect(target.getAttribute('role')).toBe('alert');
  });
});
