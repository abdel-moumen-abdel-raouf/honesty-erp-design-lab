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
| **Semantic Tokens** | CSS Custom Properties (`--honesty-` prefix) | **Runtime Emission** via Theme definitions | Dynamic runtime theming (light, dark, system modes), responsive adjustments, and global intent mapping. |
| **Component Tokens** | CSS Custom Properties (`--honesty-<component>-` prefix) | **Runtime Emission** at component host or base scope | Explicit component styling contracts. Enables local variations and predictable component-level theming without leaking styles. |
| **Themes** | CSS Selectors (e.g., `[data-theme="..."]`) | Dynamic runtime declaration blocks | Resolves all theme-sensitive Semantic Tokens for runtime theme switching (light, dark, system). Does not declare raw palette scales or layout rules. |
| **Density** | CSS Selectors (e.g., `[data-density="..."]`) | Dynamic runtime property overrides | Modulates density-sensitive Semantic/Component properties. Never redefines global raw reference scales. |

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
  - `$honesty-ref-duration-<step>`
- **Rule:** Reference names are context-free. They describe position on a scale, not where or why they are used.

### B. Semantic Tokens (Runtime CSS Custom Properties)
- **Syntax:** `--honesty-<semantic-category>-<purpose>`
- **Category:** `color-surface`, `color-text`, `color-action`, `color-feedback`, `type`, `space`, `radius`, `border`, `shadow`, `motion`, `space-layout`, `layer`, `chart`.
- **Purpose:** Functional intent and state (e.g., `canvas`, `panel`, `primary`, `muted`, `hover`, `success`, `error`).
- **Grammar Examples (Shape Only):**
  - `--honesty-color-surface-<role>`
  - `--honesty-color-text-<role>`
  - `--honesty-color-action-<variant>-<state>`
  - `--honesty-color-feedback-<intent>-<role>`
  - `--honesty-type-<role>-<attribute>`
  - `--honesty-space-<purpose>`
  - `--honesty-radius-<role>`
  - `--honesty-border-<role>`
  - `--honesty-shadow-<elevation-level>`
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
- Approved theme modes are:
  - `light`
  - `dark`
  - `system` (resolves active visual mode dynamically from the operating-system/browser color-scheme preference).
- Themes map Reference tokens to Semantic CSS custom properties based on the active mode (e.g., `[data-theme="light"]`, `[data-theme="dark"]`).
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
- **No Global Application:** Typography variables are not applied to `html`, `body`, or component selectors in this phase.

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
- **Layout Spacing Deferred:** Layout and grid spacing tokens (`--honesty-space-layout-*`) and the primitive layout contract (`XXS`, `XS`, `SM`, `MD`, `LG`, `XL`, `XXL`) belong to the separate Semantic Layout/Grid domain (`semantic/layout/`) and are deliberately deferred to prevent pre-empting layout decisions.
- **Component Padding & Gaps Deferred:** Generic inset and stack tokens must not be treated as component-level padding or gaps (e.g., `card-padding`, `button-padding`, `modal-padding`). Component-specific contracts belong exclusively to future Component Tokens (Layer 3).
- **Density Overrides Deferred:** Spacing variables are not placed under `[data-density]` in this candidate. Density modulation (compact, comfortable, spacious) will be implemented as targeted overrides in later density phases.
- **No Visual Application:** Candidate V1 spacing tokens are not applied to global elements (`html`, `body`), existing review pages, specimens, or shell layouts in this phase.

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
- **No Global Application:** Borders and radius tokens are not applied to `html`, `body`, or existing UI views in this phase.
