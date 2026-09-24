import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpTextBox} from './text-box';

describe('ErpTextBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpTextBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpTextBox);
    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
    return fixture;
  }

  it('creates the public text control with exact defaults and native semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpTextBox)?.selector).toBe('erp-text-box');
    expect(control.placeholder()).toBeNull();
    expect(control.readonly()).toBe(false);
    expect(control.required()).toBe(false);
    expect(control.minLength()).toBeNull();
    expect(control.maxLength()).toBeNull();
    expect(control.pattern()).toBeNull();
    expect(control.autocomplete()).toBeNull();
    expect(control.inputMode()).toBe('text');
    expect(control.spellcheck()).toBe(true);
    expect(native.type).toBe('text');
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-field-configuration-state')).toBe('ready');
    expect(host.querySelector('label')?.getAttribute('for')).toBe(native.id);
  });

  it('normalizes CVA writes and publishes native user input once', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(42);
    fixture.detectChanges();
    expect(native.value).toBe('42');
    expect(onChange).not.toHaveBeenCalled();

    native.value = 'Updated';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('Updated');
  });

  it('shows clear only for a nonempty ready editable value and commits empty', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    fixture.componentRef.setInput('clearable', true);
    control.writeValue('value');
    fixture.detectChanges();

    expect(host.querySelector('erp-icon-button')).toBeTruthy();
    control['handleClear'](native);
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith('');
    expect(native.value).toBe('');

    fixture.componentRef.setInput('readonly', true);
    control.writeValue('locked');
    fixture.detectChanges();
    expect(host.querySelector('erp-icon-button')).toBeNull();
  });

  it('composes helper and danger feedback relationships and retains invalid state after dismissal', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    fixture.componentRef.setInput('helperText', 'Guidance');
    fixture.componentRef.setInput('status', 'danger');
    fixture.componentRef.setInput('feedbackText', 'Invalid value');
    fixture.componentRef.setInput('feedbackDismissible', true);
    fixture.detectChanges();

    expect(native.getAttribute('aria-invalid')).toBe('true');
    expect(native.getAttribute('aria-describedby')?.split(' ').length).toBe(2);
    expect(native.getAttribute('aria-errormessage')).toContain('-feedback');

    fixture.componentInstance['dismissFeedback']();
    fixture.detectChanges();
    expect(native.getAttribute('aria-invalid')).toBe('true');
    expect(native.getAttribute('aria-describedby')?.split(' ').length).toBe(1);
    expect(native.hasAttribute('aria-errormessage')).toBe(false);
  });

  it('disables deterministic incompatible field combinations', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('appearance', 'glass');
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();

    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);
  });
});
