# ErpStatusBadge V1

`ErpStatusBadge` is the public status-indicator owner rebuilt from the exact
Product Owner reference `ERP-STATUS-BADGE.html`. The authoritative contract is
`ERP_STATUS_BADGE_REFERENCE_EXACT_V1.md`.

## Public behavior

- Tones: `neutral | success | warning | danger | info | brand | pending | archived`.
- Variants: `soft | solid | outline | ghost`.
- Sizes: `sm | md | lg | xl` with exact reference geometry.
- Shapes: reference-default `rounded`, plus bounded compatibility `square | pill`.
- Widths: reference-default `content`, plus bounded compatibility `stretch`.
- Optional anatomy: semantic icon, decorative image, dot/pulse, count, selected
  check, uppercase label, and remove action.
- Optional controlled interaction: `interactive`, `selected`, `badgeClick`, and
  `selectedChange`.
- Independent removal: `removable` and `remove`.
- `disabled` suppresses every action.

The badge is noninteractive by default and does not automatically author a live
region. When interaction is explicitly enabled, native button semantics remain
inside the internal StatusBadge action owner. Visible text uses `ErpText`; icons
use `ErpIcon`.

Light/Dark remains App-owned, direction is inherited, and reduced motion keeps
the badge static but visible. Technical verification does not equal Product
Owner visual acceptance.
