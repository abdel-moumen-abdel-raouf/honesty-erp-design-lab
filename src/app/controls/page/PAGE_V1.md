# ErpPage V1

## Current verification state — 2026-10-10

`ErpPage`, `ErpPageHeader`, and `ErpPageShell` completed internal browser
review under the recorded no-external-reference waiver. The dedicated routes
retain one primary target each and demonstrate all Page modes, complete
PageHeader named projection and action evidence, and complete responsive
PageShell regions. Six desktop/narrow Light/Dark RTL/LTR scenarios pass 30/30
runtime assertions with zero clipping, horizontal overflow, or browser
diagnostics. Evidence is stored under
`docs/review-evidence/erp-page/page-composition-v1-internal-review/`.

This is technical and internal visual evidence only. Product Owner visual
acceptance is not recorded.

## Ownership

`ErpPage` is the production page boundary. It owns the page's responsive inline
gutter, bounded or unbounded width policy, available block-size contract, and
scrolling policy. It projects arbitrary ERP-authored page composition.

The default is `widthMode="fluid"` with `scrollMode="document"`, preserving the
existing full-width page gutter behavior. `boxed` centers the page inside the
Page Component Token maximum. `full` removes both the maximum and page gutter.

`document` delegates scrolling to the surrounding document or shell. `page`
uses the inherited Foundation `--honesty-layout-available-block-size` contract and owns its
block-axis scroll. `free` removes minimum block-size and scroll containment for
bounded embedded composition.

## Boundaries

`ErpPage` owns no theme, router, HTTP, session, permissions, business state,
body mutation, page header, global navigation, or application shell. It does
not replace `ErpPageShell`: the latter owns header/main/context/footer
composition inside an `ErpPage` boundary.

The Design Lab routes are review tooling and are not required to root
themselves in `ErpPage`. Future production Feature/Page routes must use it.
