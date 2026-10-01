import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {UiSettingsService} from '../../foundation/preferences/core/ui-settings.service';
import {ERP_MONEY_FINAL_PATTERN} from '../input-family/domain-validation';
import {ErpMoneyBox} from './money-box';

describe('ErpMoneyBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpMoneyBox]});
    TestBed.inject(UiSettingsService).store.resetAll();
  });

  function create() {
    const fixture = TestBed.createComponent(ErpMoneyBox);
    fixture.componentRef.setInput('label', 'Amount');
    fixture.componentRef.setInput('currency', 'USD');
    fixture.componentRef.setInput('locale', 'en-US');
    fixture.componentRef.setInput('minimumFractionDigits', 2);
    fixture.componentRef.setInput('maximumFractionDigits', 2);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with the exact money contract defaults and built-in pattern', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpMoneyBox)?.selector).toBe('erp-money-box');
    expect(control.currency()).toBe('USD');
    expect(control.min()).toBeNull();
    expect(control.max()).toBeNull();
    expect(control.step()).toBe(0.01);
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.allowEmpty()).toBe(true);
    expect(control.pattern()).toBeNull();
    expect(control.digitSet()).toBeNull();
    expect(native.type).toBe('text');
    expect(native.inputMode).toBe('decimal');
    expect(native.pattern).toBe(ERP_MONEY_FINAL_PATTERN);
  });

  it('formats committed money and accepts only monetary numeric draft syntax', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(1234.5);
    fixture.detectChanges();
    expect(native.value).toBe('1,234.50 USD');
    native.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(native.value).toBe('1234.5');

    native.value = 'arbitrary';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(native.value).toBe('1234.5');
    expect(onChange).not.toHaveBeenCalled();
    expect(control.inputState()).toBe('valid-entry');
    expect(control.validationIssues()).toEqual([]);

    native.value = '50.';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith(50);
    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('50.00 USD');
  });

  it('formats blurred display from the shared money Preferences context', () => {
    const settings = TestBed.inject(UiSettingsService).store;
    settings.set('digits', {
      base: 'latin',
      overrides: {money: 'arabic-indic'},
    });
    settings.set('numberSeparators', {
      base: 'comma-dot',
      overrides: {money: 'arabic'},
    });
    settings.set('moneyDisplay', 'code-before');

    const fixture = create();
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    fixture.componentInstance.writeValue(1234.5);
    fixture.detectChanges();

    expect(native.value).toBe('USD ١٬٢٣٤٫٥٠');
    native.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(native.value).toBe('1234.5');
  });

  it('uses custom patterns and invalid regex is invalid configuration', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    fixture.componentRef.setInput('pattern', '^\\d+\\.\\d{2}$');
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));
    native.value = '12.5';
    native.dispatchEvent(new Event('input'));
    expect(onChange).not.toHaveBeenCalled();
    native.value = '12.50';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith(12.5);

    fixture.componentRef.setInput('pattern', '[');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });

  it('treats blank required currency metadata as invalid configuration', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    fixture.componentRef.setInput('currency', '   ');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });

  it('allows a per-instance Arabic-Indic digit override without mutating shared Preferences', () => {
    const settings = TestBed.inject(UiSettingsService).store;
    const fixture = create();
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('digitSet', 'arabic-indic');
    fixture.componentInstance.writeValue(1234.5);
    fixture.detectChanges();

    expect(native.value).toBe('١,٢٣٤.٥٠ USD');
    expect(settings.get('digits').valueSignal().base).toBe('latin');
  });


  it('preserves out-of-range amounts and reports validation without clamping', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    native.dispatchEvent(new FocusEvent('focus'));
    native.value = '150';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(150);
    expect(native.value).toBe('150');
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.validationIssues().map((issue) => issue.code)).toContain(
      'money.max',
    );

    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('150');
  });

});
