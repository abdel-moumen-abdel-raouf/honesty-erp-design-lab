# Forms Composition V1 — Internal Review Evidence

## Authority

- `ErpForm`, `ErpFormSection`, `ErpFormActions`, `ErpValidationSummary`, and
  `ErpRepeater` remain original Honesty ERP candidates under the recorded
  accelerated-wave waiver in `src/app/controls/FORMS_BATCH_V1.md`.
- No external visual reference is claimed for these owners. The evidence covers
  the current typed ownership contracts, meaningful ERP composition, and actual
  interaction behavior.
- This package is internal visual-review evidence. It is not Product Owner
  visual acceptance.

## Reproduction

With the Design Lab running at `http://127.0.0.1:5001`, run:

```powershell
node tools/review/capture-forms-composition-evidence.mjs
```

The script creates a fresh browser profile, visits each dedicated route,
applies the recorded Light/Dark and RTL/LTR conditions, performs a meaningful
interaction, captures full-viewport and readable target crops, and records
console and layout measurements in `runtime-measurements.json`.

## Captured states

- `form-*`: a native-semantic `ErpForm` composed with `ErpFormSection`, two ERP
  fields, `ErpFormActions`, and an observed submit intent.
- `form-section-*`: title, description, two projected fields, and an observed
  projected section action.
- `form-actions-*`: primary and secondary slots with observable activation.
- `validation-summary-*`: two real validation issues and issue activation.
- `repeater-*`: two initial Arabic business rows plus a controlled third row
  added through the real component output.

Each owner is captured at 1440×900 Light/RTL and 390×844 Dark/LTR. The report
contains 60/60 passing runtime assertions, one target per route, zero browser
errors or warnings, zero detected text clipping, and zero page or target
horizontal overflow.

## Confirmed findings and corrections

1. The generated `ErpRepeater` workbench previously projected no item template
   and initialized with no rows, so its live target proved only an Add button.
   It now renders controlled Arabic supplier contacts and applies add/remove
   outputs to the same live target.
2. The `ErpForm` workbench previously showed one field and two ungrouped
   buttons. It now demonstrates the real Forms ownership chain through
   `ErpFormSection` and `ErpFormActions`.
3. `ErpFormSection` and `ErpFormActions` had projected controls without visible
   event evidence. Their actions now update the shared workbench event log.
4. The added Repeater row initially duplicated its numeric sequence in visible
   text. The consumer-owned sample label was corrected while preserving the
   component contract.

## Status

- `TECHNICAL_VERIFIED`: pending the canonical gate for this checkpoint.
- `INTERNAL_VISUAL_REVIEW_COMPLETED`: the stored captures were inspected after
  the corrections above.
- `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`: unchanged.
