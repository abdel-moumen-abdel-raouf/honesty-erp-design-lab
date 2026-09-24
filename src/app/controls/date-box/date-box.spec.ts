import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpDateBox} from './date-box';

describe('ErpDateBox', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpDateBox]}));
  function create() { const fixture = TestBed.createComponent(ErpDateBox); fixture.componentRef.setInput('label', 'Date'); fixture.detectChanges(); return fixture; }

  it('creates with the exact ISO-date defaults and non-native trigger', () => {
    const fixture = create(); const control = fixture.componentInstance; const host = fixture.nativeElement as HTMLElement;
    expect(reflectComponentType(ErpDateBox)?.selector).toBe('erp-date-box');
    expect(control.min()).toBeNull(); expect(control.max()).toBeNull(); expect(control.weekStartsOn()).toBe(0); expect(control.locale()).toBeNull();
    expect(host.querySelector('input[type="date"]')).toBeNull(); expect(host.querySelector('button')).toBeTruthy();
  });

  it('normalizes ISO dates and clamps them to configured bounds', () => {
    const fixture = create(); const control = fixture.componentInstance;
    fixture.componentRef.setInput('min', '2026-01-10'); fixture.componentRef.setInput('max', '2026-01-20'); fixture.detectChanges();
    control.writeValue('2026-01-01'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-date-box-value')).toBe('2026-01-10');
    control.writeValue('invalid'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-date-box-value')).toBe(false);
  });

  it('opens on ArrowDown and commits only a confirmed staged result', async () => {
    const fixture = create(); const control = fixture.componentInstance; const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); control.registerOnChange(onChange);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    expect(manager.entries().length).toBe(1); manager.entries()[0].ref.dismiss('cancel'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click(); manager.entries()[0].ref.close('2026-05-04'); await Promise.resolve();
    expect(onChange).toHaveBeenCalledOnce(); expect(onChange).toHaveBeenCalledWith('2026-05-04');
  });
});
