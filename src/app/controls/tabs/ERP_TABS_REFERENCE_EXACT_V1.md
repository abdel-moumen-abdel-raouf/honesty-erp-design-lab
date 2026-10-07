# ErpTabs Exact Reference Contract V1

## Binding authority

- Filename: `ERP-TABS.html`.
- Product Owner provenance path: `C:\Users\Misrtech\Downloads\ERP-TABS.html`.
- SHA-256: `CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`.
- Inspected: 2026-10-07.
- Product Owner decision: `ERP-TABS.html` supersedes every previous `ErpTabs`
  visual reference, including the former Nexlink page and the accelerated-wave
  waiver. The reference geometry and behavior are exact implementation
  authority. Only the palette and font family resolve through Honesty ERP
  system contracts.

The absolute Windows path records provenance only. Runtime code has no
dependency on Downloads or any local absolute path.

## Product Owner rejection and reconstruction

The technically green candidate at
`302056ad312dec403a1cdf2f9ded92d57d011ba5` was rejected by the Product Owner
for complete visual mismatch with `ERP-TABS.html`. It is not a successful
visual rebuild in project history. This reconstruction was derived from the
rendered reference at a fixed `1440 x 900` viewport and from its computed box
geometry, rather than from the rejected Tabs styling.

Permitted differences are limited to Honesty ERP colors, Honesty ERP font
families, visually invisible accessibility markup, and the
`prefers-reduced-motion` override. Reference spacing, radii, borders, sizes,
distances, durations, and easings are literal Component Token values.

## Reference feature inventory

| Area | Exact reference contract |
|---|---|
| Variants | `underline`, `pill`, `solid`, `ghost` |
| Header anatomy | text, icon, icon plus text, image, image plus text, optional count |
| Orientation | horizontal and vertical; vertical supports logical `start` and `end` |
| Distribution | content-sized and equal `fill` |
| Selection | one controlled active item, disabled items excluded, sliding active indicator where used |
| Header geometry | intrinsic anatomy height: approximately 35.6 px text-only, 38 px with an 18 px count, 44 px with a 24 px image; 10 px block padding, 16 px inline padding, 8 px content gap |
| Media | 16 px semantic icon; 24 px circular image rendered through `ErpAvatar` |
| Count | 18 px minimum size and height, 5 px inline padding, 10 px type |
| Indicator | 3 px thickness; horizontal bottom edge or vertical logical edge |
| Track variants | pill/solid track uses 4 px padding and 4 px gap; reference tab radius is 8 px; reference track radius is 12 px |
| Vertical layout | 240 px list width, 20 px list/panel gap, 12 px tab block padding |
| Panels | keyed rich projection plus string convenience content; panel relationship remains within the Tabs owner |
| Motion | `slide`, `fade`, `scale`, `none`; 220 ms standard transition `cubic-bezier(.2, 0, 0, 1)`; 140 ms spring interaction `cubic-bezier(.34, 1.4, .64, 1)`; 320 ms panel transition; slide uses `cubic-bezier(0, 0, .2, 1)` over 16 px; scale entry starts at `.94` |
| Overflow | horizontal content distribution scrolls without visible scrollbar |
| Responsive | vertical composition resolves to the horizontal reference presentation through the Foundation Query API at the system `sm` boundary |
| Keyboard | automatic activation; horizontal Left/Right with RTL reversal, vertical Up/Down, Home/End, disabled-item skipping |
| Accessibility | unique per-instance IDs, tablist/tab/tabpanel roles, orientation, selected/disabled state, and no dangling `aria-controls` in panel-less mode |
| Reduced motion | panel becomes immediately visible without transition while selection and focus remain visible |

## Honesty ERP adaptation boundary

- Reference colors map to Semantic roles and then Tabs Component Tokens.
- Arabic uses Tajawal and Latin uses Space Grotesk through the system font-family
  contract.
- `ErpIcon`, `ErpText`, `ErpAvatar`, and generic `ErpTabTrigger` remain the
  required lower owners.
- The native tab button and ARIA forwarding remain internal to
  `ErpTabTrigger`. Reference-specific visuals stay in `ErpTabs`, so `ErpStepper`
  does not inherit the Tabs design.

No raw reference palette or font-family value is copied.

## Public and compatibility contract

Reference-facing API:

- items with stable `id`, `label`, optional `icon`, `imageUrl`, `count`,
  `headerPresentation`, `content`, and `disabled`;
- controlled `activeId`, `changed`, and `tabClick`;
- `orientation`, `verticalPlacement`, `distribution`, `variant`, `transition`;
- `lazy`, `keepAlive`, and keyed `erpTabPanel` rich templates.

Bounded compatibility remains opt-in:

- legacy `pills` is isolated from the singular reference `pill` and remains for
  the exact-reference `ErpAvatarPicker` consumer;
- `headerShape=rectangle|rounded|circle` remains opt-in;
- `fade-up|fade-down|fade-start|fade-end` remain opt-in transitions;
- `renderPanels=false` and `count` remain required by `ErpAvatarPicker`.

The default is the reference `underline`, `content`, `horizontal`, `slide`,
`text` header presentation, and `reference` header shape. Compatibility
extensions must not alter that default.

## Separate-owner findings

The inspected reference does not define closable, draggable, router-owned, or
overflow-menu Tabs. No new public owner was opened. Demo controls remain review
tooling rather than production Tabs UI.

## Acceptance boundary

Technical verification is not Product Owner visual acceptance. The current
gate is Product Owner Light/Dark, RTL/LTR, wide/narrow, keyboard, and reference
comparison at `/controls/core-batch`.
