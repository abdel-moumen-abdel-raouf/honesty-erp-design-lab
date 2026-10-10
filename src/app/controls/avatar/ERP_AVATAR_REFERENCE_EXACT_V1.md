# ERP Avatar Exact Reference Contract V1

## Binding authority

- Product Owner source filename: `ERP-AVATAR.html`.
- Source path used for provenance only: `C:\Users\Misrtech\Downloads\ERP-AVATAR.html`.
- SHA-256: `2F62F11BB1C8716F08C4BD5FF202ADCAE4360142FC8B131089D1E5F59AB53ECA`.
- Inspected completely: 2026-10-07.
- Product Owner instruction: exact visual and behavioral rebuild. Only the raw
  palette and font-family declarations are replaced by Honesty ERP Semantic,
  Typography, and Avatar Component Tokens.

`ERP-AVATAR.html` supersedes every earlier `ErpAvatar` visual reference,
waiver, interpretation, and correction. The source path is documentation only;
production code has no runtime dependency on Downloads.

## Reference feature inventory

The base Avatar reference owns:

- image, explicit initials, semantic icon, derived initials, and default-icon
  content;
- six exact-reference sizes: `xs | sm | md | lg | xl | 2xl`;
- Product Owner large-size compatibility extension: `3xl | 4xl | 5xl`,
  derived from the anchored `2xl` proportions without changing the six
  reference sizes;
- three shapes: `circle | rounded | square`;
- eight tones: `neutral | brand | success | warning | danger | info | purple |
  slate`;
- optional ring, loading surface, and opt-in interactive action;
- eight presence statuses: `online | away | busy | offline | info | brand |
  pending | vacation`;
- eight physical positions retained by the Product Owner:
  `top | bottom | left | right | top-left | top-right | bottom-left |
  bottom-right`;
- five reference presence motions: `none | pulse | ping | bounce | blink`;
- image cover-fit, bounded focus-visible treatment, hover scale, active scale,
  narrow large-size reduction, increased-contrast borders, and reduced-motion
  static visibility.

Compatibility-only opt-ins retained from the preceding public contract are
`presenceMotion="breathe"`, `hoverMotion="none | scale | lift"`, and
`cursor="default | pointer"`. Their defaults do not alter the reference default
appearance.

## Exact geometry

| Size | Frame | Initials | Icon | Presence | Presence border | Ring width | Ring offset |
|---|---:|---:|---:|---:|---:|---:|---:|
| `xs` | 24px | 10px | 13px | 7px | 2px | 2px | 1px |
| `sm` | 30px | 11px | 15px | 8px | 2px | 2px | 2px |
| `md` | 38px | 13px | 19px | 10px | 2px | 2px | 2px |
| `lg` | 50px | 16px | 26px | 13px | 3px | 2px | 3px |
| `xl` | 68px | 22px | 36px | 17px | 3px | 3px | 3px |
| `2xl` | 88px | 28px | 46px | 22px | 4px | 3px | 4px |
| `3xl` | 112px | 36px | 58px | 28px | 4px | 4px | 4px |
| `4xl` | 144px | 46px | 75px | 36px | 5px | 4px | 5px |
| `5xl` | 184px | 59px | 96px | 46px | 6px | 5px | 6px |

- Circle radius: `50%`.
- Rounded radius: `26%`.
- Square radius: `4px`.
- Frame border: `1px` by default.
- Interactive hover scale: `1.06`.
- Interactive active scale: `0.96`.
- Focus-visible ring: `3px`.
- Large narrow sizes: `xl` becomes 58px, `2xl` becomes 72px, `3xl` becomes
  88px, `4xl` becomes 112px, and `5xl` becomes 144px. The extension follows a
  deterministic one-step-down large-size rule after `2xl`; all font, icon,
  presence, presence-border, ring-width, and ring-offset metrics remap with the
  frame. The production implementation reaches the narrow state through the
  Foundation Query API; it does not author the reference's raw breakpoint.

### Product Owner large-size scale law

`2xl` remains the exact 88px reference anchor. The added desktop frames are
112px, 144px, and 184px. Initials remain approximately 32% of the frame, icons
approximately 52%, and presence indicators 25%, with whole-pixel metrics.
Picker cells add exactly 10px around the current Avatar frame for the Picker's
3px-per-side padding and 2px-per-side border. Shape radii remain owned by
`ErpAvatar`, so the same scale law applies to circle, rounded, and square.

## Content and accessibility

The effective content order is:

1. a valid image;
2. an explicit semantic `fallbackIcon`;
3. explicit or derived initials;
4. the semantic `user` icon.

The internal image is decorative because the Avatar composite owns one
accessible name derived from `alt`, then `name`, plus an optional localized
presence description. A noninteractive Avatar exposes image semantics. An
interactive Avatar delegates native button semantics to the internal
`ErpAvatarAction` and emits `avatarClick`. Presence remains decorative and no
automatic live region is created.

## Token adaptation

Reference roles map through Semantic roles into Avatar Component Tokens:

| Reference role | Honesty source |
|---|---|
| brand tone / brand presence | primary brand roles |
| purple tone / pending presence | accent brand roles |
| slate tone / vacation presence | secondary brand roles |
| success, warning, danger, info | matching feedback roles |
| neutral gradient | strong border to secondary text roles |
| frame border | semantic border roles |
| surface ring | semantic default surface |
| focus ring | semantic action-focus role |
| loading shimmer | semantic canvas/elevated surfaces |

No raw reference color or font-family value enters production CSS. Geometry is
reference-owned and centralized in the Avatar Component Token namespace.

## Presence and motion

Physical `left` and `right` keep their physical meaning in both LTR and RTL.
The outer `.avatar__presence` layer owns exact position/translation. The inner
`.avatar__presence-indicator` owns pulse, ping, bounce, blink, or compatibility
breathe animation, so animation never destroys position transforms.

All motion timing resolves through Foundation Motion values into Avatar
Component Tokens. Reduced motion removes animations and transforms while
keeping the frame and presence visible.

## Separate-owner boundary

The reference also demonstrates `AvatarGroup`/stack and `+N` overflow
composition. That is a separate public owner, not part of base `ErpAvatar`, and
is not authorized by this task. It remains unimplemented. The existing
`ErpAvatarPicker` remains a separate approved composite and is regression-tested
only.

## Review and acceptance

`/controls/core-batch` contains the reference feature matrices plus separately
labelled compatibility evidence. Technical verification and runtime evidence do
not declare Product Owner visual acceptance. Final acceptance remains pending
Product Owner Light/Dark/RTL/LTR/narrow review.

## 2026-10-10 internal browser review

The SHA-verified binding file and the dedicated Angular exact-reference
experience were rendered in fresh Chromium contexts at matched desktop and
narrow conditions. The six reference sizes match at 24/30/38/50/68/88px with
zero fixed-size delta; the narrow implementation preserves the authorized
24/30/38/50/58/72px mapping. All three shapes, content types, tones, rings,
presence statuses, physical positions and reference motion evidence were
visually inspected in Light/Dark and RTL/LTR.

No production Avatar geometry defect was reproduced, so the component and its
public API remain unchanged. Implementation evidence has one primary target,
zero horizontal page overflow, zero broken images and zero browser
diagnostics. The reference document's own fixed demo chrome contributes 193px
of narrow page overflow and is recorded as a source limitation rather than a
production behavior. Reproducible evidence is stored in
`docs/review-evidence/erp-avatar/v1-internal-review/`.

Technical verification and internal visual review do not change the Product
Owner status from pending.
