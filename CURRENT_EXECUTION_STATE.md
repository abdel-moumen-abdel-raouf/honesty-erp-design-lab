# CURRENT EXECUTION STATE — HONESTY ERP Design Lab

## Repository

`abdel-moumen-abdel-raouf/honesty-erp-design-lab`

Local Product Owner workspace:

`C:\Users\Misrtech\Sources\WEBSITES\honesty-erp-design-lab`

Branch:

`main`

## Current GitHub checkpoints

Live `main` must always be verified directly at the start of a new chat with:

`git rev-parse origin/main`

Do not treat a documentation SHA written inside this file as an eternal HEAD,
because updating this file itself creates a newer docs commit.

Persistent continuity protocol merge checkpoint:

`66abb185c3e837d9c659ed56106cf668d46103c5` —
`docs(handoff): establish persistent continuity protocol`

Current runtime/source checkpoint:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`

Exact-reference V5 implementation checkpoint:

`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` —
`fix(check-box): implement exact Product Owner reference V5`

## Current verification state

Product Owner locally ran `npm run verify:clean` at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6`.

That run advanced successfully through:

- Single App theme authority;
- route-page ERP-only authoring;
- Component Token framework;
- system colors;
- ErpText;
- ErpIcon registry/governance;
- ErpButton;
- ErpTooltip;
- ErpField;
- ErpOverlay;
- ErpConfirm.

Angular template lint then stopped with exactly two CheckBox accessibility
findings because the outer CheckBox `<label>` owned a click handler.

That defect is now corrected and merged at
`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8`.

Fresh canonical verification **after** that fix is still pending.

Immediate technical gate:

`npm run verify:clean`

Do not call the current CheckBox checkpoint Fully Green until that command
passes on the current main.

## Current Product Owner visual state

`ErpCheckBox` is the active review item.

Current binding visual authority:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

Source reference:

`erp-checkbox-3.html`

Reference identity recorded in the contract:

SHA-256:

`63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`

Product Owner decision:

- reproduce the supplied reference design as closely as possible;
- system colors/tokens replace the reference palette;
- do not silently reinterpret or selectively omit reference design capabilities.

Current V5 CheckBox contract includes:

- modes: `checkbox | switch | tile`;
- variants: `outline | filled | soft`;
- sizes: sm 18px / md 22px / lg 28px / xl 36px;
- SVG check/dash stroke animation;
- Switch track/thumb/sweep behavior;
- Tile mode;
- read-only / disabled / invalid / indeterminate;
- exact-reference motion timings;
- Select All / indeterminate review behavior.

Technical PASS will not equal Product Owner visual approval.

## Current execution order

The Product Owner selected this next reference batch order:

1. `ErpCheckBox` — current active item;
2. `ErpRadioBox`;
3. `ErpEmptyState`;
4. `ErpSelect`.

Do not open RadioBox until CheckBox V5:

1. passes fresh `npm run verify:clean`;
2. completes Product Owner Light/Dark runtime/visual review;
3. has all current Product Owner findings closed.

The source reference's single-select Tile example uses native radio semantics and
therefore belongs to the RadioBox/RadioGroup wave, not to CheckBox.

## Permanent execution laws

- Product Owner is final product/visual authority.
- technical green != Product Owner visual approval/freeze.
- no new component while currently implemented component problems remain open.
- future work proceeds bottom-up by dependency.
- the next candidate is the lowest unresolved dependency, not merely the next
  historical roadmap row.
- any newly opened visual component requires a Product Owner supplied visual
  reference or explicit Product Owner authorization to work without one.
- reference palette does not override Honesty ERP color/token architecture
  unless Product Owner explicitly says otherwise.
- no Angular Material / Bootstrap / Tailwind or new dependencies without
  explicit authorization.
- `npm run verify:clean` remains the canonical executable technical gate.
- do not raise/suppress style budgets or quality gates to get green.

## Mandatory continuity maintenance protocol

This file is **current-state authority** and must be updated in the same
execution cycle whenever any of the following changes:

- current Git checkpoint;
- implementation status;
- blocker;
- verification result;
- Product Owner finding/decision;
- active component;
- execution phase/stage;
- immediate next action.

It is forbidden to leave the newest execution state only inside chat history.

For every substantive implementation cycle, synchronize together:

1. `CURRENT_EXECUTION_STATE.md`;
2. `README_FIRST.md`;
3. `NEW_CHAT_HANDOFF.md`;
4. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
5. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Also update when applicable:

- `DECISIONS_AND_CONSTRAINTS.md`;
- `GIT_CHECKPOINTS.md`;
- current batch contract;
- current component-specific contract;
- any family/system contract whose behavior changed.

Do not hand a substantive checkpoint to the Product Owner until context,
execution state, and stage/roadmap documentation are synchronized.
