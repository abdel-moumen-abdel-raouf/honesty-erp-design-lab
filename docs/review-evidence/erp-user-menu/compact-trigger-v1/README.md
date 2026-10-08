# ErpUserMenu compact-trigger evidence

## Scope

This directory records the 2026-10-08 Product Owner correction of the closed
`ErpUserMenu` trigger only. It does not approve the visual result and does not
open Shell S2. The 116-image Avatar library is unchanged.

## Reproduction

With the Design Lab running at `http://localhost:4999` and a Chromium CDP
endpoint at port 9223:

```text
node tools/review/capture-user-menu-compact-trigger.mjs --baseline
node tools/review/capture-user-menu-compact-trigger.mjs
```

The corrected run is also an acceptance gate. It fails for more than one live
target, an incorrect open state, more than three trigger identity rows, block
clipping in any row, page or popup overflow, a broken image, Avatar center
misalignment, incorrect trigger/popup badge counts, or browser diagnostics.

## Before and after

| Case | Baseline capsule | Corrected capsule | Rows | Trigger badges | Popup badges |
|---|---:|---:|---:|---:|---:|
| Light RTL, 1440 x 900 | 360 x 104 px | 360 x 72 px | 4 -> 3 | 2 -> 0 | 2 |
| Dark RTL, 390 x 844 | 309 x 104 px | 309 x 72 px | 4 -> 3 | 2 -> 0 | 2 |
| Long English LTR, 320 x 568 | 239 x 125 px | 239 x 71 px | 4 -> 3 | 2 -> 0 | 2 |

The corrected full identity measures 60 px at desktop/390 and 59 px in the
320 px English case. The rendered rows are respectively 22/18/18 px (or
21/18/18 px at 320); each row's client and scroll block dimensions match.
Padding is 6 px block / 10 px inline, the Avatar is 40 x 40 px, its center
delta is 0 px, and page horizontal overflow is 0 px in every state.

## Coverage

The corrected matrix contains full-viewport and cropped PNGs plus
`corrected-measurements.json` for:

- Light RTL closed/open at 1440 x 900;
- Dark RTL and Dark LTR closed/open at 1440 x 900;
- image, initials, mixed-direction open, and long Arabic identities at
  768 x 900;
- Dark RTL closed/open, explicit role, explicit branch, both trigger badges,
  and icon fallback at 390 x 844;
- long English closed/open and missing optional metadata at 320 x 568.

Default trigger states contain no role/branch badge while their popup identity
cards contain both. Explicit role-only, branch-only, and both-badge trigger
states remain within the third metadata row. All open cases have zero popup
edge overflow, and all captures have zero broken images and browser diagnostics.
The four wide open states record a 0 px arrow-center delta; the established
narrow rule hides the arrow at 390 and 320 px.

`baseline-measurements.json` and files prefixed `baseline-` record the rejected
candidate before this correction. Files prefixed `corrected-` record the
current implementation.
