# Structural Primitives V1 Internal Review

## Status

- Technical status: `TECHNICAL_VERIFIED`.
- Internal visual status: `INTERNAL_VISUAL_REVIEW_COMPLETED`.
- Product Owner visual status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
- Review date: 2026-10-10.

No binding component-specific external reference is recorded for these owners.
The current Product Owner authorization therefore permits an explicitly labeled
original Honesty ERP candidate. This package reviews the existing production
contracts; it does not record Product Owner visual acceptance.

## Reviewed owners

| Owner | Route | Live controls | Default projected children | Alternate evidence |
|---|---|---:|---:|---|
| `ErpContainer` | `/components/container` | 2 | 1 visible surface | narrow width, no gutter |
| `ErpDivider` | `/components/divider` | 4 | native separator owned internally | vertical, strong, dashed, emphasis |
| `ErpGrid` | `/components/grid` | 3 | 3 visible surfaces | three columns, xs gap, fixed |
| `ErpInline` | `/components/inline` | 4 | 3 visible surfaces | tight, end, between, wrap |
| `ErpSection` | `/components/section` | 1 | 3 visible surfaces | large gap |
| `ErpStack` | `/components/stack` | 3 | 3 visible surfaces | loose, center, center |
| `ErpSurface` | `/components/surface` | 5 | 1 visible text child | inverse, strong, raised, overlay, loose |

Every page retains exactly one primary `data-showcase-target`. The live controls
apply to that same target. The evidence script asserts the target count, control
count, visible output, horizontal overflow, broken images, browser diagnostics,
vertical Divider extent, and inverse Surface text contrast.

## Findings and corrections

1. Container's original projected text did not expose the width and gutter
   boundary. The showcase now projects one visible `ErpSurface` without changing
   the production Container API.
2. Section originally projected one child, so its public gap input had no visible
   effect. The showcase now projects three visible `ErpSurface` children.
3. A vertical Divider could collapse to the content's block size in the review
   target. The Design-Lab-only target supplies a bounded 8 rem block extent.
4. The inverse Surface alternate case exposed insufficient projected-text
   contrast because the projected `ErpText` retained its explicit primary tone.
   The showcase now maps that projected text to the existing inverse text tone;
   no production Surface or Text default changed.

## Reproduction

With the Design Lab running at `http://127.0.0.1:4999`:

```text
node tools/review/capture-structural-primitives-evidence.mjs
```

The script produces 14 scenarios: 1440 × 900 Light/RTL defaults and 390 × 844
Dark/LTR alternate states for all seven owners. `runtime-measurements.json`
contains the exact DOM measurements and assertion results. Each scenario has a
viewport capture and a readable target crop.

## Evidence index

- `runtime-measurements.json` — machine-readable geometry, state, diagnostics,
  and assertion results.
- `*-1440-light-rtl-default-full.png` — desktop viewport captures.
- `*-1440-light-rtl-default-target.png` — desktop target crops.
- `*-390-dark-ltr-alternate-full.png` — narrow alternate-state captures.
- `*-390-dark-ltr-alternate-target.png` — narrow target crops.

The recorded browser audit passes 100/100 assertions and reports zero horizontal
overflow, broken images, console errors, and console warnings. These captures are internal review
evidence only and do not imply Product Owner acceptance.
