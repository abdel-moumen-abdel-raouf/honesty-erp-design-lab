# DECISIONS AND CONSTRAINTS — HONESTY ERP Design Lab

## Authority

Product Owner:
- final visual authority;
- final product/scope authority;
- chooses visual references;
- decides acceptance/rejection/freeze.

ChatGPT:
- architecture/governance/external review;
- inspect real source before implementation;
- convert Product Owner findings into bounded contracts;
- review implementation/tests/governance as one unit;
- maintain persistent project context after each substantive cycle.

Implementation agent:
- execution only;
- must not invent design decisions or widen scope.

## Execution order

Binding Product Owner law:

1. close problems in current implemented components first;
2. then proceed bottom-up by dependency;
3. never jump to a higher-level composite/pattern/family while a lower
   dependency remains unresolved;
4. the next item is the lowest unresolved dependency, not simply the next row
   in historical planning.

Current authorized batch:

1. CheckBox;
2. RadioBox;
3. EmptyState;
4. Select.

CheckBox V5 visual state: Product Owner accepted.

Current active item: RadioBox.

RadioBox source is implemented and awaits canonical technical verification plus Product Owner runtime/visual review. EmptyState remains unopened until RadioBox closes.

## Visual-reference law

Any newly opened visual component requires, before visual implementation:

- a visual reference explicitly supplied/identified by the Product Owner; or
- explicit Product Owner authorization to work without a visual reference.

ChatGPT/agent/history/blueprint may not choose a reference or infer a waiver from
silence.

When a visual reference is supplied:

- treat it as Product Owner design authority to the scope the Product Owner
  specifies;
- do not silently omit capabilities because of assistant preferences;
- analyze source-derived boundaries precisely;
- preserve system architecture such as semantic/component color tokens when the
  Product Owner says the reference colors are not authoritative.

Current CheckBox authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

Reference:

`erp-checkbox-3.html`

## Theme / colors

- App root only owns runtime Light/Dark state.
- no local theme authority below App.
- component colors resolve through Reference -> Semantic -> Theme ->
  Component Tokens -> Component.
- visual references do not bypass Honesty ERP color/token architecture unless
  Product Owner explicitly says so.

## Routed page authoring

Routed Design Lab pages author ERP primitives/controls only.

Native semantics stay behind approved ERP or review-internal owners.

## Quality

- `npm run verify:clean` is mandatory.
- zero warnings.
- component style budgets remain 4k warning / 8k error.
- never raise or suppress budgets/quality gates to get green.
- technical PASS != Product Owner visual approval.

## Scope / dependency discipline

- no unrelated redesign.
- no new public component family without Product Owner authorization.
- no dependency addition without authorization.
- no Angular Material / Bootstrap / Tailwind.
- use existing lower-level foundations where appropriate.

## Current CheckBox V5 decision

The Product Owner rejected previous CheckBox visual interpretations and supplied
`erp-checkbox-3.html` as exact design authority.

Current production CheckBox contract:

- modes: checkbox / switch / tile;
- variants: outline / filled / soft;
- exact reference size geometry: 18 / 22 / 28 / 36 px;
- exact reference stroke mark and motion behavior;
- read-only / disabled / invalid / indeterminate;
- reference structure/design, but Honesty ERP system colors.

The source reference single-select Tile example uses radio semantics and is
reserved for the next RadioBox wave.

## Mandatory documentation synchronization law

Every substantive cycle must update persistent documentation before handoff.

A substantive cycle includes any:

- Product Owner decision/finding;
- code implementation;
- blocker/root-cause correction;
- verification result;
- stage/phase transition;
- scope/reference change;
- visual acceptance/rejection.

Mandatory synchronized files:

- `CURRENT_EXECUTION_STATE.md`;
- `README_FIRST.md`;
- `NEW_CHAT_HANDOFF.md`;
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Update `GIT_CHECKPOINTS.md`, this file, current component/batch/family contracts
whenever their subject changed.

No important current decision may exist only in chat history.

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
## 2026-10-04 — deterministic Vitest worker budget

Canonical unit tests are jsdom-heavy and include several intentionally broad
showcase/motion suites.

After the RadioBox review expansion, the Product Owner's full run demonstrated
cross-suite timeout contention while all governance/lint and RadioBox-specific
tests passed.

Decision:

- Angular unit tests load `vitest-base.config.mts`;
- Vitest `maxWorkers` is capped at 4;
- default per-test timeouts are not increased to hide performance problems;
- retries are not introduced;
- a future change to this worker budget requires a demonstrated test-execution
  reason rather than convenience.

This is test execution scheduling only; it changes no runtime product behavior.
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
