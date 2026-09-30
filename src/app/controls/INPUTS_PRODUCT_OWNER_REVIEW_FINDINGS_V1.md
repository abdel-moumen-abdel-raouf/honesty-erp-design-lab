# Inputs Product Owner Review Findings V1

## Status

Product Owner review of `/controls/inputs` is BLOCKED. The page must not be
passed until the findings below are corrected and re-reviewed.

This document distinguishes current source behavior from new Product Owner
requirements.

## SearchBox — confirmed current-source gaps

Current source:
- `popupMode` is boolean only. The control supports anchored popup vs inline;
  it does not expose the previously agreed three-state focus behavior
  (modal search, dropdown search, plain inline input).
- popup opening is activation/ArrowDown/Enter driven; focus itself does not choose
  one of the three agreed behaviors.
- dropdown results are projected static `[search-results]` content. The SearchBox
  owns no selectable-result contract, no result activation, and no filtering
  contract.
- popup input writes directly into the committed SearchBox value. Query text and
  selected/committed result identity are not separated.
- showcase results are plain `ErpText` nodes, so they cannot be selected.
- dropdown width intentionally uses max(trigger width, popup minimum width), so
  it is not contractually equal to field width.
- there is no explicit close button in the anchored dropdown.
- outside/Escape dismissal exists.
- because the manual Popover is top-layer content, any lower field geometrically
  covered by the open popup cannot receive the pointer. The current outside
  dismissal tests target containment, so a pointer landing inside the popup
  rectangle is not considered an outside click.

Product Owner required SearchBox contract:
1. On focus, developer-selectable mode:
   - modal search;
   - anchored dropdown search;
   - plain text input with no popup.
2. Dropdown mode must be genuinely functional:
   - query filters results;
   - results are selectable by pointer and keyboard;
   - selection commits the result;
   - transient query and committed selection/value are separate concepts.
3. Dropdown inline size must equal the field inline size, subject only to
   unavoidable viewport clamping on very narrow viewports.
4. Anchored dropdown must include an explicit close action. Escape and outside
   dismissal may remain additional paths.
5. Closing/dismissing the popup must not leave an invisible/top-layer hit target
   that prevents subsequent focus on other fields.
6. Modal mode uses dialog semantics; dropdown mode must use appropriate
   combobox/listbox semantics rather than treating every popup as a dialog.

## MoneyBox

Product Owner requires a second MoneyBox review instance that renders money
using Arabic-Indic digits rather than Latin digits.

Current core already supports Arabic-Indic committed display through the shared
Preferences money-digit context, but digit policy is context-owned rather than a
per-instance public input. Two simultaneous review instances with different digit
systems therefore require either:
- an approved per-instance override that falls back to Preferences, or
- an approved scoped preference context.

Do not duplicate formatting logic in the showcase.

## Temporal picker quick actions

Product Owner requirements:
- Time picker: add `الآن`.
- DateTime picker: add `الآن` in addition to existing Today/Clear behavior.
- DateRange picker: add:
  - previous week;
  - next week;
  - previous month;
  - next month.

Current temporal action contract only defines previous/next month navigation,
Today, Clear, Cancel, Confirm, Hour, Minute. It has no Now or range preset actions.

Implementation must resolve preset semantics deterministically before coding
(calendar period vs rolling period, and minute-step handling for Now).

## Confirm-action enablement

Product Owner rule for all selection/picker overlays:
- Confirm is disabled while there is no valid staged selection.
- Cancel and header Close remain enabled.
- DateRange requires a complete valid range, not one endpoint.
- DateTime requires both a valid date and valid time.
- Time requires a valid hour/minute value.
- Selection-family pickers require a non-null valid staged selection.

Current code updates Clear-state but does not dynamically disable Confirm from
the staged selection state in either temporal or selection picker content.

## Additional review findings

### A. SearchBox accessibility/semantics are under-specified

The anchored SearchBox popup is always authored as `role="dialog"` /
`aria-haspopup="dialog"`, while the intended dropdown mode is result selection.
The three-mode contract must give modal and dropdown distinct semantics and
keyboard behavior.

### B. Inputs Design-Lab layout wastes approximately half of the review width

Many review sections use `<erp-grid [columns]="2">` but contain only one
`erp-surface`. In the supplied full-page screenshots this leaves a large empty
column and compresses review evidence into the other half. This is a page-level
review-layout defect, not a production input-control defect.

### C. Temporal empty-state copy is still hard-coded in English

Current Date/Time/DateTime/DateRange display fallbacks include strings such as
`Select date`, `Select time`, `Select date and time`, and
`Select date range` while the review/application context is Arabic. These
fallbacks need localization/system-label ownership rather than hard-coded
English.

## Execution boundary

No source correction is implemented by this document.

Before implementation:
- preserve shared overlay/foundation contracts;
- do not solve SearchBox by creating a second unrelated overlay engine;
- do not duplicate money formatting;
- keep Cancel/Close semantics independent from Confirm selection validity;
- add deterministic tests for all new behavior.

Inputs page status: BLOCKED pending Product Owner-authorized correction.


## 2026-09-29 — implementation status

The authorized correction has now been implemented in source.

Latest source checkpoint:
`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`

Implemented against the findings in this document:
- SearchBox modal/dropdown/inline modes;
- selectable/filterable dropdown results;
- transient query vs committed value separation;
- exact full-field anchored width with viewport clamp;
- explicit close + inert leaving behavior;
- dropdown vs modal semantics;
- per-instance MoneyBox Arabic-Indic digit override with Preferences fallback;
- Time/DateTime Now;
- DateRange week/month presets;
- disabled Confirm until valid staged selection;
- guarded Confirm handlers and disabled/loading Overlay frame action dispatch;
- full-width Design-Lab review surfaces;
- Arabic-first temporal empty-state placeholders.

Verification is still pending. This page remains BLOCKED until a fresh full
`npm run verify:clean` passes and Product Owner runtime/visual re-review accepts
the corrected behavior.


## 2026-09-29 — first verification follow-up

The first full verification attempt after implementation reached
`erp-button:check` and found one governance regression: SearchBox result options
used a native button directly.

Corrected at:
`cf91967291961037dd7f35d0e825fc4fb2da8312`

SearchBox result options now use approved internal `ErpSelectionTile` list
presentation. Functional result selection/filtering contract is unchanged.

Fresh full verification remains required.


## 2026-09-29 — second verification follow-up

The canonical verify run at `a85c138...` passed all governance and lint, then
reached tests with six failures.

The failures did not demonstrate a new Product Owner runtime defect:
- SearchBox value selection itself succeeded;
- host evidence required a fixture render before assertion;
- the synthetic End key needed normal browser bubbling;
- staged picker tests had to render updated Confirm disabled/enabled state before
  clicking Confirm.

Test-only correction:
`92840de9c670edd32b05c1485f50c2e61e68fead`.

Fresh full verification remains required.


## 2026-09-29 — third verification follow-up

Inputs-targeted tests are now green:
- SearchBox 11/11;
- Temporal picker 14/14;
- Selection picker 16/16;
- Inputs showcase 14/14.

The only remaining test failure in the full run was an App-shell integration
timeout caused by three lazy-route renders sharing one 5-second test body.

Test-only correction:
`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

Fresh full verification remains required before Inputs may enter Product Owner
runtime re-review.


## 2026-09-29 — runtime re-test reopened SearchBox close lifecycle

Product Owner proved the prior implementation did not fully solve SearchBox
interaction teardown.

Observed:
- select result;
- dropdown appears closed;
- click lower field;
- focus can be rejected/stolen;
- SearchBox can select a different result as if dropdown were still active;
- no standard clear action visible.

Implemented correction:
- immediate native Popover/top-layer release on close;
- immediate hit-area release;
- no delayed focus restoration;
- hardened AnchoredOverlayController native hide;
- clearable review instances.

Source checkpoints:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`;
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Finding remains open until Product Owner runtime re-test confirms resolution.


## 2026-09-29 — exact root cause of invisible closed dropdown found

The previously persisted "closed but still selectable" SearchBox behavior is now
explained by one exact CSS error.

The native Popover surface had unconditional:
`display:grid`

on its base rule. Closed Popovers rely on native `display:none`, so the author
display declaration kept the closed popup rendered. Hidden opacity made it look
closed while it still covered lower controls and could receive result clicks.

Root-cause fix:
`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

The base rule no longer declares display. Grid layout is enabled only while
`:popover-open`.

Finding remains open until Product Owner re-tests the exact scenario.


## 2026-09-29 — additional Inputs Product Owner findings and decisions

No production source change is made by this documentation update.

### Domain text fields
Source confirms UrlBox keeps an invalid draft only while editing and falls back
to the last committed valid value on blur. TelBox can actively revert invalid
alphabetic input. FieldBase currently defaults `clearable` to false.

Decision:
- domain validation must be non-destructive;
- invalid URL/Tel-like text remains visible for correction;
- the control surfaces automatic validation feedback rather than deleting or
  reverting the user's text;
- Field-family controls become clearable by default, with per-instance opt-out.

### Ghost / Text / Underline discoverability
Ghost and Text variants currently map to transparent backgrounds/borders and the
reviewed FieldFrame token contract has no hover-discoverability state.

Decision:
- add token-owned hover surface/background feedback for Ghost/Text/Underline;
- keep them lightweight at rest but discoverable on hover/focus.

### RangeSlider
Exact source-level geometry mismatch:
- visual selected rail positions use global min/max percentages;
- lower native range currently uses `max=currentValue().upper`;
- upper native range currently uses `min=currentValue().lower`;
- therefore each native thumb is positioned in a changing local range while the
  visual rail is positioned in the global range. Their coordinate systems do
  not match, explaining selected fill extending beyond/between incorrect thumb
  centers.

Decision:
- native thumb geometry and visual rail use one global coordinate system;
- crossing prevention remains logic, not changing the native min/max coordinate
  domain;
- active lower/upper thumb exposes a moving value Tooltip;
- Tooltip follows the real thumb position for pointer and keyboard changes;
- value formatting/content is customizable per instance.

### Time / DateTime Now
Source confirms Now updates staged hour/minute and selected button variants, but
time columns are scrollable and no code scrolls the newly selected time into
view.

Decision:
- Now must update state and reveal/scroll the selected hour/minute;
- DateTime must also make selected date/time visibly apparent after Now.

### DateRange preset semantics
Current implementation is calendar previous/next week/month.
Product Owner requires rolling periods including today.

Decision:
remove ambiguous calendar wording and keep useful rolling presets with exact
labels:
- `آخر 7 أيام` = today plus previous 6 days;
- `7 أيام بدءًا من اليوم` = today plus next 6 days;
- `آخر 30 يومًا` = today plus previous 29 days;
- `30 يومًا بدءًا من اليوم` = today plus next 29 days.

These rolling presets do not depend on weekStartsOn or month boundaries.

### ColorPicker
Current ColorPicker has no public mode input. Its overlay includes an internal
System/Free mode switch.

Decision:
- add per-instance ColorPicker mode: `system | free`;
- one instance exposes exactly one mode;
- remove the internal System/Free switch from production picker content;
- each configured instance only accepts/commits values of its configured mode.

### ItemPicker vs ComboBox
Source confirms the two controls are not duplicates at contract level.

ItemPicker:
- non-editable select-like FieldTrigger;
- opens picker on activation;
- optional search occurs inside picker overlay.

ComboBox:
- editable text field with combobox semantics;
- typing creates query text in the field and opens searchable picker;
- only an existing item value is ultimately committed.

Decision:
- keep both;
- Design Lab must demonstrate the distinction clearly;
- ItemPicker evidence should be non-searchable by default and read like a Select;
- ComboBox evidence must demonstrate type-to-filter from the field itself.

Inputs remains BLOCKED pending implementation and Product Owner re-review.


## 2026-09-29 — unified input validation architecture added

Product Owner added a cross-family requirement: every ERP input must expose
developer-consumable semantic state and validation errors.

Authoritative architecture:
`INPUT_VALIDATION_CONTRACT_V1.md`.

Common states:
`null | empty | no-selection | invalid-entry | valid-entry`.

Every input will expose validity plus both:
- simple `readonly string[]` errors;
- structured stable-code validation issues.

State and validity are separate so optional empty/null/no-selection can remain
valid while required ones report errors.

All editable validation is non-destructive.

Typed min/max/length/count constraints participate in one common validation
engine.

Finding is architecture-approved / implementation-pending.


## 2026-09-30 — expanded findings implementation status

All findings recorded in the 2026-09-29 expanded review are now implemented in
source/tests/governance on current main:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Implemented:
- non-destructive URL/Tel/domain text validation;
- common developer-facing input state/errors/issues contract;
- typed constraints and Angular Forms validity bridge;
- default Field clearability + opt-out;
- lightweight variant hover discoverability;
- RangeSlider unified geometry + moving customizable value Tooltips;
- Time/DateTime Now reveal;
- rolling inclusive 7/30-day DateRange presets;
- ColorPicker per-instance system/free mode;
- explicit ItemPicker vs ComboBox Design Lab distinction.

Finding status changes from implementation-pending to
**implemented / verification pending**.

Inputs remains BLOCKED until technical verification and Product Owner re-review.


<!-- CHATGPT_CONTINUITY_SYNC_START -->
## 2026-09-30 — ChatGPT continuity sync

Live GitHub `main` was re-read and externally synchronized from:
`a28a0fffa01ea1035d0dce47910922b30d8f06c0`
(`docs(inputs): record expanded implementation checkpoint`).

Latest bounded Inputs implementation checkpoint under that head:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Current continuation state:
- expanded Inputs corrections + unified validation are implemented in source/tests/governance;
- current source is still **verification pending**;
- Inputs remains Product Owner **BLOCKED** until technical verification and runtime/Light/Dark re-review;
- exact next technical gate is a fresh full `npm run verify:clean` from current `main`;
- only demonstrated verification failures may reopen implementation;
- after technical green, Product Owner runtime/Light/Dark Inputs review is the next product gate;
- the no-iframe single-document App shell is already implemented and must not regress.

This synchronization is documentation/state only; it makes no runtime or visual
approval claim.

Continuity rule for subsequent project turns: update the applicable persistent
handoff/review/roadmap documents whenever the turn changes a decision, scope,
implementation state, blocker, verification result, or Product Owner finding.
<!-- CHATGPT_CONTINUITY_SYNC_END -->


<!-- CHATGPT_LOCAL_VERIFY_SYNC_START -->
## 2026-09-30 — verify reached test compilation; two bounded compile gaps corrected

Product Owner reran `npm run verify:clean` from
`c9bd7204cb85ac4509c35cd3ea7015fb78ca1fe8`.

Observed progress:
- all governance checks PASS;
- Angular lint PASS with zero warnings;
- test bundle generation then stopped before executing tests on exactly two
  TypeScript/template compilation errors.

Bounded correction checkpoint:
`9b499753bb06d350513a2f0bbad0a5de84a2817d`
(`fix(inputs): close selection and temporal test compile gaps`).

Corrections:
1. Selection/ColorPicker label contract:
   - free-color template uses `data.actionLabels.freeColor`;
   - `ErpSelectionActionLabels` and its default object lacked that key;
   - add typed `freeColor` with Arabic-first default `لون حر`;
   - add direct selection-content test evidence and Arabic-default governance.

2. Temporal Now reveal test typing:
   - production `revealSelectedTime()` remains unchanged;
   - the spec's nullable closure-captured animation-frame callback was narrowed
     incorrectly by TypeScript at the call site;
   - replace the harness-only capture with a typed
     `FrameRequestCallback[]` queue and assert exactly one queued reveal frame.

No temporal runtime behavior, picker interaction contract, ColorPicker mode law,
or visual redesign is introduced by this correction.

Next mandatory action:
1. pull current `main`;
2. rerun complete `npm run verify:clean`;
3. correct only a newly demonstrated failure if the gate stops again;
4. if Fully Green, record the verified checkpoint and resume Product Owner
   runtime + Light/Dark Inputs re-review.

Inputs remains Product Owner BLOCKED until acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->
