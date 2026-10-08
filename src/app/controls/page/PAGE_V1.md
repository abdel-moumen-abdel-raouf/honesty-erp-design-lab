# ErpPage V1

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
