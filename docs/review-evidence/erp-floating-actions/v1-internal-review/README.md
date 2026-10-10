# ErpFab, ErpExtendedFab and ErpFabMenu internal visual review

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`,
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Authority and limits

The accessible Skodash RTL `component-buttons.html` page contains no
FAB-specific owner, selector or interaction. It is retained only as fallback
Button-family presentation evidence. The floating actions therefore remain an
explicitly original Honesty ERP candidate using the established Button/FAB,
semantic color, typography and anchored-overlay contracts. No vendor CSS,
JavaScript, icons or runtime dependency was imported.

The inspected reference URL, styles, script dependency and computed fallback
Button box are recorded in `runtime-measurements.json`.

## Confirmed corrections

- The three custom-element hosts now use content-sized inline/block geometry;
  their measured boxes match the owned native trigger boxes instead of
  occupying the whole preview area.
- FabMenu now exposes one unique controlled menu relationship from the trigger
  through `aria-haspopup`, `aria-controls` and `aria-expanded`.
- Every menu action forwards `role=menuitem` through its existing Fab or
  ExtendedFab owner. No raw private button was introduced.
- Opening the menu focuses its first enabled action. Escape closes the
  top-layer popover from the document capture path and returns focus to the
  trigger; native popover closure also synchronizes controlled state.
- The generated FabMenu workbench starts at 100% block position so its opened
  top-placement surface remains inside the preview at narrow width without
  clipping or overlapping the preview heading.

## Runtime evidence

| Evidence | Viewport | Theme | Direction | State |
|---|---:|---|---|---|
| `fab-1440-light-rtl-start.png` | 1440 x 900 | Light | RTL | 56 x 56 trigger at both position boundaries |
| `fab-390-dark-ltr-end.png` | 390 x 844 | Dark | LTR | end boundary, contained |
| `extended-fab-1440-light-ltr-end.png` | 1440 x 900 | Light | LTR | 116.125 x 56 labeled trigger |
| `extended-fab-390-dark-rtl-start.png` | 390 x 844 | Dark | RTL | start boundary, contained |
| `fab-menu-1440-light-rtl-open.png` | 1440 x 900 | Light | RTL | five mixed actions, top placement |
| `fab-menu-390-dark-ltr-open.png` | 390 x 844 | Dark | LTR | mixed menu and visible keyboard focus |
| `reference-skodash-buttons-fallback-1440-rtl.png` | reference page | reference | RTL | fallback Button evidence only |

All seven screenshots were inspected directly. The measured Fab and FabMenu
trigger boxes are 56 x 56 px; ExtendedFab is 116.125 x 56 px. The open menu is
116.34375 x 312 px at both captured viewports and remains within the preview.
The 56 runtime assertions cover one target, all live controls, inline/block
boundary changes, mixed icon-only/text-only/icon-plus-text actions, disabled
state, popup relationships, menu roles, focus movement, Escape closure, focus
return, viewport containment, zero horizontal overflow and zero browser
diagnostics.

## Reproduction

With the Design Lab running at `http://127.0.0.1:5001`:

```powershell
node tools/review/capture-floating-actions-evidence.mjs
```
