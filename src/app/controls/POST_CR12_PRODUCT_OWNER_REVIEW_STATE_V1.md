# Honesty ERP — Post-CR12 Product Owner Review State V1

## Authority

This document is the current execution/review state for the Product Owner's page-by-page review after CR12 and Post-CR12 Wave A.

It records Product Owner decisions, externally reviewed Git state, execution boundaries, and the next authorized action. It does not itself declare visual approval or freeze any component family.

## Current Git checkpoint

Externally reviewed baseline before this round:

a55c2782fb2a65cf913a5ab35c2ce3add3c5c94a — chore(overlays): consolidate motion and frame governance

Product Owner theme-authority preservation checkpoint:

06ab7d326b6f2b6c5d6d863e2acefcc994b04b53 — fix(lab): inherit review pages from global theme

First page-by-page correction checkpoint:

b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9 — fix(review): resolve first-round showcase findings

Overview ERP-only authoring checkpoint:

ce7404252902353ca2f7432ede9aeead2cb84053 — fix(overview): enforce ERP-only authoring

All routed pages ERP-only authoring checkpoint:

b96a6f70da6b232268b6e117c0307c0f23a50a36 — fix(lab): enforce ERP-only routed pages

GitHub ancestry was externally verified as two commits ahead of the reviewed baseline and zero commits behind. Both commits are present on main.

GitHub exposes no combined commit-status contexts and no workflow runs for these two commits. Hosted CI evidence is therefore absent. The implementation agent reported local build/lint/test/browser evidence; that report is evidence from the execution environment, not GitHub-hosted verification.

## First page-by-page Product Owner decisions

### Global theme authority

- The App-level data-theme is the single review/runtime Light/Dark authority.
- Review pages and production components inherit that authority.
- Page/component-local data-theme="light" or data-theme="dark" authority is not accepted.
- The 15 Product Owner local removals were preserved in the dedicated 06ab7d3 checkpoint before implementation.
- A broader audit/removal of Light/Dark-specific page/component SCSS is deferred to a later Product Owner review round.

### Overview

- The Overview must represent the current Design Lab review inventory rather than the obsolete pre-production Foundation-closure state.
- Implemented review surfaces are technical/review candidates only; their presence does not mean Product Owner visual approval.

### Routed page ERP-only authoring

- Every routed Design Lab page template resolved from `app.routes.ts` must author only `erp-*` tags.
- Native HTML/SVG/form elements are never authored directly in route-page templates.
- Native semantics required by accessibility or platform behavior are owned internally by approved ERP primitives/controls or Design-Lab-only `erp-review-*` ownership components.
- `erp-review-*` components are internal review authoring boundaries only and do not create public product component families.
- This rule is enforced by `route-pages:check`, which derives the active route templates from `app.routes.ts` and is part of the repository lint gate.

### ErpContainer

The production width contract remains:

- full — no max-width
- narrow — 48rem
- content — 75rem
- wide — 90rem
- gutter="page" and gutter="none" remain distinct

The Product Owner finding was primarily a showcase/evidence problem. The production width values are not reopened by this review round.

### Tooltip

- Short plain Tooltip content is centered.
- Rich informational/interactive content retains logical/start alignment.
- System Tooltip default enter motion is slide-up.
- System Tooltip default exit motion is also visually slide-up.
- Foundation motion semantics map slide-up enter to slideInUp and slide-up exit to slideOutUp.
- slide-down enter maps to slideInDown and slide-down exit maps to slideOutDown.
- Tooltip animation must not change the geometry measured by the anchored positioning system. Stable anchored geometry and transformed visual motion are separate responsibilities.

### SearchBox popup

- Popup mode remains nonblocking, anchored, backdrop-free, and independent of ErpOverlayManager.
- When viewport space permits, popup inline size is at least the trigger/field inline size.
- A configured maximum may limit expansion beyond the trigger but may not make a wide popup narrower than its trigger.
- The leaving popup must not intercept pointer input.
- The top SearchBox remains top of its local stack until leave completion.
- Close completion is deterministic and must fully remove native Popover top-layer participation.
- Closed-mode clear focus returns to the visible trigger rather than a hidden popup editor.

### Field feedback

A feedback surface below a field always has a caret pointing physically upward toward the field. RTL/LTR may change logical horizontal positioning but never reverse the caret orientation.

### Checkbox and RadioBox

- Public names remain ErpCheckBox and ErpRadioBox.
- Their current visual implementation is not the Product Owner's final design.
- Do not delete or redesign them until the Product Owner supplies the dedicated templates/references.
- Checkbox/RadioBox redesign is not authorized by this review checkpoint.

### Preferences, numeric display, and MoneyBox

- Existing Preferences remain the source of truth for digit and formatting choices; do not create a duplicate preference model.
- Both Latin and Arabic-Indic digits are supported.
- Money display follows existing digits.money, numberSeparators.money, and moneyDisplay preferences.
- Numeric CVA/model values remain numeric/canonical rather than becoming localized display strings.
- Applicable temporal display formatting consumes the shared Preferences source instead of uncontrolled locale side effects.

### FilePicker and ImagePicker

Selected files/images require restrained theme-aware hover and keyboard focus-within feedback using Component Tokens. This does not authorize HTTP upload, server progress, retry, or backend-policy behavior.

### Blocking Overlay shared frame

- Every user-facing blocking modal/drawer uses the shared Header/Body/Footer.
- Header title has stronger hierarchy than subtitle.
- Subtitle uses supporting/caption-level hierarchy.
- Header semantic icon is vertically centered and resolves to 2rem for this approved contract.
- Opening an Overlay must not automatically focus the close action merely because it appears first in DOM order; therefore the close Tooltip must not auto-open on Overlay creation.
- Default implicit initial-focus priority is meaningful body control, then primary confirmation action, then the surface, after any explicit initialFocus.

### Overlay footer

The shared footer is one developer-configurable ordered action surface rather than a hard-coded primary/secondary pair.

Each action owns a stable ID and supports:

- label
- optional semantic icon
- role: primary | secondary | utility
- logical placement: start | end
- disabled
- loading

ErpOverlayRef owns action handlers and reactive dynamic disabled/loading state. Action IDs are unique and labels are nonblank.

Temporal Today/Clear actions and Selection Clear Selected actions belong in the shared footer rather than duplicate body action rows.

A Clear/Clear Selected action is disabled when there is nothing staged to clear and enabled when staged content exists.

### ColorPicker

- System and Free modes remain.
- System is the default mode.
- System colors come from the generated authoritative Foundation registry.
- Each actual system-color swatch has a theme-aware semantic border so a swatch close to its surrounding surface remains visible in both Light and Dark.

### IconPicker

- Opening the picker does not create a false active/focus outline on the first icon merely because it is index zero.
- Selection options use one coherent roving-focus model.
- Fixed, equal tile geometry remains appropriate for IconPicker and color swatches.

### ItemPicker

Textual options are vertical list rows, not fixed square tiles. List rows own full available inline width, auto block height, logical/start alignment, hover/selected/focus/disabled states, and optional leading semantic icons.

### ComboBox

An enabled ComboBox opens the selection UI on:

- pointer interaction
- ArrowDown
- typing into a closed ComboBox

Typing preserves/seeds the entered query so the first character is not lost. The existing Overlay-backed selection architecture remains authoritative.

## First-round implementation checkpoint

The execution agent reported the following for b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9:

- 86 test files passed
- 626 tests passed
- lint/governance passed
- build passed
- initial bundle 385.02 kB
- estimated transfer 89.38 kB
- browser runtime exercised Overview, Structural, Buttons, Tooltips, Inputs, Overlays, and all eight blocking picker families at 1920x1080
- no requested deterministic acceptance criterion was reported unproven

External review confirmed Git ancestry and changed-file scope and spot checked the key production contracts for Tooltip motion, SearchBox lifecycle, generic Overlay footer/action state, Overlay initial focus, selection presentation/focus, ComboBox opening, and shared Preferences-backed MoneyBox.

The later ERP-only authoring review statically verified all 22 templates resolved from `app.routes.ts`: every authored element tag is `erp-*`, with zero route-template native HTML/SVG/form tags. Native semantics required by Charts, Preferences, and line/word-break review evidence are encapsulated by Design-Lab-only `erp-review-*` owners.

This is a technical implementation checkpoint only. Product Owner subjective visual re-review is still required.

## Open and deferred review items

- Product Owner must re-run the reviewed pages and visually accept/reject the first-round corrections.
- Checkbox/RadioBox visual redesign remains deferred until the Product Owner supplies the dedicated templates/references.
- Broader page/component Light/Dark-specific SCSS cleanup remains deferred.
- Remaining showcase pages not yet reviewed page-by-page remain outside the current correction authorization.
- Historical component-style budget warnings and the existing html2canvas CommonJS warning remain historical warnings; no budget threshold change is authorized solely to hide them.
- Hosted GitHub CI/status evidence is still absent.

## Next authorized action

No additional implementation phase is authorized at this checkpoint.

The next authorized action is Product Owner page-by-page runtime/visual re-review of the corrected pages, beginning with the same first-round surfaces and then continuing to later showcase screens only when the Product Owner chooses to proceed.

Until new Product Owner findings are supplied, do not:

- start a new public component family;
- redesign Checkbox/RadioBox;
- perform the deferred broad Light/Dark SCSS cleanup;
- redesign later unreviewed showcase families;
- declare visual approval, family freeze, Basic Controls closure, or Wave B.
