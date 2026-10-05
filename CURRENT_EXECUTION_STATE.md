# CURRENT EXECUTION STATE — HONESTY ERP Design Lab

## Repository

`abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Local Product Owner workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Current GitHub checkpoints

Live `main` must always be verified directly at the start of a new chat with:

`git rev-parse origin/main`

Do not treat a documentation SHA written inside this file as an eternal HEAD,
because updating this file itself creates a newer docs commit.

Persistent continuity protocol merge checkpoint:

`66abb185c3e837d9c659ed56106cf668d46103c5` —
`docs(handoff): establish persistent continuity protocol`

Previous runtime/source checkpoint before the current RadioBox execution commit:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`

Current live source includes the Product Owner-authorized RadioBox family implementation; resolve its commit from live `main`.

Exact-reference V5 implementation checkpoint:

`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` —
`fix(check-box): implement exact Product Owner reference V5`

## Current verification state

Product Owner locally ran `npm run verify:clean` at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`.

That run advanced successfully through:

- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- system colors;
- ErpText;
- ErpIcon registry/governance;
- ErpButton;
- ErpTooltip;
- ErpField;
- ErpOverlay;
- ErpConfirm.

Angular template lint then stopped with exactly two CheckBox accessibility
findings because the outer CheckBox `<label>` owned a click handler.

That defect is now corrected and merged at
`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`.

That CheckBox defect is closed and the CheckBox visual result is Product Owner accepted. The newer RadioBox implementation now requires a fresh canonical verification.

Immediate technical gate:

`npm run verify:clean`

Do not call the current EmptyState implementation checkpoint Fully Green until a fresh canonical verification passes on the current main.

## Current Product Owner visual state

`ErpCheckBox` exact-reference V5 is visually **ACCEPTED by the Product Owner**.

`ErpRadioBox` implementation remains present, and the Product Owner has explicitly opened the next wave by supplying the exact EmptyState reference.

`ErpEmptyState` is the active implementation/review item.

Current binding visual authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

Source reference:

`erp-checkbox-3.html`

Reference identity recorded in the contract:

SHA-256:

`63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`

Product Owner decision:

- reproduce the supplied reference design as closely as possible;
- system colors/tokens replace the reference palette;
- do not silently reinterpret or selectively omit reference design capabilities.

Current V5 CheckBox contract includes:

- modes: `checkbox | switch | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px;
- SVG check/dash stroke animation;
- Switch track/thumb/sweep behavior;
- Tile mode;
- read-only / disabled / invalid / indeterminate;
- exact-reference motion timings;
- Select All / indeterminate review behavior.

Technical PASS will not equal Product Owner visual approval.

## Current execution order

The Product Owner selected this next reference batch order:

1. `ErpCheckBox` — Product Owner visual acceptance complete;
2. `ErpRadioBox` — implementation present; Product Owner moved the active wave forward;
3. `ErpEmptyState` — current active exact-reference implementation/review item;
4. `ErpSelect` — unopened.

RadioBox source is implemented under the accepted CheckBox-family language. The earlier "do not open EmptyState" gate is superseded by the Product Owner's explicit 2026-10-04 stage transition supplying the EmptyState reference and authorizing its implementation.

Do not open `ErpSelect` until EmptyState:

1. passes fresh `npm run verify:clean`;
2. completes Product Owner Light/Dark/runtime visual review;
3. has all current Product Owner findings closed.

The previously reserved single-select Tile requirement remains implemented by RadioBox/RadioGroup native radio semantics.

## Permanent execution laws

- Product Owner is final product/visual authority.
- technical green != Product Owner visual approval/freeze.
- no new component while currently implemented component problems remain open.
- future work proceeds bottom-up by dependency.
- the next candidate is the lowest unresolved dependency, not merely the next
  historical roadmap row.
- any newly opened visual component requires a Product Owner supplied visual
  reference or explicit Product Owner authorization to work without one.
- reference palette does not override Honesty ERP color/token architecture
  unless Product Owner explicitly says otherwise.
- no Angular Material / Bootstrap / Tailwind or new dependencies without
  explicit authorization.
- `npm run verify:clean` remains the canonical executable technical gate.
- do not raise/suppress style budgets or quality gates to get green.

## Mandatory continuity maintenance protocol

This file is **current-state authority** and must be updated in the same
execution cycle whenever any of the following changes:

- current Git checkpoint;
- implementation status;
- blocker;
- verification result;
- Product Owner finding/decision;
- active component;
- execution phase/stage;
- immediate next action.

It is forbidden to leave the newest execution state only inside chat history.

For every substantive implementation cycle, synchronize together:

1. `CURRENT_EXECUTION_STATE.md`;
2. `README_FIRST.md`;
3. `NEW_CHAT_HANDOFF.md`;
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
5. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Also update when applicable:

- `DECISIONS_AND_CONSTRAINTS.md`;
- `GIT_CHECKPOINTS.md`;
- current batch contract;
- current component-specific contract;
- any family/system contract whose behavior changed.

Do not hand a substantive checkpoint to the Product Owner until context,
execution state, and stage/roadmap documentation are synchronized.

<!-- CHATGPT_RADIOBOX_DESIGN_OPEN_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 visually accepted; RadioBox design wave opened

Product Owner decision:

- current exact-reference `ErpCheckBox` V5 is visually accepted;
- `ErpRadioBox` is the next visual item and may be designed with the same
  method, visual language, and design discipline;
- native radio semantics remain authoritative;
- the RadioBox design contract is
  `src/app/controls/radio-box/RADIO_BOX_VISUAL_CONTRACT_V1.md`.

Execution boundary:

- CheckBox visual gate is closed;
- fresh canonical `npm run verify:clean` after the merged CheckBox read-only
  lint correction is still technically pending;
- RadioBox design/contract work is authorized now;
- this original staging note was superseded by the Product Owner clarification to implement RadioBox immediately;
- EmptyState and Select remain unopened.

Approved RadioBox direction:

- modes: `radio | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px, with higher shared Field
  sizes aliasing xl;
- optional description, read-only guard, and standalone visible-text
  suppression aligned to the accepted CheckBox family language;
- circular native radio indicator with centered dot;
- no switch and no indeterminate semantics;
- Tile single-select is owned by RadioBox visual mode together with RadioGroup
  coordinated single-selection semantics.

Technical green remains separate from Product Owner visual approval.
<!-- CHATGPT_RADIOBOX_DESIGN_OPEN_2026_10_04_END -->

<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_START -->
## 2026-10-04 — RadioBox accepted-family implementation completed

The Product Owner clarified that the RadioBox decision authorized immediate
implementation, not documentation-only staging.

Current source implementation now follows the accepted CheckBox V5 family
language while preserving native radio semantics:

- RadioBox modes: `radio | tile`;
- variants: `outline | filled | soft`;
- visual sizes: sm 18px / md 22px / lg 28px / xl 36px;
- shared higher Field size names alias xl;
- optional description;
- `readOnly` interaction guard;
- `hideText` standalone visual mode with accessible-label preservation;
- circular native-radio indicator + centered dot;
- no Switch and no indeterminate semantics;
- tokenized hover/focus/pressed/disabled/read-only/status treatment;
- RadioBox Tile owns the option surface;
- RadioGroup owns coordinated single selection and now passes through the
  approved RadioBox visual facets;
- RadioGroup options may expose descriptions;
- Inputs Design Lab now has dedicated RadioBox standalone/text/group/tile/
  variants/sizes/state/RTL evidence;
- RadioBox/RadioGroup tests and ErpField governance were expanded to protect the
  new contract.

The implementation is a technical candidate until a fresh complete
`npm run verify:clean` passes on this current source.

After technical green, Product Owner Light/Dark/runtime RadioBox review is
mandatory. EmptyState and Select remain unopened until RadioBox is accepted.
<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_END -->

<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_START -->
## 2026-10-04 — RadioBox canonical verification reached tests; Vitest worker contention corrected

Product Owner local verification on
`6d00e7963ca986d92f72e597d3a2ff6c8aad2fa7` established:

- `build:clean:self-test` PASS;
- standalone `build:clean` PASS with zero warnings;
- all repository governance checks PASS;
- Angular lint PASS;
- RadioBox unit tests PASS — 10/10;
- RadioGroup unit tests PASS — 6/6;
- the RadioBox Design Lab review tests that completed were PASS;
- the full test stage stopped with 13 timeout failures across eight unrelated
  suites;
- no assertion failure or RadioBox/RadioGroup functional failure was reported.

The failure distribution includes Tooltip/Overlay motion loops, App route
loading, Buttons/Icons showcases, Selection/Temporal internals, and repeated
Inputs full-page renders. This is execution-resource contention, not evidence of
one shared product/runtime defect.

Bounded tooling correction:

- add `vitest-base.config.mts`;
- configure Angular's unit-test `runnerConfig` to load it;
- cap Vitest at `maxWorkers: 4`;
- keep file parallelism enabled;
- do not raise `testTimeout`;
- do not add retries;
- do not weaken any product test, assertion, lint/governance rule, typecheck,
  style budget, or zero-warning gate.

The next mandatory gate remains:

`npm run verify:clean`

RadioBox implementation/design remains unchanged by this tooling correction.
EmptyState and Select remain unopened.
<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_END -->

<!-- CHATGPT_OVERLAY_RESTORE_TEST_CONTRACT_2026_10_04_START -->
## 2026-10-04 — canonical verification reduced to two Overlay restoration assertions

Product Owner verification on
`1161b780709c5f35c0b304ed2d441a26f564aa44` confirmed the worker-budget
correction:

- the custom Vitest runner config was loaded;
- lint/governance remained fully PASS;
- the previous timeout failures disappeared;
- 88/89 test files passed;
- 692/694 tests passed;
- RadioBox 10/10 PASS;
- RadioGroup 6/6 PASS;
- InputControls 17/17 PASS including the complete RadioBox review evidence.

The two remaining failures were both in `overlay-host.spec.ts` and both had the
same assertion: the test expected restored `document.body.style.overflow` to
be the empty string, while the actual prior document state was `hidden`.

Production `ErpOverlayHost` deliberately captures and restores the previous
inline body-overflow value. It must not force the page to an empty overflow
value because another legitimate owner may have set a prior state.

Test-contract correction:

- no Overlay runtime code changed;
- the two restoration tests now establish an explicit previous sentinel
  `overflow = 'auto'`;
- they prove `auto -> hidden -> auto` for close and destroy paths;
- each test restores the external pre-test value in `finally`;
- no timeout, retry, assertion, governance, or product behavior was weakened.

Fresh mandatory gate:

`npm run verify:clean`

RadioBox remains implemented and technically pending only this rerun.
EmptyState and Select remain unopened.
<!-- CHATGPT_OVERLAY_RESTORE_TEST_CONTRACT_2026_10_04_END -->

<!-- CHATGPT_EMPTY_STATE_EXACT_V1_2026_10_04_START -->
## 2026-10-04 — ErpEmptyState exact-reference V1 opened and implemented

The Product Owner supplied the binding visual reference:

`erp-empty-state.html`

Recorded SHA-256:

`935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048`

Product Owner instruction is exact-reference implementation: preserve the
reference design and features while replacing its palette with Honesty ERP
system colors.

Binding production contract:

`src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`

Current implementation includes:

- five exact scenarios: `no-data | no-search | error | forbidden | custom`;
- the five reference SVG illustration compositions;
- independent Illustration/Title/Description/Actions/Extra visibility;
- independent Primary/Secondary/Tertiary actions;
- scenario-owned Arabic defaults and live text/action-label overrides;
- custom Illustration and Extra projection;
- reference entrance stagger and continuous illustration motion;
- Float/Pulse/None motion API;
- 0.5x/1.0x/1.5x speed;
- replay API and reduced-motion protection;
- `role=status`, polite live region, atomic announcements;
- dedicated `/controls/empty-states` Design Lab route;
- ERP-only routed review controls;
- system-color Component Token mapping with no raw reference palette;
- no local Light/Dark authority and no component-owned direction authority;
- dedicated tests and governance.

The reference's local Theme/Direction demo ownership is deliberately not copied:
App remains the sole theme authority and RTL/LTR is inherited from context.

The Product Owner's supplied reference explicitly opens this EmptyState wave.
The next component, `ErpSelect`, remains unopened until EmptyState completes
canonical verification and Product Owner Light/Dark/runtime visual review.

Current technical status:

**implementation candidate complete / fresh `npm run verify:clean` pending.**
<!-- CHATGPT_EMPTY_STATE_EXACT_V1_2026_10_04_END -->

<!-- CHATGPT_SYSTEM_FONT_AUTHORITY_RESTORED_2026_10_04_START -->
## 2026-10-04 — Honesty ERP system font authority restored

Product Owner finding:

Routed/system pages were no longer consistently rendering with the approved
Honesty ERP typography families.

Root cause:

- Font assets and Semantic Typography tokens were still correct;
- approved families remain:
  - Arabic: `Tajawal`;
  - Latin: `Space Grotesk`;
  - Mixed UI: `Space Grotesk, Tajawal`;
- legacy application/page CSS still imposed OS-font stacks such as
  `system-ui`, `-apple-system`, and `Segoe UI`;
- native form controls that use `font: inherit` could therefore inherit the
  wrong root stack even when adjacent `ErpText` labels were correct.

Correction:

- global `html/body` default font authority is now
  `var(--honesty-type-family-ui)`;
- native `button/input/select/textarea` inherit the approved UI stack by
  default;
- Design Lab application chrome now uses the UI typography token;
- legacy Foundation routed roots using OS stacks were migrated to the UI token:
  Colors, Status Hues, Themes, Feedback Colors, Typography, and Spacing;
- newer routed roots already using Honesty ERP typography tokens remain
  unchanged;
- ErpText family-specific contracts remain unchanged:
  `ui | arabic | latin | inherit`;
- locally hosted Tajawal and Space Grotesk font assets remain the only approved
  product UI families.

Governance:

`erp-text:check` now validates the global font authority and rejects OS-font
stack fragments from application SCSS.

Forbidden application font bypass examples include:

- `system-ui`;
- `-apple-system`;
- `BlinkMacSystemFont`;
- `Segoe UI`;
- `Tahoma`;
- `Geneva`;
- `Verdana`;
- `Arial`.

This correction is cross-cutting typography infrastructure and does not change
the active EmptyState exact-reference product contract.

Fresh canonical verification remains required:

`npm run verify:clean`
<!-- CHATGPT_SYSTEM_FONT_AUTHORITY_RESTORED_2026_10_04_END -->

<!-- CHATGPT_TOOLTIP_TOKEN_COUNT_DECOUPLED_2026_10_04_START -->
## 2026-10-04 — Tooltip governance decoupled from global Component Token count

Product Owner local `npm run verify:clean` on
`4b2fa4894b23011e19349be2b6f43807507f3421` confirmed:

- Theme authority PASS;
- route-page ERP-only authoring PASS (23 routed templates);
- Component Token framework PASS with 47 concrete modules;
- System Colors PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- verification then stopped at `erp-tooltip:check`.

Failure cause:

`check-erp-tooltip-governance.mjs` still asserted a repository-wide hardcoded
Component Token module count of 46. EmptyState legitimately added the 47th
module, and the authoritative Component Token framework checker had already
accepted it.

Correction:

- remove the stale hardcoded global count from Tooltip governance;
- keep Tooltip-specific token ownership validation intact;
- keep the prohibition against a separate `tooltip-content` token module;
- repository-wide token inventory remains exclusively owned by
  `component-tokens:check`.

A scan of all 14 repository `.mjs` governance/check scripts found no second
hardcoded Component Token module-count assertion.

Fresh mandatory gate remains:

`npm run verify:clean`
<!-- CHATGPT_TOOLTIP_TOKEN_COUNT_DECOUPLED_2026_10_04_END -->

<!-- CHATGPT_EMPTY_STATE_GOVERNANCE_SYNTAX_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState governance JavaScript syntax repaired

Product Owner local canonical verification on
`fcc0c5b90f851ffe73a73fdb1fcc59c2765ffc6f` progressed successfully through:

- Single App theme authority;
- routed ERP-only authoring (23 templates);
- Component Token framework (47 concrete modules);
- System Colors;
- ErpText;
- ErpIcon;
- ErpButton;
- ErpTooltip;
- ErpField.

The run then stopped before EmptyState contract validation because
`tools/controls/check-erp-empty-state-governance.mjs` itself had invalid
JavaScript string quoting in six adjacent required-template literals:

- Primary/Secondary/Tertiary `data-empty-state-action` markers;
- Search/Danger/Warning illustration class markers.

This was a checker-source syntax defect, not an EmptyState runtime/visual
failure.

Correction:

- replace the six malformed double-quoted literals with valid single-quoted
  JavaScript strings containing the required HTML double quotes;
- no EmptyState source, template, token, style, route, test, or API was changed;
- no governance assertion was removed or weakened;
- compile-only JavaScript syntax audit of the complete patched checker passes;
- the existing `erp-empty-state:check:self-test` remains the next direct
  executable proof of the checker contract.

Fresh mandatory commands:

`npm run erp-empty-state:check:self-test`

then

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_GOVERNANCE_SYNTAX_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_CLASS_TOKEN_GOV_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState governance class-token matching corrected

Product Owner local verification on
`fad838e25370bde850e3fa38fa11dd0ef8d84839` confirmed:

- `erp-empty-state:check:self-test` PASS;
- canonical lint gates passed through ErpField;
- `erp-empty-state:check` then reported missing
  `es-anim-danger-halo` and `es-anim-warning-halo`.

Production template inspection confirmed both classes are present:

- Danger illustration:
  `class="es-fill-accent-subtle es-anim-danger-halo"`;
- Warning illustration:
  `class="es-fill-accent-subtle es-anim-warning-halo"`.

Root cause was a false-negative governance implementation: it searched for an
exact attribute substring such as `class="es-anim-danger-halo"`, which only
works when the required class is the sole/first exact attribute value.

Correction:

- add token-aware class matching that parses each static `class` attribute and
  tests whitespace-separated class tokens;
- apply it to Search, Danger, Warning, and Custom illustration evidence;
- keep action/data markers as exact attribute checks;
- strengthen the valid self-test fixture so required illustration classes are
  deliberately embedded in multi-class attributes matching production;
- no EmptyState runtime/template/style/token/API changed;
- no governance requirement removed or weakened;
- patched checker passes compile-only JavaScript syntax audit;
- all four required production class tokens are detected by the corrected
  matcher.

Fresh mandatory commands:

`npm run erp-empty-state:check:self-test`

then

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_CLASS_TOKEN_GOV_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_DIRECTIVE_SELECTOR_LINT_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState projection-directive selector lint aligned with ERP naming

Product Owner local verification on
`b0a1a4b4a330baa56927779587c8f42a57d7b99c` confirmed:

- `erp-empty-state:check:self-test` PASS;
- Theme authority PASS;
- routed ERP-only authoring PASS;
- Component Token framework PASS (47 modules);
- System Colors PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpEmptyState governance PASS;
- ErpOverlay PASS;
- ErpConfirmDialog PASS.

The run reached Angular ESLint and stopped on exactly two
`@angular-eslint/directive-selector` errors for the public EmptyState content
projection directives:

- `[erpEmptyStateIllustration]`;
- `[erpEmptyStateExtra]`.

The repository ESLint baseline still requires the generic `app` attribute
prefix, while production ERP components intentionally use the `erp` namespace
and already carry selector-rule exceptions where needed.

Correction:

- preserve the public ERP projection API names;
- add the same narrow, line-local
  `@angular-eslint/directive-selector` exception to the two directive selector
  declarations only;
- do not change global ESLint rules;
- do not rename the directives to `app*`;
- no EmptyState runtime, template, styles, tokens, scenarios, motion, or
  governance assertions changed.

Fresh mandatory gate:

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_DIRECTIVE_SELECTOR_LINT_FIX_2026_10_05_END -->


<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_START -->
## 2026-10-05 — ErpEmptyState canonical verification is Fully Green

Canonical verification was run from the current EmptyState checkpoint after the
projection-directive lint correction.

The first complete run established:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production compilation completed;
- the zero-warning gate detected one component-style budget warning only:
  `empty-state.scss` was 4.34 kB, 341 bytes above the unchanged 4.00 kB
  warning threshold.

The warning was corrected without changing selectors, values, APIs, tokens,
visual behavior, tests, budgets, timeouts, or retries:

- existing Title/Description/Actions/Extra rules moved verbatim from
  `empty-state.scss` into `empty-state-content.scss`;
- the new style file is loaded immediately after the base style;
- EmptyState governance now includes the split style in the same production
  visual contract.

A fresh complete `npm run verify:clean` then passed:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- initial production bundle: 373.68 kB;
- `Zero-warning build gate: PASS`;
- Angular warnings: 0.

Current product state:

- `ErpEmptyState` is a Fully Green technical candidate;
- this does not equal Product Owner visual approval;
- the immediate gate is Product Owner runtime/Light/Dark review of
  `ErpEmptyState`;
- `ErpSelect` remains unopened and no Selection-family implementation is
  authorized.
<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState runtime animation failure diagnosed and corrected

Product Owner runtime/visual review finding:

**EmptyState animation does not run in the browser.**

This finding reopens EmptyState despite the prior canonical technical green.
Technical PASS did not prove rendered CSS animation behavior.

Root cause:

- EmptyState used Angular's default Emulated view encapsulation;
- all `@keyframes honesty-empty-state-*` declarations lived in
  `empty-state-motion-keyframes.scss`;
- the `animation:` declarations that referenced those names lived in separate
  component stylesheets;
- Angular's ShadowCss scopes local keyframe declarations and only rewrites an
  animation reference when the corresponding local keyframe is known while
  processing that same stylesheet;
- therefore the detached keyframe declarations were emitted under scoped names
  while animation declarations in the other stylesheet(s) continued to
  reference the original names.

Correction:

- do not disable view encapsulation;
- do not move component-specific motion to global CSS;
- remove the detached `empty-state-motion-keyframes.scss` assembly;
- remove the monolithic `empty-state-motion-continuous.scss`;
- co-locate each keyframe definition with the animation rules that consume it;
- use bounded motion files:
  - `empty-state-motion-entry.scss`;
  - `empty-state-motion-float.scss`;
  - `empty-state-motion-search.scss`;
  - `empty-state-motion-status.scss`;
  - `empty-state-motion-reduced.scss`;
- keep each motion stylesheet below the component style warning budget before
  build processing;
- strengthen EmptyState governance so an animation/keyframe pair split across
  component stylesheets is rejected by self-test.

No reference geometry, color mapping, public API, scenarios, motion names,
durations, easing, speed contract, or reduced-motion behavior is intentionally
changed by this correction.

EmptyState is no longer considered Product Owner visually accepted or closed.
Fresh executable verification and fresh runtime Light/Dark animation review are
required after this correction.

`ErpSelect` remains unopened.
<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_END -->
