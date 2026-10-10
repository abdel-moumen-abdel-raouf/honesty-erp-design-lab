# GIT CHECKPOINTS — HONESTY ERP Design Lab

## Temporal input family internal-review candidate — 2026-10-10

Entry checkpoint:

- `26f6650f325de1fb1be406b68b98ad88b8fbb6ef` — synchronized `main` after the
  numeric interaction input checkpoint.

Bounded scope:

- Reviewed DateBox, TimeBox, DateTimeBox, and DateRangeBox at desktop/narrow
  Light/Dark RTL/LTR conditions with every owned picker open and confirmed.
- Added meaningful generated Workbench fixtures and real-picker CVA regression
  evidence; production APIs/defaults remain unchanged.
- Persisted 88/88 browser assertions and open/confirmed screenshots under
  `docs/review-evidence/erp-temporal-inputs/v1-internal-review/`.
- Canonical gate: 128/128 files, 834/834 tests, both typechecks, all
  governance/lint, zero-warning 418.32 kB / 92.89 kB build.

Product Owner visual status remains pending. The actual commit SHA is recorded
by Git after this document snapshot; do not infer acceptance from the commit.

## Numeric interaction input internal-review candidate — 2026-10-10

Entry checkpoint:

- `e208790a4fa03f149651d0bffceb7d2b775301f1` — synchronized `main` after the
  foundational text-like field checkpoint.

Bounded scope:

- Reviewed `ErpNumberStepper` and `ErpRangeSlider` at desktop/narrow
  Light/Dark RTL/LTR conditions.
- Added meaningful generated Workbench fixtures and button/keyboard CVA event
  regression evidence; production APIs/defaults remain unchanged.
- Persisted 36/36 browser assertions and paired screenshots under
  `docs/review-evidence/erp-numeric-inputs/v1-internal-review/`.
- Canonical gate: 128/128 files, 830/830 tests, both typechecks, all
  governance/lint, zero-warning 418.32 kB / 92.89 kB build.

Product Owner visual status remains pending. The actual commit SHA is recorded
by Git after this document snapshot; do not infer acceptance from the commit.

## Foundational text-like field internal-review candidate — 2026-10-10

Entry checkpoint:

- `f5c9fd948a7cf19134e6f47f6e1f959f48a0ec2e` — synchronized `main` after the
  public Icon and Text primitive checkpoint.

Bounded scope:

- Reviewed seven text-like field owners at desktop/narrow Light/Dark RTL/LTR.
- Added meaningful generated Workbench fixtures and CVA/event regression
  evidence; production APIs/defaults remain unchanged.
- Persisted 112/112 browser assertions and paired screenshots under
  `docs/review-evidence/erp-text-fields/v1-internal-review/`.
- Canonical gate: 128/128 files, 828/828 tests, both typechecks, all
  governance/lint, zero-warning 418.32 kB / 92.90 kB build.

Product Owner visual status remains pending. The actual commit SHA is recorded
by Git after this document snapshot; do not infer acceptance from the commit.

## Public Icon and Text primitive internal-review candidate — 2026-10-10

Entry checkpoint:

- `29e051722b274b2603ed2899cba493d98466f8fb` — synchronized `main` after the
  structural primitive family checkpoint.

Bounded scope:

- Reviewed `ErpIcon` and `ErpText` at desktop/narrow Light/Dark RTL/LTR.
- Corrected generated review placement/content only; production APIs/defaults
  remain unchanged.
- Persisted 26/26 browser assertions and viewport/target screenshots under
  `docs/review-evidence/erp-public-primitives/v1-internal-review/`.
- Canonical gate: 128/128 files, 821/821 tests, both typechecks, all
  governance/lint, zero-warning 418.32 kB / 92.88 kB build.

Product Owner visual status remains pending. The actual commit SHA is recorded
by Git after this document snapshot; do not infer acceptance from the commit.

## Structural primitive family internal-review candidate — 2026-10-10

Entry checkpoint:

- `cfda1565b725318e9a5e41288155425954fb3afb` — synchronized `main` after the
  ErpAvatarPicker exact-reference checkpoint.

Bounded scope:

- Reviewed Container, Divider, Grid, Inline, Section, Stack, and Surface at
  desktop/narrow Light/Dark RTL/LTR conditions.
- Corrected only generated workbench/evidence composition: visible Container
  bounds, observable Section gaps, vertical Divider extent, and readable
  inverse Surface projected content.
- Added 14-scenario browser evidence, 100 runtime assertions and regression
  coverage without changing production APIs or visual defaults.

Verification:

- Focused: 8/8 files, 46/46 tests.
- Canonical: 128/128 files, 820/820 tests; all governance/lint; both
  typechecks; zero-warning 418.32 kB / 92.90 kB build.

The commit SHA is established by Git after this document is written and is
reported in the execution handoff. Product Owner visual review remains pending.

## ErpAvatarPicker exact-reference internal-review candidate — 2026-10-10

Entry checkpoint:

- `2cc43101f2bb7ecab5ef736a0c2c3a8fad67d06b` — synchronized `main` after the
  ErpAvatar internal-review checkpoint.

Bounded scope:

- Rehashed and rendered the binding Picker source beside the dedicated
  workbench at matched desktop/narrow, theme and direction states.
- Corrected the duplicate Tabs track, default Avatar shape, 44px preview and
  footer padding while preserving lower-owner semantics and public contracts.
- Preserved the 116-image catalog, 40 compatibility mappings and all Picker
  selection, search, keyboard, disabled and controlled-state behavior.
- Added 34-assertion runtime evidence and advanced the lifecycle ledger to
  structural primitives.

Verification:

- Focused: 4/4 files, 44/44 tests.
- Canonical: 128/128 files, 819/819 tests; all governance/lint; both
  typechecks; zero-warning 418.32 kB / 92.91 kB build.

The commit SHA is established by Git after this document is written and is
reported in the execution handoff. Product Owner visual review remains pending.

## ErpAvatar exact-reference internal-review candidate — 2026-10-10

Entry checkpoint:

- `feb9938f330fa7c9d8652f7cd57e4eccc5ccfd5b` — synchronized `main` after the
  ErpStatusBadge internal-review checkpoint.

Bounded scope:

- Rehashed and rendered the binding Avatar file in Chrome beside the exact ERP
  evidence at matched desktop/narrow, theme and direction states.
- Confirmed zero fixed-size delta across 24/30/38/50/68/88px and the authorized
  narrow 58/72px xl/2xl mapping.
- Inspected shapes, content, tones, rings, presence, positions and motion;
  retained production component/API code unchanged because no defect was found.
- Added reproducible evidence and advanced the generated lifecycle ledger to
  `ErpAvatarPicker`.
- Kept the grouped exact-showcase composition assertions while removing
  duplicate Select internals from that composition-only test; no timeout or
  gate was changed.

Verification:

- Focused: 3/3 files, 37/37 tests.
- Canonical: 128/128 files, 818/818 tests; all governance/lint; both
  typechecks; zero-warning 418.32 kB / 92.88 kB build.

The commit SHA is established by Git after this document is written and is
reported in the execution handoff. Product Owner visual review remains pending.

## ErpStatusBadge exact-reference internal-review candidate — 2026-10-10

Entry checkpoint:

- `0fde2c2125a5719e195f459cab64496153fd275c` — synchronized `main` after the
  ErpUserMenu internal-review checkpoint.

Bounded scope:

- Rehashed and rendered the binding StatusBadge source over isolated HTTP.
- Recaptured the reference matrix/anatomy and matched implementation states.
- Corrected the medium count from 19px to 14px and remove action from 22px to
  12px, preserving public APIs and the component style budget.
- Added deterministic geometry/runtime evidence and governance regression
  protection; advanced the generated lifecycle ledger to `ErpAvatar`.

Verification:

- Focused: 3/3 files, 31/31 tests.
- Canonical: 128/128 files, 818/818 tests; all governance/lint; both
  typechecks; zero-warning 418.32 kB / 92.88 kB build.

The commit SHA is established by Git after this document is written and is
reported in the execution handoff. Product Owner visual review remains pending.

## ErpUserMenu internal visual-review candidate — 2026-10-10

Entry checkpoint:

- `6c429d137f83b2a430d9c9b9bb793ce065513ce8` — synchronized `main` after the
  ErpTable full-reference internal-review checkpoint.

Bounded scope:

- Captured and measured the live Skodash User dropdown reference.
- Recaptured 22 implementation states with full/cropped screenshots, semantic
  color evidence and action-list-only scroll measurements.
- Preserved production contracts and recorded the constrained 320 x 568
  Workbench limitation without a review-only geometry workaround.
- Updated the generated lifecycle source and output so all reopened owners are
  internally reviewed and `ErpStatusBadge` is the next binding-reference unit.

Verification:

- Focused: 4/4 files, 70/70 tests.
- Canonical: 128/128 files, 818/818 tests; all governance/lint; both
  typechecks; zero-warning 418.32 kB / 92.91 kB build.

The commit SHA is established by Git after this document is written and is
reported in the execution handoff. Product Owner visual review remains pending.

## ErpTable full-reference internal visual-review candidate — 2026-10-10

Entry checkpoint:

- `b6eb341a25fd54a5c0d59ff99f1974a9b9e3d941` — synchronized `main` after the
  ErpTabs internal-review checkpoint.

Bounded scope:

- Rehashed and rendered the binding Table source, then recaptured all six
  source specimens and equivalent ERP compositions.
- Corrected source-backed row/header/text geometry to a maximum 0.5px layout
  delta and retained the complete multi-owner exact experience.
- Replaced the sparse Table workbench fixture with five Arabic ERP rows, seven
  columns and working selection, sorting, activation, resize, visibility and
  footer evidence.
- Added reproducible desktop/narrow, theme/direction screenshots, measurement
  JSON, focused tests and governance protection.

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. The bounded commit message is
`fix(table): close full reference internal review`. Focused verification passes
3/3 files and 38/38 tests; canonical verification passes 128/128 files and
818/818 tests, all lint/governance, both typechecks and the zero-warning
418.32 kB / 92.91 kB build. Next reopened owner: `ErpUserMenu`.

## ErpTabs exact-reference internal visual-review candidate — 2026-10-10

Entry checkpoint:

- `c4583372eb8401b127c9766ecf8ede4331fbac4e` — synchronized `main` after the
  ErpSelect V3 internal-review checkpoint.

Bounded scope:

- Reverified and rendered the binding Tabs source, then measured equivalent
  horizontal and vertical reference/implementation specimens.
- Replaced the one-tab workbench fixture with five meaningful Arabic ERP tabs
  and added controlled model/event/disabled regression evidence.
- Added reproducible desktop/narrow Light/Dark RTL/LTR screenshots and runtime
  geometry records.
- Corrected a reproduced narrow AppShell regression where the closed translated
  Sidebar expanded document width; shell governance now protects containment.

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused tests pass 2/2 files and 30/30
tests; canonical verification passes 128/128 files and 817/817 tests, both
typechecks, all governance and the zero-warning 418.32 kB / 92.90 kB build.
The bounded commit message is `fix(tabs): close exact reference internal review`.
Next reopened unit: `ErpTable`.

## ErpSelect V3 internal visual-review candidate — 2026-10-10

Entry checkpoint:

- `a10a133adaa773d5ef8e78514200782adbdd03d8` — synchronized `main` after the
  EmptyState internal-review checkpoint.

Bounded scope:

- Reverified the binding Select SHA and compared the rendered source and
  implementation at matched desktop/narrow, theme and direction conditions.
- Corrected 13 px type inheritance, unscaled popup measurement, top/bottom-only
  placement, list-owned 300 px scrolling, and a measured 320 x 568 trigger
  overlap without changing public API.
- Added meaningful Arabic ERP data to the single primary workbench target and
  preserved the on-demand exact matrix.
- Added reproducible screenshots, runtime measurements, focused tests and
  governance protections.
- Made the existing root navigation regression deterministic under the full
  parallel suite by warming its lazy Table showcase module before the real
  Sidebar click, without changing timeouts, retries, or production behavior.

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`. Focused tests pass 3/3 files and 44/44
tests; canonical verification passes 128/128 files and 816/816 tests, both
typechecks, all governance, and the zero-warning 418.32 kB / 92.88 kB build.
The bounded commit message is
`fix(select): close exact reference internal review`; the actual SHA is
reported after Git creates it. The next reopened unit is `ErpTabs`.

## EmptyState internal visual-review candidate — 2026-10-10

Entry checkpoint:

- `6b1fe59f0ec3fcaaaf64a43cbb5aaed601ecc048` — synchronized `main` after the
  Radio family checkpoint.

Bounded scope:

- Restored the complete five-scenario EmptyState evidence on demand while
  retaining one primary live target.
- Corrected verified narrow extra-action clipping without changing the public
  API or the Product Owner-supplied Lottie assets.
- Added reproducible Light/Dark RTL/LTR desktop/narrow screenshots and runtime
  measurements under `docs/review-evidence/erp-empty-state/`.

Status: technical/internal review candidate; Product Owner visual review is
pending. Focused tests pass 4/4 files and 48/48 tests; canonical verification
passes 128/128 files and 812/812 tests, both typechecks, all governance/lint,
and the zero-warning 418.32 kB / 92.91 kB build. The actual commit SHA is
recorded after the checkpoint is created.

## Radio family internal visual-review checkpoint — 2026-10-10

Entry checkpoint:

- `8a14c00fdfcce28eefd4566c54a65a52e58ca80c` — clean synchronized `main` after
  the global component lifecycle ledger.

Bounded scope:

- Restored an on-demand, multi-state `ErpRadioBox` / `ErpRadioGroup` evidence
  surface to both dedicated live workbenches without adding a second primary
  target.
- Preserved the accepted `ErpCheckBox` family language and native radio
  ownership; no production geometry or public API was changed.
- Added reproducible Light/Dark, RTL/LTR, desktop/narrow captures and measured
  exact 18/22/28/36 px RadioBox indicators with zero page overflow, clipping,
  broken images, or browser diagnostics in the recorded cases.

Planned bounded commit:

- `fix(radio): restore complete family review evidence`

Status:

- `TECHNICAL_VERIFIED`: 4/4 focused files and 32/32 focused tests; canonical
  128/128 test files and 811/811 tests; all governance/lint; both typechecks;
  zero-warning build at 418.32 kB / 92.86 kB estimated transfer.
- `INTERNAL_VISUAL_REVIEW_COMPLETED` for the recorded Radio family states.
- `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`; no visual acceptance is inferred.
- Next documented review priority: `ErpEmptyState`.

## Autonomous UI visual-QA Shell checkpoint — 2026-10-10

Entry checkpoint:

- `6379313f8439cc7aefe025f2e6ecfcc8d9d1d481` — clean `main` and
  `origin/main`.

Scoped checkpoint message:

- `fix(shell): close integrated visual QA findings`

This checkpoint preserves the completed Shell owners and corrects only the
reproduced root-workbench navigation short-circuit and xxs Topbar pressure.
Persisted browser evidence records the rejected interim 1 px BranchSelector /
44 px overflow outcome only in the defect narrative; final captures show a
visible BranchSelector and Search, 0 px overflow, functional intent and real
destination paths, and an 81/81 route audit. Canonical verification passes
127/127 test files and 808/808 tests, all governance/lint, both typechecks and
the zero-warning production build. Resolve the resulting SHA from
live `main` because this file belongs to that commit.

## Global component lifecycle ledger — 2026-10-10

Entry checkpoint:

- `ced0ae148d4f83c43964ba1a7c517964fcf0047b` — clean published Shell QA
  checkpoint.

Scoped checkpoint message:

- `docs(controls): establish global component lifecycle ledger`

The generated ledger covers 81 public, 45 supporting and 6 planned identities,
adds a deterministic drift check to the canonical lint chain, and resolves
`ErpRadioBox` as the next Bottom-Up unit without changing any visual status.
Resolve the resulting commit SHA from live `main` because this file belongs to
that commit.

## Root-owned AppShell Workbench recovery — 2026-10-10

Entry checkpoint:

- `94c20bcd55eda2eb722ddad65d6280eaf11592c7` — published `main` and
  `origin/main`, with 21 pre-existing modified AppShell/evidence files.

Recovery evidence:

- A complete 21-file, 977472-byte backup was written outside the repository.
- Every source/backup SHA-256 matched; manifest SHA-256 is
  `6074FF1A324CD0AF57DE244539D8BEC18486E9B38850965542964403B934DAFC`.
- Stable repeated hashes and process inspection found no concurrent writer.
- All 21 pre-existing changes were relevant to this correction or its browser
  evidence; no unrelated work was discarded or committed.

Scoped task commit message:

- `fix(shell): make root AppShell the live workbench`

Resolve the resulting SHA from live `main` because this file is part of that
commit. Final verification passes 127/127 test files and 807/807 tests, all
governance/lint, both typechecks, and the zero-warning production build.
Product Owner visual review remains pending.

## Autonomous App Shell completion wave — 2026-10-09

Entry checkpoint:

- `6ceaf966c4b22efa0faf1d32e3dae841fd800c31` — clean `main` and
  `origin/main`.

Published bounded checkpoints:

- `fcf1685cf032d91835360c5e366764a6020df81e` —
  `feat(shell): add ERP applications menu`
- `74727a4a53e548e322f6b5f33a4b7754fe59e5cb` —
  `feat(shell): add ERP messages menu`
- `2881ddc6c08e8106458b55134cc2ff242fcd95f0` —
  `docs(shell): register applications menu reference`
- `2349ec29b8affa1cadc1506fe549c4668154ebd1` —
  `feat(shell): refine ERP notifications menu`
- `e7e74d9e054a93627d2ab8eb4d237e65f6a630eb` —
  `feat(shell): refine ERP global search`

The final integration commit uses
`feat(shell): integrate complete ERP app shell`; resolve its SHA from live
`main` because this file is part of that commit. The final checkpoint installs
the real root Shell, responsive topology, governance, screenshots,
measurements, and continuity state. Product Owner visual review remains
pending.

Final verification passes 126/126 test files and 804/804 tests, all lint and
governance, both typechecks, and the zero-warning production build. Initial
output is 414.89 kB / 91.62 kB estimated transfer.

## Product Owner final UserMenu trigger correction — 2026-10-09

Entry checkpoint:

- `76a0893f8c647363833ac32a58685450507055c8` — clean `main` and
  `origin/main` after Shell S2-E.

Scoped task commit message:

- `fix(shell): correct UserMenu trigger identity`

Resolve the resulting SHA from live `main` because this file is part of that
commit. Focused verification passes 3/3 files and 53/53 tests; canonical
verification passes 124/124 files and 793/793 tests, all governance, both
typechecks, production build, and zero warnings. Initial bundle remains 490.24
kB / 105.58 kB estimated transfer. Twenty browser states have zero overflow,
broken images or diagnostics. Stop for Product Owner UserMenu visual review.

## Shell S2-E AppShell integration checkpoint — 2026-10-09

Entry checkpoint:

- `907380c9fe2881126e7ecc328f6925c005c76271` — clean `main` and
  `origin/main` after S2-D QuickActionsBar.

Scoped stage commit message:

- `feat(shell): integrate ERP application shell`

Resolve the resulting commit SHA from live `main` because this file is part of
that commit. Focused verification passes 1/1 file and 2/2 tests; canonical
verification passes 124/124 files and 792/792 tests, all governance, both
typechecks, production build, and zero warnings. Initial bundle remains 490.24
kB / 105.58 kB estimated transfer. Eight browser captures record zero
page/Shell horizontal overflow, broken images or browser diagnostics. The wave
stops for consolidated Product Owner visual review.

## Shell S2-D QuickActionsBar checkpoint — 2026-10-09

Entry checkpoint:

- `92f46d92dc5a604f0ec780f9136de9c3441b5a29` — clean `main` and
  `origin/main` after S2-C AppFooter.

Scoped stage commit message:

- `feat(shell): add ERP quick actions bar`

Resolve the resulting commit SHA from live `main` because this file is part of
that commit. Focused verification passes 1/1 file and 3/3 tests; canonical
verification passes 124/124 files and 791/791 tests, all governance, both
typechecks, production build, and zero warnings. Initial bundle remains 490.24
kB / 105.58 kB estimated transfer. The exact next unit is S2-E AppShell
integration; Product Owner visual review remains pending.

## Shell S2-C AppFooter checkpoint — 2026-10-09

Entry checkpoint:

- `7f76ff59573e9b9654c623cea1483969082e0861` — clean `main` and
  `origin/main` after S2-B Topbar.

Scoped stage commit message:

- `feat(shell): add ERP application footer`

Resolve the resulting commit SHA from live `main` because this file is part of
that commit. Focused verification passes 1/1 file and 3/3 tests; canonical
verification passes 123/123 files and 788/788 tests, all governance, both
typechecks, production build, and zero warnings. Initial bundle is 490.24 kB /
105.58 kB estimated transfer. The exact next unit is S2-D QuickActionsBar.

## Shell S2-B Topbar checkpoint — 2026-10-09

Entry checkpoint:

- `aa4dd4e1a5042a1e7b2f0ead485cadfecd88a0de` — clean `main` and
  `origin/main` after the S2-A Sidebar checkpoint normalization.

Scoped stage commit message:

- `feat(shell): refine ERP topbar composition`

Resolve the resulting commit SHA from live `main` because this file is part of
that commit. Focused Topbar verification passes 1/1 file and 1/1 test;
canonical verification passes 122/122 files and 785/785 tests, all governance,
both typechecks, production build, and zero warnings. Initial bundle remains
490.24 kB / 105.58 kB estimated transfer. The exact next unit is S2-C
AppFooter; Product Owner visual review remains pending.

## Shell S2-A Sidebar checkpoint — 2026-10-09

Entry checkpoint:

- `216fd4d36819df0adfbcdb0c599574d2b67469cd` — clean `main` and
  `origin/main` before the authorized Shell continuation wave.

Scoped stage commit message:

- `feat(shell): refine ERP sidebar reference`

Resolve the resulting commit SHA from live `main` because this file is part of
that commit. Focused Sidebar verification passes 1/1 file and 6/6 tests;
canonical verification passes 122/122 files and 785/785 tests, all governance,
both typechecks, production build, and zero warnings. Initial bundle is
490.24 kB / 105.58 kB estimated transfer. The exact next permitted unit is
S2-B Topbar. Product Owner visual review remains pending.

## Shell S1 compact UserMenu trigger checkpoint — 2026-10-08

Entry checkpoint:

- `991c03daaf01b5bd3dd8ab03b222cdcc4f57b6f0` — clean live `main` and
  `origin/main` before the Product Owner compact-trigger correction.

Single task commit message:

- `fix(shell): compact UserMenu trigger identity`

Resolve the final commit SHA from live `main` because this file is part of that
commit. Focused verification passes 4/4 files and 63/63 tests; canonical
verification passes 122/122 files and 782/782 tests, all lint/governance, both
typechecks, production build, and zero warnings. Initial bundle is 490.24 kB /
105.58 kB estimated transfer. Product Owner visual review remains pending; S2
is not open.

## Global 3D avatar asset-library checkpoint — 2026-10-08

Entry checkpoint:

- `30d6bd942015743fb3f02c7faeb563961fa978ac` — clean live `main` and
  `origin/main` before the Product Owner asset replacement.

Single task commit message:

- `feat(avatar): replace system library with 3D collection`

Resolve the final commit SHA from live `main` because this file is part of that
commit. The canonical manifest records 116 total, 60 male, 56 female, 40
preserved legacy IDs/URLs, and aggregate SHA-256
`39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.
Canonical verification passes 122/122 test files and 779/779 tests, all
lint/governance, both typechecks, production build, and zero warnings. Initial
bundle is 490.24 kB / 105.56 kB estimated transfer. Product Owner visual review
remains pending after technical verification.

## Shell S1 UserMenu dark-contrast and scroll-ownership checkpoint — 2026-10-08

Entry checkpoint:

- `415298b7921719747efcc17dc82f9e889ccac64c` — clean live `main` and
  `origin/main` before this bounded correction.

Single task commit message:

- `fix(shell): correct UserMenu dark contrast and scroll ownership`

Resolve the final commit SHA from live `main` because this file is part of that
commit. Focused verification passes 4/4 files and 58/58 tests plus Shell
governance. Canonical verification passes 122/122 files and 776/776 tests, all
lint/governance, both typechecks, production build, and zero warnings. Initial
bundle is 490.24 kB / 105.57 kB estimated transfer. Product Owner visual review
remains pending; S2 is not open.

## Shell S1 UserMenu final popup-geometry checkpoint — 2026-10-08

Entry checkpoint:

- `ccddf29d22b4608016d27818b17a2584a0f06632` — clean live `main` and
  `origin/main` before this bounded gate.

Single task commit message:

- `fix(shell): close UserMenu popup geometry gate`

Resolve the final commit SHA from live `main` because this file is part of that
commit. Focused verification passes 4/4 files and 57/57 tests plus Shell
governance. Canonical verification passes 122/122 files and 775/775 tests, all
lint/governance, both typechecks, production build, and zero warnings. Initial
bundle is 490.24 kB / 105.58 kB estimated transfer. Product Owner visual review
remains pending; S2 is not open.

## Shell Phase S1 ErpUserMenu identity-refinement checkpoint — 2026-10-08

Entry checkpoint:

- `b210bb1311841dea836379e996f53aaa5a7ddf74` — clean live `main` and
  `origin/main` before the bounded UserMenu identity/refinement task.

Single task commit message:

- `feat(shell): refine UserMenu identity and responsiveness`

Resolve the final commit SHA from live `main` because this file is part of that
commit. The bounded candidate extends only the existing UserMenu contract and
presentation, its one-target workbench, direct tests/governance, runtime
evidence, and continuity records. Product Owner visual acceptance remains
pending and S2 is not opened.

Verification passes 2/2 focused files and 27/27 focused tests, 122/122
canonical test files and 768/768 tests, all lint/governance, both typechecks,
production build, and zero warnings. Initial production bundle is 490.24 kB /
105.57 kB estimated transfer.

## Shell Phase S1 ErpUserMenu final evidence checkpoint — 2026-10-08

Entry checkpoint:

- `b28012f18dfd74ac9c37827e00010d70f701719f` — clean live `main` and
  `origin/main` before the bounded final visual-evidence closure.

Single task commit message:

- `fix(shell): align UserMenu arrow and close visual evidence`

Resolve the commit SHA from live `main` because this file is part of that
commit. The final candidate passes 3/3 focused files and 35/35 tests, 122/122
canonical files and 758/758 tests, all lint/governance, both typechecks,
production build, and zero warnings. Its production initial bundle is 490.24
kB / 105.56 kB estimated transfer. The popup arrow follows post-clamp measured
geometry, Dark RTL/LTR desktop and narrow captures are stored, and the approved
local Avatar asset is used. Product Owner visual review remains pending; S2 is
not opened.

## Current bounded live workbench correction checkpoint — 2026-10-08

Entry checkpoint:

- `f0450d76a6ef523158036ba9b5bb66a9127519dd` — clean live `main` and
  `origin/main` before the bounded workbench correction.

The bounded implementation commit is `fix(showcase): harden live workbench
evidence`; resolve its final SHA from live `main` because this file is part of
that commit.

The checkpoint preserves 77 one-target workbenches while restoring the six
exact Core reference experiences on demand, including the complete multi-owner
Table evidence. It adds structured value-kind validation with invalid-draft and
last-valid-value retention, plus measured FAB preview containment in RTL/LTR at
390 px. Focused verification passes 6/6 files and 28/28 tests. Canonical
verification passes every lint/governance gate, 122/122 test files and 748/748
tests, both typechecks, production build, and zero warnings. The initial bundle
remains 488.18 kB / 105.32 kB estimated transfer.

Product Owner visual approval is not inferred. The next gate is external review
of this bounded correction; no production FAB merge or later wave is opened.

## Historical dedicated showcase reconstruction checkpoint — superseded 2026-10-08

The preceding reconstruction entered at
`54451b1fdca8da0f03096d16df20adc6100a5c11` and committed as
`feat(showcase): reconstruct dedicated component review system`. Its dedicated
routes and legacy migration remain historical foundations for the current
workbenches.

## Historical ownership catalog and Page foundation checkpoint — superseded 2026-10-08

Entry checkpoint:

- `895f985994ef2c28eae703f60d5911a5314af338` — clean live `main` and
  `origin/main` before the bounded ownership/catalog/Page work.

The implementation commit is `feat(governance): add ERP ownership catalog and
page foundation`; resolve its final SHA from live `main` because this file is
part of that commit.

The checkpoint contains the generated 77-public/41-supporting ERP catalog, 42
native-element contracts, dedicated `/components/<id>` live routes with 336
cases, and the new public `ErpPage`. Canonical verification passes all
lint/governance, 136/136 test files and 909/909 tests, both typechecks,
production build, and zero warnings. Initial bundle is 497.84 kB / 108.38 kB;
component-showcase is lazy at 168.97 kB / 17.40 kB estimated transfer.

Product Owner visual approval is not inferred. The next gate is review of this
bounded foundation wave; the full ERP-TABLE visual gate remains separately
pending and no later wave is opened.

## Historical full ERP-TABLE experience checkpoint — superseded current gate

Entry checkpoint:

- `eddac4a8e8a3460f346bb579fdd5ca0074296e7a` — technically green but rejected
  by the Product Owner for omitted visible reference owners and known geometry
  mismatches.

Bounded commit: `fix(table): reconstruct full Product Owner reference
experience`; resolve its final SHA from live `main` because this file is part of
that commit.

The binding reference remains `ERP-TABLE.html`, SHA-256
`292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`. The V2
contract composes Toolbar, SearchBox, ColumnChooser, Table, footer information,
and Pagination while retaining their bounded owners. Canonical verification
passes all governance/lint, 134/134 test files and 904/904 tests, both
typechecks, production build, and zero warnings. Initial bundle is 376.16 kB /
85.65 kB; Core Batch is 160.50 kB / 25.32 kB estimated transfer.

Product Owner visual approval remains pending. The next action is full
ERP-TABLE review at `/controls/core-batch`; no later Data/Table wave is opened.

These are technical/history checkpoints. They are **not** Product Owner visual
approvals unless explicitly stated.

## Live main rule

Always resolve live `origin/main` directly at session start. This file records
named checkpoints; it does not claim that its own latest docs SHA is an eternal
repository HEAD.

## Historical ErpTabs exact-reference checkpoint — superseded current gate

Entry checkpoint:

- `302056ad312dec403a1cdf2f9ded92d57d011ba5` — technically green but rejected
  by the Product Owner for complete visual mismatch with `ERP-TABS.html`.

The bounded implementation commit is `fix(tabs): reconstruct exact Product
Owner reference`; resolve its final SHA from live `main` because this file is
committed with it.

Binding reference: `ERP-TABS.html`, SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`.
The authoritative contract is
`src/app/controls/tabs/ERP_TABS_REFERENCE_EXACT_V1.md`. The former Nexlink
reference and accelerated no-reference waiver are superseded. This checkpoint
rebuilds Tabs geometry, variants, orientations, distribution, panels, motion,
responsive behavior, ARIA, and keyboard behavior while retaining bounded
Stepper and AvatarPicker compatibility. Product Owner visual acceptance remains
pending and the Data/Table Visual Correction Wave remains unopened. The
canonical gate passes 133/133 test files, 895/895 tests, both typechecks,
production build, every governance check, and zero warnings. Initial bundle:
376.16 kB / 85.67 kB estimated transfer. Core Batch lazy chunk: 119.32 kB /
21.22 kB estimated transfer.

## Historical Avatar/AvatarPicker large-size compatibility checkpoint — superseded current gate

Entry checkpoint:

- `478cd171c974ea2ba5f360b3e345597b2ea49d0a`

The bounded implementation commit was `fix(avatar-picker): add responsive large
avatar sizes`. Its technical gate passed 133/133 test files and 889/889 tests.
This remains useful history, but the later Tabs exact-reference checkpoint is
current.

## Historical ErpAvatarPicker exact-reference checkpoint — superseded current gate

Entry checkpoint: `4a3e65ab5f8bc5d38b3ea25dd8b77045c6a6b53c`.
The exact-reference rebuild commit is `478cd171c974ea2ba5f360b3e345597b2ea49d0a`
— `fix(avatar-picker): rebuild from exact Product Owner reference`. Its
technical gate passed 133/133 test files and 887/887 tests. This remains useful
history, but the later large-size compatibility checkpoint is current.

## Historical ErpAvatar exact-reference checkpoint — superseded current gate

Entry checkpoint:

- `3558434c274a11b7b52296f78b8968806817e1e8`

The bounded implementation commit is `fix(avatar): rebuild from exact Product
Owner reference`; resolve its final SHA from live `main` because this file is
committed with it. Its canonical gate passes 133/133 test files, 881/881 tests,
both typechecks, production build, every governance check, and zero warnings.
Initial bundle: 376.12 kB / 85.63 kB estimated transfer. Core Batch lazy chunk:
70.10 kB / 12.81 kB.

Binding reference: `ERP-AVATAR.html`, SHA-256
`2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`.
Product Owner visual acceptance remains pending and the Data/Table Visual
Correction Wave remains unopened. The authoritative implementation contract is
`src/app/controls/avatar/ERP_AVATAR_REFERENCE_EXACT_V1.md`.

## Historical ErpStatusBadge exact-reference checkpoint — superseded current gate

Entry checkpoint:

- `cc9a3d0305529aef94e370c862b01876dcba9d01`

The bounded implementation commit is `fix(status-badge): rebuild from exact Product
Owner reference`; resolve its final SHA from live `main` because this file is
committed with it. Its canonical gate passes 133/133 test files, 875/875 tests,
both typechecks, production build, every governance check, and zero warnings.
Initial bundle: 376.12 kB / 85.65 kB estimated transfer. Core Batch lazy chunk:
64.25 kB / 12.07 kB.

Binding reference: `ERP-STATUS-BADGE.html`, SHA-256
`654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`.
Product Owner visual acceptance remains pending and the Data/Table Visual
Correction Wave remains unopened.

The authoritative implementation contract is
`src/app/controls/status-badge/ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md`. The
former Dribbble reference and accelerated no-reference waiver are historical
evidence and are superseded by this exact-reference rebuild.

## Historical ErpSelect strict-rebuild checkpoint — superseded current gate

The Select strict-rebuild entered from
`2c68970831c95136dfab4faf36cc32078beb2f91`. Its binding reference remains
`ERP-SELECT.html`, SHA-256
`EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`, and its
technical checkpoint remains preserved. It is not the current active component.

## Historical Core Visual Correction V3 checkpoint — superseded Select state

V3 correction entry checkpoint:

- `13586508b3bbdb6d86225633e0837f20cd965a7c`
  `fix(controls): close core external review gaps`

The bounded V3 correction commit is `fix(controls): complete core visual
correction v3`; resolve its final SHA from live `main` because this file is
committed with it. Its canonical gate passes 133/133 test files, 862/862 tests,
both typechecks, production build, and zero warnings. Initial bundle: 375.75 kB
/ 85.43 kB estimated transfer. Core Batch lazy chunk: 54.76 kB / 10.57 kB.

Browser runtime evidence verifies the V3 behavior matrix. Product Owner grouped
visual acceptance remains pending, and the Data/Table Visual Correction Wave
remains unopened.

### Historical V2 external-review checkpoint

External-review gap-correction entry checkpoint:

- `ae5b6e2664c1d664f61ee9c745a54b8e0008989a`

The bounded correction commit is `fix(controls): close core external review
gaps`; resolve its final SHA from live `main` because this file is committed
with it. It separates Table activation/selection, corrects Pagination labeling,
hardens Avatar physical positioning/motion layering, and makes Select compose
approved lower owners. Its gate passes 133/133 test files, 853/853 tests, both
typechecks, production build, and zero warnings. Initial bundle: 375.68 kB /
85.45 kB estimated transfer. Core Batch lazy chunk: 41.10 kB / 8.70 kB.

Browser runtime evidence verifies these four requested gaps. Product Owner
grouped visual acceptance remains pending, and the Data/Table Visual Correction
Wave remains unopened.

### Original V2 implementation checkpoint

Entry checkpoint:

- `555dde11e2a922393b9e5d0fb128c6465934d42f`
  `feat(shell): add accelerated navigation and erp shell batch`

The bounded implementation commit is `fix(controls): apply core visual
correction wave v2`; resolve its final SHA from live `main` because this file
is committed with the implementation. It corrects the eight Product Owner-
reopened Core owners, adds the authorized AvatarPicker, and passes 133/133 test
files, 845/845 tests, both typechecks, production build, and zero warnings.
Initial bundle: 375.68 kB / 85.48 kB estimated transfer. Core Batch lazy chunk:
39.37 kB / 8.34 kB estimated transfer.

Product Owner grouped visual/runtime acceptance remains pending at
`/controls/core-batch`. The Data/Table Visual Correction Wave and every later
unlisted wave remain unopened.

## Historical accelerated checkpoints — superseded current-state snapshot

Entry source checkpoint:

- `36fdd62f0b65ea9b137639f2b002640603f46525`
  `feat(controls): add accelerated data table batch`

That checkpoint contains the technically green Accelerated Core Batch, Phase A
hardening, and Phase B Data/Table batch. Phase B canonical verification passed
110/110 test files, 778/778 tests, both typechecks, production build, and zero
warnings; initial bundle 374.44 kB / 85.38 kB estimated transfer.

Independent continuity normalization checkpoint:

- `f12d28cb37972c18e2a4e897530be9f509c0540d`
  `docs(handoff): normalize accelerated current state`

The following implementation commit adds the six-owner Accelerated Forms
Composition Batch. Resolve its final SHA from live `main`; it is committed as
`feat(forms): add accelerated forms composition batch`. Its canonical gate
passed 117/117 test files, 792/792 tests, both typechecks, production build, and
zero warnings.

Product Owner runtime/visual acceptance remains pending for Core, Data/Table,
and Forms. The exact next action is grouped runtime/Light/Dark review, not a new
source wave. Higher/unlisted families and Shell remain unopened.

## Continuity protocol checkpoint

- `66abb185c3e837d9c659ed56106cf668d46103c5`
  `docs(handoff): establish persistent continuity protocol`

## Historical CheckBox runtime/source — superseded snapshot

- `4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`
  `fix(check-box): move readonly click guard to native input`

This fixes the two Angular template-lint accessibility findings from the first
local V5 canonical run.

Fresh `npm run verify:clean` after this checkpoint is pending.

## Exact-reference CheckBox V5

- `4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`
  `fix(check-box): implement exact Product Owner reference V5`

At this checkpoint the Product Owner local `verify:clean` passed every
project governance gate through ErpConfirm, then Angular template lint stopped
on two outer-label click accessibility errors.

Visual/reference implementation itself was not changed by the subsequent
lint follow-up.

## Previous CheckBox reference evolution

Earlier CheckBox V1–V4 checkpoints are historical/superseded for visual
authority.

Current visual authority is:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

## Button Composites

ButtonGroup / SplitButton / FabMenu correction previously reached full
technical green before the CheckBox reference wave.

Those components are not the currently active implementation unit.

## Next checkpoint rule

Whenever a substantive code/docs/verification cycle completes:

1. add the new current/source/verification checkpoint here;
2. update `CURRENT_EXECUTION_STATE.md`;
3. synchronize the four continuity authority files;
4. clearly distinguish:
   - runtime/source checkpoint;
   - docs-only checkpoint;
   - verified technical checkpoint;
   - Product Owner visual approval checkpoint.

Do not call a docs-only HEAD a freshly verified source checkpoint unless the
underlying source was actually verified.

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

Product Owner authorization now includes immediate source implementation.

Implemented contract:

- `ErpRadioBoxMode = 'radio' | 'tile'`;
- `ErpRadioBoxVariant = 'outline' | 'filled' | 'soft'`;
- sm/md/lg/xl = 18/22/28/36px;
- description / readOnly / hideText;
- native radio remains the semantic/CVA owner;
- centered dot only; no SVG, switch, or indeterminate state;
- Tile single-select is implemented through RadioBox + RadioGroup;
- RadioGroup visual pass-through is bounded and preserves its existing
  string-value CVA and Arrow-key selection model.

Source/tests/showcase/governance are updated together.

Current status: **implemented / fresh canonical verification pending / Product
Owner RadioBox Light-Dark runtime and visual review pending**.

Mandatory next gate: `npm run verify:clean`.

EmptyState and Select remain closed.
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
