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

Latest source-affecting Inputs correction checkpoint:

`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`
`fix(inputs): guard Now against Time bounds`

This checkpoint contains the Product Owner-authorized Inputs correction unit,
including:

- SearchBox three-mode contract: `dropdown | modal | inline`;
- dropdown query/result separation;
- functional result filtering and selection;
- combobox/listbox/option semantics for dropdown mode;
- modal search through shared `ErpOverlayManager`;
- explicit dropdown Close action;
- anchored dropdown width tied to the complete visual Field control width,
  viewport permitting;
- noninteractive/inert leaving phase;
- deterministic keyboard navigation that skips disabled results;
- inline clear restores editor focus;
- selection-family Confirm disabled until a valid staged selection exists;
- temporal Confirm disabled until a valid staged selection exists;
- OverlayRef refuses disabled/loading frame actions even if requested directly;
- Time and DateTime `الآن`;
- Now respects `minuteStep`, and Time Now is disabled when current stepped time
  violates min/max;
- DateRange previous/next week and previous/next month calendar-period presets;
- MoneyBox optional per-instance `digitSet` override with Preferences fallback;
- Inputs review evidence includes Latin and Arabic-Indic MoneyBox instances;
- temporal empty-state placeholders are Arabic-first;
- single-surface review groups span the full review grid width;
- Field/Overlay governance was updated to enforce the corrected contracts.

Verification distinction:

The latest **Fully Green** verified checkout remains:

`50ae8e5f9f9cc537435217a644548c10bd097ecb`

The current source also contains the later Tooltip Popover-origin correction plus
the Inputs correction above. Those newer source changes have not yet been
verified together by a fresh full:

`npm run verify:clean`

Therefore current source status is **implemented / verification pending**, not
Fully Green.

Product review status:
- Inputs remains BLOCKED pending technical verification and Product Owner
  Light/Dark/runtime re-review.
- Tooltip Popover-origin correction also remains pending runtime re-review.

Read `NEW_CHAT_HANDOFF.md` for the complete state and exact next action.
