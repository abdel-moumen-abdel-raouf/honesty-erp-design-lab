import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFieldTrigger} from './field-trigger';

@Component({
  imports: [ErpFieldTrigger],
  template: `
    <erp-field-trigger
      id="picker-trigger"
      name="picker"
      form="picker-form"
      ariaDescribedBy="picker-helper"
      ariaErrorMessage="picker-error"
      [ariaInvalid]="true"
      (activated)="activated = true"
      (keyPressed)="key = $event.key"
      (focused)="focused = true"
      (blurred)="blurred = true"
    >
      Projected value
    </erp-field-trigger>
  `,
})
class TestHost {
  activated = false;
  focused = false;
  blurred = false;
  key: string | null = null;
}

describe('ErpFieldTrigger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TestHost]});
  });

  it('owns one transparent native button contract and projected content', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      'erp-field-trigger',
    ) as HTMLElement;
    const button = trigger.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('button');
    expect(button.id).toBe('picker-trigger');
    expect(button.name).toBe('picker');
    expect(button.getAttribute('form')).toBe('picker-form');
    expect(button.getAttribute('aria-describedby')).toBe('picker-helper');
    expect(button.getAttribute('aria-errormessage')).toBe('picker-error');
    expect(button.getAttribute('aria-invalid')).toBe('true');
    expect(button.textContent?.trim()).toBe('Projected value');
  });

  it('forwards activation, keyboard, focus, and blur events', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    button.click();
    button.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    button.dispatchEvent(new FocusEvent('focus'));
    button.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(fixture.componentInstance.activated).toBe(true);
    expect(fixture.componentInstance.key).toBe('ArrowDown');
    expect(fixture.componentInstance.focused).toBe(true);
    expect(fixture.componentInstance.blurred).toBe(true);
  });

  it('forwards disabled state to the native trigger', () => {
    const fixture = TestBed.createComponent(ErpFieldTrigger);
    fixture.componentRef.setInput('id', 'disabled-trigger');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('button') as HTMLButtonElement;

    expect(host.getAttribute('data-field-trigger-disabled')).toBe('true');
    expect(button.disabled).toBe(true);
  });
});
