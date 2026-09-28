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

Current no-iframe implementation source checkpoint:

`d703ef0c8f47264902ca55b902c1488f99b56bf9`
`style(lab): normalize direct shell markup`

Implementation chain:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a` — `refactor(lab): remove iframe preview architecture`
- `d703ef0c8f47264902ca55b902c1488f99b56bf9` — `style(lab): normalize direct shell markup`

Implemented source state:
- normal single-document Angular App;
- one direct `router-outlet` for every route;
- no iframe / embedded-preview mode;
- no Inputs/Overlays rendering exception;
- Desktop/Tablet/Mobile preview controls removed because same-document resizing cannot truthfully simulate viewport media queries;
- Screenshot retained as direct same-document capture;
- screenshot filenames include the current `light` / `dark` theme;
- one App theme authority and one App-level `ErpOverlayHost`.

Verification distinction:

The latest **fully verified** source checkpoint remains:

`b1b20585adcb272f17835ef8182935353a67d243`
`fix(tooling): close remaining zero-warning gaps`

The new no-iframe source is implemented and independently source-reviewed, but must
not be called Fully Green until a fresh:

`npm run verify:clean`

passes against the new source.

Read `NEW_CHAT_HANDOFF.md` for the complete state and exact next authorized action.
