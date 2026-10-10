# Entity Wizard review-only composition evidence

Route: `/patterns/entity-wizard`.

This is an original Honesty ERP review composition over
`ErpStandardEntityForm`, `ErpStepper`, and `ErpEntityReview`. It is not a new
public Wizard owner. The consumer controls the active step and form values;
submit/reset/cancel remain observable intents. No workflow, hidden validation,
persistence, transport, permissions, or backend behavior is claimed.

`entity-wizard-1440-light-rtl.png` and
`entity-wizard-390-dark-ltr.png` are full-viewport captures. Matching
`-target.png` files preserve the live owner at readable scale.
`runtime-measurements.json` records one target/owner, no unexpected clipping or
horizontal overflow, and no browser diagnostics.
