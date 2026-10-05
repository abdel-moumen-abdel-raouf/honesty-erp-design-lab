import {TestBed} from '@angular/core/testing';
import {ErpSkeleton} from './skeleton';

describe('ErpSkeleton', () => {
  function renderedLines(value: number): number {
    const fixture = TestBed.createComponent(ErpSkeleton);
    fixture.componentRef.setInput('lines', value);
    fixture.detectChanges();
    return fixture.nativeElement.querySelectorAll('.skeleton__shape').length;
  }

  it('exposes consumer-owned loading semantics and defaults', () => {
    const fixture = TestBed.createComponent(ErpSkeleton);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('جارٍ تحميل المحتوى');
    expect(fixture.nativeElement.getAttribute('data-skeleton-variant')).toBe('line');
    expect(fixture.nativeElement.getAttribute('data-skeleton-size')).toBe('md');
    expect(fixture.nativeElement.getAttribute('data-skeleton-animated')).toBe('true');
  });

  it('normalizes line counts to a positive integer', () => {
    expect(renderedLines(0)).toBe(1);
    expect(renderedLines(-4)).toBe(1);
    expect(renderedLines(3.8)).toBe(3);
    expect(renderedLines(4)).toBe(4);
  });

  it('applies block/circle shapes, controlled sizes, and disabled motion evidence', () => {
    const fixture = TestBed.createComponent(ErpSkeleton);
    fixture.componentRef.setInput('variant', 'circle');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-skeleton-variant')).toBe('circle');
    expect(fixture.nativeElement.getAttribute('data-skeleton-size')).toBe('lg');
    expect(fixture.nativeElement.getAttribute('data-skeleton-animated')).toBe('false');
  });
});
