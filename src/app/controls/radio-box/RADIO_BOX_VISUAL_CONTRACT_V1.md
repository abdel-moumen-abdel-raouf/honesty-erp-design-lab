# ErpRadioBox — Product Owner Visual Contract V1

## Authority

On 2026-10-04 the Product Owner explicitly accepted the current
`ErpCheckBox` exact-reference V5 visual result and authorized `ErpRadioBox`
to be designed with the same method, visual language, and design discipline.

The accepted CheckBox authority remains:

`src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

This RadioBox contract adapts that approved family language to authoritative
native radio semantics. It does not turn RadioBox into a CheckBox variant.

The prior reference batch identified `erp-radiobox.html` for RadioBox. This
contract does not invent uninspected external-file details; the binding design
direction for this wave is the Product Owner's explicit instruction to use the
accepted CheckBox V5 method/design while preserving radio-specific semantics.

## Current source baseline

Current production RadioBox already owns:

- one authoritative native `input[type="radio"]`;
- boolean leaf CVA semantics;
- tone/status/size facets;
- fixed circular visual + centered dot;
- disabled/required validation;
- `ErpRadioGroup` composition for coordinated single selection.

The current visual implementation is pre-reference and must be rebuilt rather
than incrementally restyled.

## Inherited visual language

RadioBox reuses the accepted CheckBox V5 family language for:

- title + optional description hierarchy;
- spacing and optical text/control alignment;
- Light/Dark system-color resolution through Semantic -> Component Tokens;
- tone/status behavior;
- outline / filled / soft variant vocabulary;
- sm / md / lg / xl reference scale;
- hover / focus / pressed / disabled / read-only presentation;
- motion character and reduced-motion handling;
- full selectable Tile presentation;
- RTL-safe logical layout;
- review-evidence and state-matrix discipline.

CheckBox-only semantics must not leak into RadioBox.

## Native semantics

The native `input[type="radio"]` remains the sole leaf interaction and
accessibility owner.

Required invariants:

- selecting false -> true may publish one user change;
- activating an already selected radio must not toggle it false;
- no indeterminate state exists;
- no switch mode exists;
- the mark is one centered circular dot;
- the dot does not mirror in RTL;
- form/name/disabled/required semantics remain native;
- `ErpRadioGroup` remains the coordinated single-value owner for groups.

## Public RadioBox design contract

### Modes

`mode: 'radio' | 'tile'`

Default: `radio`.

- `radio`: circular control plus optional title/description.
- `tile`: full-width selectable single-choice surface while retaining the
  same native radio input and circular indicator.

### Variants

`variant: 'outline' | 'filled' | 'soft'`

Default: `outline`.

Variants are Component Token remaps only and never fork semantics.

### Content

Add:

- `description: string | null`;
- `hideText: boolean` for standalone visual evidence while retaining the
  required accessible label.

Title/description typography, gap, and alignment follow accepted CheckBox V5.

### Read-only

Add `readOnly: boolean` as an interaction guard because native radio has no
functional readonly attribute.

Read-only:

- remains focusable;
- exposes `aria-readonly="true"`;
- blocks pointer/Space/Enter value mutation;
- restores/preserves the authoritative CVA value;
- remains distinct from disabled;
- uses token-owned read-only surface/border treatment.

### Exact size scale

Use the accepted family scale:

- sm = 18px;
- md = 22px;
- lg = 28px;
- xl = 36px.

Shared Field `xxl/xxxl/xxxxl` values remain accepted for API compatibility
but resolve to xl geometry.

## Radio geometry and motion

The indicator remains circular in every state.

Selected presentation contains:

- stable outer circular geometry;
- one centered circular dot;
- no layout shift between unselected and selected.

The dot uses proportional tokenized geometry and scale/opacity motion. Raw SVG
is unnecessary for the Radio mark.

Reuse the accepted CheckBox motion character where applicable: fast/base
transitions, selected pop/press behavior, focus presentation, and reduced-motion
collapse. Check/dash stroke-draw behavior is CheckBox-specific and is not copied.

## System colors

Use the same Honesty ERP semantic role families as accepted CheckBox V5:

- text primary/muted;
- default/elevated/canvas surfaces;
- default/strong borders;
- current tone solid/action roles;
- current tone subtle roles;
- feedback status roles;
- action focus ring;
- system elevation roles.

No raw reference palette, local theme branch, or component-owned
`[data-theme]` selector is allowed.

## Tile single-select ownership

CheckBox V5 intentionally reserved its "Tile mode — single select" example for
Radio semantics. This wave now owns it.

RadioBox `mode='tile'` owns the per-option tile visual.
`ErpRadioGroup` owns the single selected value across the tiles.

Do not implement this as a CheckBox, toggle button, segmented-control substitute,
or CSS-only wrapper.

## RadioGroup bounded compatibility

This wave may change RadioGroup only where required to expose the approved
RadioBox design coherently.

Allowed additions:

- optional option `description`;
- group-level pass-through for RadioBox `mode`, `variant`, `size`,
  `tone`, and `readOnly` when implementation requires it;
- required state propagation for native single selection;
- review evidence for ordinary and Tile single-select groups.

Preserve:

- `string | null` RadioGroup CVA value;
- coordinated native radio `name`;
- declared-option validation;
- disabled option exclusion;
- cyclic Arrow-key navigation across enabled options;
- focus transfer to the newly selected native radio.

No unrelated RadioGroup redesign is authorized.

## Required review states

- default;
- selected;
- disabled;
- read-only;
- required-invalid;
- required-selected recovery;
- status/tone evidence;
- ordinary radio group;
- Tile single-select group.

No indeterminate state is permitted.

## Design Lab evidence

Replace the current small Radio evidence with dedicated sections:

1. Standalone radio;
2. Radio with title & sub-title;
3. Ordinary single-select group;
4. Tile mode — single select;
5. Outline / Filled / Soft variants;
6. sm / md / lg / xl scale;
7. State matrix;
8. RTL evidence.

## Implementation/test/governance scope

The later source wave must update together:

- RadioBox runtime/template/styles;
- RadioBox Component Tokens;
- RadioBox tests;
- bounded RadioGroup source/tests where required;
- Inputs Design Lab evidence/tests;
- ErpField governance;
- Component Token governance fixtures when needed;
- persistent continuity documentation.

Regression protection must reject:

- native-radio replacement;
- selected radio self-toggle to false;
- switch/indeterminate leakage;
- raw reference colors;
- local theme branching;
- unsupported size invention;
- Tile outside RadioBox/RadioGroup semantics;
- stale pre-reference showcase evidence.

## Technical gates

Before source implementation is technically green:

```text
npm run component-tokens:check
npm run erp-field:check
npm run erp-field:check:self-test
npm run test -- --watch=false
npm run verify:clean
```

Static source/governance consistency must be checked before Product Owner local
execution.

## Current execution boundary

CheckBox V5 is visually accepted by Product Owner.

Fresh `npm run verify:clean` after the CheckBox read-only lint fix is still
pending. RadioBox design/reference work is open now; RadioBox runtime/source
implementation waits for that technical gate.

After RadioBox implementation becomes technically green, Product Owner
Light/Dark runtime/visual approval is required before EmptyState opens.
