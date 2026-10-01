# README FIRST — HONESTY ERP Design Lab

Start every new ChatGPT or implementation-agent session by reading these files
in this order:

1. `NEW_CHAT_HANDOFF.md`
2. `AGENTS.md`
3. `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
5. `src/app/controls/CONTROLS_CORRECTION_PROGRAM_V1.md`
6. `src/app/controls/POST_CR12_REVIEW_WAVE_A_V1.md`

## Repository

GitHub: `abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Owner local workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Current state

The expanded Inputs correction and unified validation program is now implemented
in source/tests/governance on current `main`.

Current implementation checkpoint:
`c3971739198e61adff98d821a6b8f6775faa4e6c`

Implemented in this program:
- common ERP input semantic state:
  `null | empty | no-selection | invalid-entry | valid-entry`;
- common `valid`, `errors`, `validationIssues`, and validation snapshot;
- common `required` and external/server validation issue hook;
- Angular Forms Validator bridge from the same validation source of truth;
- exactly one `NG_VALIDATORS` provider required for every CVA ERP input;
- validation changes from non-committed drafts notify Angular Forms;
- Field-family `clearable` defaults on with per-instance opt-out;
- text/domain validation is non-destructive;
- URL/Tel keep invalid user text visible and publish domain errors;
- Number/Money/NumberStepper keep invalid drafts visible and publish
  format/min/max/step errors rather than silently clamping editable input;
- text-like max length is validation-only and does not truncate/block typing;
- File/Image expose min/max count, type, size, and rejected-attempt issues through
  the common errors contract;
- Ghost/Text/Underline have token-owned hover discoverability;
- RangeSlider uses one global coordinate domain for both native thumbs and rail;
- RangeSlider rail and Tooltip anchors share thumb-center geometry;
- active thumb Tooltip value is customizable and requests repositioning while
  the thumb moves;
- RangeSlider validation projects to danger state, aria-invalid, and visible
  feedback;
- Time/DateTime Now updates staged value and reveals selected hour/minute;
- DateRange uses rolling inclusive presets:
  آخر 7 أيام / 7 أيام بدءًا من اليوم / آخر 30 يومًا /
  30 يومًا بدءًا من اليوم;
- Date/Time/DateTime/DateRange expose common bounds/state validation;
- ColorPicker is instance-fixed to `system | free` and no longer has an
  internal mode switch;
- ItemPicker remains select-like while ComboBox remains editable type-to-filter;
- Design Lab evidence differentiates those contracts;
- governance self-tests protect the new validation, hover, RangeSlider,
  temporal, selection, SearchBox, and Angular-validator contracts.

Important verification distinction:
- current source is **implemented / verification pending**;
- do not call it Fully Green until a fresh complete `npm run verify:clean`
  passes from current `main`;
- Product Owner runtime/Light/Dark re-review is still required after technical
  green.

Latest prior Fully Green baseline remains:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Read `NEW_CHAT_HANDOFF.md` for the exact continuation state.


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
## 2026-10-01 — Product Owner Inputs runtime re-review: three bounded corrections implemented / verification pending

The previous Inputs technical gate was Fully Green before this runtime review:
- verified source/head: `a7ff2c25a3130491a75af9c11ba5ba52c570ff48`;
- verification record: `85ba7069fe45dbbdc03909c34cdad5b1f1d23ffc`;
- 87/87 test files and 648/648 tests PASS;
- app/spec typecheck PASS;
- zero-warning production build PASS.

That prior green state does **not** apply to the new corrections below until a
fresh complete `npm run verify:clean` passes.

### Product Owner runtime findings

1. Ghost/Text/Underline hover was visually discoverable in Dark but effectively
   invisible in Light.
2. Unified non-destructive validation had over-expanded character admission:
   URL, Tel, Number, Money, and NumberStepper editors could retain characters
   outside their intended domain.
3. Clear/Clear Selected actions inside shared modal/popup Overlay footers were
   text buttons; Product Owner requires IconButton + Tooltip.

### Root causes and bounded decisions

#### Lightweight Field hover
The Component Token used
`--honesty-color-surface-elevated` as hover tint. In Light,
`surface-default` and `surface-elevated` both resolve to white, so the hover
effect had essentially no visible contrast.

Correction:
- hover tint now uses theme-sensitive semantic
  `--honesty-color-text-primary`;
- mix is 8%;
- the same Component Token path works in both Light and Dark;
- no local theme branching was introduced.

#### Typed character admission vs validation
Non-destructive validation is clarified:
- reject characters that do not belong to the control domain;
- preserve admitted typed drafts when their value violates validation
  constraints.

Implemented:
- URL admits only progressive HTTP/HTTPS syntax; arbitrary prose/whitespace is
  rejected. Progressive incomplete drafts remain visible and invalid; CVA value
  is published only when empty or fully admitted by URL/domain pattern.
- Tel canonicalizes editing to optional one leading `+` plus ASCII digits
  only; spaces/letters/punctuation are removed. Canonical invalid-length or
  developer-pattern drafts remain visible and invalid until corrected.
- Number, Money, NumberStepper reject characters outside progressive numeric
  syntax.
- syntactically numeric values that violate min/max/step remain visible and
  invalid; no destructive clamp was reintroduced.

#### Overlay Clear presentation
Shared Overlay action contract now supports
`presentation: 'button' | 'icon-button'`.

Temporal `clear` and Selection `clear-selected` now:
- use semantic `delete` icon;
- render through `ErpIconButton`;
- are wrapped by `ErpTooltip` using the action label;
- preserve existing action IDs, ordering, disabled/loading state, and handlers.

OverlayManager normalization preserves and validates the presentation contract.
Overlay governance locks the Temporal and Selection Clear producers to this law.

### Implementation checkpoints

- `e7068b64df5b64b789dbc4d2b5f81648ad11d2e9`
  `fix(inputs): restore typed character admission`
- `b54c89c621dab914dda3555a5f8cf7ac0a48fd37`
  `fix(overlays): render clear actions as icon tooltips`
- `fead82d36c30533e575ab34ff41463f19ffa6848`
  `test(inputs): lock typed admission and theme-aware hover`
- `cade8015624c804d0be83bad5d2c49f126f5b906`
  `test(overlays): govern icon-only clear actions`
- `488741922c365a605acc9a70141f600278c46087`
  `fix(inputs): repair regex patch integrity`
- `65c097d224bb31f282ec5737ebc8381ed9f73b14`
  `chore(overlays): lock icon-only clear contract`

The regex/spec patch-integrity issue was detected during ChatGPT source review
before Product Owner was instructed to pull the new source; the affected files
were replaced with clean complete versions at `4887419...`.

### Current status

**Implemented / verification pending.**

Mandatory next gate:
`npm run verify:clean`

Do not declare this new source Fully Green until that complete gate passes.

After technical green, Product Owner re-tests only these three runtime findings:
- Ghost/Text/Underline hover in Light and Dark;
- typed admission + validation behavior for URL/Tel/Number/Money/NumberStepper;
- Clear/Clear Selected IconButton + Tooltip in shared picker overlays.

No unrelated redesign or later family work is authorized.
Inputs remains Product Owner BLOCKED until runtime acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->
