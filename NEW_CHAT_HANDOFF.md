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
