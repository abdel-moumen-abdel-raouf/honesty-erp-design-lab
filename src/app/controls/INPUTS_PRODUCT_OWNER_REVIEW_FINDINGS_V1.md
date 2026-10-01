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
## 2026-10-01 — latest Inputs verification rerun: one URL-regex lint escape corrected

Product Owner pulled and verified source at:
`dc63c08ea88e29c5fb4d78743761325b9c4a9c63`
and ran the complete canonical gate:
`npm run verify:clean`.

Observed progress:
- Single App theme authority PASS;
- routed-page ERP-only authoring PASS;
- Component Token framework PASS;
- system-color registry PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpOverlay PASS;
- Angular lint then stopped on exactly one ESLint error.

Exact failure:
`src/app/controls/input-family/domain-validation.ts:72:37`
`no-useless-escape`

The progressive URL character-class regex escaped a terminal hyphen even though
that position does not require escaping.

Bounded correction:
- `9315691c9579a324990a56d928e4e22d504111a4`
  `fix(inputs): remove redundant URL regex escape`;
- only the redundant escape was removed;
- runtime URL admission semantics are unchanged.

Pre-rerun checks after correction:
- zero remaining escaped-hyphen occurrences in the domain-validation source;
- ErpField governance JavaScript syntax compilation PASS;
- complete ErpField governance internal self-test PASS;
- direct URL semantic smoke check confirms required forms such as
  `example.com`, `www.example.com`, HTTP/HTTPS variants, `.org`, `.net`,
  and `.ai` are valid while `http://www.s`, `example.c`, and `localhost`
  remain invalid.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`

Inputs remains Product Owner BLOCKED pending a fresh technical green result and
runtime/visual acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->


<!-- CHATGPT_RUNTIME_REVIEW_2026_10_01_START -->
## 2026-10-01 — Product Owner runtime re-review: URL, Solid hover, NumberBox admission, selection-row motion, and live data

Product Owner supplied runtime screenshots and five concrete findings after the
previous Fully Green checkpoint.

### 1. UrlBox web-address semantics

Observed:
- an incomplete address such as `http://www.s` did not provide the required
  ERP validation evidence.

Product Owner-required accepted forms include:
- `http://www.example.com`;
- `https://www.example.com`;
- `www.example.com`;
- `example.com`;
- `http://example.com`;
- `https://example.com`;
- valid non-com TLDs such as `.org`, `.net`, `.ai`, and equivalent valid
  alphabetic/punycode TLDs.

Bounded implementation:
- UrlBox is a text-like editor with `inputmode=url`; native `type=url`
  no longer conflicts with scheme-less domains;
- `http://` / `https://` are optional;
- explicit non-HTTP(S) schemes are rejected;
- final validation parses through `URL` and requires a hostname with at least
  two valid labels;
- TLD must be alphabetic length 2–63 or valid punycode form;
- `http://www.s`, one-label hosts, and incomplete schemes remain visible as
  invalid drafts with `url.format` and do not replace the last accepted CVA
  value.

### 2. Solid hover parity

Ghost/Text/Underline hover had been corrected, but Product Owner observed the
same Light-mode discoverability problem on Solid.

Bounded implementation:
- Solid joins the same token-owned hover law;
- hover mixes the current Field base surface with the theme-sensitive hover tint;
- no local Light/Dark selector or component theme branch was added.

### 3. NumberBox digits-only editing

Product Owner clarified that NumberBox must admit digits only.

Bounded implementation:
- NumberBox editor admits ASCII `0-9` only;
- native editor remains `type=text` with `inputmode=numeric`;
- sign characters, decimal separators, letters, and unrelated punctuation are
  rejected before becoming the draft;
- min/max/step remain validation concerns: an admitted integer may remain
  visible and invalid rather than being clamped or erased.

MoneyBox and NumberStepper keep their separate decimal-editing grammar.

### 4. File/Image selected-item hover motion

Product Owner accepted the existing hover background change and requested a
small motion cue for the currently hovered selected file/image row.

Bounded implementation:
- FilePicker and ImagePicker selected rows use token-owned
  `--*-item-hover-scale: 1.01`;
- transform participates in the existing Foundation Motion transition;
- hover/focus-within scales in, pointer/focus exit transitions back to scale 1;
- reduced-motion cancels the transform.

### 5. Production dynamic Search / ItemPicker / ComboBox data

Product Owner required SearchBox modes, select-like ItemPicker, and ComboBox to
use dynamic application data and remain usable anywhere in the production app,
not only with Design Lab fixtures.

Bounded implementation:
- SearchBox anchored dropdown already reads the current `items` input signal
  directly and now has explicit regression coverage for live changes while open;
- SearchBox modal passes a live `itemsProvider`;
- ItemPicker and ComboBox pass a live provider over their required `items`
  input to the shared selection picker;
- shared `ErpSelectionPickerContent` derives filtering and staged-selection
  validity from current provider data rather than an open-time snapshot;
- production SearchBox / ItemPicker / ComboBox are governed against
  Design-Lab/showcase/review-internal dependencies.

### Implementation checkpoints

- `9b13eab3c00046a3ed6258d981d33663355b26e0`
  `fix(inputs): tighten URL number and solid hover contracts`
- `2912b97cb62ea159430bdca3f386814fa914698c`
  `fix(inputs): add picker motion and live item providers`
- `98c3c8ccddc8812af57d8b6a429b9510e0151465`
  `fix(inputs): align URL scheme and NumberBox keypad admission`
- `5ec8124cb8ad483309d525bf558d41abb4252669`
  `test(inputs): cover URL integer motion and live picker data`
- `b6974154a916ebb751eda5290c7bbc2a9bce704b`
  `chore(inputs): govern current runtime review contracts`
- `eb3db0130db1786488b91e050f9d54168b28bbd3`
  `docs(inputs): align field contracts with runtime review`
- `64edf72fe8c7655a98e52d98e910bf675629129b`
  `fix(governance): align File selection self-test literals`
- `9ffa59e348b6246f1c8a210c01d437763b3a1f65`
  `fix(governance): make SearchBox base-rule check formatting independent`

Pre-rerun review performed:
- combined source/test/governance diff reviewed;
- ErpField governance JavaScript syntax compilation PASS;
- complete internal ErpField governance self-test PASS after correcting two
  self-test/governance weaknesses discovered during this review.

Status:
**implemented / canonical verification pending**.

Inputs remains Product Owner BLOCKED. A fresh complete `npm run verify:clean`
is mandatory before runtime re-review of these five findings.
<!-- CHATGPT_RUNTIME_REVIEW_2026_10_01_END -->


<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_START -->
## 2026-10-01 — Mandatory continuity quartet + latest Fully Green checkpoint

### Mandatory synchronization rule

For every substantive project turn that changes any of the following:
- Product Owner finding or decision;
- implementation scope or completed correction;
- blocker / unblocked state;
- verification result;
- next execution gate;
- review status or acceptance status;

ChatGPT must update **all four** of these files in the same work cycle before
declaring the turn complete:

1. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
2. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
3. `README_FIRST.md`
4. `NEW_CHAT_HANDOFF.md`

Updating only a subset is not sufficient. These four documents are the required
continuity quartet for preserving current execution state and new-chat context.

### Latest canonical technical verification

Product Owner pulled and verified:
`ff4f721f600490414085e49d9c1975d640fdbbbc`
(`docs(review): synchronize URL regex lint follow-up`).

Canonical command:
`npm run verify:clean`

Result: **FULLY GREEN**.

Verified evidence:
- all repository governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- 653/653 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Current Inputs state:
- technical verification is green for the latest URL/Solid/NumberBox/File-Image
  motion/live-data correction set;
- exact next gate is Product Owner runtime re-test of those findings;
- Inputs remains Product Owner BLOCKED until explicit runtime/visual acceptance;
- no unrelated implementation is authorized.
<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_END -->


<!-- CHATGPT_PROJECT_HISTORY_DIGEST_START -->
## Consolidated project-history digest — through 2026-10-01

This section is the compact continuity timeline for the substantive stages that
must survive chat boundaries. It complements detailed local sections elsewhere
in this repository.

### 1. No-iframe single-document Lab shell — completed

Key implementation checkpoints:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0`
  `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9`
  `style(lab): normalize direct shell markup`

Frozen current law:
- one direct `router-outlet`;
- no preview iframe;
- no embedded/direct dual rendering;
- no `labPreview` query;
- no iframe theme propagation;
- browser viewport is the real responsive authority;
- screenshot capture remains same-document from `#lab-capture-root`;
- exactly one App-level `[attr.data-theme]="theme()"`;
- exactly one App-level `ErpOverlayHost`.

The old Desktop/Tablet/Mobile preview controls were removed because a resized
same-document container cannot honestly simulate viewport media queries.

### 2. Tooltip system — completed before active Inputs work

Important checkpoints:
- positioning contract: `7a0a14f090ee38df3ea4adc02255856d89b6c71a`;
- stale iframe-era overlay governance correction:
  `a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`;
- lint correction: `3eb993e64616362bf920284e37b5005d412fd531`;
- cross-axis correction:
  `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`;
- popover-padding coordinate-origin correction:
  `84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`.

Product Owner changed the default Tooltip motion to Zoom enter + Zoom exit.
Tooltip is not the active workstream.

### 3. Inputs Product Owner review — initial implementation stage

Authoritative findings:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Initial implementation checkpoint:
- `6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

The review established, among other points:
- SearchBox developer-selectable `modal | dropdown | inline` modes;
- functional selectable/filterable results;
- transient query distinct from committed selection;
- anchored dropdown width equal to field subject to viewport clamp;
- explicit close and no invisible/ghost hit target;
- modal vs listbox semantics;
- Time/DateTime Now;
- rolling DateRange actions;
- Confirm disabled until staged selection is valid;
- full-width Inputs Lab review;
- Arabic-first temporal empty-state copy.

Follow-up SearchBox/selection checkpoints:
- `cf91967291961037dd7f35d0e825fc4fb2da8312`;
- `92840de9c670edd32b05c1485f50c2e61e68fead`;
- `72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

### 4. SearchBox invisible-hit root cause — fixed

Defensive lifecycle checkpoints:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`;
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Literal root cause:
`.search-box__popup { display:grid; }` overrode the browser's closed Popover
`display:none`, leaving a transparent fixed hit box after visual closure.

Root-cause fix:
- `5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Current law:
- base popup rule does not set `display`;
- `display:grid` exists only in `:popover-open`;
- leaving popup is inert/noninteractive and releases the native top layer
  immediately.

### 5. Unified Input validation architecture — implemented

Authoritative contract:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Major implementation checkpoint:
- `c3971739198e61adff98d821a6b8f6775faa4e6c`.

Common semantic states:
`null | empty | no-selection | invalid-entry | valid-entry`.

Every CVA input participates in:
- `inputState`;
- `valid`;
- string `errors`;
- structured `validationIssues`;
- canonical validation snapshot;
- common `required`;
- Angular `NG_VALIDATORS` bridge;
- external/business validation hook.

Core law:
- character/domain admission is separate from value validation;
- invalid admitted drafts remain visible;
- validation does not silently clamp/erase a draft merely to pass;
- typed domain restrictions remain control-specific.

Expanded implementation also covered:
- default Field clearability with opt-out;
- URL/Tel domain handling;
- numeric/money/stepper validation;
- RangeSlider shared coordinate domain + moving value Tooltip;
- Time/DateTime Now reveal;
- inclusive rolling DateRange 7/30-day presets;
- fixed per-instance ColorPicker mode;
- ItemPicker vs ComboBox product distinction;
- File/Image selection validation.

### 6. Verification-hardening stage after expanded Inputs implementation

The canonical gate is always:
`npm run verify:clean`.

Substantive corrections encountered during the verification loop included:
- SearchBox native maxlength made validation-only:
  `28829cb6b581d741170a7dd24c677f5a8dac11f7`;
- InputBase intentional-unused-parameter lint correction:
  `e933a4b598c32cea949d61aaf31cb207c54e4b10`;
- Selection free-color contract + Temporal test compile gaps:
  `9b499753bb06d350513a2f0bbad0a5de84a2817d`;
- stale Inputs spec expectations aligned with approved contracts:
  `1a6b29c1aa5dca36474c10eb40ef64492a65e595`;
- final stale NumberBox/Overlay expected values:
  `c096afc3cda1d076cfc702c721427c8468e4c61b`.

This stage produced the earlier Fully Green checkpoint:
- 87/87 test files;
- 649/649 tests;
- app/spec typecheck PASS;
- zero-warning production build PASS.

### 7. Product Owner runtime findings after that green checkpoint

The Product Owner then found three concrete runtime issues:
- Ghost/Text/Underline hover visible in Dark but effectively absent in Light;
- typed character admission had become too permissive for specialized controls;
- shared picker Clear actions needed IconButton + Tooltip presentation.

Bounded implementation checkpoints included:
- `e7068b64df5b64b789dbc4d2b5f81648ad11d2e9`
  typed character admission restoration;
- `b54c89c621dab914dda3555a5f8cf7ac0a48fd37`
  Overlay Clear as icon + Tooltip;
- `fead82d36c30533e575ab34ff41463f19ffa6848`
  regression tests/governance;
- `cade8015624c804d0be83bad5d2c49f126f5b906`
  Overlay Clear governance;
- `488741922c365a605acc9a70141f600278c46087`
  patch-integrity repair;
- `65c097d224bb31f282ec5737ebc8381ed9f73b14`
  icon-only Clear contract lock.

Follow-up governance/parser and stale-test corrections:
- `0dfea6b1eb71441267165da3149a0148ea6c4ade`;
- `c096afc3cda1d076cfc702c721427c8468e4c61b`.

### 8. Latest Product Owner runtime findings — URL, Solid, NumberBox, motion, live data

Latest authorized findings:
1. UrlBox must accept real web domains with optional HTTP(S) scheme and reject
   incomplete hosts such as `http://www.s`.
2. Solid needs the same Light/Dark hover discoverability guarantee as
   Ghost/Text/Underline.
3. NumberBox editing must admit ASCII digits only; min/max/step remain
   validation concerns.
4. selected File/Image rows need subtle hover/focus scale motion.
5. SearchBox, ItemPicker, and ComboBox result/item collections must be
   runtime-dynamic production data, including while an overlay is already open.

Implementation/test/governance checkpoints:
- `9b13eab3c00046a3ed6258d981d33663355b26e0`;
- `2912b97cb62ea159430bdca3f386814fa914698c`;
- `98c3c8ccddc8812af57d8b6a429b9510e0151465`;
- `5ec8124cb8ad483309d525bf558d41abb4252669`;
- `b6974154a916ebb751eda5290c7bbc2a9bce704b`;
- `eb3db0130db1786488b91e050f9d54168b28bbd3`;
- `64edf72fe8c7655a98e52d98e910bf675629129b`;
- `9ffa59e348b6246f1c8a210c01d437763b3a1f65`;
- URL-regex lint-only correction:
  `9315691c9579a324990a56d928e4e22d504111a4`.

Current detailed laws:
- UrlBox accepts scheme-less or HTTP(S) real domains with valid multi-label
  hostnames/TLDs and reports `url.format` for incomplete domains;
- Solid/Ghost/Text/Underline use the same theme-sensitive hover-token law;
- NumberBox editor is digits-only while admitted values may still be invalid
  through min/max/step;
- File/Image selected rows use tokenized `scale(1.01)` hover/focus motion and
  reduced-motion cancellation;
- SearchBox dropdown is signal-live; SearchBox modal, ItemPicker, and ComboBox
  use a live items provider while open;
- production controls are governed against Design-Lab/review-internal
  dependencies.

### 9. Current canonical technical checkpoint

Product Owner verified current source with:
`npm run verify:clean`.

Latest verified result:
- all governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- **653/653 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Inputs status:
**Technical PASS / Product Owner runtime review still authoritative**.
Technical green never substitutes for Product Owner visual/runtime acceptance.

### 10. Mandatory continuity discipline

The following four files form the mandatory continuity quartet and must all be
updated in the same work cycle whenever a substantive decision, finding,
implementation state, blocker, verification result, or next gate changes:

- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`;
- `README_FIRST.md`;
- `NEW_CHAT_HANDOFF.md`.

Do not treat an update to only one or two of these as a complete continuity
sync.
<!-- CHATGPT_PROJECT_HISTORY_DIGEST_END -->


<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_START -->
## 2026-10-01 — Product Owner Overlay runtime review: bounded correction implemented / verification pending

Product Owner reviewed `/controls/overlays` in Light/Dark and identified five
Overlay-specific corrections.

### Authorized findings

1. The dedicated Overlay review page must contain Overlay-system evidence only.
   Temporal Inputs, selection pickers, and deferred control composites were
   duplicated there despite already having their production review locations.

2. The separator below the shared Overlay Header and above the Footer was
   visible in Light but too weak in Dark.

3. Default modal enter/exit motion must be `flip-x`.

4. Drawer positions must support all four edges:
   - logical start;
   - logical end;
   - physical top;
   - physical bottom.

5. Full-height side drawers must keep the shared Footer at the bottom/end of the
   surface while Body owns the flexible scrolling region.

### Bounded implementation

Source checkpoint:
`2a1d33ca9461de00ceec74f0d7ad5b69f0b38ae7`
(`fix(overlays): clean showcase and complete drawer geometry`).

Implemented:
- `ErpOverlayPosition` now includes `top`;
- default modal motion is `flip-x / flip-x`;
- top drawer defaults to `slide-down / slide-up`;
- existing start/end and bottom drawer defaults remain intact;
- OverlayHost positions top drawers at the top and gives top/bottom drawers full
  inline size;
- `ErpOverlayFrame` host + frame fill available full-height drawer surfaces;
- Header stays at start, Footer stays at bottom/end, Body uses the flexible
  scrolling grid row;
- new `--honesty-overlay-frame-separator-color` maps to
  `--honesty-border-default` and feeds both Header-bottom and Footer-top
  separator borders for Light/Dark visibility;
- `/controls/overlays` now has only four review groups:
  Modal, Drawers, Nested stack, and dismissal/backdrop/blur/motion policies;
- repeated Date/Time/DateRange, selection picker, RadioGroup/ButtonGroup,
  SplitButton, and FabMenu showcase evidence was removed from this route;
- top-drawer review evidence was added.

Test checkpoint:
`11532bd6d1589eaab43a012ce687f7be923cae61`
(`test(overlays): cover overlay-only page and four drawer edges`).

Governance/documentation checkpoint:
`f5e1d7ebcb79c4f76e98b918380843d877f6edec`
(`chore(overlays): govern top drawer and overlay-only review`).

Governance now protects:
- exact Overlay position union including top;
- `flip-x` modal default;
- top drawer geometry/motion;
- Overlay separator token;
- full-height Header/Body/Footer frame law;
- Overlay-only review-page scope with no duplicated Input/control demos.

Pre-rerun checks:
- Overlay governance JavaScript syntax compilation PASS;
- complete Overlay governance internal self-test PASS.

### Current status

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

The previous 87/87 files / 653/653 tests Fully Green checkpoint predates this
Overlay correction and must not be applied to the new source until the full
canonical gate passes.

After technical green, Product Owner runtime review must confirm the five
findings above in Light and Dark.
<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_END -->


<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_START -->
## 2026-10-01 — Overlay-only page verification follow-up: public review ownership relocated

Product Owner pulled:
`bfbdc9d3d2d7cf70cc82511d0a075ea8ea0c03f2`
and ran the full canonical gate:
`npm run verify:clean`.

Observed progress:
- theme authority PASS;
- route-page ERP-only authoring PASS;
- Component Token framework PASS;
- system-color registry PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField governance then stopped before ErpOverlay/ng lint.

Exact demonstrated cause:
`PROGRAM_PUBLIC_CONTROLS` in
`tools/controls/check-erp-field-governance.mjs` still mapped twelve public
controls to the old Overlay showcase even though Product Owner had explicitly
made `/controls/overlays` Overlay-only.

The stale ownership affected:
- DateBox / TimeBox / DateTimeBox / DateRangeBox;
- ColorPicker / IconPicker / ItemPicker / ComboBox;
- RadioGroup;
- ButtonGroup / SplitButton / FabMenu.

Bounded correction:
- temporal + selection picker review ownership maps to
  `src/app/showcase/input-controls/input-controls.html`;
- RadioGroup review evidence was relocated into the existing Inputs
  Boolean/Choice group;
- ButtonGroup / SplitButton / FabMenu review evidence was relocated into the
  Buttons showcase in one dedicated Button Composites group;
- ErpField inventory now maps those three button composites to the Buttons
  showcase;
- Overlay showcase remains free of all twelve controls and is not weakened by
  the governance correction.

Correction checkpoint:
`ae1d33d07bbb340690ba670a46553fc557f02d77`
(`fix(governance): relocate public control review ownership`).

Pre-rerun checks:
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- live HTML ownership audit:
  - all nine Input/selection controls present on Inputs;
  - all three button composites present on Buttons;
  - none of the twelve present on Overlays.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not restore duplicated controls to the Overlay page to satisfy inventory.
Review ownership must remain aligned to the control's actual production-review
page.
<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_END -->


<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: invalid Button showcase icon corrected

Product Owner pulled:
`c02dd33d32dfdcb2ec3029a11f578584b1b2dca8`
and reran:
`npm run verify:clean`.

Observed progress:
- all foundation/governance checks PASS;
- ErpField governance PASS;
- ErpOverlay governance PASS;
- Angular lint PASS;
- test bundle generation then stopped before test execution on one TypeScript
  template/compiler error.

Exact demonstrated failure:
`src/app/showcase/button-controls/button-controls.ts:98`

The newly relocated SplitButton/FabMenu showcase data used
`icon: 'table'`, but `table` is not an `ErpIconName` in the current
semantic registry.

Bounded correction:
- `619c5b3c3f0850567524d9c386a469fb18ac31de`
  `fix(showcase): use registered export icon`;
- replace only the invalid showcase icon `table` with registered semantic
  `download`;
- no production Button, SplitButton, FabMenu, Overlay, or Input runtime behavior
  changed.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not reopen the Overlay page ownership decision. Inputs/selection evidence
remains on Inputs, button composites remain on Buttons, and Overlays remains
Overlay-only.
<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: nested RadioGroup showcase count corrected

Product Owner reran the complete canonical gate after relocating public control
review ownership to Inputs / Buttons while keeping Overlays Overlay-only.

Observed result:
- all governance checks PASS;
- Angular lint PASS;
- test bundle generation PASS;
- Overlay showcase PASS;
- Button showcase PASS;
- Overlay host/frame/manager tests PASS;
- 86/87 test files PASS;
- 650/651 tests PASS;
- exactly one test failed in
  `src/app/showcase/input-controls/input-controls.spec.ts`.

Demonstrated cause:
- the Boolean/Choice showcase now contains four standalone `ErpRadioBox`
  controls plus one `ErpRadioGroup`;
- `ErpRadioGroup` correctly renders three internal `ErpRadioBox` children;
- the stale showcase test used
  `querySelectorAll('erp-radio-box').length === 4`, which counted both
  standalone and grouped RadioBoxes and therefore received 7.

Bounded correction:
- `9c56954e62231a29966ed78abb1662c8ef3c8124`
  `fix(test): distinguish standalone and grouped radios`;
- no production source changed;
- the test now explicitly asserts:
  - four standalone RadioBoxes outside any RadioGroup;
  - three RadioBoxes owned by the RadioGroup;
  - one RadioGroup review instance.

This keeps the relocated review ownership intact and tests the component
composition instead of flattening nested DOM ownership.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not move RadioGroup back to the Overlay page and do not weaken public-control
inventory governance.
<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_START -->
## 2026-10-02 — Overlay Header/Footer visibility is developer-configurable by API

Product Owner required developers to control whether the shared Header and
Footer are visually present for both modal and drawer surfaces through API
configuration only.

### Public API

`ErpOverlayFrameConfig` now exposes:

```ts
readonly showHeader?: boolean;
readonly showFooter?: boolean;
```

Defaults:
- `showHeader = true`;
- `showFooter = true`.

The flags are shared by both `kind: 'modal'` and `kind: 'drawer'`.

Header/Footer config objects remain required. Visibility is not configured by
consumer CSS, route-specific selectors, or content-side conditionals.

### Runtime behavior

Implementation checkpoint:
`e0cdb290355fe0b59f6560d960aea422445884b2`
(`feat(overlays): configure frame region visibility by API`).

Implemented behavior:
- OverlayManager normalizes both flags into the immutable runtime frame config;
- ErpOverlayFrame defaults missing flags to visible when instantiated directly;
- Header and Footer are conditionally rendered from the frame API only;
- frame grid rows adapt to Header-only, Footer-only, Body-only, and full
  Header/Body/Footer states;
- Body remains the persistent flexible content region;
- when Header is hidden, OverlayHost removes stale
  `aria-labelledby`/`aria-describedby` references and uses the configured
  Header title/subtitle directly through `aria-label` and
  `aria-description`;
- when Footer is hidden, configured Footer actions are not rendered.

The Overlay review route includes explicit API evidence for:
- modal without Header;
- modal without Footer;
- modal without Header or Footer;
- drawer without Header or Footer.

### Tests and governance

Test checkpoint:
`b8fe64407454a69f9353eee22b950c7d041065aa`
(`test(overlays): cover configurable frame regions`).

Governance/documentation checkpoint:
`d008cc17e56149edf37c1c810672b8ca7e2b480d`
(`chore(overlays): govern configurable frame regions`).

Coverage protects:
- default normalized flags are both true;
- explicit modal and drawer flag configurations;
- conditional Header/Footer rendering;
- adaptive grid state;
- hidden-Header accessibility fallback;
- Overlay showcase API evidence;
- API ownership through frame config rather than CSS.

Pre-verification checks:
- Overlay governance JavaScript syntax PASS;
- complete Overlay governance internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- final template/CSS/ARIA source audit PASS.

Current status:
**implemented / canonical verification pending**.

Mandatory next technical gate:
`npm run verify:clean`.

This requirement does not reopen the Overlay-only showcase ownership decision or
the current modal/drawer geometry contracts.
<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_END -->
