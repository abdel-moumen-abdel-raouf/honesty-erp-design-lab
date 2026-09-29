# Honesty ERP — Tooltip Positioning Policy V1

## Authority

This file records the Product Owner Tooltip positioning law. Production code,
tests, and the ErpTooltip governance gate must remain consistent with it.

## Invariants

1. The actual focusable trigger that opened the Tooltip is the anchor.
2. The authored placement is preferred and is never changed while it fully fits.
3. Candidate order is preferred, physical opposite, then the two perpendicular
   physical placements ordered by available main-axis room.
4. The first candidate that fully fits wins.
5. If no candidate fully fits, choose the candidate with the greatest usable
   main-axis room with deterministic tie breaking, then clamp inside the visual
   viewport inset.
6. Window scroll/resize, visualViewport scroll/resize, anchor resize, and surface
   resize all request one animation-frame-coalesced reposition.
7. The fixed geometry surface is never animation-transformed.
8. Tooltip body and arrow live in one visual/motion assembly and enter/exit together.
9. Arrow orientation comes from the resolved physical placement.
10. Arrow cross-axis position targets the trigger center and is safe-clamped.
11. Arrow geometry is canonical in every direction: Reference `space-16` base
    and `space-8` depth. Side placements rotate it; they never shrink it.
12. Tooltip stacking consumes `--honesty-tooltip-layer`, resolving to the
    approved semantic overlay layer.
13. System Tooltip motion defaults are `zoom` enter and `zoom` exit. Individual
    Tooltip instances may explicitly override either preset.

## Acceptance

Deterministic coverage is required for preferred placement, opposite fallback,
perpendicular fallback, all-sides failure/clamp, LTR/RTL logical placement,
scroll/resize reposition, trigger/arrow alignment, resolved-placement arrow
orientation, canonical arrow size, body+arrow motion ownership, semantic layer
usage, and preservation of plain/rich/interactive semantics.
