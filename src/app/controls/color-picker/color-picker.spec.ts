import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpSelectionPickerData} from '../selection-family/selection-contracts';
import {ErpColorPicker} from './color-picker';

describe('ErpColorPicker', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpColorPicker]}));

  function create() {
    const fixture = TestBed.createComponent(ErpColorPicker);
    fixture.componentRef.setInput('label', 'Color');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with an empty value, system default mode, and Field trigger', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;

    expect(reflectComponentType(ErpColorPicker)?.selector).toBe(
      'erp-color-picker',
    );
    expect(control.mode()).toBe('system');
    expect(control.overlayConfig()).toBeNull();
    expect(host.hasAttribute('data-color-picker-value')).toBe(false);
    expect(host.getAttribute('data-color-picker-mode')).toBe('system');
    expect(host.querySelector('erp-field-trigger')).not.toBeNull();
    expect(host.querySelector(':scope > button')).toBeNull();
  });

  it('stores system token identity and resolves the generated current color', () => {
    const fixture = create();
    fixture.componentInstance.writeValue({
      mode: 'system',
      token: 'primary-500',
    });
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-color-picker-mode')).toBe('system');
    expect(host.getAttribute('data-color-picker-value')).toBe('primary-500');
    expect(
      (host.querySelector('.color-picker__swatch') as HTMLElement).style
        .backgroundColor,
    ).toBe('rgb(91, 97, 213)');
  });

  it('accepts only values that match the configured ColorPicker mode', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;

    control.writeValue({mode: 'free', value: '#a1b2c3'});
    fixture.detectChanges();
    expect(host.hasAttribute('data-color-picker-value')).toBe(false);

    fixture.componentRef.setInput('mode', 'free');
    control.writeValue({mode: 'free', value: '#a1b2c3'});
    fixture.detectChanges();
    expect(host.getAttribute('data-color-picker-mode')).toBe('free');
    expect(host.getAttribute('data-color-picker-value')).toBe('#A1B2C3');

    control.writeValue({mode: 'system', token: 'primary-500'});
    fixture.detectChanges();
    expect(host.hasAttribute('data-color-picker-value')).toBe(false);
  });

  it('commits only a confirmed overlay union value', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const manager = TestBed.inject(ErpOverlayManager);
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    const trigger = (fixture.nativeElement as HTMLElement).querySelector(
      'erp-field-trigger button',
    ) as HTMLButtonElement;

    trigger.click();
    const dismissed = manager.entries()[0].ref;
    dismissed.dismiss('cancel');
    manager.completeTransition(dismissed.id, 'leaving');
    await Promise.resolve();
    expect(onChange).not.toHaveBeenCalled();

    trigger.click();
    const confirmed = manager.entries()[0].ref;
    confirmed.close({mode: 'system', token: 'accent-500'});
    manager.completeTransition(confirmed.id, 'leaving');
    await Promise.resolve();
    expect(onChange).toHaveBeenCalledWith({
      mode: 'system',
      token: 'accent-500',
    });
  });

  it('passes the typed overlay behavior subset', () => {
    const fixture = create();
    fixture.componentRef.setInput('overlayConfig', {
      dismissOnBackdrop: false,
      dismissOnEscape: false,
      blur: 'high',
      backdropTone: 'accent',
      enterAnimation: 'slide-up',
      exitAnimation: 'fade',
    });
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('erp-field-trigger button')
      ?.click();
    const config = TestBed.inject(ErpOverlayManager).entries()[0].ref.config;

    expect(config.dismissOnBackdrop).toBe(false);
    expect(config.dismissOnEscape).toBe(false);
    expect(config.blur).toBe('high');
    expect(config.backdropTone).toBe('accent');
    expect(config.enterAnimation).toBe('slide-up');
    expect(config.exitAnimation).toBe('fade');
  });

  it('opens only the configured color mode with no internal mode switch', async () => {
    const system = create();
    const manager = TestBed.inject(ErpOverlayManager);
    (
      (system.nativeElement as HTMLElement).querySelector(
        'erp-field-trigger button',
      ) as HTMLButtonElement
    ).click();
    system.detectChanges();

    const systemEntry = manager.entries()[0];
    expect(
      (systemEntry.ref.config.data as ErpSelectionPickerData).colorMode,
    ).toBe('system');
    systemEntry.ref.dismiss('test');
    manager.completeTransition(systemEntry.ref.id, 'leaving');
    await Promise.resolve();

    const free = create();
    free.componentRef.setInput('mode', 'free');
    free.detectChanges();
    (
      (free.nativeElement as HTMLElement).querySelector(
        'erp-field-trigger button',
      ) as HTMLButtonElement
    ).click();
    free.detectChanges();

    const freeEntry = manager.entries()[0];
    expect(
      (freeEntry.ref.config.data as ErpSelectionPickerData).colorMode,
    ).toBe('free');
  });

});
