# GIT CHECKPOINTS — HONESTY ERP Design Lab

These are technical/history checkpoints. They are **not** Product Owner visual
approvals unless explicitly stated.

## Live main rule

Always resolve live `origin/main` directly at session start. This file records
named checkpoints; it does not claim that its own latest docs SHA is an eternal
repository HEAD.

## Continuity protocol checkpoint

- `66abb185c3e837d9c659ed56106cf668d46103c5`
  `docs(handoff): establish persistent continuity protocol`

## Current CheckBox runtime/source

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
