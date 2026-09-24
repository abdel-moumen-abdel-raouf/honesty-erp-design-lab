import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpColorPicker} from './color-picker';

describe('ErpColorPicker', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpColorPicker]}));
  function create() { const fixture = TestBed.createComponent(ErpColorPicker); fixture.componentRef.setInput('label', 'Color'); fixture.detectChanges(); return fixture; }
  it('creates with a Field trigger and canonicalizes uppercase color values', () => { const fixture = create(); const control = fixture.componentInstance; expect(reflectComponentType(ErpColorPicker)?.selector).toBe('erp-color-picker'); control.writeValue('#a1b2c3'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-color-picker-value')).toBe('#A1B2C3'); control.writeValue('red'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-color-picker-value')).toBe(false); });
  it('commits only a confirmed overlay value', async () => { const fixture = create(); const control = fixture.componentInstance; const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); control.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click(); manager.entries()[0].ref.dismiss('cancel'); await Promise.resolve(); expect(onChange).not.toHaveBeenCalled(); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click(); manager.entries()[0].ref.close('#ABCDEF'); await Promise.resolve(); expect(onChange).toHaveBeenCalledWith('#ABCDEF'); });
});
