# Honesty ERP — Overlay System V1

## Status

This is the canonical roadmap contract for the shared blocking overlay system.
It does not claim implementation completion, visual approval, or a frozen
Overlay System.

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
```

Exact defaults:

- kind: modal
- position: center
- size: md
- dismissOnEscape: true
- dismissOnBackdrop: true
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
not render individual hosts.

## Dynamic Content

Dynamic content uses Angular-native APIs only, such as `NgComponentOutlet`,
`Injector`, `ViewContainerRef`, or an equivalent Angular-native mechanism.

Each opened overlay receives or injects its `ErpOverlayRef`.

`ErpOverlayRef` supports:

- `close(result?)`
- `dismiss(reason)`
- an `afterClosed` Promise
- immutable overlay id and config

## Modal and Drawer Semantics

A modal surface has dialog role, a blocking surface uses
`aria-modal='true'`, and an accessible name is required through the
configuration/surface contract.

Drawers use the same manager, stack, backdrop, and focus contract. Drawer start
and end are logical and RTL-aware.

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

## Explicit Separations

Tooltip remains on its existing nonblocking anchored-overlay architecture and
must not migrate to `ErpOverlayManager`.

`ErpFieldFeedback` stays in normal document flow and never uses Tooltip,
anchored-overlay, portals, or `ErpOverlayManager`.

Feature/Page code does not instantiate internal overlay host/reference
infrastructure and does not recreate blocking backdrops or z-index systems.
