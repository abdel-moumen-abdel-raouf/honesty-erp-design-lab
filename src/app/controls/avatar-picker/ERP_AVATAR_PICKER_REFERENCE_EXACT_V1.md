# ErpAvatarPicker Exact Reference Contract V1

Status: `CURRENT — PRODUCT OWNER EXACT-REFERENCE CANDIDATE`

## Authority

- Filename: `ERP-AVATAR-PICKER.html`
- Provenance path (documentation only): `C:\Users\Misrtech\Downloads\ERP-AVATAR-PICKER.html`
- SHA-256: `24DADFE5D5EBE5F9A23E9ACF9D29FC52B53E38D44BEE60A2AA9456532CC10B66`
- Inspected: `2026-10-07`
- Product Owner instruction: exact visual and behavioral replication.
- Allowed adaptations: Honesty ERP system colors, system font families,
  accessibility necessities, and approved ERP component ownership only.
- All earlier AvatarPicker references, interpretations, and the accelerated-wave
  no-reference waiver are `SUPERSEDED`.

The Windows provenance path is never a runtime dependency.

## Reference feature inventory

| Area | Binding reference contract |
|---|---|
| Surface | Content-width card, `520px` maximum, raised surface, `1px` border, `16px` radius, clipped overflow |
| Header | `20px` inset, title, subtitle, lower divider, restrained accent wash |
| Gender filters | Male/female two-column tabs with semantic icons and per-gender counts; active raised pill |
| Search | Inline search below tabs, `12px` text hierarchy, search icon, explicit clear action |
| Grid | Auto-fill square cells, `76px` minimum cell, `12px` gap, intentional vertical scrolling at `440px` maximum |
| Compact | `62px` cells, `8px` gap, `16px` inset, `360px` maximum grid block |
| Narrow | `64px` cells, `8px` gap, `16px` inset, `56vh` maximum grid block, stacked footer |
| Avatar cell | Square reference tile, `2px` border, `12px` radius, hover lift, active compression, focus ring |
| Selected cell | Accent border/ring, `22px` circular check marker at logical end, selected lift |
| Entry motion | Staggered scale/translate entry; reduced motion removes visual motion without hiding content |
| Selection | Draft selection is distinct from the committed controlled value |
| Preview | Current draft/committed Avatar plus stable ID metadata; placeholder when no selection exists |
| Footer | Cancel and confirm ERP actions; confirm disabled until draft differs from committed value |
| Confirmation | Commit emits controlled value and explicit intents, then shows bounded success feedback |
| Empty search | Existing `ErpEmptyState` with a Search illustration and no private empty-state renderer |
| Disabled | Tabs, editor, tiles, cancel and confirm stop mutation while content remains readable |
| Direction | Inherited RTL/LTR; no local direction or theme authority |

## Ownership hierarchy

```text
ErpAvatarPicker
├─ ErpTabs (gender filter header; counted tabs; no private tabs)
├─ ErpSearchBox (approved inline editor)
├─ ErpAvatarPickerTile (internal semantic selection action only)
│  ├─ ErpAvatar (all avatar rendering)
│  └─ ErpIcon (selected marker)
├─ ErpEmptyState (no-result state)
├─ ErpAvatar (preview and placeholder)
└─ ErpButton / ErpIconButton / ErpTooltip / ErpText / ErpIcon
```

`ErpAvatarPickerTile` is a bounded internal action owner because the shared
`ErpSelectionTile` fixed geometry cannot reproduce the reference tile without
an illegal cross-component token override. It owns no second selection model:
the Picker remains the single controlled selection owner.

The Picker template contains no raw avatar `<img>`, no private Avatar renderer,
and no private Tabs implementation. Avatar shape, size, image, hover behavior,
and fallback are forwarded to the exact-reference `ErpAvatar` owner.

## Public contract

- Catalog/state: `avatars`, `value`, `gender`, `disabled`.
- Presentation: `title`, compatibility `label`, `subtitle`, `size`,
  `avatarShape`, `avatarSize`.
- Features: `searchable`, `showConfirm`, `showCount`.
- Copy: `searchPlaceholder`, `emptyText`, `confirmLabel`, `cancelLabel`,
  `savedLabel`.
- Intents: `pick`, `confirm`, `cancelRequested`, `genderChange`, compatibility
  `changed`. The cancel intent avoids collision with the native DOM `cancel`
  event name.
- `value` is committed only by Confirm. `pick` reports draft selection.
- Consumer/application code owns user profile state and persistence.

## Asset contract

- The Product Owner's 116-image 3D library supersedes the former 40-image
  collection: `60 male + 56 female = 116` PNG assets.
- The checked-in manifest is the canonical source of truth;
  `ERP_AVATAR_CATALOG` is generated and validated from it.
- The former 40 IDs and URLs retain their gender and path through the explicit
  compatibility crosswalk. New IDs encode gender and source number.
- Picker tiles request native lazy loading through `ErpAvatar`; AvatarPicker
  still owns no native image renderer.
- The complete asset and migration contract is
  `ERP_AVATAR_ASSET_LIBRARY_V2.md`.
- No image is duplicated, recolored, copied, or loaded from a local Windows path.
- Searchable labels are derived for accessible presentation; no unsupported
  domain category metadata is invented.

## Geometry mapping

| Reference value | AvatarPicker Component Token / owner |
|---|---|
| `520px` max width | `--honesty-avatar-picker-max-inline-size: 32.5rem` |
| `20px` default inset | `--honesty-avatar-picker-padding: 1.25rem` |
| `16px` surface radius | `--honesty-avatar-picker-radius: 1rem` |
| `76px` default tile | `--honesty-avatar-picker-tile-size: 4.75rem` |
| `12px` default grid gap | `--honesty-avatar-picker-grid-gap: 0.75rem` |
| `440px` default grid maximum | `--honesty-avatar-picker-grid-max-block-size: 27.5rem` |
| `62px / 8px / 360px` compact | Component-token compact facet |
| `64px / 8px / 56vh` narrow | Foundation Query API narrow facet |
| `2px` tile border | `--honesty-avatar-picker-tile-border-width: 0.125rem` |
| `22px` selected marker | `--honesty-avatar-picker-check-size: 1.375rem` |

### Large Avatar compatibility extension

The Product Owner reopened only large-size compatibility. `ErpAvatarPicker`
continues to render every cell through `ErpAvatar`; it does not own Avatar
frames, images, shapes, radii, initials, icons, presence, or rings.

| Avatar size | Desktop Avatar | Desktop tile | Narrow Avatar | Narrow tile |
|---|---:|---:|---:|---:|
| `2xl` | 88px | 98px | 72px | 82px |
| `3xl` | 112px | 122px | 88px | 98px |
| `4xl` | 144px | 154px | 112px | 122px |
| `5xl` | 184px | 194px | 144px | 154px |

The 10px cell allowance is the Picker-owned sum of 3px padding and 2px border
on each side. The grid uses the reference auto-fill law with a `100%` cap on
its minimum cell so a large configured size cannot create horizontal overflow
inside a narrower Picker. Narrow remapping uses the Foundation Query API.
Circle, rounded, and square continue to be forwarded without private Picker
shape styling.

## Reference parity ledger

| Reference feature | Implementation owner | Status |
|---|---|---|
| Header hierarchy | `ErpAvatarPicker` + `ErpText` | IMPLEMENTED |
| Male/female counted tabs | `ErpTabs` | IMPLEMENTED |
| Search and clear | `ErpSearchBox` + Tooltip-wrapped `ErpIconButton` | IMPLEMENTED |
| Responsive avatar grid | Picker layout + Foundation Query API | IMPLEMENTED |
| Avatar rendering | `ErpAvatar` only | IMPLEMENTED |
| Selected marker | Internal selection action + `ErpIcon` | IMPLEMENTED |
| Draft/confirm/cancel | Controlled Picker state + ERP Buttons | IMPLEMENTED |
| Preview | `ErpAvatar` + `ErpText` | IMPLEMENTED |
| Empty state | `ErpEmptyState` | IMPLEMENTED |
| Reduced motion | Picker motion styles | IMPLEMENTED |
| Upload/camera/crop/backend manager | Separate-owner scope | NOT OPENED |

## Color and typography mapping

Reference surfaces, borders, selection, focus, feedback, text and disabled
roles resolve through Semantic contracts into AvatarPicker Component Tokens.
No reference hex/RGB/HSL palette is copied. Text is authored through `ErpText`,
therefore Arabic uses Tajawal, Latin uses Space Grotesk, and mixed content uses
the approved system family contract.

## Acceptance boundary

Technical gates, automated tests, and runtime measurements establish a review
candidate only. Product Owner runtime comparison in Light/Dark, RTL/LTR and
narrow widths is the active visual acceptance gate.
