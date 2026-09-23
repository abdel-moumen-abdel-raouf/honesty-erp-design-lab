import {calculateAnchoredOverlayGeometry} from './anchored-overlay-geometry';
import {AnchoredOverlayGeometryInput} from './anchored-overlay-contracts';

describe('calculateAnchoredOverlayGeometry', () => {
  const base: AnchoredOverlayGeometryInput = {
    anchor: {left: 100, top: 100, right: 140, bottom: 140, width: 40, height: 40},
    surfaceWidth: 80, surfaceHeight: 40,
    viewport: {left: 0, top: 0, right: 400, bottom: 300, width: 400, height: 300},
    preferredPlacement: 'top', direction: 'ltr', anchorGap: 4, viewportInset: 8,
    showArrow: true, arrowWidth: 16, arrowHeight: 8, arrowSafeInset: 8,
  };

  it('places on the preferred side with arrow gap and centered arrow', () => {
    expect(calculateAnchoredOverlayGeometry(base)).toEqual({x: 80, y: 48, placement: 'top', arrowCrossAxisCenter: 40});
  });

  it('resolves logical start and end in LTR and RTL', () => {
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start'}).placement).toBe('left');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end'}).placement).toBe('right');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start', direction: 'rtl'}).placement).toBe('right');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end', direction: 'rtl'}).placement).toBe('left');
  });

  it('flips when the preferred side does not fit', () => {
    const result = calculateAnchoredOverlayGeometry({...base, anchor: {...base.anchor, top: 10, bottom: 50}});
    expect(result.placement).toBe('bottom');
  });

  it('calculates an explicit bottom candidate', () => {
    const result = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'bottom'});
    expect(result).toEqual({x: 80, y: 152, placement: 'bottom', arrowCrossAxisCenter: 40});
  });

  it('uses the side with greater space when neither side fits', () => {
    const result = calculateAnchoredOverlayGeometry({...base, surfaceHeight: 250, anchor: {...base.anchor, top: 80, bottom: 120}});
    expect(result.placement).toBe('bottom');
  });

  it('clamps the surface and arrow to viewport and safe inset', () => {
    const result = calculateAnchoredOverlayGeometry({...base, anchor: {left: 0, top: 100, right: 10, bottom: 140, width: 10, height: 40}});
    expect(result.x).toBe(8);
    expect(result.arrowCrossAxisCenter).toBe(16);
  });

  it('removes arrow height from the main-axis gap when hidden', () => {
    expect(calculateAnchoredOverlayGeometry({...base, showArrow: false}).y).toBe(56);
  });

  it('clamps the main axis when neither side can contain the surface', () => {
    const result = calculateAnchoredOverlayGeometry({...base, surfaceHeight: 500});
    expect(result.y).toBe(8);
  });

  it('tracks vertical anchor center and safe-clamps arrows for left and right', () => {
    const left = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start'});
    const right = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end'});
    expect(left.arrowCrossAxisCenter).toBe(20);
    expect(right.arrowCrossAxisCenter).toBe(20);
    const edge = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end', anchor: {left: 100, top: 0, right: 140, bottom: 10, width: 40, height: 10}});
    expect(edge.arrowCrossAxisCenter).toBe(16);
  });
});
