# Temporal input family — internal visual review evidence

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

This package covers the existing `ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, and `ErpDateRangeBox` public owners and their shared owned
temporal-picker/Overlay composition. No binding component-specific external
reference is recorded, so the four owners remain explicitly labeled original
Honesty ERP candidates. Production APIs, visual defaults, CVA behavior, Field
ownership, and Overlay ownership were not changed.

## Reproduction

1. Serve the current app at `http://127.0.0.1:4999`.
2. Run `node tools/review/capture-temporal-inputs-evidence.mjs`.
3. Inspect `runtime-measurements.json` and the open/confirmed PNGs.

The eight scenarios cover 1440 x 900 Light RTL and 390 x 844 Dark LTR. Every
scenario opens the owned picker, captures its stable post-animation geometry,
changes a date/time/range through the real picker, confirms it, and records the
result through the public CVA path.

## Recorded results

- One primary target on every route.
- Complete live controls: 30 DateBox, 30 TimeBox, 29 DateTimeBox, and 29
  DateRangeBox.
- Date committed as `2026-10-13`.
- Time committed as `10:45`.
- Date/time committed as `2026-10-13T10:45`.
- Range committed as `2026-10-03` through `2026-10-20`.
- Final stable Overlay surfaces remain within both viewports.
- The Overlay surface remains non-scrolling; the owned frame body is the
  bounded scroll region when content requires it.
- Computed RTL/LTR directions matched every scenario.
- Horizontal page overflow: 0 px.
- Broken images: 0.
- Browser errors and warnings: 0.
- Runtime assertions: 88/88 passed.

An initial audit measured the entering transform before its transition ended
and therefore reported a temporary transformed rectangle outside the narrow
viewport. Waiting for `data-overlay-phase="open"` ruled this out; no production
geometry change was made.
