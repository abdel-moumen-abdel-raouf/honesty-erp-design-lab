# GIT CHECKPOINTS — HONESTY ERP Design Lab

These are technical/history checkpoints. They are **not** Product Owner visual
approvals unless explicitly stated.

## Live main rule

Always resolve live `origin/main` directly at session start. This file records
named checkpoints; it does not claim that its own latest docs SHA is an eternal
repository HEAD.

## Continuity protocol checkpoint

- `66abb185c3e837d9c659ed56106cf668d46103c5`
  `docs(handoff): establish persistent continuity protocol`

## Current CheckBox runtime/source

- `4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`
  `fix(check-box): move readonly click guard to native input`

This fixes the two Angular template-lint accessibility findings from the first
local V5 canonical run.

Fresh `npm run verify:clean` after this checkpoint is pending.

## Exact-reference CheckBox V5

- `4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`
  `fix(check-box): implement exact Product Owner reference V5`

At this checkpoint the Product Owner local `verify:clean` passed every
project governance gate through ErpConfirm, then Angular template lint stopped
on two outer-label click accessibility errors.

Visual/reference implementation itself was not changed by the subsequent
lint follow-up.

## Previous CheckBox reference evolution

Earlier CheckBox V1–V4 checkpoints are historical/superseded for visual
authority.

Current visual authority is:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

## Button Composites

ButtonGroup / SplitButton / FabMenu correction previously reached full
technical green before the CheckBox reference wave.

Those components are not the currently active implementation unit.

## Next checkpoint rule

Whenever a substantive code/docs/verification cycle completes:

1. add the new current/source/verification checkpoint here;
2. update `CURRENT_EXECUTION_STATE.md`;
3. synchronize the four continuity authority files;
4. clearly distinguish:
   - runtime/source checkpoint;
   - docs-only checkpoint;
   - verified technical checkpoint;
   - Product Owner visual approval checkpoint.

Do not call a docs-only HEAD a freshly verified source checkpoint unless the
underlying source was actually verified.
