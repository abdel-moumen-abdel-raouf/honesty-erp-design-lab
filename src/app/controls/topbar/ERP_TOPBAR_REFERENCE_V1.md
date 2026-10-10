# ErpTopbar reference-driven implementation contract V1

## 2026-10-11 Product Owner visual correction

The real root composition was reopened because its otherwise-contained regions
had incompatible heights, a wrapped screenshot action, internal BranchSelector
overflow, and 201–227.3px narrow headers. The bounded correction retains the
five-slot owner and all lower owners, but uses a deliberate grid composition,
a visually-hidden root BranchSelector label, single-line SearchBox trigger
copy, and a root-only opt-in compact UserMenu trigger below the `lg` query
boundary. The complete UserMenu identity and popup remain unchanged outside
that opt-in composition.

The measured result is 72px at 1440/1280/1024 and 140px at
768/390/320, with zero region/page overflow. Evidence lives at
`docs/review-evidence/erp-shell/topbar-visual-correction-v3/`. This is an
adaptation of the verified Skodash geometry around the binding Honesty ERP
UserMenu contract, not a claim of literal 60px parity. Product Owner visual
acceptance remains pending.

Date: 2026-10-09

Status: `TECHNICAL_VERIFIED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

## Authority and evidence boundary

- The recovered Skodash Topbar source is recorded in
  `../SHELL_REFERENCE_TOPOLOGY_V2.md`.
- Verified physical evidence includes a 60 px bar, 24 px inline padding,
  30% search region, 40 px utility triggers, the 1199 px Shell transition, and
  the 767 px narrow dropdown boundary.
- No claim of pixel-exact Topbar reconstruction is made. Honesty ERP uses its
  existing projection owners and system colors/fonts; Product Owner visual
  review remains pending.

## Projection ownership

`ErpTopbar` owns five canonical regions only:

1. `[erpTopbarStart]`
2. `[erpTopbarContext]`
3. `[erpTopbarSearch]`
4. `[erpTopbarActions]`
5. `[erpTopbarUser]`

There is no separate `[erpTopbarNotifications]` slot. Notification content is
an action-region consumer. The dedicated workbench composes
`ErpBranchSelector`, `ErpGlobalSearch`, `ErpNotificationBell`, and
`ErpUserMenu` through these regions.

## Boundaries

- Topbar owns no theme, routing, search transport, branch effects,
  notifications store, session, or authentication.
- App root remains the sole theme authority.
- Responsive behavior uses the Foundation Query API.
- Reused consumer owners retain their existing visual and behavioral contracts.

## 2026-10-10 integrated pressure correction

The real root composition proved that the preceding xxs rule stacked
BranchSelector, UserMenu and Search into a 283.30 px Topbar. An interim attempt
to place context and user together collapsed BranchSelector to 1 px and caused
44 px page overflow, so it was rejected. The final Foundation xxs rule places
BranchSelector and Search in one 136.5 px-per-region row and preserves the full
289 px UserMenu identity row. At 320 px the Topbar measures 227.30 px with zero
page/Shell horizontal overflow; no projected owner is hidden or clipped.

This is an authorized Honesty ERP containment correction. It is not claimed as
a Skodash source measurement and does not change Product Owner visual status.
