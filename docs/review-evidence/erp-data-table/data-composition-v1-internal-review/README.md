# Data/Table Composition V1 — Internal Review Evidence

## Authority

- `ErpBulkActionBar`, `ErpFilterBar`, `ErpFilterDrawer`, `ErpTableToolbar`, and
  `ErpSmartTable` remain original Honesty ERP candidates under the recorded
  accelerated-wave waiver in `src/app/controls/data-table/DATA_TABLE_BATCH_V1.md`.
- The `table-reference` presentation inside the composed Table experience
  remains governed by
  `src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md`.
- This package is internal visual-review evidence. It is not Product Owner
  visual acceptance.

## Reproduction

With the Design Lab running at `http://127.0.0.1:5001`, run:

```powershell
node tools/review/capture-data-composition-evidence.mjs
```

The script creates a fresh browser profile, visits each dedicated route,
applies the recorded Light/Dark and RTL/LTR conditions, performs a meaningful
interaction, captures full-viewport and readable target crops, and records
console plus layout measurements in `runtime-measurements.json`.

## Captured states

- `bulk-action-bar-*`: two projected actions and controlled action evidence.
- `filter-bar-*`: a projected field, two active criteria, and removal evidence.
- `filter-drawer-open-*`: three real filter definitions in the owned drawer.
- `table-toolbar-*`: search, filter, column chooser, refresh, export, and
  projected primary action slots.
- `smart-table-*`: five-column Arabic data, projected status cells, selection,
  sorting, bulk actions, paging, refresh, and export.

Each owner is captured at 1440×900 Light/RTL and 390×844 Dark/LTR. The report
contains 50/50 passing runtime assertions, one target per route, zero browser
errors or warnings, and zero page or target horizontal overflow.

## Confirmed findings and corrections

1. The earlier generated workbenches rendered empty projection owners. The
   dedicated cases now provide real ERP-owned children and controlled events.
2. The default TableToolbar grid could reduce the search slot to zero width and
   overflow at 390 px. Its default composition now wraps while the exact
   `table-reference` presentation remains separately governed.
3. SmartTable exposed `exportRequested` while its owned toolbar hid the export
   action. The action is now reachable and tested.
4. Default Pagination transferred max-content width to SmartTable at 390 px.
   Its non-reference narrow layout now wraps controls and the page-size row.
5. The standalone Table compressed all columns at 390 px, causing visible text
   collisions. Standalone tables now preserve intrinsic column width and scroll
   inside `ErpTableViewport`; the exact reference presentation is unchanged.

## Status

- `TECHNICAL_VERIFIED`: pending the canonical gate for this checkpoint.
- `INTERNAL_VISUAL_REVIEW_COMPLETED`: the stored captures were inspected after
  the corrections above.
- `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`: unchanged.
