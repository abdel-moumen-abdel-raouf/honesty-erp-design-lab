# Accelerated Data/Table Batch V1

The Product Owner authorized this exact eight-component batch after Phase A hardening. Product Owner visual review is grouped after the batch; technical green does not equal visual acceptance.

## Reference audit

| Component | Reference found | Reference path | SHA-256 | Treatment |
| --- | --- | --- | --- | --- |
| ErpSortHeader | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpColumnChooser | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpFilterBar | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpFilterDrawer | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpTableToolbar | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpBulkActionBar | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpViewSwitcher | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |
| ErpSmartTable | No | Not applicable | Not applicable | Product Owner accelerated-wave no-external-reference waiver |

The audit covered repository source/docs, the Product Owner template directory, Downloads, and `erp-component-templates.zip`. The archive contains only CheckBox, EmptyState, RadioBox, and Select references.

## Ownership

- SmartTable owns local presentation orchestration or remote query intent only; it never owns HTTP.
- Table remains the semantic renderer and its keyed rich-cell templates remain the only cell customization contract.
- Local mode may sort, filter, and page supplied rows.
- Remote mode emits typed revisioned queries and renders parent-supplied state. A revision is correlation evidence, not a claim that SmartTable cancels or rejects stale HTTP responses.
- FilterDrawer stages values in the shared blocking OverlayFrame and commits only through Apply.
- All components inherit App theme/direction and use their own Component Token namespaces.

## Public contracts

- `ErpSortHeader`: `label`, `direction`, `disabled`, and `sortChange`; cycles
  `none → ascending → descending → none` through the ERP Button owner.
- `ErpColumnChooser`: column metadata, controlled visible keys, disabled state,
  normalized visibility intent, and reset intent; required/non-hideable columns
  cannot be removed.
- `ErpFilterBar`: projected ERP fields, typed active-filter evidence, remove,
  reset, and apply intents; domain parsing remains consumer-owned.
- `ErpFilterDrawer`: typed filter definitions/current filters and an applied
  output; staged editing uses the shared end-drawer OverlayFrame.
- `ErpTableToolbar`: label, disabled/refreshing state, optional refresh/export,
  named search/filter/column/action projections, and action intents.
- `ErpBulkActionBar`: selected count, projected actions, and clear-selection
  intent; it owns no permission or business action semantics.
- `ErpViewSwitcher`: controlled `table | cards` value, disabled state, and
  changed intent through the existing ButtonGroup family.
- `ErpSmartTable`: local/remote mode, rows/columns, paging, sort, filters,
  visible columns, selection, loading/empty/error presentation, revisioned
  query intents, refresh/export intents, and rich-cell re-projection into
  `ErpTable`.

The combined review route is `/controls/data-batch`. It includes integrated
local sorting/filtering/paging/selection, column visibility, bulk-action,
loading, empty, and error evidence. Narrow review, RTL, and Light/Dark remain
owned by the existing Design Lab viewport, direction, and App-theme systems.
