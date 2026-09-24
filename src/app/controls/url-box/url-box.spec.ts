import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
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

  it('creates with exact native type, autocomplete, and input mode', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpUrlBox)?.selector).toBe('erp-url-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.autocomplete()).toBe('url');
    expect(native.type).toBe('url');
    expect(native.autocomplete).toBe('url');
    expect(native.inputMode).toBe('url');
  });

  it('normalizes form writes and publishes direct user input once', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(42);
    fixture.detectChanges();
    expect(native.value).toBe('42');
    expect(onChange).not.toHaveBeenCalled();

    native.value = 'changed';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('changed');
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
