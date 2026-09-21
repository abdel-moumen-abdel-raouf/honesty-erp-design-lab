import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpSection} from './section';

@Component({
  imports: [ErpSection],
  template: '<erp-section><span id="projected-section">محتوى</span></erp-section>',
})
class SectionTestHost {}

describe('ErpSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpSection, SectionTestHost]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpSection).componentInstance).toBeTruthy();
  });

  it('exposes the default host attribute', () => {
    const fixture = TestBed.createComponent(ErpSection);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-gap')).toBe('default');
  });

  it('updates its public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpSection);
    fixture.componentRef.setInput('gap', 'large');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-gap')).toBe('large');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(SectionTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-section')).toBeTruthy();
  });
});
