# ErpUserMenu S1 runtime evidence

Evidence date: 2026-10-08. This directory records implementation runtime
evidence for the Product Owner review candidate. It does not record or imply
Product Owner visual acceptance.

## 2026-10-09 final closed-trigger correction

The current closed-trigger evidence is under `final-trigger-v2/`. The Product
Owner superseded the earlier hidden-trigger-badge rule: role and branch now
default visible in the third trigger row, while legacy `secondaryText` is
excluded from the closed trigger and remains available in the popup. The
bounded trigger Avatar is 60 x 60 px, matching the 60 px three-row identity
stack inside a 72 px content-driven capsule.

The saved baseline/corrected measurements and full/cropped PNGs cover
1440/768/390/320 px, Light/Dark, RTL/LTR, open/closed, image/initials/icon
fallbacks, long identities, and independent badge controls. All corrected
conditions record zero page/popup overflow, broken images, or browser
diagnostics. This evidence does not declare visual acceptance.

## S1 final dark contrast and scroll ownership correction

The current authoritative runtime record is
`s1-final-dark-contrast-scroll.json`. It supersedes
`s1-final-popup-geometry.json` only for current foreground, scroll ownership,
and the five captures listed below; the earlier file remains historical
placement evidence.

Browser inspection confirmed both reported defects before the correction. The
Dark surface was `rgb(39, 42, 50)` while its inherited foreground and primary
identity name were `rgb(0, 0, 0)`. Native `[popover]` user-agent styling also
resolved the surface to `overflow-y: auto`, which made the surface a second
vertical scroll owner in addition to the intended actions region.

The corrected surface explicitly consumes the existing
`--honesty-user-menu-fg` Component Token and explicitly neutralizes native
popover scrolling with `overflow: visible`. Only `.user-menu__items` retains
`overflow: auto`. No Light/Dark literal, local theme branch, overlay engine, or
public API was added.

| Current capture | Exact condition | Measured result |
|---|---|---|
| `s1-contrast-light-rtl-desktop-open.png` | 1440 x 900, Light, RTL, local image, Online | surface foreground/background `rgb(24, 26, 32)` / `rgb(255, 255, 255)`; surface scrollTop 0; actions 251/353 px |
| `s1-contrast-dark-rtl-desktop-open.png` | 1440 x 900, Dark, RTL, long Arabic, Offline | name `rgb(248, 249, 251)`; email/secondary `rgb(201, 206, 216)`; surface `overflow-y: visible`; actions 229/353 px |
| `s1-contrast-dark-ltr-desktop-open.png` | 1440 x 900, Dark, LTR, long English, Online | same readable Dark foregrounds; bottom placement; arrow delta 0 px |
| `s1-contrast-dark-rtl-390-open.png` | 390 x 844, Dark, RTL, initials fallback | surface 360 x 360.266 px; actions 223/353 px; zero horizontal overflow |
| `s1-contrast-light-rtl-320x568-open-scroll.png` | 320 x 568, Light, RTL, constrained height, actions scrolled | surface 304 x 431.266 px and scrollTop 0; actions 232/353 px and scrollTop 96; identity top delta 0 px |

The desktop top-placement surface reports `scrollHeight: 398` and
`clientHeight: 388` because its visible arrow pseudo-element extends outside
the surface box. That is not a scroll region: computed `overflow-y` is
`visible`, programmatic surface `scrollTop` remains 0, and the browser reports
no surface scrollbar. The separate page scrollbar belongs to the long Design
Lab document. In the constrained capture its document metrics are
`3108/568 px` at `scrollTop: 728`; the inner popup scrollbar belongs only to
the action list.

All five captures retain one primary target, top/bottom placement only, zero
trigger overlap, zero surface overflow, zero page horizontal overflow, zero
broken images, and zero browser diagnostics. These results are implementation
evidence only and do not declare Product Owner visual acceptance.

## S1 final popup geometry gate

The current authoritative runtime record is
`s1-final-popup-geometry.json`. The older values in
`runtime-measurements.json` are retained only as historical provenance and are
explicitly marked superseded for current geometry. The final gate permits only
`bottom` and `top` placement, measures the real space on both sides of the
trigger before surface layout, keeps the identity region fixed, and gives
vertical scrolling only to the action-list region.

All open captures have zero trigger overlap, zero surface overflow, zero page
horizontal overflow, one primary `data-showcase-target`, no broken images, and
no console warning, console error, or runtime exception. The rendered identity
order in every captured case is name, email, role/branch badges, then the
independent legacy `secondaryText` line.

| Current capture | Exact condition | Measured result |
|---|---|---|
| `s1-final-default-rich-light-rtl-desktop-closed.png` | 1440 x 900, Light, RTL, local image, Online, closed | trigger 360 x 104 px; surface absent |
| `s1-final-default-rich-light-rtl-desktop-open.png` | 1440 x 900, Light, RTL, local image, Online, open | top; surface 360 x 388.359 px; trigger gap 2 px; arrow delta 0 px |
| `s1-final-long-arabic-dark-rtl-desktop-open.png` | 1440 x 900, Dark, RTL, long Arabic, Offline | top; identity 148 px; actions 207/353 px client/scroll |
| `s1-final-long-english-dark-ltr-desktop-open.png` | 1440 x 900, Dark, LTR, long English, Online | bottom; identity 142 px; actions 214/353 px; arrow delta 0 px |
| `s1-final-initials-light-rtl-390-open.png` | 390 x 844, Light, RTL, initials fallback | bottom; surface 360 x 360.266 px; actions scroll |
| `s1-final-icon-dark-ltr-390-open.png` | 390 x 844, Dark, LTR, explicit icon fallback | bottom; viewport-contained; actions scroll |
| `s1-final-long-arabic-light-rtl-320x568-open-scroll.png` | 320 x 568, Light, RTL, constrained height | bottom; trigger 239 x 126 px; identity 166 px remains visible; actions 232/353 px scroll |
| `s1-final-long-english-dark-ltr-320x568-closed.png` | 320 x 568, Dark, LTR, long English, closed | trigger 239 x 125 px; surface absent |
| `s1-final-default-dark-ltr-320x844-open.png` | 320 x 844, Dark, LTR, local image, Online | bottom; surface 304 x 360.266 px; actions scroll |
| `s1-final-mixed-light-rtl-768-open.png` | 768 x 900, Light, RTL, mixed-direction identity | top; surface 360 x 388.359 px; arrow delta 0 px |

An additional live 768 x 900 update changed the complete user value while the
popup remained open. Before and after both resolved to `top`, retained a 2 px
trigger gap, a 388.359 px contained surface, and zero overlap. The five required
viewport sizes are protected by the focused geometry matrix: 320 x 568,
320 x 844, 390 x 844, 768 x 900, and 1440 x 900.

## Identity and responsive refinement evidence

The current bounded pass extends the evidence without reopening another Shell
owner. The browser workbench retained one primary target while its single live
instance was changed among a local-image user, initials fallback, explicit icon
fallback, all four presence states, long Arabic/English/mixed-direction names,
and each of the six visibility inputs.

The new browser captures were reviewed in-session and their reproducible box
measurements are stored in the `identityRefinement` section of
`runtime-measurements.json`. The persisted measurement set covers 320 x 844,
390 x 844, 768 x 900, and 1440 x 900 in Light/Dark and RTL/LTR, including open
and closed states. No new production image asset or vendor asset was added.

Key results:

- trigger padding is 8 px block / 12 px inline with a 12 px identity gap;
- the trigger grows from 103 to 126 px for the measured rich/long identities
  instead of forcing the former 40 px height;
- 320 px trigger width is 239 px and 390 px long-English width is 309 px;
- desktop trigger width is capped at 360 px;
- popup width is 360 px on desktop and viewport minus 8 px per edge on narrow;
- 320/390/768/1440 horizontal overflow is 0 px;
- measured top and bottom desktop arrow deltas remain exactly 0 px after live
  identity changes;
- the identity region remains visible and the action list owns vertical
  scrolling when content height exceeds available space;
- console errors, console warnings, and broken images are zero in the captured
  runtime session.

The post-build 320 x 844 regression check measured the default rich-identity
trigger at 239 x 104 px and the open surface at 304 x 490 px with an 8 px
physical viewport inset and zero horizontal overflow. After Escape, the same
surface measured 0 x 0 px, confirming that the closed native popover does not
remain visually rendered. Console warnings/errors and broken images remained
zero.

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
