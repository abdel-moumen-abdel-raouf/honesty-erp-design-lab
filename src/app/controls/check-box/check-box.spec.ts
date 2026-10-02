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
    expect(control.description()).toBeNull();
    expect(control.indeterminate()).toBe(false);
    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.size()).toBe('md');
    expect(control.variant()).toBe('classic');
    expect(native.type).toBe('checkbox');
    expect(native.checked).toBe(false);
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-check-box-state')).toBe('ready');
    expect(host.getAttribute('data-check-box-checked')).toBe('false');
    expect(host.getAttribute('data-check-box-variant')).toBe('classic');
    expect(host.getAttribute('data-check-box-has-description')).toBe('false');
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

  it('centers one control against a title and optional multiline description block', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('.check-box__control')).toHaveLength(1);
    expect(host.querySelectorAll('.check-box__text')).toHaveLength(1);
    expect(host.querySelector('.check-box__title')?.textContent?.trim()).toBe(
      'Active',
    );
    expect(host.querySelector('.check-box__description')).toBeNull();

    fixture.componentRef.setInput(
      'description',
      '  A longer supporting description that may wrap onto multiple lines.  ',
    );
    fixture.detectChanges();

    expect(host.getAttribute('data-check-box-has-description')).toBe('true');
    expect(
      host.querySelector('.check-box__description')?.textContent?.trim(),
    ).toBe('A longer supporting description that may wrap onto multiple lines.');
  });

  it('keeps one fixed visual box while native state drives CSS check and indeterminate marks', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const visual = host.querySelector('.check-box__visual');

    expect(host.querySelectorAll('.check-box__control')).toHaveLength(1);
    expect(host.querySelectorAll('.check-box__visual')).toHaveLength(1);
    expect(host.querySelector('erp-icon')).toBeNull();

    control.writeValue(true);
    fixture.detectChanges();
    expect(host.querySelector('.check-box__visual')).toBe(visual);
    expect(host.getAttribute('data-check-box-checked')).toBe('true');

    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    expect(host.querySelector('.check-box__visual')).toBe(visual);
    expect(host.getAttribute('data-check-box-indeterminate')).toBe('true');
    expect(host.querySelector('erp-icon')).toBeNull();
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

  it('updates every public visual facet without changing the one-control contract', () => {
    const fixture = create();
    fixture.componentRef.setInput('tone', 'accent');
    fixture.componentRef.setInput('status', 'warning');
    fixture.detectChanges();

    expect(hostAttribute(fixture, 'data-check-box-tone')).toBe('accent');
    expect(hostAttribute(fixture, 'data-check-box-status')).toBe('warning');

    for (const size of ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(hostAttribute(fixture, 'data-check-box-size')).toBe(size);
      expect(
        fixture.nativeElement.querySelectorAll('.check-box__visual').length,
      ).toBe(1);
    }
  });

  it('exposes the template classic, switch, and neon variants without changing native checkbox semantics', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    for (const variant of ['classic', 'switch', 'neon'] as const) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(host.getAttribute('data-check-box-variant')).toBe(variant);
      expect(host.querySelectorAll('input[type="checkbox"]')).toHaveLength(1);
      expect(host.querySelectorAll('.check-box__visual')).toHaveLength(1);
      expect(native.type).toBe('checkbox');
    }
  });

  it('reports no-selection and required validation when unchecked', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(control.inputState()).toBe('no-selection');
    expect(control.valid()).toBe(true);

    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(control.inputState()).toBe('no-selection');
    expect(control.valid()).toBe(false);
    expect(control.errors()).toEqual(['القيمة مطلوبة.']);
    expect(native.getAttribute('aria-invalid')).toBe('true');

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(control.inputState()).toBe('valid-entry');
    expect(control.valid()).toBe(true);
  });
});

function hostAttribute(
  fixture: ReturnType<typeof TestBed.createComponent<ErpCheckBox>>,
  name: string,
): string | null {
  return (fixture.nativeElement as HTMLElement).getAttribute(name);
}
