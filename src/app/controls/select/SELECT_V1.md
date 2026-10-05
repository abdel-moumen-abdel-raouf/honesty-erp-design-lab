# ErpSelect V1

## Ownership reconciliation

- `ErpSelect` chooses one or many values from a supplied option source.
- `ErpComboBox` remains editable text/query plus option selection.
- `ErpSearchBox` remains search/query behavior with inline, dropdown, and modal modes.
- `ErpItemPicker` remains a staged generic blocking-picker composition.

`ErpSelect` uses Field Family framing and an anchored, nonblocking listbox. It does not duplicate the editable-query ownership of ComboBox, the search-mode ownership of SearchBox, or the staged blocking transaction owned by ItemPicker.

## Visual authority

The Product Owner-supplied `erp-select.html` is the visual authority for structure, proportions, option hierarchy, selection marks, filtering/search, sorting, sizes, and open/closed behavior. Raw reference colors are replaced by Honesty ERP Semantic and Select Component Tokens.
