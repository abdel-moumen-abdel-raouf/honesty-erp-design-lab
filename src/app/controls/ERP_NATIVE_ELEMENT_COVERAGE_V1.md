# ERP Native Element Coverage V1

> Generated from the single ownership registry in `tools/catalog/erp-component-catalog.mjs`.

| Native tag | Policy | ERP owner / replacement | Exact allowed owner paths |
|---|---|---|---|
| `button` | GLOBAL_OWNER_ONLY | `ErpButton`, `ErpIconButton`, `ErpFab`, `ErpExtendedFab`, `ErpFieldTrigger`, `ErpTabTrigger`, `ErpSortTrigger`, `ErpAvatarAction`, `ErpStatusBadgeAction`, `ErpTableResizeHandle`, `ErpSelectionTile`, `ErpAvatarPickerTile` | `src/app/controls/avatar-picker/internal/avatar-picker-tile.html`<br>`src/app/controls/avatar/internal/avatar-action.html`<br>`src/app/controls/button/button.html`<br>`src/app/controls/extended-fab/extended-fab.html`<br>`src/app/controls/fab/fab.html`<br>`src/app/controls/icon-button/icon-button.html`<br>`src/app/controls/input-family/internal/field-trigger.html`<br>`src/app/controls/select/internal/select-action.html`<br>`src/app/controls/selection-family/internal/selection-tile.html`<br>`src/app/controls/sort-header/internal/sort-trigger.html`<br>`src/app/controls/status-badge/internal/status-badge-action.html`<br>`src/app/controls/table/internal/table-resize-handle.html`<br>`src/app/controls/tabs/internal/tab-trigger.html` |
| `input` | GLOBAL_OWNER_ONLY | `Concrete ERP input owners`, `ErpCheckBox`, `ErpRadioBox`, `ErpRangeSlider`, `ErpFilePicker`, `ErpImagePicker`, `ErpSelectionPickerContent` | `src/app/controls/check-box/check-box.html`<br>`src/app/controls/combo-box/combo-box.html`<br>`src/app/controls/file-picker/file-picker.html`<br>`src/app/controls/image-picker/image-picker.html`<br>`src/app/controls/money-box/money-box.html`<br>`src/app/controls/number-box/number-box.html`<br>`src/app/controls/number-stepper/number-stepper.html`<br>`src/app/controls/password-box/password-box.html`<br>`src/app/controls/radio-box/radio-box.html`<br>`src/app/controls/range-slider/range-slider.html`<br>`src/app/controls/search-box/search-box.html`<br>`src/app/controls/selection-family/internal/selection-picker-content.html`<br>`src/app/controls/tel-box/tel-box.html`<br>`src/app/controls/text-box/text-box.html`<br>`src/app/controls/url-box/url-box.html` |
| `textarea` | GLOBAL_OWNER_ONLY | `ErpTextAreaBox` | `src/app/controls/text-area-box/text-area-box.html` |
| `select` | GLOBAL_OWNER_ONLY | `ErpSelect` | none |
| `option` | GLOBAL_OWNER_ONLY | `ErpSelect` | none |
| `optgroup` | GLOBAL_OWNER_ONLY | `ErpSelect` | none |
| `form` | GLOBAL_OWNER_ONLY | `ErpForm` | `src/app/controls/form/form.html` |
| `label` | CONTEXTUAL | `Concrete field owners` | `src/app/controls/check-box/check-box.html`<br>`src/app/controls/radio-box/radio-box.html`<br>`src/app/controls/selection-family/internal/selection-picker-content.html`<br>`src/app/primitives/text/text.html` |
| `table` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `caption` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `colgroup` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `col` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `thead` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `tbody` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `tfoot` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `tr` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `th` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `td` | GLOBAL_OWNER_ONLY | `ErpTable` | `src/app/controls/table/table.html` |
| `svg` | CONTEXTUAL | `ErpIcon`, `approved exact-reference drawing owners`, `Design Lab chart evidence` | `src/app/controls/check-box/check-box.html`<br>`src/app/review-internals/review-chart/review-chart.html` |
| `img` | CONTEXTUAL | `ErpAvatar`, `ErpImagePicker`, `ErpStatusBadge` | `src/app/controls/avatar/avatar.html`<br>`src/app/controls/image-picker/image-picker.html`<br>`src/app/controls/status-badge/status-badge.html` |
| `hr` | PAGE_AND_CONSUMER_BANNED | `ErpDivider` | none |
| `h1` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `h2` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `h3` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `h4` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `h5` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `h6` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `p` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `strong` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `small` | PAGE_AND_CONSUMER_BANNED | `ErpText` | `src/app/primitives/text/text.html` |
| `section` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `main` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `header` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `footer` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `aside` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `nav` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `div` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `span` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `a` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `ul` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `ol` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
| `li` | PAGE_AND_CONSUMER_BANNED | `ERP structural owner or bounded component anatomy` | none |
