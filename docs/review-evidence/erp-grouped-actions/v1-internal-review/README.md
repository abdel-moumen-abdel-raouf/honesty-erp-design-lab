# ErpButtonGroup and ErpSplitButton internal visual review

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Authority and limits

The accessible Skodash RTL `component-buttons.html` page is fallback
presentation evidence rather than a component-specific exact contract. The
source-backed Group Buttons specimen uses three attached 38 px-high segments,
6 x 12 px padding, 16 px type, 24 px line height, 1 px borders, and 6 px outer
corner radii. The Dropdown Buttons specimen confirms distinct primary and menu
segments. Honesty ERP retains its established system colors, typography,
40 px Button geometry, typed contracts and shared anchored-overlay engine.

The exact inspected stylesheet/script URLs and computed reference boxes are in
`runtime-measurements.json`. Vendor CSS, JavaScript, icons and runtime
dependencies were not imported.

## Confirmed corrections

- Both custom-element hosts previously stretched to the parent Stack's full
  775 px inline space. They now own fit-content inline sizing with a 100%
  maximum; measured host and rendered content boxes match exactly.
- ButtonGroup now exposes a backward-compatible optional `ariaLabel` and the
  live Arabic specimen labels its native group as `إجراءات المستند`.
- SplitButton now gives its trigger `aria-haspopup`, `aria-expanded` and a
  unique `aria-controls` relationship.
- The popup no longer contains nested `menu` roles. The shared action-menu
  owner provides the one labeled menu, and both Button and IconButton paths
  forward `role=menuitem` to their owned native buttons.
- The icon-only menu path continues to use Tooltip and IconButton ownership;
  no private raw control was introduced.

## Runtime evidence

| Evidence | Viewport | Theme | Direction | State |
|---|---:|---|---|---|
| `button-group-1440-light-rtl.png` | 1440 x 900 | Light | RTL | three attached horizontal actions |
| `button-group-390-dark-ltr.png` | 390 x 844 | Dark | LTR | three detached vertical actions |
| `split-button-1440-light-rtl.png` | 1440 x 900 | Light | RTL | five-item mixed menu, bottom placement |
| `split-button-390-dark-ltr.png` | 390 x 844 | Dark | LTR | five-item mixed menu, top placement |
| `reference-skodash-button-groups-1440-rtl.png` | reference card | reference | RTL | attached groups |
| `reference-skodash-dropdown-buttons-1440-rtl.png` | reference card | reference | RTL | dropdown/split presentations |

All six screenshots were inspected directly. The 50 runtime assertions prove
one target, all live controls, three ButtonGroup actions, five text-only,
icon-only and icon-plus-text SplitButton actions, primary and item-selection
events, Arrow-key movement, Escape closure, focus return, menu semantics,
viewport containment, and zero horizontal overflow or browser diagnostics.

## Reproduction

With the Design Lab running at `http://127.0.0.1:4999`:

```powershell
node tools/review/capture-grouped-actions-evidence.mjs
```
