# Visual Review Experience V1.1 — Gallery Coverage Evidence

## Scope

This package records the bounded gallery-coverage correction entered from clean
`main` at `6994485d9572d63a3b5c2c1cb81f24584f5f4bcb`. It changes generated
Design Lab review pages and governance only. No production component visual
contract or Product Owner lifecycle status changed.

The V1 baseline had 45 public routes with multiple examples, 35 routes with one
incomplete example, and the intentional root-owned AppShell exception. V1.1
now records:

- 80 public routes with multiple meaningful gallery cases;
- one documented single-state exception: the real root-owned `ErpAppShell`;
- 1,047 bounded gallery cases derived from public facets and authored review
  scenarios, without a Cartesian matrix;
- zero catalog entries with a supported visual facet missing from the gallery.

Field galleries include inherited public size, variant, tone, shape, status,
border, label, appearance, disabled, and readonly evidence where the concrete
API supports those properties. Sidebar, PageHeader, PageShell, Forms, data
composites, and Shell menus receive bounded owner-specific scenarios.

ApplicationsMenu, MessagesMenu, and NotificationBell expose one explicit
on-demand gallery opener. Their primary Live Workbench targets initialize
closed, so opening gallery evidence never creates a permanent competing
surface. Closing the review control removes the surface before the audit moves
to the next scenario.

## Governance

The generated catalog now carries `reviewGalleryCoverage` for every public
owner:

- `multi-case` requires two or more meaningful cases and complete supported
  facet coverage;
- `single-meaningful-state` requires an explicit documented exception;
- `missing-meaningful-states` fails catalog governance.

The catalog checker rejects stale case counts, uncovered supported facets,
undocumented single-state entries, or a claimed multi-case gallery with fewer
than two cases. `ErpAppShell` is the only registered exception because its one
visual target is the actual root frame, not a nested showcase instance.

## Runtime audit

The final browser audit ran in the normal integrated Design Lab document at
`http://127.0.0.1:4999` on 2026-10-10:

- all 81 public routes were loaded at 390×844 Light/RTL;
- all 35 corrected routes were additionally loaded at 1440×900 Light/RTL,
  1440×900 Dark/LTR, 390×844 Light/LTR, and 390×844 Dark/RTL;
- total route/state audit runs: 221;
- exactly one primary `data-showcase-target` per route;
- generated gallery-owner counts matched the catalog for every run;
- exactly one root AppShell, RouterOutlet, and OverlayHost;
- zero horizontal page overflow, broken images, console errors, or console
  warnings;
- Back, Forward, direct refresh, and one-target route state passed;
- three menu surfaces opened one at a time, remained viewport-contained, and
  closed before continuation.

`runtime-audit.json` and `route-audit.json` are the machine-readable evidence.

## Inspected screenshots

| File | Evidence | Viewport / mode |
|---|---|---|
| `components-text-box-1440x900-light-rtl-gallery.png` | inherited field states, tones, validation and sizes | 1440×900 Light/RTL |
| `components-number-box-1440x900-dark-ltr-gallery.png` | numerical field facets and Dark/LTR containment | 1440×900 Dark/LTR |
| `components-applications-menu-1440x900-light-rtl-gallery-open-gallery.png` | single on-demand applications surface | 1440×900 Light/RTL |
| `components-messages-menu-1440x900-dark-ltr-gallery-open-gallery.png` | messages popup, search, avatars, long/empty cases | 1440×900 Dark/LTR |
| `components-notification-bell-390x844-light-ltr-gallery-open-gallery.png` | narrow notifications popup containment | 390×844 Light/LTR |
| `components-combo-box-390x844-dark-rtl-gallery.png` | representative inherited picker/field facets | 390×844 Dark/RTL |
| `components-sidebar-1440x900-dark-rtl-gallery.png` | expanded/collapsed hierarchical Sidebar evidence | 1440×900 Dark/RTL |
| `components-page-header-390x844-dark-ltr-gallery.png` | default, long, and title-only contexts | 390×844 Dark/LTR |
| `components-form-actions-390x844-light-ltr-gallery.png` | primary/secondary and extended actions | 390×844 Light/LTR |
| `components-page-shell-1440x900-light-ltr-gallery.png` | default and dense projected page composition | 1440×900 Light/LTR |
| `components-app-shell-390x844-dark-rtl-top.png` | intentional one-state root AppShell exception | 390×844 Dark/RTL |

The captures were inspected for typography, spacing, clipping, state clarity,
overlay containment, Shell collisions, and responsive flow. The confirmed
review defect was the menus' initially open primary target competing with the
new open gallery case. The generated Workbench defaults now close those three
primary targets without changing their public APIs or production defaults.

## Verification

- focused Showcase tests: 45/45;
- catalog governance self-test and live check: PASS;
- canonical `npm run verify:clean`: 153/153 files and 887/887 tests;
- both TypeScript typechecks: PASS;
- production build: 424.96 kB initial / 93.09 kB estimated transfer;
- warnings: zero;
- dependencies, budgets, timeouts, and retries: unchanged.

## Lifecycle status

Product Owner statuses are unchanged. `ErpCheckBox` remains accepted/frozen;
Select, EmptyState, Tabs, Table, and UserMenu remain reopened; the other 75
public owners remain pending/unknown. This package is technical and internal
visual-review evidence, not Product Owner acceptance.

## Reproduction

```powershell
npm run start
node tools/review/capture-visual-review-experience.mjs --base-url=http://127.0.0.1:4999
npm run verify:clean
```
