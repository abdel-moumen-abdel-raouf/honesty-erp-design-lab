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
    expect(control.min()).toBeNull(); expect(control.max()).toBeNull(); expect(control.weekStartsOn()).toBe(0); expect(control.locale()).toBe('ar-EG'); expect(control.pattern()).toBeNull(); expect(control.overlayConfig()).toBeNull();
    expect(host.querySelector('input[type="date"]')).toBeNull(); expect(host.querySelector('button')).toBeTruthy();
  });

  it('enforces the effective date pattern and never publishes an invalid overlay result', async () => {
    const fixture = create(); const control = fixture.componentInstance; const onChange = vi.fn(); control.registerOnChange(onChange);
    fixture.componentRef.setInput('pattern', '['); fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-field-configuration-state')).toBe('invalid');
    expect((fixture.nativeElement as HTMLElement).querySelector('button')?.disabled).toBe(true);
    fixture.componentRef.setInput('pattern', '^2026-05-\\d{2}$'); fixture.detectChanges();
    control.writeValue('2026-06-04'); fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).hasAttribute('data-date-box-value')).toBe(false);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    const manager = TestBed.inject(ErpOverlayManager); const ref = manager.entries()[0].ref;
    ref.close('2026-06-04'); manager.completeTransition(ref.id, 'leaving'); await Promise.resolve();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('passes only the typed overlay behavior subset over system defaults', () => {
    const fixture = create();
    fixture.componentRef.setInput('overlayConfig', {dismissOnBackdrop: false, dismissOnEscape: false, blur: 'high', backdropTone: 'accent', enterAnimation: 'slide-up', exitAnimation: 'fade'}); fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    const config = TestBed.inject(ErpOverlayManager).entries()[0].ref.config;
    expect(config.dismissOnBackdrop).toBe(false); expect(config.dismissOnEscape).toBe(false); expect(config.blur).toBe('high'); expect(config.backdropTone).toBe('accent'); expect(config.enterAnimation).toBe('slide-up'); expect(config.exitAnimation).toBe('fade');
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
    expect(manager.entries().length).toBe(1); const dismissed = manager.entries()[0].ref; dismissed.dismiss('cancel'); manager.completeTransition(dismissed.id, 'leaving'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click(); const confirmed = manager.entries()[0].ref; confirmed.close('2026-05-04'); manager.completeTransition(confirmed.id, 'leaving'); await Promise.resolve();
    expect(onChange).toHaveBeenCalledOnce(); expect(onChange).toHaveBeenCalledWith('2026-05-04');
  });
});
