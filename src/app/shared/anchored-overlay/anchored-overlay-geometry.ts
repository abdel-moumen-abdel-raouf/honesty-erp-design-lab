import {
  AnchoredOverlayGeometryInput,
  AnchoredOverlayGeometryResult,
  AnchoredOverlayPhysicalPlacement,
} from './anchored-overlay-contracts';

const ALL_PHYSICAL_PLACEMENTS: readonly AnchoredOverlayPhysicalPlacement[] = [
  'top',
  'bottom',
  'left',
  'right',
];

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

function physicalPlacement(
  preferred: AnchoredOverlayGeometryInput['preferredPlacement'],
  direction: 'ltr' | 'rtl',
): AnchoredOverlayPhysicalPlacement {
  if (preferred === 'start') return direction === 'rtl' ? 'right' : 'left';
  if (preferred === 'end') return direction === 'rtl' ? 'left' : 'right';
  return preferred;
}

function opposite(
  value: AnchoredOverlayPhysicalPlacement,
): AnchoredOverlayPhysicalPlacement {
  return {top: 'bottom', bottom: 'top', left: 'right', right: 'left'}[
    value
  ] as AnchoredOverlayPhysicalPlacement;
}

function perpendicular(
  value: AnchoredOverlayPhysicalPlacement,
): readonly AnchoredOverlayPhysicalPlacement[] {
  return value === 'top' || value === 'bottom'
    ? ['left', 'right']
    : ['top', 'bottom'];
}

export function calculateAnchoredOverlayGeometry(
  input: AnchoredOverlayGeometryInput,
): AnchoredOverlayGeometryResult {
  const preferred = physicalPlacement(input.preferredPlacement, input.direction);
  const gap = input.anchorGap + (input.showArrow ? input.arrowHeight : 0);
  const space: Readonly<Record<AnchoredOverlayPhysicalPlacement, number>> = {
    top: input.anchor.top - input.viewport.top - input.viewportInset,
    bottom: input.viewport.bottom - input.anchor.bottom - input.viewportInset,
    left: input.anchor.left - input.viewport.left - input.viewportInset,
    right: input.viewport.right - input.anchor.right - input.viewportInset,
  };

  const requiredMainAxis = (
    placement: AnchoredOverlayPhysicalPlacement,
  ): number =>
    (placement === 'top' || placement === 'bottom'
      ? input.surfaceHeight
      : input.surfaceWidth) + gap;

  const availableCrossAxis = (
    placement: AnchoredOverlayPhysicalPlacement,
  ): number =>
    (placement === 'top' || placement === 'bottom'
      ? input.viewport.width
      : input.viewport.height) -
    input.viewportInset * 2;

  const requiredCrossAxis = (
    placement: AnchoredOverlayPhysicalPlacement,
  ): number =>
    placement === 'top' || placement === 'bottom'
      ? input.surfaceWidth
      : input.surfaceHeight;

  const fits = (placement: AnchoredOverlayPhysicalPlacement): boolean =>
    space[placement] >= requiredMainAxis(placement) &&
    requiredCrossAxis(placement) <= availableCrossAxis(placement);

  const perpendicularByRoom = [...perpendicular(preferred)].sort(
    (a, b) =>
      space[b] - space[a] ||
      ALL_PHYSICAL_PLACEMENTS.indexOf(a) -
        ALL_PHYSICAL_PLACEMENTS.indexOf(b),
  );
  const candidates: readonly AnchoredOverlayPhysicalPlacement[] = [
    preferred,
    opposite(preferred),
    ...perpendicularByRoom,
  ];

  const fittingPlacement = candidates.find(fits);
  const placement =
    fittingPlacement ??
    candidates.reduce((best, candidate) =>
      space[candidate] > space[best] ? candidate : best,
    );

  const anchorCenterX = input.anchor.left + input.anchor.width / 2;
  const anchorCenterY = input.anchor.top + input.anchor.height / 2;
  const crossAxisAlignment = input.crossAxisAlignment ?? 'center';
  const logicalStartX = input.direction === 'rtl'
    ? input.anchor.right - input.surfaceWidth
    : input.anchor.left;
  const logicalEndX = input.direction === 'rtl'
    ? input.anchor.left
    : input.anchor.right - input.surfaceWidth;
  let left = crossAxisAlignment === 'start'
    ? logicalStartX
    : crossAxisAlignment === 'end'
      ? logicalEndX
      : anchorCenterX - input.surfaceWidth / 2;
  let top = crossAxisAlignment === 'start'
    ? input.anchor.top
    : crossAxisAlignment === 'end'
      ? input.anchor.bottom - input.surfaceHeight
      : anchorCenterY - input.surfaceHeight / 2;

  if (placement === 'top') {
    top = input.anchor.top - gap - input.surfaceHeight;
  } else if (placement === 'bottom') {
    top = input.anchor.bottom + gap;
  } else if (placement === 'left') {
    left = input.anchor.left - gap - input.surfaceWidth;
  } else {
    left = input.anchor.right + gap;
  }

  left = clamp(
    left,
    input.viewport.left + input.viewportInset,
    input.viewport.right - input.viewportInset - input.surfaceWidth,
  );
  top = clamp(
    top,
    input.viewport.top + input.viewportInset,
    input.viewport.bottom - input.viewportInset - input.surfaceHeight,
  );

  const horizontal = placement === 'top' || placement === 'bottom';
  const crossSize = horizontal ? input.surfaceWidth : input.surfaceHeight;
  const halfArrowBase = input.arrowWidth / 2;
  const rawCenter = horizontal
    ? anchorCenterX - left
    : anchorCenterY - top;
  const arrowCrossAxisCenter =
    crossSize <= input.arrowWidth
      ? crossSize / 2
      : (() => {
          const maximumSymmetricSafeInset =
            (crossSize - input.arrowWidth) / 2;
          const effectiveSafeInset = Math.min(
            input.arrowSafeInset,
            maximumSymmetricSafeInset,
          );
          return clamp(
            rawCenter,
            effectiveSafeInset + halfArrowBase,
            crossSize - effectiveSafeInset - halfArrowBase,
          );
        })();

  return {x: left, y: top, placement, arrowCrossAxisCenter};
}
