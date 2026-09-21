import {TestBed} from '@angular/core/testing';
import {ErpDivider} from './divider';

describe('ErpDivider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpDivider]}).compileComponents();
  });

  it('creates', () => {
    expect(TestBed.createComponent(ErpDivider).componentInstance).toBeTruthy();
  });

  it('exposes default host and separator attributes', () => {
    const fixture = TestBed.createComponent(ErpDivider);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('role')).toBe('separator');
    expect(host.getAttribute('data-orientation')).toBe('horizontal');
    expect(host.getAttribute('data-tone')).toBe('subtle');
    expect(host.getAttribute('data-stroke')).toBe('solid');
    expect(host.getAttribute('data-weight')).toBe('default');
    expect(host.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('updates every public input host attribute and aria-orientation', () => {
    const fixture = TestBed.createComponent(ErpDivider);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('tone', 'strong');
    fixture.componentRef.setInput('stroke', 'dashed');
    fixture.componentRef.setInput('weight', 'emphasis');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-orientation')).toBe('vertical');
    expect(host.getAttribute('data-tone')).toBe('strong');
    expect(host.getAttribute('data-stroke')).toBe('dashed');
    expect(host.getAttribute('data-weight')).toBe('emphasis');
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
  });
});
