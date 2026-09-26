import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ERP_NUMBER_FINAL_PATTERN} from '../input-family/domain-validation';
import {ErpNumberStepper} from './number-stepper';

describe('ErpNumberStepper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpNumberStepper]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpNumberStepper);
    fixture.componentRef.setInput('label', 'Units');
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 10);
    fixture.componentRef.setInput('step', 2);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with a text-like decimal editor and deterministic actions', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpNumberStepper)?.selector).toBe('erp-number-stepper');
    expect(control.min()).toBe(0);
    expect(control.max()).toBe(10);
    expect(control.step()).toBe(2);
    expect(control.allowEmpty()).toBe(true);
    expect(control.pattern()).toBeNull();
    expect(native.type).toBe('text');
    expect(native.inputMode).toBe('decimal');
    expect(native.pattern).toBe(ERP_NUMBER_FINAL_PATTERN);
    expect(host.querySelector('[data-stepper-decrement] button')?.getAttribute('aria-label')).toBe('Decrease value');
    expect(host.querySelector('[data-stepper-increment] button')?.getAttribute('aria-label')).toBe('Increase value');
  });

  it('increments and decrements one scalar value through ERP actions', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(4);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('[data-stepper-increment] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(native.value).toBe('6');
    expect(onChange).toHaveBeenLastCalledWith(6);

    (fixture.nativeElement.querySelector('[data-stepper-decrement] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(native.value).toBe('4');
    expect(onChange).toHaveBeenLastCalledWith(4);
  });

  it('supports ArrowUp ArrowDown Home and End on the coherent numeric field', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    control.writeValue(4);
    fixture.detectChanges();

    for (const [key, expected] of [
      ['ArrowUp', '6'],
      ['ArrowDown', '4'],
      ['Home', '0'],
      ['End', '10'],
    ] as const) {
      native.dispatchEvent(new KeyboardEvent('keydown', {key, bubbles: true}));
      fixture.detectChanges();
      expect(native.value).toBe(expected);
    }
  });

  it('keeps invalid drafts from publishing and honors pattern configuration', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(4);
    native.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    native.value = '4.';
    native.dispatchEvent(new Event('input'));
    expect(native.value).toBe('4.');
    expect(onChange).not.toHaveBeenCalled();
    native.value = '4x';
    native.dispatchEvent(new Event('input'));
    expect(native.value).toBe('4.');

    fixture.componentRef.setInput('pattern', '[');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });
});
