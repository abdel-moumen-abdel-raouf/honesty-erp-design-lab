import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpRangeSlider} from './range-slider';

describe('ErpRangeSlider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpRangeSlider]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpRangeSlider);
    fixture.componentRef.setInput('label', 'Range');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with the exact full-range defaults and two stable native thumbs', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const thumbs = host.querySelectorAll<HTMLInputElement>('input[type="range"]');

    expect(reflectComponentType(ErpRangeSlider)?.selector).toBe('erp-range-slider');
    expect(control.min()).toBe(0);
    expect(control.max()).toBe(100);
    expect(control.step()).toBe(1);
    expect(control.defaultRange()).toBeNull();
    expect(control.clearable()).toBe(false);
    expect(thumbs.length).toBe(2);
    expect([...thumbs].map((thumb) => thumb.dataset['rangeThumb'])).toEqual(['lower', 'upper']);
    expect(host.getAttribute('data-range-slider-lower')).toBe('0');
    expect(host.getAttribute('data-range-slider-upper')).toBe('100');
  });

  it('normalizes external ranges into an owned ordered bounded value', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const callerValue = {lower: 90, upper: 10};

    control.writeValue(callerValue);
    fixture.detectChanges();
    callerValue.lower = 0;

    expect(host.getAttribute('data-range-slider-lower')).toBe('10');
    expect(host.getAttribute('data-range-slider-upper')).toBe('90');
  });

  it('prevents thumb crossing during native input', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const lower = host.querySelector('[data-range-thumb="lower"]') as HTMLInputElement;
    const upper = host.querySelector('[data-range-thumb="upper"]') as HTMLInputElement;
    control.writeValue({lower: 25, upper: 75});
    fixture.detectChanges();

    lower.value = '90';
    lower.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.getAttribute('data-range-slider-lower')).toBe('75');
    expect(host.getAttribute('data-range-slider-upper')).toBe('75');

    upper.value = '10';
    upper.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.getAttribute('data-range-slider-lower')).toBe('75');
    expect(host.getAttribute('data-range-slider-upper')).toBe('75');
  });

  it('clears to a valid configured defaultRange', () => {
    const fixture = TestBed.createComponent(ErpRangeSlider);
    fixture.componentRef.setInput('label', 'Range');
    fixture.componentRef.setInput('defaultRange', {lower: 20, upper: 80});
    fixture.componentRef.setInput('clearable', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.writeValue({lower: 30, upper: 60});
    fixture.detectChanges();

    (host.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(host.getAttribute('data-range-slider-lower')).toBe('20');
    expect(host.getAttribute('data-range-slider-upper')).toBe('80');
  });

  it('keeps numeric ArrowRight increase and ArrowLeft decrease in RTL', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const lower = host.querySelector('[data-range-thumb="lower"]') as HTMLInputElement;
    host.setAttribute('dir', 'rtl');
    control.writeValue({lower: 20, upper: 80});
    fixture.detectChanges();

    lower.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}));
    fixture.detectChanges();
    expect(host.getAttribute('data-range-slider-lower')).toBe('21');

    lower.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
    fixture.detectChanges();
    expect(host.getAttribute('data-range-slider-lower')).toBe('20');
  });
});
