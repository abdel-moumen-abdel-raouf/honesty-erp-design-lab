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
