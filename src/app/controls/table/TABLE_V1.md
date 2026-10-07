# ErpTable V1 — historical visual contract (SUPERSEDED)

> Current visual authority: `ERP-TABLE.html`, SHA-256
> `292E6D4A7A6D7BABCD8349AA69A346EB6A75656A2ED63380176AD1E22E2ECED1`,
> recorded in `ERP_TABLE_REFERENCE_EXACT_V1.md`. The behavior/history below is
> retained for audit only and is not the current visual authority.

`ErpTable` owns semantic visual table rendering only. It does not own HTTP, server paging/filtering, business rules, bulk actions, or SmartTable orchestration.

## Controlled row contract

- `selectedKeys` is controlled presentation input.
- `rowActivated` is an interaction intent.
- Activating a row does not mutate `selectedKeys`; the parent owns selection state.

## Cell rendering

- Uncustomized cells use the default ErpText renderer.
- Consumers may project a keyed template with `ng-template erpTableCell="columnKey"`.
- The template context exposes `$implicit`/`row`, `value`, `column`, and `rowIndex`.
- Table remains unaware of StatusBadge, Avatar, buttons, or other rich cell content.

Implemented under the Product Owner accelerated-wave no-external-reference waiver. Technical green does not equal Product Owner visual acceptance.
