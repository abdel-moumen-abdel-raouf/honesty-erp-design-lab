# Inputs Product Owner Review Findings V1

## Status

Product Owner review of `/controls/inputs` is BLOCKED. The page must not be
passed until the findings below are corrected and re-reviewed.

This document distinguishes current source behavior from new Product Owner
requirements.

## SearchBox — confirmed current-source gaps

Current source:
- `popupMode` is boolean only. The control supports anchored popup vs inline;
  it does not expose the previously agreed three-state focus behavior
  (modal search, dropdown search, plain inline input).
- popup opening is activation/ArrowDown/Enter driven; focus itself does not choose
  one of the three agreed behaviors.
- dropdown results are projected static `[search-results]` content. The SearchBox
  owns no selectable-result contract, no result activation, and no filtering
  contract.
- popup input writes directly into the committed SearchBox value. Query text and
  selected/committed result identity are not separated.
- showcase results are plain `ErpText` nodes, so they cannot be selected.
- dropdown width intentionally uses max(trigger width, popup minimum width), so
  it is not contractually equal to field width.
- there is no explicit close button in the anchored dropdown.
- outside/Escape dismissal exists.
- because the manual Popover is top-layer content, any lower field geometrically
  covered by the open popup cannot receive the pointer. The current outside
  dismissal tests target containment, so a pointer landing inside the popup
  rectangle is not considered an outside click.

Product Owner required SearchBox contract:
1. On focus, developer-selectable mode:
   - modal search;
   - anchored dropdown search;
   - plain text input with no popup.
2. Dropdown mode must be genuinely functional:
   - query filters results;
   - results are selectable by pointer and keyboard;
   - selection commits the result;
   - transient query and committed selection/value are separate concepts.
3. Dropdown inline size must equal the field inline size, subject only to
   unavoidable viewport clamping on very narrow viewports.
4. Anchored dropdown must include an explicit close action. Escape and outside
   dismissal may remain additional paths.
5. Closing/dismissing the popup must not leave an invisible/top-layer hit target
   that prevents subsequent focus on other fields.
6. Modal mode uses dialog semantics; dropdown mode must use appropriate
   combobox/listbox semantics rather than treating every popup as a dialog.

## MoneyBox

Product Owner requires a second MoneyBox review instance that renders money
using Arabic-Indic digits rather than Latin digits.

Current core already supports Arabic-Indic committed display through the shared
Preferences money-digit context, but digit policy is context-owned rather than a
per-instance public input. Two simultaneous review instances with different digit
systems therefore require either:
- an approved per-instance override that falls back to Preferences, or
- an approved scoped preference context.

Do not duplicate formatting logic in the showcase.

## Temporal picker quick actions

Product Owner requirements:
- Time picker: add `الآن`.
- DateTime picker: add `الآن` in addition to existing Today/Clear behavior.
- DateRange picker: add:
  - previous week;
  - next week;
  - previous month;
  - next month.

Current temporal action contract only defines previous/next month navigation,
Today, Clear, Cancel, Confirm, Hour, Minute. It has no Now or range preset actions.

Implementation must resolve preset semantics deterministically before coding
(calendar period vs rolling period, and minute-step handling for Now).

## Confirm-action enablement

Product Owner rule for all selection/picker overlays:
- Confirm is disabled while there is no valid staged selection.
- Cancel and header Close remain enabled.
- DateRange requires a complete valid range, not one endpoint.
- DateTime requires both a valid date and valid time.
- Time requires a valid hour/minute value.
- Selection-family pickers require a non-null valid staged selection.

Current code updates Clear-state but does not dynamically disable Confirm from
the staged selection state in either temporal or selection picker content.

## Additional review findings

### A. SearchBox accessibility/semantics are under-specified

The anchored SearchBox popup is always authored as `role="dialog"` /
`aria-haspopup="dialog"`, while the intended dropdown mode is result selection.
The three-mode contract must give modal and dropdown distinct semantics and
keyboard behavior.

### B. Inputs Design-Lab layout wastes approximately half of the review width

Many review sections use `<erp-grid [columns]="2">` but contain only one
`erp-surface`. In the supplied full-page screenshots this leaves a large empty
column and compresses review evidence into the other half. This is a page-level
review-layout defect, not a production input-control defect.

### C. Temporal empty-state copy is still hard-coded in English

Current Date/Time/DateTime/DateRange display fallbacks include strings such as
`Select date`, `Select time`, `Select date and time`, and
`Select date range` while the review/application context is Arabic. These
fallbacks need localization/system-label ownership rather than hard-coded
English.

## Execution boundary

No source correction is implemented by this document.

Before implementation:
- preserve shared overlay/foundation contracts;
- do not solve SearchBox by creating a second unrelated overlay engine;
- do not duplicate money formatting;
- keep Cancel/Close semantics independent from Confirm selection validity;
- add deterministic tests for all new behavior.

Inputs page status: BLOCKED pending Product Owner-authorized correction.
