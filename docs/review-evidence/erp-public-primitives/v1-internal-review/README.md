# Public Icon and Text Primitives V1 Internal Review

## Status

- Technical status: `TECHNICAL_VERIFIED`.
- Internal visual status: `INTERNAL_VISUAL_REVIEW_COMPLETED`.
- Product Owner visual status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
- Review date: 2026-10-10.

No binding component-specific external reference is recorded for `ErpIcon` or
`ErpText`. The reviewed result is therefore an explicitly labeled original
Honesty ERP candidate. It does not record Product Owner visual acceptance.

## Reviewed contracts

- `ErpIcon`: all seven public inputs remain available on one live target. The
  80-name semantic registry remains the only icon source. The alternate capture
  proves a labelled, non-decorative, filled, warning-tone `5xl` icon.
- `ErpText`: all 23 public inputs remain available on one live target. The
  authored bilingual ERP sentence is deliberately long enough to expose wrap,
  overflow, line-clamp, direction, typography, and native semantic changes.
- Production APIs and defaults are unchanged. Only generated Design-Lab
  presentation/evidence was corrected.

## Findings and corrections

1. The Icon target rendered correctly but its small default glyph had no clear
   review placement inside the large preview. Its generated showcase now
   centers that same target without changing Icon geometry.
2. The Text target used a very short phrase, so multiple public inputs had no
   meaningful visible evidence. It now uses bounded bilingual ERP content while
   retaining the same target and public contract.

## Reproduction

With the Design Lab running at `http://127.0.0.1:4999`:

```text
node tools/review/capture-public-primitives-evidence.mjs
```

The script captures default desktop Light/RTL and alternate narrow Dark/LTR
states for both owners. `runtime-measurements.json` records target count,
control count, geometry, semantic attributes, browser diagnostics, broken
images, and page overflow.

## Evidence index

- `runtime-measurements.json` — 26/26 passing assertions.
- `icon-*-full.png` / `icon-*-target.png` — viewport and readable Icon crops.
- `text-*-full.png` / `text-*-target.png` — viewport and readable Text crops.

The browser audit reports zero horizontal overflow, broken images, console
errors, and console warnings. Focused verification passes 3/3 files and 53/53
tests. Canonical verification passes 128/128 files and 821/821 tests, both
typechecks, all lint/governance, and the zero-warning 418.32 kB / 92.88 kB
production build.
