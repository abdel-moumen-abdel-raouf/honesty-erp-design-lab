# Selection Picker Family — Internal Visual Review V1

## Status and authority

- Owners: `ErpItemPicker`, `ErpIconPicker`, and `ErpColorPicker`.
- Design authority: original Honesty ERP candidates. No component-specific
  binding external reference is recorded for these owners.
- Technical status: evidence captured; canonical verification is recorded in
  the repository continuity documents for the closing commit.
- Internal visual status: review completed for the captured states below.
- Product Owner visual status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Reproduction

With the Design Lab running on `http://127.0.0.1:4999`, run:

```powershell
node tools/review/capture-selection-pickers-evidence.mjs
```

The script drives the real dedicated routes and their single primary live
targets. It opens the owned picker, records containment and scroll ownership,
commits a new value, verifies visible output evidence, and captures both full
viewport and surface crops.

## Captured cases

| Owner / mode | Desktop | Narrow | Initial value | Committed value | Inventory |
|---|---|---|---|---|---:|
| ItemPicker | 1440x900, Light, RTL | 390x844, Dark, LTR | `inventory-main` | `inventory-alex` | 3 Arabic ERP records |
| IconPicker | 1440x900, Light, RTL | 390x844, Dark, LTR | `search` | `wallet` | 80 semantic icons |
| ColorPicker system | 1440x900, Light, RTL | 390x844, Dark, LTR | `primary-500` | `accent-500` | 88 system colors |
| ColorPicker free | 1440x900, Light, RTL | 390x844, Dark, LTR | `#2F6BFF` | `#FF6B2F` | native color editor |

## Runtime measurements

- Assertions: **104 / 104 passed**.
- Primary live target: exactly one in every case.
- Live API controls: ItemPicker 27, IconPicker 24, ColorPicker 25.
- Desktop surfaces:
  - ItemPicker: 576 x 450.39 px.
  - IconPicker: 768 x 624.39 px.
  - ColorPicker system: 576 x 577.09 px.
  - ColorPicker free: 576 x 301.39 px.
- Narrow surfaces: 374 px wide with 8 px physical viewport margins.
- Outer surface scroll: hidden with equal client and scroll heights in all
  cases; the owned body is the only available overflow region.
- Page horizontal overflow: 0 px in all cases.
- Broken images: 0.
- Browser console errors and warnings: 0.

The complete measurements and assertion records are in
`runtime-measurements.json`.

## Visual inspection record

The saved full viewports and surface crops were inspected after capture. The
inspection covered Arabic item labels and descriptions, disabled item state,
semantic icon grid alignment, selected states, system-color grid, free-color
editor, action layout, Light/Dark contrast, RTL/LTR direction, and narrow
viewport containment. No confirmed production visual defect was found in the
captured scope. This statement is internal evidence only and is not Product
Owner acceptance.
