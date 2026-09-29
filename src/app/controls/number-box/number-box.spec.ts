import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_NUMBER_FINAL_PATTERN} from '../input-family/domain-validation';
import {ErpNumberBox} from './number-box';

describe('ErpNumberBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpNumberBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpNumberBox);
    fixture.componentRef.setInput('label', 'Quantity');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with a text-like decimal editor and exact numeric defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpNumberBox)?.selector).toBe('erp-number-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.required()).toBe(false);
    expect(control.min()).toBeNull();
    expect(control.max()).toBeNull();
    expect(control.step()).toBe(1);
    expect(control.allowEmpty()).toBe(true);
    expect(control.pattern()).toBeNull();
    expect(native.type).toBe('text');
    expect(native.inputMode).toBe('decimal');
    expect(native.pattern).toBe(ERP_NUMBER_FINAL_PATTERN);
    expect(native.value).toBe('');
  });

  it('keeps progressive drafts separate and publishes only valid final values', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(6);
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    native.value = '12.';
    native.dispatchEvent(new Event('input'));
    expect(native.value).toBe('12.');
    expect(onChange).not.toHaveBeenCalled();

    native.value = '12.5';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(12.5);

    native.value = '12.5x';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(native.value).toBe('12.5x');
    expect(onChange).toHaveBeenCalledOnce();
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.validationIssues().map((issue) => issue.code)).toContain(
      'number.format',
    );
  });

  it('uses developer override patterns and invalid regex disables configuration', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    fixture.componentRef.setInput('pattern', '^\\d{2}$');
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));
    native.value = '123';
    native.dispatchEvent(new Event('input'));
    expect(onChange).not.toHaveBeenCalled();
    native.value = '12';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith(12);

    fixture.componentRef.setInput('pattern', '[');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });

  it('preserves out-of-range numeric values and reports min/max issues without clamping', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    fixture.componentRef.setInput('min', 2);
    fixture.componentRef.setInput('max', 10);
    fixture.detectChanges();

    native.dispatchEvent(new FocusEvent('focus'));
    native.value = '20';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(20);
    expect(native.value).toBe('20');
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.validationIssues().map((issue) => issue.code)).toContain(
      'number.max',
    );

    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('20');
  });

  it('preserves disabled and readonly commits while clear publishes empty', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    fixture.componentRef.setInput('clearable', true);
    control.writeValue(5);
    fixture.detectChanges();

    control['handleClear'](native);
    expect(onChange).toHaveBeenLastCalledWith(null);

    control.writeValue(5);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    native.value = '8';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();

    fixture.componentRef.setInput('readonly', false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    native.value = '9';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
