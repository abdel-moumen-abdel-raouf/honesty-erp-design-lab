export type AnchoredOverlayLogicalPlacement = 'top' | 'bottom' | 'start' | 'end';
export type AnchoredOverlayPhysicalPlacement = 'top' | 'bottom' | 'left' | 'right';
export type AnchoredOverlayCrossAxisAlignment = 'center' | 'start' | 'end';

export interface OverlayRect { readonly left: number; readonly top: number; readonly right: number; readonly bottom: number; readonly width: number; readonly height: number; }
export interface AnchoredOverlayGeometryInput {
  readonly anchor: OverlayRect;
  readonly surfaceWidth: number;
  readonly surfaceHeight: number;
  readonly viewport: OverlayRect;
  readonly preferredPlacement: AnchoredOverlayLogicalPlacement;
  readonly direction: 'ltr' | 'rtl';
  readonly anchorGap: number;
  readonly viewportInset: number;
  readonly showArrow: boolean;
  readonly arrowWidth: number;
  readonly arrowHeight: number;
  readonly arrowSafeInset: number;
  readonly crossAxisAlignment?: AnchoredOverlayCrossAxisAlignment;
  readonly allowedPlacements?: readonly AnchoredOverlayLogicalPlacement[];
}
export interface AnchoredOverlayGeometryResult {
  readonly x: number;
  readonly y: number;
  readonly placement: AnchoredOverlayPhysicalPlacement;
  readonly arrowCrossAxisCenter: number;
}
export interface AnchoredOverlayControllerOptions {
  readonly anchor: HTMLElement;
  readonly surface: HTMLElement;
  readonly readGeometryInput: () => Omit<AnchoredOverlayGeometryInput, 'anchor' | 'surfaceWidth' | 'surfaceHeight' | 'viewport'>;
  readonly prepareGeometry?: (context: {
    readonly anchor: OverlayRect;
    readonly viewport: OverlayRect;
  }) => void;
  readonly applyGeometry: (result: AnchoredOverlayGeometryResult) => void;
}
