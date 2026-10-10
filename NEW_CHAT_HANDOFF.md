# HONESTY ERP Design Lab — NEW CHAT HANDOFF

## Current continuation point — Product Owner desktop review of V1

Visual Review Experience V1 prepares all 81 public component routes for
desktop review. Each route presents generated real-supported Gallery evidence,
truthful reference provenance/comparison, one interactive target, collapsed
full API controls, and output evidence. `/components/app-shell` still controls
the one real root AppShell and never nests another shell. Existing exact-core
evidence and the complete multi-owner Table reference remain intact.

The persisted audit under
`docs/review-evidence/visual-review-experience-v1/` passes all 81 routes with
zero runtime failures and includes ten inspected desktop/narrow Light/Dark
RTL/LTR captures. Canonical verification passes 153/153 files and 886/886
tests with a zero-warning 424.96 kB / 93.08 kB build. The next action is Product Owner review at
`http://localhost:4999/components`; no production redesign or business/UI owner
wave is opened. CheckBox stays accepted/frozen, five owners stay reopened, and
75 stay pending.

## Current continuation point — consolidated Product Owner review

Continue from synchronized `main` after the Page Composition and global
lifecycle closure checkpoint. Page, PageHeader, and PageShell have meaningful
one-target Workbenches and persisted Light/Dark RTL/LTR desktop/narrow evidence
under `docs/review-evidence/erp-page/page-composition-v1-internal-review/`.
The evidence passes 30/30 assertions; canonical verification passes 152/152
files and 880/880 tests with a zero-warning 418.32 kB / 92.91 kB build.

The final actual-root runtime audit passes 81/81 public routes with one
AppShell, RouterOutlet, OverlayHost, and primary target per route, and zero
broken images, horizontal overflow, or browser diagnostics.

The generated lifecycle ledger reports 81 public owners: one explicitly
accepted/frozen owner and 80 technically verified, internally reviewed
candidates. No further implemented public UI owner is queued. Product Owner
visual review remains pending; internal review must not be reported as
acceptance. The six planned identities and all business Feature/Page, CRUD,
workflow, transport, permissions, and backend work remain closed until a new
explicit authorization.

## Current continuation point — Entity Form reviewed internally

Continue from synchronized `main` after the Entity Form checkpoint.
EntitySchemaFields now demonstrates all 13 built-in field owners and projected
custom content; StandardEntityForm demonstrates four controlled steps, custom
section/review projection, controlled values, and submit intent. The browser
review corrected empty optional pattern propagation that had invalidated
non-empty inputs and blocked submission. Evidence under
`docs/review-evidence/erp-entity-form/entity-form-v1-internal-review/` passes
48/48 assertions. Canonical verification passes 149/149 files and 877/877
tests with a zero-warning 418.32 kB / 92.88 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpPage`, `ErpPageHeader`, and
`ErpPageShell`.

## Current continuation point — Forms composition reviewed internally

Continue from synchronized `main` after the Forms composition checkpoint.
Form now composes FormSection and FormActions; Section and Actions expose real
projected interaction evidence; ValidationSummary activates real issues; and
Repeater renders controlled Arabic business rows with working add/remove.
Evidence under
`docs/review-evidence/erp-forms/forms-composition-v1-internal-review/` passes
60/60 browser assertions. Canonical verification passes 147/147 files and
874/874 tests with a zero-warning 418.32 kB / 92.88 kB build. Product Owner
acceptance is not recorded. Continue Bottom-Up with `ErpEntitySchemaFields`
and `ErpStandardEntityForm`.

## Current continuation point — Data/Table composition reviewed internally

Continue from synchronized `main` after the Data/Table composition checkpoint.
BulkActionBar, FilterBar, FilterDrawer, TableToolbar, and SmartTable have
meaningful one-target projections and controlled interactions. Default toolbar
and Pagination layouts contain at 390 px; standalone Table columns scroll in
the owned viewport without text collision; exact Table-reference presentation
remains separate and intact. Evidence under
`docs/review-evidence/erp-data-table/data-composition-v1-internal-review/`
passes 50/50 browser assertions. Canonical verification passes 142/142 files
and 869/869 tests with a zero-warning 418.32 kB / 92.89 kB build. Product Owner
acceptance is not recorded. Continue Bottom-Up with `ErpForm`,
`ErpFormSection`, `ErpFormActions`, `ErpValidationSummary`, and `ErpRepeater`.

## Current continuation point — Navigation owners reviewed internally

Continue from synchronized `main` after the Navigation checkpoint.
Breadcrumbs preserves its complete four-level destination at narrow widths;
Pagination and SortHeader are controlled live targets; Stepper renders real
projected panels and disabled/completed/optional states. Exact ERP-TABLE
presentations remain intact. Evidence under
`docs/review-evidence/erp-navigation/navigation-v1-internal-review/` passes
40/40 browser assertions. Canonical verification passes 137/137 files and
863/863 tests with a zero-warning 418.32 kB / 92.88 kB build. Product Owner
acceptance is not recorded. Continue Bottom-Up with `ErpBulkActionBar`,
`ErpFilterBar`, `ErpFilterDrawer`, `ErpTableToolbar`, and `ErpSmartTable`.

## Current continuation point — ColumnChooser and ViewSwitcher reviewed internally

Continue from synchronized `main` after the ColumnChooser/ViewSwitcher
checkpoint. ColumnChooser has realistic controlled visibility evidence and its
Table-reference overlay now initializes correctly after live presentation
changes. ViewSwitcher exposes synchronized selected, disabled, model and event
state. Evidence under
`docs/review-evidence/erp-selection/column-view-v1-internal-review/` passes
49/49 browser assertions. Canonical verification passes 133/133 files and
859/859 tests with a zero-warning 418.32 kB / 92.90 kB build. Product Owner
acceptance is not recorded. Continue Bottom-Up with `ErpBreadcrumbs`,
`ErpPagination`, `ErpSortHeader`, and `ErpStepper`.

## Current continuation point — Alert and Skeleton reviewed internally

Continue from synchronized `main` after the Alert/Skeleton checkpoint. Alert's
one-target Workbench includes meaningful projected action and dismissal; its
390 px anatomy now gives copy a complete row and places actions below without
clipping. Skeleton defaults to three lines and covers every variant, size,
static and reduced-motion path. Evidence under
`docs/review-evidence/erp-feedback/alert-skeleton-v1-internal-review/` passes
57/57 browser assertions. Canonical verification passes 131/131 files and
855/855 tests with a zero-warning 418.32 kB / 92.90 kB build. Product Owner
acceptance is not recorded. Continue Bottom-Up with `ErpColumnChooser` and
`ErpViewSwitcher`.

## Current continuation point — Tooltip reviewed internally

Continue from synchronized `main` after the Tooltip checkpoint. The custom
element is content-sized; the generated one-target Workbench provides valid
plain, rich-information, and rich-interactive projection, and both motion
editors expose all 23 public presets. Evidence under
`docs/review-evidence/erp-tooltip/v1-internal-review/` passes 49/49 browser
assertions. Canonical verification passes 129/129 files and 851/851 tests with
a zero-warning 418.32 kB / 92.89 kB build. Product Owner acceptance is not
recorded. Continue Bottom-Up with `ErpAlert` and `ErpSkeleton`.

## Current continuation point — floating actions reviewed internally

Continue from synchronized `main` after the Fab/ExtendedFab/FabMenu checkpoint.
Hosts are content-sized; FabMenu owns synchronized trigger/menu semantics,
initial action focus, native-close state and Escape/focus return. The generated
preview keeps the open surface contained at narrow width. Evidence under
`docs/review-evidence/erp-floating-actions/v1-internal-review/` passes 56/56
browser assertions. Canonical verification passes 128/128 files and 849/849
tests with a zero-warning 418.32 kB / 92.89 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpTooltip`.

## Current continuation point — grouped actions reviewed internally

Continue from synchronized `main` after the ButtonGroup/SplitButton checkpoint.
The custom-element hosts are content-sized, ButtonGroup has a public accessible
group label, and SplitButton exposes one menu owner with synchronized trigger
state and menuitem semantics. Evidence under
`docs/review-evidence/erp-grouped-actions/v1-internal-review/` passes 50/50
browser assertions. Canonical verification passes 128/128 files and 845/845
tests with a zero-warning 418.32 kB / 92.92 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpFab`, `ErpExtendedFab`, and
`ErpFabMenu`.

## Current continuation point — Button and IconButton reviewed internally

Continue from synchronized `main` after the Button/IconButton checkpoint. The
one-target Workbenches use meaningful Arabic actions, live pressed evidence,
and synchronized visible Tooltip/accessibility labels. The confirmed
IconButton host-occupancy mismatch is corrected. Evidence under
`docs/review-evidence/erp-button-family/v1-internal-review/` passes 36/36
browser assertions. Canonical verification passes 128/128 files and 844/844
tests with a zero-warning 418.32 kB / 92.91 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpButtonGroup` and
`ErpSplitButton` before floating-action composites.

## Current continuation point — FilePicker and ImagePicker reviewed internally

Continue from synchronized `main` after the FilePicker/ImagePicker checkpoint.
The Workbenches use one live target, meaningful Arabic ERP constraints, and a
real local `File[]` sample without feeding browser `File` objects through the
generic JSON editor. Evidence under
`docs/review-evidence/erp-file-image-pickers/v1-internal-review/` passes 52/52
browser assertions. Canonical verification passes 128/128 files and 843/843
tests with a zero-warning 418.32 kB / 92.90 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpButton` and `ErpIconButton` before
their composite consumers.

## Current continuation point — selection pickers reviewed internally

Continue from synchronized `main` after the ItemPicker/IconPicker/ColorPicker
checkpoint. Generated Workbenches now begin with meaningful ERP values and
the evidence package proves item/icon staged commits plus system/free color
editing on the one live target. Evidence under
`docs/review-evidence/erp-selection-pickers/v1-internal-review/` passes 104/104
browser assertions. Canonical verification passes 128/128 files and 841/841
tests with a zero-warning 418.32 kB / 92.88 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpFilePicker` and `ErpImagePicker`.

## Current continuation point — SearchBox and ComboBox reviewed internally

Continue from synchronized `main` after the SearchBox/ComboBox checkpoint. The
Workbenches now use meaningful Arabic ERP records, and the optional typed
description is visible and searchable in both owned result surfaces. Evidence
under `docs/review-evidence/erp-search-combo/v1-internal-review/` passes 48/48
browser assertions. Canonical verification passes 128/128 files and 838/838
tests with a zero-warning 418.32 kB / 92.89 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpItemPicker`, `ErpIconPicker`, and
`ErpColorPicker`.

## Current continuation point — temporal inputs reviewed internally

Continue from synchronized `main` after the four-owner temporal checkpoint.
Production APIs/defaults are unchanged; generated Workbench fixtures and real
picker interactions now make every temporal CVA path observable. The evidence
package under
`docs/review-evidence/erp-temporal-inputs/v1-internal-review/` passes 88/88
browser assertions. Canonical verification passes 128/128 files and 834/834
tests with a zero-warning 418.32 kB / 92.89 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpSearchBox` and `ErpComboBox`.

## Current continuation point — numeric interaction inputs reviewed internally

Continue from synchronized `main` after the NumberStepper/RangeSlider
checkpoint. Production APIs/defaults are unchanged; generated Workbench
fixtures now make bounded numeric and range CVA interactions immediately
observable. The evidence package under
`docs/review-evidence/erp-numeric-inputs/v1-internal-review/` passes 36/36
browser assertions. Canonical verification passes 128/128 files and 830/830
tests with a zero-warning 418.32 kB / 92.89 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, and `ErpDateRangeBox`.

## Current continuation point — foundational text-like fields reviewed internally

Continue from synchronized `main` after the seven-owner Input/Field checkpoint.
Production APIs/defaults are unchanged; generated Workbench fixtures now make
their CVA values and field anatomy immediately observable. The evidence package
under `docs/review-evidence/erp-text-fields/v1-internal-review/` passes 112/112
browser assertions. Canonical verification passes 128/128 files and 828/828
tests with a zero-warning 418.32 kB / 92.90 kB build. Product Owner acceptance
is not recorded. Continue Bottom-Up with `ErpNumberStepper` and
`ErpRangeSlider`.

## Current continuation point — public primitives fully reviewed internally

Continue from synchronized `main` after the `ErpIcon` / `ErpText` checkpoint.
The production owners and defaults are unchanged; only their generated
workbench evidence was made meaningful. Browser captures and 26/26 passing
assertions are under
`docs/review-evidence/erp-public-primitives/v1-internal-review/`. Canonical
verification passes 128/128 files and 821/821 tests with a zero-warning
418.32 kB / 92.88 kB build. Product Owner acceptance is not recorded. Continue
Bottom-Up with the foundational text-like Input/Field family, beginning with
`ErpTextBox` and `ErpTextAreaBox`.

## Current continuation point — structural primitives reviewed internally

Continue from synchronized `main` after the bounded structural-family
checkpoint. Browser captures, measurements, the 100/100 runtime result and
reproduction steps are under
`docs/review-evidence/erp-structural-primitives/v1-internal-review/`. All seven
owners retain their production API/defaults; the workbench generator and
generated pages now make projection, gap, orientation, and inverse-tone states
observable. Canonical verification passes 128/128 files and 820/820 tests with
a zero-warning 418.32 kB / 92.90 kB build. Product Owner acceptance is not
recorded. Continue Bottom-Up with the remaining public primitives: `ErpIcon`
and `ErpText`.

## Current continuation point — ErpAvatarPicker reviewed internally

Continue from synchronized `main` after the bounded Picker checkpoint. Direct
reference/implementation captures and 34 passing runtime assertions are under
`docs/review-evidence/erp-avatar-picker/v1-internal-review/`. The final result
uses one Tabs track, a 44/34px track/trigger, rounded default avatars, 44px
Avatar-owned preview, source-contract footer inset and the full 60/56 image
catalog. No implementation capture has overflow, a broken image or browser
diagnostic. Canonical verification passes 128/128 files and 819/819 tests with
a zero-warning 418.32 kB / 92.91 kB build. Product Owner acceptance is not
recorded. Continue Bottom-Up with structural primitives, starting at
`ErpContainer`.

## Current continuation point — ErpAvatar reviewed internally

Continue from synchronized `main` after the bounded Avatar checkpoint.
Reference/implementation screenshots, measurements and reproduction steps are
under `docs/review-evidence/erp-avatar/v1-internal-review/`. All six fixed
reference sizes match at zero delta, the narrow mapping matches, and the full
shape/content/presence/position/motion evidence has been inspected. No
production Avatar defect was reproduced, so component/API code remains
unchanged; the 116-image catalog and 40 legacy mappings remain intact.
Canonical verification passes 128/128 files and 818/818 tests with a
zero-warning 418.32 kB / 92.88 kB build. Product Owner approval is not
recorded. Continue with `ErpAvatarPicker` and its binding exact reference.

## Current continuation point — ErpStatusBadge reviewed internally

Continue from synchronized `main` after the bounded StatusBadge checkpoint.
The binding source and implementation were rendered at matched conditions;
screenshots, measurements and reproduction instructions are under
`docs/review-evidence/erp-status-badge/v1-internal-review/`. Exact fixed
geometry now matches, including the corrected 14px medium count and 12px remove
action. The implementation reports zero overflow, broken images and browser
diagnostics. Canonical verification passes 128/128 files and 818/818 tests
with a zero-warning 418.32 kB / 92.88 kB build. Product Owner acceptance is
not recorded. Continue with `ErpAvatar` and its binding exact reference.

## Current continuation point — ErpUserMenu reviewed internally

Continue from synchronized `main` after the bounded UserMenu evidence
checkpoint. The live Skodash popup reference and 22 ERP implementation states
are persisted under
`docs/review-evidence/erp-user-menu/v3-internal-review/`. The reference popup
geometry was measured directly; the implementation preserves it while keeping
the Product Owner-authorized three-row trigger. Popup scrolling remains owned
only by the action list, the identity stays fixed, Dark semantic contrast is
readable and all implementation captures report zero page overflow, broken
images and browser diagnostics. The centered 320 x 568 long-identity Workbench
case leaves a 20.03px action viewport; retain this explicit review-surface
limitation rather than altering production geometry for a synthetic anchor.
Canonical verification passes 128/128 files and 818/818 tests with a
zero-warning 418.32 kB / 92.91 kB build. Product Owner approval is not recorded.
All reopened candidates are now internally reviewed; continue with the binding
`ErpStatusBadge` reference.

## Current continuation point — ErpTable reviewed internally

Continue from synchronized `main` after the bounded ErpTable checkpoint. The
binding source was rendered from an isolated local copy and compared directly
with the ERP experience across all six specimens. Persisted reference and
implementation screenshots, runtime measurements and reproduction steps are
under `docs/review-evidence/erp-table/v2-internal-review/`. Maximum measured
layout delta is 0.5px, implementation page overflow is zero at 390px, and the
single live target now proves meaningful Arabic data plus selection, sorting,
row activation, resizing, visibility and footer contracts. Product Owner
visual approval remains pending. Continue with the reopened `ErpUserMenu`.
Focused verification passes 3/3 files and 38/38 tests; canonical verification
passes 128/128 files and 818/818 tests, all lint/governance, both typechecks
and the zero-warning 418.32 kB / 92.91 kB production build.

## Current continuation point — ErpTabs reviewed internally

Continue from synchronized `main` after the bounded ErpTabs checkpoint.
Reference/implementation screenshots, measurements and reproduction steps are
under `docs/review-evidence/erp-tabs/v1-internal-review/`. Exact horizontal and
vertical component geometry matches the binding source; the workbench now uses
five Arabic ERP tabs and proves model/events/disabled behavior on one target.
The narrow review also found and corrected closed AppShell Sidebar visual
overflow, with governance protection and zero implementation page overflow at
390/320 px. Canonical verification passes 128/128 files and 817/817 tests,
both typechecks, all governance and the zero-warning 418.32 kB / 92.90 kB
build. Product Owner visual approval remains pending. Continue with the
reopened `ErpTable` full reference experience.

## Current continuation point — ErpSelect V3 reviewed internally

Continue from live `main` after the bounded ErpSelect checkpoint. Direct
reference/implementation evidence lives at
`docs/review-evidence/erp-select/v3-internal-review/`. The verified correction
sets the medium control to the reference 13 px type, aligns the popup to the
control at 0 px delta by measuring its unscaled layout box, keeps only
top/bottom placement, assigns the 300 px limit to the listbox, and bounds the
320 x 568 popup to measured vertical space without trigger overlap. The one
primary workbench target uses searchable Arabic ERP options; exact evidence
remains secondary/on demand. Product Owner visual approval is not recorded.
Canonical verification passes 128/128 test files and 816/816 tests, both
typechecks, all governance, and the zero-warning 418.32 kB / 92.88 kB build.
The next reopened exact-reference unit is `ErpTabs`.

## Current continuation point — EmptyState reviewed internally

The EmptyState dedicated page keeps one primary live target and offers the
complete five-scenario reference evidence on demand. Evidence and reproduction
instructions are under
`docs/review-evidence/erp-empty-state/v1-internal-review/`. Final Light/Dark,
RTL/LTR desktop/narrow measurements show 160/108 px Lottie illustrations and
zero clipping, page overflow, broken images, or diagnostics after correcting a
real narrow extra-action wrapping defect. The historical source HTML could not
be recovered, so do not describe this as a fresh pixel overlay. Product Owner
visual review remains pending. Canonical verification passes 128/128 test files
and 812/812 tests, both typechecks, all governance/lint, and the zero-warning
418.32 kB / 92.91 kB build. Continue with the reopened `ErpSelect` unit.

## Current continuation point — Radio family reviewed internally

`ErpRadioBox` and `ErpRadioGroup` now expose their rich reference/state evidence
on demand under their dedicated pages without adding another
`data-showcase-target`. Runtime evidence lives at
`docs/review-evidence/erp-radio-family/v1/`; the exact control scale and
responsive Light/Dark RTL/LTR cases have no overflow, clipping, broken images,
or diagnostics. The external file named by older history was unavailable, so
the accepted CheckBox V5 family direction remains the source-grounded method.
The full gate passes 128/128 test files and 811/811 tests, both typechecks, all
governance/lint, and a zero-warning build. Product Owner visual acceptance is
still pending. Continue with `ErpEmptyState`; do not alter accepted
`ErpCheckBox` visuals.

## Authoritative current handoff — 2026-10-10 — autonomous UI backlog continuation

Start from live `main` and preserve the Product Owner's new authorization to
continue documented UI visual candidates without an intermediate review pause.
Never translate internal visual review into Product Owner acceptance, and do
not open business Feature/Page work or invent owners.

The current Shell checkpoint entered at
`6379313f8439cc7aefe025f2e6ecfcc8d9d1d481`. The root AppShell workbench now
distinguishes a no-destination navigation-intent specimen from real Table/Tabs
destinations, so output evidence and actual App-owned routing both function.
The xxs Topbar keeps BranchSelector and Search together in a contained row and
the complete UserMenu identity in its own row. At 320 px it measures 227.30 px,
with 0 px horizontal overflow, instead of the earlier 283.30 px stack.

The persisted integrated audit covers 81/81 routes and records one AppShell,
RouterOutlet, OverlayHost and primary target per route, with zero diagnostics,
broken images or horizontal overflow. The full canonical gate passes 127/127
test files and 808/808 tests, all governance/lint, both typechecks and the
zero-warning build. Continue next with the global component
lifecycle/backlog ledger, then the next repository-documented Bottom-Up UI
owner. Shell and subsequent candidates remain
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

Use `src/app/controls/ERP_COMPONENT_LIFECYCLE_LEDGER_V1.md` as the current
global inventory. It is generated from the authoritative catalog and checked
by `npm run erp-component-lifecycle:check`. The next owner is `ErpRadioBox`;
preserve accepted/frozen `ErpCheckBox` V5 and limit `ErpRadioGroup` changes to
proven compatibility needs.

## Authoritative current handoff — 2026-10-10 — root-owned AppShell Workbench complete

Start from live `main`. The bounded recovery began at published
`94c20bcd55eda2eb722ddad65d6280eaf11592c7` with 21 modified
AppShell/evidence files. A hash-verified backup was made outside the repository;
every pre-existing modification was confirmed relevant and retained.

`/components/app-shell` now controls the one application-root `ErpAppShell`.
It contains no nested shell and no second live target. Typed Angular
review-internal state applies inputs/models and records outputs, then clears on
route exit; re-entry restores the documented defaults. Custom `window` event
bridges are absent. All other component routes continue to expose their own
single primary target.

The 81/81 route audit and AppShell browser matrix are current under
`docs/review-evidence/erp-shell/`. Canonical verification passes 127/127 test
files and 807/807 tests, all governance/lint, both typechecks, and the
zero-warning build at 418.32 kB / 92.88 kB estimated transfer. The complete
Shell is `TECHNICAL_VERIFIED` and `INTERNAL_VISUAL_REVIEW_COMPLETED`, while
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING` remains binding. The only next action is
consolidated Product Owner review; do not open unrelated work.

## Authoritative current handoff — 2026-10-09 — complete App Shell ready for consolidated review

The autonomous Shell wave started at
`6ceaf966c4b22efa0faf1d32e3dae841fd800c31` and completed the missing
Applications and Messages public menus, refined the existing Notifications and
Global Search owners, corrected responsive Shell composition, and installed
`ErpAppShell` as the real Design Lab application frame. The root retains one
theme authority, one RouterOutlet and one OverlayHost; route state and review
data remain application-owned.

The authoritative evidence package is
`docs/review-evidence/erp-shell/autonomous-app-shell-wave/`. It covers six
viewport widths, Light/Dark, RTL/LTR, open overlays, narrow Sidebar, active
search and browser navigation. All delivered work is
`TECHNICAL_VERIFIED` and `INTERNAL_VISUAL_REVIEW_COMPLETED`, while
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING` remains the only visual status. The next
action is consolidated Product Owner review; no unrelated implementation wave
is authorized by this handoff.

The direct browser audit also passes every 81/81 public component route under
the real Shell with zero diagnostics, broken images, or horizontal overflow.

The final canonical gate passes 126/126 test files and 804/804 tests, all
governance/lint, both typechecks, and the zero-warning production build. Initial
output is 414.89 kB / 91.62 kB estimated transfer.

## Authoritative current handoff — 2026-10-09 — UserMenu final trigger candidate

Only the closed `ErpUserMenu` trigger was reopened. Its live default now shows
a logical-start 60 px Avatar beside exactly three maximum rows: name, email,
then role/branch badges. Both trigger badge controls default true;
`secondaryText` remains available only in the open popup. Popup geometry,
vertical placement, arrow tracking, action-only scrolling and interactions are
unchanged.

Canonical verification passes 124/124 files and 793/793 tests with zero
warnings. Review the full/cropped screenshots and measurements at
`docs/review-evidence/erp-user-menu/final-trigger-v2/`. The result remains
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The completed S2 technical checkpoints
remain intact; no additional Shell owner or component wave is authorized.

## Authoritative current handoff — 2026-10-09 — Shell S2 wave complete

S2-A Sidebar, S2-B Topbar, S2-C AppFooter, S2-D QuickActionsBar and S2-E
AppShell integration are `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. AppShell optionally composes the new
owners, preserves the old composition when they are absent, forwards only
activation intent, and demonstrates the established BranchSelector,
GlobalSearch, NotificationBell and unchanged UserMenu in one production-style
workbench.

Canonical verification passes 124/124 files and 792/792 tests, all governance,
both typechecks, production build, and zero warnings. Evidence and the deferred
review checklist are indexed at `docs/review-evidence/erp-shell/README.md`;
AppShell measurements cover 1440/1280/1024/768/390/320 px with zero page/Shell
horizontal overflow, broken images or diagnostics. Stop for consolidated
Product Owner visual review. No additional Shell owner, application feature,
page migration, or component wave is authorized.

## Authoritative current handoff — 2026-10-09 — Shell S2-D complete

S2-A Sidebar, S2-B Topbar, S2-C AppFooter and S2-D QuickActionsBar are
technically verified and visually pending. QuickActionsBar is a data-driven,
in-flow owner using IconButton, Tooltip and Text; it does not hardcode the
unavailable Gxon taxonomy or viewport positioning. Its dedicated workbench,
six-condition evidence and 124-file/791-test canonical gate pass with zero
warnings or browser diagnostics.

The exact next permitted unit is S2-E minimum AppShell integration. Compose the
existing four owners with the established Search, Branch Selector,
Notifications and UserMenu; do not redesign reused owners or open another
Shell family.

## Authoritative current handoff — 2026-10-09 — Shell continuation S2-C

S2-A Sidebar, S2-B Topbar, and S2-C AppFooter are `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. `ErpAppFooter` is the single new global
application-footer owner and composes ErpText, ErpStatusBadge, and ErpButton.
Its original-design authority, no-Gxon-evidence boundary, public API, empty
state, and ownership are recorded in
`src/app/controls/app-footer/ERP_APP_FOOTER_CANDIDATE_V1.md`.

Canonical verification passes 123/123 files and 788/788 tests, all governance,
both typechecks, production build, and zero warnings. Six browser conditions
are persisted under `docs/review-evidence/erp-shell/s2-c-app-footer/`. Continue
only with S2-D QuickActionsBar; its category vocabulary remains consumer-owned
because no authoritative fixed taxonomy was recovered.

## Authoritative current handoff — 2026-10-09 — Shell continuation S2-B

S2-A Sidebar and S2-B Topbar are `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. S2-B retains the five canonical Topbar
slots, removes the stale notification-only showcase marker, and demonstrates
real BranchSelector, GlobalSearch, NotificationBell, and UserMenu composition.
Its reference/design boundary is recorded in
`src/app/controls/topbar/ERP_TOPBAR_REFERENCE_V1.md`; six real browser captures
and measurements are in `docs/review-evidence/erp-shell/s2-b-topbar/`.

Canonical verification passes 122/122 files and 785/785 tests, all governance,
both typechecks, production build, and zero warnings. Continue only with S2-C
AppFooter, an original Honesty ERP candidate because the Gxon source is not
reliably accessible. Do not alter the pending UserMenu candidate.

## Authoritative current handoff — 2026-10-09 — Shell continuation S2-A

The Product Owner superseded the historical "S2 closed" restriction only for
the bounded Sidebar, Topbar, AppFooter, QuickActionsBar, and AppShell integration
sequence. Entry was clean live `main`
`216fd4d36819df0adfbcdb0c599574d2b67469cd`. Read
`src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md` and
`src/app/controls/sidebar/ERP_SIDEBAR_REFERENCE_V1.md`.

S2-A retains the public Sidebar owner and adds controlled collapsed/expanded
state, real disclosure semantics, active-ancestor expansion, keyboard traversal,
long-label containment, badges, and a 270/60 px expanded/collapsed contract.
The app still owns permissions, routes, and taxonomy. Technical verification is
122/122 files and 785/785 tests, all governance/typechecks, production build,
and zero warnings. Status is `TECHNICAL_VERIFIED` and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Proceed only to S2-B Topbar within this
authorized wave; preserve the pending UserMenu candidate unchanged.

## Authoritative current handoff — 2026-10-08 — Shell S1 compact UserMenu trigger

Start from live `main`. This bounded correction entered at
`991c03daaf01b5bd3dd8ab03b222cdcc4f57b6f0` and affects only the existing
`ErpUserMenu`. Read its exact contract and
`docs/review-evidence/erp-user-menu/compact-trigger-v1/README.md` first.

The closed trigger now contains at most name, email, and one metadata row.
Role/branch badges remain visible by default in the popup but require their new
independent default-false trigger gates in the capsule. Current evidence records
71--72 px full-identity capsules, 40 px centered Avatar, zero block clipping,
zero horizontal/popup overflow, zero broken images, and one live workbench
target. Canonical verification passes 122/122 files and 782/782 tests, both
typechecks, production build, all governance, and zero warnings. The next
action is Product Owner visual review; do not open S2 or another owner.

## Authoritative current handoff — 2026-10-08 — 3D avatar collection review

Start from live `main`. This bounded asset task entered at
`30d6bd942015743fb3f02c7faeb563961fa978ac` and replaces the former 40-image
system library with 116 Product Owner-supplied 512 x 512 transparent PNGs.
Read `src/app/controls/avatar-picker/ERP_AVATAR_ASSET_LIBRARY_V2.md`, the
manifest, and `docs/review-evidence/erp-avatar-library/` first. Counts are
116 total, 60 male, and 56 female; source numbers 1..116 are complete and
unique; aggregate SHA-256 is
`39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.
Legacy IDs/genders/URLs remain compatible, AvatarPicker defaults to the entire
catalog, and its images still render through ErpAvatar. Product Owner visual
review is pending. Canonical verification passes 122/122 test files and
779/779 tests, all lint/governance, both typechecks, production build, and zero
warnings. Do not open another Shell phase or redesign a component.

## Authoritative current handoff — 2026-10-08 — Shell S1 dark contrast and scroll ownership

Start from live `main`. This bounded correction entered at
`415298b7921719747efcc17dc82f9e889ccac64c` and affects only `ErpUserMenu`.
Read the exact contract and
`docs/review-evidence/erp-user-menu/s1-final-dark-contrast-scroll.json` first.
Dark foreground inheritance and duplicate popup scrolling are closed: the
surface consumes the existing foreground token and remains non-scrolling,
while actions alone scroll with identity position unchanged. Product Owner
review is pending; S2 remains closed. Focused verification passes 58/58 tests;
the canonical gate passes 122/122 files and 776/776 tests, both typechecks,
production build, and zero warnings.

## Authoritative current handoff — 2026-10-08 — Shell S1 popup geometry gate

Start from live `main`. This bounded gate entered at
`ccddf29d22b4608016d27818b17a2584a0f06632` and affects only UserMenu and its
opt-in shared anchored-surface capabilities. Read the UserMenu exact contract
and `docs/review-evidence/erp-user-menu/s1-final-popup-geometry.json` first.

UserMenu now allows bottom/top placement only, measures available height before
surface measurement, preserves identity readability, and scrolls only actions.
Identity order is consistent between trigger and card. Browser evidence across
320x568, 320x844, 390x844, 768x900, and 1440x900 records zero overlap,
overflow, broken images, or console diagnostics. Focused verification passes
57/57 tests and the canonical gate passes 122/122 files and 775/775 tests,
both typechecks, production build, and zero warnings. The next action is Product
Owner visual review; S2 remains closed.

## Authoritative current handoff — 2026-10-08 — Shell S1 UserMenu identity refinement

Start from live `main`. This bounded task entered at
`b210bb1311841dea836379e996f53aaa5a7ddf74` and changes only the existing
`ErpUserMenu`, its compatible user-summary type, its dedicated showcase
fixtures, and directly related governance/evidence. Read
`src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md` first.

The component now provides a responsive multi-line trigger; optional email,
role, branch, and presence data; and six default-true visibility inputs. It
reuses `ErpAvatar` and `ErpStatusBadge`, preserves the single anchored-overlay
engine and corrected arrow computation, and allows only the action region to
scroll. The `/components/user-menu` workbench retains one primary target and
updates it live through identity presets and visibility controls.

Verification passes 2/2 focused files and 27/27 focused tests, all governance
and lint, 122/122 canonical test files and 768/768 tests, both typechecks,
production build, and zero warnings. Initial production bundle is 490.24 kB /
105.57 kB estimated transfer.

The next action is external Product Owner review across 320/390/768/desktop,
Light/Dark, and RTL/LTR. S2, Sidebar, Topbar, Applications/Messages,
NotificationBell, AppFooter, QuickActionsBar, AppShell, and the root layout are
not open.

Gxon is presently unavailable and is no longer a blocker for later AppFooter
or QuickActionsBar work. Such work still needs separate authorization and
explicit Product Owner/Honesty ERP design decisions; never fabricate unavailable
measurements. Later Gxon recovery does not automatically reopen accepted work.

## Authoritative current handoff — 2026-10-08 — Shell S1 final evidence closure

Start from live `main`. This bounded follow-up entered at
`b28012f18dfd74ac9c37827e00010d70f701719f` and changes only the existing
`ErpUserMenu` arrow alignment and evidence. Read
`src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md`, the UserMenu
owner, its Component Tokens, and the shared anchored-surface controller first.
Do not open Sidebar, Topbar, Applications/Messages, NotificationBell, footer,
quick actions, AppShell layout, or root layout. The next action is external
Product Owner review; technical PASS does not declare visual acceptance.

The fixed arrow consumes the shared controller's post-clamp physical cross-axis
center; no popup geometry or unrelated overlay default changed. The candidate
passes 3/3 focused files and 35/35 tests and the full 122/122-file,
758/758-test canonical gate, both typechecks, production build, and zero
warnings. The initial bundle is 490.24 kB / 105.56 kB estimated transfer.
Review the captures and measurement JSON under
`docs/review-evidence/erp-user-menu/`; Dark RTL/LTR desktop/390 px, both popup
placements, both physical edges, the local avatar, overflow, and diagnostics are
covered. S2 remains unopened.

## Authoritative current handoff — 2026-10-08 — bounded live workbench correction

Start from live `main`. This correction entered at
`f0450d76a6ef523158036ba9b5bb66a9127519dd`. Read the generated component
catalog, shared showcase control panel, and the two review-only owners under
`showcase-exact-reference` and `showcase-floating-preview` before changing the
workbench architecture.

All 77 public ERP pages retain one primary target. Six exact Core owners expose
their existing full evidence on demand, and Table retains its complete
multi-owner reference composition. JSON editors reject incompatible public
value kinds without replacing an invalid draft or the last valid target value.
Model/CVA synchronization remains live.

Fab, ExtendedFab, and FabMenu use measured, unclipped containment with inline,
block, and review-direction controls. Runtime measurements at 390 px passed 0%
and 100% boundaries for all three in RTL and LTR, with zero overflow and zero
console errors/warnings. Focused verification passes 6/6 files and 28/28 tests.
Canonical verification passes every lint/governance gate, 122/122 test files
and 748/748 tests, both typechecks, production build, and zero warnings. The
initial bundle remains 488.18 kB / 105.32 kB estimated transfer. The exact next
action remains Product Owner external review; no visual acceptance or later
wave is opened.

## Historical dedicated showcase handoff — superseded 2026-10-08

The preceding reconstruction entered at
`54451b1fdca8da0f03096d16df20adc6100a5c11`. Its dedicated-route and legacy
migration results remain useful history, but its static/matrix evidence is no
longer the current per-page interaction contract.

## Historical ownership catalog and Page handoff — superseded 2026-10-08

Start from live `main`; this wave entered from
`895f985994ef2c28eae703f60d5911a5314af338`. Read
`ERP_COMPONENT_CATALOG_V1.md`, `ERP_NATIVE_ELEMENT_COVERAGE_V1.md`,
`page/PAGE_V1.md`, and the two governance audits before changing component or
page ownership.

The generated inventory has 77 public ERP components and 41 supporting
entries. It classifies public/internal components, directives, services, and
contracts; records public APIs, native ownership, dependencies, references,
status, and dedicated routes; and supplies 336 live component cases. Every
public component is reachable through `/components/<id>` while the batch routes
remain intact.

Native HTML policy is now enforced against all production HTML and inline
templates with 42 tag contracts. Covered global semantics remain inside their
approved ERP owners; contextual structures and genuine uncovered gaps are
explicit rather than silently treated as violations. `ErpPage` is the public
page width/scroll boundary with `fluid/document` defaults. It does not replace
`ErpPageShell` regions or `ErpAppShell` application-frame composition.

Canonical verification passes all lint/governance, 136/136 test files and
909/909 tests, both typechecks, production build, and zero warnings. Initial
bundle is 497.84 kB / 108.38 kB; component-showcase is lazy at 168.97 kB /
17.40 kB estimated transfer. The next action is Product Owner runtime/technical review of the catalog,
ownership checker, dedicated pages, and `ErpPage`; technical green is not
visual acceptance and no later wave is authorized.

## Historical full ERP-TABLE handoff — superseded 2026-10-08

Start from live `main`. The Product Owner rejected
`eddac4a8e8a3460f346bb579fdd5ca0074296e7a` because the earlier candidate
excluded visible reference features owned outside base Table and retained known
geometry deltas. Do not describe that checkpoint as visually successful.

`ERP-TABLE.html`, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`, remains
the sole authority. Read
`src/app/controls/table/ERP_TABLE_REFERENCE_FULL_EXPERIENCE_V2.md` and
`docs/review-evidence/erp-table/ERP_TABLE_RUNTIME_EVIDENCE.md`.

The current exact experience composes `ErpTableToolbar`, `ErpSearchBox`,
`ErpColumnChooser`, `ErpTable`, and `ErpPagination`; it does not collapse their
ownership into base Table. Base Table still reuses CheckBox, SortHeader,
TableResizeHandle, Text, and keyed rich-cell owners. Search, column visibility,
selection, sorting, resizing, footer counter, and pagination are live.

Canonical verification passes all lint/governance gates, 134/134 test files,
904/904 tests, both typechecks, production build, and zero warnings. Initial
bundle is 376.16 kB / 85.65 kB; Core Batch is 160.50 kB / 25.32 kB estimated
transfer. Runtime comparison records 0 px delta across all six specimen boxes,
Light/Dark geometry invariance, primary RTL plus LTR evidence, and no 390 px
page overflow.

The exact next action is Product Owner visual/runtime review of the full
ERP-TABLE experience at `/controls/core-batch`. This bounded compatibility
composition does not open a Data/Table wave or authorize redesign of
ColumnChooser, FilterBar, FilterDrawer, TableToolbar, BulkActionBar,
ViewSwitcher, SmartTable, or any later owner.

## Historical ErpTabs-only handoff — superseded 2026-10-07

The Product Owner rejected the technically green `ErpTabs` candidate at
`302056ad312dec403a1cdf2f9ded92d57d011ba5` for complete visual mismatch. The
current literal reference reconstruction entered from that checkpoint. Resolve
final local and remote SHAs at session start.

The Product Owner made `C:\Users\Misrtech\Downloads\ERP-TABS.html`, SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`, the
single binding visual and behavioral authority for `ErpTabs`. It supersedes the
former Nexlink reference, the accelerated no-reference waiver, and every
conflicting Tabs visual interpretation. Only reference colors and font family
are translated to Honesty ERP Semantic, Typography, and Component Tokens. The
authoritative implementation contract is
`src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md`.

The candidate implements the four reference variants, all reference header
anatomies, content/fill distribution, horizontal/vertical layouts, moving
indicator, lazy keyed panels, reference transitions, reduced motion, automatic
orientation-aware keyboard navigation, collision-free ARIA IDs, and narrow
Query-API behavior. Compatibility-only shapes, legacy transitions, `pills`,
`count`, and `renderPanels=false` remain isolated for current consumers. The
candidate is technically green at 133/133 test files and 895/895 tests, all
lint/governance gates, both typechecks, production build, and zero warnings.
Initial bundle is 376.16 kB / 85.67 kB estimated transfer; Core Batch lazy chunk
is 119.32 kB / 21.22 kB.

The exact next action is Product Owner runtime/Light/Dark/RTL/LTR/narrow review
of `ErpTabs` at `/controls/core-batch` against the binding reference. Browser
runtime evidence is implementation evidence only, not Product Owner visual
acceptance. `ErpStepper` and `ErpAvatarPicker` regressions are technically green;
all other Core owners remain closed to implementation. The Data/Table Visual
Correction Wave is not opened. Technical PASS never equals visual acceptance.
Standalone EntityReview, Entity Wizard, workflow engine, DataPage,
EntityDirectory, EntityDetail, CRUD/transaction patterns, Feature/Page
migration, and every subsequent wave remain unopened.

## 1. Purpose of this document

This is the canonical context-recovery document for starting a new ChatGPT
conversation without losing project history.

The new ChatGPT session must first read `CURRENT_EXECUTION_STATE.md` for the
live execution snapshot, then use this file for the wider handoff/history.

The new ChatGPT session must treat this document together with
`CURRENT_EXECUTION_STATE.md`, `DECISIONS_AND_CONSTRAINTS.md`,
`GIT_CHECKPOINTS.md`, `AGENTS.md`, and the current roadmap/review/component
contracts as authoritative project context.

Do not infer that a technical PASS equals Product Owner visual approval.

---

## 2. Project identity

Repository:

`abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Owner local workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

Product direction:

- Arabic-first.
- RTL-first.
- Angular / TypeScript / SCSS standalone browser Design Lab.
- Strict token architecture:
  Reference → Semantic → Theme/Density/Query resolution → Component Tokens → Components.
- Product Owner is the final visual authority.
- ChatGPT acts as architecture/governance/external-review authority.
- Implementation agents are execution-only and must not make product/design decisions.

---

## 3. Mandatory operating workflow

For every bounded implementation cycle:

1. Review current Git state and relevant source.
2. Product Owner / ChatGPT defines exact scope and non-goals.
3. Implementation executes only that bounded scope.
4. Run all required verification.
5. Review evidence externally.
6. Update persistent project-state files.
7. Only then authorize the next execution unit.

Never treat an agent's "COMPLETE" statement as sufficient evidence.

Visual approval remains exclusively with the Product Owner.

Persistent state must not live only in chat.

After every decision, implementation, blocker, verification result, Product
Owner visual finding, scope/reference change, or stage transition, synchronize
the mandatory set in the same execution cycle:

- `CURRENT_EXECUTION_STATE.md`
- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Also update when their subject changes:

- `DECISIONS_AND_CONSTRAINTS.md`
- `GIT_CHECKPOINTS.md`
- `AGENTS.md`
- active batch/component/family/system contracts.

Do not hand a substantive implementation checkpoint to the Product Owner until
the context, execution state, stage/roadmap, and Product Owner findings are
synchronized.

---

## 4. Important historical execution checkpoints

Key recent checkpoints, in execution order:

- `87e3fe4269ffec65f7c1c12342b59349385109c0`
  CR12 governance/test/documentation consolidation.
- `a55c2782fb2a65cf913a5ab35c2ce3add3c5c94a`
  Overlay motion/frame governance consolidation.
- `06ab7d326b6f2b6c5d6d863e2acefcc994b04b53`
  Product Owner local theme-authority cleanup preserved.
- `b7a1030bd64cab8d789b0193e7aa6f0c37c3faf9`
  First page-by-page review corrections.
- `677fa6c56e602861193b3889c8ea9ae9b6a854a2`
  First-round review state persisted.
- `ce7404252902353ca2f7432ede9aeead2cb84053`
  Overview converted to ERP-only authoring.
- `b96a6f70da6b232268b6e117c0307c0f23a50a36`
  ERP-only authoring enforced across all routed Design Lab pages.
- `70e3a008450cac45d2f3f43a5d2051affdf14c8a`
  ERP-only page-authoring state synchronized.
- `9afec19d133f9414ebd1fedd537f91637bf98db8`
  Build/editor diagnostics cleanup.
- `ea43868cb98545c62b4173f854a6bec576dee48e`
  Zero-warning verification tooling consolidation.
- `e403fa73d96bdfe18bd8c2b4fa61e28eb5b3b43b`
  Local zero-warning gate introduced.
- `a2e1793faa489702dac4721d9ac1c3ec6c5b7d74`
  Review-select text governed by ErpText.
- `f4c1a103f44a7272f3e5051fe21aeb9cd39b308f`
  Field governance updated for split style files.
- `030a74bb6e6977ecca6d33a373ef806a93c35306`
  ReviewSelect native output collision corrected.
- `320f66879036530dbfc509bd587724f799ba62c6`
  Single App theme authority enforced.
- `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`
  Zero-warning runner made Windows-safe.
- `b1b20585adcb272f17835ef8182935353a67d243`
  Remaining zero-warning gaps closed.
- `22f6f61fa95bb38fef2d31cb47b797c1c00be543`
  Fully green local verification recorded.

The current handoff synchronization commit will be later than the above and is
documentation/state only.

---

## 5. Historical verified technical state — superseded snapshot

The source checkpoint `b1b20585adcb272f17835ef8182935353a67d243`
was verified locally in the Product Owner Windows workspace.

Verified:

- Single App theme authority gate: PASS.
- ERP-only routed-page authoring: PASS for 22 routed templates.
- Component Token governance: PASS.
- System color registry: PASS.
- ErpText governance: PASS.
- ErpIcon governance: PASS.
- ErpButton governance: PASS.
- ErpTooltip governance: PASS.
- ErpField governance: PASS.
- ErpOverlay governance: PASS.
- Angular lint: PASS.
- Test files: 87/87 PASS.
- Tests: 618/618 PASS.
- `typecheck:app`: PASS.
- `typecheck:spec`: PASS.
- production `build:clean`: PASS.
- Angular build warnings: zero.
- `Zero-warning build gate: PASS`.

This is technical verification only, not visual approval.

---

## 6. Current architectural/governance decisions

### 6.1 ERP-only page authoring

Every routed Design Lab page template resolved from `app.routes.ts` authors
`erp-*` tags only.

Native HTML/SVG/form semantics needed by route pages are owned internally by
approved ERP primitives/controls or Design-Lab-only `erp-review-*` internals.

Do not reintroduce raw route-page HTML authoring.

### 6.2 Single App theme authority

The App root is the only runtime Light/Dark authority.

Exactly one runtime theme binding belongs in `app.html`:

`[attr.data-theme]="theme()"`

`app.ts` owns theme state and the top toolbar theme button.

No route page, component, popup, overlay, or Preferences setting may own a
competing Light/Dark theme.

Central Foundation mappings
`src/styles/foundation/themes/_light.scss` and `_dark.scss`
remain valid system implementation, not local page authority.

### 6.3 Preferences

Theme was removed from Preferences entirely.

The old persisted `theme` key is migrated away without resetting the remaining
preferences.

Preferences remains the source of truth for supported numeric/digit/money/
temporal formatting behavior.

### 6.4 Zero-warning contract

`npm run verify:clean` is the canonical technical gate.

It covers governance/lint, tests, TypeScript app/spec no-emit checks, and
zero-warning production build.

Component-style budgets remain 4 kB warning / 8 kB error; do not raise them to
hide warnings.

### 6.5 Checkbox / RadioBox

Do not delete or redesign them yet.

Product Owner has dedicated visual templates/references to supply later.

### 6.6 Page-by-page visual approval

Technical implementation does not equal visual approval.

The Product Owner is reviewing the Design Lab page by page.

The first reviewed/corrected family included Overview, Structural, Typography,
Icons, Buttons, Tooltip, Inputs, and blocking picker/overlay behaviors.

---

## 7. Major Product Owner decisions already implemented in the first review round

- Overview updated from obsolete pre-production status.
- ErpContainer contract retained:
  - full: no max-width
  - narrow: 48rem
  - content: 75rem
  - wide: 90rem
- Tooltip default enter: slide-up.
- Tooltip default exit: visually slide-up.
- Tooltip animation separated from anchored measurement geometry.
- SearchBox popup must not be narrower than its field when viewport permits.
- SearchBox leave lifecycle must not block controls beneath it.
- Field feedback caret below a field points physically upward in RTL and LTR.
- Money/temporal formatting consumes shared Preferences rather than uncontrolled locale side-effects.
- File/Image selected rows received tokenized hover/focus feedback.
- Blocking Overlay initial focus must not default to close action.
- Overlay header hierarchy corrected.
- Overlay footer is one generic ordered typed action surface.
- Today / Clear / Clear Selected moved into shared footer actions.
- Color system swatches have visible semantic borders.
- IconPicker does not falsely outline the first item on open.
- ItemPicker / ComboBox textual options are list rows, not fixed square tiles.
- ComboBox opens on pointer interaction, ArrowDown, and typing.
- Theme authority is App-only.
- Routed pages are ERP-only authoring.

---

## 8. Current App shell fact: iframe architecture

At the time of this handoff, `app.html` still uses an iframe for ordinary
review routes.

Current architecture:

- outer Design Lab toolbar/navigation;
- Desktop/Tablet/Mobile preview controls;
- iframe preview for ordinary routes;
- query flags such as `labPreview=1` and `labTheme=...`;
- embedded App mode inside the iframe;
- special direct rendering for:
  - `/controls/inputs`
  - `/controls/overlays`
- screenshot logic composes toolbar capture + embedded iframe capture.

The special direct rendering is the reason Inputs and Overlays currently do not
show the same Desktop/Tablet/Mobile controls as ordinary routes.

---

## 9. LATEST PRODUCT OWNER DECISION — NOT YET IMPLEMENTED

The iframe architecture must be removed completely.

The Design Lab should become a normal single-document Angular application.

Required next correction:

1. Remove `<iframe id="lab-preview-frame">` from `app.html`.
2. Remove embedded-preview mode and iframe-only branching.
3. Remove iframe-specific helpers/state such as:
   - `hasLabPreviewFlag`
   - `buildLabPreviewUrl`
   - `isEmbeddedPreview`
   - iframe-based `previewSafeUrl`
   - special `isDirectLabReviewRoute` behavior if no longer needed
   - iframe document traversal for screenshots.
4. Render every route directly through one normal `router-outlet`.
5. Inputs and Overlays must no longer be special rendering exceptions.

### Desktop / Tablet / Mobile controls

The Product Owner wants them only if they remain technically truthful without
iframe.

Important: merely setting a container width does NOT necessarily reproduce
browser viewport media-query behavior.

Therefore the next ChatGPT session must first review the repository's
responsive implementation and determine whether these controls can still
provide honest review behavior in a single document.

If not, remove Desktop / Tablet / Mobile controls entirely.

Do not preserve misleading simulation.

### Screenshot

Attempt to retain screenshot only if direct single-document capture is clean,
simple, and deterministic.

If no clean solution remains without iframe, remove screenshot as well.

The Product Owner explicitly prefers removing optional tools over retaining the
iframe.

### Non-goals of this next task

- no unrelated component redesign;
- no new public component family;
- no Checkbox/RadioBox redesign;
- no new Foundation token decisions;
- no weakening of theme, ERP-authoring, or zero-warning governance.

After implementation run full `npm run verify:clean`, then Product Owner
visually reviews the result.

---

## 10. Historical next action — superseded

New ChatGPT session should:

1. Read all supplied handoff/governance files.
2. Verify current GitHub `main` before making current-state claims.
3. Review `app.html`, `app.ts`, App SCSS, App tests, route behavior, screenshot
   code, overlay-host placement, and responsive Query API usage.
4. Decide from actual source whether Desktop/Tablet/Mobile controls can remain
   truthful without iframe.
5. Decide from actual source whether screenshot can remain cleanly in a direct
   single-document model.
6. Produce a bounded implementation plan/prompt or implement only if the user
   asks the new session to edit GitHub directly.
7. Remove the iframe architecture according to the Product Owner decision.
8. Run/review full verification.
9. Update all persistent handoff/state files again.

Do not start later page-by-page visual findings before this shell correction is
complete.

---

## 11. Source-of-truth files

Read these before acting:

- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `AGENTS.md`
- `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
- `src/app/controls/CONTROLS_CORRECTION_PROGRAM_V1.md`
- `src/app/controls/POST_CR12_REVIEW_WAVE_A_V1.md`

---

## 12. Handoff rule

If this project continues in another chat, never ask the Product Owner to
reconstruct this history manually.

Read this file first, verify live repository state, and continue from the exact
next authorized action.


---

# 18. 2026-09-29 — NO-IFRAME IMPLEMENTATION RESULT / VERIFICATION PENDING

**This section supersedes older wording in sections 12–17 that described iframe removal as not yet implemented.**

Product Owner authorized direct implementation on GitHub `main`.

Implementation commits:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a`
  `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9`
  `style(lab): normalize direct shell markup`

Current source result:
- no preview iframe in `src/app/app.html`;
- exactly one direct `router-outlet`;
- no embedded/direct/outer dual rendering mode;
- no `labPreview` query flag;
- no iframe-specific `labTheme` query propagation;
- no `DomSanitizer` / `SafeResourceUrl` iframe path;
- no special Inputs/Overlays direct-route exception;
- no Desktop / Tablet / Mobile preview controls;
- App responsiveness now follows the actual browser viewport only;
- Screenshot remains and captures `#lab-capture-root` directly in the same document;
- Screenshot filename includes the current theme, e.g. `foundation-overview-light-view.png` or `controls-overlays-dark-view.png`;
- one App-owned `[attr.data-theme]="theme()"` remains;
- exactly one App-level `ErpOverlayHost` remains;
- iframe-only styles/tests/helpers were removed or rewritten for the single-document model.

Architecture reason for removing Desktop/Tablet/Mobile:
- Foundation Query API explicitly distinguishes viewport media queries from container queries;
- resizing a same-document container would not change real `@media` viewport evaluation;
- Product Owner prohibited misleading viewport simulation.

Independent post-commit source inspection confirmed in the touched App files:
- iframe count = 0;
- preview-button count = 0;
- router-outlet count = 1;
- OverlayHost count = 1;
- iframe-specific state/helper identifiers = 0;
- screenshot filename helper/tests include both `light` and `dark`.

## Verification status

**Do not call this source Fully Green yet.**

Last fully verified source remains:
`b1b20585adcb272f17835ef8182935353a67d243`

The mandatory next gate is:
`npm run verify:clean`

The ChatGPT tool environment used for the GitHub write does not have a repository checkout/network path capable of executing the repository's Node/npm verification locally, and the repository has no existing GitHub Actions workflow to run that gate remotely. Therefore the new source checkpoint is implemented and externally source-reviewed, but the canonical local verification remains pending.

## Historical next action — superseded by later dated continuity

1. Run `npm run verify:clean` against current `main` / the no-iframe source.
2. If it passes, record the new fully verified source checkpoint and zero-warning evidence.
3. If it fails, correct only the demonstrated regression within this no-iframe scope.
4. After technical verification, Product Owner resumes page-by-page visual/runtime review.

No unrelated component redesign or later family work is authorized by this implementation.

## 2026-09-29 — Structural Primitives visual review and screenshot-tool finding

Product Owner supplied full-page `/primitives/structural` screenshots in Dark and Light themes.

External visual review result:
- no blocking Structural Primitives page-specific defect is evident;
- ErpContainer, ErpStack, ErpInline, ErpGrid, ErpSurface, ErpSection, and ErpDivider evidence is coherent in both themes;
- no visible clipping, overlap, broken RTL flow, or page-layout instability was found;
- no Structural Primitives implementation correction is authorized from this evidence.

Global screenshot-tool finding:
- generated screenshots include transient capture-progress UI in the Design Lab utility bar;
- `جاري الالتقاط...` appears in the captured output and the screenshot button is captured in its in-progress state;
- current `captureScreenshot()` sets `isCapturing=true` and `statusMessage='جاري الالتقاط...'` before `html2canvas()` captures the full App capture root;
- this is a review-tool cleanliness defect, not a Structural Primitives component defect.

Recommended next action:
- correct screenshot capture so transient capture-progress UI is omitted from the generated PNG while normal on-screen feedback remains available;
- then resume page-by-page visual screenshot review.

This finding does not change technical verification state: the no-iframe source still requires a fresh `npm run verify:clean`; last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.


---

## 2026-09-29 — Typography Primitives visual review / screenshot-tool deferral

Product Owner decision:
- the screenshot capture-progress artifact is a non-critical Design-Lab-only tooling issue;
- cleanup is deferred;
- it does not block page-by-page visual review.

Product Owner supplied Light and Dark full-page evidence for `/primitives/typography`.

External review result:
- no blocking page-specific visual defect identified;
- Type Defaults, Sizes / Weights / Line Heights, Tones / Families / Alignment, Headings / Blocks / Containers, Inline Semantic Types, Data / Lists / Table / Form Text, and Direction / Ruby / Wrapping / Overflow / Link evidence are visually coherent in both themes;
- no visible clipping, overlap, RTL/LTR break, theme leakage, or hierarchy failure was identified from the supplied screenshots.

Review decision:
- no Typography correction is opened from this evidence;
- proceed to the next page;
- this is not a Product Owner visual freeze unless explicitly declared.

Technical verification boundary remains unchanged:
- no-iframe `npm run verify:clean` is still pending;
- last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.


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


---

# 19. 2026-09-29 — TOOLTIP POSITIONING CORRECTION IMPLEMENTED / RE-REVIEW PENDING

Product Owner authorized the blocking Tooltip correction and added a system-wide motion decision:

- default Tooltip enter animation = `zoom`;
- default Tooltip exit animation = `zoom`;
- developers may explicitly override either animation on an individual Tooltip.

Implementation commit:
- `7a0a14f090ee38df3ea4adc02255856d89b6c71a`
  `fix(tooltip): enforce anchored positioning contract`

Implemented architecture:
- added `src/app/controls/tooltip/TOOLTIP_POSITIONING_POLICY_V1.md` as the explicit Product Owner positioning law;
- Tooltip body and arrow now live inside one animated visual assembly;
- the fixed outer surface remains untransformed and owns anchor/collision geometry;
- shared anchored-overlay geometry now evaluates preferred -> opposite -> perpendicular candidates ordered by available room;
- if no candidate fully fits, it deterministically chooses the roomiest candidate and clamps to the visual viewport;
- logical start/end still resolve through LTR/RTL;
- arrow geometry is canonical across every direction: one base/depth contract rotated for side placements rather than shrunk;
- scroll/resize reposition acceptance coverage was strengthened;
- Tooltip semantic overlay layer usage is now explicitly governance-checked;
- Tooltip motion governance now enforces `zoom` / `zoom` defaults;
- Design Lab motion selectors now wrap all system presets instead of hiding evidence behind horizontal overflow.

Source-level post-commit inspection on current main confirmed:
- no legacy Tooltip `slide-up` default remains;
- `zoom` enter/exit defaults are present;
- production side-arrow size remapping is removed;
- four-side perpendicular fallback is present;
- arrow is inside the motion assembly;
- Tooltip surface still consumes the approved semantic layer token;
- showcase motion evidence wraps.

Verification status:
- source correction is implemented but **not yet declared Fully Green**;
- a fresh `npm run verify:clean` is mandatory;
- last Fully Green source remains `b1b20585adcb272f17835ef8182935353a67d243`.

Review status:
- Tooltip V1 remains BLOCKED for page progression until Product Owner runtime re-review confirms the corrected arrow attachment, placement/fallback, scroll anchoring, motion, and Light/Dark behavior.
- no later Design Lab page is authorized before that Tooltip re-review.


## 2026-09-29 — local verification attempt after Tooltip correction

Product Owner fast-forwarded local `main` to
`6a71c23e4ff001a9c8e51bd685ca233cc2fe83a4`.

Observed local evidence:
- `npm run build:clean:self-test` — PASS.
- `npm run build:clean` — PASS, ending in `Zero-warning build gate: PASS`.
- `npm run verify:clean` progressed successfully through:
  - single App theme authority;
  - route-page ERP-only authoring;
  - Component Token framework;
  - system-color registry;
  - ErpText;
  - ErpIcon;
  - ErpButton;
  - **ErpTooltip governance**;
  - ErpField.
- `verify:clean` then stopped in `erp-overlay:check`.

The failure was governance-tool drift, not an Overlay runtime regression and not
a Tooltip failure. The Overlay checker still required five iframe-era App-shell
strings that were intentionally removed by the Product Owner-authorized
single-document correction:
- `parameters.set('labTheme', theme);`
- special Inputs/Overlays direct-route branching;
- iframe toolbar/embedded screenshot composition.

Bounded tooling correction:
- `a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`
  `fix(governance): align overlay gate with no-iframe lab`

The corrected Overlay governance now enforces the current App-shell contract:
- one direct router outlet;
- one App capture root;
- App-owned theme and screenshot controls/evidence;
- direct single-document screenshot target;
- no iframe, `labPreview`, `labTheme` propagation, embedded/direct dual mode,
  viewport-preview controls, cross-document traversal, or iframe sanitizer types.

Its self-test fixtures now reject:
- reintroduced iframe markup;
- reintroduced iframe-era source state;
- missing direct router-outlet.

Verification status:
- the full `npm run verify:clean` has **not yet passed** after this tooling
  correction;
- a fresh rerun from `a40ea250...` or later is mandatory;
- do not declare a new Fully Green checkpoint until that rerun completes.


---

# 20. 2026-09-29 — VERIFY:CLEAN REACHED NG LINT; SINGLE TEST LINT FIX APPLIED

Product Owner reran local verification after the no-iframe Overlay governance correction.

Local evidence at `ea6a452f7fe37a8b12efde0515144202233d88ea`:
- `node tools/controls/check-erp-overlay-governance.mjs --self-test` — PASS.
- `npm run erp-overlay:check` — PASS.
- `npm run build:clean:self-test` — PASS.
- `npm run build:clean` — PASS.
- production Angular build completed successfully.
- `Zero-warning build gate: PASS`.

The subsequent full `npm run verify:clean` passed all governance checks shown in the supplied log:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- System color registry;
- ErpText governance;
- ErpIcon registry + governance;
- ErpButton governance;
- **ErpTooltip governance**;
- ErpField governance;
- **ErpOverlay governance**.

It then reached Angular ESLint and stopped on exactly one lint error:

`src/app/shared/anchored-overlay/anchored-overlay-controller.spec.ts:127:20`
`@typescript-eslint/array-type`

Cause:
- test code used `Array<{x: number; y: number}>`;
- repository lint contract requires `{x: number; y: number}[]`.

Bounded source correction:
- `3eb993e64616362bf920284e37b5005d412fd531`
  `fix(test): satisfy array-type lint rule`

No runtime, production Tooltip, Overlay, geometry, or App behavior changed in this fix.

Verification status:
- do NOT declare Fully Green yet;
- rerun the complete `npm run verify:clean` from the latest `main`;
- if the full gate passes through lint, tests, both typechecks, and zero-warning build, the latest source can become the new Fully Green checkpoint.

Tooltip page remains the active blocking visual-review page until technical verification completes and Product Owner runtime Light/Dark re-review is performed.


---

# 21. 2026-09-29 — FULL VERIFY:CLEAN PASS / NEW FULLY GREEN CHECKPOINT

Product Owner completed the canonical local verification from repository HEAD:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting commit contained in that checkout:

`3eb993e64616362bf920284e37b5005d412fd531`
`fix(test): satisfy array-type lint rule`

The full command:

`npm run verify:clean`

completed successfully end-to-end.

Verified results:
- all governance/lint stages PASS, including:
  - Single App theme authority;
  - route-page ERP-only authoring;
  - Component Token framework;
  - System color registry;
  - ErpText;
  - ErpIcon registry/governance;
  - ErpButton;
  - ErpTooltip;
  - ErpField;
  - ErpOverlay;
  - Angular ESLint;
- `All files pass linting.`
- 87 / 87 test files PASS;
- 615 / 615 tests PASS;
- Tooltip suite: 24 tests PASS, including Zoom/Zoom default evidence;
- anchored-overlay geometry suite: 10 tests PASS;
- anchored-overlay controller suite: 4 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- final production Angular build PASS;
- final `Zero-warning build gate: PASS`.

This supersedes all earlier wording that kept
`b1b20585adcb272f17835ef8182935353a67d243` as the latest Fully Green source.

## Historical technical checkpoint — superseded

Fully verified repository checkout:
`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting checkpoint:
`3eb993e64616362bf920284e37b5005d412fd531`

Technical state: **Fully Green**.

## Historical Product Owner review state — superseded

Technical verification is no longer blocking.

Tooltip V1 remains the active page-review blocker by Product Owner decision.
No later page review is authorized until runtime Light/Dark Tooltip evidence is
re-reviewed and accepted, including:
- default Zoom enter/exit;
- body + arrow moving together;
- top/bottom/start/end placement;
- preferred placement preservation;
- opposite/perpendicular collision fallback;
- edge behavior;
- scroll anchoring;
- resolved arrow direction and attachment;
- z-index/layer behavior.

The previously deferred Design-Lab screenshot progress artifact remains
non-blocking and unchanged.


---

# 22. 2026-09-29 — TOOLTIP CROSS-AXIS ARROW CENTERING CORRECTION

After the prior Fully Green checkpoint, Product Owner runtime review identified a
new visual defect in Tooltip arrow centering:

- left/right placement arrows were visibly biased downward instead of being
  vertically centered;
- top/bottom placement arrows were visibly biased horizontally instead of being
  centered on the trigger cross-axis.

Root-cause review found a concrete geometry defect:
- canonical arrow base = 16px;
- plain Tooltip minimum block size = 24px;
- configured arrow safe inset = 8px;
- the old clamp requested a minimum center of 16px and a maximum center of 8px
  on a 24px side-placement cross-axis;
- that impossible interval was resolved toward the minimum bound, biasing the
  side arrow downward.

Product Owner centering law:
- arrow cross-axis center must target the trigger center;
- safe inset is symmetric and must never bias the arrow up/down/left/right;
- if the Tooltip is too compact to afford the configured safe inset on both
  sides of the canonical arrow, the effective inset shrinks symmetrically;
- CSS positioning must express centering directly rather than manually
  subtracting half-size.

Implementation:
- `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`
  `fix(tooltip): center arrow on trigger cross-axis`

Implemented changes:
- anchored geometry now derives a maximum symmetric safe inset from the actual
  cross-axis size;
- effective safe inset is capped symmetrically;
- when the cross-axis is no larger than the canonical arrow base, the arrow
  center collapses to the geometric cross-axis midpoint;
- top/bottom arrows use `left = center` + `translateX(-50%)`;
- left/right arrows use `top = center` + `translateY(-50%)`;
- deterministic tests cover compact 24px side and top surfaces;
- Tooltip unit tests cover explicit cross-axis centering for all four physical
  placements;
- Tooltip positioning policy and Tooltip V1 documentation were updated.

Verification status:
- the previous Fully Green checkout remains
  `310b5afe8e6f018bb4d52f68be2986bbe2d31365`;
- the new source commit `632f45a...` is NOT yet Fully Green;
- fresh `npm run verify:clean` is mandatory.

Review status:
- Tooltip V1 remains BLOCKED;
- no later Design Lab page review until this correction passes technical
  verification and Product Owner runtime Light/Dark re-review.


---

# 23. 2026-09-29 — TOOLTIP ARROW OFFSET ROOT CAUSE CORRECTED: POPOVER PADDING ORIGIN

Product Owner re-tested the previous cross-axis centering correction and reported
that the visible arrow offset was unchanged.

This invalidated the prior assumption that symmetric safe-inset clamping was the
main visible cause.

New source review identified the actual coordinate-space mismatch:

- arrow coordinates are calculated against `.erp-tooltip__surface`, the fixed
  native Popover geometry surface;
- the arrow now lives inside `.erp-tooltip__motion` so it can animate with the
  Tooltip body;
- the native Popover surface did not explicitly set `padding: 0`;
- native Popover user-agent padding can therefore offset the inner motion
  assembly from the outer geometry origin;
- a coordinate that is mathematically centered in the outer surface becomes
  visually shifted when applied inside the padded inner coordinate system.

This matches the Product Owner evidence:
- left/right arrows remain vertically biased;
- top/bottom arrows remain horizontally biased;
- prior center arithmetic changes did not materially alter the visible offset.

Source correction:
- `84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`
  `fix(tooltip): align popover and arrow coordinate origins`

Implemented:
- explicit `padding: 0` on `.erp-tooltip__surface`;
- geometry surface and motion assembly now share one physical coordinate origin;
- Tooltip governance requires zero surface padding;
- Tooltip unit coverage verifies top/right/bottom/left computed padding = 0;
- positioning policy and Tooltip V1 docs record the coordinate-origin invariant.

Important distinction:
- the prior symmetric safe-inset correction remains valid defensive geometry for
  compact Tooltips;
- it was not sufficient to fix the Product Owner's visible offset because the
  remaining offset came from mismatched coordinate origins.

Verification baseline:
- Product Owner supplied a complete successful local `npm run verify:clean`
  at checkout `50ae8e5f9f9cc537435217a644548c10bd097ecb`;
- that run passed 87/87 test files, 618/618 tests, both TypeScript no-emit gates,
  all governance/lint gates, and final zero-warning build;
- therefore `50ae8e5...` is the latest Fully Green verified checkout before
  the new `84d5fd9...` source correction.

Current status:
- `84d5fd9...` is implemented and source-reviewed but not yet Fully Green;
- fresh `npm run verify:clean` is mandatory;
- Tooltip remains Product Owner BLOCKED until runtime Light/Dark re-review
  confirms actual visual centering.


---

# 24. 2026-09-29 — INPUTS PAGE PRODUCT OWNER REVIEW / BLOCKING FINDINGS

Product Owner supplied Light/Dark full-page Inputs evidence plus focused SearchBox
runtime evidence and opened a blocking review of `/controls/inputs`.

A dedicated findings document was added:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Confirmed Product Owner findings:
- SearchBox dropdown results are not selectable;
- typing does not filter the projected results;
- SearchBox is effectively static review evidence in this scenario;
- dropdown width does not equal field width;
- no explicit dropdown close action exists;
- interaction with fields geometrically below/behind the open dropdown is broken;
- previously agreed SearchBox focus modes must be restored as a three-state
  contract: modal search / anchored dropdown / plain inline input;
- second MoneyBox evidence must show Arabic-Indic digits;
- Time picker adds Now;
- DateTime picker adds Now;
- DateRange adds previous/next week and previous/next month presets;
- all selection/picker Confirm actions are disabled until a valid staged selection
  exists, while Cancel and Close remain enabled.

External source review confirmed additional gaps:
1. SearchBox currently has only `popupMode: boolean`; no modal/dropdown/inline
   mode contract and focus itself does not drive the agreed behavior.
2. SearchBox uses static projected result content and commits popup query text
   directly to its value; query and selected result are not distinct.
3. Anchored popup semantics are always dialog semantics; dropdown/listbox semantics
   are not represented.
4. Inputs review page repeatedly uses 2-column grids with only one surface,
   leaving a large unused half-column in the supplied full-page evidence.
5. Temporal empty-state copy remains hard-coded in English.

Current SearchBox width source explicitly uses
`max(trigger width, popup min width)`, confirming the width mismatch is structural
rather than screenshot scaling.

Current selection/temporal picker code updates Clear action state but does not
disable Confirm based on staged selection validity.

Page status:
**Inputs is BLOCKED. Do not pass this page until correction + re-review.**

Tooltip status remains separately pending after the latest coordinate-origin fix;
the latest Tooltip source correction is still subject to fresh technical
verification/runtime acceptance.


---

# 25. 2026-09-29 — INPUTS CORRECTION UNIT IMPLEMENTED / VERIFICATION PENDING

Product Owner authorized implementation of the blocking Inputs findings.

Latest source checkpoint:
`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`
`fix(inputs): guard Now against Time bounds`

## SearchBox

Implemented:
- public `mode: 'dropdown' | 'modal' | 'inline'`, default `dropdown`;
- focus opens the configured search experience for dropdown/modal;
- inline mode remains a normal native search editor and opens nothing;
- readonly `items` result contract with stable value/label/disabled/icon;
- dropdown query is transient and separate from committed CVA value;
- filtering matches item label or value;
- pointer result selection commits only enabled item values;
- keyboard result navigation uses Arrow/Home/End and skips disabled results;
- dropdown uses combobox/listbox/option semantics;
- modal mode reuses `ErpSelectionPickerContent` through `ErpOverlayManager`;
- explicit dropdown Close action;
- Escape and outside dismissal retained;
- leaving popup becomes inert/noninteractive before native Popover teardown;
- dropdown geometry anchors to the complete visual `.field-frame__control`
  rather than only the inner trigger button;
- popup inline size equals full field-control width unless viewport clamping is
  unavoidable;
- inline Clear restores focus to the inline editor.

The obsolete boolean `popupMode`, static `[search-results]` projection, and
`data-search-box-popup-mode` contract are removed.

## Selection confirmation law

Implemented for Color/Icon/Item/Combo picker content:
- Confirm starts disabled;
- Confirm enables only for a valid staged selectable value;
- disabled item values cannot enable confirmation;
- Confirm handler itself is guarded against invalid staged state;
- Cancel and header Close remain available.

Shared OverlayRef was also hardened:
- dynamically disabled/loading frame actions cannot dispatch their handlers even
  if requested programmatically.

## Temporal quick actions and confirmation law

Implemented:
- Time: `الآن`;
- DateTime: `الآن`;
- Now floors minutes to configured `minuteStep`;
- Time Now is disabled when the stepped current time violates min/max;
- DateRange:
  - previous calendar week;
  - next calendar week;
  - previous calendar month;
  - next calendar month;
- week presets honor `weekStartsOn`;
- Date / Time / DateTime / DateRange Confirm starts disabled until staged state
  is valid;
- Time requires valid hour+minute within bounds;
- DateTime requires date+time;
- Date requires valid date;
- DateRange requires both valid endpoints;
- Confirm handler is independently guarded.

## MoneyBox

Implemented optional per-instance:
`digitSet: 'latin' | 'arabic-indic' | null`

Rules:
- null continues to inherit the shared Preferences money digit context;
- no formatter logic is duplicated;
- Arabic-Indic review evidence can coexist with Latin evidence in the same page.

## Inputs review surface

Implemented:
- SearchBox dropdown/modal evidence uses real selectable data;
- Arabic-Indic MoneyBox evidence added;
- temporal empty display placeholders converted from stale English strings to
  Arabic-first per-control placeholder inputs;
- single review surfaces span the full two-column review grid, removing the
  large unused half-column.

## Governance / tests

Field governance now enforces:
- SearchBox three-mode/selectable/filterable contract;
- modal reuse through OverlayManager;
- exact field-width dropdown behavior;
- no static projected search-results contract;
- temporal Now/range-preset contracts;
- staged Confirm state/handler guards;
- MoneyBox digit override fallback to Preferences;
- expanded Arabic-first labels.

Overlay governance now enforces disabled/loading frame-action dispatch blocking.

Tests were expanded across SearchBox, MoneyBox, selection picker content,
temporal picker content, OverlayRef, and Inputs showcase.

## Verification status

**Do not declare this source Fully Green yet.**

Latest fully verified checkout remains:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Mandatory next gate:
`npm run verify:clean`

After technical green:
1. Product Owner re-tests SearchBox dropdown/modal/inline runtime behavior;
2. Product Owner checks MoneyBox Arabic digits;
3. Product Owner checks temporal quick actions and Confirm disabled behavior;
4. Product Owner re-reviews the full Inputs page in Light/Dark.


---

# 26. 2026-09-29 — VERIFY:CLEAN STOPPED AT BUTTON GOVERNANCE; SEARCHBOX RESULT PRIMITIVE FIXED

Product Owner locally updated to:
`a8b33f1fecbd8c468bd68add4281fe925c7845b5`

Local preflight evidence:
- clean working tree;
- Overlay governance checker self-test PASS;
- `npm run erp-overlay:check` PASS;
- `npm run build:clean:self-test` PASS;
- `npm run build:clean` PASS;
- `Zero-warning build gate: PASS`.

The full `npm run verify:clean` then passed:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- system colors;
- ErpText;
- ErpIcon registry/governance.

It stopped at:
`npm run erp-button:check`

Exact finding:
`src/app/controls/search-box/search-box.html:173:11`
`concrete Controls and Composites must use an approved internal button primitive`

Root cause:
SearchBox dropdown results used a raw native `<button>`.

Bounded source correction:
- `cf91967291961037dd7f35d0e825fc4fb2da8312`
  `fix(inputs): govern SearchBox results through SelectionTile`

Correction details:
- raw result button replaced by approved internal `ErpSelectionTile`;
- `presentation="list"` preserves list-result presentation;
- SelectionTile owns native button semantics, role=option, aria-selected,
  disabled behavior, and focus API;
- SearchBox uses `viewChildren(ErpSelectionTile)` for keyboard focus;
- SearchBox result CSS no longer reimplements internal button state visuals;
- SearchBox unit tests target the SelectionTile inner button where activation is
  required;
- Field governance valid fixtures now require SelectionTile-based search
  results.

This is a governance-alignment correction only; the Product Owner SearchBox
functional contract remains unchanged.

Current verification status:
- current source is NOT yet Fully Green;
- rerun complete `npm run verify:clean` from current `main`;
- do not skip directly to later stages because the prior command stopped at
  Button governance.


---

# 27. 2026-09-29 — VERIFY:CLEAN REACHED TESTS; SIX TEST-HARNESS FAILURES CORRECTED

Product Owner ran the full canonical verification at:

`a85c13899613b239ea28c848b61af3454b3fe5f0`

The run passed all governance and lint gates:
- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- System color registry;
- ErpText;
- ErpIcon registry/governance;
- ErpButton governance;
- ErpTooltip governance;
- ErpField governance;
- ErpOverlay governance;
- Angular lint.

It then ran the full test suite.

Observed result:
- 87 total test files;
- 84 passed / 3 failed;
- 626 total tests;
- 620 passed / 6 failed.

The six failures were:
1. SearchBox filtered selection committed `invoice` correctly, but the test read
   `data-search-box-popup-phase` before a fixture change-detection pass.
2. SearchBox End-key test created a non-bubbling synthetic KeyboardEvent after
   result interaction moved inside `ErpSelectionTile`; the event therefore did
   not reach the host keydown listener.
3. Selection system-color confirm test timed out.
4. Selection free-color confirm test timed out.
5. Selection keyboard-icon confirm test timed out.
6. Temporal staged-time confirm test timed out.

The four Confirm timeouts shared one test-harness cause:
- the new product contract disables Confirm until staged state is valid;
- the tests changed staged state and immediately clicked the still-rendered
  disabled native Confirm button without `fixture.detectChanges()`;
- runtime Angular event/change-detection cycles do not perform those two user
  interactions in one undetected synchronous test step.

Bounded test-only correction:
- `92840de9c670edd32b05c1485f50c2e61e68fead`
  `fix(test): flush staged picker state before confirmation`

Changes:
- SearchBox selection test now renders the leaving phase before asserting host
  evidence;
- SearchBox End key uses `bubbles: true`;
- selection color/free-color/icon tests flush staged action-state rendering
  before Confirm;
- temporal staged-time test flushes staged action-state rendering before Confirm.

No production/runtime source changed in this commit.

Current status:
- source remains NOT Fully Green until a fresh complete
  `npm run verify:clean` passes;
- do not skip directly to test/typecheck commands because the canonical gate
  must be proven end-to-end.


---

# 28. 2026-09-29 — VERIFY:CLEAN DOWN TO ONE APP INTEGRATION TIMEOUT; TEST ISOLATED

Product Owner reran the canonical gate at:

`f8ab6433636f6adefdd43d7613545aa87041560f`

The run passed:
- all governance;
- Angular lint;
- SearchBox 11/11;
- Temporal picker 14/14;
- Selection picker 16/16;
- Inputs showcase 14/14.

Overall test result:
- 86 / 87 test files PASS;
- 625 / 626 tests PASS.

Only failure:
`src/app/app.spec.ts`
`renders Foundation, Inputs, and Overlays through the same direct document model`

Observed duration:
approximately 5239 ms, slightly beyond the Vitest 5000 ms default.

The test itself performs three lazy route navigations/render cycles in one
`it()`:
1. `/foundation/overview`;
2. `/controls/inputs`;
3. `/controls/overlays`.

Correction:
- `72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`
  `fix(test): isolate direct-route app integration cases`

The exact same single-document assertions are preserved, but each lazy route is
now its own test case. This avoids an accumulated timing failure without:
- increasing test timeout;
- weakening assertions;
- changing runtime source;
- changing route architecture.

Verification status:
- source remains NOT Fully Green until fresh full `npm run verify:clean` passes.


---

# 29. 2026-09-29 — SEARCHBOX CLOSED-POPOVER HIT/FOCUS RUNTIME BLOCKER CORRECTED

Product Owner runtime re-test showed that the SearchBox dropdown still behaved as
if interactive after it visually closed.

Observed Product Owner evidence:
- choose a dropdown result;
- dropdown appears closed;
- click a lower input field;
- lower field may not retain focus;
- SearchBox selection may change again as though a result row were still hit;
- selected SearchBox had no clear action visible.

This is a real runtime blocker, not a test-only issue.

## Root cause

The dropdown close lifecycle previously:
1. set phase to `leaving`;
2. marked surface inert;
3. waited for exit transition duration;
4. only then called `controller.hide()` / native `hidePopover()`;
5. only then restored trigger focus.

That design allowed native top-layer lifetime and delayed focus restoration to
outlive the visible close transition.

## Source corrections

Primary runtime correction:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`
  `fix(inputs): release SearchBox top layer on close`

Hardening follow-up:
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`
  `fix(inputs): harden SearchBox popover teardown`

Implemented invariants:
- close begins -> surface immediately inert;
- close begins -> `pointer-events:none` immediately;
- close begins -> `aria-hidden=true` immediately;
- close begins -> native Popover is hidden immediately;
- close begins -> SearchBox removed from open stack immediately;
- close begins -> dismissal listeners detached immediately;
- Selection/Close/Escape may restore trigger focus immediately, within the same
  close event;
- outside dismissal does not restore focus;
- no timer is allowed to restore focus later;
- exit timer is bookkeeping only;
- final cleanup clears inert/pointer/aria state for the next opening;
- AnchoredOverlayController teardown attempts native `hidePopover()`
  unconditionally when available, protected by try/catch.

## Regression evidence added

SearchBox tests now prove:
- selected result closes the native Popover immediately;
- a subsequently focused input remains focused after all close timers run;
- no second result commit occurs after closure;
- explicit Close releases top layer immediately;
- clearable dropdown exposes and commits the standard clear action.

AnchoredOverlayController test now proves:
- native hide is attempted even if `:popover-open` pseudo-state matching is
  unavailable/throws.

## Clear action

Inputs showcase SearchBox instances now enable inherited `clearable` for:
- dropdown mode;
- modal mode;
- inline mode.

The clear action remains standard Field Family behavior and is visible when a
committed value exists.

## Verification status

Current source checkpoint:
`4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`

Fresh full `npm run verify:clean` is mandatory.
Inputs remains Product Owner BLOCKED pending runtime re-test and visual review.


---

# 30. 2026-09-29 — EXACT SEARCHBOX ROOT CAUSE FOUND: CLOSED POPOVER DISPLAY OVERRIDDEN

Product Owner explicitly requested that no further speculative changes be made:
either identify the exact literal cause or stop and report failure.

The exact cause was found.

## Exact defect

SearchBox popup is authored as:
`popover="manual"`

but production stylesheet had:

`.search-box__popup { display: grid; ... }`

Native Popover uses browser-owned `display: none` while closed. An author
`display:grid` declaration on the base Popover rule overrides that hidden
display state.

At the same time SearchBox base styles set hidden opacity/transform values.
Therefore, after close:
- the popup can look visually gone because opacity is at its hidden value;
- the element can still exist as a fixed layout/hit-test box because author CSS
  forces `display:grid`;
- lower fields can fail to receive pointer interaction;
- an invisible SearchBox result can receive the click, changing selection while
  the dropdown appears closed.

This matches the Product Owner runtime reproduction exactly.

## Source correction

`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`
`fix(inputs): preserve native closed-popover display state`

Implemented:
- remove `display:grid` from base `.search-box__popup`;
- add:
  `.search-box__popup:popover-open { display:grid; }`;
- preserve native browser closed `display:none`;
- governance rejects `display` declarations inside the base popup rule;
- governance requires grid display only under `:popover-open`;
- invalid governance fixtures cover both regressions;
- Field Family contract records this native-Popover visibility invariant.

## Status of previous attempted fixes

Previous changes to:
- immediate `hidePopover()`;
- inert;
- pointer-events;
- aria-hidden;
- focus restoration timing;

remain valid defensive lifecycle hardening, but they were not the root cause of
the persistent invisible selectable rectangle.

This new CSS correction is the root-cause fix.

## Verification / review

Fresh `npm run verify:clean` is required.

Product Owner must reproduce exactly:
1. open SearchBox dropdown;
2. select a result;
3. confirm dropdown visually closes;
4. click an input that was geometrically underneath the former popup;
5. verify that input receives/keeps focus;
6. verify SearchBox value does not change again;
7. verify the standard Clear action is present after committed selection.

Inputs remains BLOCKED until that exact runtime test is accepted.


---

# 31. 2026-09-29 — ADDITIONAL INPUTS REVIEW / PRODUCT DECISIONS

Product Owner supplied new visual/runtime findings after the SearchBox work.

Decisions recorded:
- URL/Tel-like domain validation becomes non-destructive;
- invalid user text remains visible and receives automatic feedback;
- Field-family controls become clearable by default with per-instance opt-out;
- Ghost/Text/Underline gain token-owned hover discoverability;
- RangeSlider thumb and rail geometry must use one global coordinate system;
- RangeSlider active thumbs receive moving customizable value Tooltips;
- Time/DateTime Now must reveal the selected time in scrollable lists;
- DateRange calendar presets are replaced by rolling:
  آخر 7 أيام / 7 أيام بدءًا من اليوم / آخر 30 يومًا / 30 يومًا بدءًا من اليوم;
- ColorPicker mode becomes per-instance `system | free`, with no internal mode switch;
- ItemPicker and ComboBox both remain, but review evidence must make their
  select-like vs editable-query interaction distinction obvious.

Exact RangeSlider geometry defect confirmed:
native lower/upper ranges currently change their own max/min to the counterpart
value, while visual fill percentages use global min/max. This creates mismatched
thumb/fill coordinate systems.

No production implementation was performed in this review turn.


---

# 32. 2026-09-29 — UNIFIED ERP INPUT STATE / VALIDATION ARCHITECTURE DECISION

Product Owner requested one common developer-facing validation/state contract
for every ERP input.

New authoritative design:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`

Approved semantic states:
- `null`;
- `empty`;
- `no-selection`;
- `invalid-entry`;
- `valid-entry`.

Important distinction:
`inputState` describes the kind of current entry, while `valid` independently
reports whether that entry is acceptable for current constraints.

Every input will expose:
- `inputState`;
- `valid`;
- `errors: readonly string[]`;
- structured `validationIssues`;
- canonical validation snapshot.

Structured issues contain stable machine-readable code, message, source, and
optional metadata. String `errors` are derived from those issues.

Required becomes a common input contract.

Typed constraints:
- text: minLength/maxLength;
- numeric/money: min/max/step;
- temporal: min/max;
- file/image: minFiles/maxFiles + file policies;
- selection: required/no-selection (future multi-select counts);
- range: global min/max + ordering/span rules.

Min/max validation on editable inputs is non-destructive. Invalid user drafts
remain visible and receive issues rather than being silently clamped, erased, or
reverted.

Validation state is based on the current visible draft where a control has draft
semantics, not only on the last committed CVA value.

Implementation is pending. This decision expands the active Inputs correction
scope.


---

# 33. 2026-09-30 — EXPANDED INPUTS + UNIFIED VALIDATION IMPLEMENTED / VERIFY PENDING

Current implementation checkpoint:
`c3971739198e61adff98d821a6b8f6775faa4e6c`

The Product Owner-approved Inputs corrections and common validation architecture
are now implemented in source, tests, and governance.

## Unified validation substrate

Every ERP input participates in the common contract:
- `inputState`: null / empty / no-selection / invalid-entry / valid-entry;
- `valid`;
- `errors: readonly string[]`;
- structured `validationIssues`;
- canonical validation snapshot;
- common `required`;
- external/server issue input.

Angular Forms integration:
- ErpInputBase implements Validator;
- CVA controls register exactly one NG_VALIDATORS bridge;
- governance enforces exactly one bridge;
- validator change notifications also fire when non-committed visible drafts
  change validation state.

## Non-destructive editable validation

URL/Tel:
- invalid text stays visible;
- invalid text is not reverted/deleted on blur;
- URL publishes url.format;
- Tel publishes multiple simultaneous domain issues such as alphabetic input,
  plus-count/position, and length.

Text/Password/TextArea/Search-inline:
- typed min/max length validation;
- maxLength is not used as native destructive input blocking.

Number/Money/NumberStepper:
- visible invalid drafts are preserved;
- format/min/max/step issues publish through common contract;
- editable out-of-range values are not silently clamped;
- intrinsic stepper button interaction may still mechanically respect bounds.

## Clear behavior

Field-family clearable default is now enabled.
Per-instance `clearable=false` remains authoritative.
Selection/temporal/file controls were corrected so footer/remove/clear actions
honor the opt-out instead of forcing Clear.

## Lightweight visual variants

Ghost/Text/Underline now expose token-owned hover discoverability.
The hover surface color and mix percentage are Foundation Component Tokens.

## RangeSlider

Corrected:
- lower and upper native ranges both use global min/max;
- crossing prevention is logic, not changing the native coordinate domain;
- rail is inset by half thumb size;
- Tooltip anchors use the same thumb-center track;
- physical left positioning avoids RTL double reversal;
- active thumb Tooltip text is developer-formattable;
- Tooltip explicitly requests anchored reposition while active thumb position
  changes;
- validation projects to danger host state, aria-invalid, described-by, and
  visible error copy.

## Temporal

- min/max no longer silently clamp programmatic temporal values;
- Date/Time/DateTime/DateRange publish typed validation issues;
- empty selection states are represented as no-selection where appropriate;
- Now selects current stepped time and scrolls/reveals selected hour/minute;
- DateRange quick actions are rolling inclusive windows:
  - آخر 7 أيام = today - 6 through today;
  - 7 أيام بدءًا من اليوم = today through today + 6;
  - آخر 30 يومًا = today - 29 through today;
  - 30 يومًا بدءًا من اليوم = today through today + 29.

## Selection

ColorPicker:
- public fixed mode: system | free;
- one instance renders one mode only;
- internal mode switch removed;
- mode-mismatched values do not commit.

ItemPicker vs ComboBox:
- ItemPicker remains non-editable/select-like;
- ComboBox remains editable type-to-filter;
- Design Lab evidence makes the distinction explicit.

## File/Image

- no-selection state for empty queues;
- minFiles/maxFiles/type/max-size issues participate in common validation;
- rejected selection attempts also publish developer-visible issues/errors even
  though rejected files are not committed.

## Governance / tests

Field governance now enforces:
- common validation state/issue contract;
- non-destructive maxlength law;
- exactly one Angular validator bridge per CVA control;
- lightweight hover tokens;
- RangeSlider global geometry + moving Tooltip contract;
- temporal rolling actions + Now reveal;
- fixed ColorPicker mode;
- file validation contract;
- prior SearchBox native Popover and three-mode laws.

Source audit found no remaining references to:
- old calendar preset IDs/labels;
- ColorPicker internal mode-switch evidence;
- clearable=false default;
- duplicated concrete required inputs;
- native maxlength binding;
- RangeSlider local min/max coordinate bindings.

## Status

Implementation is complete for this bounded correction program.
Verification is pending.

Mandatory next technical gate:
`npm run verify:clean`

After technical green, Product Owner runtime/Light/Dark re-review remains
mandatory before Inputs can be marked PASS.


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


<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_START -->
## 2026-10-01 — Mandatory continuity quartet + latest Fully Green checkpoint

### Mandatory synchronization rule

For every substantive project turn that changes any of the following:
- Product Owner finding or decision;
- implementation scope or completed correction;
- blocker / unblocked state;
- verification result;
- next execution gate;
- review status or acceptance status;

ChatGPT must update **all four** of these files in the same work cycle before
declaring the turn complete:

1. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
2. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
3. `README_FIRST.md`
4. `NEW_CHAT_HANDOFF.md`

Updating only a subset is not sufficient. These four documents are the required
continuity quartet for preserving current execution state and new-chat context.

### Latest canonical technical verification

Product Owner pulled and verified:
`ff4f721f600490414085e49d9c1975d640fdbbbc`
(`docs(review): synchronize URL regex lint follow-up`).

Canonical command:
`npm run verify:clean`

Result: **FULLY GREEN**.

Verified evidence:
- all repository governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- 653/653 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Current Inputs state:
- technical verification is green for the latest URL/Solid/NumberBox/File-Image
  motion/live-data correction set;
- exact next gate is Product Owner runtime re-test of those findings;
- Inputs remains Product Owner BLOCKED until explicit runtime/visual acceptance;
- no unrelated implementation is authorized.
<!-- CHATGPT_MANDATORY_CONTINUITY_QUARTET_END -->


<!-- CHATGPT_PROJECT_HISTORY_DIGEST_START -->
## Consolidated project-history digest — through 2026-10-01

This section is the compact continuity timeline for the substantive stages that
must survive chat boundaries. It complements detailed local sections elsewhere
in this repository.

### 1. No-iframe single-document Lab shell — completed

Key implementation checkpoints:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0`
  `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9`
  `style(lab): normalize direct shell markup`

Frozen current law:
- one direct `router-outlet`;
- no preview iframe;
- no embedded/direct dual rendering;
- no `labPreview` query;
- no iframe theme propagation;
- browser viewport is the real responsive authority;
- screenshot capture remains same-document from `#lab-capture-root`;
- exactly one App-level `[attr.data-theme]="theme()"`;
- exactly one App-level `ErpOverlayHost`.

The old Desktop/Tablet/Mobile preview controls were removed because a resized
same-document container cannot honestly simulate viewport media queries.

### 2. Tooltip system — completed before active Inputs work

Important checkpoints:
- positioning contract: `7a0a14f090ee38df3ea4adc02255856d89b6c71a`;
- stale iframe-era overlay governance correction:
  `a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`;
- lint correction: `3eb993e64616362bf920284e37b5005d412fd531`;
- cross-axis correction:
  `632f45a5fb7b42eefa09da0d2c8a20c0f520244b`;
- popover-padding coordinate-origin correction:
  `84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`.

Product Owner changed the default Tooltip motion to Zoom enter + Zoom exit.
Tooltip is not the active workstream.

### 3. Inputs Product Owner review — initial implementation stage

Authoritative findings:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Initial implementation checkpoint:
- `6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

The review established, among other points:
- SearchBox developer-selectable `modal | dropdown | inline` modes;
- functional selectable/filterable results;
- transient query distinct from committed selection;
- anchored dropdown width equal to field subject to viewport clamp;
- explicit close and no invisible/ghost hit target;
- modal vs listbox semantics;
- Time/DateTime Now;
- rolling DateRange actions;
- Confirm disabled until staged selection is valid;
- full-width Inputs Lab review;
- Arabic-first temporal empty-state copy.

Follow-up SearchBox/selection checkpoints:
- `cf91967291961037dd7f35d0e825fc4fb2da8312`;
- `92840de9c670edd32b05c1485f50c2e61e68fead`;
- `72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

### 4. SearchBox invisible-hit root cause — fixed

Defensive lifecycle checkpoints:
- `d274bdd2697d4d808f029bb1892ac0ee7591b589`;
- `4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Literal root cause:
`.search-box__popup { display:grid; }` overrode the browser's closed Popover
`display:none`, leaving a transparent fixed hit box after visual closure.

Root-cause fix:
- `5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Current law:
- base popup rule does not set `display`;
- `display:grid` exists only in `:popover-open`;
- leaving popup is inert/noninteractive and releases the native top layer
  immediately.

### 5. Unified Input validation architecture — implemented

Authoritative contract:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Major implementation checkpoint:
- `c3971739198e61adff98d821a6b8f6775faa4e6c`.

Common semantic states:
`null | empty | no-selection | invalid-entry | valid-entry`.

Every CVA input participates in:
- `inputState`;
- `valid`;
- string `errors`;
- structured `validationIssues`;
- canonical validation snapshot;
- common `required`;
- Angular `NG_VALIDATORS` bridge;
- external/business validation hook.

Core law:
- character/domain admission is separate from value validation;
- invalid admitted drafts remain visible;
- validation does not silently clamp/erase a draft merely to pass;
- typed domain restrictions remain control-specific.

Expanded implementation also covered:
- default Field clearability with opt-out;
- URL/Tel domain handling;
- numeric/money/stepper validation;
- RangeSlider shared coordinate domain + moving value Tooltip;
- Time/DateTime Now reveal;
- inclusive rolling DateRange 7/30-day presets;
- fixed per-instance ColorPicker mode;
- ItemPicker vs ComboBox product distinction;
- File/Image selection validation.

### 6. Verification-hardening stage after expanded Inputs implementation

The canonical gate is always:
`npm run verify:clean`.

Substantive corrections encountered during the verification loop included:
- SearchBox native maxlength made validation-only:
  `28829cb6b581d741170a7dd24c677f5a8dac11f7`;
- InputBase intentional-unused-parameter lint correction:
  `e933a4b598c32cea949d61aaf31cb207c54e4b10`;
- Selection free-color contract + Temporal test compile gaps:
  `9b499753bb06d350513a2f0bbad0a5de84a2817d`;
- stale Inputs spec expectations aligned with approved contracts:
  `1a6b29c1aa5dca36474c10eb40ef64492a65e595`;
- final stale NumberBox/Overlay expected values:
  `c096afc3cda1d076cfc702c721427c8468e4c61b`.

This stage produced the earlier Fully Green checkpoint:
- 87/87 test files;
- 649/649 tests;
- app/spec typecheck PASS;
- zero-warning production build PASS.

### 7. Product Owner runtime findings after that green checkpoint

The Product Owner then found three concrete runtime issues:
- Ghost/Text/Underline hover visible in Dark but effectively absent in Light;
- typed character admission had become too permissive for specialized controls;
- shared picker Clear actions needed IconButton + Tooltip presentation.

Bounded implementation checkpoints included:
- `e7068b64df5b64b789dbc4d2b5f81648ad11d2e9`
  typed character admission restoration;
- `b54c89c621dab914dda3555a5f8cf7ac0a48fd37`
  Overlay Clear as icon + Tooltip;
- `fead82d36c30533e575ab34ff41463f19ffa6848`
  regression tests/governance;
- `cade8015624c804d0be83bad5d2c49f126f5b906`
  Overlay Clear governance;
- `488741922c365a605acc9a70141f600278c46087`
  patch-integrity repair;
- `65c097d224bb31f282ec5737ebc8381ed9f73b14`
  icon-only Clear contract lock.

Follow-up governance/parser and stale-test corrections:
- `0dfea6b1eb71441267165da3149a0148ea6c4ade`;
- `c096afc3cda1d076cfc702c721427c8468e4c61b`.

### 8. Latest Product Owner runtime findings — URL, Solid, NumberBox, motion, live data

Latest authorized findings:
1. UrlBox must accept real web domains with optional HTTP(S) scheme and reject
   incomplete hosts such as `http://www.s`.
2. Solid needs the same Light/Dark hover discoverability guarantee as
   Ghost/Text/Underline.
3. NumberBox editing must admit ASCII digits only; min/max/step remain
   validation concerns.
4. selected File/Image rows need subtle hover/focus scale motion.
5. SearchBox, ItemPicker, and ComboBox result/item collections must be
   runtime-dynamic production data, including while an overlay is already open.

Implementation/test/governance checkpoints:
- `9b13eab3c00046a3ed6258d981d33663355b26e0`;
- `2912b97cb62ea159430bdca3f386814fa914698c`;
- `98c3c8ccddc8812af57d8b6a429b9510e0151465`;
- `5ec8124cb8ad483309d525bf558d41abb4252669`;
- `b6974154a916ebb751eda5290c7bbc2a9bce704b`;
- `eb3db0130db1786488b91e050f9d54168b28bbd3`;
- `64edf72fe8c7655a98e52d98e910bf675629129b`;
- `9ffa59e348b6246f1c8a210c01d437763b3a1f65`;
- URL-regex lint-only correction:
  `9315691c9579a324990a56d928e4e22d504111a4`.

Current detailed laws:
- UrlBox accepts scheme-less or HTTP(S) real domains with valid multi-label
  hostnames/TLDs and reports `url.format` for incomplete domains;
- Solid/Ghost/Text/Underline use the same theme-sensitive hover-token law;
- NumberBox editor is digits-only while admitted values may still be invalid
  through min/max/step;
- File/Image selected rows use tokenized `scale(1.01)` hover/focus motion and
  reduced-motion cancellation;
- SearchBox dropdown is signal-live; SearchBox modal, ItemPicker, and ComboBox
  use a live items provider while open;
- production controls are governed against Design-Lab/review-internal
  dependencies.

### 9. Current canonical technical checkpoint

Product Owner verified current source with:
`npm run verify:clean`.

Latest verified result:
- all governance checks PASS;
- Angular lint PASS;
- 87/87 test files PASS;
- **653/653 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- `Zero-warning build gate: PASS`.

Inputs status:
**Technical PASS / Product Owner runtime review still authoritative**.
Technical green never substitutes for Product Owner visual/runtime acceptance.

### 10. Mandatory continuity discipline

The following four files form the mandatory continuity quartet and must all be
updated in the same work cycle whenever a substantive decision, finding,
implementation state, blocker, verification result, or next gate changes:

- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`;
- `README_FIRST.md`;
- `NEW_CHAT_HANDOFF.md`.

Do not treat an update to only one or two of these as a complete continuity
sync.
<!-- CHATGPT_PROJECT_HISTORY_DIGEST_END -->


<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_START -->
## 2026-10-01 — Product Owner Overlay runtime review: bounded correction implemented / verification pending

Product Owner reviewed `/controls/overlays` in Light/Dark and identified five
Overlay-specific corrections.

### Authorized findings

1. The dedicated Overlay review page must contain Overlay-system evidence only.
   Temporal Inputs, selection pickers, and deferred control composites were
   duplicated there despite already having their production review locations.

2. The separator below the shared Overlay Header and above the Footer was
   visible in Light but too weak in Dark.

3. Default modal enter/exit motion must be `flip-x`.

4. Drawer positions must support all four edges:
   - logical start;
   - logical end;
   - physical top;
   - physical bottom.

5. Full-height side drawers must keep the shared Footer at the bottom/end of the
   surface while Body owns the flexible scrolling region.

### Bounded implementation

Source checkpoint:
`2a1d33ca9461de00ceec74f0d7ad5b69f0b38ae7`
(`fix(overlays): clean showcase and complete drawer geometry`).

Implemented:
- `ErpOverlayPosition` now includes `top`;
- default modal motion is `flip-x / flip-x`;
- top drawer defaults to `slide-down / slide-up`;
- existing start/end and bottom drawer defaults remain intact;
- OverlayHost positions top drawers at the top and gives top/bottom drawers full
  inline size;
- `ErpOverlayFrame` host + frame fill available full-height drawer surfaces;
- Header stays at start, Footer stays at bottom/end, Body uses the flexible
  scrolling grid row;
- new `--honesty-overlay-frame-separator-color` maps to
  `--honesty-border-default` and feeds both Header-bottom and Footer-top
  separator borders for Light/Dark visibility;
- `/controls/overlays` now has only four review groups:
  Modal, Drawers, Nested stack, and dismissal/backdrop/blur/motion policies;
- repeated Date/Time/DateRange, selection picker, RadioGroup/ButtonGroup,
  SplitButton, and FabMenu showcase evidence was removed from this route;
- top-drawer review evidence was added.

Test checkpoint:
`11532bd6d1589eaab43a012ce687f7be923cae61`
(`test(overlays): cover overlay-only page and four drawer edges`).

Governance/documentation checkpoint:
`f5e1d7ebcb79c4f76e98b918380843d877f6edec`
(`chore(overlays): govern top drawer and overlay-only review`).

Governance now protects:
- exact Overlay position union including top;
- `flip-x` modal default;
- top drawer geometry/motion;
- Overlay separator token;
- full-height Header/Body/Footer frame law;
- Overlay-only review-page scope with no duplicated Input/control demos.

Pre-rerun checks:
- Overlay governance JavaScript syntax compilation PASS;
- complete Overlay governance internal self-test PASS.

### Current status

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

The previous 87/87 files / 653/653 tests Fully Green checkpoint predates this
Overlay correction and must not be applied to the new source until the full
canonical gate passes.

After technical green, Product Owner runtime review must confirm the five
findings above in Light and Dark.
<!-- CHATGPT_OVERLAY_RUNTIME_REVIEW_2026_10_01_END -->


<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_START -->
## 2026-10-01 — Overlay-only page verification follow-up: public review ownership relocated

Product Owner pulled:
`bfbdc9d3d2d7cf70cc82511d0a075ea8ea0c03f2`
and ran the full canonical gate:
`npm run verify:clean`.

Observed progress:
- theme authority PASS;
- route-page ERP-only authoring PASS;
- Component Token framework PASS;
- system-color registry PASS;
- ErpText PASS;
- ErpIcon PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField governance then stopped before ErpOverlay/ng lint.

Exact demonstrated cause:
`PROGRAM_PUBLIC_CONTROLS` in
`tools/controls/check-erp-field-governance.mjs` still mapped twelve public
controls to the old Overlay showcase even though Product Owner had explicitly
made `/controls/overlays` Overlay-only.

The stale ownership affected:
- DateBox / TimeBox / DateTimeBox / DateRangeBox;
- ColorPicker / IconPicker / ItemPicker / ComboBox;
- RadioGroup;
- ButtonGroup / SplitButton / FabMenu.

Bounded correction:
- temporal + selection picker review ownership maps to
  `src/app/showcase/input-controls/input-controls.html`;
- RadioGroup review evidence was relocated into the existing Inputs
  Boolean/Choice group;
- ButtonGroup / SplitButton / FabMenu review evidence was relocated into the
  Buttons showcase in one dedicated Button Composites group;
- ErpField inventory now maps those three button composites to the Buttons
  showcase;
- Overlay showcase remains free of all twelve controls and is not weakened by
  the governance correction.

Correction checkpoint:
`ae1d33d07bbb340690ba670a46553fc557f02d77`
(`fix(governance): relocate public control review ownership`).

Pre-rerun checks:
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- live HTML ownership audit:
  - all nine Input/selection controls present on Inputs;
  - all three button composites present on Buttons;
  - none of the twelve present on Overlays.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not restore duplicated controls to the Overlay page to satisfy inventory.
Review ownership must remain aligned to the control's actual production-review
page.
<!-- CHATGPT_OVERLAY_SHOWCASE_OWNERSHIP_FOLLOWUP_END -->


<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: invalid Button showcase icon corrected

Product Owner pulled:
`c02dd33d32dfdcb2ec3029a11f578584b1b2dca8`
and reran:
`npm run verify:clean`.

Observed progress:
- all foundation/governance checks PASS;
- ErpField governance PASS;
- ErpOverlay governance PASS;
- Angular lint PASS;
- test bundle generation then stopped before test execution on one TypeScript
  template/compiler error.

Exact demonstrated failure:
`src/app/showcase/button-controls/button-controls.ts:98`

The newly relocated SplitButton/FabMenu showcase data used
`icon: 'table'`, but `table` is not an `ErpIconName` in the current
semantic registry.

Bounded correction:
- `619c5b3c3f0850567524d9c386a469fb18ac31de`
  `fix(showcase): use registered export icon`;
- replace only the invalid showcase icon `table` with registered semantic
  `download`;
- no production Button, SplitButton, FabMenu, Overlay, or Input runtime behavior
  changed.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not reopen the Overlay page ownership decision. Inputs/selection evidence
remains on Inputs, button composites remain on Buttons, and Overlays remains
Overlay-only.
<!-- CHATGPT_BUTTON_SHOWCASE_ICON_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — verification follow-up: nested RadioGroup showcase count corrected

Product Owner reran the complete canonical gate after relocating public control
review ownership to Inputs / Buttons while keeping Overlays Overlay-only.

Observed result:
- all governance checks PASS;
- Angular lint PASS;
- test bundle generation PASS;
- Overlay showcase PASS;
- Button showcase PASS;
- Overlay host/frame/manager tests PASS;
- 86/87 test files PASS;
- 650/651 tests PASS;
- exactly one test failed in
  `src/app/showcase/input-controls/input-controls.spec.ts`.

Demonstrated cause:
- the Boolean/Choice showcase now contains four standalone `ErpRadioBox`
  controls plus one `ErpRadioGroup`;
- `ErpRadioGroup` correctly renders three internal `ErpRadioBox` children;
- the stale showcase test used
  `querySelectorAll('erp-radio-box').length === 4`, which counted both
  standalone and grouped RadioBoxes and therefore received 7.

Bounded correction:
- `9c56954e62231a29966ed78abb1662c8ef3c8124`
  `fix(test): distinguish standalone and grouped radios`;
- no production source changed;
- the test now explicitly asserts:
  - four standalone RadioBoxes outside any RadioGroup;
  - three RadioBoxes owned by the RadioGroup;
  - one RadioGroup review instance.

This keeps the relocated review ownership intact and tests the component
composition instead of flattening nested DOM ownership.

Current status:
**implemented / canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not move RadioGroup back to the Overlay page and do not weaken public-control
inventory governance.
<!-- CHATGPT_RADIOGROUP_SHOWCASE_TEST_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_START -->
## 2026-10-02 — Overlay Header/Footer visibility is developer-configurable by API

Product Owner required developers to control whether the shared Header and
Footer are visually present for both modal and drawer surfaces through API
configuration only.

### Public API

`ErpOverlayFrameConfig` now exposes:

```ts
readonly showHeader?: boolean;
readonly showFooter?: boolean;
```

Defaults:
- `showHeader = true`;
- `showFooter = true`.

The flags are shared by both `kind: 'modal'` and `kind: 'drawer'`.

Header/Footer config objects remain required. Visibility is not configured by
consumer CSS, route-specific selectors, or content-side conditionals.

### Runtime behavior

Implementation checkpoint:
`e0cdb290355fe0b59f6560d960aea422445884b2`
(`feat(overlays): configure frame region visibility by API`).

Implemented behavior:
- OverlayManager normalizes both flags into the immutable runtime frame config;
- ErpOverlayFrame defaults missing flags to visible when instantiated directly;
- Header and Footer are conditionally rendered from the frame API only;
- frame grid rows adapt to Header-only, Footer-only, Body-only, and full
  Header/Body/Footer states;
- Body remains the persistent flexible content region;
- when Header is hidden, OverlayHost removes stale
  `aria-labelledby`/`aria-describedby` references and uses the configured
  Header title/subtitle directly through `aria-label` and
  `aria-description`;
- when Footer is hidden, configured Footer actions are not rendered.

The Overlay review route includes explicit API evidence for:
- modal without Header;
- modal without Footer;
- modal without Header or Footer;
- drawer without Header or Footer.

### Tests and governance

Test checkpoint:
`b8fe64407454a69f9353eee22b950c7d041065aa`
(`test(overlays): cover configurable frame regions`).

Governance/documentation checkpoint:
`d008cc17e56149edf37c1c810672b8ca7e2b480d`
(`chore(overlays): govern configurable frame regions`).

Coverage protects:
- default normalized flags are both true;
- explicit modal and drawer flag configurations;
- conditional Header/Footer rendering;
- adaptive grid state;
- hidden-Header accessibility fallback;
- Overlay showcase API evidence;
- API ownership through frame config rather than CSS.

Pre-verification checks:
- Overlay governance JavaScript syntax PASS;
- complete Overlay governance internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- complete ErpField governance internal self-test PASS;
- final template/CSS/ARIA source audit PASS.

Current status:
**implemented / canonical verification pending**.

Mandatory next technical gate:
`npm run verify:clean`.

This requirement does not reopen the Overlay-only showcase ownership decision or
the current modal/drawer geometry contracts.
<!-- CHATGPT_OVERLAY_FRAME_VISIBILITY_API_2026_10_02_END -->


<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_START -->
## 2026-10-02 — System Confirm Dialog service implemented on the blocking Overlay stack

Product Owner authorized one system-wide confirmation service built on the
existing blocking Overlay/Modal system.

### Product law

Every application confirmation dialog must use the shared
`ErpConfirmDialogService`.

Application code must not create a second Confirm modal subsystem, browser
`window.confirm`, direct Confirm internal content, or feature-local blocking
backdrops.

Confirmations invoked from inside an already-open Modal or Drawer must open as
a new top blocking Modal in the same `ErpOverlayManager` stack. The parent
surface remains mounted beneath it and resumes after the Confirm closes.

### Public API

`src/app/shared/confirm-dialog/confirm-dialog-contracts.ts`:

- `ErpConfirmDialogIntent = 'default' | 'warning' | 'danger'`;
- `ErpConfirmDialogConfig` exposes semantic confirmation inputs only:
  title, message, optional subtitle/details, labels, intent, and semantic icon.

`ErpConfirmDialogService.confirm(config)` returns `Promise<boolean>`:
- Confirm primary action -> `true`;
- Cancel / close / Escape / dismissal -> `false`.

Callers do not configure Overlay geometry, motion, Header/Footer visibility,
backdrop, or focus policy through the Confirm API.

### Fixed system policy

Every Confirm:
- kind = `modal`;
- position = `center`;
- size = `sm`;
- blocking = shared Overlay default `true`;
- Header = visible;
- Footer = visible;
- dismissOnEscape = `true`;
- dismissOnBackdrop = `false`;
- initial focus = Cancel action;
- restoreFocus/trapFocus = shared Overlay defaults;
- motion = current Modal default `flip-x`.

Intent mapping:
- default -> help icon + primary Confirm tone;
- warning -> warning icon + warning Confirm tone;
- danger -> error icon + danger Confirm tone + delete primary icon.

### Overlay action dependency

To support semantic Confirm intent without CSS workarounds,
`ErpOverlayActionConfig` now supports optional
`tone?: ErpButtonTone`.

OverlayManager normalizes action tone:
- Primary default -> `primary`;
- Secondary/Utility default -> `neutral`;
- explicit semantic tones such as `warning` / `danger` are preserved.

OverlayFrame passes that tone through the existing ErpButton / ErpIconButton
API.

### Implementation checkpoints

- `8f7cf03392eefb11e8c83e3fc2cbfd0afad21a3f`
  `feat(confirm): add system confirmation service`
- `aa90f0c7ede5018c80cedd5544528d7160ed5299`
  `test(confirm): cover system confirmation contract`
- `7d4affb3a61eee3b89fea490ae7454da17cd3e86`
  `chore(confirm): govern system confirmation usage`
- `a5118b5768c84896cb71e11a1ec94afe7502612f`
  `test(confirm): harden nested blocking confirmation evidence`
- `3eb04b160d3c9d5929300c896cc0eeb66e192ebe`
  `fix(governance): avoid Confirm method false positives`

### Review evidence

`/controls/overlays` remains Overlay-system-only, but now contains five
technical groups because System Confirm is itself an Overlay capability:

1. Modal;
2. Drawers;
3. System Confirm Dialog;
4. Nested stack;
5. dismissal/backdrop/blur/motion policy.

The Confirm review group exposes default, warning, and danger examples.

The existing nested blocking Overlay evidence also exposes a button that invokes
`ErpConfirmDialogService` from inside an already-open blocking surface.

No Date/Time/Input/Selection or unrelated Button composite demos were restored
to the Overlay page.

### Governance

New canonical lint stage:
`npm run erp-confirm:check`.

The checker protects:
- exact Confirm intent union;
- service-only system policy;
- fixed Modal/size/focus/dismissal behavior;
- semantic intent mapping;
- Confirm body ERP-primitives composition;
- required Overlay action tone support;
- Overlay showcase Confirm evidence;
- nested Confirm-from-blocking-Overlay evidence;
- no direct application import/use of `ErpConfirmDialogContent`;
- no browser `window.confirm` / `globalThis.confirm`;
- no native `<dialog>` alternative in application templates.

The browser-confirm rule was deliberately narrowed after dependency review:
Temporal and Selection picker internals legitimately own methods named
`confirm()`; governance must not confuse those business methods with browser
confirmation APIs.

### Pre-verification evidence

Current source audits:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField complete internal self-test PASS;
- actual Confirm source contract validation: zero errors;
- actual Overlay frame source contract validation: zero errors;
- repository search found no existing `<dialog>`, `window.confirm`, or
  `globalThis.confirm` usage.

The ErpButton checker syntax is valid; its self-test cannot be executed in the
minimal connector isolate because that checker depends on the imported Angular
template parser. The canonical local gate remains authoritative for it.

### Current technical state

**Implemented / canonical verification pending.**

The previous local run from `a1fe384...` reached all governance + Angular lint
PASS and then 86/87 test files / 650/651 tests before one stale nested RadioBox
count failed. That stale test was corrected in
`9c56954e62231a29966ed78abb1662c8ef3c8124`, but no later source — including
the configurable Overlay frame API and this System Confirm service — has yet
completed a fresh end-to-end `npm run verify:clean`.

Mandatory next technical gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_DIALOG_2026_10_02_END -->


<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_START -->
## 2026-10-02 — System Confirm expanded: auxiliary actions, action results, Header tone, dismissibility

Product Owner expanded the system-wide Confirm Dialog contract.

### New Product Owner requirements

A system Confirm may contain:
- the primary Confirm action;
- optional auxiliary action 1;
- optional auxiliary action 2;
- Cancel when user dismissal is enabled.

The two optional actions must be developer-configurable as normal Buttons with
or without icons, or as IconButtons. The caller must receive a result that
identifies which button/action was pressed.

The Confirm Header background must accept system semantic tones such as
`info`, `danger`, `warning`, `primary`, etc.

The caller must also control whether the user is allowed to dismiss the Confirm.
When dismissal is disabled:
- Header Close is hidden;
- Cancel is not rendered;
- Escape dismissal is disabled;
- backdrop dismissal remains disabled.

### Public Confirm API

`ErpConfirmDialogConfig` now includes:
- `headerTone?: ErpOverlayHeaderTone`;
- `userDismissible?: boolean` (default `true`);
- `auxiliaryActions?: readonly ErpConfirmDialogAuxiliaryAction[]`.

`ErpConfirmDialogAuxiliaryAction` exposes:
- stable `id`;
- `label`;
- optional semantic `icon`;
- `presentation?: 'button' | 'icon-button'`;
- optional semantic Button `tone`;
- optional logical `placement?: 'start' | 'end'`.

Auxiliary action law:
- zero, one, or two actions only;
- IDs must be nonblank and unique;
- `confirm` and `cancel` are reserved;
- ordinary Button may omit an icon;
- IconButton requires an icon;
- defaults: Button presentation, neutral tone, logical-start placement.

### Result contract

The service no longer returns `Promise<boolean>`.

It returns:

```ts
ErpConfirmDialogResult =
  | {type: 'action'; actionId: string}
  | {type: 'dismissed'; reason: 'close' | 'escape'}
```

Button results:
- Confirm -> `actionId: 'confirm'`;
- Cancel -> `actionId: 'cancel'`;
- auxiliary action -> its configured ID.

Header Close and Escape return `dismissed` instead of pretending to be button
actions.

### User-dismissal law

`userDismissible=true`:
- Header Close visible;
- Cancel visible;
- Escape enabled;
- initial focus targets Cancel;
- backdrop remains non-dismissible.

`userDismissible=false`:
- Header stays visible;
- Header Close hidden;
- Cancel removed;
- Escape disabled;
- backdrop disabled;
- initialFocus is null so the shared Overlay focus fallback reaches the primary
  Confirm action when no body focus target exists.

### Overlay dependencies added correctly

The generic Overlay Header API now includes:
- `ErpOverlayHeaderTone = 'default' | ErpButtonTone`;
- `header.tone?: ErpOverlayHeaderTone`;
- `header.showCloseButton?: boolean`.

Both default without breaking existing overlays:
- tone -> `default`;
- showCloseButton -> `true`.

Header tones are Component-Token-driven:
- primary/secondary/accent -> theme-sensitive Brand subtle surfaces;
- success/warning/danger/info -> theme-sensitive Feedback surfaces;
- neutral -> elevated neutral surface;
- default -> existing transparent/default Header.

No raw palette colors or local theme selectors are introduced.

### Implementation checkpoints

- `6b311965d8c0ddfcd3c20c004e06a17b4eaa86df`
  `feat(confirm): add auxiliary actions and dismissibility controls`;
- `f8c5868bd844796260684d347afd4fda8ceae9fe`
  `fix(confirm): normalize actionless close result`;
- `a250c28204513400a0607a39d9d86b45a134185a`
  `test(confirm): cover rich actions header tone and dismissal policy`;
- `d88613ff826fb4aa4b948995736d14f63f237459`
  `chore(confirm): govern rich confirmation API`.

### Test coverage added/updated

Coverage now includes:
- default Confirm action result;
- Cancel action result;
- Header Close dismissed result;
- Escape dismissed result;
- warning/danger intent mapping;
- Header tone independent from intent;
- two auxiliary actions;
- normal Button with optional icon;
- IconButton auxiliary action;
- semantic tone + logical placement;
- pressed auxiliary action ID result;
- max-two enforcement;
- reserved/duplicate/blank ID rejection;
- IconButton-without-icon rejection;
- non-dismissible Confirm configuration;
- absence of Cancel;
- hidden Header Close;
- Escape no-op while locked;
- Confirm remains functional while locked;
- nested Confirm above both Modal and Drawer parents.

OverlayManager/OverlayFrame tests were updated for normalized Header tone and
close-button visibility, and the Overlay showcase now contains five Confirm
review examples: default, warning, danger, multi-action, and locked.

### Governance / pre-verification

Current pre-rerun evidence:
- ErpConfirmDialog governance JavaScript syntax PASS;
- ErpConfirmDialog complete internal self-test PASS;
- ErpOverlay governance JavaScript syntax PASS;
- ErpOverlay complete internal self-test PASS;
- ErpField governance JavaScript syntax PASS;
- ErpField complete internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

The canonical gate is still authoritative for Angular compilation, unit tests,
typechecks, SCSS compilation, build budgets, and zero-warning production build.

### Current state

**Implemented / canonical verification pending.**

Mandatory next gate:
`npm run verify:clean`.

Technical green will not imply Product Owner visual approval.
<!-- CHATGPT_SYSTEM_CONFIRM_RICH_ACTIONS_2026_10_02_END -->


<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_START -->
## 2026-10-02 — Product Owner Confirm Header contrast correction

Product Owner runtime screenshots showed that the current colored Confirm Header
used pale/subtle semantic surfaces. The result was visually weak and the
semantic Header icon/title treatment lacked sufficient contrast and emphasis.

Product Owner proposed that the Confirm Header use the same semantic color as
the primary Confirm button.

### Corrected law

For System Confirm, when `headerTone` is not explicitly supplied, Header tone
now follows the primary Confirm action tone:

- default Confirm intent -> `primary`;
- warning Confirm intent -> `warning`;
- danger Confirm intent -> `danger`.

The caller may still explicitly override `headerTone`, including
`headerTone: 'default'` to request the ordinary Overlay Header appearance.

### Solid Header mapping

Non-default Overlay Header tones now use the same **solid semantic background**
roles as solid system Buttons:

- primary -> Brand Primary solid;
- secondary -> Brand Secondary solid;
- accent -> Brand Accent solid;
- success -> Feedback Success surface-strong;
- warning -> Feedback Warning surface-strong;
- danger -> Feedback Danger surface-strong;
- info -> Feedback Info surface-strong;
- neutral -> inverse surface.

Foreground uses the corresponding on-solid/inverse role. Warning intentionally
uses the same foreground role as the system Warning Button.

### Complete contrast correction

Changing background alone is forbidden because that would leave child controls
on stale tones.

For every non-default colored Header:
- semantic Header icon uses inherited on-solid foreground;
- title uses inherited on-solid foreground;
- subtitle uses inherited on-solid foreground;
- Header Close IconButton switches from neutral Ghost to **Solid with the same
  semantic Header tone**, preserving on-solid icon contrast.

For the default Overlay Header, existing behavior remains unchanged:
- transparent/default background;
- primary title/icon;
- secondary subtitle;
- neutral Ghost Close button.

No raw palette values, consumer CSS overrides, or theme-specific local hacks
were introduced.

### Implementation checkpoints

- `f10191242d3572b6fa03bbec1f87c4079ce41e90`
  `fix(confirm): match Header contrast to solid action tone`;
- `865ff5f1dcabf78a2f02538e5ab8990d5297b092`
  `test(confirm): cover solid Header contrast contract`;
- `31ee219c15ae949752f59a426811ce79704675fb`
  `chore(confirm): govern solid Header contrast`.

### Tests / governance

Coverage now protects:
- System Confirm default Header tone equals its Confirm action tone;
- default / warning / danger mapping;
- colored Header semantic icon uses inherited foreground;
- title/subtitle use inherited foreground;
- Close uses solid presentation and matching semantic tone;
- default non-colored Header preserves previous primary/secondary/Ghost
  presentation;
- Overlay Header Component Tokens must use solid + on-solid semantic mappings,
  preventing regression back to pastel/subtle surfaces.

Pre-rerun evidence:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField internal self-test PASS;
- actual current Confirm source contract validation: zero errors.

### Current state

**Implemented / canonical verification pending / Product Owner runtime
re-review pending.**

Mandatory next technical gate:
`npm run verify:clean`.

After technical green, Product Owner must visually confirm the corrected solid
Headers and icon/text/Close contrast in Light and Dark.
<!-- CHATGPT_CONFIRM_SOLID_HEADER_CONTRAST_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_FRAME_STYLE_BUDGET_2026_10_02_START -->
## 2026-10-02 — canonical verification reached final build; OverlayFrame style-budget split implemented

Product Owner pulled repository HEAD:
`c848151fa84fab723bcac851bcfa9e0550cc82a9`
and ran the canonical:
`npm run verify:clean`.

Observed verified results before the final build warning:
- all foundation and production governance checks PASS;
- ErpConfirmDialog governance PASS;
- Angular lint PASS;
- 89/89 test files PASS;
- 675/675 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build compilation completed.

The only failing condition was the zero-warning gate:
`src/app/shared/overlay/overlay-frame/overlay-frame.scss`
compiled to 4.17 kB, exceeding the unchanged 4.00 kB component-style warning
budget by 168 bytes.

This is a style-budget packaging issue, not a runtime/test/typecheck failure.

### Bounded correction

Checkpoint:
`272c0be2f8cb5cac5b8e37fd29aeaa3eaa98cc58`
(`fix(overlays): split frame tone facets for style budget`).

No visual, API, token, selector, or behavior contract was removed or changed.

`ErpOverlayFrame` now loads:
- `overlay-frame.scss` — structural/layout Header/Body/Footer rules;
- `overlay-frame-facets.scss` — the nine Header tone facet selectors.

The nine tone selectors were moved verbatim from the base stylesheet into the
facet stylesheet. The base stylesheet no longer imports the Overlay token mixins
because only the facet stylesheet consumes those mixins.

Current source sizes after the split:
- `overlay-frame.scss`: approximately 2534 source characters;
- `overlay-frame-facets.scss`: approximately 1096 source characters.

The canonical 4 kB / 8 kB style budgets remain unchanged.

### Governance correction

Overlay governance now:
- requires `ErpOverlayFrame` to load both style files through `styleUrls`;
- reads both files together as one semantic frame-style contract;
- requires every Header tone facet
  (`default/primary/secondary/accent/success/warning/danger/info/neutral`);
- preserves all existing solid Header contrast, on-solid foreground,
  Header/Footer geometry, and frame behavior checks.

Pre-rerun checks on the corrected source:
- Overlay governance JavaScript syntax PASS;
- complete Overlay governance internal self-test PASS;
- actual current OverlayFrame contract validation: zero errors;
- diff review confirms the correction is a style-file split plus corresponding
  governance/documentation only.

### Current state

The verification evidence on `c848151...` proves:
- governance/lint green;
- 89/89 files and 675/675 tests green;
- both typechecks green;
- build compiled, but zero-warning status did **not** pass because of the single
  style-budget warning.

The new source at `272c0be...` therefore remains:
**implemented / fresh canonical verification pending**.

Mandatory next gate:
`npm run verify:clean`.

Do not weaken the global component-style budgets to resolve this checkpoint.
<!-- CHATGPT_OVERLAY_FRAME_STYLE_BUDGET_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_DEFAULT_POLICY_AND_HEADER_OUTLINE_2026_10_02_START -->
## 2026-10-02 — Product Owner Overlay defaults + Confirm plain Header + dark Header outline

Product Owner runtime review added five connected Overlay/Confirm requirements.

### 1. System Confirm must demonstrate an uncolored Header

The Confirm service continues to derive a colored Header from intent by default,
but the Overlay review route now includes an explicit example using:

```ts
headerTone: 'default'
```

This proves that a developer can keep the ordinary Overlay Header without
changing Confirm service architecture.

### 2. Colored Header outline must remain visible in Light and Dark

Product Owner reported that the thin light outline around the colored Confirm
Header was visible in Light but disappeared in Dark.

Correction:
- added tokenized Header outline width/color;
- default/uncolored Header keeps outline transparent;
- colored Headers derive the outline from the current on-solid Header
  foreground using `color-mix(... 60%, transparent)`;
- Header renders this as an inset box-shadow, so the outline follows the clipped
  Overlay Header boundary in both themes;
- no raw white, raw palette value, or local theme selector was introduced.

### 3. Default Overlay blur = medium

All shared Overlay entries now normalize:

```ts
blur: options.blur ?? 'medium'
```

This applies to regular modal/drawer opens and the legacy compact-menu exception.

Developer API overrides remain fully supported:
`low | medium | high`.

The Overlay Component Token fallback also uses medium blur, and Host facets now
explicitly cover all three blur API values.

### 4. Default Overlay backdrop tone = primary

All shared Overlay entries now normalize:

```ts
backdropTone: options.backdropTone ?? 'primary'
```

This applies to normal overlays and the legacy compact-menu exception.

Developer API overrides remain supported:
`default | neutral | primary | secondary | accent`.

The named `default` tone remains a real selectable value; Host facets now
explicitly map it instead of relying on the previous base-token omission.

### 5. Default dismissal policy = false / false

System Overlay defaults remain and are explicitly governed as:

- `dismissOnBackdrop = false`;
- `dismissOnEscape = false`.

Both are still independently configurable through `ErpOverlayOpenConfig`.

System Confirm now follows the same default policy instead of implicitly enabling
Escape whenever `userDismissible=true`.

Confirm public API now also exposes:
- `dismissOnEscape?: boolean` — default false;
- `dismissOnBackdrop?: boolean` — default false.

`userDismissible` retains its stronger structural meaning:
- true -> Header Close + Cancel are available; Escape/Backdrop still default off
  unless explicitly enabled;
- false -> Header Close + Cancel are removed and Escape/Backdrop are forced off
  even if the caller requests true.

Confirm dismissal results now include `backdrop` as an explicit reason when
backdrop dismissal is intentionally enabled.

### Showcase evidence

The Overlay review route now:
- includes six System Confirm examples, including `plain-header`;
- labels medium blur as the default;
- labels primary backdrop tone as the default;
- explicitly states that Backdrop and Escape dismissal are both disabled by
  default;
- retains API evidence for enabling/disabling each dismissal policy.

### Implementation checkpoints

- `4049d0011cbeeba3808a5e1ea9e171f5228bcb0a`
  `feat(overlays): align default backdrop and dismissal policies`;
- `df69a9b60d3e6b3e86b79124e0b3d6d5d58608ac`
  `test(overlays): cover new defaults and Header outline`;
- `ca3f8281043feafbf411707bd709c4adcd67ba05`
  `chore(overlays): govern new default backdrop policies`;
- `4ceb3191b03ecc7c627159e3b05139a071f06a6d`
  `fix(governance): restore Overlay default drift self-test`.

The last commit corrected only an internal invalid-drift fixture that still
replaced the old blur default with the new value and therefore did not create an
invalid case. No runtime source changed in that follow-up.

### Tests / governance coverage

Coverage now protects:
- modal defaults medium/primary/false/false;
- legacy compact overlay defaults medium/primary/false/false;
- explicit low/default visual overrides;
- Host DOM evidence for medium/primary defaults;
- Confirm Escape/Backdrop defaults off;
- explicit Confirm Escape opt-in;
- explicit Confirm Backdrop opt-in;
- backdrop dismissal result reason;
- `userDismissible=false` forcing both dismissal routes off;
- explicit uncolored Confirm Header example;
- colored Header outline rendering;
- all blur/backdrop API facet selectors;
- runtime default token fallbacks.

Pre-rerun evidence:
- ErpConfirmDialog governance syntax PASS;
- ErpConfirmDialog internal self-test PASS;
- ErpOverlay governance syntax PASS;
- ErpOverlay internal self-test PASS;
- ErpField governance syntax PASS;
- ErpField internal self-test PASS;
- actual current Confirm contract validation: zero errors;
- actual current OverlayFrame contract validation: zero errors;
- actual current Overlay default/facet drift validation: zero errors;
- diff review found no budget weakening, raw color addition, or browser-confirm
  bypass.

### Current state

**Implemented / fresh canonical verification pending / Product Owner runtime
re-review pending.**

The earlier canonical run on `c848151...` proved all governance/lint,
89/89 test files, 675/675 tests, and both typechecks before stopping only on the
OverlayFrame style-budget warning. That warning was addressed by the later
style split, but the current defaults/outline changes are newer source and
therefore require a fresh complete gate.

Mandatory next technical gate:
`npm run verify:clean`.

Do not weaken the existing 4 kB / 8 kB component-style budgets.
<!-- CHATGPT_OVERLAY_DEFAULT_POLICY_AND_HEADER_OUTLINE_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_HEADER_OUTLINE_TOKEN_GOVERNANCE_2026_10_02_START -->
## 2026-10-02 — canonical verification exposed Header outline Component Token governance violation; correction implemented

Product Owner pulled and verified
`40b03ddc824a189bdefe16037f6687c4bc5a0430`.

Observed canonical result:

- `theme-authority:check` PASS;
- `route-pages:check` PASS — 22 routed templates;
- `component-tokens:check` FAILED before later lint/test/typecheck/build stages ran.

Root cause:

- Overlay `_tokens.scss` contained raw `color-mix(...)`;
- colored Header tone facets used a nested `@include`;
- both conflict with the repository-wide Component Token law that token mixins
  emit Component Token custom-property declarations only and contain no raw
  color functions.

Bounded correction:

- colored Header facets now map
  `--honesty-overlay-frame-header-outline-color` from the existing
  `--honesty-overlay-frame-header-fg` Component Token;
- default Header keeps the outline source transparent;
- the approved 60% `color-mix` moved to
  `overlay-frame.scss`, where Frame presentation is assembled;
- Component Token checker self-tests now explicitly reject raw
  `color-mix(...)` and nested facet `@include`;
- Overlay governance now requires eight colored outline mappings, forbids the
  obsolete helper/color function from Overlay Component Tokens, and requires
  the 60% mix in the Frame presentation layer;
- no public Overlay/Confirm API, Header tone mapping, dismissal policy, blur,
  backdrop tone, theme authority, component-style budget, or visual redesign
  was changed.

Implementation checkpoints:

- `948570c918f58326146388a1febfffec34b5a95b` —
  `fix(overlays): restore component token purity`;
- `50768e0919897404c30b3aec8ab8423f9204e62f` —
  `fix(overlays): assemble header outline in frame layer`;
- `355ac02cc6d6b797eba85292f6708833b15965af` —
  `test(governance): pin component token purity regressions`;
- `b102d37e5e7d389758ea49cd225cbbacbbe13205` —
  `fix(governance): align overlay outline with token framework`;
- `c622fbfa22e8afe4c1190f46291e8676990f515c` —
  `docs(overlays): document header outline token correction`.

Current state:

**Implemented / fresh canonical verification pending / Product Owner runtime
re-review pending.**

Recommended focused preflight:

```text
npm run component-tokens:check
npm run component-tokens:check:self-test
npm run erp-overlay:check
npm run erp-overlay:check:self-test
```

Mandatory technical gate remains:

`npm run verify:clean`.

A technical PASS will not imply Product Owner visual approval. After green,
Product Owner must runtime re-review the Overlay/Confirm Header outline and
contrast in Light and Dark before the review state advances.
<!-- CHATGPT_OVERLAY_HEADER_OUTLINE_TOKEN_GOVERNANCE_2026_10_02_END -->


<!-- CHATGPT_OVERLAY_LEGACY_SPEC_SCAN_2026_10_02_START -->
## 2026-10-02 — canonical verification advanced; Overlay governance false-positive corrected

Product Owner pulled and verified
`c9c43f271e43e60e44aef9a9804ea91ba464f45b`.

Verified focused results:

- `component-tokens:check` PASS — 46 concrete token modules;
- `component-tokens:check:self-test` PASS;
- `erp-confirm:check` PASS;
- `erp-confirm:check:self-test` PASS.

The focused `erp-overlay:check` and the full `npm run verify:clean` both
stopped at:

`Legacy compact Overlay menu exception must remain isolated to SplitButton and OverlayManager`.

The Overlay governance self-test itself passed.

Source review established that runtime isolation was still correct. The only
literal `openLegacyCompactMenu` occurrences were:

- `src/app/shared/overlay/overlay-manager.ts` — owning implementation;
- `src/app/controls/split-button/split-button.ts` — authorized production
  consumer;
- `src/app/shared/overlay/overlay-manager.spec.ts` — unit-test coverage.

Root cause was a governance false-positive: the production-consumer inventory
included `*.spec.ts` files.

Correction:

- `0a60acff75dcbe773c7e1592c1a2707b11ce6754` —
  `fix(governance): exclude overlay specs from legacy consumer scan`;
- `fd41eb033e202ca9fe0e1f8dffbf44cf1fca8637` —
  `docs(overlays): record legacy spec scan correction`.

The checker now excludes specs only from this production-consumer inventory.
The runtime rule remains exactly the same: production use is restricted to
OverlayManager ownership and SplitButton. The self-test now includes a spec
occurrence as valid evidence while the existing third-production-consumer
fixture remains invalid.

No runtime source, public API, visual behavior, Component Token mapping, theme
authority, Overlay dismissal/default policy, or component-style budget changed.

Current state:

**Governance checker correction implemented / fresh Overlay governance rerun
pending / full canonical verification pending / Product Owner runtime re-review
pending.**

Next checks:

```text
npm run erp-overlay:check
npm run erp-overlay:check:self-test
npm run verify:clean
```

Technical PASS still does not imply Product Owner visual approval.
<!-- CHATGPT_OVERLAY_LEGACY_SPEC_SCAN_2026_10_02_END -->


<!-- CHATGPT_DERIVED_BLUEPRINT_REFERENCE_2026_10_02_START -->
## 2026-10-02 — accepted historical reconstruction blueprint recorded as derived planning reference

Accepted derived reference:

`docs/project-history/derived/PROJECT_ORIGIN_COMPONENTS_AND_EXECUTION_BLUEPRINT_V1.md`

Committed at:

`ef8d5fc6e0107dc1afc85e428ab4ee1f74c1a1c2` —
`docs(history): establish reconstructed product and component blueprint`.

Classification:

- accepted as an externally reviewed historical reconstruction and planning reference;
- based on the immutable raw archive plus the current-authority documents and
  repository snapshot recorded inside the blueprint;
- useful for future Product Owner scope decisions, component inventory review,
  dependency planning, gap analysis, and long-term roadmap discussions.

Explicit authority boundary:

- this blueprint is **not** continuity authority;
- it does **not** authorize implementation;
- it does **not** visually approve or freeze any component/family;
- it does **not** override newer Product Owner decisions, current repository
  source, or the four continuity-authority files;
- historical/candidate inventory entries must not be treated as an authorized
  backlog merely because they appear in the blueprint.

The blueprint records 166 normalized component/capability entries and preserves
the distinction between implemented, partial, deferred, superseded,
historical-only, unresolved product decisions, and items requiring Product Owner
confirmation.

Current execution state is unchanged by this documentation-only milestone.

The next technical gate remains:

```text
npm run erp-overlay:check
npm run erp-overlay:check:self-test
npm run verify:clean
```

Only after canonical technical green does the current Product Owner
Overlay/Confirm runtime/visual re-review proceed. The historical blueprint must
not be used to jump ahead to Table, Shell, Forms, or any other unopened family.
<!-- CHATGPT_DERIVED_BLUEPRINT_REFERENCE_2026_10_02_END -->


<!-- CHATGPT_BOTTOM_UP_REFERENCE_FIRST_LAW_2026_10_02_START -->
## 2026-10-02 — Fully Green technical gate + Product Owner bottom-up/reference-first execution law

### Canonical verification result

Product Owner pulled and verified repository HEAD:

`0814833dc9ad53fbb27109b4b434caaaf7507de9` —
`docs(review): register derived blueprint reference`.

Focused Overlay verification:

- `npm run erp-overlay:check` PASS;
- `npm run erp-overlay:check:self-test` PASS.

Complete canonical `npm run verify:clean` result:

- Single App theme authority PASS;
- routed-page ERP-only authoring PASS — 22 routed templates;
- Component Token framework PASS — 46 concrete token modules;
- system-color registry PASS;
- ErpText governance PASS;
- ErpIcon registry/governance PASS;
- ErpButton governance PASS;
- ErpTooltip governance PASS;
- ErpField governance PASS;
- ErpOverlay governance PASS;
- ErpConfirmDialog governance PASS;
- Angular lint PASS;
- **89/89 test files PASS**;
- **679/679 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- **Zero-warning build gate PASS**.

Therefore `0814833dc9ad53fbb27109b4b434caaaf7507de9`
is the latest fully verified technical checkpoint.

Technical green still does not imply Product Owner visual approval.

### Product Owner execution-order law

The Product Owner has now made the following ordering rule explicit and
authoritative for future component work:

1. **Do not start any new component/family while currently implemented
   components still have active technical, runtime, visual, or Product Owner
   review issues that must be resolved.**
2. After the current implemented scope is brought to the required accepted
   state, future work proceeds **bottom-up by dependency**, never by convenience
   or by historical list order.
3. Lower-level prerequisites must be completed/reviewed before dependent
   higher-level components are opened.
4. The accepted derived blueprint may be used to understand the dependency DAG
   and candidate inventory, but it does not itself authorize any candidate.
5. No implementation agent may skip an unfinished lower dependency in order to
   start a higher composite, pattern, shell, form, table/data system, or
   ERP-specific feature.

The intended dependency model is a bottom-up dependency DAG:

```text
Foundation / Reference / Semantic / resolution contracts
→ Component Tokens
  ├─→ Structural / Text / Icon primitives
  │     └─→ Button / Action basics
  ├─→ InputBase / CVA
  │     └─→ Field Foundation
  │           └─→ concrete Field controls
  ├─→ Anchored Overlay foundation
  │     └─→ Tooltip / nonblocking anchored consumers
  └─→ Blocking Overlay foundation
        └─→ OverlayFrame
              └─→ blocking overlay-backed controls/composites

Approved lower-level controls/foundations
→ composites
→ reusable patterns
→ table/data/forms/shell composition when their own prerequisites are complete
→ ERP-specific composites
→ feature/page migration
```

At every future opening, the next candidate is the **lowest unresolved
dependency**, not merely the next item in a historical list or roadmap table.

This is a dependency law, not a claim that every historical candidate must be
built.

### Product Owner visual-reference law

For **every newly opened component with visual output**, implementation requires
one of these two Product Owner decisions **before visual design/implementation
begins**:

- the Product Owner supplies or explicitly identifies the visual reference to
  use; or
- the Product Owner explicitly authorizes that component to be designed and
  implemented **without a visual reference**.

No implementation agent, ChatGPT, Codex, historical archive, or derived
blueprint may choose a visual reference on the Product Owner's behalf or infer a
reference waiver from silence.

When a reference is supplied, the execution scope must first analyze what is to
be adopted, adapted, or rejected from that reference before implementation.

This rule applies to future new visual components/families. It does not
retroactively grant visual approval to currently implemented components.

### Immediate next product state

The technical gate is now green.

No new component/family is authorized by this result.

The next action remains Product Owner runtime/visual review of the current
Overlay/Confirm state. Existing pending review/correction work must be completed
before any new family is opened.

<!-- CHATGPT_BOTTOM_UP_REFERENCE_FIRST_LAW_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_PO_CORRECTION_2026_10_02_START -->
## 2026-10-02 — Product Owner Button Composites correction implemented

### Product Owner findings and references

The Product Owner reviewed the existing `/controls/buttons` Button Composites
evidence and supplied explicit visual/behavior authority.

`ErpButtonGroup`:

- reference:
  `https://getbootstrap.com/docs/4.0/components/button-group/`;
- finding: attached buttons were visually separated and did not complete one
  connected group;
- required law: independent actions, but one connected visual entity when
  `attached=true`, with logical outer radii and controlled internal seams.

`ErpSplitButton`:

- reference:
  `https://cdn.dribbble.com/userupload/20508363/file/original-bc0de18cc434c597141bc6d3544e84c5.png?resize=1024x682&vertical=center`;
- finding: primary action and menu trigger looked like separate controls;
- required law: two independent interaction segments inside one unified visual
  surface.

`ErpFabMenu`:

- references:
  - `https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj42vs-Diff%20GM3%20Expressive.png?alt=media&token=b0d9f87d-66c0-48f4-9a11-e312b5b207ef`;
  - `https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj3w24-Diff%20GM2.png?alt=media&token=e358569f-0a63-4ead-a844-ad98804cee2d`;
- finding: opening the action list changed normal layout and pushed the FAB
  trigger;
- required law: trigger position is stable; actions float in a top-layer
  anchored surface above normal document content.

These references satisfy the Product Owner reference-first law for this
correction wave.

### Implemented correction

Button / IconButton internal attached-segment geometry:

- dedicated logical attached-segment styles now support
  `inline|block` axes and `first|middle|last` positions;
- this is an internal composite geometry hook, not a new Page/Product authoring
  API.

ButtonGroup:

- attached children now receive logical attached axis/position metadata;
- inner radii are removed by logical position;
- horizontal and vertical groups own controlled internal separators;
- detached mode removes attached geometry;
- showcase evidence now uses Save / Copy / Delete actions so the action-group
  contract is not confused with segmented selection.

SplitButton:

- primary Button and menu IconButton now share solid/primary/md/default visual
  treatment and attached logical geometry;
- a controlled separator remains between the two interaction segments;
- the action menu now uses `AnchoredOverlayController` plus native
  `popover="manual"`;
- opening SplitButton creates no blocking `ErpOverlayManager` entry;
- the prior production `openLegacyCompactMenu` exception is superseded;
- the legacy API remains owner-only inside OverlayManager until a separate
  cleanup removes it;
- action-menu content is now input/output driven rather than dependent on
  blocking Overlay injection.

FabMenu:

- FAB trigger remains in normal layout and keeps its position;
- Extended FAB actions live in a fixed native manual-Popover surface;
- the shared Anchored Overlay geometry positions the action collection at
  logical `block-start` / `block-end`;
- ArrowUp/ArrowDown, Escape, focus restoration, disabled action behavior, and
  outside-pointer dismissal remain deterministic.

Showcase:

- SplitButton alternatives are export-related only;
- FabMenu actions are create-related only;
- the two composites no longer share one semantically unrelated action list.

### Regression protection

Updated tests cover:

- ButtonGroup inline/block attached geometry and detached reset;
- SplitButton unified segment facets, primary output, anchored top-layer menu,
  zero blocking Overlay entries, selection, Escape, and focus restoration;
- FabMenu stable trigger identity, anchored positioning, selection, logical
  placement, Escape, and focus restoration;
- Buttons showcase evidence for all three corrected composite contracts.

Button governance now requires:

- attached-segment geometry in ErpButton / ErpIconButton;
- ButtonGroup attached seams;
- SplitButton unified authoring + manual top-layer menu;
- FabMenu fixed manual top-layer action surface.

Overlay governance now requires:

- SplitButton and FabMenu anchored-overlay ownership;
- no SplitButton `ErpOverlayManager` / `openLegacyCompactMenu` dependency;
- Tooltip is not accepted as a SplitButton menu subsystem;
- legacy compact Overlay production consumption is forbidden; any remaining API
  is owner-only in OverlayManager.

Formal current contract:

`src/app/controls/composite-family/BUTTON_COMPOSITES_CORRECTION_V1.md`

Overlay supersession record:

`src/app/shared/overlay/OVERLAY_SYSTEM_V1.md`

### Verification state

The previously verified `0814833dc9ad53fbb27109b4b434caaaf7507de9`
checkpoint remains the latest **Fully Green** historical technical checkpoint.

This Button Composites correction changes runtime source/tests/governance after
that checkpoint, therefore the current main must **not** be called Fully Green
until a fresh canonical rerun passes.

Recommended focused preflight:

```text
npm run component-tokens:check
npm run erp-button:check
npm run erp-button:check:self-test
npm run erp-overlay:check
npm run erp-overlay:check:self-test
```

Mandatory final gate:

`npm run verify:clean`

Current state:

**Implemented / fresh focused verification pending / fresh canonical
verification pending / Product Owner Button Composites Light/Dark runtime and
visual re-review pending.**

No new component family was opened. This wave corrects already implemented
Button Composites before any future bottom-up component work.
<!-- CHATGPT_BUTTON_COMPOSITES_PO_CORRECTION_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_TOOLTIP_GOVERNANCE_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — Button Composites verification advanced; Tooltip governance false-positive corrected

Product Owner locally verified
`e3de8b4d7643b812139fbab8a8a9a28c866fae5c`.

Focused results:

- `component-tokens:check` PASS;
- `erp-button:check` PASS;
- `erp-button:check:self-test` PASS;
- `erp-overlay:check` PASS;
- `erp-overlay:check:self-test` PASS.

The full `npm run verify:clean` advanced through those gates and stopped at
`erp-tooltip:check` with exactly two findings:

- `src/app/controls/fab-menu/fab-menu.html`: manual Popover owner not yet
  allowlisted by Tooltip governance;
- `src/app/controls/split-button/split-button.html`: same stale allowlist.

Root cause:

Tooltip governance still recognized only the earlier approved anchored owners
(Tooltip internals and SearchBox). The current Button Composites correction had
already migrated SplitButton and FabMenu to the shared
`AnchoredOverlayController` + native manual Popover architecture, and both
Button and Overlay governance accepted that architecture.

Bounded correction:

- `26b7f29c0819ccc855e6f787f6996b99238816d6` —
  `fix(governance): approve button composite anchored popovers`;
- Tooltip governance now explicitly allows manual Popover markup only for:
  - SearchBox;
  - SplitButton;
  - FabMenu;
  - Tooltip-owned templates remain covered by their existing root rule;
- checker self-test now proves SplitButton and FabMenu are valid owners;
- arbitrary manual Popover markup elsewhere remains rejected;
- no runtime source, public API, visual behavior, Component Token mapping,
  theme authority, or style budget changed.

Documentation follow-up:

- `21744ea74e1bc4bc62bed0054c8bc238ea1ae4b8` —
  `docs(buttons): record anchored popover governance follow-up`.

Current state:

**Button Composites correction implemented / focused Tooltip governance rerun
pending / full canonical verification pending / Product Owner Light/Dark runtime
and visual re-review pending.**

Next checks:

```text
npm run erp-tooltip:check
npm run erp-tooltip:check:self-test
npm run verify:clean
```

Do not reopen unrelated controls or start any new component family.
<!-- CHATGPT_BUTTON_COMPOSITES_TOOLTIP_GOVERNANCE_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_ICON_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — Button Composites verification advanced; invalid showcase icon corrected

Product Owner verification on the current Button Composites correction advanced
through:

- `erp-tooltip:check` PASS;
- `erp-tooltip:check:self-test` PASS;
- complete lint/governance PASS.

The full `npm run verify:clean` then stopped during Angular test bundle
generation before tests executed.

Exact compile failure:

`src/app/showcase/button-controls/button-controls.ts:101`

The create-document FabMenu showcase item used:

`icon: 'document'`

but `document` is not a current `ErpIconName`. The semantic icon registry
contains `file` for this file/document concept.

Bounded correction:

- `eb8ea1816914d62b47363aaeb0139a2edb85b3b3` —
  `fix(showcase): use registered file icon for create action`;
- `4c9494b920171a58968fe9f39567b49923e5c43c` —
  `test(fab-menu): use registered semantic file icon`;
- `8156de8d018e4744aa389f46bfe7945c53eeab7b` —
  `docs(buttons): record semantic icon verification follow-up`.

No runtime component behavior, public API, attached geometry, anchored-overlay
ownership, Component Token mapping, theme authority, or style budget changed.

Current state:

**Button Composites correction implemented / lint-governance verified /
canonical test-typecheck-build rerun pending / Product Owner Light/Dark runtime
and visual re-review pending.**

Mandatory next gate:

`npm run verify:clean`

Do not open any new component family.
<!-- CHATGPT_BUTTON_COMPOSITES_ICON_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_BUTTON_COMPOSITES_FULLY_GREEN_2026_10_02_START -->
## 2026-10-02 — Button Composites correction reached full technical green

Product Owner locally verified repository checkpoint:

`e920c9377f245128d863ce15916d63c17d1321af` —
`docs(review): record button composite icon follow-up`.

Complete canonical result:

- all governance checks PASS;
- Angular lint PASS;
- **89/89 test files PASS**;
- **681/681 tests PASS**;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- **Zero-warning build gate PASS**.

The corrected `ErpButtonGroup`, `ErpSplitButton`, and `ErpFabMenu`
implementation is therefore technically **Fully Green**.

Important boundary:

- technical green does **not** equal Product Owner visual approval or freeze;
- the Product Owner must still complete Light/Dark runtime/visual re-review of
  the three Button Composites;
- no new component/family is authorized solely by this technical result;
- bottom-up dependency ordering and Product Owner reference-first law remain
  unchanged.

Immediate product gate:

1. Product Owner runtime/visual re-review of ButtonGroup;
2. Product Owner runtime/visual re-review of SplitButton;
3. Product Owner runtime/visual re-review of FabMenu;
4. only after the current implemented scope is accepted may the next lowest
   unresolved dependency be opened.

The next candidate after closing current review issues remains the deferred
Boolean/Choice visual correction layer:

- `ErpCheckBox`;
- `ErpRadioBox`;
- then `ErpRadioGroup` re-review because it depends on RadioBox.

CheckBox/RadioBox visual implementation still requires Product Owner-supplied
references or an explicit Product Owner waiver to work without a reference.
<!-- CHATGPT_BUTTON_COMPOSITES_FULLY_GREEN_2026_10_02_END -->


<!-- CHATGPT_NEXT_REFERENCE_BATCH_CHECKBOX_2026_10_02_START -->
## 2026-10-02 — next Product Owner reference batch opened; ErpCheckBox correction implemented

### Product Owner batch decision

The Product Owner supplied `erp-component-templates.zip` as the visual-reference
package for the next component phase and selected option A.

Fixed execution order:

1. `ErpCheckBox` — `erp-checkbox.html`;
2. `ErpRadioBox` — `erp-radiobox.html`;
3. `ErpEmptyState` — `erp-empty-state.html`;
4. `ErpSelect` — `erp-select.html`.

Reference scope is visual/design only. Literal reference colors are not authority.
Honesty ERP Semantic/Component Tokens remain authoritative for all runtime
Light/Dark, tone, status, focus, disabled, and theme-dependent colors.

Formal batch contract:

`src/app/controls/NEXT_COMPONENT_REFERENCE_BATCH_V1.md`

### Bottom-up / one-at-a-time boundary

Only `ErpCheckBox` is opened in this wave.

Do not modify `ErpRadioBox`, `ErpEmptyState`, or `ErpSelect` until:

- CheckBox focused/canonical verification passes;
- Product Owner completes CheckBox runtime/visual review;
- unresolved CheckBox findings are closed.

This preserves the Product Owner bottom-up law and prevents parallel speculative
component work.

### ErpCheckBox Product Owner reference adoption

Formal CheckBox contract:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_CORRECTION_V1.md`

Adopted from the Product Owner supplied `erp-checkbox.html`:

- native checkbox remains the semantic/CVA owner;
- one fixed rounded-square visual control;
- vertical centering against a complete title + optional description text block;
- checked / unchecked / indeterminate / hover / focus / pressed / disabled
  presentation;
- semantic ErpIcon check/minus marks without RTL mirroring;
- selected-state halo and pressed scale;
- reduced-motion behavior;
- supplied size geometry:
  - sm 18px;
  - md 24px;
  - lg 30px;
  - xl 38px.

Existing public upper ERP sizes remain as explicit compatibility extensions:

- xxl 44px;
- xxxl 50px;
- xxxxl 56px.

Explicitly rejected as CheckBox responsibilities:

- Switch;
- Neon variant;
- Selectable Tile;
- Task List strike-through behavior;
- reference demo configurator;
- reference literal palette/gradients/shadows.

Those examples must not turn CheckBox into a God component.

### Implemented source correction

- added optional `description: string | null`;
- retained required `label` as the title/label contract;
- title and description use ErpText span rendering inside the one native outer
  label, avoiding nested native label semantics;
- CheckBox text block is vertically centered against the visual control;
- Component Tokens now map reference-led geometry while keeping all colors on
  Honesty ERP Semantic Tokens;
- checked/indeterminate states add a token-derived selected halo;
- ready press interaction scales only the visual control;
- disabled/invalid state removes press transform and uses disabled token roles;
- showcase Boolean/Choice evidence now demonstrates descriptions plus
  sm/md/lg/xl reference sizes;
- CheckBox tests now cover optional description, one-control geometry, marks,
  facets, validation, and native semantics;
- ErpField governance now pins title/description geometry, supplied size
  geometry, selected/pressed behavior, reduced motion, and forbids nested
  CheckBox label semantics.

Current detailed field contract was synchronized in:

`src/app/controls/FIELD_FAMILY_V1.md`

### Verification state

The previous Button Composites checkpoint is technically Fully Green, but this
new CheckBox runtime/test/governance wave changes source after that checkpoint.

Current CheckBox state:

**implemented / focused verification pending / full canonical verification
pending / Product Owner Light/Dark runtime and visual review pending.**

Required focused preflight:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
```

Mandatory final gate:

`npm run verify:clean`

Technical PASS will not equal Product Owner CheckBox visual approval.

Do not begin RadioBox until this CheckBox gate is closed.
<!-- CHATGPT_NEXT_REFERENCE_BATCH_CHECKBOX_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V2_VISUAL_REJECTION_2026_10_02_START -->
## 2026-10-02 — Product Owner rejected CheckBox V1 visual result; template-match V2 implemented

### Product Owner visual finding

The Product Owner reviewed the live `ErpCheckBox` result and explicitly
rejected it as far from the supplied `erp-checkbox.html` design.

The rejection is authoritative even though the local canonical verification for
that V1 correction was technically green.

Observed technical result before visual rejection:

- 89/89 test files PASS;
- 682/682 tests PASS;
- all governance/lint PASS;
- app/spec typechecks PASS;
- production build PASS;
- Zero-warning build gate PASS.

This is a concrete enforcement of the project law:

**technical PASS != Product Owner visual approval.**

### Root cause

The first correction misinterpreted the supplied CheckBox file as a general
design reference and retained too much of the previous CheckBox visual skeleton.

That was incorrect.

The Product Owner supplied template must be treated as template-level design
authority for the Classic CheckBox assembly, except that its literal colors are
replaced by Honesty ERP Component/Semantic Tokens.

### V2 correction

Only `ErpCheckBox` remains open.

V2 now adopts the supplied Classic CheckBox much more directly:

- selected fill is a two-stop gradient assembled entirely from ERP Component
  Tokens / Semantic color roles;
- the fill scales from 0.55 to 1 inside the visual box;
- the checkmark uses the supplied large CSS clip-path silhouette instead of a
  nested ErpIcon;
- indeterminate reuses the CSS mark layer as the centered rounded bar;
- border thickness is proportional to control size;
- radius is proportional to control size;
- selected halo and focus offset are proportional to control size;
- pressed visual scale is 0.86;
- title/description typography and gap now scale per sm/md/lg/xl reference
  geometry;
- RTL reverses only the gradient direction with a private
  `--_honesty-check-box-gradient-angle`; the mark is not mirrored;
- disabled opacity follows the reference behavior through Foundation opacity;
- reference literal palette values remain forbidden.

The Design Lab Boolean/Choice evidence was also corrected:

- CheckBox now owns a dedicated reference-review card;
- RadioBox is shown separately and clearly remains the current pre-reference
  implementation;
- the former compressed flat combined list is superseded.

### Governance

ErpField governance now rejects:

- nested ErpIcon marks inside CheckBox;
- raw SVG marks;
- raw hex reference colors;
- missing CSS fill/mark pseudo-element assembly;
- missing clip-path mark;
- missing sm/md/lg/xl supplied geometry;
- missing RTL private gradient assembly;
- missing checked/indeterminate/pressed/focus/reduced-motion states;
- nested native label semantics.

### Current state

**CheckBox V2 implemented / fresh focused verification pending / fresh
`npm run verify:clean` pending / Product Owner Light/Dark visual re-review
pending.**

Do not begin RadioBox until CheckBox V2 is technically green and visually
accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_V2_VISUAL_REJECTION_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V2_STACK_GAP_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — CheckBox V2 verification follow-up: invalid review Stack gap corrected

Product Owner locally verified
`42ad7f12e952bffe5f8bb0d4c6dc27fde540d59f`.

Focused results:

- `component-tokens:check` PASS;
- `erp-field:check` PASS;
- `erp-field:check:self-test` PASS.

Angular test bundle generation then stopped before tests executed because the
new Boolean/Choice review cards used `<erp-stack gap="md">`, while the
authoritative `ErpStackGap` contract is:

`none | tight | default | loose`.

Bounded correction:

- `7c1a08d24c30c0c63dbd55333e41064fbd4d9c5a` —
  `fix(showcase): use valid stack gap in choice review cards`;
- both invalid `gap="md"` values were replaced with `gap="default"`;
- no CheckBox runtime implementation, visual design, tokens, public API,
  governance contract, or style budget changed.

Documentation checkpoint:

- `0fab5787a6dd62cfa5c9e4f43d456732517d1f1d` —
  `docs(check-box): record showcase stack-gap follow-up`.

Current state:

**CheckBox V2 implemented / focused governance PASS / fresh tests pending /
fresh canonical verification pending / Product Owner visual re-review pending.**

Next gates:

```text
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox yet.
<!-- CHATGPT_CHECKBOX_V2_STACK_GAP_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V3_VARIANTS_SOLID_TONES_2026_10_02_START -->
## 2026-10-02 — Product Owner CheckBox V3: remove gradient and implement template variants

### Product Owner runtime/visual findings

Product Owner reviewed CheckBox V2 in both Dark and Light.

Findings:

- Dark selected colors were broadly acceptable;
- Light selected gradient treatment was not acceptable;
- selected CheckBox color should use one ordinary ERP system tone, not a
  gradient;
- the prior implementation still underused the supplied template because it
  omitted the template's Switch and Neon variants.

The Product Owner clarified that the supplied template was provided to be
implemented, not selectively reduced to only the Classic example.

### Source-grounded template scope

Full review of `erp-checkbox.html` confirms:

- exact size classes:
  - sm 18px;
  - md 24px;
  - lg 30px;
  - xl 38px;
- its Live Config Variant selector contains:
  - Classic;
  - Switch;
  - Neon;
- its JavaScript declares:
  `VARIANT_CLASSES = ['cb--switch', 'cb--neon']`;
- Selectable Tiles and Task List are separate demo/composition sections, not
  entries in that Variant selector.

Therefore current public CheckBox visual variant API is:

`classic | switch | neon`

with `classic` default.

### Implemented V3 correction

Color:

- selected gradient removed completely;
- one `--honesty-check-box-fill-color` now owns selected fill;
- neutral maps to system inverse neutral;
- primary / secondary / accent map to their matching solid system tones;
- feedback statuses continue to map to matching strong feedback surfaces;
- all mark/focus/glow colors derive from current ERP semantic/component tokens;
- no raw template palette is adopted.

Switch:

- proportional track width = 1.95 × current control size;
- knob = 0.72 × current control size;
- travel = 0.42 × current control size;
- full-radius track;
- checked knob moves to on side;
- RTL reverses travel direction only;
- indeterminate centers/scales knob;
- active scale = 0.95;
- native checkbox/CVA semantics remain unchanged.

Neon:

- keeps Classic geometry and check/indeterminate assembly;
- tone-derived multi-layer glow;
- tone-derived focus outline;
- pulse animation;
- reduced motion disables pulse;
- no hardcoded Neon cyan/purple reference colors.

Showcase:

- Classic reference card retains sm/md/lg/xl + state evidence;
- dedicated Switch review card added;
- dedicated Neon review card added;
- RadioBox remains separately labelled as the current pre-reference control.

Tests/governance:

- CheckBox public API test now covers Classic/Switch/Neon;
- showcase tests require all three variant evidence groups;
- ErpField governance now rejects:
  - missing variant API;
  - missing Switch/Neon style ownership;
  - gradient regression;
  - raw hex reference colors;
  - missing solid fill token;
  - missing RTL-aware Switch travel;
  - missing Neon pulse/reduced-motion;
  - missing supplied size geometry.

### Superseded assumptions

The earlier ChatGPT assumption that Switch and Neon should be excluded to avoid
a God component is superseded. The supplied template itself defines them as
CheckBox variants, so excluding them contradicted the Product Owner reference.

Selectable Tile and Task List remain composition examples only because the
template itself classifies them separately from its Variant selector; this is a
source-derived boundary, not an assistant-invented visual rejection.

### Current state

**CheckBox V3 implemented / fresh focused verification pending / fresh
canonical verification pending / Product Owner Light/Dark visual re-review
pending.**

Required next gates:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox until CheckBox V3 is technically green and visually
accepted by Product Owner.
<!-- CHATGPT_CHECKBOX_V3_VARIANTS_SOLID_TONES_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V3_GOVERNANCE_MISMATCH_FOLLOWUP_2026_10_02_START -->
## 2026-10-02 — CheckBox V3 governance false-positive corrected; pre-handoff static audit added

Product Owner local verification on
`1ce479b53bb440bb80c0cd1519db83ca285ccd21` produced:

- standalone test suite PASS;
- **89/89 test files PASS**;
- **683/683 tests PASS**;
- `npm run verify:clean` then stopped at exactly one
  `erp-field:check` CheckBox governance finding.

Root cause:

- production Switch styles use private variables
  `--_switch-off` and `--_switch-on`;
- the governance checker still required stale pre-compaction private names
  `--_honesty-check-box-switch-off` and
  `--_honesty-check-box-switch-on`.

Bounded correction:

- `aac51a5fcdfecb3eeb9ee148e07799a38e5519ed` —
  `fix(governance): align checkbox switch private variables`;
- no CheckBox runtime source, template, Component Tokens, public API, visual
  behavior, or showcase implementation changed.

Post-correction static source-to-governance audit:

- 47 CheckBox governance predicates checked against current production source;
- 47 PASS;
- 0 mismatches.

### New execution rule

For every remaining component in the Product Owner reference batch, before a
checkpoint is handed to Product Owner for local verification:

1. inspect runtime/template/tokens/tests/governance together as one bounded diff;
2. evaluate every changed governance predicate against current production source;
3. require zero static source/governance mismatches;
4. inspect changed dependent tests for stale selectors/literals;
5. only then request Product Owner local execution.

This is a pre-handoff static consistency gate. It reduces avoidable false
positives but does not replace `npm run verify:clean`.

Current state:

**CheckBox V3 runtime/tests visually unchanged from the prior checkpoint /
governance mismatch corrected / fresh erp-field and canonical verification
pending / Product Owner visual re-review pending.**

RadioBox remains unopened.
<!-- CHATGPT_CHECKBOX_V3_GOVERNANCE_MISMATCH_FOLLOWUP_2026_10_02_END -->


<!-- CHATGPT_CHECKBOX_V4_VIDEO_REVIEW_2026_10_03_START -->
## 2026-10-03 — Product Owner video review opened CheckBox V4 closure candidate

### Product Owner evidence

The Product Owner supplied a live screen recording covering the CheckBox review
in Dark and Light and interacting with Classic/Switch states.

The video is authoritative for the runtime/visual findings below.

### Findings closed in V4

- neutral/default selected CheckBox must not become inverse white in Dark or
  inverse black in Light;
- default/neutral selection now resolves through the ordinary primary action
  system tone;
- unchecked Switch track must remain visibly distinct from the review surface
  in both themes;
- Switch OFF now uses a dedicated `surface-canvas` track and strong semantic
  border;
- user activation must leave indeterminate state instead of the literal input
  immediately reasserting mixed visuals;
- an external change to the `indeterminate` input may re-arm mixed state;
- required danger must be validation-derived, not a permanent hard-coded
  `status="danger"`;
- required status returns to `none` immediately after a valid selection;
- disabled must use one attenuation path only; whole-control reference opacity
  remains, duplicate disabled text-color dimming was removed;
- CheckBox review sizes are now one comparable sm/md/lg/xl scale;
- the public shared Field size vocabulary is still accepted, but CheckBox
  xxl/xxxl/xxxxl alias to the supplied template's 38px xl geometry instead of
  inventing unsupported CheckBox sizes;
- Switch and Neon remain the template-defined public CheckBox variants;
- Selectable Tiles and Select All / Task List are now represented as
  template-derived Design Lab compositions built on CheckBox rather than being
  ignored;
- the Select All evidence starts partially selected and proves true
  indeterminate -> select-all behavior;
- forced equal-height review cards were removed to eliminate the large empty
  review areas visible in the earlier page.

### Runtime / source correction

Current V4 changes are bounded to CheckBox, its InputControls review evidence,
dependent tests, ErpField governance, and CheckBox/Field/batch documentation.

RadioBox source remains unopened.

### Regression protection

CheckBox unit tests now pin:

- native/CVA semantics;
- Classic/Switch/Neon variant API;
- user-exitable indeterminate state;
- external re-arm of indeterminate;
- required invalid -> danger and checked -> none recovery;
- size/facet compatibility.

InputControls tests now pin:

- full CheckBox reference sections;
- exact sm/md/lg/xl evidence;
- Switch and Neon evidence;
- Selectable Tiles evidence;
- Select All / Task List evidence;
- mixed-state exit;
- required-status recovery;
- tile interaction;
- task-master indeterminate -> all-selected behavior.

ErpField governance now also requires:

- user-exitable indeterminate implementation;
- visible Switch OFF track token roles;
- ordinary system selected tone;
- no selected gradient;
- no duplicate disabled text dimming;
- full CheckBox reference showcase evidence;
- validation-derived required danger;
- task/tile interactive review model.

### Pre-handoff audit

Before merge preparation, current V4 source was evaluated against **85 static
CheckBox runtime/showcase/governance predicates**:

- 85 PASS;
- 0 mismatches.

This static gate does not replace executable verification.

### Current state

**CheckBox V4 implemented on bounded work branch / static pre-handoff audit
PASS / fresh local executable verification pending / Product Owner Light/Dark
visual re-review pending.**

Required executable gates after merge:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not open RadioBox until CheckBox V4 is technically green and visually
accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_V4_VIDEO_REVIEW_2026_10_03_END -->


<!-- CHATGPT_CHECKBOX_V4_MERGED_CHECKPOINT_2026_10_03_START -->
## 2026-10-03 — CheckBox V4 merged to main after final static preflight

The bounded Product Owner video-derived CheckBox V4 correction was
squash-merged to `main` at:

`9aa72e456b902530aab61e6c5a3286d2180b9e07` —
`fix(check-box): close Product Owner video findings`.

The work branch used incremental commits for implementation/review, but main
received one squash commit only.

Final pre-merge audit after all source/test/governance/style-budget
restructuring:

- **139/139 static predicates PASS**;
- **0 source/governance mismatches**;
- CheckBox style ownership split across token-frame/base/states/Switch/Neon/
  facets/sizes to reduce component-style budget risk;
- InputControls review stylesheet remained below the project warning threshold
  at source-preflight level;
- RadioBox source remained untouched.

V4 includes the Product Owner video findings:

- ordinary system selected tone;
- visible Switch OFF track in Light/Dark;
- user activation exits indeterminate;
- external indeterminate changes can re-arm mixed state;
- required danger is validation-derived and recovers after checking;
- one disabled attenuation path;
- exact template sm/md/lg/xl visual geometries, with higher shared Field size
  names aliasing xl for CheckBox compatibility;
- Classic / Switch / Neon;
- Selectable Tiles composition;
- Select All / Task List composition;
- removal of forced equal-height review-card whitespace.

Current state:

**CheckBox V4 merged / fresh executable verification pending / Product Owner
Light-Dark visual re-review pending / RadioBox not opened.**

Required executable gate:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Do not begin RadioBox until this gate is green and CheckBox is visually accepted.
<!-- CHATGPT_CHECKBOX_V4_MERGED_CHECKPOINT_2026_10_03_END -->


<!-- CHATGPT_CHECKBOX_EXACT_REFERENCE_V5_2026_10_04_START -->
## 2026-10-04 — Product Owner replaced CheckBox V1–V4 with exact erp-checkbox-3 authority

### Binding Product Owner decision

The Product Owner rejected the previous CheckBox visual result and supplied a
replacement reference file:

`erp-checkbox-3.html`

Reference identity captured during implementation:

- 59,910 bytes;
- SHA-256:
  `63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`.

The Product Owner explicitly requires the production result to reproduce the
demo's reusable component structure, geometry, modes, variants, states, and
motion presentation, while replacing the demo palette with Honesty ERP system
colors only.

This V5 supersedes every earlier CheckBox V1/V2/V3/V4 visual assumption.
Earlier CheckBox correction records remain historical only.

Current detailed authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

### Implemented V5 public contract

Modes:

- `checkbox` — default;
- `switch`;
- `tile`.

Variants:

- `outline` — default;
- `filled`;
- `soft`.

Additional exact-reference inputs:

- optional `description`;
- `readOnly` interaction guard;
- `hideText` standalone visual mode while retaining the required label as the
  accessible name;
- existing `indeterminate`, tone, status, size, disabled, required, CVA, and
  validation contracts remain.

### Exact geometry and motion

Reference CheckBox size geometry:

- sm = 18px;
- md = 22px;
- lg = 28px;
- xl = 36px.

Shared Field size names xxl/xxxl/xxxxl remain accepted only for API
compatibility and resolve to the CheckBox xl geometry.

Switch math follows the source reference:

- track width = control × 1.85;
- track padding = control × 0.13;
- thumb = track height − 2 × padding;
- travel = track width − 2 × padding − thumb.

Reference motion is preserved:

- instant 90ms;
- fast 140ms;
- base 220ms;
- check draw 300ms;
- erase 150ms;
- pop 240ms;
- draw delay 70ms;
- source standard/out/spring/draw/erase cubic-bezier curves;
- reduced motion = 1ms and no pop animation.

### Exact reusable visual assembly

- native checkbox remains the sole semantic/CVA owner;
- one internal SVG mark reproduces the supplied check and dash paths using
  `pathLength="1"` and stroke-dashoffset draw/erase animation;
- this SVG is a bounded internal CheckBox graphic exception only; raw SVG
  remains forbidden for Feature/Page authors;
- Switch uses the supplied resting track + directional fill sweep + derived
  thumb travel;
- Tile is now a real CheckBox mode owned by the component itself, not a
  showcase wrapper;
- Filled and Soft are token swaps only and keep identical markup;
- read-only remains focusable and blocks pointer/Space/Enter mutation;
- native user activation exits indeterminate; an external indeterminate input
  change can re-arm it;
- required validation derives danger and recovers automatically after a valid
  selection;
- disabled uses the supplied single whole-control attenuation path.

### Color law

Only the supplied palette is replaced.

All production colors resolve from current Honesty ERP Semantic/Component
Tokens:

- system text/surface/border roles;
- current action/brand tone fill roles;
- action subtle roles for Soft;
- Feedback roles for status/danger;
- system focus and elevation roles.

No reference hex colors, component-owned Light/Dark branching, gradient, or
Neon treatment remains.

### Design Lab evidence

The Inputs review now mirrors the source demo sections owned by CheckBox:

- Standalone checkbox;
- Checkbox with title & sub-title;
- Switch mode;
- Tile mode — multi-select;
- Outline / Filled / Soft variants;
- Indeterminate / Select All;
- Size scale;
- State matrix.

The source demo's "Tile mode — single select" uses native radio inputs.
That subsection is intentionally not faked with checkbox semantics; it remains
the first visual target of the next authorized RadioBox wave.

### Tests and governance

CheckBox unit tests pin:

- native/CVA defaults;
- checkbox/switch/tile modes;
- outline/filled/soft variants;
- standalone accessible naming;
- indeterminate exit and external re-arm;
- read-only interaction guard;
- validation-derived danger recovery;
- size compatibility;
- disabled/invalid configuration boundaries.

Showcase tests pin:

- exact CheckBox evidence sections;
- current mode/variant counts;
- SVG check/dash evidence;
- exact sm/md/lg/xl review scale;
- required recovery;
- Select All indeterminate behavior.

ErpField governance now requires the V5 contract and rejects V1–V4 regressions,
including Neon, gradient fill, old modes/variants/sizes, missing SVG stroke
mark, missing Switch/Tile ownership, or stale showcase evidence.

ErpIcon governance has one exact-file exception for the CheckBox-owned internal
SVG mark. The general raw SVG prohibition remains active everywhere else.

### Pre-handoff static audit

Before merge, the final source was checked as one bounded unit:

- Component runtime/token/test audit: 73/73 PASS;
- Showcase/governance audit: 57/57 PASS;
- Component Token mixin audit: 79 base tokens, 0 facet/base mismatches,
  0 raw-color violations;
- approximate post-Sass physical stylesheet budget preflight: 0 files at or
  above the 4k warning threshold;
- RadioBox production implementation remains otherwise untouched.

Current state:

**CheckBox exact-reference V5 implemented / static preflight PASS / fresh local
executable verification pending / Product Owner Light-Dark visual approval
pending.**

Required executable gate after pull:

`npm run verify:clean`

Do not open the RadioBox reference wave until V5 is technically green and
visually accepted by the Product Owner.
<!-- CHATGPT_CHECKBOX_EXACT_REFERENCE_V5_2026_10_04_END -->


<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_FOLLOWUP_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 verify advanced; read-only label-click lint defect corrected

Product Owner locally pulled exact-reference V5 checkpoint:

`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` —
`fix(check-box): implement exact Product Owner reference V5`.

Canonical verification advanced through:

- Single App theme authority PASS;
- route-page ERP-only authoring PASS;
- Component Token framework PASS;
- system colors PASS;
- ErpText PASS;
- ErpIcon registry/governance PASS;
- ErpButton PASS;
- ErpTooltip PASS;
- ErpField PASS;
- ErpOverlay PASS;
- ErpConfirm PASS.

Angular template lint then stopped at exactly two CheckBox accessibility findings:

- outer `<label>` had a `(click)` handler without a keyboard event;
- the same non-focusable label was treated as an interactive element.

Root cause:

V5 implemented read-only pointer blocking on the outer label. That ownership is
incorrect even though the label is associated with the native checkbox.

Bounded correction:

- remove all click ownership from the outer label;
- move the read-only click guard to the native
  `input[type="checkbox"]`, which is the authoritative interactive/focusable
  element;
- `handleNativeClick` prevents default only for read-only;
- existing native keydown guard continues to block Space/Enter for read-only;
- existing defensive change restoration remains;
- CheckBox unit test now proves read-only native click is prevented;
- ErpField governance now requires the native click handler and rejects any
  `(click)` binding on the outer CheckBox label.

No Product Owner visual design, reference geometry, token mapping, mode,
variant, motion, or showcase implementation changed.

Current state:

**CheckBox exact-reference V5 unchanged visually / accessibility-lint follow-up
implemented on bounded work branch / fresh canonical verification pending /
Product Owner Light-Dark visual approval pending.**

RadioBox remains unopened.
<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_FOLLOWUP_2026_10_04_END -->


<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_MERGED_2026_10_04_START -->
## 2026-10-04 — CheckBox V5 read-only lint follow-up merged

The bounded accessibility follow-up was squash-merged to `main` at:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`.

The change is behavior/semantics-only:

- outer CheckBox label has no click handler;
- native checkbox input owns the read-only click guard;
- native keydown guard remains;
- defensive change restoration remains;
- tests/governance pin this ownership and reject label click handlers.

Post-merge static audit:

- **13/13 read-only/lint predicates PASS**;
- **0 mismatches**.

No Product Owner visual design, erp-checkbox-3 geometry, system-token mapping,
mode, variant, size, motion, or showcase evidence changed.

Current state:

**CheckBox exact-reference V5 merged / read-only lint follow-up merged /
fresh canonical verification pending / Product Owner Light-Dark visual approval
pending / RadioBox unopened.**
<!-- CHATGPT_CHECKBOX_V5_READONLY_LINT_MERGED_2026_10_04_END -->


<!-- CHATGPT_PERSISTENT_CONTINUITY_PROTOCOL_2026_10_04_START -->
## Permanent continuity protocol — mandatory for every substantive execution cycle

### New-chat reading order

A new ChatGPT conversation must **not** ask the Product Owner to reconstruct the
project history manually.

At the start of a new chat, read the following repository files in this order,
then verify live GitHub `main` before making any current-state claim:

1. `README_FIRST.md`
2. `CURRENT_EXECUTION_STATE.md`
3. `NEW_CHAT_HANDOFF.md`
4. `DECISIONS_AND_CONSTRAINTS.md`
5. `GIT_CHECKPOINTS.md`
6. `AGENTS.md`
7. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
8. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
9. `src/app/controls/NEXT_COMPONENT_REFERENCE_BATCH_V1.md`
10. `src/app/controls/FIELD_FAMILY_V1.md`
11. accepted CheckBox component contract:
    `src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`
12. RadioBox implementation contract:
    `src/app/controls/radio-box/RADIO_BOX_VISUAL_CONTRACT_V1.md`
13. current EmptyState exact-reference contract:
    `src/app/controls/empty-state/EMPTY_STATE_REFERENCE_EXACT_V1.md`

For long-range inventory/dependency/planning context only, also read when
needed:

`docs/project-history/derived/PROJECT_ORIGIN_COMPONENTS_AND_EXECUTION_BLUEPRINT_V1.md`

The blueprint is a derived planning reference, not implementation
authorization or visual approval.

### Current immediate state

Current main documentation HEAD at the time of this protocol:

`be140ad3c171fe3475101fb5a329ca0437060ba7`

Current CheckBox runtime/source checkpoint:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`

The first local canonical run of exact-reference V5 at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` passed every project governance
gate through ErpConfirm and then stopped on two Angular template-lint
accessibility findings caused by click ownership on the outer CheckBox label.

That defect is corrected and merged.

Fresh `npm run verify:clean` on current main remains pending.

Product Owner Light/Dark visual approval of exact-reference CheckBox V5 also
remains pending.

RadioBox is not yet opened.

### Mandatory synchronization law

Every substantive cycle must update persistent project documentation **in the
same cycle before handoff**.

A substantive cycle includes any:

- Product Owner decision or visual finding;
- implementation/code change;
- blocker or root-cause correction;
- verification result;
- visual acceptance/rejection;
- scope/reference change;
- execution stage/phase transition;
- current/next component change.

The mandatory synchronized set is:

1. `CURRENT_EXECUTION_STATE.md`
2. `README_FIRST.md`
3. `NEW_CHAT_HANDOFF.md`
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
5. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

Also update whenever their subject changes:

- `DECISIONS_AND_CONSTRAINTS.md`
- `GIT_CHECKPOINTS.md`
- active batch contract;
- active component-specific contract;
- affected family/system contracts.

Do **not** leave the latest state, decision, stage, blocker, or execution result
only inside chat history.

Do **not** hand a substantive checkpoint to the Product Owner until:

- runtime/source changes;
- dependent tests;
- governance;
- execution state;
- roadmap/stage state;
- Product Owner findings;
- component/batch contracts

are synchronized as one bounded unit.

### Authority reminders

- Product Owner is final product/visual authority.
- technical PASS != Product Owner visual approval/freeze.
- fix current implemented components before opening new ones.
- future execution is bottom-up by dependency.
- any new visual component requires Product Owner reference or explicit
  no-reference authorization.
- reference colors do not override Honesty ERP system color/token architecture
  unless Product Owner explicitly says otherwise.
- `npm run verify:clean` is the canonical technical executable gate.
<!-- CHATGPT_PERSISTENT_CONTINUITY_PROTOCOL_2026_10_04_END -->

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
- RadioBox runtime/source implementation waits for that technical gate to pass;
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
