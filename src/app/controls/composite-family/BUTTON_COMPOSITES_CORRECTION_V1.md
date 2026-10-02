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


## 2026-10-02 — Tooltip governance anchored-owner follow-up

Product Owner local verification at
`e3de8b4d7643b812139fbab8a8a9a28c866fae5c` produced:

- `component-tokens:check` PASS;
- `erp-button:check` PASS;
- `erp-button:check:self-test` PASS;
- `erp-overlay:check` PASS;
- `erp-overlay:check:self-test` PASS.

The full `npm run verify:clean` then advanced through the Button governance
gate and stopped at `erp-tooltip:check` with exactly two findings:

- `src/app/controls/fab-menu/fab-menu.html`: manual popover markup was not in
  the Tooltip checker's approved anchored-owner allowlist;
- `src/app/controls/split-button/split-button.html`: same stale allowlist.

This was a governance false-positive. Both controls had already been explicitly
migrated to the shared `AnchoredOverlayController` architecture and were
accepted by the Button and Overlay governance checks.

Bounded correction:

- Tooltip governance now explicitly recognizes only these non-Tooltip manual
  Popover owners:
  - SearchBox;
  - SplitButton;
  - FabMenu;
- the checker self-test covers all three as valid anchored owners;
- arbitrary manual Popover markup elsewhere remains invalid;
- no runtime source, visual contract, public API, Component Token, or style
  budget changed.

Correction checkpoint:

`26b7f29c0819ccc855e6f787f6996b99238816d6` —
`fix(governance): approve button composite anchored popovers`.

Fresh `erp-tooltip:check`, `erp-tooltip:check:self-test`, and complete
`npm run verify:clean` remain mandatory.


## 2026-10-02 — registered semantic icon follow-up

Fresh Product Owner verification advanced past:

- Tooltip governance PASS;
- complete lint/governance PASS.

Angular test compilation then stopped before executing tests because the Button
Composites showcase used:

`icon: 'document'`

for the create-document FabMenu evidence, but `document` is not a current
`ErpIconName`.

The current semantic icon registry includes `file`, which is the intended
registered file/document concept for this specimen.

Bounded correction:

- showcase create-document action:
  `document -> file`;
- FabMenu unit-test fixture:
  `document -> file`;
- no runtime component behavior, public API, visual geometry, overlay ownership,
  Component Token, or style budget changed.

Correction checkpoints:

- `eb8ea1816914d62b47363aaeb0139a2edb85b3b3` —
  `fix(showcase): use registered file icon for create action`;
- `4c9494b920171a58968fe9f39567b49923e5c43c` —
  `test(fab-menu): use registered semantic file icon`.

A fresh complete `npm run verify:clean` remains mandatory.
