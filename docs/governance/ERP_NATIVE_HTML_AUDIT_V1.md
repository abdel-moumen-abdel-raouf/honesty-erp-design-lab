# ERP Native HTML Ownership Audit V1

## Result

The repository has one machine-readable native-element ownership registry in
`tools/catalog/erp-component-catalog.mjs`. The generated human-readable view is
`src/app/controls/ERP_NATIVE_ELEMENT_COVERAGE_V1.md`; the enforceable gate is
`tools/foundation/check-erp-native-element-ownership.mjs`.

The final scan covers every production `.html` template below `src/app` and
excludes test fixtures. Production TypeScript contains no inline component
templates at this checkpoint.

## Corrected violations

| Previous authoring | Location | Correction |
|---|---|---|
| Native `button` actions | `src/app/app.html` | Replaced by `ErpButton`; App remains the sole theme authority. |
| Native `select` / `option` | `src/app/review-internals/review-select/review-select.html` | Replaced by controlled `ErpSelect` composition and typed string intents. |
| Browser-event value extraction | Preferences and Empty State review consumers | Replaced by typed selection values from the ERP owner. |

## Enforced ownership rules

- Native action, input, form, table-family, image, and SVG authoring is allowed
  only in the exact owner paths registered for that semantic responsibility.
- Routed pages and review/showcase consumers cannot author native visible
  controls, headings, text semantics, or structural wrappers when the ERP
  gateway exists.
- Component internals may use native structural anatomy because the ERP owner
  is the public boundary. This does not authorize native controls whose
  ownership is globally assigned elsewhere.
- Exceptions are exact-path, exact-tag Design Lab owners with recorded reasons;
  there is no directory-wide review-page allowlist.

## Coverage gaps retained explicitly

| Native concern | Status | Boundary |
|---|---|---|
| Generic navigation anchor | CONTEXTUAL | `ErpBreadcrumbs` and `ErpSidebar` own their navigation contexts. The Design Lab chrome retains anchors only as review tooling; no public `ErpLink` was opened. |
| Generic semantic lists | NOT_YET_COVERED | Existing list semantics stay inside bounded owners such as Sidebar and notification/menu surfaces. No new List family was authorized. |
| Data visualization SVG | NOT_YET_COVERED | `review-chart` is an exact Design Lab drawing owner. A public Chart family was not opened. |
| General structural landmarks | CONTEXTUAL | ERP composites own landmarks internally; routed authoring uses ERP structural/composition owners. |

The gaps above are recorded rather than filled speculatively. They do not
authorize a new public component family.

## Self-test rejection evidence

The ownership checker deliberately rejects raw consumer `button`, `input`,
`select`/`option`, table-family markup, text headings, structural wrappers, and
lower-owner bypass such as a private search input inside Select. It accepts the
registered Button and Table owners, bounded component anatomy, and ERP-only
routed composition.
