# ErpCheckBox — Product Owner Exact Reference V5

## Authority

Product Owner supplied:

`erp-checkbox-3.html`

Reference identity captured at implementation time:

- size: 59,910 bytes;
- SHA-256:
  `63d062383be8103cca172078d7ccf9f314779d4e829cd11416ebc199ddb5b6bf`.

and explicitly required the production result to visually match that demo while
using Honesty ERP system colors instead of the demo palette.

This V5 supersedes all previous CheckBox V1/V2/V3/V4 visual assumptions.

The supplied file is template-level authority for:

- reusable CheckBox markup structure;
- checkbox / switch / tile modes;
- outline / filled / soft variants;
- sm / md / lg / xl geometry;
- title + description hierarchy;
- native checked / indeterminate behavior;
- read-only / invalid / disabled presentation;
- switch track/thumb math and direction behavior;
- tile geometry;
- check/dash stroke animation;
- box pop / pressed / focus presentation;
- reduced-motion behavior;
- select-all / indeterminate review behavior.

The supplied literal Light/Dark colors are **not** authority. Production color
roles must resolve through the Honesty ERP Semantic -> Component Token chain.

## Source-derived contract

### Modes

`mode: 'checkbox' | 'switch' | 'tile'`

Default: `checkbox`.

All three modes retain one authoritative native
`input[type="checkbox"]` and the same CVA value contract.

### Variants

`variant: 'outline' | 'filled' | 'soft'`

Default: `outline`.

Variants are pure Component Token swaps. They must not fork markup or semantics.

### Standalone control

`hideText` suppresses visible title/description while retaining the required
label as the native input accessible name.

### Read-only

`readOnly` is an interaction guard because HTML checkbox has no functional
readonly attribute.

Read-only:

- remains focusable;
- exposes `aria-readonly="true"`;
- blocks label pointer activation;
- blocks Space/Enter mutation;
- restores the authoritative CVA value if a change event is forced;
- uses read-only component surface/border tokens.

### Exact size scale

- sm = 18px;
- md = 22px;
- lg = 28px;
- xl = 36px.

The shared `ErpFieldSize` type still contains xxl/xxxl/xxxxl. CheckBox accepts
those values for compatibility but maps them to the xl CheckBox geometry.

### Core geometry

Title-line optical alignment is derived from:

`(font-size × line-height - control-size) / 2`.

Description gap is derived from control size.

### Check / dash mark

The reference uses one internal SVG mark with two normalized paths:

- check: `M6 12 10.2 16.2 18 8`;
- dash: `M6.5 12h11`;
- `pathLength="1"`.

The mark is production-owned internal CheckBox graphics. This is a bounded
exception to consumer-level ErpIcon governance; raw SVG remains forbidden for
Feature/Page authors.

Check and dash use stroke-dashoffset draw/erase behavior.

### Switch geometry

- track ratio = 1.85;
- track padding ratio = 0.13;
- thumb = track height − 2 × padding;
- travel = track width − 2 × padding − thumb.

The checked fill sweeps across the resting track. RTL changes only logical fill
origin and signed thumb travel.

### Tile mode

Tile mode is a production CheckBox mode, not a showcase wrapper.

The CheckBox label itself owns:

- full-width selectable surface;
- mode-specific padding;
- tile radius;
- hover surface/border/elevation;
- pressed scale;
- selected surface/border/elevation;
- outer focus ring.

### Variants and system colors

The reference palette maps to ERP roles:

- text -> system text primary/muted;
- surface -> system surface default/elevated/canvas;
- border -> system border default/strong;
- accent fill -> current ERP tone solid/action role;
- accent soft -> current ERP tone subtle role;
- danger -> Feedback Danger roles;
- focus -> system action focus role;
- tile/thumb elevation -> system elevation roles.

No reference hex, local theme selector, or component-owned Light/Dark branching
is allowed.

### States

Required visual/state matrix:

- default;
- checked;
- indeterminate;
- disabled;
- read-only;
- invalid;
- invalid + checked;
- Switch off/on/disabled/invalid.

Native user activation exits indeterminate. An external change of the
`indeterminate` input may re-arm it.

Required validation derives danger automatically and returns to the supplied
status after a valid selection.

### Motion

The component preserves the supplied motion contract:

- instant = 90ms;
- fast = 140ms;
- base = 220ms;
- check draw = 300ms;
- erase = 150ms;
- pop = 240ms;
- draw delay = 70ms;
- the supplied standard/out/spring/draw/erase cubic-bezier curves.

### Reduced motion

Reduced-motion disables the pop keyframe and collapses component transitions to
the supplied 1ms reduced-motion duration.

## Single-select tile boundary

The supplied file contains a separate "Tile mode — single select" section using
native `input[type="radio"]`.

That section is not implemented by pretending a CheckBox is a radio.

It belongs to the next Product Owner-authorized `ErpRadioBox` /
`ErpRadioGroup` wave.

## Current implementation ownership

Runtime:

- `src/app/controls/check-box/check-box.ts`
- `src/app/controls/check-box/check-box.html`

Component styles:

- `check-box-token-frame.scss`
- `check-box-token-geometry.scss`
- `check-box.scss`
- `check-box-mark.scss`
- `check-box-states.scss`
- `check-box-switch.scss`
- `check-box-tile.scss`
- `check-box-tone-facets.scss`
- `check-box-status-facets.scss`
- `check-box-variant-facets.scss`
- `check-box-sizes.scss`

Component Tokens:

- `src/styles/foundation/components/check-box/_tokens.scss`

Review evidence:

- `src/app/showcase/input-controls/input-controls.*`

Tests/governance:

- `src/app/controls/check-box/check-box.spec.ts`
- `src/app/showcase/input-controls/input-controls.spec.ts`
- `tools/controls/check-erp-field-governance.mjs`
- `tools/icons/check-erp-icon-governance.mjs`

## Verification

Before Product Owner runtime/visual review:

```text
npm run component-tokens:check
npm run erp-icon:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Technical green does not equal Product Owner visual approval.

RadioBox remains unopened until this exact-reference CheckBox wave is green and
visually accepted.


## 2026-10-04 — read-only native-click accessibility follow-up

Product Owner local `npm run verify:clean` at
`4c629875fb2cb1ee3e5d9c0ae2007ed0f6d764a6` advanced through:

- all project governance gates PASS;
- ErpIcon governance PASS with the bounded CheckBox SVG exception;
- ErpField governance PASS.

Angular template lint then stopped with exactly two accessibility errors on the
outer CheckBox `<label>` because V5 had placed a `(click)` read-only guard
on that non-focusable label.

The visual/reference implementation was not changed.

Bounded correction:

- outer label owns no click handler;
- the read-only pointer guard now belongs to the authoritative native
  `input[type="checkbox"]`;
- `handleNativeClick` calls `preventDefault()` only while `readOnly=true`;
- native Space/Enter prevention remains on the focusable checkbox input;
- the existing `change` handler still restores the authoritative CVA value as
  a defensive fallback if a change event is forced;
- unit tests now prove read-only native click is default-prevented;
- ErpField governance requires native click ownership and rejects any click
  handler on the outer CheckBox label.

This follow-up changes no visual geometry, tokens, modes, variants, motion,
showcase layout, or Product Owner reference mapping.

Fresh `npm run verify:clean` remains mandatory.


## 2026-10-04 — read-only lint follow-up merged checkpoint

The accessibility/lint follow-up was squash-merged to `main` at:

`4c7cfe502b14cb594dfafc1043d2e14a5ecb1db8` —
`fix(check-box): move readonly click guard to native input`.

Post-merge static audit on `main`:

- 13 read-only/lint ownership predicates checked;
- 13 PASS;
- 0 mismatches.

No visual/reference implementation changed after the exact-reference V5 commit.
Fresh local `npm run verify:clean` remains pending.
