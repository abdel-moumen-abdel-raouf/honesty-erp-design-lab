# Visual Review Experience V1.1 — Gallery Coverage Contract

V1.1 supplements a public gallery only when its pre-V1.1 gallery had one
example. Existing multi-case galleries remain authoritative and unchanged.

Supported visual facets are read from the actual public API and generated
showcase-facet metadata, including inherited field inputs. Every supported
facet must either have a bounded gallery case or cause governance to fail.
Values already represented by the default case are not duplicated.

Owner-specific authored scenarios are permitted only for real composition or
content states that cannot be expressed as a scalar input facet. They remain
review-only and do not add production API.

`reviewGalleryCoverage.kind` has three meanings:

- `multi-case`: two or more meaningful cases and no uncovered facet;
- `single-meaningful-state`: one case plus an explicit exception reason;
- `missing-meaningful-states`: invalid for a public catalog entry.

`ErpAppShell` is the sole V1.1 single-state exception. Its gallery points to
the actual root frame and must never create a nested AppShell.

Popup gallery evidence is closed by default. A reviewer may open one authored
surface through its case control. The primary Live Workbench for those routes
also initializes closed, preventing competing menu surfaces while preserving
the full `open` model control.

This contract does not alter production visuals, exact-reference evidence,
the one-primary-target law, Product Owner lifecycle state, or the complete
public API Workbench.
