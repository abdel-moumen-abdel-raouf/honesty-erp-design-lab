# Honesty ERP — Accelerated Navigation & ERP Shell Batch V1

## Current autonomous completion authority — 2026-10-09

The Product Owner subsequently authorized completion of the entire App Shell
subsystem without intermediate visual pauses. The completed scope adds public
Applications and Messages menus, refines Notifications and Global Search,
preserves the latest UserMenu contract, and installs the production AppShell
topology in the actual Design Lab root. Sidebar, Topbar, content,
QuickActionsBar and Footer follow the logical workspace topology, with an
off-canvas Sidebar and horizontal Quick Actions below the Foundation `xl`
query boundary.

The catalog contains 81 public routes and the evidence package is
`docs/review-evidence/erp-shell/autonomous-app-shell-wave/`. Technical and
internal visual review are complete; Product Owner visual acceptance remains
pending. No unrelated application or component wave is opened.

The canonical gate passes 126/126 test files and 804/804 tests, all
governance/lint, both typechecks, and the zero-warning production build.

## Current continuation authority — 2026-10-09

The historical accelerated ten-owner batch below remains history. The Product
Owner subsequently authorized S2-A through S2-E: reference-driven Sidebar,
reference-driven Topbar, original Honesty ERP AppFooter, consumer-driven
QuickActionsBar, and minimum AppShell integration. The authoritative current
reference/topology register is `SHELL_REFERENCE_TOPOLOGY_V2.md`; it supersedes
the historical claim below that no Sidebar or Topbar reference existed.

All five continuation units are technically verified and visually pending.
AppShell composes the four owners plus the established BranchSelector,
GlobalSearch, NotificationBell and unchanged UserMenu. The final gate is
124/124 files and 792/792 tests with zero warnings. No subsequent Shell owner
or application wave is authorized.

## Authority and scope

The Product Owner explicitly opened this grouped batch for exactly these ten
public owners, in dependency order:

1. `ErpBreadcrumbs`
2. `ErpPageHeader`
3. `ErpPageShell`
4. `ErpSidebar`
5. `ErpTopbar`
6. `ErpBranchSelector`
7. `ErpGlobalSearch`
8. `ErpNotificationBell`
9. `ErpUserMenu`
10. `ErpAppShell`

The batch is reviewed visually as one group. Technical verification does not
declare Product Owner visual acceptance, freeze, or authorization for later
Entity/Page patterns.

## Reference matrix

The repository, project documentation, Product Owner template directories,
Downloads, available template archives, and supplied `erp-*.html` files were
audited before implementation. No external visual reference was found for any
of the ten owners. The Product Owner's accelerated-wave no-external-reference
waiver therefore applies to these owners only.

| Component | Reference found | Exact path / filename | SHA-256 | Treatment |
| --- | --- | --- | --- | --- |
| `ErpBreadcrumbs` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpPageHeader` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpPageShell` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpSidebar` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpTopbar` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpBranchSelector` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpGlobalSearch` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpNotificationBell` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpUserMenu` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |
| `ErpAppShell` | No | N/A | N/A | Accelerated-wave no-external-reference waiver |

## Shared contracts

`shell-family/shell-contracts.ts` owns the bounded presentation contracts:

- `ErpNavigationItem` and `ErpNavigationBadge`;
- `ErpBreadcrumbItem`;
- `ErpShellUserSummary`;
- `ErpBranchOption`;
- `ErpGlobalSearchResult`;
- `ErpNotificationSummary`;
- `ErpUserMenuItem`.

Consumers supply already-authorized and already-filtered presentation data.
These contracts own no permissions, session model, router configuration,
transport, persistence, or business rules.

## Owner contracts

### `ErpBreadcrumbs`

Inputs: `items`, `currentId`, and `label`. Output: `activated`. It owns the
location-trail navigation landmark, current-item semantics, optional semantic
icons, logical separators, focusable links, and narrow horizontal overflow.
The consumer owns routing and hierarchy construction.

### `ErpPageHeader`

Inputs: required `title` and optional `subtitle`. It owns page-title hierarchy
and named projection regions for breadcrumbs, status/meta, primary action, and
secondary actions. It owns no entity action meaning or transport.

### `ErpPageShell`

It owns responsive page composition around projected header, main content,
optional context region, and optional footer. It uses the approved structural
owners and Foundation Query API. It owns no global navigation, session, theme,
or router configuration.

### `ErpSidebar`

Inputs: `items`, `activeId`, and `label`. Output: `navigationActivated`. It
renders controlled hierarchical navigation, active and disabled states,
semantic icons, compact badges, overflow scrolling, focus-visible behavior,
and deterministic keyboard movement. Consumers own router and permission
filtering. No unproven collapse contract is included in V1.

### `ErpTopbar`

It owns layout-only projection regions for the start area, branch/context,
global search, notifications, user surface, and optional consumer actions. It
owns no theme, auth, session, branch, notification, or search state.

### `ErpBranchSelector`

Inputs: `branches`, `label`, `placeholder`, and `disabled`. Controlled model:
`value`. Output: `changed`. It is a thin composition over `ErpSelect`; the
consumer owns branch-switch side effects, storage, permissions, and data.

### `ErpGlobalSearch`

Inputs: `results`, `label`, `placeholder`, and `mode`. Controlled model:
`query`. Output: `resultActivated`. It composes `ErpSearchBox`, defaults to the
existing nonblocking `dropdown` mode, and adapts categorized shell results
without owning a search data source, API, or result transport.

### `ErpNotificationBell`

Inputs: `notifications`, `unreadCount`, and `label`. Controlled model: `open`.
Outputs: `notificationActivated` and `markAllReadRequested`. It composes a
Tooltip-wrapped `ErpIconButton` and the existing anchored-overlay geometry. It
owns deterministic outside/Escape dismissal and focus return, but no store,
polling, WebSocket, or backend behavior.

### `ErpUserMenu`

Inputs: `user`, `items`, and `label`. Controlled model: `open`. Output:
`actionActivated`. It composes `ErpAvatar`, ERP buttons, and the existing
anchored-overlay geometry. It emits enabled action intents and owns no auth,
session, sign-out logic, or service.

### `ErpAppShell`

Inputs: `navigationItems`, `activeNavigationId`, `sidebarLabel`, and
`contentLabel`. Output: `navigationActivated`. It composes `ErpTopbar` and
`ErpSidebar` with projected topbar regions and main content. It owns no theme,
router definition, session, permissions, transport, or business state. The
Design Lab application shell is not migrated to this owner in this batch.

## Architecture and ownership

- App root remains the only Light/Dark authority. No Shell owner has a theme
  input, `data-theme`, theme storage, or Light/Dark TypeScript branch.
- `ErpNotificationBell` and `ErpUserMenu` use the approved shared anchored
  overlay controller through one internal Shell helper. No third overlay
  engine exists.
- `ErpGlobalSearch` reuses `ErpSearchBox`; `ErpBranchSelector` reuses
  `ErpSelect`; `ErpUserMenu` reuses `ErpAvatar` and ERP action owners.
- Every visual owner has its own Component Token module. Production SCSS reads
  only that owner's Component Tokens and uses the Foundation Query API for
  responsive behavior.
- The `/controls/shell-batch` route is ERP-only review evidence with ten
  independent sections and one integrated Arabic ERP shell specimen. It is not
  the Design Lab shell and does not authorize Feature/Page migration.

## Explicit non-goals

This batch does not implement or open EntityDirectory, EntityDetail, DataPage,
CRUD page archetypes, transaction patterns, domain editors, backend
integration, feature migration, payment allocation, journal lines, stock
workflows, audit timeline, attachments, permission tree, or a standalone
generic Menu/Tree/Notification service.
