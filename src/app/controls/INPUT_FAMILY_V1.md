# Honesty ERP — Input Family V1

## ErpInputBase Contract

- `ErpInputBase` is internal and non-renderable; it is not a standalone Basic Control.
- It has no selector, template, styles, or Component Tokens.
- Input Family V1 uses the stable Angular `ControlValueAccessor` contract.
- Angular Signal Forms are explicitly deferred because this repository uses Angular 21, where Signal Forms are experimental.
- The inherited inputs are exactly `label`, `name`, `form`, and `disabled`.
- V1 has no generic public `value` / `valueChange` API.
- Concrete controls register `NG_VALUE_ACCESSOR` themselves.
- A blank trimmed label is invalid configuration and effectively disables user commits.
- Form writes normalize values without invoking `onChange`.
- User commits normalize values and invoke `onChange` exactly once.
- Disabled precedence is configuration-invalid OR explicit disabled OR Forms disabled.
- Blur invokes the registered touched callback.
- Validation rules, validation messages, and specialized native attributes remain concrete-control responsibilities.
- `ErpInputBase` owns no visual or token contract.
- Internal derived state is protected; only the inherited Angular inputs are public base API.
- Concrete controls read normalized value through protected read-only state and must use base helpers for user value/focus mutation.
- Entering any effective-disabled state clears stored focus so re-enabling cannot resurrect stale focus evidence.
- `ErpFileSelectionBase` is the approved internal, non-renderable shared base
  for File/Image multi-selection behavior; do not pre-create further secondary
  abstract input bases.

## Implemented Technical Candidate Classification

### Basic controls

- `ErpTextBox`
- `ErpTextAreaBox`
- `ErpPasswordBox`
- `ErpSearchBox`
- `ErpUrlBox`
- `ErpTelBox`
- `ErpNumberBox`
- `ErpMoneyBox`
- `ErpNumberStepper`
- `ErpRangeSlider`
- `ErpCheckBox`
- `ErpRadioBox`
- `ErpFilePicker` (multi-file V1)
- `ErpImagePicker` (multi-image V1)

### Composite-classified controls

- `ErpDateBox`
- `ErpTimeBox`
- `ErpDateTimeBox`
- `ErpDateRangeBox`
- `ErpColorPicker`
- `ErpIconPicker`
- `ErpItemPicker`
- `ErpComboBox`
- `ErpRadioGroup`
- `ErpButtonGroup`
- `ErpSplitButton`
- `ErpFabMenu`

All listed controls have implementation, contract, test, and showcase evidence.
This technical checkpoint does not declare visual approval, freeze a family, or
close the Basic Controls layer.

This implementation inventory is provisional during the Primary Controls
Correction Program. The corrected public contracts are recorded in
`CONTROLS_CORRECTION_PROGRAM_V1.md`; no visual approval or family freeze is
implied by the existing technical checkpoint.

## Selection Picker Correction Contract

- `ErpColorPicker` uses `ErpColorPickerValue | null`; system values preserve
  generated Foundation System Color token identity and free values preserve a
  normalized uppercase `#RRGGBB` value.
- System colors render from the generated registry in its authoritative family
  and step order. ColorPicker owns no copied palette.
- `ErpIconPicker` uses fixed equal internal selection tiles with normalized
  `ErpIcon` content and accessible Tooltip names.
- Selection picker content uses the internal `ErpSelectionTile` semantic button
  root rather than authoring raw native buttons.
- Color, icon, item, and combo pickers expose the typed blocking Overlay
  behavior subset used by temporal pickers.
- Selection is staged inside the overlay and reaches the CVA only after explicit
  confirmation.
- Default selection-picker action copy is Arabic-first.

## Corrected Shared Contracts

- NumberBox and NumberStepper use text-like decimal editors without
  browser-native number spinners. Number, stepper, money, URL, telephone, and
  temporal controls separate progressive draft state from committed CVA state
  and apply their documented built-in/developer pattern rules.
- SearchBox defaults to a nonblocking anchored popup with no backdrop. It owns
  its popup tokens and geometry, projects an application-defined results
  container, and uses neither `ErpOverlayManager` nor Tooltip as its popup.
- FilePicker and ImagePicker use the internal `ErpFileSelectionBase` and an
  immutable `readonly File[]` value. Both preserve multiple native selection,
  additive browse/drop, local policy feedback, remove-one, and clear-all;
  neither owns upload networking.
- Temporal and selection pickers stage values in the shared blocking Overlay
  and commit only on confirmation. DateRange owns anchor, hover/keyboard
  preview, and one chronological interval in LTR and RTL.
- Corrected default picker actions and showcase copy are Arabic-first. API
  identifiers and canonical stored values remain unchanged.
- Governance verifies the full implemented control inventory, required source,
  template, Component Token, unit-test, and showcase files.

These are technical correction contracts. They do not declare visual approval,
freeze the Input/Field families, or close the Basic Controls layer.
