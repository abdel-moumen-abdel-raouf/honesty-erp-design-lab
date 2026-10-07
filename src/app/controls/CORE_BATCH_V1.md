# Accelerated Core Component Batch V1

This batch originally implemented eight components under the Product
Owner-authorized grouped visual-review exception and later added the explicitly
authorized AvatarPicker. Exact-reference decisions below supersede original
waivers. Technical green does not equal visual acceptance; any component may be
reopened by Product Owner findings.

| Component | Reference found | Authority |
| --- | --- | --- |
| ErpSelect | Yes: `ERP-SELECT.html` (`EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`) | Single binding exact structure/geometry/behavior authority; colors alone map to Honesty ERP tokens |
| ErpStatusBadge | Yes: `ERP-STATUS-BADGE.html` (`654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`) | Single binding exact geometry/variants/sizes/anatomy/states/width/interaction/motion authority; colors and font family alone map to Honesty ERP system contracts |
| ErpAlert | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpSkeleton | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpAvatar | Yes: `ERP-AVATAR.html` (`2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`) | Single binding exact geometry/behavior authority; colors and font family alone map to Honesty ERP system contracts |
| ErpAvatarPicker | Yes: `ERP-AVATAR-PICKER.html` (`24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66`) | Single binding exact picker authority; every avatar composes ErpAvatar and tabs compose ErpTabs |
| ErpTabs | Yes: `ERP-TABS.html` (`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`) | Single binding exact geometry/variants/anatomy/orientation/distribution/panel/motion/behavior authority; colors and font family alone map to Honesty ERP system contracts |
| ErpTable | No | Product Owner accelerated-wave no-external-reference waiver |
| ErpPagination | No | Product Owner accelerated-wave no-external-reference waiver |

The remaining no-reference waivers apply only to Alert, Skeleton, Table, and
Pagination. They use the existing Button, Field, EmptyState, Overlay, and
Foundation visual language and do not override any exact-reference authority.

## Hardened contracts

- `ErpStatusBadge` implements eight reference tones, four reference variants,
  four reference sizes, reference anatomy/state/width/motion options, and an
  opt-in interactive/selected/removable contract. Its default remains
  noninteractive, and it does not automatically author `role="status"` or an
  `aria-live` region; consumers own announcements when required.
- `ErpTabs` implements the binding HTML reference variants, header anatomy,
  horizontal/vertical orientations, content/fill distribution, panel
  relationship, motion, responsive overflow, keyboard, and ARIA. It supports
  either convenience string content or keyed rich panel templates through
  `erpTabPanel`; Tabs does not own routing. `count` and `renderPanels=false`
  remain bounded AvatarPicker compatibility extensions.
- `ErpTable` supports keyed rich cell templates through `erpTableCell`. Template context includes `row`, `value`, `column`, and `rowIndex`; the default renderer remains textual.
- `ErpTable.selectedKeys` is controlled presentation state. `rowActivated` is an interaction intent only; the parent owns selection state and decides whether to update `selectedKeys`.
