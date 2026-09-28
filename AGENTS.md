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
