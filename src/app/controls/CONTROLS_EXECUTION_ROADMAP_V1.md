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


<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_START -->
## 2026-10-02 — System Confirm Dialog service implemented on the blocking Overlay stack

Product Owner authorized one system-wide confirmation service built on the
existing blocking Overlay/Modal system.

### Product law

Every application confirmation dialog must use the shared
`ErpConfirmDialogService`.

Application code must not create a second Confirm modal subsystem, browser
`window.confirm`, direct Confirm internal content, or feature-local blocking
backdrops.

Confirmations invoked from inside an already-open Modal or Drawer must open as
a new top blocking Modal in the same `ErpOverlayManager` stack. The parent
surface remains mounted beneath it and resumes after the Confirm closes.

### Public API

`src/app/shared/confirm-dialog/confirm-dialog-contracts.ts`:

- `ErpConfirmDialogIntent = 'default' | 'warning' | 'danger'`;
- `ErpConfirmDialogConfig` exposes semantic confirmation inputs only:
  title, message, optional subtitle/details, labels, intent, and semantic icon.

`ErpConfirmDialogService.confirm(config)` returns `Promise<boolean>`:
- Confirm primary action -> `true`;
- Cancel / close / Escape / dismissal -> `false`.

Callers do not configure Overlay geometry, motion, Header/Footer visibility,
backdrop, or focus policy through the Confirm API.

### Fixed system policy

Every Confirm:
- kind = `modal`;
- position = `center`;
- size = `sm`;
- blocking = shared Overlay default `true`;
- Header = visible;
- Footer = visible;
- dismissOnEscape = `true`;
- dismissOnBackdrop = `false`;
- initial focus = Cancel action;
- restoreFocus/trapFocus = shared Overlay defaults;
- motion = current Modal default `flip-x`.

Intent mapping:
- default -> help icon + primary Confirm tone;
- warning -> warning icon + warning Confirm tone;
- danger -> error icon + danger Confirm tone + delete primary icon.

### Overlay action dependency

To support semantic Confirm intent without CSS workarounds,
`ErpOverlayActionConfig` now supports optional
`tone?: ErpButtonTone`.

OverlayManager normalizes action tone:
- Primary default -> `primary`;
- Secondary/Utility default -> `neutral`;
- explicit semantic tones such as `warning` / `danger` are preserved.

OverlayFrame passes that tone through the existing ErpButton / ErpIconButton
API.

### Implementation checkpoints

- `8f7cf03392eefb11e8c83e3fc2cbfd0afad21a3f`
  `feat(confirm): add system confirmation service`
- `aa90f0c7ede5018c80cedd5544528d7160ed5299`
  `test(confirm): cover system confirmation contract`
- `7d4affb3a61eee3b89fea490ae7454da17cd3e86`
  `chore(confirm): govern system confirmation usage`
- `a5118b5768c84896cb71e11a1ec94afe7502612f`
  `test(confirm): harden nested blocking confirmation evidence`
- `3eb04b160d3c9d5929300c896cc0eeb66e192ebe`
  `fix(governance): avoid Confirm method false positives`

### Review evidence

`/controls/overlays` remains Overlay-system-only, but now contains five
technical groups because System Confirm is itself an Overlay capability:

1. Modal;
2. Drawers;
3. System Confirm Dialog;
4. Nested stack;
5. dismissal/backdrop/blur/motion policy.

The Confirm review group exposes default, warning, and danger examples.

The existing nested blocking Overlay evidence also exposes a button that invokes
`ErpConfirmDialogService` from inside an already-open blocking surface.

No Date/Time/Input/Selection or unrelated Button composite demos were restored
to the Overlay page.

### Governance

New canonical lint stage:
`npm run erp-confirm:check`.

The checker protects:
- exact Confirm intent union;
- service-only system policy;
- fixed Modal/size/focus/dismissal behavior;
- semantic intent mapping;
- Confirm body ERP-primitives composition;
- required Overlay action tone support;
- Overlay showcase Confirm evidence;
- nested Confirm-from-blocking-Overlay evidence;
- no direct application import/use of `ErpConfirmDialogContent`;
- no browser `window.confirm` / `globalThis.confirm`;
- no native `<dialog>` alternative in application templates.

The browser-confirm rule was deliberately narrowed after dependency review:
Temporal and Selection picker internals legitimately own methods named
`confirm()`; governance must not confuse those business methods with browser
confirmation APIs.

### Pre-verification evidence

Current source audits:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField complete internal self-test PASS;
- actual Confirm source contract validation: zero errors;
- actual Overlay frame source contract validation: zero errors;
- repository search found no existing `<dialog>`, `window.confirm`, or
  `globalThis.confirm` usage.

The ErpButton checker syntax is valid; its self-test cannot be executed in the
minimal connector isolate because that checker depends on the imported Angular
template parser. The canonical local gate remains authoritative for it.

### Current technical state

**Implemented / canonical verification pending.**

The previous local run from `a1fe384...` reached all governance + Angular lint
PASS and then 86/87 test files / 650/651 tests before one stale nested RadioBox
count failed. That stale test was corrected in
`9c56954e62231a29966ed78abb1662c8ef3c8124`, but no later source — including
the configurable Overlay frame API and this System Confirm service — has yet
completed a fresh end-to-end `npm run verify:clean`.

Mandatory next technical gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_END -->


<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_START -->
## 2026-10-02 — System Confirm expanded: auxiliary actions, action results, Header tone, dismissibility

Product Owner expanded the system-wide Confirm Dialog contract.

### New Product Owner requirements

A system Confirm may contain:
- the primary Confirm action;
- optional auxiliary action 1;
- optional auxiliary action 2;
- Cancel when user dismissal is enabled.

The two optional actions must be developer-configurable as normal Buttons with
or without icons, or as IconButtons. The caller must receive a result that
identifies which button/action was pressed.

The Confirm Header background must accept system semantic tones such as
`info`, `danger`, `warning`, `primary`, etc.

The caller must also control whether the user is allowed to dismiss the Confirm.
When dismissal is disabled:
- Header Close is hidden;
- Cancel is not rendered;
- Escape dismissal is disabled;
- backdrop dismissal remains disabled.

### Public Confirm API

`ErpConfirmDialogConfig` now includes:
- `headerTone?: ErpOverlayHeaderTone`;
- `userDismissible?: boolean` (default `true`);
- `auxiliaryActions?: readonly ErpConfirmDialogAuxiliaryAction[]`.

`ErpConfirmDialogAuxiliaryAction` exposes:
- stable `id`;
- `label`;
- optional semantic `icon`;
- `presentation?: 'button' | 'icon-button'`;
- optional semantic Button `tone`;
- optional logical `placement?: 'start' | 'end'`.

Auxiliary action law:
- zero, one, or two actions only;
- IDs must be nonblank and unique;
- `confirm` and `cancel` are reserved;
- ordinary Button may omit an icon;
- IconButton requires an icon;
- defaults: Button presentation, neutral tone, logical-start placement.

### Result contract

The service no longer returns `Promise<boolean>`.

It returns:

```ts
ErpConfirmDialogResult =
  | {type: 'action'; actionId: string}
  | {type: 'dismissed'; reason: 'close' | 'escape'}
```

Button results:
- Confirm -> `actionId: 'confirm'`;
- Cancel -> `actionId: 'cancel'`;
- auxiliary action -> its configured ID.

Header Close and Escape return `dismissed` instead of pretending to be button
actions.

### User-dismissal law

`userDismissible=true`:
- Header Close visible;
- Cancel visible;
- Escape enabled;
- initial focus targets Cancel;
- backdrop remains non-dismissible.

`userDismissible=false`:
- Header stays visible;
- Header Close hidden;
- Cancel removed;
- Escape disabled;
- backdrop disabled;
- initialFocus is null so the shared Overlay focus fallback reaches the primary
  Confirm action when no body focus target exists.

### Overlay dependencies added correctly

The generic Overlay Header API now includes:
- `ErpOverlayHeaderTone = 'default' | ErpButtonTone`;
- `header.tone?: ErpOverlayHeaderTone`;
- `header.showCloseButton?: boolean`.

Both default without breaking existing overlays:
- tone -> `default`;
- showCloseButton -> `true`.

Header tones are Component-Token-driven:
- primary/secondary/accent -> theme-sensitive Brand subtle surfaces;
- success/warning/danger/info -> theme-sensitive Feedback surfaces;
- neutral -> elevated neutral surface;
- default -> existing transparent/default Header.

No raw palette colors or local theme selectors are introduced.

### Implementation checkpoints

- `6b311965d8c0ddfcd3c20c004e06a17b4eaa86df`
  `feat(confirm): add auxiliary actions and dismissibility controls`;
- `f8c5868bd844796260684d347afd4fda8ceae9fe`
  `fix(confirm): normalize actionless close result`;
- `a250c28204513400a0607a39d9d86b45a134185a`
  `test(confirm): cover rich actions header tone and dismissal policy`;
- `d88613ff826fb4aa4b948995736d14f63f237459`
  `chore(confirm): govern rich confirmation API`.

### Test coverage added/updated

Coverage now includes:
- default Confirm action result;
- Cancel action result;
- Header Close dismissed result;
- Escape dismissed result;
- warning/danger intent mapping;
- Header tone independent from intent;
- two auxiliary actions;
- normal Button with optional icon;
- IconButton auxiliary action;
- semantic tone + logical placement;
- pressed auxiliary action ID result;
- max-two enforcement;
- reserved/duplicate/blank ID rejection;
- IconButton-without-icon rejection;
- non-dismissible Confirm configuration;
- absence of Cancel;
- hidden Header Close;
- Escape no-op while locked;
- Confirm remains functional while locked;
- nested Confirm above both Modal and Drawer parents.

OverlayManager/OverlayFrame tests were updated for normalized Header tone and
close-button visibility, and the Overlay showcase now contains five Confirm
review examples: default, warning, danger, multi-action, and locked.

### Governance / pre-verification

Current pre-rerun evidence:
- ErpConfirmDialog governance JavaScript syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance JavaScript syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- ErpField complete internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

The canonical gate is still authoritative for Angular compilation, unit tests,
typechecks, SCSS compilation, build budgets, and zero-warning production build.

### Current state

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_END -->


<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_START -->
## 2026-10-02 — Product Owner Confirm Header contrast correction

Product Owner runtime screenshots showed that the current colored Confirm Header
used pale/subtle semantic surfaces. The result was visually weak and the
semantic Header icon/title treatment lacked sufficient contrast and emphasis.

Product Owner proposed that the Confirm Header use the same semantic color as
the primary Confirm button.

### Corrected law

For System Confirm, when `headerTone` is not explicitly supplied, Header tone
now follows the primary Confirm action tone:

- default Confirm intent -> `primary`;
- warning Confirm intent -> `warning`;
- danger Confirm intent -> `danger`.

The caller may still explicitly override `headerTone`, including
`headerTone: 'default'` to request the ordinary Overlay Header appearance.

### Solid Header mapping

Non-default Overlay Header tones now use the same **solid semantic background**
roles as solid system Buttons:

- primary -> Brand Primary solid;
- secondary -> Brand Secondary solid;
- accent -> Brand Accent solid;
- success -> Feedback Success surface-strong;
- warning -> Feedback Warning surface-strong;
- danger -> Feedback Danger surface-strong;
- info -> Feedback Info surface-strong;
- neutral -> inverse surface.

Foreground uses the corresponding on-solid/inverse role. Warning intentionally
uses the same foreground role as the system Warning Button.

### Complete contrast correction

Changing background alone is forbidden because that would leave child controls
on stale tones.

For every non-default colored Header:
- semantic Header icon uses inherited on-solid foreground;
- title uses inherited on-solid foreground;
- subtitle uses inherited on-solid foreground;
- Header Close IconButton switches from neutral Ghost to **Solid with the same
  semantic Header tone**, preserving on-solid icon contrast.

For the default Overlay Header, existing behavior remains unchanged:
- transparent/default background;
- primary title/icon;
- secondary subtitle;
- neutral Ghost Close button.

No raw palette values, consumer CSS overrides, or theme-specific local hacks
were introduced.

### Implementation checkpoints

- `f10191242d3572b6fa03bbec1f87c4079ce41e90`
  `fix(confirm): match Header contrast to solid action tone`;
- `865ff5f1dcabf78a2f02538e5ab8990d5297b092`
  `test(confirm): cover solid Header contrast contract`;
- `31ee219c15ae949752f59a426811ce79704675fb`
  `chore(confirm): govern solid Header contrast`.

### Tests / governance

Coverage now protects:
- System Confirm default Header tone equals its Confirm action tone;
- default / warning / danger mapping;
- colored Header semantic icon uses inherited foreground;
- title/subtitle use inherited foreground;
- Close uses solid presentation and matching semantic tone;
- default non-colored Header preserves previous primary/secondary/Ghost
  presentation;
- Overlay Header Component Tokens must use solid + on-solid semantic mappings,
  preventing regression back to pastel/subtle surfaces.

Pre-rerun evidence:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

### Current state

**Implemented / canonical verification pending / Product Owner runtime
re-review pending.**

Mandatory next technical gate:
`npm run verify:clean`.

After technical green, Product Owner must visually confirm the corrected solid
Headers and icon/text/Close contrast in Light and Dark.
<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_END -->
