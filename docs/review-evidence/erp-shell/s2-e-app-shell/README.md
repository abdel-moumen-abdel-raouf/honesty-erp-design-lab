# Root-owned ErpAppShell workbench evidence

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

The `/components/app-shell` route does not render a second `ErpAppShell`.
Its dedicated routed page supplies the live control panel and event log while
the one root `#design-lab-app-shell` is the route's sole
`data-showcase-target`. A Design-Lab-only typed Angular state owner carries
the input/model/output evidence between the routed page and the root. It is
activated on route entry and cleared on route destruction; no custom
`window` events or DOM mutation bridge is used.

## Reproduction

1. Run `npm run start`.
2. Set `SHELL_EVIDENCE_URL` to the local Design Lab origin.
3. Run
   `$env:SHELL_EVIDENCE_COMPONENT='app-shell'; node tools/review/capture-erp-shell-evidence.mjs`.
4. Inspect `runtime-measurements.json` and the PNG files in this directory.

## Captured conditions

| Capture | Theme / direction | Root Shell | Workspace content | Quick actions | Footer | Page / Shell horizontal overflow |
|---|---|---:|---:|---|---:|---:|
| `app-shell-1440-light-rtl.png` | Light / RTL | 1440 x 900 px | 1070.69 x 770 px | 99.31 x 263 px, vertical | 1170 x 57 px | 0 / 0 px |
| `app-shell-1280-dark-ltr.png` | Dark / LTR | 1280 x 900 px | 910.69 x 770 px | 99.31 x 263 px, vertical | 1010 x 57 px | 0 / 0 px |
| `app-shell-1024-light-rtl.png` | Light / RTL | 1024 x 768 px | 1024 x 580 px | 1024 x 58 px, horizontal | 1024 x 57 px | 0 / 0 px |
| `app-shell-768-dark-rtl.png` | Dark / RTL | 768 x 900 px | 768 x 557.70 px | 768 x 58 px, horizontal | 768 x 57 px | 0 / 0 px |
| `app-shell-390-light-rtl.png` | Light / RTL | 375 x 2915.73 px | 375 x 2536.73 px | 375 x 58 px, horizontal | 375 x 120 px | 0 / 0 px |
| `app-shell-320-dark-ltr.png` | Dark / LTR | 305 x 3307.59 px | 305 x 2846.30 px | 305 x 58 px, horizontal | 305 x 120 px | 0 / 0 px |
| `app-shell-390-light-rtl-end.png` | Light / RTL, lower regions | 375 x 2915.73 px | 375 x 2536.73 px | 375 x 58 px, horizontal | 375 x 120 px | 0 / 0 px |
| `app-shell-320-dark-ltr-end.png` | Dark / LTR, lower regions | 305 x 3307.59 px | 305 x 2846.30 px | 305 x 58 px, horizontal | 305 x 120 px | 0 / 0 px |

Every condition records the ten required production owners, one RouterOutlet,
one OverlayHost, zero broken images, and zero captured browser error or
warning. Each condition activates a real quick action and Footer action; the
event log records `quickActionActivated: task` and
`footerActionActivated: support`.

Interactive browser verification also changed `contentLabel` on the live
control panel and observed the root `<main>` accessible label update
immediately. It then left the route and returned: the non-AppShell route kept
one root Shell plus its own one target, and the re-entered AppShell workbench
restored `contentLabel` and `sidebarOpen` to their predictable initial values.
The `sidebarOpen` model and Quick Action output were both reflected in the
same routed control/event evidence.

The captures and automated checks are technical/internal-review evidence only.
They do not grant Product Owner visual acceptance.
