# ErpEmptyState — Exact Product Owner Reference Contract V1

## Authority

Product Owner reference supplied on 2026-10-04:

`erp-empty-state.html`

Recorded SHA-256:

`935d1546f3e5d58f3b280fe30433888670d086f1a53f786a9b096ac3966ee048`

Product Owner instruction:

> implement the reference as-is with all of its features and design, while
> replacing the reference palette with Honesty ERP system colors.

This file is the binding visual/product contract for the current
`ErpEmptyState` wave.

## Reference-owned scenarios

The exact five reference variants are mandatory:

- `no-data`;
- `no-search`;
- `error`;
- `forbidden`;
- `custom`.

Their Arabic default title/description/action visibility and labels are copied
from the reference scenario model.

A notable reference behavior is preserved deliberately:

- `no-search` has a dedicated Search illustration;
- its scenario default nevertheless sets Illustration visibility to false;
- consumers/review controls may reveal it through the ordinary Illustration
  visibility override.

## Exact component regions

The component owns the same five regions as the reference:

1. Illustration;
2. Title;
3. Description;
4. Actions;
5. Extra.

Each region remains independently controllable.

Actions preserve the exact three-level vocabulary:

- Primary;
- Secondary;
- Tertiary.

The production implementation uses `ErpButton` as the approved button gateway
instead of reference-owned raw native buttons. This substitution does not
change the action hierarchy or labels.

Title/description/extra text use `ErpText` as the approved production text
gateway.

## Illustration contract

The five reference SVG compositions are retained as component-owned decorative
illustrations:

- No Data floating document/card + rotating dotted circle + plus badge;
- No Search radar/search composition;
- Error danger halo + alert mark;
- Forbidden warning halo + lock;
- Custom document/chart + success badge.

Illustration geometry/path data is reference-owned.

Reference palette literals are not retained. Every SVG fill/stroke/shadow role
resolves through EmptyState Component Tokens into Honesty ERP semantic colors.

Consumers may replace the default illustration through
`erpEmptyStateIllustration` content projection.

## Content customization

The following reference capabilities remain public:

- title override;
- description override;
- per-region visibility;
- per-action visibility;
- primary/secondary/tertiary action label overrides;
- custom Illustration projection;
- custom Extra projection;
- Extra prefix/link label/link href.

## Motion contract

Reference entrance wave is retained:

- spring entrance duration: 550ms;
- Title delay: 90ms;
- Description delay: 170ms;
- Actions delay: 250ms;
- Extra delay: 330ms;
- easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

Reference continuous illustration motions are retained:

- floating main object;
- floating badge;
- breathing shadow;
- slow spin;
- center pulse;
- search scan;
- radar waves;
- sparkle;
- danger/warning halo;
- alert shake.

Reference motion speed values remain:

- 0.5x;
- 1.0x;
- 1.5x.

The reference Angular API declares
`illustrationAnimation: 'float' | 'pulse' | 'none'` while its visible demo
selector exposes Float and None. Production honors the full declared union.

`replayEntrance()` is the production equivalent of the reference replay API.

`prefers-reduced-motion: reduce` disables all EmptyState animations and
transitions.

## Accessibility

The production host preserves:

- `role="status"`;
- `aria-live="polite"`;
- decorative SVGs as `aria-hidden="true"`.

Production additionally uses `aria-atomic="true"` so a scenario/content update
is announced coherently.

## Theme and direction boundary

The reference demo owns local Theme and Direction switches.

Honesty ERP does not copy that ownership.

Frozen project architecture remains:

- App is the only Light/Dark authority;
- EmptyState has no `theme` input and no component-owned `data-theme`;
- EmptyState inherits RTL/LTR from its document/container context;
- review evidence may place the component in RTL or LTR containers;
- system colors resolve automatically through the global theme.

This is the required adaptation of the Product Owner instruction to use system
colors.

## System-color mapping

Reference color roles map to Honesty ERP Semantic -> Component Tokens:

- primary/secondary/muted text -> system text roles;
- surface/subtle surface -> system surface roles;
- subtle/default borders -> system border roles;
- primary illustration/action color -> Brand Primary roles;
- Error illustration -> Feedback Danger roles;
- Forbidden illustration -> Feedback Warning roles;
- Custom success illustration -> Feedback Success roles;
- links/focus -> Brand Primary / Action Focus roles;
- shadows -> system overlay/elevation-backed semantic roles.

No reference hexadecimal, rgb/hsl, or component-owned Light/Dark palette is
allowed in production EmptyState source.

## Design Lab evidence

Dedicated route:

`/controls/empty-states`

The review route must demonstrate:

- five scenario buttons;
- scenario selector;
- independent Parts toggles;
- independent Action toggles;
- animation enable/disable;
- Float / Pulse / None motion;
- 0.5x / 1.0x / 1.5x speed;
- Replay;
- live Title/Description/Primary-label editing;
- RTL/LTR container evidence;
- functional action outputs;
- five-variant matrix;
- global Light/Dark inheritance.

The route itself must use ERP production/review primitives only.

## Quality gates

The implementation is not technically green until:

```text
npm run erp-empty-state:check
npm run erp-empty-state:check:self-test
npm run component-tokens:check
npm run route-pages:check
npm run test -- --watch=false
npm run verify:clean
```

Technical green is still separate from Product Owner visual acceptance.


<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_START -->
## 2026-10-05 — ErpEmptyState canonical verification is Fully Green

Canonical verification was run from the current EmptyState checkpoint after the
projection-directive lint correction.

The first complete run established:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production compilation completed;
- the zero-warning gate detected one component-style budget warning only:
  `empty-state.scss` was 4.34 kB, 341 bytes above the unchanged 4.00 kB
  warning threshold.

The warning was corrected without changing selectors, values, APIs, tokens,
visual behavior, tests, budgets, timeouts, or retries:

- existing Title/Description/Actions/Extra rules moved verbatim from
  `empty-state.scss` into `empty-state-content.scss`;
- the new style file is loaded immediately after the base style;
- EmptyState governance now includes the split style in the same production
  visual contract.

A fresh complete `npm run verify:clean` then passed:

- all governance checks PASS;
- Angular lint PASS;
- 91/91 test files PASS;
- 710/710 tests PASS;
- `typecheck:app` PASS;
- `typecheck:spec` PASS;
- production build PASS;
- initial production bundle: 373.68 kB;
- `Zero-warning build gate: PASS`;
- Angular warnings: 0.

Current product state:

- `ErpEmptyState` is a Fully Green technical candidate;
- this does not equal Product Owner visual approval;
- the immediate gate is Product Owner runtime/Light/Dark review of
  `ErpEmptyState`;
- `ErpSelect` remains unopened and no Selection-family implementation is
  authorized.
<!-- CHATGPT_EMPTY_STATE_FULLY_GREEN_2026_10_05_END -->
