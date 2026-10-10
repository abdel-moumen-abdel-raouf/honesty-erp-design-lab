# ErpUserMenu V3 internal visual review

## Authority and status

This evidence closes the repository's internal browser review of the current
three-row `ErpUserMenu` candidate. It does not record Product Owner visual
acceptance.

- Reference URL:
  `https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-media-object.html`
- Reference HTML SHA-256:
  `75F64AE955800ABE9FCBE27D7B09161D95E2DE2C77B6106C337AA4841D39D399`
- Reference stylesheet SHA-256:
  `1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA`
- Reference script SHA-256:
  `4C6FF8886FDC78096852B9405117D7EC3061201E4226D76DF011715819633190`
- Product contract:
  `src/app/controls/user-menu/ERP_USER_MENU_REFERENCE_EXACT_V1.md`
- Review date: 2026-10-10
- Technical status: `TECHNICAL_VERIFIED`
- Internal visual status: `INTERNAL_VISUAL_REVIEW_COMPLETED`
- Product Owner status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

The reference was opened and operated in a real browser. Its popup was
captured in the open RTL state at 1440 x 900. The implementation was captured
through the dedicated one-target Workbench in Light/Dark, RTL/LTR, desktop,
tablet, narrow and constrained-height states.

## Reproduction

With the Design Lab running at `http://127.0.0.1:4999` and a Chromium CDP
endpoint available at port 9223:

```text
$env:HONESTY_USER_MENU_EVIDENCE_DIR='docs/review-evidence/erp-user-menu/v3-internal-review'
node tools/review/capture-user-menu-compact-trigger.mjs
node tools/review/capture-user-menu-reference-evidence.mjs
```

The implementation capture rejects duplicate primary targets, incorrect open
state, more than three closed-trigger rows, visible trigger secondary text,
wrong trigger badge defaults, wrong Avatar logical side, row or badge clipping,
page/popup overflow, broken images, browser diagnostics, a second popup scroll
owner, identity movement while the actions scroll, or incorrect RTL email-row
alignment.

## Direct reference measurements

`reference-measurements.json` records the live reference at 1440 x 900 RTL.

| Property | Reference computed value |
|---|---:|
| Closed trigger height | 40 px |
| Closed trigger Avatar | 40 x 40 px |
| Popup width | 360 px |
| Popup padding | 8 px |
| Popup radius | 10 px |
| Popup height in captured content | 462 px |
| Identity Avatar | 60 x 60 px |
| Identity row | 344 x 76 px |
| Action row | 344 x 56 px |
| Action rows | 6 |
| Page horizontal overflow | 0 px |

The captured reference uses a two-line closed trigger and a two-line identity
header. The later Product Owner correction explicitly supersedes that trigger
content with the richer Honesty ERP three-row trigger described below; this is
an authorized content/anatomy refinement rather than an inferred vendor value.

## Implementation comparison

| Property | Reference | Implementation | Decision |
|---|---:|---:|---|
| Popup width | 360 px | 360 px desktop | source-aligned |
| Popup padding | 8 px | 8 px | source-aligned |
| Popup radius | 10 px | 10 px | source-aligned |
| Identity Avatar | 60 px | 60 px | source-aligned |
| Action row block size | 56 px | 56 px | source-aligned |
| Closed trigger Avatar | 40 px | 60 px | Product Owner three-row refinement |
| Closed trigger height | 40 px | 72 px | content-driven Product Owner refinement |
| Closed trigger rows | 2 | 3 | name / email / role + branch |
| Colors | vendor palette | Honesty ERP semantic palette | authorized exception |
| Font family | Roboto | Honesty ERP system fonts | authorized exception |

The default 1440 x 900 trigger measures 360 x 72 px. It uses 6 px block and
10 px inline padding, a 10 px Avatar/copy gap, a 60 x 60 px Avatar, a 60 px
identity stack and a 0 px Avatar-center delta. Its rows measure 22/18/18 px
with 1 px gaps. Exactly three rows are visible: name, email, and the two
`ErpStatusBadge` owners. `secondaryText` is absent from the trigger and remains
independent in the open identity card.

The popup surface consumes the semantic foreground explicitly. In the Dark
LTR capture its surface is `rgb(39, 42, 50)`, while the name foreground is
`rgb(248, 249, 251)` and email foreground is `rgb(201, 206, 216)`.

## Runtime matrix and inspected captures

`corrected-measurements.json` and the `corrected-*.png` files cover 22 states:

- Light RTL default closed/open at 1440 x 900 and open at 1280 x 900;
- Dark RTL and Dark LTR default closed/open at 1440 x 900;
- mixed-direction open at 1024 x 900;
- image, initials, mixed-direction and long-Arabic identities at 768 x 900;
- Dark RTL default closed/open, role-only, branch-only, both, neither and icon
  fallback at 390 x 844;
- long-English closed/open and missing optional data at 320 x 568.

The captures were inspected at readable crop scale and full viewport scale.
They show the expected logical-start Avatar in both directions, readable Dark
foregrounds, one popup surface, one action-list scroll owner, fixed identity,
zero page overflow, zero broken images and zero browser diagnostics. Wide open
cases retain a 0 px measured arrow-center delta.

The reference captures are:

- `reference-skodash-1440-light-rtl-open-full.png`
- `reference-skodash-1440-light-rtl-open-crop.png`

Each implementation state has a reproducible `*-full.png` plus a readable
`*-crop.png` counterpart.

## Constrained-height limitation

The 320 x 568 long-English open case deliberately keeps the Workbench target
centered. It leaves 20.03 px of visible action-list height while the identity
card remains fully visible. The action list has 353 px of scroll content,
accepts a 96 px scroll offset, and scrolling it moves the identity header by
0 px. The surface itself remains `overflow-y: visible`, stays inside the
viewport and does not overlap its trigger.

This proves the action-list-only scrolling contract but is a constrained
review-surface limitation: a single action row is not fully visible at that
synthetic centered anchor. The actual integrated Shell places the trigger near
the header and is covered by the separate Shell evidence. No production
geometry was changed merely to improve the review-only screenshot. Final
judgment of this constrained presentation remains with the Product Owner.
