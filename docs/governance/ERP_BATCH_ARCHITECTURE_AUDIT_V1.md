# ERP Batch Architecture Audit V1

## Scope

This is an architecture-only audit of the four existing grouped review routes.
It does not alter their visual contracts, declare Product Owner approval, or
open another component wave.

## Audit matrix

| Route | Required owner chain | Evidence | Result |
|---|---|---|---|
| `/controls/data-batch` | Data contracts → Filter/Chooser/Toolbar/Bulk/View owners → `ErpSmartTable` → `ErpTable` | The routed component imports and composes all public Data/Table owners; Table keeps native table semantics, CheckBox selection, SortHeader sorting, controlled visibility/query/selection. | PASS |
| `/controls/forms-batch` | Input/Field/Button owners → Form/Section/Actions/Validation/Repeater/Stepper | The routed page uses ERP owners only; rich repeater/stepper templates remain isolated in the Design Lab internal template-evidence owner. | PASS |
| `/controls/entity-form-batch` | Typed schema → Entity schema fields/custom outlets → Forms owners → approved controls | Values remain immutable and consumer-controlled; the review route owns no HTTP, persistence, permissions, domain services, or native field rendering. | PASS |
| `/controls/shell-batch` | Navigation contracts → Breadcrumbs/PageHeader/PageShell + shell entries → Sidebar/Topbar → AppShell | Shell owners consume already-supplied state and emit intents. App remains the only theme authority; the review route does not replace Design Lab chrome. | PASS |

## Page ownership reconciliation

`ErpPage` now owns production page width, responsive gutter, available
block-size, and scroll policy. `ErpPageShell` no longer imports or embeds
`ErpContainer`; it owns only header/main/context/footer composition. `ErpAppShell`
continues to own global frame composition and publishes an inherited available
block-size contract for page-scrolling mode. It still owns no page content,
theme, router definition, session, permissions, or transport.

Future production Feature/Page routes must root their content in `ErpPage`.
Existing Design Lab routes remain review tooling and are not migrated by this
wave.

## Acceptance boundary

Automated audit PASS is technical evidence only. Core, Data/Table, Forms,
Entity Form Engine, and Shell visual/runtime acceptance remains a grouped
Product Owner gate unless a newer explicit decision changes it.
