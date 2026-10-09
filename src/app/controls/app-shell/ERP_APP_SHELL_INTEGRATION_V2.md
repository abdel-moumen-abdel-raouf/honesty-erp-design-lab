# ErpAppShell Integration V2

Status: `TECHNICAL_VERIFIED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

## Authorized topology

`ErpAppShell` composes the logical-start `ErpSidebar`, workspace `ErpTopbar`,
main content, logical-end `ErpQuickActionsBar`, and global `ErpAppFooter`.
Topbar retains its five projection regions so existing BranchSelector,
GlobalSearch, NotificationBell, and UserMenu owners remain consumer-composed.

## Compatible API additions

- `quickActionGroups` and `quickActionsLabel`
- optional `footer: ErpAppShellFooterConfig | null`
- `quickActionActivated` and `footerActionActivated` intents

Empty quick-action data and a null footer preserve the previous Topbar +
Sidebar + content composition. AppShell owns only frame placement. It owns no
routes, permissions, authentication, session, transport, branch effects,
notification persistence, search transport, or theme selection.

## Responsive and scroll ownership

Desktop uses the authorized logical-start/workspace/logical-end topology. At
the Foundation `md` query, regions enter one logical column and QuickActionsBar
uses its own narrow horizontal contract. Sidebar, main content, and the quick
actions owner retain their bounded scroll responsibilities; no global fixed or
overlay positioning is introduced.

Sidebar caps its reference desktop width to the actual containing column. This
keeps the 269 px rendered desktop contract and produces a measured 236 px nav
inside the 239 px Shell at the 320 px review viewport, without concealing an
oversized child through clipping.

## Verification checkpoint

- Focused AppShell test: 1/1 file, 2/2 tests.
- Canonical gate: 124/124 files, 792/792 tests.
- Catalog: 79 public components; Shell governance: 12 owners.
- Both typechecks and production build pass; warnings are zero.
- Initial bundle: 490.24 kB raw / 105.58 kB estimated transfer.
- Eight browser captures at 1440, 1280, 1024, 768, 390 and 320 px record zero
  page/Shell horizontal overflow, broken images, errors, or warnings.
- Evidence: `docs/review-evidence/erp-shell/s2-e-app-shell/`.

These facts do not grant Product Owner visual acceptance.
