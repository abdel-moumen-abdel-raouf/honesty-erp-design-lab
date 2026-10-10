# ErpAvatarPicker V1 internal visual review

Status: `TECHNICAL_VERIFIED` / `INTERNAL_VISUAL_REVIEW_COMPLETED` /
`PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

## Authority and reproduction

- Binding file: `C:\Users\Misrtech\Downloads\ERP-AVATAR-PICKER.html`
- SHA-256: `24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66`
- Review date: `2026-10-10`
- ERP route: `/components/avatar-picker`
- Capture: `node tools/review/capture-avatar-picker-evidence.mjs`
- Measurements: `runtime-measurements.json`

The script requires the Design Lab on `http://127.0.0.1:4999` and a Chrome
debug endpoint on `http://127.0.0.1:9222`. It opens the local reference file
directly in Chrome and compares it with the dedicated Angular workbench.

## Evidence index

| State | Reference | Implementation |
|---|---|---|
| 1440 x 900, Light, RTL, default | `reference-1440-light-rtl-default-full.png` / `-picker.png` | `implementation-1440-light-rtl-default-full.png` / `-picker.png` |
| 1280 x 900, Dark, LTR, selected | `reference-1280-dark-ltr-selected-full.png` / `-picker.png` | `implementation-1280-dark-ltr-selected-full.png` / `-picker.png` |
| 390 x 844, Dark, RTL, selected | `reference-390-dark-rtl-selected-full.png` / `-picker.png` | `implementation-390-dark-rtl-selected-full.png` / `-picker.png` |
| 320 x 568, Light, LTR, empty search | n/a | `implementation-320-light-ltr-empty-full.png` / `-picker.png` |

All implementation captures have one primary target, one on-demand exact
reference control, zero page overflow, zero broken images and zero captured
browser diagnostics.

## Geometry comparison

| Property | Reference | Implementation | Delta |
|---|---:|---:|---:|
| Surface width | 520px | 520px | 0px |
| Surface border/radius | 1px / 16px | 1px / 16px | 0px |
| Tabs track height | 44px | 44px | 0px |
| Tab height | 34px | 34px | 0px |
| Grid gap/max client height | 12px / 440px | 12px / 440px | 0px |
| Tile border/radius | 2px / 12px | 2px / 12px | 0px |
| Selected preview | 44px | 44px | 0px |
| Footer block padding | source contract 12px | 12px | 0px |

The runtime checker passes 34/34 assertions. The implementation displays the
later Product Owner-authorized canonical catalog of 60 male and 56 female PNGs;
the source specimen displays 30 + 30 generated avatars. This asset-content and
count difference does not alter the binding Picker geometry or behavior.

## Findings and corrections

- Removed a reproduced duplicate visual track around the composed `ErpTabs`.
- Added a bounded `avatar-picker` Tabs presentation so `ErpTabs` remains the
  only tab-semantic owner while reproducing the 44px track, 34px trigger,
  raised active state and plain micro-count anatomy.
- Restored the reference default `rounded` Avatar shape.
- Added an Avatar-owned 44px preview presentation; Picker still renders every
  image and fallback through `ErpAvatar`.
- Restored the source-contract 12px footer block padding.
- Kept the complete 116-image catalog, keyboard selection, draft/confirm/cancel,
  disabled state and lazy image ownership intact.

## Source limitations

The live reference declares `--picker-pad` but several active rules read the
undefined `--erp-pad`. Its embedded source-contract block uses
`var(--picker-pad)` and explicitly declares the 12px footer block padding.
The implementation follows that intact source contract instead of reproducing
the demonstrator typo. The vendor page also creates 140px horizontal overflow
at 390px; the implementation deliberately keeps application overflow at zero.
System colors, font families, accessibility markup and reduced-motion behavior
remain the authorized differences. Product Owner visual acceptance is not
recorded by this review.
