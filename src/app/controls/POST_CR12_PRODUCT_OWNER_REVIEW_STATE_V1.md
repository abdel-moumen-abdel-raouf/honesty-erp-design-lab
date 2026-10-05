# Honesty ERP — Post-CR12 Product Owner Review State V1

## Authority

This document is the current execution/review state for the Product Owner's page-by-page review after CR12 and Post-CR12 Wave A.

It records Product Owner decisions, externally reviewed Git state, execution boundaries, and the next authorized action. It does not itself declare visual approval or freeze any component family.

## Authoritative current review transition — 2026-10-06

Live `main` entered this transition at
`36fdd62f0b65ea9b137639f2b002640603f46525`
(`feat(controls): add accelerated data table batch`). Resolve newer continuity
and implementation commits directly from Git.

The Accelerated Core Batch, Phase A hardening, and Phase B Data/Table batch are
implemented and technically green. The Phase B canonical gate passed 110/110
test files, 778/778 tests, both typechecks, production build, and zero warnings;
initial bundle was 374.44 kB / 85.38 kB estimated transfer. None of those facts
implies Product Owner visual acceptance or freeze; grouped runtime/visual review
remains pending.

The Product Owner has explicitly opened exactly six Forms Composition owners:
`ErpForm`, `ErpFormSection`, `ErpFormActions`, `ErpValidationSummary`,
`ErpRepeater`, and `ErpStepper`. Persistent state normalization and reference
audit precede implementation. `StandardEntityForm`, Form Engine/schema, Entity
Wizard/patterns, SmartTable-adjacent application patterns, Shell,
Sidebar/Topbar, Navigation, Features/Pages, and every unlisted family remain
unopened.

After technical completion, the next gate is grouped Product Owner runtime and
Light/Dark visual review. Technical PASS never equals visual approval.

## Historical Git checkpoints — superseded snapshot

Externally reviewed baseline before this round:

a55c2782fb2a65cf913a5ab35c2ce3add3c5c94a — chore(overlays): consolidate motion and frame governance

Product Owner theme-authority preservation checkpoint:

06ab7d326b6f2b6c5d6d863e2acefcc994b04b53 — fix(lab): inherit review pages from global theme

First page-by-page correction checkpoint:

b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9 — fix(review): resolve first-round showcase findings

Current fully verified technical checkpoint:

`b1b20585adcb272f17835ef8182935353a67d243` — `fix(tooling): close remaining zero-warning gaps`

This checkpoint includes the single-App-theme correction and the final
style-budget / ANSI warning-detector repair. It is pushed to `main` and has
completed the full local verification gate successfully.

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

## Historical next action — superseded

No additional implementation phase is authorized at this checkpoint.

The full local `npm run verify:clean` gate has passed at
`b1b20585adcb272f17835ef8182935353a67d243`. The next authorized action is
Product Owner page-by-page runtime/visual re-review of the corrected pages,
beginning with the same first-round surfaces and then continuing to later
showcase screens only when the Product Owner chooses to proceed.

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


## Windows zero-warning runner correction

A local `npm run verify:clean` at
`ce103d77bd5f7268416f9889d84c684f4d8e565c` produced the following verified
evidence:

- `theme-authority:check` passed;
- all custom governance checks passed;
- Angular lint passed with zero warnings/errors;
- 87 test files / 618 tests passed;
- `typecheck:app` passed;
- `typecheck:spec` passed.

The only remaining failure occurred before Angular production build execution:
the zero-warning wrapper attempted `spawnSync('npm.cmd', ...)` with
`shell: false` on Windows and Node returned `EINVAL`.

The wrapper is corrected to execute the npm JavaScript CLI through
`process.execPath` when `npm_execpath` is available, avoiding direct
`.cmd` spawning. A Windows `ComSpec` fallback is retained only when
`npm_execpath` is unavailable.

The warning detector remains mandatory and still fails the gate when Angular
emits warning markers. A new `build:clean:self-test` verifies warning
detection, false-positive rejection, npm CLI invocation, and Windows fallback
resolution.

The repository is not declared fully clean until a fresh local
`npm run verify:clean` reaches `Zero-warning build gate: PASS`.


## Final zero-warning budget and detector correction

Local verification at `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`
proved the complete governance/lint/test/typecheck chain green:

- `theme-authority:check` passed;
- every custom governance check passed;
- Angular lint passed;
- 87 test files / 618 tests passed;
- `typecheck:app` passed;
- `typecheck:spec` passed.

The production build itself completed, but Angular still emitted exactly two
component-style budget warnings:

- `src/app/foundation/colors/colors.scss` — 4.08 kB, 80 bytes over the
  approved 4 kB warning threshold;
- `src/app/foundation/colors/status-hues/status-hues.scss` — 4.99 kB,
  985 bytes over the approved threshold.

The zero-warning wrapper then incorrectly printed PASS because Angular's
colored CLI output includes ANSI SGR escape sequences around the warning
marker. The copied terminal text hides those control characters, but the raw
child-process output still contains them.

This correction does not raise the 4 kB / 8 kB component-style budgets.
Generated swatch rules are split into dedicated, smaller style parts and the
root style files are reduced to root specimen chrome. Status Hues docs chrome
also moves from fixed Light-looking hex values to semantic theme tokens.

The wrapper now strips ANSI SGR sequences before warning detection and also
recognizes explicit budget/optimization warning phrases. Its self-test includes
the ANSI-colored warning form.

A fresh local `npm run build:clean:self-test`, followed by
`npm run build:clean` and finally `npm run verify:clean`, remains the
required proof. This checkpoint is not fully green until the build contains no
Angular warnings and ends with `Zero-warning build gate: PASS`.


## Fully Green local verification evidence

The Product Owner locally verified the repository after
`b1b20585adcb272f17835ef8182935353a67d243`.

Observed results:

- `npm run build:clean:self-test` — PASS;
- standalone `npm run build:clean` — PASS with no Angular warnings;
- `theme-authority:check` — PASS;
- `route-pages:check` — PASS for 22 routed templates;
- Component Token governance — PASS;
- system-color registry check — PASS;
- ErpText governance — PASS;
- ErpIcon governance — PASS;
- ErpButton governance — PASS;
- ErpTooltip governance — PASS;
- ErpField governance — PASS;
- ErpOverlay governance — PASS;
- Angular lint — PASS;
- test files — 87/87 PASS;
- tests — 618/618 PASS;
- `typecheck:app` — PASS;
- `typecheck:spec` — PASS;
- final production `build:clean` — PASS with no warnings;
- final `Zero-warning build gate: PASS`.

Technical gating for this correction round is therefore complete.

This evidence does not equal Product Owner visual approval. Remaining work is
runtime/visual inspection and any explicit Product Owner findings.


## Latest Product Owner decision — remove iframe architecture

This decision was made after the fully green local technical gate and is the
current next implementation target.

The Design Lab must stop using iframe-based route previews and become a normal
single-document Angular application.

Current implementation facts that motivated the decision:

- ordinary Foundation/showcase routes are rendered inside
  `#lab-preview-frame`;
- `/controls/inputs` and `/controls/overlays` are special direct-review
  exceptions and therefore do not receive the same Desktop / Tablet / Mobile
  controls;
- `app.ts` owns iframe-specific state/helpers including embedded-preview
  detection, preview URL construction, theme query propagation, direct-review
  route exceptions, and cross-document screenshot composition.

Product Owner requirements for the correction:

1. Remove the iframe architecture entirely.
2. Remove iframe-only query/state/branching and special direct-route handling.
3. Render every route directly through one normal `router-outlet`.
4. Re-evaluate Desktop / Tablet / Mobile controls:
   - retain them only if they can provide truthful responsive review without an
     iframe;
   - do not pretend that container width is equivalent to browser viewport media
     queries;
   - if truthful simulation is not possible, remove these controls.
5. Re-evaluate screenshot:
   - retain it only if direct single-document capture is clean and deterministic;
   - otherwise remove it.
6. Inputs and Overlays must use the same rendering model as every other route.
7. Preserve the single App theme authority and all existing governance gates.
8. Do not start unrelated visual redesign while performing this architectural
   simplification.

This decision is recorded but not yet implemented.

### Current stop point

Technical verification for the current source is fully green locally. The next
authorized task is repository review + bounded implementation of the no-iframe
Design Lab architecture described above.

Product Owner visual review remains pending after that structural correction.


## 2026-09-29 — no-iframe App shell implementation checkpoint

Product Owner authorized the previously documented no-iframe correction and ChatGPT implemented it directly on GitHub `main`.

Implementation commits:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a` — `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9` — `style(lab): normalize direct shell markup`

Implemented result:
- one direct router outlet for all routes;
- no iframe, embedded mode, direct-route exception, `labPreview`, or iframe theme propagation;
- Desktop/Tablet/Mobile controls removed because they cannot truthfully simulate viewport `@media` behavior inside the same document;
- Screenshot retained as direct same-document capture;
- screenshot filename now includes current theme (`light` / `dark`);
- one App theme authority and one OverlayHost retained;
- related iframe-only tests/styles/helpers removed or replaced.

Independent source review after the follow-up commit found no remaining iframe-specific identifiers in the touched App files, exactly one router outlet, exactly one OverlayHost, and no preview buttons.

Verification status:
- this is NOT yet a Fully Green checkpoint;
- last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`;
- mandatory next action is a fresh `npm run verify:clean`.

## 2026-09-29 — Structural Primitives visual review and screenshot-tool finding

Product Owner supplied full-page `/primitives/structural` screenshots in Dark and Light themes.

External visual review result:
- no blocking Structural Primitives page-specific defect is evident;
- ErpContainer, ErpStack, ErpInline, ErpGrid, ErpSurface, ErpSection, and ErpDivider evidence is coherent in both themes;
- no visible clipping, overlap, broken RTL flow, or page-layout instability was found;
- no Structural Primitives implementation correction is authorized from this evidence.

Global screenshot-tool finding:
- generated screenshots include transient capture-progress UI in the Design Lab utility bar;
- `جاري الالتقاط...` appears in the captured output and the screenshot button is captured in its in-progress state;
- current `captureScreenshot()` sets `isCapturing=true` and `statusMessage='جاري الالتقاط...'` before `html2canvas()` captures the full App capture root;
- this is a review-tool cleanliness defect, not a Structural Primitives component defect.

Recommended next action:
- correct screenshot capture so transient capture-progress UI is omitted from the generated PNG while normal on-screen feedback remains available;
- then resume page-by-page visual screenshot review.

This finding does not change technical verification state: the no-iframe source still requires a fresh `npm run verify:clean`; last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.


## 2026-09-29 — Typography Primitives page review

Product Owner explicitly deferred the screenshot capture-progress artifact as non-critical Design-Lab-only tooling; it must not block review progression.

Light/Dark full-page evidence for `/primitives/typography` was externally reviewed.

Result:
- no blocking typography-page defect found;
- semantic type defaults, size/weight/line-height evidence, tones/families/alignment, headings/blocks, inline semantics, data/list/table/form text, and direction/ruby/wrapping/overflow/link evidence are coherent across both themes;
- no correction task is opened from the supplied evidence.

Next visual-review action: continue to the next page selected by Product Owner.

This does not declare visual freeze or alter technical verification state.


## 2026-09-29 — Tooltip V1 blocking Product Owner finding

Product Owner has blocked further page-by-page review until Tooltip V1 positioning,
arrow, motion, fallback, scroll tracking, and layer behavior are corrected and
runtime re-reviewed.

Source review at `404b6393245707a922ca8da69c2cbc0e7a9708dd` confirmed:
- Tooltip arrow is rendered outside `.erp-tooltip__motion`, while Animate.css
  transforms only the motion layer; body and arrow can visually separate during motion.
- shared anchored-overlay geometry currently considers only preferred and opposite
  placements; perpendicular fallback is missing.
- Tooltip tokens currently use 16x8 arrow geometry for top/bottom and 8x4 for
  side placements; Product Owner now requires one canonical arrow size in every direction.
- scroll/resize/visualViewport/ResizeObserver reposition infrastructure exists,
  but acceptance coverage must prove actual trigger tracking and arrow alignment.
- Tooltip consumes the semantic overlay layer token; explicit layer/z-index
  acceptance coverage is required.
- the Design Lab motion selector horizontally overflows/clips, reducing reviewability.

Required correction contract:
1. fixed, untransformed geometry surface owns anchor/collision/layer;
2. one animated visual assembly contains BOTH tooltip body and arrow;
3. authored placement is preferred and is used whenever it fits;
4. fallback order is preferred -> opposite -> perpendicular candidates by room;
5. if none fully fits, select deterministically and clamp to visual viewport;
6. arrow stays attached, points to the trigger, follows resolved placement, and
   uses one canonical base/depth size for all directions;
7. reposition remains correct during scroll/resize and RTL/LTR;
8. no unrelated component redesign.

Tooltip V1 status: BLOCKED. Do not continue to another review page until the
bounded correction is implemented, verified, and Product Owner re-reviews it.


## 2026-09-29 — Tooltip blocking correction implemented

Product Owner authorized implementation of the Tooltip anchoring/collision/motion correction and set global defaults to `zoom` enter + `zoom` exit unless explicitly overridden per Tooltip.

Implementation:
`7a0a14f090ee38df3ea4adc02255856d89b6c71a` — `fix(tooltip): enforce anchored positioning contract`

Implemented:
- dedicated Tooltip positioning policy;
- arrow moved into the same animated visual assembly as Tooltip body;
- four-side deterministic collision/fallback law;
- perpendicular fallback before final clamp;
- canonical equal arrow geometry in all directions;
- strengthened scroll reposition coverage;
- explicit layer-token governance;
- global Zoom/Zoom defaults;
- wrapped motion-preset review evidence.

Current status:
- implementation source-reviewed on GitHub main;
- fresh `npm run verify:clean` is still required;
- Tooltip remains page-review BLOCKED until Product Owner runtime re-review;
- no later page review is authorized before Tooltip acceptance.


## 2026-09-29 — local verification attempt after Tooltip correction

Product Owner fast-forwarded local `main` to
`6a71c23e4ff001a9c8e51bd685ca233cc2fe83a4`.

Observed local evidence:
- `npm run build:clean:self-test` — PASS.
- `npm run build:clean` — PASS, ending in `Zero-warning build gate: PASS`.
- `npm run verify:clean` progressed successfully through:
  - single App theme authority;
  - route-page ERP-only authoring;
  - Component Token framework;
  - system-color registry;
  - ErpText;
  - ErpIcon;
  - ErpButton;
  - **ErpTooltip governance**;
  - ErpField.
- `verify:clean` then stopped in `erp-overlay:check`.

The failure was governance-tool drift, not an Overlay runtime regression and not
a Tooltip failure. The Overlay checker still required five iframe-era App-shell
strings that were intentionally removed by the Product Owner-authorized
single-document correction:
- `parameters.set('labTheme', theme);`
- special Inputs/Overlays direct-route branching;
- iframe toolbar/embedded screenshot composition.

Bounded tooling correction:
- `a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`
  `fix(governance): align overlay gate with no-iframe lab`

The corrected Overlay governance now enforces the current App-shell contract:
- one direct router outlet;
- one App capture root;
- App-owned theme and screenshot controls/evidence;
- direct single-document screenshot target;
- no iframe, `labPreview`, `labTheme` propagation, embedded/direct dual mode,
  viewport-preview controls, cross-document traversal, or iframe sanitizer types.

Its self-test fixtures now reject:
- reintroduced iframe markup;
- reintroduced iframe-era source state;
- missing direct router-outlet.

Verification status:
- the full `npm run verify:clean` has **not yet passed** after this tooling
  correction;
- a fresh rerun from `a40ea250...` or later is mandatory;
- do not declare a new Fully Green checkpoint until that rerun completes.


## 2026-09-29 — verification advanced through Overlay governance; lint-only blocker corrected

At `ea6a452f7fe37a8b12efde0515144202233d88ea`, Product Owner local evidence confirmed:
- Overlay governance self-test PASS;
- Overlay governance PASS;
- zero-warning build self-test PASS;
- zero-warning production build PASS;
- full `verify:clean` passed every governance check shown, including Tooltip and Overlay.

The full gate then stopped at Angular ESLint on one test-only `array-type` rule violation.

Correction:
`3eb993e64616362bf920284e37b5005d412fd531` —
`fix(test): satisfy array-type lint rule`

No production source behavior changed.

Next mandatory action: rerun the full `npm run verify:clean`.


## 2026-09-29 — new Fully Green technical checkpoint

Product Owner local verification completed successfully from repository HEAD:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting checkpoint in that checkout:

`3eb993e64616362bf920284e37b5005d412fd531`

Canonical `npm run verify:clean` completed through every stage:
- all governance checks PASS, including Tooltip and Overlay;
- Angular lint PASS;
- 87/87 test files PASS;
- 615/615 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- final `build:clean` PASS;
- final Zero-warning build gate PASS.

This replaces `b1b20585adcb272f17835ef8182935353a67d243` as the latest Fully Green technical baseline.

Technical blocker: NONE.

Product Owner review blocker:
- Tooltip V1 runtime Light/Dark acceptance remains mandatory before continuing
  to any later Design Lab page.


## 2026-09-29 — Tooltip arrow centering runtime defect corrected

Product Owner runtime evidence found the arrow cross-axis visibly off-center for
both side and vertical placements.

Root cause:
the canonical 16px arrow base plus 8px safe inset could produce an impossible
allowed center range on compact 24px Tooltip cross-axes. The previous generic
clamp selected the lower bound and introduced directional bias.

Correction:
`632f45a5fb7b42eefa09da0d2c8a20c0f520244b` —
`fix(tooltip): center arrow on trigger cross-axis`.

The implementation now uses symmetric effective-safe-inset reduction plus
center-coordinate + 50% CSS translation for all four physical placements.

Technical status:
- previous Fully Green checkout: `310b5afe8e6f018bb4d52f68be2986bbe2d31365`;
- latest source correction: `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`;
- fresh full verification required.

Product review status remains BLOCKED on Tooltip until re-review accepts the
corrected runtime evidence.


---

# 23. 2026-09-29 — TOOLTIP ARROW OFFSET ROOT CAUSE CORRECTED: POPOVER PADDING ORIGIN

Product Owner re-tested the previous cross-axis centering correction and reported
that the visible arrow offset was unchanged.

This invalidated the prior assumption that symmetric safe-inset clamping was the
main visible cause.

New source review identified the actual coordinate-space mismatch:

- arrow coordinates are calculated against `.erp-tooltip__surface`, the fixed
  native Popover geometry surface;
- the arrow now lives inside `.erp-tooltip__motion` so it can animate with the
  Tooltip body;
- the native Popover surface did not explicitly set `padding: 0`;
- native Popover user-agent padding can therefore offset the inner motion
  assembly from the outer geometry origin;
- a coordinate that is mathematically centered in the outer surface becomes
  visually shifted when applied inside the padded inner coordinate system.

This matches the Product Owner evidence:
- left/right arrows remain vertically biased;
- top/bottom arrows remain horizontally biased;
- prior center arithmetic changes did not materially alter the visible offset.

Source correction:
- `84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`
  `fix(tooltip): align popover and arrow coordinate origins`

Implemented:
- explicit `padding: 0` on `.erp-tooltip__surface`;
- geometry surface and motion assembly now share one physical coordinate origin;
- Tooltip governance requires zero surface padding;
- Tooltip unit coverage verifies top/right/bottom/left computed padding = 0;
- positioning policy and Tooltip V1 docs record the coordinate-origin invariant.

Important distinction:
- the prior symmetric safe-inset correction remains valid defensive geometry for
  compact Tooltips;
- it was not sufficient to fix the Product Owner's visible offset because the
  remaining offset came from mismatched coordinate origins.

Verification baseline:
- Product Owner supplied a complete successful local `npm run verify:clean`
  at checkout `50ae8e5f9f9cc537435217a644548c10bd097ecb`;
- that run passed 87/87 test files, 618/618 tests, both TypeScript no-emit gates,
  all governance/lint gates, and final zero-warning build;
- therefore `50ae8e5...` is the latest Fully Green verified checkout before
  the new `84d5fd9...` source correction.

Current status:
- `84d5fd9...` is implemented and source-reviewed but not yet Fully Green;
- fresh `npm run verify:clean` is mandatory;
- Tooltip remains Product Owner BLOCKED until runtime Light/Dark re-review
  confirms actual visual centering.


## 2026-09-29 — Inputs page Product Owner blocking review

Product Owner supplied full Inputs page Light/Dark evidence plus SearchBox runtime
evidence and declared multiple functional/product gaps.

Dedicated state:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Blocking requirements include:
- functional SearchBox result filtering + selection;
- explicit three-mode SearchBox focus behavior (modal / dropdown / inline);
- exact field-width anchored dropdown, viewport permitting;
- explicit SearchBox close action;
- no post/open-popup hit blocking of other fields;
- separate SearchBox query vs committed selection/value;
- correct dropdown vs modal semantics;
- Arabic-Indic MoneyBox evidence;
- Now actions for Time and DateTime;
- previous/next week/month presets for DateRange;
- Confirm disabled until valid staged selection, with Cancel/Close always available.

Additional external-review findings:
- SearchBox current popup results are static projected content;
- Inputs showcase wastes half-width through 2-column grids with one surface;
- temporal empty placeholders remain hard-coded English.

Inputs page: BLOCKED pending bounded correction and Product Owner re-review.


## 2026-09-29 — Inputs blocking correction implemented

Source checkpoint:
`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

The Product Owner findings are implemented in source:
- three-mode functional SearchBox;
- full-field-width anchored dropdown;
- result filtering/selection;
- explicit close and noninteractive leaving state;
- correct dropdown/modal semantics;
- Arabic-Indic MoneyBox instance support;
- temporal Now and DateRange presets;
- staged Confirm gating with Cancel/Close preserved;
- OverlayRef action-state enforcement;
- Arabic temporal placeholders;
- full-width Inputs review surfaces.

Status:
- implementation complete for this bounded correction unit;
- technical verification pending;
- Inputs remains Product Owner BLOCKED until full verify + runtime/visual
  re-review.


## 2026-09-29 — SearchBox raw-button verification blocker corrected

The first full verify run for the Inputs correction stopped at ErpButton
governance because SearchBox rendered result options with a raw native button.

Correction:
`cf91967291961037dd7f35d0e825fc4fb2da8312` —
`fix(inputs): govern SearchBox results through SelectionTile`.

SearchBox result interaction now uses approved `ErpSelectionTile` list
presentation while preserving listbox/option semantics and keyboard focus.

Standalone zero-warning build at the previous checkout passed, but the full
post-fix verify has not yet completed.

Inputs remains BLOCKED pending full technical pass and Product Owner runtime
re-review.


## 2026-09-29 — Inputs verification reached tests; stale test harness corrected

At checkout `a85c13899613b239ea28c848b61af3454b3fe5f0`,
all governance and Angular lint passed.

Test result:
- 84/87 files passed;
- 620/626 tests passed;
- six failures remained.

Review showed the failures were stale synchronous test assumptions introduced by
the new staged Confirm and SelectionTile contracts, not evidence requiring a
production behavior change.

Test-only correction:
`92840de9c670edd32b05c1485f50c2e61e68fead`.

Fresh full `npm run verify:clean` remains mandatory.
Inputs is still Product Owner BLOCKED pending technical green and runtime review.


## 2026-09-29 — Inputs verify reduced to one unrelated App integration timeout

At `f8ab643...`, every Inputs-targeted suite passed.

Only one test remained red:
the App direct-document integration test combining Overview, Inputs, and Overlays
in one 5-second test body.

Test-only correction:
`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

The test was split by route while preserving identical assertions.
No runtime source changed.

Fresh full verify remains mandatory.


## 2026-09-29 — SearchBox invisible/top-layer runtime blocker corrected

Product Owner confirmed a real runtime defect after apparent SearchBox closure:
lower fields could fail to retain focus and another result could be selected as
though the dropdown remained active.

Corrections:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`

Native Popover top-layer teardown is now immediate at close start. Delayed focus
restoration was removed; close timers cannot steal later field focus.

Inputs showcase SearchBoxes now enable inherited clearable behavior.

Status:
- runtime correction implemented;
- full verification pending;
- Inputs remains Product Owner BLOCKED until re-test accepts the behavior.


## 2026-09-29 — exact closed-Popover root cause identified

The persisted SearchBox ghost interaction was traced to an exact CSS defect:
base `.search-box__popup` forced `display:grid` on a native Popover whose
closed state depends on browser-owned `display:none`.

Because hidden opacity was separate, the closed popup could be invisible while
remaining an interactive fixed box.

Root-cause correction:
`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Grid display is now restricted to `:popover-open`. Governance protects this
invariant.

Inputs remains BLOCKED until technical verification and Product Owner runtime
re-test confirm the ghost hit area is gone.


## 2026-09-29 — Inputs review expanded

Additional Product Owner decisions are documented in
`INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`:
non-destructive domain validation, default clearability, hover visibility,
RangeSlider geometry/tooltips, Now reveal behavior, rolling date ranges,
ColorPicker instance mode, and explicit ItemPicker/ComboBox distinction.

Inputs remains BLOCKED.


## 2026-09-29 — unified ERP input state/validation contract approved

New architecture decision:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Every ERP input will expose semantic input state, validity, simple errors, and
structured issues from one validation source of truth.

Implementation pending; Inputs remains BLOCKED.


## 2026-09-30 — expanded Inputs implementation complete / verification pending

The Product Owner-approved additional Inputs corrections plus unified input
validation substrate are implemented on current main:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Implemented families include text/domain/numeric/choice/file/temporal/selection
and RangeSlider, with Angular Forms integration and governance enforcement.

Status remains BLOCKED for Product Owner acceptance until:
1. fresh full `npm run verify:clean`;
2. runtime re-test;
3. Light/Dark visual re-review.


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
