# Honesty ERP Design Lab — Codex Instructions

## Working Scope

Work only inside this repository.

This is an Angular / TypeScript / SCSS standalone browser Design Lab for the
Honesty ERP frontend foundation.

The product is Arabic-first and RTL-first.

Work in small bounded phases only.

Do not anticipate later phases or implement adjacent features unless explicitly
requested.

The Product Owner is the final authority for visual approval.
Technical success, green tests, or Codex judgment do not equal visual approval.

## Design Architecture

The token architecture is strictly:

Reference → Semantic → Theme/Density/Query resolution → Component Tokens → Components

Reference tokens:
- Sass compile-time primitives.
- No runtime CSS output by default.

Semantic tokens:
- Runtime CSS custom properties.

Component tokens:
- Runtime component-scoped contracts.
- Do not create them before the relevant component phase.
- Semantic → Component Tokens is the default path for shared meaning,
  theme-sensitive values, density-sensitive values, brand, feedback, surfaces,
  text, focus, elevation, motion, and layers.
- A Component Token declaration may consume a Reference primitive directly only
  when the value is a context-free physical primitive, no shared Semantic
  meaning is appropriate, and the Product Owner-approved component reference
  requires it.
- Direct Reference colors are forbidden in Component Tokens. Colors must go
  through Semantic contracts.
- Direct Reference breakpoints are forbidden. Responsive behavior uses the
  Foundation Query API only.
- A Component Token may own a component-local structural constant when that
  value is inherently local to the component, such as a container max-width,
  grid column count, or component-local min/height/width contract. Such a value
  stays in the Component layer and is not automatically promoted into
  Foundation.

Production component implementation SCSS consumes Component Tokens only. It
does not consume Reference or Semantic tokens directly.

The public responsive Sass API is the Foundation Query API.

Do not consume raw Reference breakpoints from component/layout implementations.

## Technology Constraints

Do not add:
- Angular Material
- Bootstrap
- Tailwind
- third-party UI frameworks
- Gemini runtime dependencies

Do not add dependencies unless the task explicitly requires them.

Do not add assets, fonts, or redistributed files without checking licensing /
attribution obligations in the same task.

## Visual Governance

No production component visual design without a Product Owner supplied external
reference or an explicit waiver.

Docs-only Foundation specimens may use clearly local temporary layout values when
necessary for review.

Do not invent Foundation CSS custom properties.

Every referenced --honesty-* custom property must actually exist.

Do not hide invalid Foundation variables behind fallback values.

Avoid:
- decorative gradients
- unnecessary shadows
- card-inside-card visual noise
- decorative overboxing

Elevation is only for genuine elevation.

## Responsive Governance

Use the Foundation Query API for responsive viewport/container behavior.

Do not hard-code raw breakpoint thresholds where the Query API applies.

Honesty ERP is desktop-first, but Design Lab review pages must remain readable at
desktop, tablet, and narrow/mobile review widths.

## Testing

Do not create false-positive tests.

Forbidden examples include:
- expect(true).toBe(true fallbacks
- tests that silently pass when CSS is unavailable
- tests whose names claim to verify computed styling but only verify DOM attributes

Do not duplicate Sass token maps in TypeScript merely to make them testable.

Use the real project build/lint/test pipeline as the primary compilation gate.

## Package Manager

Use npm only.

`package-lock.json` is the single dependency lockfile for this repository.

Do not use:
- Bun
- Yarn
- pnpm

Do not run `npm install` during ordinary source/design tasks unless the task
explicitly changes dependencies or the lockfile.

Do not modify package-lock.json incidentally.

## Git Workflow

The repository branch for this workflow is main.

Before modifying anything:

1. Run:
   git status --short
   git branch --show-current

2. The current branch must be main.

3. If the worktree contains unrelated uncommitted changes, STOP and report them.
   Do not mix unrelated changes into the task.

For every bounded task that modifies files:

1. Implement only the requested scope.
2. Run the requested build, lint, tests, and other verification.
3. Inspect:
   git diff
   git diff --check
   git status --short
4. Fix task-caused failures before committing.
5. Create exactly ONE commit for the task.
6. Use the exact commit message supplied by the task when one is provided.
7. Do not amend existing commits.
8. Do not create a new branch.
9. Do not rebase published history.
10. Never force-push.
11. Push the successful commit with:
    git push origin main
12. Verify:
    git status --short
    The worktree must be clean.
13. STOP.

If the task cannot be completed or verification fails and cannot be corrected,
do not create a misleading success commit. Report the blocker.

Never commit unrelated files.

## Task Completion Report

At the end report only:
- files changed
- requested implementation result
- build result
- lint result
- test result
- runtime result when applicable
- commit SHA
- commit message
- push result
- final git status

Then STOP.

## Execution-Only Agent Mode

The Product Owner and ChatGPT are the sole design, architecture, product, and
visual-review authority for this repository.

The implementation agent is an execution engine only.

The agent must NOT:

- make design decisions;
- make architecture decisions;
- perform subjective visual review;
- choose between unspecified alternatives;
- expand scope;
- anticipate future phases;
- perform "while here" cleanup;
- invent missing values;
- introduce adjacent improvements;
- decide whether a visual candidate is approved;
- suggest token changes unless explicitly requested.

The task prompt is authoritative.

If execution requires a decision that is not explicitly specified in the task:

STOP and report the exact missing decision.

Do not infer or choose a default.

Every implementation task may include a:

MANDATORY COMPLETENESS CHECKLIST

The agent must mechanically verify every checklist item before committing.

The checklist is NOT permission to discover or redesign adjacent scope.

Final reports must contain deterministic implementation facts only.

Do not report subjective statements such as:

- looks good
- visually balanced
- appropriate
- better
- cleaner
- recommended

Visual review belongs exclusively to the Product Owner and ChatGPT.

## Strict Bottom-Up Layer Order

The architectural implementation sequence is exactly:

1. Reference primitives
2. Semantic contracts
3. Theme / Density / Query resolution
4. Foundation application contracts
5. Component Tokens
6. Production structural/text primitives
7. Basic controls
8. Composites
9. Patterns
10. Shell
11. Features / Pages / migration

A higher layer must not be implemented while a genuine required lower-layer
dependency remains unresolved.

Overview/closure documentation never drives design order.

The implementation agent does not decide whether a lower dependency exists;
the task prompt supplies that decision.

## Component Token Framework

Concrete Component Token modules live at:

`src/styles/foundation/components/<component>/_tokens.scss`

with sibling `_index.scss`.

Rules:

- every concrete token module defines `@mixin base`;
- token modules emit no CSS merely by import;
- runtime grammar is:
  `--honesty-<component>[-<part>]-<property>[-<state>]`;
- variants, sizes, tones, densities, orientations and similar facets remap
  canonical token slots instead of creating combinatorial token names;
- Semantic runtime contracts are the default source;
- direct Reference colors and breakpoints are forbidden;
- permitted direct Reference exceptions are only those documented in
  `COMPONENT_TOKEN_FRAMEWORK.md`;
- Component Tokens are host-scoped, never global;
- Component implementation consumes its own Component Tokens for tunable design
  values;
- cross-component token access is forbidden;
- Feature/Page code must not override Component Tokens;
- concrete Component Token contracts remain reference-first;
- do not create a concrete Component Token contract unless the task explicitly
  supplies the Product Owner reference or reference waiver.

## Production Text Governance

- ErpText is the only public Typography Primitive.
- ErpText custom element `<erp-text>` is the sole production Typography
  authoring gateway.
- `[erpText]` native-host authoring is forbidden.
- Every rendered production literal or interpolated text node must be inside
  `<erp-text>`.
- ErpText may internally emit a native semantic child where safe.
- Parent-sensitive HTML semantics remain owned by the future structural,
  control, or composite that owns that native structure.
- No ErpHeading exists.
- No ErpLink exists.
- Future Controls and Composites render textual UI through ErpText.
- `innerHTML`, `innerText`, and `textContent` template bypasses are forbidden.
- Production inline Angular templates are forbidden.
- `br` and `wbr` contain no text and are allowed inside ErpText.
- Raw `hr` is replaced by ErpDivider.
- Code-like text introduces no monospace role.
- New Typography primitives may not be created without explicit Product Owner
  reopen.
- ErpText content is unselectable by default.
- Consumers explicitly opt into selection with the public `selectable` boolean
  input.
- Selection behavior is owned by ErpText and must not be recreated through
  feature/page CSS overrides.
- Copyable identifiers, codes, values, or long-form content explicitly opt in
  when product requirements require user selection.

## Production Icon Governance

Rules:

- `<erp-icon>` is the sole production icon-authoring gateway.
- Feature/Page/Control consumers must not use `<ng-icon>` directly.
- Feature/Page/Control consumers must not author raw `<svg>` icons.
- NgIcons and vendor icon packages are ErpIcon implementation details.
- ErpIcon registry may internally use multiple approved NgIcons packs.
- Vendor/source-pack selection is never a consumer API.
- Any `@ng-icons/*` import outside ErpIcon implementation is forbidden.
- Vendor icon names must never cross the ErpIcon semantic registry boundary.
- Application code uses semantic `ErpIconName` values only.
- ErpIcon is non-interactive; Buttons/Controls own interaction.
- Decorative icons are the default.
- Non-decorative icons require a meaningful explicit label.
- Invalid registry lookups do not silently render another semantic icon.
- Logical directional icons mirror centrally in RTL.
- ErpIcon `tone` owns semantic icon color.
- ErpIcon `variant` owns outline/filled style.
- ErpIcon `strokeWidth` owns controlled outline stroke thickness.
- `strokeWidth` has no effect for the filled variant by design.
- Raw feature/page color, fill, and stroke overrides are forbidden.
- Arbitrary pixel icon sizing is forbidden.
- All sizes must use the controlled `ErpIconSize` scale.
- The maximum V1 size is `15rem`.
- Feature/Page code must not override ErpIcon Component Tokens.
- New vendor packs may be added only inside ErpIcon implementation when required
  to satisfy an approved semantic icon contract; they must remain hidden behind
  the semantic registry and must use an approved redistribution-compatible
  license.

## Production Button Governance

- Standard action authoring uses ERP button controls.
- Feature/Page templates must not author native `<button>`.
- Feature/Page templates must not use static input button/submit/reset controls.
- Feature/Page templates must not synthesize buttons with `role="button"`.
- ErpButton owns standard text actions.
- ErpIconButton owns icon-only actions.
- ErpFab and ErpExtendedFab own FAB actions.
- Native button semantics remain internal implementation details.
- Visible button text uses ErpText.
- Icons use ErpIcon.
- Button Family owns ripple/focus/disabled/loading interaction.
- FAB positioning belongs to parent layout/composite.
- ButtonGroup/SplitButton/FabMenu belong to the Composite layer.
- Production Feature/Page uses of `ErpIconButton` and `ErpFab` must be
  composed inside `ErpTooltip` so icon-only actions have visible explanatory
  Tooltip evidence.
- Tooltip text and the control accessible label represent the same semantic
  action.
- `ErpIconButton` and `ErpFab` remain internally Tooltip-agnostic; they do
  not create hidden automatic Tooltips.
- `ErpButton` and `ErpExtendedFab` have visible labels and do not require a
  default Tooltip wrapper.
- Do not nest an automatic/internal Tooltip because Button Family owns none.

## Production Input Foundation Governance

- `ErpInputBase` is internal and non-renderable; Feature/Page code never authors
  it directly.
- `ErpInputBase` owns shared nonvisual input behavior only.
- It has no selector, template, styles, or Component Tokens.
- Concrete input controls own their own native semantics, templates, visual
  reference, and Component Tokens.
- Cross-component Component Token access remains forbidden.
- Input Family V1 uses stable `ControlValueAccessor`.
- Do not use experimental Angular Signal Forms in this Angular 21 repository
  without an explicit Product Owner architecture reopen.
- Concrete input controls register themselves as value accessors; the base does
  not provide `NG_VALUE_ACCESSOR`.
- Do not introduce a competing generic `value`/`valueChange` API in the base.
- Do not pre-create secondary input base classes before repeated concrete
  behavior proves the need.
- A Basic Control family freeze never closes the Basic Controls layer.
- Internal derived InputBase state stays protected; only approved inherited inputs form public base API.
- Concrete controls must not mutate InputBase value/focus state directly; user mutations go through the protected base helpers.
