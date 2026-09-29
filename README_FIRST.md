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

Latest source-affecting runtime correction:

`4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`
`fix(inputs): harden SearchBox popover teardown`

Product Owner runtime re-test found the SearchBox dropdown still retained an
effective interaction/focus footprint after selection and apparent closure:
- clicking a later field below the SearchBox could fail to focus it;
- a different SearchBox result could be selected as if the closed dropdown were
  still active;
- the review SearchBox instances did not expose the standard clear action.

Root cause in the close lifecycle:
- SearchBox entered a `leaving` phase but delayed native
  `hidePopover()` until the exit-duration timer completed;
- focus restoration was also delayed until that timer completed;
- therefore a visually closing/closed control could still own native top-layer
  lifetime and could later steal focus from a field the user activated next.

Correction:
- native Popover teardown now occurs immediately when dropdown close begins;
- open-stack/dismissal listeners are released immediately;
- surface becomes inert, pointer-noninteractive, and aria-hidden immediately;
- Selection/Close/Escape focus restoration happens synchronously in the close
  event, never from a later timer;
- the later timer only finalizes internal phase/bookkeeping;
- `AnchoredOverlayController.hide()` now attempts `hidePopover()` directly
  inside try/catch instead of depending on `:popover-open` matching first;
- tests prove the Popover leaves the top layer immediately and that a field
  focused afterward retains focus even when close timers complete;
- SearchBox review instances now enable inherited `clearable`, so a committed
  search value exposes the standard clear action.

Verification distinction:

The latest previously verified technical baseline remains
`50ae8e5f9f9cc537435217a644548c10bd097ecb`.
The current source has not yet completed a fresh full `npm run verify:clean`
after this runtime correction.

Inputs remains Product Owner BLOCKED until:
1. fresh technical verification;
2. Product Owner runtime re-test confirms the stale/invisible dropdown behavior
   is gone;
3. Light/Dark Inputs review is accepted.

Read `NEW_CHAT_HANDOFF.md` for the complete state.
