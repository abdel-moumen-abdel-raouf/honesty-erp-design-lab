import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
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

  it('creates with exact numeric defaults and native number semantics', () => {
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
    expect(native.type).toBe('number');
    expect(native.value).toBe('');
  });

  it('normalizes writes without publishing and clamps user commits to bounds', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    fixture.componentRef.setInput('min', 2);
    fixture.componentRef.setInput('max', 10);

    control.writeValue('6');
    fixture.detectChanges();
    expect(native.valueAsNumber).toBe(6);
    expect(onChange).not.toHaveBeenCalled();

    native.value = '20';
    native.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith(10);
    expect(native.valueAsNumber).toBe(10);
  });

  it('supports empty values only when allowEmpty is true', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.value = '';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenLastCalledWith(null);

    fixture.componentRef.setInput('allowEmpty', false);
    native.value = '';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
