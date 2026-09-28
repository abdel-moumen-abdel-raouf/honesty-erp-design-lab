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
zoom | pop | flip-x | flip-y | bounce | swing | fade-up | fade-down |
fade-start | fade-end | zoom-up | zoom-down | back | light-speed | rotate |
roll`

`ErpOverlayAnimation` remains a compatibility alias to the shared catalog.
Overlay and Tooltip do not own divergent public catalogs or arbitrary CSS-class
motion APIs. Logical slide start/end reverse physically in RTL. Reduced motion
disables transforms and resolves with instant duration.

The later Product Owner-authorized motion program replaces Wave A's
hand-authored effect mechanics with the central Animate.css adapter while
retaining Honesty ERP system names. Modal/Drawer duration is 360ms/260ms and
Tooltip duration is 320ms/220ms. Modal defaults remain `fade-scale`; logical
drawers use their logical slide; bottom drawers use `slide-up` entry and
`slide-down` exit. Tooltip defaults were later superseded by the Product Owner first page-by-page
review: Tooltip now defaults to `slide-up` entry and visually `slide-up` exit,
with `slide-up` exit mapped to `slideOutUp`. Both lifecycles wait for adapter
completion.

User-facing blocking surfaces also use the later mandatory shared Overlay
Header/Body/Footer frame. This inserted program remains correction-only and
does not authorize Wave B.

## Review evidence

- The Lab toolbar exposes Arabic Light/Dark and full-page screenshot actions.
- The direct Overlay showcase identifies full-application modal/drawer and
  backdrop review above the toolbar.
- The direct Inputs showcase identifies full FieldFrame surface interaction.
- The Tooltip showcase exposes one compact Arabic-first enter/exit selector
  backed by the shared Foundation motion preset catalog, with plain and rich evidence.

## Wave boundary

Wave A technical checkpoints are regression guards only. They do not establish
visual approval, freeze any family, close Basic Controls, or authorize Wave B.

## Post-Wave-A current authority

Wave A is a completed historical correction program. It is not the current execution-state document.

The subsequent Product Owner theme-authority checkpoint 06ab7d326b6f2b6c5d6d863e2acefcc994b04b53 and first page-by-page correction checkpoint b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9 are recorded in POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md.

That document governs current Product Owner decisions, deferred scope, and the next authorized action. No Wave B is authorized by this synchronization.
