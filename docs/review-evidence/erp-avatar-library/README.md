# Honesty ERP 3D avatar library runtime evidence

Evidence date: 2026-10-08. This directory records implementation evidence for
the Product Owner review candidate. It does not record or imply Product Owner
visual acceptance.

## Asset authority and integrity

- Product Owner source: `C:\Users\Misrtech\Downloads\3d-avatars\` (import-time
  provenance only; production does not depend on this path).
- Canonical library SHA-256:
  `39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.
- 116 unique PNGs: 60 male and 56 female.
- Every source number from 1 through 116 is represented exactly once.
- Every file is a decoded 512 x 512 RGBA PNG with a transparent pixel, valid
  PNG chunk CRCs, a unique SHA-256, and a manifest-recorded byte size.
- Aggregate checked-in size is 29,456,177 bytes: 13,597,548 male and
  15,858,629 female.
- No crop, recolor, mirror, optimization, or other pixel transformation was
  applied. Imported bytes equal the Product Owner source bytes.

The complete per-file checksums, dimensions, byte sizes, source numbers, and
the 40-entry compatibility crosswalk are in
`public/assets/honesty-erp-avatars/users/manifest.json`.

## Browser evidence

The reproducible measurements are in `runtime-measurements.json`; captures are
produced by `tools/review/capture-avatar-library.mjs`. Every case retains one
primary `data-showcase-target`, reports zero page horizontal overflow, zero
broken loaded images, and zero console diagnostics.

| Capture | Runtime condition | Measured evidence |
|---|---|---|
| `picker-light-rtl-1440.png` | 1440 x 900, Light, RTL, male, circle/md | 60/60 loaded lazily; 5 columns; 12 px gap; 520 px picker; selection and confirm event exercised |
| `picker-dark-ltr-1440.png` | 1440 x 900, Dark, LTR, female, rounded/lg | 56/56 loaded lazily; 5 columns; 12 px gap; 520 px picker; selection and confirm event exercised |
| `picker-light-rtl-768.png` | 768 x 900, Light, RTL, male, square/xl | 60/60 loaded lazily; 5 columns; 68 px Avatar; zero overflow |
| `picker-dark-rtl-390.png` | 390 x 844, Dark, RTL, female, circle/2xl | 56/56 loaded lazily; 2 columns; 8 px gap; 72 px responsive Avatar; zero overflow |
| `picker-light-ltr-320.png` | 320 x 844, Light, LTR, male, square/5xl | 60/60 loaded lazily; 1 column; 8 px gap; 144 px responsive Avatar; zero overflow |
| `avatar-circle-online-light-rtl.png` | 768 x 900, Light, RTL, circle/2xl, Online | new source 115; 88 px host; 86 px image; 22 px presence indicator |
| `avatar-rounded-away-dark-ltr.png` | 390 x 844, Dark, LTR, rounded/4xl, Away | new source 116; 112 px host; 110 px image; 28 px presence indicator |
| `avatar-square-busy-light-rtl.png` | 320 x 844, Light, RTL, square/5xl, Busy | new source 102; 144 px host; 142 px image; 36 px presence indicator |

Both gender tabs expose the canonical counts (`ذكر 60`, `أنثى 56`). The
runtime run scrolled through every image in the active collection before
checking load completion, then reset the grid and exercised staged selection,
preview, and confirm on the visible first tile.

## Compatibility

The former `avatar-01` through `avatar-40` IDs and URLs remain stable. IDs
`avatar-01..20` remain male and map to source 1..20; IDs `avatar-21..40`
remain female and map to source 26..45. Therefore an existing `avatar-21`
selection remains female and retains its published URL. Remaining entries use
source-traceable IDs such as `avatar-male-071` and `avatar-female-116`.

Product Owner runtime/visual acceptance remains pending.
