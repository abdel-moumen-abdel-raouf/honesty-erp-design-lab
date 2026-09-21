# Honesty ERP Design System — Token Technical Contract & Naming Specification

## 1. Architectural Token Hierarchy

The Honesty ERP design token system strictly adheres to a three-tier unidirectional token hierarchy:

```
Reference Tokens (Sass Compile-Time Primitives)
       │
       ▼
Semantic Tokens (Runtime CSS Custom Properties)
       │
       ▼
Component Tokens (Runtime Component-Scoped CSS Custom Property Contracts)
       │
       ▼
Component Implementations
```

- **Reference Tokens (Layer 1):** The raw, context-free source of truth for all primitive values (scales, palettes, steps).
- **Semantic Tokens (Layer 2):** Purpose-driven tokens that assign functional meaning to reference values (surfaces, content, intent, feedback, states).
- **Component Tokens (Layer 3):** Scoped component contracts that consume semantic tokens (and in explicit exceptions, reference tokens) to isolate component styling from global naming changes.
- **Component Implementations:** Scoped component SCSS/CSS consumes only component tokens, never raw literals or reference values directly.

---

## 2. Hybrid Sass vs. Runtime CSS Custom Property Responsibilities

The Honesty ERP Design System adopts an intentional **Hybrid Representation**:

| Layer | Implementation Target | Emission Behavior | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Reference Tokens** | Sass variables / maps (`$` prefix) | **Compile-Time Only** (Does NOT emit CSS custom properties by default) | Context-free design primitives, mathematical scales, base color palettes. Tree-shaken and compiled out of client runtime bundles unless consumed by a higher layer. |
| **Semantic Tokens** | CSS Custom Properties (`--honesty-` prefix) | **Runtime Emission** from Semantic modules or Light/Dark Theme definitions, according to ownership | Runtime functional intent, including theme-independent contracts and theme-sensitive mappings. |
| **Component Tokens** | CSS Custom Properties (`--honesty-<component>-` prefix) | **Runtime Emission** at component host or base scope | Explicit component styling contracts. Enables local variations and predictable component-level theming without leaking styles. |
| **Themes** | CSS Selectors (`[data-theme='light']`, `[data-theme='dark']`) | Dynamic runtime declaration blocks | Resolves theme-sensitive Semantic Tokens after application preference resolution. Does not declare raw palette scales or layout rules. |
| **Density** | CSS Selectors (e.g., `[data-density="..."]`) | Dynamic runtime property overrides | Modulates density-sensitive Semantic/Component properties. Never redefines global raw reference scales. |

Theme-independent Semantic tokens may be emitted from Semantic modules in `:root`.
Current examples are Typography, Spacing, Radius, Border geometry, Motion, Layout,
and Layers. Theme-sensitive Semantic tokens are resolved inside the Light/Dark
theme selectors. Current examples are Surface/Text/Action/Feedback colors,
Border colors, Elevation, and Charts.

---

## 3. Naming Grammar & Syntax Rules

Names must describe **purpose and function**, never physical appearance or literal values.

### A. Reference Tokens (Sass Compile-Time)
- **Syntax:** `$honesty-ref-<category>-<name>`
- **Category:** `color`, `space`, `radius`, `border`, `elevation`, `motion`, `z-index`, `breakpoint`, `chart`, `font-size`, `line-height`, `font-weight`.
- **Name:** Scale step, hue step, or numerical designation (e.g., scale index, weight number).
- **Grammar Examples (Shape Only):**
  - `$honesty-ref-color-<palette>-<step>`
  - `$honesty-ref-space-<step>`
  - `$honesty-ref-radius-<step>`
  - `$honesty-ref-font-size-<step>`
  - `$honesty-ref-motion-duration-<step>`
  - `$honesty-ref-motion-easing-<step>`
  - `$honesty-ref-breakpoints-viewport`
  - `$honesty-ref-breakpoints-container`
- **Rule:** Reference names are context-free. They describe position on a scale, not where or why they are used.

### B. Semantic Tokens (Runtime CSS Custom Properties)
- **Syntax:** `--honesty-<semantic-category>-<purpose>`
- **Category:** `color-surface`, `color-text`, `color-action`, `color-feedback`, `type`, `space`, `radius`, `border`, `elevation`, `motion`, `space-layout`, `layer`, `chart`.
- **Purpose:** Functional intent and state (e.g., `canvas`, `default`, `primary`, `muted`, `hover`, `success`, `danger`).
- **Grammar Examples (Shape Only):**
  - `--honesty-color-surface-<role>`
  - `--honesty-color-text-<role>`
  - `--honesty-color-action-<variant>-<state>`
  - `--honesty-color-feedback-<intent>-<role>`
  - `--honesty-type-<role>-<attribute>`
  - `--honesty-space-<purpose>`
  - `--honesty-radius-<role>`
  - `--honesty-border-<role>`
  - `--honesty-elevation-<role>`
  - `--honesty-motion-<role>`
  - `--honesty-space-layout-<purpose>`
  - `--honesty-layer-<role>`
  - `--honesty-chart-<role>`
- **Rule:** Absolute prohibition against raw literals or color names in semantic identifiers. Names like `--honesty-color-blue-500`, `--honesty-space-12px`, or `--honesty-dark-gray` are strictly forbidden.

### C. Component Tokens (Runtime CSS Custom Properties)
- **Syntax:** `--honesty-<component>-<property-or-purpose>`
- **Component:** Component noun (e.g., `button`, `input`, `select`, `table`, `modal`, `sidebar`).
- **Property or Purpose:** Scoped role, variant, element, or state (e.g., `bg-default`, `border-active`, `padding-x`, `font-size`).
- **Grammar Examples (Shape Only):**
  - `--honesty-<component>-<property>`
  - `--honesty-<component>-<variant>-<property>`
  - `--honesty-<component>-<state>-<property>`
  - `--honesty-<component>-<element>-<property>`
- **Rule:** Component tokens map directly to Semantic tokens by default, acting as an abstraction barrier between component templates and design system tokens.

---

## 4. Allowed Dependency Directions

```
Allowed:
Reference  ────> Semantic
Reference  ────> Component Tokens (explicit exceptions only, e.g. fixed zero/hairline constants)
Semantic   ────> Component Tokens
Semantic   ────> Theme Bindings
Semantic   ────> Density Overrides
Component  ────> Component SCSS Implementation
```

1. Semantic tokens may read and consume Reference tokens.
2. Component tokens may read and consume Semantic tokens.
3. Themes compose Reference tokens into Semantic CSS custom properties.
4. Density presets modulate density-sensitive Semantic/Component CSS custom properties.
5. Component stylesheet implementations consume only their designated Component tokens.
6. Component and layout stylesheet implementations may consume the public Foundation Query API (which internally resolves Reference breakpoints).

---

## 5. Forbidden Dependency Directions

```
Strictly Forbidden:
Semantic        ──X──> Reference
Component       ──X──> Semantic (reverse dependency)
Component       ──X──> Reference (as default bypass)
Implementation  ──X──> Reference (bypassing Semantic & Component layers)
Implementation  ──X──> Semantic (bypassing Component token contract)
Themes          ──X──> Component Implementation
Feature Code    ──X──> Component Tokens (override bypass)
```

1. **No Upward Dependencies:** Lower layers must never import or reference higher layers. Reference layer must have 0 imports from Semantic or Component layers.
2. **No Layer Skipping:** Component templates and stylesheets must not consume Reference tokens or hardcoded literals directly. Raw Reference Sass variables must not be imported through a public shortcut.
3. **No Semantic Inversion:** Semantic tokens must not reference specific component tokens.
4. **No Cross-Component Leakage:** A component (e.g., `Table`) must not consume or override the component tokens of an unrelated component (e.g., `Button`).

---

## 6. Theme Responsibility

- **Core Rule:** Themes resolve all theme-sensitive Semantic Tokens.
- Theme preference supports:
  - `light`
  - `dark`
  - `system`
- CSS visual theme selectors are only:
  - `[data-theme='light']`
  - `[data-theme='dark']`
- `system` is a preference/application resolution mode, not a CSS theme selector.
  It resolves the browser `prefers-color-scheme` result to either `light` or
  `dark` before applying a visual theme context. The `system` preference has
  no CSS theme selector.
- Themes map Reference tokens to Semantic CSS custom properties based on the
  resolved Light or Dark visual mode.
- When applicable, theme-sensitive resolution may include:
  - surfaces
  - content/text colors
  - action colors
  - feedback colors
  - border colors
  - elevation/shadow treatment
  - chart theme colors
- Themes must **NOT** own:
  - layout structure
  - component-specific layout rules
  - margins or paddings unrelated to theme
  - raw reference palettes (these belong exclusively to `foundation/reference/`)
  - feature or page styling

---

## 7. Density Responsibility

- **Core Rule:** Density modulates density-sensitive Semantic or Component tokens; it is responsible for vertical cadence, compact data layouts, and control sizing across ERP interfaces.
- Density profiles (e.g., `[data-density="compact"]`, `[data-density="comfortable"]`, `[data-density="spacious"]`) may modulate density-sensitive Semantic or Component tokens such as:
  - control height
  - row height
  - cell padding
  - field padding
  - component gaps
  - compact, comfortable, or spacious component sizing
- Density must **NOT** redefine:
  - raw Reference spacing scales
  - raw Reference typography scales
  - global body typography by default
- If typography ever changes with density, it must be an explicitly designed density-sensitive Component/Semantic alias. Global body font-size scaling is not a density rule.
- Density adjustments must remain harmonious across all components sharing the density context.

---

## 8. Feature and Page Code Constraint

- **Feature, Page, and Route components are strictly forbidden from overriding Component Tokens.**
- Page layouts, views, and container modules must not use deep selectors (e.g., `::ng-deep`), inline styles, or selector hacks to re-assign `--honesty-<component>-*` variables for ad-hoc styling.
- All stylistic variance must be expressed through supported component props, variants, density, or theme modes.

---

## 9. Arbitrary Literals & Design Exception Governance

- **Zero-Tolerance for Unowned Literals:** Arbitrary CSS values (e.g., `margin: 13px`, `color: #4a5d6e`, `box-shadow: 0 3px 7px rgba(...)`) are prohibited in component or feature code.
- **Foundation Ownership:** Any genuine requirement for a new design dimension, color ramp, or scale step must be proposed, reviewed, and codified into the Design Foundation (`reference/` or `semantic/`).
- **Documented Temporary Exceptions:** If an urgent business workflow requires an un-tokenized value, it must be isolated in a clearly marked SCSS comment with rationale, owner, and scheduled tokenization review ticket.

---

## 10. Angular UI Preferences Architectural Rule

- In Angular application logic, user preferences (such as theme mode, density scale, sidebar tone, topbar tone, or formatting preferences) **must only mutate application state, enum properties, or DOM root attributes** (e.g., `data-theme="dark"`, `data-density="compact"`).
- Directionality (`dir="rtl"`) is application/product-level configuration (Honesty ERP is Arabic-first and RTL-first) and is **not** currently a user-selectable UI preference.
- Angular TypeScript services and components **must never inject or calculate arbitrary CSS values** (e.g., manipulating `element.style.setProperty('--honesty-button-bg', '#123456')`).
- Styling reactions remain 100% declarative and CSS-driven, resolved entirely through the Foundation's CSS custom property contracts.

---

## 11. Responsive Query API Architecture & Dependency Rule

- **Compile-Time Sass Infrastructure:** The Foundation Query API (`foundation/queries`) provides the approved Sass mixins for responsive viewport (`viewport-up`, `viewport-down`, `viewport-between`) and container queries (`container-up`, `container-down`, `container-between`).
- **Component Dependency Exception:** Component and layout SCSS implementations may consume the public Foundation Query API.
- **Strict Prohibition on Raw Breakpoints:** Component and layout SCSS must **not** consume raw Reference breakpoint variables or hardcode numeric thresholds directly.
- **Internal Resolution:** The Query API itself is permitted to consume Reference breakpoint data internally to resolve symbolic query keys.

---

## 12. Foundation Sass Module Boundaries & Public API Surface

- **Internal Authoring Layers:** The Sass modules for Reference (`foundation/reference`), Semantic (`foundation/semantic`), Component (`foundation/components`), Theme (`foundation/themes`), and Density (`foundation/density`) are internal Foundation authoring and composition layers.
- **No Public Sass Export of Internal Members:** The internal Sass members (variables, maps, and private helpers) of these architectural layers are not public component-consumption APIs and are loaded internally via `@use` at the Foundation root (`foundation/_index.scss`). Raw Reference Sass variables must not be imported through a public shortcut or re-exported globally.
- **Runtime Styling Contracts:** Runtime Semantic and Component CSS custom properties (`--honesty-*`) remain the sole styling contracts consumed by component templates and stylesheets.
- **Public Sass API Scope:** The intentional public compile-time Sass API exposed by the Foundation is the **Foundation Query API** (`foundation/queries`), which component and layout SCSS may consume for responsive viewport and container queries.

---

## 13. Typography Technical Contract (Candidate V1)

### A. Approved Font Families & Asset Baseline
- **Arabic UI:** `'Tajawal'` (Boutros Fonts / OFL license, self-hosted locally in `public/fonts/tajawal/`).
- **Latin UI:** `'Space Grotesk'` (Florian Karsten / OFL license, self-hosted locally in `public/fonts/space-grotesk/`).

### B. Mixed UI Stack Behavior
- **Mixed UI Stack:** `'Space Grotesk', 'Tajawal', sans-serif`
- **Resolution Rationale:** Space Grotesk is declared first so that Latin/English alphanumeric glyphs resolve to Space Grotesk, while Arabic glyphs fall back cleanly to Tajawal. This enables natural mixed Arabic/English text in ERP interfaces without requiring wrapping every Latin string or number in a custom element or language tag.

### C. Shared Core Weight Set
- Core cross-family weights are strictly:
  - Regular: `400` (`$honesty-ref-font-weight-regular`)
  - Medium: `500` (`$honesty-ref-font-weight-medium`)
  - Bold: `700` (`$honesty-ref-font-weight-bold`)
- Weights 600, 800, and 900 are intentionally excluded from the core token set in Candidate V1 to prevent synthetic or inconsistent rendering between families.

### D. Reference vs. Semantic Ownership
- **Reference Typography (Compile-Time Sass Primitives):**
  - Font families: `$honesty-ref-font-family-arabic`, `$honesty-ref-font-family-latin`, `$honesty-ref-font-family-ui`.
  - Core weights: `$honesty-ref-font-weight-regular`, `$honesty-ref-font-weight-medium`, `$honesty-ref-font-weight-bold`.
  - Absolute font size scale (rem): `$honesty-ref-font-size-12` (0.75rem) through `$honesty-ref-font-size-40` (2.5rem).
  - Context-free unitless line heights: `$honesty-ref-line-height-125` (1.25) through `$honesty-ref-line-height-160` (1.6).
- **Semantic Typography (Runtime CSS Custom Properties):**
  - Font families: `--honesty-type-family-ui`, `--honesty-type-family-arabic`, `--honesty-type-family-latin`.
  - Role tokens: Emitted in `:root` and resolved strictly from Reference tokens (never raw numbers).

### E. Semantic Role Naming Grammar
Each typography role defines three standard CSS custom properties:
- `--honesty-type-<role>-font-size`
- `--honesty-type-<role>-font-weight`
- `--honesty-type-<role>-line-height`

### F. Candidate V1 Semantic Roles Table
| Role | Size Token | Weight Token | Line Height Token | Computed Values |
| :--- | :--- | :--- | :--- | :--- |
| **display** | `$honesty-ref-font-size-40` | `$honesty-ref-font-weight-bold` | `$honesty-ref-line-height-125` | 2.5rem (40px) / 700 / 1.25 |
| **page-title** | `$honesty-ref-font-size-28` | `$honesty-ref-font-weight-bold` | `$honesty-ref-line-height-135` | 1.75rem (28px) / 700 / 1.35 |
| **section-title** | `$honesty-ref-font-size-20` | `$honesty-ref-font-weight-bold` | `$honesty-ref-line-height-140` | 1.25rem (20px) / 700 / 1.4 |
| **subsection-title** | `$honesty-ref-font-size-18` | `$honesty-ref-font-weight-bold` | `$honesty-ref-line-height-145` | 1.125rem (18px) / 700 / 1.45 |
| **body** | `$honesty-ref-font-size-16` | `$honesty-ref-font-weight-regular` | `$honesty-ref-line-height-160` | 1rem (16px) / 400 / 1.6 |
| **body-strong** | `$honesty-ref-font-size-16` | `$honesty-ref-font-weight-medium` | `$honesty-ref-line-height-160` | 1rem (16px) / 500 / 1.6 |
| **body-small** | `$honesty-ref-font-size-14` | `$honesty-ref-font-weight-regular` | `$honesty-ref-line-height-155` | 0.875rem (14px) / 400 / 1.55 |
| **label** | `$honesty-ref-font-size-14` | `$honesty-ref-font-weight-medium` | `$honesty-ref-line-height-145` | 0.875rem (14px) / 500 / 1.45 |
| **caption** | `$honesty-ref-font-size-12` | `$honesty-ref-font-weight-regular` | `$honesty-ref-line-height-150` | 0.75rem (12px) / 400 / 1.5 |

### G. Scope Boundaries (Candidate V1)
- **No Letter Spacing:** Explicit tracking is deferred pending Arabic visual review.
- **No Monospace Role:** No production monospace font has been approved; code roles are deferred.
- **Application Boundary:** No GLOBAL production Typography application to `html` or `body` is established yet.
- **Docs-Only Review Evidence:** Docs-only Foundation Typography specimens consume the Semantic Typography variables as review evidence.
- **Production Mapping Deferred:** Production Component Typography mapping remains future Component-contract work.

---

## 14. Spacing Technical Contract (Candidate V1)

### A. 4px Base Grid Foundation
- The Honesty ERP spacing system strictly adheres to a **4px base grid**.
- All non-zero Reference spacing steps are exact multiples of 4px.
- Arbitrary intermediate values (such as 6px, 10px, 14px, 18px, 22px, 28px, 36px) are strictly forbidden.

### B. Reference Spacing Scale (Compile-Time Sass Primitives)
- Reference spacing primitives are context-free Sass variables in `src/styles/foundation/reference/spacing/_scale.scss`.
- All scale values are expressed in `rem` relative to a standard 16px root (`1rem = 16px`).
- Reference token names correspond directly to their 16px-root pixel equivalent:
  - `$honesty-ref-space-0`: `0`
  - `$honesty-ref-space-4`: `0.25rem` (4px)
  - `$honesty-ref-space-8`: `0.5rem` (8px)
  - `$honesty-ref-space-12`: `0.75rem` (12px)
  - `$honesty-ref-space-16`: `1rem` (16px)
  - `$honesty-ref-space-20`: `1.25rem` (20px)
  - `$honesty-ref-space-24`: `1.5rem` (24px)
  - `$honesty-ref-space-32`: `2rem` (32px)
  - `$honesty-ref-space-40`: `2.5rem` (40px)
  - `$honesty-ref-space-48`: `3rem` (48px)
  - `$honesty-ref-space-64`: `4rem` (64px)
- **Reference Layer Ownership:** Context-free dimensional steps. Reference tokens describe mathematical position on the scale, not functional usage (never named `small`, `medium`, `large`, `card`, `button`, or `section`).
- **Unused Reference Steps:** Reference steps `20`, `40`, and `64` are deliberately preserved in Candidate V1 as available mathematical primitives without current Semantic aliases. Reference tokens are context-free and must not be forced into invented semantic mappings.

### C. Semantic Spacing Roles (Runtime CSS Custom Properties)
- Semantic spacing tokens assign functional purpose to Reference steps.
- Emitted in `:root` via `src/styles/foundation/semantic/spacing/_rhythm.scss`.
- Spacing is currently not theme-sensitive and is not placed inside Light/Dark selectors.
- Every Semantic value resolves strictly from a Reference Sass token via interpolation (`#{ref.$honesty-ref-space-*}`).

### D. Naming Grammar
- **Syntax:** `--honesty-space-<purpose>`

### E. Semantic Spacing Categories & Candidate V1 Mapping
| Category | Semantic Token | Reference Token | Computed Value | Purpose & Meaning |
| :--- | :--- | :--- | :--- | :--- |
| **Inline** | `--honesty-space-inline-tight` | `$honesty-ref-space-4` | `0.25rem` (4px) | Spacing between compact adjacent inline/sibling items (e.g., text/icon) |
| **Inline** | `--honesty-space-inline-default` | `$honesty-ref-space-8` | `0.5rem` (8px) | Default spacing between adjacent inline/sibling elements |
| **Inline** | `--honesty-space-inline-loose` | `$honesty-ref-space-12` | `0.75rem` (12px) | Relaxed spacing between adjacent inline/sibling elements |
| **Stack** | `--honesty-space-stack-tight` | `$honesty-ref-space-8` | `0.5rem` (8px) | Tight vertical rhythm between closely related content items |
| **Stack** | `--honesty-space-stack-default` | `$honesty-ref-space-16` | `1rem` (16px) | Standard vertical rhythm between distinct content blocks |
| **Stack** | `--honesty-space-stack-loose` | `$honesty-ref-space-24` | `1.5rem` (24px) | Relaxed vertical rhythm between major structural blocks |
| **Inset** | `--honesty-space-inset-tight` | `$honesty-ref-space-8` | `0.5rem` (8px) | Compact internal breathing space inside bounded regions |
| **Inset** | `--honesty-space-inset-default` | `$honesty-ref-space-16` | `1rem` (16px) | Standard internal breathing space inside bounded regions |
| **Inset** | `--honesty-space-inset-loose` | `$honesty-ref-space-24` | `1.5rem` (24px) | Generous internal breathing space inside bounded regions |
| **Section** | `--honesty-space-section-gap` | `$honesty-ref-space-32` | `2rem` (32px) | Standard separation gap between major content sections |
| **Section** | `--honesty-space-section-gap-large` | `$honesty-ref-space-48` | `3rem` (48px) | Prominent separation gap between major content sections |

### F. Architectural Domain & Density Boundaries
- **Semantic Layout Spacing Implemented:** Layout spacing and responsive gutters
  are implemented in `semantic/layout/` using the `XXS`, `XS`, `SM`,
  `MD`, `LG`, `XL`, and `XXL` vocabulary.
- **Component Padding & Gaps Deferred:** Generic inset and stack tokens must not be treated as component-level padding or gaps (e.g., `card-padding`, `button-padding`, `modal-padding`). Component-specific contracts belong exclusively to future Component Tokens (Layer 3).
- **Density Overrides Implemented:** Candidate V1 Density overrides selected
  Stack and Inset Semantic spacing tokens. Inline and Section spacing remain
  density-invariant.
- **Current Application Boundary:** Spacing is not globally applied to product UI
  yet. Docs-only Foundation specimens consume it as review evidence.

---

## 15. Borders Technical Contract (Candidate V1)

### A. Border Color Contract vs. Border Geometry Contract
- **Existing Border Color Contract:**
  - The project already defines runtime Semantic border color tokens in theme definitions (`[data-theme="light"]`, `[data-theme="dark"]`):
    - `--honesty-border-subtle`
    - `--honesty-border-default`
    - `--honesty-border-strong`
  - These tokens represent **color values** exclusively. They must not be renamed, repurposed, relocated, or reinterpreted as width or geometry tokens.
- **New Border Geometry Contract:**
  - Border geometry tokens are explicitly named with functional qualifiers:
    - `--honesty-border-width-*`
    - `--honesty-border-style-*`
  - This naming convention enforces a strict separation of concerns between border color and border physical geometry.

### B. Subtle Border Direction & Color-Based Hierarchy
- In Honesty ERP, normal visual hierarchy is established primarily through **border color strength** rather than stroke thickness:
  - Subtle borders (`--honesty-border-subtle`): Low-contrast dividing lines, table rows, and secondary separators.
  - Default borders (`--honesty-border-default`): Standard structural containment, card boundaries, and interactive control borders.
  - Strong borders (`--honesty-border-strong`): Focused structural emphasis, high-contrast dividers, and deliberate region demarcations.
- Ordinary borders must not become visually heavy. Increasing stroke width adds unnecessary visual weight and clutters enterprise data screens.

### C. Reference Border Width Scale (Compile-Time Sass Primitives)
- Defined in `src/styles/foundation/reference/borders/_widths.scss`:
  - `$honesty-ref-border-width-0`: `0`
  - `$honesty-ref-border-width-1`: `1px`
  - `$honesty-ref-border-width-2`: `2px`
- **Physical Pixel Rule:** Border widths are intentionally defined as physical pixels (`px`), never `rem`. Sub-pixel anti-aliasing or root-relative scaling on stroke widths leads to inconsistent rendering, blurry strokes, and border collapse anomalies on high-DPI displays.
- Widths 3px, 4px, and fractional hairline widths are excluded from Candidate V1.

### D. Reference Border Style Primitives
- Defined in `src/styles/foundation/reference/borders/_styles.scss`:
  - `$honesty-ref-border-style-solid`: `solid`
  - `$honesty-ref-border-style-dashed`: `dashed`
- Context-free primitives. Styles like `dotted`, `double`, `groove`, `inset`, and `outset` are strictly excluded.

### E. Semantic Border Geometry (Runtime CSS Custom Properties)
- Emitted in `:root` via `src/styles/foundation/semantic/borders/_geometry.scss`:
  - `--honesty-border-width-default`: `#{ref.$honesty-ref-border-width-1}` (`1px`)
  - `--honesty-border-width-emphasis`: `#{ref.$honesty-ref-border-width-2}` (`2px`)
  - `--honesty-border-style-default`: `#{ref.$honesty-ref-border-style-solid}` (`solid`)
- Border geometry is theme-independent.
- Every semantic value resolves strictly from a Reference Sass token via interpolation.

### F. Default vs. Emphasis Width Semantics
- `--honesty-border-width-default` (1px): Standard stroke width for all regular containment boundaries, cards, controls, tables, and dividers.
- `--honesty-border-width-emphasis` (2px): Geometric emphasis reserved exclusively for explicit state indicators or heavy boundary contracts when authorized by a component specification.
- **Prohibition on Automatic "Strong" Mapping:** Ordinary "strong" visual boundaries must **not** automatically consume 2px width. Normal strong hierarchy should remain 1px paired with `--honesty-border-strong` color unless a component contract specifically dictates 2px thickness.

### G. Dashed Style Scope (Reference-Only)
- `$honesty-ref-border-style-dashed` is preserved as a Reference primitive only.
- No Semantic dashed border token is created in Candidate V1 because no approved enterprise semantic role (e.g., drag-and-drop target, empty-state placeholder) has been formally approved.

---

## 16. Radius Technical Contract (Candidate V1)

### A. Design Philosophy: Controlled Medium Radius
- Honesty ERP avoids bubbly, toy-like, or excessively rounded interfaces.
- Corner geometry follows a controlled medium scale designed for professional enterprise density and clean architectural alignment.

### B. Reference Radius Scale (Compile-Time Sass Primitives)
- Defined in `src/styles/foundation/reference/radius/_scale.scss`:
  - `$honesty-ref-radius-0`: `0`
  - `$honesty-ref-radius-2`: `0.125rem` (2px equivalent at 16px root)
  - `$honesty-ref-radius-4`: `0.25rem` (4px equivalent at 16px root)
  - `$honesty-ref-radius-6`: `0.375rem` (6px equivalent at 16px root)
  - `$honesty-ref-radius-8`: `0.5rem` (8px equivalent at 16px root)
  - `$honesty-ref-radius-12`: `0.75rem` (12px equivalent at 16px root)
- Expressed in `rem` relative to the standard 16px root.
- Values like 16px, 20px, 24px, 9999px, and 50% are strictly excluded in Candidate V1.

### C. Semantic Radius Roles (Runtime CSS Custom Properties)
- Emitted in `:root` via `src/styles/foundation/semantic/radius/_roles.scss`:
  - `--honesty-radius-none`: `#{ref.$honesty-ref-radius-0}` (`0`)
  - `--honesty-radius-control`: `#{ref.$honesty-ref-radius-4}` (`0.25rem` / 4px)
  - `--honesty-radius-surface`: `#{ref.$honesty-ref-radius-6}` (`0.375rem` / 6px)
  - `--honesty-radius-overlay`: `#{ref.$honesty-ref-radius-8}` (`0.5rem` / 8px)
- Radius geometry is theme-independent.
- Every semantic role resolves strictly from a Reference Sass token.

### D. Semantic Role Definitions
- **none (`0`):** Explicit square geometry for flush borders, docked panels, table cells, or segmented control interiors.
- **control (`0.25rem` / 4px):** Generic interactive control corner geometry (buttons, inputs, select triggers, chips). This establishes geometric capability; it does not define component-scoped styling contracts.
- **surface (`0.375rem` / 6px):** Generic bounded surface corner geometry for cards, panels, and distinct content sections. This does not mandate that every content group become a card.
- **overlay (`0.5rem` / 8px):** Generic floating or elevated region geometry for dropdown menus, popovers, and modal dialogs.

### E. Intentionally Unaliased Radius Primitives
- `$honesty-ref-radius-2` (2px) and `$honesty-ref-radius-12` (12px) are available in the Reference layer but deliberately have **no Semantic alias** in Candidate V1.
- Reference scales are context-free mathematical baselines; semantic aliases are only introduced when a concrete functional purpose is justified.

### F. Excluded Radius & Geometry Scopes (Candidate V1)
- **No Pill / Full Radius:** Tokens like `--honesty-radius-pill`, `--honesty-radius-full`, and `--honesty-radius-round` are forbidden in Candidate V1 to prevent unapproved rounded/bubbly aesthetics.
- **No Component-Specific Tokens:** Component tokens such as `--honesty-button-radius`, `--honesty-input-radius`, `--honesty-card-radius`, `--honesty-modal-radius`, or `--honesty-badge-radius` are deferred to Layer 3 (Component Tokens).
- **No Focus-Ring Geometry:** Focus-ring width, offset, and outline geometry are deferred pending focus behavior specification. The existing theme-sensitive focus ring color token (`--honesty-color-action-focus-ring`) remains untouched.
- **Application Boundary:** No GLOBAL production Borders/Radius application exists yet.
- **Docs-Only Review Evidence:** Docs-only Foundation specimens already consume Border/Radius contracts for review evidence.
- **Production Mapping Deferred:** Production Component mapping remains deferred.

---

## 17. Elevation Technical Contract (Candidate V1)

### A. Design Philosophy: Genuine Physical Elevation Only
- Honesty ERP uses shadows **strictly for genuine elevation / floating separation**.
- Ordinary content grouping, cards, panels, and structural layouts must primarily use **surfaces, borders, and spacing**—never shadows.
- **No Default Card Shadows:** Enterprise data displays require clean boundaries; gratuitous shadows add visual noise and decrease scannability.

### B. Theme-Aware Resolution Principle
- A shadow opacity that works effectively on the Light theme is insufficient on the graphite Dark theme.
- Therefore, Elevation tokens are **theme-sensitive**:
  - The **Reference layer** owns raw physical geometry offsets, blur, spread, and raw color/alpha transparency primitives.
  - The **Light and Dark themes** resolve the Semantic elevation tokens into runtime CSS custom properties.
  - Universal shadow values are never emitted in `:root` for raised or overlay states.

### C. Reference Elevation Primitives (Compile-Time Sass Primitives)
- **Geometry Primitives** (`src/styles/foundation/reference/elevation/_geometry.scss`):
  - `$honesty-ref-elevation-shadow-none`: `none`
  - `$honesty-ref-elevation-shadow-geometry-1`: `0 1px 2px 0` (physical geometry level 1)
  - `$honesty-ref-elevation-shadow-geometry-2`: `0 8px 24px 0` (physical geometry level 2)
  - Reference geometry names are strictly context-free (`none`, `geometry-1`, `geometry-2`); they must never be named `raised`, `overlay`, `card`, or `modal`.
- **Shadow Color & Alpha Primitives** (`src/styles/foundation/reference/elevation/_shadow.scss`):
  - `$honesty-ref-elevation-shadow-color-black`: `#000000` (raw black primitive reserved strictly for physical dark-theme shadow rendering; does not introduce black as a UI surface color)
  - `$honesty-ref-elevation-shadow-alpha-08`: `0.08`
  - `$honesty-ref-elevation-shadow-alpha-14`: `0.14`
  - `$honesty-ref-elevation-shadow-alpha-28`: `0.28`
  - `$honesty-ref-elevation-shadow-alpha-40`: `0.40`
  - The Light theme does not duplicate Neutral 950 inside Elevation; it consumes `$honesty-ref-color-neutral-950` from Reference Colors.

### D. Semantic Elevation Roles (Runtime CSS Custom Properties)
- Declared in `src/styles/foundation/semantic/elevation/_index.scss` and resolved inside theme blocks:
  - `--honesty-elevation-none`: Flat / flush; no elevation shadow. Valid for the majority of ordinary content regions.
  - `--honesty-elevation-raised`: Small physical separation from the current surface. Not a default card shadow.
  - `--honesty-elevation-overlay`: Clear floating-layer separation above normal content. Establishes generic capability; not a component-specific token.

### E. Theme Resolution Mapping
| Semantic Token | Theme | Resolution Formula | Computed Direction |
| :--- | :--- | :--- | :--- |
| `--honesty-elevation-none` | Light & Dark | `$honesty-ref-elevation-shadow-none` | `none` |
| `--honesty-elevation-raised` | Light | `geometry-1` + `$honesty-ref-color-neutral-950` + `alpha-08` | `0 1px 2px 0 rgba(16, 17, 21, 0.08)` |
| `--honesty-elevation-overlay` | Light | `geometry-2` + `$honesty-ref-color-neutral-950` + `alpha-14` | `0 8px 24px 0 rgba(16, 17, 21, 0.14)` |
| `--honesty-elevation-raised` | Dark | `geometry-1` + `black` + `alpha-28` | `0 1px 2px 0 rgba(0, 0, 0, 0.28)` |
| `--honesty-elevation-overlay` | Dark | `geometry-2` + `black` + `alpha-40` | `0 8px 24px 0 rgba(0, 0, 0, 0.40)` |

### F. Scope Boundaries & Prohibitions (Candidate V1)
- **No Component-Specific Elevation Roles:** Tokens such as `--honesty-elevation-dropdown`, `--honesty-elevation-modal`, `--honesty-elevation-dialog`, or `--honesty-elevation-tooltip` are deferred to future Component contracts.
- **No Additional Elevation Levels:** No level 3 geometry or `--honesty-elevation-high`. Candidate V1 deliberately provides only `none`, `raised`, and `overlay`.
- **No Multi-Shadow Stacks:** Comma-separated ambient + key shadow combinations are prohibited; exactly one controlled shadow per role is used.
- **No Colored / Brand Shadows:** Shadows remain strictly neutral; no primary, indigo, cyan, or feedback colors.
- **No Z-Index Coupling:** Visual elevation and stacking order (`z-index` / `layers`) are decoupled concerns and must not be conflated.
- **Current Application Boundary:** No production or global Elevation application
  exists yet. A docs-only Foundation Elevation specimen exists. Production
  component mapping remains deferred.

---

## 18. Motion Technical Contract (Candidate V1)

### A. Design Philosophy: Functional, Not Decorative
- Honesty ERP motion is brief, controlled, meaningful, and functional rather than decorative.
- Motion exists strictly to clarify:
  - state change;
  - spatial relationship;
  - entry / exit;
  - interaction feedback.
- Playful, bouncy, or ornamental animations are strictly prohibited.

### B. Reference Duration Scale (Compile-Time Sass Primitives)
- Defined in `src/styles/foundation/reference/motion/_durations.scss`:
  - `$honesty-ref-motion-duration-0`: `0ms`
  - `$honesty-ref-motion-duration-100`: `100ms`
  - `$honesty-ref-motion-duration-150`: `150ms`
  - `$honesty-ref-motion-duration-200`: `200ms`
  - `$honesty-ref-motion-duration-300`: `300ms`
- Context-free numerical millisecond primitives. Values such as 50ms, 75ms, 125ms, 175ms, 250ms, 400ms, and 500ms are excluded in Candidate V1.

### C. Reference Easing Scale (Compile-Time Sass Primitives)
- Defined in `src/styles/foundation/reference/motion/_easings.scss`:
  - `$honesty-ref-motion-easing-linear`: `linear`
  - `$honesty-ref-motion-easing-standard`: `cubic-bezier(0.2, 0, 0, 1)`
  - `$honesty-ref-motion-easing-enter`: `cubic-bezier(0, 0, 0, 1)`
  - `$honesty-ref-motion-easing-exit`: `cubic-bezier(0.3, 0, 1, 1)`
- Context-free acceleration curves. Spring physics, bounce, elastic, back, and overshoot curves are strictly excluded.

### D. Semantic Duration Roles (Runtime CSS Custom Properties)
- Emitted in `:root` via `src/styles/foundation/semantic/motion/_timing.scss`:
  - `--honesty-motion-duration-instant`: `#{ref.$honesty-ref-motion-duration-0}` (`0ms`) — no perceptible transition.
  - `--honesty-motion-duration-fast`: `#{ref.$honesty-ref-motion-duration-100}` (`100ms`) — very small UI state feedback.
  - `--honesty-motion-duration-default`: `#{ref.$honesty-ref-motion-duration-150}` (`150ms`) — normal micro-interaction timing.
  - `--honesty-motion-duration-slow`: `#{ref.$honesty-ref-motion-duration-200}` (`200ms`) — clearer structural state change.
  - `--honesty-motion-duration-deliberate`: `#{ref.$honesty-ref-motion-duration-300}` (`300ms`) — limited use for larger spatial transitions where visual continuity is genuinely useful.

### E. Semantic Easing Roles (Runtime CSS Custom Properties)
- Emitted in `:root` via `src/styles/foundation/semantic/motion/_timing.scss`:
  - `--honesty-motion-easing-linear`: `#{ref.$honesty-ref-motion-easing-linear}` (`linear`) — constant-rate motion where easing is inappropriate.
  - `--honesty-motion-easing-standard`: `#{ref.$honesty-ref-motion-easing-standard}` (`cubic-bezier(0.2, 0, 0, 1)`) — default state and property transition.
  - `--honesty-motion-easing-enter`: `#{ref.$honesty-ref-motion-easing-enter}` (`cubic-bezier(0, 0, 0, 1)`) — incoming and revealed visual movement.
  - `--honesty-motion-easing-exit`: `#{ref.$honesty-ref-motion-easing-exit}` (`cubic-bezier(0.3, 0, 1, 1)`) — outgoing and dismissed visual movement.

### F. Scope Boundaries & Prohibitions (Candidate V1)
- **No Transition Bundles:** Tokens such as `--honesty-transition-default`, `--honesty-transition-button`, `--honesty-transition-color`, or `--honesty-transition-transform` are prohibited. Duration and easing remain strictly separated.
- **No Keyframes:** `@keyframes` definitions (e.g., `fade-in`, `fade-out`, `slide`, `spin`, `pulse`) are prohibited in Foundation motion.
- **No CSS Property Contracts:** Properties like `transition-property`, `animation-name`, `animation-fill-mode`, etc., are deferred to future Component contracts.
- **No Component-Specific Motion:** Tokens such as `modal-enter`, `modal-exit`, `dropdown-open`, `toast-enter`, `sidebar-collapse`, `accordion-expand`, `tooltip-delay`, or `button-hover` belong to Layer 3 (Component Tokens) and require concrete reference components.
- **No Global Transition Policy:** No GLOBAL transition policy is applied to `html`, `body`, universal selectors, links, buttons, theme selectors, or general review chrome.
- **Docs-Only Motion Evidence:** The dedicated docs-only Motion specimen intentionally uses LOCAL, explicit-property transitions solely as review evidence.
- **Production Transition Contracts Deferred:** Production Component transition-property contracts remain deferred.
- **No `transition: all`:** Universal property transition shorthand is strictly prohibited.
- **No Theme or Density Coupling:** Motion timing is theme-independent (not duplicated in `[data-theme='light']` or `[data-theme='dark']`) and density-independent (unchanged across Compact, Comfortable, and Spacious modes).
- **Accessibility Scope:** No dedicated reduced-motion or screen-reader motion program in this phase; standard interaction correctness is preserved.

---

## 19. Density Technical Contract (Candidate V1)

### A. Approved Density Modes
The approved product density modes are strictly:
- `compact`: denser information display for high-volume data and transactional ERP views.
- `comfortable`: standard product baseline and global default.
- `spacious`: generous breathing room for low-density or touch-friendly contexts.

Modes such as `dense`, `cozy`, `normal`, `auto`, or `custom` are strictly prohibited.

### B. Architectural Principles & Scope
1. **Reference Scales Remain Unaltered:** Density does not redefine or change raw Reference spacing scales or any compile-time primitives. The Reference Spacing scale (`$honesty-ref-space-*`) remains the single immutable source of truth.
2. **Subtree-Scoped Selector Contract:** Density is declared via attribute selectors:
   - `[data-density='compact']`
   - `[data-density='comfortable']`
   - `[data-density='spacious']`
   These selectors are intentionally **not** bound to `:root`, `html`, or `body`. Any DOM subtree (such as a future data grid or specialized container) can declare its own density scope without affecting the global application preference.
3. **Comfortable is the Default Baseline:**
   - Elements with no `data-density` attribute automatically inherit Comfortable values from the `:root` Semantic baseline.
   - `[data-density='comfortable']` explicitly restates these values in CSS so that a Comfortable subtree nested within a Compact or Spacious container restores standard spacing via normal CSS inheritance without specificity hacks.
4. **Candidate V1 Modulates Selected Semantic Tokens Only:** Candidate V1 modulates strictly 6 Semantic Spacing tokens (3 Stack and 3 Inset).

### C. Density Token Resolution Mapping

| Semantic Token | Compact (`[data-density='compact']`) | Comfortable (`[data-density='comfortable']` & `:root`) | Spacious (`[data-density='spacious']`) |
| :--- | :--- | :--- | :--- |
| `--honesty-space-stack-tight` | `$honesty-ref-space-4` (0.25rem / 4px) | `$honesty-ref-space-8` (0.5rem / 8px) | `$honesty-ref-space-12` (0.75rem / 12px) |
| `--honesty-space-stack-default` | `$honesty-ref-space-12` (0.75rem / 12px) | `$honesty-ref-space-16` (1rem / 16px) | `$honesty-ref-space-24` (1.5rem / 24px) |
| `--honesty-space-stack-loose` | `$honesty-ref-space-16` (1rem / 16px) | `$honesty-ref-space-24` (1.5rem / 24px) | `$honesty-ref-space-32` (2rem / 32px) |
| `--honesty-space-inset-tight` | `$honesty-ref-space-4` (0.25rem / 4px) | `$honesty-ref-space-8` (0.5rem / 8px) | `$honesty-ref-space-12` (0.75rem / 12px) |
| `--honesty-space-inset-default` | `$honesty-ref-space-12` (0.75rem / 12px) | `$honesty-ref-space-16` (1rem / 16px) | `$honesty-ref-space-24` (1.5rem / 24px) |
| `--honesty-space-inset-loose` | `$honesty-ref-space-16` (1rem / 16px) | `$honesty-ref-space-24` (1.5rem / 24px) | `$honesty-ref-space-32` (2rem / 32px) |

*All overrides interpolate Reference Spacing Sass tokens (`ref.$honesty-ref-space-*`); raw numeric rem values are never duplicated in the Density layer.*

### D. Unchanged Tokens & Invariance Rules
- **Inline Spacing Remains Stable:** `--honesty-space-inline-tight`, `--honesty-space-inline-default`, and `--honesty-space-inline-loose` are invariant across density modes to preserve micro-adjacency relationships (icon/text pairing, metadata proximity).
- **Section Spacing Remains Stable:** `--honesty-space-section-gap` and `--honesty-space-section-gap-large` are invariant across density modes so that structural page separation does not collapse.
- **Typography Remains Stable:** All `--honesty-type-*` tokens (font-size, line-height, font-weight, font-family) remain completely independent of density. Compact does not reduce typography size; Spacious does not increase typography size.
- **No Control or Row Heights Yet:** Generic height tokens (such as `--honesty-density-control-height`, `--honesty-density-row-height`, etc.) are deferred to future Component Token contracts.
- **No Component Tokens in Density:** No component-specific overrides (`--honesty-button-*`, `--honesty-table-*`, etc.) exist in the Foundation Density layer.
- **Declarative Density CSS:** The CSS Density layer contains no JavaScript or
  state logic. A separate isolated Preferences Foundation exists and may select
  a `DensityMode` for local review. Density CSS tokens and selectors remain
  declarative; Density does not own Preferences logic.

---

## 20. Responsive Breakpoints & Query API Technical Contract (Candidate V1)

### A. Architectural Responsibility & Boundaries
- **Compile-Time Sass Infrastructure Only:** Responsive breakpoints and container thresholds are authoring tools for compile-time Sass evaluation.
- **No Runtime CSS Custom Properties:** No `--honesty-breakpoint-*`, `--honesty-viewport-*`, or `--honesty-container-breakpoint-*` tokens exist.
- **Raw Reference Breakpoints Are Private:** The Reference maps (`$honesty-ref-breakpoints-viewport` and `$honesty-ref-breakpoints-container`) are internal Foundation primitives and are **not** exposed for direct consumption by components or layouts.
- **Single Approved Consumption Path:** The only approved responsive Sass API for components, layouts, and page structures is the **Foundation Query API** (`foundation/queries`).
- **Device-Agnostic Vocabulary:** Breakpoint thresholds are dimensional primitives representing available pixel widths. They are never named after devices (no `mobile`, `tablet`, `desktop`, `phone`, `wide`, `2xl`, or `3xl`).

### B. Approved Symbolic Key Vocabulary
All viewport and container queries use strictly this 7-step symbolic key scale:
- `xxs`
- `xs`
- `sm`
- `md`
- `lg`
- `xl`
- `xxl`

### C. Reference Threshold Maps (Compile-Time Sass Maps)
Viewport and container thresholds are strictly separate Reference maps:

1. **Viewport Breakpoints (`$honesty-ref-breakpoints-viewport` in `src/styles/foundation/reference/breakpoints/_viewport.scss`):**
   - `xxs`: `360px`
   - `xs`: `480px`
   - `sm`: `640px`
   - `md`: `768px`
   - `lg`: `1024px`
   - `xl`: `1280px`
   - `xxl`: `1536px`

2. **Container Breakpoints (`$honesty-ref-breakpoints-container` in `src/styles/foundation/reference/breakpoints/_container.scss`):**
   - `xxs`: `240px`
   - `xs`: `320px`
   - `sm`: `480px`
   - `md`: `640px`
   - `lg`: `768px`
   - `xl`: `960px`
   - `xxl`: `1200px`

*These generic thresholds define width breakpoints; they do not dictate sidebar, modal, card, or form widths.*

### D. Foundation Query API Signatures
Exported from `src/styles/foundation/queries/_index.scss` (forwarded publicly via `src/styles/foundation/_index.scss`):

- **Viewport Mixins:**
  - `viewport-up($key)`
  - `viewport-down($key)`
  - `viewport-between($min, $max)`
- **Container Mixins:**
  - `container-up($key, $name: null)`
  - `container-down($key, $name: null)`
  - `container-between($min, $max, $name: null)`

*The API is strictly mixin-only. No query functions (such as `breakpoint()`, `viewport-value()`, `media()`, or `mq()`) are provided.*

### E. Boundary Semantics & Interval Model
Both viewport and container queries implement an identical mathematical interval model:
- **UP (`up($key)`):** `width >= threshold` (inclusive lower bound). Emits `min-width: threshold`.
- **DOWN (`down($key)`):** `width < threshold` (exclusive upper bound). Emits `max-width: threshold - 0.02px`.
- **BETWEEN (`between($min, $max)`):** `min <= width < max` (half-open interval `[min, max)`). Emits `(min-width: min_threshold) and (max-width: max_threshold - 0.02px)`.

### F. Private Exclusive Upper-Bound Epsilon
- An internal epsilon of **`0.02px`** is subtracted from exclusive upper bounds (e.g., `viewport-down(lg)` emits `max-width: 1023.98px`).
- This epsilon is an internal technical detail of media-query math to prevent overlap at fractional pixel thresholds; it is not a design token or spacing value.

### G. Validation & Compile-Time Failure Behavior
- **Unknown Key Validation:** Calling any Query API mixin with an unrecognized key raises an explicit Sass `@error` identifying the invalid key, the query domain (`viewport` or `container`), and the list of permitted keys (`xxs, xs, sm, md, lg, xl, xxl`).
- **Range Ordering Validation:** Calling `viewport-between($min, $max)` or `container-between($min, $max)` where `min_threshold >= max_threshold` raises an explicit Sass `@error`. Reversed or zero-width ranges are never silently emitted.

### H. Container Query Capabilities
- **Unnamed Queries:** When `$name` is omitted or `null`, standard unnamed container queries are emitted (e.g., `@container (min-width: 768px)`).
- **Named Queries:** When `$name` is provided, named container queries are emitted (e.g., `@container content (min-width: 768px)`).
- **Context Ownership:** The Query API queries container context; defining `container-name` or `container-type` remains the responsibility of container layout definitions.

---

## 21. Semantic Layout Spacing & Gutter Technical Contract (Candidate V1)

### A. Architectural Responsibility & Boundaries
- **Consumes Reference Spacing Primitives:** Layout spacing tokens resolve strictly from the compile-time Reference Spacing scale (`ref.$honesty-ref-space-*`). No arbitrary pixel or rem literals are permitted.
- **Consumes Foundation Query API for Responsive Overrides:** All responsive overrides for page gutters and grid gutters are authored strictly via the public Foundation Query API (`viewport-up`).
- **Forbidden Raw Breakpoint Imports:** Semantic Layout modules must **not** import or consume raw Reference breakpoint maps directly (`$honesty-ref-breakpoints-*`).
- **Density Independence:** Layout tokens (`--honesty-space-layout-*`) are completely density-independent in Candidate V1. They are defined in `:root` and do not modulate under `[data-density="compact"]`, `[data-density="comfortable"]`, or `[data-density="spacious"]`. Density modulates content stack and inset rhythm only.
- **Component Primitives Deferred:** Layout spacing aliases establish the sizing vocabulary for future structural primitives (`ErpStack`, `ErpInline`, `ErpGrid`). No production components are created in this phase.
- **Container Max-Width Deferred:** No global container max-width tokens (`--honesty-layout-container-max-width`, etc.) are established in Candidate V1. In a data-heavy, desktop-first ERP, max-width is deferred to future structural primitive review.
- **Grid Column Count Deferred:** No production grid column tokens (`--honesty-grid-columns`, etc.) are defined in this phase. Grid column definitions belong to the future `ErpGrid` primitive.
- **Container Queries Context:** The Container Query API has been exercised in
  the docs-only Layout/Grid specimen using `container-down`,
  `container-between`, and `container-up`. Production container and grid
  component contracts remain deferred.

### B. Approved Layout Size Vocabulary
The approved sizing scale for Layout spacing primitives consists strictly of 7 symbolic keys:
- `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- Arbitrary aliases (`tiny`, `small`, `medium`, `large`, `huge`, `custom`, `auto`) are strictly prohibited.

### C. Layout Gap Size Aliases (Emitted in `:root`)
- `--honesty-space-layout-gap-xxs`: `ref.$honesty-ref-space-4` (4px / 0.25rem)
- `--honesty-space-layout-gap-xs`: `ref.$honesty-ref-space-8` (8px / 0.5rem)
- `--honesty-space-layout-gap-sm`: `ref.$honesty-ref-space-12` (12px / 0.75rem)
- `--honesty-space-layout-gap-md`: `ref.$honesty-ref-space-16` (16px / 1rem)
- `--honesty-space-layout-gap-lg`: `ref.$honesty-ref-space-24` (24px / 1.5rem)
- `--honesty-space-layout-gap-xl`: `ref.$honesty-ref-space-32` (32px / 2rem)
- `--honesty-space-layout-gap-xxl`: `ref.$honesty-ref-space-48` (48px / 3rem)

### D. Page Inline Gutter (`--honesty-space-layout-page-gutter-inline`)
Defines the horizontal breathing room between the outer viewport boundary and page content using logical inline geometry (direction-agnostic for RTL/LTR).
- **Base (< 768px):** `ref.$honesty-ref-space-16` (16px / 1rem)
- **`@include viewport-up(md)` (>= 768px):** `ref.$honesty-ref-space-24` (24px / 1.5rem)
- **`@include viewport-up(lg)` (>= 1024px):** `ref.$honesty-ref-space-32` (32px / 2rem)
- **`@include viewport-up(xxl)` (>= 1536px):** `ref.$honesty-ref-space-48` (48px / 3rem)
*(At `xl`, the `lg` value of 32px remains active; no redundant override is emitted.)*

### E. Grid Gutter (`--honesty-space-layout-grid-gutter`)
Defines the default separation between columns/cells in data and dashboard grids.
- **Base (< 768px):** `ref.$honesty-ref-space-12` (12px / 0.75rem)
- **`@include viewport-up(md)` (>= 768px):** `ref.$honesty-ref-space-16` (16px / 1rem)
- **`@include viewport-up(lg)` (>= 1024px):** `ref.$honesty-ref-space-24` (24px / 1.5rem)
*(No further increase at `xl` or `xxl`; ERP data layouts avoid excessive whitespace separation on wide desktop monitors.)*

---

## 22. Reference Z-Index & Semantic Layer Technical Contract (Candidate V1)

### A. Architectural Principles & Scope
- **Stacking Order vs. Elevation Separation:** Stacking order (`z-index`) is an independent Foundation concern from elevation (`box-shadow`), visual emphasis, or component ownership. A stronger shadow does NOT imply a higher z-index, and an overlay shadow does not automatically imply an overlay z-index. Elevation and Layers remain strictly decoupled dimensions.
- **Reference Tokens (Compile-Time Sass Primitives):** Context-free numerical primitives defined in `src/styles/foundation/reference/z-index/_scale.scss`.
- **Semantic Tokens (Runtime CSS Custom Properties):** Purpose-driven roles emitted in `:root` via `src/styles/foundation/semantic/layers/_roles.scss` that resolve strictly from Reference z-index Sass tokens (`ref.$honesty-ref-z-index-*`).
- **No Component-Specific Layer Tokens:** Tokens such as `--honesty-layer-dropdown`, `--honesty-layer-menu`, `--honesty-layer-popover`, `--honesty-layer-tooltip`, `--honesty-layer-modal`, `--honesty-layer-dialog`, or `--honesty-layer-toast` are prohibited in Candidate V1; component-specific mappings belong to future Component token contracts (Layer 3).
- **No Global Stacking-Context Rules Yet:** No global or component CSS rules involving `position`, `isolation`, `transform`, `filter`, `opacity`, `contain`, or `will-change` are introduced for stacking context creation. Stacking-context ownership belongs to future components and layout primitives.
- **Application Boundary:** No GLOBAL production Layer application exists on `html`, `body`, App shell, or navigation.
- **Docs-Only Review Evidence:** The docs-only Layers specimen intentionally consumes Layer tokens locally inside isolated stacking stages for review evidence.
- **Production Ownership Deferred:** Production component-specific stacking-context ownership remains deferred.
- **No Theme or Density Coupling:** Layer tokens are emitted once in `:root`. They are strictly theme-independent (not declared under `[data-theme='light']` or `[data-theme='dark']`) and density-independent (unchanged across `compact`, `comfortable`, and `spacious` modes).

### B. Reference Z-Index Scale (Compile-Time Sass Primitives)
Defined in `src/styles/foundation/reference/z-index/_scale.scss`:
- `$honesty-ref-z-index-0`: `0`
- `$honesty-ref-z-index-10`: `10`
- `$honesty-ref-z-index-20`: `20`
- `$honesty-ref-z-index-30`: `30`
- `$honesty-ref-z-index-40`: `40`
- `$honesty-ref-z-index-50`: `50`

*Prohibitions:* Negative numbers (`-1`), arbitrary intermediate integers (`1`, `5`), and out-of-scale values (`100`, `1000`, `999`, `9999`, `99999`) are strictly forbidden.

### C. Semantic Layer Roles (Runtime CSS Custom Properties)
Emitted in `:root` via `src/styles/foundation/semantic/layers/_roles.scss`:
- `--honesty-layer-base`: `#{ref.$honesty-ref-z-index-0}` (`0`) — ordinary application and content stacking baseline.
- `--honesty-layer-sticky`: `#{ref.$honesty-ref-z-index-10}` (`10`) — persistent in-flow regions that remain above ordinary scrolling content.
- `--honesty-layer-floating`: `#{ref.$honesty-ref-z-index-20}` (`20`) — non-blocking transient floating surfaces above normal/sticky content.
- `--honesty-layer-overlay`: `#{ref.$honesty-ref-z-index-30}` (`30`) — scrim/backdrop or general overlay plane above normal/floating application content.
- `--honesty-layer-blocking`: `#{ref.$honesty-ref-z-index-40}` (`40`) — foreground blocking interaction layer above the overlay plane.
- `--honesty-layer-notification`: `#{ref.$honesty-ref-z-index-50}` (`50`) — highest approved generic notification and urgent feedback surface.

### D. Strict Ordering Contract
Stacking order is strictly monotonic with no ties:
```
base (0) < sticky (10) < floating (20) < overlay (30) < blocking (40) < notification (50)
```

### E. No Negative Layer Rule
No negative z-index tokens, underlay tokens, or background-minus-one tokens are permitted. Stacking contexts must not rely on negative indexes in Candidate V1.

---

## 23. Theme-Aware Semantic Chart Color Technical Contract (Candidate V1)

### A. Architecture, Source, and Ownership
- **Architecture:** Existing Reference Colors → Semantic Chart Contract → Light/Dark Theme Mapping → future Chart Components.
- **Existing Reference Colors Are the Only Source:** Candidate V1 resolves directly from the approved Primary, Cyan, Green, Amber, Red, and Neutral Reference color Sass tokens.
- **Reference Charts Adds No Raw Values:** src/styles/foundation/reference/charts/ remains reserved for future genuinely visualization-specific raw primitives. Candidate V1 does not duplicate existing colors or introduce a Chart-specific raw hue palette.
- **Theme-Sensitive Ownership:** Actual runtime values are emitted only inside [data-theme='light'] and [data-theme='dark']. The Semantic Charts module documents the contract and emits no universal :root values.
- **Independent Resolution:** Every Chart role resolves independently from Reference Colors. Status/Delta roles do not alias categorical CSS custom properties, Feedback runtime variables, or Action runtime variables.

### B. Candidate V1 Runtime Roles
Candidate V1 contains exactly 12 Semantic Chart runtime roles:

**Categorical ordinal positions:**
- --honesty-chart-series-1
- --honesty-chart-series-2
- --honesty-chart-series-3
- --honesty-chart-series-4
- --honesty-chart-series-5

These five roles are ordinal categorical positions only. They do **not** mean Primary, Info, Success, Warning, or Danger, even when a current mapping resolves to the same underlying Reference hue. Additional roles such as series-6 and above require concrete future dashboard or chart requirements.

**Status / Delta semantics:**
- --honesty-chart-positive
- --honesty-chart-negative
- --honesty-chart-warning
- --honesty-chart-info

**Structural Chart-context semantics:**
- --honesty-chart-gridline — subtle plotting and grid guide color.
- --honesty-chart-axis — stronger structural axis and tick color.
- --honesty-chart-label — textual label color inside Chart contexts.

Structural Chart roles do not replace the general Text or Border Semantic contracts.

### C. Exact Theme Mapping

| Semantic Chart role | Light theme Reference source | Dark theme Reference source |
|---|---|---|
| --honesty-chart-series-1 | ref.$honesty-ref-color-primary-600 | ref.$honesty-ref-color-primary-400 |
| --honesty-chart-series-2 | ref.$honesty-ref-color-cyan-600 | ref.$honesty-ref-color-cyan-400 |
| --honesty-chart-series-3 | ref.$honesty-ref-color-green-600 | ref.$honesty-ref-color-green-400 |
| --honesty-chart-series-4 | ref.$honesty-ref-color-amber-600 | ref.$honesty-ref-color-amber-400 |
| --honesty-chart-series-5 | ref.$honesty-ref-color-red-600 | ref.$honesty-ref-color-red-400 |
| --honesty-chart-positive | ref.$honesty-ref-color-green-600 | ref.$honesty-ref-color-green-400 |
| --honesty-chart-negative | ref.$honesty-ref-color-red-600 | ref.$honesty-ref-color-red-400 |
| --honesty-chart-warning | ref.$honesty-ref-color-amber-600 | ref.$honesty-ref-color-amber-400 |
| --honesty-chart-info | ref.$honesty-ref-color-cyan-600 | ref.$honesty-ref-color-cyan-400 |
| --honesty-chart-gridline | ref.$honesty-ref-color-neutral-200 | ref.$honesty-ref-color-neutral-800 |
| --honesty-chart-axis | ref.$honesty-ref-color-neutral-400 | ref.$honesty-ref-color-neutral-600 |
| --honesty-chart-label | ref.$honesty-ref-color-neutral-600 | ref.$honesty-ref-color-neutral-300 |

### D. Candidate V1 Scope Boundaries
- No Chart background, surface, plot-area, panel, legend, tooltip, crosshair, marker, fill, opacity, interaction-state, or motion token is introduced.
- No rgba Chart token, opacity scale, gradient, hatching, pattern, texture, SVG pattern asset, or Chart-specific binary asset is introduced.
- Future Chart containers initially consume normal Surface semantics unless concrete visual evidence establishes a dedicated Chart contract.
- Legend, tooltip, crosshair, and marker styling belongs to future Chart Component token contracts.
- A docs-only Chart Color specimen exists.
- No Chart library, production Chart component, or Chart Component Tokens exist.
- No Chart background, tooltip, legend, opacity, pattern, or gradient contract
  exists.

---

## 24. UI Preferences Technical Contract (Candidate V1)

### A. StoreType and Persistence Eligibility

The `StoreType` enum contains exactly:

- `LOCAL`
- `BACKEND`
- `LOCAL_AND_BACKEND`
- `NONE`

`LOCAL` and `LOCAL_AND_BACKEND` are eligible for local persistence.
`BACKEND` and `NONE` are not written locally. Candidate V1 has no backend
persistence implementation.

### B. Current Settings and Categories

Candidate V1 contains exactly 11 settings, and all 11 currently use
`StoreType.LOCAL`:

- `theme`
- `density`
- `formLabelPlacement`
- `formAppearance`
- `digits`
- `identifierDigits`
- `numberSeparators`
- `moneyDisplay`
- `dateFormat`
- `dateViewStyle`
- `timeFormat`

The current categories are:

- `appearance`
- `forms`
- `numbers`
- `money`
- `dateTime`

### C. Exact Candidate V1 Defaults

- `theme = system`
- `density = comfortable`
- `formLabelPlacement = top`
- `formAppearance = outlined`
- `digits.base = latin`
- `digits.overrides = {}`
- `identifierDigits = latin`
- `numberSeparators.base = comma-dot`
- `numberSeparators.overrides = {}`
- `moneyDisplay = code-after`
- `dateFormat.base = DD/MM/YYYY`
- `dateFormat.overrides.export = YYYY-MM-DD`
- `dateViewStyle = numeric`
- `timeFormat = 24h`

### D. Typed Runtime Ownership

- Setting key/value identity is enforced at compile time.
- `UiSetting` owns cloned, recursively immutable object values.
- A setting contains no persistence I/O.
- A typed central store coordinates setting state.
- Contextual settings use a `base` value plus `overrides`.
- Identifier Digits is independent from contextual digit settings.

### E. Local Persistence Contract

- Local persistence uses
  `honesty-erp:ui-settings:<tenantId>:<companyId>:<userId>`.
- A malformed, unknown-key, missing-key, or invalid-value local document resets
  the WHOLE locally persisted document to defaults.
- Candidate V1 does not partially salvage a corrupt local document.
- Candidate V1 has no version or migration envelope.

### F. Application and Formatting Boundaries

- Timezone is browser/system read-only and is not user selectable.
- Date handling is Gregorian only.
- The `system` theme preference resolves browser `prefers-color-scheme` to
  an actual `light` or `dark` visual theme.
- Candidate V1 Preferences review is isolated to the docs specimen.
- No global App-shell application exists yet.





