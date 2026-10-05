import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {vi} from 'vitest';
import {ErpForm} from './form';

@Component({selector: 'app-form-host', imports: [ErpForm], template: '<erp-form label="بيانات العميل"><span data-content>محتوى</span></erp-form>'})
class FormHost {}

describe('ErpForm', () => {
  it('owns the native form boundary, label relationship, and projected content', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    expect(form).not.toBeNull();
    expect(form.getAttribute('aria-labelledby')).toBeTruthy();
    expect(form.querySelector('[data-content]')?.textContent).toContain('محتوى');
  });

  it('emits submit and reset intents through native semantics', () => {
    const fixture = TestBed.createComponent(ErpForm);
    fixture.componentRef.setInput('label', 'نموذج');
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const submit = vi.fn(); const reset = vi.fn();
    component.submitRequested.subscribe(submit); component.resetRequested.subscribe(reset);
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new SubmitEvent('submit', {bubbles: true, cancelable: true}));
    form.dispatchEvent(new Event('reset', {bubbles: true, cancelable: true}));
    expect(submit).toHaveBeenCalledOnce(); expect(reset).toHaveBeenCalledOnce();
  });

  it('blocks intents while disabled or busy', () => {
    const fixture = TestBed.createComponent(ErpForm);
    fixture.componentRef.setInput('label', 'نموذج'); fixture.componentRef.setInput('busy', true); fixture.detectChanges();
    const spy = vi.fn(); fixture.componentInstance.submitRequested.subscribe(spy);
    fixture.nativeElement.querySelector('form').dispatchEvent(new SubmitEvent('submit', {bubbles: true, cancelable: true}));
    expect(spy).not.toHaveBeenCalled(); expect(fixture.nativeElement.querySelector('form').getAttribute('aria-busy')).toBe('true');
  });
});
