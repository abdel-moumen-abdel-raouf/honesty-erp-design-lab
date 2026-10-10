# ErpSelect V3 internal visual review

## Authority and capture conditions

- Binding source: `C:\Users\Misrtech\Downloads\ERP-SELECT.html`.
- Verified SHA-256:
  `EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`.
- Reference served unchanged from a temporary single-file HTTP directory at
  `http://127.0.0.1:8766/ERP-SELECT.html`.
- Implementation served from the Angular development build at
  `http://127.0.0.1:4999/components/select`.
- Reproduce with `node tools/review/capture-select-evidence.mjs` while both
  servers are available.

## Evidence index

| Evidence | Viewport | Theme / direction | State |
| --- | --- | --- | --- |
| `reference-1440-light-ltr-open.png` | 1440 x 900 | Light / LTR | Reference first Select open |
| `reference-390-dark-rtl-open.png` | 390 x 844 | Dark / RTL | Reference first Select open |
| `implementation-1440-light-ltr-open.png` | 1440 x 900 | Light / LTR | Exact-reference 150 px specimen open |
| `implementation-1280-dark-rtl-open.png` | 1280 x 900 | Dark / RTL | Exact-reference 150 px specimen open |
| `implementation-390-dark-rtl-live-open.png` | 390 x 844 | Dark / RTL | Primary live target open |
| `implementation-320-light-ltr-live-open.png` | 320 x 568 | Light / LTR | Primary live target open above its trigger |
| `runtime-measurements.json` | all listed | all listed | Reproducible geometry and diagnostics |

## Confirmed findings and corrections

1. The live medium control inherited `14px` from the internal trigger instead
   of the binding `13px` reference value. Select now owns the reference font
   size on the visible control and passes it through the semantic trigger.
2. The popup positioning controller measured the entrance `scale(.97)` visual
   box. This produced a `6.75px` offset at 451 px and a `14.85px` offset at
   990 px. Select now opts into an untransformed layout-box measurement; the
   final control/popup inline-start delta is `0px`.
3. The `300px` limit was applied to the whole popup instead of the options
   list. Viewport containment now remains on the popup while the `300px`
   reference limit and narrow `52dvh` override belong to the listbox.
4. Select now permits only the binding top/bottom placements. The constrained
   320 x 568 capture initially exposed a 19.67 px trigger overlap after the
   popup was clamped to the viewport. Select now measures the available space
   above and below before placement, bounds the popup, and keeps scrolling on
   the options list. The recapture reports a 0.33 px gap delta (within the
   0.5 px layout tolerance) with no trigger overlap.
5. The primary workbench target previously began with an empty options array.
   It now uses three searchable Arabic ERP records, including image, metadata,
   grouping and disabled evidence, without adding a second primary target.

## Measured parity

The 1440 reference and implementation both report a 38 px control, 13 px type,
12 px inline padding, 5 px block padding, 8 px control radius, 8 px anchor gap,
12 px popup radius, 300 px list maximum, list-owned vertical scrolling, equal
control/popup width and `0px` alignment delta. The reference uses its own font
line box (`18.85px`) while Honesty ERP uses its authorized system font line box
(`19.5px`).

The reference document itself reports 224 px page-level horizontal overflow at
390 px because its specimen grid does not collapse fully. The implementation
has 0 px page overflow at both 390 px and 320 px. The reference-only 404 in the
desktop diagnostic is the absent `favicon.ico`; implementation diagnostics are
empty in every capture.

## Status

- `TECHNICAL_VERIFIED`: canonical verification passes 128/128 test files and
  816/816 tests, both typechecks, all governance, and the zero-warning
  418.32 kB / 92.88 kB production build.
- `INTERNAL_VISUAL_REVIEW_COMPLETED`: direct rendered comparison completed.
- `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`: no Product Owner acceptance is
  inferred from these measurements or screenshots.
