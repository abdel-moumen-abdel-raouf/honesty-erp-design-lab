# Honesty ERP — Typography Primitives V1

- Foundation V1 frozen.
- Component Token Framework V1 frozen.
- Structural Primitives V1 frozen.
- Typography Primitives reference waiver granted.
- ErpText is the ONLY public Typography Primitive.
- All production rendered text must be governed by ErpText.
- No ErpHeading exists.
- No ErpLink exists.
- Future Controls and Composites must render textual UI through ErpText.

## Supported usages

The custom-element form is the ergonomic default:

```html
<erp-text type="paragraph">...</erp-text>
```

The native-host `[erpText]` form uses the SAME component and is required when
native element semantics, browser behavior, or strict parent/child HTML structure
must be preserved:

```html
<h1 erpText type="heading-1">...</h1>
```

Examples requiring or preferring native-host mode include:

- `h1`–`h6`
- `a`
- `label`
- `legend`
- `figcaption`
- `caption`
- `li`
- `dt`
- `dd`
- `th`
- `td`
- `time`
- `data`
- `ruby`
- `rt`
- `rp`
- `summary`
- `output`

No second typography component is introduced.

## Link typography and navigation

Custom `<erp-text type="link">` provides the link typography preset only. Real
navigation uses native-host `<a erpText type="link">`. Native `href` and Angular
`RouterLink` remain owned by the anchor/control layer. There is still no ErpLink
component.

## Native semantic mode

When exact native semantics matter, use the same ErpText component as an
attribute:

```html
<h1 erpText type="heading-1">...</h1>
<label erpText type="label" for="customer">...</label>
<figcaption erpText type="figcaption">...</figcaption>
<li erpText type="list-item">...</li>
<dt erpText type="term">...</dt>
<dd erpText type="description">...</dd>
<caption erpText type="caption">...</caption>
<th erpText type="table-header">...</th>
<td erpText type="table-cell">...</td>
<a erpText type="link" [routerLink]="...">...</a>
```

This is the SAME component, not a second primitive.

## Breaks and thematic separation

`br` and `wbr` contain no text themselves. They are allowed inside
ErpText-controlled content. Do not create ErpText types for `br` or `wbr`.

Raw production `hr` is not used. Use the frozen ErpDivider primitive for
thematic separation.
