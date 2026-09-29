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

`84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`
`fix(tooltip): align popover and arrow coordinate origins`

This supersedes the previous centering hypothesis as the primary visible root
cause for the Product Owner screenshots.

Confirmed coordinate-space issue:
- arrow geometry is calculated in the outer native Popover surface coordinate
  space;
- after moving arrow inside the animated motion assembly, the arrow coordinates
  were applied in the inner motion-layer coordinate space;
- the outer Popover surface did not explicitly reset native Popover padding;
- therefore the two coordinate origins could differ by the user-agent Popover
  padding, shifting side arrows downward and top/bottom arrows horizontally.

Correction:
- outer geometry surface now has explicit `padding: 0`;
- geometry and animated visual assembly now share the same physical origin;
- governance rejects removal of the zero-padding invariant;
- Tooltip unit coverage verifies zero physical padding on all four sides.

Verification distinction:

The latest **Fully Green** verified checkout before this correction is:

`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Product Owner local evidence at that checkout:
- all governance/lint PASS;
- 87 / 87 test files PASS;
- 618 / 618 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- final zero-warning production build PASS.

The new `84d5fd9...` source requires a fresh `npm run verify:clean` before it
can become the new Fully Green baseline.

Product status:
- Tooltip V1 remains the active Product Owner blocker;
- no later page review until technical re-verification and runtime acceptance.

Read `NEW_CHAT_HANDOFF.md` for the complete state and exact next action.
