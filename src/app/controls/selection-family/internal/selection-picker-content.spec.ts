import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {
  ERP_SYSTEM_COLOR_FAMILIES,
  ERP_SYSTEM_COLOR_STEPS,
} from '../../../foundation/colors/system-color-registry';
import {ERP_ICON_NAMES} from '../../../primitives/icon/icon-contracts';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {
  ERP_SELECTION_DEFAULT_ACTION_LABELS,
  ErpSelectionPickerData,
  ErpSelectionPickerValue,
} from '../selection-contracts';
import {ErpSelectionPickerContent} from './selection-picker-content';

@Component({
  imports: [ErpOverlayHost],
  template: '<div [attr.dir]="direction"><erp-overlay-host /></div>',
})
class TestShell {
  direction: 'ltr' | 'rtl' = 'ltr';
}

describe('ErpSelectionPickerContent', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [TestShell]}));

  function open(
    data: ErpSelectionPickerData,
    direction: 'ltr' | 'rtl' = 'ltr',
  ) {
    const fixture = TestBed.createComponent(TestShell);
    fixture.componentInstance.direction = direction;
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<
      ErpSelectionPickerContent,
      ErpSelectionPickerData,
      ErpSelectionPickerValue
    >(ErpSelectionPickerContent, {label: 'Selection proof', data});
    fixture.detectChanges();
    return {fixture, manager, ref};
  }

  const base = {
    value: null,
    colorMode: 'system',
    items: [],
    query: '',
    searchable: false,
    clearable: true,
    actionLabels: ERP_SELECTION_DEFAULT_ACTION_LABELS,
    theme: 'light',
  } as const;

  it('renders the generated system registry in exact family and step order', () => {
    const {fixture} = open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;
    const families = Array.from(root.querySelectorAll('[data-color-family]'));
    const tokens = Array.from(root.querySelectorAll('[data-color-token]'));

    expect(
      families.map((element) => element.getAttribute('data-color-family')),
    ).toEqual([...ERP_SYSTEM_COLOR_FAMILIES]);
    expect(tokens.length).toBe(
      ERP_SYSTEM_COLOR_FAMILIES.length * ERP_SYSTEM_COLOR_STEPS.length,
    );
    expect(
      tokens.map((element) => element.getAttribute('data-color-token')),
    ).toEqual(
      ERP_SYSTEM_COLOR_FAMILIES.flatMap((family) =>
        ERP_SYSTEM_COLOR_STEPS.map((step) => `${family}-${step}`),
      ),
    );
  });

  it('commits system token identity instead of a copied color value', async () => {
    const {fixture, manager, ref} = open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;
    root
      .querySelector<HTMLButtonElement>('[data-color-token="primary-500"] button')
      ?.click();
    root.querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {mode: 'system', token: 'primary-500'},
    });
  });

  it('defaults to system mode and commits a canonical free color', async () => {
    const {fixture, manager, ref} = open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-system-colors]')).not.toBeNull();
    root.querySelector<HTMLButtonElement>('[data-free-color-mode] button')?.click();
    fixture.detectChanges();
    const input = root.querySelector('[data-native-color]') as HTMLInputElement;
    input.value = '#abcdef';
    input.dispatchEvent(new Event('input'));
    root.querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {mode: 'free', value: '#ABCDEF'},
    });
  });

  it('renders every icon in a fixed semantic tile with a tooltip label', () => {
    const {fixture} = open({...base, mode: 'icon', searchable: true});
    const root = fixture.nativeElement as HTMLElement;
    const options = Array.from(
      root.querySelectorAll<HTMLElement>('[data-icon-option]'),
    );

    expect(options.length).toBe(ERP_ICON_NAMES.length);
    expect(
      options.map((option) => option.getAttribute('data-icon-name')),
    ).toEqual([...ERP_ICON_NAMES]);
    for (const option of options) {
      expect(option.tagName).toBe('ERP-SELECTION-TILE');
      expect(option.querySelectorAll('erp-icon').length).toBe(1);
      expect(option.closest('erp-tooltip')).not.toBeNull();
    }
  });

  it('filters icons without changing the tile primitive', () => {
    const {fixture} = open({...base, mode: 'icon', searchable: true});
    const root = fixture.nativeElement as HTMLElement;
    const search = root.querySelector<HTMLInputElement>(
      '[data-selection-search] input',
    ) as HTMLInputElement;
    search.value = 'settings';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const options = root.querySelectorAll<HTMLElement>('[data-icon-option]');
    expect(options.length).toBe(1);
    expect(options[0].tagName).toBe('ERP-SELECTION-TILE');
    expect(options[0].getAttribute('data-icon-name')).toBe('settings');
  });

  it('supports keyboard icon selection', async () => {
    const {fixture, manager, ref} = open({
      ...base,
      mode: 'icon',
      searchable: true,
    });
    const root = fixture.nativeElement as HTMLElement;
    const list = root.querySelector('[data-selection-list]') as HTMLElement;
    list.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    list.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    root.querySelector<HTMLButtonElement>('[data-confirm-action] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: ERP_ICON_NAMES[1],
    });
  });

  it('filters items and prevents disabled selection', () => {
    const {fixture} = open({
      ...base,
      mode: 'item',
      searchable: true,
      items: [
        {value: 'a', label: 'Alpha'},
        {value: 'b', label: 'Beta', disabled: true},
      ],
      query: 'beta',
    });
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-item-option]').length).toBe(1);
    expect(
      (root.querySelector('[data-item-option] button') as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it.each([
    ['light', 'ltr'],
    ['dark', 'ltr'],
    ['light', 'rtl'],
    ['dark', 'rtl'],
  ] as const)('preserves %s theme evidence in %s direction', (theme, direction) => {
    const {fixture} = open({...base, mode: 'icon', theme}, direction);
    const root = fixture.nativeElement as HTMLElement;
    const picker = root.querySelector('.selection-picker') as HTMLElement;

    expect(picker.getAttribute('data-theme')).toBe(theme);
    expect(picker.closest(`[dir="${direction}"]`)).not.toBeNull();
  });
});
