# HONESTY ERP Design Lab — NEW CHAT HANDOFF

## 1. Purpose of this document

This is the canonical context-recovery document for starting a new ChatGPT
conversation without losing project history.

The new ChatGPT session must treat this document together with `AGENTS.md` and
the current execution-state files as authoritative project context.

Do not infer that a technical PASS equals Product Owner visual approval.

---

## 2. Project identity

Repository:

`abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Owner local workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

Product direction:

- Arabic-first.
- RTL-first.
- Angular / TypeScript / SCSS standalone browser Design Lab.
- Strict token architecture:
  Reference → Semantic → Theme/Density/Query resolution → Component Tokens → Components.
- Product Owner is the final visual authority.
- ChatGPT acts as architecture/governance/external-review authority.
- Implementation agents are execution-only and must not make product/design decisions.

---

## 3. Mandatory operating workflow

For every bounded implementation cycle:

1. Review current Git state and relevant source.
2. Product Owner / ChatGPT defines exact scope and non-goals.
3. Implementation executes only that bounded scope.
4. Run all required verification.
5. Review evidence externally.
6. Update persistent project-state files.
7. Only then authorize the next execution unit.

Never treat an agent's "COMPLETE" statement as sufficient evidence.

Visual approval remains exclusively with the Product Owner.

Persistent state must not live only in chat.

After every decision, implementation, blocker, verification result, or scope
change, update:

- `NEW_CHAT_HANDOFF.md`
- `AGENTS.md`
- `POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
- `CONTROLS_EXECUTION_ROADMAP_V1.md`

as applicable.

---

## 4. Important historical execution checkpoints

Key recent checkpoints, in execution order:

- `87e3fe4269ffec65f7c1c12342b59349385109c0`
  CR12 governance/test/documentation consolidation.
- `a55c2782fb2a65cf913a5ab35c2ce3add3c5c94a`
  Overlay motion/frame governance consolidation.
- `06ab7d326b6f2b6c5d6d863e2acefcc994b04b53`
  Product Owner local theme-authority cleanup preserved.
- `b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9`
  First page-by-page review corrections.
- `677fa6c56e602861193b3889c8ea9ae9b6a854a2`
  First-round review state persisted.
- `ce7404252902353ca2f7432ede9aeead2cb84053`
  Overview converted to ERP-only authoring.
- `b96a6f70da6b232268b6e117c0307c0f23a50a36`
  ERP-only authoring enforced across all routed Design Lab pages.
- `70e3a008450cac45d2f3f43a5d2051affdf14c8a`
  ERP-only page-authoring state synchronized.
- `9afec19d133f9414ebd1fedd537f91637bf98db8`
  Build/editor diagnostics cleanup.
- `ea43868cb98545c62b4173f854a6bec576dee48e`
  Zero-warning verification tooling consolidation.
- `e403fa73d96bdfe18bd8c2b4fa61e28eb5b3b43b`
  Local zero-warning gate introduced.
- `a2e1793faa489702dac4721d9ac1c3ec6c5b7d74`
  Review-select text governed by ErpText.
- `f4c1a103f44a7272f3e5051fe21aeb9cd39b308f`
  Field governance updated for split style files.
- `030a74bb6e6977ecca6d33a373ef806a93c35306`
  ReviewSelect native output collision corrected.
- `320f66879036530dbfc509bd587724f799ba62c6`
  Single App theme authority enforced.
- `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`
  Zero-warning runner made Windows-safe.
- `b1b20585adcb272f17835ef8182935353a67d243`
  Remaining zero-warning gaps closed.
- `22f6f61fa95bb38fef2d31cb47b797c1c00be543`
  Fully green local verification recorded.

The current handoff synchronization commit will be later than the above and is
documentation/state only.

---

## 5. Current verified technical state

The source checkpoint `b1b20585adcb272f17835ef8182935353a67d243`
was verified locally in the Product Owner Windows workspace.

Verified:

- Single App theme authority gate: PASS.
- ERP-only routed-page authoring: PASS for 22 routed templates.
- Component Token governance: PASS.
- System color registry: PASS.
- ErpText governance: PASS.
- ErpIcon governance: PASS.
- ErpButton governance: PASS.
- ErpTooltip governance: PASS.
- ErpField governance: PASS.
- ErpOverlay governance: PASS.
- Angular lint: PASS.
- Test files: 87/87 PASS.
- Tests: 618/618 PASS.
- `typecheck:app`: PASS.
- `typecheck:spec`: PASS.
- production `build:clean`: PASS.
- Angular build warnings: zero.
- `Zero-warning build gate: PASS`.

This is technical verification only, not visual approval.

---

## 6. Current architectural/governance decisions

### 6.1 ERP-only page authoring

Every routed Design Lab page template resolved from `app.routes.ts` authors
`erp-*` tags only.

Native HTML/SVG/form semantics needed by route pages are owned internally by
approved ERP primitives/controls or Design-Lab-only `erp-review-*` internals.

Do not reintroduce raw route-page HTML authoring.

### 6.2 Single App theme authority

The App root is the only runtime Light/Dark authority.

Exactly one runtime theme binding belongs in `app.html`:

`[attr.data-theme]="theme()"`

`app.ts` owns theme state and the top toolbar theme button.

No route page, component, popup, overlay, or Preferences setting may own a
competing Light/Dark theme.

Central Foundation mappings
`src/styles/foundation/themes/_light.scss` and `_dark.scss`
remain valid system implementation, not local page authority.

### 6.3 Preferences

Theme was removed from Preferences entirely.

The old persisted `theme` key is migrated away without resetting the remaining
preferences.

Preferences remains the source of truth for supported numeric/digit/money/
temporal formatting behavior.

### 6.4 Zero-warning contract

`npm run verify:clean` is the canonical technical gate.

It covers governance/lint, tests, TypeScript app/spec no-emit checks, and
zero-warning production build.

Component-style budgets remain 4 kB warning / 8 kB error; do not raise them to
hide warnings.

### 6.5 Checkbox / RadioBox

Do not delete or redesign them yet.

Product Owner has dedicated visual templates/references to supply later.

### 6.6 Page-by-page visual approval

Technical implementation does not equal visual approval.

The Product Owner is reviewing the Design Lab page by page.

The first reviewed/corrected family included Overview, Structural, Typography,
Icons, Buttons, Tooltip, Inputs, and blocking picker/overlay behaviors.

---

## 7. Major Product Owner decisions already implemented in the first review round

- Overview updated from obsolete pre-production status.
- ErpContainer contract retained:
  - full: no max-width
  - narrow: 48rem
  - content: 75rem
  - wide: 90rem
- Tooltip default enter: slide-up.
- Tooltip default exit: visually slide-up.
- Tooltip animation separated from anchored measurement geometry.
- SearchBox popup must not be narrower than its field when viewport permits.
- SearchBox leave lifecycle must not block controls beneath it.
- Field feedback caret below a field points physically upward in RTL and LTR.
- Money/temporal formatting consumes shared Preferences rather than uncontrolled locale side-effects.
- File/Image selected rows received tokenized hover/focus feedback.
- Blocking Overlay initial focus must not default to close action.
- Overlay header hierarchy corrected.
- Overlay footer is one generic ordered typed action surface.
- Today / Clear / Clear Selected moved into shared footer actions.
- Color system swatches have visible semantic borders.
- IconPicker does not falsely outline the first item on open.
- ItemPicker / ComboBox textual options are list rows, not fixed square tiles.
- ComboBox opens on pointer interaction, ArrowDown, and typing.
- Theme authority is App-only.
- Routed pages are ERP-only authoring.

---

## 8. Current App shell fact: iframe architecture

At the time of this handoff, `app.html` still uses an iframe for ordinary
review routes.

Current architecture:

- outer Design Lab toolbar/navigation;
- Desktop/Tablet/Mobile preview controls;
- iframe preview for ordinary routes;
- query flags such as `labPreview=1` and `labTheme=...`;
- embedded App mode inside the iframe;
- special direct rendering for:
  - `/controls/inputs`
  - `/controls/overlays`
- screenshot logic composes toolbar capture + embedded iframe capture.

The special direct rendering is the reason Inputs and Overlays currently do not
show the same Desktop/Tablet/Mobile controls as ordinary routes.

---

## 9. LATEST PRODUCT OWNER DECISION — NOT YET IMPLEMENTED

The iframe architecture must be removed completely.

The Design Lab should become a normal single-document Angular application.

Required next correction:

1. Remove `<iframe id="lab-preview-frame">` from `app.html`.
2. Remove embedded-preview mode and iframe-only branching.
3. Remove iframe-specific helpers/state such as:
   - `hasLabPreviewFlag`
   - `buildLabPreviewUrl`
   - `isEmbeddedPreview`
   - iframe-based `previewSafeUrl`
   - special `isDirectLabReviewRoute` behavior if no longer needed
   - iframe document traversal for screenshots.
4. Render every route directly through one normal `router-outlet`.
5. Inputs and Overlays must no longer be special rendering exceptions.

### Desktop / Tablet / Mobile controls

The Product Owner wants them only if they remain technically truthful without
iframe.

Important: merely setting a container width does NOT necessarily reproduce
browser viewport media-query behavior.

Therefore the next ChatGPT session must first review the repository's
responsive implementation and determine whether these controls can still
provide honest review behavior in a single document.

If not, remove Desktop / Tablet / Mobile controls entirely.

Do not preserve misleading simulation.

### Screenshot

Attempt to retain screenshot only if direct single-document capture is clean,
simple, and deterministic.

If no clean solution remains without iframe, remove screenshot as well.

The Product Owner explicitly prefers removing optional tools over retaining the
iframe.

### Non-goals of this next task

- no unrelated component redesign;
- no new public component family;
- no Checkbox/RadioBox redesign;
- no new Foundation token decisions;
- no weakening of theme, ERP-authoring, or zero-warning governance.

After implementation run full `npm run verify:clean`, then Product Owner
visually reviews the result.

---

## 10. Exact next authorized action

New ChatGPT session should:

1. Read all supplied handoff/governance files.
2. Verify current GitHub `main` before making current-state claims.
3. Review `app.html`, `app.ts`, App SCSS, App tests, route behavior, screenshot
   code, overlay-host placement, and responsive Query API usage.
4. Decide from actual source whether Desktop/Tablet/Mobile controls can remain
   truthful without iframe.
5. Decide from actual source whether screenshot can remain cleanly in a direct
   single-document model.
6. Produce a bounded implementation plan/prompt or implement only if the user
   asks the new session to edit GitHub directly.
7. Remove the iframe architecture according to the Product Owner decision.
8. Run/review full verification.
9. Update all persistent handoff/state files again.

Do not start later page-by-page visual findings before this shell correction is
complete.

---

## 11. Source-of-truth files

Read these before acting:

- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `AGENTS.md`
- `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
- `src/app/controls/CONTROLS_CORRECTION_PROGRAM_V1.md`
- `src/app/controls/POST_CR12_REVIEW_WAVE_A_V1.md`

---

## 12. Handoff rule

If this project continues in another chat, never ask the Product Owner to
reconstruct this history manually.

Read this file first, verify live repository state, and continue from the exact
next authorized action.


---

# 18. 2026-09-29 — NO-IFRAME IMPLEMENTATION RESULT / VERIFICATION PENDING

**This section supersedes older wording in sections 12–17 that described iframe removal as not yet implemented.**

Product Owner authorized direct implementation on GitHub `main`.

Implementation commits:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a`
  `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9`
  `style(lab): normalize direct shell markup`

Current source result:
- no preview iframe in `src/app/app.html`;
- exactly one direct `router-outlet`;
- no embedded/direct/outer dual rendering mode;
- no `labPreview` query flag;
- no iframe-specific `labTheme` query propagation;
- no `DomSanitizer` / `SafeResourceUrl` iframe path;
- no special Inputs/Overlays direct-route exception;
- no Desktop / Tablet / Mobile preview controls;
- App responsiveness now follows the actual browser viewport only;
- Screenshot remains and captures `#lab-capture-root` directly in the same document;
- Screenshot filename includes the current theme, e.g. `foundation-overview-light-view.png` or `controls-overlays-dark-view.png`;
- one App-owned `[attr.data-theme]="theme()"` remains;
- exactly one App-level `ErpOverlayHost` remains;
- iframe-only styles/tests/helpers were removed or rewritten for the single-document model.

Architecture reason for removing Desktop/Tablet/Mobile:
- Foundation Query API explicitly distinguishes viewport media queries from container queries;
- resizing a same-document container would not change real `@media` viewport evaluation;
- Product Owner prohibited misleading viewport simulation.

Independent post-commit source inspection confirmed in the touched App files:
- iframe count = 0;
- preview-button count = 0;
- router-outlet count = 1;
- OverlayHost count = 1;
- iframe-specific state/helper identifiers = 0;
- screenshot filename helper/tests include both `light` and `dark`.

## Verification status

**Do not call this source Fully Green yet.**

Last fully verified source remains:
`b1b20585adcb272f17835ef8182935353a67d243`

The mandatory next gate is:
`npm run verify:clean`

The ChatGPT tool environment used for the GitHub write does not have a repository checkout/network path capable of executing the repository's Node/npm verification locally, and the repository has no existing GitHub Actions workflow to run that gate remotely. Therefore the new source checkpoint is implemented and externally source-reviewed, but the canonical local verification remains pending.

## Exact next authorized action

1. Run `npm run verify:clean` against current `main` / the no-iframe source.
2. If it passes, record the new fully verified source checkpoint and zero-warning evidence.
3. If it fails, correct only the demonstrated regression within this no-iframe scope.
4. After technical verification, Product Owner resumes page-by-page visual/runtime review.

No unrelated component redesign or later family work is authorized by this implementation.

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


---

## 2026-09-29 — Typography Primitives visual review / screenshot-tool deferral

Product Owner decision:
- the screenshot capture-progress artifact is a non-critical Design-Lab-only tooling issue;
- cleanup is deferred;
- it does not block page-by-page visual review.

Product Owner supplied Light and Dark full-page evidence for `/primitives/typography`.

External review result:
- no blocking page-specific visual defect identified;
- Type Defaults, Sizes / Weights / Line Heights, Tones / Families / Alignment, Headings / Blocks / Containers, Inline Semantic Types, Data / Lists / Table / Form Text, and Direction / Ruby / Wrapping / Overflow / Link evidence are visually coherent in both themes;
- no visible clipping, overlap, RTL/LTR break, theme leakage, or hierarchy failure was identified from the supplied screenshots.

Review decision:
- no Typography correction is opened from this evidence;
- proceed to the next page;
- this is not a Product Owner visual freeze unless explicitly declared.

Technical verification boundary remains unchanged:
- no-iframe `npm run verify:clean` is still pending;
- last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.


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


---

# 19. 2026-09-29 — TOOLTIP POSITIONING CORRECTION IMPLEMENTED / RE-REVIEW PENDING

Product Owner authorized the blocking Tooltip correction and added a system-wide motion decision:

- default Tooltip enter animation = `zoom`;
- default Tooltip exit animation = `zoom`;
- developers may explicitly override either animation on an individual Tooltip.

Implementation commit:
- `7a0a14f090ee38df3ea4adc02255856d89b6c71a`
  `fix(tooltip): enforce anchored positioning contract`

Implemented architecture:
- added `src/app/controls/tooltip/TOOLTIP_POSITIONING_POLICY_V1.md` as the explicit Product Owner positioning law;
- Tooltip body and arrow now live inside one animated visual assembly;
- the fixed outer surface remains untransformed and owns anchor/collision geometry;
- shared anchored-overlay geometry now evaluates preferred -> opposite -> perpendicular candidates ordered by available room;
- if no candidate fully fits, it deterministically chooses the roomiest candidate and clamps to the visual viewport;
- logical start/end still resolve through LTR/RTL;
- arrow geometry is canonical across every direction: one base/depth contract rotated for side placements rather than shrunk;
- scroll/resize reposition acceptance coverage was strengthened;
- Tooltip semantic overlay layer usage is now explicitly governance-checked;
- Tooltip motion governance now enforces `zoom` / `zoom` defaults;
- Design Lab motion selectors now wrap all system presets instead of hiding evidence behind horizontal overflow.

Source-level post-commit inspection on current main confirmed:
- no legacy Tooltip `slide-up` default remains;
- `zoom` enter/exit defaults are present;
- production side-arrow size remapping is removed;
- four-side perpendicular fallback is present;
- arrow is inside the motion assembly;
- Tooltip surface still consumes the approved semantic layer token;
- showcase motion evidence wraps.

Verification status:
- source correction is implemented but **not yet declared Fully Green**;
- a fresh `npm run verify:clean` is mandatory;
- last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.

Review status:
- Tooltip V1 remains BLOCKED for page progression until Product Owner runtime re-review confirms the corrected arrow attachment, placement/fallback, scroll anchoring, motion, and Light/Dark behavior.
- no later Design Lab page is authorized before that Tooltip re-review.


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


---

# 20. 2026-09-29 — VERIFY:CLEAN REACHED NG LINT; SINGLE TEST LINT FIX APPLIED

Product Owner reran local verification after the no-iframe Overlay governance correction.

Local evidence at `ea6a452f7fe37a8b12efde0515144202233d88ea`:
- `node tools/controls/check-erp-overlay-governance.mjs --self-test` — PASS.
- `npm run erp-overlay:check` — PASS.
- `npm run build:clean:self-test` — PASS.
- `npm run build:clean` — PASS.
- production Angular build completed successfully.
- `Zero-warning build gate: PASS`.

The subsequent full `npm run verify:clean` passed all governance checks shown in the supplied log:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- System color registry;
- ErpText governance;
- ErpIcon registry + governance;
- ErpButton governance;
- **ErpTooltip governance**;
- ErpField governance;
- **ErpOverlay governance**.

It then reached Angular ESLint and stopped on exactly one lint error:

`src/app/shared/anchored-overlay/anchored-overlay-controller.spec.ts:127:20`
`@typescript-eslint/array-type`

Cause:
- test code used `Array<{x: number; y: number}>`;
- repository lint contract requires `{x: number; y: number}[]`.

Bounded source correction:
- `3eb993e64616362bf920284e37b5005d412fd531`
  `fix(test): satisfy array-type lint rule`

No runtime, production Tooltip, Overlay, geometry, or App behavior changed in this fix.

Verification status:
- do NOT declare Fully Green yet;
- rerun the complete `npm run verify:clean` from the latest `main`;
- if the full gate passes through lint, tests, both typechecks, and zero-warning build, the latest source can become the new Fully Green checkpoint.

Tooltip page remains the active blocking visual-review page until technical verification completes and Product Owner runtime Light/Dark re-review is performed.


---

# 21. 2026-09-29 — FULL VERIFY:CLEAN PASS / NEW FULLY GREEN CHECKPOINT

Product Owner completed the canonical local verification from repository HEAD:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting commit contained in that checkout:

`3eb993e64616362bf920284e37b5005d412fd531`
`fix(test): satisfy array-type lint rule`

The full command:

`npm run verify:clean`

completed successfully end-to-end.

Verified results:
- all governance/lint stages PASS, including:
  - Single App theme authority;
  - route-page ERP-only authoring;
  - Component Token framework;
  - System color registry;
  - ErpText;
  - ErpIcon registry/governance;
  - ErpButton;
  - ErpTooltip;
  - ErpField;
  - ErpOverlay;
  - Angular ESLint;
- `All files pass linting.`
- 87 / 87 test files PASS;
- 615 / 615 tests PASS;
- Tooltip suite: 24 tests PASS, including Zoom/Zoom default evidence;
- anchored-overlay geometry suite: 10 tests PASS;
- anchored-overlay controller suite: 4 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- final production Angular build PASS;
- final `Zero-warning build gate: PASS`.

This supersedes all earlier wording that kept
`b1b20585adcb272f17835ef8182935353a67d243` as the latest Fully Green source.

## Current technical checkpoint

Fully verified repository checkout:
`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting checkpoint:
`3eb993e64616362bf920284e37b5005d412fd531`

Technical state: **Fully Green**.

## Current Product Owner review state

Technical verification is no longer blocking.

Tooltip V1 remains the active page-review blocker by Product Owner decision.
No later page review is authorized until runtime Light/Dark Tooltip evidence is
re-reviewed and accepted, including:
- default Zoom enter/exit;
- body + arrow moving together;
- top/bottom/start/end placement;
- preferred placement preservation;
- opposite/perpendicular collision fallback;
- edge behavior;
- scroll anchoring;
- resolved arrow direction and attachment;
- z-index/layer behavior.

The previously deferred Design-Lab screenshot progress artifact remains
non-blocking and unchanged.


---

# 22. 2026-09-29 — TOOLTIP CROSS-AXIS ARROW CENTERING CORRECTION

After the prior Fully Green checkpoint, Product Owner runtime review identified a
new visual defect in Tooltip arrow centering:

- left/right placement arrows were visibly biased downward instead of being
  vertically centered;
- top/bottom placement arrows were visibly biased horizontally instead of being
  centered on the trigger cross-axis.

Root-cause review found a concrete geometry defect:
- canonical arrow base = 16px;
- plain Tooltip minimum block size = 24px;
- configured arrow safe inset = 8px;
- the old clamp requested a minimum center of 16px and a maximum center of 8px
  on a 24px side-placement cross-axis;
- that impossible interval was resolved toward the minimum bound, biasing the
  side arrow downward.

Product Owner centering law:
- arrow cross-axis center must target the trigger center;
- safe inset is symmetric and must never bias the arrow up/down/left/right;
- if the Tooltip is too compact to afford the configured safe inset on both
  sides of the canonical arrow, the effective inset shrinks symmetrically;
- CSS positioning must express centering directly rather than manually
  subtracting half-size.

Implementation:
- `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`
  `fix(tooltip): center arrow on trigger cross-axis`

Implemented changes:
- anchored geometry now derives a maximum symmetric safe inset from the actual
  cross-axis size;
- effective safe inset is capped symmetrically;
- when the cross-axis is no larger than the canonical arrow base, the arrow
  center collapses to the geometric cross-axis midpoint;
- top/bottom arrows use `left = center` + `translateX(-50%)`;
- left/right arrows use `top = center` + `translateY(-50%)`;
- deterministic tests cover compact 24px side and top surfaces;
- Tooltip unit tests cover explicit cross-axis centering for all four physical
  placements;
- Tooltip positioning policy and Tooltip V1 documentation were updated.

Verification status:
- the previous Fully Green checkout remains
  `310b5afe8e6f018bb4d52f68be2986bbe2d31365`;
- the new source commit `632f45a...` is NOT yet Fully Green;
- fresh `npm run verify:clean` is mandatory.

Review status:
- Tooltip V1 remains BLOCKED;
- no later Design Lab page review until this correction passes technical
  verification and Product Owner runtime Light/Dark re-review.


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


---

# 24. 2026-09-29 — INPUTS PAGE PRODUCT OWNER REVIEW / BLOCKING FINDINGS

Product Owner supplied Light/Dark full-page Inputs evidence plus focused SearchBox
runtime evidence and opened a blocking review of `/controls/inputs`.

A dedicated findings document was added:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Confirmed Product Owner findings:
- SearchBox dropdown results are not selectable;
- typing does not filter the projected results;
- SearchBox is effectively static review evidence in this scenario;
- dropdown width does not equal field width;
- no explicit dropdown close action exists;
- interaction with fields geometrically below/behind the open dropdown is broken;
- previously agreed SearchBox focus modes must be restored as a three-state
  contract: modal search / anchored dropdown / plain inline input;
- second MoneyBox evidence must show Arabic-Indic digits;
- Time picker adds Now;
- DateTime picker adds Now;
- DateRange adds previous/next week and previous/next month presets;
- all selection/picker Confirm actions are disabled until a valid staged selection
  exists, while Cancel and Close remain enabled.

External source review confirmed additional gaps:
1. SearchBox currently has only `popupMode: boolean`; no modal/dropdown/inline
   mode contract and focus itself does not drive the agreed behavior.
2. SearchBox uses static projected result content and commits popup query text
   directly to its value; query and selected result are not distinct.
3. Anchored popup semantics are always dialog semantics; dropdown/listbox semantics
   are not represented.
4. Inputs review page repeatedly uses 2-column grids with only one surface,
   leaving a large unused half-column in the supplied full-page evidence.
5. Temporal empty-state copy remains hard-coded in English.

Current SearchBox width source explicitly uses
`max(trigger width, popup min width)`, confirming the width mismatch is structural
rather than screenshot scaling.

Current selection/temporal picker code updates Clear action state but does not
disable Confirm based on staged selection validity.

Page status:
**Inputs is BLOCKED. Do not pass this page until correction + re-review.**

Tooltip status remains separately pending after the latest coordinate-origin fix;
the latest Tooltip source correction is still subject to fresh technical
verification/runtime acceptance.


---

# 25. 2026-09-29 — INPUTS CORRECTION UNIT IMPLEMENTED / VERIFICATION PENDING

Product Owner authorized implementation of the blocking Inputs findings.

Latest source checkpoint:
`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`
`fix(inputs): guard Now against Time bounds`

## SearchBox

Implemented:
- public `mode: 'dropdown' | 'modal' | 'inline'`, default `dropdown`;
- focus opens the configured search experience for dropdown/modal;
- inline mode remains a normal native search editor and opens nothing;
- readonly `items` result contract with stable value/label/disabled/icon;
- dropdown query is transient and separate from committed CVA value;
- filtering matches item label or value;
- pointer result selection commits only enabled item values;
- keyboard result navigation uses Arrow/Home/End and skips disabled results;
- dropdown uses combobox/listbox/option semantics;
- modal mode reuses `ErpSelectionPickerContent` through `ErpOverlayManager`;
- explicit dropdown Close action;
- Escape and outside dismissal retained;
- leaving popup becomes inert/noninteractive before native Popover teardown;
- dropdown geometry anchors to the complete visual `.field-frame__control`
  rather than only the inner trigger button;
- popup inline size equals full field-control width unless viewport clamping is
  unavoidable;
- inline Clear restores focus to the inline editor.

The obsolete boolean `popupMode`, static `[search-results]` projection, and
`data-search-box-popup-mode` contract are removed.

## Selection confirmation law

Implemented for Color/Icon/Item/Combo picker content:
- Confirm starts disabled;
- Confirm enables only for a valid staged selectable value;
- disabled item values cannot enable confirmation;
- Confirm handler itself is guarded against invalid staged state;
- Cancel and header Close remain available.

Shared OverlayRef was also hardened:
- dynamically disabled/loading frame actions cannot dispatch their handlers even
  if requested programmatically.

## Temporal quick actions and confirmation law

Implemented:
- Time: `الآن`;
- DateTime: `الآن`;
- Now floors minutes to configured `minuteStep`;
- Time Now is disabled when the stepped current time violates min/max;
- DateRange:
  - previous calendar week;
  - next calendar week;
  - previous calendar month;
  - next calendar month;
- week presets honor `weekStartsOn`;
- Date / Time / DateTime / DateRange Confirm starts disabled until staged state
  is valid;
- Time requires valid hour+minute within bounds;
- DateTime requires date+time;
- Date requires valid date;
- DateRange requires both valid endpoints;
- Confirm handler is independently guarded.

## MoneyBox

Implemented optional per-instance:
`digitSet: 'latin' | 'arabic-indic' | null`

Rules:
- null continues to inherit the shared Preferences money digit context;
- no formatter logic is duplicated;
- Arabic-Indic review evidence can coexist with Latin evidence in the same page.

## Inputs review surface

Implemented:
- SearchBox dropdown/modal evidence uses real selectable data;
- Arabic-Indic MoneyBox evidence added;
- temporal empty display placeholders converted from stale English strings to
  Arabic-first per-control placeholder inputs;
- single review surfaces span the full two-column review grid, removing the
  large unused half-column.

## Governance / tests

Field governance now enforces:
- SearchBox three-mode/selectable/filterable contract;
- modal reuse through OverlayManager;
- exact field-width dropdown behavior;
- no static projected search-results contract;
- temporal Now/range-preset contracts;
- staged Confirm state/handler guards;
- MoneyBox digit override fallback to Preferences;
- expanded Arabic-first labels.

Overlay governance now enforces disabled/loading frame-action dispatch blocking.

Tests were expanded across SearchBox, MoneyBox, selection picker content,
temporal picker content, OverlayRef, and Inputs showcase.

## Verification status

**Do not declare this source Fully Green yet.**

Latest fully verified checkout remains:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Mandatory next gate:
`npm run verify:clean`

After technical green:
1. Product Owner re-tests SearchBox dropdown/modal/inline runtime behavior;
2. Product Owner checks MoneyBox Arabic digits;
3. Product Owner checks temporal quick actions and Confirm disabled behavior;
4. Product Owner re-reviews the full Inputs page in Light/Dark.


---

# 26. 2026-09-29 — VERIFY:CLEAN STOPPED AT BUTTON GOVERNANCE; SEARCHBOX RESULT PRIMITIVE FIXED

Product Owner locally updated to:
`a8b33f1fecbd8c468bd68add4281fe925c7845b5`

Local preflight evidence:
- clean working tree;
- Overlay governance checker self-test PASS;
- `npm run erp-overlay:check` PASS;
- `npm run build:clean:self-test` PASS;
- `npm run build:clean` PASS;
- `Zero-warning build gate: PASS`.

The full `npm run verify:clean` then passed:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- system colors;
- ErpText;
- ErpIcon registry/governance.

It stopped at:
`npm run erp-button:check`

Exact finding:
`src/app/controls/search-box/search-box.html:173:11`
`concrete Controls and Composites must use an approved internal button primitive`

Root cause:
SearchBox dropdown results used a raw native `<button>`.

Bounded source correction:
- `cf91967291961037dd7f35d0e825fc4fb2da8312`
  `fix(inputs): govern SearchBox results through SelectionTile`

Correction details:
- raw result button replaced by approved internal `ErpSelectionTile`;
- `presentation="list"` preserves list-result presentation;
- SelectionTile owns native button semantics, role=option, aria-selected,
  disabled behavior, and focus API;
- SearchBox uses `viewChildren(ErpSelectionTile)` for keyboard focus;
- SearchBox result CSS no longer reimplements internal button state visuals;
- SearchBox unit tests target the SelectionTile inner button where activation is
  required;
- Field governance valid fixtures now require SelectionTile-based search
  results.

This is a governance-alignment correction only; the Product Owner SearchBox
functional contract remains unchanged.

Current verification status:
- current source is NOT yet Fully Green;
- rerun complete `npm run verify:clean` from current `main`;
- do not skip directly to later stages because the prior command stopped at
  Button governance.


---

# 27. 2026-09-29 — VERIFY:CLEAN REACHED TESTS; SIX TEST-HARNESS FAILURES CORRECTED

Product Owner ran the full canonical verification at:

`a85c13899613b239ea28c848b61af3454b3fe5f0`

The run passed all governance and lint gates:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- System color registry;
- ErpText;
- ErpIcon registry/governance;
- ErpButton governance;
- ErpTooltip governance;
- ErpField governance;
- ErpOverlay governance;
- Angular lint.

It then ran the full test suite.

Observed result:
- 87 total test files;
- 84 passed / 3 failed;
- 626 total tests;
- 620 passed / 6 failed.

The six failures were:
1. SearchBox filtered selection committed `invoice` correctly, but the test read
   `data-search-box-popup-phase` before a fixture change-detection pass.
2. SearchBox End-key test created a non-bubbling synthetic KeyboardEvent after
   result interaction moved inside `ErpSelectionTile`; the event therefore did
   not reach the host keydown listener.
3. Selection system-color confirm test timed out.
4. Selection free-color confirm test timed out.
5. Selection keyboard-icon confirm test timed out.
6. Temporal staged-time confirm test timed out.

The four Confirm timeouts shared one test-harness cause:
- the new product contract disables Confirm until staged state is valid;
- the tests changed staged state and immediately clicked the still-rendered
  disabled native Confirm button without `fixture.detectChanges()`;
- runtime Angular event/change-detection cycles do not perform those two user
  interactions in one undetected synchronous test step.

Bounded test-only correction:
- `92840de9c670edd32b05c1485f50c2e61e68fead`
  `fix(test): flush staged picker state before confirmation`

Changes:
- SearchBox selection test now renders the leaving phase before asserting host
  evidence;
- SearchBox End key uses `bubbles: true`;
- selection color/free-color/icon tests flush staged action-state rendering
  before Confirm;
- temporal staged-time test flushes staged action-state rendering before Confirm.

No production/runtime source changed in this commit.

Current status:
- source remains NOT Fully Green until a fresh complete
  `npm run verify:clean` passes;
- do not skip directly to test/typecheck commands because the canonical gate
  must be proven end-to-end.


---

# 28. 2026-09-29 — VERIFY:CLEAN DOWN TO ONE APP INTEGRATION TIMEOUT; TEST ISOLATED

Product Owner reran the canonical gate at:

`f8ab6433636f6adefdd43d7613545aa87041560f`

The run passed:
- all governance;
- Angular lint;
- SearchBox 11/11;
- Temporal picker 14/14;
- Selection picker 16/16;
- Inputs showcase 14/14.

Overall test result:
- 86 / 87 test files PASS;
- 625 / 626 tests PASS.

Only failure:
`src/app/app.spec.ts`
`renders Foundation, Inputs, and Overlays through the same direct document model`

Observed duration:
approximately 5239 ms, slightly beyond the Vitest 5000 ms default.

The test itself performs three lazy route navigations/render cycles in one
`it()`:
1. `/foundation/overview`;
2. `/controls/inputs`;
3. `/controls/overlays`.

Correction:
- `72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`
  `fix(test): isolate direct-route app integration cases`

The exact same single-document assertions are preserved, but each lazy route is
now its own test case. This avoids an accumulated timing failure without:
- increasing test timeout;
- weakening assertions;
- changing runtime source;
- changing route architecture.

Verification status:
- source remains NOT Fully Green until fresh full `npm run verify:clean` passes.


---

# 29. 2026-09-29 — SEARCHBOX CLOSED-POPOVER HIT/FOCUS RUNTIME BLOCKER CORRECTED

Product Owner runtime re-test showed that the SearchBox dropdown still behaved as
if interactive after it visually closed.

Observed Product Owner evidence:
- choose a dropdown result;
- dropdown appears closed;
- click a lower input field;
- lower field may not retain focus;
- SearchBox selection may change again as though a result row were still hit;
- selected SearchBox had no clear action visible.

This is a real runtime blocker, not a test-only issue.

## Root cause

The dropdown close lifecycle previously:
1. set phase to `leaving`;
2. marked surface inert;
3. waited for exit transition duration;
4. only then called `controller.hide()` / native `hidePopover()`;
5. only then restored trigger focus.

That design allowed native top-layer lifetime and delayed focus restoration to
outlive the visible close transition.

## Source corrections

Primary runtime correction:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`
  `fix(inputs): release SearchBox top layer on close`

Hardening follow-up:
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`
  `fix(inputs): harden SearchBox popover teardown`

Implemented invariants:
- close begins -> surface immediately inert;
- close begins -> `pointer-events:none` immediately;
- close begins -> `aria-hidden=true` immediately;
- close begins -> native Popover is hidden immediately;
- close begins -> SearchBox removed from open stack immediately;
- close begins -> dismissal listeners detached immediately;
- Selection/Close/Escape may restore trigger focus immediately, within the same
  close event;
- outside dismissal does not restore focus;
- no timer is allowed to restore focus later;
- exit timer is bookkeeping only;
- final cleanup clears inert/pointer/aria state for the next opening;
- AnchoredOverlayController teardown attempts native `hidePopover()`
  unconditionally when available, protected by try/catch.

## Regression evidence added

SearchBox tests now prove:
- selected result closes the native Popover immediately;
- a subsequently focused input remains focused after all close timers run;
- no second result commit occurs after closure;
- explicit Close releases top layer immediately;
- clearable dropdown exposes and commits the standard clear action.

AnchoredOverlayController test now proves:
- native hide is attempted even if `:popover-open` pseudo-state matching is
  unavailable/throws.

## Clear action

Inputs showcase SearchBox instances now enable inherited `clearable` for:
- dropdown mode;
- modal mode;
- inline mode.

The clear action remains standard Field Family behavior and is visible when a
committed value exists.

## Verification status

Current source checkpoint:
`4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`

Fresh full `npm run verify:clean` is mandatory.
Inputs remains Product Owner BLOCKED pending runtime re-test and visual review.


---

# 30. 2026-09-29 — EXACT SEARCHBOX ROOT CAUSE FOUND: CLOSED POPOVER DISPLAY OVERRIDDEN

Product Owner explicitly requested that no further speculative changes be made:
either identify the exact literal cause or stop and report failure.

The exact cause was found.

## Exact defect

SearchBox popup is authored as:
`popover="manual"`

but production stylesheet had:

`.search-box__popup { display: grid; ... }`

Native Popover uses browser-owned `display: none` while closed. An author
`display:grid` declaration on the base Popover rule overrides that hidden
display state.

At the same time SearchBox base styles set hidden opacity/transform values.
Therefore, after close:
- the popup can look visually gone because opacity is at its hidden value;
- the element can still exist as a fixed layout/hit-test box because author CSS
  forces `display:grid`;
- lower fields can fail to receive pointer interaction;
- an invisible SearchBox result can receive the click, changing selection while
  the dropdown appears closed.

This matches the Product Owner runtime reproduction exactly.

## Source correction

`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`
`fix(inputs): preserve native closed-popover display state`

Implemented:
- remove `display:grid` from base `.search-box__popup`;
- add:
  `.search-box__popup:popover-open { display:grid; }`;
- preserve native browser closed `display:none`;
- governance rejects `display` declarations inside the base popup rule;
- governance requires grid display only under `:popover-open`;
- invalid governance fixtures cover both regressions;
- Field Family contract records this native-Popover visibility invariant.

## Status of previous attempted fixes

Previous changes to:
- immediate `hidePopover()`;
- inert;
- pointer-events;
- aria-hidden;
- focus restoration timing;

remain valid defensive lifecycle hardening, but they were not the root cause of
the persistent invisible selectable rectangle.

This new CSS correction is the root-cause fix.

## Verification / review

Fresh `npm run verify:clean` is required.

Product Owner must reproduce exactly:
1. open SearchBox dropdown;
2. select a result;
3. confirm dropdown visually closes;
4. click an input that was geometrically underneath the former popup;
5. verify that input receives/keeps focus;
6. verify SearchBox value does not change again;
7. verify the standard Clear action is present after committed selection.

Inputs remains BLOCKED until that exact runtime test is accepted.


---

# 31. 2026-09-29 — ADDITIONAL INPUTS REVIEW / PRODUCT DECISIONS

Product Owner supplied new visual/runtime findings after the SearchBox work.

Decisions recorded:
- URL/Tel-like domain validation becomes non-destructive;
- invalid user text remains visible and receives automatic feedback;
- Field-family controls become clearable by default with per-instance opt-out;
- Ghost/Text/Underline gain token-owned hover discoverability;
- RangeSlider thumb and rail geometry must use one global coordinate system;
- RangeSlider active thumbs receive moving customizable value Tooltips;
- Time/DateTime Now must reveal the selected time in scrollable lists;
- DateRange calendar presets are replaced by rolling:
  آخر 7 أيام / 7 أيام بدءًا من اليوم / آخر 30 يومًا / 30 يومًا بدءًا من اليوم;
- ColorPicker mode becomes per-instance `system | free`, with no internal mode switch;
- ItemPicker and ComboBox both remain, but review evidence must make their
  select-like vs editable-query interaction distinction obvious.

Exact RangeSlider geometry defect confirmed:
native lower/upper ranges currently change their own max/min to the counterpart
value, while visual fill percentages use global min/max. This creates mismatched
thumb/fill coordinate systems.

No production implementation was performed in this review turn.


---

# 32. 2026-09-29 — UNIFIED ERP INPUT STATE / VALIDATION ARCHITECTURE DECISION

Product Owner requested one common developer-facing validation/state contract
for every ERP input.

New authoritative design:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`

Approved semantic states:
- `null`;
- `empty`;
- `no-selection`;
- `invalid-entry`;
- `valid-entry`.

Important distinction:
`inputState` describes the kind of current entry, while `valid` independently
reports whether that entry is acceptable for current constraints.

Every input will expose:
- `inputState`;
- `valid`;
- `errors: readonly string[]`;
- structured `validationIssues`;
- canonical validation snapshot.

Structured issues contain stable machine-readable code, message, source, and
optional metadata. String `errors` are derived from those issues.

Required becomes a common input contract.

Typed constraints:
- text: minLength/maxLength;
- numeric/money: min/max/step;
- temporal: min/max;
- file/image: minFiles/maxFiles + file policies;
- selection: required/no-selection (future multi-select counts);
- range: global min/max + ordering/span rules.

Min/max validation on editable inputs is non-destructive. Invalid user drafts
remain visible and receive issues rather than being silently clamped, erased, or
reverted.

Validation state is based on the current visible draft where a control has draft
semantics, not only on the last committed CVA value.

Implementation is pending. This decision expands the active Inputs correction
scope.


---

# 33. 2026-09-30 — EXPANDED INPUTS + UNIFIED VALIDATION IMPLEMENTED / VERIFY PENDING

Current implementation checkpoint:
`c3971739198e61adff98d821a6b8f6775faa4e6c`

The Product Owner-approved Inputs corrections and common validation architecture
are now implemented in source, tests, and governance.

## Unified validation substrate

Every ERP input participates in the common contract:
- `inputState`: null / empty / no-selection / invalid-entry / valid-entry;
- `valid`;
- `errors: readonly string[]`;
- structured `validationIssues`;
- canonical validation snapshot;
- common `required`;
- external/server issue input.

Angular Forms integration:
- ErpInputBase implements Validator;
- CVA controls register exactly one NG_VALIDATORS bridge;
- governance enforces exactly one bridge;
- validator change notifications also fire when non-committed visible drafts
  change validation state.

## Non-destructive editable validation

URL/Tel:
- invalid text stays visible;
- invalid text is not reverted/deleted on blur;
- URL publishes url.format;
- Tel publishes multiple simultaneous domain issues such as alphabetic input,
  plus-count/position, and length.

Text/Password/TextArea/Search-inline:
- typed min/max length validation;
- maxLength is not used as native destructive input blocking.

Number/Money/NumberStepper:
- visible invalid drafts are preserved;
- format/min/max/step issues publish through common contract;
- editable out-of-range values are not silently clamped;
- intrinsic stepper button interaction may still mechanically respect bounds.

## Clear behavior

Field-family clearable default is now enabled.
Per-instance `clearable=false` remains authoritative.
Selection/temporal/file controls were corrected so footer/remove/clear actions
honor the opt-out instead of forcing Clear.

## Lightweight visual variants

Ghost/Text/Underline now expose token-owned hover discoverability.
The hover surface color and mix percentage are Foundation Component Tokens.

## RangeSlider

Corrected:
- lower and upper native ranges both use global min/max;
- crossing prevention is logic, not changing the native coordinate domain;
- rail is inset by half thumb size;
- Tooltip anchors use the same thumb-center track;
- physical left positioning avoids RTL double reversal;
- active thumb Tooltip text is developer-formattable;
- Tooltip explicitly requests anchored reposition while active thumb position
  changes;
- validation projects to danger host state, aria-invalid, described-by, and
  visible error copy.

## Temporal

- min/max no longer silently clamp programmatic temporal values;
- Date/Time/DateTime/DateRange publish typed validation issues;
- empty selection states are represented as no-selection where appropriate;
- Now selects current stepped time and scrolls/reveals selected hour/minute;
- DateRange quick actions are rolling inclusive windows:
  - آخر 7 أيام = today - 6 through today;
  - 7 أيام بدءًا من اليوم = today through today + 6;
  - آخر 30 يومًا = today - 29 through today;
  - 30 يومًا بدءًا من اليوم = today through today + 29.

## Selection

ColorPicker:
- public fixed mode: system | free;
- one instance renders one mode only;
- internal mode switch removed;
- mode-mismatched values do not commit.

ItemPicker vs ComboBox:
- ItemPicker remains non-editable/select-like;
- ComboBox remains editable type-to-filter;
- Design Lab evidence makes the distinction explicit.

## File/Image

- no-selection state for empty queues;
- minFiles/maxFiles/type/max-size issues participate in common validation;
- rejected selection attempts also publish developer-visible issues/errors even
  though rejected files are not committed.

## Governance / tests

Field governance now enforces:
- common validation state/issue contract;
- non-destructive maxlength law;
- exactly one Angular validator bridge per CVA control;
- lightweight hover tokens;
- RangeSlider global geometry + moving Tooltip contract;
- temporal rolling actions + Now reveal;
- fixed ColorPicker mode;
- file validation contract;
- prior SearchBox native Popover and three-mode laws.

Source audit found no remaining references to:
- old calendar preset IDs/labels;
- ColorPicker internal mode-switch evidence;
- clearable=false default;
- duplicated concrete required inputs;
- native maxlength binding;
- RangeSlider local min/max coordinate bindings.

## Status

Implementation is complete for this bounded correction program.
Verification is pending.

Mandatory next technical gate:
`npm run verify:clean`

After technical green, Product Owner runtime/Light/Dark re-review remains
mandatory before Inputs can be marked PASS.


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


<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_START -->
## 2026-10-01 — Mandatory continuity quartet + latest Fully Green checkpoint

### Mandatory synchronization rule

For every substantive project turn that changes any of the following:
- Product Owner finding or decision;
- implementation scope or completed correction;
- blocker / unblocked state;
- verification result;
- next execution gate;
- review status or acceptance status;

ChatGPT must update **all four** of these files in the same work cycle before
declaring the turn complete:

1. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
2. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
3. `README_FIRST.md`
4. `NEW_CHAT_HANDOFF.md`

Updating only a subset is not sufficient. These four documents are the required
continuity quartet for preserving current execution state and new-chat context.

### Latest canonical technical verification

Product Owner pulled and verified:
`ff4f721f600490414085e49d9c1975d640fdbbbc`
(`docs(review): synchronize URL regex lint follow-up`).

Canonical command:
`npm run verify:clean`

Result: **FULLY GREEN**.

Verified evidence:
- all repository governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- 653/653 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Current Inputs state:
- technical verification is green for the latest URL/Solid/NumberBox/File-Image
  motion/live-data correction set;
- exact next gate is Product Owner runtime re-test of those findings;
- Inputs remains Product Owner BLOCKED until explicit runtime/visual acceptance;
- no unrelated implementation is authorized.
<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_END -->


<!-- CHATGPT_PROJECT_HISTORY_DIGEST_START -->
## Consolidated project-history digest — through 2026-10-01

This section is the compact continuity timeline for the substantive stages that
must survive chat boundaries. It complements detailed local sections elsewhere
in this repository.

### 1. No-iframe single-document Lab shell — completed

Key implementation checkpoints:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0`
  `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9`
  `style(lab): normalize direct shell markup`

Frozen current law:
- one direct `router-outlet`;
- no preview iframe;
- no embedded/direct dual rendering;
- no `labPreview` query;
- no iframe theme propagation;
- browser viewport is the real responsive authority;
- screenshot capture remains same-document from `#lab-capture-root`;
- exactly one App-level `[attr.data-theme]="theme()"`;
- exactly one App-level `ErpOverlayHost`.

The old Desktop/Tablet/Mobile preview controls were removed because a resized
same-document container cannot honestly simulate viewport media queries.

### 2. Tooltip system — completed before active Inputs work

Important checkpoints:
- positioning contract: `7a0a14f090ee38df3ea4adc02255856d89b6c71a`;
- stale iframe-era overlay governance correction:
  `a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`;
- lint correction: `3eb993e64616362bf920284e37b5005d412fd531`;
- cross-axis correction:
  `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`;
- popover-padding coordinate-origin correction:
  `84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`.

Product Owner changed the default Tooltip motion to Zoom enter + Zoom exit.
Tooltip is not the active workstream.

### 3. Inputs Product Owner review — initial implementation stage

Authoritative findings:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Initial implementation checkpoint:
- `6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

The review established, among other points:
- SearchBox developer-selectable `modal | dropdown | inline` modes;
- functional selectable/filterable results;
- transient query distinct from committed selection;
- anchored dropdown width equal to field subject to viewport clamp;
- explicit close and no invisible/ghost hit target;
- modal vs listbox semantics;
- Time/DateTime Now;
- rolling DateRange actions;
- Confirm disabled until staged selection is valid;
- full-width Inputs Lab review;
- Arabic-first temporal empty-state copy.

Follow-up SearchBox/selection checkpoints:
- `cf91967291961037dd7f35d0e825fc4fb2da8312`;
- `92840de9c670edd32b05c1485f50c2e61e68fead`;
- `72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

### 4. SearchBox invisible-hit root cause — fixed

Defensive lifecycle checkpoints:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`;
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Literal root cause:
`.search-box__popup { display:grid; }` overrode the browser's closed Popover
`display:none`, leaving a transparent fixed hit box after visual closure.

Root-cause fix:
- `5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Current law:
- base popup rule does not set `display`;
- `display:grid` exists only in `:popover-open`;
- leaving popup is inert/noninteractive and releases the native top layer
  immediately.

### 5. Unified Input validation architecture — implemented

Authoritative contract:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Major implementation checkpoint:
- `c3971739198e61adff98d821a6b8f6775faa4e6c`.

Common semantic states:
`null | empty | no-selection | invalid-entry | valid-entry`.

Every CVA input participates in:
- `inputState`;
- `valid`;
- string `errors`;
- structured `validationIssues`;
- canonical validation snapshot;
- common `required`;
- Angular `NG_VALIDATORS` bridge;
- external/business validation hook.

Core law:
- character/domain admission is separate from value validation;
- invalid admitted drafts remain visible;
- validation does not silently clamp/erase a draft merely to pass;
- typed domain restrictions remain control-specific.

Expanded implementation also covered:
- default Field clearability with opt-out;
- URL/Tel domain handling;
- numeric/money/stepper validation;
- RangeSlider shared coordinate domain + moving value Tooltip;
- Time/DateTime Now reveal;
- inclusive rolling DateRange 7/30-day presets;
- fixed per-instance ColorPicker mode;
- ItemPicker vs ComboBox product distinction;
- File/Image selection validation.

### 6. Verification-hardening stage after expanded Inputs implementation

The canonical gate is always:
`npm run verify:clean`.

Substantive corrections encountered during the verification loop included:
- SearchBox native maxlength made validation-only:
  `28829cb6b581d741170a7dd24c677f5a8dac11f7`;
- InputBase intentional-unused-parameter lint correction:
  `e933a4b598c32cea949d61aaf31cb207c54e4b10`;
- Selection free-color contract + Temporal test compile gaps:
  `9b499753bb06d350513a2f0bbad0a5de84a2817d`;
- stale Inputs spec expectations aligned with approved contracts:
  `1a6b29c1aa5dca36474c10eb40ef64492a65e595`;
- final stale NumberBox/Overlay expected values:
  `c096afc3cda1d076cfc702c721427c8468e4c61b`.

This stage produced the earlier Fully Green checkpoint:
- 87/87 test files;
- 649/649 tests;
- app/spec typecheck PASS;
- zero-warning production build PASS.

### 7. Product Owner runtime findings after that green checkpoint

The Product Owner then found three concrete runtime issues:
- Ghost/Text/Underline hover visible in Dark but effectively absent in Light;
- typed character admission had become too permissive for specialized controls;
- shared picker Clear actions needed IconButton + Tooltip presentation.

Bounded implementation checkpoints included:
- `e7068b64df5b64b789dbc4d2b5f81648ad11d2e9`
  typed character admission restoration;
- `b54c89c621dab914dda3555a5f8cf7ac0a48fd37`
  Overlay Clear as icon + Tooltip;
- `fead82d36c30533e575ab34ff41463f19ffa6848`
  regression tests/governance;
- `cade8015624c804d0be83bad5d2c49f126f5b906`
  Overlay Clear governance;
- `488741922c365a605acc9a70141f600278c46087`
  patch-integrity repair;
- `65c097d224bb31f282ec5737ebc8381ed9f73b14`
  icon-only Clear contract lock.

Follow-up governance/parser and stale-test corrections:
- `0dfea6b1eb71441267165da3149a0148ea6c4ade`;
- `c096afc3cda1d076cfc702c721427c8468e4c61b`.

### 8. Latest Product Owner runtime findings — URL, Solid, NumberBox, motion, live data

Latest authorized findings:
1. UrlBox must accept real web domains with optional HTTP(S) scheme and reject
   incomplete hosts such as `http://www.s`.
2. Solid needs the same Light/Dark hover discoverability guarantee as
   Ghost/Text/Underline.
3. NumberBox editing must admit ASCII digits only; min/max/step remain
   validation concerns.
4. selected File/Image rows need subtle hover/focus scale motion.
5. SearchBox, ItemPicker, and ComboBox result/item collections must be
   runtime-dynamic production data, including while an overlay is already open.

Implementation/test/governance checkpoints:
- `9b13eab3c00046a3ed6258d981d33663355b26e0`;
- `2912b97cb62ea159430bdca3f386814fa914698c`;
- `98c3c8ccddc8812af57d8b6a429b9510e0151465`;
- `5ec8124cb8ad483309d525bf558d41abb4252669`;
- `b6974154a916ebb751eda5290c7bbc2a9bce704b`;
- `eb3db0130db1786488b91e050f9d54168b28bbd3`;
- `64edf72fe8c7655a98e52d98e910bf675629129b`;
- `9ffa59e348b6246f1c8a210c01d437763b3a1f65`;
- URL-regex lint-only correction:
  `9315691c9579a324990a56d928e4e22d504111a4`.

Current detailed laws:
- UrlBox accepts scheme-less or HTTP(S) real domains with valid multi-label
  hostnames/TLDs and reports `url.format` for incomplete domains;
- Solid/Ghost/Text/Underline use the same theme-sensitive hover-token law;
- NumberBox editor is digits-only while admitted values may still be invalid
  through min/max/step;
- File/Image selected rows use tokenized `scale(1.01)` hover/focus motion and
  reduced-motion cancellation;
- SearchBox dropdown is signal-live; SearchBox modal, ItemPicker, and ComboBox
  use a live items provider while open;
- production controls are governed against Design-Lab/review-internal
  dependencies.

### 9. Current canonical technical checkpoint

Product Owner verified current source with:
`npm run verify:clean`.

Latest verified result:
- all governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- **653/653 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Inputs status:
**Technical PASS / Product Owner runtime review still authoritative**.
Technical green never substitutes for Product Owner visual/runtime acceptance.

### 10. Mandatory continuity discipline

The following four files form the mandatory continuity quartet and must all be
updated in the same work cycle whenever a substantive decision, finding,
implementation state, blocker, verification result, or next gate changes:

- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`;
- `README_FIRST.md`;
- `NEW_CHAT_HANDOFF.md`.

Do not treat an update to only one or two of these as a complete continuity
sync.
<!-- CHATGPT_PROJECT_HISTORY_DIGEST_END -->


<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_START -->
## 2026-10-01 — Product Owner Overlay runtime review: bounded correction implemented / verification pending

Product Owner reviewed `/controls/overlays` in Light/Dark and identified five
Overlay-specific corrections.

### Authorized findings

1. The dedicated Overlay review page must contain Overlay-system evidence only.
   Temporal Inputs, selection pickers, and deferred control composites were
   duplicated there despite already having their production review locations.

2. The separator below the shared Overlay Header and above the Footer was
   visible in Light but too weak in Dark.

3. Default modal enter/exit motion must be `flip-x`.

4. Drawer positions must support all four edges:
   - logical start;
   - logical end;
   - physical top;
   - physical bottom.

5. Full-height side drawers must keep the shared Footer at the bottom/end of the
   surface while Body owns the flexible scrolling region.

### Bounded implementation

Source checkpoint:
`2a1d33ca9461de00ceec74f0d7ad5b69f0b38ae7`
(`fix(overlays): clean showcase and complete drawer geometry`).

Implemented:
- `ErpOverlayPosition` now includes `top`;
- default modal motion is `flip-x / flip-x`;
- top drawer defaults to `slide-down / slide-up`;
- existing start/end and bottom drawer defaults remain intact;
- OverlayHost positions top drawers at the top and gives top/bottom drawers full
  inline size;
- `ErpOverlayFrame` host + frame fill available full-height drawer surfaces;
- Header stays at start, Footer stays at bottom/end, Body uses the flexible
  scrolling grid row;
- new `--honesty-overlay-frame-separator-color` maps to
  `--honesty-border-default` and feeds both Header-bottom and Footer-top
  separator borders for Light/Dark visibility;
- `/controls/overlays` now has only four review groups:
  Modal, Drawers, Nested stack, and dismissal/backdrop/blur/motion policies;
- repeated Date/Time/DateRange, selection picker, RadioGroup/ButtonGroup,
  SplitButton, and FabMenu showcase evidence was removed from this route;
- top-drawer review evidence was added.

Test checkpoint:
`11532bd6d1589eaab43a012ce687f7be923cae61`
(`test(overlays): cover overlay-only page and four drawer edges`).

Governance/documentation checkpoint:
`f5e1d7ebcb79c4f76e98b918380843d877f6edec`
(`chore(overlays): govern top drawer and overlay-only review`).

Governance now protects:
- exact Overlay position union including top;
- `flip-x` modal default;
- top drawer geometry/motion;
- Overlay separator token;
- full-height Header/Body/Footer frame law;
- Overlay-only review-page scope with no duplicated Input/control demos.

Pre-rerun checks:
- Overlay governance JavaScript syntax compilation PASS;
- complete Overlay governance internal self-test PASS.

### Current status

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

The previous 87/87 files / 653/653 tests Fully Green checkpoint predates this
Overlay correction and must not be applied to the new source until the full
canonical gate passes.

After technical green, Product Owner runtime review must confirm the five
findings above in Light and Dark.
<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_END -->


<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_START -->
## 2026-10-01 — Overlay-only page verification follow-up: public review ownership relocated

Product Owner pulled:
`bfbdc9d3d2d7cf70cc82511d0a075ea8ea0c03f2`
and ran the full canonical gate:
`npm run verify:clean`.

Observed progress:
- theme authority PASS;
- route-page ERP-only authoring PASS;
- Component Token framework PASS;
- system-color registry PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField governance then stopped before ErpOverlay/ng lint.

Exact demonstrated cause:
`PROGRAM_PUBLIC_CONTROLS` in
`tools/controls/check-erp-field-governance.mjs` still mapped twelve public
controls to the old Overlay showcase even though Product Owner had explicitly
made `/controls/overlays` Overlay-only.

The stale ownership affected:
- DateBox / TimeBox / DateTimeBox / DateRangeBox;
- ColorPicker / IconPicker / ItemPicker / ComboBox;
- RadioGroup;
- ButtonGroup / SplitButton / FabMenu.

Bounded correction:
- temporal + selection picker review ownership maps to
  `src/app/showcase/input-controls/input-controls.html`;
- RadioGroup review evidence was relocated into the existing Inputs
  Boolean/Choice group;
- ButtonGroup / SplitButton / FabMenu review evidence was relocated into the
  Buttons showcase in one dedicated Button Composites group;
- ErpField inventory now maps those three button composites to the Buttons
  showcase;
- Overlay showcase remains free of all twelve controls and is not weakened by
  the governance correction.

Correction checkpoint:
`ae1d33d07bbb340690ba670a46553fc557f02d77`
(`fix(governance): relocate public control review ownership`).

Pre-rerun checks:
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- live HTML ownership audit:
  - all nine Input/selection controls present on Inputs;
  - all three button composites present on Buttons;
  - none of the twelve present on Overlays.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not restore duplicated controls to the Overlay page to satisfy inventory.
Review ownership must remain aligned to the control's actual production-review
page.
<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_END -->


<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: invalid Button showcase icon corrected

Product Owner pulled:
`c02dd33d32dfdcb2ec3029a11f578584b1b2dca8`
and reran:
`npm run verify:clean`.

Observed progress:
- all foundation/governance checks PASS;
- ErpField governance PASS;
- ErpOverlay governance PASS;
- Angular lint PASS;
- test bundle generation then stopped before test execution on one TypeScript
  template/compiler error.

Exact demonstrated failure:
`src/app/showcase/button-controls/button-controls.ts:98`

The newly relocated SplitButton/FabMenu showcase data used
`icon: 'table'`, but `table` is not an `ErpIconName` in the current
semantic registry.

Bounded correction:
- `619c5b3c3f0850567524d9c386a469fb18ac31de`
  `fix(showcase): use registered export icon`;
- replace only the invalid showcase icon `table` with registered semantic
  `download`;
- no production Button, SplitButton, FabMenu, Overlay, or Input runtime behavior
  changed.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not reopen the Overlay page ownership decision. Inputs/selection evidence
remains on Inputs, button composites remain on Buttons, and Overlays remains
Overlay-only.
<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: nested RadioGroup showcase count corrected

Product Owner reran the complete canonical gate after relocating public control
review ownership to Inputs / Buttons while keeping Overlays Overlay-only.

Observed result:
- all governance checks PASS;
- Angular lint PASS;
- test bundle generation PASS;
- Overlay showcase PASS;
- Button showcase PASS;
- Overlay host/frame/manager tests PASS;
- 86/87 test files PASS;
- 650/651 tests PASS;
- exactly one test failed in
  `src/app/showcase/input-controls/input-controls.spec.ts`.

Demonstrated cause:
- the Boolean/Choice showcase now contains four standalone `ErpRadioBox`
  controls plus one `ErpRadioGroup`;
- `ErpRadioGroup` correctly renders three internal `ErpRadioBox` children;
- the stale showcase test used
  `querySelectorAll('erp-radio-box').length === 4`, which counted both
  standalone and grouped RadioBoxes and therefore received 7.

Bounded correction:
- `9c56954e62231a29966ed78abb1662c8ef3c8124`
  `fix(test): distinguish standalone and grouped radios`;
- no production source changed;
- the test now explicitly asserts:
  - four standalone RadioBoxes outside any RadioGroup;
  - three RadioBoxes owned by the RadioGroup;
  - one RadioGroup review instance.

This keeps the relocated review ownership intact and tests the component
composition instead of flattening nested DOM ownership.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not move RadioGroup back to the Overlay page and do not weaken public-control
inventory governance.
<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_START -->
## 2026-10-02 — Overlay Header/Footer visibility is developer-configurable by API

Product Owner required developers to control whether the shared Header and
Footer are visually present for both modal and drawer surfaces through API
configuration only.

### Public API

`ErpOverlayFrameConfig` now exposes:

```ts
readonly showHeader?: boolean;
readonly showFooter?: boolean;
```

Defaults:
- `showHeader = true`;
- `showFooter = true`.

The flags are shared by both `kind: 'modal'` and `kind: 'drawer'`.

Header/Footer config objects remain required. Visibility is not configured by
consumer CSS, route-specific selectors, or content-side conditionals.

### Runtime behavior

Implementation checkpoint:
`e0cdb290355fe0b59f6560d960aea422445884b2`
(`feat(overlays): configure frame region visibility by API`).

Implemented behavior:
- OverlayManager normalizes both flags into the immutable runtime frame config;
- ErpOverlayFrame defaults missing flags to visible when instantiated directly;
- Header and Footer are conditionally rendered from the frame API only;
- frame grid rows adapt to Header-only, Footer-only, Body-only, and full
  Header/Body/Footer states;
- Body remains the persistent flexible content region;
- when Header is hidden, OverlayHost removes stale
  `aria-labelledby`/`aria-describedby` references and uses the configured
  Header title/subtitle directly through `aria-label` and
  `aria-description`;
- when Footer is hidden, configured Footer actions are not rendered.

The Overlay review route includes explicit API evidence for:
- modal without Header;
- modal without Footer;
- modal without Header or Footer;
- drawer without Header or Footer.

### Tests and governance

Test checkpoint:
`b8fe64407454a69f9353eee22b950c7d041065aa`
(`test(overlays): cover configurable frame regions`).

Governance/documentation checkpoint:
`d008cc17e56149edf37c1c810672b8ca7e2b480d`
(`chore(overlays): govern configurable frame regions`).

Coverage protects:
- default normalized flags are both true;
- explicit modal and drawer flag configurations;
- conditional Header/Footer rendering;
- adaptive grid state;
- hidden-Header accessibility fallback;
- Overlay showcase API evidence;
- API ownership through frame config rather than CSS.

Pre-verification checks:
- Overlay governance JavaScript syntax PASS;
- complete Overlay governance internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- final template/CSS/ARIA source audit PASS.

Current status:
**implemented / canonical verification pending**.

Mandatory next technical gate:
`npm run verify:clean`.

This requirement does not reopen the Overlay-only showcase ownership decision or
the current modal/drawer geometry contracts.
<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_END -->


<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_START -->
## 2026-10-02 — System Confirm Dialog service implemented on the blocking Overlay stack

Product Owner authorized one system-wide confirmation service built on the
existing blocking Overlay/Modal system.

### Product law

Every application confirmation dialog must use the shared
`ErpConfirmDialogService`.

Application code must not create a second Confirm modal subsystem, browser
`window.confirm`, direct Confirm internal content, or feature-local blocking
backdrops.

Confirmations invoked from inside an already-open Modal or Drawer must open as
a new top blocking Modal in the same `ErpOverlayManager` stack. The parent
surface remains mounted beneath it and resumes after the Confirm closes.

### Public API

`src/app/shared/confirm-dialog/confirm-dialog-contracts.ts`:

- `ErpConfirmDialogIntent = 'default' | 'warning' | 'danger'`;
- `ErpConfirmDialogConfig` exposes semantic confirmation inputs only:
  title, message, optional subtitle/details, labels, intent, and semantic icon.

`ErpConfirmDialogService.confirm(config)` returns `Promise<boolean>`:
- Confirm primary action -> `true`;
- Cancel / close / Escape / dismissal -> `false`.

Callers do not configure Overlay geometry, motion, Header/Footer visibility,
backdrop, or focus policy through the Confirm API.

### Fixed system policy

Every Confirm:
- kind = `modal`;
- position = `center`;
- size = `sm`;
- blocking = shared Overlay default `true`;
- Header = visible;
- Footer = visible;
- dismissOnEscape = `true`;
- dismissOnBackdrop = `false`;
- initial focus = Cancel action;
- restoreFocus/trapFocus = shared Overlay defaults;
- motion = current Modal default `flip-x`.

Intent mapping:
- default -> help icon + primary Confirm tone;
- warning -> warning icon + warning Confirm tone;
- danger -> error icon + danger Confirm tone + delete primary icon.

### Overlay action dependency

To support semantic Confirm intent without CSS workarounds,
`ErpOverlayActionConfig` now supports optional
`tone?: ErpButtonTone`.

OverlayManager normalizes action tone:
- Primary default -> `primary`;
- Secondary/Utility default -> `neutral`;
- explicit semantic tones such as `warning` / `danger` are preserved.

OverlayFrame passes that tone through the existing ErpButton / ErpIconButton
API.

### Implementation checkpoints

- `8f7cf03392eefb11e8c83e3fc2cbfd0afad21a3f`
  `feat(confirm): add system confirmation service`
- `aa90f0c7ede5018c80cedd5544528d7160ed5299`
  `test(confirm): cover system confirmation contract`
- `7d4affb3a61eee3b89fea490ae7454da17cd3e86`
  `chore(confirm): govern system confirmation usage`
- `a5118b5768c84896cb71e11a1ec94afe7502612f`
  `test(confirm): harden nested blocking confirmation evidence`
- `3eb04b160d3c9d5929300c896cc0eeb66e192ebe`
  `fix(governance): avoid Confirm method false positives`

### Review evidence

`/controls/overlays` remains Overlay-system-only, but now contains five
technical groups because System Confirm is itself an Overlay capability:

1. Modal;
2. Drawers;
3. System Confirm Dialog;
4. Nested stack;
5. dismissal/backdrop/blur/motion policy.

The Confirm review group exposes default, warning, and danger examples.

The existing nested blocking Overlay evidence also exposes a button that invokes
`ErpConfirmDialogService` from inside an already-open blocking surface.

No Date/Time/Input/Selection or unrelated Button composite demos were restored
to the Overlay page.

### Governance

New canonical lint stage:
`npm run erp-confirm:check`.

The checker protects:
- exact Confirm intent union;
- service-only system policy;
- fixed Modal/size/focus/dismissal behavior;
- semantic intent mapping;
- Confirm body ERP-primitives composition;
- required Overlay action tone support;
- Overlay showcase Confirm evidence;
- nested Confirm-from-blocking-Overlay evidence;
- no direct application import/use of `ErpConfirmDialogContent`;
- no browser `window.confirm` / `globalThis.confirm`;
- no native `<dialog>` alternative in application templates.

The browser-confirm rule was deliberately narrowed after dependency review:
Temporal and Selection picker internals legitimately own methods named
`confirm()`; governance must not confuse those business methods with browser
confirmation APIs.

### Pre-verification evidence

Current source audits:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField complete internal self-test PASS;
- actual Confirm source contract validation: zero errors;
- actual Overlay frame source contract validation: zero errors;
- repository search found no existing `<dialog>`, `window.confirm`, or
  `globalThis.confirm` usage.

The ErpButton checker syntax is valid; its self-test cannot be executed in the
minimal connector isolate because that checker depends on the imported Angular
template parser. The canonical local gate remains authoritative for it.

### Current technical state

**Implemented / canonical verification pending.**

The previous local run from `a1fe384...` reached all governance + Angular lint
PASS and then 86/87 test files / 650/651 tests before one stale nested RadioBox
count failed. That stale test was corrected in
`9c56954e62231a29966ed78abb1662c8ef3c8124`, but no later source — including
the configurable Overlay frame API and this System Confirm service — has yet
completed a fresh end-to-end `npm run verify:clean`.

Mandatory next technical gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_END -->


<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_START -->
## 2026-10-02 — System Confirm expanded: auxiliary actions, action results, Header tone, dismissibility

Product Owner expanded the system-wide Confirm Dialog contract.

### New Product Owner requirements

A system Confirm may contain:
- the primary Confirm action;
- optional auxiliary action 1;
- optional auxiliary action 2;
- Cancel when user dismissal is enabled.

The two optional actions must be developer-configurable as normal Buttons with
or without icons, or as IconButtons. The caller must receive a result that
identifies which button/action was pressed.

The Confirm Header background must accept system semantic tones such as
`info`, `danger`, `warning`, `primary`, etc.

The caller must also control whether the user is allowed to dismiss the Confirm.
When dismissal is disabled:
- Header Close is hidden;
- Cancel is not rendered;
- Escape dismissal is disabled;
- backdrop dismissal remains disabled.

### Public Confirm API

`ErpConfirmDialogConfig` now includes:
- `headerTone?: ErpOverlayHeaderTone`;
- `userDismissible?: boolean` (default `true`);
- `auxiliaryActions?: readonly ErpConfirmDialogAuxiliaryAction[]`.

`ErpConfirmDialogAuxiliaryAction` exposes:
- stable `id`;
- `label`;
- optional semantic `icon`;
- `presentation?: 'button' | 'icon-button'`;
- optional semantic Button `tone`;
- optional logical `placement?: 'start' | 'end'`.

Auxiliary action law:
- zero, one, or two actions only;
- IDs must be nonblank and unique;
- `confirm` and `cancel` are reserved;
- ordinary Button may omit an icon;
- IconButton requires an icon;
- defaults: Button presentation, neutral tone, logical-start placement.

### Result contract

The service no longer returns `Promise<boolean>`.

It returns:

```ts
ErpConfirmDialogResult =
  | {type: 'action'; actionId: string}
  | {type: 'dismissed'; reason: 'close' | 'escape'}
```

Button results:
- Confirm -> `actionId: 'confirm'`;
- Cancel -> `actionId: 'cancel'`;
- auxiliary action -> its configured ID.

Header Close and Escape return `dismissed` instead of pretending to be button
actions.

### User-dismissal law

`userDismissible=true`:
- Header Close visible;
- Cancel visible;
- Escape enabled;
- initial focus targets Cancel;
- backdrop remains non-dismissible.

`userDismissible=false`:
- Header stays visible;
- Header Close hidden;
- Cancel removed;
- Escape disabled;
- backdrop disabled;
- initialFocus is null so the shared Overlay focus fallback reaches the primary
  Confirm action when no body focus target exists.

### Overlay dependencies added correctly

The generic Overlay Header API now includes:
- `ErpOverlayHeaderTone = 'default' | ErpButtonTone`;
- `header.tone?: ErpOverlayHeaderTone`;
- `header.showCloseButton?: boolean`.

Both default without breaking existing overlays:
- tone -> `default`;
- showCloseButton -> `true`.

Header tones are Component-Token-driven:
- primary/secondary/accent -> theme-sensitive Brand subtle surfaces;
- success/warning/danger/info -> theme-sensitive Feedback surfaces;
- neutral -> elevated neutral surface;
- default -> existing transparent/default Header.

No raw palette colors or local theme selectors are introduced.

### Implementation checkpoints

- `6b311965d8c0ddfcd3c20c004e06a17b4eaa86df`
  `feat(confirm): add auxiliary actions and dismissibility controls`;
- `f8c5868bd844796260684d347afd4fda8ceae9fe`
  `fix(confirm): normalize actionless close result`;
- `a250c28204513400a0607a39d9d86b45a134185a`
  `test(confirm): cover rich actions header tone and dismissal policy`;
- `d88613ff826fb4aa4b948995736d14f63f237459`
  `chore(confirm): govern rich confirmation API`.

### Test coverage added/updated

Coverage now includes:
- default Confirm action result;
- Cancel action result;
- Header Close dismissed result;
- Escape dismissed result;
- warning/danger intent mapping;
- Header tone independent from intent;
- two auxiliary actions;
- normal Button with optional icon;
- IconButton auxiliary action;
- semantic tone + logical placement;
- pressed auxiliary action ID result;
- max-two enforcement;
- reserved/duplicate/blank ID rejection;
- IconButton-without-icon rejection;
- non-dismissible Confirm configuration;
- absence of Cancel;
- hidden Header Close;
- Escape no-op while locked;
- Confirm remains functional while locked;
- nested Confirm above both Modal and Drawer parents.

OverlayManager/OverlayFrame tests were updated for normalized Header tone and
close-button visibility, and the Overlay showcase now contains five Confirm
review examples: default, warning, danger, multi-action, and locked.

### Governance / pre-verification

Current pre-rerun evidence:
- ErpConfirmDialog governance JavaScript syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance JavaScript syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- ErpField complete internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

The canonical gate is still authoritative for Angular compilation, unit tests,
typechecks, SCSS compilation, build budgets, and zero-warning production build.

### Current state

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_END -->


<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_START -->
## 2026-10-02 — Product Owner Confirm Header contrast correction

Product Owner runtime screenshots showed that the current colored Confirm Header
used pale/subtle semantic surfaces. The result was visually weak and the
semantic Header icon/title treatment lacked sufficient contrast and emphasis.

Product Owner proposed that the Confirm Header use the same semantic color as
the primary Confirm button.

### Corrected law

For System Confirm, when `headerTone` is not explicitly supplied, Header tone
now follows the primary Confirm action tone:

- default Confirm intent -> `primary`;
- warning Confirm intent -> `warning`;
- danger Confirm intent -> `danger`.

The caller may still explicitly override `headerTone`, including
`headerTone: 'default'` to request the ordinary Overlay Header appearance.

### Solid Header mapping

Non-default Overlay Header tones now use the same **solid semantic background**
roles as solid system Buttons:

- primary -> Brand Primary solid;
- secondary -> Brand Secondary solid;
- accent -> Brand Accent solid;
- success -> Feedback Success surface-strong;
- warning -> Feedback Warning surface-strong;
- danger -> Feedback Danger surface-strong;
- info -> Feedback Info surface-strong;
- neutral -> inverse surface.

Foreground uses the corresponding on-solid/inverse role. Warning intentionally
uses the same foreground role as the system Warning Button.

### Complete contrast correction

Changing background alone is forbidden because that would leave child controls
on stale tones.

For every non-default colored Header:
- semantic Header icon uses inherited on-solid foreground;
- title uses inherited on-solid foreground;
- subtitle uses inherited on-solid foreground;
- Header Close IconButton switches from neutral Ghost to **Solid with the same
  semantic Header tone**, preserving on-solid icon contrast.

For the default Overlay Header, existing behavior remains unchanged:
- transparent/default background;
- primary title/icon;
- secondary subtitle;
- neutral Ghost Close button.

No raw palette values, consumer CSS overrides, or theme-specific local hacks
were introduced.

### Implementation checkpoints

- `f10191242d3572b6fa03bbec1f87c4079ce41e90`
  `fix(confirm): match Header contrast to solid action tone`;
- `865ff5f1dcabf78a2f02538e5ab8990d5297b092`
  `test(confirm): cover solid Header contrast contract`;
- `31ee219c15ae949752f59a426811ce79704675fb`
  `chore(confirm): govern solid Header contrast`.

### Tests / governance

Coverage now protects:
- System Confirm default Header tone equals its Confirm action tone;
- default / warning / danger mapping;
- colored Header semantic icon uses inherited foreground;
- title/subtitle use inherited foreground;
- Close uses solid presentation and matching semantic tone;
- default non-colored Header preserves previous primary/secondary/Ghost
  presentation;
- Overlay Header Component Tokens must use solid + on-solid semantic mappings,
  preventing regression back to pastel/subtle surfaces.

Pre-rerun evidence:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

### Current state

**Implemented / canonical verification pending / Product Owner runtime
re-review pending.**

Mandatory next technical gate:
`npm run verify:clean`.

After technical green, Product Owner must visually confirm the corrected solid
Headers and icon/text/Close contrast in Light and Dark.
<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_FRAME_STYLE_BUDGET_2026_10_02_START -->
## 2026-10-02 — canonical verification reached final build; OverlayFrame style-budget split implemented

Product Owner pulled repository HEAD:
`c848151fa84fab723bcac851bcfa9e0550cc82a9`
and ran the canonical:
`npm run verify:clean`.

Observed verified results before the final build warning:
- all foundation and production governance checks PASS;
- ErpConfirmDialog governance PASS;
- Angular lint PASS;
- 89/89 test files PASS;
- 675/675 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build compilation completed.

The only failing condition was the zero-warning gate:
`src/app/shared/overlay/overlay-frame/overlay-frame.scss`
compiled to 4.17 kB, exceeding the unchanged 4.00 kB component-style warning
budget by 168 bytes.

This is a style-budget packaging issue, not a runtime/test/typecheck failure.

### Bounded correction

Checkpoint:
`272c0be2f8cb5cac5b8e37fd29aeaa3eaa98cc58`
(`fix(overlays): split frame tone facets for style budget`).

No visual, API, token, selector, or behavior contract was removed or changed.

`ErpOverlayFrame` now loads:
- `overlay-frame.scss` — structural/layout Header/Body/Footer rules;
- `overlay-frame-facets.scss` — the nine Header tone facet selectors.

The nine tone selectors were moved verbatim from the base stylesheet into the
facet stylesheet. The base stylesheet no longer imports the Overlay token mixins
because only the facet stylesheet consumes those mixins.

Current source sizes after the split:
- `overlay-frame.scss`: approximately 2534 source characters;
- `overlay-frame-facets.scss`: approximately 1096 source characters.

The canonical 4 kB / 8 kB style budgets remain unchanged.

### Governance correction

Overlay governance now:
- requires `ErpOverlayFrame` to load both style files through `styleUrls`;
- reads both files together as one semantic frame-style contract;
- requires every Header tone facet
  (`default/primary/secondary/accent/success/warning/danger/info/neutral`);
- preserves all existing solid Header contrast, on-solid foreground,
  Header/Footer geometry, and frame behavior checks.

Pre-rerun checks on the corrected source:
- Overlay governance JavaScript syntax PASS;
- complete Overlay governance internal self-test PASS;
- actual current OverlayFrame contract validation: zero errors;
- diff review confirms the correction is a style-file split plus corresponding
  governance/documentation only.

### Current state

The verification evidence on `c848151...` proves:
- governance/lint green;
- 89/89 files and 675/675 tests green;
- both typechecks green;
- build compiled, but zero-warning status did **not** pass because of the single
  style-budget warning.

The new source at `272c0be...` therefore remains:
**implemented / fresh canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not weaken the global component-style budgets to resolve this checkpoint.
<!-- CHATGPT_OVERLAY_FRAME_STYLE_BUDGET_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_DEFAULT_POLICY_AND_HEADER_OUTLINE_2026_10_02_START -->
## 2026-10-02 — Product Owner Overlay defaults + Confirm plain Header + dark Header outline

Product Owner runtime review added five connected Overlay/Confirm requirements.

### 1. System Confirm must demonstrate an uncolored Header

The Confirm service continues to derive a colored Header from intent by default,
but the Overlay review route now includes an explicit example using:

```ts
headerTone: 'default'
```

This proves that a developer can keep the ordinary Overlay Header without
changing Confirm service architecture.

### 2. Colored Header outline must remain visible in Light and Dark

Product Owner reported that the thin light outline around the colored Confirm
Header was visible in Light but disappeared in Dark.

Correction:
- added tokenized Header outline width/color;
- default/uncolored Header keeps outline transparent;
- colored Headers derive the outline from the current on-solid Header
  foreground using `color-mix(... 60%, transparent)`;
- Header renders this as an inset box-shadow, so the outline follows the clipped
  Overlay Header boundary in both themes;
- no raw white, raw palette value, or local theme selector was introduced.

### 3. Default Overlay blur = medium

All shared Overlay entries now normalize:

```ts
blur: options.blur ?? 'medium'
```

This applies to regular modal/drawer opens and the legacy compact-menu exception.

Developer API overrides remain fully supported:
`low | medium | high`.

The Overlay Component Token fallback also uses medium blur, and Host facets now
explicitly cover all three blur API values.

### 4. Default Overlay backdrop tone = primary

All shared Overlay entries now normalize:

```ts
backdropTone: options.backdropTone ?? 'primary'
```

This applies to normal overlays and the legacy compact-menu exception.

Developer API overrides remain supported:
`default | neutral | primary | secondary | accent`.

The named `default` tone remains a real selectable value; Host facets now
explicitly map it instead of relying on the previous base-token omission.

### 5. Default dismissal policy = false / false

System Overlay defaults remain and are explicitly governed as:

- `dismissOnBackdrop = false`;
- `dismissOnEscape = false`.

Both are still independently configurable through `ErpOverlayOpenConfig`.

System Confirm now follows the same default policy instead of implicitly enabling
Escape whenever `userDismissible=true`.

Confirm public API now also exposes:
- `dismissOnEscape?: boolean` — default false;
- `dismissOnBackdrop?: boolean` — default false.

`userDismissible` retains its stronger structural meaning:
- true -> Header Close + Cancel are available; Escape/Backdrop still default off
  unless explicitly enabled;
- false -> Header Close + Cancel are removed and Escape/Backdrop are forced off
  even if the caller requests true.

Confirm dismissal results now include `backdrop` as an explicit reason when
backdrop dismissal is intentionally enabled.

### Showcase evidence

The Overlay review route now:
- includes six System Confirm examples, including `plain-header`;
- labels medium blur as the default;
- labels primary backdrop tone as the default;
- explicitly states that Backdrop and Escape dismissal are both disabled by
  default;
- retains API evidence for enabling/disabling each dismissal policy.

### Implementation checkpoints

- `4049d0011cbeeba3808a5e1ea9e171f5228bcb0a`
  `feat(overlays): align default backdrop and dismissal policies`;
- `df69a9b60d3e6b3e86b79124e0b3d6d5d58608ac`
  `test(overlays): cover new defaults and Header outline`;
- `ca3f8281043feafbf411707bd709c4adcd67ba05`
  `chore(overlays): govern new default backdrop policies`;
- `4ceb3191b03ecc7c627159e3b05139a071f06a6d`
  `fix(governance): restore Overlay default drift self-test`.

The last commit corrected only an internal invalid-drift fixture that still
replaced the old blur default with the new value and therefore did not create an
invalid case. No runtime source changed in that follow-up.

### Tests / governance coverage

Coverage now protects:
- modal defaults medium/primary/false/false;
- legacy compact overlay defaults medium/primary/false/false;
- explicit low/default visual overrides;
- Host DOM evidence for medium/primary defaults;
- Confirm Escape/Backdrop defaults off;
- explicit Confirm Escape opt-in;
- explicit Confirm Backdrop opt-in;
- backdrop dismissal result reason;
- `userDismissible=false` forcing both dismissal routes off;
- explicit uncolored Confirm Header example;
- colored Header outline rendering;
- all blur/backdrop API facet selectors;
- runtime default token fallbacks.

Pre-rerun evidence:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField internal self-test PASS;
- actual current Confirm contract validation: zero errors;
- actual current OverlayFrame contract validation: zero errors;
- actual current Overlay default/facet drift validation: zero errors;
- diff review found no budget weakening, raw color addition, or browser-confirm
  bypass.

### Current state

**Implemented / fresh canonical verification pending / Product Owner runtime
re-review pending.**

The earlier canonical run on `c848151...` proved all governance/lint,
89/89 test files, 675/675 tests, and both typechecks before stopping only on the
OverlayFrame style-budget warning. That warning was addressed by the later
style split, but the current defaults/outline changes are newer source and
therefore require a fresh complete gate.

Mandatory next technical gate:
`npm run verify:clean`.

Do not weaken the existing 4 kB / 8 kB component-style budgets.
<!-- CHATGPT_OVERLAY_DEFAULT_POLICY_AND_HEADER_OUTLINE_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_HEADER_OUTLINE_TOKEN_GOVERNANCE_2026_10_02_START -->
## 2026-10-02 — canonical verification exposed Header outline Component Token governance violation; correction implemented

Product Owner pulled and verified
`40b03ddc824a189bdefe16037f6687c4bc5a0430`.

Observed canonical result:

- `theme-authority:check` PASS;
- `route-pages:check` PASS — 22 routed templates;
- `component-tokens:check` FAILED before later lint/test/typecheck/build stages ran.

Root cause:

- Overlay `_tokens.scss` contained raw `color-mix(...)`;
- colored Header tone facets used a nested `@include`;
- both conflict with the repository-wide Component Token law that token mixins
  emit Component Token custom-property declarations only and contain no raw
  color functions.

Bounded correction:

- colored Header facets now map
  `--honesty-overlay-frame-header-outline-color` from the existing
  `--honesty-overlay-frame-header-fg` Component Token;
- default Header keeps the outline source transparent;
- the approved 60% `color-mix` moved to
  `overlay-frame.scss`, where Frame presentation is assembled;
- Component Token checker self-tests now explicitly reject raw
  `color-mix(...)` and nested facet `@include`;
- Overlay governance now requires eight colored outline mappings, forbids the
  obsolete helper/color function from Overlay Component Tokens, and requires
  the 60% mix in the Frame presentation layer;
- no public Overlay/Confirm API, Header tone mapping, dismissal policy, blur,
  backdrop tone, theme authority, component-style budget, or visual redesign
  was changed.

Implementation checkpoints:

- `948570c918f58326146388a1febfffec34b5a95b` —
  `fix(overlays): restore component token purity`;
- `50768e0919897404c30b3aec8ab8423f9204e62f` —
  `fix(overlays): assemble header outline in frame layer`;
- `355ac02cc6d6b797eba85292f6708833b15965af` —
  `test(governance): pin component token purity regressions`;
- `b102d37e5e7d389758ea49cd225cbbacbbe13205` —
  `fix(governance): align overlay outline with token framework`;
- `c622fbfa22e8afe4c1190f46291e8676990f515c` —
  `docs(overlays): document header outline token correction`.

Current state:

**Implemented / fresh canonical verification pending / Product Owner runtime
re-review pending.**

Recommended focused preflight:

```text
npm run component-tokens:check
npm run component-tokens:check:self-test
npm run erp-overlay:check
npm run erp-overlay:check:self-test
```

Mandatory technical gate remains:

`npm run verify:clean`.

A technical PASS will not imply Product Owner visual approval. After green,
Product Owner must runtime re-review the Overlay/Confirm Header outline and
contrast in Light and Dark before the review state advances.
<!-- CHATGPT_OVERLAY_HEADER_OUTLINE_TOKEN_GOVERNANCE_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_LEGACY_SPEC_SCAN_2026_10_02_START -->
## 2026-10-02 — canonical verification advanced; Overlay governance false-positive corrected

Product Owner pulled and verified
`c9c43f271e43e60e44aef9a9804ea91ba464f45b`.

Verified focused results:

- `component-tokens:check` PASS — 46 concrete token modules;
- `component-tokens:check:self-test` PASS;
- `erp-confirm:check` PASS;
- `erp-confirm:check:self-test` PASS.

The focused `erp-overlay:check` and the full `npm run verify:clean` both
stopped at:

`Legacy compact Overlay menu exception must remain isolated to SplitButton and OverlayManager`.

The Overlay governance self-test itself passed.

Source review established that runtime isolation was still correct. The only
literal `openLegacyCompactMenu` occurrences were:

- `src/app/shared/overlay/overlay-manager.ts` — owning implementation;
- `src/app/controls/split-button/split-button.ts` — authorized production
  consumer;
- `src/app/shared/overlay/overlay-manager.spec.ts` — unit-test coverage.

Root cause was a governance false-positive: the production-consumer inventory
included `*.spec.ts` files.

Correction:

- `0a60acff75dcbe773c7e1592c1a2707b11ce6754` —
  `fix(governance): exclude overlay specs from legacy consumer scan`;
- `fd41eb033e202ca9fe0e1f8dffbf44cf1fca8637` —
  `docs(overlays): record legacy spec scan correction`.

The checker now excludes specs only from this production-consumer inventory.
The runtime rule remains exactly the same: production use is restricted to
OverlayManager ownership and SplitButton. The self-test now includes a spec
occurrence as valid evidence while the existing third-production-consumer
fixture remains invalid.

No runtime source, public API, visual behavior, Component Token mapping, theme
authority, Overlay dismissal/default policy, or component-style budget changed.

Current state:

**Governance checker correction implemented / fresh Overlay governance rerun
pending / full canonical verification pending / Product Owner runtime re-review
pending.**

Next checks:

```text
npm run erp-overlay:check
npm run erp-overlay:check:self-test
npm run verify:clean
```

Technical PASS still does not imply Product Owner visual approval.
<!-- CHATGPT_OVERLAY_LEGACY_SPEC_SCAN_2026_10_02_END -->


<!-- CHATGPT_DERIVED_BLUEPRINT_REFERENCE_2026_10_02_START -->
## 2026-10-02 — accepted historical reconstruction blueprint recorded as derived planning reference

Accepted derived reference:

`docs/project-history/derived/PROJECT_ORIGIN_COMPONENTS_AND_EXECUTION_BLUEPRINT_V1.md`

Committed at:

`ef8d5fc6e0107dc1afc85e428ab4ee1f74c1a1c2` —
`docs(history): establish reconstructed product and component blueprint`.

Classification:

- accepted as an externally reviewed historical reconstruction and planning reference;
- based on the immutable raw archive plus the current-authority documents and
  repository snapshot recorded inside the blueprint;
- useful for future Product Owner scope decisions, component inventory review,
  dependency planning, gap analysis, and long-term roadmap discussions.

Explicit authority boundary:

- this blueprint is **not** continuity authority;
- it does **not** authorize implementation;
- it does **not** visually approve or freeze any component/family;
- it does **not** override newer Product Owner decisions, current repository
  source, or the four continuity-authority files;
- historical/candidate inventory entries must not be treated as an authorized
  backlog merely because they appear in the blueprint.

The blueprint records 166 normalized component/capability entries and preserves
the distinction between implemented, partial, deferred, superseded,
historical-only, unresolved product decisions, and items requiring Product Owner
confirmation.

Current execution state is unchanged by this documentation-only milestone.

The next technical gate remains:

```text
npm run erp-overlay:check
npm run erp-overlay:check:self-test
npm run verify:clean
```

Only after canonical technical green does the current Product Owner
Overlay/Confirm runtime/visual re-review proceed. The historical blueprint must
not be used to jump ahead to Table, Shell, Forms, or any other unopened family.
<!-- CHATGPT_DERIVED_BLUEPRINT_REFERENCE_2026_10_02_END -->


<!-- CHATGPT_BOTTOM_UP_REFERENCE_FIRST_LAW_2026_10_02_START -->
## 2026-10-02 — Fully Green technical gate + Product Owner bottom-up/reference-first execution law

### Canonical verification result

Product Owner pulled and verified repository HEAD:

`0814833dc9ad53fbb27109b4b434caaaf7507de9` —
`docs(review): register derived blueprint reference`.

Focused Overlay verification:

- `npm run erp-overlay:check` PASS;
- `npm run erp-overlay:check:self-test` PASS.

Complete canonical `npm run verify:clean` result:

- Single App theme authority PASS;
- routed-page ERP-only authoring PASS — 22 routed templates;
- Component Token framework PASS — 46 concrete token modules;
- system-color registry PASS;
- ErpText governance PASS;
- ErpIcon registry/governance PASS;
- ErpButton governance PASS;
- ErpTooltip governance PASS;
- ErpField governance PASS;
- ErpOverlay governance PASS;
- ErpConfirmDialog governance PASS;
- Angular lint PASS;
- **89/89 test files PASS**;
- **679/679 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- **Zero-warning build gate PASS**.

Therefore `0814833dc9ad53fbb27109b4b434caaaf7507de9`
is the latest fully verified technical checkpoint.

Technical green still does not imply Product Owner visual approval.

### Product Owner execution-order law

The Product Owner has now made the following ordering rule explicit and
authoritative for future component work:

1. **Do not start any new component/family while currently implemented
   components still have active technical, runtime, visual, or Product Owner
   review issues that must be resolved.**
2. After the current implemented scope is brought to the required accepted
   state, future work proceeds **bottom-up by dependency**, never by convenience
   or by historical list order.
3. Lower-level prerequisites must be completed/reviewed before dependent
   higher-level components are opened.
4. The accepted derived blueprint may be used to understand the dependency DAG
   and candidate inventory, but it does not itself authorize any candidate.
5. No implementation agent may skip an unfinished lower dependency in order to
   start a higher composite, pattern, shell, form, table/data system, or
   ERP-specific feature.

The intended dependency model is a bottom-up dependency DAG:

```text
Foundation / Reference / Semantic / resolution contracts
→ Component Tokens
  ├─→ Structural / Text / Icon primitives
  │     └─→ Button / Action basics
  ├─→ InputBase / CVA
  │     └─→ Field Foundation
  │           └─→ concrete Field controls
  ├─→ Anchored Overlay foundation
  │     └─→ Tooltip / nonblocking anchored consumers
  └─→ Blocking Overlay foundation
        └─→ OverlayFrame
              └─→ blocking overlay-backed controls/composites

Approved lower-level controls/foundations
→ composites
→ reusable patterns
→ table/data/forms/shell composition when their own prerequisites are complete
→ ERP-specific composites
→ feature/page migration
```

At every future opening, the next candidate is the **lowest unresolved
dependency**, not merely the next item in a historical list or roadmap table.

This is a dependency law, not a claim that every historical candidate must be
built.

### Product Owner visual-reference law

For **every newly opened component with visual output**, implementation requires
one of these two Product Owner decisions **before visual design/implementation
begins**:

- the Product Owner supplies or explicitly identifies the visual reference to
  use; or
- the Product Owner explicitly authorizes that component to be designed and
  implemented **without a visual reference**.

No implementation agent, ChatGPT, Codex, historical archive, or derived
blueprint may choose a visual reference on the Product Owner's behalf or infer a
reference waiver from silence.

When a reference is supplied, the execution scope must first analyze what is to
be adopted, adapted, or rejected from that reference before implementation.

This rule applies to future new visual components/families. It does not
retroactively grant visual approval to currently implemented components.

### Immediate next product state

The technical gate is now green.

No new component/family is authorized by this result.

The next action remains Product Owner runtime/visual review of the current
Overlay/Confirm state. Existing pending review/correction work must be completed
before any new family is opened.

<!-- CHATGPT_BOTTOM_UP_REFERENCE_FIRST_LAW_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_PO_CORRECTION_2026_10_02_START -->
## 2026-10-02 — Product Owner Button Composites correction implemented

### Product Owner findings and references

The Product Owner reviewed the existing `/controls/buttons` Button Composites
evidence and supplied explicit visual/behavior authority.

`ErpButtonGroup`:

- reference:
  `https://getbootstrap.com/docs/4.0/components/button-group/`;
- finding: attached buttons were visually separated and did not complete one
  connected group;
- required law: independent actions, but one connected visual entity when
  `attached=true`, with logical outer radii and controlled internal seams.

`ErpSplitButton`:

- reference:
  `https://cdn.dribbble.com/userupload/20508363/file/original-bc0de18cc434c597141bc6d3544e84c5.png?resize=1024x682&vertical=center`;
- finding: primary action and menu trigger looked like separate controls;
- required law: two independent interaction segments inside one unified visual
  surface.

`ErpFabMenu`:

- references:
  - `https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj42vs-Diff%20GM3%20Expressive.png?alt=media&token=b0d9f87d-66c0-48f4-9a11-e312b5b207ef`;
  - `https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj3w24-Diff%20GM2.png?alt=media&token=e358569f-0a63-4ead-a844-ad98804cee2d`;
- finding: opening the action list changed normal layout and pushed the FAB
  trigger;
- required law: trigger position is stable; actions float in a top-layer
  anchored surface above normal document content.

These references satisfy the Product Owner reference-first law for this
correction wave.

### Implemented correction

Button / IconButton internal attached-segment geometry:

- dedicated logical attached-segment styles now support
  `inline|block` axes and `first|middle|last` positions;
- this is an internal composite geometry hook, not a new Page/Product authoring
  API.

ButtonGroup:

- attached children now receive logical attached axis/position metadata;
- inner radii are removed by logical position;
- horizontal and vertical groups own controlled internal separators;
- detached mode removes attached geometry;
- showcase evidence now uses Save / Copy / Delete actions so the action-group
  contract is not confused with segmented selection.

SplitButton:

- primary Button and menu IconButton now share solid/primary/md/default visual
  treatment and attached logical geometry;
- a controlled separator remains between the two interaction segments;
- the action menu now uses `AnchoredOverlayController` plus native
  `popover="manual"`;
- opening SplitButton creates no blocking `ErpOverlayManager` entry;
- the prior production `openLegacyCompactMenu` exception is superseded;
- the legacy API remains owner-only inside OverlayManager until a separate
  cleanup removes it;
- action-menu content is now input/output driven rather than dependent on
  blocking Overlay injection.

FabMenu:

- FAB trigger remains in normal layout and keeps its position;
- Extended FAB actions live in a fixed native manual-Popover surface;
- the shared Anchored Overlay geometry positions the action collection at
  logical `block-start` / `block-end`;
- ArrowUp/ArrowDown, Escape, focus restoration, disabled action behavior, and
  outside-pointer dismissal remain deterministic.

Showcase:

- SplitButton alternatives are export-related only;
- FabMenu actions are create-related only;
- the two composites no longer share one semantically unrelated action list.

### Regression protection

Updated tests cover:

- ButtonGroup inline/block attached geometry and detached reset;
- SplitButton unified segment facets, primary output, anchored top-layer menu,
  zero blocking Overlay entries, selection, Escape, and focus restoration;
- FabMenu stable trigger identity, anchored positioning, selection, logical
  placement, Escape, and focus restoration;
- Buttons showcase evidence for all three corrected composite contracts.

Button governance now requires:

- attached-segment geometry in ErpButton / ErpIconButton;
- ButtonGroup attached seams;
- SplitButton unified authoring + manual top-layer menu;
- FabMenu fixed manual top-layer action surface.

Overlay governance now requires:

- SplitButton and FabMenu anchored-overlay ownership;
- no SplitButton `ErpOverlayManager` / `openLegacyCompactMenu` dependency;
- Tooltip is not accepted as a SplitButton menu subsystem;
- legacy compact Overlay production consumption is forbidden; any remaining API
  is owner-only in OverlayManager.

Formal current contract:

`src/app/controls/composite-family/BUTTON_COMPOSITES_CORRECTION_V1.md`

Overlay supersession record:

`src/app/shared/overlay/OVERLAY_SYSTEM_V1.md`

### Verification state

The previously verified `0814833dc9ad53fbb27109b4b434caaaf7507de9`
checkpoint remains the latest **Fully Green** historical technical checkpoint.

This Button Composites correction changes runtime source/tests/governance after
that checkpoint, therefore the current main must **not** be called Fully Green
until a fresh canonical rerun passes.

Recommended focused preflight:

```text
npm run component-tokens:check
npm run erp-button:check
npm run erp-button:check:self-test
npm run erp-overlay:check
npm run erp-overlay:check:self-test
```

Mandatory final gate:

`npm run verify:clean`

Current state:

**Implemented / fresh focused verification pending / fresh canonical
verification pending / Product Owner Button Composites Light/Dark runtime and
visual re-review pending.**

No new component family was opened. This wave corrects already implemented
Button Composites before any future bottom-up component work.
<!-- CHATGPT_BUTTON_COMPOSITES_PO_CORRECTION_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_TOOLTIP_GOVERNANCE_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — Button Composites verification advanced; Tooltip governance false-positive corrected

Product Owner locally verified
`e3de8b4d7643b812139fbab8a8a9a28c866fae5c`.

Focused results:

- `component-tokens:check` PASS;
- `erp-button:check` PASS;
- `erp-button:check:self-test` PASS;
- `erp-overlay:check` PASS;
- `erp-overlay:check:self-test` PASS.

The full `npm run verify:clean` advanced through those gates and stopped at
`erp-tooltip:check` with exactly two findings:

- `src/app/controls/fab-menu/fab-menu.html`: manual Popover owner not yet
  allowlisted by Tooltip governance;
- `src/app/controls/split-button/split-button.html`: same stale allowlist.

Root cause:

Tooltip governance still recognized only the earlier approved anchored owners
(Tooltip internals and SearchBox). The current Button Composites correction had
already migrated SplitButton and FabMenu to the shared
`AnchoredOverlayController` + native manual Popover architecture, and both
Button and Overlay governance accepted that architecture.

Bounded correction:

- `26b7f29c0819ccc855e6f787f6996b99238816d6` —
  `fix(governance): approve button composite anchored popovers`;
- Tooltip governance now explicitly allows manual Popover markup only for:
  - SearchBox;
  - SplitButton;
  - FabMenu;
  - Tooltip-owned templates remain covered by their existing root rule;
- checker self-test now proves SplitButton and FabMenu are valid owners;
- arbitrary manual Popover markup elsewhere remains rejected;
- no runtime source, public API, visual behavior, Component Token mapping,
  theme authority, or style budget changed.

Documentation follow-up:

- `21744ea74e1bc4bc62bed0054c8bc238ea1ae4b8` —
  `docs(buttons): record anchored popover governance follow-up`.

Current state:

**Button Composites correction implemented / focused Tooltip governance rerun
pending / full canonical verification pending / Product Owner Light/Dark runtime
and visual re-review pending.**

Next checks:

```text
npm run erp-tooltip:check
npm run erp-tooltip:check:self-test
npm run verify:clean
```

Do not reopen unrelated controls or start any new component family.
<!-- CHATGPT_BUTTON_COMPOSITES_TOOLTIP_GOVERNANCE_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_ICON_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — Button Composites verification advanced; invalid showcase icon corrected

Product Owner verification on the current Button Composites correction advanced
through:

- `erp-tooltip:check` PASS;
- `erp-tooltip:check:self-test` PASS;
- complete lint/governance PASS.

The full `npm run verify:clean` then stopped during Angular test bundle
generation before tests executed.

Exact compile failure:

`src/app/showcase/button-controls/button-controls.ts:101`

The create-document FabMenu showcase item used:

`icon: 'document'`

but `document` is not a current `ErpIconName`. The semantic icon registry
contains `file` for this file/document concept.

Bounded correction:

- `eb8ea1816914d62b47363aaeb0139a2edb85b3b3` —
  `fix(showcase): use registered file icon for create action`;
- `4c9494b920171a58968fe9f39567b49923e5c43c` —
  `test(fab-menu): use registered semantic file icon`;
- `8156de8d018e4744aa389f46bfe7945c53eeab7b` —
  `docs(buttons): record semantic icon verification follow-up`.

No runtime component behavior, public API, attached geometry, anchored-overlay
ownership, Component Token mapping, theme authority, or style budget changed.

Current state:

**Button Composites correction implemented / lint-governance verified /
canonical test-typecheck-build rerun pending / Product Owner Light/Dark runtime
and visual re-review pending.**

Mandatory next gate:

`npm run verify:clean`

Do not open any new component family.
<!-- CHATGPT_BUTTON_COMPOSITES_ICON_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_FULLY_GREEN_2026_10_02_START -->
## 2026-10-02 — Button Composites correction reached full technical green

Product Owner locally verified repository checkpoint:

`e920c9377f245128d863ce15916d63c17d1321af` —
`docs(review): record button composite icon follow-up`.

Complete canonical result:

- all governance checks PASS;
- Angular lint PASS;
- **89/89 test files PASS**;
- **681/681 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- **Zero-warning build gate PASS**.

The corrected `ErpButtonGroup`, `ErpSplitButton`, and `ErpFabMenu`
implementation is therefore technically **Fully Green**.

Important boundary:

- technical green does **not** equal Product Owner visual approval or freeze;
- the Product Owner must still complete Light/Dark runtime/visual re-review of
  the three Button Composites;
- no new component/family is authorized solely by this technical result;
- bottom-up dependency ordering and Product Owner reference-first law remain
  unchanged.

Immediate product gate:

1. Product Owner runtime/visual re-review of ButtonGroup;
2. Product Owner runtime/visual re-review of SplitButton;
3. Product Owner runtime/visual re-review of FabMenu;
4. only after the current implemented scope is accepted may the next lowest
   unresolved dependency be opened.

The next candidate after closing current review issues remains the deferred
Boolean/Choice visual correction layer:

- `ErpCheckBox`;
- `ErpRadioBox`;
- then `ErpRadioGroup` re-review because it depends on RadioBox.

CheckBox/RadioBox visual implementation still requires Product Owner-supplied
references or an explicit Product Owner waiver to work without a reference.
<!-- CHATGPT_BUTTON_COMPOSITES_FULLY_GREEN_2026_10_02_END -->


<!-- CHATGPT_NEXT_REFERENCE_BATCH_CHECKBOX_2026_10_02_START -->
## 2026-10-02 — next Product Owner reference batch opened; ErpCheckBox correction implemented

### Product Owner batch decision

The Product Owner supplied `erp-component-templates.zip` as the visual-reference
package for the next component phase and selected option A.

Fixed execution order:

1. `ErpCheckBox` — `erp-checkbox.html`;
2. `ErpRadioBox` — `erp-radiobox.html`;
3. `ErpEmptyState` — `erp-empty-state.html`;
4. `ErpSelect` — `erp-select.html`.

Reference scope is visual/design only. Literal reference colors are not authority.
Honesty ERP Semantic/Component Tokens remain authoritative for all runtime
Light/Dark, tone, status, focus, disabled, and theme-dependent colors.

Formal batch contract:

`src/app/controls/NEXT_COMPONENT_REFERENCE_BATCH_V1.md`

### Bottom-up / one-at-a-time boundary

Only `ErpCheckBox` is opened in this wave.

Do not modify `ErpRadioBox`, `ErpEmptyState`, or `ErpSelect` until:

- CheckBox focused/canonical verification passes;
- Product Owner completes CheckBox runtime/visual review;
- unresolved CheckBox findings are closed.

This preserves the Product Owner bottom-up law and prevents parallel speculative
component work.

### ErpCheckBox Product Owner reference adoption

Formal CheckBox contract:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_CORRECTION_V1.md`

Adopted from the Product Owner supplied `erp-checkbox.html`:

- native checkbox remains the semantic/CVA owner;
- one fixed rounded-square visual control;
- vertical centering against a complete title + optional description text block;
- checked / unchecked / indeterminate / hover / focus / pressed / disabled
  presentation;
- semantic ErpIcon check/minus marks without RTL mirroring;
- selected-state halo and pressed scale;
- reduced-motion behavior;
- supplied size geometry:
  - sm 18px;
  - md 24px;
  - lg 30px;
  - xl 38px.

Existing public upper ERP sizes remain as explicit compatibility extensions:

- xxl 44px;
- xxxl 50px;
- xxxxl 56px.

Explicitly rejected as CheckBox responsibilities:

- Switch;
- Neon variant;
- Selectable Tile;
- Task List strike-through behavior;
- reference demo configurator;
- reference literal palette/gradients/shadows.

Those examples must not turn CheckBox into a God component.

### Implemented source correction

- added optional `description: string | null`;
- retained required `label` as the title/label contract;
- title and description use ErpText span rendering inside the one native outer
  label, avoiding nested native label semantics;
- CheckBox text block is vertically centered against the visual control;
- Component Tokens now map reference-led geometry while keeping all colors on
  Honesty ERP Semantic Tokens;
- checked/indeterminate states add a token-derived selected halo;
- ready press interaction scales only the visual control;
- disabled/invalid state removes press transform and uses disabled token roles;
- showcase Boolean/Choice evidence now demonstrates descriptions plus
  sm/md/lg/xl reference sizes;
- CheckBox tests now cover optional description, one-control geometry, marks,
  facets, validation, and native semantics;
- ErpField governance now pins title/description geometry, supplied size
  geometry, selected/pressed behavior, reduced motion, and forbids nested
  CheckBox label semantics.

Current detailed field contract was synchronized in:

`src/app/controls/FIELD_FAMILY_V1.md`

### Verification state

The previous Button Composites checkpoint is technically Fully Green, but this
new CheckBox runtime/test/governance wave changes source after that checkpoint.

Current CheckBox state:

**implemented / focused verification pending / full canonical verification
pending / Product Owner Light/Dark runtime and visual review pending.**

Required focused preflight:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
```

Mandatory final gate:

`npm run verify:clean`

Technical PASS will not equal Product Owner CheckBox visual approval.

Do not begin RadioBox until this CheckBox gate is closed.
<!-- CHATGPT_NEXT_REFERENCE_BATCH_CHECKBOX_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V2_VISUAL_REJECTION_2026_10_02_START -->
## 2026-10-02 — Product Owner rejected CheckBox V1 visual result; template-match V2 implemented

### Product Owner visual finding

The Product Owner reviewed the live `ErpCheckBox` result and explicitly
rejected it as far from the supplied `erp-checkbox.html` design.

The rejection is authoritative even though the local canonical verification for
that V1 correction was technically green.

Observed technical result before visual rejection:

- 89/89 test files PASS;
- 682/682 tests PASS;
- all governance/lint PASS;
- app/spec typechecks PASS;
- production build PASS;
- Zero-warning build gate PASS.

This is a concrete enforcement of the project law:

**technical PASS != Product Owner visual approval.**

### Root cause

The first correction misinterpreted the supplied CheckBox file as a general
design reference and retained too much of the previous CheckBox visual skeleton.

That was incorrect.

The Product Owner supplied template must be treated as template-level design
authority for the Classic CheckBox assembly, except that its literal colors are
replaced by Honesty ERP Component/Semantic Tokens.

### V2 correction

Only `ErpCheckBox` remains open.

V2 now adopts the supplied Classic CheckBox much more directly:

- selected fill is a two-stop gradient assembled entirely from ERP Component
  Tokens / Semantic color roles;
- the fill scales from 0.55 to 1 inside the visual box;
- the checkmark uses the supplied large CSS clip-path silhouette instead of a
  nested ErpIcon;
- indeterminate reuses the CSS mark layer as the centered rounded bar;
- border thickness is proportional to control size;
- radius is proportional to control size;
- selected halo and focus offset are proportional to control size;
- pressed visual scale is 0.86;
- title/description typography and gap now scale per sm/md/lg/xl reference
  geometry;
- RTL reverses only the gradient direction with a private
  `--_honesty-check-box-gradient-angle`; the mark is not mirrored;
- disabled opacity follows the reference behavior through Foundation opacity;
- reference literal palette values remain forbidden.

The Design Lab Boolean/Choice evidence was also corrected:

- CheckBox now owns a dedicated reference-review card;
- RadioBox is shown separately and clearly remains the current pre-reference
  implementation;
- the former compressed flat combined list is superseded.

### Governance

ErpField governance now rejects:

- nested ErpIcon marks inside CheckBox;
- raw SVG marks;
- raw hex reference colors;
- missing CSS fill/mark pseudo-element assembly;
- missing clip-path mark;
- missing sm/md/lg/xl supplied geometry;
- missing RTL private gradient assembly;
- missing checked/indeterminate/pressed/focus/reduced-motion states;
- nested native label semantics.

### Current state

**CheckBox V2 implemented / fresh focused verification pending / fresh
`npm run verify:clean` pending / Product Owner Light/Dark visual re-review
pending.**

Do not begin RadioBox until CheckBox V2 is technically green and visually
accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_V2_VISUAL_REJECTION_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V2_STACK_GAP_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — CheckBox V2 verification follow-up: invalid review Stack gap corrected

Product Owner locally verified
`42ad7f12e952bffe5f8bb0d4c6dc27fde540d59f`.

Focused results:

- `component-tokens:check` PASS;
- `erp-field:check` PASS;
- `erp-field:check:self-test` PASS.

Angular test bundle generation then stopped before tests executed because the
new Boolean/Choice review cards used `<erp-stack gap="md">`, while the
authoritative `ErpStackGap` contract is:

`none | tight | default | loose`.

Bounded correction:

- `7c1a08d24c30c0c63dbd55333e41064fbd4d9c5a` —
  `fix(showcase): use valid stack gap in choice review cards`;
- both invalid `gap="md"` values were replaced with `gap="default"`;
- no CheckBox runtime implementation, visual design, tokens, public API,
  governance contract, or style budget changed.

Documentation checkpoint:

- `0fab5787a6dd62cfa5c9e4f43d456732517d1f1d` —
  `docs(check-box): record showcase stack-gap follow-up`.

Current state:

**CheckBox V2 implemented / focused governance PASS / fresh tests pending /
fresh canonical verification pending / Product Owner visual re-review pending.**

Next gates:

```text
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox yet.
<!-- CHATGPT_CHECKBOX_V2_STACK_GAP_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V3_VARIANTS_SOLID_TONES_2026_10_02_START -->
## 2026-10-02 — Product Owner CheckBox V3: remove gradient and implement template variants

### Product Owner runtime/visual findings

Product Owner reviewed CheckBox V2 in both Dark and Light.

Findings:

- Dark selected colors were broadly acceptable;
- Light selected gradient treatment was not acceptable;
- selected CheckBox color should use one ordinary ERP system tone, not a
  gradient;
- the prior implementation still underused the supplied template because it
  omitted the template's Switch and Neon variants.

The Product Owner clarified that the supplied template was provided to be
implemented, not selectively reduced to only the Classic example.

### Source-grounded template scope

Full review of `erp-checkbox.html` confirms:

- exact size classes:
  - sm 18px;
  - md 24px;
  - lg 30px;
  - xl 38px;
- its Live Config Variant selector contains:
  - Classic;
  - Switch;
  - Neon;
- its JavaScript declares:
  `VARIANT_CLASSES = ['cb--switch', 'cb--neon']`;
- Selectable Tiles and Task List are separate demo/composition sections, not
  entries in that Variant selector.

Therefore current public CheckBox visual variant API is:

`classic | switch | neon`

with `classic` default.

### Implemented V3 correction

Color:

- selected gradient removed completely;
- one `--honesty-check-box-fill-color` now owns selected fill;
- neutral maps to system inverse neutral;
- primary / secondary / accent map to their matching solid system tones;
- feedback statuses continue to map to matching strong feedback surfaces;
- all mark/focus/glow colors derive from current ERP semantic/component tokens;
- no raw template palette is adopted.

Switch:

- proportional track width = 1.95 × current control size;
- knob = 0.72 × current control size;
- travel = 0.42 × current control size;
- full-radius track;
- checked knob moves to on side;
- RTL reverses travel direction only;
- indeterminate centers/scales knob;
- active scale = 0.95;
- native checkbox/CVA semantics remain unchanged.

Neon:

- keeps Classic geometry and check/indeterminate assembly;
- tone-derived multi-layer glow;
- tone-derived focus outline;
- pulse animation;
- reduced motion disables pulse;
- no hardcoded Neon cyan/purple reference colors.

Showcase:

- Classic reference card retains sm/md/lg/xl + state evidence;
- dedicated Switch review card added;
- dedicated Neon review card added;
- RadioBox remains separately labelled as the current pre-reference control.

Tests/governance:

- CheckBox public API test now covers Classic/Switch/Neon;
- showcase tests require all three variant evidence groups;
- ErpField governance now rejects:
  - missing variant API;
  - missing Switch/Neon style ownership;
  - gradient regression;
  - raw hex reference colors;
  - missing solid fill token;
  - missing RTL-aware Switch travel;
  - missing Neon pulse/reduced-motion;
  - missing supplied size geometry.

### Superseded assumptions

The earlier ChatGPT assumption that Switch and Neon should be excluded to avoid
a God component is superseded. The supplied template itself defines them as
CheckBox variants, so excluding them contradicted the Product Owner reference.

Selectable Tile and Task List remain composition examples only because the
template itself classifies them separately from its Variant selector; this is a
source-derived boundary, not an assistant-invented visual rejection.

### Current state

**CheckBox V3 implemented / fresh focused verification pending / fresh
canonical verification pending / Product Owner Light/Dark visual re-review
pending.**

Required next gates:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox until CheckBox V3 is technically green and visually
accepted by Product Owner.
<!-- CHATGPT_CHECKBOX_V3_VARIANTS_SOLID_TONES_2026_10_02_END -->
