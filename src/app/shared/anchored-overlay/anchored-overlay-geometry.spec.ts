import {calculateAnchoredOverlayGeometry} from './anchored-overlay-geometry';
import {AnchoredOverlayGeometryInput} from './anchored-overlay-contracts';

describe('calculateAnchoredOverlayGeometry', () => {
  const base: AnchoredOverlayGeometryInput = {
    anchor: {left: 100, top: 100, right: 140, bottom: 140, width: 40, height: 40},
    surfaceWidth: 80,
    surfaceHeight: 40,
    viewport: {left: 0, top: 0, right: 400, bottom: 300, width: 400, height: 300},
    preferredPlacement: 'top',
    direction: 'ltr',
    anchorGap: 4,
    viewportInset: 8,
    showArrow: true,
    arrowWidth: 16,
    arrowHeight: 8,
    arrowSafeInset: 8,
  };

  it('honors the preferred placement when it fully fits', () => {
    expect(calculateAnchoredOverlayGeometry(base)).toEqual({
      x: 80, y: 48, placement: 'top', arrowCrossAxisCenter: 40,
    });
  });

  it('resolves logical start and end in LTR and RTL', () => {
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start'}).placement).toBe('left');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end'}).placement).toBe('right');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start', direction: 'rtl'}).placement).toBe('right');
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end', direction: 'rtl'}).placement).toBe('left');
  });

  it('uses the opposite placement only when the preferred placement cannot fit', () => {
    const result = calculateAnchoredOverlayGeometry({...base, anchor: {...base.anchor, top: 10, bottom: 50}});
    expect(result.placement).toBe('bottom');
  });

  it('uses a perpendicular placement when preferred and opposite cannot fit', () => {
    const result = calculateAnchoredOverlayGeometry({...base, surfaceHeight: 180});
    expect(result.placement).toBe('right');
  });

  it('orders perpendicular candidates by available room', () => {
    const result = calculateAnchoredOverlayGeometry({
      ...base,
      surfaceHeight: 180,
      anchor: {left: 300, top: 100, right: 340, bottom: 140, width: 40, height: 40},
    });
    expect(result.placement).toBe('left');
  });

  it('chooses the roomiest deterministic candidate and clamps when none fully fits', () => {
    const result = calculateAnchoredOverlayGeometry({...base, surfaceWidth: 500, surfaceHeight: 500});
    expect(result.placement).toBe('right');
    expect(result.x).toBe(8);
    expect(result.y).toBe(8);
  });

  it('calculates an explicit bottom candidate', () => {
    expect(calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'bottom'})).toEqual({
      x: 80, y: 152, placement: 'bottom', arrowCrossAxisCenter: 40,
    });
  });

  it('clamps the surface and arrow to viewport and safe inset', () => {
    const result = calculateAnchoredOverlayGeometry({...base, anchor: {left: 0, top: 100, right: 10, bottom: 140, width: 10, height: 40}});
    expect(result.x).toBe(8);
    expect(result.arrowCrossAxisCenter).toBe(16);
  });

  it('removes arrow depth from the main-axis gap when hidden', () => {
    expect(calculateAnchoredOverlayGeometry({...base, showArrow: false}).y).toBe(56);
  });

  it('tracks vertical trigger center and safe-clamps side arrows', () => {
    const left = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'start'});
    const right = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end'});
    expect(left.arrowCrossAxisCenter).toBe(20);
    expect(right.arrowCrossAxisCenter).toBe(20);
    const edge = calculateAnchoredOverlayGeometry({...base, preferredPlacement: 'end', anchor: {left: 100, top: 0, right: 140, bottom: 10, width: 40, height: 10}});
    expect(edge.arrowCrossAxisCenter).toBe(16);
  });
  it('centers a side arrow when the cross-axis cannot afford the full safe inset', () => {
    const result = calculateAnchoredOverlayGeometry({
      ...base,
      preferredPlacement: 'start',
      surfaceHeight: 24,
    });
    expect(result.placement).toBe('left');
    expect(result.arrowCrossAxisCenter).toBe(12);
  });

  it('centers a top arrow when the cross-axis cannot afford the full safe inset', () => {
    const result = calculateAnchoredOverlayGeometry({
      ...base,
      surfaceWidth: 24,
    });
    expect(result.placement).toBe('top');
    expect(result.arrowCrossAxisCenter).toBe(12);
  });

  it('aligns a bottom surface to logical end in LTR and RTL', () => {
    const ltr = calculateAnchoredOverlayGeometry({
      ...base,
      preferredPlacement: 'bottom',
      crossAxisAlignment: 'end',
    });
    const rtl = calculateAnchoredOverlayGeometry({
      ...base,
      preferredPlacement: 'bottom',
      direction: 'rtl',
      crossAxisAlignment: 'end',
    });

    expect(ltr.x).toBe(60);
    expect(rtl.x).toBe(100);
    expect(ltr.y).toBe(152);
    expect(rtl.y).toBe(152);
  });

  it('viewport-clamps a logical-end aligned surface', () => {
    const result = calculateAnchoredOverlayGeometry({
      ...base,
      preferredPlacement: 'bottom',
      crossAxisAlignment: 'end',
      surfaceWidth: 360,
      anchor: {left: 4, top: 100, right: 44, bottom: 140, width: 40, height: 40},
    });

    expect(result.x).toBe(8);
    expect(result.x + 360).toBeLessThanOrEqual(392);
  });

  it.each([
    {
      name: 'LTR left edge below',
      direction: 'ltr' as const,
      anchor: {left: 4, top: 40, right: 44, bottom: 80, width: 40, height: 40},
      expectedPlacement: 'bottom',
    },
    {
      name: 'RTL left edge above',
      direction: 'rtl' as const,
      anchor: {left: 4, top: 240, right: 44, bottom: 280, width: 40, height: 40},
      expectedPlacement: 'top',
    },
    {
      name: 'LTR right edge above',
      direction: 'ltr' as const,
      anchor: {left: 356, top: 240, right: 396, bottom: 280, width: 40, height: 40},
      expectedPlacement: 'top',
    },
    {
      name: 'RTL right edge below',
      direction: 'rtl' as const,
      anchor: {left: 356, top: 40, right: 396, bottom: 80, width: 40, height: 40},
      expectedPlacement: 'bottom',
    },
  ])('tracks the trigger at both viewport edges: $name', ({
    direction,
    anchor,
    expectedPlacement,
  }) => {
    const result = calculateAnchoredOverlayGeometry({
      ...base,
      preferredPlacement: 'bottom',
      crossAxisAlignment: 'end',
      direction,
      anchor,
      surfaceWidth: 360,
      surfaceHeight: 180,
      arrowWidth: 13,
      arrowHeight: 0,
      arrowSafeInset: 16,
    });
    const triggerCenter = anchor.left + anchor.width / 2;
    const arrowCenter = result.x + result.arrowCrossAxisCenter;

    expect(result.placement).toBe(expectedPlacement);
    expect(result.x).toBeGreaterThanOrEqual(8);
    expect(result.x + 360).toBeLessThanOrEqual(392);
    expect(Math.abs(arrowCenter - triggerCenter)).toBeLessThanOrEqual(6.5);
  });

});
