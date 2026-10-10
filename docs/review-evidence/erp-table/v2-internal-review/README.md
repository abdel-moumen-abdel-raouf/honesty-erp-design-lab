# ErpTable full-reference internal visual review

Captured on 2026-10-10 from the binding `ERP-TABLE.html` file, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`,
served from an isolated temporary directory at
`http://127.0.0.1:8766/ERP-TABLE.html`. The implementation was captured from
`http://127.0.0.1:4999/components/table` with the on-demand complete reference
experience open. Reproduce with `node tools/review/capture-table-evidence.mjs`
while both local servers are running.

## Source and implementation evidence

Each 1440 px specimen has a full-viewport PNG and a readable `-crop.png` pair:

| Reference specimen | Implementation specimen | Reference root | Implementation root | Maximum layout delta |
|---|---|---:|---:|---:|
| `reference-full-1440-light-rtl` | `implementation-full-featured-1440-light-rtl` | 746.5 px | 746 px | 0.5 px |
| `reference-fixed-1440-light-rtl` | `implementation-fixed-height-1440-light-rtl` | 493 px | 493 px | 0.5 px |
| `reference-compact-1440-light-rtl` | `implementation-compact-1440-light-rtl` | 357 px | 357 px | 0 px |
| `reference-click-1440-light-rtl` | `implementation-clickable-1440-light-rtl` | 476 px | 476 px | 0 px |
| `reference-vertical-1440-light-rtl` | `implementation-vertical-1440-light-rtl` | 1086 px | 1086 px | 0 px |
| `reference-headers-1440-light-rtl` | `implementation-header-types-1440-light-rtl` | 535.5 px | 535.5 px | 0 px |

The full experience resolves to toolbar `56`, table viewport `633.5 / 633`,
header `34.5 / 34`, rich rows `59 / 59`, footer `55 / 55`, checkbox `16 / 16`,
avatar `32 / 32`, badge `22 / 22`, and icon action `28 / 28` CSS pixels.
The fixed internal viewport is `380 / 380`. The vertical record is `256 / 256`
and the header-types specimen is `37.5 / 37.5` for the header and `47 / 47`
for each row.

The 390 px Dark/RTL comparison is stored as
`reference-full-390-dark-rtl*.png` and
`implementation-full-390-dark-rtl*.png`. Root, viewport and header deltas are
0.5 px; toolbar, rows and footer are equal. The implementation has zero page
horizontal overflow and keeps the 1194 px table inside its internal scroll
owner. The reference document reports 231 px page overflow from its surrounding
demo/document chrome; this is not reproduced in the ERP application.

`implementation-full-state-1280-dark-ltr*.png` records two selected rows and
the real 240 px `ErpColumnChooser` surface open. `implementation-live-320-light-ltr*.png`
records the corrected Arabic live workbench with five records, seven named
columns, selection, sort, activation and footer data.

## Visual inspection

The reference and implementation crops were inspected directly after capture.
The implementation retains the reference layer order, frame, toolbar/search/
chooser relationship, table header and separator rhythm, stripes, selection,
rich identity cells, status tags, action sizing, internal scrolling, footer and
pagination. The Arabic content and 3D system avatars are intentional review-data
and system-asset substitutions. Honesty semantic colors and system font families
remain the only visual substitutions.

The integrated Design Lab workspace is narrower than the reference demo content
at the same 1440 px browser viewport because the real Sidebar and Quick Actions
rail remain present. Both table frames use `inline-size: 100%`; the Table owns
horizontal overflow and the page does not overflow. No content is concealed by
CSS clipping to mask a layout defect.

All implementation captures contain exactly one primary showcase target, zero
broken images, zero page overflow and zero browser errors/warnings. The binding
reference emits one reference-only missing-favicon 404 on its first capture;
its component content and assets are intact.

## Permitted differences

- Honesty ERP semantic colors instead of the reference palette.
- Honesty ERP font families and Arabic ERP review content.
- Invisible accessibility semantics and reduced-motion behavior.
- ERP ownership underneath the same visible experience.

Status: `TECHNICAL_VERIFIED` candidate evidence and
`INTERNAL_VISUAL_REVIEW_COMPLETED`. `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
