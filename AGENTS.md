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

Reference → Semantic → Component → Implementation

Reference tokens:
- Sass compile-time primitives.
- No runtime CSS output by default.

Semantic tokens:
- Runtime CSS custom properties.

Component tokens:
- Runtime component-scoped contracts.
- Do not create them before the relevant component phase.

Production components must not consume raw Reference values directly.

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
