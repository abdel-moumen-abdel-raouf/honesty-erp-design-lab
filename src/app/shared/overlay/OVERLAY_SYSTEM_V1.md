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
- `ErpOverlayFrame` — mandatory internal Header/Body/Footer frame for
  user-facing modal and drawer surfaces.
- Overlay contracts and types.
- Internal focus, scroll, and inert controllers as required.

No Angular CDK or third-party overlay dependency is introduced. Surface motion
uses the Foundation-owned motion adapter; Animate.css is an internal
implementation dependency and its class/effect names are not public API.

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
  | 'swing'
  | 'fade-up'
  | 'fade-down'
  | 'fade-start'
  | 'fade-end'
  | 'zoom-up'
  | 'zoom-down'
  | 'back'
  | 'light-speed'
  | 'rotate'
  | 'roll';

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
44%, and the default Dark mapping uses Neutral 950 at 48%. Light alternate
tones use their approved 900 palette roles at 38%; Dark alternate tones use
their approved 950 palette roles at 42%. Overlay Component Tokens consume
those Semantic roles; they contain no raw palette colors.

## Dynamic Content

Dynamic content uses Angular-native APIs only, such as `NgComponentOutlet`,
`Injector`, `ViewContainerRef`, or an equivalent Angular-native mechanism.

Each opened overlay receives or injects its `ErpOverlayRef`.

`ErpOverlayRef` supports:

- `close(result?)`
- `dismiss(reason)`
- `registerFrameAction(actionId, handler)`
- `updateFrameActionState(actionId, {disabled, loading})`
- internal `requestFrameAction(actionId)`
- an `afterClosed` Promise
- immutable overlay id and config

Entries follow `entering -> open -> leaving -> removed`. A close or dismissal
records one outcome and keeps the backdrop and surface mounted through the exit
animation. The host reports transition completion; only then does the manager
remove the entry, resolve `afterClosed`, and restore focus. Scroll lock and
background inertness remain active while a blocking leaving entry is mounted.
Reduced motion uses a deterministic completion path.

## Modal and Drawer Semantics

A modal surface has dialog role and a blocking surface uses
`aria-modal='true'`. Every user-facing modal/drawer requires
`ErpOverlayFrameConfig`: a nonblank title, nonblank subtitle, semantic icon,
and an ordered developer-configured footer action collection. Each action has a
unique nonblank ID, nonblank label, `primary | secondary | utility` role,
logical `start | end` placement, and optional static disabled/loading state.
The title is the dialog's
accessible name and the subtitle its visible description.

The shared frame owns:

- a Header with ErpIcon, ErpText title/subtitle, and a Tooltip-wrapped close
  ErpIconButton;
- a primary scrolling Body for dynamic content;
- a single Footer with logically grouped ERP Button actions.

The close action always dismisses with `close-action`. Dynamic content
registers its business behavior by stable action ID through the frame action
channel. Dynamic disabled/loading state is reactive and manager-owned. A
primary action without a handler does nothing; a secondary action without a
handler dismisses with `secondary-action`. Header and Footer remain available
while only the Body scrolls.

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

These controls stage selection inside the overlay and register the shared frame
ordered shared-footer actions. Temporal Today/Clear and selection Clear
Selected utilities stage values without closing; their disabled state follows
the staged value. Pickers commit the CVA value only on the primary confirmation
action. Secondary, close, or other dismissal does not mutate the
committed value. Picker bodies do not recreate duplicate confirm/cancel footer
chrome.

The implemented temporal family (`ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, and `ErpDateRangeBox`) uses this transaction contract and the
shared injected temporal overlay surface. Browser-native date/time picker
popups are not the primary selection experience.

The implemented selection family (`ErpColorPicker`, `ErpIconPicker`,
`ErpItemPicker`, and `ErpComboBox`) uses the same staged transaction boundary.
Semantic icon names and matched item values cross the overlay boundary; vendor
icon names and unmatched combo queries do not.

## Compact Composite Action Menu

`ErpSplitButton` remains the one explicit legacy compact-menu exception. It
uses `openLegacyCompactMenu` without the modal/drawer frame until the deferred
Phase 10/11 composite migration. No other consumer may use that entry point.
The menu consumes the shared ItemPicker option/action shape, restores trigger
focus through the manager, and never uses Tooltip as a menu subsystem.

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
- Initial focus prefers configured focus, then a meaningful Body control, then
  the primary end action, then the surface. It never selects the close action
  merely because it is first in DOM order. Tab remains trapped when configured,
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
- All twenty-three shared animation presets, logical RTL start/end reversal,
  reduced-motion completion, leaving-phase retention, and full-viewport drawer
  geometry remain covered by governance and unit tests.
- Animate.css class/effect names remain confined to the Foundation motion
  adapter.
- User-facing modal/drawer opens require the shared frame and picker bodies
  cannot recreate its confirm/cancel footer.
- Feature/Page code cannot author another OverlayHost, instantiate OverlayRef,
  or recreate blocking fixed backdrops, raw backdrop effects, or numeric
  overlay layers.

This is a technical correction checkpoint only. It does not declare visual
approval, freeze an Overlay-backed control family, or close Basic Controls.
