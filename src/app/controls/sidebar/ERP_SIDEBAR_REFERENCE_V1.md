# ErpSidebar Reference Contract V1

## Status

- Technical target: `ErpSidebar` only.
- Product Owner visual status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
- Binding direction: Skodash RTL Tabular Menu, adapted through Honesty ERP
  semantic colors, typography, Angular ownership, and consumer-provided data.
- Shared source evidence and hashes are recorded in
  `../SHELL_REFERENCE_TOPOLOGY_V2.md`.

## Verified reference geometry

- Expanded Sidebar: 270 px.
- Compact icon rail: 60 px.
- Text region contribution: 210 px.
- Header / brand row: 60 px.
- Category trigger: 40 x 40 px with 10 px block gap.
- Text item inset: 8 px block and 16 px inline.
- Desktop/narrow source boundary: `max-width: 1199px` in vendor CSS. Production
  implementation uses the Foundation Query API instead of the raw threshold.

## Authorized ERP contract

- `items`: consumer-provided nested `ErpNavigationItem` data.
- `activeId`: controlled active destination.
- `expandedIds`: controlled disclosure model. Active ancestors are always
  revealed so the active destination is not hidden.
- `collapsed`: controlled compact/full model.
- `navigationActivated`: destination intent only. Groups own disclosure and
  never emit navigation intent.
- `label` and `collapseLabel`: accessible navigation and toggle names.
- Disabled destinations and groups remain noninteractive.
- ArrowUp, ArrowDown, Home, and End traverse enabled disclosure/destination
  controls in visual order.
- In collapsed mode, root destinations remain accessible. Activating a group
  expands the Sidebar and opens that group so descendants are reachable.
- One native scroll boundary belongs to `ErpSidebar`; vendor scrollbar engines
  are rejected.

## Ownership

- Visible labels use `ErpText`.
- Icons use `ErpIcon`.
- Badges use `ErpStatusBadge`.
- The compact toggle uses `ErpIconButton` wrapped by `ErpTooltip`.
- `ErpSidebarDisclosure` and `ErpSidebarLink` are bounded internal semantic
  owners for disclosure and destination activation; neither creates a second
  public navigation system.
- Consumers own routing, permissions, authentication, and item filtering.

## Known review points

- Final Product Owner approval of expanded/collapsed visual treatment is
  pending.
- Narrow Sidebar remains in normal AppShell flow in this wave; no global Drawer
  or navigation overlay has been authorized.
