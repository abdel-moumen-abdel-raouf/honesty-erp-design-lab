import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpInline} from './inline';

@Component({
  imports: [ErpInline],
  template: '<erp-inline><span id="projected-inline">محتوى</span></erp-inline>',
})
class InlineTestHost {}

describe('ErpInline', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpInline, InlineTestHost]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpInline).componentInstance).toBeTruthy();
  });

  it('exposes default host attributes', () => {
    const fixture = TestBed.createComponent(ErpInline);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-gap')).toBe('default');
    expect(host.getAttribute('data-align')).toBe('center');
    expect(host.getAttribute('data-justify')).toBe('start');
    expect(host.getAttribute('data-wrap')).toBe('nowrap');
  });

  it('updates every public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpInline);
    fixture.componentRef.setInput('gap', 'loose');
    fixture.componentRef.setInput('align', 'baseline');
    fixture.componentRef.setInput('justify', 'between');
    fixture.componentRef.setInput('wrap', 'wrap');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-gap')).toBe('loose');
    expect(host.getAttribute('data-align')).toBe('baseline');
    expect(host.getAttribute('data-justify')).toBe('between');
    expect(host.getAttribute('data-wrap')).toBe('wrap');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(InlineTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-inline')).toBeTruthy();
  });
});
