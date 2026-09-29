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
