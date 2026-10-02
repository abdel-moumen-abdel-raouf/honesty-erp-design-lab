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
`xxl/xxxl/xxxxl`. Those are retained for compatibility as explicit ERP
extensions beyond the supplied reference:

- `xxl = 44px`;
- `xxxl = 50px`;
- `xxxxl = 56px`.

These upper three sizes are an ERP adaptation, not a claim about the supplied
reference.

## Explicit non-goals

The reference also contains separate demonstrations for Switch, Neon,
Selectable Tile, Task List, live configurator, and demo-only RTL controls.

Those are **not** absorbed into `ErpCheckBox`.

In particular:

- CheckBox does not become Switch;
- CheckBox does not expose a Neon visual variant;
- selectable-card/tile behavior remains composition/pattern territory;
- task strike-through behavior remains consumer/domain composition;
- reference JavaScript configurator/demo tooling is not production API;
- literal reference colors, gradients, shadows, and theme variables are not
  copied.

This prevents `ErpCheckBox` from becoming a God component.

## Public/API correction

Existing API remains compatible.

New optional input:

`description: string | null`

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
