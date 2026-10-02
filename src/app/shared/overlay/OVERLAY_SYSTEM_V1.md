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
  | 'top'
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

export interface ErpOverlayFrameConfig {
  readonly showHeader?: boolean;
  readonly showFooter?: boolean;
  readonly header: ErpOverlayHeaderConfig;
  readonly footer: ErpOverlayFooterConfig;
}
```

Exact defaults:

- kind: modal
- position: center
- size: md
- dismissOnEscape: false
- dismissOnBackdrop: false
- blur: medium
- backdropTone: primary
- modal enter/exit: flip-x
- start drawer enter/exit: slide-start
- end drawer enter/exit: slide-end
- top drawer enter/exit: slide-down / slide-up
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
theme-sensitive Semantic scrim.

Runtime defaults are now:
- blur = `medium`;
- backdropTone = `primary`.

The named API value `backdropTone: 'default'` remains available as an
explicit developer override and continues to resolve to the neutral default
scrim. The default-tone Light mapping uses Neutral 950 at 44%, and the
default-tone Dark mapping uses Neutral 950 at 48%. Light alternate tones use
their approved 900 palette roles at 38%; Dark alternate tones use their
approved 950 palette roles at 42%. Overlay Component Tokens consume those
Semantic roles; they contain no raw palette colors.

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
- a single Footer with logically grouped ERP actions.

Header/Footer visual presence is developer-configurable **only through the
Overlay frame API**:

- `showHeader` defaults to `true`;
- `showFooter` defaults to `true`;
- the same flags apply to both modal and drawer surfaces;
- consumer CSS is not the visibility API;
- Header/Footer configuration objects remain required even when a region is
  visually hidden, preserving stable metadata and action contracts;
- when Header is hidden, the dialog uses the configured Header title/subtitle
  directly as accessible ARIA metadata rather than referencing absent DOM IDs;
- when Footer is hidden, its configured actions are not rendered; the developer
  must provide any required commit/dismiss path through body behavior,
  backdrop/Escape policy, or programmatic OverlayRef actions.

Example:

```ts
overlays.open(ContentComponent, {
  kind: 'drawer',
  position: 'start',
  frame: {
    showHeader: false,
    showFooter: true,
    header: {
      title: 'Customer details',
      subtitle: 'Supporting description',
      icon: 'customer',
    },
    footer: {
      actions: [
        {id: 'confirm', label: 'Confirm', role: 'primary', placement: 'end'},
      ],
    },
  },
});
```

The same `frame.showHeader` / `frame.showFooter` API applies unchanged when
`kind: 'modal'`.

Ordinary Footer actions use ErpButton; Clear/Clear Selected use ErpIconButton
with a semantic delete icon and ErpTooltip label.
- one theme-sensitive separator token shared by the Header bottom edge and
  Footer top edge. It resolves through the semantic default border role so the
  separator remains visible in both Light and Dark.

The close action always dismisses with `close-action`. Dynamic content
registers its business behavior by stable action ID through the frame action
channel. Dynamic disabled/loading state is reactive and manager-owned. A
primary action without a handler does nothing; a secondary action without a
handler dismisses with `secondary-action`. Header and Footer remain available
while only the Body scrolls.

Drawers use the same manager, stack, backdrop, and focus contract. Drawer start
and end are logical and RTL-aware.

Start/end drawers attach to the logical viewport edge at full viewport block
size. Top/bottom drawers attach to their physical viewport edge at full inline
size. The shared frame fills the available drawer surface so Header stays at
the start, Footer stays at the bottom/end, and only Body consumes the flexible
scrolling track. Modal viewport inset does not turn drawers into floating cards.

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
ordered shared-footer actions. Temporal Today remains a normal utility action; Temporal Clear and Selection Clear
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


## 2026-10-01 — Product Owner Overlay review correction

The dedicated `/controls/overlays` review route is Overlay-only. It must not
duplicate production Date/Time/DateRange inputs, selection pickers, or deferred
control composites already reviewed on their own control pages.

Current Overlay review evidence is limited to:
- modal behavior and long-body Header/Body/Footer framing;
- four drawer edges: logical start/end plus physical top/bottom;
- nested overlay stack behavior;
- dismissal, backdrop, blur, tone, motion, and reduced-motion policies.

Product Owner runtime corrections in this checkpoint:
- default modal motion is `flip-x`;
- top drawer support is public;
- Header/Footer separators are visible in Light and Dark through the Overlay
  separator Component Token;
- full-height side drawers keep Footer at the bottom while Body owns the flexible
  scrolling region.


## 2026-10-02 — API-configurable Header/Footer visibility

Product Owner requires Header and Footer visibility to be configurable by
developer API for both modals and drawers.

Implemented contract:
- `frame.showHeader?: boolean` — default `true`;
- `frame.showFooter?: boolean` — default `true`;
- OverlayManager normalizes both flags into the immutable runtime config;
- ErpOverlayFrame conditionally renders only the requested visual regions and
  adapts its grid rows so Body remains the flexible content track;
- hiding Header preserves accessible dialog naming through direct
  `aria-label` / `aria-description`;
- hiding Footer removes footer actions from the rendered surface;
- the Overlay review route includes explicit modal and drawer evidence for the
  API states.


## 2026-10-02 — System Confirm Dialog consumer

The shared Overlay action contract now supports optional
`tone?: ErpButtonTone`. OverlayManager normalizes action tone to explicit
semantic runtime state: Primary actions default to `primary`; Secondary and
Utility actions default to `neutral`. Explicit tones such as `warning` and
`danger` flow through the shared OverlayFrame to ErpButton/ErpIconButton.

The system-wide `ErpConfirmDialogService` is an approved blocking Overlay
consumer. It opens a small centered Modal in the same Overlay stack and owns
the system confirmation policy. Application code must not instantiate its
internal content component directly or use browser-native confirmation APIs.

See:
`src/app/shared/confirm-dialog/CONFIRM_DIALOG_V1.md`.


## 2026-10-02 — Confirm-driven Header tone and Close-button API

The shared Overlay Header contract now includes:

```ts
export type ErpOverlayHeaderTone = 'default' | ErpButtonTone;

export interface ErpOverlayHeaderConfig {
  // existing title/subtitle/icon
  readonly tone?: ErpOverlayHeaderTone;
  readonly showCloseButton?: boolean;
}
```

Defaults:
- Header tone = `default`;
- Header close button = visible.

Header tone is implemented through Overlay Component Tokens mapped to existing
semantic Brand/Feedback/Surface roles. No raw palette colors or theme-specific
selectors are authored by consumers.

`showCloseButton` is independent from `showHeader`: a surface can keep its
title/subtitle Header while suppressing only the Close affordance. This is
required by non-dismissible System Confirm dialogs.

The System Confirm contract now also supports up to two typed auxiliary actions
and returns action IDs rather than a Boolean result. See
`src/app/shared/confirm-dialog/CONFIRM_DIALOG_V1.md`.


## 2026-10-02 — Solid Header contrast correction

Product Owner runtime review showed that subtle/pastel Confirm Header surfaces
did not provide the desired emphasis and the semantic Header icon lacked
sufficient visual contrast.

Corrected law:
- a non-default Overlay Header tone uses the **same solid semantic background**
  contract as the corresponding solid ErpButton tone;
- Header foreground uses the corresponding on-solid semantic role;
- Header title, subtitle, and semantic icon inherit that on-solid foreground;
- Header Close uses a solid IconButton of the same semantic tone while the
  Header is colored;
- the default Overlay Header remains unchanged: transparent/default background,
  primary title/icon, secondary subtitle, neutral ghost Close button.

System Confirm defaults its Header tone to the primary Confirm action tone:
primary for default intent, warning for warning intent, danger for danger
intent. Explicit `headerTone` remains an override.

This mapping is Component-Token-driven and theme-sensitive; no raw palette
colors or consumer CSS overrides are permitted.


## 2026-10-02 — OverlayFrame style-budget split

Canonical verification at source `c848151...` passed all governance, Angular
lint, 89/89 test files, 675/675 tests, and both TypeScript typechecks. The final
production build emitted one warning only: `overlay-frame.scss` compiled to
4.17 kB, 168 bytes above the unchanged 4 kB component-style warning budget.

The correction does not weaken the budget and does not remove any Header
contrast behavior. `ErpOverlayFrame` now loads two bounded style parts:

- `overlay-frame.scss` — host/layout/Header-Body-Footer structural rules;
- `overlay-frame-facets.scss` — the nine API-driven Header tone facet
  selectors.

The tone selectors and Component Token mappings are unchanged. Overlay
governance reads both style parts as one semantic contract and also requires
the component to load both files. This follows the established split-style
pattern already used by larger production controls while keeping each emitted
component stylesheet below the per-style warning budget.


## 2026-10-02 — Overlay default backdrop/dismissal policy correction

Product Owner set the system defaults for every shared Overlay entry:

- `blur = 'medium'`;
- `backdropTone = 'primary'`;
- `dismissOnBackdrop = false`;
- `dismissOnEscape = false`.

All four remain developer-configurable through `ErpOverlayOpenConfig`.
Explicit `blur: 'low'`, `blur: 'high'`, `backdropTone: 'default'`, and
other supported values remain valid API overrides.

The same medium/primary and false/false defaults apply to the legacy compact
Overlay menu exception, so there is no second default policy.

Overlay Host facets now explicitly cover every blur value and every backdrop
tone, including `medium` and the named `default` tone, instead of relying on
an omitted selector to imply one API value.

### Colored Header outline

Colored Overlay Headers now receive a tokenized inset outline whose color is
derived from the current Header on-solid foreground using `color-mix`. This
keeps the thin light outline visible in both Light and Dark without raw white
or theme-specific selectors. The ordinary `headerTone: 'default'` Header
keeps the outline transparent.


## 2026-10-02 — Header outline Component Token governance correction

Canonical `npm run verify:clean` at
`40b03ddc824a189bdefe16037f6687c4bc5a0430` stopped at
`component-tokens:check`. The colored Header outline had placed both a
`color-mix(...)` function and a nested facet `@include` inside the Overlay
Component Token module. Both violate the repository-wide Component Token
framework: token modules may emit Component Token custom-property declarations
only, and raw color functions are forbidden there.

The corrected ownership is:

- every colored Header tone facet declares
  `--honesty-overlay-frame-header-outline-color` from
  `--honesty-overlay-frame-header-fg`;
- the default Header keeps that Component Token transparent;
- `ErpOverlayFrame` owns the presentation assembly and applies the approved
  60% `color-mix` when rendering the inset outline;
- no Reference color, raw palette value, local theme selector, public API, or
  Header tone behavior was changed.

The Component Token checker self-test now explicitly rejects raw
`color-mix(...)` values and nested facet `@include` output. Overlay
governance requires all eight colored Header facets to map the outline source
from the Header foreground, forbids the obsolete helper/color function from the
Overlay token module, and requires the 60% mix in the Frame presentation layer.

Implementation checkpoints:

- `948570c918f58326146388a1febfffec34b5a95b` —
  `fix(overlays): restore component token purity`;
- `50768e0919897404c30b3aec8ab8423f9204e62f` —
  `fix(overlays): assemble header outline in frame layer`;
- `355ac02cc6d6b797eba85292f6708833b15965af` —
  `test(governance): pin component token purity regressions`;
- `b102d37e5e7d389758ea49cd225cbbacbbe13205` —
  `fix(governance): align overlay outline with token framework`.

This correction is implemented but has not yet completed a fresh canonical
`npm run verify:clean`. Technical green and Product Owner runtime re-review
remain pending.
