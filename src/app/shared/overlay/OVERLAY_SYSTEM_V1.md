# Honesty ERP — Overlay System V1

## Status

This is the implemented V1 contract for the shared blocking overlay system.
It does not claim Product Owner visual approval or freeze later overlay-backed
picker contracts.

The post-CR12 Wave A lifecycle, blur, backdrop-tone, motion, geometry, and
dismissal corrections are implemented technical contracts. They do not claim
Product Owner visual approval or freeze.

The system must exist before any overlay-backed picker is implemented.

## Architecture

- `ErpOverlayManager` — injectable service.
- `ErpOverlayHost` — application-level host rendered exactly once.
- `ErpOverlayRef<TResult>` — reference supplied to an opened overlay.
- Overlay contracts and types.
- Internal focus, scroll, and inert controllers as required.

No Angular CDK or third-party overlay dependency is introduced.

## Contracts

```ts
export type ErpOverlayKind = 'modal' | 'drawer';

export type ErpOverlayPosition =
  | 'center'
  | 'start'
  | 'end'
  | 'bottom';

export type ErpOverlaySize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type ErpOverlayBlur = 'low' | 'medium' | 'high';

export type ErpOverlayBackdropTone =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent';

export type ErpMotionPreset =
  | 'fade'
  | 'scale'
  | 'fade-scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-start'
  | 'slide-end'
  | 'zoom'
  | 'pop'
  | 'flip-x'
  | 'flip-y'
  | 'bounce'
  | 'swing';

export type ErpOverlayAnimation = ErpMotionPreset;
```

Exact defaults:

- kind: modal
- position: center
- size: md
- dismissOnEscape: false
- dismissOnBackdrop: false
- blur: low
- backdropTone: default
- modal enter/exit: fade-scale
- start drawer enter/exit: slide-start
- end drawer enter/exit: slide-end
- bottom drawer enter/exit: slide-up / slide-down
- restoreFocus: true
- trapFocus: true
- blocking: true

## Manager Responsibilities

`ErpOverlayManager` owns:

- stack and z-order;
- top-overlay-only Escape/backdrop dismissal;
- semantic `--honesty-layer-blocking`;
- backdrop and backdrop blur;
- body scroll lock;
- background inertness;
- focus trap;
- initial focus;
- focus restoration;
- nested overlay stack;
- reduced motion;
- RTL-aware logical drawer start/end;
- responsive viewport sizing;
- teardown without leaked listeners or state.

## Host

Exactly one `ErpOverlayHost` is rendered in the application shell. Controls do
not render individual hosts. It covers the complete application viewport above
the Lab toolbar and routed content. The Inputs and Overlays review routes render
directly in that top-level document so blocking surfaces are never constrained
by an iframe or content rectangle.

## Backdrop

The blocking backdrop combines the configured Foundation blur with a
theme-sensitive Semantic scrim. The default Light mapping uses Neutral 950 at
32%, and the default Dark mapping uses Neutral 950 at 54%. Alternate neutral,
primary, secondary, and accent tones use their approved 900/950 palette roles
and theme-specific percentages. Overlay Component Tokens consume those
Semantic roles; they contain no raw palette colors.

## Dynamic Content

Dynamic content uses Angular-native APIs only, such as `NgComponentOutlet`,
`Injector`, `ViewContainerRef`, or an equivalent Angular-native mechanism.

Each opened overlay receives or injects its `ErpOverlayRef`.

`ErpOverlayRef` supports:

- `close(result?)`
- `dismiss(reason)`
- an `afterClosed` Promise
- immutable overlay id and config

Entries follow `entering -> open -> leaving -> removed`. A close or dismissal
records one outcome and keeps the backdrop and surface mounted through the exit
animation. The host reports transition completion; only then does the manager
remove the entry, resolve `afterClosed`, and restore focus. Scroll lock and
background inertness remain active while a blocking leaving entry is mounted.
Reduced motion uses a deterministic completion path.

## Modal and Drawer Semantics

A modal surface has dialog role, a blocking surface uses
`aria-modal='true'`, and an accessible name is required through the
configuration/surface contract.

Drawers use the same manager, stack, backdrop, and focus contract. Drawer start
and end are logical and RTL-aware.

Start/end drawers attach to the logical viewport edge at full viewport block
size. Bottom drawers attach to the bottom at full inline size. Modal viewport
inset does not turn drawers into floating cards.

## Picker Transaction Contract

Overlay-backed selection Composites are:

- `ErpDateBox`
- `ErpTimeBox`
- `ErpDateTimeBox`
- `ErpDateRangeBox`
- `ErpColorPicker`
- `ErpIconPicker`
- `ErpItemPicker`
- `ErpComboBox`

These controls stage selection inside the overlay and commit the CVA value only
on confirmation. Cancel or dismissal does not mutate the committed value.

The implemented temporal family (`ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, and `ErpDateRangeBox`) uses this transaction contract and the
shared injected temporal overlay surface. Browser-native date/time picker
popups are not the primary selection experience.

The implemented selection family (`ErpColorPicker`, `ErpIconPicker`,
`ErpItemPicker`, and `ErpComboBox`) uses the same staged transaction boundary.
Semantic icon names and matched item values cross the overlay boundary; vendor
icon names and unmatched combo queries do not.

## Compact Composite Action Menu

`ErpSplitButton` uses `ErpOverlayManager` for its V1 compact blocking action
menu. This is the prescribed V1 choice because no generic nonblocking anchored
menu foundation exists. The menu consumes the shared ItemPicker option/action
shape, restores trigger focus through the manager, and never uses Tooltip as a
menu subsystem.

## Explicit Separations

Tooltip remains on its existing nonblocking anchored-overlay architecture and
must not migrate to `ErpOverlayManager`.

SearchBox popup mode is also nonblocking and anchored, but it owns its popup
surface, sizing, motion, dismissal, and Component Tokens inside the SearchBox
namespace. It has no backdrop and does not consume `ErpOverlayManager`, Tooltip,
or Overlay Component Tokens.

`ErpFieldFeedback` stays in normal document flow and never uses Tooltip,
anchored-overlay, portals, or `ErpOverlayManager`.

Feature/Page code does not instantiate internal overlay host/reference
infrastructure and does not recreate blocking backdrops or z-index systems.

## Runtime Ownership

- The application shell renders exactly one `ErpOverlayHost`.
- The manager owns an ordered overlay stack and only its top entry responds to
  Escape or backdrop dismissal.
- Blocking entries lock body scrolling and make application-shell siblings
  inert until the blocking stack is empty.
- Initial focus enters the top surface, Tab remains trapped when configured,
  and closing restores the captured origin when configured.
- Dynamic content receives `ErpOverlayRef` and optional data through Angular
  dependency injection.
- The host consumes the overlay Component Token contract, the semantic blocking
  layer, Surface scrim, and Foundation blocking backdrop-blur effect.
- Responsive sizing uses the Foundation Query API and reduced-motion timing
  resolves through the overlay token contract.

## Correction Governance

- Public blur, backdrop-tone, animation, and lifecycle-phase unions are checked
  exactly against this contract.
- Manager defaults and modal/drawer motion defaults are checked mechanically.
- All thirteen shared animation presets, logical RTL start/end reversal,
  reduced-motion completion, leaving-phase retention, and full-viewport drawer
  geometry remain covered by governance and unit tests.
- Feature/Page code cannot author another OverlayHost, instantiate OverlayRef,
  or recreate blocking fixed backdrops, raw backdrop effects, or numeric
  overlay layers.

This is a technical correction checkpoint only. It does not declare visual
approval, freeze an Overlay-backed control family, or close Basic Controls.
