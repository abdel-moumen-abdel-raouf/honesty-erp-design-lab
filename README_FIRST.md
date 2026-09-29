# README FIRST — HONESTY ERP Design Lab

Start every new ChatGPT or implementation-agent session by reading these files
in this order:

1. `NEW_CHAT_HANDOFF.md`
2. `AGENTS.md`
3. `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
5. `src/app/controls/CONTROLS_CORRECTION_PROGRAM_V1.md`
6. `src/app/controls/POST_CR12_REVIEW_WAVE_A_V1.md`

## Repository

GitHub: `abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Owner local workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Current state

Latest source-affecting Tooltip correction:

`632f45a5fb7b42eefa09da0d2c8a20c0f520244b`
`fix(tooltip): center arrow on trigger cross-axis`

This source corrects the Product Owner runtime finding that Tooltip arrows were
visibly biased on the cross-axis:
- left/right arrows appeared vertically low;
- top/bottom arrows appeared horizontally biased.

Correction contract:
- arrow coordinate is the exact cross-axis center and CSS uses `translate(-50%)`;
- configured arrow safe inset shrinks symmetrically when a compact Tooltip
  cannot afford the full inset;
- the safe-inset fallback must never bias the arrow away from the trigger center.

Verification distinction:

The latest **Fully Green** verified repository checkout remains:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

with 87/87 test files, 615/615 tests, both TypeScript no-emit gates, and the
zero-warning production build passing.

The new `632f45a...` Tooltip centering correction is implemented and source-reviewed
but requires a fresh `npm run verify:clean` before it can become the new Fully
Green baseline.

Product status:
- Tooltip V1 remains the active Product Owner blocker;
- no later page review is authorized until this centering correction is
  technically verified and Product Owner runtime Light/Dark re-review accepts it.

Read `NEW_CHAT_HANDOFF.md` for the complete state and exact next action.
