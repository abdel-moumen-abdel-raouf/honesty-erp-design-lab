# ErpSelect V1

## Ownership reconciliation

- `ErpSelect` chooses one or many values from a supplied option source.
- `ErpComboBox` remains editable text/query plus option selection.
- `ErpSearchBox` remains search/query behavior with inline, dropdown, and modal modes.
- `ErpItemPicker` remains a staged generic blocking-picker composition.

`ErpSelect` uses Field Family framing and an anchored, nonblocking listbox. It does not duplicate the editable-query ownership of ComboBox, the search-mode ownership of SearchBox, or the staged blocking transaction owned by ItemPicker.

## Visual authority

The Product Owner-supplied `erp-select.html` is the visual authority for structure, proportions, option hierarchy, selection marks, filtering/search, sorting, sizes, and open/closed behavior. Raw reference colors are replaced by Honesty ERP Semantic and Select Component Tokens.

- Reference filename: `erp-select.html`
- SHA-256: `5A31FC10A3D1208BF64E35EB5139823E48F8E2BF1D0190D07DD5DB5DBC4DF23B`
- Adopted: trigger/popup hierarchy, five controlled sizes, searchable and grouped option browsing, source/ascending/descending sorting, single/multiple selection, disabled options, keyboard navigation, and clear behavior.
- Adapted: raw palette and local theme/direction controls are replaced by Honesty ERP tokens and App-owned theme/direction; the reference's standalone imperative JavaScript becomes Angular inputs, CVA state, outputs, Field Family ownership, and Anchored Overlay geometry.
- Not adopted: external image/demo data, native-select enhancement mode, consumer-controlled theme/direction, and arbitrary vendor/runtime configuration.
