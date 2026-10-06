# Accelerated Core Component Batch V1

This batch implements eight components under the Product Owner-authorized grouped visual-review exception. Technical green does not equal visual acceptance; any component may be reopened by grouped findings.

| Component | Reference found | Authority |
| --- | --- | --- |
| ErpSelect | Yes: `ERP-SELECT.html` (`EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`) | Single binding exact structure/geometry/behavior authority; colors alone map to Honesty ERP tokens |
| ErpStatusBadge | Yes: `ERP-STATUS-BADGE.html` (`654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`) | Single binding exact geometry/variants/sizes/anatomy/states/width/interaction/motion authority; colors and font family alone map to Honesty ERP system contracts |
| ErpAlert | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpSkeleton | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpAvatar | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpTabs | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpTable | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpPagination | No | Product Owner accelerated-wave no-external-reference waiver |

The remaining no-reference waivers use the existing Button, Field, EmptyState,
Overlay, and Foundation visual language. They do not override the exact
StatusBadge authority and do not authorize Forms, SmartTable, Shell, or any
ninth component.

## Hardened contracts

- `ErpStatusBadge` implements eight reference tones, four reference variants,
  four reference sizes, reference anatomy/state/width/motion options, and an
  opt-in interactive/selected/removable contract. Its default remains
  noninteractive, and it does not automatically author `role="status"` or an
  `aria-live` region; consumers own announcements when required.
- `ErpTabs` supports either convenience string content on an item or keyed rich panel templates through `erpTabPanel`; the latter is the contract for tables, forms, surfaces, and custom controls. Tabs does not own routing.
- `ErpTable` supports keyed rich cell templates through `erpTableCell`. Template context includes `row`, `value`, `column`, and `rowIndex`; the default renderer remains textual.
- `ErpTable.selectedKeys` is controlled presentation state. `rowActivated` is an interaction intent only; the parent owns selection state and decides whether to update `selectedKeys`.
