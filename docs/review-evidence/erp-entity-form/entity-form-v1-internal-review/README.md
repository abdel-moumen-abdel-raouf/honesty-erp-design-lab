# Entity Form V1 internal review evidence

## Authority

- Contract: `src/app/controls/ENTITY_FORM_ENGINE_V1.md`.
- Classification: original Honesty ERP schema-driven form candidates under the
  explicit Phase 6 accelerated no-external-reference waiver.
- No external visual source or pixel-exact parity claim is attached to this
  evidence.
- Product Owner visual status remains pending.

## Reproduction

1. Run the Design Lab locally.
2. Set `HONESTY_REVIEW_URL` to that local origin when it differs from
   `http://127.0.0.1:5001`.
3. Run `node tools/review/capture-entity-form-evidence.mjs`.

The script opens a clean headless browser profile, exercises the public
workbenches, records interaction/state evidence, and writes the full-viewport
and live-target captures in this directory.

## Captured scenarios

| Scenario | Viewport / theme / direction | Live-target measurement | Evidence |
|---|---|---:|---|
| Complete schema field matrix | 1440×900 / Light / RTL | 950×649.73 px | `schema-fields-1440-light-rtl.png`, `schema-fields-1440-light-rtl-crop.png` |
| Complete schema field matrix | 390×844 / Dark / LTR | 276×1203.55 px | `schema-fields-390-dark-ltr.png`, `schema-fields-390-dark-ltr-crop.png` |
| Standard form — identity + submit intent | 1440×900 / Light / RTL | 950×544.59 px | `standard-identity-1440-light-rtl.png`, `standard-identity-1440-light-rtl-crop.png` |
| Standard form — identity | 390×844 / Dark / LTR | 276×1124.09 px | `standard-identity-390-dark-ltr.png`, `standard-identity-390-dark-ltr-crop.png` |
| Standard form — commercial + custom field update | 1440×900 / Light / RTL | 950×544.59 px | `standard-commercial-1440-light-rtl.png`, `standard-commercial-1440-light-rtl-crop.png` |
| Standard form — commercial + custom field update | 390×844 / Dark / LTR | 276×1146.72 px | `standard-commercial-390-dark-ltr.png`, `standard-commercial-390-dark-ltr-crop.png` |
| Standard form — custom attachments section | 390×844 / Light / RTL | 276×900.06 px | `standard-attachments-390-light-rtl.png`, `standard-attachments-390-light-rtl-crop.png` |
| Standard form — projected review template | 1440×900 / Dark / LTR | 950×544.59 px | `standard-review-1440-dark-ltr.png`, `standard-review-1440-dark-ltr-crop.png` |

## Results

- Runtime assertions: 48/48 passed.
- One primary `data-showcase-target` in every scenario.
- `ErpEntitySchemaFields`: 14 definitions with all 13 bounded built-in field
  owners plus one projected custom-field outlet.
- `ErpStandardEntityForm`: four controlled steps, controlled value update,
  submit intent, custom section, and projected review evidence.
- Horizontal page overflow: 0 px in every scenario.
- Live-target horizontal overflow: 0 px in every scenario.
- Reported clipped `ErpText` nodes: 0.
- Console errors/warnings: 0.

## Finding corrected during review

The schema renderer supplied an empty string to optional `pattern` inputs when
the schema omitted a pattern. In a real browser that created native
`pattern=""` constraints, marked otherwise valid non-empty text/domain fields
invalid, and prevented the standard form's submit event. The renderer now
preserves `null` for absent patterns. Regression coverage verifies that plain
text/password fields publish no empty native pattern, URL/telephone fields keep
their owned domain patterns, and the standard workbench emits a real
`submitRequested` event.

Machine-readable measurements and assertions are in
`runtime-measurements.json`.
