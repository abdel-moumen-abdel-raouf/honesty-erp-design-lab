# ColumnChooser + ViewSwitcher V1 internal review evidence

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

This package records the bounded internal review of `ErpColumnChooser` and
`ErpViewSwitcher`. It does not record Product Owner acceptance.

## Authority

- `ErpColumnChooser[presentation="table-reference"]` is governed by
  `src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md` and the
  retained reference captures under `docs/review-evidence/erp-table/v2-internal-review/`.
  The reviewed contract is a 240 px popup, a 340 px maximum block size, 8 px
  padding, reference title/list anatomy, and controlled column visibility.
- The default ColumnChooser presentation remains a compatibility presentation.
- `ErpViewSwitcher` has no component-specific Product Owner exact reference on
  record. Its selected/disabled presentation is an original Honesty ERP
  candidate using the existing ButtonGroup/Button owners.

## Reproduction

With the Design Lab running on port 5001:

```powershell
node tools/review/capture-column-view-evidence.mjs
```

The script opens a fresh local Chrome profile, exercises the same primary live
target at each route, captures PNG evidence, checks runtime geometry and
interactions, and writes `runtime-measurements.json`.

## Captures

| Capture | Viewport | Theme / direction | Evidence |
|---|---:|---|---|
| `column-default-1440-light-rtl.png` | 1440×900 | Light / RTL | Five realistic columns, required column retained, live visibility output applied back to the same target |
| `column-reference-1440-light-rtl.png` | 1440×900 | Light / RTL | Exact Table-reference trigger and open popup |
| `column-reference-390-dark-ltr.png` | 390×844 | Dark / LTR | Open popup and trigger remain visible and viewport-contained |
| `view-table-1440-light-rtl.png` | 1440×900 | Light / RTL | Initial table mode changed live to cards with selected-state evidence |
| `view-cards-390-dark-ltr.png` | 390×844 | Dark / LTR | Initial cards mode changed live to table |
| `view-disabled-390-light-rtl.png` | 390×844 | Light / RTL | Both owned buttons disabled while the selected mode remains exposed |

## Measurements and results

- Table-reference popup: 240×175 px in both recorded states; CSS maximum block
  size 340 px; one `overflow-y:auto` owner; four hideable column checkboxes.
- Reference popup stayed inside 1440×900 and 390×844 viewports with 0 px page
  horizontal overflow.
- Escape closed the popup and returned focus to the `الأعمدة` trigger.
- Default ColumnChooser applied the emitted five-key array back to the live
  `visibleKeys` value; the required `رقم الحساب` option remained disabled.
- ViewSwitcher exposed exactly two buttons. `aria-pressed`, the controlled
  model, and `changed` output moved together. `disabled=true` disabled both
  buttons without discarding the selected mode.
- Console errors, console warnings, and page horizontal overflow: zero in all
  six scenarios.
- Automated evidence assertions: 49 / 49 passed.

The stretched live-preview host widths recorded in the JSON belong to the
Design Lab evidence surface. The popup and button-group geometry remain owned
by their production components inside that surface.
