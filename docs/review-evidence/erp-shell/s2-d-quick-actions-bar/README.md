# ErpQuickActionsBar S2-D browser evidence

Captured from `/components/quick-actions-bar` on 2026-10-09 with the shared
Shell evidence runner and Chrome DevTools Protocol. Gxon remained unavailable,
so these captures document the Product Owner-authorized Honesty ERP technical
candidate and do not claim recovered Gxon measurements or visual parity.

| Capture | Viewport | Theme | Direction | State | Flow | Actions |
|---|---:|---|---|---|---|---:|
| `quick-actions-1440-light-rtl-default.png` | 1440 × 900 | Light | RTL | Default | Vertical | 4 |
| `quick-actions-1280-dark-ltr-default.png` | 1280 × 900 | Dark | LTR | Default | Vertical | 4 |
| `quick-actions-1024-light-rtl-dense.png` | 1024 × 768 | Light | RTL | Dense | Vertical | 6 |
| `quick-actions-768-dark-rtl-default.png` | 768 × 900 | Dark | RTL | Default | Vertical | 4 |
| `quick-actions-390-light-rtl-dense.png` | 390 × 844 | Light | RTL | Dense | Horizontal | 6 |
| `quick-actions-320-dark-ltr-default.png` | 320 × 568 | Dark | LTR | Default | Horizontal | 4 |

`runtime-measurements.json` records boxes, computed flow, action/group/disabled
counts, internal scroll extent, page overflow, broken images and diagnostics.
Every condition records zero page overflow, broken images, errors and warnings.
The narrow bar owns intentional internal horizontal scrolling (112 px at 390
dense; 90 px at 320 default), keeping all actions reachable without widening
the page. Product Owner visual review remains pending.
