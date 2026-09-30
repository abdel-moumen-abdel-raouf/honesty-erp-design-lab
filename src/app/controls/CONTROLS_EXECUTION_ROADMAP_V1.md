# Honesty ERP — Controls Execution Roadmap V1

## Authority

This roadmap starts from committed SHA:

`ffc71f4c68cca00044b1c69faa9256afb5e927ef`

Each phase runs the complete repository build, lint/governance, test, and diff
gate; creates exactly one commit with the prescribed message; pushes that
commit to `origin/main`; records progress; and then advances to the next phase.

The roadmap does not declare visual approval, close Basic Controls, or freeze a
family. Those decisions remain with the Product Owner and ChatGPT after review.

## Canonical Classification

Internal nonvisual foundation:

- frozen `ErpInputBase<TValue>`

Internal Field Family foundation:

- `ErpFieldBase<TValue>`
- `ErpFieldFrame`
- `ErpFieldFeedback`
- `ErpFileSelectionBase`

Field Entry Basic Controls:

- `ErpTextBox`
- `ErpTextAreaBox`
- `ErpPasswordBox`
- `ErpSearchBox`
- `ErpUrlBox`
- `ErpTelBox`
- `ErpNumberBox`
- `ErpMoneyBox`

Numeric Interaction Basic Controls:

- `ErpNumberStepper`
- `ErpRangeSlider`

Boolean/choice Basic Controls:

- `ErpCheckBox`
- `ErpRadioBox`

File/Image Basic Controls:

- `ErpFilePicker` — multi-file V1
- `ErpImagePicker` — multi-image V1

Overlay-backed selection Composites:

- `ErpDateBox`
- `ErpTimeBox`
- `ErpDateTimeBox`
- `ErpDateRangeBox`
- `ErpColorPicker`
- `ErpIconPicker`
- `ErpItemPicker`
- `ErpComboBox`

Other implemented Composites:

- `ErpRadioGroup`
- `ErpButtonGroup`
- `ErpSplitButton`
- `ErpFabMenu`

## Phase Program

### Phase 00 — Canonical roadmap/governance docs

Commit: `docs(controls): establish field and overlay roadmap`

Document canonical Field Family and Overlay governance, correct Input Family
classification, and add the authoritative Field, Overlay, and execution-roadmap
contracts. No runtime code.

### Phase 01 — Foundation backdrop effects

Commit: `feat(foundation): add backdrop effect contracts`

Add Reference backdrop-blur primitives, Semantic backdrop effect contracts,
required exports/contracts, and exact runtime-variable tests. No unrelated
Foundation change.

### Phase 02 — Field Core

Commit: `feat(controls): establish field family core`

Implement field contracts, `ErpFieldBase`, `ErpFieldFrame`,
`ErpFieldFeedback`, their Component Tokens, governance checker/self-test,
lint integration, specs, and internal-core showcase evidence where public
authoring is not required. No concrete TextBox except test harnesses.

### Phase 03 — Text Entry Family

Commit: `feat(controls): add text entry family`

Implement `ErpTextBox`, `ErpTextAreaBox`, `ErpPasswordBox`,
`ErpSearchBox`, `ErpUrlBox`, and `ErpTelBox`, with specialized Component
Tokens where required, specs, and expanded Light/Dark standard/glass input
showcase evidence.

### Phase 04 — Boolean / Choice Basics

Commit: `feat(controls): add checkbox and radio basics`

Implement `ErpCheckBox` and `ErpRadioBox` with tokens, specs, showcase, and
governance coverage. Do not implement `ErpRadioGroup` in this phase.

### Phase 05 — Numeric Family

Commit: `feat(controls): add numeric input family`

Implement `ErpNumberBox`, `ErpNumberStepper`, `ErpMoneyBox`, and
`ErpRangeSlider`. RangeSlider is dual-thumb, non-crossing, supports
`defaultRange` reset semantics and explicit RTL numeric-arrow tests.
NumberStepper remains a distinct scalar direct-entry and keyboard control.

### Phase 06 — File / Image Basics

Commit: `feat(controls): add file and image pickers`

Implement `ErpFilePicker` and `ErpImagePicker`, preserve the browser-native
filesystem security boundary, manage image-preview lifecycle, and add
specs/showcase/governance. The Primary Controls Correction Program later
supersedes the initial single-selection checkpoint with the shared immutable
multi-selection contract.

### Phase 07 — Overlay Foundation

Commit: `feat(overlays): establish blocking overlay system`

Implement the blocking Overlay System contract, Overlay Component Tokens,
Foundation effect-backed blur, exactly one application-level host, overlay
showcase evidence, nested stack/focus/scroll/inert/dismissal/reduced-motion/RTL
behavior, and governance. Do not implement temporal pickers in this phase.

### Phase 08 — Temporal Picker Family

Commit: `feat(controls): add temporal overlay pickers`

Implement `ErpDateBox`, `ErpTimeBox`, `ErpDateTimeBox`, and
`ErpDateRangeBox` through `ErpOverlayManager`. The browser-native picker
popup is not the main selection experience.

### Phase 09 — Selection Picker Family

Commit: `feat(controls): add overlay selection pickers`

Implement `ErpColorPicker`, `ErpIconPicker`, `ErpItemPicker`, and
`ErpComboBox` through `ErpOverlayManager`.

### Phase 10 — Deferred Composites

Commit: `feat(controls): add deferred control composites`

Implement `ErpRadioGroup`, `ErpButtonGroup`, `ErpSplitButton`, and
`ErpFabMenu` using the existing Button/FAB contracts without Button Family
regression.

### Phase 11 — Final governance/showcase consolidation

Commit: `chore(controls): consolidate controls governance and evidence`

Complete Field/Overlay governance coverage, synchronize roadmap documents to
the actual implementation, verify contract documentation, Component Tokens,
tests, Light/Dark showcase evidence, RTL-sensitive coverage, stale-name
elimination, Feature/Page authoring governance, and all checker self-tests.

This phase does not declare visual approval, Basic Controls closure, or a frozen
family.

## Final Technical Candidate Status

All Phase 00 through Phase 11 implementation deliverables are present in the
repository. The public controls have contract documentation, component-scoped
tokens where visual, unit coverage, and Light/Dark showcase evidence. Field,
Overlay, Text, Icon, Button, Tooltip, and Component Token governance gates cover
the implemented program.

This status records technical implementation only. It does not declare visual
approval, close Basic Controls, or freeze any family; those decisions remain
with the Product Owner and ChatGPT.

The Phase 00 through Phase 11 checkpoint is provisional and is now governed by
`CONTROLS_CORRECTION_PROGRAM_V1.md`. All known Phase 00–09 and shared
infrastructure corrections in that program must complete before new controls
are added. Detailed Phase 10/11 review remains deferred to a separate wave.

The Primary Controls Correction Program now supplies the authoritative
technical contracts for Overlay lifecycle/configuration, Field compatibility
and glass, specialized domains, SearchBox popup behavior, multi-file/image
selection, Boolean/Choice visuals, temporal range staging, generated system
colors, fixed IconPicker tiles, Arabic-first evidence, and their governance
checks. The public Phase 00–09 inventory retains implementation and unit-test
coverage.

This synchronization does not perform the deferred Phase 10/11 product review,
declare visual approval, freeze a family, or close the Basic Controls layer.

## Current Post-CR12 Product Owner Review State

The current page-by-page Product Owner review/execution state is authoritative in POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md.

Current fully verified technical checkpoint:

`b1b20585adcb272f17835ef8182935353a67d243` — `fix(tooling): close remaining zero-warning gaps`

This checkpoint includes the earlier single-App-theme and Windows-safe runner
corrections. The Product Owner's local `npm run verify:clean` completed
successfully through governance/lint, 87/87 test files (618/618 tests), both
TypeScript no-emit gates, and a zero-warning production build.

The preceding tooling correction is `9afec19d133f9414ebd1fedd537f91637bf98db8` — `fix(tooling): eliminate build and editor diagnostics`.

The first-round functional correction remains `b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9` — `fix(review): resolve first-round showcase findings`.

The preceding Product Owner theme-authority preservation checkpoint is:

06ab7d326b6f2b6c5d6d863e2acefcc994b04b53 — fix(lab): inherit review pages from global theme

No additional product implementation phase is authorized until the Product Owner completes runtime/visual re-review and supplies the next page-by-page findings. Checkbox/RadioBox redesign and later unreviewed showcase work remain deferred. Local Light/Dark theme authority cleanup is explicitly authorized, completed in the current correction, and protected by a lint governance gate.


### Current verification gate

Zero-warning verification is part of the current repository gate. The canonical
local command is `npm run verify:clean`, which covers lint/governance, unit
tests, application/spec TypeScript no-emit checks, and a production build that
fails on emitted Angular warnings. Component-style budget thresholds remain at
4kB warning / 8kB error; they were not increased to suppress warnings.


### Review-select ErpText governance correction

The zero-warning/clean verification sequence found one additional governance
failure in the Design-Lab-only `erp-review-select` internal. It was corrected
at `a2e1793faa489702dac4721d9ac1c3ec6c5b7d74`
(`fix(review): govern review select text with ErpText`).

Current verification is not considered complete until a fresh local
`npm run verify:clean` passes from this checkpoint or a later fast-forward
checkpoint.


### Field governance split-style correction

After stylesheet partitioning, `erp-field:check` must validate the complete
FieldFrame `styleUrls` set rather than only `field-frame.scss`. The
governance checker now derives those style files from component metadata and
validates the concatenated runtime contract. It does not require
`pointer-events: none` on `.field-frame__value`, because that rule is not
part of the approved full-surface interaction implementation and can interfere
with projected editor/trigger interaction.

The next gate remains a full local `npm run verify:clean`.


### Review-select native-output lint correction

Angular ESLint correctly rejected the Design-Lab `ErpReviewSelect` output name
`change` because it collides with a standard DOM event. The internal output is
renamed to `selectionChanged`, all Preferences consumers are migrated, and the
focused regression test verifies forwarding from the native select's change
event.

The next gate remains a full local `npm run verify:clean`.


### Single App theme authority checkpoint

The Product Owner requires the App root and its top theme button to be the only
runtime Light/Dark authority.

The current correction removes local theme authority from pages, Preferences,
components, compact-menu overlay data, and review contexts. All lower UI
inherits the App root's semantic token resolution. Central Foundation
`_light.scss` / `_dark.scss` mappings remain the system implementation and
are not local authorities.

The repository lint gate now begins with `theme-authority:check`, which
requires exactly one App-root `data-theme` binding and rejects child
`data-theme` authoring, local Theme state/settings, ancestor theme reads, and
component SCSS branching on `[data-theme]`.

The same checkpoint fixes the two unit-test root causes reported after the
clean lint run at `030a74bb6e6977ecca6d33a373ef806a93c35306`:
ReviewSelect projected-option selection and ErpText-owned BDI direction.

A fresh local `npm run verify:clean` is the next mandatory gate.


### Windows zero-warning runner correction

Local verification at `ce103d77bd5f7268416f9889d84c684f4d8e565c`
passed lint/governance, 87/87 test files (618/618 tests), and both TypeScript
no-emit checks. The final wrapper failed before starting Angular build because
Windows rejected direct `spawnSync('npm.cmd')` with `EINVAL`.

The build gate now invokes npm through its JavaScript CLI using
`process.execPath + npm_execpath`, with a `ComSpec` fallback. Warning
detection remains release-blocking. A fresh `npm run verify:clean` is the
next mandatory gate.


### Final zero-warning budget and detector correction

At `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`, all governance/lint gates,
87/87 test files (618/618 tests), and both TypeScript no-emit gates passed.
Angular production build completed with exactly two remaining style-budget
warnings: Colors 4.08 kB and Status Hues 4.99 kB.

The approved budgets are unchanged. Generated color-ramp CSS is partitioned
into smaller style parts, Status Hues docs chrome uses semantic tokens, and the
zero-warning detector strips ANSI before matching warning output.

A fresh local `npm run verify:clean` is mandatory.


### Fully Green local verification

The current technical correction round is fully green locally at
`b1b20585adcb272f17835ef8182935353a67d243`.

Verified evidence:

- all lint/governance gates pass;
- 87/87 test files and 618/618 tests pass;
- application/spec TypeScript no-emit gates pass;
- standalone and final production `build:clean` pass with no warnings;
- the zero-warning wrapper self-test passes;
- final `Zero-warning build gate: PASS`.

No additional technical correction phase is authorized from this gate alone.
The next authorized action is Product Owner runtime/visual review.


### Next authorized execution — remove iframe preview architecture

The fully green technical gate is complete. The Product Owner has now
authorized one bounded structural correction to the Design Lab shell:

- eliminate the iframe preview architecture;
- remove embedded/direct dual-mode code and iframe-specific query parameters;
- render all review routes directly through one router outlet;
- remove the Inputs/Overlays special-case rendering distinction;
- attempt to preserve screenshot only if direct single-document capture remains
  clean;
- attempt to preserve Desktop/Tablet/Mobile review controls only if their
  behavior is technically truthful without an iframe;
- otherwise remove those optional tools rather than preserve misleading
  behavior.

No unrelated component redesign or new public component family is authorized in
this execution unit.

After implementation, the complete `npm run verify:clean` gate is required,
followed by Product Owner visual/runtime review.


### 2026-09-29 — no-iframe shell correction implemented; verification pending

The bounded Product Owner-authorized structural correction has been implemented:
- source removal: `9471a1d5b05a5f49c767b26e3a36b6b640715e0a`;
- markup cleanup: `d703ef0c8f47264902ca55b902c1488f99b56bf9`.

Result:
- single-document App;
- one router outlet;
- one OverlayHost;
- no iframe or embedded/direct split;
- no responsive preview controls;
- screenshot remains direct and names files with current Light/Dark theme.

This does not authorize a new control phase and does not equal visual approval.

The next mandatory gate is `npm run verify:clean`. Until it passes, keep `b1b20585adcb272f17835ef8182935353a67d243` as the latest Fully Green source checkpoint.


### 2026-09-29 — Tooltip V1 correction is the next blocking execution unit

Page-by-page review is paused at Tooltip V1.

The next authorized planning scope is limited to Tooltip anchored geometry,
arrow/motion assembly, deterministic collision fallback, scroll/resize tracking,
semantic layer proof, Tooltip tests, and the motion-selector review evidence.

Do not advance to another Design Lab page before Product Owner runtime re-review
of the corrected Tooltip.


### 2026-09-29 — Tooltip positioning correction implemented; verification/re-review pending

Implementation checkpoint:
`7a0a14f090ee38df3ea4adc02255856d89b6c71a`

The authorized correction now enforces:
- Zoom enter / Zoom exit as system Tooltip defaults;
- body+arrow shared motion ownership;
- preferred/opposite/perpendicular collision fallback;
- canonical arrow geometry across all directions;
- scroll/resize anchoring;
- semantic overlay layer governance;
- fully visible wrapped motion-preset Design Lab evidence.

Next gates, in order:
1. fresh `npm run verify:clean`;
2. Product Owner Tooltip Light/Dark runtime re-review;
3. only after Tooltip acceptance may page-by-page review continue.

  
### 2026-09-29 — verification stopped on stale Overlay governance; checker corrected

Local `build:clean:self-test` and `build:clean` passed after the Tooltip
correction, including `Zero-warning build gate: PASS`.

The first full `verify:clean` attempt passed Tooltip governance and stopped in
Overlay governance because that checker still required removed iframe-era App
contracts. This was tooling drift.

Correction:
`a40ea25011cd19b8e6db9945ef80f6796a9c6c0c` —
`fix(governance): align overlay gate with no-iframe lab`.

Next mandatory gate: rerun the complete `npm run verify:clean`.


### 2026-09-29 — verify:clean advanced to lint; one test lint correction applied

All governance gates shown in the Product Owner log passed, including Tooltip and Overlay.
The gate stopped at one ESLint `@typescript-eslint/array-type` violation in
`anchored-overlay-controller.spec.ts`.

Fixed by:
`3eb993e64616362bf920284e37b5005d412fd531`.

Next mandatory gate remains the complete `npm run verify:clean`.
Do not reopen implementation scope unless the rerun demonstrates another concrete failure.


### 2026-09-29 — Tooltip/no-iframe branch is Fully Green

The Product Owner completed `npm run verify:clean` successfully at:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting checkpoint:
`3eb993e64616362bf920284e37b5005d412fd531`.

Evidence:
- all lint/governance PASS;
- 87/87 test files PASS;
- 615/615 tests PASS;
- app/spec TypeScript no-emit gates PASS;
- final zero-warning production build PASS.

Technical correction program is green again.

Next authorized action is not another implementation family:
**Product Owner runtime re-review of Tooltip V1.**
Do not continue page-by-page review past Tooltip until Product Owner accepts it.


### 2026-09-29 — Tooltip cross-axis arrow centering correction pending verification

New Product Owner runtime finding:
- side arrows were vertically biased;
- top/bottom arrows were horizontally biased.

Implemented by:
`632f45a5fb7b42eefa09da0d2c8a20c0f520244b`.

The correction makes safe-inset fallback symmetric and positions the arrow from
an exact cross-axis center with a 50% translation.

Next gates:
1. full `npm run verify:clean`;
2. Product Owner Tooltip runtime Light/Dark re-review;
3. only then may page-by-page review continue.


### 2026-09-29 — Tooltip Popover padding origin correction

Product Owner confirmed the prior centering change did not alter the visible
offset. Source review identified native Popover padding as the remaining
coordinate-origin mismatch between the fixed geometry surface and the inner
motion/arrow assembly.

Correction:
`84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0` —
`fix(tooltip): align popover and arrow coordinate origins`.

Next gates:
1. full `npm run verify:clean`;
2. Product Owner runtime re-test of top/bottom/start/end;
3. only after visual acceptance may later page review resume.


### 2026-09-29 — Inputs page blocking review opened

Product Owner opened a blocking `/controls/inputs` review.

Authoritative findings:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

No implementation is authorized merely by documenting this review.

Before Inputs can pass, correction must cover:
- SearchBox three-mode architecture, functional filtering/selection, width,
  explicit close, focus/hit behavior, and correct semantics;
- Arabic-digit MoneyBox evidence without duplicating formatter logic;
- temporal quick actions;
- staged-selection Confirm disable law across selection and temporal pickers;
- Inputs review-layout cleanup and Arabic/localized temporal empty-state copy.

After implementation: run full `npm run verify:clean`, then Product Owner
Light/Dark/runtime re-review.


### 2026-09-29 — Inputs correction implemented; verification pending

Latest source checkpoint:
`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

The blocking Inputs correction unit is implemented across SearchBox,
selection/temporal picker confirmation state, temporal quick actions, MoneyBox
digit evidence, review layout, localization, tests, and governance.

Next gates, in order:
1. `npm run verify:clean`;
2. correct only demonstrated failures if any;
3. Product Owner runtime/Light/Dark Inputs re-review;
4. do not mark Inputs PASS until Product Owner acceptance.


### 2026-09-29 — Inputs verify follow-up: raw result button removed

The first `verify:clean` attempt for the Inputs correction stopped at
`erp-button:check` on a raw SearchBox result button.

Fixed by:
`cf91967291961037dd7f35d0e825fc4fb2da8312`.

Search results now use approved `ErpSelectionTile` list presentation.

Next mandatory action:
rerun the complete `npm run verify:clean`.
Only demonstrated follow-up failures may reopen implementation.


### 2026-09-29 — Inputs verify reached tests; six harness failures corrected

The full verify run passed all governance/lint and reached tests.

Result:
- 84/87 test files;
- 620/626 tests;
- six failures caused by missing test change-detection/bubbling after the new
  staged-confirm and SelectionTile contracts.

Correction:
`92840de9c670edd32b05c1485f50c2e61e68fead` —
`fix(test): flush staged picker state before confirmation`.

No production source changed.

Next action:
rerun complete `npm run verify:clean`.


### 2026-09-29 — verify reduced to one app integration timing case

At `f8ab643...`, the gate reached 86/87 test files and 625/626 tests.

The last failure was a 5.2-second App integration test containing three lazy
route renders.

Fixed by:
`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

No timeout was raised and no production behavior changed.

Next action:
rerun complete `npm run verify:clean`.


### 2026-09-29 — SearchBox closed-dropdown hit/focus blocker corrected

Runtime re-test demonstrated that visible closure was not sufficient: native
Popover lifetime and delayed focus restoration could survive until exit timer
completion.

Fixed by:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`;
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

New law:
**SearchBox close releases native top layer and hit area immediately; timers may
only finalize bookkeeping and may never restore focus later.**

SearchBox review evidence now enables Clear.

Next:
1. fresh `npm run verify:clean`;
2. Product Owner reproduces the exact select-then-click-lower-field scenario;
3. verify Clear;
4. continue Inputs review only after acceptance.


### 2026-09-29 — exact SearchBox ghost-hit root cause corrected

The literal defect was not delayed teardown. It was the base CSS declaration:

`.search-box__popup { display:grid; }`

on a native Popover.

Closed Popover visibility depends on native `display:none`; author
`display:grid` kept the closed surface rendered while opacity made it appear
gone.

Fixed in:
`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

New mandatory law:
- base SearchBox Popover rule must not set display;
- `display:grid` only under `:popover-open`.

Next:
1. full `npm run verify:clean`;
2. exact Product Owner runtime reproduction;
3. only after acceptance continue Inputs review.


### 2026-09-29 — next Inputs correction scope

Next implementation unit must cover:
- URL/Tel non-destructive validation + automatic feedback;
- Field clearable default on with opt-out;
- Ghost/Text/Underline hover state;
- RangeSlider shared-coordinate geometry + active thumb Tooltips;
- Time/DateTime Now scroll/reveal;
- rolling 7/30-day DateRange presets;
- ColorPicker per-instance system/free mode;
- Design Lab distinction between ItemPicker and ComboBox.

No source implementation in this documentation turn.


### 2026-09-29 — add unified ERP Input validation substrate before remaining Inputs fixes

Before duplicating additional domain-specific corrections, introduce the common
validation substrate defined in:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Implementation sequence:
1. common InputBase state/validation issue model;
2. common required + external issue hooks;
3. typed validation hooks in FieldBase/control families;
4. migrate text/domain/numeric/selection/temporal/file/range controls;
5. make UI feedback/aria-invalid derive from the same validity source;
6. then finish URL/Tel, RangeSlider, temporal, ColorPicker, and picker review
   corrections against that substrate.


### 2026-09-30 — expanded Inputs correction program implemented

Implementation scope from the prior roadmap is complete in source/tests/governance:
- unified validation substrate;
- non-destructive URL/Tel/numeric validation;
- default clearability with opt-out;
- Ghost/Text/Underline hover;
- RangeSlider geometry + moving Tooltips;
- Now reveal;
- rolling DateRange presets;
- ColorPicker fixed mode;
- ItemPicker/ComboBox evidence distinction;
- Angular Forms validator integration.

Next gates:
1. run full `npm run verify:clean`;
2. fix only demonstrated failures;
3. Product Owner runtime/Light/Dark re-review;
4. mark Inputs PASS only after Product Owner acceptance.


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
## 2026-09-30 — local verification follow-up: InputBase lint-only correction

Product Owner reran the canonical `npm run verify:clean` after the SearchBox
maxlength correction.

Observed progress:
- all governance checks PASS, including ErpField and ErpOverlay;
- Angular ESLint then stopped on exactly three unused formal parameters in
  `src/app/controls/input-family/input-base.ts`:
  `_changes`, `_control`, and `_value`.

Bounded correction:
- commit `e933a4b598c32cea949d61aaf31cb207c54e4b10`;
- retain Angular/common validation method signatures unchanged;
- explicitly consume the intentionally unused parameters with no-op `void`
  expressions;
- no validation logic, public API, runtime behavior, or visual behavior changed.

Next mandatory action:
1. pull current `main`;
2. rerun complete `npm run verify:clean`;
3. correct only a newly demonstrated failure if the gate stops again;
4. if Fully Green, record the new verified checkpoint and resume Product Owner
   runtime + Light/Dark Inputs re-review.

Inputs remains Product Owner BLOCKED until acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->
