# Foundational text-like fields — internal visual review evidence

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

This evidence covers the existing public owners `ErpTextBox`, `ErpTextAreaBox`,
`ErpPasswordBox`, `ErpNumberBox`, `ErpMoneyBox`, `ErpTelBox`, and `ErpUrlBox`.
No component-specific binding external reference is recorded for these owners,
so this is an original Honesty ERP candidate review. Production component APIs
and visual defaults were not changed; the correction supplies meaningful live
Workbench values and repeatable visual/runtime evidence.

## Reproduction

1. Serve the current application at `http://127.0.0.1:4999`.
2. Run `node tools/review/capture-text-fields-evidence.mjs`.
3. Review `runtime-measurements.json` and the paired `*-full.png` and
   `*-target.png` captures.

The capture matrix contains 14 scenarios: each owner at 1440 x 900 in Light
RTL with its default meaningful ERP value, and at 390 x 844 in Dark LTR with an
alternate value plus `lg`, `rounded`, `floating`, and semantic status controls.

## Recorded results

- One primary `data-showcase-target` in every scenario.
- All expected live API controls present: 31, 30, 30, 30, 35, 29, and 29.
- Every native editor received a meaningful value through the public CVA path.
- Alternate cases emitted visible `valueChange` evidence.
- Actual computed directions were RTL and LTR respectively.
- Horizontal page overflow: 0 px in every scenario.
- Broken images: 0.
- Browser console errors and warnings: 0.
- Runtime assertions: 112/112 passed.

The 390 px full captures deliberately reset the document scroll owner after
Workbench control interaction so both the application chrome and the actual
live target remain reviewable. Cropped target captures preserve a readable
inspection scale for text, actions, helper copy, status border, and spacing.
