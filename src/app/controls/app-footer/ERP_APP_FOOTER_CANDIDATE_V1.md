# ErpAppFooter original design candidate V1

Date: 2026-10-09

Status: `TECHNICAL_VERIFIED` / `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

## Authority

The Product Owner explicitly authorized an original Honesty ERP application
Footer because a reliable binding Gxon runtime reference is unavailable. No
Gxon dimensions, DOM, motion, screenshots, or behavior are claimed here.

## Ownership and decisions

- `ErpAppFooter` is the single global application-footer presentation owner.
- It is distinct from `ErpPageShell` page-local footer projection and control
  action bars.
- The candidate is in-flow, restrained, theme-inherited, RTL/LTR-aware, and
  responsive through the Foundation Query API.
- Consumers provide application, version, operational-status, and auxiliary
  action data. The component owns no environment, transport, routing, session,
  or application state.
- Optional empty input renders no empty landmark or fabricated value.

## Public contract

Inputs: `applicationLabel`, `versionLabel`, `statusLabel`, `statusTone`,
`actions`, and `ariaLabel`. Output: `actionActivated` with the consumer action
ID. Status uses `ErpStatusBadge`; auxiliary actions use `ErpButton`; visible
copy uses `ErpText`.

## Technical evidence

- Focused component tests: 1 file / 3 tests.
- Browser evidence: `docs/review-evidence/erp-shell/s2-c-app-footer/`.
- Verified viewports: 1440, 1280, 1024, 768, 390 and 320 px.
- Default, dense six-action and fully empty optional-content states are
  measured with zero page overflow, broken images or browser diagnostics.
