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

Current reviewed implementation/tooling checkpoint:

`ea43868cb98545c62b4173f854a6bec576dee48e` — `fix(tooling): finalize zero-warning verification`

The preceding tooling correction is `9afec19d133f9414ebd1fedd537f91637bf98db8` — `fix(tooling): eliminate build and editor diagnostics`.

The first-round functional correction remains `b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9` — `fix(review): resolve first-round showcase findings`.

The preceding Product Owner theme-authority preservation checkpoint is:

06ab7d326b6f2b6c5d6d863e2acefcc994b04b53 — fix(lab): inherit review pages from global theme

No additional implementation phase is authorized after that checkpoint until the Product Owner completes runtime/visual re-review and supplies the next page-by-page findings. Checkbox/RadioBox redesign, broad Light/Dark SCSS cleanup, and later unreviewed showcase work remain explicitly deferred.


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
