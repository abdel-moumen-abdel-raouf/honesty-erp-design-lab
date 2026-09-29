import {Component} from '@angular/core';
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import {
  ERP_SYSTEM_COLOR_FAMILIES,
  ERP_SYSTEM_COLOR_STEPS,
} from '../../../foundation/colors/system-color-registry';
import {ERP_ICON_NAMES} from '../../../primitives/icon/icon-contracts';
import {ErpOverlayHost} from '../../../shared/overlay/overlay-host';
import {ErpOverlayManager} from '../../../shared/overlay/overlay-manager';
import {
  createSelectionOverlayFooter,
  ERP_SELECTION_DEFAULT_ACTION_LABELS,
  ErpSelectionPickerData,
  ErpSelectionPickerValue,
} from '../selection-contracts';
import {ErpSelectionPickerContent} from './selection-picker-content';

@Component({
  imports: [ErpOverlayHost],
  template: '<div [attr.dir]="direction" [attr.data-theme]="theme"><erp-overlay-host /></div>',
})
class TestShell {
  direction: 'ltr' | 'rtl' = 'ltr';
  theme: 'light' | 'dark' = 'light';
}

describe('ErpSelectionPickerContent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestShell],
    deferBlockBehavior: DeferBlockBehavior.Manual,
  }));

  async function open(
    data: ErpSelectionPickerData,
    direction: 'ltr' | 'rtl' = 'ltr',
    theme: 'light' | 'dark' = 'light',
  ) {
    const fixture = TestBed.createComponent(TestShell);
    fixture.componentInstance.direction = direction;
    fixture.componentInstance.theme = theme;
    const manager = TestBed.inject(ErpOverlayManager);
    const ref = manager.open<
      ErpSelectionPickerContent,
      ErpSelectionPickerData,
      ErpSelectionPickerValue
    >(ErpSelectionPickerContent, {
      frame: {
        header: {title: 'Selection proof', subtitle: 'Supporting text', icon: 'layers'},
        footer: createSelectionOverlayFooter(
          data.mode,
          data.clearable,
          data.actionLabels,
        ),
      },
      data,
    });
    fixture.detectChanges();
    const [frameBlock] = await fixture.getDeferBlocks();
    await frameBlock.render(DeferBlockState.Complete);
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
  } as const;

  it('renders the generated system registry in exact family and step order', async () => {
    const {fixture} = await open({...base, mode: 'color'});
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
    expect(tokens.every((token) => token.querySelector('.color-swatch') !== null)).toBe(true);
  });

  it('commits system token identity instead of a copied color value', async () => {
    const {fixture, manager, ref} = await open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;
    root
      .querySelector<HTMLButtonElement>('[data-color-token="primary-500"] button')
      ?.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="confirm"] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {mode: 'system', token: 'primary-500'},
    });
  });

  it('uses shared frame actions and close dismisses without committing staged selection', async () => {
    const {fixture, manager, ref} = await open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-confirm-action]')).toBeNull();
    expect(root.querySelector('[data-cancel-action]')).toBeNull();

    root
      .querySelector<HTMLButtonElement>('[data-color-token="primary-500"] button')
      ?.click();
    root
      .querySelector<HTMLButtonElement>('[data-overlay-frame-close] button')
      ?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'dismissed',
      reason: 'close-action',
    });
  });

  it('updates Clear Selected reactively inside the single shared footer', async () => {
    const {fixture} = await open({...base, mode: 'color'});
    const root = fixture.nativeElement as HTMLElement;
    const clear = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="clear-selected"] button',
    ) as HTMLButtonElement;

    expect(clear.disabled).toBe(true);
    root.querySelector<HTMLButtonElement>('[data-color-token="primary-500"] button')?.click();
    fixture.detectChanges();
    expect(clear.disabled).toBe(false);
    clear.click();
    fixture.detectChanges();
    expect(clear.disabled).toBe(true);
    expect(root.querySelector('.selection-actions')).toBeNull();
  });

  it('renders only the configured free-color mode and commits a canonical free color', async () => {
    const {fixture, manager, ref} = await open({
      ...base,
      mode: 'color',
      colorMode: 'free',
    });
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-system-colors]')).toBeNull();
    expect(root.querySelector('[data-system-colors-mode]')).toBeNull();
    expect(root.querySelector('[data-free-color-mode]')).toBeNull();

    const input = root.querySelector('[data-native-color]') as HTMLInputElement;
    input.value = '#abcdef';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="confirm"] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: {mode: 'free', value: '#ABCDEF'},
    });
  });

  it('renders every icon in a fixed semantic tile with a tooltip label', async () => {
    const {fixture} = await open({...base, mode: 'icon', searchable: true});
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
    expect(root.querySelector('[data-selection-tile-active="true"]')).toBeNull();
    expect((options[0].querySelector('button') as HTMLButtonElement).tabIndex).toBe(0);
    expect(
      options.slice(1).every(
        (option) =>
          (option.querySelector('button') as HTMLButtonElement).tabIndex === -1,
      ),
    ).toBe(true);
  });

  it('filters icons without changing the tile primitive', async () => {
    const {fixture} = await open({...base, mode: 'icon', searchable: true});
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
    const {fixture, manager, ref} = await open({
      ...base,
      mode: 'icon',
      searchable: true,
    });
    const root = fixture.nativeElement as HTMLElement;
    const list = root.querySelector('[data-selection-list]') as HTMLElement;
    list.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    list.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="confirm"] button')?.click();
    manager.completeTransition(ref.id, 'leaving');

    await expect(ref.afterClosed).resolves.toEqual({
      type: 'closed',
      result: ERP_ICON_NAMES[0],
    });
  });

  it('uses full-width list rows for textual item presentation', async () => {
    const {fixture} = await open({
      ...base,
      mode: 'item',
      items: [
        {value: 'customers', label: 'Customers'},
        {value: 'inventory', label: 'Inventory'},
      ],
    });
    const root = fixture.nativeElement as HTMLElement;
    const options = Array.from(
      root.querySelectorAll<HTMLElement>('[data-item-option]'),
    );

    expect(options).toHaveLength(2);
    for (const option of options) {
      expect(option.getAttribute('data-selection-tile-presentation')).toBe('list');
      expect(getComputedStyle(option).inlineSize).toBe('100%');
    }
  });

  it('filters items and prevents disabled selection', async () => {
    const {fixture} = await open({
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
  ] as const)('preserves %s theme evidence in %s direction', async (theme, direction) => {
    const {fixture} = await open({...base, mode: 'icon'}, direction, theme);
    const root = fixture.nativeElement as HTMLElement;
    const picker = root.querySelector('.selection-picker') as HTMLElement;

    expect(picker.hasAttribute('data-theme')).toBe(false);
    expect(picker.closest(`[data-theme="${theme}"]`)).not.toBeNull();
    expect(picker.closest(`[dir="${direction}"]`)).not.toBeNull();
  });

  it('keeps Confirm disabled until a valid staged selection exists while Cancel stays enabled', async () => {
    const {fixture} = await open({
      ...base,
      mode: 'item',
      items: [
        {value: 'a', label: 'Alpha'},
        {value: 'b', label: 'Beta', disabled: true},
      ],
    });
    const root = fixture.nativeElement as HTMLElement;
    const confirm = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;
    const cancel = root.querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="cancel"] button',
    ) as HTMLButtonElement;

    expect(confirm.disabled).toBe(true);
    expect(cancel.disabled).toBe(false);

    (
      root.querySelector(
        '[data-item-option][data-value="a"] button',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    expect(confirm.disabled).toBe(false);
    expect(cancel.disabled).toBe(false);
  });

  it('does not enable Confirm for a disabled staged item', async () => {
    const {fixture} = await open({
      ...base,
      mode: 'item',
      value: 'b',
      items: [{value: 'b', label: 'Beta', disabled: true}],
    });
    const confirm = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[data-overlay-frame-action-id="confirm"] button',
    ) as HTMLButtonElement;

    expect(confirm.disabled).toBe(true);
  });

});
