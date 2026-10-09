# ErpGlobalSearch Reference Contract V1

## Authority

- Reference family: Skodash RTL tabular-menu header search.
- Source page: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/index.html`.
- Evidence captured: 2026-10-09.
- Honesty ERP keeps system colors and typography and does not ship the vendor
  Bootstrap, jQuery, PerfectScrollbar, icon, or search runtime.

## Verified reference evidence

- Desktop header search occupies a bounded central region (the vendor rule is
  30% of the header width).
- The visible search affordance uses a semantic search icon, restrained field
  surface, one-line placeholder, and an expanded results interaction.
- The reference exposes its expanded search treatment at a source breakpoint
  of `max-width: 1199px`; Honesty ERP expresses responsive behavior only through
  the Foundation Query API.
- At `max-width: 767px`, the vendor search surface becomes viewport-contained
  and its decorative arrow is removed.

## ERP ownership

- `ErpGlobalSearch` adapts application results and emits result intent.
- `ErpSearchBox` remains the sole search input, popup, filtering, keyboard,
  clear, focus, and CVA owner.
- The visible label is accessibility-only in Shell composition so it does not
  add a second text row to the Topbar.
- Consumers own search transport, permissions, routing, and result data.

## Current status

- Technical verification: verified by the 126-file / 804-test canonical gate.
- Internal visual review: complete with the real SearchBox popup in the
  integrated Topbar/AppShell evidence.
- Product Owner visual review: pending; this contract is not acceptance.
