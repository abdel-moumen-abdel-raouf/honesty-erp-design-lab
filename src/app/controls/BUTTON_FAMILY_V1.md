# Honesty ERP — Button Family V1

## Status and References

Foundation V1, Component Token Framework V1, Structural Primitives V1,
Typography Primitives V1, and ErpIcon V1 are frozen.

The Product Owner supplied the Skodash button reference, NexLink
ripple/button reference, Material 3 FAB reference, Material 3 Extended FAB
reference, and Material 3 FAB Menu reference for the future Composite phase.

Button Family V1 defines exactly four public Basic Controls: `ErpButton`,
`ErpIconButton`, `ErpFab`, and `ErpExtendedFab`.

All four controls expose `cursor: pointer | default`, default `pointer`, and
`rippleSpeed: fast | normal | slow`, default `slow`. The Product
Owner-approved final Ripple timing contract is:

- `fast = 750ms`;
- `normal = 1100ms`;
- `slow = 1800ms`.

Configured cursor behavior applies only while ready; loading, disabled, and
invalid controls always use the default cursor.

## ErpButton

Selector: `erp-button`.

- required `label: string`;
- `variant: solid | outline | subtle | ghost | text`, default `solid`;
- `tone: primary | secondary | accent | success | warning | danger | info | neutral`, default `primary`;
- `size: sm | md | lg`, default `md`;
- `shape: default | rounded | pill`, default `default`;
- `borderStyle: solid | dashed`, default `solid`;
- `icon: ErpIconName | null`, default `null`;
- `iconPosition: start | end`, default `start`;
- `type: button | submit | reset`, default `button`;
- `name`, `value`, and `form` are nullable strings, default `null`;
- `disabled`, `loading`, and `fullWidth` are boolean inputs, default `false`;
- `loadingLabel: string | null`, default `null`;
- `pressed` emits `void` only while ready.

When loading, a non-empty trimmed `loadingLabel` replaces the visible label.
Otherwise the trimmed `label` remains visible. An empty loading label does not
invalidate an otherwise valid button.

The solid warning tone uses the shared primary-action foreground to maintain a
white foreground. Ghost and text variants keep a transparent background.

## ErpIconButton

Selector: `erp-icon-button`.

- required `icon: ErpIconName` and `label: string`;
- `variant: solid | outline | subtle | ghost`, default `ghost`;
- the shared eight-tone contract, default `neutral`;
- `size: sm | md | lg`, default `md`;
- `shape: default | rounded | pill`, default `rounded`;
- `borderStyle: solid | dashed`, default `solid`;
- `type: button | submit | reset`, default `button`;
- `name`, `value`, and `form` are nullable strings, default `null`;
- `disabled` and `loading` default `false`;
- `pressed` emits `void` only while ready.

The valid trimmed label is the native button accessible name. It is not
rendered as visible text.

## ErpFab

Selector: `erp-fab`.

- required `icon: ErpIconName` and `label: string`;
- `size: sm | md | lg`, default `md`;
- `tone: primary | secondary | accent | surface`, default `primary`;
- `disabled` and `loading` default `false`;
- `pressed` emits `void` only while ready.

FAB dimensions are:

- `sm`: 2.5rem / 40px, 1.25rem icon, 0.75rem radius;
- `md`: 3.5rem / 56px, 1.5rem icon, 1rem radius;
- `lg`: 6rem / 96px, 2rem icon, 1.75rem radius.

ErpFab is not self-positioning. Placement belongs to its parent layout or
composite.

Creation-action FAB evidence uses the plain semantic `plus` icon rather than the
circled `add` glyph because the FAB container already provides the surrounding
shape.

## ErpExtendedFab

Selector: `erp-extended-fab`.

- required `label: string`;
- `icon: ErpIconName | null`, default `null`;
- `size: md | lg | xl`, default `md`;
- `tone: primary | secondary | accent | surface`, default `primary`;
- `disabled` and `loading` default `false`;
- `pressed` emits `void` only while ready.

Extended FAB size contracts are:

- `md`: 3.5rem / 56px height, 1rem radius and padding, 0.5rem gap,
  1.5rem icon, 1rem label;
- `lg`: 5rem / 80px height, 1.25rem radius, 1.625rem padding, 1rem gap,
  1.75rem icon, 1.25rem label;
- `xl`: 6rem / 96px height, 1.75rem radius and padding, 1.25rem gap,
  2rem icon, 1.5rem label.

The label weight is 500. ErpExtendedFab is not self-positioning.

## Tooltip Integration

ErpIconButton and ErpFab are icon-only controls. They remain internally
Tooltip-agnostic. Production Feature/Page use composes each control as the
trigger of a plain ErpTooltip. Tooltip text uses the same semantic user-facing
label as the control's accessible `label`, while the Button control continues
to own the native `aria-label`.

ErpButton and ErpExtendedFab already expose visible text and have no mandatory
default Tooltip wrapper. Button Family controls create no hidden or internal
automatic Tooltip. Tooltip orchestration remains explicit, avoiding
double/nested automatic Tooltips. This is the final Button Family integration
candidate pending visual and freeze review.

## State and Native Ownership

State precedence for all four controls is `invalid`, `loading`, `disabled`,
then `ready`. A blank trimmed required label is invalid. Invalid, loading, and
disabled states disable the internally owned native button. Only ready controls
emit `pressed`.

Disabled and invalid controls use the disabled opacity. Loading controls remain
at normal opacity while remaining functionally disabled and exposing their
spinner state.

Every control internally owns exactly one native `button`. ErpButton and
ErpIconButton forward `type`, `name`, `value`, and `form`. FAB native button
types are always `button`. Feature and Page templates do not author the native
button directly.

Visible labels are owned by ErpText. Icons are owned by ErpIcon and use logical
start/end placement. No Button Family control imports NgIcons or vendor glyphs.

## Loading and Ripple

Loading uses an internal CSS spinner and `aria-busy` where the control has a
visible label. IconButton and FAB retain their valid accessible label while
loading.

All four controls share one press-ripple controller. Pointer ripples originate
at the clamped press position. Enter and Space keyboard ripples originate at
the control center. One ripple is active at a time. Invalid, loading, and
disabled controls do not start a ripple. Ripple visual values are owned by each
control's Component Tokens. Spinner timing is independently owned and is not
changed by `rippleSpeed`.

## Theme Review

Button Family evidence is mandatory in equivalent Light and Dark theme contexts.
Theme-sensitive values continue to resolve through the existing Semantic and
Component Token contracts.

## Deferred Composites

`ErpButtonGroup`, `ErpSplitButton`, and `ErpFabMenu` are not missing Basic
Controls. They are Composite-layer components.

The Product Owner supplied Material 3 FAB Menu as the future ErpFabMenu visual
and interaction reference. ErpFabMenu will compose the frozen ErpFab and
ErpExtendedFab controls and own open/close state, action collection, placement,
focus management, keyboard navigation, and menu orchestration. It is not
implemented in Button Family V1.
