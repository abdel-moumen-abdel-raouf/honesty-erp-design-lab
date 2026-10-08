# ErpUserMenu S1 runtime evidence

Evidence date: 2026-10-08. This directory records implementation runtime
evidence for the Product Owner review candidate. It does not record or imply
Product Owner visual acceptance.

## Captures

| File | Viewport / mode | State |
|---|---|---|
| `implementation-light-rtl-desktop.png` | 1440 x 900, Light, RTL | open |
| `implementation-light-rtl-390.png` | 390 x 844, Light, RTL | open |
| `implementation-dark-ltr-desktop.png` | desktop review viewport, Dark, LTR | closed trigger and workbench direction evidence |

The live Dark popup and LTR popup were also inspected interactively. The third
capture is intentionally described as closed; it is not presented as open-state
evidence.

## Computed measurements

| Evidence | Trigger | Popup | Placement / containment |
|---|---:|---:|---|
| 1440 x 900 Light RTL | 134.375 x 40 px | 360 x 462 px | logical end; x 1072; horizontal overflow 0 px |
| 390 x 844 Light RTL | 40 x 40 px | 374 x 462 px | 8 px viewport inset; horizontal overflow 0 px |
| 849 x 912 Light LTR | 134.375 x 40 px | 360 x 462 px | trigger right and popup right both 793 px; horizontal overflow 0 px |
| 390 x 844 reduced motion RTL | 40 x 40 px | 374 x 462 px | x 8; horizontal overflow 0 px |

Additional computed values verified in the rendered implementation:

- Trigger avatar: 40 x 40 px.
- Identity avatar: 60 x 60 px.
- Popup padding: 8 px.
- Popup radius: 10 px.
- Action row: 344 x 56 px at desktop popup width.
- Normal motion: 600 ms, `cubic-bezier(0.25, 0.8, 0.25, 1)`.
- Reduced motion: media query matched; `animation-name: none` and duration
  `0s`; popup remained open and functional.

## Interaction and diagnostics

- `ArrowDown` opened the menu and focused the first enabled action.
- Further `ArrowDown` moved focus to the next enabled action.
- `Escape` closed the popup and restored focus to the trigger.
- Outside pointer interaction dismissed the popup.
- Action activation remained visible in the workbench event log alongside the
  controlled `openChange` result.
- Light/Dark and RTL/LTR review controls were exercised.
- Headless Chrome runtime diagnostics at 390 x 844 reported zero console
  errors, zero console warnings, zero runtime exceptions, zero log errors, and
  zero log warnings.

## Reference evidence boundary

The binding Skodash HTML and its CSS/JavaScript dependencies were live and
source-inspected. Their verified selectors, source hashes, measurements, and
the vendor-runtime evidence boundary are recorded in
`src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md`. Bootstrap and
vendor scripts are evidence only and are not project dependencies.
