# Honesty ERP Visual Review Experience V1

## Scope and ownership

This contract changes Design Lab review pages only. It does not change any
production component visual contract or Product Owner lifecycle decision.

- `ComponentShowcase` owns common page context, provenance, lifecycle state,
  technical details, and section navigation.
- The generated dedicated showcase owner for each public component owns its
  truthful gallery, one live target, its API controls, and event evidence.
- `ErpReviewShowcaseReferenceComparison` owns comparison layout and provenance.
- `ErpReviewShowcaseEvidenceImage` is the bounded review-only native image
  owner. Production consumers do not gain a native-image bypass.
- `erp-review-exact-core-showcase` remains the on-demand complete reference
  evidence for Avatar, AvatarPicker, Select, StatusBadge, Tabs, and the
  multi-owner Table experience.
- `/components/app-shell` continues to control the one real root AppShell
  through `ErpReviewAppShellWorkbenchState`; it never creates a nested shell.

## Generated review contract

Every one of the 81 public entries provides machine-readable:

- `reviewStatus`, grounded in the lifecycle authority;
- `reviewReference`, distinguishing exact local, external Skodash, and original
  Honesty ERP candidates;
- `reviewGalleryGroups`, derived from real supported showcase cases and public
  facets rather than invented variants.

The route order is Gallery, Reference Comparison, Live Preview, collapsed
Advanced API Controls, and Event Evidence. Gallery instances are secondary
evidence and never carry `data-showcase-target`. They retain their own initial
values so edits to the live workbench do not mutate the comparison gallery.

## Reference truthfulness

Committed, legitimately obtained captures are reused where they already exist.
When no image is available, the comparison displays an explicit unavailable
state and the genuine source or contract. It does not use an iframe, vendor
runtime, substitute image, or fabricated measurement. Original Honesty ERP
candidates are labeled as such.

## Acceptance boundaries

`ErpCheckBox` remains the only accepted/frozen visual owner. `ErpSelect`,
`ErpEmptyState`, `ErpTabs`, `ErpTable`, and `ErpUserMenu` remain reopened. All
other public owners remain pending/unknown. Technical verification and internal
visual review do not change those Product Owner states.
