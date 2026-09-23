import {AnchoredOverlayGeometryInput, AnchoredOverlayGeometryResult, AnchoredOverlayPhysicalPlacement} from './anchored-overlay-contracts';

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), Math.max(min, max));

function physicalPlacement(preferred: AnchoredOverlayGeometryInput['preferredPlacement'], direction: 'ltr' | 'rtl'): AnchoredOverlayPhysicalPlacement {
  if (preferred === 'start') return direction === 'rtl' ? 'right' : 'left';
  if (preferred === 'end') return direction === 'rtl' ? 'left' : 'right';
  return preferred;
}

function opposite(value: AnchoredOverlayPhysicalPlacement): AnchoredOverlayPhysicalPlacement {
  return {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}[value] as AnchoredOverlayPhysicalPlacement;
}

export function calculateAnchoredOverlayGeometry(input: AnchoredOverlayGeometryInput): AnchoredOverlayGeometryResult {
  const preferred = physicalPlacement(input.preferredPlacement, input.direction);
  const gap = input.anchorGap + (input.showArrow ? input.arrowHeight : 0);
  const space = {
    top: input.anchor.top - input.viewport.top - input.viewportInset,
    bottom: input.viewport.bottom - input.anchor.bottom - input.viewportInset,
    left: input.anchor.left - input.viewport.left - input.viewportInset,
    right: input.viewport.right - input.anchor.right - input.viewportInset,
  };
  const required = (placement: AnchoredOverlayPhysicalPlacement) =>
    (placement === 'top' || placement === 'bottom' ? input.surfaceHeight : input.surfaceWidth) + gap;
  const alternate = opposite(preferred);
  const placement = space[preferred] >= required(preferred)
    ? preferred
    : space[alternate] >= required(alternate)
      ? alternate
      : space[preferred] >= space[alternate] ? preferred : alternate;
  const anchorCenterX = input.anchor.left + input.anchor.width / 2;
  const anchorCenterY = input.anchor.top + input.anchor.height / 2;
  let left = anchorCenterX - input.surfaceWidth / 2;
  let top = anchorCenterY - input.surfaceHeight / 2;
  if (placement === 'top') top = input.anchor.top - gap - input.surfaceHeight;
  if (placement === 'bottom') top = input.anchor.bottom + gap;
  if (placement === 'left') left = input.anchor.left - gap - input.surfaceWidth;
  if (placement === 'right') left = input.anchor.right + gap;
  left = clamp(left, input.viewport.left + input.viewportInset, input.viewport.right - input.viewportInset - input.surfaceWidth);
  top = clamp(top, input.viewport.top + input.viewportInset, input.viewport.bottom - input.viewportInset - input.surfaceHeight);
  const horizontal = placement === 'top' || placement === 'bottom';
  const crossSize = horizontal ? input.surfaceWidth : input.surfaceHeight;
  const halfArrow = input.arrowWidth / 2;
  const rawCenter = horizontal ? anchorCenterX - left : anchorCenterY - top;
  const arrowCrossAxisCenter = clamp(rawCenter, input.arrowSafeInset + halfArrow, crossSize - input.arrowSafeInset - halfArrow);
  return {x: left, y: top, placement, arrowCrossAxisCenter};
}
