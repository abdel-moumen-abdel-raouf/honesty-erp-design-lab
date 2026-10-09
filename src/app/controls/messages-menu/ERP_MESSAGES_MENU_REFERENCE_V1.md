# ErpMessagesMenu Reference Contract V1

## Authority

- Product Owner authorization: autonomous App Shell completion wave.
- Primary evidence: Skodash RTL tabular-menu topbar messages dropdown.
- Live source: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/index.html`.

## Verified reference values

- Trigger: 40 by 40 pixels with an unread counter.
- Surface: 360 pixels wide, 8 pixels inner padding, 10 pixels radius.
- Sender avatar: 52 pixels in the vendor reference; the ERP owner uses the exact 50 pixel `lg` Avatar scale rather than bypassing `ErpAvatar`.
- Scrollable list: maximum 420 pixels; header, search and footer remain fixed.
- Entrance: 600 ms, `cubic-bezier(0.25, 0.8, 0.25, 1)`, 6 pixel vertical offset.
- Narrow surface: viewport-contained; no page horizontal overflow.

## Ownership

`ErpMessagesMenu` composes `ErpAvatar`, `ErpSearchBox`, `ErpShellMenuAction`, `ErpButton`, `ErpIconButton`, `ErpIcon`, `ErpText`, `ErpStatusBadge`, `ErpTooltip`, and `ShellAnchoredSurfaceController`.

Consumer code supplies message data, timestamps, navigation decisions and transport. The component emits message and view-all intents only.

## Status

- Technical verification: verified by the 126-file / 804-test canonical gate.
- Internal visual review: complete in the integrated application evidence.
- Product Owner visual review: pending.
