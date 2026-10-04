# README FIRST — HONESTY ERP Design Lab

Start every new ChatGPT or implementation-agent session by reading these files
in this order:

1. `NEW_CHAT_HANDOFF.md`
2. `AGENTS.md`
3. `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
5. `src/app/controls/CONTROLS_CORRECTION_PROGRAM_V1.md`
6. `src/app/controls/POST_CR12_REVIEW_WAVE_A_V1.md`

## Repository

GitHub: `abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Owner local workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Current state

The expanded Inputs correction and unified validation program is now implemented
in source/tests/governance on current `main`.

Current implementation checkpoint:
`c3971739198e61adff98d821a6b8f6775faa4e6c`

Implemented in this program:
- common ERP input semantic state:
  `null | empty | no-selection | invalid-entry | valid-entry`;
- common `valid`, `errors`, `validationIssues`, and validation snapshot;
- common `required` and external/server validation issue hook;
- Angular Forms Validator bridge from the same validation source of truth;
- exactly one `NG_VALIDATORS` provider required for every CVA ERP input;
- validation changes from non-committed drafts notify Angular Forms;
- Field-family `clearable` defaults on with per-instance opt-out;
- text/domain validation is non-destructive;
- URL/Tel keep invalid user text visible and publish domain errors;
- Number/Money/NumberStepper keep invalid drafts visible and publish
  format/min/max/step errors rather than silently clamping editable input;
- text-like max length is validation-only and does not truncate/block typing;
- File/Image expose min/max count, type, size, and rejected-attempt issues through
  the common errors contract;
- Ghost/Text/Underline have token-owned hover discoverability;
- RangeSlider uses one global coordinate domain for both native thumbs and rail;
- RangeSlider rail and Tooltip anchors share thumb-center geometry;
- active thumb Tooltip value is customizable and requests repositioning while
  the thumb moves;
- RangeSlider validation projects to danger state, aria-invalid, and visible
  feedback;
- Time/DateTime Now updates staged value and reveals selected hour/minute;
- DateRange uses rolling inclusive presets:
  آخر 7 أيام / 7 أيام بدءًا من اليوم / آخر 30 يومًا /
  30 يومًا بدءًا من اليوم;
- Date/Time/DateTime/DateRange expose common bounds/state validation;
- ColorPicker is instance-fixed to `system | free` and no longer has an
  internal mode switch;
- ItemPicker remains select-like while ComboBox remains editable type-to-filter;
- Design Lab evidence differentiates those contracts;
- governance self-tests protect the new validation, hover, RangeSlider,
  temporal, selection, SearchBox, and Angular-validator contracts.

Important verification distinction:
- current source is **implemented / verification pending**;
- do not call it Fully Green until a fresh complete `npm run verify:clean`
  passes from current `main`;
- Product Owner runtime/Light/Dark re-review is still required after technical
  green.

Latest prior Fully Green baseline remains:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Read `NEW_CHAT_HANDOFF.md` for the exact continuation state.


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


<!-- CHATGPT_CHECKBOX_V3_GOVERNANCE_MISMATCH_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — CheckBox V3 governance false-positive corrected; pre-handoff static audit added

Product Owner local verification on
`1ce479b53bb440bb80c0cd1519db83ca285ccd21` produced:

- standalone test suite PASS;
- **89/89 test files PASS**;
- **683/683 tests PASS**;
- `npm run verify:clean` then stopped at exactly one
  `erp-field:check` CheckBox governance finding.

Root cause:

- production Switch styles use private variables
  `--_switch-off` and `--_switch-on`;
- the governance checker still required stale pre-compaction private names
  `--_honesty-check-box-switch-off` and
  `--_honesty-check-box-switch-on`.

Bounded correction:

- `aac51a5fcdfecb3eeb9ee148e07799a38e5519ed` —
  `fix(governance): align checkbox switch private variables`;
- no CheckBox runtime source, template, Component Tokens, public API, visual
  behavior, or showcase implementation changed.

Post-correction static source-to-governance audit:

- 47 CheckBox governance predicates checked against current production source;
- 47 PASS;
- 0 mismatches.

### New execution rule

For every remaining component in the Product Owner reference batch, before a
checkpoint is handed to Product Owner for local verification:

1. inspect runtime/template/tokens/tests/governance together as one bounded diff;
2. evaluate every changed governance predicate against current production source;
3. require zero static source/governance mismatches;
4. inspect changed dependent tests for stale selectors/literals;
5. only then request Product Owner local execution.

This is a pre-handoff static consistency gate. It reduces avoidable false
positives but does not replace `npm run verify:clean`.

Current state:

**CheckBox V3 runtime/tests visually unchanged from the prior checkpoint /
governance mismatch corrected / fresh erp-field and canonical verification
pending / Product Owner visual re-review pending.**

RadioBox remains unopened.
<!-- CHATGPT_CHECKBOX_V3_GOVERNANCE_MISMATCH_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V4_VIDEO_REVIEW_2026_10_03_START -->
## 2026-10-03 — Product Owner video review opened CheckBox V4 closure candidate

### Product Owner evidence

The Product Owner supplied a live screen recording covering the CheckBox review
in Dark and Light and interacting with Classic/Switch states.

The video is authoritative for the runtime/visual findings below.

### Findings closed in V4

- neutral/default selected CheckBox must not become inverse white in Dark or
  inverse black in Light;
- default/neutral selection now resolves through the ordinary primary action
  system tone;
- unchecked Switch track must remain visibly distinct from the review surface
  in both themes;
- Switch OFF now uses a dedicated `surface-canvas` track and strong semantic
  border;
- user activation must leave indeterminate state instead of the literal input
  immediately reasserting mixed visuals;
- an external change to the `indeterminate` input may re-arm mixed state;
- required danger must be validation-derived, not a permanent hard-coded
  `status="danger"`;
- required status returns to `none` immediately after a valid selection;
- disabled must use one attenuation path only; whole-control reference opacity
  remains, duplicate disabled text-color dimming was removed;
- CheckBox review sizes are now one comparable sm/md/lg/xl scale;
- the public shared Field size vocabulary is still accepted, but CheckBox
  xxl/xxxl/xxxxl alias to the supplied template's 38px xl geometry instead of
  inventing unsupported CheckBox sizes;
- Switch and Neon remain the template-defined public CheckBox variants;
- Selectable Tiles and Select All / Task List are now represented as
  template-derived Design Lab compositions built on CheckBox rather than being
  ignored;
- the Select All evidence starts partially selected and proves true
  indeterminate -> select-all behavior;
- forced equal-height review cards were removed to eliminate the large empty
  review areas visible in the earlier page.

### Runtime / source correction

Current V4 changes are bounded to CheckBox, its InputControls review evidence,
dependent tests, ErpField governance, and CheckBox/Field/batch documentation.

RadioBox source remains unopened.

### Regression protection

CheckBox unit tests now pin:

- native/CVA semantics;
- Classic/Switch/Neon variant API;
- user-exitable indeterminate state;
- external re-arm of indeterminate;
- required invalid -> danger and checked -> none recovery;
- size/facet compatibility.

InputControls tests now pin:

- full CheckBox reference sections;
- exact sm/md/lg/xl evidence;
- Switch and Neon evidence;
- Selectable Tiles evidence;
- Select All / Task List evidence;
- mixed-state exit;
- required-status recovery;
- tile interaction;
- task-master indeterminate -> all-selected behavior.

ErpField governance now also requires:

- user-exitable indeterminate implementation;
- visible Switch OFF track token roles;
- ordinary system selected tone;
- no selected gradient;
- no duplicate disabled text dimming;
- full CheckBox reference showcase evidence;
- validation-derived required danger;
- task/tile interactive review model.

### Pre-handoff audit

Before merge preparation, current V4 source was evaluated against **85 static
CheckBox runtime/showcase/governance predicates**:

- 85 PASS;
- 0 mismatches.

This static gate does not replace executable verification.

### Current state

**CheckBox V4 implemented on bounded work branch / static pre-handoff audit
PASS / fresh local executable verification pending / Product Owner Light/Dark
visual re-review pending.**

Required executable gates after merge:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not open RadioBox until CheckBox V4 is technically green and visually
accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_V4_VIDEO_REVIEW_2026_10_03_END -->


<!-- CHATGPT_CHECKBOX_V4_MERGED_CHECKPOINT_2026_10_03_START -->
## 2026-10-03 — CheckBox V4 merged to main after final static preflight

The bounded Product Owner video-derived CheckBox V4 correction was
squash-merged to `main` at:

`9aa72e456b902530aab61e6c5a3286d2180b9e07` —
`fix(check-box): close Product Owner video findings`.

The work branch used incremental commits for implementation/review, but main
received one squash commit only.

Final pre-merge audit after all source/test/governance/style-budget
restructuring:

- **139/139 static predicates PASS**;
- **0 source/governance mismatches**;
- CheckBox style ownership split across token-frame/base/states/Switch/Neon/
  facets/sizes to reduce component-style budget risk;
- InputControls review stylesheet remained below the project warning threshold
  at source-preflight level;
- RadioBox source remained untouched.

V4 includes the Product Owner video findings:

- ordinary system selected tone;
- visible Switch OFF track in Light/Dark;
- user activation exits indeterminate;
- external indeterminate changes can re-arm mixed state;
- required danger is validation-derived and recovers after checking;
- one disabled attenuation path;
- exact template sm/md/lg/xl visual geometries, with higher shared Field size
  names aliasing xl for CheckBox compatibility;
- Classic / Switch / Neon;
- Selectable Tiles composition;
- Select All / Task List composition;
- removal of forced equal-height review-card whitespace.

Current state:

**CheckBox V4 merged / fresh executable verification pending / Product Owner
Light-Dark visual re-review pending / RadioBox not opened.**

Required executable gate:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox until this gate is green and CheckBox is visually accepted.
<!-- CHATGPT_CHECKBOX_V4_MERGED_CHECKPOINT_2026_10_03_END -->


<!-- CHATGPT_CHECKBOX_EXACT_REFERENCE_V5_2026_10_04_START -->
## 2026-10-04 — Product Owner replaced CheckBox V1–V4 with exact erp-checkbox-3 authority

### Binding Product Owner decision

The Product Owner rejected the previous CheckBox visual result and supplied a
replacement reference file:

`erp-checkbox-3.html`

Reference identity captured during implementation:

- 59,910 bytes;
- SHA-256:
  `63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`.

The Product Owner explicitly requires the production result to reproduce the
demo's reusable component structure, geometry, modes, variants, states, and
motion presentation, while replacing the demo palette with Honesty ERP system
colors only.

This V5 supersedes every earlier CheckBox V1/V2/V3/V4 visual assumption.
Earlier CheckBox correction records remain historical only.

Current detailed authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

### Implemented V5 public contract

Modes:

- `checkbox` — default;
- `switch`;
- `tile`.

Variants:

- `outline` — default;
- `filled`;
- `soft`.

Additional exact-reference inputs:

- optional `description`;
- `readOnly` interaction guard;
- `hideText` standalone visual mode while retaining the required label as the
  accessible name;
- existing `indeterminate`, tone, status, size, disabled, required, CVA, and
  validation contracts remain.

### Exact geometry and motion

Reference CheckBox size geometry:

- sm = 18px;
- md = 22px;
- lg = 28px;
- xl = 36px.

Shared Field size names xxl/xxxl/xxxxl remain accepted only for API
compatibility and resolve to the CheckBox xl geometry.

Switch math follows the source reference:

- track width = control × 1.85;
- track padding = control × 0.13;
- thumb = track height − 2 × padding;
- travel = track width − 2 × padding − thumb.

Reference motion is preserved:

- instant 90ms;
- fast 140ms;
- base 220ms;
- check draw 300ms;
- erase 150ms;
- pop 240ms;
- draw delay 70ms;
- source standard/out/spring/draw/erase cubic-bezier curves;
- reduced motion = 1ms and no pop animation.

### Exact reusable visual assembly

- native checkbox remains the sole semantic/CVA owner;
- one internal SVG mark reproduces the supplied check and dash paths using
  `pathLength="1"` and stroke-dashoffset draw/erase animation;
- this SVG is a bounded internal CheckBox graphic exception only; raw SVG
  remains forbidden for Feature/Page authors;
- Switch uses the supplied resting track + directional fill sweep + derived
  thumb travel;
- Tile is now a real CheckBox mode owned by the component itself, not a
  showcase wrapper;
- Filled and Soft are token swaps only and keep identical markup;
- read-only remains focusable and blocks pointer/Space/Enter mutation;
- native user activation exits indeterminate; an external indeterminate input
  change can re-arm it;
- required validation derives danger and recovers automatically after a valid
  selection;
- disabled uses the supplied single whole-control attenuation path.

### Color law

Only the supplied palette is replaced.

All production colors resolve from current Honesty ERP Semantic/Component
Tokens:

- system text/surface/border roles;
- current action/brand tone fill roles;
- action subtle roles for Soft;
- Feedback roles for status/danger;
- system focus and elevation roles.

No reference hex colors, component-owned Light/Dark branching, gradient, or
Neon treatment remains.

### Design Lab evidence

The Inputs review now mirrors the source demo sections owned by CheckBox:

- Standalone checkbox;
- Checkbox with title & sub-title;
- Switch mode;
- Tile mode — multi-select;
- Outline / Filled / Soft variants;
- Indeterminate / Select All;
- Size scale;
- State matrix.

The source demo's "Tile mode — single select" uses native radio inputs.
That subsection is intentionally not faked with checkbox semantics; it remains
the first visual target of the next authorized RadioBox wave.

### Tests and governance

CheckBox unit tests pin:

- native/CVA defaults;
- checkbox/switch/tile modes;
- outline/filled/soft variants;
- standalone accessible naming;
- indeterminate exit and external re-arm;
- read-only interaction guard;
- validation-derived danger recovery;
- size compatibility;
- disabled/invalid configuration boundaries.

Showcase tests pin:

- exact CheckBox evidence sections;
- current mode/variant counts;
- SVG check/dash evidence;
- exact sm/md/lg/xl review scale;
- required recovery;
- Select All indeterminate behavior.

ErpField governance now requires the V5 contract and rejects V1–V4 regressions,
including Neon, gradient fill, old modes/variants/sizes, missing SVG stroke
mark, missing Switch/Tile ownership, or stale showcase evidence.

ErpIcon governance has one exact-file exception for the CheckBox-owned internal
SVG mark. The general raw SVG prohibition remains active everywhere else.

### Pre-handoff static audit

Before merge, the final source was checked as one bounded unit:

- Component runtime/token/test audit: 73/73 PASS;
- Showcase/governance audit: 57/57 PASS;
- Component Token mixin audit: 79 base tokens, 0 facet/base mismatches,
  0 raw-color violations;
- approximate post-Sass physical stylesheet budget preflight: 0 files at or
  above the 4k warning threshold;
- RadioBox production implementation remains otherwise untouched.

Current state:

**CheckBox exact-reference V5 implemented / static preflight PASS / fresh local
executable verification pending / Product Owner Light-Dark visual approval
pending.**

Required executable gate after pull:

`npm run verify:clean`

Do not open the RadioBox reference wave until V5 is technically green and
visually accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_EXACT_REFERENCE_V5_2026_10_04_END -->


<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_FOLLOWUP_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 verify advanced; read-only label-click lint defect corrected

Product Owner locally pulled exact-reference V5 checkpoint:

`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` —
`fix(check-box): implement exact Product Owner reference V5`.

Canonical verification advanced through:

- Single App theme authority PASS;
- route-page ERP-only authoring PASS;
- Component Token framework PASS;
- system colors PASS;
- ErpText PASS;
- ErpIcon registry/governance PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpOverlay PASS;
- ErpConfirm PASS.

Angular template lint then stopped at exactly two CheckBox accessibility findings:

- outer `<label>` had a `(click)` handler without a keyboard event;
- the same non-focusable label was treated as an interactive element.

Root cause:

V5 implemented read-only pointer blocking on the outer label. That ownership is
incorrect even though the label is associated with the native checkbox.

Bounded correction:

- remove all click ownership from the outer label;
- move the read-only click guard to the native
  `input[type="checkbox"]`, which is the authoritative interactive/focusable
  element;
- `handleNativeClick` prevents default only for read-only;
- existing native keydown guard continues to block Space/Enter for read-only;
- existing defensive change restoration remains;
- CheckBox unit test now proves read-only native click is prevented;
- ErpField governance now requires the native click handler and rejects any
  `(click)` binding on the outer CheckBox label.

No Product Owner visual design, reference geometry, token mapping, mode,
variant, motion, or showcase implementation changed.

Current state:

**CheckBox exact-reference V5 unchanged visually / accessibility-lint follow-up
implemented on bounded work branch / fresh canonical verification pending /
Product Owner Light-Dark visual approval pending.**

RadioBox remains unopened.
<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_FOLLOWUP_2026_10_04_END -->


<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_MERGED_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 read-only lint follow-up merged

The bounded accessibility follow-up was squash-merged to `main` at:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`.

The change is behavior/semantics-only:

- outer CheckBox label has no click handler;
- native checkbox input owns the read-only click guard;
- native keydown guard remains;
- defensive change restoration remains;
- tests/governance pin this ownership and reject label click handlers.

Post-merge static audit:

- **13/13 read-only/lint predicates PASS**;
- **0 mismatches**.

No Product Owner visual design, erp-checkbox-3 geometry, system-token mapping,
mode, variant, size, motion, or showcase evidence changed.

Current state:

**CheckBox exact-reference V5 merged / read-only lint follow-up merged /
fresh canonical verification pending / Product Owner Light-Dark visual approval
pending / RadioBox unopened.**
<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_MERGED_2026_10_04_END -->


<!-- CHATGPT_PERSISTENT_CONTINUITY_PROTOCOL_2026_10_04_START -->
## Permanent continuity protocol — mandatory for every substantive execution cycle

### New-chat reading order

A new ChatGPT conversation must **not** ask the Product Owner to reconstruct the
project history manually.

At the start of a new chat, read the following repository files in this order,
then verify live GitHub `main` before making any current-state claim:

1. `README_FIRST.md`
2. `CURRENT_EXECUTION_STATE.md`
3. `NEW_CHAT_HANDOFF.md`
4. `DECISIONS_AND_CONSTRAINTS.md`
5. `GIT_CHECKPOINTS.md`
6. `AGENTS.md`
7. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
8. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
9. `src/app/controls/NEXT_COMPONENT_REFERENCE_BATCH_V1.md`
10. `src/app/controls/FIELD_FAMILY_V1.md`
11. current active component-specific contract:
    `src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

For long-range inventory/dependency/planning context only, also read when
needed:

`docs/project-history/derived/PROJECT_ORIGIN_COMPONENTS_AND_EXECUTION_BLUEPRINT_V1.md`

The blueprint is a derived planning reference, not implementation
authorization or visual approval.

### Current immediate state

Current main documentation HEAD at the time of this protocol:

`be140ad3c171fe3475101fb5a329ca0437060ba7`

Current CheckBox runtime/source checkpoint:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`

The first local canonical run of exact-reference V5 at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` passed every project governance
gate through ErpConfirm and then stopped on two Angular template-lint
accessibility findings caused by click ownership on the outer CheckBox label.

That defect is corrected and merged.

Fresh `npm run verify:clean` on current main remains pending.

Product Owner Light/Dark visual approval of exact-reference CheckBox V5 also
remains pending.

RadioBox is not yet opened.

### Mandatory synchronization law

Every substantive cycle must update persistent project documentation **in the
same cycle before handoff**.

A substantive cycle includes any:

- Product Owner decision or visual finding;
- implementation/code change;
- blocker or root-cause correction;
- verification result;
- visual acceptance/rejection;
- scope/reference change;
- execution stage/phase transition;
- current/next component change.

The mandatory synchronized set is:

1. `CURRENT_EXECUTION_STATE.md`
2. `README_FIRST.md`
3. `NEW_CHAT_HANDOFF.md`
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
5. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Also update whenever their subject changes:

- `DECISIONS_AND_CONSTRAINTS.md`
- `GIT_CHECKPOINTS.md`
- active batch contract;
- active component-specific contract;
- affected family/system contracts.

Do **not** leave the latest state, decision, stage, blocker, or execution result
only inside chat history.

Do **not** hand a substantive checkpoint to the Product Owner until:

- runtime/source changes;
- dependent tests;
- governance;
- execution state;
- roadmap/stage state;
- Product Owner findings;
- component/batch contracts

are synchronized as one bounded unit.

### Authority reminders

- Product Owner is final product/visual authority.
- technical PASS != Product Owner visual approval/freeze.
- fix current implemented components before opening new ones.
- future execution is bottom-up by dependency.
- any new visual component requires Product Owner reference or explicit
  no-reference authorization.
- reference colors do not override Honesty ERP system color/token architecture
  unless Product Owner explicitly says otherwise.
- `npm run verify:clean` is the canonical technical executable gate.
<!-- CHATGPT_PERSISTENT_CONTINUITY_PROTOCOL_2026_10_04_END -->
