# ErpSidebar S2-A runtime evidence

This directory contains reproducible full-viewport evidence for the technically
verified S2-A Sidebar candidate. It is not Product Owner visual acceptance.

## Reproduction

1. Run the Design Lab at `http://127.0.0.1:4200`.
2. Run `node tools/review/capture-erp-shell-evidence.mjs` from the repository
   root with Google Chrome installed at the default path. Override the browser
   with `CHROME_PATH` or the server with `SHELL_EVIDENCE_URL` when required.
3. Inspect `runtime-measurements.json` together with the PNG files.

The matrix covers 1440, 1280, 1024, 768, 390, and 320 px widths; Light/Dark,
RTL/LTR, and expanded/collapsed states. Measurements include Sidebar/nav boxes,
page horizontal overflow, the single nav scroll owner, active destination and
ancestor counts, enabled interactive entries, and browser warnings/errors.

## Authority

The verified reference measurements and adopt/adapt/reject decisions are in
`src/app/controls/SHELL_REFERENCE_TOPOLOGY_V2.md`. The implementation contract
is `src/app/controls/sidebar/ERP_SIDEBAR_REFERENCE_V1.md`.
