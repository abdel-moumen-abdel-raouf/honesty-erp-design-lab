# Root Topbar visual correction V3

This directory records the Product Owner-authorized reconstruction of the real
Design Lab Topbar. The original baseline remains available under
`../autonomous-app-shell-wave/` and `../s2-b-topbar/`; it was not overwritten.

## Source authority

- Skodash RTL tabular shell: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/index.html`.
- Skodash media-object page: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-media-object.html`.
- Previously source-verified evidence remains recorded in
  `src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md` and
  `src/app/controls/topbar/ERP_TOPBAR_REFERENCE_V1.md`.
- Honesty ERP preserves its semantic colors, typography, owners, and the
  Product Owner-mandated rich UserMenu identity. The 72px desktop result is an
  authorized adaptation, not a claimed literal 60px vendor copy.

## Reproduction

Start the application, set `SHELL_EVIDENCE_URL` to its local URL,
`SHELL_EVIDENCE_COMPONENT` to `integrated-app`, and
`SHELL_EVIDENCE_OUTPUT` to this directory, then run
`node tools/review/capture-erp-shell-evidence.mjs`. For the dedicated Topbar
route, use `topbar` and the `standalone` child directory.

## Before / after geometry

| Viewport | Previous root header | Corrected root header | Region overflow | Page overflow |
| --- | ---: | ---: | ---: | ---: |
| 1440x900 | 73px | 72px | 0px | 0px |
| 1280x900 | 73px | 72px | 0px | 0px |
| 1024x768 | 73px | 72px | 0px | 0px |
| 768x900 | 227.3px in the earlier narrow contract | 140px | 0px | 0px |
| 390x844 | 201px | 140px | 0px | 0px |
| 320x568 | 227.3px | 140px | 0px | 0px |

The corrected desktop BranchSelector, SearchBox, and utility actions are 38,
40, and 40px high on a common center line. The full desktop UserMenu remains
72px because its authorized three-line identity and 60px Avatar are preserved.
Below the approved `lg` query boundary, the root-only opt-in compact trigger
keeps the Avatar as the accessible trigger while the complete identity remains
available in its popup. Context and search remain functional in the second
row, and popup-trigger text is ellipsized instead of wrapped.

## Evidence

- `runtime-measurements.json`: ten integrated states plus the 81-route audit.
- `integrated-1440-light-rtl.png`: desktop root composition.
- `integrated-1440-dark-rtl-applications-open.png`: opened applications surface.
- `integrated-1280-dark-ltr-messages-open.png`: opened messages surface.
- `integrated-1024-light-rtl-notifications-open.png`: notification surface.
- `integrated-768-dark-ltr-search-active.png`: tablet header and active search.
- `integrated-390-light-rtl.png` and `integrated-320-dark-ltr.png`: narrow root.
- Narrow opened-surface evidence is included for messages and notifications.
- `standalone/`: equivalent dedicated `/components/topbar` evidence.

All ten integrated states record zero page overflow, region overflow, broken
images, console errors, and console warnings. The route audit records 81/81
routes with one AppShell, RouterOutlet, OverlayHost, and primary target.

Status: `TECHNICAL_VERIFIED` and `INTERNAL_VISUAL_REVIEW_COMPLETED` after the
canonical gate. Product Owner status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
