# ErpStatusBadge V1 internal visual review

## Authority and status

- Product Owner file: `C:\Users\Misrtech\Downloads\ERP-STATUS-BADGE.html`
- SHA-256:
  `654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`
- Contract:
  `src/app/controls/status-badge/ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md`
- Review date: 2026-10-10
- Technical status: `TECHNICAL_VERIFIED`
- Internal visual status: `INTERNAL_VISUAL_REVIEW_COMPLETED`
- Product Owner status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

The source was copied to an isolated non-repository directory, its SHA was
reverified, and only that file was served over loopback HTTP. The capture tool
rendered the source and the Angular implementation in fresh headless Chromium
contexts. Screenshots were then inspected at full-viewport and component scale.

## Reproduction

With the Design Lab at `http://127.0.0.1:4999` and the isolated reference at
`http://127.0.0.1:8767/ERP-STATUS-BADGE.html`:

```text
node tools/review/capture-status-badge-evidence.mjs
```

The capture rejects duplicate/missing primary targets, incomplete 32-badge
tone/variant evidence, missing size evidence, fixed size/anatomy geometry
drift, implementation page overflow, broken images and implementation browser
diagnostics.

## Fixed geometry comparison

Widths differ with label content and the authorized system font family. All
fixed layout values below match the source.

| Size | Height | Inline padding | Text | Gap | Icon | Radius | Fixed delta |
|---|---:|---:|---:|---:|---:|---:|---:|
| `sm` | 18px | 7px | 10px | 4px | 10px | 4px | 0px |
| `md` | 22px | 9px | 11px | 5px | 12px | 6px | 0px |
| `lg` | 26px | 11px | 12px | 6px | 14px | 6px | 0px |
| `xl` | 32px | 14px | 13px | 7px | 16px | 8px | 0px |

All four `md` variants also match at 22px height, 9px inline padding, 1px
border, 11px text, 5px gap and 6px radius. The anatomy comparison records:

| Anatomy | Reference | Final implementation | Delta |
|---|---:|---:|---:|
| Dot | 6px | 6px | 0px |
| Icon | 12px | 12px | 0px |
| Image | 14px | 14px | 0px |
| Count block size | 14px | 14px | 0px |
| Remove action | 12px | 12px | 0px |
| Selected check | 12px | 12px | 0px |

## Confirmed defects corrected

The first computed implementation capture exposed two source-contract drifts:

- the `md` count measured 19px high instead of the reference 14px because it
  was derived from font size rather than badge height;
- the remove action measured 22px instead of the reference 12px because it was
  derived from icon size plus an increment rather than badge height minus 10px.

The Component Tokens and component-owned CSS now derive count, remove and
coarse-pointer geometry from badge height exactly. The final capture tool and
Core governance self-tests reject either regression.

## Runtime matrix

The evidence covers:

- reference 1440 x 900 Light RTL;
- reference 390 x 844 Dark RTL;
- exact Angular evidence 1440 x 900 Light RTL;
- exact Angular evidence 1280 x 900 Dark LTR;
- the single live Workbench target at 390 x 844 Dark RTL;
- the single live Workbench target at 320 x 568 Light LTR.

Implementation cases have one primary target, zero page horizontal overflow,
zero broken images and zero browser diagnostics. The reference's narrow page
reports 204px horizontal overflow from its full demonstration matrix and page
chrome; the individual badge geometry remains unchanged. The desktop reference
also requests an absent favicon, recorded as one source-document 404 and not an
implementation diagnostic.

`runtime-measurements.json` contains every computed box/style value. Each exact
case has full, matrix, size and anatomy screenshots. Live narrow cases keep the
single-target Workbench and interactive public API controls.

## Permitted differences

- Honesty ERP semantic colors replace the reference palette.
- Honesty ERP system fonts replace the reference font family.
- Arabic review content replaces vendor demo copy where the specimen is not an
  API identifier.
- ERP component hierarchy and invisible accessibility semantics remain owned by
  `ErpStatusBadge`, `ErpStatusBadgeAction`, `ErpText` and `ErpIcon`.
- Reduced Motion disables animation without changing visible final state.

No Product Owner visual acceptance is inferred from this evidence.
