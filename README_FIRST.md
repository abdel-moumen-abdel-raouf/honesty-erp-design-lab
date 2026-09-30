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
## 2026-09-30 — verify reached 648 tests; four stale-spec failures corrected

Product Owner reran `npm run verify:clean` from
`6ce541e5bcda43db181057b2e689c4dbf72f8746`.

Observed progress:
- all governance checks PASS;
- Angular lint PASS;
- test bundle generation PASS;
- 87 test files executed;
- result before correction: 83/87 test files PASS, 644/648 tests PASS;
- exactly four tests failed.

External source review determined all four were stale test expectations rather
than production regressions.

Bounded test correction checkpoint:
`1a6b29c1aa5dca36474c10eb40ef64492a65e595`
(`fix(test): align Inputs specs with validation contracts`).

Corrections:
1. ItemPicker:
   - update the old expectation `clearable() === false` to the approved
     Field-family default `true`.

2. UrlBox developer-pattern test:
   - unified validation governance requires `commitUserValue(value)`;
   - invalid editable drafts are committed as the current CVA value while
     validation marks them `invalid-entry`;
   - update the stale test to assert invalid `url.format`, then valid recovery.

3. TelBox developer-pattern test:
   - same non-destructive committed-draft law;
   - update the stale test to assert invalid `tel.format`, then valid recovery.

4. Temporal Now reveal test:
   - production `revealSelectedTime()` is unchanged;
   - clicking/rendering may schedule other UI animation frames;
   - test now drains the queued RAF callbacks and asserts the actual contract:
     selected hour/minute are revealed with exactly two `scrollIntoView` calls,
     rather than asserting global RAF exclusivity.

No production component code or product behavior changed in this correction.

Next mandatory action:
1. pull current `main`;
2. rerun complete `npm run verify:clean`;
3. correct only a newly demonstrated failure if the gate stops again;
4. if Fully Green, record the new verified checkpoint and resume Product Owner
   runtime + Light/Dark Inputs re-review.

Inputs remains Product Owner BLOCKED until acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->
