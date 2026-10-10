# Honesty ERP Design Lab — Codex Instructions

## Current Autonomous UI Visual-QA Authorization — 2026-10-10

The Product Owner explicitly reopened the documented ERP UI backlog for
evidence-based internal visual review and sequential technical completion.
Intermediate `PRODUCT_OWNER_VISUAL_REVIEW_PENDING` states no longer require a
pause between documented UI owners. This does not grant Product Owner visual
acceptance, open business Feature/Page work, or permit invented public owners.

The first AppShell re-audit entered from clean `main`
`6379313f8439cc7aefe025f2e6ecfcc8d9d1d481`. It reproduced the root-workbench
navigation defect: the application recorded `navigationActivated` and returned
before following real Sidebar destinations. The review model now separates an
explicit no-destination intent item from real Table/Tabs destinations; real
destinations continue through the App-owned Router. The 320 px Topbar also no
longer stacks BranchSelector, UserMenu, and Search into a 283.30 px header:
BranchSelector and Search share a contained 136.5 px row, the full UserMenu
identity remains visible, final height is 227.30 px, and horizontal overflow is
zero. Evidence is under
`docs/review-evidence/erp-shell/autonomous-app-shell-wave/`.

The 81-route browser audit still records one root AppShell, one direct
RouterOutlet, one OverlayHost, one primary target per route, zero broken images,
zero horizontal overflow, and zero diagnostics. Shell status remains
`TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Canonical verification passes 127/127
test files and 808/808 tests, all governance/lint, both typechecks, and the
zero-warning build at 418.32 kB / 92.90 kB estimated initial transfer. The next authorized action after this
bounded Shell checkpoint is the repository-backed global UI backlog ledger and
the next documented owner in Bottom-Up order.

## Current Root-Owned AppShell Workbench Recovery — 2026-10-10

The Product Owner-authorized recovery entered from published clean `main`
`94c20bcd55eda2eb722ddad65d6280eaf11592c7` with 21 pre-existing modified
AppShell/evidence files. A complete external backup was verified before edits.
All pre-existing changes were confirmed as part of the root-owned AppShell
correction or its regenerated browser evidence; no unrelated change was found.

`/components/app-shell` now reviews the one real application-root
`ErpAppShell` instead of rendering a nested second shell. The routed page owns
the control panel only; a typed, review-internal Angular state service applies
inputs/models to the root instance and clears them on route exit. Custom
`window` events, hidden duplicate instances, and stale route overrides are
forbidden. Every public route retains exactly one primary
`data-showcase-target`, with the root taking that role only on the AppShell
route. The root still owns one direct RouterOutlet and one OverlayHost.

Runtime audit passes 81/81 component routes. The AppShell matrix covers
1440/1280/1024/768/390/320 px, Light/Dark and RTL/LTR with zero horizontal
overflow, broken images, or browser diagnostics. Canonical verification passes
127/127 test files and 807/807 tests, all governance/lint, both typechecks, and
the zero-warning production build. Initial output is 418.32 kB / 92.88 kB
estimated transfer.

Status is `TECHNICAL_VERIFIED` and `INTERNAL_VISUAL_REVIEW_COMPLETED`; the
complete Shell remains `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The next action
is consolidated Product Owner review. No unrelated execution wave is open.

## Current Autonomous App Shell Completion State — 2026-10-09

The Product Owner-authorized wave entered at
`6ceaf966c4b22efa0faf1d32e3dae841fd800c31`. The public catalog now has 81
components, including independent `ErpApplicationsMenu` and
`ErpMessagesMenu`. Existing `ErpNotificationBell` and `ErpGlobalSearch` own
their completed dropdown/search experiences. The actual Design Lab root now
uses one `ErpAppShell`, one direct RouterOutlet, one OverlayHost, and the sole
App-root theme authority.

Desktop composition is Sidebar beside the workspace, with Topbar, content plus
logical-end QuickActionsBar, and Footer inside the workspace. At the Foundation
`xl` query boundary, Sidebar becomes a logical-start off-canvas drawer and
QuickActions become horizontal. The evidence package at
`docs/review-evidence/erp-shell/autonomous-app-shell-wave/` covers six viewport
widths, Light/Dark, RTL/LTR, dropdowns, search, Sidebar and router history with
zero recorded overflow, broken images or diagnostics.

Canonical verification passes 126/126 test files and 804/804 tests, all
governance/lint, both typechecks, and the zero-warning production build. Initial
output is 414.89 kB / 91.62 kB estimated transfer.

Status is `TECHNICAL_VERIFIED` and `INTERNAL_VISUAL_REVIEW_COMPLETED` only;
all Shell owners remain `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The next action
is consolidated Product Owner review. Do not infer approval or open unrelated
CRUD, Feature/Page migration, or component work.

## Current Product Owner UserMenu Trigger Correction — 2026-10-09

The Product Owner rejected the closed UserMenu trigger at
`76a0893f8c647363833ac32a58685450507055c8`. The current bounded correction
renders name, email, then the role/branch badges as exactly three maximum
identity rows. Trigger badge gates now default true; legacy `secondaryText`
remains popup-only. The trigger Avatar is 60 x 60 px, matching the 60 px
identity stack inside the intrinsic 72 px capsule. The email row inherits
RTL/LTR alignment while its address uses ErpText BDI isolation.

Focused verification passes 3/3 files and 53/53 tests. Canonical verification
passes 124/124 files and 793/793 tests, all governance, both typechecks,
production build, and zero warnings. Twenty browser conditions cover
1440/768/390/320 px, Light/Dark, RTL/LTR, open/closed, fallbacks and independent
badge gates with zero page/popup overflow, broken images or diagnostics.
`ErpUserMenu` remains `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; the S2 technical
checkpoints remain intact and no additional wave is open.

## Current Shell S2-E Integrated AppShell State — 2026-10-09

The authorized Shell continuation is technically complete. `ErpAppShell`
retains its existing Topbar, Sidebar and content contracts and adds optional,
backward-compatible `quickActionGroups`, `quickActionsLabel`, and `footer`
composition with forwarded QuickActionsBar and AppFooter activation intents.
The integrated workbench composes the real BranchSelector, GlobalSearch,
NotificationBell and unchanged UserMenu owners. Sidebar now caps its fixed
reference width to the available container, preventing narrow clipping without
changing its 269 px rendered desktop width.

Focused AppShell verification passes 1/1 file and 2/2 tests. Canonical
verification passes 124/124 files and 792/792 tests, the 79-component catalog,
12-owner Shell governance, both typechecks, production build, and zero
warnings. Eight browser captures cover 1440/1280/1024/768/390/320 px,
Light/Dark and RTL/LTR, with zero page or Shell horizontal overflow, broken
images, errors, or warnings. S2-A through S2-E are `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The wave stops for consolidated Product
Owner review; no additional Shell owner or application wave is open.

## Current Shell S2-D QuickActionsBar State — 2026-10-09

S2-D adds one public `ErpQuickActionsBar` owner. Its group labels and action
taxonomy are consumer data because Gxon remains unavailable and no fixed
Product Owner category vocabulary was recovered. It composes `ErpIconButton`,
`ErpTooltip`, and `ErpText`, emits activation intent only, stays in flow, and
changes from a vertical rail to a horizontally contained narrow composition
through the Foundation Query API.

Focused verification passes 1/1 file and 3/3 tests. Canonical verification
passes 124/124 files and 791/791 tests, the 79-component catalog and 12-owner
Shell governance, both typechecks, production build, and zero warnings. Six
browser conditions cover 1440 through 320 px with zero page overflow, broken
images, errors or warnings. Status is `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The exact next unit is S2-E minimum
`ErpAppShell` integration.

## Current Shell S2-C AppFooter State — 2026-10-09

S2-C introduces one public `ErpAppFooter` owner as an explicitly authorized
original Honesty ERP candidate. It is an in-flow global application footer,
distinct from PageShell projection and action bars. Consumer-supplied
application/version/status/actions compose `ErpText`, `ErpStatusBadge`, and
`ErpButton`; absent optional data emits no empty landmark. No Gxon geometry or
behavior is claimed because its binding runtime evidence remains unavailable.

Technical verification passes 123/123 files and 788/788 tests, 78-component
catalog and 11-owner Shell governance, both typechecks, production build, and
zero warnings. Browser evidence covers default, dense six-action, disabled and
empty states from 1440 to 320 px with zero page overflow, broken images or
diagnostics. Status is `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The exact next unit is S2-D
QuickActionsBar.

## Current Shell S2-B Topbar State — 2026-10-09

S2-B retains `ErpTopbar` as the five-region projection owner and resolves the
workbench mismatch by composing the existing `ErpBranchSelector`,
`ErpGlobalSearch`, `ErpNotificationBell`, and `ErpUserMenu` through the
canonical context/search/actions/user slots. The superseded
`erpTopbarNotifications` marker must not return. Verified reference geometry is
a 60 px minimum bar, 24 px desktop inline padding, 30% search basis, and 40 px
utility triggers; narrow wrapping uses the Foundation Query API.

Technical verification passes 122/122 files and 785/785 tests, all governance,
both typechecks, production build, and zero warnings. Browser evidence at
1440/1280/1024/768/390/320 px records zero page overflow, broken images, and
browser diagnostics. Status is `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The exact next unit is S2-C AppFooter;
preserve UserMenu and every unrelated visual owner unchanged.

## Current Shell Continuation State — 2026-10-09

The Product Owner opened a bounded ordered Shell continuation from clean live
`main` `216fd4d36819df0adfbcdb0c599574d2b67469cd`: S2-A Sidebar,
S2-B Topbar, S2-C AppFooter, S2-D QuickActionsBar, then S2-E minimum AppShell
integration. This supersedes historical "S2 closed" language only for those
owners. Intermediate visual approvals are deferred; every stage still requires
its technical gate and remains `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

S2-A retains `ErpSidebar` and adds controlled collapse/expansion, hierarchical
disclosure distinct from navigation, active-ancestor context, badges, disabled
semantics, long-label containment, vertical keyboard traversal, and a single
scroll owner. Verified reference dimensions are 270 px expanded, 60 px
collapsed, 60 px header, and 40 px compact triggers. Consumers still own
taxonomy, permissions, filtering, and route effects. Technical verification
passes 122/122 files and 785/785 tests, all governance/typechecks, production
build, and zero warnings. The next authorized unit is S2-B Topbar; preserve
ErpUserMenu and every other visual owner unchanged.

## Current Shell S1 Compact UserMenu Trigger State

The Product Owner rejected the preceding closed `ErpUserMenu` trigger at clean
live `main` `991c03daaf01b5bd3dd8ab03b222cdcc4f57b6f0`. The bounded correction
keeps one owner and changes only the trigger identity presentation plus two
compatible trigger-specific badge inputs. Default trigger anatomy is name,
email, and optional `secondaryText`; role and branch badges are default-hidden
there but remain default-visible in the popup.

Current measured capsules are 360 x 72 px at desktop, 309 x 72 px at 390, and
239 x 71 px for the long-name 320 case, versus the rejected 104/104/125 px.
All have at most three rows, 40 x 40 px Avatar, 0 px Avatar center delta, no
vertical row clipping, no page/popup overflow, and no broken images. The
internal arrow presentation was isolated only to preserve the unchanged arrow
geometry while keeping the 4 kB component-style budget; it is not a public
owner or a new overlay engine.

The dedicated workbench retains one live target and exposes all existing six
visibility inputs plus `showTriggerRoleBadge` and
`showTriggerBranchBadge`. Evidence is under
`docs/review-evidence/erp-user-menu/compact-trigger-v1/`. Technical gates pass
122/122 test files and 782/782 tests, all lint/governance, both typechecks,
production build, and zero warnings. Product Owner visual acceptance remains
pending; S2 and every other Shell owner remain closed.

## Current Global 3D Avatar Asset Library Gate

The Product Owner supplied 116 standalone 3D PNGs now supersede the former
40-image system avatar collection. The bounded replacement entered from clean
live `main` at `30d6bd942015743fb3f02c7faeb563961fa978ac`. The canonical
manifest records 60 male and 56 female assets, complete source numbers 1..116,
per-file PNG integrity/size/transparency/SHA-256 evidence, and aggregate
library SHA-256
`39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.

Legacy IDs, genders, and published URLs remain stable for `avatar-01..40`.
`ErpAvatarPicker` uses the complete catalog by default and continues to render
only through `ErpAvatar`; Picker tiles opt into browser lazy loading while the
Avatar default remains eager for compatibility. Current browser evidence under
`docs/review-evidence/erp-avatar-library/` covers 320/390/768/1440, Light/Dark,
RTL/LTR, circle/rounded/square, large sizes, presence indicators, zero broken
loaded images, zero horizontal overflow, and one live workbench target.
Canonical verification passes 122/122 test files and 779/779 tests, all
lint/governance, both typechecks, production build, and zero warnings. The
initial bundle is 490.24 kB / 105.56 kB estimated transfer.
Product Owner visual review is pending. No Shell phase or component visual
contract is reopened.

## Current Shell S1 UserMenu Dark Contrast and Scroll Ownership Gate

This bounded correction entered from clean live `main` at
`415298b7921719747efcc17dc82f9e889ccac64c` and changes only the existing
`ErpUserMenu` foreground inheritance, popup scroll ownership, direct tests,
governance, and review evidence. The surface consumes its existing semantic
foreground and explicitly defeats native popover scrolling; only the action
list scrolls while the identity card remains fixed.

Current browser evidence is
`docs/review-evidence/erp-user-menu/s1-final-dark-contrast-scroll.json` plus five
current PNGs. It covers Light RTL desktop, Dark RTL/LTR desktop, Dark RTL at
390 px, and constrained Light RTL at 320 x 568. Focused verification passes
4/4 files and 58/58 tests plus Shell governance. Canonical verification passes
122/122 files and 776/776 tests, all lint/governance, both typechecks,
production build, and zero warnings. Initial bundle is 490.24 kB / 105.57 kB
estimated transfer. Product Owner visual review remains pending; S2 and every
other Shell owner remain closed.

## Current Shell S1 UserMenu Popup Geometry Gate

The bounded final gate entered from clean live `main` at
`ccddf29d22b4608016d27818b17a2584a0f06632` and changes only the existing
`ErpUserMenu` plus the shared anchored-overlay capability it consumes. UserMenu
now permits only bottom/top placement, measures actual block space before
surface layout, keeps identity content visible, and makes only the action list
scroll. Other overlay consumers retain their existing placement defaults.

Trigger and open identity use the same order: name, email, role/branch badges,
then independent legacy `secondaryText`. Current PNG and JSON evidence under
`docs/review-evidence/erp-user-menu/` covers 320x568, 320x844, 390x844,
768x900, and 1440x900 in Light/Dark and RTL/LTR. Open cases have zero trigger
overlap, zero viewport overflow, top/bottom placement only, and the constrained
case keeps identity visible while actions scroll.

Focused verification passes 4/4 files and 57/57 tests plus Shell governance.
Canonical verification passes 122/122 files and 775/775 tests, all lint and
governance, both typechecks, production build, and zero warnings. Initial
bundle is 490.24 kB / 105.58 kB estimated transfer. Product Owner visual review
remains pending; S2 and every other Shell owner remain closed.

## Current Shell Phase S1 — ErpUserMenu identity and responsive refinement

This bounded enhancement entered from clean live `main` at
`b210bb1311841dea836379e996f53aaa5a7ddf74` and changes only the existing
`ErpUserMenu`. The trigger is now a responsive identity capsule rather than a
forced 40 px multi-line control. It uses balanced 8 px block / 12 px inline
padding, a 12 px content gap, `min-inline-size: 0`, bounded truncation, and the
full user name in the accessible trigger label.

`ErpShellUserSummary` retains every previous field and adds optional email,
role, branch, and Avatar presence data. UserMenu continues to compose
`ErpAvatar`, `ErpStatusBadge`, ERP actions/text, and the single
`ShellAnchoredSurfaceController`. Six default-true visibility inputs control the
same closed trigger and open identity card. The identity card order is Avatar,
full name, email, then independently wrapping role and branch badges; only the
action region scrolls when the viewport requires it.

The dedicated `/components/user-menu` workbench retains one primary target and
adds live identity presets plus all six visibility controls. Runtime evidence
covers 320, 390, 768, and 1440 px, Light/Dark, RTL/LTR, open/closed states,
dynamic identity changes, zero horizontal overflow, and unchanged computed
arrow alignment. Product Owner visual acceptance remains pending and S2 stays
closed.

Focused verification passes 2/2 files and 27/27 tests. Canonical verification
passes all lint/governance checks, 122/122 test files and 768/768 tests, both
typechecks, production build, and zero warnings. Initial production bundle is
490.24 kB / 105.57 kB estimated transfer.

Gxon is currently unavailable and no longer blocks a future bounded
`AppFooter` or `QuickActionsBar` implementation. Any such future unit requires
explicit Product Owner authorization and explicitly authored Honesty ERP design
decisions; fabricated Gxon measurements are forbidden. Later Gxon availability
does not itself reopen an accepted component.

## Current Shell Phase S1 — ErpUserMenu final visual-evidence closure

This bounded follow-up entered from clean live `main` at
`b28012f18dfd74ac9c37827e00010d70f701719f` and changes only the existing
`ErpUserMenu` and its shared anchored-surface integration. Browser geometry
confirmed that the viewport-clamped popup arrow used a fixed edge offset and
missed the trigger center by 237.3125 px. The controller now supplies the
measured physical cross-axis center after clamping; UserMenu consumes it without
changing arrow size, popup geometry, or other anchored-overlay defaults.

Saved evidence adds open Dark RTL/LTR captures at 1440x900 and 390x844, proves
above/below placement at both physical horizontal edges in both directions, and
records zero overflow. The reference specimen uses the approved local
`avatar-21.png` asset while existing image-failure fallback behavior remains
covered. Sidebar, Topbar, S2, every other Shell owner, and the Design Lab root
remain closed. Technical success is not Product Owner visual acceptance.

Focused verification passes 3/3 files and 35/35 tests. Canonical verification
passes all lint/governance, 122/122 test files and 758/758 tests, both
typechecks, production build, and zero warnings. Initial production bundle is
490.24 kB / 105.56 kB estimated transfer. The next and only gate is external
Product Owner review of `/components/user-menu`.

## Current Bounded Live API Workbench Correction State

The current bounded correction entered from clean live `main` at
`f0450d76a6ef523158036ba9b5bb66a9127519dd`. All 77 public ERP component pages
retain exactly one primary target and the shared live API control panel.

Select, StatusBadge, Avatar, AvatarPicker, Tabs, and Table restore their existing
exact Core evidence behind an on-demand secondary control. Table continues to
render the complete TableToolbar, SearchBox, ColumnChooser, Table, and Pagination
reference experience. Structured editors reject incompatible JSON value kinds,
preserve invalid drafts, and keep the last valid live value through unrelated
changes. Model and CVA editors remain synchronized.

Fab, ExtendedFab, and FabMenu use a measured, unclipped preview owner with both
position controls and a review-direction control. Runtime measurements at 390
px pass both physical boundaries in RTL and LTR for all three owners with zero
page overflow, console errors, or warnings. Focused verification passes 6/6
files and 28/28 tests. Canonical verification passes every lint/governance
gate, 122/122 test files and 748/748 tests, both typechecks, production build,
and zero warnings. The initial bundle remains 488.18 kB / 105.32 kB estimated
transfer.

The exact next action is Product Owner external review. Existing component
visuals remain unaccepted unless separately approved, no later wave is opened,
and technical PASS is not Product Owner visual acceptance.

## Historical Dedicated Component Showcase State — superseded 2026-10-08

The preceding reconstruction entered at
`54451b1fdca8da0f03096d16df20adc6100a5c11` and established dedicated owners,
legacy migration, redirect-only aliases, and compact navigation. Its static
showcase contract is superseded by the live workbench contract above.

## Historical ERP Ownership Catalog and Page Foundation State — superseded 2026-10-08

The current bounded implementation entered from clean live `main` at
`895f985994ef2c28eae703f60d5911a5314af338`. The generated authoritative
inventory contains 77 public ERP components and 41 supporting entries. Every
public owner has a unique `/components/<id>` route and the catalog supplies 336
live cases. The generated native-element registry contains 42 tag contracts
and its checker scans production HTML plus inline templates.

Covered native elements remain inside their registered ERP owner. Consumer and
page bypasses are forbidden; contextual structure and genuinely uncovered
semantics stay explicitly classified. Dedicated component pages are review
surfaces, not Product Owner visual approval.

`ErpPage` is the public page width/scroll boundary with `boxed | fluid | full`
and `document | page | free`; defaults are `fluid` and `document`. It owns no
theme, router, transport, session, global body, or business state.
`ErpPageShell` continues to own page regions and `ErpAppShell` the application
frame. Existing batch routes remain technical candidates and were not visually
reopened.

Canonical verification passes all lint/governance, 136/136 test files and
909/909 tests, both typechecks, production build, and zero warnings. Initial
bundle is 497.84 kB / 108.38 kB and component-showcase remains lazy. The exact
next action is Product Owner runtime/technical review of the catalog, ownership
registry, dedicated component pages, and `ErpPage`. The existing full ERP-TABLE
visual gate remains pending separately. No later wave is opened.

## Historical Product Owner ERP-TABLE Full Reference Experience State — superseded current gate

The Product Owner rejected
`eddac4a8e8a3460f346bb579fdd5ca0074296e7a` because the prior Table candidate
omitted visible owners from the binding reference and retained known geometry
deltas. That checkpoint is not a successful visual result.

`C:\Users\Misrtech\Downloads\ERP-TABLE.html`, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`, remains
the single authority. The current contract is
`src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md`; its rule is
that separate ownership never permits visible reference evidence to be skipped.

The exact review experience composes `ErpTableToolbar`, `ErpSearchBox`,
`ErpColumnChooser`, `ErpTable`, and `ErpPagination`. Base Table retains native
table semantics and composes `ErpText`, `ErpCheckBox`, `ErpSortHeader`,
`ErpTableResizeHandle`, and projected ERP cells. Selection and activation remain
independent. Canonical verification passes 134/134 files and 904/904 tests,
all lint/governance, both typechecks, production build, and zero warnings.
Runtime evidence records 0 px geometry delta across all six specimens and no
390 px page overflow. This is technical evidence, not Product Owner approval.

The current gate is Product Owner review of the full experience at
`/controls/core-batch`. No later Data/Table wave or visual owner is opened.

## Working Scope

Work only inside this repository.

This is an Angular / TypeScript / SCSS standalone browser Design Lab for the
Honesty ERP frontend foundation.

The product is Arabic-first and RTL-first.

Work in small bounded phases only.

Do not anticipate later phases or implement adjacent features unless explicitly
requested.

The Product Owner is the final authority for visual approval.
Technical success, green tests, or Codex judgment do not equal visual approval.

## Historical Product Owner ErpTabs Exact Reference State — superseded current gate

The Product Owner made
`C:\Users\Misrtech\Downloads\ERP-TABS.html`, SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`, the
single binding visual and behavioral authority for `ErpTabs`. It supersedes the
Nexlink reference, the accelerated no-reference waiver, and all conflicting
visual interpretations. Only colors and font families are mapped to Honesty ERP
system contracts.

The technically green candidate at
`302056ad312dec403a1cdf2f9ded92d57d011ba5` was rejected by the Product Owner
for complete visual mismatch. The current literal reconstruction entered from
that checkpoint and implements the reference
variants, header anatomies, orientations, distribution, panels, active
indicator, responsive behavior, motion, automatic keyboard activation, and
ARIA. `ErpTabTrigger` remains a generic semantic primitive, so Tabs visual
styling does not leak into `ErpStepper`. `count` and `renderPanels=false` remain
bounded AvatarPicker compatibility extensions.

Its canonical gate passes 133/133 test files and 895/895 tests, both typechecks,
production build, all governance, and zero warnings.

The authoritative implementation contract is
`src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md`.

The current gate is Product Owner runtime/Light/Dark/RTL/LTR/narrow review of
the rebuilt Tabs at `/controls/core-batch` against the exact reference.
`ErpSelect`, `ErpStatusBadge`, `ErpAvatar`, `ErpAvatarPicker`, and every other
Core owner remain closed to implementation. The
Data/Table Visual Correction Wave is not opened. Technical PASS does not equal
Product Owner visual approval or freeze.

Previously implemented Data/Table, Forms Composition, Entity Form Engine, and
Shell batches remain technical candidates pending Product Owner acceptance.
Standalone EntityReview, Entity Wizard, workflow engine, DataPage,
EntityDirectory, EntityDetail, CRUD/transaction patterns, Feature/Page
migration, and every unlisted owner remain unopened.

## Production Core Components Visual Correction V2 Governance

- `ErpAvatar` exact sizes, shapes, content hierarchy, tones, ring/loading,
  presence states, physical positions, interaction, and reference motion come
  only from `ERP-AVATAR.html` at SHA-256
  `2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`.
  Earlier Avatar references and waivers are superseded. Only colors and system
  font families replace the reference palette and font family.
- `ErpAvatar` composes `ErpText` and `ErpIcon`; native image and bounded action
  semantics stay inside Avatar-owned internals. Presence positioning and
  animation remain separate layers, and physical left/right never become
  logical start/end. AvatarGroup/stack remains an unopened separate owner.
- `ErpStatusBadge` exact geometry, variants, sizes, anatomy, states, width
  behavior, interaction, and motion come only from `ERP-STATUS-BADGE.html` at
  SHA-256 `654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`.
  Its former Dribbble reference and accelerated no-reference waiver are
  superseded. Only colors and font families resolve through Honesty ERP system
  contracts.
- `ErpStatusBadge` composes `ErpIcon` and `ErpText`; native action semantics are
  isolated in its approved internal action owner. It does not automatically
  author `role=status` or a live region.
- `ErpAvatarPicker` composes `ErpTabs` and `ErpAvatar`; it does not own upload,
  cropping, camera, transport, or a second tabs/avatar engine.
- `ErpAvatarSize` is `xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl`.
  The Product Owner-authorized large-size extension preserves the exact
  reference at `2xl`, uses a proportional 112/144/184 px desktop progression,
  and maps each large size down exactly one tier through the Foundation Query
  API at narrow widths.
- AvatarPicker forwards the selected size and shape to `ErpAvatar`; its large
  tile minimum is always the corresponding Avatar size plus the reference-owned
  10 px selection allowance. It must not introduce a private avatar renderer.
- `ErpAvatarPicker` exact surface, header, counted gender tabs, search, grid,
  staged selection, preview, footer, and motion come only from
  `ERP-AVATAR-PICKER.html` at SHA-256
  `24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66`.
  Earlier Picker references and waivers are superseded. Every tile and preview
  uses `ErpAvatar`; `ErpTabs` remains the only tabs owner.
- `ErpTabs` exact geometry, variants, header anatomy, active/inactive states,
  orientations, distribution, panel relationship, motion, and responsive
  behavior come only from `ERP-TABS.html` at SHA-256
  `CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`.
  The Nexlink reference and accelerated no-reference waiver are superseded.
  Only colors and system font families replace the reference palette and font.
- `ErpTabTrigger` owns generic native-button semantics, forwarded ARIA, focus,
  disabled behavior, and activation. Reference-specific Tabs visuals remain in
  `ErpTabs` and do not leak into `ErpStepper`.
- `ErpTabs` retains `count` and `renderPanels=false` as bounded AvatarPicker
  compatibility extensions. Panel-less mode must not emit dangling
  `aria-controls`; per-instance IDs must remain collision-free.
- `ErpTable` composes `ErpCheckBox` for selection and `ErpSortHeader` for sort;
  row activation and controlled selection remain distinct intents.
- `ErpPagination` composes `ErpSelect` for page size and keeps all seven region
  visibility inputs enabled by default.
- `ErpTable` row activation is controlled only by `rowActivatable`; checkbox
  selection never implies or emits row activation.
- Pagination page-size composition has one visible horizontal label and retains
  the Select accessible name through the Field Family visually-hidden label mode.
- Avatar `left`/`right` position names are physical in both LTR and RTL; a
  nested indicator owns motion so animation never replaces position transforms.
- `ErpSelect` composes Field Family, `ErpSearchBox` select-panel presentation,
  `ErpSelectionTile` select-option presentation, `ErpAvatar`/`ErpIcon`, the
  approved internal Select action owner, and `AnchoredOverlayController`.
- Select sorting remains a data-order pipeline. The superseded visual toolbar,
  sort dropdown, and secondary action-menu chrome must not return.
- Select clear/remove actions use the simple `dismiss` semantic icon and
  selected options use the simple `check-mark` semantic icon.
- Pointer selection must not leave a persistent focus ring; blur clears Field
  focus state, while keyboard focus retains the intended focus-visible ring.
- Select options preserve the tokenized 4 px intra-group vertical row gap.
- `ErpAlert` uses only the Tooltip-wrapped IconButton close path and must not
  restore a native `title` tooltip.
- Core motion uses Foundation motion values and remains static-but-visible
  under reduced motion.
- `/controls/core-batch` remains ERP-only authored. Rich keyed templates are
  isolated in Design-Lab-only `erp-review-*` internals.
- These technical rules do not declare Product Owner visual acceptance or open
  the Data/Table Visual Correction Wave.

## Production Navigation and ERP Shell Governance

- `ErpBreadcrumbs`, `ErpPageHeader`, and `ErpPageShell` own bounded page
  location, hierarchy, and composition only; they own no router configuration,
  entity business actions, session, transport, or global application state.
- `ErpSidebar` consumes an already-filtered navigation model and emits
  navigation intent. Consumers own permissions, routing, and business context.
- `ErpTopbar` owns projection layout only. App root remains the sole runtime
  Light/Dark authority; no Shell owner may expose theme state or `data-theme`.
- `ErpBranchSelector` must remain a thin composition over `ErpSelect` and own no
  branch persistence, session switching, permissions, or backend behavior.
- `ErpGlobalSearch` must reuse `ErpSearchBox` and own no search transport or
  data source.
- `ErpNotificationBell` and `ErpUserMenu` use the approved anchored-overlay
  controller, ERP actions, and Tooltip contracts. They own no notification
  store, polling, WebSocket, authentication, session, or sign-out logic.
- `ErpAppShell` composes `ErpSidebar` and `ErpTopbar`; it owns no theme, router
  definition, permissions, session fetch, transport, or business state.
- Shell production SCSS consumes only its owner's Component Tokens and uses the
  Foundation Query API. Raw responsive thresholds and cross-component token
  reads are forbidden.
- `/controls/shell-batch` is ERP-only review evidence. The Design Lab App chrome
  remains review tooling and is not migrated to `ErpAppShell` by this batch.
- The grouped technical checkpoint does not declare Product Owner visual
  approval and does not authorize Entity/Page patterns or Feature migration.

## Production Forms Composition Governance

- `ErpForm` is the public native-form semantic gateway. Feature/Page/review
  consumers do not author raw `<form>` and the component emits submit/reset
  intents without owning feature state, persistence, transport, or payloads.
- `ErpFormSection` owns semantic grouping only; `ErpFormActions` owns responsive
  primary/secondary projection layout only. Neither assigns business meaning.
- `ErpValidationSummary` consumes the shared typed Forms issue contract and emits
  activation intent. It does not inspect arbitrary child controls or create a
  second validation engine.
- `ErpRepeater` is consumer-controlled: keyed items are inputs and add/remove
  requests are intents. It owns no domain array mutation, FormArray, service,
  persistence, or transport.
- `ErpStepper` owns generic controlled step navigation and keyed rich panels. It
  is distinct from Tabs and must not become an Entity Wizard or workflow engine.
- Forms composition owners consume existing Input/Field/Button/Overlay and
  structural gateways, use stable CVA/Angular Forms validation, and must not use
  experimental Signal Forms.
- Every Forms owner keeps its own Component Token namespace. Cross-component
  Component Token access and Feature/Page overrides remain forbidden.
- `/controls/forms-batch` is review evidence only, remains ERP-only authored,
  and is not a Form Engine or production entity pattern.
- The later Product Owner Phase 6 authorization opened only the four bounded
  Entity Form owners recorded below. The subsequent Shell authorization is
  recorded in the current-state and Shell-governance sections above; Entity
  Wizard, workflow engine, reusable page/entity patterns, and Feature/Page
  migration remain unopened.

## Production Schema-Driven Entity Form Governance

- `ErpStandardEntityForm` is bounded schema-assisted CRUD composition. It
  composes existing Forms and approved ERP controls; it owns no HTTP,
  persistence, permissions, domain rules, DTO mapping, or backend validation.
- `ErpEntitySchemaFields` renders only the documented V1 discriminated field
  kinds through existing ERP controls. Unknown kinds fail deterministically and
  never fall back to raw native inputs or silent omission.
- Entity-form values are consumer-controlled immutable snapshots. The engine
  emits typed field changes and never mutates input records in place.
- Form-level validation remains the shared `ErpFormValidationIssue` contract;
  field issues adapt into existing input external-validation contracts. No
  duplicate CVA or validation engine is permitted.
- `ErpEntityCustomFieldOutlet` and `ErpEntityCustomSectionOutlet` are nonvisual
  typed template escape hatches. They do not reinterpret consumer content and
  do not own Component Token namespaces.
- Optional steps compose `ErpStepper`; optional review uses the supporting
  `erpEntityFormReview` template directive. Neither is an Entity Wizard,
  workflow engine, nor standalone `ErpEntityReview` owner.
- `/controls/entity-form-batch` is ERP-only review evidence and owns no HTTP,
  persistence, backend, or feature/page authority.
- Only `standard-entity-form` and `entity-schema-fields` own Phase 6 Component
  Token namespaces because only those two owners render independent visual UI.
- The subsequent Product Owner authorization opened only the bounded Shell
  owners recorded above. Reusable page/entity patterns, Features/Pages, Entity
  Wizard, workflow engine, and ERP-specific domain editors remain unopened.

## Design Architecture

The token architecture is strictly:

Reference → Semantic → Theme/Density/Query resolution → Component Tokens → Components

Reference tokens:
- Sass compile-time primitives.
- No runtime CSS output by default.

Semantic tokens:
- Runtime CSS custom properties.

Component tokens:
- Runtime component-scoped contracts.
- Do not create them before the relevant component phase.
- Semantic → Component Tokens is the default path for shared meaning,
  theme-sensitive values, density-sensitive values, brand, feedback, surfaces,
  text, focus, elevation, motion, and layers.
- A Component Token declaration may consume a Reference primitive directly only
  when the value is a context-free physical primitive, no shared Semantic
  meaning is appropriate, and the Product Owner-approved component reference
  requires it.
- Direct Reference colors are forbidden in Component Tokens. Colors must go
  through Semantic contracts.
- Direct Reference breakpoints are forbidden. Responsive behavior uses the
  Foundation Query API only.
- A Component Token may own a component-local structural constant when that
  value is inherently local to the component, such as a container max-width,
  grid column count, or component-local min/height/width contract. Such a value
  stays in the Component layer and is not automatically promoted into
  Foundation.

Production component implementation SCSS consumes Component Tokens only. It
does not consume Reference or Semantic tokens directly.

The public responsive Sass API is the Foundation Query API.

Do not consume raw Reference breakpoints from component/layout implementations.

## Technology Constraints

Do not add:
- Angular Material
- Bootstrap
- Tailwind
- third-party UI frameworks
- Gemini runtime dependencies

Do not add dependencies unless the task explicitly requires them.

Do not add assets, fonts, or redistributed files without checking licensing /
attribution obligations in the same task.

## Visual Governance

No production component visual design without a Product Owner supplied external
reference or an explicit waiver.

Docs-only Foundation specimens may use clearly local temporary layout values when
necessary for review.

Do not invent Foundation CSS custom properties.

Every referenced --honesty-* custom property must actually exist.

Do not hide invalid Foundation variables behind fallback values.

Avoid:
- decorative gradients
- unnecessary shadows
- card-inside-card visual noise
- decorative overboxing

Elevation is only for genuine elevation.

## Responsive Governance

Use the Foundation Query API for responsive viewport/container behavior.

Do not hard-code raw breakpoint thresholds where the Query API applies.

Honesty ERP is desktop-first, but Design Lab review pages must remain readable at
desktop, tablet, and narrow/mobile review widths.

## Testing

Do not create false-positive tests.

Forbidden examples include:
- expect(true).toBe(true fallbacks
- tests that silently pass when CSS is unavailable
- tests whose names claim to verify computed styling but only verify DOM attributes

Do not duplicate Sass token maps in TypeScript merely to make them testable.

Use the real project build/lint/test pipeline as the primary compilation gate.

## Package Manager

Use npm only.

`package-lock.json` is the single dependency lockfile for this repository.

Do not use:
- Bun
- Yarn
- pnpm

Do not run `npm install` during ordinary source/design tasks unless the task
explicitly changes dependencies or the lockfile.

Do not modify package-lock.json incidentally.

## Git Workflow

The repository branch for this workflow is main.

Before modifying anything:

1. Run:
   git status --short
   git branch --show-current

2. The current branch must be main.

3. If the worktree contains unrelated uncommitted changes, STOP and report them.
   Do not mix unrelated changes into the task.

For every bounded task that modifies files:

1. Implement only the requested scope.
2. Run the requested build, lint, tests, and other verification.
3. Inspect:
   git diff
   git diff --check
   git status --short
4. Fix task-caused failures before committing.
5. Create exactly ONE commit for the task.
6. Use the exact commit message supplied by the task when one is provided.
7. Do not amend existing commits.
8. Do not create a new branch.
9. Do not rebase published history.
10. Never force-push.
11. Push the successful commit with:
    git push origin main
12. Verify:
    git status --short
    The worktree must be clean.
13. STOP.

If the task cannot be completed or verification fails and cannot be corrected,
do not create a misleading success commit. Report the blocker.

Never commit unrelated files.

## Task Completion Report

At the end report only:
- files changed
- requested implementation result
- build result
- lint result
- test result
- runtime result when applicable
- commit SHA
- commit message
- push result
- final git status

Then STOP.

## Execution-Only Agent Mode

The Product Owner and ChatGPT are the sole design, architecture, product, and
visual-review authority for this repository.

The implementation agent is an execution engine only.

The agent must NOT:

- make design decisions;
- make architecture decisions;
- perform subjective visual review;
- choose between unspecified alternatives;
- expand scope;
- anticipate future phases;
- perform "while here" cleanup;
- invent missing values;
- introduce adjacent improvements;
- decide whether a visual candidate is approved;
- suggest token changes unless explicitly requested.

The task prompt is authoritative.

If execution requires a decision that is not explicitly specified in the task:

STOP and report the exact missing decision.

Do not infer or choose a default.

Every implementation task may include a:

MANDATORY COMPLETENESS CHECKLIST

The agent must mechanically verify every checklist item before committing.

The checklist is NOT permission to discover or redesign adjacent scope.

Final reports must contain deterministic implementation facts only.

Do not report subjective statements such as:

- looks good
- visually balanced
- appropriate
- better
- cleaner
- recommended

Visual review belongs exclusively to the Product Owner and ChatGPT.

## Strict Bottom-Up Layer Order

The architectural implementation sequence is exactly:

1. Reference primitives
2. Semantic contracts
3. Theme / Density / Query resolution
4. Foundation application contracts
5. Component Tokens
6. Production structural/text primitives
7. Basic controls
8. Composites
9. Patterns
10. Shell
11. Features / Pages / migration

A higher layer must not be implemented while a genuine required lower-layer
dependency remains unresolved.

Overview/closure documentation never drives design order.

The implementation agent does not decide whether a lower dependency exists;
the task prompt supplies that decision.

## Component Token Framework

Concrete Component Token modules live at:

`src/styles/foundation/components/<component>/_tokens.scss`

with sibling `_index.scss`.

Rules:

- every concrete token module defines `@mixin base`;
- token modules emit no CSS merely by import;
- runtime grammar is:
  `--honesty-<component>[-<part>]-<property>[-<state>]`;
- variants, sizes, tones, densities, orientations and similar facets remap
  canonical token slots instead of creating combinatorial token names;
- Semantic runtime contracts are the default source;
- direct Reference colors and breakpoints are forbidden;
- permitted direct Reference exceptions are only those documented in
  `COMPONENT_TOKEN_FRAMEWORK.md`;
- Component Tokens are host-scoped, never global;
- Component implementation consumes its own Component Tokens for tunable design
  values;
- cross-component token access is forbidden;
- Feature/Page code must not override Component Tokens;
- concrete Component Token contracts remain reference-first;
- do not create a concrete Component Token contract unless the task explicitly
  supplies the Product Owner reference or reference waiver.

## Production Text Governance

- ErpText is the only public Typography Primitive.
- ErpText custom element `<erp-text>` is the sole production Typography
  authoring gateway.
- `[erpText]` native-host authoring is forbidden.
- Every rendered production literal or interpolated text node must be inside
  `<erp-text>`.
- ErpText may internally emit a native semantic child where safe.
- Parent-sensitive HTML semantics remain owned by the future structural,
  control, or composite that owns that native structure.
- No ErpHeading exists.
- No ErpLink exists.
- Future Controls and Composites render textual UI through ErpText.
- `innerHTML`, `innerText`, and `textContent` template bypasses are forbidden.
- Production inline Angular templates are forbidden.
- `br` and `wbr` contain no text and are allowed inside ErpText.
- Raw `hr` is replaced by ErpDivider.
- Code-like text introduces no monospace role.
- New Typography primitives may not be created without explicit Product Owner
  reopen.
- ErpText content is unselectable by default.
- Consumers explicitly opt into selection with the public `selectable` boolean
  input.
- Selection behavior is owned by ErpText and must not be recreated through
  feature/page CSS overrides.
- Copyable identifiers, codes, values, or long-form content explicitly opt in
  when product requirements require user selection.

## Production Icon Governance

Rules:

- `<erp-icon>` is the sole production icon-authoring gateway.
- Feature/Page/Control consumers must not use `<ng-icon>` directly.
- Feature/Page/Control consumers must not author raw `<svg>` icons.
- NgIcons and vendor icon packages are ErpIcon implementation details.
- ErpIcon registry may internally use multiple approved NgIcons packs.
- Vendor/source-pack selection is never a consumer API.
- Any `@ng-icons/*` import outside ErpIcon implementation is forbidden.
- Vendor icon names must never cross the ErpIcon semantic registry boundary.
- Application code uses semantic `ErpIconName` values only.
- ErpIcon is non-interactive; Buttons/Controls own interaction.
- Decorative icons are the default.
- Non-decorative icons require a meaningful explicit label.
- Invalid registry lookups do not silently render another semantic icon.
- Logical directional icons mirror centrally in RTL.
- ErpIcon `tone` owns semantic icon color.
- ErpIcon `variant` owns outline/filled style.
- ErpIcon `strokeWidth` owns controlled outline stroke thickness.
- `strokeWidth` has no effect for the filled variant by design.
- Raw feature/page color, fill, and stroke overrides are forbidden.
- Arbitrary pixel icon sizing is forbidden.
- All sizes must use the controlled `ErpIconSize` scale.
- The maximum V1 size is `15rem`.
- Feature/Page code must not override ErpIcon Component Tokens.
- New vendor packs may be added only inside ErpIcon implementation when required
  to satisfy an approved semantic icon contract; they must remain hidden behind
  the semantic registry and must use an approved redistribution-compatible
  license.

## Production Button Governance

- Standard action authoring uses ERP button controls.
- Feature/Page templates must not author native `<button>`.
- Feature/Page templates must not use static input button/submit/reset controls.
- Feature/Page templates must not synthesize buttons with `role="button"`.
- ErpButton owns standard text actions.
- ErpIconButton owns icon-only actions.
- ErpFab and ErpExtendedFab own FAB actions.
- Native button semantics remain internal implementation details.
- Visible button text uses ErpText.
- Icons use ErpIcon.
- Button Family owns ripple/focus/disabled/loading interaction.
- FAB positioning belongs to parent layout/composite.
- ButtonGroup/SplitButton/FabMenu belong to the Composite layer.
- Production Feature/Page uses of `ErpIconButton` and `ErpFab` must be
  composed inside `ErpTooltip` so icon-only actions have visible explanatory
  Tooltip evidence.
- Tooltip text and the control accessible label represent the same semantic
  action.
- `ErpIconButton` and `ErpFab` remain internally Tooltip-agnostic; they do
  not create hidden automatic Tooltips.
- `ErpButton` and `ErpExtendedFab` have visible labels and do not require a
  default Tooltip wrapper.
- Do not nest an automatic/internal Tooltip because Button Family owns none.

## Production Input Foundation Governance

- `ErpInputBase` is internal and non-renderable; Feature/Page code never authors
  it directly.
- `ErpInputBase` owns shared nonvisual input behavior only.
- It has no selector, template, styles, or Component Tokens.
- Concrete input controls own their own native semantics, templates, visual
  reference, and Component Tokens.
- Cross-component Component Token access remains forbidden.
- Input Family V1 uses stable `ControlValueAccessor`.
- Do not use experimental Angular Signal Forms in this Angular 21 repository
  without an explicit Product Owner architecture reopen.
- Concrete input controls register themselves as value accessors; the base does
  not provide `NG_VALUE_ACCESSOR`.
- Do not introduce a competing generic `value`/`valueChange` API in the base.
- `ErpFileSelectionBase` is the approved internal non-renderable shared base
  for File/Image selection; do not pre-create further secondary input bases
  before repeated concrete behavior proves the need.
- A Basic Control family freeze never closes the Basic Controls layer.
- Internal derived InputBase state stays protected; only approved inherited inputs form public base API.
- Concrete controls must not mutate InputBase value/focus state directly; user mutations go through the protected base helpers.

## Production Corrected Controls Governance

- Concrete Controls and Composites use approved ERP/internal semantic button
  owners; raw native button authoring is forbidden outside those internals.
- NumberBox and NumberStepper remain text-like decimal editors and must not
  reintroduce browser-native number spinners.
- ColorPicker system colors come only from the generated Foundation System
  Color Registry; copied palettes are forbidden.
- FilePicker and ImagePicker remain multi-selection controls and own no HTTP
  upload, progress, retry, server-response, or backend-policy behavior.
- SearchBox popup mode remains nonblocking, anchored, backdrop-free, and
  independent from both `ErpOverlayManager` and Tooltip popup behavior.
- IconPicker selection tiles retain fixed, tokenized, content-independent
  geometry.
- Blocking Overlay backdrop, layer, lifecycle, dismissal, blur, tone, motion,
  reduced-motion, and drawer geometry remain owned by the shared Overlay
  system; Feature/Page code must not recreate or override them.
- Field Component Tokens remain internal to the Field implementation; picker
  controls use `ErpFieldTrigger` instead of raw trigger buttons.
- DateRange staging retains anchor, preview, chronological interval, keyboard,
  disabled-date, Light/Dark, and RTL contracts.
- Corrected showcase and internal picker default copy is Arabic-first; stable
  API identifiers may remain English.
- These rules are technical regression guards only. They do not declare visual
  approval, freeze a control family, or close the Basic Controls layer.
- `ErpSearchBox` popup mode is a nonblocking anchored popup with no backdrop;
  it uses AnchoredOverlay geometry, not `ErpOverlayManager` or Tooltip.
- SearchBox popup visuals and motion remain in the SearchBox Component Token
  namespace and must not consume Overlay Component Tokens.
- SearchBox results projection remains generic; Feature/Page code owns result
  rendering without replacing the SearchBox popup container contract.

## Primary Controls Correction Program Governance

- Do not add new public control families while the Primary Controls Correction Program is active.
- Execute correction phases in the documented CR00 through CR12 order so shared lower-layer corrections land before dependent control corrections.
- Phase 10 and Phase 11 component-specific product, architecture, and visual review is deferred to a separate second review wave.
- Shared lower-layer corrections may make only the smallest mechanical Phase 10/11 compatibility updates required to keep compilation and tests green.
- Correction commits are technical checkpoints only; they do not declare visual approval, family freeze, or closure of the Basic Controls layer.

## Post-CR12 Review Wave A Governance

- Wave A is correction-only and does not authorize a new public component
  family.
- The no-new-components gate remains active throughout WA00 through WA05.
- Wave A technical checkpoints do not declare visual approval, freeze a control
  family, or close the Basic Controls layer.
- SearchBox mode changes, Glass removal, Solid/Ghost redesign, Number/Money/
  DateRange changes, CheckBox/RadioBox redesign, FabMenu/SplitButton changes,
  and deferred Phase 10/11 review remain outside Wave A.

## Post-CR12 Wave A Infrastructure Governance

- Wave A is correction-only and introduces no new public component family.
- Blocking Overlay dismissal defaults remain `false` for Escape and backdrop;
  either behavior requires explicit opt-in.
- Blocking Overlay default blur remains `low` and backdrop composition remains
  theme-sensitive.
- Overlay and Tooltip share the Foundation-owned `ErpMotionPreset` catalog;
  neither exposes arbitrary CSS-class motion APIs.
- The Lab authors exactly one top-level OverlayHost; Inputs and Overlays review
  routes render directly in its document.
- The Lab owns one persisted Light/Dark theme and full-page capture includes
  toolbar plus complete direct or embedded review content.
- FieldFrame owns shared full control-surface interaction delegation; concrete
  controls do not duplicate it.
- Wave A technical checkpoints do not declare visual approval or freeze.

## Production Blocking Overlay Governance

- `ErpOverlayManager` is the shared gateway for blocking modal and drawer surfaces.
- The application shell renders exactly one `ErpOverlayHost`; controls, Features, and Pages never create additional hosts.
- `ErpOverlayRef` instances are manager-owned and are injected into dynamic overlay content.
- Blocking overlays own stack order, backdrop, scroll lock, background inertness, focus trap, initial focus, focus restoration, and top-only dismissal.
- Modal and drawer surfaces require an accessible name.
- Drawer start/end positions are logical and RTL-aware.
- Feature/Page code must not recreate blocking backdrops, blocking z-index systems, or focus/scroll/inert controllers.
- Tooltip remains on its nonblocking anchored-overlay architecture and does not use `ErpOverlayManager`.
- `ErpFieldFeedback` remains in document flow and never uses `ErpOverlayManager`.
- Overlay-backed pickers use `ErpOverlayManager`; no third-party overlay dependency is introduced.

## Production Field Family Governance

- `ErpInputBase V1` is frozen with exactly `label`, `name`, `form`, and
  `disabled` as inherited public inputs.
- `ErpFieldBase`, `ErpFieldFrame`, `ErpFieldTrigger`, and `ErpFieldFeedback` are
  internal Field Family infrastructure; Feature/Page code never authors them
  directly.
- Concrete picker controls use `ErpFieldTrigger` for whole-field button
  semantics and do not author independent raw trigger buttons.
- Concrete Controls and Composites do not author raw native buttons outside
  approved internal semantic primitive roots. Legitimate native input,
  textarea, and file-input elements remain allowed in their owning controls.
- `ErpFieldFeedback` is an in-flow field message surface. It is not Tooltip,
  Popover, Overlay, a portal client, or an `ErpOverlayManager` client.
- Field tone is normal brand identity; field status is semantic state. Active
  status visuals take precedence without replacing the configured tone.
- Field implementations use genuine semantic labels. Placeholder never replaces
  the label.
- The Product Owner explicitly waives an external visual reference for the
  standard Field Family appearance; only the approved standard contract and
  frozen Honesty ERP token/theme language may be used.
- The glass-field visual reference is:
  `https://cdn.dribbble.com/userupload/45261316/file/82db561b5ced954d82f92fab7b3d05f0.jpg?resize=752x&vertical=center`.
- `ErpNumberStepper` is the canonical scalar increment/decrement control and is
  distinct from `ErpRangeSlider`.
- The NumberStepper visual reference is:
  `https://cdn.dribbble.com/userupload/28671846/file/original-dcafb540346e260c39fa27f8d9ff90e1.gif`.
- `ErpRangeSlider` is the canonical two-thumb interval control. Alternate
  scalar/range public control names are not part of V1.
- The RangeSlider visual reference is:
  `https://cdn.dribbble.com/userupload/44001748/file/original-18b5e92b66ba47eabdb4cd8ce03dde2e.png?resize=1024x768&vertical=center`.
- Date, time, date-time, date-range, color, icon, item, and combo selection
  controls are overlay-backed Composites even when their public names contain
  `Box`.
- File and image pickers are multi-selection Basic Controls backed by the
  internal non-renderable `ErpFileSelectionBase`; their CVA value is immutable
  `readonly File[]`.
- File/Image local accept, size, and count policy is a usability boundary only.
  Backend content/MIME, size, count, malware/security, and business validation
  remains authoritative.
- File/Image controls own no HTTP upload, progress, retry, or server-response
  behavior; browser-native filesystem selection remains the security boundary.
- A Field Family or Basic Control checkpoint does not close or freeze the Basic
  Controls layer.
- Specialized parser controls use their built-in final-value pattern when the
  public `pattern` override is null; invalid override regex is
  configuration-invalid.
- Progressive domain drafts stay separate from committed CVA values. Invalid
  final-domain values never publish.
- NumberBox and NumberStepper use ERP-owned text-like decimal editing and must
  not expose browser-native number spinners.
- CheckBox and RadioBox preserve authoritative native input semantics behind
  fixed custom geometry; selected, unselected, and indeterminate states must
  not change outer dimensions or cause layout shift.
- CheckBox marks use semantic ErpIcon `check` / `minus`; raw SVG marks are
  forbidden. RadioBox owns one centered inner dot.
- Temporal controls keep ASCII canonical ISO CVA values while defaulting
  display/picker locale and visible actions to the shared Arabic contract.
- DateRange owns one chronological staged interval with pointer and keyboard
  preview; backward selection must not discard the original anchor.
- Blocking temporal picker customization is limited to the typed Overlay
  behavior subset and must not expose internal Overlay wiring.
- Color, icon, item, and combo pickers expose the same typed blocking Overlay
  behavior subset and stage values until explicit confirmation.
- ColorPicker system values preserve generated Foundation System Color token
  identity; production code must not copy or hand-maintain the system palette.
- Concrete selection-picker content uses the internal `ErpSelectionTile` for
  native selectable-button semantics and must not author raw native buttons.
- IconPicker selection geometry is fixed and content-independent; semantic icon
  names are exposed through accessible labels and Tooltips.

## Production Overlay Governance

- Blocking modal/drawer selection surfaces use the shared `ErpOverlayManager`,
  `ErpOverlayRef`, and exactly one application-level `ErpOverlayHost`.
- Do not add Angular CDK, Angular Material, or a third-party overlay dependency.
- Blocking overlays own stack order, backdrop, backdrop blur, scroll lock,
  background inertness, focus trapping/restoration, dismissal policy, nested
  stacking, reduced motion, responsive sizing, and RTL logical drawer placement.
- Tooltip continues to use its existing nonblocking anchored-overlay
  architecture and must not migrate to `ErpOverlayManager`.
- `ErpFieldFeedback` remains in normal document flow and must never use
  Tooltip, anchored-overlay, or `ErpOverlayManager`.
- Feature/Page code must not instantiate internal overlay host/ref
  infrastructure or recreate custom blocking backdrops and z-index systems.
- Overlay-backed pickers stage selection and commit only on confirmation;
  cancel or dismissal does not mutate the CVA value.

## Production Motion and Overlay Frame Governance

- `ErpMotionPreset` is the sole shared Overlay/Tooltip motion vocabulary.
- Animate.css is internal to the Foundation motion adapter; vendor classes and
  raw vendor effect names are forbidden outside that adapter and its tests.
- Overlay and Tooltip use the shared adapter for animation start, cancellation,
  completion, cleanup, direction mapping, and reduced-motion completion.
- Every user-facing blocking Modal and Drawer uses the shared
  `ErpOverlayFrame` Header/Body/Footer contract.
- Frame Header data requires a nonblank title, nonblank subtitle, and semantic
  ErpIcon name; the title supplies the dialog accessible name.
- Frame close uses a Tooltip-wrapped ErpIconButton and always dismisses with
  `close-action`.
- Frame Footer uses ERP Buttons for one developer-configured ordered action
  collection with stable IDs, `primary | secondary | utility` roles, logical
  `start | end` placement, and reactive disabled/loading state through
  `ErpOverlayRef`.
- Frame Body is the primary scroll region; blocking picker bodies must not
  recreate duplicate confirm/cancel footer chrome.
- `ErpSplitButton` is the only temporary `openLegacyCompactMenu` exception
  pending its deferred Phase 10/11 migration away from blocking modal
  semantics. No new exception is allowed.
- These technical rules do not declare visual approval or start Wave B.

## Historical Product Owner Page-by-Page Review Governance

This historical execution/review snapshot is recorded in:

src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md

The latest locally verified technical checkpoint is:

`b1b20585adcb272f17835ef8182935353a67d243` — `fix(tooling): close remaining zero-warning gaps`

It includes the single-App-theme correction from
`320f66879036530dbfc509bd587724f799ba62c6` and the Windows-safe build runner
from `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`.

Local verification is complete and fully green:

- every lint/governance gate passed;
- Angular lint passed;
- 87/87 test files passed;
- 618/618 tests passed;
- `typecheck:app` passed;
- `typecheck:spec` passed;
- production `build:clean` completed with zero Angular warnings;
- `Zero-warning build gate: PASS`.

This did not declare Product Owner visual approval or a frozen family. Its
then-authorized action was Product Owner runtime/visual re-review; the current
authorization is defined near the top of this file.

Durable decisions from that review:

- The App root is the sole runtime theme authority. Exactly one application binding,
  `[attr.data-theme]="theme()"`, belongs in `app.html`; the `App` class owns
  the corresponding `theme` state and the top-bar `toggleTheme()` action.
- Every routed page, production component, review internal, popup, and blocking
  overlay inherits the active App theme. They must not author/bind/document a
  local `data-theme`, inspect ancestor theme attributes, persist a competing
  theme setting, or pass Light/Dark through component/overlay data.
- Preferences intentionally contain no Theme setting. A legacy persisted
  `theme` key may only be removed during one-time storage migration while
  preserving all remaining preferences; it is never rehydrated as runtime state.
- The central Foundation theme mapping files under
  `src/styles/foundation/themes/_light.scss` and `_dark.scss` remain valid
  system implementation: they define semantic token resolutions and are not
  page/component theme authorities.
- `theme-authority:check` is a mandatory lint gate and prevents local theme
  authority from being reintroduced below App.
- Every routed Design Lab page template resolved from `app.routes.ts` authors `erp-*` tags only. Native HTML/SVG/form semantics needed by a page are owned inside approved ERP primitives/controls or Design-Lab-only `erp-review-*` internals; route templates never author native tags directly. `erp-review-*` internals are not public product component families.
- Tooltip defaults to slide-up entry and visually slide-up exit. Tooltip anchored geometry must remain stable while an inner layer animates.
- SearchBox popup remains nonblocking/anchored and must not be narrower than its field when viewport space permits or leave invisible pointer-blocking top-layer state after dismissal.
- FieldFeedback below a field always points its caret physically upward in both RTL and LTR.
- Existing Preferences are the source of truth for Latin/Arabic-Indic digits, numeric separators, money display, and applicable temporal display.
- File/Image selected rows own tokenized hover and focus-within feedback only; no upload/backend authority is added.
- Blocking Overlay implicit initial focus must not default to the close action.
- Overlay Frame Header owns the approved title/subtitle/icon hierarchy.
- Overlay Frame Footer is one ordered typed action surface, not a fixed primary/secondary pair and not duplicate body action rows.
- Temporal Today/Clear and Selection Clear Selected are footer actions.
- System color swatches retain a theme-aware semantic border.
- IconPicker must not create a false active outline on open and uses one roving-focus option model.
- Fixed equal tiles are for icon/color grids; ItemPicker/ComboBox textual options use vertical list-row presentation.
- ComboBox opens on normal pointer interaction, ArrowDown, and typing while preserving the entered query.
- ErpContainer production width values remain full, 48rem, 75rem, and 90rem; current correction changed showcase evidence, not those contracts.
- ErpCheckBox V5 is Product Owner visually accepted. ErpRadioBox was
  subsequently authorized and implemented using the accepted CheckBox-family
  visual language adapted to native radio semantics. The historical statement
  that EmptyState and Select were unopened is superseded.
- Unrelated visual/style refactoring remains deferred, but local Light/Dark theme authority cleanup is complete and must not be deferred or reintroduced.
- No later unreviewed showcase family or public component family was authorized
  by that historical checkpoint alone; later explicit Product Owner
  authorizations govern current scope.

The first-round correction checkpoint is a technical implementation candidate, not Product Owner visual approval. Do not declare family freeze, Basic Controls closure, or Wave B from it.


## Zero-Warning Verification Governance

Zero-warning verification is mandatory for review/tooling checkpoints.

Before reporting success, run:

`npm run verify:clean`

That command must cover:

- all repository lint/governance checks;
- the complete unit-test suite;
- `tsc -p tsconfig.app.json --noEmit`;
- `tsc -p tsconfig.spec.json --noEmit`;
- a production Angular build that fails when warning markers are emitted.

Do not raise component-style budgets merely to silence warnings. Split/refactor
the owning styles where practical and keep the approved 4kB warning / 8kB error
component-style thresholds unless the Product Owner explicitly reopens them.

Do not suppress CommonJS warnings with an allow-list when an owned ESM entry is
available and verified.


## Cross-Platform Verification Runner

The zero-warning build wrapper must remain cross-platform.

- Do not spawn `npm.cmd` directly with `shell: false` on Windows.
- Prefer `process.execPath` + `process.env.npm_execpath` to invoke npm
  lifecycle commands from Node verification scripts.
- A Windows `ComSpec` fallback is acceptable only when `npm_execpath` is
  unavailable.
- The wrapper must capture stdout/stderr, propagate non-zero build exits, and
  fail on Angular warning markers.
- `npm run build:clean:self-test` must keep covering warning detection,
  false-positive rejection, and invocation resolution.


## Build Warning Detection

Zero-warning verification must inspect normalized build output.

- Strip ANSI SGR escape sequences before warning matching.
- Angular component-style budget and optimization warnings remain
  release-blocking even when the CLI colors their output.
- Do not raise the approved 4 kB warning / 8 kB error component-style budgets
  merely to make the build green. Split/refactor the owning styles instead.
- The zero-warning wrapper self-test must include an ANSI-colored Angular
  warning example so a colored warning can never produce a false PASS.


## Historical Fully Green Local Verification

The current technical source checkpoint
`b1b20585adcb272f17835ef8182935353a67d243` is fully green in the Product
Owner's Windows workspace.

The canonical `npm run verify:clean` completed successfully through all
lint/governance checks, 87 test files / 618 tests, both TypeScript no-emit
checks, and a production build with no Angular warnings.

The zero-warning wrapper also passed its dedicated self-test and standalone
`build:clean` execution.

Do not repeat that corrective implementation solely for technical gating unless
a new regression is observed. The then-authorized work was Product Owner
page-by-page visual/runtime review; the current scope is defined above.


## Persistent Handoff Synchronization

The following files are mandatory persistent project-state artifacts:

- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `AGENTS.md`
- `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`

After every Product Owner decision, implementation result, external review,
verification result, blocker, or next-step authorization, synchronize the
relevant state before issuing the next implementation task.

Do not leave a new Product Owner decision only in chat history or only inside an
implementation prompt.

`NEW_CHAT_HANDOFF.md` is the canonical conversational recovery document for a
new ChatGPT thread. It must record the current Git checkpoint, accepted
decisions, deferred scope, open findings, and exact next authorized action.


## Historical No-Iframe Design Lab Direction — implemented

The Product Owner has decided that the Design Lab must become a normal
single-document Angular application with no iframe preview architecture.

That historical authorized work required review and removal of:

- the preview iframe from `app.html`;
- embedded-preview query flags such as `labPreview`;
- iframe-specific theme propagation such as `labTheme`;
- embedded/direct dual rendering modes that exist only because of the iframe;
- iframe-specific screenshot composition and document traversal.

The Product Owner would prefer to retain the Desktop / Tablet / Mobile controls
and screenshot feature only if they can be implemented truthfully and cleanly
without an iframe.

Do not fake viewport-media-query behavior by merely resizing a container and
calling that a real mobile/tablet viewport.

If true responsive viewport simulation cannot be preserved without iframe,
remove the Desktop / Tablet / Mobile simulation controls.

If screenshot capture cannot be preserved cleanly without iframe, remove the
screenshot feature.

Inputs and Overlays must no longer be special direct-review exceptions. After
the iframe architecture is removed, all routes use the same direct
`router-outlet` rendering model.

This historical decision was subsequently implemented; it is not the current
execution action.


## No-Iframe Design Lab Implementation Status — 2026-09-29

The Product Owner-authorized no-iframe correction has been implemented in source:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a` removes the iframe preview architecture;
- `d703ef0c8f47264902ca55b902c1488f99b56bf9` normalizes the resulting direct shell markup.

Current App-shell contract:
- one normal single-document Angular App;
- one direct `router-outlet` for every route;
- no embedded/direct dual mode;
- no `labPreview` or iframe `labTheme` query propagation;
- Inputs/Overlays have no rendering exception;
- Desktop/Tablet/Mobile preview controls are removed rather than faking real viewport media-query behavior with container resizing;
- Screenshot remains as direct capture of the App capture root and its filename includes current `light|dark` theme;
- exactly one App-level OverlayHost remains;
- App root remains the only runtime Light/Dark authority.

Verification warning:
- last fully verified source is still `b1b20585adcb272f17835ef8182935353a67d243`;
- the no-iframe source must not be called fully clean until a fresh `npm run verify:clean` passes.


## 2026-09-29 — Tooltip V1 blocking Product Owner finding

Product Owner has blocked further page-by-page review until Tooltip V1 positioning,
arrow, motion, fallback, scroll tracking, and layer behavior are corrected and
runtime re-reviewed.

Source review at `404b6393245707a922ca8da69c2cbc0e7a9708dd` confirmed:
- Tooltip arrow is rendered outside `.erp-tooltip__motion`, while Animate.css
  transforms only the motion layer; body and arrow can visually separate during motion.
- shared anchored-overlay geometry currently considers only preferred and opposite
  placements; perpendicular fallback is missing.
- Tooltip tokens currently use 16x8 arrow geometry for top/bottom and 8x4 for
  side placements; Product Owner now requires one canonical arrow size in every direction.
- scroll/resize/visualViewport/ResizeObserver reposition infrastructure exists,
  but acceptance coverage must prove actual trigger tracking and arrow alignment.
- Tooltip consumes the semantic overlay layer token; explicit layer/z-index
  acceptance coverage is required.
- the Design Lab motion selector horizontally overflows/clips, reducing reviewability.

Required correction contract:
1. fixed, untransformed geometry surface owns anchor/collision/layer;
2. one animated visual assembly contains BOTH tooltip body and arrow;
3. authored placement is preferred and is used whenever it fits;
4. fallback order is preferred -> opposite -> perpendicular candidates by room;
5. if none fully fits, select deterministically and clamp to visual viewport;
6. arrow stays attached, points to the trigger, follows resolved placement, and
   uses one canonical base/depth size for all directions;
7. reposition remains correct during scroll/resize and RTL/LTR;
8. no unrelated component redesign.

Tooltip V1 status: BLOCKED. Do not continue to another review page until the
bounded correction is implemented, verified, and Product Owner re-reviews it.


## Tooltip Positioning Contract — implemented 2026-09-29

Product Owner Tooltip law is now implemented and recorded in:
`src/app/controls/tooltip/TOOLTIP_POSITIONING_POLICY_V1.md`.

System defaults:
- Tooltip enter animation: `zoom`;
- Tooltip exit animation: `zoom`;
- explicit per-instance developer overrides remain allowed.

Mandatory Tooltip invariants:
- fixed outer geometry surface is never animation-transformed;
- body + arrow animate together in one visual assembly;
- preferred placement is preserved while it fits;
- fallback order covers opposite and perpendicular physical placements before final clamp;
- arrow uses one canonical geometry across all directions and follows resolved placement/trigger center;
- reposition reacts to viewport/window scroll/resize and anchor/surface resize;
- Tooltip consumes the semantic overlay layer.

Implementation checkpoint:
`7a0a14f090ee38df3ea4adc02255856d89b6c71a`

Do not declare this Tooltip correction Fully Green until a fresh `npm run verify:clean` passes.
Do not proceed to later page review until Product Owner re-reviews Tooltip runtime evidence.

  
## No-Iframe Overlay Governance Alignment — 2026-09-29

The Overlay governance checker must enforce the current single-document Lab
architecture and must never require the superseded iframe architecture.

Tooling correction:
`a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`

The App-shell Overlay gate now requires one direct router-outlet and rejects
iframe-era query/state/rendering/screenshot contracts. A fresh
`npm run verify:clean` is mandatory before the current source is called Fully
Green.


## Verify:clean lint follow-up — 2026-09-29

The post-Tooltip/no-iframe verification reached `ng lint` after all governance checks passed.
One test-only lint violation was found and corrected:

`3eb993e64616362bf920284e37b5005d412fd531`
`fix(test): satisfy array-type lint rule`

The change only converts an `Array<T>` annotation to `T[]` in
`anchored-overlay-controller.spec.ts`. No runtime behavior changed.

A fresh full `npm run verify:clean` is still mandatory before declaring a new Fully Green source checkpoint.


## Fully Green checkpoint after Tooltip correction — 2026-09-29

Canonical Product Owner local verification completed successfully from:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting commit in that checkout:
`3eb993e64616362bf920284e37b5005d412fd531`.

`npm run verify:clean` passed end-to-end:
- all governance + Angular lint;
- 87/87 test files;
- 615/615 tests;
- app TypeScript no-emit gate;
- spec TypeScript no-emit gate;
- zero-warning production build.

This is the current Fully Green technical checkpoint.

Do not confuse technical green with Product Owner visual approval.
Tooltip V1 remains the active visual-review blocker until Product Owner runtime
re-review accepts the corrected anchored behavior.


## Tooltip cross-axis centering law — 2026-09-29

Product Owner requires exact Tooltip arrow centering on the trigger cross-axis.

Implementation checkpoint:
`632f45a5fb7b42eefa09da0d2c8a20c0f520244b`

Mandatory invariants:
- top/bottom: arrow uses the geometry center as physical `left` and
  `translateX(-50%)`;
- left/right: arrow uses the geometry center as physical `top` and
  `translateY(-50%)`;
- safe inset remains symmetric;
- when the full configured inset cannot fit, reduce it symmetrically instead of
  shifting the arrow away from trigger center.

Do not call this correction Fully Green until a new `npm run verify:clean`
passes. Tooltip remains the Product Owner page-review blocker.


## Tooltip coordinate-origin invariant — 2026-09-29

After moving the arrow inside the animated motion assembly, Tooltip geometry and
visual coordinates must still share one origin.

Mandatory rule:
- `.erp-tooltip__surface` is the fixed geometry coordinate space and must have
  explicit `padding: 0`;
- arrow coordinates calculated against that surface are applied inside the
  motion assembly, so any outer padding would create a systematic cross-axis
  offset.

Source checkpoint:
`84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`.

Governance and unit tests enforce this invariant.

Latest Fully Green verified checkout before this correction:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`.

Fresh `npm run verify:clean` is required for the new source.


## Inputs Product Owner review state — 2026-09-29

Inputs page has a blocking Product Owner review documented in:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Do not treat current SearchBox showcase evidence as a complete production search
contract. Required future correction includes three search modes, functional
filter/selection, query/selection separation, exact anchored width, explicit
close, non-blocking focus behavior, and correct modal/dropdown semantics.

Selection/temporal Confirm must be disabled until valid staged selection while
Cancel/Close remain enabled.

No Inputs source correction has been implemented by this documentation update.


## Inputs correction implementation state — 2026-09-29

The Product Owner-authorized Inputs correction is implemented at source
checkpoint:

`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

Key contracts:
- SearchBox modes are `dropdown | modal | inline`;
- dropdown search owns transient query + selectable stable-value results;
- modal search reuses OverlayManager/SelectionPicker;
- dropdown width follows the complete Field control width;
- Confirm in selection/temporal overlays is disabled and handler-guarded until
  staged state is valid;
- disabled/loading Overlay frame actions cannot dispatch;
- Time/DateTime own Now; DateRange owns previous/next week/month presets;
- MoneyBox per-instance digitSet override falls back to shared Preferences.

Current source is NOT Fully Green until a new full `npm run verify:clean` passes.
Latest prior Fully Green checkout remains
`50ae8e5f9f9cc537435217a644548c10bd097ecb`.


## SearchBox result primitive governance — 2026-09-29

Concrete SearchBox must not render native result buttons directly.

Current required implementation:
- SearchBox result host = `ErpSelectionTile`;
- `presentation="list"`;
- SelectionTile owns native option button, aria-selected, disabled state, and
  focus method;
- SearchBox may own filtering, active index, and result activation, but must not
  reimplement native button roots.

Correction checkpoint:
`cf91967291961037dd7f35d0e825fc4fb2da8312`.

Fresh full `npm run verify:clean` required.


## Inputs staged-action test discipline — 2026-09-29

Tests that perform two separate user interactions across a staged Overlay state
change must run fixture change detection between them before reading/clicking the
updated frame action DOM.

Native keyboard events intended to exercise listeners on a component host must
use browser-equivalent bubbling.

Verification follow-up checkpoint:
`92840de9c670edd32b05c1485f50c2e61e68fead`.

No runtime behavior changed in that commit.


## Direct-route App test isolation — 2026-09-29

Do not aggregate multiple lazy-route full renders into one default-timeout test
when the same contract can be proven independently per route.

Current test-only correction:
`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

Assertions are unchanged; timeout limits remain unchanged; production source is
unchanged.


## SearchBox close/top-layer invariant — 2026-09-29

SearchBox dropdown visual closure is not sufficient.

Mandatory close invariant:
- native Popover/top layer must be released immediately when close begins;
- invisible leaving surfaces must be inert + pointer-noninteractive;
- open-stack/dismissal listeners release immediately;
- no delayed timer may restore trigger focus;
- Selection/Close/Escape focus restoration, when requested, occurs immediately;
- outside dismissal does not restore focus;
- close timer may perform bookkeeping only.

Current source:
`4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Inputs SearchBox review instances use inherited `clearable`.
Fresh full verification is required.


## Native Popover display invariant — 2026-09-29

Never set `display` on the base rule of a native Popover surface.

SearchBox rule:
- forbidden: `.search-box__popup { display:grid; }`
- required:
  `.search-box__popup:popover-open { display:grid; }`

Reason:
closed native Popover visibility depends on browser-owned `display:none`.
Overriding it can create an invisible but hit-testable fixed surface.

Root-cause checkpoint:
`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Governance enforces both the prohibition and required open-state layout rule.


## Additional Inputs laws — 2026-09-29

- Never erase/revert invalid domain-text drafts merely because validation fails.
- Field-family clearable default is intended to be on; developer may opt out.
- Ghost/Text/Underline require token-owned hover discoverability.
- RangeSlider native thumb and visual fill coordinates must use the same global
  min/max domain; crossing is enforced by logic, not by changing native min/max.
- Active RangeSlider thumb value Tooltip follows the real thumb position.
- Temporal Now must reveal selected time.
- DateRange rolling presets use exact inclusive 7/30-day windows.
- ColorPicker instance mode is fixed: system or free.
- ItemPicker is select-like; ComboBox is editable type-to-filter.


## ERP Input validation substrate — 2026-09-29

Authoritative contract:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Do not implement independent validation-state/error arrays per concrete control.

Common public semantics:
- state: null / empty / no-selection / invalid-entry / valid-entry;
- valid boolean;
- readonly string errors;
- structured stable-code validation issues.

Validation must use current visible draft where applicable and must not destroy
invalid editable user input.

Constraint configuration stays typed by domain while feeding one common
validation engine.


## Expanded Inputs implementation state — 2026-09-30

The unified validation architecture and the Product Owner's expanded Inputs
correction set are implemented on current main:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Mandatory laws now enforced:
- one validation source of truth for component + Angular Forms;
- exactly one NG_VALIDATORS bridge per CVA ERP input;
- invalid editable drafts are non-destructive;
- clearable defaults on for Field-family controls, opt-out remains authoritative;
- lightweight variants have token-owned hover discoverability;
- RangeSlider thumbs/rail/tooltips share one global thumb-center coordinate system;
- active RangeSlider Tooltip must request reposition as its anchor moves;
- temporal presets are rolling inclusive 7/30-day windows;
- ColorPicker mode is fixed per instance;
- ItemPicker and ComboBox remain distinct interaction contracts.

Do not claim Fully Green until a fresh full `npm run verify:clean` passes.


<!-- CHATGPT_CONTINUITY_SYNC_START -->
## 2026-09-30 — ChatGPT continuity sync

Live GitHub `main` was re-read and externally synchronized from:
`a28a0fffa01ea1035d0dce47910922b30d8f06c0`
(`docs(inputs): record expanded implementation checkpoint`).

Latest bounded Inputs implementation checkpoint under that head:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Current continuation state:
- expanded Inputs corrections + unified validation are implemented in source/tests/governance;
- current source is still **verification pending**;
- Inputs remains Product Owner **BLOCKED** until technical verification and runtime/Light/Dark re-review;
- exact next technical gate is a fresh full `npm run verify:clean` from current `main`;
- only demonstrated verification failures may reopen implementation;
- after technical green, Product Owner runtime/Light/Dark Inputs review is the next product gate;
- the no-iframe single-document App shell is already implemented and must not regress.

This synchronization is documentation/state only; it makes no runtime or visual
approval claim.

Continuity rule for subsequent project turns: update the applicable persistent
handoff/review/roadmap documents whenever the turn changes a decision, scope,
implementation state, blocker, verification result, or Product Owner finding.
<!-- CHATGPT_CONTINUITY_SYNC_END -->


<!-- CHATGPT_LOCAL_VERIFY_SYNC_START -->
## 2026-10-01 — latest Inputs verification rerun: one URL-regex lint escape corrected

Product Owner pulled and verified source at:
`dc63c08ea88e29c5fb4d78743761325b9c4a9c63`
and ran the complete canonical gate:
`npm run verify:clean`.

Observed progress:
- Single App theme authority PASS;
- routed-page ERP-only authoring PASS;
- Component Token framework PASS;
- system-color registry PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpOverlay PASS;
- Angular lint then stopped on exactly one ESLint error.

Exact failure:
`src/app/controls/input-family/domain-validation.ts:72:37`
`no-useless-escape`

The progressive URL character-class regex escaped a terminal hyphen even though
that position does not require escaping.

Bounded correction:
- `9315691c9579a324990a56d928e4e22d504111a4`
  `fix(inputs): remove redundant URL regex escape`;
- only the redundant escape was removed;
- runtime URL admission semantics are unchanged.

Pre-rerun checks after correction:
- zero remaining escaped-hyphen occurrences in the domain-validation source;
- ErpField governance JavaScript syntax compilation PASS;
- complete ErpField governance internal self-test PASS;
- direct URL semantic smoke check confirms required forms such as
  `example.com`, `www.example.com`, HTTP/HTTPS variants, `.org`, `.net`,
  and `.ai` are valid while `http://www.s`, `example.c`, and `localhost`
  remain invalid.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`

Inputs remains Product Owner BLOCKED pending a fresh technical green result and
runtime/visual acceptance.
<!-- CHATGPT_LOCAL_VERIFY_SYNC_END -->


<!-- CONTINUITY_MAINTENANCE_PROTOCOL_START -->
## Persistent continuity maintenance

Every substantive execution cycle must synchronize persistent project state
before handoff.

A substantive cycle includes implementation, Product Owner decisions/findings,
blockers/root-cause corrections, verification results, scope/reference changes,
visual acceptance/rejection, or stage transitions.

Mandatory synchronized files:

- `CURRENT_EXECUTION_STATE.md`
- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Also update when relevant:

- `DECISIONS_AND_CONSTRAINTS.md`
- `GIT_CHECKPOINTS.md`
- active batch/component/family/system contracts.

Do not leave the newest state or decision only in chat/report text.
Do not hand off a substantive implementation checkpoint until implementation,
tests/governance, current state, roadmap/stage, and Product Owner findings are
synchronized.
<!-- CONTINUITY_MAINTENANCE_PROTOCOL_END -->

<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_START -->
## RadioBox accepted-family implementation

Product Owner accepted CheckBox V5 visually and authorized immediate RadioBox
implementation with the same family language adapted to native radio semantics.

Current RadioBox contract:

- `radio | tile` modes;
- `outline | filled | soft` variants;
- 18/22/28/36px sm/md/lg/xl geometry;
- higher shared Field sizes alias xl;
- optional description;
- read-only interaction guard;
- standalone text suppression with accessible label preservation;
- stable circular indicator + centered dot;
- no Switch and no indeterminate;
- Tile single-select composition with RadioGroup.

RadioGroup retains `string | null` CVA value, coordinated names, declared
options, disabled-option exclusion, Arrow navigation, and focus transfer while
passing through bounded RadioBox visual facets.

Fresh canonical verification is pending.
<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_END -->

<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_START -->
## 2026-10-04 — deterministic Vitest worker budget

Canonical unit tests are jsdom-heavy and include several intentionally broad
showcase/motion suites.

After the RadioBox review expansion, the Product Owner's full run demonstrated
cross-suite timeout contention while all governance/lint and RadioBox-specific
tests passed.

Decision:

- Angular unit tests load `vitest-base.config.mts`;
- Vitest `maxWorkers` is capped at 4;
- default per-test timeouts are not increased to hide performance problems;
- retries are not introduced;
- a future change to this worker budget requires a demonstrated test-execution
  reason rather than convenience.

This is test execution scheduling only; it changes no runtime product behavior.
<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_END -->

<!-- CHATGPT_EMPTY_STATE_EXACT_V1_2026_10_04_START -->
## 2026-10-04 — ErpEmptyState exact-reference V1 opened and implemented

Product Owner exact reference:

`erp-empty-state.html`

SHA-256:

`935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048`

Binding contract:

`src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`

Decision:

- preserve all reference EmptyState scenarios, visual geometry, SVG
  illustrations, content regions, action hierarchy, customization, motion,
  speed/replay, and reduced-motion behavior;
- replace the reference palette entirely with Honesty ERP Semantic -> Component
  Tokens;
- standard actions use `ErpButton`;
- production text uses `ErpText`;
- App remains the only Light/Dark authority;
- EmptyState inherits RTL/LTR instead of owning a local direction API;
- dedicated review route: `/controls/empty-states`;
- dedicated governance and tests protect the exact-reference contract.

Current status: implementation candidate complete; fresh
`npm run verify:clean` pending.

`ErpSelect` remains unopened.
<!-- CHATGPT_EMPTY_STATE_EXACT_V1_2026_10_04_END -->

<!-- CHATGPT_SYSTEM_FONT_AUTHORITY_RESTORED_2026_10_04_START -->
## 2026-10-04 — Honesty ERP system font authority restored

Product Owner finding:

Routed/system pages were no longer consistently rendering with the approved
Honesty ERP typography families.

Root cause:

- Font assets and Semantic Typography tokens were still correct;
- approved families remain:
  - Arabic: `Tajawal`;
  - Latin: `Space Grotesk`;
  - Mixed UI: `Space Grotesk, Tajawal`;
- legacy application/page CSS still imposed OS-font stacks such as
  `system-ui`, `-apple-system`, and `Segoe UI`;
- native form controls that use `font: inherit` could therefore inherit the
  wrong root stack even when adjacent `ErpText` labels were correct.

Correction:

- global `html/body` default font authority is now
  `var(--honesty-type-family-ui)`;
- native `button/input/select/textarea` inherit the approved UI stack by
  default;
- Design Lab application chrome now uses the UI typography token;
- legacy Foundation routed roots using OS stacks were migrated to the UI token:
  Colors, Status Hues, Themes, Feedback Colors, Typography, and Spacing;
- newer routed roots already using Honesty ERP typography tokens remain
  unchanged;
- ErpText family-specific contracts remain unchanged:
  `ui | arabic | latin | inherit`;
- locally hosted Tajawal and Space Grotesk font assets remain the only approved
  product UI families.

Governance:

`erp-text:check` now validates the global font authority and rejects OS-font
stack fragments from application SCSS.

Forbidden application font bypass examples include:

- `system-ui`;
- `-apple-system`;
- `BlinkMacSystemFont`;
- `Segoe UI`;
- `Tahoma`;
- `Geneva`;
- `Verdana`;
- `Arial`.

This correction is cross-cutting typography infrastructure and does not change
the active EmptyState exact-reference product contract.

Fresh canonical verification remains required:

`npm run verify:clean`
<!-- CHATGPT_SYSTEM_FONT_AUTHORITY_RESTORED_2026_10_04_END -->

## Accelerated Core Component Wave Governance

- The Product Owner authorizes one grouped-review implementation wave containing exactly ErpSelect, ErpStatusBadge, ErpAlert, ErpSkeleton, ErpAvatar, ErpTabs, ErpTable, and ErpPagination.
- Product Owner visual review is grouped after the eight-component wave; technical green does not equal visual acceptance and later findings may reopen any component.
- ErpEmptyState is temporarily accepted only for accelerated continuation and is not visually frozen.
- ErpSelect follows the supplied erp-select.html reference while remaining distinct from ComboBox, SearchBox, and ItemPicker ownership.
- Components in this wave without an external reference use the explicit Product Owner accelerated-wave waiver and the existing Honesty ERP visual language.
- Forms, SmartTable, Shell, and any ninth component remain outside this wave.

## Accelerated Data/Table Wave Governance — completed technical checkpoint

- Phase A hardening of the accelerated core batch must remain green before Phase B data/table implementation.
- Phase B contains exactly ErpSortHeader, ErpColumnChooser, ErpFilterBar, ErpFilterDrawer, ErpTableToolbar, ErpBulkActionBar, ErpViewSwitcher, and ErpSmartTable.
- ErpSmartTable orchestrates approved lower controls; it owns no HTTP, server transport, domain permissions, or business rules.
- ErpTable rich cells use the keyed erpTableCell contract; SmartTable must not create a competing cell renderer.
- Product Owner visual review is grouped after Phase B. Technical green does not equal visual acceptance.
- The Data/Table batch is technically complete; Product Owner visual acceptance
  remains pending.
- Forms were unopened during that historical batch. The newer explicit
  authorization above now opens exactly the six Forms Composition owners while
  SmartTable-adjacent application patterns, Shell, and unlisted components
  remain unopened.
