import {TestBed} from '@angular/core/testing';
import {
  ErpReviewShowcaseFloatingPreview,
  resolveReviewFloatingPosition,
} from './showcase-floating-preview';

describe('ErpReviewShowcaseFloatingPreview', () => {
  it('keeps both inline boundaries inside the canvas in LTR', () => {
    expect(resolveReviewFloatingPosition(390, 300, 96, 56, 0, 0, 'ltr')).toEqual({
      x: 0,
      y: 0,
    });
    expect(resolveReviewFloatingPosition(390, 300, 96, 56, 100, 100, 'ltr')).toEqual({
      x: 294,
      y: 244,
    });
  });

  it('mirrors inline boundaries in RTL without changing block placement', () => {
    expect(resolveReviewFloatingPosition(390, 300, 96, 56, 0, 0, 'rtl')).toEqual({
      x: 294,
      y: 0,
    });
    expect(resolveReviewFloatingPosition(390, 300, 96, 56, 100, 100, 'rtl')).toEqual({
      x: 0,
      y: 244,
    });
  });

  it('clamps out-of-range editor values to the physical canvas', () => {
    expect(resolveReviewFloatingPosition(320, 240, 400, 300, -50, 150, 'ltr')).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('resolves the projected positioner as a real element at runtime', async () => {
    await TestBed.configureTestingModule({
      imports: [ErpReviewShowcaseFloatingPreview],
    }).compileComponents();
    const fixture = TestBed.createComponent(ErpReviewShowcaseFloatingPreview);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const positioner = host.querySelector<HTMLElement>('[data-showcase-floating-positioner]');
    expect(positioner).not.toBeNull();
    expect(positioner?.style.transform).toContain('translate3d');
    expect(host.dataset['resolvedDirection']).toMatch(/^(ltr|rtl)$/);
  });
});
