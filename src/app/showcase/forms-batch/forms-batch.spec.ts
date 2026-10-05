import {TestBed} from '@angular/core/testing';
import {FormsBatch} from './forms-batch';

describe('FormsBatch', () => {
  it('renders the six owner sections and one integrated ERP-only specimen', () => {
    const fixture = TestBed.createComponent(FormsBatch); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[data-forms-owner]')).toHaveLength(6);
    expect(fixture.nativeElement.querySelector('[data-integrated-forms-specimen]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-form')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-repeater')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-stepper')).not.toBeNull();
  });

  it('keeps native form/input/button ownership inside ERP components', () => {
    const fixture = TestBed.createComponent(FormsBatch); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-forms-batch > form')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-forms-batch > button')).toBeNull();
  });

  it('demonstrates consumer-owned repeater and submit/reset intents', () => {
    const fixture = TestBed.createComponent(FormsBatch); fixture.detectChanges();
    fixture.componentInstance.addContact();
    expect(fixture.componentInstance.contacts()).toHaveLength(2);
    fixture.componentInstance.submit(); expect(fixture.componentInstance.issues()).toHaveLength(1);
    fixture.componentInstance.reset(); expect(fixture.componentInstance.issues()).toHaveLength(0);
  });
});
