# ErpTooltip internal visual review

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Authority and limits

The existing `TOOLTIP_V1.md` contract remains authoritative and cites the
Material 3 Tooltip guidelines plus the Mobbin Tooltip glossary. Both live pages
were captured on 2026-10-10. Material 3 exposes the plain/rich distinction and
an interactive rich-tooltip specimen; Mobbin documents contextual support on
hover, click, or tap and shows common caret, rounded-surface, icon, text, and
action variants. Neither page exposes an exact downloadable Product Owner
reference implementation for Honesty ERP, so this review preserves the
existing Honesty ERP component-token geometry rather than claiming pixel-exact
vendor parity. System colors and typography remain Honesty ERP owned.

The Material page emitted two third-party Content-Security-Policy diagnostics
and Mobbin emitted recoverable Framer hydration warnings. Those diagnostics
belong to the reference sites. Every implementation scenario recorded zero
console errors and zero warnings.

## Confirmed corrections

- The Tooltip host now has content-sized inline and block geometry. Its measured
  box is identical to the owned trigger box instead of stretching across the
  complete preview row.
- The dedicated workbench now projects a real `ErpTooltipContent` when
  `variant=rich`; enabling `interactive` adds a real ERP action and visible
  activation evidence on the same primary target.
- `enterAnimation` and `exitAnimation` are bounded select controls populated
  from the authoritative 23-value `ERP_MOTION_PRESETS` contract. Invalid free
  text is no longer the workbench editor for these public unions.
- Plain Tooltip evidence preserves `role=tooltip` and `aria-describedby`.
  Interactive rich evidence uses dialog semantics, moves focus to its action,
  closes on Escape, clears `aria-expanded`, and returns focus to the trigger.
- The evidence runner positions the target before opening the overlay and now
  rejects any clipped trigger as well as any clipped surface. This caught and
  removed the earlier narrow screenshot in which the trigger was partly above
  the viewport.

## Runtime evidence

| Evidence | Viewport | Theme | Direction | Measured state |
|---|---:|---|---|---|
| `plain-1440-light-rtl-top.png` | 1440 x 900 | Light | RTL | 114.90625 x 40 trigger; 139.46875 x 26 top surface |
| `plain-390-dark-ltr-bottom.png` | 390 x 844 | Dark | LTR | contained trigger and 139.46875 x 26 bottom surface |
| `rich-info-1440-light-ltr-start.png` | 1440 x 900 | Light | LTR | 320 x 115.1875 information surface resolved left |
| `rich-interactive-390-dark-rtl-end.png` | 390 x 844 | Dark | RTL | 320 x 155.1875 dialog surface resolved bottom with ERP action |
| `reference-material3-tooltip-1440.png` | reference page | Dark | LTR | Material 3 Tooltip guideline and rich-tooltip specimen |
| `reference-mobbin-tooltip-1440.png` | reference page | Light | LTR | Mobbin Tooltip glossary source evidence |

All six screenshots were inspected directly. The 49 runtime assertions cover
one primary target, ten live controls, content-sized host geometry, complete
trigger and surface containment, arrow presence, plain/rich semantics,
projected rich content, interactive action focus, Escape dismissal, focus
return, zero page overflow, visible arrow overflow, and zero implementation
browser diagnostics.

## Reproduction

With the Design Lab running at `http://127.0.0.1:5001`:

```powershell
$env:HONESTY_REVIEW_URL='http://127.0.0.1:5001'
node tools/review/capture-tooltip-evidence.mjs
```
