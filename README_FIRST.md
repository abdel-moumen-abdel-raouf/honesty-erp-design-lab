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

Latest source-affecting SearchBox correction:

`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`
`fix(inputs): preserve native closed-popover display state`

This is the first correction that addresses the literal CSS root cause of the
Product Owner's "closed but still clickable" SearchBox dropdown defect.

Exact root cause:
- `.search-box__popup` is a native `popover="manual"` element;
- native closed Popover visibility depends on the browser-owned
  `display: none` state;
- production CSS incorrectly declared `display: grid` on the base
  `.search-box__popup` rule;
- that author declaration overrides the hidden display behavior when the Popover
  is closed;
- the base rule simultaneously uses opacity/transform as the hidden visual
  state, so the closed surface can be invisible while still existing as a fixed
  interactive hit-test box;
- this exactly explains why lower inputs could not receive the click and why an
  invisible result row could be activated after the dropdown appeared closed.

Correction:
- base `.search-box__popup` no longer declares `display`;
- `display: grid` is applied only in
  `.search-box__popup:popover-open`;
- native Popover closed `display:none` is therefore preserved;
- field governance rejects any future base-rule display override and requires
  the `:popover-open` grid rule.

Previous close-lifecycle hardening remains useful defense in depth, but it was
not the literal root cause of the persisted invisible hit box.

Verification status:
- current source is NOT yet Fully Green;
- fresh full `npm run verify:clean` is mandatory;
- Inputs remains Product Owner BLOCKED until the exact runtime reproduction is
  re-tested and accepted.

Read `NEW_CHAT_HANDOFF.md` for complete state.
