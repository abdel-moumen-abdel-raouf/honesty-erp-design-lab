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

Latest verification-follow-up source checkpoint:

`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`
`fix(test): isolate direct-route app integration cases`

Product Owner local verification at:
`f8ab6433636f6adefdd43d7613545aa87041560f`

confirmed:
- every governance gate PASS;
- Angular lint PASS;
- SearchBox suite 11/11 PASS;
- Temporal picker suite 14/14 PASS;
- Selection picker suite 16/16 PASS;
- Inputs showcase suite 14/14 PASS;
- 86 / 87 test files PASS;
- 625 / 626 tests PASS.

The only remaining failure was:
`src/app/app.spec.ts`
`renders Foundation, Inputs, and Overlays through the same direct document model`

The test timed out at approximately 5.2 seconds because one Vitest test executed
three lazy-route navigations and complete route renders sequentially.

No runtime/production failure was demonstrated.

Correction:
- the same direct single-document assertions are now preserved as three isolated
  route integration tests;
- no timeout limit was increased;
- no production source changed.

Verification distinction:

Latest prior **Fully Green** checkout remains:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Current source is still **verification pending** until a fresh full
`npm run verify:clean` completes end-to-end.

Inputs remains Product Owner BLOCKED pending technical green + runtime/Light/Dark
re-review. Tooltip runtime re-review also remains pending.

Read `NEW_CHAT_HANDOFF.md` for complete state.
