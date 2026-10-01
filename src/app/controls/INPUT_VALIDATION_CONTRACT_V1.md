# ERP Input Validation Contract V1

## Status

Product Owner-approved architecture decision.

This document defines the common value-state and validation contract that every
production ERP input must participate in. Implementation is pending.

## 1. Separate value state from validity

Every ERP input exposes a semantic value state:

```ts
export type ErpInputState =
  | 'null'
  | 'empty'
  | 'no-selection'
  | 'invalid-entry'
  | 'valid-entry';
```

The state answers "what kind of entry is currently present?" It does not by
itself answer whether that state is permitted by the field configuration.

Every ERP input also exposes:

```ts
readonly valid: Signal<boolean>;
```

Examples:
- optional empty TextBox -> `inputState() === 'empty'`, `valid() === true`;
- required empty TextBox -> `inputState() === 'empty'`, `valid() === false`;
- optional nullable NumberBox -> `inputState() === 'null'`,
  `valid() === true`;
- required ItemPicker with no selected item ->
  `inputState() === 'no-selection'`, `valid() === false`;
- non-empty telephone with validation defects ->
  `inputState() === 'invalid-entry'`, `valid() === false`;
- accepted value -> `inputState() === 'valid-entry'`, `valid() === true`.

## 2. State classification law

State classification is deterministic:

1. Selection-family controls with no selected value -> `no-selection`.
2. Nullable non-selection controls whose current semantic entry is null ->
   `null`.
3. Text-like entries whose current draft is zero-length -> `empty`.
4. Present entry with one or more validation issues -> `invalid-entry`.
5. Present entry with no validation issues -> `valid-entry`.

Whitespace is not silently trimmed in order to classify an entry as empty.
A future allow-blank/trim policy may validate whitespace-only content, but the
framework must not silently mutate it.

For domain fields with an editable draft (URL, telephone, numeric text editors,
ComboBox query, etc.), validation state is based on the current user-visible
entry/draft, not only on the last committed CVA value.

## 3. Developer-facing errors

Every ERP input exposes:

```ts
readonly errors: Signal<readonly string[]>;
```

This is the simple developer-facing list of current validation messages.

Example telephone value:

```ts
[
  'رقم الهاتف أقصر من الحد الأدنى المطلوب.',
  'يسمح بعلامة + واحدة فقط وفي بداية الرقم.',
]
```

Errors are deterministic and may contain multiple simultaneous problems.

## 4. Structured validation issues

String messages are not sufficient for programmatic ERP logic. Every input also
exposes structured issues:

```ts
export type ErpInputValidationSource =
  | 'presence'
  | 'constraint'
  | 'format'
  | 'domain'
  | 'custom'
  | 'external';

export interface ErpInputValidationIssue {
  readonly code: string;
  readonly message: string;
  readonly source: ErpInputValidationSource;
  readonly meta?: Readonly<
    Record<string, string | number | boolean | null>
  >;
}
```

And:

```ts
readonly validationIssues:
  Signal<readonly ErpInputValidationIssue[]>;
```

`errors()` is derived from `validationIssues().map(issue => issue.message)`.

Stable issue codes are mandatory. Examples:
- `required`;
- `text.min-length`;
- `text.max-length`;
- `number.min`;
- `number.max`;
- `number.step`;
- `url.format`;
- `tel.too-short`;
- `tel.too-long`;
- `tel.plus-position`;
- `tel.plus-count`;
- `selection.required`;
- `files.min-count`;
- `files.max-count`;
- `files.type`;
- `files.max-size`;
- `range.order`.

## 5. Validation snapshot

Every input exposes one canonical snapshot in addition to convenience signals:

```ts
export interface ErpInputValidationSnapshot {
  readonly state: ErpInputState;
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly issues: readonly ErpInputValidationIssue[];
}
```

Recommended public API:

```ts
readonly inputState: Signal<ErpInputState>;
readonly valid: Signal<boolean>;
readonly errors: Signal<readonly string[]>;
readonly validationIssues:
  Signal<readonly ErpInputValidationIssue[]>;
readonly validation:
  Signal<ErpInputValidationSnapshot>;
```

## 6. Typed constraint law

Do not force one meaningless `min/max` pair onto every control.

All controls participate in one validation engine, but configuration remains
type-correct.

### Text-like controls
- `required`;
- `minLength`;
- `maxLength`;
- `pattern` where applicable;
- domain rules such as URL, telephone, password policy.

Length constraints mean user-visible character length, not byte length.

### Numeric / Money controls
- `required`;
- `min`;
- `max`;
- `step`.

For editable numeric text controls, min/max validation must not silently clamp
or replace a user-entered value. The draft remains visible and becomes invalid.
Controls whose interaction is intrinsically bounded (for example a slider) may
constrain interaction mechanically.

### Date / Time / DateTime
- `required`;
- `min`;
- `max`;
- temporal-domain rules.

### Selection controls
Single selection:
- `required`;
- `no-selection` state when no item is selected.

Future multi-selection:
- `minSelections`;
- `maxSelections`.

### File / Image selection
- `required`;
- `minFiles`;
- `maxFiles`;
- per-file type/size policy;
- aggregate/domain rules where required.

### Range values
- global `min`;
- global `max`;
- ordering and step rules;
- any domain-specific span constraints.

## 7. Required is common

`required` belongs to the common ERP input contract rather than being
implemented independently by a subset of fields.

Required does not overwrite the semantic state:
- required empty -> state `empty`, valid false, required issue;
- required null -> state `null`, valid false, required issue;
- required selection missing -> state `no-selection`, valid false,
  selection-required issue.

## 8. Validation is non-destructive

Validation must never erase, replace, clamp, or silently normalize an invalid
editable user draft merely to make it valid.

The control preserves the user-visible entry and reports issues.

This law applies especially to:
- URL;
- telephone;
- numeric/money text editing;
- ComboBox query/draft;
- password/domain text fields.

Normalization may occur only where it is semantics-preserving and explicitly
part of the control contract.

## 8.1 Typed character admission and canonicalization

Non-destructive validation does **not** mean that every specialized input must
accept arbitrary characters.

The editor boundary and the validation boundary are separate:

- generic text fields may admit ordinary text;
- URL admits progressive HTTP/HTTPS URL syntax only. Arbitrary prose and raw
  whitespace are rejected by the editor. An incomplete but structurally
  progressive URL draft (for example `https://`) remains visible and invalid
  until corrected. The CVA value is published only when the URL is empty or
  fully accepted by the URL/domain pattern;
- Tel canonicalizes user editing to an optional single leading `+` followed
  by ASCII digits only. Spaces and other characters are removed. A canonical
  draft may remain visible while too short/long or while failing an approved
  developer pattern; it is published only when admitted by that final pattern;
- Number, Money, and NumberStepper admit only progressive numeric syntax
  (optional leading sign, digits, and one decimal point). Letters and unrelated
  punctuation never become the editor draft;
- numeric values that are syntactically numeric but violate min/max/step or an
  approved domain constraint remain visible and invalid. They are not clamped
  merely to make validation pass.

Therefore the invariant is:

**reject characters that do not belong to the control domain; preserve admitted
typed drafts when their value is invalid.**

This distinction is mandatory for both component-level validation and Angular
Forms integration.

## 9. Automatic visual/accessibility projection

Validation is not dependent on the developer manually setting
`status="danger"`.

When validation is invalid:
- native/semantic control exposes `aria-invalid="true"`;
- validation feedback is available to the FieldFrame;
- current validation error messages can be presented through the standard
  feedback region;
- explicit product/business status may coexist, but cannot suppress invalid
  accessibility state.

## 10. External/business validation

The architecture must permit server/business validation to join the same issue
model without replacing client issues.

Recommended future input:

```ts
readonly externalValidationIssues =
  input<readonly ErpInputValidationIssue[]>([]);
```

Final issues are the deterministic merge of built-in + domain + custom/external
issues.

## 11. Angular Forms integration

ERP inputs remain ControlValueAccessor controls.

The implementation should also expose the same issue codes through Angular
validation integration so form-level validity and component-level
`validationIssues/errors` cannot disagree.

There must be one validation source of truth, not a separate Angular-validator
implementation with different rules.

## 12. Error ordering

Errors must have deterministic ordering:
1. presence/required;
2. type/format;
3. min/max/length/step constraints;
4. domain-specific rules;
5. custom rules;
6. external/server rules.

Do not stop at the first error when multiple independent issues can be
identified safely.

## 13. Product examples

Telephone:
- value: `++20123`
- state: `invalid-entry`
- valid: false
- possible errors:
  - plus sign count is invalid;
  - telephone length is below minimum.

TextBox:
- value: `''`
- required=false
- state: `empty`
- valid=true
- errors=[]

ItemPicker:
- value: null
- required=true
- state: `no-selection`
- valid=false
- errors=[selection required]

NumberBox:
- draft: `150`
- max=100
- state: `invalid-entry`
- valid=false
- visible draft remains `150`;
- error code `number.max`.

## 14. Implementation boundary

This document is an architecture decision, not proof of implementation.

Implementation must be introduced centrally through InputBase/FieldBase hooks
and typed control-specific validators. Do not copy independent state/error logic
into every control.
