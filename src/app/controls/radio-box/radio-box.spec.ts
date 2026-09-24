import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpRadioBox} from './radio-box';

describe('ErpRadioBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpRadioBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpRadioBox);
    fixture.componentRef.setInput('label', 'Choice');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with exact defaults and authoritative native radio semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpRadioBox)?.selector).toBe('erp-radio-box');
    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.size()).toBe('md');
    expect(native.type).toBe('radio');
    expect(native.checked).toBe(false);
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-radio-box-state')).toBe('ready');
    expect(host.getAttribute('data-radio-box-checked')).toBe('false');
    expect(host.querySelector('label')?.getAttribute('for')).toBe(native.id);
  });

  it('activates false to true exactly once and never self-toggles true to false', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(true);
    expect(hostAttribute(fixture, 'data-radio-box-checked')).toBe('true');

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledOnce();
    expect(hostAttribute(fixture, 'data-radio-box-checked')).toBe('true');
  });

  it('allows form writes to clear without publishing a user change', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(true);
    fixture.detectChanges();
    expect(native.checked).toBe(true);

    control.writeValue(false);
    fixture.detectChanges();
    expect(native.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables invalid and explicitly disabled controls', () => {
    const fixture = create();
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(native.disabled).toBe(true);
    expect(hostAttribute(fixture, 'data-radio-box-state')).toBe('disabled');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(native.disabled).toBe(true);
    expect(hostAttribute(fixture, 'data-radio-box-state')).toBe('invalid');
  });

  it('updates each public visual facet evidence attribute', () => {
    const fixture = create();
    fixture.componentRef.setInput('tone', 'secondary');
    fixture.componentRef.setInput('status', 'success');
    fixture.componentRef.setInput('size', 'xxxl');
    fixture.detectChanges();

    expect(hostAttribute(fixture, 'data-radio-box-tone')).toBe('secondary');
    expect(hostAttribute(fixture, 'data-radio-box-status')).toBe('success');
    expect(hostAttribute(fixture, 'data-radio-box-size')).toBe('xxxl');
  });
});

function hostAttribute(
  fixture: ReturnType<typeof TestBed.createComponent<ErpRadioBox>>,
  name: string,
): string | null {
  return (fixture.nativeElement as HTMLElement).getAttribute(name);
}
