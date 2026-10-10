# Entity Detail review-only composition evidence

Route: `/patterns/entity-detail`.

This is an original Honesty ERP review composition over `ErpPage`,
`ErpStandardEntityForm`, and `ErpEntityReview`. It is not a new public Detail
owner. The consumer switches view/edit/review modes and receives save/cancel
intents. No DTO, edit policy, routing, transaction, persistence, permission, or
backend behavior is claimed.

The desktop Light/RTL and 390 px Dark/LTR captures start at the page boundary
and keep exactly one lower-owner target. Mixed-direction email/telephone values
use the established `ErpText` direction contract. Measurements report no
unexpected clipping, horizontal overflow, or browser diagnostics.
