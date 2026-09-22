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

The only supported authoring form is the custom element:

```html
<erp-text type="paragraph">...</erp-text>
```

`[erpText]` native-host authoring is not supported.

ErpText has three implementation categories:

1. A safe internal-native type emits a useful native semantic child inside the
   `erp-text` host.
2. A host-only semantic/text type projects content directly when its matching
   native element would be invalid in the custom host.
3. A future parent-owned structural semantic is created by the Structural,
   Control, or Composite component that owns the required native parent/child
   structure, with ErpText governing its textual content.

Safe internal-native types include headings, paragraphs, common inline
semantics, links, labels, time/data values, code-like text, and output.

Structural-context types do not emit invalid matching native elements:

- `hgroup`
- `figure`
- `figcaption`
- `ruby`
- `ruby-text`
- `ruby-parenthesis`
- `legend`
- `caption`
- `summary`
- `list-item`
- `term`
- `description`
- `table-header`
- `table-cell`

No second typography component is introduced.

## Link typography and navigation

An ErpText link with `href` emits one internal native anchor:

```html
<erp-text type="link" href="/path">...</erp-text>
```

An ErpText link without `href` still emits the same native anchor and provides
the link typography preset. Typography V1 introduces no Router dependency and
no ErpLink component.

## ErpContainer policy

ErpContainer is not the replacement for an arbitrary `div`. ErpContainer owns
width constraints, max-width, centering, and page gutters.

Text-only block content uses:

```html
<erp-text type="div">...</erp-text>
```

Use ErpContainer only when its frozen structural contract is required.

## Overflow and Clamp Precedence

- `overflow="ellipsis"` establishes truncation behavior.
- Canonical custom `erp-text` mode creates its own bounded truncation box.
- An internal native child does not change the outer host display contract.
- `lineClamp > 0` has higher rendering precedence than `wrap` and `overflow`.
- A positive `lineClamp` forces:
  - hidden overflow;
  - clipped text-overflow;
  - normal white-space;
  - multi-line clamp mechanics.
- The public input values/data attributes remain unchanged; precedence is a
  rendering rule.

## Text Selection

- Every ErpText is unselectable by default.
- Public boolean input: `selectable`.
- Default: `false`.
- `<erp-text selectable>` enables normal text selection.
- `[selectable]="true|false"` is supported.
- `selectable` is independent of type and all presentation presets.
- Selection is a CSS interaction mechanic, not a Component Token.
- Internal native semantic elements inherit the host selection behavior.

```html
<erp-text type="paragraph">
  Unselectable by default
</erp-text>

<erp-text type="code" selectable>
  INV-2026-001
</erp-text>
```

## Breaks and thematic separation

`br` and `wbr` contain no text themselves. They are allowed inside
ErpText-controlled content. Do not create ErpText types for `br` or `wbr`.

Raw production `hr` is not used. Use the frozen ErpDivider primitive for
thematic separation.
