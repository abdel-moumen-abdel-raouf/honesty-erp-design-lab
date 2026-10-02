# Button Composites Correction V1

## Status

Product Owner correction implemented in source.

Canonical technical verification and Product Owner runtime/visual re-review are
still pending for this correction wave.

This document supersedes the earlier temporary visual/runtime assumptions for
`ErpButtonGroup`, `ErpSplitButton`, and `ErpFabMenu`. It does not reopen
unrelated Button Family contracts.

## Product Owner visual references

### ErpButtonGroup

Product Owner reference:

`https://getbootstrap.com/docs/4.0/components/button-group/`

Adopted contract:

- attached buttons remain independent actions;
- when `attached=true`, they must read as one connected visual group;
- only the outer group edges keep outer radius;
- middle/inner edges are square and share a controlled separator;
- horizontal and vertical groups must use logical geometry and remain correct
  in RTL/LTR;
- `attached=false` intentionally restores separated button geometry.

This component remains an action group. It does not become a segmented
selection control merely because a specimen contains adjacent labels.

### ErpSplitButton

Product Owner reference:

`https://cdn.dribbble.com/userupload/20508363/file/original-bc0de18cc434c597141bc6d3544e84c5.png?resize=1024x682&vertical=center`

Adopted contract:

- the primary action and menu trigger are separate interactive segments but one
  visual entity;
- both segments share height, tone, solid treatment, outer geometry, and one
  internal separator;
- the primary segment performs the default action;
- the menu segment opens alternatives;
- the menu is nonblocking and anchored to the trigger;
- opening the menu must not create a modal/backdrop, trap the full application,
  or use Tooltip as a menu subsystem;
- the menu uses the shared anchored-overlay geometry and native manual Popover
  top layer.

The previous production use of `openLegacyCompactMenu` by SplitButton is
superseded. The legacy API may remain owner-only inside OverlayManager until a
separate cleanup removes it, but no production control may depend on it.

### ErpFabMenu

Product Owner references:

`https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj42vs-Diff%20GM3%20Expressive.png?alt=media&token=b0d9f87d-66c0-48f4-9a11-e312b5b207ef`

`https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0aj3w24-Diff%20GM2.png?alt=media&token=e358569f-0a63-4ead-a844-ad98804cee2d`

Adopted contract:

- the FAB trigger keeps its document position when the menu opens;
- action items must never enter normal layout flow and push the trigger or
  surrounding content;
- actions render in a native manual Popover top layer;
- the surface is anchored to the FAB through the shared
  `AnchoredOverlayController`;
- default `block-start` places the action collection above the trigger;
- `block-end` places it below;
- viewport collision/repositioning belongs to the shared anchored-overlay
  geometry;
- keyboard ArrowUp/ArrowDown, Escape, focus restoration, disabled actions, and
  outside-pointer dismissal remain deterministic.

## Internal attached-segment contract

`ErpButton` and `ErpIconButton` now expose an internal host-attribute
geometry hook used only by approved composites:

- `data-attached-axis="inline|block"`
- `data-attached-position="first|middle|last"`

This is not a new Product/Page authoring API.

The logical-radius implementation lives in dedicated component style files so
RTL and vertical composition do not require physical left/right assumptions.

## Showcase contract

The Buttons showcase owns all three review examples.

The specimens intentionally separate semantic meanings:

- ButtonGroup: Save / Copy / Delete actions;
- SplitButton: Export primary action plus export alternatives;
- FabMenu: Create trigger plus create-related actions.

The showcase must not use one shared unrelated action list for SplitButton and
FabMenu.

## Governance and regression laws

The Button governance checker protects:

- logical attached-segment selectors for ErpButton and ErpIconButton;
- ButtonGroup attached geometry and internal separators;
- SplitButton one-surface segment authoring;
- SplitButton native manual Popover menu;
- absence of SplitButton legacy blocking Overlay dependencies;
- FabMenu native manual Popover surface;
- FabMenu fixed/top-layer action positioning.

The Overlay governance checker protects:

- SplitButton/FabMenu use of the anchored-overlay foundation;
- Tooltip is not used as a SplitButton action menu;
- production controls do not consume `openLegacyCompactMenu`;
- any remaining legacy compact API is owner-only in OverlayManager.

Unit tests protect:

- ButtonGroup inline/block attached positions and detached reset;
- SplitButton primary output, anchored menu, zero blocking Overlay entries,
  selection, Escape, and focus restoration;
- FabMenu stable trigger identity, anchored positioning, selection, logical
  placement, Escape, and focus restoration;
- Button showcase evidence for all three corrected contracts.

## Verification

Required focused preflight:

```text
npm run component-tokens:check
npm run erp-button:check
npm run erp-button:check:self-test
npm run erp-overlay:check
npm run erp-overlay:check:self-test
```

Mandatory final gate:

```text
npm run verify:clean
```

Technical PASS does not equal Product Owner visual approval. After a green
canonical gate, the Product Owner must re-review Button Composites in Light and
Dark and confirm the attached geometry, SplitButton surface/menu behavior, and
FabMenu no-layout-shift behavior.
