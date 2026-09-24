import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpMoneyBox} from './money-box';

describe('ErpMoneyBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpMoneyBox]});
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

  it('creates with the exact money contract defaults', () => {
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
    expect(native.type).toBe('text');
    expect(native.inputMode).toBe('decimal');
  });

  it('formats while not editing and exposes normalized numeric text while focused', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(1234.5);
    fixture.detectChanges();
    expect(native.value).toBe('$1,234.50');

    native.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(native.value).toBe('1234.5');

    native.value = '50.25';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith(50.25);

    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('$50.25');
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
});
