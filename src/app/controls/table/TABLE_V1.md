# ErpTable V1

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
