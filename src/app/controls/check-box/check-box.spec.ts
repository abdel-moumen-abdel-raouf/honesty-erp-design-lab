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

  it('creates with the supplied reference defaults and native semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpCheckBox)?.selector).toBe('erp-check-box');
    expect(control.description()).toBeNull();
    expect(control.indeterminate()).toBe(false);
    expect(control.readOnly()).toBe(false);
    expect(control.hideText()).toBe(false);
    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.size()).toBe('md');
    expect(control.mode()).toBe('checkbox');
    expect(control.variant()).toBe('outline');

    expect(native.type).toBe('checkbox');
    expect(native.checked).toBe(false);
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-check-box-mode')).toBe('checkbox');
    expect(host.getAttribute('data-check-box-variant')).toBe('outline');
    expect(host.getAttribute('data-check-box-size')).toBe('md');
    expect(host.getAttribute('data-check-box-status')).toBe('none');

    expect(host.querySelectorAll('.check-box__box')).toHaveLength(1);
    expect(host.querySelectorAll('.check-box__thumb')).toHaveLength(1);
    expect(host.querySelectorAll('svg.check-box__mark')).toHaveLength(1);
    expect(host.querySelectorAll('.check-box__mark-check')).toHaveLength(1);
    expect(host.querySelectorAll('.check-box__mark-dash')).toHaveLength(1);
    expect(
      host.querySelector('.check-box__mark-check')?.getAttribute('pathLength'),
    ).toBe('1');
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

  it('renders title and optional description without nested native labels', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('label')).toHaveLength(1);
    expect(host.querySelector('.check-box__title')?.textContent?.trim()).toBe(
      'Active',
    );
    expect(host.querySelector('.check-box__description')).toBeNull();

    fixture.componentRef.setInput(
      'description',
      '  Supporting text that may wrap to another line.  ',
    );
    fixture.detectChanges();

    expect(host.getAttribute('data-check-box-has-description')).toBe('true');
    expect(
      host.querySelector('.check-box__description')?.textContent?.trim(),
    ).toBe('Supporting text that may wrap to another line.');
  });

  it('supports the exact checkbox, switch, and tile modes', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const mode of ['checkbox', 'switch', 'tile'] as const) {
      fixture.componentRef.setInput('mode', mode);
      fixture.detectChanges();

      expect(host.getAttribute('data-check-box-mode')).toBe(mode);
      expect(
        host.querySelector('label')?.getAttribute('data-mode'),
      ).toBe(mode);
      expect(host.querySelectorAll('input[type="checkbox"]')).toHaveLength(1);
    }
  });

  it('supports the exact outline, filled, and soft variants', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const variant of ['outline', 'filled', 'soft'] as const) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(host.getAttribute('data-check-box-variant')).toBe(variant);
      expect(
        host.querySelector('label')?.getAttribute('data-variant'),
      ).toBe(variant);
    }
  });

  it('supports standalone visual evidence while preserving an accessible label', () => {
    const fixture = create();
    fixture.componentRef.setInput('hideText', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(host.getAttribute('data-check-box-hide-text')).toBe('true');
    expect(host.querySelector('.check-box__text')).toBeNull();
    expect(native.getAttribute('aria-label')).toBe('Active');
  });

  it('leaves indeterminate after user activation and re-arms on input change', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    expect(native.indeterminate).toBe(true);
    expect(host.getAttribute('data-check-box-indeterminate')).toBe('true');

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(native.indeterminate).toBe(false);
    expect(host.getAttribute('data-check-box-indeterminate')).toBe('false');
    expect(host.getAttribute('data-check-box-checked')).toBe('true');

    fixture.componentRef.setInput('indeterminate', false);
    fixture.detectChanges();
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    expect(native.indeterminate).toBe(true);
    expect(host.getAttribute('data-check-box-indeterminate')).toBe('true');
    expect(control.indeterminate()).toBe(true);
  });

  it('keeps read-only focusable and restores the authoritative value on change', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(true);
    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();

    expect(native.disabled).toBe(false);
    expect(native.getAttribute('aria-readonly')).toBe('true');
    expect(host.getAttribute('data-check-box-readonly')).toBe('true');

    native.checked = false;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(native.checked).toBe(true);
    expect(onChange).not.toHaveBeenCalled();

    const keydown = new KeyboardEvent('keydown', {
      key: ' ',
      cancelable: true,
    });
    native.dispatchEvent(keydown);
    expect(keydown.defaultPrevented).toBe(true);
  });

  it('derives danger from required validation and recovers after selection', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(control.valid()).toBe(false);
    expect(host.getAttribute('data-check-box-status')).toBe('danger');
    expect(native.getAttribute('aria-invalid')).toBe('true');

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(control.valid()).toBe(true);
    expect(host.getAttribute('data-check-box-status')).toBe('none');
    expect(native.getAttribute('aria-invalid')).toBeNull();
  });

  it('keeps every public size input while the CheckBox visual scale ends at xl', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const size of [
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
      'xxxl',
      'xxxxl',
    ] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-check-box-size')).toBe(size);
    }
  });

  it('preserves disabled and invalid-configuration boundaries', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(native.disabled).toBe(true);
    expect(host.getAttribute('data-check-box-state')).toBe('disabled');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();

    expect(native.disabled).toBe(true);
    expect(host.getAttribute('data-check-box-state')).toBe('invalid');
  });
});

function hostAttribute(
  fixture: ReturnType<typeof TestBed.createComponent<ErpCheckBox>>,
  name: string,
): string | null {
  return (fixture.nativeElement as HTMLElement).getAttribute(name);
}
