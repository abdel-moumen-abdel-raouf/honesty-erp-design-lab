# ErpAvatarPicker Reference V1

## Authority

- Reference 3: `https://cdn.dribbble.com/userupload/15549174/file/original-80aba1b70f2cb1b61814bb225f19c863.png?resize=400x660&vertical=center`.
- Reference 3 SHA-256: `23773F31B513D79EDDCC21221E9FCAE7CF6824517E3554712005B7EEC06578D6`.
- Reference 4: `https://user-images.githubusercontent.com/32610660/183125006-4f213f80-8e6c-46ba-836e-0989785363ab.png`.
- Reference 4 SHA-256: `183DEA993FBABBB43DBC3E709ED961EDAA27A76F865E7BB95AEE3B6CF9D0C26C`.
- Product Owner asset source: `C:\Users\Misrtech\Downloads\honesty-erp-avatars\users`.
- Inspected/copied unchanged: 2026-10-06.

## Asset and hierarchy contract

- Production assets live under `public/assets/honesty-erp-avatars/users/` with 20 male PNG files, 20 female PNG files, and the supplied manifest.
- Runtime source never uses a Windows path and performs no fetch/upload/backend work.
- The supplied manifest describes 40 stable IDs/paths. Its declared 256×256 canvas metadata differs from the intrinsic dimensions of several supplied PNG files; the original Product Owner files remain unchanged.
- `ErpAvatarPicker` composes `ErpTabs` and `ErpAvatar`; it does not implement either capability again.
- The only tabs are `ذكر` and `أنثى`; the value is controlled by the consumer through `value`/`valueChange`, with `changed` as the explicit selection intent.
- There is no upload, crop, camera, or persistence ownership.

Product Owner runtime/visual approval remains pending.
