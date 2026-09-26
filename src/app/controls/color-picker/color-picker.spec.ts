import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
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
    expect(control.overlayConfig()).toBeNull();
    expect(host.hasAttribute('data-color-picker-value')).toBe(false);
    expect(host.hasAttribute('data-color-picker-mode')).toBe(false);
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

  it('normalizes free colors to uppercase and rejects invalid values', () => {
    const fixture = create();
    const control = fixture.componentInstance;

    control.writeValue({mode: 'free', value: '#a1b2c3'});
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).getAttribute(
        'data-color-picker-value',
      ),
    ).toBe('#A1B2C3');

    control.writeValue({mode: 'system', token: 'primary-75'});
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).hasAttribute(
        'data-color-picker-value',
      ),
    ).toBe(false);
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
});
