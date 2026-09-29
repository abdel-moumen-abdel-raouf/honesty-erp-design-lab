# Honesty ERP — Tooltip V1

## Product Owner references and architectural position

The supplied references are the Material 3 Tooltip Guidelines
(`https://m3.material.io/components/tooltips/guidelines`) and Mobbin Tooltip
(`https://mobbin.com/glossary/tooltip`). The explicit V1 contract remains
authoritative. This control occupies the Basic Controls layer after Component
Tokens and production primitives.

Foundation V1, the Component Token Framework, Structural Primitives, Typography
Primitives, and Icon Primitive are frozen dependencies of this control. Button
Family implementation exists, but its final freeze remains deferred until the
separate post-Tooltip integration wave.

## Public components

- `ErpTooltip` (`erp-tooltip`) owns anchoring, validation, activation,
  positioning, dismissal, semantics, arrow, and controlled open state.
- `ErpTooltipContent` (`erp-tooltip-content`) is the rich-content grammar child.
  It is not standalone content and owns no Component Tokens.

## Public API

`variant`: `plain | rich`; `placement`: `top | bottom | start | end`;
`activation`: `auto | press`; `text: string | null`; `interactive`, `showArrow`,
and `disabled` are booleans; `enterAnimation` and `exitAnimation` use the shared
`ErpMotionPreset` catalog; `open` is a two-way model. Defaults are plain, top,
auto, noninteractive, arrow shown, enabled, closed, `zoom` enter, and `zoom`
exit. Zoom uses the shared system `zoomIn` / `zoomOut` mapping. A developer may
override enter and exit presets on an individual Tooltip without changing the
system default.

The shared motion values are exactly `fade`, `scale`, `fade-scale`, `slide-up`,
`slide-down`, `slide-start`, `slide-end`, `zoom`, `pop`, `flip-x`, `flip-y`,
`bounce`, `swing`, `fade-up`, `fade-down`, `fade-start`, `fade-end`,
`zoom-up`, `zoom-down`, `back`, `light-speed`, `rotate`, and `roll`.
Tooltip does not define a second catalog.

Plain mode requires trimmed nonempty `text`, is noninteractive, and accepts no
`ErpTooltipContent`. Rich mode requires exactly one content child. A
noninteractive rich tooltip contains no focusable content. An interactive rich
tooltip requires nonblank `text` as its accessible dialog name.

Exactly one primary native focusable descendant is projected as the trigger.
The wrapper does not synthesize focusability or roles. Invalid configuration
does not open. State precedence is invalid, disabled, ready.

## Semantics and focus

Noninteractive surfaces use `role="tooltip"` and append their ID to the actual
trigger's `aria-describedby` token list. Interactive rich surfaces use
`role="dialog"`, the trimmed text as `aria-label`, and maintain
`aria-haspopup`, `aria-controls`, and `aria-expanded` on the actual trigger.
Noninteractive relationship attributes are restored exactly on close.
Interactive rich triggers retain their dialog relationship while valid and
toggle `aria-expanded`; pre-existing relationship attributes are restored when
those interactive semantics are removed. Focus is not trapped.
Escape from an interactive surface returns focus to the trigger; other close
paths do not move focus.

## Activation and timing

Auto mouse/pen hover opens after 500ms. Plain leave closes after 100ms; the
interactive trigger/surface bridge closes after 200ms. Focus opens immediately.
Press activation consumes the trigger action and toggles immediately.

Auto touch uses a 700ms long press, cancelled by early release, pointer cancel,
scroll, or movement over 8 CSS pixels. A successful long press suppresses the
associated click once. Noninteractive touch evidence remains for 1500ms after
release; interactive evidence uses normal dismissal.

Outside press and Escape close. Programmatic `open` uses the same validation,
popover, positioning, and close pipeline without moving focus. Disabled or
invalid state forces `open` false.

## Positioning and arrow

The internal shared anchored-overlay controller uses the native manual Popover
API. Unsupported browsers refuse the open request. Logical start/end resolve by
direction. Placement is deterministic: preferred first, opposite second, then
the two perpendicular physical placements ordered by available room. The first
candidate that fully fits is used. Only when no candidate fully fits may the
controller choose the roomiest candidate and clamp it to the visual viewport.
Positioning reacts to window/visual-viewport resize and scroll and anchor/surface
resize through one animation-frame-coalesced pipeline.

The arrow is private, optional, nonsemantic evidence and uses one canonical
geometry in every direction: Reference `space-16` is the base and `space-8` is
the depth. Side placements rotate that same geometry; they do not shrink it.
The arrow is recomputed from the resolved physical placement and the trigger
center after every reposition/flip. These geometry values are private
implementation contracts and are not consumer styling API.

## Motion and ownership

Open measures hidden, positions, then runs the selected enter animation on the
next animation frame. The fixed outer surface remains untransformed and owns anchored measurement,
fixed placement, collision geometry, and layer. The inner visual/motion assembly
contains both Tooltip body and arrow, so the configured animation moves them as
one unit. Animate.css classes run only on that inner assembly so visual
transforms cannot corrupt `getBoundingClientRect()` positioning. Close
publishes `open=false` immediately and remains mounted until the selected exit
animation completes. Reopening cancels that exit. The Foundation motion adapter is the sole owner of Animate.css class
mapping, duration, cancellation, cleanup, and deterministic reduced-motion
completion. Tooltip supplies the canonical system preset and its fixed
320ms/220ms component durations; vendor names never cross its API or showcase.
Tooltip stays on the nonblocking AnchoredOverlayController architecture and
consumes only its own Component Tokens. No CDK, blocking OverlayManager,
polling, arbitrary CSS-class motion API, or public timing, geometry, color,
radius, elevation, layer, or arrow styling API exists.

## Design Lab evidence and status

The docs-only review route is `/controls/tooltips`. Tooltip visual approval
remains the Product Owner's responsibility; this document does not claim visual
approval. Button Family integration now composes plain ErpTooltip externally
around icon-only ErpIconButton and ErpFab usage. ErpTooltip itself remains
unchanged, and Button controls create no hidden automatic Tooltips internally.
Final Button Family visual and freeze review remains separate.
