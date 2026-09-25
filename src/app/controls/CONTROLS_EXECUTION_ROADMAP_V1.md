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

- `ErpFilePicker` — single-file V1
- `ErpImagePicker` — single-image V1

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

Implement single-file `ErpFilePicker` and single-image `ErpImagePicker`,
preserve the browser-native filesystem security boundary, manage image-preview
lifecycle, and add specs/showcase/governance. No multi-file queue or gallery.

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
