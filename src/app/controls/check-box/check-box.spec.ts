import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpCheckBox} from './check-box';

describe('ErpCheckBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpCheckBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpCheckBox);
    fixture.componentRef.setInput('label', 'Active');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with exact defaults and authoritative native checkbox semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpCheckBox)?.selector).toBe('erp-check-box');
    expect(control.indeterminate()).toBe(false);
    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.size()).toBe('md');
    expect(native.type).toBe('checkbox');
    expect(native.checked).toBe(false);
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-check-box-state')).toBe('ready');
    expect(host.getAttribute('data-check-box-checked')).toBe('false');
    expect(host.querySelector('label')?.getAttribute('for')).toBe(native.id);
  });

  it('normalizes CVA writes and publishes native user changes once', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(true);
    fixture.detectChanges();
    expect(native.checked).toBe(true);
    expect(onChange).not.toHaveBeenCalled();

    native.checked = false;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(false);
    expect(hostAttribute(fixture, 'data-check-box-checked')).toBe('false');
  });

  it('forwards indeterminate and blocks invalid or disabled user changes', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    expect(native.indeterminate).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(native.disabled).toBe(true);
    expect(hostAttribute(fixture, 'data-check-box-state')).toBe('disabled');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(native.disabled).toBe(true);
    expect(hostAttribute(fixture, 'data-check-box-state')).toBe('invalid');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('updates each public visual facet evidence attribute', () => {
    const fixture = create();
    fixture.componentRef.setInput('tone', 'accent');
    fixture.componentRef.setInput('status', 'warning');
    fixture.componentRef.setInput('size', 'xxxxl');
    fixture.detectChanges();

    expect(hostAttribute(fixture, 'data-check-box-tone')).toBe('accent');
    expect(hostAttribute(fixture, 'data-check-box-status')).toBe('warning');
    expect(hostAttribute(fixture, 'data-check-box-size')).toBe('xxxxl');
  });
});

function hostAttribute(
  fixture: ReturnType<typeof TestBed.createComponent<ErpCheckBox>>,
  name: string,
): string | null {
  return (fixture.nativeElement as HTMLElement).getAttribute(name);
}
