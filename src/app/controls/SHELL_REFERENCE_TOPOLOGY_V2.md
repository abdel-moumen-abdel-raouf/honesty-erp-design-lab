# Shell Reference and Topology Contract V2

## Authority and scope

- Product Owner authorization date: 2026-10-09.
- Authorized owners: `ErpSidebar`, `ErpTopbar`, `ErpAppFooter`,
  `ErpQuickActionsBar`, and the minimum compatible `ErpAppShell` composition.
- Every delivered owner remains `TECHNICAL_VERIFIED` and
  `PRODUCT_OWNER_VISUAL_REVIEW_PENDING` until an explicit Product Owner
  acceptance decision.
- `ErpUserMenu` remains on its existing S1 contract and is not redesigned by
  this wave.

## Reference register

| Owner | Reference / authority | Availability on 2026-10-09 | Adopt / adapt / reject |
|---|---|---|---|
| `ErpSidebar` | `https://codervent.com/skodash/demo/tabular-menu/rtl/index.html` | Live HTML, CSS and JavaScript source inspected | Adopt the compact icon-and-label hierarchy, active category context, genuine expand/collapse behavior, scroll ownership, and the verified responsive boundary. Adapt only colors, typography, Angular ownership, and consumer-driven data. Reject Bootstrap, jQuery, PerfectScrollbar, vendor icons, and copied runtime code. |
| `ErpTopbar` | `https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-media-object.html` | Live page and shared CSS/JavaScript source inspected | Adopt the 60 px workspace-header principle, flexible search region, separated utility/user regions, and responsive full-width search behavior. Adapt through existing ERP owners and projection slots. Reject vendor dropdown engines, Bootstrap, and a local theme authority. |
| `ErpAppFooter` | Explicit Product Owner original-design authorization | No reliable binding external footer reference | Author an in-flow, restrained Honesty ERP candidate. No Gxon geometry is claimed. All content is consumer supplied. |
| `ErpQuickActionsBar` | Product Owner topology: logical-end vertical workspace rail; narrow horizontal composition; generic consumer-driven grouping | Gxon live dashboard and documentation return HTTP 404. A web-indexed dashboard confirms only the global footer text, not quick-action geometry or behavior. | Implement a reversible contained owner and data-driven categories. Do not freeze Task/Help/Event/Settings as a taxonomy and do not claim Gxon measurements. |
| `ErpAppShell` | Explicit Product Owner shell topology | Repository contract plus this authorization | Compose logical-start Sidebar, workspace Topbar, main content, logical-end QuickActionsBar slot, and workspace AppFooter slot. Keep routing, permissions, session, transport, and theme outside the owner. |

## Captured Skodash source evidence

- HTML SHA-256:
  `00905891AF3FE58429227E5099688480DBB78BA8843D5930D0962A1525304542`.
- Shared `assets/css/style.css` SHA-256:
  `1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA`.
- Shared `assets/js/app.js` SHA-256:
  `4C6FF8886FDC78096852B9405117D7EC3061201E4226D76DF011715819633190`.
- Source dependency paths observed in the live document:
  `assets/css/style.css`, `assets/css/bootstrap.min.css`,
  `assets/plugins/simplebar/css/simplebar.css`,
  `assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css`,
  `assets/js/app.js`, `assets/js/jquery.min.js`,
  `assets/js/bootstrap.bundle.min.js`,
  `assets/plugins/simplebar/js/simplebar.min.js`, and
  `assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js`.
- These files are evidence only. None is a production dependency.

### Source-verified Sidebar anatomy

| Selector / behavior | Verified source or computed result | ERP decision |
|---|---|---|
| `.sidebar-wrapper` | fixed logical-start surface, 270 px wide, full viewport height | Preserve the two-level compact/full proportion as a component-token candidate: 60 px compact rail plus 210 px label region. AppShell owns placement rather than fixed viewport CSS. |
| `.iconmenu` | 60 px wide, independently scrollable vendor region | Use a 60 px collapsed Sidebar token. Native overflow remains with `ErpSidebar`; no PerfectScrollbar. |
| `.textmenu` | 210 px wide beside the icon rail | Use a 210 px expanded content contribution and a 270 px expanded shell column. |
| icon category trigger | 40 x 40 px circle with 10 px block gap; active state changes surface/foreground | Map geometry to Sidebar tokens and ERP semantic colors. Use semantic ERP icons. |
| text item | 8 px by 16 px padding; 1 px separator; active/hover states | Retain the measured inset/separator relationship through Sidebar tokens without copying the palette. |
| `.wrapper.toggled` | text region leaves and the 60 px icon rail remains | Implement a controlled collapsed model with reachable disclosure/navigation behavior; never leave inaccessible hidden destinations. |
| `app.js` toggle | `.nav-toggle-icon` toggles `.wrapper.toggled`; category activation restores expanded desktop state | Reimplement as Angular state and outputs; do not copy jQuery. |
| responsive source rule | `@media screen and (max-width:1199px)` moves the Sidebar off-canvas and removes page/header offset | Use the existing Foundation Query API. The exact vendor boundary is evidence; no raw media query is permitted in the component. AppShell review keeps narrow Sidebar in normal document flow because a new global drawer owner is not authorized. |
| scrolling | vendor applies PerfectScrollbar separately to `.iconmenu` and `.textmenu` | Reject the dependency and duplicate scroll regions. `ErpSidebar nav` owns one native scroll boundary. |

### Source-verified Topbar anatomy

| Selector / behavior | Verified source or computed result | ERP decision |
|---|---|---|
| `.top-header .navbar` | fixed header; 60 px computed height; 24 px inline padding; 0.2 s layout transition | Use a 60 px Topbar minimum height and 24 px desktop inline inset. AppShell owns placement; Topbar itself is not fixed. |
| `.searchbar` | 30% width; 38 px computed height; expands to `.full-searchbar` on narrow/search activation | Existing `ErpGlobalSearch` owns the search UI. Topbar supplies a flexible search slot that can consume a full row under pressure. |
| `.top-navbar` | computed 34 px utility area containing application links and dropdown triggers | Compose existing ERP owners in the canonical actions slot; no vendor dropdown engine. |
| `.user-setting` | 40 px trigger in the unrefined vendor reference | Existing S1 `ErpUserMenu` supersedes this trigger geometry and remains unchanged. |
| dropdown motion | 600 ms, `cubic-bezier(.25,.8,.25,1)` | Already owned by S1 UserMenu where applicable; not a global Topbar animation. |
| responsive source rules | 1199 px removes Sidebar header offset; 767 px makes dropdown surfaces full width; source search toggles a full-width form | Use Foundation Query keys and intrinsic pressure handling. No Topbar-owned overlay or theme state. |

## Product Owner decisions recovered from repository history

- Honesty ERP is Arabic-first and RTL-first.
- Shell topology contains a logical-start Sidebar, Topbar, main page/content
  area, logical-end quick-action presentation, and a Footer.
- Sidebar data can contain groups, items, parents, children, and nested parents.
- Consumers own permission filtering, route changes, domain actions, and
  environment values.
- The quick-action category vocabulary was not recovered as an approved fixed
  taxonomy. `ErpQuickActionsBar` therefore accepts generic typed groups.
- The unavailable Gxon source does not block the explicitly authorized Footer
  and QuickActionsBar candidates; it also does not authorize fabricated
  measurements.

## Current repository behavior before this wave

- `ErpSidebar` renders all descendants permanently and has no disclosure or
  collapsed contract.
- `ErpTopbar` owns five canonical projection regions, but its generated
  showcase incorrectly projects `erpTopbarNotifications` instead of the
  canonical `erpTopbarActions` slot.
- `ErpAppShell` composes Topbar, Sidebar, and content only.
- No public `ErpAppFooter` or `ErpQuickActionsBar` exists.

## Unknown or provisional visual points

- No reliable Gxon Footer or QuickActionsBar DOM, CSS, motion, or breakpoint
  measurement is available.
- No Product Owner-approved fixed quick-action category names were recovered.
- The exact final Footer typography hierarchy, QuickActionsBar label treatment,
  and the final narrow Shell navigation presentation remain Product Owner
  visual-review decisions.
- The AppShell narrow Sidebar stays an in-flow review candidate; no new Drawer
  or global navigation overlay is opened by this wave.

