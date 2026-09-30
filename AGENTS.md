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
- `ErpFileSelectionBase` is the approved internal non-renderable shared base
  for File/Image selection; do not pre-create further secondary input bases
  before repeated concrete behavior proves the need.
- A Basic Control family freeze never closes the Basic Controls layer.
- Internal derived InputBase state stays protected; only approved inherited inputs form public base API.
- Concrete controls must not mutate InputBase value/focus state directly; user mutations go through the protected base helpers.

## Production Corrected Controls Governance

- Concrete Controls and Composites use approved ERP/internal semantic button
  owners; raw native button authoring is forbidden outside those internals.
- NumberBox and NumberStepper remain text-like decimal editors and must not
  reintroduce browser-native number spinners.
- ColorPicker system colors come only from the generated Foundation System
  Color Registry; copied palettes are forbidden.
- FilePicker and ImagePicker remain multi-selection controls and own no HTTP
  upload, progress, retry, server-response, or backend-policy behavior.
- SearchBox popup mode remains nonblocking, anchored, backdrop-free, and
  independent from both `ErpOverlayManager` and Tooltip popup behavior.
- IconPicker selection tiles retain fixed, tokenized, content-independent
  geometry.
- Blocking Overlay backdrop, layer, lifecycle, dismissal, blur, tone, motion,
  reduced-motion, and drawer geometry remain owned by the shared Overlay
  system; Feature/Page code must not recreate or override them.
- Field Component Tokens remain internal to the Field implementation; picker
  controls use `ErpFieldTrigger` instead of raw trigger buttons.
- DateRange staging retains anchor, preview, chronological interval, keyboard,
  disabled-date, Light/Dark, and RTL contracts.
- Corrected showcase and internal picker default copy is Arabic-first; stable
  API identifiers may remain English.
- These rules are technical regression guards only. They do not declare visual
  approval, freeze a control family, or close the Basic Controls layer.
- `ErpSearchBox` popup mode is a nonblocking anchored popup with no backdrop;
  it uses AnchoredOverlay geometry, not `ErpOverlayManager` or Tooltip.
- SearchBox popup visuals and motion remain in the SearchBox Component Token
  namespace and must not consume Overlay Component Tokens.
- SearchBox results projection remains generic; Feature/Page code owns result
  rendering without replacing the SearchBox popup container contract.

## Primary Controls Correction Program Governance

- Do not add new public control families while the Primary Controls Correction Program is active.
- Execute correction phases in the documented CR00 through CR12 order so shared lower-layer corrections land before dependent control corrections.
- Phase 10 and Phase 11 component-specific product, architecture, and visual review is deferred to a separate second review wave.
- Shared lower-layer corrections may make only the smallest mechanical Phase 10/11 compatibility updates required to keep compilation and tests green.
- Correction commits are technical checkpoints only; they do not declare visual approval, family freeze, or closure of the Basic Controls layer.

## Post-CR12 Review Wave A Governance

- Wave A is correction-only and does not authorize a new public component
  family.
- The no-new-components gate remains active throughout WA00 through WA05.
- Wave A technical checkpoints do not declare visual approval, freeze a control
  family, or close the Basic Controls layer.
- SearchBox mode changes, Glass removal, Solid/Ghost redesign, Number/Money/
  DateRange changes, CheckBox/RadioBox redesign, FabMenu/SplitButton changes,
  and deferred Phase 10/11 review remain outside Wave A.

## Post-CR12 Wave A Infrastructure Governance

- Wave A is correction-only and introduces no new public component family.
- Blocking Overlay dismissal defaults remain `false` for Escape and backdrop;
  either behavior requires explicit opt-in.
- Blocking Overlay default blur remains `low` and backdrop composition remains
  theme-sensitive.
- Overlay and Tooltip share the Foundation-owned `ErpMotionPreset` catalog;
  neither exposes arbitrary CSS-class motion APIs.
- The Lab authors exactly one top-level OverlayHost; Inputs and Overlays review
  routes render directly in its document.
- The Lab owns one persisted Light/Dark theme and full-page capture includes
  toolbar plus complete direct or embedded review content.
- FieldFrame owns shared full control-surface interaction delegation; concrete
  controls do not duplicate it.
- Wave A technical checkpoints do not declare visual approval or freeze.

## Production Blocking Overlay Governance

- `ErpOverlayManager` is the shared gateway for blocking modal and drawer surfaces.
- The application shell renders exactly one `ErpOverlayHost`; controls, Features, and Pages never create additional hosts.
- `ErpOverlayRef` instances are manager-owned and are injected into dynamic overlay content.
- Blocking overlays own stack order, backdrop, scroll lock, background inertness, focus trap, initial focus, focus restoration, and top-only dismissal.
- Modal and drawer surfaces require an accessible name.
- Drawer start/end positions are logical and RTL-aware.
- Feature/Page code must not recreate blocking backdrops, blocking z-index systems, or focus/scroll/inert controllers.
- Tooltip remains on its nonblocking anchored-overlay architecture and does not use `ErpOverlayManager`.
- `ErpFieldFeedback` remains in document flow and never uses `ErpOverlayManager`.
- Overlay-backed pickers use `ErpOverlayManager`; no third-party overlay dependency is introduced.

## Production Field Family Governance

- `ErpInputBase V1` is frozen with exactly `label`, `name`, `form`, and
  `disabled` as inherited public inputs.
- `ErpFieldBase`, `ErpFieldFrame`, `ErpFieldTrigger`, and `ErpFieldFeedback` are
  internal Field Family infrastructure; Feature/Page code never authors them
  directly.
- Concrete picker controls use `ErpFieldTrigger` for whole-field button
  semantics and do not author independent raw trigger buttons.
- Concrete Controls and Composites do not author raw native buttons outside
  approved internal semantic primitive roots. Legitimate native input,
  textarea, and file-input elements remain allowed in their owning controls.
- `ErpFieldFeedback` is an in-flow field message surface. It is not Tooltip,
  Popover, Overlay, a portal client, or an `ErpOverlayManager` client.
- Field tone is normal brand identity; field status is semantic state. Active
  status visuals take precedence without replacing the configured tone.
- Field implementations use genuine semantic labels. Placeholder never replaces
  the label.
- The Product Owner explicitly waives an external visual reference for the
  standard Field Family appearance; only the approved standard contract and
  frozen Honesty ERP token/theme language may be used.
- The glass-field visual reference is:
  `https://cdn.dribbble.com/userupload/45261316/file/82db561b5ced954d82f92fab7b3d05f0.jpg?resize=752x&vertical=center`.
- `ErpNumberStepper` is the canonical scalar increment/decrement control and is
  distinct from `ErpRangeSlider`.
- The NumberStepper visual reference is:
  `https://cdn.dribbble.com/userupload/28671846/file/original-dcafb540346e260c39fa27f8d9ff90e1.gif`.
- `ErpRangeSlider` is the canonical two-thumb interval control. Alternate
  scalar/range public control names are not part of V1.
- The RangeSlider visual reference is:
  `https://cdn.dribbble.com/userupload/44001748/file/original-18b5e92b66ba47eabdb4cd8ce03dde2e.png?resize=1024x768&vertical=center`.
- Date, time, date-time, date-range, color, icon, item, and combo selection
  controls are overlay-backed Composites even when their public names contain
  `Box`.
- File and image pickers are multi-selection Basic Controls backed by the
  internal non-renderable `ErpFileSelectionBase`; their CVA value is immutable
  `readonly File[]`.
- File/Image local accept, size, and count policy is a usability boundary only.
  Backend content/MIME, size, count, malware/security, and business validation
  remains authoritative.
- File/Image controls own no HTTP upload, progress, retry, or server-response
  behavior; browser-native filesystem selection remains the security boundary.
- A Field Family or Basic Control checkpoint does not close or freeze the Basic
  Controls layer.
- Specialized parser controls use their built-in final-value pattern when the
  public `pattern` override is null; invalid override regex is
  configuration-invalid.
- Progressive domain drafts stay separate from committed CVA values. Invalid
  final-domain values never publish.
- NumberBox and NumberStepper use ERP-owned text-like decimal editing and must
  not expose browser-native number spinners.
- CheckBox and RadioBox preserve authoritative native input semantics behind
  fixed custom geometry; selected, unselected, and indeterminate states must
  not change outer dimensions or cause layout shift.
- CheckBox marks use semantic ErpIcon `check` / `minus`; raw SVG marks are
  forbidden. RadioBox owns one centered inner dot.
- Temporal controls keep ASCII canonical ISO CVA values while defaulting
  display/picker locale and visible actions to the shared Arabic contract.
- DateRange owns one chronological staged interval with pointer and keyboard
  preview; backward selection must not discard the original anchor.
- Blocking temporal picker customization is limited to the typed Overlay
  behavior subset and must not expose internal Overlay wiring.
- Color, icon, item, and combo pickers expose the same typed blocking Overlay
  behavior subset and stage values until explicit confirmation.
- ColorPicker system values preserve generated Foundation System Color token
  identity; production code must not copy or hand-maintain the system palette.
- Concrete selection-picker content uses the internal `ErpSelectionTile` for
  native selectable-button semantics and must not author raw native buttons.
- IconPicker selection geometry is fixed and content-independent; semantic icon
  names are exposed through accessible labels and Tooltips.

## Production Overlay Governance

- Blocking modal/drawer selection surfaces use the shared `ErpOverlayManager`,
  `ErpOverlayRef`, and exactly one application-level `ErpOverlayHost`.
- Do not add Angular CDK, Angular Material, or a third-party overlay dependency.
- Blocking overlays own stack order, backdrop, backdrop blur, scroll lock,
  background inertness, focus trapping/restoration, dismissal policy, nested
  stacking, reduced motion, responsive sizing, and RTL logical drawer placement.
- Tooltip continues to use its existing nonblocking anchored-overlay
  architecture and must not migrate to `ErpOverlayManager`.
- `ErpFieldFeedback` remains in normal document flow and must never use
  Tooltip, anchored-overlay, or `ErpOverlayManager`.
- Feature/Page code must not instantiate internal overlay host/ref
  infrastructure or recreate custom blocking backdrops and z-index systems.
- Overlay-backed pickers stage selection and commit only on confirmation;
  cancel or dismissal does not mutate the CVA value.

## Production Motion and Overlay Frame Governance

- `ErpMotionPreset` is the sole shared Overlay/Tooltip motion vocabulary.
- Animate.css is internal to the Foundation motion adapter; vendor classes and
  raw vendor effect names are forbidden outside that adapter and its tests.
- Overlay and Tooltip use the shared adapter for animation start, cancellation,
  completion, cleanup, direction mapping, and reduced-motion completion.
- Every user-facing blocking Modal and Drawer uses the shared
  `ErpOverlayFrame` Header/Body/Footer contract.
- Frame Header data requires a nonblank title, nonblank subtitle, and semantic
  ErpIcon name; the title supplies the dialog accessible name.
- Frame close uses a Tooltip-wrapped ErpIconButton and always dismisses with
  `close-action`.
- Frame Footer uses ERP Buttons for one developer-configured ordered action
  collection with stable IDs, `primary | secondary | utility` roles, logical
  `start | end` placement, and reactive disabled/loading state through
  `ErpOverlayRef`.
- Frame Body is the primary scroll region; blocking picker bodies must not
  recreate duplicate confirm/cancel footer chrome.
- `ErpSplitButton` is the only temporary `openLegacyCompactMenu` exception
  pending its deferred Phase 10/11 migration away from blocking modal
  semantics. No new exception is allowed.
- These technical rules do not declare visual approval or start Wave B.

## Current Product Owner Page-by-Page Review Governance

Current execution/review state is recorded in:

src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md

The latest locally verified technical checkpoint is:

`b1b20585adcb272f17835ef8182935353a67d243` — `fix(tooling): close remaining zero-warning gaps`

It includes the single-App-theme correction from
`320f66879036530dbfc509bd587724f799ba62c6` and the Windows-safe build runner
from `e31de1bfcd9aa9fb25ff0a01e6c5fd1448a2a1fb`.

Local verification is complete and fully green:

- every lint/governance gate passed;
- Angular lint passed;
- 87/87 test files passed;
- 618/618 tests passed;
- `typecheck:app` passed;
- `typecheck:spec` passed;
- production `build:clean` completed with zero Angular warnings;
- `Zero-warning build gate: PASS`.

This does not declare Product Owner visual approval or a frozen family. The
next authorized action is Product Owner runtime/visual re-review.

Current mandatory decisions:

- The App root is the sole runtime theme authority. Exactly one application binding,
  `[attr.data-theme]="theme()"`, belongs in `app.html`; the `App` class owns
  the corresponding `theme` state and the top-bar `toggleTheme()` action.
- Every routed page, production component, review internal, popup, and blocking
  overlay inherits the active App theme. They must not author/bind/document a
  local `data-theme`, inspect ancestor theme attributes, persist a competing
  theme setting, or pass Light/Dark through component/overlay data.
- Preferences intentionally contain no Theme setting. A legacy persisted
  `theme` key may only be removed during one-time storage migration while
  preserving all remaining preferences; it is never rehydrated as runtime state.
- The central Foundation theme mapping files under
  `src/styles/foundation/themes/_light.scss` and `_dark.scss` remain valid
  system implementation: they define semantic token resolutions and are not
  page/component theme authorities.
- `theme-authority:check` is a mandatory lint gate and prevents local theme
  authority from being reintroduced below App.
- Every routed Design Lab page template resolved from `app.routes.ts` authors `erp-*` tags only. Native HTML/SVG/form semantics needed by a page are owned inside approved ERP primitives/controls or Design-Lab-only `erp-review-*` internals; route templates never author native tags directly. `erp-review-*` internals are not public product component families.
- Tooltip defaults to slide-up entry and visually slide-up exit. Tooltip anchored geometry must remain stable while an inner layer animates.
- SearchBox popup remains nonblocking/anchored and must not be narrower than its field when viewport space permits or leave invisible pointer-blocking top-layer state after dismissal.
- FieldFeedback below a field always points its caret physically upward in both RTL and LTR.
- Existing Preferences are the source of truth for Latin/Arabic-Indic digits, numeric separators, money display, and applicable temporal display.
- File/Image selected rows own tokenized hover and focus-within feedback only; no upload/backend authority is added.
- Blocking Overlay implicit initial focus must not default to the close action.
- Overlay Frame Header owns the approved title/subtitle/icon hierarchy.
- Overlay Frame Footer is one ordered typed action surface, not a fixed primary/secondary pair and not duplicate body action rows.
- Temporal Today/Clear and Selection Clear Selected are footer actions.
- System color swatches retain a theme-aware semantic border.
- IconPicker must not create a false active outline on open and uses one roving-focus option model.
- Fixed equal tiles are for icon/color grids; ItemPicker/ComboBox textual options use vertical list-row presentation.
- ComboBox opens on normal pointer interaction, ArrowDown, and typing while preserving the entered query.
- ErpContainer production width values remain full, 48rem, 75rem, and 90rem; current correction changed showcase evidence, not those contracts.
- Do not redesign or delete ErpCheckBox/ErpRadioBox until the Product Owner supplies the dedicated templates/references.
- Unrelated visual/style refactoring remains deferred, but local Light/Dark theme authority cleanup is complete and must not be deferred or reintroduced.
- No later unreviewed showcase family or new public component family is authorized until the Product Owner supplies the next page-by-page findings.

The first-round correction checkpoint is a technical implementation candidate, not Product Owner visual approval. Do not declare family freeze, Basic Controls closure, or Wave B from it.


## Zero-Warning Verification Governance

Zero-warning verification is mandatory for review/tooling checkpoints.

Before reporting success, run:

`npm run verify:clean`

That command must cover:

- all repository lint/governance checks;
- the complete unit-test suite;
- `tsc -p tsconfig.app.json --noEmit`;
- `tsc -p tsconfig.spec.json --noEmit`;
- a production Angular build that fails when warning markers are emitted.

Do not raise component-style budgets merely to silence warnings. Split/refactor
the owning styles where practical and keep the approved 4kB warning / 8kB error
component-style thresholds unless the Product Owner explicitly reopens them.

Do not suppress CommonJS warnings with an allow-list when an owned ESM entry is
available and verified.


## Cross-Platform Verification Runner

The zero-warning build wrapper must remain cross-platform.

- Do not spawn `npm.cmd` directly with `shell: false` on Windows.
- Prefer `process.execPath` + `process.env.npm_execpath` to invoke npm
  lifecycle commands from Node verification scripts.
- A Windows `ComSpec` fallback is acceptable only when `npm_execpath` is
  unavailable.
- The wrapper must capture stdout/stderr, propagate non-zero build exits, and
  fail on Angular warning markers.
- `npm run build:clean:self-test` must keep covering warning detection,
  false-positive rejection, and invocation resolution.


## Build Warning Detection

Zero-warning verification must inspect normalized build output.

- Strip ANSI SGR escape sequences before warning matching.
- Angular component-style budget and optimization warnings remain
  release-blocking even when the CLI colors their output.
- Do not raise the approved 4 kB warning / 8 kB error component-style budgets
  merely to make the build green. Split/refactor the owning styles instead.
- The zero-warning wrapper self-test must include an ANSI-colored Angular
  warning example so a colored warning can never produce a false PASS.


## Fully Green Local Verification

The current technical source checkpoint
`b1b20585adcb272f17835ef8182935353a67d243` is fully green in the Product
Owner's Windows workspace.

The canonical `npm run verify:clean` completed successfully through all
lint/governance checks, 87 test files / 618 tests, both TypeScript no-emit
checks, and a production build with no Angular warnings.

The zero-warning wrapper also passed its dedicated self-test and standalone
`build:clean` execution.

Do not repeat corrective implementation solely for technical gating unless a
new regression is observed. The next authorized work is Product Owner
page-by-page visual/runtime review and any findings explicitly produced by
that review.


## Persistent Handoff Synchronization

The following files are mandatory persistent project-state artifacts:

- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `AGENTS.md`
- `src/app/controls/POST_CR12_PRODUCT_OWNER_REVIEW_STATE_V1.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`

After every Product Owner decision, implementation result, external review,
verification result, blocker, or next-step authorization, synchronize the
relevant state before issuing the next implementation task.

Do not leave a new Product Owner decision only in chat history or only inside an
implementation prompt.

`NEW_CHAT_HANDOFF.md` is the canonical conversational recovery document for a
new ChatGPT thread. It must record the current Git checkpoint, accepted
decisions, deferred scope, open findings, and exact next authorized action.


## No-Iframe Design Lab Direction

The Product Owner has decided that the Design Lab must become a normal
single-document Angular application with no iframe preview architecture.

Next authorized work must review and remove:

- the preview iframe from `app.html`;
- embedded-preview query flags such as `labPreview`;
- iframe-specific theme propagation such as `labTheme`;
- embedded/direct dual rendering modes that exist only because of the iframe;
- iframe-specific screenshot composition and document traversal.

The Product Owner would prefer to retain the Desktop / Tablet / Mobile controls
and screenshot feature only if they can be implemented truthfully and cleanly
without an iframe.

Do not fake viewport-media-query behavior by merely resizing a container and
calling that a real mobile/tablet viewport.

If true responsive viewport simulation cannot be preserved without iframe,
remove the Desktop / Tablet / Mobile simulation controls.

If screenshot capture cannot be preserved cleanly without iframe, remove the
screenshot feature.

Inputs and Overlays must no longer be special direct-review exceptions. After
the iframe architecture is removed, all routes use the same direct
`router-outlet` rendering model.

This decision is authorized but not yet implemented at the current handoff.


## No-Iframe Design Lab Implementation Status — 2026-09-29

The Product Owner-authorized no-iframe correction has been implemented in source:
- `9471a1d5b05a5f49c767b26e3a36b6b640715e0a` removes the iframe preview architecture;
- `d703ef0c8f47264902ca55b902c1488f99b56bf9` normalizes the resulting direct shell markup.

Current App-shell contract:
- one normal single-document Angular App;
- one direct `router-outlet` for every route;
- no embedded/direct dual mode;
- no `labPreview` or iframe `labTheme` query propagation;
- Inputs/Overlays have no rendering exception;
- Desktop/Tablet/Mobile preview controls are removed rather than faking real viewport media-query behavior with container resizing;
- Screenshot remains as direct capture of the App capture root and its filename includes current `light|dark` theme;
- exactly one App-level OverlayHost remains;
- App root remains the only runtime Light/Dark authority.

Verification warning:
- last fully verified source is still `b1b20585adcb272f17835ef8182935353a67d243`;
- the no-iframe source must not be called fully clean until a fresh `npm run verify:clean` passes.


## 2026-09-29 — Tooltip V1 blocking Product Owner finding

Product Owner has blocked further page-by-page review until Tooltip V1 positioning,
arrow, motion, fallback, scroll tracking, and layer behavior are corrected and
runtime re-reviewed.

Source review at `404b6393245707a922ca8da69c2cbc0e7a9708dd` confirmed:
- Tooltip arrow is rendered outside `.erp-tooltip__motion`, while Animate.css
  transforms only the motion layer; body and arrow can visually separate during motion.
- shared anchored-overlay geometry currently considers only preferred and opposite
  placements; perpendicular fallback is missing.
- Tooltip tokens currently use 16x8 arrow geometry for top/bottom and 8x4 for
  side placements; Product Owner now requires one canonical arrow size in every direction.
- scroll/resize/visualViewport/ResizeObserver reposition infrastructure exists,
  but acceptance coverage must prove actual trigger tracking and arrow alignment.
- Tooltip consumes the semantic overlay layer token; explicit layer/z-index
  acceptance coverage is required.
- the Design Lab motion selector horizontally overflows/clips, reducing reviewability.

Required correction contract:
1. fixed, untransformed geometry surface owns anchor/collision/layer;
2. one animated visual assembly contains BOTH tooltip body and arrow;
3. authored placement is preferred and is used whenever it fits;
4. fallback order is preferred -> opposite -> perpendicular candidates by room;
5. if none fully fits, select deterministically and clamp to visual viewport;
6. arrow stays attached, points to the trigger, follows resolved placement, and
   uses one canonical base/depth size for all directions;
7. reposition remains correct during scroll/resize and RTL/LTR;
8. no unrelated component redesign.

Tooltip V1 status: BLOCKED. Do not continue to another review page until the
bounded correction is implemented, verified, and Product Owner re-reviews it.


## Tooltip Positioning Contract — implemented 2026-09-29

Product Owner Tooltip law is now implemented and recorded in:
`src/app/controls/tooltip/TOOLTIP_POSITIONING_POLICY_V1.md`.

System defaults:
- Tooltip enter animation: `zoom`;
- Tooltip exit animation: `zoom`;
- explicit per-instance developer overrides remain allowed.

Mandatory Tooltip invariants:
- fixed outer geometry surface is never animation-transformed;
- body + arrow animate together in one visual assembly;
- preferred placement is preserved while it fits;
- fallback order covers opposite and perpendicular physical placements before final clamp;
- arrow uses one canonical geometry across all directions and follows resolved placement/trigger center;
- reposition reacts to viewport/window scroll/resize and anchor/surface resize;
- Tooltip consumes the semantic overlay layer.

Implementation checkpoint:
`7a0a14f090ee38df3ea4adc02255856d89b6c71a`

Do not declare this Tooltip correction Fully Green until a fresh `npm run verify:clean` passes.
Do not proceed to later page review until Product Owner re-reviews Tooltip runtime evidence.

  
## No-Iframe Overlay Governance Alignment — 2026-09-29

The Overlay governance checker must enforce the current single-document Lab
architecture and must never require the superseded iframe architecture.

Tooling correction:
`a40ea25011cd19b8e6db9945ef80f6796a9c6c0c`

The App-shell Overlay gate now requires one direct router-outlet and rejects
iframe-era query/state/rendering/screenshot contracts. A fresh
`npm run verify:clean` is mandatory before the current source is called Fully
Green.


## Verify:clean lint follow-up — 2026-09-29

The post-Tooltip/no-iframe verification reached `ng lint` after all governance checks passed.
One test-only lint violation was found and corrected:

`3eb993e64616362bf920284e37b5005d412fd531`
`fix(test): satisfy array-type lint rule`

The change only converts an `Array<T>` annotation to `T[]` in
`anchored-overlay-controller.spec.ts`. No runtime behavior changed.

A fresh full `npm run verify:clean` is still mandatory before declaring a new Fully Green source checkpoint.


## Fully Green checkpoint after Tooltip correction — 2026-09-29

Canonical Product Owner local verification completed successfully from:

`310b5afe8e6f018bb4d52f68be2986bbe2d31365`

Latest source-affecting commit in that checkout:
`3eb993e64616362bf920284e37b5005d412fd531`.

`npm run verify:clean` passed end-to-end:
- all governance + Angular lint;
- 87/87 test files;
- 615/615 tests;
- app TypeScript no-emit gate;
- spec TypeScript no-emit gate;
- zero-warning production build.

This is the current Fully Green technical checkpoint.

Do not confuse technical green with Product Owner visual approval.
Tooltip V1 remains the active visual-review blocker until Product Owner runtime
re-review accepts the corrected anchored behavior.


## Tooltip cross-axis centering law — 2026-09-29

Product Owner requires exact Tooltip arrow centering on the trigger cross-axis.

Implementation checkpoint:
`632f45a5fb7b42eefa09da0d2c8a20c0f520244b`

Mandatory invariants:
- top/bottom: arrow uses the geometry center as physical `left` and
  `translateX(-50%)`;
- left/right: arrow uses the geometry center as physical `top` and
  `translateY(-50%)`;
- safe inset remains symmetric;
- when the full configured inset cannot fit, reduce it symmetrically instead of
  shifting the arrow away from trigger center.

Do not call this correction Fully Green until a new `npm run verify:clean`
passes. Tooltip remains the Product Owner page-review blocker.


## Tooltip coordinate-origin invariant — 2026-09-29

After moving the arrow inside the animated motion assembly, Tooltip geometry and
visual coordinates must still share one origin.

Mandatory rule:
- `.erp-tooltip__surface` is the fixed geometry coordinate space and must have
  explicit `padding: 0`;
- arrow coordinates calculated against that surface are applied inside the
  motion assembly, so any outer padding would create a systematic cross-axis
  offset.

Source checkpoint:
`84d5fd91daf3fb3085cde422c186dfcf3e1ff8d0`.

Governance and unit tests enforce this invariant.

Latest Fully Green verified checkout before this correction:
`50ae8e5f9f9cc537435217a644548c10bd097ecb`.

Fresh `npm run verify:clean` is required for the new source.


## Inputs Product Owner review state — 2026-09-29

Inputs page has a blocking Product Owner review documented in:
`src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`.

Do not treat current SearchBox showcase evidence as a complete production search
contract. Required future correction includes three search modes, functional
filter/selection, query/selection separation, exact anchored width, explicit
close, non-blocking focus behavior, and correct modal/dropdown semantics.

Selection/temporal Confirm must be disabled until valid staged selection while
Cancel/Close remain enabled.

No Inputs source correction has been implemented by this documentation update.


## Inputs correction implementation state — 2026-09-29

The Product Owner-authorized Inputs correction is implemented at source
checkpoint:

`6daf7af7f023ad758198ce6d5eacbb5f22dd9277`.

Key contracts:
- SearchBox modes are `dropdown | modal | inline`;
- dropdown search owns transient query + selectable stable-value results;
- modal search reuses OverlayManager/SelectionPicker;
- dropdown width follows the complete Field control width;
- Confirm in selection/temporal overlays is disabled and handler-guarded until
  staged state is valid;
- disabled/loading Overlay frame actions cannot dispatch;
- Time/DateTime own Now; DateRange owns previous/next week/month presets;
- MoneyBox per-instance digitSet override falls back to shared Preferences.

Current source is NOT Fully Green until a new full `npm run verify:clean` passes.
Latest prior Fully Green checkout remains
`50ae8e5f9f9cc537435217a644548c10bd097ecb`.


## SearchBox result primitive governance — 2026-09-29

Concrete SearchBox must not render native result buttons directly.

Current required implementation:
- SearchBox result host = `ErpSelectionTile`;
- `presentation="list"`;
- SelectionTile owns native option button, aria-selected, disabled state, and
  focus method;
- SearchBox may own filtering, active index, and result activation, but must not
  reimplement native button roots.

Correction checkpoint:
`cf91967291961037dd7f35d0e825fc4fb2da8312`.

Fresh full `npm run verify:clean` required.


## Inputs staged-action test discipline — 2026-09-29

Tests that perform two separate user interactions across a staged Overlay state
change must run fixture change detection between them before reading/clicking the
updated frame action DOM.

Native keyboard events intended to exercise listeners on a component host must
use browser-equivalent bubbling.

Verification follow-up checkpoint:
`92840de9c670edd32b05c1485f50c2e61e68fead`.

No runtime behavior changed in that commit.


## Direct-route App test isolation — 2026-09-29

Do not aggregate multiple lazy-route full renders into one default-timeout test
when the same contract can be proven independently per route.

Current test-only correction:
`72fa7821030e2ced6ec44f6d8eaf0d2b3b2939d2`.

Assertions are unchanged; timeout limits remain unchanged; production source is
unchanged.


## SearchBox close/top-layer invariant — 2026-09-29

SearchBox dropdown visual closure is not sufficient.

Mandatory close invariant:
- native Popover/top layer must be released immediately when close begins;
- invisible leaving surfaces must be inert + pointer-noninteractive;
- open-stack/dismissal listeners release immediately;
- no delayed timer may restore trigger focus;
- Selection/Close/Escape focus restoration, when requested, occurs immediately;
- outside dismissal does not restore focus;
- close timer may perform bookkeeping only.

Current source:
`4ad7e14c3578d8e0973b1e25f1aa4fc6c4846212`.

Inputs SearchBox review instances use inherited `clearable`.
Fresh full verification is required.


## Native Popover display invariant — 2026-09-29

Never set `display` on the base rule of a native Popover surface.

SearchBox rule:
- forbidden: `.search-box__popup { display:grid; }`
- required:
  `.search-box__popup:popover-open { display:grid; }`

Reason:
closed native Popover visibility depends on browser-owned `display:none`.
Overriding it can create an invisible but hit-testable fixed surface.

Root-cause checkpoint:
`5c0562a58eb7c28a21ced50bbfe8964779ad9cc6`.

Governance enforces both the prohibition and required open-state layout rule.


## Additional Inputs laws — 2026-09-29

- Never erase/revert invalid domain-text drafts merely because validation fails.
- Field-family clearable default is intended to be on; developer may opt out.
- Ghost/Text/Underline require token-owned hover discoverability.
- RangeSlider native thumb and visual fill coordinates must use the same global
  min/max domain; crossing is enforced by logic, not by changing native min/max.
- Active RangeSlider thumb value Tooltip follows the real thumb position.
- Temporal Now must reveal selected time.
- DateRange rolling presets use exact inclusive 7/30-day windows.
- ColorPicker instance mode is fixed: system or free.
- ItemPicker is select-like; ComboBox is editable type-to-filter.


## ERP Input validation substrate — 2026-09-29

Authoritative contract:
`src/app/controls/INPUT_VALIDATION_CONTRACT_V1.md`.

Do not implement independent validation-state/error arrays per concrete control.

Common public semantics:
- state: null / empty / no-selection / invalid-entry / valid-entry;
- valid boolean;
- readonly string errors;
- structured stable-code validation issues.

Validation must use current visible draft where applicable and must not destroy
invalid editable user input.

Constraint configuration stays typed by domain while feeding one common
validation engine.


## Expanded Inputs implementation state — 2026-09-30

The unified validation architecture and the Product Owner's expanded Inputs
correction set are implemented on current main:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Mandatory laws now enforced:
- one validation source of truth for component + Angular Forms;
- exactly one NG_VALIDATORS bridge per CVA ERP input;
- invalid editable drafts are non-destructive;
- clearable defaults on for Field-family controls, opt-out remains authoritative;
- lightweight variants have token-owned hover discoverability;
- RangeSlider thumbs/rail/tooltips share one global thumb-center coordinate system;
- active RangeSlider Tooltip must request reposition as its anchor moves;
- temporal presets are rolling inclusive 7/30-day windows;
- ColorPicker mode is fixed per instance;
- ItemPicker and ComboBox remain distinct interaction contracts.

Do not claim Fully Green until a fresh full `npm run verify:clean` passes.


<!-- CHATGPT_CONTINUITY_SYNC_START -->
## 2026-09-30 — ChatGPT continuity sync

Live GitHub `main` was re-read and externally synchronized from:
`a28a0fffa01ea1035d0dce47910922b30d8f06c0`
(`docs(inputs): record expanded implementation checkpoint`).

Latest bounded Inputs implementation checkpoint under that head:
`c3971739198e61adff98d821a6b8f6775faa4e6c`.

Current continuation state:
- expanded Inputs corrections + unified validation are implemented in source/tests/governance;
- current source is still **verification pending**;
- Inputs remains Product Owner **BLOCKED** until technical verification and runtime/Light/Dark re-review;
- exact next technical gate is a fresh full `npm run verify:clean` from current `main`;
- only demonstrated verification failures may reopen implementation;
- after technical green, Product Owner runtime/Light/Dark Inputs review is the next product gate;
- the no-iframe single-document App shell is already implemented and must not regress.

This synchronization is documentation/state only; it makes no runtime or visual
approval claim.

Continuity rule for subsequent project turns: update the applicable persistent
handoff/review/roadmap documents whenever the turn changes a decision, scope,
implementation state, blocker, verification result, or Product Owner finding.
<!-- CHATGPT_CONTINUITY_SYNC_END -->
