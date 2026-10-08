# ErpUserMenu S1 runtime evidence

Evidence date: 2026-10-08. This directory records implementation runtime
evidence for the Product Owner review candidate. It does not record or imply
Product Owner visual acceptance.

## Captures

| File | Viewport / mode | State |
|---|---|---|
| `implementation-light-rtl-desktop.png` | 1440 x 900, Light, RTL | preserved pre-correction open baseline that exposed the arrow defect |
| `implementation-light-rtl-390.png` | 390 x 844, Light, RTL | preserved pre-correction narrow baseline; reference narrow arrow rule active |
| `implementation-dark-ltr-desktop.png` | desktop review viewport, Dark, LTR | closed trigger and workbench direction evidence |
| `implementation-dark-rtl-desktop-open-down.png` | 1440 x 900, Dark, RTL | open below a target positioned near the review header |
| `implementation-dark-ltr-desktop-open-down.png` | 1440 x 900, Dark, LTR | open below a target positioned near the review header |
| `implementation-dark-rtl-390-open-down.png` | 390 x 844, Dark, RTL | open below; reference narrow arrow rule active |
| `implementation-dark-ltr-390-open-down.png` | 390 x 844, Dark, LTR | open below; reference narrow arrow rule active |

The original three files are preserved. The formerly closed Dark/LTR capture
remains described as closed and is not presented as open-state evidence. The
four added captures provide the requested open Dark/RTL and Dark/LTR evidence
at both comparable viewport sizes.

## Computed measurements

| Evidence | Trigger | Popup | Placement / containment |
|---|---:|---:|---|
| 1440 x 900 Light RTL | 134.375 x 40 px | 360 x 462 px | logical end; x 1072; horizontal overflow 0 px |
| 390 x 844 Light RTL | 40 x 40 px | 374 x 462 px | 8 px viewport inset; horizontal overflow 0 px |
| 849 x 912 Light LTR | 134.375 x 40 px | 360 x 462 px | trigger right and popup right both 793 px; horizontal overflow 0 px |
| 390 x 844 reduced motion RTL | 40 x 40 px | 374 x 462 px | x 8; horizontal overflow 0 px |
| 1440 x 900 Dark RTL, below | 134.375 x 40 px | 360 x 462 px | arrow delta -0.0005 px; surface overflow 0 px |
| 1440 x 900 Dark LTR, below | 134.375 x 40 px | 360 x 462 px | arrow delta -0.0005 px; surface overflow 0 px |
| 390 x 844 Dark RTL, below | 40 x 40 px | 374 x 462 px | arrow hidden by reference narrow rule; 8 px inset; overflow 0 px |
| 390 x 844 Dark LTR, below | 40 x 40 px | 374 x 462 px | arrow hidden by reference narrow rule; 8 px inset; overflow 0 px |

## Arrow finding and closure

The committed Light/RTL desktop capture exposed a verified geometry defect.
Before correction, the trigger center was `725.8125 px` and the arrow center was
`488.5 px`, producing a `-237.3125 px` error because the surface was viewport
clamped while the arrow remained fixed at the logical edge.

After correction, the desktop RTL above-placement measurement at 1440 x 900
was:

- trigger center: `1308.8125 px`;
- arrow center: `1308.812 px`;
- absolute delta: `0.0005 px`;
- popup: `360 x 462 px`;
- horizontal overflow: `0 px`.

The downward Dark desktop captures in both directions reproduce the same
`0.0005 px` maximum rounding delta. A separate runtime matrix at 800 x 700
tests both physical horizontal edges, both directions, and both `top`/`bottom`
placements. All eight surfaces remain contained; four cases have `0 px` delta
and four have `-0.0005 px` rounding delta. The complete machine-readable record
is `runtime-measurements.json`.

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
- The workbench retains exactly one primary `data-showcase-target` in every
  measured case.
- The reference specimen uses the approved local
  `/assets/honesty-erp-avatars/users/female/avatar-21.png` asset; its measured
  natural width is 229 px and no image was broken.
- Headless Chrome runtime diagnostics at 390 x 844 reported zero console
  errors, zero console warnings, zero runtime exceptions, zero log errors, and
  zero log warnings.

## Reference evidence boundary

The binding Skodash HTML and its CSS/JavaScript dependencies were live and
source-inspected. Their verified selectors, source hashes, measurements, and
the vendor-runtime evidence boundary are recorded in
`src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md`. Bootstrap and
vendor scripts are evidence only and are not project dependencies.
