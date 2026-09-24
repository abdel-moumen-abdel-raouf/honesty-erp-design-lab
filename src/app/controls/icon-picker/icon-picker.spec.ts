import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpIconPicker} from './icon-picker';

describe('ErpIconPicker', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpIconPicker]}));
  function create() { const fixture = TestBed.createComponent(ErpIconPicker); fixture.componentRef.setInput('label', 'Icon'); fixture.detectChanges(); return fixture; }
  it('accepts only semantic ErpIconName values', () => { const fixture = create(); const control = fixture.componentInstance; expect(reflectComponentType(ErpIconPicker)?.selector).toBe('erp-icon-picker'); control.writeValue('settings'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-icon-picker-value')).toBe('settings'); control.writeValue('vendorSettings'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-icon-picker-value')).toBe(false); });
  it('uses staged overlay confirmation', async () => { const fixture = create(); const control = fixture.componentInstance; const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); control.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click(); manager.entries()[0].ref.close('search'); await Promise.resolve(); expect(onChange).toHaveBeenCalledWith('search'); });
});
