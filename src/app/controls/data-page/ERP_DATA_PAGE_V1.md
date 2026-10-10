# ErpDataPage V1

`ErpDataPage` is an original Honesty ERP reusable page-composition candidate.
No binding external visual reference is claimed.

It composes `ErpPage`, `ErpPageShell`, `ErpPageHeader`, and `ErpSmartTable`.
Consumers provide rows, columns, query state, page copy, rich table cells, and
optional typed DataPage projection markers that delegate into the existing
PageHeader, PageShell, and SmartTable regions. Query, row activation, refresh,
and export remain
typed intents.

Side and footer regions are opt-in through `showSide` and `showFooter`, so an
unused projection never reserves page geometry. PageShell retains compatible
visible defaults for direct consumers.

It owns no HTTP, data source, cache, CRUD mutation, DTO mapping, routing,
permissions, persistence, or backend behavior. Its models are controlled
pass-through state to the existing SmartTable owner.
