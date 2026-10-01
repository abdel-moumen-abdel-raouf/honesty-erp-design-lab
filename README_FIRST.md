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
## 2026-10-01 — latest Inputs Product Owner runtime findings implemented / canonical verification pending

Previous technical checkpoint:
- `707129dc8b0987eb270d0dc8350c3e5794d7303f` was Fully Green;
- 87/87 test files and 649/649 tests PASS;
- app/spec typecheck PASS;
- zero-warning production build PASS.

That green result predates the latest Product Owner findings and does not apply
to the new source until a fresh complete verification passes.

Latest Product Owner findings:
1. UrlBox must accept real web domains with optional HTTP(S) scheme and reject
   incomplete hosts such as `http://www.s`.
2. Solid must have the same Light/Dark hover discoverability guarantee as
   Ghost/Text/Underline.
3. NumberBox interactive editing must admit digits only while min/max/step remain
   validation concerns.
4. selected File/Image rows need a subtle hover/focus scale transition with
   reduced-motion cancellation.
5. SearchBox, ItemPicker, and ComboBox items/results must be runtime-dynamic and
   production-portable rather than Design-Lab-bound snapshots.

Implemented source/test/governance checkpoints:
- `9b13eab3c00046a3ed6258d981d33663355b26e0`
- `2912b97cb62ea159430bdca3f386814fa914698c`
- `98c3c8ccddc8812af57d8b6a429b9510e0151465`
- `5ec8124cb8ad483309d525bf558d41abb4252669`
- `b6974154a916ebb751eda5290c7bbc2a9bce704b`
- `eb3db0130db1786488b91e050f9d54168b28bbd3`
- `64edf72fe8c7655a98e52d98e910bf675629129b`
- `9ffa59e348b6246f1c8a210c01d437763b3a1f65`
- detailed Product Owner findings recorded at
  `4318b4898c3ef157627c58598507f76e83c9e758`.

Pre-rerun consistency work completed:
- combined source + dependent tests + governance + authoritative contracts
  reviewed as one correction unit;
- File/Image style-governance paths verified to target the actual selected-item
  style files;
- ErpField governance JavaScript syntax compilation PASS;
- complete internal ErpField governance self-test PASS;
- two self-test/governance weaknesses discovered during the pre-rerun review
  were corrected before asking Product Owner to run the canonical gate.

Current status:
**implemented / canonical verification pending**.

Exact next technical gate:
`npm run verify:clean`

If the gate stops, reopen only the first concrete demonstrated failure. If Fully
Green, the next product gate is Product Owner runtime re-test of the five
findings above.

Inputs remains Product Owner BLOCKED until runtime/visual acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->
