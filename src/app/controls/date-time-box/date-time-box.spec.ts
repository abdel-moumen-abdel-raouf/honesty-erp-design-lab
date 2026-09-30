import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpDateTimeBox} from './date-time-box';

describe('ErpDateTimeBox', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpDateTimeBox]}));
  function create() { const fixture = TestBed.createComponent(ErpDateTimeBox); fixture.componentRef.setInput('label', 'Date time'); fixture.detectChanges(); return fixture; }
  it('creates as a local date-time CVA without a native picker', () => { const fixture = create(); const control = fixture.componentInstance; expect(reflectComponentType(ErpDateTimeBox)?.selector).toBe('erp-date-time-box'); expect(control.min()).toBeNull(); expect(control.max()).toBeNull(); expect(control.locale()).toBe('ar-EG'); expect(control.pattern()).toBeNull(); expect(control.overlayConfig()).toBeNull(); expect((fixture.nativeElement as HTMLElement).querySelector('input[type="datetime-local"]')).toBeNull(); });
  it('accepts exact local YYYY-MM-DDTHH:mm and rejects invalid values', () => { const fixture = create(); fixture.componentInstance.writeValue('2026-05-04T09:35'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-date-time-box-value')).toBe('2026-05-04T09:35'); fixture.componentInstance.writeValue('2026-02-30T09:35'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-date-time-box-value')).toBe(false); });
  it('does not commit dismissal and commits one combined confirmation', async () => { const fixture = create(); const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); fixture.componentInstance.registerOnChange(onChange); const trigger = (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement; trigger.click(); const dismissed = manager.entries()[0].ref; dismissed.dismiss('cancel'); manager.completeTransition(dismissed.id, 'leaving'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled(); trigger.click(); const confirmed = manager.entries()[0].ref; confirmed.close('2026-05-04T09:35'); manager.completeTransition(confirmed.id, 'leaving'); await Promise.resolve(); expect(onChange).toHaveBeenCalledOnce(); });
  it('applies the date-time pattern and semantic parser to confirmed values', async () => { const fixture = create(); const onChange = vi.fn(); fixture.componentInstance.registerOnChange(onChange); fixture.componentRef.setInput('pattern', '^2026-05-\\d{2}T\\d{2}:\\d{2}$'); fixture.detectChanges(); (fixture.nativeElement as HTMLElement).querySelector('button')?.click(); const manager = TestBed.inject(ErpOverlayManager); const ref = manager.entries()[0].ref; ref.close('2026-02-30T09:35'); manager.completeTransition(ref.id, 'leaving'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled(); });

  it('exposes min/max validation for local date-time values', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    fixture.componentRef.setInput('min', '2026-05-04T09:00');
    fixture.componentRef.setInput('max', '2026-05-04T17:00');
    fixture.detectChanges();

    control.writeValue('2026-05-04T18:00');
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement).getAttribute(
        'data-date-time-box-value',
      ),
    ).toBe('2026-05-04T18:00');
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.validationIssues().map((issue) => issue.code)).toContain(
      'datetime.max',
    );
  });

});
