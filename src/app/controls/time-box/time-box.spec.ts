import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpTimeBox} from './time-box';

describe('ErpTimeBox', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpTimeBox]}));
  function create() { const fixture = TestBed.createComponent(ErpTimeBox); fixture.componentRef.setInput('label', 'Time'); fixture.detectChanges(); return fixture; }
  it('creates with HH:mm defaults and no native time picker', () => { const fixture = create(); const control = fixture.componentInstance; const host = fixture.nativeElement as HTMLElement; expect(reflectComponentType(ErpTimeBox)?.selector).toBe('erp-time-box'); expect(control.minuteStep()).toBe(5); expect(control.min()).toBeNull(); expect(control.max()).toBeNull(); expect(control.locale()).toBeNull(); expect(host.querySelector('input[type="time"]')).toBeNull(); });
  it('normalizes valid times and rejects invalid times', () => { const fixture = create(); fixture.componentInstance.writeValue('23:59'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-time-box-value')).toBe('23:59'); fixture.componentInstance.writeValue('24:00'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-time-box-value')).toBe(false); });
  it('commits only confirmed overlay time', async () => { const fixture = create(); const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); fixture.componentInstance.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector('button')?.click(); const ref = manager.entries()[0].ref; ref.close('09:35'); manager.completeTransition(ref.id, 'leaving'); await Promise.resolve(); expect(onChange).toHaveBeenCalledWith('09:35'); });
});
