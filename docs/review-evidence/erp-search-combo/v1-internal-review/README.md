# SearchBox and ComboBox internal review evidence

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

This evidence covers the existing `ErpSearchBox` and `ErpComboBox` owners. No
component-specific binding external reference is recorded for either owner, so
their current presentations are original Honesty ERP candidates using the
existing Field, Selection, Overlay, semantic color, typography, and Query
contracts.

## Scenarios

- `search-box-1440-light-rtl-*`: one live target, 37 live API controls, the
  Arabic ERP result inventory, the owned anchored dropdown, and a committed
  customer result.
- `search-box-390-dark-ltr-*`: the same interaction at 390 x 844 in Dark/LTR,
  including viewport containment and the one results scroll owner.
- `combo-box-1440-light-rtl-*`: one live target, 26 live API controls, the
  owned selection overlay, three supplier records, and a committed selection.
- `combo-box-390-dark-ltr-*`: the same interaction at 390 x 844 in Dark/LTR,
  including stable post-animation containment and one outer scroll boundary.

For each scenario, `open-full.png` records page context, `open-surface.png`
records a readable popup crop, and `committed-full.png` records the applied CVA
value and event evidence. `runtime-measurements.json` contains the reproducible
geometry and 48 acceptance assertions.

## Finding corrected during review

`ErpGlobalSearch` already preserved consumer-provided result descriptions, but
the shared result renderers did not display or search those descriptions. The
bounded correction adds the optional typed description to
`ErpItemPickerOption`, renders it through `ErpText`, and includes it in filtering
for both the anchored SearchBox list and the shared selection-picker overlay.

## Result

- One primary target per route.
- Meaningful Arabic ERP values are applied through CVA.
- Search result activation and ComboBox staged confirmation update that same
  target and the visible event log.
- Popup and overlay surfaces remain inside both tested viewports after entrance
  motion settles.
- Outer surfaces do not become duplicate vertical scroll owners.
- Horizontal overflow, broken images, console errors, and console warnings are
  zero in the recorded scenarios.

These findings are internal evidence only and do not declare Product Owner
visual acceptance.
