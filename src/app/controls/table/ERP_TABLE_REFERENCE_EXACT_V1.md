# ErpTable exact-reference contract V1

## Authority

- Date: 2026-10-07
- Filename: `ERP-TABLE.html`
- Provenance path: `C:\Users\Misrtech\Downloads\ERP-TABLE.html`
- SHA-256: `292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`
- Product Owner instruction: literal visual and behavioral reconstruction.

`ERP-TABLE.html` supersedes every previous `ErpTable` visual interpretation,
including the accelerated no-external-reference waiver. The only visual
substitutions are Honesty ERP semantic colors and system font families.
Invisible accessibility markup, reduced-motion behavior, and the approved ERP
component hierarchy remain architecture requirements.

## Reference-owned base-table inventory

- 100% inline-size table frame with 1 px border, 12 px radius, clipped surface,
  and reference-equivalent elevation.
- Separate-border fixed table layout, 10 px internal scrollbars, fixed-height
  body mode, and no page-level overflow ownership.
- Normal, compact, and comfortable density contracts.
- 11 px / 600 / 0.03 em headers with 8 px block padding and density-owned
  inline padding.
- 13 px cells with 12 px by 16 px default padding; compact uses 8 px by 12 px;
  comfortable uses 16 px block padding.
- 44 px selection column with 16 px checkbox presentation.
- Two-arrow sort treatment: 10 px width, 6 px arrow boxes, 1 px arrow gap,
  4 px logical label gap, and 0.35 inactive opacity while sorted.
- Resize owner: 8 px hit area, 2 px visual line, 20% block inset, 2 px radius,
  and 140 ms state transition.
- Striped, hover, selected, selected-hover, clickable, disabled-compatible, and
  focus-visible row states without coupling selection to activation.
- Horizontal and vertical/card layouts. Vertical records use 12 px margin,
  12 px padding, 8 px radius, 110 px label column, 12 px gap, and 8 px block
  cell padding.
- Rich projected cells, descriptions, digit formatting, physical/logical
  alignment, wrap/ellipsis/clip, controlled visibility, and controlled widths.
- Native caption semantics remain inside `ErpTable` and are visually hidden in
  the exact frame because the reference has no visible internal caption.
- Footer-value/template APIs remain compatibility surfaces; pagination is not
  absorbed into the base Table.
- Row background motion is 140 ms with `cubic-bezier(0.2, 0, 0, 1)` and is
  removed under reduced motion.

## Public API disposition

Retained: `caption`, `columns`, `visibleColumnKeys`, `rows`, `rowKey`,
`emptyText`, `selectable`, `showHeaderSelection`, `rowActivatable`, `striped`,
`hoverMotion`, `selectedKeys`, `sort`, `columnWidths`, `footerValues`, rich cell
and footer templates, and their existing intents.

Added from the reference: `density`, `layout`, `fixedHeight`, `hover`, and
`ErpTableColumn.headerIcon`.

Compatibility-only: `compact` remains a boolean alias that takes precedence by
resolving to `density="compact"`.

## Hierarchy and ownership

`ErpTable` owns native table semantics and composes `ErpText`, `ErpCheckBox`,
`ErpSortHeader`, `ErpTableResizeHandle`, and projected ERP cell content. It
does not recreate checkbox, sort, avatar, badge, action, or icon systems.

The reference toolbar, search, column menu, pagination, and higher-level loading
composition map to existing `ErpTableToolbar`, `ErpSearchBox`,
`ErpColumnChooser`, `ErpPagination`, and `ErpSmartTable`. They are separate
owners and are not merged into `ErpTable` by this exact reconstruction.

## Review gate

The technical candidate is reviewed at `/controls/core-batch`. Automated gates
and geometry measurements do not declare Product Owner visual acceptance or
open the later Data/Table Visual Correction Wave.
