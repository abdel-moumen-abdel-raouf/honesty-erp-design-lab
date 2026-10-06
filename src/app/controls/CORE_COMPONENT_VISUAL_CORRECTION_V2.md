# Core Components Visual Correction V2

## Current authority

Product Owner visual review reopened `ErpSelect`, `ErpStatusBadge`, `ErpAlert`, `ErpSkeleton`, `ErpAvatar`, `ErpTabs`, `ErpTable`, and `ErpPagination`, and explicitly authorized the new `ErpAvatarPicker`. Earlier technical green never represented visual approval.

## Reference matrix

| Owner | Reference | SHA-256 | Treatment |
| --- | --- | --- | --- |
| ErpSelect | `erp-select.html` local Product Owner template | `5A31FC10A3D1208BF64E35EB5139823E48F8E2BF1D0190D07DD5DB5DBC4DF23B` | Exact hierarchy/geometry adapted to ERP owners and tokens |
| ErpStatusBadge | Product Owner Dribbble reference | `6DF01EFBC155613B9920B549357F6C63848EFED2BC78EFD0055D745B8DF89E09` | Compact status language with ERP semantic feedback roles |
| ErpAlert | Product Owner findings plus existing ERP family | N/A | Bounded correction; no new external file |
| ErpSkeleton | Product Owner runtime finding plus existing ERP family | N/A | Bounded visibility correction; no new external file |
| ErpAvatar | Two Product Owner avatar references | `21DAC54CC0A54460E554063C3597892AF93DFB1C5E47B54CB746577E7C573DBE`, `D5379A4E2277E82F0CDFD47A4A9C2B5B13470424A66C76D2025DFF4A43141F3B` | Shapes, presence, placement, bounded motion |
| ErpTabs | Nexlink tabs reference | `F86BD4FA2D603904EAB02464F39079AFD85B2F5EAD685DEAA9DA296DAF4861A7` | Underline/pills/fill/vertical/motion adapted to ERP architecture |
| ErpAvatarPicker | Two Product Owner picker references plus 40 supplied PNGs | `23773F31B513D79EDDCC21221E9FCAE7CF6824517E3554712005B7EEC06578D6`, `183DEA993FBABBB43DBC3E709ED961EDAA27A76F865E7BB95AEE3B6CF9D0C26C` | New authorized composite using ErpTabs + ErpAvatar |
| ErpTable | Product Owner explicit behavior contract | N/A | Existing-system reference waiver for this correction |
| ErpPagination | Product Owner explicit correction | N/A | Existing visual retained; page-size layout and visibility only |

## Dependency law

`ErpAvatarPicker → ErpTabs + ErpAvatar`; `ErpTable selection → ErpCheckBox`; `ErpTable sorting → ErpSortHeader`; `ErpPagination page-size → ErpSelect`; `ErpAlert close help → ErpIconButton + ErpTooltip`. No second engine is authorized.

## Scope boundary

Only bounded compatibility changes may flow into `ErpSmartTable` and existing consumers. This wave does not authorize a Data/Table visual correction wave, new Shell/Page/Entity features, or visual acceptance. `/controls/core-batch` is the grouped Product Owner review surface.

## Defect reconciliation

- Select's fixed `320px` popup minimum was the source-level cause of a popup
  wider than a narrow trigger. Width now follows the measured trigger and clamps
  only to available viewport width, with resize/layout synchronization.
- Alert's original grid aligned all regions to the block start. The corrected
  three-region grid centers the icon and action regions, strengthens the title
  hierarchy, and retains only the `ErpTooltip`-wrapped `ErpIconButton`; source
  and tests contain no native `title` attribute.
- Skeleton's original raised-surface token at reduced opacity could collapse
  into the surrounding raised surface with insufficient visual contrast. The
  corrected contract uses the semantic subtle surface at full base opacity plus
  the semantic subtle border; reduced motion keeps the shape visible and merely
  removes animation.

## Technical checkpoint

- Governance/lint: PASS, including 82 Component Token modules and 28 ERP-only
  routed templates.
- Tests: 133/133 files and 853/853 tests PASS after the bounded external-review
  correction.
- TypeScript app/spec typechecks: PASS.
- Production build: PASS with zero warnings; initial bundle 375.68 kB /
  85.45 kB estimated transfer; Core Batch lazy chunk 41.10 kB / 8.70 kB.
- Browser runtime evidence verifies the requested Table separation, one-label
  Pagination composition, eight physical Avatar positions in LTR and RTL with
  independent pulse motion, Select popup/trigger width equality,
  SearchBox-based filtering, and action-menu sorting. This does not constitute
  Product Owner visual acceptance; grouped Light/Dark/RTL/narrow review remains
  the next gate.

## External-review gap correction

- Table row body activation emits only when `rowActivatable=true`; `selectable`
  owns checkbox selection only. Tests cover the complete two-boolean matrix.
- Pagination renders exactly one visible `عدد السجلات` label in the horizontal
  row. Its Select retains a genuine accessible name through Field Family
  `labelMode='visually-hidden'`.
- Avatar presence positions use physical edges for all eight public physical
  names in both LTR and RTL. A nested indicator owns pulse/ping/breathe motion,
  preserving the outer position transform; reduced motion disables animation.
- Select popup search composes `ErpSearchBox mode='inline'`; sort choices
  compose the existing internal action-menu content. The Select template no
  longer owns a raw search input or private sort-menu buttons.
