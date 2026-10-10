# Honesty ERP — Planned UI Pattern Readiness V1

## Authority

The Product Owner opened only the reusable presentation/composition portion of
the six documented planned identities on 2026-10-11. This does not open HTTP,
persistence, permissions, authentication, routing policy, CRUD transactions,
workflow execution, or domain rules. Components without a binding external
reference are labeled original Honesty ERP design candidates.

## Contract-readiness matrix

| Planned identity | Classification | Source-backed contract | Existing lower owners | Implementation decision | Deferred authority |
| --- | --- | --- | --- | --- | --- |
| ErpEntityReview | Distinct public presentation owner | Existing `ErpEntityReviewContext` supplies immutable `values`, `schema`, and active review `step` | `ErpFormSection`, `ErpText`, Entity Form schema contracts | Implement `erp-entity-review` as a read-only presenter for the existing context; no mutation or submit output | Consumer-specific custom-section rendering remains projected through the existing form review template |
| Entity Wizard | Review-only composition pattern | `ErpStandardEntityForm` already composes controlled `ErpStepper`, sections, review steps, and action intents | `ErpStandardEntityForm`, `ErpStepper`, `ErpEntityReview` | Demonstrate as a bounded StandardEntityForm composition; do not create a duplicate public wizard engine | Workflow policy, hidden validation, persistence, and automatic submission |
| Workflow engine | Business system, not a UI owner | No approved states, transitions, execution, persistence, or transport contract | None established | Defer; document only that controlled UI intents may integrate later | Entire workflow domain and execution contract |
| DataPage | Distinct reusable page-composition candidate | Product Owner authorizes Page/PageHeader/PageShell + SmartTable composition with consumer-controlled configuration and extension regions | `ErpPage`, `ErpPageHeader`, `ErpPageShell`, `ErpSmartTable` | Implement only after EntityReview, with typed pass-through data/query state and projection regions | Fetch, persistence, CRUD, permissions, routing, and domain DTOs |
| EntityDirectory | Presentation pattern over DataPage | Product Owner authorizes consumer-supplied entities, selection, filtering, search, and navigation intents | Future `ErpDataPage`, `ErpSmartTable` | Keep as review-only DataPage composition unless a non-duplicating public contract is proven during implementation | Data source, permissions, routing, create/update/delete operations |
| EntityDetail | Presentation pattern over Page and Entity Form | Product Owner authorizes consumer-provided read/edit/review composition and commands | `ErpPage`, `ErpPageShell`, `ErpStandardEntityForm`, `ErpEntityReview` | Keep as review-only composition unless a non-duplicating public contract is proven during implementation | Domain DTOs, edit policy, permissions, routing, persistence, and transactions |

## Dependency order

1. `ErpEntityReview`.
2. The Entity Wizard review composition using the existing form and step owners.
3. `ErpDataPage`.
4. EntityDirectory and EntityDetail review compositions using the verified
   lower owners.
5. Workflow engine remains deferred because it is not a presentation owner.

Technical verification and internal browser evidence do not establish Product
Owner visual acceptance.
