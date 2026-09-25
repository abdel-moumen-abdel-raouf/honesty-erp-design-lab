# Honesty ERP — Field Family V1

## Status and Authority

This document is the canonical implementation contract for the Field Family
program.

The current implementation is provisional during the Primary Controls
Correction Program. The bounded corrections in
`CONTROLS_CORRECTION_PROGRAM_V1.md` supersede conflicting checkpoint wording
until that program completes; this status does not declare visual approval or
freeze.

- `ErpInputBase V1` is frozen.
- Its inherited public API remains exactly `label`, `name`, `form`, and
  `disabled`.
- The Product Owner explicitly waives an external visual reference for the
  standard Field Family appearance.
- The standard appearance is governed only by this contract and the frozen
  Honesty ERP token/theme language.
- This roadmap does not claim visual approval, freeze the Field Family, or
  close the Basic Controls layer.

## Architecture

The internal foundation is:

1. `ErpInputBase<TValue>` — frozen internal nonvisual CVA foundation.
2. `ErpFieldBase<TValue>` — internal abstract `@Directive()`, non-renderable,
   extending `ErpInputBase<TValue>`.
3. `ErpFieldFrame` — internal rendered shared field chrome.
4. `ErpFieldTrigger` — internal transparent semantic button surface for picker
   controls.
5. `ErpFieldFeedback` — internal in-flow feedback surface.
6. Concrete public controls.

Feature/Page code never authors the internal Field Family types directly.

## Canonical Contracts

```ts
export type ErpFieldTone =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent';

export type ErpFieldStatus =
  | 'none'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ErpFieldVariant =
  | 'solid'
  | 'outline'
  | 'subtle'
  | 'ghost'
  | 'text';

export type ErpFieldBorderMode =
  | 'solid'
  | 'dashed'
  | 'underline';

export type ErpFieldShape =
  | 'default'
  | 'rounded'
  | 'pill';

export type ErpFieldSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxxl';

export type ErpFieldAppearance =
  | 'standard'
  | 'glass';

export type ErpFieldLabelMode =
  | 'static'
  | 'floating';

export type ErpFieldFloatingPosition =
  | 'top'
  | 'bottom';

export type ErpFieldHelperPosition =
  | 'above'
  | 'below';
```

## ErpFieldBase Public Inputs

The inherited Field Family inputs and exact defaults are:

- `tone = 'neutral'`
- `status = 'none'`
- `variant = 'outline'`
- `borderMode = 'solid'`
- `shape = 'default'`
- `size = 'md'`
- `appearance = 'standard'`
- `labelMode = 'static'`
- `floatingPosition = 'top'`
- `helperText = null`
- `helperPosition = 'below'`
- `leadingIcon = null`
- `trailingIcon = null`
- `clearable = false`
- `feedbackText = null`
- `feedbackDismissible = false`

Icon inputs use `ErpIconName`.

`ErpFieldBase` owns normalized trimmed helper/feedback text, feedback
dismissed state, resetting dismissal when `feedbackText` or `status`
changes, computed feedback visibility, and common feedback-dismiss helpers.

It does not own placeholder, readonly, min/max/step, maxlength, autocomplete,
inputMode, or parser/formatter domain logic. Those remain concrete-control
capabilities.

## Compatibility Matrix

Field combinations resolve deterministically before a concrete control is
interactive:

| Contract | V1 rule |
|---|---|
| text variant | Always resolves the effective border mode to underline |
| glass appearance | Valid only with solid, outline, or subtle |
| glass + ghost/text | Configuration-invalid |
| dashed border | Valid only with outline or subtle |
| underline border | Valid with every variant |
| pill shape | Valid for single-line text entry; invalid for ErpTextAreaBox |
| helper/floating positions | Independently configurable |
| clear | Valid only when the concrete control can represent an empty value |

Invalid combinations produce deterministic configuration-invalid state and
effectively disable user commits. They are not silently remapped, except for
the explicit text-variant rule that resolves its effective border to
underline.

Entering Field-level effective-disabled state clears stored focus. While that
state is active, protected user commits and focus acquisition are blocked; a
later return to valid configuration does not resurrect prior focus evidence.

Domain actions remain distinct from configured trailingIcon and clear.
Password reveal is a domain action; the logical end order remains domain
action, trailing icon/adornment, then clear.

## Tone and Status

Tone and status are separate:

- tone expresses normal brand identity;
- status expresses semantic state.

When status is not `none`, status-sensitive border, icon, and feedback visuals
take precedence. The configured tone remains the normal-state identity.

## ErpFieldFeedback

The feedback reference contract is:

- field control first;
- feedback directly below the control in normal document flow;
- a small logical-inline-start caret points toward the field and is RTL-aware;
- status-colored background, border, and text;
- optional close action.

`ErpFieldFeedback` is not Tooltip, Popover, Overlay, a portal client, or an
`ErpOverlayManager` client.

Behavior:

- feedback is visible only for nonblank text with non-`none` status;
- helper-above appears before the control;
- feedback appears before below-helper text;
- dismissing feedback hides only the message;
- status remains active;
- dismissal resets when feedback text or status changes;
- close uses `ErpIconButton` with semantic `close`;
- close is wrapped in plain `ErpTooltip`;
- feedback text uses `ErpText`.

The logical end area order is:

1. domain action;
2. configured trailing icon/adornment;
3. clear action.

`trailingIcon` is not overloaded for password reveal, clear, or stepper
increment/decrement.

## Standard Appearance

The standard default is:

- variant: outline
- tone: neutral
- status: none
- border: solid
- shape: default
- size: md
- appearance: standard
- label: static
- helper: below

No raw color literals are used. Existing Semantic surface, text, and border
contracts feed Component Tokens.

### Standard Surfaces

- Outline uses a default/elevated semantic field surface, a 1px semantic border,
  primary text, and muted placeholder.
- Solid uses a stronger filled/tinted surface and a transparent border at rest.
- Subtle uses a semantic subtle/tinted surface and subtle border.
- Ghost uses a transparent surface and no visible rest border unless status is
  active; focus evidence remains present.
- Text uses a transparent surface, no perimeter, and an effective underline
  border mode. Configured `borderMode` does not create a perimeter for the text
  variant.

### Focus Gradient

At focus, rest border color transitions to the required gradient.

- Solid, outline, subtle, and ghost receive a full gradient perimeter.
- Text or explicit underline receives a gradient underline only.
- The gradient is not used decoratively elsewhere.

Canonical focus-gradient slots are `start` and `end`.

Tone mapping:

- neutral: action focus-ring to brand primary content;
- primary: brand primary content to brand accent content;
- secondary: brand secondary content to brand primary content;
- accent: brand accent content to brand secondary content.

When status is active, gradient start uses the matching feedback border/icon
role and gradient end uses the matching feedback text/content role.

Gradient color order follows logical inline direction. LTR and RTL reverse the
physical start/end color order for both perimeter and underline focus
gradients without adding a public direction API.

### Shape

- default → `--honesty-radius-control`
- rounded → `--honesty-radius-overlay`
- pill → `--honesty-radius-full`

### Sizes

Canonical single-line frame metrics:

| Size | Height | Inline padding | Value font | Icon |
|---|---:|---:|---:|---:|
| sm | 2rem / 32px | 0.5rem | 0.75rem | 1rem |
| md | 2.5rem / 40px | 0.75rem | 0.875rem | 1rem |
| lg | 3rem / 48px | 1rem | 0.875rem | 1.25rem |
| xl | 3.5rem / 56px | 1rem | 1rem | 1.25rem |
| xxl | 4rem / 64px | 1.25rem | 1.125rem | 1.5rem |
| xxxl | 4.5rem / 72px | 1.5rem | 1.25rem | 1.75rem |
| xxxxl | 5rem / 80px | 2rem | 1.5rem | 2rem |

These dimensions are Component-local structural contracts. TextArea uses the
same width, padding, and font system, but its block size is multiline and is
never forced to a single-line height.

### Labels and Helper

Static labels render outside the field frame, before the field in block flow,
use `ErpText`, and use the secondary text role.

A floating label floats when the field is focused, has a display value, or has
a nonblank placeholder. Top floats to the top edge and bottom floats to the
bottom edge. Placeholder never replaces the semantic label.

Helper-above appears after the static label and before the control.
Helper-below appears after feedback. Helper text uses `ErpText` and a muted
role; status-specific product copy belongs in feedback.

## Glass Appearance

The authoritative Product Owner reference is:

`https://cdn.dribbble.com/userupload/45261316/file/82db561b5ced954d82f92fab7b3d05f0.jpg?resize=752x&vertical=center`

The reference asset is not downloaded, committed, or redistributed.

`appearance='glass'` composes with status, tone, size, shape, and the valid
solid, outline, or subtle variants defined by the compatibility matrix. It
uses:

- the theme-sensitive Semantic glass surface, border, and highlight roles;
- the Component-owned surface-mix slot through `color-mix`, never raw colors;
- a perceptible translucent surface with subtle border and inset highlight;
- `backdrop-filter` and `-webkit-backdrop-filter`;
- the Foundation Effect semantic blur contract;
- a subtle semantic border;
- no decorative shadow beyond genuine elevation;
- clear focus and status contrast.

When backdrop filtering is unsupported, a readable translucent or opaque
Semantic surface preserves legibility. Feedback never uses glass.

The glass surface mix is owned by
--honesty-field-frame-glass-surface-mix; the glass facet resolves it to 72%.
Production FieldFrame SCSS contains no tunable mix literal.

## Internal Field Trigger

`ErpFieldTrigger` is the only internal whole-field button-semantic surface. It
owns one native `button type="button"`, transparent Field-compatible chrome,
disabled state, id/name/form association, described-by/error-message/invalid
relationships, activation, keyboard, focus, blur, and projected content.

Picker controls compose `ErpFieldTrigger` instead of authoring independent raw
trigger buttons. It does not import Button Family visual chrome or ripple.
Legitimate native input, textarea, and file-input elements remain owned by
their concrete ERP controls.

## Text Entry Family

- ErpTextBox uses native text semantics and supports placeholder, readonly,
  required, min/max length, pattern, autocomplete, input mode, spellcheck, and
  ERP clear behavior.
- ErpTextAreaBox uses native textarea semantics, defaults to four rows and
  vertical resize, and shows a counter only when maxLength exists and
  showCounter=true.
- ErpPasswordBox is hidden by default. Its Tooltip-wrapped eye/eye-off domain
  action changes only native input type and never the stored value.
- ErpSearchBox uses native search semantics, defaults autocomplete to off,
  defaults its leading semantic icon to search, and uses the ERP clear action.
  It has no search-submit output in V1.
- ErpUrlBox uses native url semantics with url autocomplete and input mode.
- ErpTelBox uses native tel semantics with tel autocomplete and input mode.
  It performs no formatting or masking.

All six controls register themselves as stable ControlValueAccessor providers.
They keep labels semantic, compose helper and visible feedback relationships,
set native aria-invalid for danger status, and preserve invalid state when
feedback is dismissed.

## Boolean / Choice Basics

- `ErpCheckBox` is a Basic boolean ControlValueAccessor with a required label,
  authoritative native checkbox semantics, checked state from the current CVA
  value, inherited disabled behavior, and `indeterminate = false`.
- `ErpRadioBox` is a Basic boolean ControlValueAccessor leaf with a required
  label, authoritative native radio semantics, checked state from the current
  CVA value, and inherited disabled behavior.
- Native Space-key behavior remains authoritative for both controls.
- User activation changes `ErpRadioBox` from false to true. A checked radio
  does not toggle itself from true to false through user activation; form
  writes may still clear its boolean value.
- Both controls expose the existing Field tone, status, and size vocabularies
  where visually applicable. They own no FieldFrame chrome.
- `ErpRadioGroup` remains Composite-classified and is not part of the Basic
  boolean/choice implementation.

## Placeholder

Placeholder is not added to frozen `ErpInputBase`.

Optional `placeholder: string | null` is supported by TextBox, TextAreaBox,
PasswordBox, SearchBox, UrlBox, TelBox, NumberBox, MoneyBox, and NumberStepper
when null/empty is allowed.

Placeholder never replaces the label, is tokenized for Light/Dark and
standard/glass, and remains subordinate to entered value. Native placeholder
behavior is not promised for DateBox, DateTimeBox, TimeBox, or RangeSlider.

## Validation and Accessibility

- Blank inherited label remains configuration-invalid through `ErpInputBase`.
- Validation status is distinct from configuration invalidity.
- `status='danger'` sets `aria-invalid='true'` on the native editable control.
- Helper and feedback IDs are composed into `aria-describedby` without
  destroying existing tokens.
- Danger feedback uses an error-message relationship where supported.
- Feedback dismissal removes only the message relationship, not invalid state.
- Decorative icons remain decorative.
- Labels remain genuine semantic accessible labels.

## Control Classification

Field Entry Basic Controls:

- `ErpTextBox`
- `ErpTextAreaBox`
- `ErpPasswordBox`
- `ErpSearchBox`
- `ErpUrlBox`
- `ErpTelBox`
- `ErpNumberBox`
- `ErpMoneyBox`

Numeric Interaction Basic Controls:

- `ErpNumberStepper` — one scalar numeric value, direct typing,
  decrement/increment, min/max/step, ArrowUp/ArrowDown, and Home/End when bounds
  exist.
- `ErpRangeSlider` — one interval value with a rail, lower and upper thumbs,
  drag/touch/keyboard, and min/max/step.

`ErpNumberStepper` is not a range selector. Its authoritative reference is:

`https://cdn.dribbble.com/userupload/28671846/file/original-dcafb540346e260c39fa27f8d9ff90e1.gif`

The canonical RangeSlider value is:

```ts
export interface ErpRangeSliderValue {
  lower: number;
  upper: number;
}
```

Its invariant is `min <= lower <= upper <= max`; thumbs do not cross in V1.
`ErpRangeSlider` is not NumberStepper. Its authoritative reference is:

`https://cdn.dribbble.com/userupload/44001748/file/original-18b5e92b66ba47eabdb4cd8ce03dde2e.png?resize=1024x768&vertical=center`

## Numeric Family

- `ErpNumberBox` stores `number | null`, supports direct native numeric entry,
  defaults `step` to 1 and `allowEmpty` to true, accepts nullable min/max, and
  clamps normalized commits to configured bounds.
- `ErpMoneyBox` stores `number | null`; required currency and optional locale
  are formatting metadata. Focused editing uses normalized numeric text, while
  the unfocused display uses `Intl.NumberFormat`. It has no currency picker.
- `ErpNumberStepper` stores one `number | null` scalar. It combines direct
  numeric entry with labeled ERP decrement/increment actions, nullable bounds,
  a default step of 1, ArrowUp/ArrowDown, and Home/End when bounds exist.
- `ErpRangeSlider` extends `ErpInputBase<ErpRangeSliderValue>` directly and
  owns two stable native range thumbs over one rail. Its normalized invariant
  is `min <= lower <= upper <= max`; thumbs do not cross.
- RangeSlider defaults to `{lower: min, upper: max}`. Clear/reset uses a valid
  configured `defaultRange`, otherwise the full configured range.
- RangeSlider ArrowRight increases and ArrowLeft decreases numeric value in
  both LTR and RTL. Its visual rail mirrors logically in RTL.
- NumberStepper is not a range selector. RangeSlider is not a scalar stepper.
- Their canonical V1 public names remain `ErpNumberStepper` and
  `ErpRangeSlider`; alternate scalar/range names are not public contracts.

## File / Image Basics

- `ErpFilePicker` is a single-file `File | null` ControlValueAccessor. Its
  optional `accept` input defaults to null and `clearable` defaults to true.
- `ErpImagePicker` is a single-image `File | null` ControlValueAccessor. Its
  `accept` input defaults to `image/*` and `clearable` defaults to true.
- Both controls retain a genuine browser-native file input as the filesystem
  security boundary. V1 has no multi-file queue or multi-image gallery.
- A non-null programmatic CVA write may update controlled display state but
  cannot populate the native file input. No implementation attempts to bypass
  this browser security rule.
- Clearing commits null and clears the native input value.
- ImagePicker creates a local Object URL preview for a valid image and revokes
  the URL on replacement, clearing, and destruction.

## Temporal Overlay Picker Family

- `ErpDateBox` stores `string | null` in ISO `YYYY-MM-DD` form and exposes
  nullable min/max, `weekStartsOn = 0`, nullable locale, and inherited clear.
- `ErpTimeBox` stores `string | null` in `HH:mm` form and exposes
  `minuteStep = 5`, nullable min/max, and nullable locale.
- `ErpDateTimeBox` stores `string | null` in local `YYYY-MM-DDTHH:mm` form and
  combines date and time staging in one modal.
- `ErpDateRangeBox` stores `{start: string | null; end: string | null}` and
  preserves `start <= end` whenever both values exist.
- All four use Field Family trigger chrome and never use browser-native
  date/time picker popups as the main selection UX.
- Calendar selection provides month navigation, weekday headers, a Gregorian
  month grid, today, clear when available, cancel, and confirm.
- Calendar keyboard behavior supports Arrow movement, Home/End week edges,
  PageUp/PageDown month movement, Enter selection, and OverlayManager Escape.
- Time selection exposes hours `00` through `23` and minutes derived from the
  configured step.
- Every temporal selection remains staged in `ErpOverlayManager`; confirm is
  the only action that commits through CVA, while cancel or dismissal leaves
  the committed value unchanged.
- The date-range overlay stages start and then end and provides selected-range
  evidence before confirmation.

## Selection Overlay Picker Family

- `ErpColorPicker` stores `string | null` as canonical uppercase `#RRGGBB`,
  provides semantic preset swatches and an allowed native custom color input,
  and stages clear/selection until confirmation.
- `ErpIconPicker` stores `ErpIconName | null`, searches the complete semantic
  icon registry, supports keyboard selection, and never exposes vendor names.
- `ErpItemPicker` stores `string | null` and consumes readonly options with
  `value`, `label`, optional `disabled`, and optional semantic `icon`; its
  defaults are nullable placeholder, `searchable = false`, and
  `clearable = false`.
- `ErpComboBox` uses the same option contract, keeps an editable search query,
  commits only a matched enabled option value, and never commits free-form text
  in V1.
- All four use Field Family chrome and `ErpOverlayManager`; overlay selection is
  staged so cancel or dismissal does not mutate the CVA value.

Boolean/choice Basic Controls are `ErpCheckBox` and `ErpRadioBox`.
`ErpRadioGroup` remains Composite.

Overlay-backed selection Composites are `ErpDateBox`, `ErpTimeBox`,
`ErpDateTimeBox`, `ErpDateRangeBox`, `ErpColorPicker`, `ErpIconPicker`,
`ErpItemPicker`, and `ErpComboBox`.

File/Image Basic Controls are single-file `ErpFilePicker` and single-image
`ErpImagePicker`. Browser-native filesystem selection remains the security
boundary.

## Implemented Deferred Composites

- `ErpRadioGroup` is a `string | null` CVA over declared
  `ErpRadioBox`-compatible options. It owns selected value, coordinated native
  radio names, required group semantics, and cyclic Arrow-key navigation across
  enabled options.
- `ErpButtonGroup` composes ERP Button controls, defaults to horizontal attached
  layout, supports vertical/detached layout, and exposes logical
  first/middle/last position evidence without replacing native child semantics.
- `ErpSplitButton` owns one primary ERP Button action and one secondary ERP
  IconButton menu trigger. Its simple actions use the ItemPicker option contract.
- `ErpFabMenu` composes frozen ErpFab and ErpExtendedFab controls and owns
  open/close state, action collection, logical block placement, focus
  restoration, Escape, and Arrow-key navigation.
