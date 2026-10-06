# ErpSelect Strict Exact-Reference Contract V3

## Binding authority

- Source path: `C:\Users\Misrtech\Downloads\ERP-SELECT.html`.
- Filename: `ERP-SELECT.html`.
- SHA-256: `EF07C963C55A3547BC58A89E1ACD4B45D913E5C13BA126121DAF0C0663B0C64D`.
- Product Owner strict-rebuild instruction date: 2026-10-06.
- Authority: reference geometry, hierarchy, states, and behavior are reproduced
  exactly; only raw reference colors are translated through Honesty ERP
  Semantic and Select Component Tokens.

`ERP-SELECT.html` supersedes all previous ErpSelect visual references and all
earlier interpretations. The Product Owner rejected the candidate at
`2c68970831c95136dfab4faf36cc32078beb2f91` because it retained visible focus,
icon, spacing, and review-evidence defects. Automated success is not visual
acceptance.

## Reference parity inventory

| Reference feature | V3 implementation contract |
| --- | --- |
| Empty closed control | Reference placeholder hierarchy through FieldTrigger |
| Single text value | Label-only trigger row |
| Single icon value | Semantic ErpIcon plus label |
| Single image value | ErpAvatar plus label |
| Multiple value | Animated image-capable chips, bounded visible count, `+N` overflow |
| Clear/unselect | Dedicated semantic `dismiss` glyph in trigger, search, and chips |
| Chevron | Logical end action; rotates only while open |
| Outline/filled/ghost | Exact surface geometry with Honesty color translation |
| sm/md/lg | 30/38/46 px reference heights; compatibility aliases remain mapped |
| Popup | Visible-control width, 8 px anchor gap, 12 px radius, overlay elevation |
| Search | First popup row using ErpSearchBox `select-panel` presentation |
| Filtering | Built-in query predicate plus bounded custom pre-filter |
| Sorting | Source, label, or custom data ordering; no visual toolbar in the reference |
| Groups | Sticky group labels and reference separators |
| Options | Text, icon, image, description, metadata, hover, active, selected, disabled |
| Selected marker | Dedicated semantic `check-mark` glyph; square multi indicator or single tick |
| Option rhythm | Reference option inset plus a tokenized 4 px row gap required by Product Owner review |
| Select all | Multiple-selection footer with count, select-all, and clear intents |
| Empty results | Search empty-state icon and configurable text |
| Placement | Bottom and top anchored placement |
| Keyboard | Open, arrows, Home/End, Enter/Space, Escape, Tab, Backspace |
| Focus | Open ring or native `:focus-visible` evidence only; pointer focus is not styled as keyboard focus |
| Blur | Clears Select and Field focus state without retaining a selected-state outline |
| RTL/LTR | Logical layout and anchored geometry inherit application direction |
| Reduced motion | Motion becomes deterministic while state and content remain visible |
| Narrow/coarse pointer | Viewport-clamped popup and reference touch targets |

## Exact geometry

| Contract | Reference value |
| --- | --- |
| Small control | 30 px high; 8 px inline inset; 3 px block inset; 6 px radius; 12 px type |
| Medium control | 38 px high; 12 px inline inset; 5 px block inset; 8 px radius; 13 px type |
| Large control | 46 px high; 16 px inline inset; 7 px block inset; 12 px radius; 15 px type |
| Popup | Control width; 8 px anchor gap; 12 px radius; 300 px maximum list height |
| Search row | 8 px inset; 6 px editor radius; 12 px type |
| Option | 8 px block and 12 px inline inset; 6 px radius; 12 px content gap |
| Option row gap | 4 px Product Owner correction layered on the reference option geometry |
| Option image/icon | 26 px / 18 px |
| Trigger image | 20 px |
| Chip | 12 px type; 6 px radius; 180 px maximum inline size |
| Footer | 8 px block and 12 px inline inset; 11 px type |

## Color translation

Reference surfaces map to Honesty surface roles; borders to Honesty border
roles; primary/selected/focus colors to Honesty brand and action roles; muted
content to Honesty muted text; disabled and danger states to their Semantic
roles. Those mappings are emitted by `select` and `select-panel` Component
Tokens. Production Select SCSS consumes no raw reference color.

## ERP-native ownership

- Field semantics: `ErpFieldBase`, `ErpFieldFrame`, and `ErpFieldTrigger`.
- Search editor: `ErpSearchBox` internal `select-panel` presentation.
- Options: Selection Family internal `select-option` presentation.
- Media and icons: `ErpAvatar` and `ErpIcon`.
- Compact actions: internal `ErpSelectAction`.
- Geometry/lifecycle: `AnchoredOverlayController`.

The review route remains ERP-only authored. The strict rebuild does not reopen
Data/Table visual correction or any other Core component. Product Owner
runtime/Light/Dark/RTL/narrow acceptance remains pending.
