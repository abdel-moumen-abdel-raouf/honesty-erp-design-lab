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
- Do not pre-create secondary abstract input bases.

## Current Roadmap Classification

### Basic planned

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
- `ErpFilePicker` (single-file V1)
- `ErpImagePicker` (single-image V1)

### Composite-classified

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

This roadmap does not close the Basic Controls layer.
