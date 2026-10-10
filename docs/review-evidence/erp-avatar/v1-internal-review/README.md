# ErpAvatar V1 internal visual review

## Authority and status

- Product Owner file: `C:\Users\Misrtech\Downloads\ERP-AVATAR.html`
- SHA-256:
  `2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`
- Contract: `src/app/controls/avatar/ERP_AVATAR_REFERENCE_EXACT_V1.md`
- Review date: 2026-10-10
- Technical status: `TECHNICAL_VERIFIED`
- Internal visual status: `INTERNAL_VISUAL_REVIEW_COMPLETED`
- Product Owner status: `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`

The binding file was rendered directly in a fresh headless Chromium context.
The same browser session rendered the dedicated Angular Workbench and its
on-demand exact-reference experience. Full-viewport and component-level
captures were inspected for matrix geometry, content ownership, physical
presence positions, Light/Dark, RTL/LTR, and narrow behavior.

## Reproduction

With the Design Lab at `http://127.0.0.1:4999`:

```text
node tools/review/capture-avatar-evidence.mjs
```

The capture opens the hash-verified local reference file, rejects fixed size
drift beyond 0.5px, incomplete 18-item shape/size evidence, duplicate or
missing primary Workbench targets, implementation overflow, broken images and
browser diagnostics.

## Exact fixed geometry

| Size | Desktop reference | Desktop implementation | Delta | Narrow implementation |
|---|---:|---:|---:|---:|
| `xs` | 24px | 24px | 0px | 24px |
| `sm` | 30px | 30px | 0px | 30px |
| `md` | 38px | 38px | 0px | 38px |
| `lg` | 50px | 50px | 0px | 50px |
| `xl` | 68px | 68px | 0px | 58px |
| `2xl` | 88px | 88px | 0px | 72px |

All three shapes are present at all six binding-reference sizes: 18 rendered
matrix items in the source and 18 in each exact implementation case. The
rounded shape preserves the reference 26% radius and square preserves 4px.
The existing 3xl/4xl/5xl extension remains a documented AvatarPicker
compatibility capability rather than an alteration of the six-size reference.

The implementation also preserves the exact content hierarchy and ownership:
image, initials, semantic icon, loading, eight tones, ring, interaction,
presence statuses and presence motion all render through `ErpAvatar`,
`ErpText`, `ErpIcon` and Avatar-owned internal semantics.

## Runtime matrix and visual inspection

Evidence covers:

- reference 1440 x 900 Light RTL;
- reference 390 x 844 Dark RTL;
- exact Angular evidence 1440 x 900 Light RTL;
- exact Angular evidence 1280 x 900 Dark LTR;
- exact Angular evidence 390 x 844 Dark RTL;
- the single live Workbench target at 320 x 568 Light LTR.

Every implementation case has exactly one primary target, zero horizontal
page overflow, zero broken images and zero browser diagnostics. Content,
presence and physical-position crops accompany the full captures.

The standalone reference document itself reports 193px of horizontal page
overflow at 390px because its fixed demonstration matrix and page chrome do
not collapse to the viewport. The ERP implementation retains the component
geometry while its review page remains contained; vendor demo-page overflow
is not treated as a production contract.

The capture and visual inspection found no production Avatar geometry defect,
so no production component or public API was changed in this unit.
`runtime-measurements.json` is the machine-readable record for all measured
boxes, styles, diagnostics and assertions.

## Permitted differences

- Honesty ERP semantic colors replace the reference palette.
- Honesty ERP system font families replace the reference family.
- Arabic review copy replaces vendor demonstration text.
- Invisible accessibility semantics and the ERP component hierarchy remain.
- Reduced Motion disables animation while preserving visible final state.
- The later Product Owner-authorized 3xl/4xl/5xl sizes remain compatibility
  extensions outside the binding six-size matrix.

No Product Owner visual acceptance is inferred from this evidence.
