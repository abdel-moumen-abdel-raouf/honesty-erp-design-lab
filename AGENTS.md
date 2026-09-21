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
