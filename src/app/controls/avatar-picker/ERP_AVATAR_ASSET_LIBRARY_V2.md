# Honesty ERP 3D Avatar Asset Library V2

## Product Owner authority

- Decision date: 2026-10-08.
- Supersedes: the previous 40-image system avatar collection and its sprite
  extraction metadata/source hash.
- Supplied source inventory: 116 standalone PNG files under the Product Owner's
  local `3d-avatars` delivery folder.
- Canonical checked-in authority:
  `public/assets/honesty-erp-avatars/users/manifest.json`.
- Aggregate library SHA-256:
  `39DA4F26B504C58C39B5073809479EC9FE916D9E3995AC510BAC58432977C4E8`.

The production build has no dependency on the local Downloads directory. Every
source checksum, source-relative filename, source number, byte size, dimensions,
transparency result, canonical ID, and canonical URL is persisted in the
manifest.

## Verified inventory

| Classification | Source numbers | Count |
|---|---|---:|
| Male | 1-25, 71-91, 102-115 | 60 |
| Female | 26-70, 92-101, 116 | 56 |
| Total | 1-116 exactly once | 116 |

All files are decoded and validated as 512 x 512, non-interlaced, 8-bit RGBA
PNG images with valid chunk CRCs, valid compressed pixel data, and actual
transparent pixels. Images are copied byte-for-byte; no crop, recolor, mirror,
resize, optimization, or other visual transformation is applied.

## Naming and compatibility

The 40 published IDs and URLs remain stable:

- `avatar-01` through `avatar-20` remain male and map to male source numbers
  1 through 20;
- `avatar-21` through `avatar-40` remain female and map to female source
  numbers 26 through 45.

The remaining files use gender/source-traceable IDs and filenames, for example
`avatar-male-071` and `avatar-female-092`. The manifest's 40-entry
`compatibility.crosswalk` is the authoritative old-ID-to-new-source mapping.
Stored selections and the 40 former public image URLs therefore retain their
ID, gender, and path while receiving approved new image content.

## Runtime ownership and loading

`ERP_AVATAR_CATALOG` is generated from the manifest into
`avatar-catalog.generated.ts`. `ErpAvatarPicker` uses the complete generated
catalog by default and continues to render every tile and preview through
`ErpAvatar`. Picker tiles request native lazy image loading through the bounded
`ErpAvatar.imageLoading` input; all other Avatar consumers retain the eager
default. No private `<img>` renderer exists in AvatarPicker.

## Reproducible workflow

Import a Product Owner delivery:

```text
node tools/assets/manage-erp-avatar-library.mjs --import <source-root>
```

Validate the checked-in library without the original delivery folder:

```text
npm run erp-avatar-assets:check
```

The validator checks inventory counts, gender/source membership, IDs, URLs,
labels, compatibility mapping, PNG structure and CRCs, decompressed pixels,
transparency, dimensions, byte sizes, individual and aggregate SHA-256 values,
manifest/file consistency, generated TypeScript freshness, and active source
references.

## Acceptance state

The imported asset library and integrations remain pending external Product
Owner visual review. Technical verification does not declare visual acceptance
or reopen the visual contracts of Avatar, AvatarPicker, UserMenu, Select, Table,
or any other consumer.
