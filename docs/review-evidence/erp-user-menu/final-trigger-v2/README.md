# ErpUserMenu final trigger correction evidence

## Scope and status

This directory records the 2026-10-09 Product Owner correction of the closed
`ErpUserMenu` trigger entered from clean `main`
`76a0893f8c647363833ac32a58685450507055c8`. It changes no other Shell owner,
does not reopen S2, and does not record Product Owner visual acceptance.

## Reproduction

With the Design Lab available at `http://localhost:4999` and Chromium CDP at
port 9223:

```text
node tools/review/capture-user-menu-compact-trigger.mjs --baseline
node tools/review/capture-user-menu-compact-trigger.mjs
```

The corrected run rejects more than one primary target, an incorrect open
state, more than three trigger rows, block clipping, the wrong logical Avatar
side, Avatar center drift, trigger secondary text, incorrect badge counts,
popup/page overflow, broken images, browser diagnostics, or incorrect RTL
email-row alignment.

## Before and after

| Case | Rejected capsule | Corrected capsule | Avatar | Identity stack | Closed trigger rows |
|---|---:|---:|---:|---:|---|
| Light RTL, 1440 x 900 | 360 x 72 px | 360 x 72 px | 40 -> 60 px | 60 px | name / email / role + branch |
| Dark RTL, 390 x 844 | 309 x 72 px | 309 x 72 px | 40 -> 60 px | 60 px | name / email / role + branch |
| Long English LTR, 320 x 568 | 239 x 71 px | 239 x 72 px | 40 -> 60 px | 59 px | name / email / role + branch |

The capsule remains content-driven: 6 px block and 10 px inline padding, a
10 px Avatar/copy gap, and 1 px row gaps. The three rows measure 22/18/18 px
at desktop and 21/18/18 px in the 320 px English case. The Avatar equals the
60 px full identity stack, has a 0 px center delta, is on logical start in both
directions, and does not change the established popup geometry.

The rejected baseline rendered legacy `secondaryText` (`الحساب المؤسسي`) in
the third closed-trigger row and hid both trigger badges by default. The
corrected default renders two `ErpStatusBadge` owners in that row and no
secondary text. `secondaryText` remains visible independently inside the open
identity card.

## Runtime matrix

`corrected-measurements.json` and the `corrected-*.png` files cover:

- Light RTL closed/open at 1440 x 900;
- Dark RTL and Dark LTR closed/open at 1440 x 900;
- image, initials, long Arabic, and mixed-direction identities at 768 x 900;
- Dark RTL closed/open, role-only, branch-only, both, neither, and icon fallback
  at 390 x 844;
- long English closed/open and missing optional identity data at 320 x 568.

All 20 corrected conditions have one primary target, zero ordinary secondary
text in the closed trigger, zero vertical row/badge clipping, zero horizontal
page overflow, zero broken images, and zero browser diagnostics. Every open
surface is viewport-contained. Wide open cases retain 0 px arrow-center delta;
the established narrow arrow-hiding rule is unchanged.

The email row inherits the component direction and aligns at logical start.
Only the address text uses the existing `ErpText` BDI/LTR presentation, so the
Latin address remains readable without turning the whole row into an LTR
layout region.
