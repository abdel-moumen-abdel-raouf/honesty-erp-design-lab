import {TestBed} from '@angular/core/testing';
import {ErpRadioGroup} from './radio-group';

describe('ErpRadioGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpRadioGroup]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpRadioGroup);
    fixture.componentRef.setInput('label', 'Delivery method');
    fixture.componentRef.setInput('name', 'delivery');
    fixture.componentRef.setInput('options', [
      {
        value: 'pickup',
        label: 'Pickup',
        description: 'Collect from branch.',
      },
      {
        value: 'courier',
        label: 'Courier',
        description: 'Deliver to customer.',
      },
      {value: 'disabled', label: 'Disabled', disabled: true},
    ]);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with coordinated native radio semantics and a null value', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const inputs = [
      ...host.querySelectorAll<HTMLInputElement>('input[type="radio"]'),
    ];

    expect(host.getAttribute('data-radio-group-value')).toBeNull();
    expect(host.getAttribute('data-radio-group-state')).toBe('ready');
    expect(host.getAttribute('data-radio-group-mode')).toBe('radio');
    expect(host.getAttribute('data-radio-group-variant')).toBe('outline');
    expect(inputs).toHaveLength(3);
    expect(inputs.map((input) => input.name)).toEqual([
      'delivery',
      'delivery',
      'delivery',
    ]);
    expect(inputs[2].disabled).toBe(true);
    expect(
      host.querySelector('.radio-box__description')?.textContent?.trim(),
    ).toBe('Collect from branch.');
  });

  it('commits a declared option and rejects unknown values', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    const host = fixture.nativeElement as HTMLElement;
    const courier = host.querySelectorAll<HTMLInputElement>('input')[1];
    courier.click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('courier');
    expect(host.getAttribute('data-radio-group-value')).toBe('courier');

    control.writeValue('unknown');
    fixture.detectChanges();

    expect(host.getAttribute('data-radio-group-value')).toBeNull();
  });

  it('passes tile and visual facets through to every RadioBox option', () => {
    const fixture = create();
    fixture.componentRef.setInput('mode', 'tile');
    fixture.componentRef.setInput('variant', 'soft');
    fixture.componentRef.setInput('tone', 'secondary');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const options = [...host.querySelectorAll<HTMLElement>('erp-radio-box')];

    expect(host.getAttribute('data-radio-group-mode')).toBe('tile');
    expect(host.getAttribute('data-radio-group-variant')).toBe('soft');
    expect(options).toHaveLength(3);

    for (const option of options) {
      expect(option.getAttribute('data-radio-box-mode')).toBe('tile');
      expect(option.getAttribute('data-radio-box-variant')).toBe('soft');
      expect(option.getAttribute('data-radio-box-tone')).toBe('secondary');
      expect(option.getAttribute('data-radio-box-size')).toBe('lg');
    }
  });

  it('uses Arrow navigation across enabled options and moves native focus', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    control.writeValue('pickup');
    fixture.detectChanges();

    const fieldset = fixture.nativeElement.querySelector('fieldset') as HTMLElement;
    fieldset.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}),
    );
    await Promise.resolve();
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement).getAttribute(
        'data-radio-group-value',
      ),
    ).toBe('courier');
    expect(document.activeElement).toBe(
      (fixture.nativeElement as HTMLElement)
        .querySelectorAll<HTMLInputElement>('input')[1],
    );
  });

  it('keeps read-only focusable and blocks pointer and Arrow selection changes', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    control.writeValue('pickup');
    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const inputs = host.querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].disabled).toBe(false);
    expect(inputs[0].getAttribute('aria-readonly')).toBe('true');

    inputs[1].click();
    fixture.detectChanges();
    expect(host.getAttribute('data-radio-group-value')).toBe('pickup');

    const fieldset = host.querySelector('fieldset') as HTMLElement;
    fieldset.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}),
    );
    await Promise.resolve();
    fixture.detectChanges();

    expect(fieldset.getAttribute('aria-readonly')).toBe('true');
    expect(host.getAttribute('data-radio-group-value')).toBe('pickup');
  });

  it('projects required group danger to RadioBox visuals and recovers after selection', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const fieldset = host.querySelector('fieldset') as HTMLElement;

    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(control.valid()).toBe(false);
    expect(fieldset.getAttribute('aria-required')).toBe('true');
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
    expect(
      [...host.querySelectorAll('erp-radio-box')].every(
        (option) => option.getAttribute('data-radio-box-status') === 'danger',
      ),
    ).toBe(true);

    host.querySelectorAll<HTMLInputElement>('input')[0].click();
    fixture.detectChanges();

    expect(control.valid()).toBe(true);
    expect(fieldset.getAttribute('aria-invalid')).toBeNull();
    expect(
      [...host.querySelectorAll('erp-radio-box')].every(
        (option) => option.getAttribute('data-radio-box-status') === 'none',
      ),
    ).toBe(true);
  });
});
