import {Component, reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {ErpSearchBox} from './search-box';

@Component({
  imports: [ErpSearchBox],
  template: `
    <erp-search-box
      id="first-search"
      label="First search"
      [items]="items"
    />
    <erp-search-box
      id="second-search"
      label="Second search"
      [items]="items"
    />
  `,
})
class SearchBoxStackTest {
  readonly items = [
    {value: 'invoice', label: 'Invoice'},
    {value: 'purchase', label: 'Purchase order'},
  ];
}

describe('ErpSearchBox', () => {
  let animationFrames: FrameRequestCallback[];

  beforeEach(() => {
    vi.useFakeTimers();
    animationFrames = [];
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        animationFrames.push(callback);
        return animationFrames.length;
      }),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    TestBed.configureTestingModule({
      imports: [ErpSearchBox, SearchBoxStackTest],
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  function create() {
    const fixture = TestBed.createComponent(ErpSearchBox);
    fixture.componentRef.setInput('label', 'Search');
    fixture.componentRef.setInput('items', [
      {value: 'invoice', label: 'فاتورة INV-2026-001'},
      {value: 'purchase', label: 'طلب شراء PO-2026-014'},
      {value: 'disabled', label: 'Disabled', disabled: true},
    ]);
    fixture.detectChanges();
    return fixture;
  }

  function flushAnimationFrames(): void {
    while (animationFrames.length > 0) {
      animationFrames.shift()?.(performance.now());
    }
  }

  function installPopover(surface: HTMLElement): void {
    Object.assign(surface, {
      showPopover: vi.fn(() =>
        surface.setAttribute('data-popover-open', ''),
      ),
      hidePopover: vi.fn(() =>
        surface.removeAttribute('data-popover-open'),
      ),
    });
    const nativeMatches = surface.matches.bind(surface);
    vi.spyOn(surface, 'matches').mockImplementation((selector) =>
      selector === ':popover-open'
        ? surface.hasAttribute('data-popover-open')
        : nativeMatches(selector),
    );
  }

  function openDropdown(fixture: ReturnType<typeof create>) {
    const host = fixture.nativeElement as HTMLElement;
    const surface = host.querySelector(
      '.search-box__popup',
    ) as HTMLElement;
    installPopover(surface);
    (host.querySelector('erp-field-trigger button') as HTMLButtonElement).click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();
    return surface;
  }

  it('creates with dropdown mode, functional result inputs, and exact search defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;

    expect(reflectComponentType(ErpSearchBox)?.selector).toBe('erp-search-box');
    expect(control.mode()).toBe('dropdown');
    expect(control.autocomplete()).toBe('off');
    expect(control.dismissOnOutside()).toBe(true);
    expect(control.dismissOnEscape()).toBe(true);
    expect(control.showDefaultSearchIcon()).toBe(true);
    expect(control.clearable()).toBe(true);
    expect(control.enterAnimation()).toBe('fade-scale');
    expect(control.exitAnimation()).toBe('fade-scale');
    expect(host.getAttribute('data-search-box-mode')).toBe('dropdown');
    expect(host.querySelector('[role="listbox"]')).not.toBeNull();
  });

  it('supports inline mode as an ordinary native search input and restores focus after clear', () => {
    const fixture = create();
    fixture.componentRef.setInput('mode', 'inline');
    fixture.componentRef.setInput('clearable', true);
    fixture.componentInstance.writeValue('invoice');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const input = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);

    expect(host.querySelector('erp-field-trigger')).toBeNull();
    expect(host.querySelector('.search-box__popup')).toBeNull();

    input.value = 'purchase';
    input.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('purchase');

    (
      host.querySelector(
        'erp-field-frame erp-icon-button button',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('');
    expect(document.activeElement).toBe(input);
  });

  it('opens dropdown on focus and filters without committing the transient query', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const surface = host.querySelector('.search-box__popup') as HTMLElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    installPopover(surface);

    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    const input = host.querySelector('.search-box__popup input') as HTMLInputElement;
    input.value = 'شراء';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.querySelectorAll('[data-search-result]')).toHaveLength(1);
    expect(host.querySelector('[data-search-result]')?.getAttribute('data-value')).toBe('purchase');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('updates open dropdown results from live items input changes', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    openDropdown(fixture);

    fixture.componentRef.setInput('items', [
      {value: 'live-one', label: 'Live one'},
      {value: 'live-two', label: 'Live two'},
    ]);
    fixture.detectChanges();

    expect(
      [...host.querySelectorAll<HTMLElement>('[data-search-result]')]
        .map((item) => item.dataset['value']),
    ).toEqual(['live-one', 'live-two']);
  });

  it('selects a filtered result and commits its stable value', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    openDropdown(fixture);

    const input = host.querySelector('.search-box__popup input') as HTMLInputElement;
    input.value = 'فاتورة';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (
      host.querySelector(
        '[data-search-result] button',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('invoice');
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('leaving');
    expect(
      (host.querySelector('.search-box__popup') as HTMLElement).matches(
        ':popover-open',
      ),
    ).toBe(false);

    const nextField = document.createElement('input');
    host.appendChild(nextField);
    nextField.focus();
    vi.runAllTimers();
    fixture.detectChanges();

    expect(document.activeElement).toBe(nextField);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('closed');
  });

  it('prevents disabled result selection and skips disabled results during keyboard navigation', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    openDropdown(fixture);

    const input = host.querySelector('.search-box__popup input') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    fixture.detectChanges();

    expect(
      (document.activeElement as HTMLElement | null)
        ?.closest<HTMLElement>('[data-search-result]')
        ?.dataset['value'],
    ).toBe('invoice');

    (document.activeElement as HTMLElement).dispatchEvent(
      new KeyboardEvent('keydown', {key: 'End', bubbles: true}),
    );
    fixture.detectChanges();

    expect(
      (document.activeElement as HTMLElement | null)
        ?.closest<HTMLElement>('[data-search-result]')
        ?.dataset['value'],
    ).toBe('purchase');

    const disabled = [...host.querySelectorAll<HTMLElement>('[data-search-result]')]
      .find((tile) => tile.dataset['value'] === 'disabled') as HTMLElement;
    (
      disabled.querySelector('button') as HTMLButtonElement
    ).click();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes the inherited clear action for a committed dropdown selection', () => {
    const fixture = create();
    fixture.componentRef.setInput('clearable', true);
    fixture.componentInstance.writeValue('invoice');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    const clear = host.querySelector(
      'erp-field-frame erp-icon-button button',
    ) as HTMLButtonElement;

    expect(clear).toBeTruthy();
    clear.click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('sizes the dropdown exactly from trigger width before viewport clamping', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const geometryAnchor = trigger.closest(
      '.field-frame__control',
    ) as HTMLElement;
    const surface = host.querySelector(
      '.search-box__popup',
    ) as HTMLElement;
    vi.spyOn(geometryAnchor, 'getBoundingClientRect').mockReturnValue({
      bottom: 140,
      height: 40,
      left: 40,
      right: 360,
      top: 100,
      width: 320,
      x: 40,
      y: 100,
      toJSON: () => undefined,
    });
    installPopover(surface);

    trigger.click();
    fixture.detectChanges();

    expect(
      surface.style.getPropertyValue(
        '--_honesty-search-box-popup-trigger-inline-size',
      ),
    ).toBe('320px');
  });

  it('releases the native top layer immediately and never steals focus after close', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const surface = openDropdown(fixture);
    const nextField = document.createElement('input');
    host.appendChild(nextField);

    (host.querySelector('.search-box__close button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(surface.matches(':popover-open')).toBe(false);
    expect(surface.inert).toBe(true);
    expect(surface.style.pointerEvents).toBe('none');
    expect(document.activeElement).toBe(trigger);

    nextField.focus();
    expect(document.activeElement).toBe(nextField);

    vi.runAllTimers();
    fixture.detectChanges();

    expect(document.activeElement).toBe(nextField);
    expect(host.getAttribute('data-search-box-popup-phase')).toBe('closed');
    expect(surface.inert).toBe(false);
    expect(surface.style.pointerEvents).toBe('');
  });

  it('honors outside and Escape dismissal while only the active SearchBox responds', () => {
    const fixture = TestBed.createComponent(SearchBoxStackTest);
    fixture.detectChanges();
    const controls = [
      fixture.nativeElement.querySelector('#first-search') as HTMLElement,
      fixture.nativeElement.querySelector('#second-search') as HTMLElement,
    ];
    for (const control of controls) {
      installPopover(control.querySelector('.search-box__popup') as HTMLElement);
      (control.querySelector('button') as HTMLButtonElement).click();
      fixture.detectChanges();
      flushAnimationFrames();
      fixture.detectChanges();
    }

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    fixture.detectChanges();

    expect(controls[0].getAttribute('data-search-box-popup-phase')).toBe('open');
    expect(controls[1].getAttribute('data-search-box-popup-phase')).toBe('leaving');
  });

  it('opens modal search on focus with dialog semantics and selection data', () => {
    const fixture = create();
    fixture.componentRef.setInput('mode', 'modal');
    fixture.detectChanges();
    const manager = TestBed.inject(ErpOverlayManager);
    const trigger = (fixture.nativeElement as HTMLElement).querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;

    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(manager.entries()).toHaveLength(1);
    const entry = manager.entries()[0];
    expect(entry.ref.config.frame?.header.title).toBe('Search');
    expect((entry.ref.config.data as ErpSelectionPickerData).mode).toBe('combo');
    const data = entry.ref.config.data as ErpSelectionPickerData;
    expect(data.items).toHaveLength(3);
    expect(data.itemsProvider?.()).toHaveLength(3);

    fixture.componentRef.setInput('items', [
      {value: 'live-modal', label: 'Live modal'},
    ]);
    fixture.detectChanges();

    expect(data.itemsProvider?.().map((item) => item.value)).toEqual([
      'live-modal',
    ]);
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('uses listbox semantics for dropdown mode and no popup semantics for inline mode', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    expect(
      host.querySelector('erp-field-trigger button')?.getAttribute('aria-haspopup'),
    ).toBe('listbox');

    fixture.componentRef.setInput('mode', 'inline');
    fixture.detectChanges();
    expect(host.querySelector('erp-field-trigger')).toBeNull();
    expect((host.querySelector('input') as HTMLInputElement).type).toBe('search');
  });

  it('uses anchored collision placement in RTL and keeps every popup result selectable', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    host.setAttribute('dir', 'rtl');
    const trigger = host.querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;
    const geometryAnchor = trigger.closest(
      '.field-frame__control',
    ) as HTMLElement;
    const surface = host.querySelector(
      '.search-box__popup',
    ) as HTMLElement;
    geometryAnchor.style.direction = 'rtl';
    vi.spyOn(geometryAnchor, 'getBoundingClientRect').mockReturnValue({
      bottom: 760,
      height: 40,
      left: 100,
      right: 300,
      top: 720,
      width: 200,
      x: 100,
      y: 720,
      toJSON: () => undefined,
    });
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      bottom: 200,
      height: 200,
      left: 0,
      right: 200,
      top: 0,
      width: 200,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    });
    installPopover(surface);
    trigger.click();
    fixture.detectChanges();
    flushAnimationFrames();
    fixture.detectChanges();

    expect(host.getAttribute('data-search-box-resolved-placement')).toBe('top');
    expect(host.querySelectorAll('[data-search-result]')).toHaveLength(3);
  });
});
