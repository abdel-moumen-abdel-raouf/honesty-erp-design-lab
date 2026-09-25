import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpDateRangeBox} from './date-range-box';

describe('ErpDateRangeBox', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpDateRangeBox]}));
  function create() { const fixture = TestBed.createComponent(ErpDateRangeBox); fixture.componentRef.setInput('label', 'Range'); fixture.detectChanges(); return fixture; }
  it('creates with an empty ordered range and no native date picker', () => { const fixture = create(); expect(reflectComponentType(ErpDateRangeBox)?.selector).toBe('erp-date-range-box'); expect((fixture.nativeElement as HTMLElement).querySelector('input[type="date"]')).toBeNull(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-date-range-start')).toBe(false); });
  it('preserves start <= end and drops a reversed end deterministically', () => { const fixture = create(); fixture.componentInstance.writeValue({start: '2026-05-10', end: '2026-05-01'}); fixture.detectChanges(); const host = fixture.nativeElement as HTMLElement; expect(host.getAttribute('data-date-range-start')).toBe('2026-05-10'); expect(host.hasAttribute('data-date-range-end')).toBe(false); });
  it('commits an ordered range only after confirm', async () => { const fixture = create(); const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); fixture.componentInstance.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector('button')?.click(); const ref = manager.entries()[0].ref; ref.close({start: '2026-05-01', end: '2026-05-10'}); manager.completeTransition(ref.id, 'leaving'); await Promise.resolve(); expect(onChange).toHaveBeenCalledWith({start: '2026-05-01', end: '2026-05-10'}); });
});
