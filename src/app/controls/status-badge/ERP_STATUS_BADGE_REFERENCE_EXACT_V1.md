# ErpStatusBadge Exact Reference Contract V1

## Authority

- Filename: `ERP-STATUS-BADGE.html`
- Product Owner source path: `C:\Users\Misrtech\Downloads\ERP-STATUS-BADGE.html`
- SHA-256: `654508CBC4D660869BBA0118C3A9C8602F3F1D059AAD0E194C6F95C2B97678F0`
- Inspected: 2026-10-07
- Instruction: exact reference rebuild. The reference owns geometry, spacing,
  proportions, anatomy, variants, states, interaction, and motion.
- Honesty adaptation boundary: only the palette and font family are replaced by
  Honesty ERP Semantic/Component Tokens and the system typography family.

This file supersedes every earlier `ErpStatusBadge` visual interpretation, the
former Dribbble reference, and the accelerated-wave no-reference waiver. Product
Owner runtime/visual approval remains pending; technical green is not approval.

## Reference feature inventory

| Area | Binding reference contract |
|---|---|
| Status tones | `neutral`, `success`, `warning`, `danger`, `info`, `brand`, `pending`, `archived` |
| Visual variants | `soft`, `solid`, `outline`, `ghost` |
| Sizes | `sm`, `md`, `lg`, `xl` |
| Shapes | Reference rounded geometry by size; compatibility `square` and `pill` map without changing default reference geometry |
| Width | Content width by default; explicit stretch compatibility remains bounded |
| Anatomy | Label, optional dot, pulse, semantic icon, decorative image, count, selected check, and remove action |
| Interaction | Optional pressable/selected state, hover lift, active compression, focus-visible ring, disabled state, and independent remove action |
| Motion | Entry scale, live-dot pulse, selected-check entry, hover/active transitions, and reduced-motion static visibility |
| Semantics | Noninteractive by default; no automatic live region; interactive mode uses native button semantics behind an internal ERP action owner |
| Direction | Logical inline composition works in RTL and LTR |
| Theme | Geometry is invariant; Light/Dark change only Semantic color resolution |

The HTML reference also demonstrates an `ErpStatusBadgeGroup` composition with
search, sorting, grouping, bulk selection, and clearing. This bounded task
authorizes only `ErpStatusBadge`; therefore that separate public owner is not
opened or silently introduced by this contract.

## Exact geometry

| Size | Height | Inline padding | Text | Dot | Gap | Icon | Radius | Image |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `sm` | 18px | 7px | 10px | 5px | 4px | 10px | 4px | 12px |
| `md` | 22px | 9px | 11px | 6px | 5px | 12px | 6px | 14px |
| `lg` | 26px | 11px | 12px | 7px | 6px | 14px | 6px | 18px |
| `xl` | 32px | 14px | 13px | 8px | 7px | 16px | 8px | 22px |

Shared geometry:

- `inline-flex`, vertically centered, `line-height: 1`, nowrap.
- One-pixel border with a transparent default where the variant requires it.
- Reference label weight is 600 and letter spacing is `0.01em`; implementation
  resolves the closest approved system label weight through typography tokens.
- Label maximum inline size is 180px with ellipsis.
- Default width is content-owned rather than parent-grid stretch.
- Count and image use circular geometry. The reference icon is unboxed; no old
  StatusBadge icon-circle adaptation remains.

## State and motion measurements

| State | Contract |
|---|---|
| Hover | Translate block-start by 1px and use system raised elevation |
| Active | Scale to `0.97` |
| Focus visible | Three-pixel system focus ring with system focus offset |
| Selected | Tone border plus a three-pixel tone-relative outer ring; check marker visible |
| Disabled | Opacity `0.45`, saturation `0.7`, no action intent |
| Entry | `0.72 → 1.06 → 1` scale with opacity entry |
| Pulse | 1.8s expansion to `2.6`, repeating |
| Reduced motion | No entry, pulse, or check animation; the badge remains fully visible |

## Color mapping

| Reference role | Honesty mapping |
|---|---|
| Neutral surface/text/border | Semantic default surface, secondary/muted text, and default border |
| Success | Semantic feedback success surface, strong surface, border, text, and on-strong roles |
| Warning | Semantic feedback warning surface, strong surface, border, text, and on-strong roles |
| Danger | Semantic feedback danger surface, strong surface, border, text, and on-strong roles |
| Info | Semantic feedback info surface, strong surface, border, text, and on-strong roles |
| Brand | Semantic primary brand subtle/solid/content/on-solid roles |
| Pending | Semantic accent brand subtle/solid/content/on-solid roles |
| Archived | Semantic neutral surface, muted/secondary text, and default border roles |

The distribution of surface, border, icon, count, and foreground follows the
reference variants. No raw reference color is copied into production code.

## Public contract

- Core content: `label`, `icon`, `image`, `count`, `showDot`, `pulse`,
  `uppercase`.
- Visual facets: `tone`, `variant`, `size`, `shape`, `widthMode`.
- Interaction facets: `interactive`, `selected`, `removable`, `disabled`.
- Controlled intents: `badgeClick`, `selectedChange`, `remove`.
- Defaults: `neutral`, `soft`, `md`, `rounded`, `content`, noninteractive.

`shape` and `widthMode` remain compatibility APIs used by existing consumers.
Their default mapping is the exact reference rounded/content geometry.

## Parity checklist

- [x] Eight reference tones.
- [x] Four reference variants.
- [x] Four exact size geometries.
- [x] Label-only, dot, pulse, icon, image, count, selected check, and removable anatomy.
- [x] Content-width default and explicit stretch compatibility.
- [x] Interactive, selected, disabled, hover, active, and focus-visible states.
- [x] Entry, pulse, check, and reduced-motion contracts.
- [x] System-token palette and system typography family.
- [x] RTL/LTR structure and App-owned Light/Dark inheritance.

Final visual acceptance belongs only to the Product Owner.
