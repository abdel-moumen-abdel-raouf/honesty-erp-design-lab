import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_TEL_FINAL_PATTERN} from '../input-family/domain-validation';
import {ErpTelBox} from './tel-box';

describe('ErpTelBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpTelBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpTelBox);
    fixture.componentRef.setInput('label', 'Phone');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with exact native telephone semantics and built-in pattern', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpTelBox)?.selector).toBe('erp-tel-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.autocomplete()).toBe('tel');
    expect(control.pattern()).toBeNull();
    expect(control.minLength()).toBeNull();
    expect(control.maxLength()).toBeNull();
    expect(control.clearable()).toBe(true);
    expect(native.type).toBe('tel');
    expect(native.autocomplete).toBe('tel');
    expect(native.inputMode).toBe('tel');
    expect(native.pattern).toBe(ERP_TEL_FINAL_PATTERN);
  });

  it('preserves invalid telephone drafts and reports multiple domain errors', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.value = '++20A';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('++20A');
    expect(native.value).toBe('++20A');
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.validationIssues().map((issue) => issue.code)).toEqual([
      'tel.alphabetic',
      'tel.plus-count',
      'tel.too-short',
    ]);
    expect(native.getAttribute('aria-invalid')).toBe('true');

    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('++20A');

    native.value = '+20 111 222 3333';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(control.inputState()).toBe('valid-entry');
    expect(control.errors()).toEqual([]);
  });

  it('uses developer override patterns and invalid regex disables configuration', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    fixture.componentRef.setInput('pattern', '^\\+20 [0-9 ]+$');
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));
    native.value = '+1 555 123 4567';
    native.dispatchEvent(new Event('input'));
    expect(onChange).not.toHaveBeenCalled();
    native.value = '+20 100 123 4567';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('+20 100 123 4567');

    fixture.componentRef.setInput('pattern', '[');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });

  it('forwards placeholder and readonly to the native control', () => {
    const fixture = create();
    fixture.componentRef.setInput('placeholder', 'Example');
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(native.placeholder).toBe('Example');
    expect(native.readOnly).toBe(true);
  });
});
