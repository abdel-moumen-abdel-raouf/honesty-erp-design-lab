# S2-E ErpAppShell integration evidence

Status: `TECHNICAL_VERIFIED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

The evidence was captured from `/components/app-shell` in the normal Angular
document. The primary target composes the real `ErpTopbar`, `ErpSidebar`,
`ErpQuickActionsBar`, and `ErpAppFooter`, plus `ErpBranchSelector`,
`ErpGlobalSearch`, `ErpNotificationBell`, and the unchanged `ErpUserMenu`.

## Reproduction

1. Run `npm run start`.
2. Run:
   `$env:SHELL_EVIDENCE_COMPONENT='app-shell'; node tools/review/capture-erp-shell-evidence.mjs`.
3. Inspect `runtime-measurements.json` and the PNG files in this directory.

## Captured conditions

| Capture | Theme / direction | Shell size | Sidebar nav | Quick actions | Footer | Page / shell horizontal overflow |
|---|---|---:|---:|---|---:|---:|
| `app-shell-1440-light-rtl.png` | Light / RTL | 1327 x 640.30 px | 269 px | 83.31 px, vertical | 1037 px | 0 / 0 px |
| `app-shell-1280-dark-ltr.png` | Dark / LTR | 1167 x 640.30 px | 269 px | 83.31 px, vertical | 877 px | 0 / 0 px |
| `app-shell-1024-light-rtl.png` | Light / RTL | 911 x 640.30 px | 269 px | 83.31 px, vertical | 621 px | 0 / 0 px |
| `app-shell-768-dark-rtl.png` | Dark / RTL | 671 x 771.59 px | 269 px | 83.31 px, vertical | 381 px | 0 / 0 px |
| `app-shell-390-light-rtl.png` | Light / RTL | 309 x 1203.69 px | 306 px | 291 px, horizontal | 307 px | 0 / 0 px |
| `app-shell-320-dark-ltr.png` | Dark / LTR | 239 x 1305.12 px | 236 px | 221 px, horizontal | 237 px | 0 / 0 px |
| `app-shell-390-light-rtl-end.png` | Light / RTL, lower regions | 309 x 1203.69 px | 306 px | 291 px, horizontal | 307 px | 0 / 0 px |
| `app-shell-320-dark-ltr-end.png` | Dark / LTR, lower regions | 239 x 1305.12 px | 236 px | 221 px, horizontal | 237 px | 0 / 0 px |

Every condition records one instance of each required production owner, four
QuickActionsBar actions, no broken images, and no captured browser error or
warning. Each condition also activates one real quick action and one real
Footer action; the event log records `quickActionActivated: task` and
`footerActionActivated: support`. The narrow lower-region captures prove the
in-flow horizontal action rail and Footer without hiding either behind the
Design Lab utility bar. At 320 px the Sidebar is capped by its 239 px shell
column instead of preserving its 269 px desktop width and being clipped.

No screenshot or automated result grants Product Owner visual acceptance.
