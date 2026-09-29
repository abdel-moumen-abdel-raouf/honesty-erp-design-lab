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

Latest source-affecting verification follow-up:

`92840de9c670edd32b05c1485f50c2e61e68fead`
`fix(test): flush staged picker state before confirmation`

The Product Owner ran `npm run verify:clean` at:

`a85c13899613b239ea28c848b61af3454b3fe5f0`

That run confirmed:
- all governance gates PASS, including Button, Tooltip, Field, and Overlay;
- Angular lint PASS;
- the test runner reached 87 test files;
- 84 / 87 test files passed;
- 620 / 626 tests passed;
- exactly six tests failed.

Failure diagnosis:
- two SearchBox tests were stale test-harness assumptions after moving result
  activation into `ErpSelectionTile`;
- one assertion read host signal evidence before a fixture change-detection pass;
- one keydown event was created without `bubbles: true`, so it never reached the
  SelectionTile host listener although real browser key events bubble;
- three Selection picker tests and one Temporal picker test pressed Confirm
  immediately after changing staged state without allowing the overlay footer
  disabled state to render; Confirm therefore remained disabled in the test DOM
  and the close promise timed out.

The production runtime contract did not require alteration for these six failures.

Test-only correction:
- add the required `fixture.detectChanges()` after staged selection changes;
- dispatch the SearchBox End key as a bubbling browser-like KeyboardEvent.

Verification distinction:

Latest prior **Fully Green** checkout remains:

`50ae8e5f9f9cc537435217a644548c10bd097ecb`

Current source is **verification pending**.
A fresh full `npm run verify:clean` is mandatory from current `main`.

Inputs remains Product Owner BLOCKED until full technical green plus runtime/Light/Dark re-review.
Tooltip runtime re-review also remains pending.

Read `NEW_CHAT_HANDOFF.md` for the complete state.
