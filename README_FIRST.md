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

Latest source-affecting Inputs correction:

`cf91967291961037dd7f35d0e825fc4fb2da8312`
`fix(inputs): govern SearchBox results through SelectionTile`

This follows the Product Owner-authorized Inputs correction unit and fixes the
first demonstrated verification regression.

Local verification evidence at checkout
`a8b33f1fecbd8c468bd68add4281fe925c7845b5`:
- Overlay governance self-test PASS;
- `erp-overlay:check` PASS;
- zero-warning build self-test PASS;
- standalone `build:clean` PASS;
- production Angular build PASS;
- `Zero-warning build gate: PASS`;
- full `verify:clean` passed theme, route, token, color, text, and icon gates;
- full `verify:clean` stopped at `erp-button:check`.

Observed failure:
`src/app/controls/search-box/search-box.html:173:11`
used a raw native result `<button>` inside a concrete Control.

Correction:
- SearchBox dropdown results now use approved internal
  `ErpSelectionTile presentation="list"`;
- SelectionTile owns the native button, `role="option"`,
  `aria-selected`, disabled state, and focus API;
- SearchBox keyboard navigation focuses results through
  `viewChildren(ErpSelectionTile)`;
- SearchBox result visual state remains token-owned by the shared SelectionTile
  primitive;
- Field governance self-tests now require SelectionTile results instead of raw
  buttons.

Verification distinction:

Latest prior **Fully Green** checkout remains:

`50ae8e5f9f9cc537435217a644548c10bd097ecb`

The current source is **implemented / verification pending**.
A fresh full `npm run verify:clean` is mandatory from current `main`.

Inputs remains Product Owner BLOCKED until technical green plus runtime/Light/Dark
re-review. Tooltip runtime re-review also remains pending.

Read `NEW_CHAT_HANDOFF.md` for complete state.
