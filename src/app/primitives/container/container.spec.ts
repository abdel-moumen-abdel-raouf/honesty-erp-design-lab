import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpContainer} from './container';

@Component({
  imports: [ErpContainer],
  template: '<erp-container><span id="projected-container">محتوى</span></erp-container>',
})
class ContainerTestHost {}

describe('ErpContainer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpContainer, ContainerTestHost],
    }).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpContainer).componentInstance).toBeTruthy();
  });

  it('exposes default host attributes', () => {
    const fixture = TestBed.createComponent(ErpContainer);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-width')).toBe('full');
    expect(host.getAttribute('data-gutter')).toBe('page');
  });

  it('updates every public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpContainer);
    fixture.componentRef.setInput('width', 'wide');
    fixture.componentRef.setInput('gutter', 'none');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-width')).toBe('wide');
    expect(host.getAttribute('data-gutter')).toBe('none');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(ContainerTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-container')).toBeTruthy();
  });
});
