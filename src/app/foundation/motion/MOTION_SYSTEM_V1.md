# Honesty ERP — Motion System V1

## Status and ownership

The Foundation-owned `ErpMotionPreset` catalog is the single public motion
vocabulary shared by blocking Overlay and Tooltip. Animate.css 4.1.1 is an
internal implementation dependency behind
`AnimateCssMotionAdapter`. Consumers never author vendor classes, vendor effect
names, arbitrary CSS-class inputs, or arbitrary duration inputs.

This is a technical infrastructure contract. It does not claim Product Owner
visual approval or freeze later component-specific motion review.

## Canonical catalog

`fade | scale | fade-scale | slide-up | slide-down | slide-start | slide-end |
zoom | pop | flip-x | flip-y | bounce | swing | fade-up | fade-down |
fade-start | fade-end | zoom-up | zoom-down | back | light-speed | rotate |
roll`

`ErpOverlayAnimation` remains a compatibility alias of
`ErpMotionPreset`; Overlay and Tooltip do not maintain divergent catalogs.

## Adapter contract

The central adapter owns:

- system preset to Animate.css enter/exit mapping;
- logical LTR/RTL mapping for start/end presets;
- the common animated class and effect-class lifecycle;
- fixed component-provided duration through `--animate-duration`;
- start/restart, `animationend`, cancellation, and class/style cleanup;
- deterministic immediate completion for reduced motion.

Overlay and Tooltip provide only a canonical system preset, direction, phase,
target element, and their fixed duration. They do not duplicate vendor
lifecycle code.

## Component durations and defaults

- Modal/Drawer: 360ms enter and 260ms exit.
- Tooltip: 320ms enter and 220ms exit.
- Modal: `fade-scale` enter/exit.
- Start drawer: `slide-start` enter/exit.
- End drawer: `slide-end` enter/exit.
- Bottom drawer: `slide-up` enter and `slide-down` exit.
- Tooltip: `fade-scale` enter and `fade` exit.

Logical start/end mappings reverse physically in RTL. Reduced motion skips
visual animation but still completes lifecycle callbacks so surfaces cannot
remain stuck in entering or leaving state.

## Third-party record

The installed dependency is `animate.css@4.1.1`. Its published package
metadata and included LICENSE identify MIT. Repository attribution is retained
in `THIRD_PARTY_NOTICES.md`; the pre-install package-fact audit is retained in
the external execution ledger location.
