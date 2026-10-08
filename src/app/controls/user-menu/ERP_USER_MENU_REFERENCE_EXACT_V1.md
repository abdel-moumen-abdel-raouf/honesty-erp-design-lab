# ErpUserMenu Exact Reference Contract V1

## Authority

- Product Owner scope: `ErpUserMenu` only.
- Live reference: `https://store.codervent.com/skodash/demo/tabular-menu/rtl/component-media-object.html`.
- Reference HTML SHA-256: `75F64AE955800ABE9FCBE27D7B09161D95E2DE2C77B6106C337AA4841D39D399`.
- Reference `assets/css/style.css` SHA-256: `1EFFE6A3ADC2613EC19612699E567C38E5457997E342333B0686F70D63A3AFEA`.
- Reference `assets/js/app.js` SHA-256: `4C6FF8886FDC78096852B9405117D7EC3061201E4226D76DF011715819633190`.
- Supporting Bootstrap CSS SHA-256: `9D5353D59077C56901E5CCDB1B70C562735743F87EB5A22F9A8A22FCCEEE964A`.
- Supporting Bootstrap bundle SHA-256: `C0C09020ADB6F602B16D48374166B9E38CA92383A81650B6A9097C43CC43F31F`.
- Evidence date: 2026-10-08.

The Skodash presentation is binding for the authorized UserMenu anatomy,
geometry, states, and motion. Honesty ERP semantic colors and system typography
replace the reference palette and font family. Bootstrap, jQuery, and vendor
runtime code are evidence only and are not production dependencies.

## Source-verified anatomy and measurements

| Reference selector/anatomy | Verified value or behavior | ERP owner |
|---|---|---|
| `.user-setting` | 40 px height, 30 px radius, surface, 0 2 px 4 px / 8% shadow | `ErpUserMenu` trigger frame |
| `.user-img` | 40 x 40 px; reference image padding is 4 px | `ErpAvatar` bounded trigger presentation |
| `.user-name` + `.gap-1` | 15 px/500 label; effective 14 px image-to-label separation | `ErpText` in trigger |
| `.dropdown-large .dropdown-menu` | 360 px desktop width, zero outer border, 8 px padding, 10 px radius, 0 8 px 16 px / 15% shadow | anchored UserMenu surface |
| dropdown arrow | 13 x 13 px, 16 px from logical end, -6 px block offset | UserMenu surface pseudo-element |
| identity media object | 60 x 60 px avatar with adjacent name/designation | `ErpAvatar` + `ErpText` |
| `.dropdown-item` | 8 px padding, 10 px hover radius | `ErpButton` bounded action presentation |
| `.setting-icon` | 40 x 40 px circular icon surface, 18 px icon | `ErpButton` + `ErpIcon` |
| `.setting-text` | 16 px, weight 500 | `ErpText` through `ErpButton` |
| `animdropdown` | 600 ms, `cubic-bezier(.25,.8,.25,1)`, opacity 0 to 1, translateY 6 px to 0 | UserMenu component tokens |
| `max-width: 767px` | arrow hidden and dropdown becomes viewport-width presentation | Foundation `viewport-down(md)` |
| Bootstrap `d-sm-block` | historical reference behavior only; superseded by the 2026-10-08 Product Owner responsive-identity refinement | intrinsic component sizing and truncation |

## Product Owner responsive-identity refinement

The Product Owner explicitly authorized these bounded refinements on
2026-10-08. They supersede the reference's fixed 40 px multi-line trigger and
the unconditional 576 px name hiding, without reopening any other Shell owner:

- the closed capsule uses intrinsic height and bounded responsive inline sizing;
  the later compact-trigger correction below owns its current physical padding,
  gap, and minimum-size values;
- intrinsic flex sizing, `min-inline-size: 0`, and ellipsis keep long Arabic,
  English, and mixed-direction names within the available header width;
- the full display name remains the trigger's accessible action label even
  when the visible text is shortened or hidden by a consumer input;
- `ErpShellUserSummary` adds optional `email`, `roleLabel`, `branchLabel`, and
  `avatarPresence` fields without reinterpreting legacy `secondaryText`;
- Avatar resolution remains image, then initials, then an explicitly supplied
  icon fallback. Presence is rendered only when the consumer supplies it;
- `ErpStatusBadge` owns independent role and branch labels; the badges wrap as
  separate units and remain noninteractive;
- `showAvatar`, `showUserName`, `showEmail`, `showPresence`, `showRoleBadge`,
  and `showBranchBadge` are backward-compatible, default-true visibility
  inputs shared by the closed capsule and open identity card;
- the open identity sequence is Avatar, full name, email, then role and branch
  badges. Legacy `secondaryText` remains an independent optional line;
- the popup identity remains visible while the action region alone becomes
  vertically scrollable when the viewport cannot contain the complete menu.

Live identity or visibility changes while open reuse the existing anchored
surface and request fresh measured placement. They never create a second
overlay or restore a fixed arrow offset.

## Product Owner compact-trigger correction

The Product Owner explicitly rejected the preceding closed-trigger candidate
on 2026-10-08 because it rendered a 104--125 px capsule with four identity
rows and default trigger badges. This bounded correction supersedes only that
closed-trigger presentation; the open popup, arrow, vertical placement, and
actions-only scrolling contracts remain in force.

- the trigger has at most three direct identity rows: display name, email, and
  one optional metadata row;
- `secondaryText` occupies the metadata row. When trigger badges are explicitly
  enabled, that row uses constrained equal-width inline cells so it never
  creates a fourth or fifth row;
- `showRoleBadge` and `showBranchBadge` remain default-true global gates and
  continue to show popup badges by default;
- new default-false `showTriggerRoleBadge` and
  `showTriggerBranchBadge` inputs independently opt the corresponding badges
  into the closed trigger;
- trigger padding is 6 px block / 10 px inline, Avatar-to-copy gap is 10 px,
  copy-row gap is 1 px, metadata gap is 4 px, and the minimum capsule block
  size is 52 px;
- the full three-row identity renders at 60 px, yielding a 72 px capsule; a
  name-only identity yields the 52 px minimum. The Avatar remains 40 x 40 px
  and its measured center delta is 0 px;
- name, email, secondary text, and opted-in badges truncate inline without
  vertical clipping; full values remain exposed by accessible labels.

The before/after browser matrix and reproducible capture script are under
`docs/review-evidence/erp-user-menu/compact-trigger-v1/`. At 1440 px the
default capsule changes from 360 x 104 px and four rows to 360 x 72 px and
three rows. At 390 px it changes from 309 x 104 px to 309 x 72 px. The long
English 320 px case changes from 239 x 125 px to 239 x 71 px. All corrected
row client/scroll/rendered heights match, all popup edges remain contained,
and page horizontal overflow is 0 px.

To retain the existing 4 kB component-style budget without changing the
already validated arrow, its purely visual CSS is isolated in the bounded
internal `ErpUserMenuArrow`. This is not a public component or overlay owner;
position still comes from `ShellAnchoredSurfaceController`. Wide open captures
record a 0 px arrow-center delta, and the existing narrow rule still hides it.

## Interaction contract

- Consumer controls `open`; the surface uses the existing
  `ShellAnchoredSurfaceController` and shared anchored-overlay engine.
- Logical-end alignment mirrors between RTL and LTR and clamps to the viewport.
- Outside pointer dismissal closes without stealing focus.
- Escape closes and restores focus to the trigger.
- ArrowDown opens and focuses the first enabled action.
- Disabled actions neither activate nor close the menu.
- Action activation emits the typed item and returns focus to the trigger.
- Reduced motion removes the entrance animation without changing visibility or
  interaction.

## Final vertical-dropdown geometry closure

The Product Owner final S1 gate explicitly limits UserMenu to a vertical
dropdown. Its allowed placement set is `bottom`, then `top`; left/right remain
available to other shared anchored-overlay consumers but are not candidates for
UserMenu. Before each surface measurement, UserMenu calculates the real block
space above and below the trigger from the current viewport, reference inset,
and anchor gap. The greater available block size becomes the bounded surface
maximum; the identity region does not shrink and only the action list scrolls.

This policy was measured at 320 x 568, 320 x 844, 390 x 844, 768 x 900, and
1440 x 900 in RTL/LTR with long and dynamic identities. Every open case is
inside the visible viewport and has zero trigger overlap. The constrained
320 x 568 case keeps a 166 px identity region visible while its actions use a
232 px client region for 353 px of content. Desktop top and bottom cases retain
zero measured arrow-center delta. The current machine-readable evidence is
`docs/review-evidence/erp-user-menu/s1-final-popup-geometry.json`.

The open card order after Avatar remains name, email, role/branch badges, then
optional legacy `secondaryText`. The compact trigger uses name, email, then one
bounded metadata row containing optional `secondaryText` and any explicitly
enabled trigger badges. `secondaryText` remains independent and is never
reinterpreted as email, role, or branch.

## Viewport-clamped arrow closure

The S1 follow-up verified a real failure in the original candidate: at the
committed desktop RTL review position, the trigger center was `725.8125 px`
while the fixed logical-edge arrow center was `488.5 px`, a `-237.3125 px`
cross-axis error after viewport clamping. The shared anchored-overlay engine
already calculated the correct physical cross-axis center, but UserMenu did not
consume it.

UserMenu now passes the reference `13 px` arrow width and `16 px` safe inset to
the existing `ShellAnchoredSurfaceController`. The controller writes the
calculated physical center to the open surface; the UserMenu pseudo-element
uses that value without changing its reference size, block offset, popup gap,
surface geometry, or any other anchored-overlay owner's defaults.

Browser evidence at 800 x 700 covers `top` and `bottom` placement at both
physical horizontal edges in RTL and LTR. All eight cases resolve with an
absolute arrow-center delta of at most `0.0005 px`, zero surface overflow, and
one primary showcase target. At 390 x 844, the reference narrow rule continues
to hide the arrow while the 8 px viewport inset and zero overflow remain in
force.

## Ownership and compatibility

- `ErpUserMenu` composes `ErpAvatar`, `ErpStatusBadge`, `ErpButton`,
  `ErpDivider`, and `ErpText`.
- `ShellAnchoredSurfaceController` remains the single overlay owner.
- `dividerBefore` is the only added action metadata and is optional, preserving
  all existing consumers.
- App root remains the sole theme authority. UserMenu owns no session, logout,
  navigation, transport, or permission behavior.
- The `/components/user-menu` workbench retains one primary live target, live
  Public API controls, and action-event evidence.
- The reference workbench user uses the approved local asset
  `/assets/honesty-erp-avatars/users/female/avatar-21.png`; Avatar's image-error
  fallback hierarchy and tests remain unchanged.

## Final dark contrast and scroll ownership closure

The final external review confirmed two bounded defects. The native popover
surface inherited a black foreground in Dark mode and retained the user-agent
`overflow: auto`, creating a second popup scroll owner. UserMenu now consumes
its existing `--honesty-user-menu-fg` token on the surface and sets the surface
overflow to visible. Only `.user-menu__items` owns vertical scrolling; the
identity region remains fixed and readable.

The current browser record is
`docs/review-evidence/erp-user-menu/s1-final-dark-contrast-scroll.json`. Dark
RTL/LTR surface foreground/background resolve to `rgb(248, 249, 251)` /
`rgb(39, 42, 50)`, while email and secondary text resolve to
`rgb(201, 206, 216)`. In the constrained 320 x 568 case the surface stays at
scrollTop 0, actions move to scrollTop 96, and identity top delta is 0 px. The
page scrollbar remains a separate Design Lab document concern. Existing
top/bottom placement, arrow calculation, viewport containment, keyboard/focus
behavior, six visibility inputs, and all public APIs remain unchanged.

## Evidence limitations and acceptance

The reference source and runtime were live and accessible during this phase.
Vendor Bootstrap behavior was inspected only to establish the verified
responsive thresholds and dropdown interaction contract; vendor code was not
copied into production. Technical verification and runtime screenshots are not
Product Owner visual acceptance. The acceptance state remains pending external
Product Owner review.
