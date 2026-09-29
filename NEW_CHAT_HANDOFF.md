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
