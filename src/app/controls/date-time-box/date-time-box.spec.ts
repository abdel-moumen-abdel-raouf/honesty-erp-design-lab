import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpDateTimeBox} from './date-time-box';

describe('ErpDateTimeBox', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpDateTimeBox]}));
  function create() { const fixture = TestBed.createComponent(ErpDateTimeBox); fixture.componentRef.setInput('label', 'Date time'); fixture.detectChanges(); return fixture; }
  it('creates as a local date-time CVA without a native picker', () => { const fixture = create(); expect(reflectComponentType(ErpDateTimeBox)?.selector).toBe('erp-date-time-box'); expect((fixture.nativeElement as HTMLElement).querySelector('input[type="datetime-local"]')).toBeNull(); });
  it('accepts exact local YYYY-MM-DDTHH:mm and rejects invalid values', () => { const fixture = create(); fixture.componentInstance.writeValue('2026-05-04T09:35'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-date-time-box-value')).toBe('2026-05-04T09:35'); fixture.componentInstance.writeValue('2026-02-30T09:35'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-date-time-box-value')).toBe(false); });
  it('does not commit dismissal and commits one combined confirmation', async () => { const fixture = create(); const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); fixture.componentInstance.registerOnChange(onChange); const trigger = (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement; trigger.click(); const dismissed = manager.entries()[0].ref; dismissed.dismiss('cancel'); manager.completeTransition(dismissed.id, 'leaving'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled(); trigger.click(); const confirmed = manager.entries()[0].ref; confirmed.close('2026-05-04T09:35'); manager.completeTransition(confirmed.id, 'leaving'); await Promise.resolve(); expect(onChange).toHaveBeenCalledOnce(); });
});
