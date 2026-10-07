# ERP-TABLE runtime comparison evidence

Date: 2026-10-08

Authority: `C:\Users\Misrtech\Downloads\ERP-TABLE.html`

SHA-256: `292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`

The binding reference and `/controls/core-batch` were rendered side by side in
the same browser session. The reference experience was inspected in its six
live configurations. Screenshots were captured during the live run; this file
keeps the deterministic computed measurements and interaction results as the
durable repository evidence.

## Geometry comparison

All values are CSS pixels. The final row in a browser table absorbs one pixel
of border rounding in both the reference and implementation; the complete row
height arrays are therefore recorded rather than rounded descriptions.

| Specimen | Reference | Implementation | Maximum delta |
|---|---|---|---:|
| Full experience | root 723; toolbar 54; viewport 612; header 33; rows 57 × 9 + 56; footer 55 | root 723; toolbar 54; viewport 612; header 33; rows 57 × 9 + 56; footer 55 | 0 px |
| Fixed height | root 491; toolbar 54; viewport 380; header 33; rows 57 × 19 + 56; footer 55 | root 491; toolbar 54; viewport 380; header 33; rows 57 × 19 + 56; footer 55 | 0 px |
| Compact | root 354; viewport 352; header 31; rows 39 × 7 + 38 | root 354; viewport 352; header 31; rows 39 × 7 + 38 | 0 px |
| Clickable | root 473; viewport 416; header 31; rows 47 × 7 + 46; footer 55 | root 473; viewport 416; header 31; rows 47 × 7 + 46; footer 55 | 0 px |
| Vertical | root 1070; viewport 1068; four records at 252 | root 1070; viewport 1068; four records at 252 | 0 px |
| Header types | root 530; viewport 419; toolbar 54; header 34; rows 47 × 7 + 46; footer 55 | root 530; viewport 419; toolbar 54; header 34; rows 47 × 7 + 46; footer 55 | 0 px |

## Primary experience anatomy

| Part | Reference | Implementation | Delta |
|---|---:|---:|---:|
| Frame border / radius | 1 / 12 | 1 / 12 | 0 |
| Toolbar height / padding | 54 / 12 × 16 | 54 / 12 × 16 | 0 |
| Search width / height | 340 / 29 | 340 / 29 | 0 |
| Search padding / radius | 6 12 6 34 / 6 | logical RTL mirror of 6 12 6 34 / 6 | 0 |
| Column trigger height / padding / radius | 29 / 6 × 12 / 6 | 29 / 6 × 12 / 6 | 0 |
| Column popover width / rendered height | 240 / 239 | 240 / 239 | 0 |
| Popover title / item heights | 25 / 32 | 25 / 32 | 0 |
| Selection checkbox | 16 | 16 | 0 |
| Table photo | 32 | 32 | 0 |
| Status tag | 22 | 22 | 0 |
| Cell icon action | 28 | 28 | 0 |
| Footer / page button | 55 / 30 | 55 / 30 | 0 |

The implementation frame fills the Design Lab content container (1201 px in
the measured run); the reference frame fills its own demo container (1270 px).
This is the same `inline-size: 100%` width behavior, not a fixed-width geometry
substitution.

## Runtime behavior evidence

- Search: 10 rows before query, 1 row for `أميرة`, and 10 rows after clearing.
- Column visibility: 8 header cells before hiding `القسم`, 7 while hidden, and
  8 after restoration.
- Selection: the controlled footer changed from one preselected record to two
  selected records after a row checkbox interaction, then returned after
  unchecking.
- Sorting: activating `الراتب` placed the header in `ascending` state and the
  controlled review data was immutably reordered by the consumer.
- Pagination: activating page 2 changed its ERP button to the active solid
  presentation while pages 1 and 3 remained outline.
- Column chooser: the anchored surface opened at 240 × 239, Escape dismissed it,
  and its six 32 px checkbox rows controlled `visibleColumnKeys`.
- Narrow width: at 390 × 900 the page overflow delta was 0; the frame was
  343 px, toolbar 341 × 83, search 325 × 29, and column trigger 85.890625 × 29.
  The 1194 px table remained inside its 341 px internal scroll viewport
  (`overflow-x: scroll`) rather than creating page overflow.
- Dark theme: full root 723, header 33, and row 57 remained invariant after the
  App-owned theme action.
- RTL: the exact primary experience is `dir=rtl`; the same review also retains
  a separate `dir=ltr` compatibility specimen.

## Reference feature boundary

The rendered reference contains toolbar, search, column chooser, table,
selection, sorting, resizing, footer counter, and pagination. It does not
contain FilterBar, FilterDrawer, BulkActionBar, ViewSwitcher, loading, or a
SmartTable orchestration surface. Those absent features were not invented.

This evidence records a technical reference candidate only. Product Owner
visual acceptance remains pending.
