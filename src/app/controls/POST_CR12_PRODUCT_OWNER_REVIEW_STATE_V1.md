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

- The App root/top-bar control is the sole runtime theme authority.
- Exactly one runtime `data-theme` binding is authorized:
  `[attr.data-theme]="theme()"` in `app.html`.
- `app.ts` owns the Lab theme signal, persistence, preview propagation, and
  `toggleTheme()`; no lower page/component owns a competing state.
- Routed pages, production controls, review internals, popups, and overlays
  inherit the active App theme and must not author/bind/document local
  `data-theme`, read an ancestor `data-theme`, or carry Light/Dark in
  component/overlay data.
- Preferences no longer exposes or persists a Theme setting. Existing storage
  documents that contain the old `theme` key are migrated by removing that
  key only and preserving the remaining ten preference values.
- Foundation semantic mapping sources
  `src/styles/foundation/themes/_light.scss` and `_dark.scss` remain
  legitimate centralized system definitions. They are not page/component
  authorities.
- Theme-sensitive review pages now show one current inherited-theme context;
  the Product Owner uses the single top App theme button to review the same
  evidence in Light and Dark.
- `theme-authority:check` is part of `npm run lint` and statically prevents
  lower-level theme authority from returning.
- Historical Product Owner attribute removals remain preserved in
  `06ab7d326b6f2b6c5d6d863e2acefcc994b04b53`.

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
- Unrelated visual SCSS refactoring remains deferred; local page/component Light/Dark theme authority is no longer deferred and is prohibited by governance.
- Remaining showcase pages not yet reviewed page-by-page remain outside the current correction authorization.
- The previously reported component-style budget warnings are resolved by source stylesheet partitioning while retaining the existing 4kB/8kB `anyComponentStyle` warning/error thresholds; the budget was not raised to hide violations.
- The previous `html2canvas` CommonJS warning is resolved by consuming the package's ESM distribution entry with a local type declaration; no CommonJS allow-list suppression was added.
- Angular Language Service `ErpOverlayFrame` template-member diagnostics are resolved by making the template-consumed frame members public; runtime behavior is unchanged.
- TypeScript editor `rootDir` diagnostics are resolved explicitly in both `tsconfig.app.json` and `tsconfig.spec.json`.
- Repository verification now includes `typecheck:app`, `typecheck:spec`, and a cross-platform `build:clean` gate that fails if Angular emits a build warning.
- Hosted GitHub CI/status evidence is still absent; local verification remains required after pulling.

## Next authorized action

No additional implementation phase is authorized at this checkpoint.

The next authorized action is Product Owner page-by-page runtime/visual re-review of the corrected pages, beginning with the same first-round surfaces and then continuing to later showcase screens only when the Product Owner chooses to proceed.

Until new Product Owner findings are supplied, do not:

- start a new public component family;
- redesign Checkbox/RadioBox;
- perform the deferred broad Light/Dark SCSS cleanup;
- redesign later unreviewed showcase families;
- declare visual approval, family freeze, Basic Controls closure, or Wave B.


## Zero-warning tooling correction checkpoint

The tooling/diagnostic correction sequence is:

- `9afec19d133f9414ebd1fedd537f91637bf98db8` — `fix(tooling): eliminate build and editor diagnostics`
- `ea43868cb98545c62b4173f854a6bec576dee48e` — `fix(tooling): finalize zero-warning verification`

The final verification contract after the follow-up governance/gate synchronization is:

`npm run verify:clean`

It runs repository lint/governance, the full unit-test suite, application and
spec TypeScript no-emit checks, and a production build that fails if Angular
emits any warning marker.

This tooling correction does not change Product Owner visual approval state,
component-family freeze state, or authorize later page-by-page implementation.


### Review-select ErpText governance correction

Local verification at `e403fa73d96bdfe18bd8c2b4fa61e28eb5b3b43b`
did not complete successfully. `npm run verify:clean` stopped in
`erp-text:check` because the Design-Lab internal
`erp-review-select` rendered its field label and native option text outside
`ErpText` governance.

The correction checkpoint is:

`a2e1793faa489702dac4721d9ac1c3ec6c5b7d74`
— `fix(review): govern review select text with ErpText`

The corrected internal now:

- renders the visible field label through `ErpText`;
- keeps native `select/option` platform semantics inside the internal owner;
- supplies option display labels through the native option `label` attribute
  instead of an ungoverned rendered text node;
- adds a focused regression specification covering governed label rendering,
  selected native value, option labels, and absence of raw option text nodes.

The required next verification remains `npm run verify:clean`. This checkpoint
must not be called clean until that complete command passes locally.


### Field governance split-style correction

Local `npm run verify:clean` at
`b33bf273dfc0cb5b3785d041e87040e5c0041327` progressed through route-page,
Component Token, system-color, ErpText, ErpIcon, ErpButton, and ErpTooltip
governance, then stopped at `erp-field:check`.

External review confirmed the reported Glass and hit-area implementation
contracts still exist in the live FieldFrame style parts:

- Glass surface mix and semantic border/highlight consumption are in
  `field-frame-part-4.scss`.
- `.field-frame__value`, `flex: 1 1 auto`, and
  `inline-size: 100%` are in `field-frame-part-7.scss`.
- RTL-aware focus variables remain in `field-frame.scss`.

The failure was caused by the governance checker reading only
`field-frame.scss` after the zero-warning stylesheet partitioning. The
checker is corrected to derive and concatenate the component's actual
`styleUrls` from `field-frame.ts`.

The checker-only requirement for `pointer-events: none` on
`.field-frame__value` is removed because it was not part of the approved
runtime hit-area repair and applying it to the value wrapper risks disabling
the projected native editor/trigger subtree.

A fresh complete `npm run verify:clean` remains mandatory; this checkpoint is
not considered clean until the whole command passes.


### Review-select native-output lint correction

Local `npm run verify:clean` at
`f4c1a103f44a7272f3e5051fe21aeb9cd39b308f` passed all custom governance
checks, including ErpField and ErpOverlay, then stopped in Angular ESLint because
the Design-Lab internal `ErpReviewSelect` exposed an output named `change`.
That name collides with the standard DOM `change` event and violates
`@angular-eslint/no-output-native`.

The correction renames the component output to `selectionChanged`, keeps the
internal native `<select>` `change` event as the source event, migrates all
25 Preferences bindings, and extends the focused review-select regression test
to verify native-change forwarding through the renamed output.

A fresh complete `npm run verify:clean` remains mandatory before this
checkpoint can be called clean.


## Single App theme authority correction

The Product Owner explicitly superseded the earlier deferral of local
Light/Dark authority cleanup.

The commit containing this document performs the following bounded correction:

- fixes `ErpReviewSelect` initial selection by synchronizing projected native
  option selection with the component value;
- fixes `ErpText type="bdi"` so its owned native `<bdi>` receives the
  resolved direction;
- removes Theme from Preferences types, registry, UI, runtime state, and
  persisted settings;
- migrates the legacy persisted `theme` key without resetting the remaining
  preference values;
- removes theme capture/propagation from SplitButton's compact menu;
- removes page-local theme contexts from Charts, Colors brand evidence,
  Themes, Feedback Colors, Borders/Radius, Typography, Density, and Elevation;
- replaces affected docs chrome colors with semantic tokens where fixed
  Light-looking chrome would otherwise defeat inheritance;
- adds `theme-authority:check` to the lint gate.

Local verification evidence before this correction reached a clean lint and
governance result at `030a74bb6e6977ecca6d33a373ef806a93c35306`, then
the unit suite reported exactly two failures: ReviewSelect initial native
selection and Typography BDI direction. Both root causes are addressed by this
correction.

This revision is not considered fully verified until a fresh local
`npm run verify:clean` completes through tests, both TypeScript no-emit
checks, and `build:clean`. It does not declare Product Owner visual approval.
