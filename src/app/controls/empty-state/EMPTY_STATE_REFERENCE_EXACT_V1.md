# ErpEmptyState — Exact Product Owner Reference Contract V1

## 2026-10-10 — Dedicated Workbench evidence closure

The dedicated `/components/empty-state` page keeps exactly one primary live API
target and now restores the complete five-scenario reference/state evidence on
demand. Reproducible Light/Dark RTL/LTR desktop/narrow evidence lives at
`docs/review-evidence/erp-empty-state/v1-internal-review/`. Internal browser
review reproduced narrow extra-action text clipping; EmptyState-owned wrapping
was corrected and final measurements record zero clipping, page overflow,
broken images, or browser diagnostics. Desktop illustrations measure 160 px and
narrow illustrations 108 px as required by the current contract.

The originally recorded `erp-empty-state.html` file was not available in the
current environment for a fresh source overlay. The recorded hash remains
historical authority, but this review does not invent unavailable measurements
or claim a new pixel comparison. The candidate is technically and internally
reviewed; Product Owner visual acceptance remains pending. Focused regression
passes 4/4 files and 48/48 tests. Canonical verification passes 128/128 files
and 812/812 tests, both typechecks, all governance/lint, and the zero-warning
418.32 kB / 92.91 kB production build.

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

Product Owner superseding illustration decision on 2026-10-05:

- the five component-owned SVG compositions are replaced by supplied Lottie
  JSON artwork;
- Lottie artwork colors are asset-owned for this wave and are not converted
  into CSS variables or runtime recoloring rules;
- component chrome, typography, actions, surfaces, focus, and interaction
  remain governed by Honesty ERP Semantic and Component Tokens;
- the supplied artwork must render transparently without JSON or CSS
  backgrounds.

## Reference-owned scenarios

The exact five reference variants are mandatory:

- `no-data`;
- `no-search`;
- `error`;
- `forbidden`;
- `custom`.

Their Arabic default title/description/action visibility and labels are copied
from the reference scenario model.

The Product Owner superseded the original `no-search` hidden-illustration
behavior. The `no-search` Lottie is now visible by default, matching the other
four scenarios. Consumers may still hide it through the ordinary Illustration
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

The Product Owner-supplied Lottie mapping is exact:

- `no-data` -> `/lottie/empty-state/no-data.json`;
- `no-search` -> `/lottie/empty-state/no-search.json`;
- `error` -> `/lottie/empty-state/error.json`;
- `forbidden` -> `/lottie/empty-state/forbidden.json`;
- `custom` -> `/lottie/empty-state/custom.json`.

Asset inspection established:

| Variant | Composition | FPS | In / Out | Embedded / external assets | Background correction |
| --- | --- | ---: | ---: | --- | --- |
| `no-data` | 800 x 600 | 30 | 0 / 91 | none | none |
| `no-search` | 500 x 500 | 25 | 0 / 273 | four embedded transparent PNG assets; no external references | none |
| `error` | 241.12 x 215 | 25 | 28 / 66 | none | none |
| `forbidden` | 1000 x 1000 | 60 | 0 / 60 | none | none |
| `custom` | 1278 x 1239 | 60 | 0 / 221 | internal precompositions only; no external references | removed one white full-canvas `background Outlines` layer from the project copy |

The source files under Downloads remain unchanged. Only the project-owned
`custom.json` copy removes the explicit full-canvas background layer.

The internal Lottie renderer uses SVG with
`preserveAspectRatio="xMidYMid meet"`. The responsive illustration box remains:

```scss
inline-size: clamp(6.75rem, 20vw, 10rem);
block-size: clamp(6.75rem, 20vw, 10rem);
```

This Product Owner-approved increase replaces the earlier
`clamp(5.5rem, 16vw, 8.25rem)` bounds for all five default illustrations. It
is centered, does not crop or stretch artwork, and adds no CSS background.
The default Lottie renderer is internal to EmptyState and does not create a
public Lottie component family.

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

The supplied Lottie timelines now own continuous artwork motion. Runtime rules
are:

- `motionSpeed` uses Lottie's `setSpeed()` with 0.5x, 1.0x, or 1.5x;
- `animated=false` pauses on the first frame and disables Entrance motion;
- `illustrationMotion='none'` pauses on the first frame;
- `illustrationMotion='float'` plays the asset timeline without an extra
  floating transform;
- `illustrationMotion='pulse'` plays the asset timeline with one subtle local
  wrapper pulse;
- `replayEntrance()` restarts both Entrance and the Lottie timeline when motion
  is allowed;
- changing the variant destroys the prior `AnimationItem` before loading the
  next asset;
- component destruction destroys the active `AnimationItem` and removes the
  media-query listener.

Reference motion speed values remain:

- 0.5x;
- 1.0x;
- 1.5x.

The reference Angular API declares
`illustrationAnimation: 'float' | 'pulse' | 'none'` while its visible demo
selector exposes Float and None. Production honors the full declared union.

`replayEntrance()` is the production equivalent of the reference replay API.

`prefers-reduced-motion: reduce` is enforced in both CSS and JavaScript. It
prevents autoplay and looping, pauses Lottie at the first frame, disables the
Entrance/pulse effects, and responds to media-query changes during the
component lifetime.

## Accessibility

The production host preserves:

- `role="status"`;
- `aria-live="polite"`;
- decorative Lottie renderers as `aria-hidden="true"`.

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

Component-owned color roles map to Honesty ERP Semantic -> Component Tokens:

- primary/secondary/muted text -> system text roles;
- surface/subtle surface -> system surface roles;
- subtle/default borders -> system border roles;
- links/focus -> Brand Primary / Action Focus roles;
- shadows -> system overlay/elevation-backed semantic roles.

No hexadecimal, rgb/hsl, or component-owned Light/Dark palette is allowed in
production EmptyState TypeScript, templates, or CSS. The colors encoded inside
the Product Owner-supplied Lottie JSON artwork are the explicit asset-owned
exception for this wave. They are not component CSS and must not be silently
recolored.

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

<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_START -->
## 2026-10-05 — EmptyState runtime animation failure diagnosed and corrected

Product Owner runtime/visual review finding:

**EmptyState animation does not run in the browser.**

This finding reopens EmptyState despite the prior canonical technical green.
Technical PASS did not prove rendered CSS animation behavior.

Root cause:

- EmptyState used Angular's default Emulated view encapsulation;
- all `@keyframes honesty-empty-state-*` declarations lived in
  `empty-state-motion-keyframes.scss`;
- the `animation:` declarations that referenced those names lived in separate
  component stylesheets;
- Angular's ShadowCss scopes local keyframe declarations and only rewrites an
  animation reference when the corresponding local keyframe is known while
  processing that same stylesheet;
- therefore the detached keyframe declarations were emitted under scoped names
  while animation declarations in the other stylesheet(s) continued to
  reference the original names.

Correction:

- do not disable view encapsulation;
- do not move component-specific motion to global CSS;
- remove the detached `empty-state-motion-keyframes.scss` assembly;
- remove the monolithic `empty-state-motion-continuous.scss`;
- co-locate each keyframe definition with the animation rules that consume it;
- use bounded motion files:
  - `empty-state-motion-entry.scss`;
  - `empty-state-motion-float.scss`;
  - `empty-state-motion-search.scss`;
  - `empty-state-motion-status.scss`;
  - `empty-state-motion-reduced.scss`;
- keep each motion stylesheet below the component style warning budget before
  build processing;
- strengthen EmptyState governance so an animation/keyframe pair split across
  component stylesheets is rejected by self-test.

No reference geometry, color mapping, public API, scenarios, motion names,
durations, easing, speed contract, or reduced-motion behavior is intentionally
changed by this correction.

EmptyState is no longer considered Product Owner visually accepted or closed.
Fresh executable verification and fresh runtime Light/Dark animation review are
required after this correction.

`ErpSelect` remains unopened.
<!-- CHATGPT_EMPTY_STATE_RUNTIME_ANIMATION_SCOPING_FIX_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie runtime visibility repaired

Product Owner runtime review proved that the first Lottie migration was
technically green while every default illustration remained invisible. The
captured browser exception came from the manual runtime script error handler,
before `window.lottie`, `loadAnimation()`, JSON loading, `DOMLoaded`, or SVG
injection. The previous unit tests replaced the loader with a mock and therefore
did not prove real runtime delivery or rendered DOM output.

Repository diagnosis found the packaged
`node_modules/lottie-web/build/player/lottie_svg.min.js` file present. Before
the correction, the local dev URL `/vendor/lottie-web/lottie_svg.min.js`
returned HTTP 200 with `text/javascript` and real JavaScript, while every
Lottie JSON URL returned HTTP 200 with `application/json` and valid JSON. This
does not negate the Product Owner environment's script-load failure; it proves
that the copied-asset plus injected-global chain was environment-sensitive
rather than a damaged five-asset set.

The correction removes the copied runtime asset, manual `<script>` injection,
and all `window.lottie` dependency. EmptyState now lazy-imports the packaged
SVG-only ESM build through the Angular bundler, explicitly fetches and validates
each JSON response, passes `animationData` to Lottie, and exposes internal
`loading | ready | static | error` evidence. `ready` or `static` is reached only
after `DOMLoaded` and a generated SVG are both present. Runtime import,
HTTP/JSON, `loadAnimation`, `data_failed`, `error`, and missing-SVG failures are
surfaced through Angular's ErrorHandler instead of failing silently. Animation
listeners and the AnimationItem are cleaned up on replacement and destruction.

Browser runtime evidence on `/controls/empty-states` confirms generated SVG
output for `no-data`, explicitly enabled `no-search`, `error`, `forbidden`, and
`custom`. The scenario matrix keeps all five visible as static evidence.
`float` and `pulse` remain visible and playing; `none` and `animated=false`
remain visible on a static first frame; Replay returns the allowed animation to
playing state. Browser-emulated `prefers-reduced-motion: reduce` produced six
visible generated SVGs in static state with no playback. The approved responsive
clamp is unchanged.

Final technical verification for this correction: EmptyState governance
self-test PASS; EmptyState governance PASS; 92/92 test files and 728/728 tests
PASS; lint/governance PASS; app/spec typechecks PASS; production build PASS at
373.68 kB initial with zero Angular warnings; `npm run verify:clean` PASS.

This technical pass does not equal Product Owner visual approval. The immediate
gate remains Product Owner runtime Light/Dark review of EmptyState Lottie
visibility, artwork, responsive sizing, motion, replay, and reduced motion.
`ErpSelect` remains unopened; Selection Family, ItemPicker, ComboBox, and
SearchBox were not modified.

Commit scope: `fix(controls): restore empty-state lottie runtime`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_RUNTIME_REPAIR_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_START -->
## 2026-10-05 — no-search illustration default superseded

Product Owner superseded the original `no-search` hidden-illustration behavior.
The `no-search` Lottie is now visible by default, so all five EmptyState
scenarios default to visible illustrations. The exact asset mapping remains
`no-search -> /lottie/empty-state/no-search.json`; the ordinary explicit
`showIllustration=false` override remains supported.

The redundant Scenario Matrix `showIllustration=true` override was removed so
the review evidence now exercises the real scenario default. Unit tests prove
the default Lottie and explicit hide override; showcase tests prove the exact
asset; governance rejects a restored hidden default. Browser runtime evidence
confirmed immediate generated SVG output for `no-search`, playing `float` and
`pulse`, visible static `none`, and continued visibility in Light and Dark.

The Lottie runtime, dynamic import, fetch/readiness pipeline, reduced-motion,
lifecycle, sizing, speed, Replay, and JSON assets were not changed. 92/92 test
files and 728/728 tests passed; `npm run verify:clean` passed with zero Angular
warnings. Technical green does not equal Product Owner visual approval.
`ErpSelect` remains unopened.

Commit scope: `fix(controls): show no-search illustration by default`.
<!-- CHATGPT_EMPTY_STATE_NO_SEARCH_DEFAULT_VISIBLE_2026_10_05_END -->

<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_START -->
## 2026-10-05 — EmptyState Lottie illustration size enlarged

Product Owner runtime review found that all five Lottie illustrations were
visible and functional but relatively small. The shared responsive illustration
bounds now supersede `clamp(5.5rem, 16vw, 8.25rem)` with
`clamp(6.75rem, 20vw, 10rem)` for `no-data`, `no-search`, `error`,
`forbidden`, and `custom`. This is one size-contract correction only; the
runtime loader, JSON assets, variant mapping, reduced-motion, replay,
`motionSpeed`, lifecycle cleanup, text, actions, and colors are unchanged.

Runtime evidence covered all 20 combinations of five variants, Light/Dark, and
desktop/narrow viewports. Every specimen reached `ready`, injected an SVG with
`preserveAspectRatio="xMidYMid meet"`, stayed centered, preserved a 24px gap
to the title, and produced no page or stage horizontal overflow. The resolved
box was 160px square on desktop and 108px square at the narrow viewport.
`float` and `pulse` remained animated; `none`, `animated=false`, and a
page initialized with reduced motion retained a visible static SVG frame.
Replay remained ready and visible.

The bounded governance self-test and checker passed, 92/92 test files and
728/728 tests passed, and `npm run verify:clean` passed with zero warnings.
Technical green does not equal Product Owner visual approval. `ErpSelect`
remains unopened; the immediate gate remains Product Owner runtime/visual
review of the enlarged EmptyState illustrations.

Commit scope: `fix(controls): enlarge empty-state illustrations`.
<!-- CHATGPT_EMPTY_STATE_LOTTIE_SIZE_2026_10_05_END -->
