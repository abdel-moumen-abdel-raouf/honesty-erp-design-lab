# Honesty ERP — Schema-Driven Entity Form Engine V1

## Authority and status

The Product Owner explicitly opened Phase 6 for exactly four public owners:

- `ErpStandardEntityForm`;
- `ErpEntitySchemaFields`;
- `ErpEntityCustomFieldOutlet`;
- `ErpEntityCustomSectionOutlet`.

This is a bounded repetitive-CRUD composition engine. It is not a page
generator, workflow engine, business-rule engine, persistence layer, or HTTP
client. Technical verification does not imply Product Owner visual approval or
freeze.

Canonical verification passed 121/121 test files, 809/809 tests, both
TypeScript typechecks, production build, and zero warnings. The initial bundle
is 375.34 kB / 85.44 kB estimated transfer; the Entity Form lazy chunk is
37.44 kB / 6.88 kB estimated transfer. Product Owner runtime/Light/Dark review
remains pending.

## Reference audit

The audit searched repository source/documentation, available Product Owner
template directories, Downloads, and `erp-component-templates.zip`. No external
visual reference was found for any of the four owners. The Product Owner's
Phase 6 accelerated no-external-reference waiver therefore applies only to
these four owners.

| Owner | External reference | Path | SHA-256 | Treatment |
| --- | --- | --- | --- | --- |
| ErpStandardEntityForm | No | N/A | N/A | Accelerated no-reference waiver |
| ErpEntitySchemaFields | No | N/A | N/A | Accelerated no-reference waiver |
| ErpEntityCustomFieldOutlet | No | N/A | N/A | Accelerated no-reference waiver; nonvisual template directive |
| ErpEntityCustomSectionOutlet | No | N/A | N/A | Accelerated no-reference waiver; nonvisual template directive |

## Schema and value ownership

`entity-form-contracts.ts` owns one discriminated V1 schema. Stable field keys,
section IDs, and step IDs are mandatory. Values are controlled immutable
snapshots of `ErpEntityFormValues`; the engine never mutates the consumer's
record. Field changes emit the stable key, normalized value, and an immutable
next snapshot.

The engine may keep only generic presentation state such as the active
configured step through the controlled `activeStepId` model. Reaching the last
step never submits automatically.

## Built-in field matrix

| Kind | Approved owner | Value | Read-only mapping |
| --- | --- | --- | --- |
| `text` | ErpTextBox | string | supported |
| `textarea` | ErpTextAreaBox | string | supported |
| `password` | ErpPasswordBox | string | supported |
| `url` | ErpUrlBox | string | supported |
| `telephone` | ErpTelBox | string | supported |
| `number` | ErpNumberBox | number/null | supported |
| `money` | ErpMoneyBox | number/null | supported |
| `checkbox` | ErpCheckBox | boolean | supported |
| `radio` | ErpRadioGroup | string/null | supported |
| `select` | ErpSelect | string/string[]/null | not exposed by current Select API |
| `date` | ErpDateBox | ISO string/null | not exposed by current temporal API |
| `time` | ErpTimeBox | ISO time/null | not exposed by current temporal API |
| `date-time` | ErpDateTimeBox | ISO date-time/null | not exposed by current temporal API |

All built-in kinds forward supported required, disabled, constraint, helper,
option, and external-validation configuration to existing ERP controls. The
schema renderer uses standalone `ngModel` only as the existing CVA bridge; it
does not register a new value accessor or validator.

File/Image pickers, ItemPicker, ComboBox, ColorPicker, complex ranges, domain
selectors, and other unlisted controls are intentionally unsupported in V1 and
must use a custom-field or custom-section outlet. An unknown field kind throws
`ErpEntityFormSchemaError`; it is never silently skipped or replaced by a raw
native control.

## Sections, steps, review, and escape hatches

- A fields section renders its typed definitions through
  `ErpEntitySchemaFields` inside `ErpFormSection`.
- A custom section names an `ErpEntityCustomSectionOutlet`; a missing outlet
  fails deterministically.
- A custom field names an `ErpEntityCustomFieldOutlet`; its typed context
  exposes field, key, current value, containing section, validation issues, and
  a controlled update intent.
- Optional steps compose the existing controlled `ErpStepper`. Step navigation
  has no hidden validation or workflow policy.
- `erpEntityFormReview` is a supporting template directive, not an
  `ErpEntityReview` public component. It receives the current immutable value
  snapshot, schema, and active review step. Without a supplied template, the
  engine invents no review UI.

## Validation and actions

Form-level issues remain `ErpFormValidationIssue` and render through the
existing `ErpValidationSummary`. Matching field issues are adapted to the
existing `ErpInputValidationIssue` external-validation input; no second errors
format or validator engine exists.

`ErpStandardEntityForm` composes `ErpForm`, `ErpFormSection`,
`ErpFormActions`, `ErpValidationSummary`, `ErpEntitySchemaFields`, and optional
`ErpStepper`. Submit, reset, and cancel are intents only. The engine owns no
permissions, HTTP, persistence, DTO mapping, optimistic locking, or backend
validation semantics.

## Visual ownership

Only the visual owners have Component Token namespaces:

- `standard-entity-form`;
- `entity-schema-fields`.

The two outlet directives render no independent visual surface and therefore
intentionally own no token modules. App remains the sole Light/Dark authority,
direction is inherited, and narrow layout uses the Foundation Query API.

## Review evidence and scope boundary

The ERP-only route `/controls/entity-form-batch` demonstrates the four owners,
a representative multi-section CRUD record, controlled value changes,
validation summary, custom field/section escape hatches, steps, optional review
projection, disabled/read-only fields, RTL/theme inheritance, narrow layout,
submit/reset/cancel intents, and deterministic unsupported-kind evidence.

This phase does not open standalone EntityReview, Entity Wizard, workflow
engine, DataPage, EntityDirectory, EntityDetail, Shell/navigation, reusable
page patterns, feature/page migration, backend services, or ERP-specific domain
editors. Phase 7 remains unopened.
