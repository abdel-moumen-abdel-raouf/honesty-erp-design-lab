# ErpQuickActionsBar Candidate V1

Status: `TECHNICAL_CANDIDATE` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

## Authority

- Product Owner authorization: Shell continuation wave, Stage S2-D.
- The previously discussed topology places a distinct quick-actions owner at the logical end of the workspace and uses a horizontal composition at narrow widths.
- The Gxon runtime and source measurements remain unavailable. No Gxon dimension, animation, DOM, or fixed action taxonomy is claimed by this contract.

## Ownership

`ErpQuickActionsBar` owns only the grouped quick-action presentation and activation intent. The consumer supplies group names, actions, authorization-filtered state, and business meaning. It composes `ErpIconButton`, `ErpTooltip`, and `ErpText`; it owns no routing, transaction, permission, persistence, transport, overlay engine, or global positioning.

## Public API

- `groups: readonly ErpQuickActionGroup[]` (required)
- `ariaLabel: string`
- `actionActivated: OutputEmitterRef<string>`

An action has a stable identifier, visible/accessibility label, semantic icon, optional `primary | secondary` priority, and optional disabled state. Categories remain data-driven until the Product Owner supplies a fixed taxonomy.

## Layout decision

The technical candidate is an in-flow vertical rail. The Foundation Query API changes its internal flow to horizontal at the approved narrow query. `ErpAppShell` owns eventual placement; the component itself never fixes or sticks to the viewport.
