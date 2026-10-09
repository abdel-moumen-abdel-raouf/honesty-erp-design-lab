# ErpTopbar S2-B browser evidence

Captured from the normal Angular document at `/components/topbar` on
2026-10-09 with `tools/review/capture-erp-shell-evidence.mjs` and Chrome
DevTools Protocol. The evidence does not use an iframe or local theme owner.

## Conditions

| Capture | Viewport | Theme | Direction |
|---|---:|---|---|
| `topbar-1440-light-rtl.png` | 1440 × 900 | Light | RTL |
| `topbar-1280-dark-ltr.png` | 1280 × 900 | Dark | LTR |
| `topbar-1024-light-rtl.png` | 1024 × 768 | Light | RTL |
| `topbar-768-dark-rtl.png` | 768 × 900 | Dark | RTL |
| `topbar-390-light-rtl.png` | 390 × 844 | Light | RTL |
| `topbar-320-dark-ltr.png` | 320 × 568 | Dark | LTR |

`runtime-measurements.json` records the component, header and region boxes,
page overflow, loaded child owners, broken-image count and browser diagnostics.
All six captures contain one BranchSelector, GlobalSearch, NotificationBell
and UserMenu. Page horizontal overflow, broken images and captured browser
errors/warnings are zero. The notification badge intentionally paints up to
5 px outside its 40 px action anchor while remaining inside the Topbar and the
viewport.

The desktop header renders at 68.296875 px because the reference 60 px minimum
contains the current child owners' intrinsic dimensions. At 768 px the
Foundation Query layout wraps search into its own row (166.59375 px total
header height); at 390 and 320 px the same bounded wrapping produces 277.6875
and 333.6875 px respectively without page overflow.

This evidence establishes technical behavior only. Product Owner visual review
remains pending.
