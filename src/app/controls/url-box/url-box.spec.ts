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
    expect(native.type).toBe('url');
    expect(native.autocomplete).toBe('url');
    expect(native.inputMode).toBe('url');
    expect(native.pattern).toBe(ERP_URL_FINAL_PATTERN);
  });

  it('keeps invalid URL drafts visible while retaining the committed CVA value', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue('https://example.com');
    fixture.detectChanges();
    native.dispatchEvent(new FocusEvent('focus'));

    native.value = 'https://';
    native.dispatchEvent(new Event('input'));
    expect(native.value).toBe('https://');
    expect(onChange).not.toHaveBeenCalled();

    native.value = 'ftp://example.com';
    native.dispatchEvent(new Event('input'));
    expect(onChange).not.toHaveBeenCalled();

    native.value = 'https://openai.com/path';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('https://openai.com/path');
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
    expect(onChange).not.toHaveBeenCalled();
    native.value = 'https://approved.example/path';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('https://approved.example/path');

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
