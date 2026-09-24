import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpComboBox} from './combo-box';

describe('ErpComboBox', () => {
  const items = [{value: 'alpha', label: 'Alpha'}, {value: 'beta', label: 'Beta'}] as const;
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpComboBox]}));
  function create() { const fixture = TestBed.createComponent(ErpComboBox); fixture.componentRef.setInput('label', 'Combo'); fixture.componentRef.setInput('items', items); fixture.detectChanges(); return fixture; }
  it('is editable but does not commit free-form query text', () => { const fixture = create(); const control = fixture.componentInstance; const onChange = vi.fn(); control.registerOnChange(onChange); expect(reflectComponentType(ErpComboBox)?.selector).toBe('erp-combo-box'); const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement; input.value = 'free form'; input.dispatchEvent(new Event('input')); fixture.detectChanges(); expect(onChange).not.toHaveBeenCalled(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-combo-box-value')).toBe(false); });
  it('commits only a matched option selected through the overlay', async () => { const fixture = create(); const control = fixture.componentInstance; const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); control.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input')?.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'})); manager.entries()[0].ref.close('beta'); await Promise.resolve(); fixture.detectChanges(); expect(onChange).toHaveBeenCalledWith('beta'); expect((fixture.nativeElement as HTMLElement).getAttribute('data-combo-box-value')).toBe('beta'); });
});
