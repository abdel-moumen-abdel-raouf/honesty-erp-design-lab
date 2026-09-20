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
  - `--honesty-color-feedback-<intent>-<element>`
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
2. **No Layer Skipping:** Component templates and stylesheets must not consume Reference tokens or hardcoded literals directly.
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
