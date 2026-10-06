# GIT CHECKPOINTS — HONESTY ERP Design Lab

These are technical/history checkpoints. They are **not** Product Owner visual
approvals unless explicitly stated.

## Live main rule

Always resolve live `origin/main` directly at session start. This file records
named checkpoints; it does not claim that its own latest docs SHA is an eternal
repository HEAD.

## Current Shell Batch checkpoint — 2026-10-06

Shell Batch entry checkpoint:

- `ecc7e0b2492a3267309e0eefd48f51b355ed71ba`
  `feat(forms): add schema-driven entity form engine`

The Accelerated Navigation & ERP Shell Batch V1 implementation commit is
`feat(shell): add accelerated navigation and erp shell batch`; resolve its
final SHA from live `main` because this document is committed with the
implementation. It adds exactly the ten authorized owners and passed 132/132
test files, 829/829 tests, both typechecks, production build, and the
zero-warning gate. Initial bundle: 375.68 kB / 85.46 kB estimated transfer.
Shell Batch lazy chunk: 51.57 kB / 10.04 kB estimated transfer.

Product Owner runtime/visual acceptance remains pending for Core, Data/Table,
Forms, Entity Form Engine, and Shell. Entity Wizard, DataPage,
EntityDirectory, EntityDetail, CRUD/transaction page patterns, Feature/Page
migration, and every unlisted owner remain unopened.

## Historical accelerated checkpoints — superseded current-state snapshot

Entry source checkpoint:

- `36fdd62f0b65ea9b137639f2b002640603f46525`
  `feat(controls): add accelerated data table batch`

That checkpoint contains the technically green Accelerated Core Batch, Phase A
hardening, and Phase B Data/Table batch. Phase B canonical verification passed
110/110 test files, 778/778 tests, both typechecks, production build, and zero
warnings; initial bundle 374.44 kB / 85.38 kB estimated transfer.

Independent continuity normalization checkpoint:

- `f12d28cb37972c18e2a4e897530be9f509c0540d`
  `docs(handoff): normalize accelerated current state`

The following implementation commit adds the six-owner Accelerated Forms
Composition Batch. Resolve its final SHA from live `main`; it is committed as
`feat(forms): add accelerated forms composition batch`. Its canonical gate
passed 117/117 test files, 792/792 tests, both typechecks, production build, and
zero warnings.

Product Owner runtime/visual acceptance remains pending for Core, Data/Table,
and Forms. The exact next action is grouped runtime/Light/Dark review, not a new
source wave. Higher/unlisted families and Shell remain unopened.

## Continuity protocol checkpoint

- `66abb185c3e837d9c659ed56106cf668d46103c5`
  `docs(handoff): establish persistent continuity protocol`

## Historical CheckBox runtime/source — superseded snapshot

- `4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`
  `fix(check-box): move readonly click guard to native input`

This fixes the two Angular template-lint accessibility findings from the first
local V5 canonical run.

Fresh `npm run verify:clean` after this checkpoint is pending.

## Exact-reference CheckBox V5

- `4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`
  `fix(check-box): implement exact Product Owner reference V5`

At this checkpoint the Product Owner local `verify:clean` passed every
project governance gate through ErpConfirm, then Angular template lint stopped
on two outer-label click accessibility errors.

Visual/reference implementation itself was not changed by the subsequent
lint follow-up.

## Previous CheckBox reference evolution

Earlier CheckBox V1–V4 checkpoints are historical/superseded for visual
authority.

Current visual authority is:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

## Button Composites

ButtonGroup / SplitButton / FabMenu correction previously reached full
technical green before the CheckBox reference wave.

Those components are not the currently active implementation unit.

## Next checkpoint rule

Whenever a substantive code/docs/verification cycle completes:

1. add the new current/source/verification checkpoint here;
2. update `CURRENT_EXECUTION_STATE.md`;
3. synchronize the four continuity authority files;
4. clearly distinguish:
   - runtime/source checkpoint;
   - docs-only checkpoint;
   - verified technical checkpoint;
   - Product Owner visual approval checkpoint.

Do not call a docs-only HEAD a freshly verified source checkpoint unless the
underlying source was actually verified.

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
- RadioBox runtime/source implementation waits for that technical gate to pass;
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

Product Owner authorization now includes immediate source implementation.

Implemented contract:

- `ErpRadioBoxMode = 'radio' | 'tile'`;
- `ErpRadioBoxVariant = 'outline' | 'filled' | 'soft'`;
- sm/md/lg/xl = 18/22/28/36px;
- description / readOnly / hideText;
- native radio remains the semantic/CVA owner;
- centered dot only; no SVG, switch, or indeterminate state;
- Tile single-select is implemented through RadioBox + RadioGroup;
- RadioGroup visual pass-through is bounded and preserves its existing
  string-value CVA and Arrow-key selection model.

Source/tests/showcase/governance are updated together.

Current status: **implemented / fresh canonical verification pending / Product
Owner RadioBox Light-Dark runtime and visual review pending**.

Mandatory next gate: `npm run verify:clean`.

EmptyState and Select remain closed.
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

Product Owner exact reference:

`erp-empty-state.html`

SHA-256:

`935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048`

Binding contract:

`src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`

Decision:

- preserve all reference EmptyState scenarios, visual geometry, SVG
  illustrations, content regions, action hierarchy, customization, motion,
  speed/replay, and reduced-motion behavior;
- replace the reference palette entirely with Honesty ERP Semantic -> Component
  Tokens;
- standard actions use `ErpButton`;
- production text uses `ErpText`;
- App remains the only Light/Dark authority;
- EmptyState inherits RTL/LTR instead of owning a local direction API;
- dedicated review route: `/controls/empty-states`;
- dedicated governance and tests protect the exact-reference contract.

Current status: implementation candidate complete; fresh
`npm run verify:clean` pending.

`ErpSelect` remains unopened.
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

<!-- CHATGPT_EMPTY_STATE_LOTTIE_MIGRATION_2026_10_05_START -->
## EmptyState Product Owner Lottie migration — 2026-10-05

Starting checkpoint: `fb4b392071968800b1286c5c2ce824b173a50b0d`.

The Product Owner superseded the five default SVG compositions with supplied
Lottie artwork. The binding mapping is `no-data -> no-data.json`, `no-search ->
no-search.json`, `error -> error.json`, `forbidden -> forbidden.json`, and
`custom -> custom.json` under `public/lottie/empty-state/`. At that migration
checkpoint, `no-search` retained its asset while defaulting Illustration to
hidden; that historical default is superseded by the Product Owner decision
recorded below. Consumer `erpEmptyStateIllustration` projection still overrides
the default artwork.

The five source files were inspected before import. They contain no external
asset references. Only `general-analytics-animation.json` contained an explicit
white full-canvas `background Outlines` artwork layer; that layer alone was
removed from the project `custom.json` copy. The Downloads originals were not
modified. The other four project copies required no background-layer removal.
Embedded no-search PNG assets preserve alpha transparency.

`lottie-web` `5.13.0` is the sole added runtime and is MIT-licensed. Its local
SVG-only player is copied by the Angular asset pipeline and loaded lazily by an
EmptyState-internal implementation helper; there is no CDN, absolute local
path, or new public Lottie component family. The renderer uses
`xMidYMid meet`, centered `clamp(5.5rem, 16vw, 8.25rem)` bounds, no crop,
stretch, overflow, or CSS artwork background.

Existing EmptyState animation API remains intact. `motionSpeed` calls the
Lottie runtime speed API; `animated=false`, `illustrationMotion='none'`, and
runtime reduced-motion all hold a static first frame. `replayEntrance()` also
rewinds and replays Lottie when motion is allowed. Media-query changes are
observed, and variant replacement/component destruction destroy the previous
AnimationItem so instances cannot overlap or leak. Lottie artwork colors are
Product Owner asset-owned for this wave; component chrome remains governed by
Semantic and EmptyState Component Tokens.

Obsolete default SVG markup, SVG-only tokens, and dead illustration motion
styles were removed. EmptyState governance now verifies assets, exact mapping,
local runtime loading, transparency/background restrictions, speed, replay,
reduced-motion handling, and lifecycle cleanup. Its self-test rejects missing
mapping, Downloads paths, missing destroy/reduced-motion/speed handling, and a
full-canvas background. Entrance-keyframe validation is whitespace-insensitive.

Technical verification is fully green: EmptyState governance self-test PASS;
EmptyState governance PASS; lint/governance PASS; 92/92 test files and 721/721
tests PASS; app/spec typechecks PASS; production build PASS at 373.68 kB initial
with zero Angular warnings; `npm run verify:clean` PASS.

This technical result does not equal Product Owner visual approval. The
immediate gate is Product Owner runtime Light/Dark review of all five Lottie
scenarios, responsive sizing, transparency, motion speeds, replay, and reduced
motion. `ErpSelect` remains unopened, and no Selection Family, ItemPicker,
ComboBox, or SearchBox work is authorized by this wave.

Commit scope: `feat(controls): adopt lottie empty-state illustrations`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_MIGRATION_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie runtime visibility repaired

Product Owner runtime review proved that the first Lottie migration was
technically green while every default illustration remained invisible. The
captured browser exception came from the manual runtime script error handler,
before `window.lottie`, `loadAnimation()`, JSON loading, `DOMLoaded`, or SVG
injection. The previous unit tests replaced the loader with a mock and therefore
did not prove real runtime delivery or rendered DOM output.

Repository diagnosis found the packaged
`node_modules/lottie-web/build/player/lottie_svg.min.js` file present. Before
the correction, the local dev URL `/vendor/lottie-web/lottie_svg.min.js`
returned HTTP 200 with `text/javascript` and real JavaScript, while every
Lottie JSON URL returned HTTP 200 with `application/json` and valid JSON. This
does not negate the Product Owner environment's script-load failure; it proves
that the copied-asset plus injected-global chain was environment-sensitive
rather than a damaged five-asset set.

The correction removes the copied runtime asset, manual `<script>` injection,
and all `window.lottie` dependency. EmptyState now lazy-imports the packaged
SVG-only ESM build through the Angular bundler, explicitly fetches and validates
each JSON response, passes `animationData` to Lottie, and exposes internal
`loading | ready | static | error` evidence. `ready` or `static` is reached
only after `DOMLoaded` and a generated SVG are both present. Runtime import,
HTTP/JSON, `loadAnimation`, `data_failed`, `error`, and missing-SVG failures
are surfaced through Angular's ErrorHandler instead of failing silently.
Animation listeners and the AnimationItem are cleaned up on replacement and
destruction.

Browser runtime evidence on `/controls/empty-states` confirms generated SVG
output for `no-data`, explicitly enabled `no-search`, `error`, `forbidden`,
and `custom`. The scenario matrix keeps all five visible as static evidence.
`float` and `pulse` remain visible and playing; `none` and
`animated=false` remain visible on a static first frame; Replay returns the
allowed animation to playing state. Browser-emulated
`prefers-reduced-motion: reduce` produced six visible generated SVGs in static
state with no playback. The approved responsive clamp is unchanged.

Final technical verification for this correction: EmptyState governance
self-test PASS; EmptyState governance PASS; 92/92 test files and 728/728 tests
PASS; lint/governance PASS; app/spec typechecks PASS; production build PASS at
373.68 kB initial with zero Angular warnings; `npm run verify:clean` PASS.

This technical pass does not equal Product Owner visual approval. The immediate
gate remains Product Owner runtime Light/Dark review of EmptyState Lottie
visibility, artwork, responsive sizing, motion, replay, and reduced motion.
`ErpSelect` remains unopened; Selection Family, ItemPicker, ComboBox, and
SearchBox were not modified.

Commit scope: `fix(controls): restore empty-state lottie runtime`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_START -->
## 2026-10-05 — no-search illustration default superseded

Product Owner superseded the original `no-search` hidden-illustration behavior.
The `no-search` Lottie is now visible by default, so all five EmptyState
scenarios default to visible illustrations. The exact asset mapping remains
`no-search -> /lottie/empty-state/no-search.json`; the ordinary explicit
`showIllustration=false` override remains supported.

The redundant Scenario Matrix `showIllustration=true` override was removed so
the review evidence now exercises the real scenario default. Unit tests prove
the default Lottie and explicit hide override; showcase tests prove the exact
asset; governance rejects a restored hidden default. Browser runtime evidence
confirmed immediate generated SVG output for `no-search`, playing `float` and
`pulse`, visible static `none`, and continued visibility in Light and Dark.

The Lottie runtime, dynamic import, fetch/readiness pipeline, reduced-motion,
lifecycle, sizing, speed, Replay, and JSON assets were not changed. 92/92 test
files and 728/728 tests passed; `npm run verify:clean` passed with zero Angular
warnings. Technical green does not equal Product Owner visual approval.
`ErpSelect` remains unopened.

Commit scope: `fix(controls): show no-search illustration by default`.
<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie illustration size enlarged

Product Owner runtime review found that all five Lottie illustrations were
visible and functional but relatively small. The shared responsive illustration
bounds now supersede `clamp(5.5rem, 16vw, 8.25rem)` with
`clamp(6.75rem, 20vw, 10rem)` for `no-data`, `no-search`, `error`,
`forbidden`, and `custom`. This is one size-contract correction only; the
runtime loader, JSON assets, variant mapping, reduced-motion, replay,
`motionSpeed`, lifecycle cleanup, text, actions, and colors are unchanged.

Runtime evidence covered all 20 combinations of five variants, Light/Dark, and
desktop/narrow viewports. Every specimen reached `ready`, injected an SVG with
`preserveAspectRatio="xMidYMid meet"`, stayed centered, preserved a 24px gap
to the title, and produced no page or stage horizontal overflow. The resolved
box was 160px square on desktop and 108px square at the narrow viewport.
`float` and `pulse` remained animated; `none`, `animated=false`, and a
page initialized with reduced motion retained a visible static SVG frame.
Replay remained ready and visible.

The bounded governance self-test and checker passed, 92/92 test files and
728/728 tests passed, and `npm run verify:clean` passed with zero warnings.
Technical green does not equal Product Owner visual approval. `ErpSelect`
remains unopened; the immediate gate remains Product Owner runtime/visual
review of the enlarged EmptyState illustrations.

Commit scope: `fix(controls): enlarge empty-state illustrations`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_END -->

<!-- CHATGPT_ACCELERATED_CORE_BATCH_2026_10_05_BEGIN -->
## 2026-10-05 — Accelerated Multi-Component Wave

The Product Owner temporarily accepts the current ErpEmptyState result for accelerated continuation; this is not a visual freeze or final approval. The Product Owner explicitly opened one grouped-review wave for ErpSelect, ErpStatusBadge, ErpAlert, ErpSkeleton, ErpAvatar, ErpTabs, ErpTable, and ErpPagination. Technical checks occur per component, while Product Owner runtime/visual review is deferred to the completed group. Technical green remains distinct from visual acceptance, and later findings may reopen any component. Forms, SmartTable, Shell, and all unlisted component families remain unopened.

ErpSelect uses the supplied erp-select.html visual authority and remains distinct from ComboBox, SearchBox, and ItemPicker ownership. The other seven components are implemented under the Product Owner accelerated-wave no-external-reference waiver and reuse the existing Honesty ERP visual language.
<!-- CHATGPT_ACCELERATED_CORE_BATCH_2026_10_05_END -->

### Technical checkpoint

- `npm run verify:clean`: PASS.
- Lint/governance: PASS.
- Tests: 101/101 files and 740/740 tests PASS.
- `typecheck:app`: PASS.
- `typecheck:spec`: PASS.
- Production build: PASS; initial bundle 374.07 kB; zero warnings.
- Grouped Product Owner review remains pending at `/controls/core-batch`.


<!-- ACCELERATED_PHASE_A_HARDENING_2026_10_05_START -->
## 2026-10-05 — Accelerated Phase A hardening complete

The Product Owner authorized a connected two-phase cycle. Phase A hardened the
existing accelerated core batch before any data/table component was opened.

Closed findings:

- ErpSelect now has real coverage for five sizes, single/multiple normalization,
  disabled options, max selection, search/group filtering, all sort modes,
  keyboard/open/close/clear behavior, disabled state, and CVA publication;
- the Product Owner Select reference is recorded as `erp-select.html`,
  SHA-256 `5A31FC10A3D1208BF64E35EB5139823E48F8E2BF1D0190D07DD5DB5DBC4DF23B`;
- Pagination uses the Foundation Query API and one normalized page/count source;
- Tabs consumes its own disabled-foreground Component Token and supports keyed
  rich panel templates;
- Avatar image failure is scoped to the failing source;
- Skeleton line count normalizes to an integer of at least one;
- Table supports keyed rich-cell templates and documents controlled
  `selectedKeys` plus intent-only `rowActivated`;
- broad selector lint suppressions were replaced by line-scoped exceptions;
- StatusBadge remains noninteractive and creates no automatic live region.

Canonical Phase A verification:

- `npm run verify:clean`: PASS;
- lint/governance: PASS;
- tests: 101/101 files and 758/758 tests PASS;
- `typecheck:app`: PASS;
- `typecheck:spec`: PASS;
- production build: PASS, initial bundle 374.08 kB, zero Angular warnings.

The Product Owner explicitly authorizes immediate Phase B implementation of
exactly SortHeader, ColumnChooser, FilterBar, FilterDrawer, TableToolbar,
BulkActionBar, ViewSwitcher, and SmartTable. Product Owner visual review remains
grouped until the connected cycle is complete. Forms and Shell remain unopened.
Technical green does not equal visual acceptance.
<!-- ACCELERATED_PHASE_A_HARDENING_2026_10_05_END -->


<!-- ACCELERATED_PHASE_B_DATA_TABLE_2026_10_05_START -->
## 2026-10-05 — Accelerated Phase B data/table batch complete

Phase B implemented exactly ErpSortHeader, ErpColumnChooser, ErpFilterBar,
ErpFilterDrawer, ErpTableToolbar, ErpBulkActionBar, ErpViewSwitcher, and
ErpSmartTable. The pre-implementation reference audit found no external visual
reference for any of the eight after checking repository source/docs, Product
Owner template locations, Downloads, and the available template archive. All
eight therefore use the explicit Product Owner accelerated-wave
no-external-reference waiver and the existing Honesty ERP visual language.

The data/table boundary is now explicit:

- ErpTable remains the semantic rendering gateway and owns the single keyed
  rich-cell template contract;
- ErpSmartTable orchestrates the approved lower controls and owns local
  sort/filter/page behavior or revisioned remote query intents only;
- remote data loading, stale-response policy, transport, permissions, and
  business actions remain outside SmartTable;
- FilterDrawer stages typed filters in the shared OverlayFrame;
- loading, empty, and error presentation reuse ErpSkeleton, ErpEmptyState, and
  ErpAlert;
- all eight visual components own isolated Component Token modules, bringing
  the repository total to 63 concrete modules;
- long-lived governance rejects HTTP ownership, missing lower-owner
  composition, raw routed table authoring, a duplicate cell renderer, and
  missing token bases; its self-test passes.

Canonical Phase B verification:

- npm run verify:clean: PASS;
- lint/governance: PASS;
- tests: 110/110 files and 778/778 tests PASS;
- typecheck:app: PASS;
- typecheck:spec: PASS;
- production build: PASS, initial bundle 374.44 kB / estimated transfer
  85.38 kB, zero Angular warnings.

The combined technical review routes are /controls/core-batch and
/controls/data-batch. Product Owner grouped runtime/visual review remains
pending for both batches. Technical green does not equal visual acceptance and
later findings may reopen any component. Forms, Shell, and every unlisted
future component remain unopened.

Commit scope: feat(controls): add accelerated data table batch.
<!-- ACCELERATED_PHASE_B_DATA_TABLE_2026_10_05_END -->
