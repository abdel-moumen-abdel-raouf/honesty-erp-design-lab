import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpTextAreaBox} from './text-area-box';

describe('ErpTextAreaBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpTextAreaBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpTextAreaBox);
    fixture.componentRef.setInput('label', 'Notes');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with the exact multiline defaults and semantic textarea', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('textarea') as HTMLTextAreaElement;

    expect(reflectComponentType(ErpTextAreaBox)?.selector).toBe(
      'erp-text-area-box',
    );
    expect(control.rows()).toBe(4);
    expect(control.resize()).toBe('vertical');
    expect(control.showCounter()).toBe(false);
    expect(native.rows).toBe(4);
    expect(
      host.querySelector('erp-field-frame')?.getAttribute('data-field-multiline'),
    ).toBe('true');
  });

  it('renders a counter only when maxlength exists and counter is enabled', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('showCounter', true);
    fixture.detectChanges();
    expect(host.querySelector('[field-trailing]')).toBeNull();

    fixture.componentRef.setInput('maxLength', 10);
    fixture.componentInstance.writeValue('abcd');
    fixture.detectChanges();
    expect(host.querySelector('[field-trailing]')?.textContent).toContain(
      '4 / 10',
    );
  });

  it('publishes normalized textarea input and blocks readonly input', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    native.value = 'Line one';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('Line one');

    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    native.value = 'blocked';
    native.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('marks pill shape invalid for textarea while rounded remains valid', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('textarea') as HTMLTextAreaElement;

    fixture.componentRef.setInput('shape', 'pill');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('invalid');
    expect(native.disabled).toBe(true);

    fixture.componentRef.setInput('shape', 'rounded');
    fixture.detectChanges();
    expect(host.getAttribute('data-field-configuration-state')).toBe('ready');
    expect(native.disabled).toBe(false);
  });
});
