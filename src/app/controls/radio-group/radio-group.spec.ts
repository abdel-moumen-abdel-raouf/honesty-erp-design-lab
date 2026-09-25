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
      {value: 'pickup', label: 'Pickup'},
      {value: 'courier', label: 'Courier'},
      {value: 'disabled', label: 'Disabled', disabled: true},
    ]);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with coordinated native radio semantics and a null value', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const inputs = [...host.querySelectorAll<HTMLInputElement>('input[type="radio"]')];

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.getAttribute('data-radio-group-value')).toBeNull();
    expect(host.getAttribute('data-radio-group-state')).toBe('ready');
    expect(inputs).toHaveLength(3);
    expect(inputs.map((input) => input.name)).toEqual([
      'delivery',
      'delivery',
      'delivery',
    ]);
    expect(inputs[2].disabled).toBe(true);
  });

  it('commits a declared option through CVA and rejects unknown values', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    const host = fixture.nativeElement as HTMLElement;
    const courier = host.querySelectorAll<HTMLInputElement>('input')[1];
    courier.click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('courier');
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-radio-group-value')).toBe('courier');

    control.writeValue('unknown');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-radio-group-value')).toBeNull();
  });

  it('uses Arrow navigation across enabled options and exposes required group semantics', async () => {
    const fixture = create();
    const control = fixture.componentInstance;
    fixture.componentRef.setInput('required', true);
    control.writeValue('pickup');
    fixture.detectChanges();

    const fieldset = fixture.nativeElement.querySelector('fieldset') as HTMLElement;
    fieldset.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    await Promise.resolve();
    fixture.detectChanges();

    expect(fieldset.getAttribute('aria-required')).toBe('true');
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-radio-group-value')).toBe('courier');
    expect(document.activeElement).toBe(
      (fixture.nativeElement as HTMLElement)
        .querySelectorAll<HTMLInputElement>('input')[1],
    );
  });
});
