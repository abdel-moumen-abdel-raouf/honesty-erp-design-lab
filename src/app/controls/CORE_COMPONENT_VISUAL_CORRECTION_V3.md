# Core Components Visual Correction V3

> Historical Core correction record. Its ErpSelect reference and Select-specific
> contracts are superseded by `select/ERP_SELECT_REFERENCE_EXACT_V2.md` and the
> Product Owner's binding `ERP-SELECT.html` decision.

## Authority and boundary

This bounded correction entered from
`13586508b3bbdb6d86225633e0837f20cd965a7c`. It corrects only Product Owner
findings for `ErpSelect`, `ErpStatusBadge`, `ErpAlert`, `ErpSkeleton`,
`ErpAvatar`, `ErpAvatarPicker`, `ErpTabs`, `ErpTable`, and `ErpPagination`.
`ErpSortHeader` and `ErpColumnChooser` receive only compatibility needed by the
lower Table evidence. The Data/Table Visual Correction Wave is not opened.

Technical completion is not Product Owner visual approval or freeze. The next
gate remains grouped runtime/Light/Dark/RTL/narrow Product Owner review at
`/controls/core-batch`.

## Reference matrix

| Owner | Reference authority | Treatment |
| --- | --- | --- |
| ErpSelect | Historical `erp-select.html`, SHA-256 `5A31FC10A3D1208BF64E35EB5139823E48F8E2BF1D0190D07DD5DB5DBC4DF23B` | SUPERSEDED by `ERP-SELECT.html`, SHA-256 `EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D` |
| ErpStatusBadge | Historical Product Owner Dribbble status-badge reference | **SUPERSEDED** by `ERP-STATUS-BADGE.html`, SHA-256 `654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`, and the exact V1 contract |
| ErpAlert | Product Owner runtime finding | Bounded native-tooltip removal; Tooltip-wrapped ERP action remains authoritative |
| ErpSkeleton | Product Owner animated skeleton reference | Visible tokenized surface and moving shimmer; static-but-visible reduced motion |
| ErpAvatar | Historical Product Owner V2 references and V3 runtime findings | **SUPERSEDED** by `ERP-AVATAR.html`, SHA-256 `2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`, and the exact V1 contract |
| ErpAvatarPicker | Product Owner V2 picker references and supplied assets | Tabs and Avatar composition retained; size/shape forwarding and unclipped grid corrected |
| ErpTabs | Historical Nexlink tabs reference | **SUPERSEDED** by `ERP-TABS.html`, SHA-256 `CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`, and the exact V1 contract |
| ErpTable | Product Owner explicit V3 behavior contract | Alignment, header hierarchy, state precedence, motion, resize, and chooser evidence only |
| ErpPagination | Product Owner explicit V3 behavior contract | Seven default regions retained; page-size Select remains one horizontal accessible composition |

## Corrected contracts

- Historical Select-specific text in this section is superseded. The current
  exact contract is `select/ERP_SELECT_REFERENCE_EXACT_V2.md`; sorting is a
  data-order pipeline and has no visual toolbar or secondary sort menu.
- Historical StatusBadge correction is superseded by
  `status-badge/ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md`; the current component
  follows the binding HTML reference for its complete geometry, variants,
  sizes, anatomy, states, width behavior, interaction, and motion.
- Alert suppresses native host `title`; its only explanatory close surface is
  the approved Tooltip-wrapped IconButton.
- Skeleton consumes valid semantic-backed Component Tokens for a visible base,
  border, and shimmer band in Light and Dark. Reduced motion removes animation
  without hiding the skeleton.
- Historical Avatar correction here is superseded by
  `avatar/ERP_AVATAR_REFERENCE_EXACT_V1.md`; the current base Avatar follows the
  binding HTML reference for geometry, content hierarchy, presence, interaction,
  and motion while preserving only explicitly documented compatibility opt-ins.
- AvatarPicker forwards size/shape to every rendered Avatar, uses semantic
  male/female tab icons, and keeps the avatar grid visible without an internal
  automatic scrollbar.
- Historical Tabs correction here is superseded by
  `tabs/ERP_TABS_REFERENCE_EXACT_V1.md`; the current component follows the
  binding HTML reference for variants, header anatomy, orientations,
  distribution, panels, motion, responsive behavior, keyboard, and ARIA while
  retaining only documented compatibility extensions.
- Table wraps all cell content in one alignment owner, strengthens the header
  separator, applies state priority `selected > hover > stripe`, and uses
  background-only hover motion. Review evidence enables all column resize
  handles and composes `ErpColumnChooser`.
- Pagination retains all seven visibility defaults and a single visible
  horizontal page-size label. Its Select width is 12 rem so `100 سجل` remains
  one line while its accessible field label remains available.

## Runtime evidence

- Select trigger/popup width pairs were 150/150, 240/240, 400/400, and
  1201/1201 px. Search label and placeholder were independent; Light/Dark sort
  surfaces were opaque and token-resolved.
- StatusBadge size, shape, max-content, stretch, and Light/Dark feedback roles
  were measured from the rendered page.
- Alert rendered no native `title`; Skeleton produced visible Light/Dark fills,
  borders, and shimmer while static specimens remained visible.
- Avatar shape clipping stayed bounded and breathe resolved to 3 s.
  AvatarPicker remained free of internal horizontal overflow at desktop and a
  480 px viewport.
- Historical Tabs measurements in this V3 section are superseded by the exact
  reference contract and its current `/controls/core-batch` runtime evidence.
- Selectable-only Table row clicks did not emit row activation. Selected rows
  overrode hover/stripe. Every configured column resize handle changed width,
  and ColumnChooser hide/show changed the rendered header set.
- Pagination rendered one visible label, a 192/192 px Select/popup pair, and a
  one-line `100 سجل` option.

These measurements are implementation evidence only, not Product Owner visual
acceptance.

## Technical checkpoint

- Core and Data/Table governance self-tests/checks: PASS.
- Canonical lint/governance: PASS; 82 Component Token modules and 28 routed
  templates.
- Tests: 133/133 files, 862/862 tests PASS.
- App/spec typechecks: PASS.
- Production zero-warning build: PASS.
- Initial bundle: 375.75 kB / 85.43 kB estimated transfer.
- Core Batch lazy chunk: 54.76 kB / 10.57 kB estimated transfer.
- Warning count: 0.

## Review state

Core remains visually open. The next authorized action is Product Owner grouped
runtime/Light/Dark/RTL/narrow review of `/controls/core-batch`. No Data/Table
Visual Correction Wave or later unlisted scope is authorized by this checkpoint.
