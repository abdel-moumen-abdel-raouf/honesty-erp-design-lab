# Honesty ERP — Component Token Framework V1

## 1. Layer Position

The architecture is:

Reference
→ Semantic
→ Theme / Density / Query Resolution
→ Component Tokens
→ Component Implementation

Foundation V1 is frozen.

Component Tokens are the next architectural layer.

This framework defines how future concrete Component Token contracts are authored.
It does not define any concrete component.

## 2. Concrete Module Structure

Every future public component owns:

src/styles/foundation/components/<component>/
  _tokens.scss
  _index.scss

`<component>` uses lowercase kebab-case.

Examples:

button
icon-button
select
smart-table
container

No concrete component directory is created by this framework task.

## 3. Sass Module Contract

`_tokens.scss` exports Sass mixins only.

Importing `_tokens.scss` must not emit CSS by itself.

Token mixin bodies may emit only Component Token custom-property declarations;
they must not emit ordinary CSS properties or selectors.

Every concrete token module must define:

@mixin base

Optional facet mixins use:

@mixin <facet>-<value>

Examples:

@mixin variant-solid
@mixin size-sm
@mixin tone-primary
@mixin density-compact

`_index.scss` forwards:

@forward 'tokens';

## 4. Canonical Runtime Token Grammar

Runtime Component Token names use:

--honesty-<component>[-<part>]-<property>[-<state>]

Examples of valid shapes:

--honesty-button-bg
--honesty-button-bg-hover
--honesty-button-border-color-disabled
--honesty-button-icon-size
--honesty-select-trigger-bg
--honesty-select-option-bg-selected
--honesty-table-row-bg-hover

The default state is omitted.

State names use kebab-case.

Common state vocabulary may include:

hover
active
focus-visible
disabled
selected
checked
invalid
open
read-only
loading

A concrete component defines only states it actually supports.

## 5. Canonical Slot Rule

`@mixin base` defines the complete canonical token contract for that component.

Facet mixins remap existing canonical slots.

Facet mixins must not introduce token names that are absent from `base`.

Variant, size, tone, density, orientation, and similar facet values do not create
combinatorial token namespaces.

Do not create contracts such as:

--honesty-button-solid-primary-sm-bg
--honesty-button-outline-danger-lg-border

Instead, the facet changes the value of the canonical slot such as:

--honesty-button-bg
--honesty-button-border-color
--honesty-button-height

## 6. Source Provenance

Semantic runtime contracts are the default source for Component Tokens.

Use Semantic contracts for shared meaning such as:

colors
surfaces
text
brand
feedback
focus
elevation
motion
layers
shared density-sensitive values
shared radius and border meaning

A Component Token may consume a Reference primitive directly only when:

1. the value is context-free;
2. no shared Semantic meaning is appropriate;
3. the Product Owner-approved component reference requires the physical value.

Permitted direct Reference categories are:

spacing
radius
borders
outlines
opacity
numeric typography metrics:
- font-size
- font-weight
- line-height

Forbidden direct Reference categories are:

colors
breakpoints
elevation
motion
z-index
font-family

Responsive behavior uses the public Foundation Query API.

## 7. Component-Local Structural Constants

A value that is inherently local to one component may be defined directly inside
that component's token contract when approved by its reference.

Examples:

container max-width
grid column count
component-local min-width
component-local max-width
component-local height
component-local width

Such a value remains Component-owned.

It is not automatically promoted into Foundation.

## 8. Host Emission

Component Tokens are emitted on the Angular component host.

They are never emitted on:

:root
html
body

Conceptual pattern:

@use '<component-token-module>' as tokens;

:host {
  @include tokens.base;
}

Facet mixins are applied by the component implementation through stable host
state/attributes.

## 9. Theme Ownership

Component Token modules do not contain:

[data-theme='light']
[data-theme='dark']

Theme-sensitive values flow through Semantic runtime variables.

Components do not duplicate Light/Dark mappings.

## 10. Density Ownership

First preference:

map Component Tokens to existing density-sensitive Semantic values.

If an approved component requires component-local density values, define the
applicable density facet mixins consistently.

For a component supporting all three product density modes, use:

density-compact
density-comfortable
density-spacious

Do not add Foundation density tokens for component-local values.

## 11. Responsive Ownership

Component Token modules contain no:

@media
@container

and do not consume raw Reference breakpoints.

Responsive implementation uses the public Foundation Query API.

A Query API block in the component implementation may apply an approved token
remap mixin.

Numeric breakpoints are not hard-coded.

## 12. Component Implementation Consumption

Production Component implementation consumes its own Component Tokens for tunable
design values.

It does not consume Reference or Semantic design values directly.

Typical tokenized design values include:

color
background
border color
border width
radius
spacing
padding
gap
font metrics
height/width constraints
opacity
elevation
layer
motion timing

Ordinary CSS mechanics are not design tokens.

Examples:

display
position
overflow
box-sizing
flex-direction
grid placement
pointer-events
cursor
white-space

## 13. Required Tokens Have No Fallback Masking

Required Component Tokens must not use CSS fallback masking.

Forbidden example:

var(--honesty-button-bg, red)

Required contract tokens must always be declared by the component token contract.

## 14. Public Contract vs Private Derived Variables

Stable Component Token API uses:

--honesty-<component>-*

If an internal derived runtime custom property is genuinely required, it uses:

--_honesty-<component>-*

Private variables:

- are not public Component Token API;
- are not consumed outside the component;
- may derive only from that component's own contract tokens;
- must not bypass the provenance rules.

## 15. Cross-Component Isolation

A component must never consume or override:

--honesty-<other-component>-*

A parent or composite configures child components through typed Angular APIs.

It does not customize children by mutating their Component Tokens.

If a child needs a new supported visual capability, extend that child's own
approved contract/API.

## 16. Feature and Page Isolation

Feature, Page, and Route code must not override Component Tokens.

Forbidden:

style.setProperty('--honesty-button-*', ...)
inline Component Token overrides
::ng-deep token overrides
page-level Component Token mutation

Supported variance goes through typed component APIs.

## 17. Reference-First Rule

Every visible production component requires:

- a Product Owner supplied primary visual reference; or
- an explicit Product Owner reference waiver.

The Component Token Framework does not authorize speculative concrete token
contracts.

## 18. Minimal Contract Rule

A concrete component gets only the tokens its approved implementation actually
uses.

Do not mirror the entire Semantic layer into every component.

Do not pre-create unused:

states
variants
sizes
tones
parts

## 19. Global Loading Rule

Concrete component token modules are not globally loaded from:

foundation/components/_index.scss

Each production component imports its own token module.

The Component Token Framework itself remains the only globally documented
component-layer contract at this stage.

## 20. Framework Status

This framework is nonvisual.

It requires no Design Lab visual route or visual specimen.

Concrete components receive their own future:

reference
token contract
implementation
specimen
human visual approval
