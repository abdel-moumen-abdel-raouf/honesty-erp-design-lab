# Autonomous App Shell completion evidence

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

This directory records the real Design Lab application frame, not the isolated
AppShell workbench. The captured route is `/components/global-search`; the
same frame keeps one direct RouterOutlet and one OverlayHost while the routed
page changes.

The later root-workbench correction is included in this package's route audit:
`/components/app-shell` now has one root `ErpAppShell` and no nested AppShell.
The routed workbench controls the root through a typed Angular review-state
owner that resets on route exit. All other component routes keep the root
outside their own single `data-showcase-target`.

## Reproduction

1. Run the Design Lab locally.
2. Set `SHELL_EVIDENCE_URL` to the local origin.
3. Set `SHELL_EVIDENCE_COMPONENT=integrated-app`.
4. Run `node tools/review/capture-erp-shell-evidence.mjs`.

## Captures and measured topology

| Capture | Evidence | Topbar | Sidebar | Content | Quick actions | Footer |
|---|---|---:|---:|---:|---:|---:|
| `integrated-1440-light-rtl.png` | Full integrated RTL frame | 1170 x 73 | 270 x 900 | 1096 x 770 | 74 x 252 | 1170 x 57 |
| `integrated-1440-dark-rtl-applications-open.png` | Applications popup open | 1170 x 73 | 270 x 900 | 1096 x 770 | 74 x 252 | 1170 x 57 |
| `integrated-1280-dark-ltr-messages-open.png` | Mirrored LTR frame; Messages open | 1010 x 73 | 270 x 900 | 936 x 770 | 74 x 252 | 1010 x 57 |
| `integrated-1024-light-rtl-notifications-open.png` | Off-canvas Shell; Notifications open | 1024 x 73 | closed off-canvas | 1024 x 580 | 1024 x 58 | 1024 x 57 |
| `integrated-768-dark-ltr-search-active.png` | Active SearchBox popup and results | 768 x 227.30 | closed off-canvas | 768 x 557.70 | 768 x 58 | 768 x 57 |
| `integrated-390-light-rtl-sidebar-open.png` | Logical-start Sidebar drawer open | 375 x 201 | 270 x 844 | 375 x 1868.28 | 375 x 58 | 375 x 120 |
| `integrated-390-light-rtl.png` | Closed narrow frame; context and UserMenu share the middle row | 375 x 201 | closed off-canvas | 375 x 1868.28 | 375 x 58 | 375 x 120 |
| `integrated-390-dark-rtl-messages-open.png` | Viewport-contained Messages | 375 x 201 | closed off-canvas | 375 x 1868.28 | 375 x 58 | 375 x 120 |
| `integrated-320-dark-ltr.png` | Closed constrained frame; BranchSelector and Search share one row | 305 x 227.30 | closed off-canvas | 305 x 2041.47 | 305 x 58 | 305 x 150 |
| `integrated-320-dark-ltr-notifications-open.png` | Viewport-contained constrained LTR Notifications | 305 x 227.30 | closed off-canvas | 305 x 2041.47 | 305 x 58 | 305 x 150 |

The 375 px and 305 px layout widths are the document client widths after the
native vertical scrollbar at 390 px and 320 px. They are not horizontal
clipping.

## Runtime acceptance evidence

- Eight conditions: Light/Dark, RTL/LTR, 1440/1280/1024/768/390/320 px.
- Applications, Messages, Notifications, and GlobalSearch surfaces each open
  through their real trigger and record one open popover.
- Popup horizontal and vertical overflow deltas are zero in all captured open
  states.
- Page horizontal overflow: 0 px in all conditions.
- AppShell horizontal overflow: 0 px in all conditions.
- Broken images: 0.
- Browser errors and warnings: 0.
- RouterOutlet instances: 1. OverlayHost instances: 1.
- `/components/app-shell` contains one `erp-app-shell`, one primary target, and
  the root `#design-lab-app-shell` is that target. Other component routes keep
  the root outside their own one primary target.
- The AppShell review Sidebar now separates a no-destination intent item from
  real `/components/table` and `/components/tabs` destinations. The intent
  remains on the review route and records `navigationActivated`; a real
  destination records the same event and then navigates through the App-owned
  Router.
- Public component route audit: 81/81 passed. Every route rendered exactly one
  primary showcase target with one real root AppShell, one
  RouterOutlet, one OverlayHost, zero broken images, zero horizontal overflow,
  and zero browser errors or warnings.
- Browser route round trip:
  `/components/global-search` -> `/components/messages-menu` -> Back ->
  Forward -> Back, finishing at `/components/global-search`.

## Defects found and corrected during internal review

1. Messages and Notifications closed popovers still painted because base
   surface display styling overrode native popover closure. Explicit
   `:not(:popover-open)` ownership fixed it.
2. The narrow Sidebar originally pushed routed content. It now occupies a
   logical-start off-canvas drawer layer and closes through its own header
   control without adding a navigation engine.
3. The Sidebar anchor emitted navigation intent and also performed a full
   document navigation. Its primary click now prevents the native reload so
   the App-owned Router is the single navigation path.
4. The QuickActionsBar remained vertical after AppShell entered its narrow
   topology. Its Foundation Query transition now matches the Shell boundary
   and renders a contained horizontal row.
5. Eager root composition exceeded the unchanged 500 kB warning budget.
   Angular immediate defer keeps the real Shell as the application frame while
   moving its heavy owners out of the initial chunk. Initial output is
   414.89 kB / 91.62 kB estimated transfer.
6. AppShell and Notification styles exceeded the unchanged 4 kB component
   warning budget. Internal stylesheet partitioning restored the zero-warning
   build without changing the rendered contract.
7. The root AppShell review handler recorded every Sidebar activation and then
   returned, so genuine destinations could not navigate. It now returns only
   for the explicit intent-only item; real destinations continue to the
   App-owned Router.
8. At 320 px the earlier Topbar stacked BranchSelector, UserMenu, and Search in
   separate full-width rows (283.30 px). A first correction collapsed the
   BranchSelector and caused 44 px horizontal overflow, so it was rejected.
   The final xxs composition gives BranchSelector and Search 136.5 px each on
   one row, retains the full 289 px UserMenu identity row, measures 227.30 px,
   and records 0 px page and Shell horizontal overflow.

The captures and automated checks are internal evidence only. Product Owner
visual approval is not recorded.
