import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_URL_FINAL_PATTERN} from '../input-family/domain-validation';
import {ErpUrlBox} from './url-box';

describe('ErpUrlBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpUrlBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpUrlBox);
    fixture.componentRef.setInput('label', 'Website');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with exact native URL semantics and built-in pattern', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpUrlBox)?.selector).toBe('erp-url-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.autocomplete()).toBe('url');
    expect(control.pattern()).toBeNull();
    expect(control.minLength()).toBeNull();
    expect(control.maxLength()).toBeNull();
    expect(control.clearable()).toBe(true);
    expect(native.type).toBe('url');
    expect(native.autocomplete).toBe('url');
    expect(native.inputMode).toBe('url');
    expect(native.pattern).toBe(ERP_URL_FINAL_PATTERN);
  });

  it('keeps invalid URL text visible and publishes validation instead of deleting it', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.value = 'ftp://example.com';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('ftp://example.com');
    expect(native.value).toBe('ftp://example.com');
    expect(control.inputState()).toBe('invalid-entry');
    expect(control.errors()).toContain(
      'النص المُدخل ليس عنوان رابط إلكتروني صالحًا.',
    );
    expect(native.getAttribute('aria-invalid')).toBe('true');
    expect(host.textContent).toContain(
      'النص المُدخل ليس عنوان رابط إلكتروني صالحًا.',
    );

    native.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(native.value).toBe('ftp://example.com');

    native.value = 'https://openai.com/path';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(control.inputState()).toBe('valid-entry');
    expect(control.errors()).toEqual([]);
  });

  it('uses a developer override and rejects an invalid regex configuration', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    fixture.componentInstance.registerOnChange(onChange);
    fixture.componentRef.setInput('pattern', '^https:\\/\\/approved\\.example\\/.*$');
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));
    native.value = 'https://other.example/path';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('https://other.example/path');
    expect(fixture.componentInstance.inputState()).toBe('invalid-entry');
    expect(
      fixture.componentInstance.validationIssues().map((issue) => issue.code),
    ).toContain('url.format');

    native.value = 'https://approved.example/path';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenLastCalledWith(
      'https://approved.example/path',
    );
    expect(fixture.componentInstance.inputState()).toBe('valid-entry');

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
