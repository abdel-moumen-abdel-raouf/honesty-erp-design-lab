# Honesty ERP — Icon Primitive V1

- Foundation V1 is frozen.
- Component Token Framework V1 is frozen.
- Structural Primitives V1 is frozen.
- Typography Primitives V1 is frozen.
- The previous ERP ErpIcon implementation was supplied as the Product Owner reference.

## Public primitive

ErpIcon V1 is the only public icon-authoring primitive. Its selector is
`erp-icon`. NgIcon and the approved vendor icon packs are internal
implementation details. Consumers use semantic ERP icon names only.

The exact public API is:

- required `name: ErpIconName`;
- `size: ErpIconSize`, default `md`;
- `tone: ErpIconTone`, default `inherit`;
- `variant: ErpIconVariant`, default `outline`;
- `strokeWidth: ErpIconStrokeWidth`, default `regular`;
- `decorative: boolean`, default `true`;
- `label: string`, default empty.

There is no arbitrary SVG input, arbitrary size input, raw color/fill/stroke
input, numeric stroke-width input, click output, retry method, or compatibility
family/group/kind API. No vendor or source-pack name is exposed publicly.

## Semantic catalog

ErpIcon V1 contains exactly 72 semantic names. The original 48 names remain
unchanged and are followed by these 24 additions:

- `edit`
- `save`
- `upload`
- `download`
- `filter`
- `sort-ascending`
- `sort-descending`
- `more-horizontal`
- `more-vertical`
- `calendar`
- `clock`
- `lock`
- `unlock`
- `mail`
- `file`
- `folder`
- `attachment`
- `external-link`
- `help`
- `history`
- `undo`
- `redo`
- `plus`
- `minus`

`ERP_ICON_NAMES` is the sole public semantic-name source of truth.

## Sizes

ErpIcon V1 provides exactly 32 controlled public sizes.

Named UI sizes:

- `inherit` = `1em`
- `xs` = `1rem` / 16px
- `sm` = `1.25rem` / 20px
- `md` = `1.5rem` / 24px
- `lg` = `1.75rem` / 28px
- `xl` = `2rem` / 32px
- `2xl` = `2.5rem` / 40px
- `3xl` = `3rem` / 48px

Controlled jumbo sizes:

- `3.5xl` = `3.5rem`
- `4xl` = `4rem`
- `4.5xl` = `4.5rem`
- `5xl` = `5rem`
- `5.5xl` = `5.5rem`
- `6xl` = `6rem`
- `6.5xl` = `6.5rem`
- `7xl` = `7rem`
- `7.5xl` = `7.5rem`
- `8xl` = `8rem`
- `8.5xl` = `8.5rem`
- `9xl` = `9rem`
- `9.5xl` = `9.5rem`
- `10xl` = `10rem`
- `10.5xl` = `10.5rem`
- `11xl` = `11rem`
- `11.5xl` = `11.5rem`
- `12xl` = `12rem`
- `12.5xl` = `12.5rem`
- `13xl` = `13rem`
- `13.5xl` = `13.5rem`
- `14xl` = `14rem`
- `14.5xl` = `14.5rem`
- `15xl` = `15rem`

The jumbo scale advances in exact 0.5rem increments. The maximum V1 size is
`15xl` / `15rem`. Arbitrary numeric or CSS-string sizing is not supported.

## Color, Variant, and Stroke

`tone` is the semantic color/currentColor API. The exact tones are `inherit`,
`primary`, `secondary`, `muted`, `disabled`, `inverse`, `brand-primary`,
`brand-secondary`, `brand-accent`, `success`, `warning`, `danger`, and `info`.

`variant` is `outline | filled`. Its default is `outline`.

`strokeWidth` is `thin | light | regular | medium | bold`. The exact numeric
values are `1 | 1.5 | 2 | 2.5 | 3`, and the default is `regular` / `2`.

Stroke width applies only to the outline variant. The filled variant
intentionally ignores `strokeWidth`. Both the outline stroke and the filled
shape resolve through currentColor and the controlled `tone` contract.

No raw `color`, `fill`, `stroke`, or numeric `strokeWidth` consumer API exists.
Feature and page code must not override SVG paint.

## Vendor-pack resolution

The semantic registry is vendor-pack agnostic. Approved internal source sets
are Fluent UI, Tabler, Lucide, Heroicons, and Phosphor.

Outline sources resolve only from the approved stroke-capable source sets.
Filled sources resolve only from the approved filled/solid source sets. The
registry generator inspects actual installed exports and commits a static
named-import registry. Production code performs no runtime dynamic vendor
lookup.

Consumers never choose the source pack. Changing a source pack is an internal
registry decision that does not change the semantic public API.

## Accessibility and invalid lookup behavior

Icons are decorative by default and hidden from the accessibility tree.
Non-decorative ready icons require a meaningful explicit label and are exposed
with `role="img"` and the trimmed label. A non-decorative icon without a
non-empty label is marked with invalid accessibility state and safely hidden.

An invalid registry lookup renders no glyph, has invalid state, and remains
hidden. It never substitutes the semantic `error` icon.

## Direction and interaction

Logical directional icons mirror automatically in RTL through registry-owned
metadata. There is no public mirror, flip, or RTL input.

ErpIcon is non-interactive. Controls own click, focus, keyboard, disabled, and
other interaction behavior.

The registry may map multiple semantic names to the same vendor SVG. Vendors
may be replaced centrally without changing consumer APIs.

## Dependencies and licensing

The approved package dependencies are:

- `@ng-icons/core` `33.4.0`
- `@ng-icons/fluent-ui` `33.4.0`
- `@ng-icons/tabler-icons` `33.4.0`
- `@ng-icons/lucide` `33.4.0`
- `@ng-icons/heroicons` `33.4.0`
- `@ng-icons/phosphor-icons` `33.4.0`

The selected packs are MIT licensed. Package licensing remains with the
installed dependencies. No vendor SVG asset files are copied into public
assets, and no icon font or redistributed vendor asset folder is added.
