# Honesty ERP — Primary Controls Correction Program V1

## Authority and status

This is a correction-only program against the completed Phase 00–11 controls
checkpoint. It adds no new public control family and does not declare visual
approval, family freeze, or closure of the Basic Controls layer.

Known Phase 00–09 and shared-infrastructure issues are corrected before any new
controls are added. Detailed Phase 10/11 product, architecture, and visual
review is deferred to a separate second review wave. Shared lower-layer changes
may adapt Phase 10/11 only where compilation or tests require a minimal
compatibility update.

The required execution order is CR00 through CR12. Each phase must pass the
complete build, lint/governance, test, and diff gate before its single commit is
pushed.

## Program-wide invariants

- No new third-party UI dependency, Angular Material, or Angular CDK.
- No cross-component Component Token consumption.
- No raw Reference colors in Component Tokens.
- No Feature/Page raw SVG, vendor icon, native button, or recreated blocking
  overlay system.
- Tooltip is not field validation feedback or a generic popup implementation.
- SearchBox popup mode is nonblocking and does not use `ErpOverlayManager`.
- ColorPicker does not own a duplicate hand-maintained system palette.
- New visible showcase and review copy is Arabic-first; deliberate technical
  identifiers may remain English.
- Technical commits are checkpoints only and do not establish visual approval.

## Fixed correction contracts

### Blocking overlay dismissal

Blocking overlays expose `dismissOnBackdrop` and `dismissOnEscape`, both
defaulting to `true`. Only the top overlay responds.

The nonblocking anchored SearchBox popup exposes `dismissOnOutside` and
`dismissOnEscape`, both defaulting to `true`. Only the top popover responds.

### Overlay blur

```ts
export type ErpOverlayBlur =
  | 'low'
  | 'medium'
  | 'high';
```

The default is `medium`. Reference values are `low = 0.25rem`,
`medium = 0.5rem`, and `high = 1rem`. This correction wave exposes no public
`none` value.

### Blocking backdrop tone

```ts
export type ErpOverlayBackdropTone =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent';
```

The default is `default`. Theme-sensitive Semantic roles own neutral and brand
tint construction. Raw color strings are not the primary overlay backdrop API.

### Overlay motion

```ts
export type ErpOverlayAnimation =
  | 'fade'
  | 'scale'
  | 'fade-scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-start'
  | 'slide-end';
```

Configuration exposes independent `enterAnimation` and `exitAnimation`.
Defaults are `fade-scale` for modal entry and exit; `slide-start` for start
drawer entry and exit; `slide-end` for end drawer entry and exit; and
`slide-up` / `slide-down` for bottom drawer entry / exit. Logical start/end
reverse physically in RTL, the backdrop always fades, and reduced-motion is
honored.

### SearchBox

`popupMode` defaults to `true` and may be set to `false`. Popup mode uses a
nonblocking anchored popup with no backdrop. It contains an ERP search editor
and a generic projected results container; the application owns result
rendering. Inline mode remains a normal in-place field. Both modes share the
same CVA string and add no built-in submit output.

### File and image selection

Corrected V1 is multi-select from the start. Both controls use a shared
internal, non-renderable `ErpFileSelectionBase` and a CVA value of
`readonly File[]`. The controls own local browse/drop/add/remove/clear and
policy feedback, but no HTTP upload, progress, retry, server response,
security, or business-rule authority.

### ColorPicker

Modes are `system` and `free`; the default is `system`.

```ts
export type ErpColorPickerValue =
  | {
      readonly mode: 'system';
      readonly token: ErpSystemColorToken;
    }
  | {
      readonly mode: 'free';
      readonly value: string;
    };
```

The CVA may also be `null`. System selection preserves logical Foundation
token identity; free selection preserves a normalized arbitrary color.

### RangeSlider reset

If a valid `defaultRange` exists, clear/reset returns to it. Otherwise it
returns to the full `{lower: min, upper: max}` range. This correction does not
freeze or redesign that behavior.

### Names and deferred Toggle

The public names remain `ErpCheckBox` and `ErpRadioBox`. This correction wave
does not create a Toggle or Switch component.

## Foundation correction contracts

Backdrop-blur Reference values are 4 (`0.25rem`), 8 (`0.5rem`), and 16
(`1rem`). Semantic roles are:

- `--honesty-effect-backdrop-blur-low`
- `--honesty-effect-backdrop-blur-medium`
- `--honesty-effect-backdrop-blur-high`

Theme-sensitive overlay backdrop roles are:

- `--honesty-color-overlay-backdrop-default`
- `--honesty-color-overlay-backdrop-neutral`
- `--honesty-color-overlay-backdrop-primary`
- `--honesty-color-overlay-backdrop-secondary`
- `--honesty-color-overlay-backdrop-accent`

Theme-sensitive glass roles are:

- `--honesty-color-surface-glass`
- `--honesty-color-surface-glass-border`
- `--honesty-color-surface-glass-highlight`

The generated Foundation System Color Registry derives neutral, primary,
secondary, accent, green, amber, red, and cyan families at steps 50, 100, 200,
300, 400, 500, 600, 700, 800, 900, and 950 from authoritative Sass Reference
palette files. Tokens use `<family>-<step>` identity and resolve to the current
normalized hex value.

## Blocking overlay correction

Blocking entries follow `entering -> open -> leaving -> removed`. Close or
dismiss records one outcome, keeps surface/backdrop mounted through exit,
retains focus/scroll/inert protection, and removes only after host transition
completion. `afterClosed` resolves and focus restores after removal. Reduced
motion has a deterministic completion path and double close/dismiss is blocked.

Each stack entry retains its blur, backdrop tone, enter/exit animations, and
dismissal config. Only the top entry responds. Nested close reveals the
underlying entry without replaying its entry animation.

Modals may use a viewport inset. Start/end drawers attach to their logical
viewport edge at `100dvh`; bottom drawers attach to the bottom at full inline
size. Drawers are not floating cards.

## Input and field correction

`ErpInputBase` adds only a protected `clearFocusState()` helper. Field-level
effective-disabled state clears focus, blocks user commits, and blocks focus
acquisition. Concrete picker triggers use the internal `ErpFieldTrigger`, which
owns native button semantics without Button Family visual chrome or ripple.

Glass FieldFrame surfaces consume the shared Semantic glass roles and
Foundation glass blur. Glass remains valid only with solid, outline, or subtle
field variants.

Specialized parser controls support a nullable pattern override. Null uses the
built-in final-value expression; a supplied expression replaces it; invalid
regex is configuration-invalid; semantic parsers remain authoritative.

Built-in final expressions are:

- Number/NumberStepper: `^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$`
- Money: `^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$`
- URL: `^https?:\/\/[^\s]+$`
- Tel: `^\+?[0-9][0-9\s().-]{5,19}$`
- Date: `^\d{4}-\d{2}-\d{2}$`
- Time: `^\d{2}:\d{2}$`
- DateTime: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$`

DateRange applies the Date rule independently to both endpoints. Progressive
draft state is separate from committed CVA state where necessary; invalid
final-domain values never publish.

NumberBox and NumberStepper use a text-like editor with decimal input mode and
no browser spinner. Money accepts only monetary numeric draft syntax. URL must
pass the effective pattern, a real URL parse, and HTTP/HTTPS protocol. Tel
rejects alphabetic input.

## File/image correction

The shared selection base owns immutable selected files, multiple native input,
browse/drop/add/remove/clear, same-file reselection, stable duplicate identity
`(name, size, lastModified, type)`, local accept/size/count policy, and size
formatting. Inputs are `accept`, `maxFileSize`, `maxFiles`, and `clearable`.

FilePicker uses a large dashed drop zone and selected-file list. ImagePicker
adds stable Object URL thumbnails, preview size `sm | md | lg`, and revokes URLs
on removal, clear, and destruction.

## Temporal correction

Temporal field triggers use `ErpFieldTrigger`. Date, time, date-time, and date
range support pattern overrides and real semantic parsing. The default locale
is `ar-EG`; ISO CVA strings remain ASCII canonical.

Default visible actions are Arabic: الشهر السابق, الشهر التالي, اليوم, مسح,
إلغاء, تأكيد, الساعة, and الدقيقة.

DateRange stages an anchor, preview candidate, and final staged range. Forward
and backward hover/click produce one chronological interval; keyboard movement
previews and Enter selects. Blocking temporal controls expose one typed safe
overlay behavior subset covering dismissal, blur, tone, and entry/exit motion.

## Selection correction

ColorPicker, IconPicker, ItemPicker, and ComboBox use `ErpFieldTrigger` and the
shared overlay behavior subset. Selection tiles, where required, use one
internal semantic primitive that owns native button semantics.

IconPicker uses fixed equal tiles, normalized ErpIcon sizing, stable responsive
columns and gaps, and content-independent geometry. ColorPicker system mode
uses only the generated Foundation System Color Registry in the exact family
and step order. Free mode normalizes to uppercase `#RRGGBB` without changing
Foundation tokens. Default visible copy is Arabic-first.

## Design Lab and screenshot correction

`/controls/overlays` renders directly in the outer Lab review stage so blocking
surfaces cover the full application viewport. Non-overlay routes retain iframe
desktop/tablet/mobile review. One outer OverlayHost is active, and deterministic
capture roots select the embedded app or direct full-viewport review root.

Screenshot regression covers an ordinary input page, closed overlay page, open
modal, open start/end drawer, and Dark specimen. Failures are diagnosed from
the actual exception; blur, glass, and OverlayHost are not disabled as a
workaround.

## Visual references

References are review inputs only and are not downloaded, committed, or
redistributed:

- Glass: `https://cdn.dribbble.com/userupload/45261316/file/82db561b5ced954d82f92fab7b3d05f0.jpg?resize=752x&vertical=center`
- NumberStepper: `https://cdn.dribbble.com/userupload/28671846/file/original-dcafb540346e260c39fa27f8d9ff90e1.gif`
- RangeSlider: `https://cdn.dribbble.com/userupload/44001748/file/original-18b5e92b66ba47eabdb4cd8ce03dde2e.png?resize=1024x768&vertical=center`
- Checkbox/Toggle language: `https://cdn.dribbble.com/userupload/42893870/file/original-a7daad370f961bd434bcb18e6df7a640.mov`
- Checkbox/Toggle language: `https://cdn.dribbble.com/userupload/20237401/file/original-a5625a74b3623a4b178796f5a99eee3a.gif`
- Checkbox/Toggle language: `https://dribbble.com/shots/479550-CSS3-UI-Kit`
- Checkbox/Toggle language: `https://miro.medium.com/v2/resize:fit:1400/1*KyrJmIbBsEA2KcbKqBo9Aw.png`
- RadioBox: `https://cdn.dribbble.com/userupload/24147690/file/original-ed5aae6b90d0f50f59f36f3ff40bdab6.png?resize=752x&vertical=center`
- RadioBox: `https://cdn.dribbble.com/userupload/3350754/file/original-d17bc5d9d7f5922dbeff87cc50ad4d46.png?format=webp&resize=400x300&vertical=center`
- RadioBox: `https://assets.justinmind.com/wp-content/uploads/2020/05/credit-card-radio-button-example.png`
- SearchBox popup: `https://cdn.dribbble.com/userupload/12264207/file/original-7afb7d8a1ebb63b0f6058b12615b4823.jpg?resize=1024x768&vertical=center`
- File/Image: `https://cdn.prod.website-files.com/5f16d69f1760cdba99c3ce6e/699572a2549e9ee48026ba3c_file-upload-ui-bering-lab-01.webp`
- DateRange: `https://s3-alpha.figma.com/hub/file/2857918756/eb8d88a6-2044-44e7-a86c-6812a2bd1627-cover.png`
- IconPicker: `https://repository-images.githubusercontent.com/20855538/b8525400-7289-11e9-8c91-6d632059fb8d`

## Correction phase sequence

1. CR00 — record correction program.
2. CR01 — Foundation effects, backdrop roles, and generated system colors.
3. CR02 — blocking overlay core lifecycle and geometry.
4. CR03 — direct full-viewport Lab review and screenshot regression.
5. CR04 — Input/Field hardening, FieldTrigger, and glass.
6. CR05 — domain validation and numeric/text domain controls.
7. CR06 — SearchBox popup mode.
8. CR07 — multi-file and multi-image picker redesign.
9. CR08 — Checkbox/Radio visual correction.
10. CR09 — temporal picker corrections.
11. CR10 — selection picker correction.
12. CR11 — Arabic-first showcase and visual evidence consolidation.
13. CR12 — final governance, test, and documentation consolidation.

`DEFERRED_PHASE_10_11_REVIEW` remains pending and outside this program.
