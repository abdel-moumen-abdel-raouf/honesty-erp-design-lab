import {TestBed} from '@angular/core/testing';
import {ErpSkeletonShowcase} from './skeleton-showcase';

describe('ErpSkeletonShowcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ErpSkeletonShowcase]}).compileComponents();
  });

  it('renders one meaningful target with three default loading lines', () => {
    const fixture = TestBed.createComponent(ErpSkeletonShowcase);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const target = root.querySelector('erp-skeleton[data-showcase-target]') as HTMLElement;

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelectorAll('.skeleton__shape')).toHaveLength(3);
    expect(target.getAttribute('role')).toBe('status');
    expect(target.getAttribute('aria-label')).toBe('جارٍ تحميل المحتوى');
  });

  it('applies all variants, sizes, line counts, and motion state to the same target', () => {
    const fixture = TestBed.createComponent(ErpSkeletonShowcase);
    fixture.detectChanges();
    const target = fixture.nativeElement.querySelector('erp-skeleton[data-showcase-target]') as HTMLElement;
    const variant = fixture.componentInstance.controls.find((control) => control.name === 'variant')!;
    const size = fixture.componentInstance.controls.find((control) => control.name === 'size')!;
    const lines = fixture.componentInstance.controls.find((control) => control.name === 'lines')!;
    const animated = fixture.componentInstance.controls.find((control) => control.name === 'animated')!;

    expect(variant.options).toEqual(['line', 'block', 'circle']);
    expect(size.options).toEqual(['sm', 'md', 'lg']);
    fixture.componentInstance.applyControl({control: variant, value: 'circle'});
    fixture.componentInstance.applyControl({control: size, value: 'lg'});
    fixture.componentInstance.applyControl({control: lines, value: 2});
    fixture.componentInstance.applyControl({control: animated, value: false});
    fixture.detectChanges();

    expect(target.getAttribute('data-skeleton-variant')).toBe('circle');
    expect(target.getAttribute('data-skeleton-size')).toBe('lg');
    expect(target.getAttribute('data-skeleton-animated')).toBe('false');
    expect(target.querySelectorAll('.skeleton__shape')).toHaveLength(2);
  });
});
