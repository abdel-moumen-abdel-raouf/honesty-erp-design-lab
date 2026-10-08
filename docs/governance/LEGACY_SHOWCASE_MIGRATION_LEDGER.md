# Legacy Showcase Migration Ledger

This ledger records the complete runtime migration from legacy aggregate review
pages to the dedicated `/components/:componentId` showcase system. A legacy
route remains only as a redirect; its former routed component no longer renders.

| Old route | Meaningful sections migrated to | Status | Redirect |
|---|---|---|---|
| `/foundation/overview` | `/components` catalog landing | MIGRATED | `/components` |
| `/primitives/structural` | container, grid, stack, inline, section, surface, divider | MIGRATED | `/components` |
| `/primitives/typography` | text | MIGRATED | `/components/text` |
| `/primitives/icons` | icon | MIGRATED | `/components/icon` |
| `/controls/buttons` | button, icon-button, button-group, split-button, fab, extended-fab, fab-menu | MIGRATED | `/components/button` |
| `/controls/tooltips` | tooltip | MIGRATED | `/components/tooltip` |
| `/controls/inputs` | text-box, text-area-box, password-box, number-box, money-box, tel-box, url-box, date-box, time-box, date-time-box, date-range-box, check-box, radio-box, radio-group, select, combo-box, search-box, item-picker, file-picker, image-picker, icon-picker, color-picker, range-slider, number-stepper | MIGRATED | `/components/text-box` |
| `/controls/empty-states` | empty-state | MIGRATED | `/components/empty-state` |
| `/controls/overlays` | select, combo-box, search-box, item-picker, filter-drawer, notification-bell, user-menu, tooltip | MIGRATED | `/components` |
| `/controls/core-batch` | select, status-badge, alert, skeleton, avatar, avatar-picker, tabs, table, pagination | MIGRATED | `/components` |
| `/controls/data-batch` | sort-header, column-chooser, filter-bar, filter-drawer, table-toolbar, bulk-action-bar, view-switcher, smart-table | MIGRATED | `/components` |
| `/controls/forms-batch` | form, form-section, form-actions, validation-summary, repeater, stepper | MIGRATED | `/components` |
| `/controls/entity-form-batch` | standard-entity-form, entity-schema-fields | MIGRATED | `/components` |
| `/controls/shell-batch` | app-shell, topbar, sidebar, branch-selector, global-search, notification-bell, user-menu, breadcrumbs, page-header, page-shell, page | MIGRATED | `/components` |
| `/foundation/colors` | cross-cutting documentation retained under `docs/foundation`; component color states are covered by dedicated owners | MIGRATED | `/components` |
| `/foundation/colors/status-hues` | cross-cutting documentation retained under `docs/foundation`; status owners cover live evidence | MIGRATED | `/components` |
| `/foundation/themes` | cross-cutting documentation retained under `docs/foundation`; all component routes inherit App theme | MIGRATED | `/components` |
| `/foundation/feedback-colors` | status-badge and feedback owners | MIGRATED | `/components/status-badge` |
| `/foundation/typography` | text | MIGRATED | `/components/text` |
| `/foundation/charts` | `docs/foundation/charts/COVERAGE_GAP.md` | MIGRATED | `/components` |
| `/foundation/preferences` | cross-cutting documentation retained under `docs/foundation` | MIGRATED | `/components` |
| `/foundation/spacing` | structural and layout component showcases | MIGRATED | `/components` |
| `/foundation/borders-radius` | structural, surface, and control owner showcases | MIGRATED | `/components` |
| `/foundation/elevation` | surface and overlay-consuming component showcases | MIGRATED | `/components/surface` |
| `/foundation/motion` | interactive component showcases | MIGRATED | `/components` |
| `/foundation/density` | bounded component density evidence | MIGRATED | `/components` |
| `/foundation/layout-grid` | grid | MIGRATED | `/components/grid` |
| `/foundation/layers` | surface and overlay-consuming component showcases | MIGRATED | `/components/surface` |

Unmapped meaningful legacy sections: **0**.

The Product Owner exact-reference evidence from the former Core Batch is not
discarded. It now lives in the Design-Lab-only
`src/app/review-internals/exact-core-showcase/` suite and is focused by the
dedicated pages for Select, StatusBadge, Alert, Skeleton, Avatar, AvatarPicker,
Tabs, Table, and Pagination.
