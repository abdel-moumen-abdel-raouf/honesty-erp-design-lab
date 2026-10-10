# ErpButton and ErpIconButton internal visual review

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Authority and limits

The accessible Skodash RTL button page is fallback presentation evidence, not
a component-specific exact Honesty ERP contract:

- URL: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-buttons.html`
- inspected at 1440 x 900 in RTL;
- the measured primary reference button is 153.109 x 38 px with 6 x 48 px
  padding, 16 px type, 24 px line height, 6 px radius and a 1 px border;
- the reference also exposes basic, outline, rounded, square, icon, group and
  split/dropdown presentations;
- Honesty ERP keeps its existing system colors, typography and established
  Button component geometry. No Product Owner exact-reference claim is made.

The captured reference source list and complete computed measurements live in
`runtime-measurements.json`. Vendor Bootstrap, jQuery, icons and runtime code
were studied only and were not added to the application.

## Confirmed correction

Browser inspection found that the native IconButton surface was 40 x 40 px
while the `erp-icon-button` host occupied only 40 x 21 px. The host now owns an
explicit inline-flex, fit-content layout, and the configured large review case
records matching 48 x 48 px host and native-button boxes. This removes the
layout-occupancy mismatch without changing the public API or shared Button
visual defaults.

The generated IconButton/Fab workbench Tooltip now consumes the same live
`label` value as the target control. Changing the accessible action label
therefore changes both the native accessible name and its visible Tooltip
evidence on the same primary target.

## Runtime scenarios

| Evidence | Viewport | Theme | Direction | Live state |
|---|---:|---|---|---|
| `button-1440-light-rtl-configured.png` | 1440 x 900 | Light | RTL | outline, danger, large, pill, trailing icon |
| `button-390-dark-ltr-configured.png` | 390 x 844 | Dark | LTR | same live state, narrow containment |
| `icon-button-1440-light-rtl-configured.png` | 1440 x 900 | Light | RTL | solid, primary, large, pill |
| `icon-button-390-dark-ltr-configured.png` | 390 x 844 | Dark | LTR | same live state, narrow containment |
| `reference-skodash-buttons-1440-rtl.png` | 1440 x 900 | reference | RTL | basic/outline/rounded reference sections |

All five screenshots were inspected directly. The implementation captures
retain one primary target, real API controls and pressed-output evidence. The
36 runtime assertions pass with zero horizontal overflow and zero browser
errors or warnings. The narrow captures deliberately include the configured
live target together with the first controls so the applied state remains
reviewable.

## Reproduction

With the Design Lab running at `http://127.0.0.1:4999`:

```powershell
node tools/review/capture-button-family-evidence.mjs
```

The script loads the live external reference, applies values through the
actual workbench controls, activates and focuses each target, captures the
screenshots, and rewrites `runtime-measurements.json`.

