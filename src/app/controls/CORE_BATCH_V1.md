# Accelerated Core Component Batch V1

This batch implements eight components under the Product Owner-authorized grouped visual-review exception. Technical green does not equal visual acceptance; any component may be reopened by grouped findings.

| Component | Reference found | Authority |
| --- | --- | --- |
| ErpSelect | Yes: `ERP-SELECT.html` (`EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`) | Single binding exact structure/geometry/behavior authority; colors alone map to Honesty ERP tokens |
| ErpStatusBadge | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpAlert | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpSkeleton | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpAvatar | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpTabs | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpTable | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpPagination | No | Product Owner accelerated-wave no-external-reference waiver |

The waiver uses the existing Button, Field, EmptyState, Overlay, and Foundation visual language. It does not authorize Forms, SmartTable, Shell, or any ninth component.

## Hardened contracts

- `ErpStatusBadge` is a compact, noninteractive visual status label. It does not automatically author `role="status"` or an `aria-live` region; consumers own announcements when state changes require them.
- `ErpTabs` supports either convenience string content on an item or keyed rich panel templates through `erpTabPanel`; the latter is the contract for tables, forms, surfaces, and custom controls. Tabs does not own routing.
- `ErpTable` supports keyed rich cell templates through `erpTableCell`. Template context includes `row`, `value`, `column`, and `rowIndex`; the default renderer remains textual.
- `ErpTable.selectedKeys` is controlled presentation state. `rowActivated` is an interaction intent only; the parent owns selection state and decides whether to update `selectedKeys`.
