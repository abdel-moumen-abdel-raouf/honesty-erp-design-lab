# Honesty ERP — ErpEntityReview V1

## Authority and reference

The Product Owner authorized a reusable, presentation-only Entity Review
candidate on 2026-10-11. Repository and external-reference audit found no
binding visual source for this owner. The current candidate is therefore an
original Honesty ERP design using existing system typography, spacing,
surfaces, field schema, and responsive contracts. It is not represented as a
vendor replica or Product Owner-approved visual.

## Public contract

- `context` is the required existing `ErpEntityReviewContext` containing an
  immutable value snapshot, its `ErpEntityFormSchema`, and the active review
  step.
- `compact` controls only bounded presentation density.
- Empty, boolean, sensitive, and custom-section labels are localizable inputs.
- The owner emits no mutation, submit, persistence, route, permission, or
  transport intent.
- Password-like values are masked; Select and Radio values resolve through
  their existing option labels.
- Missing step sections fail deterministically instead of being omitted.

## Composition and ownership

`ErpEntityReview` composes `ErpFormSection` and `ErpText`. It reuses the Entity
Form schema/value contracts and owns no input, form, validation, workflow, or
formatting engine. Consumer-specific custom-section content remains the
consumer's responsibility through the existing `erpEntityFormReview` template
contract; the generic owner labels it explicitly rather than inventing data.

The Component Token module is
`src/styles/foundation/components/entity-review/_tokens.scss`; narrow behavior
uses the Foundation container Query API. App remains the sole theme authority.

## Evidence and status

The dedicated route is `/components/entity-review`, with one primary live
target, structured context control, bounded gallery states, and truthful
original-design comparison metadata. Browser evidence is under
`docs/review-evidence/planned-ui-patterns/entity-review-v1/`.

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, and
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING` after the recorded gates pass.
