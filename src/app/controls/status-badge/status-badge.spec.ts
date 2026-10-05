import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from './status-badge';

describe('ErpStatusBadge', () => {
  it('renders semantic noninteractive evidence without live-region semantics', () => {
    const fixture = TestBed.createComponent(ErpStatusBadge);
    fixture.componentRef.setInput('label', 'نشط');
    fixture.componentRef.setInput('tone', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-status-badge-tone')).toBe('success');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
    expect(fixture.nativeElement.getAttribute('aria-live')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('نشط');
  });

  it('supports all controlled tones, sizes, and an optional semantic icon', () => {
    const fixture = TestBed.createComponent(ErpStatusBadge);
    fixture.componentRef.setInput('label', 'حالة');
    for (const tone of ['neutral', 'success', 'warning', 'danger', 'info'] as const) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-tone')).toBe(tone);
    }
    for (const size of ['sm', 'md', 'lg'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-size')).toBe(size);
    }
    fixture.componentRef.setInput('icon', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon')).not.toBeNull();
  });
});
