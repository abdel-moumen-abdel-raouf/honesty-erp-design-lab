import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpSurface} from './surface';

@Component({
  imports: [ErpSurface],
  template: '<erp-surface><span id="projected-surface">محتوى</span></erp-surface>',
})
class SurfaceTestHost {}

describe('ErpSurface', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpSurface, SurfaceTestHost]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpSurface).componentInstance).toBeTruthy();
  });

  it('exposes default host attributes', () => {
    const fixture = TestBed.createComponent(ErpSurface);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-tone')).toBe('default');
    expect(host.getAttribute('data-border')).toBe('none');
    expect(host.getAttribute('data-elevation')).toBe('none');
    expect(host.getAttribute('data-radius')).toBe('surface');
    expect(host.getAttribute('data-padding')).toBe('default');
  });

  it('updates every public input host attribute', () => {
    const fixture = TestBed.createComponent(ErpSurface);
    fixture.componentRef.setInput('tone', 'inverse');
    fixture.componentRef.setInput('border', 'strong');
    fixture.componentRef.setInput('elevation', 'overlay');
    fixture.componentRef.setInput('radius', 'full');
    fixture.componentRef.setInput('padding', 'loose');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-tone')).toBe('inverse');
    expect(host.getAttribute('data-border')).toBe('strong');
    expect(host.getAttribute('data-elevation')).toBe('overlay');
    expect(host.getAttribute('data-radius')).toBe('full');
    expect(host.getAttribute('data-padding')).toBe('loose');
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#projected-surface')).toBeTruthy();
  });
});
