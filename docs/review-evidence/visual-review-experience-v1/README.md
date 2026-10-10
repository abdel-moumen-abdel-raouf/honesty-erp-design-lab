# Visual Review Experience V1 — Evidence Index

## Purpose

This evidence package records the review-only reconstruction that makes the
real supported gallery, reference comparison, live target, API controls, and
event evidence available on every public component route. It does not change a
production component visual contract and it does not record Product Owner
visual acceptance.

Entry checkpoint: `8baad49296e625d5c621df63b2f2f338fe4a5f5f`.

## Runtime audit

The final browser audit ran against the normal integrated Design Lab document
at `http://127.0.0.1:4999` on 2026-10-10. `runtime-audit.json` and
`route-audit.json` record:

- 81/81 public routes loaded;
- exactly one primary `data-showcase-target` per route;
- a visible Gallery and Reference Comparison on every route;
- Advanced API Controls present and initially collapsed;
- exactly one root `erp-app-shell`, `router-outlet`, and `erp-overlay-host`;
- direct navigation across all public routes plus a recorded Button → Table →
  Back → Forward → Refresh sequence that retains the expected route and one
  primary target;
- zero page horizontal overflow, broken images, console errors, or console
  warnings;
- thirteen persisted desktop/tablet/narrow Light/Dark RTL/LTR review captures.

Canonical verification passes 153/153 test files and 886/886 tests, both
TypeScript typechecks, all lint/governance, and the zero-warning 424.96 kB /
93.08 kB estimated-transfer production build.

Gallery component instances are secondary evidence only. They never carry the
primary-target marker and retain their own initial values when the live
Workbench is edited. `/components/app-shell` remains the special root-owned
Workbench and creates no nested AppShell.

## Canonical captures

| File | Route/state | Viewport | Theme/direction |
|---|---|---:|---|
| `components-1440x900-light-rtl-top.png` | Catalog filters and component navigation | 1440×900 | Light / RTL |
| `components-button-1440x900-light-rtl-gallery.png` | Real Button default, variants, and sizes | 1440×900 | Light / RTL |
| `components-status-badge-1440x900-light-rtl-comparison.png` | Exact StatusBadge comparison | 1440×900 | Light / RTL |
| `components-tabs-1440x900-dark-ltr-comparison.png` | Exact Tabs comparison | 1440×900 | Dark / LTR |
| `components-table-1440x900-light-rtl-comparison.png` | Complete Table reference/implementation comparison | 1440×900 | Light / RTL |
| `components-app-shell-1440x900-dark-ltr-top.png` | Root-owned AppShell review context | 1440×900 | Dark / LTR |
| `components-button-1280x800-light-ltr-gallery.png` | Intermediate desktop Button gallery | 1280×800 | Light / LTR |
| `components-table-1024x768-dark-ltr-comparison.png` | Intermediate Table comparison | 1024×768 | Dark / LTR |
| `components-app-shell-768x900-light-rtl-top.png` | Tablet root-owned AppShell | 768×900 | Light / RTL |
| `components-button-390x844-dark-rtl-gallery.png` | Narrow Button gallery | 390×844 | Dark / RTL |
| `components-table-390x844-dark-rtl-gallery.png` | Narrow real Table gallery with contained horizontal scroll | 390×844 | Dark / RTL |
| `components-app-shell-390x844-dark-ltr-top.png` | Root-owned AppShell, narrow | 390×844 | Dark / LTR |
| `components-app-shell-320x568-light-rtl-top.png` | Root-owned AppShell, constrained height | 320×568 | Light / RTL |

The additional PNG files without the final `x900`/state suffix are earlier
captures from the same bounded task and are retained as before/after evidence.

## Reference provenance

- Exact local authority is retained whenever a component catalog entry has a
  Product Owner exact-reference contract. Existing legitimate reference and
  implementation crops are shown side by side when available.
- Existing Skodash/reference captures already committed in the repository are
  reused without shipping vendor scripts, CSS engines, icons, or iframes.
- A source link and an explicit “reference image unavailable” state are shown
  when no legitimate embedded capture exists.
- Components without a binding external authority are explicitly labeled
  “Original Honesty ERP design”; no substitute reference image is fabricated.
- Direct retrieval of the live Skodash pages was unavailable during this run,
  so this task did not claim newly source-verified vendor measurements.

The six exact-core on-demand experiences remain intact. Table continues to use
its complete multi-owner experience rather than an isolated table specimen.

## Findings corrected during visual QA

1. Generated gallery instances initially shared mutable live Workbench values;
   gallery scenarios now use stable initial values and a regression test proves
   live editing does not mutate secondary evidence.
2. Null generated model defaults caused Messages/Notifications review pages to
   fail during rendering; generated fixtures now use their declared model
   defaults.
3. Review evidence images initially resolved only in production output; a
   deterministic 29-file public mirror and SHA-256 consistency check now make
   them available in development and production.
4. The narrow Table gallery host collapsed to two pixels while the native table
   overflowed; the shared review grid now gives each scene a real single-column
   containing block. The final 390 px capture shows actual rows and a contained
   table scrollbar without page overflow.
5. Capture writes initially triggered the development asset watcher while the
   audit was still running; captures now stage outside the watched tree and are
   copied only after runtime inspection completes.
6. Narrow comparison images initially triggered Angular's oversized-image
   diagnostic, and the desktop AppShell comparison then exposed a lazy-LCP
   warning. The review-only image owner now preserves a scrollable minimum
   inspection width on narrow screens and eagerly loads evidence only after its
   lazy component route is opened. The repeated 81-route/thirteen-capture audit
   records zero console findings.

## Lifecycle state

- `ErpCheckBox`: Product Owner accepted/frozen.
- `ErpSelect`, `ErpEmptyState`, `ErpTabs`, `ErpTable`, `ErpUserMenu`: reopened.
- Remaining 75 public owners: pending/unknown Product Owner visual review.

The delivered states are `TECHNICAL_VERIFIED` and
`INTERNAL_VISUAL_REVIEW_COMPLETED`; all unaccepted owners remain
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Reproduction

```powershell
npm run start
```

Open `http://localhost:4999/components`. On a component page, Gallery and
Reference Comparison appear before Live Preview. Expand “Advanced API
Controls” for the full interactive input/model/CVA controls and use Event
Evidence for outputs.

To repeat the evidence audit against the running application:

```powershell
node tools/review/capture-visual-review-experience.mjs --base-url=http://127.0.0.1:4999
npm run review-evidence:check
```
