# Honesty ERP — Post-CR12 Review Wave A V1

## Authority and status

Wave A is a correction-only root-infrastructure program after CR12. It adds no
public component family and does not declare visual approval, family freeze, or
closure of the Basic Controls layer.

The required execution order is WA00 through WA05. Wave A stops after WA05 for
Product Owner visual and runtime review. SearchBox mode changes, Glass removal,
Solid/Ghost redesign, Number/Money/DateRange changes, CheckBox/RadioBox redesign,
FabMenu/SplitButton work, and Phase 10/11 review are outside this wave.

## Review issues owned by Wave A

1. Shared FieldFrame control-surface hit-area and focus delegation.
2. Full-application Overlay host bounds above the Lab toolbar and routed content.
3. Theme-sensitive blocking backdrop composition.
4. Blocking Overlay Escape and backdrop dismissal defaults.
5. Complete Design Lab page screenshot capture for direct and iframe routes.
6. One persisted global Light/Dark Design Lab theme.
7. One shared Foundation-owned motion preset catalog.
8. Blocking Overlay motion tuning and expanded presets.
9. Tooltip-selectable enter and exit motion using the shared catalog.
10. Wave-A-only governance, tests, documentation, and review evidence.

## Blocking Overlay correction

- `dismissOnBackdrop` defaults to `false`.
- `dismissOnEscape` defaults to `false`.
- Developers may opt into either behavior independently.
- Only the top Overlay responds.
- Default blur is `low`; public blur values remain `low | medium | high`.
- Backdrops combine a theme-sensitive semantic scrim and blur.
- The full Overlay layer covers the complete application viewport, including
  the Lab toolbar and navigation.
- `/controls/inputs` and `/controls/overlays` are direct top-level review routes.

Backdrop review reference, not downloaded or redistributed:

`https://forum.blocsapp.com/uploads/db8018/original/2X/0/0dd8e4a63b4ae9723834d4d93bcb4325b9ec6a14.jpeg`

## Global Lab theme and screenshot semantics

- The Lab toolbar owns one `light | dark` switch beside the full-page screenshot
  action.
- Default theme is `light` and persistence uses
  `localStorage['honesty-lab-theme']` when storage is available.
- The complete Lab review root receives `data-theme`.
- Same-origin preview iframe routes receive the same active theme.
- A full-page screenshot includes the toolbar, complete routed content, and any
  currently open Overlay.
- Iframe review screenshots compose the outer Lab chrome with the full embedded
  review document rather than capturing only the visible iframe viewport.

## Field hit-area invariant

FieldFrame owns one internal control-surface delegation path keyed by
`controlId`. A non-action click anywhere in `.field-frame__control` focuses an
editable native input/textarea or focuses and activates an owned FieldTrigger
button. Explicit actions and nested interactive elements remain isolated, and
effective-disabled controls do nothing. Helper placement, tone, and status do
not change this behavior.

## Shared motion catalog

The Foundation-owned preset catalog is exactly:

`fade | scale | fade-scale | slide-up | slide-down | slide-start | slide-end |
zoom | pop | flip-x | flip-y | bounce | swing`

`ErpOverlayAnimation` remains a compatibility alias to the shared catalog.
Overlay and Tooltip do not own divergent public catalogs or arbitrary CSS-class
motion APIs. Logical slide start/end reverse physically in RTL. Reduced motion
disables transforms and resolves with instant duration.

Exact motion tuning is authoritative from the Wave A execution request:

- fade: enter 220ms, exit 160ms;
- scale: enter 220ms, exit 160ms, start scale 0.92;
- fade-scale: enter 240ms, exit 180ms, opacity 0, start scale 0.90;
- slide presets: enter 220ms, exit 180ms, distance 1.5rem;
- zoom: enter 260ms, exit 180ms, opacity 0, start scale 0.82;
- pop: enter 280ms, exit 180ms, `0.90 -> 1.03 -> 1.00`;
- flip-x/y: enter 300ms, exit 220ms, perspective 48rem, start angle -12deg;
- bounce: enter 360ms, exit 200ms, `1rem -> -0.25rem -> 0`;
- swing: enter 320ms, exit 200ms, top-center origin and `-3deg -> 1deg -> 0`.

Modal defaults remain `fade-scale`; logical drawers use their logical slide;
bottom drawers use `slide-up` entry and `slide-down` exit. Tooltip defaults are
`fade-scale` entry and `fade` exit, and Tooltip removal waits for configured
exit completion.

## Wave boundary

Wave A technical checkpoints are regression guards only. They do not establish
visual approval, freeze any family, close Basic Controls, or authorize Wave B.

