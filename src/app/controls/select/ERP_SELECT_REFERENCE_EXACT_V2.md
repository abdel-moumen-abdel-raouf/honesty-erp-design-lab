# ErpSelect Exact Reference Contract V2 — Historical / Superseded

> Superseded on 2026-10-06 by `ERP_SELECT_REFERENCE_EXACT_V3.md` after the
> Product Owner rejected the first exact-reference candidate. This file remains
> historical evidence and is not current implementation authority.

## Binding authority

- Source path: `C:\Users\Misrtech\Downloads\ERP-SELECT.html`.
- Filename: `ERP-SELECT.html`.
- SHA-256: `EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`.
- Product Owner decision date: 2026-10-06.
- Instruction: reproduce the supplied visual and behavioral contract exactly;
  only its raw colors are translated into Honesty ERP tokens.

`ERP-SELECT.html` supersedes all previous ErpSelect visual references, including
the earlier `erp-select.html`, current implementation styling, and conflicting
V1/V2/V3 correction interpretations.

## Reference inventory

- Closed control: outline, filled, and ghost surfaces; placeholder; selected
  icon/image/label; multiple chips; clear action; chevron; invalid and disabled
  states.
- Sizes: `sm` 30 px, `md` 38 px, and `lg` 46 px. The legacy `normal` and `xlg`
  inputs remain compatibility aliases for `md` and `lg`.
- Popup: exact visible-control width, 8 px anchor gap, 12 px radius, subtle
  border, overlay elevation, 300 px maximum list height, and no legacy minimum
  width.
- Search: first popup row, 8 px inset, 34 px logical start inset for the search
  icon, 32 px logical end inset for clear, 6 px radius, and an Arabic accessible
  label/placeholder that remain independently configurable.
- Options: 8 px by 12 px inset, 6 px radius, 12 px content gap, optional 26 px
  image, optional 18 px semantic icon, description, metadata, hover, active,
  selected, disabled, single tick, and multiple 17 px check indicator.
- Groups: sticky headers and separators. The reference has no group-filter tabs.
- Sorting: source/label/custom data ordering. The reference has no visual sort
  toolbar or secondary sort menu.
- Multiple selection: chips, `+N` overflow, select-all/clear footer, maximum
  selection enforcement, and Backspace removal.
- Empty state, top/bottom placement, coarse-pointer clear visibility, narrow
  viewport bounds, RTL/LTR logical layout, high contrast, and reduced motion.
- Keyboard: open, ArrowUp/ArrowDown, Home/End, Enter/Space, Escape, Tab, and
  disabled-option skipping.

## Exact geometry

| Contract | Value |
| --- | --- |
| Small control | 30 px high; 8 px inline inset; 3 px block inset; 6 px radius; 12 px type |
| Medium control | 38 px high; 12 px inline inset; 5 px block inset; 8 px radius; 13 px type |
| Large control | 46 px high; 16 px inline inset; 7 px block inset; 12 px radius; 15 px type |
| Popup | Control width; 8 px gap; 12 px radius; 300 px maximum list height |
| Search row | 8 px inset; 6 px editor radius; 12 px type |
| Option | 8 px block and 12 px inline inset; 6 px radius; 12 px gap |
| Option image/icon | 26 px / 18 px |
| Trigger image | 20 px |
| Chip | 12 px type; 6 px radius; 180 px maximum inline size |
| Footer | 8 px block and 12 px inline inset; 11 px type |

## Color translation boundary

Reference surface, text, border, action, hover, selected, focus, feedback, and
disabled colors map to the existing Honesty ERP Semantic roles, then into the
Select Component Token namespace. `ErpSelect` implementation SCSS consumes its
own Component Tokens. No reference hex, RGB, or HSL values are copied.

## ERP-native ownership

- Field semantics: `ErpFieldBase`, `ErpFieldFrame`, and `ErpFieldTrigger`.
- Search editor: `ErpSearchBox` with internal `select-panel` presentation.
- Option semantics: Selection Family `ErpSelectionTile` with internal
  `select-option` presentation.
- Media and iconography: `ErpAvatar` and `ErpIcon`.
- Compact Select actions: internal `ErpSelectAction`.
- Popup geometry/lifecycle: `AnchoredOverlayController`.

Native control semantics remain inside approved owners. The review route does
not author raw inputs, buttons, images, or SVG.

## Compatibility and review state

Existing CVA, Field Family inputs, `options`, `multiple`, `searchable`,
`filterable`, `sortable`, `maxSelected`, `placeholder`, `searchLabel`,
`searchPlaceholder`, `selectSize`, and legacy `sort` consumers remain supported.
The new exact-reference inputs are `selectAppearance`, `placement`, `groupBy`,
`sortMode`, `filterPredicate`, `filterFn`, `comparator`, `selectAll`, `maxChips`,
`showIcons`, and `showImages`.

Automated technical success and runtime measurements are implementation
evidence only. Product Owner visual acceptance remains pending.
