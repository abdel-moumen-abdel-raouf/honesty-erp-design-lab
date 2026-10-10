# ErpEmptyState internal visual review evidence

## Authority and limitation

- Binding repository contract:
  `src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`.
- Recorded original reference: `erp-empty-state.html`, SHA-256
  `935D1546F3E5D58F3B280FE30433888670D086F1A53F786A9B096AC3966EE048`.
- The original HTML file was not available in the current Downloads inventory,
  so this review does not claim a fresh source-render overlay or invent missing
  source measurements.
- The supplied Lottie decision and later runtime/size corrections in the
  binding contract remain authoritative.

## Captures

| File | Viewport | Theme | Direction | State |
| --- | --- | --- | --- | --- |
| `empty-state-1440-light-rtl.png` | 1440 x 900 | Light | RTL | Default no-data reference controls and preview |
| `empty-state-1280-dark-ltr-matrix.png` | 1280 x 900 | Dark | LTR | Five-scenario matrix |
| `empty-state-390-dark-rtl-error.png` | 390 x 844 | Dark | RTL | Error scenario interactive preview |
| `empty-state-320-light-ltr-reduced-motion.png` | 320 x 568 | Light | LTR | No-search preview with reduced motion |

`runtime-measurements.json` records the exact viewport, root theme, computed
direction, reduced-motion state, primary target count, six rendered reference
states (one interactive plus five matrix states), illustration boxes, Lottie
SVG availability, overflow, clipping, broken images, and browser diagnostics.

## Reproduction

Run the Design Lab on port 4999, then:

```powershell
$env:EMPTY_STATE_EVIDENCE_URL='http://localhost:4999'
node tools/review/capture-empty-state-evidence.mjs
```

The script uses the installed local Chrome through the DevTools protocol. It
does not add a browser dependency or change production code.

## Status

- `TECHNICAL_VERIFIED` after the focused and canonical gates recorded by the
  implementation checkpoint.
- `INTERNAL_VISUAL_REVIEW_COMPLETED` for the recorded implementation states.
- `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
