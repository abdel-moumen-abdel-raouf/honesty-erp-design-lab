# Page Composition V1 — Internal Browser Review

## Authority and status

- Owners: `ErpPage`, `ErpPageHeader`, and `ErpPageShell`.
- Authority: the accelerated Shell/Page no-external-reference waiver recorded in
  `src/app/controls/SHELL_BATCH_V1.md`.
- Classification: original Honesty ERP composition candidates. No external
  exact-reference geometry is claimed.
- Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, and
  `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Reviewed behavior

- `ErpPage`: all `boxed | fluid | full` width contracts and
  `document | page | free` scroll contracts remain live API controls on one
  target. The specimen uses real Arabic ERP content rather than an empty
  projection.
- `ErpPageHeader`: breadcrumbs, title, subtitle, meta, secondary action, and
  primary action are projected through their owned regions. Both actions write
  live event evidence.
- `ErpPageShell`: header, main, contextual side, and footer regions are all
  visible. The desktop two-column composition becomes one column through the
  Foundation Query API on the narrow review viewport.

## Reproduction

1. Run the Design Lab at `http://127.0.0.1:5003`.
2. Run:

   `$env:HONESTY_REVIEW_URL='http://127.0.0.1:5003'; node tools/review/capture-page-composition-evidence.mjs`

3. The run covers six scenarios across 1440×900 and 390×844, Light/Dark, and
   RTL/LTR.

## Result

- Assertions: 30/30 passed.
- The `ErpPage` mode assertion operates the rendered `ErpSelect` controls and
  requires the live target to equal the requested width and scroll modes; a
  non-null default value is not accepted as control evidence.
- One primary `data-showcase-target` per route.
- Console errors/warnings: 0.
- Page horizontal overflow: 0 px.
- Target horizontal overflow: 0 px.
- Detected clipped `ErpText` nodes: 0.
- The `PageHeader` showcase projection defect was corrected: the primary action
  now uses `erpPageHeaderPrimary`, and the secondary action uses
  `erpPageHeaderSecondary`.

`runtime-measurements.json` contains the measured boxes, modes, projection
regions, responsive grid values, event evidence, overflow, direction, theme,
and diagnostic results. Full-viewport and target crops are stored beside this
file.
