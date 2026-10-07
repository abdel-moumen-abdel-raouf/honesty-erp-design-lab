# ERP-TABLE full reference experience V2

## Authority and rejection record

- Date: 2026-10-08
- Filename: `ERP-TABLE.html`
- Provenance path: `C:\Users\Misrtech\Downloads\ERP-TABLE.html`
- SHA-256: `292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`
- Product Owner decision: the candidate at
  `eddac4a8e8a3460f346bb579fdd5ca0074296e7a` is rejected because it omitted
  visible owners from the reference experience and retained known geometry
  deltas.

`ERP-TABLE.html` remains the single binding visual and behavioral authority.
Colors, font families, invisible accessibility markup, reduced-motion
handling, and the ERP component hierarchy are the only permitted differences.

An ERP feature may be owned by another component, but when it is visibly
present in `ERP-TABLE.html` it must be composed into the exact reference
experience. Separate ownership never means skipped visual evidence.

## Exhaustive feature ledger

The ledger was rebuilt from the rendered reference, its HTML/CSS/JavaScript,
and all six live configurations. “Not present” is a positive audit result: the
feature is not added to this reference reconstruction.

| # | Reference feature | Present | ERP owner | Required action/evidence |
|---:|---|:---:|---|---|
| 1 | Clipped table experience frame | Yes | Review composition + `ErpTable` | One 100% frame, 1 px border, 12 px radius, reference elevation |
| 2 | Toolbar | Yes | `ErpTableToolbar` | Compose above the table inside the same frame |
| 3 | Search editor | Yes | `ErpSearchBox` | Inline reference presentation; controlled query filters visible rows |
| 4 | Column chooser trigger | Yes | `ErpColumnChooser` | Reference tool-button presentation with open/close intent |
| 5 | Column chooser popover | Yes | `ErpColumnChooser` | 240 px anchored surface, 340 px maximum height, title and checkboxes |
| 6 | Column visibility | Yes | `ErpColumnChooser` + `ErpTable.visibleColumnKeys` | Controlled visibility changes the rendered columns |
| 7 | Native table semantics | Yes | `ErpTable` | Native table remains owned only by `ErpTable` |
| 8 | Visually hidden caption | Yes | `ErpTable` | Accessible caption without a visible extra title inside the frame |
| 9 | Header row | Yes | `ErpTable` | Reference heights, padding, typography, surface, and separators |
| 10 | Header icons + text | Yes | `ErpTable` + `ErpIcon` | Header-type specimen uses the approved icon gateway |
| 11 | Header alignment | Yes | `ErpTableColumn` | Start/center/end content alignment |
| 12 | Sort affordance | Yes | `ErpSortHeader` | Two-arrow reference presentation and controlled sort intent |
| 13 | Column resize | Yes | `ErpTableResizeHandle` | 8 px hit area, 2 px line, drag and keyboard resizing |
| 14 | Selection column | Yes | `ErpTable` + `ErpCheckBox` | 44 px contract and 16 px checkbox presentation |
| 15 | Select all | Yes | `ErpCheckBox` | Controlled master selection with indeterminate state |
| 16 | Row selection | Yes | `ErpCheckBox` | Controlled row checkbox selection only |
| 17 | Row activation | Yes | `ErpTable` | Controlled activation remains independent from selection |
| 18 | Normal density | Yes | `ErpTable` | 12 px × 16 px cell padding |
| 19 | Compact density | Yes | `ErpTable` | 8 px × 12 px cell padding |
| 20 | Comfortable density | API/reference CSS | `ErpTable` | 16 px block padding compatibility evidence |
| 21 | Striped rows | Yes | `ErpTable` | Opt-in striping |
| 22 | Row hover | Yes | `ErpTable` | Reference state distribution and motion |
| 23 | Selected-row chrome | Yes | `ErpTable` | Selected and selected-hover states |
| 24 | Fixed-height internal scrolling | Yes | `ErpTableViewport` | 380 px specimen, internal scroll only |
| 25 | Horizontal overflow | Yes | `ErpTableViewport` | 10 px internal scrollbar, no page-owned overflow |
| 26 | Vertical/card layout | Yes | `ErpTable` | Labeled record cards with reference geometry |
| 27 | Text cells | Yes | `ErpText` through `ErpTable` | Default projected/nonprojected text rendering |
| 28 | Digit cells | Yes | `ErpText` + digit preference | Controlled system/Latin/Arabic-Indic digits |
| 29 | Money cells | Yes | Rich keyed cell template | ERP text composition with reference alignment |
| 30 | Date cells | Yes | Rich/default table text | Reference date placement and alignment |
| 31 | Status/tag cells | Yes | `ErpStatusBadge` | 22 px reference-compatible presentation |
| 32 | Photo/identity cells | Yes | `ErpAvatar` + `ErpText` | 32 px table-photo presentation with primary/secondary copy |
| 33 | Icon cells | Yes | `ErpIcon` | Approved semantic icon registry |
| 34 | Text action button cells | Reference renderer/API | `ErpButton` | Reference-compatible cell action presentation in feature evidence |
| 35 | Icon-button/action cells | Yes | `ErpIconButton` + `ErpTooltip` | 28 px action controls and bounded intents |
| 36 | Descriptions/secondary copy | Yes | Rich template / `descriptionKey` | 11 px secondary line with 1 px copy gap |
| 37 | Wrap / ellipsis / clip | Reference API | `ErpTableColumn.overflow` | Controlled column overflow evidence |
| 38 | Footer information | Yes | Reference composition | Visible/total/selected counter in the 55 px footer |
| 39 | Pagination | Yes | `ErpPagination` | Previous, pages 1–3, next inside the same footer |
| 40 | Empty state | Yes in source/behavior | `ErpTable` + `ErpIcon` + `ErpText` | Empty-state feature evidence without a private renderer |
| 41 | Loading state | No | None | Do not invent a loading surface for this reference |
| 42 | Sticky header | No | None | Do not add sticky behavior |
| 43 | Filter bar | No | None | Do not add a feature absent from the reference |
| 44 | Filter drawer | No | None | Do not add a feature absent from the reference |
| 45 | Bulk action bar | No | None | Selection count stays in the reference footer; no bulk bar is shown |
| 46 | View switcher | No | None | Do not add a feature absent from the reference |
| 47 | SmartTable orchestration | No | None | The visible experience is composed directly from bounded owners |
| 48 | Responsive toolbar wrap | Yes | `ErpTableToolbar` + `ErpSearchBox` | At reference narrow query: toolbar 8 px padding, search takes full row |
| 49 | Light/Dark | Yes | App-owned theme + component tokens | Geometry invariant; semantic colors resolve by theme |
| 50 | RTL/LTR | Yes | Context direction | Logical mirroring without component-local direction ownership |
| 51 | Reduced motion | Yes | Owner styles | Preserve states while removing motion |

## Reference geometry baseline at 1440 × 900

| Part | Reference computed value |
|---|---:|
| Experience frame border / radius | 1 px / 12 px |
| Toolbar height / padding / gap | 54 px / 12 px 16 px / 8 px |
| Search and column trigger height | 29 px |
| Search maximum width | 340 px |
| Column popover width / maximum height / padding | 240 px / 340 px / 8 px |
| Column popover item height / padding / gap | 32 px / 8 px / 8 px |
| Full header / rich row | 33 px / 57 px |
| Header-types header / row | 34 px / 47 px |
| Compact header / row | 31 px / 39 px |
| Clickable header / row | 31 px / 47 px |
| Fixed internal scroll height | 380 px |
| Selection checkbox | 16 px |
| Photo | 32 px |
| Status tag | 22 px |
| Icon action | 28 px |
| Footer | 55 px |
| Pagination button | 30 px |
| Vertical record / cell | 252 px / 49 px |

## Review structure

The first review section is `ERP-TABLE EXACT REFERENCE EXPERIENCE` and composes
toolbar, search, column chooser, table, footer information, and pagination in
one frame. State/feature evidence follows, then compatibility evidence. The
six reference configurations remain represented, but the complete primary
experience is no longer split away from its higher owners.

Automated and measured technical parity remains a candidate for Product Owner
review; it does not declare visual acceptance.
