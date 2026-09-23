export type AnchoredOverlayLogicalPlacement = 'top' | 'bottom' | 'start' | 'end';
export type AnchoredOverlayPhysicalPlacement = 'top' | 'bottom' | 'left' | 'right';

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
  readonly applyGeometry: (result: AnchoredOverlayGeometryResult) => void;
}
