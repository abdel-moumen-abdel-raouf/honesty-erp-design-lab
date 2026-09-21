import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpGrid} from './grid';

@Component({
  imports: [ErpGrid],
  template: '<erp-grid><span id="projected-grid">محتوى</span></erp-grid>',
})
class GridTestHost {}

describe('ErpGrid', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpGrid, GridTestHost]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpGrid).componentInstance).toBeTruthy();
  });

  it('exposes default host attributes', () => {
    const fixture = TestBed.createComponent(ErpGrid);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-columns')).toBe('1');
    expect(host.getAttribute('data-gap')).toBe('grid');
    expect(host.getAttribute('data-responsive')).toBe('auto');
  });

  it('updates every public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpGrid);
    fixture.componentRef.setInput('columns', 6);
    fixture.componentRef.setInput('gap', 'xxl');
    fixture.componentRef.setInput('responsive', 'fixed');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-columns')).toBe('6');
    expect(host.getAttribute('data-gap')).toBe('xxl');
    expect(host.getAttribute('data-responsive')).toBe('fixed');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(GridTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-grid')).toBeTruthy();
  });
});
