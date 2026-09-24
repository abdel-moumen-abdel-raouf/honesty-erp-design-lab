import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
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

  it('creates with exact native type, autocomplete, and input mode', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpTelBox)?.selector).toBe('erp-tel-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.autocomplete()).toBe('tel');
    expect(native.type).toBe('tel');
    expect(native.autocomplete).toBe('tel');
    expect(native.inputMode).toBe('tel');
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
