# Honesty ERP — Accelerated Forms Composition Batch V1

## Authority and status

The Product Owner authorized exactly six public composition owners:
`ErpForm`, `ErpFormSection`, `ErpFormActions`, `ErpValidationSummary`,
`ErpRepeater`, and `ErpStepper`.

This batch is implemented and canonically verified: 117/117 test files,
792/792 tests, both TypeScript typechecks, production build, and zero warnings;
initial bundle 374.97 kB / 85.34 kB estimated transfer and Forms Batch lazy
chunk 34.28 kB / 7.17 kB estimated transfer.
It remains a technical implementation candidate. Technical green does not equal
Product Owner runtime/visual approval or freeze.

## Reference audit

The audit searched repository source/documentation, available Product Owner
template directories, Downloads, and `erp-component-templates.zip`. No external
visual reference was found for any of the six owners. The Product Owner's
accelerated no-external-reference waiver therefore applies to this batch only.

| Component | External reference | Path | SHA-256 | Treatment |
| --- | --- | --- | --- | --- |
| ErpForm | No | N/A | N/A | Accelerated no-reference waiver |
| ErpFormSection | No | N/A | N/A | Accelerated no-reference waiver |
| ErpFormActions | No | N/A | N/A | Accelerated no-reference waiver |
| ErpValidationSummary | No | N/A | N/A | Accelerated no-reference waiver |
| ErpRepeater | No | N/A | N/A | Accelerated no-reference waiver |
| ErpStepper | No | N/A | N/A | Accelerated no-reference waiver |

## Shared contracts

`forms-family/forms-contracts.ts` owns the stable form-summary issue, controlled
repeater item/context, and step definition/panel contracts. It is not a form
schema or validation engine.

## Ownership boundaries

- `ErpForm` owns the native form semantic boundary and emits submit/reset
  intents. Consumer state, payloads, persistence, validation rules, and HTTP
  remain external.
- `ErpFormSection` owns titled semantic grouping and named actions projection.
- `ErpFormActions` owns responsive primary/secondary projection layout only.
- `ErpValidationSummary` renders shared typed issues through the existing Alert
  and Button language and emits issue activation intent.
- `ErpRepeater` renders a consumer-controlled keyed collection and emits add and
  remove intents. It does not mutate domain collections or own FormArray.
- `ErpStepper` owns generic step semantics, controlled active identity,
  keyboard/RTL navigation, and keyed rich panels. It is not Tabs, a workflow
  engine, or an Entity Wizard.

## Architecture and review

Each visual owner has an isolated Component Token module. The routed review at
`/controls/forms-batch` is ERP-only authored and includes the six individual
owners plus an integrated no-HTTP composition specimen. App remains the sole
Light/Dark authority and direction is inherited. The exact next action is
grouped Product Owner runtime/Light/Dark review; this contract authorizes no
subsequent implementation wave.

## Explicit non-goals

No `StandardEntityForm`, Form Engine/schema, Entity Field Registry, Entity
Wizard, entity/application pattern, SmartTable-adjacent application pattern,
Shell, Sidebar/Topbar, Navigation, Feature/Page migration, or seventh Forms
owner is opened by this batch.
