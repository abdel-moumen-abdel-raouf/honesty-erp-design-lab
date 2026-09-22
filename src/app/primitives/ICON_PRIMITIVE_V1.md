# Honesty ERP — Icon Primitive V1

- Foundation V1 is frozen.
- Component Token Framework V1 is frozen.
- Structural Primitives V1 is frozen.
- Typography Primitives V1 is frozen.
- The previous ERP ErpIcon implementation was supplied as the Product Owner reference.

## Public primitive

ErpIcon V1 is the only public icon-authoring primitive. Its selector is
`erp-icon`. NgIcon and Fluent UI are internal implementation details.
Consumers use semantic ERP icon names only.

The exact public API is:

- required `name: ErpIconName`;
- `size: ErpIconSize`, default `md`;
- `tone: ErpIconTone`, default `inherit`;
- `decorative: boolean`, default `true`;
- `label: string`, default empty.

There is no arbitrary SVG input, arbitrary pixel-size input, click output, retry
method, or compatibility family/group/kind API.

## Sizes

- `inherit`: `1em`
- `xs`: `0.75rem` (12px)
- `sm`: `1rem` (16px)
- `md`: `1.25rem` (20px)
- `lg`: `1.5rem` (24px)
- `xl`: `2rem` (32px)
- `2xl`: `2.5rem` (40px)
- `3xl`: `3rem` (48px)

## Tones

The exact tones are `inherit`, `primary`, `secondary`, `muted`,
`disabled`, `inverse`, `brand-primary`, `brand-secondary`,
`brand-accent`, `success`, `warning`, `danger`, and `info`.

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

The registry may map multiple semantic names to the same vendor SVG. The vendor
may be replaced centrally in the future without changing consumer APIs.

## Dependencies and licensing

- `@ng-icons/core` `33.4.0` is an MIT-licensed package dependency.
- `@ng-icons/fluent-ui` `33.4.0` provides the selected MIT-licensed Fluent UI
  icon set as a package dependency.
- Package licensing remains with the installed dependencies.
- No vendor SVG asset files are copied into this repository.
- No icon font or redistributed vendor asset folder is added.
