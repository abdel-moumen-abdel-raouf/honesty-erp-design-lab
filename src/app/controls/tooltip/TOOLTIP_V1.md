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
and `disabled` are booleans; `open` is a two-way model. Defaults are plain,
top, auto, noninteractive, arrow shown, enabled, and closed.

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
direction. The preferred main axis is tried first, then its opposite, then the
side with more room; the surface and arrow are clamped to the visual viewport.
Positioning reacts to window/visual-viewport resize and scroll and anchor/surface
resize through one animation-frame-coalesced pipeline. The arrow is private,
optional, nonsemantic evidence and uses the Tooltip Component Token contract.
V1 caret geometry is orientation-specific while retaining the same canonical
arrow slots. Top and bottom use Reference spacing `space-16` as the caret base
and `space-8` as its depth. Logical start and end remap those same slots to
`space-8` as the caret base and `space-4` as its depth. These geometry values
are private implementation contracts and are not consumer styling API.

## Motion and ownership

Open measures hidden, positions, then becomes visible on the next animation
frame. Close publishes `open=false` immediately and hides/detaches after the
100ms exit. Reopening cancels that exit. Reduced motion removes scale and uses
the reduced-duration token. Tooltip implementation consumes only its own
Component Tokens. No CDK, third-party overlay, polling, or public timing,
geometry, color, radius, elevation, layer, motion, or arrow styling API exists.

## Design Lab evidence and status

The docs-only review route is `/controls/tooltips`. Tooltip visual approval
remains the Product Owner's responsibility; this document does not claim visual
approval. ErpIconButton and ErpFab Tooltip integration is explicitly deferred to
the next separate Button Family review/integration wave.
