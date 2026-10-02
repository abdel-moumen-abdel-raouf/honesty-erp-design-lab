# ErpCheckBox Reference Correction V1

## Authority

Product Owner supplied the visual reference in:

`erp-component-templates.zip / erp-checkbox.html`

The reference governs visual structure and interaction design for this correction.
Its literal palette is **not** design authority. All runtime colors remain mapped
through Honesty ERP semantic/component tokens.

## Adopt from the reference

The production `ErpCheckBox` adopts:

- one native `input[type="checkbox"]` as the semantic owner;
- one fixed visual box centered against the complete text block;
- label/title plus optional description;
- multi-line description without shifting the checkbox away from vertical center;
- checked, unchecked, indeterminate, disabled, focus-visible, hover, and pressed
  states;
- centered check/minus marks without RTL mirroring;
- selected-state halo/ring assembled from the selected component color;
- proportional rounded-square geometry;
- reduced-motion handling;
- the reference size geometry for `sm/md/lg/xl`.

Reference size geometry:

- `sm = 18px`;
- `md = 24px`;
- `lg = 30px`;
- `xl = 38px`.

The existing ERP public `ErpFieldSize` union also contains
`xxl/xxxl/xxxxl`. CheckBox keeps accepting those values for compatibility,
but this component now clamps all three to the supplied template's X-Large
38px geometry. The CheckBox visual scale therefore has exactly the four
reference geometries rather than inventing unsupported larger designs.

## Variant and composition boundary

The supplied template's own Live Config defines three CheckBox variants:

- `classic`;
- `switch`;
- `neon`.

Those three are production `ErpCheckBox` variants.

The same template presents Selectable Tile and Task List in separate sections
and classes, not in its Variant selector. Those remain composition/pattern
examples rather than CheckBox variants.

Reference-only demo infrastructure is not production API:

- live configurator controls;
- demo-only RTL toggle;
- direct DOM hydration helpers.

Literal reference colors, gradients, shadows, and theme variables are not copied.

## Public/API correction

Existing API remains compatible.

New inputs:

- `description: string | null`;
- `variant: 'classic' | 'switch' | 'neon'` with `classic` default.

The existing required `label` remains the title/accessible label.

No existing tone/status/size/CVA/native checkbox contract is removed.

## Token law

All colors remain owned by
`src/styles/foundation/components/check-box/_tokens.scss` and resolve from
current semantic tokens.

The reference palette is ignored.

Geometry/motion may be component-tokenized from the reference where compatible
with the current system.

## Verification

Required focused gates:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
```

Mandatory canonical gate:

`npm run verify:clean`

Technical PASS does not imply Product Owner visual approval.


## 2026-10-02 — Product Owner visual rejection and V2 supersession

The Product Owner reviewed the first reference-led implementation in the live
Design Lab and rejected it as visually far from the supplied template.

The first correction had retained too much of the previous CheckBox visual
skeleton. That interpretation is superseded.

Current V2 law:

- `erp-checkbox.html` is a template-level visual authority for the Classic
  CheckBox, not merely a source of general principles;
- preserve Honesty ERP colors/tokens, but reproduce the supplied component's
  geometry and visual assembly much more closely;
- the selected fill is a token-driven two-stop gradient layer that scales into
  the box;
- the checkmark uses the supplied large clip-path silhouette rather than a
  small nested ErpIcon;
- indeterminate uses the same mark layer as a centered rounded bar;
- border thickness and corner radius are proportional to control size;
- checked/indeterminate states remove the outer border and show the proportional
  halo;
- focus offset is proportional to control size;
- title/description font size and gap scale with sm/md/lg/xl as in the
  supplied template;
- RTL reverses only the gradient direction through a private assembly variable;
  the checkmark silhouette is never mirrored;
- disabled opacity and pressed scale follow the supplied Classic CheckBox
  behavior while resolving values through the ERP token/foundation system.

The Design Lab evidence must also stop presenting CheckBox/RadioBox as one
compressed flat list. CheckBox gets its own reference-review card; RadioBox
remains visibly marked as the current pre-reference implementation until its
own wave opens.

The previous statement that CheckBox checked/indeterminate marks must be
semantic ErpIcon `check`/`minus` is superseded by this V2 template match.

Technical verification remains necessary but does not override Product Owner
visual rejection.


## 2026-10-02 — showcase Stack-gap compile follow-up

Product Owner local verification at
`42ad7f12e952bffe5f8bb0d4c6dc27fde540d59f` produced:

- `component-tokens:check` PASS;
- `erp-field:check` PASS;
- `erp-field:check:self-test` PASS.

Angular test bundle generation then stopped before executing tests because the
new dedicated Boolean/Choice review cards authored:

`<erp-stack gap="md">`

but the canonical `ErpStackGap` contract is:

`none | tight | default | loose`.

This is a showcase-only compile defect, not a CheckBox runtime or visual-contract
defect.

Bounded correction:

- both review-card stacks now use `gap="default"`;
- no CheckBox runtime source, Component Token mapping, visual assembly, public
  API, governance rule, or style budget changed.

Correction checkpoint:

`7c1a08d24c30c0c63dbd55333e41064fbd4d9c5a` —
`fix(showcase): use valid stack gap in choice review cards`.

Fresh tests and complete `npm run verify:clean` remain mandatory.


## 2026-10-02 — Product Owner V3: solid system tones + complete template variants

The Product Owner reviewed CheckBox V2 in Light and Dark.

New binding decisions:

1. the gradient selected fill is rejected;
2. selected CheckBox color must use one ordinary current ERP system tone;
3. the supplied template must not be reduced to the Classic example;
4. the template-defined Switch and Neon variants are part of the requested
   CheckBox implementation.

The earlier non-goal that excluded Switch/Neon was an incorrect architecture
assumption and is superseded.

### Source-grounded variant classification

The supplied `erp-checkbox.html` Live Config exposes:

- Classic;
- Switch;
- Neon.

Its JavaScript likewise declares:

`VARIANT_CLASSES = ['cb--switch', 'cb--neon']`.

Therefore the production API is now:

`variant: 'classic' | 'switch' | 'neon'`

with `classic` as the default.

The same source presents Selectable Tiles and Task List in separate demo
sections/classes, not in the Variant selector. They remain composition examples
rather than hidden CheckBox variants unless the Product Owner later explicitly
promotes them.

### Color law

No selected-state gradient is allowed.

- `tone='neutral'` resolves to the system inverse neutral fill;
- `primary`, `secondary`, and `accent` resolve to their single solid
  system tone;
- status values continue to override selected fill with the corresponding
  feedback strong surface/on-strong roles;
- Neon glow derives from that same resolved fill tone;
- no literal template palette is copied.

### Switch law

Switch follows the supplied proportional geometry:

- track inline size = 1.95 × control size;
- knob size = 0.72 × control size;
- travel = 0.42 × control size;
- track uses full radius;
- checked knob moves to logical on side;
- RTL reverses only travel signs;
- indeterminate centers and scales the knob;
- active scale = 0.95;
- same native checkbox/CVA/required/disabled semantics remain authoritative.

### Neon law

Neon keeps Classic geometry and selected mark behavior, then adds:

- tone-derived multi-layer glow;
- tone-derived focus outline;
- pulse animation;
- reduced-motion disables the pulse.

### Current verification boundary

This V3 changes runtime source, tokens, tests, showcase, and governance after
the previous green checkpoint.

Fresh focused checks and full `npm run verify:clean` are mandatory before
Product Owner visual re-review.


## 2026-10-02 — governance false-positive and pre-handoff consistency rule

Product Owner local verification at
`1ce479b53bb440bb80c0cd1519db83ca285ccd21` showed:

- the standalone test suite completed successfully;
- **89/89 test files PASS**;
- **683/683 tests PASS**;
- canonical verification then stopped at one CheckBox ErpField governance
  finding.

Root cause was not runtime behavior.

During the V3 style compaction, the actual Switch implementation renamed its
private direction variables to:

- `--_switch-off`;
- `--_switch-on`.

The ErpField governance checker still required the superseded private names:

- `--_honesty-check-box-switch-off`;
- `--_honesty-check-box-switch-on`.

Bounded correction:

- `aac51a5fcdfecb3eeb9ee148e07799a38e5519ed` —
  `fix(governance): align checkbox switch private variables`;
- no CheckBox runtime, template, token, public API, visual behavior, or
  showcase source changed.

Post-correction static source-to-governance audit:

- 47 CheckBox contract predicates evaluated against current production source;
- 47 PASS;
- 0 mismatches.

### Pre-handoff rule for this batch

For every future component wave in this reference batch, before asking the
Product Owner to pull and run verification:

1. inspect every changed runtime/template/token/test/governance file as one
   diff unit;
2. evaluate every newly added or changed governance predicate against the
   actual current source;
3. require zero static source/governance mismatches;
4. inspect dependent test expectations for stale literals/selectors;
5. only then hand the checkpoint to the Product Owner for local canonical
   execution.

This does not replace `npm run verify:clean`; it prevents avoidable stale
checker/source mismatches from being handed to the Product Owner.


## 2026-10-03 — Product Owner video review / V4 correction

The Product Owner supplied a runtime screen recording covering Dark and Light,
Classic, Switch, and the Boolean/Choice review area. The video exposed
behavioral and review-layout defects that static tests did not cover.

Binding findings and corrections:

1. **Neutral selected color**
   - inverse black/white selection is rejected;
   - default/neutral selection now resolves through the ordinary primary action
     tone so it remains a normal system control color in both themes.

2. **Switch OFF visibility**
   - the unchecked Light switch track was too close to its white review surface;
   - Switch now has a dedicated off-track token resolving to
     `surface-canvas` plus `border-strong`.

3. **Indeterminate activation**
   - a literal `indeterminate` input previously re-applied the mixed visual
     after user activation;
   - CheckBox now owns a user-cleared indeterminate latch;
   - user activation exits mixed state;
   - an external change of the `indeterminate` input re-arms it.

4. **Required validation**
   - the showcase no longer hard-codes `status="danger"`;
   - danger is derived exclusively from required validation while unchecked;
   - selecting the required checkbox returns host status to `none`.

5. **Disabled presentation**
   - disabled no longer combines disabled text colors with whole-control opacity;
   - the supplied template's single whole-control opacity treatment is used.

6. **Size review**
   - the review now presents the same component structure across
     sm/md/lg/xl in one dedicated wide size card;
   - legacy upper ERP size names remain accepted but alias to xl geometry.

7. **Template compositions**
   - Switch and Neon remain real CheckBox variants;
   - Selectable Tiles and Select All / Task List are now represented in the
     Design Lab as template-derived compositions built on ErpCheckBox;
   - they are not promoted to new CheckBox variant names.

8. **Task / Select All behavior**
   - the review starts with a partial task selection;
   - the master CheckBox displays true indeterminate state;
   - activating the master selects all tasks and exits indeterminate;
   - task count and completion evidence update reactively.

9. **Review layout**
   - equal-height forced cards were removed;
   - size and task evidence use deliberate wide cards;
   - Switch, Neon, Tiles, and current Radio evidence remain independently
     reviewable without large artificial empty areas.

10. **Pre-handoff consistency**
    - current runtime/template/token/showcase/governance source was evaluated
      against 85 static CheckBox predicates;
    - 85 PASS;
    - 0 mismatches before merge preparation.

This V4 remains subject to fresh focused checks, full `npm run verify:clean`,
and Product Owner Light/Dark visual approval.
