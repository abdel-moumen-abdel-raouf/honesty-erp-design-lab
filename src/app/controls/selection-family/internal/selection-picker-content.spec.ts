import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_ICON_NAMES} from '../../../primitives/icon/icon-contracts';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {ErpSelectionPickerData} from '../selection-contracts';
import {ErpSelectionPickerContent} from './selection-picker-content';

@Component({imports: [ErpOverlayHost], template: '<erp-overlay-host />'})
class TestShell {}

describe('ErpSelectionPickerContent', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [TestShell]}));
  function open(data: ErpSelectionPickerData) { const fixture = TestBed.createComponent(TestShell); const manager = TestBed.inject(ErpOverlayManager); const ref = manager.open<ErpSelectionPickerContent, ErpSelectionPickerData, string | null>(ErpSelectionPickerContent, {label: 'Selection proof', data}); fixture.detectChanges(); return {fixture, ref}; }
  const base = {value: null, items: [], query: '', searchable: false, clearable: true, theme: 'light'} as const;
  it('renders semantic swatches, a native custom color input, and commits canonical custom color', async () => { const {fixture, ref} = open({...base, mode: 'color'}); const root = fixture.nativeElement as HTMLElement; expect(root.querySelectorAll('[data-color-preset]').length).toBe(7); const input = root.querySelector('[data-native-color]') as HTMLInputElement; input.value = '#abcdef'; input.dispatchEvent(new Event('input')); root.querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click(); await expect(ref.afterClosed).resolves.toEqual({type: 'closed', result: '#ABCDEF'}); });
  it('shows every semantic icon and supports keyboard selection', async () => { const {fixture, ref} = open({...base, mode: 'icon', searchable: true}); const root = fixture.nativeElement as HTMLElement; expect(root.querySelectorAll('[data-icon-option]').length).toBe(ERP_ICON_NAMES.length); const list = root.querySelector('[data-selection-list]') as HTMLElement; list.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'})); list.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'})); root.querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click(); await expect(ref.afterClosed).resolves.toEqual({type: 'closed', result: ERP_ICON_NAMES[1]}); });
  it('filters items and prevents disabled selection', () => { const {fixture} = open({...base, mode: 'item', searchable: true, items: [{value: 'a', label: 'Alpha'}, {value: 'b', label: 'Beta', disabled: true}], query: 'beta'}); const root = fixture.nativeElement as HTMLElement; expect(root.querySelectorAll('[data-item-option]').length).toBe(1); expect((root.querySelector('[data-item-option] button') as HTMLButtonElement).disabled).toBe(true); });
});
