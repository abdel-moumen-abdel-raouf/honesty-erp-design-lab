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

Its detailed contract is:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_CORRECTION_V1.md`

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
