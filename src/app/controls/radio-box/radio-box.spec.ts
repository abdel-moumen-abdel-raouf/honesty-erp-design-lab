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

  it('creates with accepted family defaults and authoritative native radio semantics', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpRadioBox)?.selector).toBe('erp-radio-box');
    expect(control.description()).toBeNull();
    expect(control.readOnly()).toBe(false);
    expect(control.hideText()).toBe(false);
    expect(control.tone()).toBe('neutral');
    expect(control.status()).toBe('none');
    expect(control.size()).toBe('md');
    expect(control.mode()).toBe('radio');
    expect(control.variant()).toBe('outline');

    expect(native.type).toBe('radio');
    expect(native.checked).toBe(false);
    expect(native.disabled).toBe(false);
    expect(host.getAttribute('data-radio-box-mode')).toBe('radio');
    expect(host.getAttribute('data-radio-box-variant')).toBe('outline');
    expect(host.getAttribute('data-radio-box-size')).toBe('md');
    expect(host.getAttribute('data-radio-box-status')).toBe('none');
    expect(host.querySelectorAll('.radio-box__visual')).toHaveLength(1);
    expect(host.querySelectorAll('.radio-box__dot')).toHaveLength(1);
    expect(host.querySelector('svg')).toBeNull();
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

  it('renders title and optional description without nested native labels', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('label')).toHaveLength(1);
    expect(host.querySelector('.radio-box__title')?.textContent?.trim()).toBe(
      'Choice',
    );
    expect(host.querySelector('.radio-box__description')).toBeNull();

    fixture.componentRef.setInput(
      'description',
      '  Supporting radio description.  ',
    );
    fixture.detectChanges();

    expect(host.getAttribute('data-radio-box-has-description')).toBe('true');
    expect(
      host.querySelector('.radio-box__description')?.textContent?.trim(),
    ).toBe('Supporting radio description.');
  });

  it('supports radio and tile modes with one native radio owner', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const mode of ['radio', 'tile'] as const) {
      fixture.componentRef.setInput('mode', mode);
      fixture.detectChanges();

      expect(host.getAttribute('data-radio-box-mode')).toBe(mode);
      expect(host.querySelector('label')?.getAttribute('data-mode')).toBe(mode);
      expect(host.querySelectorAll('input[type="radio"]')).toHaveLength(1);
    }
  });

  it('supports outline, filled, and soft variants without semantic forks', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const variant of ['outline', 'filled', 'soft'] as const) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(host.getAttribute('data-radio-box-variant')).toBe(variant);
      expect(
        host.querySelector('label')?.getAttribute('data-variant'),
      ).toBe(variant);
    }
  });

  it('supports standalone visual evidence while preserving its accessible label', () => {
    const fixture = create();
    fixture.componentRef.setInput('hideText', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(host.getAttribute('data-radio-box-hide-text')).toBe('true');
    expect(host.querySelector('.radio-box__text')).toBeNull();
    expect(native.getAttribute('aria-label')).toBe('Choice');
  });

  it('keeps read-only focusable and blocks native pointer and keyboard mutation', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();

    expect(native.disabled).toBe(false);
    expect(native.getAttribute('aria-readonly')).toBe('true');
    expect(host.getAttribute('data-radio-box-readonly')).toBe('true');

    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    native.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(native.checked).toBe(false);
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
    expect(host.getAttribute('data-radio-box-status')).toBe('danger');
    expect(native.getAttribute('aria-invalid')).toBe('true');

    native.checked = true;
    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(control.valid()).toBe(true);
    expect(host.getAttribute('data-radio-box-status')).toBe('none');
    expect(native.getAttribute('aria-invalid')).toBeNull();
  });

  it('keeps all shared size names while RadioBox visual geometry ends at xl', () => {
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
      expect(host.getAttribute('data-radio-box-size')).toBe(size);
      expect(host.querySelectorAll('.radio-box__visual')).toHaveLength(1);
    }
  });

  it('preserves disabled and invalid-configuration boundaries', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(native.disabled).toBe(true);
    expect(host.getAttribute('data-radio-box-state')).toBe('disabled');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();

    expect(native.disabled).toBe(true);
    expect(host.getAttribute('data-radio-box-state')).toBe('invalid');
  });
});

function hostAttribute(
  fixture: ReturnType<typeof TestBed.createComponent<ErpRadioBox>>,
  name: string,
): string | null {
  return (fixture.nativeElement as HTMLElement).getAttribute(name);
}
