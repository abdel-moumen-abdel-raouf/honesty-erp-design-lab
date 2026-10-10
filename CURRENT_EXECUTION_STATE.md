# CURRENT EXECUTION STATE — HONESTY ERP Design Lab

## Current checkpoint — numeric interaction inputs internal review

`ErpNumberStepper` and `ErpRangeSlider` completed internal browser review as
explicitly labeled original Honesty ERP candidates. Production contracts and
defaults are unchanged. Generated Workbench fixtures now provide meaningful
Arabic ERP values, constraints, and helper copy; increment/decrement and range
keyboard changes update the public CVA state and visible output evidence. The
four-scenario audit passes 36/36 assertions with one target per route, complete
live controls, actual RTL/LTR computation, zero overflow, broken images,
errors, or warnings. Evidence is under
`docs/review-evidence/erp-numeric-inputs/v1-internal-review/`. Canonical
verification passes 128/128 files and 830/830 tests, both typechecks, all
governance/lint, and the zero-warning 418.32 kB / 92.89 kB build. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Next: `ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, and `ErpDateRangeBox`.

## Current checkpoint — foundational text-like field family internal review

`ErpTextBox`, `ErpTextAreaBox`, `ErpPasswordBox`, `ErpNumberBox`, `ErpMoneyBox`,
`ErpTelBox`, and `ErpUrlBox` completed internal browser review as explicitly
labeled original Honesty ERP candidates. Production contracts and defaults are
unchanged. Generated Workbench fixtures now provide meaningful Arabic ERP data
and the public CVA path remains immediately interactive. The 14-scenario audit
passes 112/112 assertions with one target per route, complete live controls,
visible value-change evidence, actual RTL/LTR computation, zero overflow,
broken images, errors, or warnings. Evidence is under
`docs/review-evidence/erp-text-fields/v1-internal-review/`. Canonical
verification passes 128/128 files and 828/828 tests, both typechecks, all
governance/lint, and the zero-warning 418.32 kB / 92.90 kB build. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Next: `ErpNumberStepper` and
`ErpRangeSlider`.

## Current checkpoint — public Icon and Text primitives internal review

`ErpIcon` and `ErpText` completed desktop/narrow Light/Dark RTL/LTR browser
review as explicitly labeled original Honesty ERP candidates. The only changes
are generated Design-Lab evidence: centered Icon placement and bounded,
meaningful bilingual Text content. The 26/26 runtime audit proves one target,
7/23 live controls, labelled Icon accessibility, Text native semantics and
clamping, with no overflow, broken images, or browser diagnostics. Evidence is
under `docs/review-evidence/erp-public-primitives/v1-internal-review/`.
Production contracts/defaults remain unchanged. Canonical verification passes
128/128 files and 821/821 tests, both typechecks, all governance/lint, and the
zero-warning 418.32 kB / 92.88 kB build. Status is `TECHNICAL_VERIFIED` /
`INTERNAL_VISUAL_REVIEW_COMPLETED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
Next Bottom-Up unit: foundational text-like Input/Field controls.

## Current checkpoint — structural primitive family internal review

The original Honesty ERP candidates for `ErpContainer`, `ErpDivider`,
`ErpGrid`, `ErpInline`, `ErpSection`, `ErpStack`, and `ErpSurface` have completed
internal browser review without changing their production APIs or defaults.
Their dedicated pages now provide visible projection evidence for every layout
control. Four reproduced evidence defects were corrected: Container boundary
visibility, Section gap visibility, vertical Divider block extent, and inverse
Surface projected-text contrast. The 14-scenario runtime audit passes 100/100
assertions with no overflow, broken images, errors, or warnings. Evidence is at
`docs/review-evidence/erp-structural-primitives/v1-internal-review/`. Focused
verification passes 8/8 files and 46/46 tests; canonical verification passes
128/128 files and 820/820 tests, both typechecks, all governance/lint and the
zero-warning 418.32 kB / 92.90 kB build. Status is `TECHNICAL_VERIFIED` /
`INTERNAL_VISUAL_REVIEW_COMPLETED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
Next Bottom-Up unit: `ErpIcon` and `ErpText`.

## Current checkpoint — ErpAvatarPicker exact-reference internal review

The binding Picker source was rehashed and rendered beside the dedicated live
workbench. The reproduced duplicate Tabs track, circle default, preview size
and footer inset were corrected through bounded Tabs/Avatar presentations.
The surface, track, tab, grid, tile, preview and footer contract now matches at
zero fixed-geometry delta. The complete 116-image catalog remains 60 male / 56
female with all legacy mappings intact. Evidence and the 34/34 runtime result
are under `docs/review-evidence/erp-avatar-picker/v1-internal-review/`.
Status is `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused verification passes 4/4 files
and 44/44 tests; canonical verification passes 128/128 files and 819/819 tests,
both typechecks, all governance/lint and the zero-warning 418.32 kB / 92.91 kB
build. Next Bottom-Up unit: structural primitives beginning with `ErpContainer`.

## Current checkpoint — ErpAvatar exact-reference internal review

The binding Avatar source was rehashed and rendered directly beside the current
exact experience. Fixed sizes match at 24/30/38/50/68/88px and the narrow
mapping remains 24/30/38/50/58/72px. All shapes, content types, tones, rings,
presence states, physical positions and reference motions were inspected.
Implementation cases have one target and zero page overflow, broken images or
browser diagnostics. The reference document itself has 193px narrow overflow
from its fixed demo chrome; it is not propagated into production. No component
defect was reproduced and no public API changed. Evidence is under
`docs/review-evidence/erp-avatar/v1-internal-review/`. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused verification passes 3/3 files
and 37/37 tests; canonical verification passes 128/128 files and 818/818
tests, both typechecks, all governance/lint and the zero-warning 418.32 kB /
92.88 kB build. Next binding-reference owner: `ErpAvatarPicker`.

## Current checkpoint — ErpStatusBadge exact-reference internal review

The binding StatusBadge source was rehashed and rendered beside the current
implementation. All fixed geometry matches: sizes 18/22/26/32px, medium dot
6px, icon 12px, image/count 14px and remove/check 12px. The only reproduced
implementation deltas were the former 19px count and 22px remove action; both
are corrected and protected by positive and negative governance checks.
Evidence is under
`docs/review-evidence/erp-status-badge/v1-internal-review/`. Implementation
cases have no page overflow, broken image or browser diagnostic. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused verification passes 3/3 files
and 31/31 tests; canonical verification passes 128/128 files and 818/818
tests, both typechecks, all governance/lint and the zero-warning 418.32 kB /
92.88 kB build. Next binding-reference owner: `ErpAvatar`.

## Current checkpoint — ErpUserMenu internal visual review

The live Skodash reference is accessible and its open popup was captured and
measured directly. Reference geometry is 360px width, 8px padding, 10px radius,
60px identity Avatar and 56px action rows. The ERP candidate matches those
popup values and preserves the Product Owner's final three-row trigger contract
with a 60px Avatar, default role/branch badges and no trigger secondary line.
Twenty-two implementation states cover Light/Dark, RTL/LTR, 1440/1280/1024/
768/390/320 widths, all visibility controls and image/initials/icon fallbacks.
The surface remains non-scrolling; the action list scrolls without moving the
identity. Evidence is under
`docs/review-evidence/erp-user-menu/v3-internal-review/`. The 320 x 568 centered
long-identity Workbench state has only 20.03px of action-list viewport and is
retained as an explicit evidence limitation. Status is `TECHNICAL_VERIFIED` /
`INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused verification passes 4/4 files
and 70/70 tests; the canonical gate passes 128/128 files and 818/818 tests,
both typechecks, all governance/lint and the zero-warning 418.32 kB / 92.91 kB
build. All explicitly reopened candidates have completed internal review; next
binding-reference owner: `ErpStatusBadge`.

## Current checkpoint — ErpTable full-reference internal review

The binding Table source SHA was reverified and its six rendered specimens
were compared directly with the complete ERP-owned reference experience. The
actual source geometry supersedes the former 54/33/57px summary: the rich row
is 59px, compact row 39px, clickable row 47px, footer 55px, and headers vary
between 34px and 37.5px by specimen. The ERP result is within the authorized
0.5px layout tolerance throughout and exactly matches the 28/16/32/22px
action/checkbox/avatar/badge geometry. The live Table workbench now contains
five Arabic ERP records, seven columns and working selection, sort, activation,
resize, visibility and footer evidence on one target. Runtime evidence records
zero implementation page overflow at 390px; the vendor document itself has
231px caused by its external demo chrome. Status is `TECHNICAL_VERIFIED` /
`INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused verification passes 3/3 files
and 38/38 tests; canonical verification passes 128/128 files and 818/818
tests, all governance/lint, both typechecks and the zero-warning 418.32 kB /
92.91 kB build. Next reopened owner: `ErpUserMenu`.

## Current checkpoint — ErpTabs exact-reference internal review

The binding Tabs source SHA was reverified and its rendered horizontal and
vertical specimens compared directly with the Angular evidence. The desktop
underline tab is `35.59375px` high in both, with `13px / 15.6px` type,
`10px 16px` padding, `8px` gap and a `3px` indicator. The vertical list is
`240px`; its tab is `231px × 40px` with a `3px × 40px` indicator. The live
workbench now proves switching, model synchronization, disabled handling and
event output across five Arabic ERP tabs on its only primary target. Narrow
AppShell containment was corrected after the closed Sidebar produced real page
overflow; implementation captures now report zero overflow at 390/320 px.
Status is `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Canonical verification passes 128/128
files and 817/817 tests with a zero-warning 418.32 kB / 92.90 kB build. Next:
the reopened full `ErpTable` reference experience.

## Current checkpoint — ErpSelect V3 internal review

`ErpSelect` was compared in a real browser with the binding
`ERP-SELECT.html` at the verified SHA
`EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`.
The 38 px medium control now renders 13 px type, 12/5 px inline/block padding,
8 px radius and an exactly aligned popup with an 8 px gap. The popup and
control have equal width and 0 px inline-start delta; only the listbox owns
the 300 px vertical cap/scrolling. Browser evidence covers Light/Dark,
RTL/LTR, 1440/1280/390/320 and top/bottom placement. The workbench still has
one primary target and now starts with searchable Arabic ERP data. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The 320 x 568 constrained popup now
uses measured vertical space, remains separated from its trigger within the
0.5 px tolerance, and leaves scrolling on the listbox. Canonical verification
passes 128/128 test files and 816/816 tests, both typechecks, all governance,
and the zero-warning 418.32 kB / 92.88 kB build. Next reopened unit: `ErpTabs`.

## Current checkpoint — EmptyState internal review

`ErpEmptyState` retains its Product Owner-supplied five Lottie scenarios and
now exposes the complete reference/state surface on demand from its dedicated
one-target Workbench. Runtime evidence at 1440/1280/390/320 px covers both
themes, directions, reduced motion, 160 px desktop and 108 px narrow
illustrations. The review reproduced and fixed narrow extra-action clipping;
all final captures report zero visible-text clipping, page overflow, broken
images, and diagnostics. The recorded original HTML was unavailable, therefore
no fresh exact-source geometry claim is made. Status is
`TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Canonical verification passes 128/128
test files and 812/812 tests, both typechecks, all governance/lint, and the
zero-warning 418.32 kB / 92.91 kB production build. Next reopened unit:
`ErpSelect`.

## Current checkpoint — Radio family internal review

The RadioBox/RadioGroup candidate now restores its complete family evidence on
demand from each dedicated page while keeping one primary Workbench target.
The verified 18/22/28/36 px scale, native single-selection semantics, ordinary
and Tile groups, variants, validation, read-only and state evidence pass in
Light/Dark RTL/LTR at desktop and narrow widths with no overflow, clipping,
broken images or browser diagnostics. The missing historical
`erp-radiobox.html` source was not fabricated. Status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; the next prioritized reopened unit is
`ErpEmptyState`. The canonical gate passes 128/128 test files and 811/811
tests, all governance/lint, both typechecks, and the zero-warning production
build at 418.32 kB / 92.86 kB estimated transfer.

## Authoritative current execution state — 2026-10-10 — autonomous UI visual QA opened

The new Product Owner authorization supersedes the historical requirement to
pause after every technically verified UI candidate. Visual status remains
pending until explicit Product Owner acceptance, but documented UI owners may
now be reviewed, corrected, verified, checkpointed and followed by the next
Bottom-Up unit. Business Feature/Page, CRUD, transport, permissions and backend
work remain closed.

The first integrated Shell audit entered from clean `main`
`6379313f8439cc7aefe025f2e6ecfcc8d9d1d481`. A real AppShell Sidebar click
confirmed that the review route recorded `navigationActivated` then returned
before routing. The review navigation now has an explicit intent-only item and
real Table/Tabs destinations; the former remains on the workbench and records
the event, while the latter records the event then uses the App-owned Router.

At 320 px the previous Topbar measured 283.30 px. An interim shrink produced a
1 px BranchSelector and 44 px horizontal overflow and was rejected. The final
layout keeps BranchSelector and Search visible at 136.5 px each, preserves the
full 289 px UserMenu identity row, measures 227.30 px, and records zero page or
Shell horizontal overflow. The refreshed audit passes all 81/81 component
routes with one root AppShell, one RouterOutlet, one OverlayHost, one primary
target, zero broken images and zero browser diagnostics. Status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Canonical verification passes 127/127
test files and 808/808 tests, all governance/lint, both typechecks, and the
zero-warning production build at 418.32 kB / 92.90 kB estimated transfer.

The reproducible lifecycle inventory at
`src/app/controls/ERP_COMPONENT_LIFECYCLE_LEDGER_V1.md` records 81 public, 45
supporting and 6 planned identities. It preserves `ErpCheckBox` as the sole
accepted/frozen owner and never promotes catalog `PENDING` to a human visual
finding. The next bounded unit is `ErpRadioBox`, with `ErpRadioGroup` tested
only as its required compatibility owner.

## Authoritative current execution state — 2026-10-10 — root AppShell Workbench recovered

Published `main` and `origin/main` began at
`94c20bcd55eda2eb722ddad65d6280eaf11592c7`. The worktree contained 21
pre-existing AppShell/evidence modifications. They were copied with hashes to
a verified external backup before editing, then reviewed individually; all
belonged to the root-owned AppShell correction and no unrelated work was
identified.

The application continues to render exactly one real root `ErpAppShell`, one
direct RouterOutlet and one OverlayHost. On `/components/app-shell`, that root
instance becomes the sole primary showcase target. The routed showcase renders
only its dedicated workbench controls and output log. A typed
`ErpReviewAppShellWorkbenchState` service connects routed review state to the
root without DOM manipulation or custom document/window events, resets on
route exit, and restores predictable defaults on re-entry. Other component
routes retain their own sole live target and receive no AppShell overrides.

Browser verification passes 81/81 component routes and six AppShell viewport
widths across Light/Dark and RTL/LTR, with zero horizontal overflow, broken
images or diagnostics. Live interaction proves immediate input/model updates,
Quick Action output evidence, route cleanup and re-entry initialization.

Canonical verification passes 127/127 test files and 807/807 tests, all lint
and governance, both TypeScript typechecks, and the zero-warning production
build. Initial output is 418.32 kB / 92.88 kB estimated transfer. Status is
`TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. No later wave is authorized.

## Authoritative current execution state — 2026-10-09 — autonomous App Shell completion

The Product Owner-authorized App Shell completion wave entered from clean live
`main` `6ceaf966c4b22efa0faf1d32e3dae841fd800c31`. The actual Design Lab root now
uses one `ErpAppShell` around the single direct RouterOutlet and the single
OverlayHost. `ErpApplicationsMenu` and `ErpMessagesMenu` are independent public
owners; `ErpNotificationBell` and `ErpGlobalSearch` were refined through their
existing owners. Sidebar, Topbar, UserMenu, BranchSelector, AppFooter and
QuickActionsBar remain composed through their established contracts.

The desktop topology is Sidebar beside a workspace whose rows are Topbar,
content plus logical-end QuickActionsBar, and Footer. At the Foundation `xl`
query boundary the Sidebar becomes a logical-start off-canvas drawer and Quick
Actions become a contained horizontal region. The catalog now contains 81
public component routes. Browser evidence at 1440, 1280, 1024, 768, 390 and
320 px records zero page/Shell horizontal overflow, broken images, or console
diagnostics and verifies router Back/Forward. Evidence is under
`docs/review-evidence/erp-shell/autonomous-app-shell-wave/`.

The direct browser route audit passes all 81/81 public component pages with one
primary showcase target, one root AppShell, one RouterOutlet, one OverlayHost,
and zero overflow, broken images, or diagnostics.

Canonical verification passes 126/126 test files and 804/804 tests, all
governance and lint, both TypeScript typechecks, and the zero-warning production
build. Initial output is 414.89 kB / 91.62 kB estimated transfer.

Delivered owners are `TECHNICAL_VERIFIED` and
`INTERNAL_VISUAL_REVIEW_COMPLETED`; every visual status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. No CRUD, Feature/Page migration, or
unrelated component wave is opened.

## Authoritative current execution state — 2026-10-09 — UserMenu final trigger correction

The Product Owner reopened only the closed `ErpUserMenu` trigger from clean
`main` `76a0893f8c647363833ac32a58685450507055c8`. The candidate now has name,
email, then role/branch badges in one third row; `secondaryText` is popup-only.
Both trigger-specific badge gates default true, the bounded trigger Avatar is
60 x 60 px against a 60 px identity stack, and the email row inherits logical
alignment while isolating the Latin address through `ErpText`.

Focused verification passes 3/3 files and 53/53 tests. Canonical verification
passes 124/124 files and 793/793 tests, all governance, both typechecks,
production build, and zero warnings. The 20-condition evidence under
`docs/review-evidence/erp-user-menu/final-trigger-v2/` has zero block clipping,
page/popup overflow, broken images, or browser diagnostics. Status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; Sidebar, Topbar, AppFooter,
QuickActionsBar and AppShell were not changed and no later wave is authorized.

## Authoritative current execution state — 2026-10-09 — Shell S2-E complete

The ordered S2-A through S2-E wave is technically complete. `ErpAppShell`
optionally composes `ErpQuickActionsBar` at the logical workspace end and
`ErpAppFooter` in flow while preserving existing consumers that configure
neither. It forwards activation IDs only and continues to own no routing,
permissions, session, transport, business effects, or theme state. The live
workbench composes the established BranchSelector, GlobalSearch,
NotificationBell and unchanged UserMenu owners.

Focused verification passes 1/1 file and 2/2 tests. Canonical verification
passes 124/124 files and 792/792 tests, all governance, both typechecks,
production build, and zero warnings. Eight persisted browser conditions cover
1440 through 320 px, both themes and directions, the upper and lower narrow
regions, zero page/Shell horizontal overflow, zero broken images and zero
browser diagnostics. Every stage remains `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.
The exact next action is consolidated Product Owner visual review; no later
Shell or application execution unit is authorized.

## Authoritative current execution state — 2026-10-09 — Shell S2-D

S2-D is technically verified. `ErpQuickActionsBar` consumes typed groups and
actions, distinguishes primary/secondary and disabled states, composes the
approved icon-button/tooltip/text owners, and emits action IDs without owning
business effects. Categories remain consumer-driven because unavailable Gxon
evidence does not establish a fixed taxonomy.

Focused verification passes 1/1 file and 3/3 tests. Canonical verification
passes 124/124 files and 791/791 tests, all governance, both typechecks,
production build and zero warnings. Browser evidence covers 1440 through 320
px with vertical desktop and horizontally contained narrow layouts, zero page
overflow, broken images or diagnostics. Visual status remains pending; S2-E
AppShell integration is the exact next unit.

## Authoritative current execution state — 2026-10-09 — Shell S2-C

S2-C is technically verified. `ErpAppFooter` is a public in-flow application
footer with optional application/version/status/action data and one
`actionActivated` intent. It owns no environment values, state, router,
transport or theme. It reuses ErpText, ErpStatusBadge and ErpButton and renders
no footer landmark when all optional data is absent.

Focused verification passes 1/1 file and 3/3 tests. Canonical verification
passes 123/123 files and 788/788 tests, all governance, both typechecks,
production build and zero warnings. Browser evidence covers 1440 through 320
px, both themes/directions, default, six-action dense, disabled and empty
states, with zero overflow/broken images/diagnostics. Visual status remains
pending; S2-D QuickActionsBar is the exact next unit.

## Authoritative current execution state — 2026-10-09 — Shell S2-B

S2-B is technically verified. `ErpTopbar` remains a projection-only owner with
start, context, search, actions, and user regions. The generated dedicated
workbench now proves the actual BranchSelector, GlobalSearch,
NotificationBell, and UserMenu owners rather than a stale
`erpTopbarNotifications` marker. Responsive composition uses the Foundation
Query API and contains all regions through 320 px without page overflow.

Focused Topbar verification passes 1/1 test. Canonical verification passes
122/122 files and 785/785 tests, all governance, both typechecks, production
build, and zero warnings. Browser evidence covers six viewport/theme/direction
conditions with zero broken images or diagnostics. Visual status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; S2-C AppFooter is the exact next unit.

## Authoritative current execution state — 2026-10-09 — Shell S2-A

The bounded Shell continuation entered from clean `main`
`216fd4d36819df0adfbcdb0c599574d2b67469cd`. This decision opens only
`ErpSidebar`, `ErpTopbar`, `ErpAppFooter`, `ErpQuickActionsBar`, and minimum
`ErpAppShell` integration in that order, with intermediate visual approval
deferred but every technical gate mandatory.

S2-A is technically verified. The existing `ErpSidebar` now accepts typed
consumer hierarchy, owns disclosure separately from destination activation,
tracks controlled collapsed and expanded state, exposes active ancestors,
skips disabled entries, supports ArrowUp/ArrowDown/Home/End, and contains its
own scrolling. The verified Skodash source contract and unavailable Gxon state
are recorded in `src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md`. Canonical
verification passes 122/122 files and 785/785 tests, all governance and both
typechecks, production build, and zero warnings. Visual status remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; S2-B Topbar is the exact next unit.

## Authoritative current execution state — 2026-10-08 — Shell S1 compact UserMenu trigger

The Product Owner rejected the previous closed-trigger presentation at clean
live `main` `991c03daaf01b5bd3dd8ab03b222cdcc4f57b6f0`. The bounded candidate
reduces the default capsule from four rows to at most three: name, email, and
one optional metadata row. Global role/branch visibility remains default true
for the popup; new default-false trigger-specific gates control those badges in
the capsule without creating further rows.

Measured before/after evidence covers 320/390/768/1440 px, Light/Dark,
RTL/LTR, open/closed, long Arabic/English/mixed content, image/initials/icon
fallbacks, and missing optional data. Corrected full-identity heights are
71--72 px versus 104--125 px before correction, with no vertical row clipping,
horizontal overflow, broken images, popup escape, or browser diagnostics.
Arrow, vertical placement, action-list-only scrolling, and the 116-image Avatar
library remain unchanged. Technical verification passes 122/122 test files and
782/782 tests, both typechecks, production build, all governance, and zero
warnings. Product Owner review is pending and S2 remains closed.

## Authoritative current execution state — 2026-10-08 — 116-image 3D avatar library

The Product Owner-authorized asset replacement entered from clean live
`main` at `30d6bd942015743fb3f02c7faeb563961fa978ac`. The canonical system
avatar library now contains 116 verified 512 x 512 transparent PNGs: 60 male
and 56 female, covering source numbers 1..116 exactly once. The aggregate
library SHA-256 is
`39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.

The 40 existing IDs, gender associations, and URLs remain compatible; the
remaining IDs are source-traceable. AvatarPicker exposes the full catalog by
default and lazy-loads tile images through ErpAvatar. Runtime evidence covers
the required viewports, themes, directions, shapes, sizes, presence, selection,
preview, confirm, broken-image, and overflow checks. Product Owner visual
review remains pending. Canonical verification passes 122/122 test files and
779/779 tests, all lint/governance, both typechecks, production build, and zero
warnings. The initial bundle is 490.24 kB / 105.56 kB estimated transfer. No
Shell S2 or adjacent visual wave is open.

## Authoritative current execution state — 2026-10-08 — Shell S1 dark contrast and scroll ownership

This bounded correction entered from clean `main` at
`415298b7921719747efcc17dc82f9e889ccac64c`. `ErpUserMenu` now consumes its
existing semantic foreground on the popup surface, so Dark identity and action
content no longer inherit black. The native popover surface is explicitly
non-scrolling; only the action list scrolls and the identity card remains fixed.

The current PNG/JSON evidence covers the five requested Light/Dark, RTL/LTR,
desktop/narrow/constrained cases. It records zero overlap, horizontal overflow,
broken images, or browser diagnostics. Focused verification passes 4/4 files
and 58/58 tests plus Shell governance. Canonical verification passes 122/122
files and 776/776 tests, all lint/governance, both typechecks, production build,
and zero warnings. Initial bundle is 490.24 kB / 105.57 kB estimated transfer.
Product Owner acceptance remains pending, and S2 is not open.

## Authoritative current execution state — 2026-10-08 — Shell S1 popup geometry gate

This bounded follow-up entered from clean `main` at
`ccddf29d22b4608016d27818b17a2584a0f06632`. `ErpUserMenu` is now a strictly
vertical dropdown: preferred bottom, top fallback, with no left/right candidate.
It measures real available space above/below the trigger before sizing the
surface, keeps the identity card nonshrinking, and gives overflow scrolling to
the keyboard-accessible actions region only. The shared overlay default remains
unchanged for other owners.

Both identity presentations use name, email, role/branch badges, then optional
independent `secondaryText`. Current browser evidence covers the five required
viewports, long/dynamic identities, both directions, both themes, local image,
initials/icon fallbacks, and open/closed states. All captured open states have
zero trigger overlap, zero surface/page overflow, one showcase target, and zero
runtime diagnostics. The constrained 320x568 surface keeps a 166 px identity
visible while 353 px of actions scroll within a 232 px client region.

Focused verification passes 4/4 files and 57/57 tests plus Shell governance.
Canonical verification passes all lint/governance checks, 122/122 files and
775/775 tests, both typechecks, production build, and zero warnings. Initial
bundle is 490.24 kB / 105.58 kB estimated transfer. Product Owner acceptance is
pending and S2 is not open.

## Authoritative current execution state — 2026-10-08 — Shell S1 UserMenu identity refinement

The bounded task entered from clean `main` at
`b210bb1311841dea836379e996f53aaa5a7ddf74` and authorizes only the existing
`ErpUserMenu`. Its trigger now supports responsive multi-line identity without
a forced 40 px height or an unconditional 576 px name hide. The compatible
`ErpShellUserSummary` contract adds optional email, role, branch, and Avatar
presence values; six default-true public visibility inputs apply immediately to
the same closed trigger and open identity card.

The implementation reuses `ErpAvatar` for image, initials, explicit-icon, and
presence presentation and reuses `ErpStatusBadge` for independent role and
branch labels. The popup preserves actions, separators, disabled behavior,
events, keyboard navigation, Escape, outside dismissal, focus return, reduced
motion, and the corrected post-clamp arrow geometry. Its identity content stays
visible while only the action region can scroll.

The UserMenu workbench retains one `data-showcase-target` and provides live
Arabic identity presets plus all visibility flags. Browser evidence covers
320/390/768/1440 px, Light/Dark, RTL/LTR, open/closed, long Arabic/English/mixed
names, dynamic open-state updates, and zero horizontal overflow. Product Owner
visual acceptance remains pending; S2 and all other Shell owners remain closed.

Focused verification passes 2/2 files and 27/27 tests. Canonical verification
passes all lint/governance checks, 122/122 test files and 768/768 tests, both
typechecks, production build, and the zero-warning gate. The initial production
bundle is 490.24 kB / 105.57 kB estimated transfer.

Gxon remains inaccessible, but it no longer blocks a later separately
authorized `AppFooter` or `QuickActionsBar`. Those future designs must use the
Product Owner topology and Honesty ERP architecture with explicit authored
decisions, never fabricated Gxon measurements. A later Gxon recovery does not
automatically reopen an accepted component.

## Authoritative current execution state — 2026-10-08 — Shell S1 final evidence closure

The bounded follow-up entered from clean `main` at
`b28012f18dfd74ac9c37827e00010d70f701719f` and authorizes only the existing
`ErpUserMenu`. Actual browser geometry confirmed a 237.3125 px arrow-to-trigger
delta when the 360 px popup was viewport-clamped. The shared controller now
exposes the post-clamp physical cross-axis center only for arrow-enabled owners;
UserMenu applies it while preserving popup/arrow geometry and the single
anchored-overlay engine.

Evidence under `docs/review-evidence/erp-user-menu/` now includes open Dark
RTL/LTR captures at 1440x900 and 390x844. An eight-case browser matrix covers
above/below placement at both physical horizontal edges in both directions:
desktop arrow delta is at most 0.0005 px, all overflow metrics are zero, and
narrow presentation retains the reference rule that hides the arrow. The
approved local female `avatar-21.png` is used by the reference specimen;
fallback behavior and public APIs remain unchanged.

Focused verification passes 3/3 files and 35/35 tests plus Shell and catalog
governance. Canonical verification passes every lint/governance gate, 122/122
test files and 758/758 tests, both typechecks, production build, and the
zero-warning gate. The initial bundle is 490.24 kB / 105.56 kB estimated
transfer. Product Owner visual acceptance remains pending, and S2 is not open.

## Authoritative current execution state — 2026-10-08 — bounded live workbench correction

This bounded correction entered from clean live `main` at
`f0450d76a6ef523158036ba9b5bb66a9127519dd`. Every public page retains exactly
one primary `data-showcase-target`. Select, StatusBadge, Avatar, AvatarPicker,
Tabs, and Table restore their existing exact-reference evidence behind an
on-demand secondary control. Table restores the complete multi-owner reference
experience with TableToolbar, SearchBox, ColumnChooser, Table, and Pagination.

Structured editors now reject incompatible JSON value kinds before applying
them to a public input. Invalid drafts remain visible and the last valid live
value survives unrelated control changes. Model and CVA values remain
immediately synchronized with their primary targets.

Fab, ExtendedFab, and FabMenu now use a measured, unclipped floating-preview
owner. Inline and block controls remain, and a review-only direction control
proves physical containment at both 0% and 100% boundaries. Browser measurements
at 390 px passed for all three owners in RTL and LTR with zero page overflow.
Runtime checks also passed on-demand exact evidence, the full Table composition,
structured-draft retention, model/CVA synchronization, mixed menu presentations,
and zero console errors or warnings.

Focused verification passes 6/6 files and 28/28 tests plus catalog governance,
both typechecks, and the browser checks above. Canonical verification passes
all lint/governance gates, 122/122 test files and 748/748 tests, both
typechecks, production build, and zero warnings. The initial bundle remains
488.18 kB / 105.32 kB estimated transfer. Product Owner review remains the next
gate; no visual acceptance, production-owner merge, later component review, or
new wave is inferred or opened.

## Historical dedicated showcase reconstruction — superseded 2026-10-08

The prior dedicated-showcase checkpoint entered at
`54451b1fdca8da0f03096d16df20adc6100a5c11`, covered 77 authored routes, and
passed 119/119 files and 730/730 tests. It is superseded as the current showcase
contract because its pages did not expose one live target with controls for the
complete public API.

## Historical ownership catalog and Page foundation state — superseded 2026-10-08

This bounded wave entered from clean live `main` at
`895f985994ef2c28eae703f60d5911a5314af338`. It establishes one generated,
machine-readable ownership catalog for 77 public ERP components and 41
supporting owners, directives, services, and contracts. The catalog records
selectors/classes, categories, source paths, purposes, dependencies, native
ownership, replacement coverage, public APIs, reference state, and the unique
`/components/<id>` review route. It currently generates 336 live showcase
cases.

`ERP_NATIVE_ELEMENT_COVERAGE_V1.md` defines 42 governed native-element
contracts under `GLOBAL_OWNER_ONLY`, `PAGE_AND_CONSUMER_BANNED`, `CONTEXTUAL`,
and `NOT_YET_COVERED`. The repository checker audits production HTML and inline
templates, excludes tests, rejects covered raw-native bypasses, and preserves
only documented Design Lab measurement/tooling exceptions. The Lab theme and
screenshot actions now use `ErpButton`; review Select composition now uses
`ErpSelect`.

Every public catalog entry has a dedicated live route under
`/components/:componentId`, grouped catalog navigation, public-API evidence,
and exact-reference-first ordering where an exact contract exists. Existing
batch routes remain available. The new public `ErpPage` owns only the page
width/scroll boundary: `widthMode = boxed | fluid | full` (default `fluid`) and
`scrollMode = document | page | free` (default `document`). `ErpPageShell`
continues to own page regions, and `ErpAppShell` owns only application-frame
composition; neither duplicates `ErpPage` width ownership.

Architecture audits for `/controls/data-batch`, `/controls/forms-batch`,
`/controls/entity-form-batch`, and `/controls/shell-batch` found no ownership
reopen requirement. Canonical verification passes all lint/governance gates,
136/136 test files and 909/909 tests, both typechecks, production build, and
zero warnings. Initial bundle is 497.84 kB / 108.38 kB estimated transfer; the
dedicated component-showcase lazy chunk is 168.97 kB / 17.40 kB estimated
transfer.

The exact next action is Product Owner runtime/technical review of the catalog,
native-ownership registry, dedicated component pages, and `ErpPage`. The prior
full ERP-TABLE visual review gate remains pending separately. No later component
or migration wave is opened, and technical PASS does not equal Product Owner
visual approval.

## Historical full ERP-TABLE current state — superseded 2026-10-08

The Product Owner rejected checkpoint
`eddac4a8e8a3460f346bb579fdd5ca0074296e7a` because the Table candidate omitted
visible higher owners from `ERP-TABLE.html` and retained known geometry deltas.
That checkpoint remains technical history, not a visually accepted result.

`C:\Users\Misrtech\Downloads\ERP-TABLE.html`, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`, remains
the single binding authority. The current contract is
`src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md`; V1 is
explicitly superseded. A feature may retain its bounded ERP owner, but every
feature visible in the reference must be composed into the exact experience.

The primary `/controls/core-batch` evidence now composes `ErpTableToolbar`,
`ErpSearchBox`, `ErpColumnChooser`, `ErpTable`, and `ErpPagination` in one
reference frame. Base Table continues to own native table semantics and reuse
`ErpCheckBox`, `ErpSortHeader`, `ErpTableResizeHandle`, `ErpText`, and projected
ERP cells. Search, controlled column visibility, selection, sorting, resizing,
footer counts, and pagination operate in the live specimen. FilterBar,
FilterDrawer, BulkActionBar, ViewSwitcher, loading, and SmartTable orchestration
were audited as absent from the binding reference and were not invented.

Canonical verification passes every lint/governance gate, 134/134 test files
and 904/904 tests, both typechecks, production build, and the zero-warning gate.
Initial bundle is 376.16 kB / 85.65 kB estimated transfer; Core Batch is 160.50
kB / 25.32 kB estimated transfer. Direct browser comparison records 0 px delta
for all six reference specimen boxes, 390 px page overflow of 0, and internal
Table overflow containment. Durable measurements are in
`docs/review-evidence/erp-table/ERP_TABLE_RUNTIME_EVIDENCE.md`.

The exact next action is Product Owner visual/runtime review of the full
ERP-TABLE experience at `/controls/core-batch`. No later Data/Table visual wave
or owner is opened. Technical PASS does not equal Product Owner approval.

## Repository

`abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Local Product Owner workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Historical ErpTabs-only current state — superseded 2026-10-07

The Product Owner rejected the technically green `ErpTabs` candidate at
`302056ad312dec403a1cdf2f9ded92d57d011ba5` for complete visual mismatch and
opened a literal reference reconstruction from that checkpoint. Resolve the
final local and remote SHAs directly; source and continuity are synchronized in
the same bounded implementation commit.

`C:\Users\Misrtech\Downloads\ERP-TABS.html`, SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`, is the
single binding visual and behavioral authority for `ErpTabs`. It supersedes the
former Nexlink reference, the accelerated no-reference waiver, and every
conflicting Tabs visual interpretation. Only colors and font families resolve
through Honesty ERP system contracts. The authoritative implementation contract
is `src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md`.

The exact candidate implements the reference `underline`, `pill`, `solid`, and
`ghost` variants; text, icon, image, and count anatomy; content/fill width modes;
horizontal/vertical layouts; sliding indicator; lazy keyed panels; reference
motion and reduced motion; automatic orientation-aware keyboard activation;
collision-free IDs; and responsive narrow overflow through the Foundation Query
API. `pills`, legacy directional transitions, header shapes, `count`, and
`renderPanels=false` remain isolated compatibility extensions for existing
consumers. `ErpTabTrigger` remains a generic semantic owner, so Tabs visuals do
not leak into `ErpStepper`; `ErpAvatarPicker` continues to reuse `ErpTabs` with
two counted gender tabs and no panels.

Technical verification passes 133/133 test files and 895/895 tests, all
lint/governance checks, both TypeScript typechecks, production build, and zero
Angular/build warnings. The production initial bundle is 376.16 kB / 85.67 kB
estimated transfer; the Core Batch lazy chunk is 119.32 kB / 21.22 kB estimated
transfer.

Product Owner visual state and immediate next action:

- paired browser captures and computed measurements cover all ten reference
  specimens at equal desktop viewports; the 390 px implementation evidence has
  no horizontal overflow. Approved `ErpIcon` glyph contours remain an explicit
  Product Owner comparison point rather than an inferred visual acceptance;
- `ErpTabs` remains pending Product Owner runtime/Light/Dark/RTL/LTR/narrow
  comparison at `/controls/core-batch` against `ERP-TABS.html`;
- `ErpAvatarPicker` and `ErpStepper` compatibility remains technically green;
- `ErpSelect`, `ErpStatusBadge`, `ErpAvatar`, `ErpAvatarPicker`, and every other
  Core owner remain closed to visual implementation by this task;
- technical green does not equal Product Owner visual approval or freeze;
- the exact next action is Product Owner visual/runtime review of `ErpTabs` at
  `/controls/core-batch`;
- the Data/Table Visual Correction Wave is not opened.

Core, Data/Table, Forms, Entity Form Engine, and Shell remain prior technically
green candidates, but their Product Owner visual acceptance is not inferred.
Standalone EntityReview, Entity Wizard, workflow engine, DataPage,
EntityDirectory, EntityDetail, CRUD/transaction patterns, Feature/Page
migration, ERP-specific editors, and every unlisted owner remain unopened.

## Historical GitHub checkpoints — superseded snapshot

Live `main` must always be verified directly at the start of a new chat with:

`git rev-parse origin/main`

Do not treat a documentation SHA written inside this file as an eternal HEAD,
because updating this file itself creates a newer docs commit.

Persistent continuity protocol merge checkpoint:

`66abb185c3e837d9c659ed56106cf668d46103c5` —
`docs(handoff): establish persistent continuity protocol`

Previous runtime/source checkpoint before the current RadioBox execution commit:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`

Current live source includes the Product Owner-authorized RadioBox family implementation; resolve its commit from live `main`.

Exact-reference V5 implementation checkpoint:

`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` —
`fix(check-box): implement exact Product Owner reference V5`

## Historical verification state — superseded snapshot

Product Owner locally ran `npm run verify:clean` at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`.

That run advanced successfully through:

- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- system colors;
- ErpText;
- ErpIcon registry/governance;
- ErpButton;
- ErpTooltip;
- ErpField;
- ErpOverlay;
- ErpConfirm.

Angular template lint then stopped with exactly two CheckBox accessibility
findings because the outer CheckBox `<label>` owned a click handler.

That defect is now corrected and merged at
`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`.

That CheckBox defect is closed and the CheckBox visual result is Product Owner accepted. The newer RadioBox implementation now requires a fresh canonical verification.

Immediate technical gate:

`npm run verify:clean`

Do not call the current EmptyState implementation checkpoint Fully Green until a fresh canonical verification passes on the current main.

## Historical Product Owner visual state — superseded snapshot

`ErpCheckBox` exact-reference V5 is visually **ACCEPTED by the Product Owner**.

`ErpRadioBox` implementation remains present, and the Product Owner has explicitly opened the next wave by supplying the exact EmptyState reference.

`ErpEmptyState` is the active implementation/review item.

Current binding visual authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

Source reference:

`erp-checkbox-3.html`

Reference identity recorded in the contract:

SHA-256:

`63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`

Product Owner decision:

- reproduce the supplied reference design as closely as possible;
- system colors/tokens replace the reference palette;
- do not silently reinterpret or selectively omit reference design capabilities.

Current V5 CheckBox contract includes:

- modes: `checkbox | switch | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px;
- SVG check/dash stroke animation;
- Switch track/thumb/sweep behavior;
- Tile mode;
- read-only / disabled / invalid / indeterminate;
- exact-reference motion timings;
- Select All / indeterminate review behavior.

Technical PASS will not equal Product Owner visual approval.

## Historical execution order — superseded snapshot

The Product Owner selected this next reference batch order:

1. `ErpCheckBox` — Product Owner visual acceptance complete;
2. `ErpRadioBox` — implementation present; Product Owner moved the active wave forward;
3. `ErpEmptyState` — current active exact-reference implementation/review item;
4. `ErpSelect` — unopened.

RadioBox source is implemented under the accepted CheckBox-family language. The earlier "do not open EmptyState" gate is superseded by the Product Owner's explicit 2026-10-04 stage transition supplying the EmptyState reference and authorizing its implementation.

Do not open `ErpSelect` until EmptyState:

1. passes fresh `npm run verify:clean`;
2. completes Product Owner Light/Dark/runtime visual review;
3. has all current Product Owner findings closed.

The previously reserved single-select Tile requirement remains implemented by RadioBox/RadioGroup native radio semantics.

## Permanent execution laws

- Product Owner is final product/visual authority.
- technical green != Product Owner visual approval/freeze.
- no new component while currently implemented component problems remain open.
- future work proceeds bottom-up by dependency.
- the next candidate is the lowest unresolved dependency, not merely the next
  historical roadmap row.
- any newly opened visual component requires a Product Owner supplied visual
  reference or explicit Product Owner authorization to work without one.
- reference palette does not override Honesty ERP color/token architecture
  unless Product Owner explicitly says otherwise.
- no Angular Material / Bootstrap / Tailwind or new dependencies without
  explicit authorization.
- `npm run verify:clean` remains the canonical executable technical gate.
- do not raise/suppress style budgets or quality gates to get green.

## Mandatory continuity maintenance protocol

This file is **current-state authority** and must be updated in the same
execution cycle whenever any of the following changes:

- current Git checkpoint;
- implementation status;
- blocker;
- verification result;
- Product Owner finding/decision;
- active component;
- execution phase/stage;
- immediate next action.

It is forbidden to leave the newest execution state only inside chat history.

For every substantive implementation cycle, synchronize together:

1. `CURRENT_EXECUTION_STATE.md`;
2. `README_FIRST.md`;
3. `NEW_CHAT_HANDOFF.md`;
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
5. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Also update when applicable:

- `DECISIONS_AND_CONSTRAINTS.md`;
- `GIT_CHECKPOINTS.md`;
- current batch contract;
- current component-specific contract;
- any family/system contract whose behavior changed.

Do not hand a substantive checkpoint to the Product Owner until context,
execution state, and stage/roadmap documentation are synchronized.

<!-- CHATGPT_RADIOBOX_DESIGN_OPEN_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 visually accepted; RadioBox design wave opened

Product Owner decision:

- current exact-reference `ErpCheckBox` V5 is visually accepted;
- `ErpRadioBox` is the next visual item and may be designed with the same
  method, visual language, and design discipline;
- native radio semantics remain authoritative;
- the RadioBox design contract is
  `src/app/controls/radio-box/RADIO_BOX_VISUAL_CONTRACT_V1.md`.

Execution boundary:

- CheckBox visual gate is closed;
- fresh canonical `npm run verify:clean` after the merged CheckBox read-only
  lint correction is still technically pending;
- RadioBox design/contract work is authorized now;
- this original staging note was superseded by the Product Owner clarification to implement RadioBox immediately;
- EmptyState and Select remain unopened.

Approved RadioBox direction:

- modes: `radio | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px, with higher shared Field
  sizes aliasing xl;
- optional description, read-only guard, and standalone visible-text
  suppression aligned to the accepted CheckBox family language;
- circular native radio indicator with centered dot;
- no switch and no indeterminate semantics;
- Tile single-select is owned by RadioBox visual mode together with RadioGroup
  coordinated single-selection semantics.

Technical green remains separate from Product Owner visual approval.
<!-- CHATGPT_RADIOBOX_DESIGN_OPEN_2026_10_04_END -->

<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_START -->
## 2026-10-04 — RadioBox accepted-family implementation completed

The Product Owner clarified that the RadioBox decision authorized immediate
implementation, not documentation-only staging.

Current source implementation now follows the accepted CheckBox V5 family
language while preserving native radio semantics:

- RadioBox modes: `radio | tile`;
- variants: `outline | filled | soft`;
- visual sizes: sm 18px / md 22px / lg 28px / xl 36px;
- shared higher Field size names alias xl;
- optional description;
- `readOnly` interaction guard;
- `hideText` standalone visual mode with accessible-label preservation;
- circular native-radio indicator + centered dot;
- no Switch and no indeterminate semantics;
- tokenized hover/focus/pressed/disabled/read-only/status treatment;
- RadioBox Tile owns the option surface;
- RadioGroup owns coordinated single selection and now passes through the
  approved RadioBox visual facets;
- RadioGroup options may expose descriptions;
- Inputs Design Lab now has dedicated RadioBox standalone/text/group/tile/
  variants/sizes/state/RTL evidence;
- RadioBox/RadioGroup tests and ErpField governance were expanded to protect the
  new contract.

The implementation is a technical candidate until a fresh complete
`npm run verify:clean` passes on this current source.

After technical green, Product Owner Light/Dark/runtime RadioBox review is
mandatory. EmptyState and Select remain unopened until RadioBox is accepted.
<!-- CHATGPT_RADIOBOX_IMPLEMENTED_2026_10_04_END -->

<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_START -->
## 2026-10-04 — RadioBox canonical verification reached tests; Vitest worker contention corrected

Product Owner local verification on
`6d00e7963ca986d92f72e597d3a2ff6c8aad2fa7` established:

- `build:clean:self-test` PASS;
- standalone `build:clean` PASS with zero warnings;
- all repository governance checks PASS;
- Angular lint PASS;
- RadioBox unit tests PASS — 10/10;
- RadioGroup unit tests PASS — 6/6;
- the RadioBox Design Lab review tests that completed were PASS;
- the full test stage stopped with 13 timeout failures across eight unrelated
  suites;
- no assertion failure or RadioBox/RadioGroup functional failure was reported.

The failure distribution includes Tooltip/Overlay motion loops, App route
loading, Buttons/Icons showcases, Selection/Temporal internals, and repeated
Inputs full-page renders. This is execution-resource contention, not evidence of
one shared product/runtime defect.

Bounded tooling correction:

- add `vitest-base.config.mts`;
- configure Angular's unit-test `runnerConfig` to load it;
- cap Vitest at `maxWorkers: 4`;
- keep file parallelism enabled;
- do not raise `testTimeout`;
- do not add retries;
- do not weaken any product test, assertion, lint/governance rule, typecheck,
  style budget, or zero-warning gate.

The next mandatory gate remains:

`npm run verify:clean`

RadioBox implementation/design remains unchanged by this tooling correction.
EmptyState and Select remain unopened.
<!-- CHATGPT_RADIOBOX_VERIFY_TIMEOUT_FOLLOWUP_2026_10_04_END -->

<!-- CHATGPT_OVERLAY_RESTORE_TEST_CONTRACT_2026_10_04_START -->
## 2026-10-04 — canonical verification reduced to two Overlay restoration assertions

Product Owner verification on
`1161b780709c5f35c0b304ed2d441a26f564aa44` confirmed the worker-budget
correction:

- the custom Vitest runner config was loaded;
- lint/governance remained fully PASS;
- the previous timeout failures disappeared;
- 88/89 test files passed;
- 692/694 tests passed;
- RadioBox 10/10 PASS;
- RadioGroup 6/6 PASS;
- InputControls 17/17 PASS including the complete RadioBox review evidence.

The two remaining failures were both in `overlay-host.spec.ts` and both had the
same assertion: the test expected restored `document.body.style.overflow` to
be the empty string, while the actual prior document state was `hidden`.

Production `ErpOverlayHost` deliberately captures and restores the previous
inline body-overflow value. It must not force the page to an empty overflow
value because another legitimate owner may have set a prior state.

Test-contract correction:

- no Overlay runtime code changed;
- the two restoration tests now establish an explicit previous sentinel
  `overflow = 'auto'`;
- they prove `auto -> hidden -> auto` for close and destroy paths;
- each test restores the external pre-test value in `finally`;
- no timeout, retry, assertion, governance, or product behavior was weakened.

Fresh mandatory gate:

`npm run verify:clean`

RadioBox remains implemented and technically pending only this rerun.
EmptyState and Select remain unopened.
<!-- CHATGPT_OVERLAY_RESTORE_TEST_CONTRACT_2026_10_04_END -->

<!-- CHATGPT_EMPTY_STATE_EXACT_V1_2026_10_04_START -->
## 2026-10-04 — ErpEmptyState exact-reference V1 opened and implemented

The Product Owner supplied the binding visual reference:

`erp-empty-state.html`

Recorded SHA-256:

`935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048`

Product Owner instruction is exact-reference implementation: preserve the
reference design and features while replacing its palette with Honesty ERP
system colors.

Binding production contract:

`src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`

Current implementation includes:

- five exact scenarios: `no-data | no-search | error | forbidden | custom`;
- the five reference SVG illustration compositions;
- independent Illustration/Title/Description/Actions/Extra visibility;
- independent Primary/Secondary/Tertiary actions;
- scenario-owned Arabic defaults and live text/action-label overrides;
- custom Illustration and Extra projection;
- reference entrance stagger and continuous illustration motion;
- Float/Pulse/None motion API;
- 0.5x/1.0x/1.5x speed;
- replay API and reduced-motion protection;
- `role=status`, polite live region, atomic announcements;
- dedicated `/controls/empty-states` Design Lab route;
- ERP-only routed review controls;
- system-color Component Token mapping with no raw reference palette;
- no local Light/Dark authority and no component-owned direction authority;
- dedicated tests and governance.

The reference's local Theme/Direction demo ownership is deliberately not copied:
App remains the sole theme authority and RTL/LTR is inherited from context.

The Product Owner's supplied reference explicitly opens this EmptyState wave.
The next component, `ErpSelect`, remains unopened until EmptyState completes
canonical verification and Product Owner Light/Dark/runtime visual review.

Current technical status:

**implementation candidate complete / fresh `npm run verify:clean` pending.**
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

<!-- CHATGPT_TOOLTIP_TOKEN_COUNT_DECOUPLED_2026_10_04_START -->
## 2026-10-04 — Tooltip governance decoupled from global Component Token count

Product Owner local `npm run verify:clean` on
`4b2fa4894b23011e19349be2b6f43807507f3421` confirmed:

- Theme authority PASS;
- route-page ERP-only authoring PASS (23 routed templates);
- Component Token framework PASS with 47 concrete modules;
- System Colors PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- verification then stopped at `erp-tooltip:check`.

Failure cause:

`check-erp-tooltip-governance.mjs` still asserted a repository-wide hardcoded
Component Token module count of 46. EmptyState legitimately added the 47th
module, and the authoritative Component Token framework checker had already
accepted it.

Correction:

- remove the stale hardcoded global count from Tooltip governance;
- keep Tooltip-specific token ownership validation intact;
- keep the prohibition against a separate `tooltip-content` token module;
- repository-wide token inventory remains exclusively owned by
  `component-tokens:check`.

A scan of all 14 repository `.mjs` governance/check scripts found no second
hardcoded Component Token module-count assertion.

Fresh mandatory gate remains:

`npm run verify:clean`
<!-- CHATGPT_TOOLTIP_TOKEN_COUNT_DECOUPLED_2026_10_04_END -->

<!-- CHATGPT_EMPTY_STATE_GOVERNANCE_SYNTAX_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState governance JavaScript syntax repaired

Product Owner local canonical verification on
`fcc0c5b90f851ffe73a73fdb1fcc59c2765ffc6f` progressed successfully through:

- Single App theme authority;
- routed ERP-only authoring (23 templates);
- Component Token framework (47 concrete modules);
- System Colors;
- ErpText;
- ErpIcon;
- ErpButton;
- ErpTooltip;
- ErpField.

The run then stopped before EmptyState contract validation because
`tools/controls/check-erp-empty-state-governance.mjs` itself had invalid
JavaScript string quoting in six adjacent required-template literals:

- Primary/Secondary/Tertiary `data-empty-state-action` markers;
- Search/Danger/Warning illustration class markers.

This was a checker-source syntax defect, not an EmptyState runtime/visual
failure.

Correction:

- replace the six malformed double-quoted literals with valid single-quoted
  JavaScript strings containing the required HTML double quotes;
- no EmptyState source, template, token, style, route, test, or API was changed;
- no governance assertion was removed or weakened;
- compile-only JavaScript syntax audit of the complete patched checker passes;
- the existing `erp-empty-state:check:self-test` remains the next direct
  executable proof of the checker contract.

Fresh mandatory commands:

`npm run erp-empty-state:check:self-test`

then

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_GOVERNANCE_SYNTAX_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_CLASS_TOKEN_GOV_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState governance class-token matching corrected

Product Owner local verification on
`fad838e25370bde850e3fa38fa11dd0ef8d84839` confirmed:

- `erp-empty-state:check:self-test` PASS;
- canonical lint gates passed through ErpField;
- `erp-empty-state:check` then reported missing
  `es-anim-danger-halo` and `es-anim-warning-halo`.

Production template inspection confirmed both classes are present:

- Danger illustration:
  `class="es-fill-accent-subtle es-anim-danger-halo"`;
- Warning illustration:
  `class="es-fill-accent-subtle es-anim-warning-halo"`.

Root cause was a false-negative governance implementation: it searched for an
exact attribute substring such as `class="es-anim-danger-halo"`, which only
works when the required class is the sole/first exact attribute value.

Correction:

- add token-aware class matching that parses each static `class` attribute and
  tests whitespace-separated class tokens;
- apply it to Search, Danger, Warning, and Custom illustration evidence;
- keep action/data markers as exact attribute checks;
- strengthen the valid self-test fixture so required illustration classes are
  deliberately embedded in multi-class attributes matching production;
- no EmptyState runtime/template/style/token/API changed;
- no governance requirement removed or weakened;
- patched checker passes compile-only JavaScript syntax audit;
- all four required production class tokens are detected by the corrected
  matcher.

Fresh mandatory commands:

`npm run erp-empty-state:check:self-test`

then

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_CLASS_TOKEN_GOV_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_DIRECTIVE_SELECTOR_LINT_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState projection-directive selector lint aligned with ERP naming

Product Owner local verification on
`b0a1a4b4a330baa56927779587c8f42a57d7b99c` confirmed:

- `erp-empty-state:check:self-test` PASS;
- Theme authority PASS;
- routed ERP-only authoring PASS;
- Component Token framework PASS (47 modules);
- System Colors PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpEmptyState governance PASS;
- ErpOverlay PASS;
- ErpConfirmDialog PASS.

The run reached Angular ESLint and stopped on exactly two
`@angular-eslint/directive-selector` errors for the public EmptyState content
projection directives:

- `[erpEmptyStateIllustration]`;
- `[erpEmptyStateExtra]`.

The repository ESLint baseline still requires the generic `app` attribute
prefix, while production ERP components intentionally use the `erp` namespace
and already carry selector-rule exceptions where needed.

Correction:

- preserve the public ERP projection API names;
- add the same narrow, line-local
  `@angular-eslint/directive-selector` exception to the two directive selector
  declarations only;
- do not change global ESLint rules;
- do not rename the directives to `app*`;
- no EmptyState runtime, template, styles, tokens, scenarios, motion, or
  governance assertions changed.

Fresh mandatory gate:

`npm run verify:clean`
<!-- CHATGPT_EMPTY_STATE_DIRECTIVE_SELECTOR_LINT_FIX_2026_10_05_END -->


<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_START -->
## 2026-10-05 — ErpEmptyState canonical verification is Fully Green

Canonical verification was run from the current EmptyState checkpoint after the
projection-directive lint correction.

The first complete run established:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production compilation completed;
- the zero-warning gate detected one component-style budget warning only:
  `empty-state.scss` was 4.34 kB, 341 bytes above the unchanged 4.00 kB
  warning threshold.

The warning was corrected without changing selectors, values, APIs, tokens,
visual behavior, tests, budgets, timeouts, or retries:

- existing Title/Description/Actions/Extra rules moved verbatim from
  `empty-state.scss` into `empty-state-content.scss`;
- the new style file is loaded immediately after the base style;
- EmptyState governance now includes the split style in the same production
  visual contract.

A fresh complete `npm run verify:clean` then passed:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- initial production bundle: 373.68 kB;
- `Zero-warning build gate: PASS`;
- Angular warnings: 0.

Current product state:

- `ErpEmptyState` is a Fully Green technical candidate;
- this does not equal Product Owner visual approval;
- the immediate gate is Product Owner runtime/Light/Dark review of
  `ErpEmptyState`;
- `ErpSelect` remains unopened and no Selection-family implementation is
  authorized.
<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState runtime animation failure diagnosed and corrected

Product Owner runtime/visual review finding:

**EmptyState animation does not run in the browser.**

This finding reopens EmptyState despite the prior canonical technical green.
Technical PASS did not prove rendered CSS animation behavior.

Root cause:

- EmptyState used Angular's default Emulated view encapsulation;
- all `@keyframes honesty-empty-state-*` declarations lived in
  `empty-state-motion-keyframes.scss`;
- the `animation:` declarations that referenced those names lived in separate
  component stylesheets;
- Angular's ShadowCss scopes local keyframe declarations and only rewrites an
  animation reference when the corresponding local keyframe is known while
  processing that same stylesheet;
- therefore the detached keyframe declarations were emitted under scoped names
  while animation declarations in the other stylesheet(s) continued to
  reference the original names.

Correction:

- do not disable view encapsulation;
- do not move component-specific motion to global CSS;
- remove the detached `empty-state-motion-keyframes.scss` assembly;
- remove the monolithic `empty-state-motion-continuous.scss`;
- co-locate each keyframe definition with the animation rules that consume it;
- use bounded motion files:
  - `empty-state-motion-entry.scss`;
  - `empty-state-motion-float.scss`;
  - `empty-state-motion-search.scss`;
  - `empty-state-motion-status.scss`;
  - `empty-state-motion-reduced.scss`;
- keep each motion stylesheet below the component style warning budget before
  build processing;
- strengthen EmptyState governance so an animation/keyframe pair split across
  component stylesheets is rejected by self-test.

No reference geometry, color mapping, public API, scenarios, motion names,
durations, easing, speed contract, or reduced-motion behavior is intentionally
changed by this correction.

EmptyState is no longer considered Product Owner visually accepted or closed.
Fresh executable verification and fresh runtime Light/Dark animation review are
required after this correction.

`ErpSelect` remains unopened.
<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_MIGRATION_2026_10_05_START -->
## EmptyState Product Owner Lottie migration — 2026-10-05

Starting checkpoint: `fb4b392071968800b1286c5c2ce824b173a50b0d`.

The Product Owner superseded the five default SVG compositions with supplied
Lottie artwork. The binding mapping is `no-data -> no-data.json`, `no-search ->
no-search.json`, `error -> error.json`, `forbidden -> forbidden.json`, and
`custom -> custom.json` under `public/lottie/empty-state/`. At that migration
checkpoint, `no-search` retained its asset while defaulting Illustration to
hidden; that historical default is superseded by the Product Owner decision
recorded below. Consumer `erpEmptyStateIllustration` projection still overrides
the default artwork.

The five source files were inspected before import. They contain no external
asset references. Only `general-analytics-animation.json` contained an explicit
white full-canvas `background Outlines` artwork layer; that layer alone was
removed from the project `custom.json` copy. The Downloads originals were not
modified. The other four project copies required no background-layer removal.
Embedded no-search PNG assets preserve alpha transparency.

`lottie-web` `5.13.0` is the sole added runtime and is MIT-licensed. Its local
SVG-only player is copied by the Angular asset pipeline and loaded lazily by an
EmptyState-internal implementation helper; there is no CDN, absolute local
path, or new public Lottie component family. The renderer uses
`xMidYMid meet`, centered `clamp(5.5rem, 16vw, 8.25rem)` bounds, no crop,
stretch, overflow, or CSS artwork background.

Existing EmptyState animation API remains intact. `motionSpeed` calls the
Lottie runtime speed API; `animated=false`, `illustrationMotion='none'`, and
runtime reduced-motion all hold a static first frame. `replayEntrance()` also
rewinds and replays Lottie when motion is allowed. Media-query changes are
observed, and variant replacement/component destruction destroy the previous
AnimationItem so instances cannot overlap or leak. Lottie artwork colors are
Product Owner asset-owned for this wave; component chrome remains governed by
Semantic and EmptyState Component Tokens.

Obsolete default SVG markup, SVG-only tokens, and dead illustration motion
styles were removed. EmptyState governance now verifies assets, exact mapping,
local runtime loading, transparency/background restrictions, speed, replay,
reduced-motion handling, and lifecycle cleanup. Its self-test rejects missing
mapping, Downloads paths, missing destroy/reduced-motion/speed handling, and a
full-canvas background. Entrance-keyframe validation is whitespace-insensitive.

Technical verification is fully green: EmptyState governance self-test PASS;
EmptyState governance PASS; lint/governance PASS; 92/92 test files and 721/721
tests PASS; app/spec typechecks PASS; production build PASS at 373.68 kB initial
with zero Angular warnings; `npm run verify:clean` PASS.

This technical result does not equal Product Owner visual approval. The
immediate gate is Product Owner runtime Light/Dark review of all five Lottie
scenarios, responsive sizing, transparency, motion speeds, replay, and reduced
motion. `ErpSelect` remains unopened, and no Selection Family, ItemPicker,
ComboBox, or SearchBox work is authorized by this wave.

Commit scope: `feat(controls): adopt lottie empty-state illustrations`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_MIGRATION_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie runtime visibility repaired

Product Owner runtime review proved that the first Lottie migration was
technically green while every default illustration remained invisible. The
captured browser exception came from the manual runtime script error handler,
before `window.lottie`, `loadAnimation()`, JSON loading, `DOMLoaded`, or SVG
injection. The previous unit tests replaced the loader with a mock and therefore
did not prove real runtime delivery or rendered DOM output.

Repository diagnosis found the packaged
`node_modules/lottie-web/build/player/lottie_svg.min.js` file present. Before
the correction, the local dev URL `/vendor/lottie-web/lottie_svg.min.js`
returned HTTP 200 with `text/javascript` and real JavaScript, while every
Lottie JSON URL returned HTTP 200 with `application/json` and valid JSON. This
does not negate the Product Owner environment's script-load failure; it proves
that the copied-asset plus injected-global chain was environment-sensitive
rather than a damaged five-asset set.

The correction removes the copied runtime asset, manual `<script>` injection,
and all `window.lottie` dependency. EmptyState now lazy-imports the packaged
SVG-only ESM build through the Angular bundler, explicitly fetches and validates
each JSON response, passes `animationData` to Lottie, and exposes internal
`loading | ready | static | error` evidence. `ready` or `static` is reached
only after `DOMLoaded` and a generated SVG are both present. Runtime import,
HTTP/JSON, `loadAnimation`, `data_failed`, `error`, and missing-SVG failures
are surfaced through Angular's ErrorHandler instead of failing silently.
Animation listeners and the AnimationItem are cleaned up on replacement and
destruction.

Browser runtime evidence on `/controls/empty-states` confirms generated SVG
output for `no-data`, explicitly enabled `no-search`, `error`, `forbidden`,
and `custom`. The scenario matrix keeps all five visible as static evidence.
`float` and `pulse` remain visible and playing; `none` and
`animated=false` remain visible on a static first frame; Replay returns the
allowed animation to playing state. Browser-emulated
`prefers-reduced-motion: reduce` produced six visible generated SVGs in static
state with no playback. The approved responsive clamp is unchanged.

Final technical verification for this correction: EmptyState governance
self-test PASS; EmptyState governance PASS; 92/92 test files and 728/728 tests
PASS; lint/governance PASS; app/spec typechecks PASS; production build PASS at
373.68 kB initial with zero Angular warnings; `npm run verify:clean` PASS.

This technical pass does not equal Product Owner visual approval. The immediate
gate remains Product Owner runtime Light/Dark review of EmptyState Lottie
visibility, artwork, responsive sizing, motion, replay, and reduced motion.
`ErpSelect` remains unopened; Selection Family, ItemPicker, ComboBox, and
SearchBox were not modified.

Commit scope: `fix(controls): restore empty-state lottie runtime`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_START -->
## 2026-10-05 — no-search illustration default superseded

Product Owner superseded the original `no-search` hidden-illustration behavior.
The `no-search` Lottie is now visible by default, so all five EmptyState
scenarios default to visible illustrations. The exact asset mapping remains
`no-search -> /lottie/empty-state/no-search.json`; the ordinary explicit
`showIllustration=false` override remains supported.

The redundant Scenario Matrix `showIllustration=true` override was removed so
the review evidence now exercises the real scenario default. Unit tests prove
the default Lottie and explicit hide override; showcase tests prove the exact
asset; governance rejects a restored hidden default. Browser runtime evidence
confirmed immediate generated SVG output for `no-search`, playing `float` and
`pulse`, visible static `none`, and continued visibility in Light and Dark.

The Lottie runtime, dynamic import, fetch/readiness pipeline, reduced-motion,
lifecycle, sizing, speed, Replay, and JSON assets were not changed. 92/92 test
files and 728/728 tests passed; `npm run verify:clean` passed with zero Angular
warnings. Technical green does not equal Product Owner visual approval.
`ErpSelect` remains unopened.

Commit scope: `fix(controls): show no-search illustration by default`.
<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie illustration size enlarged

Product Owner runtime review found that all five Lottie illustrations were
visible and functional but relatively small. The shared responsive illustration
bounds now supersede `clamp(5.5rem, 16vw, 8.25rem)` with
`clamp(6.75rem, 20vw, 10rem)` for `no-data`, `no-search`, `error`,
`forbidden`, and `custom`. This is one size-contract correction only; the
runtime loader, JSON assets, variant mapping, reduced-motion, replay,
`motionSpeed`, lifecycle cleanup, text, actions, and colors are unchanged.

Runtime evidence covered all 20 combinations of five variants, Light/Dark, and
desktop/narrow viewports. Every specimen reached `ready`, injected an SVG with
`preserveAspectRatio="xMidYMid meet"`, stayed centered, preserved a 24px gap
to the title, and produced no page or stage horizontal overflow. The resolved
box was 160px square on desktop and 108px square at the narrow viewport.
`float` and `pulse` remained animated; `none`, `animated=false`, and a
page initialized with reduced motion retained a visible static SVG frame.
Replay remained ready and visible.

The bounded governance self-test and checker passed, 92/92 test files and
728/728 tests passed, and `npm run verify:clean` passed with zero warnings.
Technical green does not equal Product Owner visual approval. `ErpSelect`
remains unopened; the immediate gate remains Product Owner runtime/visual
review of the enlarged EmptyState illustrations.

Commit scope: `fix(controls): enlarge empty-state illustrations`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_END -->

<!-- CHATGPT_ACCELERATED_CORE_BATCH_2026_10_05_BEGIN -->
## 2026-10-05 — Accelerated Multi-Component Wave

The Product Owner temporarily accepts the current ErpEmptyState result for accelerated continuation; this is not a visual freeze or final approval. The Product Owner explicitly opened one grouped-review wave for ErpSelect, ErpStatusBadge, ErpAlert, ErpSkeleton, ErpAvatar, ErpTabs, ErpTable, and ErpPagination. Technical checks occur per component, while Product Owner runtime/visual review is deferred to the completed group. Technical green remains distinct from visual acceptance, and later findings may reopen any component. Forms, SmartTable, Shell, and all unlisted component families remain unopened.

ErpSelect uses the supplied erp-select.html visual authority and remains distinct from ComboBox, SearchBox, and ItemPicker ownership. The other seven components are implemented under the Product Owner accelerated-wave no-external-reference waiver and reuse the existing Honesty ERP visual language.
<!-- CHATGPT_ACCELERATED_CORE_BATCH_2026_10_05_END -->

### Technical checkpoint

- `npm run verify:clean`: PASS.
- Lint/governance: PASS.
- Tests: 101/101 files and 740/740 tests PASS.
- `typecheck:app`: PASS.
- `typecheck:spec`: PASS.
- Production build: PASS; initial bundle 374.07 kB; zero warnings.
- Grouped Product Owner review remains pending at `/controls/core-batch`.


<!-- ACCELERATED_PHASE_A_HARDENING_2026_10_05_START -->
## 2026-10-05 — Accelerated Phase A hardening complete

The Product Owner authorized a connected two-phase cycle. Phase A hardened the
existing accelerated core batch before any data/table component was opened.

Closed findings:

- ErpSelect now has real coverage for five sizes, single/multiple normalization,
  disabled options, max selection, search/group filtering, all sort modes,
  keyboard/open/close/clear behavior, disabled state, and CVA publication;
- the Product Owner Select reference is recorded as `erp-select.html`,
  SHA-256 `5A31FC10A3D1208BF64E35EB5139823E48F8E2BF1D0190D07DD5DB5DBC4DF23B`;
- Pagination uses the Foundation Query API and one normalized page/count source;
- Tabs consumes its own disabled-foreground Component Token and supports keyed
  rich panel templates;
- Avatar image failure is scoped to the failing source;
- Skeleton line count normalizes to an integer of at least one;
- Table supports keyed rich-cell templates and documents controlled
  `selectedKeys` plus intent-only `rowActivated`;
- broad selector lint suppressions were replaced by line-scoped exceptions;
- StatusBadge remains noninteractive and creates no automatic live region.

Canonical Phase A verification:

- `npm run verify:clean`: PASS;
- lint/governance: PASS;
- tests: 101/101 files and 758/758 tests PASS;
- `typecheck:app`: PASS;
- `typecheck:spec`: PASS;
- production build: PASS, initial bundle 374.08 kB, zero Angular warnings.

The Product Owner explicitly authorizes immediate Phase B implementation of
exactly SortHeader, ColumnChooser, FilterBar, FilterDrawer, TableToolbar,
BulkActionBar, ViewSwitcher, and SmartTable. Product Owner visual review remains
grouped until the connected cycle is complete. Forms and Shell remain unopened.
Technical green does not equal visual acceptance.
<!-- ACCELERATED_PHASE_A_HARDENING_2026_10_05_END -->


<!-- ACCELERATED_PHASE_B_DATA_TABLE_2026_10_05_START -->
## 2026-10-05 — Accelerated Phase B data/table batch complete

Phase B implemented exactly ErpSortHeader, ErpColumnChooser, ErpFilterBar,
ErpFilterDrawer, ErpTableToolbar, ErpBulkActionBar, ErpViewSwitcher, and
ErpSmartTable. The pre-implementation reference audit found no external visual
reference for any of the eight after checking repository source/docs, Product
Owner template locations, Downloads, and the available template archive. All
eight therefore use the explicit Product Owner accelerated-wave
no-external-reference waiver and the existing Honesty ERP visual language.

The data/table boundary is now explicit:

- ErpTable remains the semantic rendering gateway and owns the single keyed
  rich-cell template contract;
- ErpSmartTable orchestrates the approved lower controls and owns local
  sort/filter/page behavior or revisioned remote query intents only;
- remote data loading, stale-response policy, transport, permissions, and
  business actions remain outside SmartTable;
- FilterDrawer stages typed filters in the shared OverlayFrame;
- loading, empty, and error presentation reuse ErpSkeleton, ErpEmptyState, and
  ErpAlert;
- all eight visual components own isolated Component Token modules, bringing
  the repository total to 63 concrete modules;
- long-lived governance rejects HTTP ownership, missing lower-owner
  composition, raw routed table authoring, a duplicate cell renderer, and
  missing token bases; its self-test passes.

Canonical Phase B verification:

- npm run verify:clean: PASS;
- lint/governance: PASS;
- tests: 110/110 files and 778/778 tests PASS;
- typecheck:app: PASS;
- typecheck:spec: PASS;
- production build: PASS, initial bundle 374.44 kB / estimated transfer
  85.38 kB, zero Angular warnings.

The combined technical review routes are /controls/core-batch and
/controls/data-batch. Product Owner grouped runtime/visual review remains
pending for both batches. Technical green does not equal visual acceptance and
later findings may reopen any component. Forms, Shell, and every unlisted
future component remain unopened.

Commit scope: feat(controls): add accelerated data table batch.
<!-- ACCELERATED_PHASE_B_DATA_TABLE_2026_10_05_END -->
