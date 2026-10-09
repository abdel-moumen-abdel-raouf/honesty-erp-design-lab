# ErpAppFooter S2-C browser evidence

Captured from `/components/app-footer` on 2026-10-09 with the shared Shell
evidence runner and Chrome DevTools Protocol. The implementation is an
explicitly authorized original Honesty ERP candidate; the captures do not
claim unavailable Gxon measurements or visual parity.

## Conditions and results

| Capture | Viewport | Theme | Direction | State | Footer height |
|---|---:|---|---|---|---:|
| `app-footer-1440-light-rtl-default.png` | 1440 × 900 | Light | RTL | Default | 57 px |
| `app-footer-1280-dark-ltr-default.png` | 1280 × 900 | Dark | LTR | Default | 57 px |
| `app-footer-1024-light-rtl-default.png` | 1024 × 768 | Light | RTL | Default | 57 px |
| `app-footer-768-dark-rtl-default.png` | 768 × 900 | Dark | RTL | Default | 57 px |
| `app-footer-390-light-rtl-dense.png` | 390 × 844 | Light | RTL | Six actions, one disabled | 208 px |
| `app-footer-320-dark-ltr-empty.png` | 320 × 568 | Dark | LTR | All optional content absent | No footer landmark |

`runtime-measurements.json` records each box, action count, disabled count,
page overflow, broken images and captured browser diagnostics. All conditions
have zero page horizontal overflow, broken images and browser errors/warnings.
The dense 390 px case contains six actions and one disabled action; the empty
320 px case proves that optional absent content does not emit an empty footer
landmark.

This is technical evidence only. Product Owner visual review remains pending.
