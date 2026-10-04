# Next Component Reference Batch V1

## Product Owner decision

The Product Owner supplied `erp-component-templates.zip` as the visual
reference package for the next component phase and selected execution option A.

Execution order is fixed as:

1. `ErpCheckBox`
2. `ErpRadioBox`
3. `ErpEmptyState`
4. `ErpSelect`

This order is subordinate to the global bottom-up dependency law: do not open
the next item while the current item still has unresolved technical/runtime/
visual Product Owner findings.

## Reference files

- `ErpCheckBox` -> `erp-checkbox.html`
- `ErpRadioBox` -> `erp-radiobox.html`
- `ErpEmptyState` -> `erp-empty-state.html`
- `ErpSelect` -> `erp-select.html`

## Reference scope law

The Product Owner explicitly approved these files for **design reference**.

Adopt as applicable:

- component structure;
- visual proportions;
- geometry;
- spacing;
- state composition;
- interaction presentation;
- title/description hierarchy;
- open/closed/selected/disabled/focus behavior where the component requires it.

Do **not** copy reference palette values.

Honesty ERP remains authoritative for:

- Semantic Colors;
- Component Color Tokens;
- Light/Dark resolution;
- status/tone colors;
- focus colors;
- disabled colors;
- any other theme-dependent value.

No hardcoded reference palette may become production authority.

## One-component-at-a-time execution

Each component is a separate correction/implementation wave:

1. analyze current source + reference + dependencies;
2. record adopt/adapt/reject decisions;
3. update contracts/tokens/runtime/showcase/tests/governance as one unit;
4. run focused gates;
5. run `npm run verify:clean`;
6. Product Owner performs runtime/visual Light/Dark review;
7. only then may the next component be opened.

## Current item

`ErpCheckBox` is the currently opened item.

Its current detailed contract is:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

The earlier `CHECK_BOX_REFERENCE_CORRECTION_V1.md` is historical only.

`ErpRadioBox`, `ErpEmptyState`, and `ErpSelect` are not yet authorized for
source changes in this wave.

## ErpSelect boundary

The Product Owner has identified `ErpSelect` as the fourth component in this
batch. Before its source implementation begins, the current
ItemPicker/ComboBox/SearchBox selection architecture must be reconciled against
the supplied Select reference so the new Select contract does not duplicate or
silently contradict existing approved selection roles.


## CheckBox V1 visual rejection / V2 current state

The Product Owner rejected the first CheckBox reference correction after live
runtime review. Technical green did not establish visual conformance.

The first implementation was too conservative: it kept the previous CheckBox
visual skeleton and treated the supplied template as general inspiration.

That interpretation is superseded.

Current CheckBox V2 uses the supplied Classic CheckBox visual assembly directly
for geometry and interaction presentation while retaining Honesty ERP
color/token authority.

RadioBox remains unopened and unchanged until CheckBox V2 receives technical
and Product Owner visual acceptance.


## CheckBox V3 current state

Product Owner review of V2 added two corrections:

- remove selected gradients and use one resolved system tone;
- implement the template's own Classic / Switch / Neon variant vocabulary.

This is now implemented in the current CheckBox wave.

The template's Selectable Tiles and Task List remain separately classified
composition examples because the template itself does not expose them in its
Variant selector.

RadioBox remains unopened.


## Pre-handoff consistency gate

After a CheckBox V3 governance false-positive caused by stale private-variable
names in the checker, this batch adds a mandatory pre-handoff static gate.

Before any future component checkpoint is handed to Product Owner for local
execution:

- changed governance predicates must be evaluated against the actual current
  production source;
- changed tests must be checked for stale selectors/literals/contracts;
- source/governance static mismatch count must be zero;
- the full diff must remain bounded to the current component wave.

Local `npm run verify:clean` remains the canonical executable gate.


## CheckBox V4 — video-derived closure candidate

Product Owner video review reopened CheckBox after V3 and produced a bounded V4
correction before RadioBox may begin.

V4 covers:

- ordinary system selected tone instead of inverse neutral;
- visible Switch OFF track in Light and Dark;
- user activation exits indeterminate state;
- required danger derives from validation and recovers after selection;
- one disabled attenuation path;
- exact four reference size geometries;
- dedicated Size / States / Switch / Neon / Selectable Tiles /
  Select All & Task List review evidence;
- removal of forced equal-height review-card whitespace.

Pre-handoff static source/governance audit for V4: **85/85 PASS**.

RadioBox remains unopened until V4 is canonically green and visually accepted.


## CheckBox V4 merged checkpoint

The video-derived CheckBox V4 correction was squash-merged to `main` as:

`9aa72e456b902530aab61e6c5a3286d2180b9e07`.

Final post-split pre-merge static audit:

- 139 predicates checked;
- 139 PASS;
- 0 mismatches.

Fresh local executable verification and Product Owner Light/Dark visual
re-review remain pending. RadioBox remains closed.


## CheckBox V5 — erp-checkbox-3 exact-reference authority

Product Owner rejected the V4 result and supplied a replacement authoritative
file:

`erp-checkbox-3.html`

Binding implementation rule:

- reproduce the reusable component's structure, geometry, modes, variants,
  states, and motion presentation from that file;
- replace only its literal palette with Honesty ERP Semantic/Component colors;
- do not carry forward V1-V4 Neon/Classic assumptions that are absent from the
  new file.

Current CheckBox contract:

- modes: `checkbox | switch | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px;
- standalone visible-text suppression with accessible label preservation;
- read-only guard;
- SVG stroke check/dash;
- Switch sweep + derived thumb travel;
- production Tile mode;
- indeterminate/select-all behavior;
- exact state matrix.

The source's single-select Tile subsection uses native radio inputs and is
therefore reserved for the next RadioBox wave rather than being faked with
checkbox semantics.

RadioBox remains otherwise unopened.

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
