# DECISIONS AND CONSTRAINTS — HONESTY ERP Design Lab

## Shell Phase S1 final-evidence binding decision — 2026-10-08

The Skodash RTL user dropdown at the source URL recorded in
`ERP_USER_MENU_REFERENCE_EXACT_V1.md` is the binding visual and behavioral
authority for `ErpUserMenu`. Honesty ERP colors and typography are the permitted
system substitutions. The existing owner, typed items, controlled open state,
Avatar/Button/Text hierarchy, and `ShellAnchoredSurfaceController` remain in
force. Optional `dividerBefore` metadata and bounded embedded presentations are
the only public compatibility additions. The follow-up entered at
`b28012f18dfd74ac9c37827e00010d70f701719f` and establishes that arrow
cross-axis alignment is computed from measured anchor/surface geometry after
viewport clamping. This arrow option is opt-in and does not change unrelated
anchored-surface owners or general popup geometry. No other Shell visual
contract is opened by this decision.

The bounded implementation is technically verified by 35/35 focused tests and
the full 122/122-file, 758/758-test canonical gate, with both typechecks,
production build, and zero warnings. These results do not change the pending
Product Owner visual state or open S2.

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

## Authoritative current showcase-system decision — 2026-10-08

Every public ERP component page must render exactly one primary target and a
live control panel for every public input and model. Control changes apply
immediately, CVA values remain live and controlled, and meaningful outputs are
visible in an event log. A static matrix, generic input-only host, or component
instance without complete API controls is not sufficient showcase evidence.

The generated catalog is the authority for public API metadata and currently
records 77 owners, 990 inputs, 20 models, and 67 outputs. Governance fails on a
missing/unbound control, multiple target instances, missing event binding, or
an invalid CVA control path. Projection-only owners with no public inputs still
render one visible target and an empty-but-present API panel.

ButtonGroup evidence contains a real group. FAB evidence uses a bounded preview
with live two-axis positioning. Action-menu evidence covers text-only,
icon-only, and icon-plus-text items. These are showcase contracts, not
authorization to merge `ErpFab`, `ErpExtendedFab`, and `ErpFabMenu` production
owners or redesign any exact-reference component. Technical PASS does not grant
Product Owner visual acceptance or open a later wave.

Exact-reference evidence is never replaced by the single live target. Select,
StatusBadge, Avatar, AvatarPicker, Tabs, and Table expose the existing exact Core
evidence as an on-demand secondary experience; Table remains a complete
multi-owner composition. Structured editors validate expected top-level and
array-item value kinds, preserve invalid drafts, and keep the last valid live
value during unrelated changes. Floating preview placement is measured from a
physical origin, never hidden by clipping, and must contain the target at both
axis boundaries in RTL and LTR, including 390 px review.

The bounded correction passes every lint/governance gate, 122/122 test files
and 748/748 tests, both typechecks, production build, and zero warnings. The
initial bundle remains 488.18 kB / 105.32 kB estimated transfer. This technical
result does not confer Product Owner visual acceptance.

## Historical dedicated showcase-system decision — superseded 2026-10-08

The preceding decision established dedicated owners, legacy migration, compact
navigation, and the prohibition on generic fallback. Those constraints remain,
but static authored cases are superseded by the one-target live-API workbench
contract above.

## Historical ownership and Page decision — superseded 2026-10-08

The current bounded authorization entered at
`895f985994ef2c28eae703f60d5911a5314af338`. The repository now has one
generated ERP component catalog (77 public and 41 supporting entries), one
generated native-element registry (42 tag contracts), and one live dedicated
route `/components/<id>` for each public component. Catalog generation and
governance are the single inventory mechanism; manually maintained competing
lists are not authoritative.

Covered native controls and semantics may be authored only by their registered
ERP owner. Consumer/page templates must use that owner. Contextual structural
HTML remains allowed only where the registry says so; uncovered gaps remain
explicit and do not authorize inventing a component. Tests are excluded from
the production-template scan, while inline production templates are included.

`ErpPage` is the public Page foundation owner. It owns only width (`boxed`,
`fluid`, `full`) and scrolling (`document`, `page`, `free`) composition, with
`fluid/document` defaults. It owns no theme, router, transport, body, session,
or business state. `ErpPageShell` owns optional page regions; `ErpAppShell`
owns the application frame. Future production routes use `ErpPage`, but the
current Lab/showcase routes are not migrated by this wave.

The exact next action is Product Owner runtime/technical review of this wave.
The ERP-TABLE visual review gate remains pending separately, technical PASS is
not visual approval, and no later component/page/feature migration is opened.
Canonical verification for the wave passes all governance/lint, 136/136 test
files and 909/909 tests, both typechecks, production build, and zero warnings.

## Historical execution-order context — retained for audit

Binding Product Owner law:

1. close problems in current implemented components first;
2. then proceed bottom-up by dependency;
3. never jump to a higher-level composite/pattern/family while a lower
   dependency remains unresolved;
4. the next item is the lowest unresolved dependency, not simply the next row
   in historical planning.

The current authorization supersedes the earlier Table-candidate wording.
Phase A Arabicized exact Tabs evidence without geometry change. The Product
Owner subsequently rejected Table checkpoint
`eddac4a8e8a3460f346bb579fdd5ca0074296e7a` because architecture boundaries
had been used to omit visible reference features. `ERP-TABLE.html`, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`, remains
binding under `table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md`.

Ownership and visual scope are now explicit: base `ErpTable` owns the native
table, selection, sorting, resizing, rows, cells, and rich projections; the
exact experience composes Toolbar, SearchBox, ColumnChooser, Table, footer
counter, and Pagination. A separate ERP owner must be reused, not skipped.
Selection still never implies row activation. Features absent from the rendered
reference—FilterBar, FilterDrawer, BulkActionBar, ViewSwitcher, loading, and
SmartTable orchestration—remain absent rather than being invented.

The current canonical gate passes every governance/lint check, 134/134 test
files and 904/904 tests, both typechecks, production build, and zero warnings.
The current gate is Product Owner review of the full experience at
`/controls/core-batch`; technical green never confers acceptance or authorize a
subsequent Data/Table visual wave.

### Historical ErpTabs-only authorization — superseded

The prior authorized implementation was the literal exact-reference reconstruction
of `ErpTabs`, entered from the Product Owner-rejected technically green
candidate `302056ad312dec403a1cdf2f9ded92d57d011ba5`. That candidate is not a
successful visual rebuild in project history.

`ERP-TABS.html`, SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`, is the
single binding Tabs visual and behavioral authority. It supersedes the Nexlink
reference, the accelerated no-reference waiver, and conflicting visual
interpretations. Geometry and behavior are copied exactly; palette and
font-family values alone map through Honesty ERP system contracts.

The authoritative implementation contract is
`src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md`.

The rebuilt owner implements the reference variants, anatomy, horizontal and
vertical orientations, content/fill distribution, active indicator, panel
relationship, automatic keyboard activation, responsive overflow, and motion.
`ErpTabTrigger` remains a generic semantic owner so Tabs visuals do not leak
into `ErpStepper`; `count` and `renderPanels=false` remain bounded
`ErpAvatarPicker` compatibility extensions.

The rebuilt candidate passes 133/133 test files and 895/895 tests, both
typechecks, production build, all governance, and zero warnings.

Current active gate is Product Owner runtime/Light/Dark/RTL/LTR/narrow review of
`ErpTabs` at `/controls/core-batch` against the binding reference. Select,
StatusBadge, Avatar, AvatarPicker, and every other Core candidate remain closed
to implementation. Browser runtime evidence does not confer visual acceptance.
The Data/Table Visual Correction Wave remains unopened. Technical PASS is not
visual freeze.
Standalone EntityReview, Entity Wizard, workflow engine, DataPage,
EntityDirectory, EntityDetail, CRUD/transaction patterns, Feature/Page
migration, and every unlisted family remain unopened.

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
