import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpStack} from './stack';

@Component({
  imports: [ErpStack],
  template: '<erp-stack><span id="projected-stack">محتوى</span></erp-stack>',
})
class StackTestHost {}

describe('ErpStack', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpStack, StackTestHost]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpStack).componentInstance).toBeTruthy();
  });

  it('exposes default host attributes', () => {
    const fixture = TestBed.createComponent(ErpStack);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-gap')).toBe('default');
    expect(host.getAttribute('data-align')).toBe('stretch');
    expect(host.getAttribute('data-justify')).toBe('start');
  });

  it('updates every public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpStack);
    fixture.componentRef.setInput('gap', 'loose');
    fixture.componentRef.setInput('align', 'end');
    fixture.componentRef.setInput('justify', 'between');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-gap')).toBe('loose');
    expect(host.getAttribute('data-align')).toBe('end');
    expect(host.getAttribute('data-justify')).toBe('between');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(StackTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-stack')).toBeTruthy();
  });
});
