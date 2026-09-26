import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpItemPickerOption} from '../selection-family/selection-contracts';
import {ErpItemPicker} from './item-picker';

describe('ErpItemPicker', () => {
  const items: readonly ErpItemPickerOption[] = [{value: 'one', label: 'One'}, {value: 'two', label: 'Two', disabled: true, icon: 'lock'}];
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpItemPicker]}));
  function create() { const fixture = TestBed.createComponent(ErpItemPicker); fixture.componentRef.setInput('label', 'Item'); fixture.componentRef.setInput('items', items); fixture.detectChanges(); return fixture; }
  it('exposes the exact option defaults and rejects missing or disabled values', () => { const fixture = create(); const control = fixture.componentInstance; expect(reflectComponentType(ErpItemPicker)?.selector).toBe('erp-item-picker'); expect(control.placeholder()).toBeNull(); expect(control.searchable()).toBe(false); expect(control.clearable()).toBe(false); expect(control.overlayConfig()).toBeNull(); control.writeValue('one'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).getAttribute('data-item-picker-value')).toBe('one'); control.writeValue('two'); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).hasAttribute('data-item-picker-value')).toBe(false); });
  it('commits a staged enabled option', async () => { const fixture = create(); const control = fixture.componentInstance; const manager = TestBed.inject(ErpOverlayManager); const onChange = vi.fn(); control.registerOnChange(onChange); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click(); const ref = manager.entries()[0].ref; ref.close('one'); manager.completeTransition(ref.id, 'leaving'); await Promise.resolve(); expect(onChange).toHaveBeenCalledWith('one'); });
  it('passes the typed overlay behavior subset', () => { const fixture = create(); fixture.componentRef.setInput('overlayConfig', {dismissOnEscape: false, backdropTone: 'secondary', exitAnimation: 'scale'}); fixture.detectChanges(); (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')?.click(); const config = TestBed.inject(ErpOverlayManager).entries()[0].ref.config; expect(config.dismissOnEscape).toBe(false); expect(config.backdropTone).toBe('secondary'); expect(config.exitAnimation).toBe('scale'); });
});
